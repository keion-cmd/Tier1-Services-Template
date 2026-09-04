/**
 * Reusable booking CTA — every appointment/request action on the site routes through
 * this component, which opens the in-page BookingModal (Supabase-backed booking flow).
 */
"use client";

import { forwardRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookingModal } from "@/components/booking/BookingModal";
import { BOOKING_URL } from "@/lib/booking";
import { useBookingAction } from "@/hooks/useBookingAction";

interface BookingButtonProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "onClick">,
    VariantProps<typeof buttonVariants> {
  label: string;
  icon?: boolean;
  iconSize?: number;
  /** Notified with the modal's open state — lets a parent (e.g. the chat widget)
   * coordinate its own UI (closing itself) when this button opens the booking modal.
   * Never fires in "external" bookingMode, since no modal opens. */
  onOpenChange?: (open: boolean) => void;
}

export const BookingButton = forwardRef<HTMLButtonElement, BookingButtonProps>(
  ({ label, icon = true, iconSize = 16, variant = "default", size = "lg", className, onOpenChange, ...props }, ref) => {
    const { isExternal, isOpen, trigger, close } = useBookingAction(onOpenChange);

    if (isExternal) {
      return (
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant, size }), "rounded-full", className)}
        >
          {label}
          {icon && (
            <span className="inline-flex items-center justify-center rounded-full bg-primary-foreground/15 p-1">
              <ArrowUpRight size={iconSize} aria-hidden="true" />
            </span>
          )}
        </a>
      );
    }

    return (
      <>
        <button
          ref={ref}
          type="button"
          onClick={trigger}
          className={cn(buttonVariants({ variant, size }), "rounded-full", className)}
          {...props}
        >
          {label}
          {icon && (
            <span className="inline-flex items-center justify-center rounded-full bg-primary-foreground/15 p-1">
              <ArrowUpRight size={iconSize} aria-hidden="true" />
            </span>
          )}
        </button>
        <BookingModal isOpen={isOpen} onClose={close} />
      </>
    );
  }
);
BookingButton.displayName = "BookingButton";
