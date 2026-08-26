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
import { getChatResponse, suggestedQuestions } from "@/lib/chatEngine";

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
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([welcomeMessage()]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    const viewport = scrollWrapperRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement | null;
    if (viewport) {
      requestAnimationFrame(() => {
        viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" });
      });
    }
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const response = getChatResponse(trimmed);
      setMessages((prev) => [...prev, { role: "bot", content: response }]);
      setIsTyping(false);
    }, 500);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const showSuggestions = messages.length <= 1 && suggestedQuestions.length > 0;

  const conversation = (
    <>
      <div ref={scrollWrapperRef} className="min-h-0 flex-1">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-3 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
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

            {showSuggestions && (
              <div className="flex flex-wrap gap-2 pt-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => sendMessage(question)}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-left text-xs transition-colors hover:bg-accent"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t p-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
          aria-label="Chat message"
        />
        <Button type="submit" size="icon" disabled={!input.trim()} aria-label="Send message">
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
        className="fixed bottom-6 right-6 z-50 size-14 rounded-full shadow-lg transition-all duration-300"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </Button>

      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="bottom" className="flex h-[85vh] flex-col gap-0 p-0">
            <SheetHeader className="border-b p-4">
              <SheetTitle>{businessConfig.shortName} Receptionist</SheetTitle>
            </SheetHeader>
            {conversation}
          </SheetContent>
        </Sheet>
      ) : (
        <div
          className={cn(
            "fixed bottom-24 right-6 z-50 w-[380px] origin-bottom-right transition-all duration-300",
            open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
          )}
        >
          <Card className="flex h-[520px] flex-col gap-0 overflow-hidden py-0 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between gap-2 border-b py-4">
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
