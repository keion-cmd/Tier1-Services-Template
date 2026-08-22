import type { DisplayedReview } from "../../../server/appointmentIntake";
import { Star } from "lucide-react";
import { trpc } from "@/lib/trpc";

export function ApprovedReviews({ latestReview }: { latestReview: DisplayedReview | null }) {
  const storedReviews = trpc.reviewSubmission.listDisplayed.useQuery(undefined, { staleTime: 60_000, retry: false });
  const reviews = latestReview && !storedReviews.data?.some((review) => review.id === latestReview.id) ? [latestReview, ...(storedReviews.data || [])] : storedReviews.data || [];
  if (storedReviews.isLoading && !latestReview) return <p className="pp-approved-reviews-state">Loading reviews…</p>;
  if (!reviews.length) return <p className="pp-approved-reviews-state">Be the first to share a review.</p>;
  return <div className="pp-approved-reviews" aria-label="Clinic reviews">{reviews.map((review) => <article key={review.id}><div className="pp-approved-review-stars" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: review.rating }, (_, index) => <Star key={index} size={14} fill="currentColor" />)}</div><p>“{review.feedback}”</p><strong>{review.displayName}</strong></article>)}</div>;
}
