"use client";

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuickActions } from "@/components/chat/QuickActions";
import type { ChatMessage as ChatMessageType, QuickAction } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
  onAction: (action: QuickAction) => void;
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(date);
}

export function ChatMessage({ message, onAction }: ChatMessageProps) {
  const isBot = message.type === "bot";

  return (
    <div className={cn("mb-3 flex", isBot ? "items-start gap-2" : "justify-end")}>
      {isBot && (
        <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary">
          <MessageCircle size={14} />
        </div>
      )}

      <div className={cn("flex max-w-[85%] flex-col", isBot ? "items-start" : "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed break-words",
            isBot ? "rounded-tl-sm bg-muted text-foreground" : "rounded-tr-sm bg-primary text-primary-foreground shadow-md"
          )}
        >
          {message.content.split("\n").map((line, index) => (
            <p key={index} className={index > 0 ? "mt-1" : undefined}>
              {line}
            </p>
          ))}
        </div>

        <span className="mt-1 px-1 text-[10px] text-muted-foreground">{formatTime(message.timestamp)}</span>

        {isBot && message.actions && message.actions.length > 0 && (
          <QuickActions actions={message.actions} onAction={onAction} />
        )}
      </div>
    </div>
  );
}
