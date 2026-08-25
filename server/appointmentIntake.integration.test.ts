import { describe, expect, it } from "vitest";

type IntakeProbe = {
  ok: boolean;
  error?: string;
};

describe.skipIf(!process.env.GOOGLE_APPS_SCRIPT_INTAKE_URL)("Apps Script appointment intake", () => {
  it("accepts the configured server secret while rejecting an intentionally incomplete request without appending a row", async () => {
    const endpoint = process.env.GOOGLE_APPS_SCRIPT_INTAKE_URL;
    const intakeSecret = process.env.APPOINTMENT_INTAKE_SECRET;

    expect(intakeSecret, "APPOINTMENT_INTAKE_SECRET must be configured").toBeTruthy();

    const response = await fetch(endpoint!, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ intakeSecret, request: {} }),
      signal: AbortSignal.timeout(25_000),
    });

    expect(response.ok).toBe(true);
    const payload = (await response.json()) as IntakeProbe;
    expect(payload).toEqual({
      ok: false,
      error: "missing_required_fields",
      fields: ["name", "email", "phone", "petName", "message"],
    });
  }, 30_000);
});
