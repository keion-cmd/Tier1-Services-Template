import { Info } from "lucide-react";
import { BookingButton } from "@/components/BookingButton";
import { Section, SectionHeading, PageOutro } from "@/components/blocks/PageBlocks";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ResourceFilterGrid } from "@/components/ResourceFilterGrid";
import { articles, copy, getBusinessTagline } from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: `Health & Wellness Resources — ${getBusinessTagline()}`,
  description: `General educational articles on wellness, preventive care, and long-term care from ${getBusinessTagline()}.`,
  path: "/resources",
});

export default function Resources() {
  return (
    <main>
      <ImmersiveHero
        eyebrow={copy.resources.heroEyebrow}
        headline={copy.resources.heroTitle}
        subheadline={copy.resources.heroSubtitle}
        imageToken="[RESOURCE_IMAGE]"
        imageLabel="Resource image"
        cta={<BookingButton label="Book an Appointment" size="lg" />}
        stat={{ value: String(articles.length).padStart(2, "0"), caption: "articles" }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <p className="flex min-w-0 max-w-md items-start gap-2 text-sm leading-relaxed break-words text-muted-foreground">
            <Info size={17} className="mt-0.5 shrink-0" /> {copy.resources.disclaimerText}
          </p>
          <BookingButton label="Talk to our team" variant="link" iconSize={15} className="h-auto p-0" />
        </div>
      </div>

      <ScrollReveal>
        <Section aria-labelledby="resources-grid-title">
          <SectionHeading
            eyebrow={copy.resources.gridEyebrow}
            title={<span id="resources-grid-title">{copy.resources.gridTitle}</span>}
          />
          <ResourceFilterGrid />
        </Section>
      </ScrollReveal>

      <ScrollReveal>
        <PageOutro
          eyebrow={getBusinessTagline()}
          title={copy.resources.ctaTitle}
          cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
        />
      </ScrollReveal>
    </main>
  );
}
