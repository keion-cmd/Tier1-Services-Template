"use client";

/**
 * Floating AI receptionist — stateful orchestrator. Ported/restructured from the old
 * Vite ChatWidget.tsx (session id, welcome message, quick replies) plus behavior
 * patterns mirrored from my-healthcare-site's ChatBot.tsx (auto-open timer, exit-intent,
 * local regex short-circuits, 3-message lead-capture state machine, inline booking prompt).
 *
 * The actual answer engine stays chatEngine.ts's pure client-side keyword/FAQ matching
 * against business-content.ts — there is zero required server round-trip, so the chat
 * works out of the box with no env vars configured. submitChatLead() below is a
 * best-effort, fire-and-forget POST to /api/chat, which persists to Supabase's
 * chat_interactions table — wrapped in try/catch so a failed/misconfigured endpoint
 * can never break the chat UI.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { businessConfig, copy } from "@/lib/business-content";
import { getChatResponse, getInitialQuickReplies, getQuickReplies, type QuickReply } from "@/lib/chatEngine";
import { ChatButton } from "@/components/chat/ChatButton";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { BookingPrompt } from "@/components/chat/BookingPrompt";
import type { ChatMessage, ChatLeadPayload, QuickAction } from "@/types/chat";

type LeadStep = "idle" | "offered" | "asked_name" | "asked_phone" | "done";

const AUTO_OPEN_DELAY_MS = 30_000;
const LEAD_OFFER_AFTER_MESSAGES = 3;
const SESSION_STORAGE_AUTO_OPEN_KEY = "chat_auto_opened";
const SESSION_STORAGE_EXIT_INTENT_KEY = "chat_exit_intent";

const BOOK_ACTION: QuickAction = { id: "always-book", label: "Book an Appointment", action: "book" };
const CALL_ACTION: QuickAction = { id: "always-call", label: `Call ${businessConfig.phone}`, action: "call" };
const ASK_ACTION: QuickAction = { id: "ia-ask", label: "Ask a Question", action: "ask" };

function uid(): string {
  return Math.random().toString(36).slice(2, 11);
}

function generateSessionId(): string {
  return `chat_${Date.now()}_${uid()}`;
}

function botMsg(content: string, actions?: QuickAction[]): ChatMessage {
  return { id: uid(), type: "bot", content, timestamp: new Date(), actions };
}

function userMsg(content: string): ChatMessage {
  return { id: uid(), type: "user", content, timestamp: new Date() };
}

/** Maps chatEngine.ts's QuickReply (its own suggested-follow-up-question model) onto the
 * richer QuickAction shape the new chat UI renders. "book" becomes a real book action
 * (renders the BookingButton inline); everything else resends its value as the next
 * user message, letting chatEngine.ts answer it exactly as it does today. */
function toQuickAction(reply: QuickReply): QuickAction {
  if (reply.key === "book") return { id: reply.key, label: "Book an Appointment", action: "book" };
  return { id: reply.key, label: reply.label, action: "faq", value: reply.value };
}

function greetingRegexMatch(text: string): boolean {
  return /^(hi|hello|hey|good morning|good afternoon|good evening|howdy)\b/i.test(text.trim());
}

