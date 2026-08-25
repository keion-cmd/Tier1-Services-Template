import { useParams } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, FeatureCard } from "@/components/PageBlocks";
import { Card, CardContent } from "@/components/ui/card";
import { PageOutro } from "@/components/PageBlocks";
import { buildBreadcrumbSchema, clinic, copy, getServiceBySlug } from "@/lib/business-content";
import NotFound from "./NotFound";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) return <NotFound />;

  return (
    <main>
      <PageMeta
        title={`${service.title} — ${clinic.name} ${clinic.descriptor}`}
        description={service.short}
        path={`/services/${service.slug}`}
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />

      <PageHero
        eyebrow={`${service.number} · Care path · ${service.duration}`}
        title={service.title}
        description={service.detail}
        cta={<BookingButton label="Book an Appointment" />}
        backLink={{ href: "/services", label: "All Services" }}
        image={{ label: "Service image", token: service.imageKey }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div className="flex items-baseline gap-2">
            <strong className="text-5xl font-bold text-primary">{service.number}</strong>
            <span className="text-sm font-semibold text-muted-foreground">care path</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{service.short}</p>
          <BookingButton label="Schedule Your Care" variant="link" iconSize={15} className="h-auto p-0" />
        </div>
      </div>

      <Section aria-labelledby="service-benefits-title">
        <SectionHeading eyebrow={copy.serviceDetail.benefitsEyebrow} title={<span id="service-benefits-title" className="sr-only">{copy.serviceDetail.benefitsEyebrow}</span>} className="mb-6" />
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
          eyebrow={copy.serviceDetail.processEyebrow}
          title={<span id="service-process-title">{copy.serviceDetail.processTitle}</span>}
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {service.process.map((step) => (
            <FeatureCard key={step.step} label={`Step ${step.step}`} title={step.title} description={step.description} />
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
