"use client";

import { useCallback, useState } from "react";
import { businessConfig } from "@/lib/business-content";
import { BOOKING_URL } from "@/lib/booking";

/** Shared "trigger the booking action" logic for both BookingButton and the chat
 * widget's direct-booking handler: opens BookingModal in "modal" bookingMode, or
 * navigates to BOOKING_URL in "external" mode (never opens a modal in that case). */
export function useBookingAction(onOpenChange?: (open: boolean) => void) {
  const [isOpen, setIsOpen] = useState(false);
  const isExternal = businessConfig.bookingMode === "external";

  const trigger = useCallback(() => {
    if (isExternal) {
      window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
      return;
    }
    setIsOpen(true);
    onOpenChange?.(true);
  }, [isExternal, onOpenChange]);

  const close = useCallback(() => {
    setIsOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  return { isExternal, isOpen, trigger, close };
}
