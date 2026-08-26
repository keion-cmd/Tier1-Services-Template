/**
 * Fully data-driven rule-based chat engine for the AI Receptionist widget.
 * No external API calls — every response is derived from business-content.ts
 * and booking.ts, so a clone answers correctly the moment those tokens are filled in.
 */
import { faqs, services, staff, howItWorks, businessConfig, emergencyInfo, trustStats, type Service } from "@/lib/business-content";
import { BOOKING_URL } from "@/lib/booking";

const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "do", "does", "did", "doing", "have", "has", "had", "having",
  "i", "you", "your", "yours", "we", "our", "they", "it", "its", "he", "she",
  "what", "when", "where", "who", "why", "how", "which", "can", "could",
  "will", "would", "should", "may", "might", "must", "shall",
  "to", "of", "in", "on", "at", "for", "with", "about", "as", "by", "from",
  "and", "or", "but", "if", "so", "than", "that", "this", "these", "those",
  "my", "me", "us", "am", "im", "just", "please", "there", "here", "up",
  "out", "get", "got", "need", "want", "like", "some", "any", "all",
]);

function normalize(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function significantWords(input: string): string[] {
  return normalize(input)
    .split(" ")
    .filter((word) => word.length > 2 && !STOPWORDS.has(word));
}

function sharedWordCount(a: string[], b: string[]): number {
  const setB = new Set(b);
  let count = 0;
  for (const word of a) {
    if (setB.has(word)) count++;
  }
  return count;
}

function includesAny(normalizedInput: string, keywords: string[]): boolean {
  return keywords.some((keyword) => normalizedInput.includes(keyword));
}

const FAQ_LIST_KEYWORDS = ["faq", "faqs", "frequently asked", "common question", "common questions"];
const TEAM_KEYWORDS = ["team", "staff", "who works", "founder", "meet the", "employee", "employees"];
const SERVICES_LIST_KEYWORDS = ["service", "services", "offer", "offerings", "provide", "what do you do"];
const PROCESS_KEYWORDS = ["process", "how it works", "how does it work", "what happens", "steps involved", "workflow"];
const HOURS_KEYWORDS = ["open", "close", "closed", "closing", "hours", "when are you"];
const LOCATION_KEYWORDS = ["where", "address", "location", "directions", "located", "map"];
const CONTACT_KEYWORDS = [
  "call", "phone", "email", "contact", "reach", "number",
  "human", "person", "someone", "agent", "representative", "talk to",
];
const EMERGENCY_KEYWORDS = ["emergency", "urgent", "after hours", "afterhours", "urgently"];
const BOOKING_KEYWORDS = [
  "book", "appointment", "schedule", "reserve", "booking",
  "start a project", "get started", "new project", "hire you",
];
const PRICE_KEYWORDS = ["how much", "cost", "price", "pricing", "fee", "fees", "charge", "expensive", "budget"];
const STATS_KEYWORDS = [
  "how many", "how long have", "years of experience", "years in business",
  "track record", "reputation", "reviews", "rated", "rating", "stats", "statistics",
  "clients served", "customers served", "experience do you have",
];

export type ChatTopic =
  | "greeting"
  | "faq"
  | "team"
  | "services"
  | "process"
  | "location"
  | "contact"
  | "booking"
  | "pricing"
  | "stats"
  | "fallback";

export type QuickReplyKey = "services" | "pricing" | "team" | "location" | "faqs" | "book" | "contact";

export type QuickReply = {
  key: QuickReplyKey;
  label: string;
  value: string;
};

const QUICK_REPLY_CATALOG: Record<QuickReplyKey, QuickReply> = {
  services: { key: "services", label: "Services", value: "What services do you offer?" },
  pricing: { key: "pricing", label: "Pricing / Start a Project", value: "How much does it cost to start a project?" },
  team: { key: "team", label: "Team", value: "Tell me about your team." },
  location: { key: "location", label: "Location / Hours", value: "Where are you located and what are your hours?" },
  faqs: { key: "faqs", label: "FAQs", value: "What are some frequently asked questions?" },
  book: { key: "book", label: "Book / Start a Project", value: "I want to start a project." },
  contact: { key: "contact", label: "Talk to a Human", value: "I'd like to talk to a person." },
};

const FOLLOW_UP_MAP: Record<ChatTopic, QuickReplyKey[]> = {
  greeting: ["services", "pricing", "location", "book"],
  faq: ["services", "pricing", "book", "contact"],
  team: ["services", "book", "contact"],
  services: ["pricing", "book", "faqs", "contact"],
  process: ["services", "book", "contact"],
  location: ["contact", "book", "faqs"],
  contact: ["book", "services", "faqs"],
  booking: ["services", "contact"],
  pricing: ["services", "book", "contact"],
  stats: ["services", "team", "book"],
  fallback: ["services", "book", "faqs", "contact"],
};

export function getQuickReplies(topic: ChatTopic): QuickReply[] {
  return FOLLOW_UP_MAP[topic].map((key) => QUICK_REPLY_CATALOG[key]);
}

export function getInitialQuickReplies(): QuickReply[] {
  return getQuickReplies("greeting");
}

export type ChatResponse = {
  text: string;
  topic: ChatTopic;
};

const FALLBACK_MESSAGE = `I can answer questions about ${businessConfig.shortName}'s services, hours, location, and team. What would you like to know?`;

function findFaqMatch(userMessage: string): string | null {
  const inputWords = significantWords(userMessage);
  if (inputWords.length === 0) return null;

  let bestAnswer: string | null = null;
  let bestScore = 0;

  for (const faq of faqs) {
    const questionWords = significantWords(faq.question);
    const score = sharedWordCount(inputWords, questionWords);
    if (score >= 2 && score > bestScore) {
      bestScore = score;
      bestAnswer = faq.answer;
    }
  }

  return bestAnswer;
}

function findServiceMatch(userMessage: string): Service | null {
  const inputWords = new Set(significantWords(userMessage));
  if (inputWords.size === 0) return null;

  for (const service of services) {
    const titleWords = significantWords(service.title);
    if (titleWords.some((word) => inputWords.has(word))) {
      return service;
    }
  }

  return null;
}

function listServicesText(): string {
  const names = services.slice(0, 6).map((service) => service.title);
  return `We offer several services including: ${names.join(", ")}. Want details on one, or ready to start a project? ${BOOKING_URL}`;
}

function listStatsText(): string {
  const lines = trustStats.map((stat) => `${stat.value} ${stat.label}`);
  return `A few numbers that speak for themselves: ${lines.join(", ")}. Want to see our services or start a project? ${BOOKING_URL}`;
}

function listTeamText(): string {
  const lines = staff.map((member) => `• ${member.name} — ${member.title}`);
  return `Meet the ${businessConfig.shortName} team:\n${lines.join("\n")}`;
}

function listFaqsText(): string {
  const lines = faqs.slice(0, 5).map((faq) => `• ${faq.question}`);
  return `Here are some common questions:\n${lines.join("\n")}\n\nAsk me any of these, or type your own question.`;
}

function listProcessText(): string {
  const lines = howItWorks.map((step) => `${step.step}. ${step.title} — ${step.copy}`);
  return `Here's how it works:\n${lines.join("\n")}\n\nReady to get started? ${BOOKING_URL}`;
}

export function getChatResponse(userMessage: string): ChatResponse {
  const normalized = normalize(userMessage);
  if (!normalized) {
    return { text: FALLBACK_MESSAGE, topic: "fallback" };
  }

  const faqAnswer = findFaqMatch(normalized);
  if (faqAnswer) {
    return { text: faqAnswer, topic: "faq" };
  }

  if (includesAny(normalized, FAQ_LIST_KEYWORDS)) {
    return { text: listFaqsText(), topic: "faq" };
  }

  if (includesAny(normalized, TEAM_KEYWORDS)) {
    return { text: listTeamText(), topic: "team" };
  }

  const service = findServiceMatch(normalized);
  if (service) {
    return {
      text: `${service.short} This typically takes ${service.duration}. Would you like to start a project? ${BOOKING_URL}`,
      topic: "services",
    };
  }

  if (includesAny(normalized, SERVICES_LIST_KEYWORDS)) {
    return { text: listServicesText(), topic: "services" };
  }

  if (includesAny(normalized, PROCESS_KEYWORDS)) {
    return { text: listProcessText(), topic: "process" };
  }

  if (includesAny(normalized, HOURS_KEYWORDS) || includesAny(normalized, LOCATION_KEYWORDS)) {
    return {
      text: `We're located in ${businessConfig.city} at ${businessConfig.address}. Hours: ${businessConfig.hours}. Get directions: ${businessConfig.mapsUrl}`,
      topic: "location",
    };
  }

  if (includesAny(normalized, EMERGENCY_KEYWORDS)) {
    return {
      text: `${emergencyInfo.note} For urgent help, contact ${emergencyInfo.referralLocationName} at ${emergencyInfo.referralLocationPhone}.`,
      topic: "contact",
    };
  }

  if (includesAny(normalized, STATS_KEYWORDS)) {
    return { text: listStatsText(), topic: "stats" };
  }

  if (includesAny(normalized, CONTACT_KEYWORDS)) {
    return {
      text: `You can reach us at ${businessConfig.phone} or by email at ${businessConfig.email}. Prefer to book directly? ${BOOKING_URL}`,
      topic: "contact",
    };
  }

  if (includesAny(normalized, BOOKING_KEYWORDS)) {
    return {
      text: `You can start a project right here: ${BOOKING_URL}. Or call us at ${businessConfig.phone} / email ${businessConfig.email}.`,
      topic: "booking",
    };
  }

  if (includesAny(normalized, PRICE_KEYWORDS)) {
    return {
      text: `Pricing varies by project scope. Call us at ${businessConfig.phone} or start a project for a personalized quote: ${BOOKING_URL}`,
      topic: "pricing",
    };
  }

  return { text: FALLBACK_MESSAGE, topic: "fallback" };
}
