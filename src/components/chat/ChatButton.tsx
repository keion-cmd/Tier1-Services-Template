"use client";

import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  hasNotification?: boolean;
}

export function ChatButton({ isOpen, onClick, hasNotification = false }: ChatButtonProps) {
  return (
    <div className="relative">
      {/* Pulse ring — only when a notification is active */}
      {!isOpen && hasNotification && (
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" aria-hidden="true" />
      )}

      <button
        type="button"
        onClick={onClick}
        className={cn(
          "relative flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 motion-reduce:transition-none"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Notification badge */}
      {!isOpen && hasNotification && (
        <div className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-destructive text-[11px] font-bold text-destructive-foreground" aria-hidden="true">
          1
        </div>
      )}
    </div>
  );
}
