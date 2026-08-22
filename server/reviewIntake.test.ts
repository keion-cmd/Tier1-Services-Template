import { beforeEach, describe, expect, it, vi } from "vitest";
import { forwardReviewSubmission, listDisplayedReviews, reviewSubmissionInput } from "./appointmentIntake";

describe("custom review intake", () => {
  beforeEach(() => {
    process.env.GOOGLE_APPS_SCRIPT_INTAKE_URL = "https://example.test/intake";
    process.env.APPOINTMENT_INTAKE_SECRET = "staff-only-secret";
    vi.restoreAllMocks();
  });

  it("validates a review before forwarding it", () => {
    expect(() => reviewSubmissionInput.parse({ name: "A", email: "not-email", rating: 0, feedback: "", consentConfirmed: false })).toThrow();
  });

  it("forwards a review with its immediate website-display status", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true, requestId: "review_001", status: "Displayed on website" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(forwardReviewSubmission({ name: "Alex Visitor", email: "alex@example.test", rating: 5, feedback: "Test review submission.", consentConfirmed: true })).resolves.toEqual({ requestId: "review_001", status: "Displayed on website" });

    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
      intakeSecret: "staff-only-secret",
      kind: "review",
      review: { name: "Alex Visitor", email: "alex@example.test", rating: 5, feedback: "Test review submission.", consentConfirmed: true },
    });
  });

  it("does not accept an unexpected published-like status", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true, requestId: "review_002", status: "Pending staff review" }), { status: 200 })));
    await expect(forwardReviewSubmission({ name: "Alex Visitor", email: "alex@example.test", rating: 4, feedback: "Test review payload.", consentConfirmed: true })).rejects.toThrow("was not displayed");
  });

  it("returns no public reviews when the source contains no displayed entries", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true, reviews: [] }), { status: 200 })));
    await expect(listDisplayedReviews()).resolves.toEqual([]);
  });

  it("keeps private review fields out of the public response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true, reviews: [{ id: "review_003", displayName: "Alex Visitor", rating: 4, feedback: "QA review payload.", email: "alex@example.test", staffNotes: "Private" }, { id: "bad", displayName: "", rating: 5, feedback: "Ignored" }] }), { status: 200 })));
    await expect(listDisplayedReviews()).resolves.toEqual([{ id: "review_003", displayName: "Alex Visitor", rating: 4, feedback: "QA review payload." }]);
  });
});
