"use client";

/**
 * Homepage testimonials — replaces the horizontal marquee (still visually
 * driven by the same `marqueeReviews`/Testimonial data) with a single
 * pull-quote + portrait layout: eyebrow pill and page counter up top, quote
 * / rating / attribution / prev-next arrows on the left, a portrait photo
 * card on the right. Testimonial has no image field, so the portrait uses a
 * generic placeholder token rather than misattributing a client-story photo.
 */
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { EyebrowPill } from "@/components/blocks/PageBlocks";
import { getServiceBySlug, type Testimonial } from "@/lib/business-content";

export function HomeTestimonials({
  eyebrow,
  reviews,
}: {
  eyebrow: string;
  reviews: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  if (reviews.length === 0) return null;

  const active = reviews[index];
  const service = active.serviceSlug ? getServiceBySlug(active.serviceSlug) : undefined;
  const total = reviews.length;

  return (
    <section className="border-y border-border bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex min-w-0 items-start justify-between gap-6 md:mb-14">
          <EyebrowPill>{eyebrow}</EyebrowPill>
          <div className="flex shrink-0 items-baseline gap-1 text-foreground">
            <span className="font-heading text-3xl leading-none font-bold sm:text-4xl">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-medium text-muted-foreground">/{String(total).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="grid min-w-0 gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div className="flex min-w-0 flex-col gap-6">
            <p className="font-heading min-w-0 break-words text-2xl leading-snug font-medium tracking-tight text-foreground sm:text-3xl">
              &ldquo;{active.quote}&rdquo;
            </p>
            <div className="flex min-w-0 flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">{active.rating.toFixed(1)} / 5</span>
              </div>
              <p className="min-w-0 break-words text-sm">
                <strong className="font-semibold text-foreground">{active.author}</strong>{" "}
                <span className="text-muted-foreground">
                  · {active.segment}
                  {service && ` · ${service.title}`}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon-circle"
                aria-label="Previous testimonial"
                onClick={() => setIndex((i) => (i - 1 + total) % total)}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon-circle"
                aria-label="Next testimonial"
                onClick={() => setIndex((i) => (i + 1) % total)}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/5] min-w-0 overflow-hidden rounded-xl border border-border">
            <ImagePlaceholder label="Reviewer photo" token="[TESTIMONIAL_IMAGE]" className="h-full w-full border-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
