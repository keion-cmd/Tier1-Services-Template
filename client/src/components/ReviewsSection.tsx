import { useState } from "react";
import type { SessionReview } from "@/lib/sessionReview";
import { ApprovedReviews } from "@/components/ApprovedReviews";
import { ReviewForm } from "@/components/ReviewForm";

export function ReviewsSection() {
  const [latestReview, setLatestReview] = useState<SessionReview | null>(null);
  return <section className="pp-reviews-section"><div className="pp-reviews-intro"><span className="fidelity-kicker">Reviews</span><h2>Tell us how<br /><em>care felt.</em></h2><p>Share your experience with the clinic. Your name, rating, and review appear immediately in this page only; your email remains private and nothing is saved after refresh.</p></div><div className="pp-reviews-content"><ApprovedReviews latestReview={latestReview} /><ReviewForm onDisplayed={setLatestReview} /></div></section>;
}
