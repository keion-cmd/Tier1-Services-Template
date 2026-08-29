import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { syncCloneRequestToSheets } from "@/lib/googleSheets";
import type { IntakeRecord } from "@/types/intake";

const intakeSchema = z.object({
  businessName: z.string().min(1, "Business name is required").max(150),
  contactName: z.string().min(1, "Contact name is required").max(100),
  contactEmail: z.string().email("Please enter a valid email address"),
  contactPhone: z.string().min(1, "Contact phone is required").max(20),
  niche: z.string().min(1, "Please describe your business type"),
  numberOfLocations: z.number().int().min(1, "Must be at least 1 location"),
  currentBookingSystem: z.string().max(200).optional(),
  notes: z.string().max(2000).optional(),
});

// Best-effort webhook notify (e.g. Slack/email/Zapier consumer). Never blocks the
// response — mirrors the Google Sheets sync pattern in src/lib/googleSheets.ts.
async function notifyWebhook(record: IntakeRecord): Promise<boolean> {
  const url = process.env.INTAKE_NOTIFY_WEBHOOK_URL;
  if (!url) return false;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "clone_request", ...record }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Intake notify webhook failed:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = intakeSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Please fix the errors below", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { businessName, contactName, contactEmail, contactPhone, niche, numberOfLocations, currentBookingSystem, notes } = result.data;

    const { data: record, error: insertError } = await supabaseAdmin
      .from("clone_requests")
      .insert({
        business_name: businessName,
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        niche,
        number_of_locations: numberOfLocations,
        ...(currentBookingSystem ? { current_booking_system: currentBookingSystem } : {}),
        ...(notes ? { notes } : {}),
      })
      .select("*")
      .single();

    if (insertError || !record) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json({ success: false, message: "Failed to save your request. Please try again." }, { status: 500 });
    }

    const intakeRecord: IntakeRecord = {
      id: record.id,
      businessName,
      contactName,
      contactEmail,
      contactPhone,
      niche,
      numberOfLocations,
      currentBookingSystem,
      notes,
      created_at: record.created_at,
    };

    // Secondary syncs (Sheets + webhook notify) run in parallel and never block the
    // success response — a failure here still returns 200, same as /api/booking.
    await Promise.allSettled([syncCloneRequestToSheets(intakeRecord), notifyWebhook(intakeRecord)]);

    return NextResponse.json({ success: true, message: "Request submitted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Intake API error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
