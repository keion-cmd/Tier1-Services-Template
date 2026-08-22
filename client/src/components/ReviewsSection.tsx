import { useState } from "react";
import type { DisplayedReview } from "../../../server/appointmentIntake";
import { ApprovedReviews } from "@/components/ApprovedReviews";
import { ReviewForm } from "@/components/ReviewForm";

export function ReviewsSection() {
  const [latestReview, setLatestReview] = useState<DisplayedReview | null>(null);
  return <section className="pp-reviews-section"><div className="pp-reviews-intro"><span className="fidelity-kicker">Reviews</span><h2>Tell us how<br /><em>care felt.</em></h2><p>Share your experience with the clinic. Your name, rating, and review can appear in this section after you send it; your email stays private.</p></div><div className="pp-reviews-content"><ApprovedReviews latestReview={latestReview} /><ReviewForm onDisplayed={setLatestReview} /></div></section>;
}
