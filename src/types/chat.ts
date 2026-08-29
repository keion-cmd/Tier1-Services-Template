/**
 * Chat widget types — genericized shape ported from my-healthcare-site's types/chat.ts.
 * No client-specific fields; every string value at runtime is sourced from
 * business-content.ts / chatEngine.ts, never hardcoded business content.
 */

export type QuickActionType = "book" | "call" | "faq" | "contact" | "callback" | "ask" | "human" | "label";

export interface QuickAction {
  id: string;
  label: string;
  action: QuickActionType;
  value?: string;
}

export interface ChatMessage {
  id: string;
  type: "user" | "bot" | "system";
  content: string;
  timestamp: Date;
  actions?: QuickAction[];
}

export interface LeadInfo {
  name?: string;
  phone?: string;
}

export interface ChatSession {
  sessionId: string;
  startedAt: Date;
  leadInfo: LeadInfo;
  messages: ChatMessage[];
  ledToBooking: boolean;
  messageCount: number;
  status: "active" | "completed" | "abandoned" | "converted";
}

export type ChatIntent = "greeting" | "question" | "booking" | "contact" | "farewell" | "unknown";

/** Payload shape for the optional Phase 5 /api/chat lead-sync endpoint. */
export interface ChatLeadPayload {
  sessionId: string;
  userName?: string;
  userPhone?: string;
  questionAsked?: string;
  ledToBooking?: boolean;
  messageCount?: number;
  status?: ChatSession["status"];
}
