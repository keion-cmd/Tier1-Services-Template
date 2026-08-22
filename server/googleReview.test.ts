import { describe, expect, it } from "vitest";
import { approvedGoogleReviewUrl, isApprovedGoogleReviewUrl } from "../client/src/lib/googleReview";

describe("Google Review CTA configuration", () => {
  it("uses the client-approved secure Google Maps destination", () => {
    expect(isApprovedGoogleReviewUrl(approvedGoogleReviewUrl)).toBe(true);
  });

  it("does not accept non-Google or insecure review destinations", () => {
    expect(isApprovedGoogleReviewUrl("http://maps.app.goo.gl/example")).toBe(false);
    expect(isApprovedGoogleReviewUrl("https://example.com/review")).toBe(false);
  });
});
