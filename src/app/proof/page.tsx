import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { ReviewsSection } from "@/components/ReviewsSection";
import { BookingButton } from "@/components/BookingButton";
import { JsonLd } from "@/components/JsonLd";
import { Section, SectionHeading, Eyebrow } from "@/components/blocks/PageBlocks";
import { FinalCTA } from "@/components/blocks/FinalCTA";
import { EditorialStats, EditorialList, EditorialSplit, EditorialQuote } from "@/components/blocks/EditorialBlocks";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  buildReviewSchema,
  clinic,
  copy,
  getBusinessTagline,
  getServiceBySlug,
  marqueeReviews,
  proofCareStats,
  proofPageStories,
  proofStatHighlight,
  sectionVisibility,
} from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";
import { isPlaceholderToken } from "@/lib/utils";
import type { Service } from "@/lib/business-content";

export const metadata = buildMetadata({
  title: `Proof & Reviews — ${getBusinessTagline()}`,
  description: copy.proof.heroSubtitle,
  path: "/proof",
});

type ServiceReviewGroup = { service: Service; reviews: typeof marqueeReviews };

export default function Proof() {
  const reviewsByService = marqueeReviews
    .filter((review) => review.serviceSlug && !isPlaceholderToken(review.quote))
    .reduce<Record<string, ServiceReviewGroup>>((groups, review) => {
      const service = getServiceBySlug(review.serviceSlug!);
      if (!service) return groups;
      const group = groups[service.slug] ?? { service, reviews: [] };
      group.reviews.push(review);
      groups[service.slug] = group;
      return groups;
    }, {});
  const serviceReviewGroups = Object.values(reviewsByService);
  const reviewSchema = buildReviewSchema();

  return (
    <main>
      {reviewSchema && <JsonLd data={reviewSchema} />}

      <ImmersiveHero
        eyebrow={copy.proof.heroEyebrow}
        headline={copy.proof.heroTitle}
        subheadline={copy.proof.heroSubtitle}
        imageToken="[SERVICE_IMAGE]"
        imageLabel="Service image"
        cta={<BookingButton label="Book an Appointment" size="lg" />}
        stat={{ value: proofStatHighlight.number, caption: proofStatHighlight.label }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <p className="min-w-0 max-w-md break-words text-sm leading-relaxed text-muted-foreground">{copy.proof.statsCaption}</p>
          <Link href="/faq" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            Read common questions <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      {sectionVisibility.proofCareStats && proofCareStats.length > 0 && (
        <ScrollReveal>
        <Section aria-labelledby="proof-stats-title">
          <SectionHeading
            eyebrow={copy.proof.statsEyebrow}
            title={<span id="proof-stats-title">{copy.proof.statsTitle}</span>}
          />
          <EditorialStats stats={proofCareStats} />
        </Section>
        </ScrollReveal>
      )}

      <ReviewsSection />

      {serviceReviewGroups.length > 0 && (
        <>
          <ScrollReveal>
            <Section aria-labelledby="proof-by-service-title">
              <SectionHeading
                eyebrow="Trust, by service"
                title={<span id="proof-by-service-title">Proof, specific to what you need</span>}
                description="Every review below comes from a client who booked the exact service it's attached to."
              />
            </Section>
          </ScrollReveal>

          {serviceReviewGroups.map((group, i) => (
            <ScrollReveal key={group.service.slug}>
              <EditorialSplit
                className="pt-0 md:pt-0"
                eyebrow={group.service.category}
                title={group.service.title}
                imageToken={group.service.imageKey}
                imageLabel="Service image"
                reverse={i % 2 === 1}
                body={
                  <div className="flex min-w-0 flex-col gap-8">
                    {group.reviews.map((review) => (
                      <div key={review.author} className="flex min-w-0 flex-col gap-2">
                        <div className="flex gap-0.5 text-primary">
                          {Array.from({ length: review.rating }).map((_, starIndex) => (
                            <Star key={starIndex} size={13} fill="currentColor" />
                          ))}
                        </div>
                        <EditorialQuote quote={review.quote} attribution={`${review.author} · ${review.segment}`} />
                      </div>
                    ))}
                  </div>
                }
                extra={
                  <Link
                    href={`/services/${group.service.slug}`}
                    className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    View {group.service.title} <ArrowUpRight size={15} />
                  </Link>
                }
              />
            </ScrollReveal>
          ))}
        </>
      )}

      {sectionVisibility.proofStories && proofPageStories.length > 0 && (
        <ScrollReveal>
        <Section aria-labelledby="proof-stories-title">
          <Eyebrow>{copy.proof.storiesEyebrow}</Eyebrow>
          <h2 id="proof-stories-title" className="sr-only">
            {copy.proof.storiesEyebrow}
          </h2>
          <EditorialList
            className="mt-5"
            items={proofPageStories.map((story) => ({ title: story.label, description: story.note }))}
          />
          <p className="mt-6 min-w-0 break-words text-xs leading-relaxed text-muted-foreground">
            {clinic.name} is a template demonstration business; these stories are illustrative placeholders. Replace with
            client-approved, consented stories before launch.
          </p>
        </Section>
        </ScrollReveal>
      )}

      <FinalCTA
        eyebrow={getBusinessTagline()}
        title={copy.proof.ctaTitle}
        cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
