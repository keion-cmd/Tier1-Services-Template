import { Star } from "lucide-react";
import { marqueeReviews } from "@/lib/clinic-content";

const loopedReviews = [...marqueeReviews, ...marqueeReviews];

export function ReviewsMarquee() {
  return <div className="pp-reviews-marquee-section" aria-label="Verified pet owner reviews">
    <div className="pp-reviews-marquee-track" aria-hidden="true">
      {loopedReviews.map((review, index) => <article className="pp-reviews-marquee-card" key={`${review.name}-${index}`}>
        <div className="pp-reviews-marquee-stars">{Array.from({ length: review.rating }).map((_, starIndex) => <Star key={starIndex} size={14} fill="currentColor" />)}</div>
        <p>&ldquo;{review.quote}&rdquo;</p>
        <div><strong>{review.name}</strong> <span>· {review.pet}</span></div>
      </article>)}
    </div>
  </div>;
}
