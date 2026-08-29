import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const chatLeadSchema = z.object({
  sessionId: z.string().min(1, "sessionId is required"),
  userName: z.string().optional(),
  userPhone: z.string().optional(),
  questionAsked: z.string().optional(),
  ledToBooking: z.boolean().optional(),
  messageCount: z.number().optional(),
  status: z.enum(["active", "completed", "abandoned", "converted"]).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = chatLeadSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Invalid payload", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { sessionId, userName, userPhone, questionAsked, ledToBooking, messageCount, status } = result.data;

    const { error: upsertError } = await supabaseAdmin
      .from("chat_interactions")
      .upsert(
        {
          session_id: sessionId,
          ...(userName ? { lead_name: userName } : {}),
          ...(userPhone ? { lead_phone: userPhone } : {}),
          message_count: messageCount ?? 0,
          converted: ledToBooking ?? false,
          transcript: { questionAsked, status },
          updated_at: new Date().toISOString(),
        },
        { onConflict: "session_id" }
      );

    if (upsertError) {
      console.error("Supabase chat_interactions upsert error:", upsertError);
      return NextResponse.json({ success: false, message: "Failed to save chat lead." }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong." }, { status: 500 });
  }
}
