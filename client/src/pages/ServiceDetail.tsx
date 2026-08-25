import { useParams } from "wouter";
import { CheckCircle2, PawPrint } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, FeatureCard } from "@/components/PageBlocks";
import { Card, CardContent } from "@/components/ui/card";
import { PageOutro } from "@/components/PageBlocks";
import { assets, buildBreadcrumbSchema, clinic, getServiceBySlug } from "@/lib/clinic-content";
import NotFound from "./NotFound";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) return <NotFound />;

  const heroImage = assets[service.imageKey];

  return (
    <main>
      <PageMeta
        title={`${service.title} — ${clinic.name} ${clinic.descriptor}`}
        description={service.short}
        path={`/services/${service.slug}`}
        image={heroImage}
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />

      <PageHero
        eyebrowIcon={PawPrint}
        eyebrow={`${service.number} · Care path · ${service.duration}`}
        title={service.title}
        description={service.detail}
        cta={<BookingButton label="Book an Appointment" />}
        backLink={{ href: "/services", label: "All Services" }}
        image={{ src: heroImage, alt: `${service.title} at ${clinic.name}` }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div className="flex items-baseline gap-2">
            <strong className="text-5xl font-bold text-primary">{service.number}</strong>
            <span className="text-sm font-semibold text-muted-foreground">care path</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{service.short}</p>
          <BookingButton label="Schedule Care for Your Pet" variant="link" iconSize={15} className="h-auto p-0" />
        </div>
      </div>

      <Section aria-labelledby="service-benefits-title">
        <SectionHeading icon={PawPrint} eyebrow="Key benefits" title={<span id="service-benefits-title" className="sr-only">Key benefits</span>} className="mb-6" />
        <div className="grid gap-4 sm:grid-cols-2">
          {service.benefits.map((benefit) => (
            <Card key={benefit}>
              <CardContent className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-foreground">{benefit}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/30" aria-labelledby="service-process-title">
        <SectionHeading
          icon={PawPrint}
          eyebrow="What to expect"
          title={
            <span id="service-process-title">
              A clear path <span className="text-primary">from start to finish.</span>
            </span>
          }
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {service.process.map((step, index) => (
            <FeatureCard key={step} label={`Step ${index + 1}`} title={step} description={stepDescription(step)} />
          ))}
        </div>
      </Section>

      <PageOutro
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={
          <>
            Ready to talk through <span className="text-primary-foreground/80">{service.title.toLowerCase()}?</span>
          </>
        }
        cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}

function stepDescription(step: string) {
  if (step === "Intake") return "Share your pet's history and the questions you'd like to raise.";
  if (step === "Examination") return "A hands-on look guided by what you shared during intake.";
  if (step === "Care Plan") return "A clear next step, discussed directly rather than assumed online.";
  return "Part of this care path's structured conversation.";
}
