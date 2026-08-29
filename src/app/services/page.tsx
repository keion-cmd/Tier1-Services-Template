import { InteractiveServiceGallery } from "@/components/InteractiveServiceGallery";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, PageOutro } from "@/components/blocks/PageBlocks";
import { clinic, copy, services } from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: `Services — ${clinic.name} ${clinic.descriptor}`,
  description: `Explore ${services.length} thoughtfully organized care pathways at ${clinic.name}.`,
  path: "/services",
});

export default function Services() {
  return (
    <main>
      <PageHero
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={copy.services.heroTitle}
        description={copy.services.heroSubtitle}
        cta={<BookingButton label="Book an Appointment" />}
        image={{ label: "Service image", token: "[SERVICE_IMAGE]" }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div className="flex min-w-0 items-baseline gap-2">
            <strong className="min-w-0 break-words text-5xl font-bold text-primary">{String(services.length).padStart(2, "0")}</strong>
            <span className="text-sm font-semibold text-muted-foreground">care paths</span>
          </div>
          <p className="min-w-0 max-w-md break-words text-sm leading-relaxed text-muted-foreground">{copy.services.introText}</p>
          <BookingButton label="Schedule Your Care" variant="link" iconSize={15} className="h-auto p-0" />
        </div>
      </div>

      <Section className="pt-0 md:pt-0">
        <InteractiveServiceGallery variant="services" />
      </Section>

      <PageOutro
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={copy.services.ctaTitle}
        cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
