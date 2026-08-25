import { businessConfig } from "@/lib/business-content";

export const approvedGoogleReviewUrl = businessConfig.googleReviewUrl;

export function isApprovedGoogleReviewUrl(url: string) {
  const parsed = new URL(url);
  return parsed.protocol === "https:" && parsed.hostname === "maps.app.goo.gl";
}
