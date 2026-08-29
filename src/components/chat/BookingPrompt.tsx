"use client";

import { CalendarDays } from "lucide-react";
import { BookingButton } from "@/components/BookingButton";
import { copy } from "@/lib/business-content";

interface BookingPromptProps {
  onCallbackRequest: () => void;
}

export function BookingPrompt({ onCallbackRequest }: BookingPromptProps) {
  return (
    <div className="mx-1 my-2 rounded-xl border-2 border-primary/40 bg-secondary/50 p-4">
      <div className="mb-2 flex items-center gap-2">
        <CalendarDays size={17} className="shrink-0 text-primary" />
        <span className="text-sm font-bold text-foreground">{copy.chat.bookingPromptHeading}</span>
      </div>
      <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{copy.chat.bookingPromptMessage}</p>
      <div className="flex flex-col gap-2">
        <BookingButton label="Book Appointment Now" size="sm" className="w-full justify-center !text-xs" />
        <button
          type="button"
          onClick={onCallbackRequest}
          className="w-full rounded-lg border-2 border-primary px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
        >
          Request a Callback
        </button>
      </div>
    </div>
  );
}
