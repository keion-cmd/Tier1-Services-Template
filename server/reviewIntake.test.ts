import { beforeEach, describe, expect, it, vi } from "vitest";
import { forwardReviewSubmission, listApprovedReviews, reviewSubmissionInput } from "./appointmentIntake";

describe("custom review intake", () => {
  beforeEach(() => {
    process.env.GOOGLE_APPS_SCRIPT_INTAKE_URL = "https://example.test/intake";
    process.env.APPOINTMENT_INTAKE_SECRET = "staff-only-secret";
    vi.restoreAllMocks();
  });

  it("validates a review before forwarding it", () => {
    expect(() => reviewSubmissionInput.parse({ name: "A", email: "not-email", rating: 0, feedback: "", consentConfirmed: false })).toThrow();
  });

  it("forwards a review with its private staff-review kind", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true, requestId: "review_001", status: "Pending staff review" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(forwardReviewSubmission({ name: "Alex Visitor", email: "alex@example.test", rating: 5, feedback: "The team was kind and clear.", consentConfirmed: true, displayConsent: true })).resolves.toEqual({ requestId: "review_001", status: "Pending staff review" });

    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
      intakeSecret: "staff-only-secret",
      kind: "review",
      review: { name: "Alex Visitor", email: "alex@example.test", rating: 5, feedback: "The team was kind and clear.", consentConfirmed: true, displayConsent: true },
    });
  });

  it("does not accept an unexpected published-like status", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true, requestId: "review_002", status: "Published" }), { status: 200 })));
    await expect(forwardReviewSubmission({ name: "Alex Visitor", email: "alex@example.test", rating: 4, feedback: "Helpful team.", consentConfirmed: true, displayConsent: false })).rejects.toThrow("No review was published");
  });

  it("returns no public reviews when the source contains no approved entries", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true, reviews: [] }), { status: 200 })));
    await expect(listApprovedReviews()).resolves.toEqual([]);
  });
});
