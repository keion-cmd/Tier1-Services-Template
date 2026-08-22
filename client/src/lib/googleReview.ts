export const approvedGoogleReviewUrl = "https://maps.app.goo.gl/NJJubY67EdFb4NEs9";

export function isApprovedGoogleReviewUrl(url: string) {
  const parsed = new URL(url);
  return parsed.protocol === "https:" && parsed.hostname === "maps.app.goo.gl";
}
