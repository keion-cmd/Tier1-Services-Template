export type SessionReview = { id: string; displayName: string; rating: number; feedback: string };

export function createSessionReview(input: Omit<SessionReview, "id">, id = crypto.randomUUID()): SessionReview {
  return { id, displayName: input.displayName, rating: input.rating, feedback: input.feedback };
}
