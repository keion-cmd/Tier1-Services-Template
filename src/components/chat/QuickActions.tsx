"use client";

import { ChevronRight } from "lucide-react";
import { BookingButton } from "@/components/BookingButton";
import { businessConfig } from "@/lib/business-content";
import type { QuickAction } from "@/types/chat";

interface QuickActionsProps {
  actions: QuickAction[];
  onAction: (action: QuickAction) => void;
  /** Fired when the inline "book" action opens the BookingModal, so the chat window
   * can close itself and not stay mounted behind the modal. */
  onBookingModalOpen?: () => void;
}

const btnClass =
  "group flex items-start gap-2 rounded-xl border border-border bg-background px-3.5 py-2 text-left text-xs font-medium text-foreground shadow-sm transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function QuickActions({ actions, onAction, onBookingModalOpen }: QuickActionsProps) {
  return (
    <div className="mt-2 flex w-full flex-col gap-1.5">
      {actions.map((action) => {
        // Booking action — render the shared BookingButton inline instead of a text bubble.
        if (action.action === "book") {
          return (
            <BookingButton
              key={action.id}
              label={action.label}
              size="sm"
              className="w-full justify-center !py-2 !text-xs"
              onOpenChange={(open) => {
                if (open) onBookingModalOpen?.();
              }}
            />
          );
        }

        // Call action — tel: link using the business's canonical phone number.
        if (action.action === "call") {
          return (
            <a
              key={action.id}
              href={`tel:${businessConfig.phoneDigits}`}
              onClick={() => onAction(action)}
              className={btnClass}
            >
              <span className="min-w-0 flex-1 break-words leading-snug">{action.label}</span>
              <ChevronRight size={12} className="shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
            </a>
          );
        }

        // Label/separator — renders as plain text, not a clickable control.
        if (action.action === "label") {
          return (
            <p key={action.id} className="mt-2 mb-0.5 px-1 text-xs font-semibold text-muted-foreground">
              {action.label}
            </p>
          );
        }

        // All other actions (faq, contact, callback, ask, human) — resend/trigger via onAction.
        return (
          <button key={action.id} type="button" onClick={() => onAction(action)} className={btnClass}>
            <span className="min-w-0 flex-1 break-words leading-snug">{action.label}</span>
            <ChevronRight size={12} className="shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
          </button>
        );
      })}
    </div>
  );
}
