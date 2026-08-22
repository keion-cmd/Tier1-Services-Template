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

export type AppointmentRequestInput = z.infer<typeof appointmentRequestInput>;
type IntakeResponse = { ok: boolean; requestId?: string; status?: string };

export async function forwardAppointmentRequest(input: AppointmentRequestInput) {
  const endpoint = process.env.GOOGLE_APPS_SCRIPT_INTAKE_URL; const intakeSecret = process.env.APPOINTMENT_INTAKE_SECRET;
  const failureMessage = "We could not send your visit request. No appointment was created; please try again shortly.";
  if (!endpoint || !intakeSecret) throw new TRPCError({ code: "PRECONDITION_FAILED", message: failureMessage });
  let response: Response;
  try { response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ intakeSecret, kind: "appointment", request: input }), signal: AbortSignal.timeout(20_000) }); }
  catch { throw new TRPCError({ code: "BAD_GATEWAY", message: failureMessage }); }
  if (!response.ok) throw new TRPCError({ code: "BAD_GATEWAY", message: failureMessage });
  let result: IntakeResponse;
  try { result = (await response.json()) as IntakeResponse; }
  catch { throw new TRPCError({ code: "BAD_GATEWAY", message: failureMessage }); }
  if (!result.ok || !result.requestId || result.status !== "Pending staff review") throw new TRPCError({ code: "BAD_GATEWAY", message: failureMessage });
  return { requestId: result.requestId, status: result.status } as const;
}
