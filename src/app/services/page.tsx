import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorialServiceIndex } from "@/components/EditorialServiceIndex";
import { BookingButton } from "@/components/BookingButton";
import { Section, SectionHeading, StepList } from "@/components/blocks/PageBlocks";
import { FinalCTA } from "@/components/blocks/FinalCTA";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { clinic, copy, getBusinessTagline, serviceChoiceSteps, services } from "@/lib/business-content";
import { locations } from "@/data/locations";
import { buildMetadata } from "@/lib/metadata";
import { hasRealEntries } from "@/lib/utils";

export const metadata = buildMetadata({
  title: `Services — ${getBusinessTagline()}`,
  description: `Explore ${services.length} thoughtfully organized care pathways at ${clinic.name}.`,
  path: "/services",
});

export default function Services() {
  return (
    <main>
      <ImmersiveHero
        eyebrow={getBusinessTagline()}
        headline={copy.services.heroTitle}
        subheadline={copy.services.heroSubtitle}
        imageToken="[SERVICE_IMAGE]"
        imageLabel="Service image"
        cta={<BookingButton label="Book an Appointment" size="lg" />}
        stat={{ value: String(services.length).padStart(2, "0"), caption: "care paths" }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <p className="min-w-0 max-w-2xl break-words text-base leading-relaxed text-muted-foreground">{copy.services.introText}</p>
          <BookingButton label="Schedule Your Care" variant="link" iconSize={15} className="h-auto p-0" />
        </div>
      </div>

      {serviceChoiceSteps.length > 0 && (
        <ScrollReveal>
          <Section aria-labelledby="services-choose-title">
            <SectionHeading
              eyebrow={copy.services.chooseEyebrow}
              title={<span id="services-choose-title">{copy.services.chooseTitle}</span>}
            />
            <StepList steps={serviceChoiceSteps} />
          </Section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <Section className="pt-0 md:pt-0">
          <EditorialServiceIndex />
        </Section>
      </ScrollReveal>

      {hasRealEntries(locations, (location) => location.name) && (
        <ScrollReveal>
          <Section className="bg-secondary/30 flex flex-wrap items-center justify-between gap-4">
            <p className="min-w-0 max-w-2xl break-words text-sm leading-relaxed text-muted-foreground">
              Serving clients across {locations.map((location) => location.city).join(", ")}.
            </p>
            <Link href="/locations" className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              View our locations <ArrowUpRight size={15} />
            </Link>
          </Section>
        </ScrollReveal>
      )}

      <FinalCTA
        eyebrow={getBusinessTagline()}
        title={copy.services.ctaTitle}
        cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
