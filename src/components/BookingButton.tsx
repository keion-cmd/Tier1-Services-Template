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

interface BookingButtonProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "onClick">,
    VariantProps<typeof buttonVariants> {
  label: string;
  icon?: boolean;
  iconSize?: number;
}

export const BookingButton = forwardRef<HTMLButtonElement, BookingButtonProps>(
  ({ label, icon = true, iconSize = 16, variant = "default", size = "lg", className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button
          ref={ref}
          type="button"
          onClick={() => setIsOpen(true)}
          className={cn(buttonVariants({ variant, size }), "rounded-full", className)}
          {...props}
        >
          {label}
          {icon && <ArrowUpRight size={iconSize} aria-hidden="true" />}
        </button>
        <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  }
);
BookingButton.displayName = "BookingButton";
