import { PawPrint } from "lucide-react";
import { InteractiveServiceGallery } from "@/components/InteractiveServiceGallery";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, PageOutro } from "@/components/PageBlocks";
import { clinic } from "@/lib/clinic-content";

export default function Services() {
  return (
    <main>
      <PageMeta
        title={`Services — ${clinic.name} ${clinic.descriptor}`}
        description={`Explore six thoughtfully organized veterinary care pathways at ${clinic.name}.`}
        path="/services"
      />

      <PageHero
        eyebrowIcon={PawPrint}
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={
          <>
            Care paths <span className="text-primary">with intent.</span>
          </>
        }
        description="Every path begins with a conversation, then makes space for the questions that matter to you and your pet."
        cta={<BookingButton label="Book an Appointment" />}
        image={{ label: "Service image", token: "[SERVICE_IMAGE]" }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div className="flex items-baseline gap-2">
            <strong className="text-5xl font-bold text-primary">06</strong>
            <span className="text-sm font-semibold text-muted-foreground">care paths</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            From the first question to a more detailed conversation, our service overview helps make the next step
            feel clearer.
          </p>
          <BookingButton label="Schedule Care for Your Pet" variant="link" iconSize={15} className="h-auto p-0" />
        </div>
      </div>

      <Section className="pt-0 md:pt-0">
        <InteractiveServiceGallery variant="services" />
      </Section>

      <PageOutro
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={
          <>
            Care that makes room for <span className="text-primary-foreground/80">every question.</span>
          </>
        }
        cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
