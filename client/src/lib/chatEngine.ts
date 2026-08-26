/**
 * Fully data-driven rule-based chat engine for the AI Receptionist widget.
 * No external API calls — every response is derived from business-content.ts
 * and booking.ts, so a clone answers correctly the moment those tokens are filled in.
 */
import { faqs, services, businessConfig, emergencyInfo, type Service } from "@/lib/business-content";
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

const HOURS_KEYWORDS = ["open", "close", "closed", "closing", "hours", "schedule", "when"];
const LOCATION_KEYWORDS = ["where", "address", "location", "directions", "located", "map"];
const CONTACT_KEYWORDS = ["call", "phone", "email", "contact", "reach", "number"];
const EMERGENCY_KEYWORDS = ["emergency", "urgent", "after hours", "afterhours", "urgently"];
const BOOKING_KEYWORDS = ["book", "appointment", "schedule", "reserve", "booking"];
const PRICE_KEYWORDS = ["how much", "cost", "price", "pricing", "fee", "fees", "charge", "expensive"];

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

export function getChatResponse(userMessage: string): string {
  const normalized = normalize(userMessage);
  if (!normalized) {
    return `I'm not sure about that, but our team would love to help! You can call us at ${businessConfig.phone}, email ${businessConfig.email}, or book an appointment here: ${BOOKING_URL}`;
  }

  const faqAnswer = findFaqMatch(normalized);
  if (faqAnswer) {
    return faqAnswer;
  }

  const service = findServiceMatch(normalized);
  if (service) {
    return `${service.short} This typically takes ${service.duration}. Would you like to book? ${BOOKING_URL}`;
  }

  if (includesAny(normalized, HOURS_KEYWORDS)) {
    return `Our hours: ${businessConfig.hours}`;
  }

  if (includesAny(normalized, LOCATION_KEYWORDS)) {
    return `We're located at ${businessConfig.address}. Get directions here: ${businessConfig.mapsUrl}`;
  }

  if (includesAny(normalized, CONTACT_KEYWORDS)) {
    return `You can reach us at ${businessConfig.phone} or by email at ${businessConfig.email}.`;
  }

  if (includesAny(normalized, EMERGENCY_KEYWORDS)) {
    return `${emergencyInfo.note} For urgent help, contact ${emergencyInfo.referralLocationName} at ${emergencyInfo.referralLocationPhone}.`;
  }

  if (includesAny(normalized, BOOKING_KEYWORDS)) {
    return `You can book an appointment right here: ${BOOKING_URL}`;
  }

  if (includesAny(normalized, PRICE_KEYWORDS)) {
    return `Pricing varies by service. Please call us at ${businessConfig.phone} or book a consultation for a personalized quote: ${BOOKING_URL}`;
  }

  return `I'm not sure about that, but our team would love to help! You can call us at ${businessConfig.phone}, email ${businessConfig.email}, or book an appointment here: ${BOOKING_URL}`;
}

export const suggestedQuestions: string[] = faqs
  .slice(0, 4)
  .map((faq) => faq.question);
