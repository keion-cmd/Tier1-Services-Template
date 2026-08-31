import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ReviewsSection } from "@/components/ReviewsSection";
import { BookingButton } from "@/components/BookingButton";
import { Section, SectionHeading, Eyebrow, PageOutro } from "@/components/blocks/PageBlocks";
import { EditorialStats, EditorialList } from "@/components/blocks/EditorialBlocks";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { clinic, copy, getBusinessTagline, getServiceBySlug, marqueeReviews, proofCareStats, proofPageStories, proofStatHighlight, sectionVisibility } from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";
import { isPlaceholderToken } from "@/lib/utils";

export const metadata = buildMetadata({
  title: `Proof & Reviews — ${getBusinessTagline()}`,
  description: `Trust markers, care statistics, and verified patient stories from ${getBusinessTagline()}.`,
  path: "/proof",
});

export default function Proof() {
  const reviewsByService = marqueeReviews
    .filter((review) => review.serviceSlug && !isPlaceholderToken(review.quote))
    .reduce<Record<string, typeof marqueeReviews>>((groups, review) => {
      const service = getServiceBySlug(review.serviceSlug!);
      if (!service) return groups;
      groups[service.title] = [...(groups[service.title] ?? []), review];
      return groups;
    }, {});

  return (
    <main>
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

      {Object.keys(reviewsByService).length > 0 && (
        <ScrollReveal>
          <Section className="bg-secondary/30" aria-labelledby="proof-by-service-title">
            <SectionHeading eyebrow="Trust, by service" title={<span id="proof-by-service-title">Reviews by service</span>} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(reviewsByService).map(([service, reviews]) => (
                <Card key={service} className="gap-3 p-5">
                  <span className="min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">{service}</span>
                  {reviews.map((review) => (
                    <div key={review.author} className="flex min-w-0 flex-col gap-1.5">
                      <div className="flex gap-0.5 text-primary">
                        {Array.from({ length: review.rating }).map((_, starIndex) => (
                          <Star key={starIndex} size={13} fill="currentColor" />
                        ))}
                      </div>
                      <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">&ldquo;{review.quote}&rdquo;</p>
                      <span className="min-w-0 break-words text-xs font-semibold text-foreground">
                        {review.author} · {review.segment}
                      </span>
                    </div>
                  ))}
                </Card>
              ))}
            </div>
          </Section>
        </ScrollReveal>
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

      <ScrollReveal>
        <PageOutro
          eyebrow={getBusinessTagline()}
          title={copy.proof.ctaTitle}
          cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
        />
      </ScrollReveal>
    </main>
  );
}
