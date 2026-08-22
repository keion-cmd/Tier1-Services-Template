import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const appointmentRequestInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(1).max(60).refine((value) => value.replace(/\D/g, "").length >= 7, "Please provide at least 7 phone digits."),
  petName: z.string().trim().min(1).max(120),
  service: z.string().trim().max(120).optional(),
  preferredDate: z.string().trim().max(32).optional(),
  message: z.string().trim().min(1).max(2000),
  consentConfirmed: z.literal(true),
});

export const reviewSubmissionInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  rating: z.number().int().min(1).max(5),
  feedback: z.string().trim().min(1).max(2000),
  consentConfirmed: z.literal(true),
});

export type AppointmentRequestInput = z.infer<typeof appointmentRequestInput>;
export type ReviewSubmissionInput = z.infer<typeof reviewSubmissionInput>;
export type DisplayedReview = { id: string; displayName: string; rating: number; feedback: string };

type IntakeResponse = { ok: boolean; requestId?: string; status?: string };

async function forwardToSheet(payload: Record<string, unknown>, expectedStatus: string, failureMessage: string) {
  const endpoint = process.env.GOOGLE_APPS_SCRIPT_INTAKE_URL;
  const intakeSecret = process.env.APPOINTMENT_INTAKE_SECRET;
  if (!endpoint || !intakeSecret) throw new TRPCError({ code: "PRECONDITION_FAILED", message: failureMessage });
  let response: Response;
  try { response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ intakeSecret, ...payload }), signal: AbortSignal.timeout(20_000) }); }
  catch { throw new TRPCError({ code: "BAD_GATEWAY", message: failureMessage }); }
  if (!response.ok) throw new TRPCError({ code: "BAD_GATEWAY", message: failureMessage });
  let result: IntakeResponse;
  try { result = (await response.json()) as IntakeResponse; }
  catch { throw new TRPCError({ code: "BAD_GATEWAY", message: failureMessage }); }
  if (!result.ok || !result.requestId || result.status !== expectedStatus) throw new TRPCError({ code: "BAD_GATEWAY", message: failureMessage });
  return { requestId: result.requestId, status: result.status } as const;
}

export async function forwardAppointmentRequest(input: AppointmentRequestInput) {
  return forwardToSheet({ kind: "appointment", request: input }, "Pending staff review", "We could not send your visit request. No appointment was created; please try again shortly.");
}

export async function forwardReviewSubmission(input: ReviewSubmissionInput) {
  return forwardToSheet({ kind: "review", review: input }, "Displayed on website", "We could not send your review. It was not displayed; please try again shortly.");
}

export async function listDisplayedReviews(): Promise<DisplayedReview[]> {
  const endpoint = process.env.GOOGLE_APPS_SCRIPT_INTAKE_URL;
  const intakeSecret = process.env.APPOINTMENT_INTAKE_SECRET;
  if (!endpoint || !intakeSecret) return [];
  try {
    const url = new URL(endpoint); url.searchParams.set("action", "displayedReviews"); url.searchParams.set("intakeSecret", intakeSecret);
    const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    const result = await response.json() as { ok?: boolean; reviews?: unknown };
    if (!response.ok || !result.ok || !Array.isArray(result.reviews)) return [];
    return result.reviews.flatMap((review) => {
      if (!review || typeof review !== "object") return [];
      const item = review as Record<string, unknown>;
      if (typeof item.id !== "string" || typeof item.displayName !== "string" || typeof item.rating !== "number" || typeof item.feedback !== "string") return [];
      if (!item.id.trim() || !item.displayName.trim() || !item.feedback.trim() || item.rating < 1 || item.rating > 5) return [];
      return [{ id: item.id, displayName: item.displayName, rating: item.rating, feedback: item.feedback }];
    });
  } catch { return []; }
}
