import { afterEach, describe, expect, it, vi } from "vitest";
import { forwardAppointmentRequest } from "./appointmentIntake";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("forwardAppointmentRequest", () => {
  it("sends a validated pending-review request to the configured server-only intake endpoint", async () => {
    vi.stubEnv("GOOGLE_APPS_SCRIPT_INTAKE_URL", "https://example.test/intake");
    vi.stubEnv("APPOINTMENT_INTAKE_SECRET", "test-only-shared-secret");
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true, requestId: "req_123", status: "Pending staff review" }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      forwardAppointmentRequest({
        name: "Alex Visitor",
        email: "alex@example.test",
        phone: "555-0100",
        petName: "Milo",
        service: "Wellness visits",
        preferredDate: "2026-08-30",
        message: "Routine wellness question.",
        consentConfirmed: true,
      }),
    ).resolves.toEqual({ requestId: "req_123", status: "Pending staff review" });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.test/intake",
      expect.objectContaining({ method: "POST" }),
    );
  });
});
