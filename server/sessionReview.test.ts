import { describe, expect, it } from "vitest";
import { createSessionReview } from "../client/src/lib/sessionReview";

describe("session-only review display", () => {
  it("keeps only public-safe review fields in browser session state", () => {
    expect(createSessionReview({ displayName: "QA session test", rating: 5, feedback: "QA-only browser-session payload." }, "session_review_001")).toEqual({ id: "session_review_001", displayName: "QA session test", rating: 5, feedback: "QA-only browser-session payload." });
  });
});
