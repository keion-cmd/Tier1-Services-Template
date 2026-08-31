import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getServiceBySlug, marqueeReviews } from "@/lib/business-content";
import { isPlaceholderToken } from "@/lib/utils";

// Mirrors buildReviewSchema()'s placeholder filtering (src/config/helpers.ts) so the visible
// marquee never shows an unfilled `[REVIEW_QUOTE]`-style clone token that the SEO schema already excludes.
const realReviews = marqueeReviews.filter((review) => !isPlaceholderToken(review.quote) && !isPlaceholderToken(review.author));
const loopedReviews = [...realReviews, ...realReviews];

interface ReviewsMarqueeProps {
  heading?: string;
  supportingText?: string;
}

function ReviewCard({ review, hidden }: { review: (typeof realReviews)[number]; hidden?: boolean }) {
  const service = review.serviceSlug ? getServiceBySlug(review.serviceSlug) : undefined;
  return (
    <Card
      className="w-[320px] min-w-0 shrink-0 gap-2.5 border-background/10 bg-background/6 p-6"
      aria-hidden={hidden ? true : undefined}
    >
      <div className="flex gap-0.5 text-primary">
        {Array.from({ length: review.rating }).map((_, starIndex) => (
          <Star key={starIndex} size={14} fill="currentColor" />
        ))}
      </div>
      <p className="text-sm leading-relaxed break-words text-background/85">&ldquo;{review.quote}&rdquo;</p>
      <div className="text-sm break-words">
        <strong className="font-semibold text-background">{review.author}</strong>{" "}
        <span className="text-background/55">
          · {review.segment}
          {service && ` · ${service.title}`}
        </span>
      </div>
    </Card>
  );
}

export function ReviewsMarquee({ heading, supportingText }: ReviewsMarqueeProps) {
  if (realReviews.length === 0) return null;

  return (
    <section
      className="overflow-hidden border-y border-background/10 bg-foreground py-12 md:py-16"
      aria-labelledby={heading ? "reviews-marquee-title" : undefined}
      aria-label={heading ? undefined : "Verified client reviews"}
    >
      {(heading || supportingText) && (
        <div className="mx-auto mb-8 max-w-md px-6 text-center">
          {heading && (
            <h2 id="reviews-marquee-title" className="text-lg font-semibold break-words text-background">
              {heading}
            </h2>
          )}
          {supportingText && <p className="mt-1.5 text-sm break-words text-background/60">{supportingText}</p>}
        </div>
      )}
      {/* Same visible-first-copy / aria-hidden-duplicate pattern as LogoMarquee: screen readers
          get one real pass over the reviews instead of either silence or a doubled announcement. */}
      <div className="flex w-max animate-marquee-slow gap-5 running hover:paused">
        {loopedReviews.map((review, index) => (
          <ReviewCard key={`${review.author}-${index}`} review={review} hidden={index >= realReviews.length} />
        ))}
      </div>
    </section>
  );
}
