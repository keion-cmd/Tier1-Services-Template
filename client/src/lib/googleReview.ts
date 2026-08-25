import { clinic } from "@/lib/clinic-content";

export const approvedGoogleReviewUrl = clinic.googleReviewUrl;

export function isApprovedGoogleReviewUrl(url: string) {
  const parsed = new URL(url);
  return parsed.protocol === "https:" && parsed.hostname === "maps.app.goo.gl";
}
