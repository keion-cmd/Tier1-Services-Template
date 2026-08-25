import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { marqueeReviews } from "@/lib/business-content";

const loopedReviews = [...marqueeReviews, ...marqueeReviews];

interface ReviewsMarqueeProps {
  heading?: string;
  supportingText?: string;
}

export function ReviewsMarquee({ heading, supportingText }: ReviewsMarqueeProps) {
  return (
    <section className="overflow-hidden bg-foreground py-12 md:py-16" aria-label="Verified client reviews">
      {(heading || supportingText) && (
        <div className="mx-auto mb-8 max-w-md px-6 text-center">
          {heading && <h2 className="text-lg font-semibold break-words text-background">{heading}</h2>}
          {supportingText && <p className="mt-1.5 text-sm break-words text-background/60">{supportingText}</p>}
        </div>
      )}
      <div className="flex w-max animate-marquee-slow gap-5 running hover:paused" aria-hidden="true">
        {loopedReviews.map((review, index) => (
          <Card key={`${review.author}-${index}`} className="w-[320px] min-w-0 shrink-0 gap-2.5 border-background/10 bg-background/6 p-6">
            <div className="flex gap-0.5 text-primary">
              {Array.from({ length: review.rating }).map((_, starIndex) => (
                <Star key={starIndex} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm leading-relaxed break-words text-background/85">&ldquo;{review.quote}&rdquo;</p>
            <div className="text-sm break-words">
              <strong className="font-semibold text-background">{review.author}</strong>{" "}
              <span className="text-background/55">· {review.segment}</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
