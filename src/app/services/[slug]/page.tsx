import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { BookingButton } from "@/components/BookingButton";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, Section, SectionHeading, FeatureCard, PageOutro } from "@/components/blocks/PageBlocks";
import { Card, CardContent } from "@/components/ui/card";
import { buildBreadcrumbSchema, clinic, copy, getServiceBySlug, services } from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: `${service.title} — ${clinic.name} ${clinic.descriptor}`,
    description: service.short,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <main>
      <JsonLd
        data={buildBreadcrumbSchema([
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
          <div className="flex min-w-0 items-baseline gap-2">
            <strong className="min-w-0 break-words text-5xl font-bold text-primary">{service.number}</strong>
            <span className="text-sm font-semibold text-muted-foreground">care path</span>
          </div>
          <p className="min-w-0 max-w-md break-words text-sm leading-relaxed text-muted-foreground">{service.short}</p>
          <BookingButton label="Schedule Your Care" variant="link" iconSize={15} className="h-auto p-0" />
        </div>
      </div>

      <Section aria-labelledby="service-benefits-title">
        <SectionHeading eyebrow={copy.serviceDetail.benefitsEyebrow} title={<span id="service-benefits-title" className="sr-only">{copy.serviceDetail.benefitsEyebrow}</span>} className="mb-6" />
        <div className="grid gap-4 sm:grid-cols-3">
          {service.benefits.map((benefit) => (
            <Card key={benefit}>
              <CardContent className="flex min-w-0 items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary" />
                <p className="min-w-0 break-words text-sm leading-relaxed text-foreground">{benefit}</p>
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
