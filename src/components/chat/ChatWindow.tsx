"use client";

/**
 * Presentational chat shell: initial-state (greeting + big CTA buttons) vs
 * conversation-state (scrollable message list + input). All state lives in the
 * ChatWidget orchestrator — this component just renders it.
 */
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { businessConfig, copy } from "@/lib/business-content";
import type { ChatMessage as ChatMessageType, QuickAction } from "@/types/chat";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessageType[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onAction: (action: QuickAction) => void;
  conversationStarted: boolean;
}

export function ChatWindow({
  isOpen,
  onClose,
  messages,
  isTyping,
  onSendMessage,
  onAction,
  conversationStarted,
}: ChatWindowProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isInitialState = !conversationStarted && messages.length <= 1 && messages.every((m) => m.type === "bot");
  const initialActions = isInitialState ? messages[0]?.actions : undefined;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isInitialState && isOpen) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => window.clearTimeout(id);
    }
  }, [isInitialState, isOpen]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    onSendMessage(input);
    setInput("");
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex w-[340px] max-w-[calc(100vw-2rem)] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          style={{ height: isInitialState ? "auto" : "520px", maxHeight: "calc(100vh - 8rem)" }}
          role="dialog"
          aria-label="Chat assistant"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-4 py-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">{copy.chat.chatWithLabel}</p>
              <p className="truncate text-[15px] font-bold text-foreground">{copy.chat.windowTitle}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close chat"
            >
              <X size={15} className="text-muted-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="overflow-y-auto p-3"
            style={{ minHeight: isInitialState ? "80px" : undefined, flex: isInitialState ? "none" : "1 1 0" }}
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.map((message) => (
              <ChatMessage key={message.id} message={isInitialState ? { ...message, actions: undefined } : message} onAction={onAction} />
            ))}

            {isTyping && (
              <div className="mb-3 flex items-start gap-2">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary">
                  <MessageCircle size={14} />
                </div>
                <div className="rounded-2xl rounded-tl-sm border border-border bg-background px-4 py-3 shadow-sm">
                  <div className="flex h-4 items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
                        style={{ animationDelay: `${i * 0.12}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Initial CTA buttons OR conversation input */}
          {isInitialState && initialActions ? (
            <div className="flex shrink-0 flex-col gap-2 px-3 pt-2 pb-3">
              {initialActions.map((action) =>
                action.action === "book" ? (
                  <a
                    key={action.id}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onAction(action);
                    }}
                    className="flex w-full items-center justify-center rounded-xl bg-primary py-3.5 text-[15px] font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                  >
                    {action.label}
                  </a>
                ) : (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => onAction(action)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary bg-background py-3.5 text-[15px] font-semibold text-primary transition-colors hover:bg-primary/10"
                  >
                    {action.action === "ask" && <MessageCircle size={16} />}
                    {action.label}
                  </button>
                )
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex shrink-0 items-center gap-2 border-t border-border p-3">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={copy.chat.inputPlaceholder}
                className="min-w-0 flex-1"
                aria-label="Chat message"
                disabled={isTyping}
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isTyping} aria-label="Send message" className="shrink-0">
                <Send className="size-4" />
              </Button>
            </form>
          )}

          <p className="sr-only">{businessConfig.name}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
