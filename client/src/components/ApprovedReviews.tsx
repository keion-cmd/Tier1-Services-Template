import { Star } from "lucide-react";
import { trpc } from "@/lib/trpc";

export function ApprovedReviews() {
  const approvedReviews = trpc.reviewSubmission.listApproved.useQuery(undefined, { staleTime: 60_000, retry: false });
  if (approvedReviews.isLoading) return <p className="pp-approved-reviews-state">Loading approved reviews…</p>;
  if (!approvedReviews.data?.length) return <p className="pp-approved-reviews-state">No approved reviews are published yet. Share your experience and the clinic team will review it first.</p>;
  return <div className="pp-approved-reviews" aria-label="Approved clinic reviews">{approvedReviews.data.map((review) => <article key={review.id}><div className="pp-approved-review-stars" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: review.rating }, (_, index) => <Star key={index} size={14} fill="currentColor" />)}</div><p>“{review.feedback}”</p><strong>{review.displayName}</strong></article>)}</div>;
}
