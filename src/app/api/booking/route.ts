import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { syncBookingToSheets, syncAppointmentToSheets } from "@/lib/googleSheets";
import type { BookingRecord } from "@/types/booking";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  phone: z.string().min(10, "Please enter a valid phone number").max(20),
  email: z.string().email("Please enter a valid email address"),
  serviceInterest: z.string().min(1, "Please select a service"),
  insuranceProvider: z.string().min(1, "Please select an insurance provider"),
  otherInsurance: z.string().optional(),
  notes: z.string().min(10, "Please provide at least 10 characters").max(1000),
  pageSource: z.string().optional(),
  smsConsent: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = bookingSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Please fix the errors below", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { fullName, phone, email, serviceInterest, insuranceProvider, otherInsurance, notes, pageSource } = result.data;

    const smsConsent = result.data.smsConsent === true;
    const smsConsentTimestamp = smsConsent ? new Date().toISOString() : null;

    const { data: record, error: insertError } = await supabaseAdmin
      .from("bookings")
      .insert({
        full_name: fullName,
        phone,
        email,
        service_interest: serviceInterest,
        insurance_provider: insuranceProvider,
        ...(otherInsurance ? { other_insurance: otherInsurance } : {}),
        notes,
        sms_consent: smsConsent,
        sms_consent_timestamp: smsConsentTimestamp,
        page_source: pageSource || request.headers.get("referer") || null,
      })
      .select("*")
      .single();

    if (insertError || !record) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json({ success: false, message: "Failed to save booking. Please try again." }, { status: 500 });
    }

    const bookingRecord: BookingRecord = {
      id: record.id,
      reference: record.reference,
      fullName,
      phone,
      email,
      serviceInterest,
      insuranceProvider,
      otherInsurance,
      notes,
      smsConsent,
      status: record.status,
      created_at: record.created_at,
      updated_at: record.updated_at,
    };

    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";
    const source = pageSource || request.headers.get("referer") || "";

    // Secondary syncs (appointments mirror row + Google Sheets webhook) run in parallel and
    // never block the success response — a Sheets or mirror-row failure here still returns 200.
    const [sheetsResult] = await Promise.allSettled([
      syncBookingToSheets(bookingRecord),
      syncAppointmentToSheets({
        firstName,
        lastName,
        phone,
        email,
        service: serviceInterest,
        insurance: insuranceProvider,
        message: notes,
        pageSource: source,
        status: "New Lead",
      }),
      supabaseAdmin.from("appointments").insert({
        booking_id: record.id,
        first_name: firstName,
        last_name: lastName,
        phone,
        email,
        service: serviceInterest,
        insurance: insuranceProvider,
        message: notes,
        page_source: source,
        status: "New Lead",
      }),
    ]);

    if (sheetsResult.status === "fulfilled" && sheetsResult.value) {
      supabaseAdmin
        .from("bookings")
        .update({ synced_to_sheets: true, sheets_sync_at: new Date().toISOString() })
        .eq("id", record.id)
        .then(() => {});
    }

    return NextResponse.json({ success: true, message: "Booking submitted successfully", reference: record.reference }, { status: 200 });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
