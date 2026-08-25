import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { marqueeReviews } from "@/lib/business-content";

const loopedReviews = [...marqueeReviews, ...marqueeReviews];

export function ReviewsMarquee() {
  return (
    <section className="overflow-hidden bg-foreground py-12 md:py-16" aria-label="Verified client reviews">
      <div className="flex w-max animate-marquee-slow gap-5 running hover:paused" aria-hidden="true">
        {loopedReviews.map((review, index) => (
          <Card key={`${review.name}-${index}`} className="w-[320px] shrink-0 gap-2.5 border-background/10 bg-background/6 p-6">
            <div className="flex gap-0.5 text-primary">
              {Array.from({ length: review.rating }).map((_, starIndex) => (
                <Star key={starIndex} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-background/85">&ldquo;{review.quote}&rdquo;</p>
            <div className="text-sm">
              <strong className="font-semibold text-background">{review.name}</strong>{" "}
              <span className="text-background/55">· {review.segment}</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
