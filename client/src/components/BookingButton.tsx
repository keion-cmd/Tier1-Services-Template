/**
 * Reusable external booking CTA — every appointment/request action on the site
 * routes through this component to the single centralized Calendly URL.
 */
import { forwardRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BOOKING_URL } from "@/lib/booking";

interface BookingButtonProps
  extends Omit<React.ComponentPropsWithoutRef<"a">, "href" | "target" | "rel">,
    VariantProps<typeof buttonVariants> {
  label: string;
  icon?: boolean;
  iconSize?: number;
}

export const BookingButton = forwardRef<HTMLAnchorElement, BookingButtonProps>(
  ({ label, icon = true, iconSize = 16, variant = "default", size = "lg", className, ...props }, ref) => (
    <a
      ref={ref}
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant, size }), "rounded-full", className)}
      {...props}
    >
      {label}
      {icon && <ArrowUpRight size={iconSize} aria-hidden="true" />}
    </a>
  )
);
BookingButton.displayName = "BookingButton";
