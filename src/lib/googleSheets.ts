import type { BookingRecord } from "@/types/booking";

// Optional, best-effort secondary sync to a Google Apps Script web app that appends
// rows to a Sheet. Never blocks the primary Supabase write — see app/api/booking/route.ts,
// which calls this inside a Promise.allSettled.
function getScriptUrl(): string | null {
  const url = process.env.GOOGLE_SHEETS_SCRIPT_URL;
  if (!url) return null;
  return url;
}

async function postToSheets(payload: object): Promise<boolean> {
  const url = getScriptUrl();
  if (!url) return false;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
      signal: controller.signal,
      redirect: "follow",
    });
    clearTimeout(timeoutId);
    const result = await response.json();
    return result.status === "success";
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Google Sheets sync failed:", error);
    return false;
  }
}

export async function syncBookingToSheets(record: BookingRecord): Promise<boolean> {
  return postToSheets({
    type: "booking",
    reference: record.reference,
    fullName: record.fullName,
    phone: record.phone,
    email: record.email,
    serviceInterest: record.serviceInterest,
    insuranceProvider: record.insuranceProvider,
    ...(record.otherInsurance ? { otherInsurance: record.otherInsurance } : {}),
    notes: record.notes,
  });
}

interface AppointmentSheetRecord {
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  service?: string;
  insurance?: string;
  message?: string;
  pageSource?: string;
  status?: string;
}

export async function syncAppointmentToSheets(record: AppointmentSheetRecord): Promise<boolean> {
  return postToSheets({
    type: "appointment",
    firstName: record.firstName,
    lastName: record.lastName,
    phone: record.phone || "",
    email: record.email || "",
    service: record.service || "",
    insurance: record.insurance || "",
    message: record.message || "",
    pageSource: record.pageSource || "",
    status: record.status || "New Lead",
  });
}
