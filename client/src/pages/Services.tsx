import { ShieldCheck } from "lucide-react";
import { InteractiveServiceGallery } from "@/components/InteractiveServiceGallery";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, PageOutro } from "@/components/PageBlocks";
import { clinic, copy, services } from "@/lib/business-content";

export default function Services() {
  return (
    <main>
      <PageMeta
        title={`Services — ${clinic.name} ${clinic.descriptor}`}
        description={`Explore ${services.length} thoughtfully organized care pathways at ${clinic.name}.`}
        path="/services"
      />

      <PageHero
        eyebrowIcon={ShieldCheck}
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={copy.services.heroTitle}
        description={copy.services.heroSubtitle}
        cta={<BookingButton label="Book an Appointment" />}
        image={{ label: "Service image", token: "[SERVICE_IMAGE]" }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div className="flex items-baseline gap-2">
            <strong className="text-5xl font-bold text-primary">{String(services.length).padStart(2, "0")}</strong>
            <span className="text-sm font-semibold text-muted-foreground">care paths</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            From the first question to a more detailed conversation, our service overview helps make the next step
            feel clearer.
          </p>
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
