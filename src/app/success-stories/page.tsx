import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BookingButton } from "@/components/BookingButton";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { Section, SectionHeading, PageOutro } from "@/components/blocks/PageBlocks";
import { EditorialSplit } from "@/components/blocks/EditorialBlocks";
import { ScrollReveal } from "@/components/ScrollReveal";
import { clientStories, clinic, copy, getBusinessTagline, getServiceBySlug } from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: `Client Stories — ${getBusinessTagline()}`,
  description: `Real outcomes and client stories from ${clinic.name}.`,
  path: "/success-stories",
});

export default function SuccessStories() {
  const [featuredStory, ...moreStories] = clientStories;

  return (
    <main>
      <ImmersiveHero
        eyebrow={copy.successStories.heroEyebrow}
        headline={copy.successStories.heroTitle}
        subheadline={copy.successStories.heroSubtitle}
        imageToken="[CLIENT_1_PHOTO]"
        imageLabel="Client story image"
        cta={<BookingButton label="Book an Appointment" size="lg" />}
        stat={{ value: String(clientStories.length).padStart(2, "0"), caption: "client stories" }}
      />

      {featuredStory && (
        <ScrollReveal>
          <Section aria-labelledby="success-stories-featured-title">
            <SectionHeading
              eyebrow={copy.successStories.gridEyebrow}
              title={<span id="success-stories-featured-title">{copy.successStories.gridTitle}</span>}
              className="mb-6"
            />
            <EditorialSplit
              imageToken={featuredStory.imageKey}
              imageLabel="Client photo"
              eyebrow={`${featuredStory.clientName} · ${featuredStory.segment}`}
              title={featuredStory.category}
              body={<p>{featuredStory.story}</p>}
              extra={
                (() => {
                  const relatedService = featuredStory.serviceSlug ? getServiceBySlug(featuredStory.serviceSlug) : undefined;
                  return relatedService ? (
                    <Link
                      href={`/services/${relatedService.slug}`}
                      className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      Explore {relatedService.title} <ArrowUpRight size={15} />
                    </Link>
                  ) : null;
                })()
              }
            />
          </Section>
        </ScrollReveal>
      )}

      {moreStories.map((story, index) => {
        const relatedService = story.serviceSlug ? getServiceBySlug(story.serviceSlug) : undefined;
        return (
          <ScrollReveal key={story.clientName}>
            <EditorialSplit
              className={index % 2 === 0 ? "bg-secondary/30" : undefined}
              reverse={index % 2 === 1}
              imageToken={story.imageKey}
              imageLabel="Client photo"
              eyebrow={`${story.clientName} · ${story.segment}`}
              title={
                <Badge variant="outline" className="w-fit max-w-full rounded-full text-sm font-semibold break-words whitespace-normal">
                  {story.category}
                </Badge>
              }
              body={<p>{story.story}</p>}
              extra={
                relatedService ? (
                  <Link
                    href={`/services/${relatedService.slug}`}
                    className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Explore {relatedService.title} <ArrowUpRight size={15} />
                  </Link>
                ) : null
              }
            />
          </ScrollReveal>
        );
      })}

      <ScrollReveal>
        <Section className="pt-0 md:pt-0">
          <p className="min-w-0 max-w-2xl break-words text-xs leading-relaxed text-muted-foreground">
            {clinic.name} is a template demonstration business; these client stories are illustrative placeholders, not real
            outcomes. Replace with client-approved, consented stories before launch.
          </p>
        </Section>
      </ScrollReveal>

      <ScrollReveal>
        <PageOutro
          eyebrow={getBusinessTagline()}
          title={copy.successStories.ctaTitle}
          cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
        />
      </ScrollReveal>
    </main>
  );
}
