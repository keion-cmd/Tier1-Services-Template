/**
 * Floating AI receptionist chat widget. Fully self-contained and data-driven —
 * see chatEngine.ts for the response logic, sourced from business-content.ts.
 * Renders on every route from App.tsx so it works automatically on every clone.
 */
import { useEffect, useRef, useState, type FormEvent } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useMobile";
import { businessConfig } from "@/lib/business-content";
import { getChatResponse, getInitialQuickReplies, getQuickReplies, type QuickReply } from "@/lib/chatEngine";

type ChatMessage = {
  role: "user" | "bot";
  content: string;
};

function welcomeMessage(): ChatMessage {
  return {
    role: "bot",
    content: `Hi! I'm the ${businessConfig.name} virtual receptionist. How can I help you today?`,
  };
}

export function ChatWidget() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([welcomeMessage()]);
      setQuickReplies(getInitialQuickReplies());
    }
  }, [open, messages.length]);

  useEffect(() => {
    if (open && !isMobile) {
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [open, isMobile]);

  useEffect(() => {
    const viewport = scrollWrapperRef.current?.querySelector?.(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement | null;
    if (viewport) {
      requestAnimationFrame(() => {
        viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" });
      });
    }
  }, [messages, isTyping, quickReplies]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setQuickReplies([]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const response = getChatResponse(trimmed);
      setMessages((prev) => [...prev, { role: "bot", content: response.text }]);
      setQuickReplies(getQuickReplies(response.topic));
      setIsTyping(false);
    }, 500);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const conversation = (
    <>
      <ScrollArea ref={scrollWrapperRef} className="min-h-0 flex-1">
        <div className="flex flex-col gap-3 p-4" aria-live="polite">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "min-w-0 max-w-[80%] rounded-2xl px-4 py-2 text-sm break-words whitespace-pre-line",
                  message.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-muted text-foreground"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2 text-sm text-muted-foreground">
                Typing...
              </div>
            </div>
          )}

          {!isTyping && quickReplies.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply.key}
                  type="button"
                  onClick={() => sendMessage(reply.value)}
                  className="min-w-0 max-w-full shrink-0 rounded-full border border-border bg-background px-3 py-1.5 text-left text-xs break-words transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {reply.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t p-3">
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="min-w-0 flex-1"
          aria-label="Chat message"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isTyping}
          aria-label="Send message"
          className="shrink-0"
        >
          <Send className="size-4" />
        </Button>
      </form>
    </>
  );

  return (
    <>
      <Button
        onClick={() => setOpen((prev) => !prev)}
        size="icon"
        className="fixed right-4 bottom-[calc(var(--mobile-bar-height)+1.5rem)] z-50 size-14 rounded-full shadow-lg transition-all duration-300 motion-reduce:transition-none sm:right-6 xl:bottom-6"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </Button>

      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="bottom"
            className="inset-x-0 bottom-[calc(var(--mobile-bar-height)+env(safe-area-inset-bottom,0px)+0.75rem)] flex h-[min(560px,calc(100dvh-96px))] flex-col gap-0 overflow-hidden rounded-t-2xl border p-0 shadow-2xl motion-reduce:transition-none"
          >
            <SheetHeader className="shrink-0 border-b p-4 pr-10">
              <SheetTitle>{businessConfig.shortName} Receptionist</SheetTitle>
            </SheetHeader>
            {conversation}
          </SheetContent>
        </Sheet>
      ) : (
        <div
          className={cn(
            "fixed right-4 bottom-24 z-50 w-[360px] max-w-[calc(100vw-2rem)] origin-bottom-right transition-all duration-300 motion-reduce:transition-none sm:right-6 sm:w-[380px]",
            open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
          )}
          aria-hidden={!open}
        >
          <Card className="flex h-[min(560px,calc(100dvh-120px))] flex-col gap-0 overflow-hidden py-0 shadow-2xl">
            <CardHeader className="flex shrink-0 flex-row items-center justify-between gap-2 border-b py-4">
              <CardTitle className="text-base">{businessConfig.shortName} Receptionist</CardTitle>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <X className="size-4" />
              </Button>
            </CardHeader>
            {conversation}
          </Card>
        </div>
      )}
    </>
  );
}
