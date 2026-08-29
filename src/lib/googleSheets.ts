import type { BookingRecord } from "@/types/booking";
import type { IntakeRecord } from "@/types/intake";

// Optional, best-effort secondary sync to a Google Apps Script web app that appends
// rows to a Sheet. Never blocks the primary Supabase write — see app/api/booking/route.ts,
// which calls this inside a Promise.allSettled.
function getScriptUrl(): string | null {
  const url = process.env.GOOGLE_SHEETS_SCRIPT_URL;
  if (!url) return null;
  return url;
}

async function postToSheets(payload: object, url: string | null = getScriptUrl()): Promise<boolean> {
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

// TYPE B (clone-request) sync — deliberately posts to a separate Apps Script
// web app/sheet from the TYPE A functions above, via GOOGLE_SHEETS_INTAKE_SCRIPT_URL,
// so prospective-owner intake leads never land in the same sheet as end-customer bookings.
export async function syncCloneRequestToSheets(record: IntakeRecord): Promise<boolean> {
  const sectionContentSummary = Object.entries(record.sectionContent)
    .filter(([, hasContent]) => hasContent)
    .map(([key]) => key)
    .join(", ");

  return postToSheets(
    {
      type: "clone_request",
      businessName: record.businessName,
      contactName: record.contactName,
      contactEmail: record.contactEmail,
      contactPhone: record.contactPhone,
      niche: record.niche,
      numberOfLocations: record.numberOfLocations,
      currentBookingSystem: record.currentBookingSystem || "",
      notes: record.notes || "",
      sectionContent: sectionContentSummary,
    },
    process.env.GOOGLE_SHEETS_INTAKE_SCRIPT_URL || null
  );
}
