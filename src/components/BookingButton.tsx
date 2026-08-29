/**
 * Reusable booking CTA — every appointment/request action on the site routes through
 * this component, which opens the in-page BookingModal (Supabase-backed booking flow).
 */
"use client";

import { forwardRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookingModal } from "@/components/booking/BookingModal";
import { businessConfig } from "@/lib/business-content";
import { BOOKING_URL } from "@/lib/booking";

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
    const [isOpen, setIsOpen] = useState(false);

    if (businessConfig.bookingMode === "external") {
      return (
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant, size }), "rounded-full", className)}
        >
          {label}
          {icon && <ArrowUpRight size={iconSize} aria-hidden="true" />}
        </a>
      );
    }

    const open = () => {
      setIsOpen(true);
      onOpenChange?.(true);
    };
    const close = () => {
      setIsOpen(false);
      onOpenChange?.(false);
    };

    return (
      <>
        <button
          ref={ref}
          type="button"
          onClick={open}
          className={cn(buttonVariants({ variant, size }), "rounded-full", className)}
          {...props}
        >
          {label}
          {icon && <ArrowUpRight size={iconSize} aria-hidden="true" />}
        </button>
        <BookingModal isOpen={isOpen} onClose={close} />
      </>
    );
  }
);
BookingButton.displayName = "BookingButton";