function farewellRegexMatch(text: string): boolean {
  return /^(bye|goodbye|thanks|thank you|that's all|thats all|done)\b/i.test(text.trim());
}

function humanRegexMatch(text: string): boolean {
  return /\b(human|representative|agent|real person|someone|talk to a person)\b/i.test(text);
}

/** Best-effort lead sync — fire-and-forget, never blocks or throws into the UI. */
function submitChatLead(payload: ChatLeadPayload) {
  fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {
    /* Network or Supabase failure here must never surface to the user. */
  });
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [hasNotification, setHasNotification] = useState(true);
  const [leadStep, setLeadStep] = useState<LeadStep>("idle");
  const [leadName, setLeadName] = useState("");
  const [showBookingPrompt, setShowBookingPrompt] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const initialized = useRef(false);

  const respond = useCallback((content: string, actions?: QuickAction[], delay = 600) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev.map((m) => (m.type === "bot" ? { ...m, actions: undefined } : m)), botMsg(content, actions)]);
    }, delay);
  }, []);

  const initChat = useCallback(() => {
    if (initialized.current) return;
    initialized.current = true;
    setSessionId(generateSessionId());
    setMessages([botMsg(copy.chat.greetingMessage, [BOOK_ACTION, ASK_ACTION])]);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) {
        initChat();
        setHasNotification(false);
      }
      return !prev;
    });
  }, [initChat]);

  // Auto-open after a delay, once per browser session (sessionStorage-gated).
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_STORAGE_AUTO_OPEN_KEY)) return;
    const timer = setTimeout(() => {
      sessionStorage.setItem(SESSION_STORAGE_AUTO_OPEN_KEY, "1");
      setIsOpen(true);
      setHasNotification(false);
      initChat();
    }, AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, [initChat]);

  // Exit intent — mouse leaves the top of the viewport, once per browser session.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.clientY >= 0) return;
      if (isOpen) return;
      if (sessionStorage.getItem(SESSION_STORAGE_EXIT_INTENT_KEY)) return;
      sessionStorage.setItem(SESSION_STORAGE_EXIT_INTENT_KEY, "1");
      setIsOpen(true);
      setHasNotification(false);
      initChat();
    };
    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, [isOpen, initChat]);

  const handleLeadFlow = useCallback(
    (text: string): boolean => {
      if (leadStep === "offered") {
        if (/yes|sure|ok|okay|please|yep|yeah/i.test(text)) {
          setLeadStep("asked_name");
          respond(copy.chat.leadCaptureAskNameMessage);
        } else {
          setLeadStep("done");
          respond(copy.chat.leadCaptureDeclineMessage);
        }
        return true;
      }

      if (leadStep === "asked_name") {
        setLeadName(text);
        setLeadStep("asked_phone");
        respond(copy.chat.leadCaptureAskPhoneMessage);
        return true;
      }

      if (leadStep === "asked_phone") {
        setLeadStep("done");
        respond(copy.chat.leadCaptureThankYouMessage);
        submitChatLead({ sessionId, userName: leadName, userPhone: text, status: "active", messageCount });
        return true;
      }

      return false;
    },
    [leadStep, leadName, messageCount, respond, sessionId]
  );

  const handleSendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      setMessages((prev) => [...prev, userMsg(trimmed)]);
      setConversationStarted(true);
      const newCount = messageCount + 1;
      setMessageCount(newCount);

      // Lead capture flow takes priority once offered.
      if (leadStep !== "idle" && leadStep !== "done") {
        handleLeadFlow(trimmed);
        return;
      }

      // Local short-circuits — handled before chatEngine's keyword matching.
      if (greetingRegexMatch(trimmed)) {
        respond(copy.chat.greetingMessage, getInitialQuickReplies().map(toQuickAction));
        return;
      }
      if (farewellRegexMatch(trimmed)) {
        respond(copy.chat.farewellMessage);
        return;
      }
      if (humanRegexMatch(trimmed)) {
        respond(copy.chat.humanHandoffMessage, [CALL_ACTION, BOOK_ACTION]);
        return;
      }

      // Fall back to chatEngine.ts's rule-based FAQ/keyword matching.
      const response = getChatResponse(trimmed);
      respond(response.text, getQuickReplies(response.topic).map(toQuickAction));

      // Offer a callback after a few questions, once per session.
      if (newCount >= LEAD_OFFER_AFTER_MESSAGES && leadStep === "idle") {
        setTimeout(() => {
          setLeadStep("offered");
          setMessages((prev) => [
            ...prev,
            botMsg(copy.chat.leadCaptureOfferMessage, [
              { id: "lc-yes", label: "Yes, please call me", action: "callback" },
              { id: "lc-no", label: "No thanks", action: "faq", value: "no" },
              BOOK_ACTION,
            ]),
          ]);
        }, 2500);
      }
    },
    [messageCount, leadStep, handleLeadFlow, respond]
  );

  const handleAction = useCallback(
    (action: QuickAction) => {
      if (action.action === "ask") {
        setConversationStarted(true);
        respond("What would you like to know?", getInitialQuickReplies().map(toQuickAction), 300);
        return;
      }

      if (action.value === "no") {
        setMessages((prev) => [...prev, userMsg("No thanks")]);
        setLeadStep("done");
        respond(copy.chat.leadCaptureDeclineMessage);
        return;
      }

      switch (action.action) {
        case "callback":
          setMessages((prev) => [...prev, userMsg("Yes, please call me")]);
          setLeadStep("asked_name");
          setConversationStarted(true);
          respond(copy.chat.leadCaptureAskNameMessage);
          break;

        case "human":
          setMessages((prev) => [...prev, userMsg("Can I talk to someone?")]);
          setConversationStarted(true);
          respond(copy.chat.humanHandoffMessage, [CALL_ACTION, BOOK_ACTION]);
          break;

        case "faq":
          if (action.value) handleSendMessage(action.value);
          break;

        case "book":
          setShowBookingPrompt(true);
          submitChatLead({ sessionId, ledToBooking: true, status: "converted", messageCount });
          break;

        case "call":
        case "contact":
        case "label":
          // "call" is a real tel: link (handled by the anchor itself in QuickActions);
          // "label" is inert separator text. Nothing further to do here.
          break;
      }
    },
    [handleSendMessage, messageCount, respond, sessionId]
  );

  return (
    <div className="fixed right-4 bottom-[calc(var(--mobile-bar-height)+1.5rem)] z-50 flex flex-col items-end gap-3 sm:right-6 xl:bottom-6">
      {showBookingPrompt && (
        <BookingPrompt
          onCallbackRequest={() => {
            setShowBookingPrompt(false);
            setLeadStep("asked_name");
            setConversationStarted(true);
            setMessages((prev) => [...prev, botMsg(copy.chat.leadCaptureAskNameMessage)]);
          }}
        />
      )}

      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
        onAction={handleAction}
        conversationStarted={conversationStarted}
      />

      <ChatButton isOpen={isOpen} onClick={handleToggle} hasNotification={hasNotification} />
    </div>
  );
}
