/**
 * Reusable external booking CTA — every appointment/request action on the site
 * routes through this component to the single centralized Calendly URL.
 */
import { forwardRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/booking";

interface BookingButtonProps extends Omit<React.ComponentPropsWithoutRef<"a">, "href" | "target" | "rel"> {
  label: string;
  icon?: boolean;
  iconSize?: number;
}

export const BookingButton = forwardRef<HTMLAnchorElement, BookingButtonProps>(
  ({ label, icon = true, iconSize = 15, className, ...props }, ref) => (
    <a
      ref={ref}
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {label}
      {icon && <ArrowUpRight size={iconSize} aria-hidden="true" />}
    </a>
  )
);
BookingButton.displayName = "BookingButton";
