import type { SessionReview } from "@/lib/sessionReview";
import { Star } from "lucide-react";

export function ApprovedReviews({ latestReview }: { latestReview: SessionReview | null }) {
  if (!latestReview) return <p className="pp-approved-reviews-state">Share the first review in this browser session.</p>;
  return <div className="pp-approved-reviews" aria-label="Reviews shown in this browser session"><article key={latestReview.id}><div className="pp-approved-review-stars" aria-label={`${latestReview.rating} out of 5 stars`}>{Array.from({ length: latestReview.rating }, (_, index) => <Star key={index} size={14} fill="currentColor" />)}</div><p>“{latestReview.feedback}”</p><strong>{latestReview.displayName}</strong></article></div>;
}
