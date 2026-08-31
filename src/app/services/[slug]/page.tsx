import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookingButton } from "@/components/BookingButton";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, Section, SectionHeading, FeatureCard, PageOutro } from "@/components/blocks/PageBlocks";
import { Card, CardContent } from "@/components/ui/card";
import { buildBreadcrumbSchema, copy, faqs, getBusinessTagline, getServiceBySlug, services } from "@/lib/business-content";
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
    title: `${service.title} — ${getBusinessTagline()}`,
    description: service.short,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const relatedServices = services
    .filter((other) => other.slug !== service.slug && other.category === service.category)
    .slice(0, 3);
  const serviceFaqs = faqs.filter((faq) => faq.serviceSlug === service.slug);

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
        eyebrow={`${service.number} · ${copy.services.cardLabel} · ${service.duration}`}
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

      {service.bestFor && service.bestFor.length > 0 && (
        <Section aria-labelledby="service-best-for-title">
          <SectionHeading
            eyebrow="Is this right for you?"
            title={<span id="service-best-for-title">This service is a good fit if...</span>}
            className="mb-6"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {service.bestFor.map((reason) => (
              <Card key={reason}>
                <CardContent className="flex min-w-0 items-start gap-3">
                  <Sparkles size={20} className="mt-0.5 shrink-0 text-primary" />
                  <p className="min-w-0 break-words text-sm leading-relaxed text-foreground">{reason}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {serviceFaqs.length > 0 && (
        <Section aria-labelledby="service-faq-title">
          <SectionHeading eyebrow="Common questions" title={<span id="service-faq-title">FAQs about {service.title}</span>} className="mb-2" />
          <Accordion type="single" collapsible className="mt-3 border-t border-border">
            {serviceFaqs.map((faq, index) => (
              <AccordionItem value={`service-faq-${index}`} key={faq.question}>
                <AccordionTrigger className="text-base font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      )}

      {relatedServices.length > 0 && (
        <Section className="bg-secondary/30" aria-labelledby="related-services-title">
          <SectionHeading
            eyebrow={copy.services.cardLabel}
            title={<span id="related-services-title">Related Services</span>}
          />
          <div
            className={`grid gap-5 ${relatedServices.length === 1 ? "mx-auto max-w-md" : "sm:grid-cols-2 lg:grid-cols-3"}`}
          >
            {relatedServices.map((related) => (
              <Card key={related.slug} className="card-hover flex flex-col overflow-hidden gap-0 py-0">
                <div className="flex min-w-0 items-center justify-between gap-2 px-5 pt-4">
                  <span className="min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">
                    {related.number} · {copy.services.cardLabel}
                  </span>
                </div>
                <Link href={`/services/${related.slug}`} aria-label={`View details about ${related.title}`} className="mt-3 flex flex-1 flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ImagePlaceholder label="Service image" token={related.imageKey} className="card-hover-image h-full w-full border-0" />
                  </div>
                  <CardContent className="flex min-w-0 flex-1 flex-col gap-2 pt-4">
                    <h3 className="text-xl leading-snug font-semibold tracking-tight text-foreground break-words">{related.title}</h3>
                    {related.duration && (
                      <span className="min-w-0 break-words text-xs font-medium text-muted-foreground">{related.duration}</span>
                    )}
                    <p className="text-sm leading-relaxed break-words text-muted-foreground">{related.short}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </Section>
      )}

      <PageOutro
        eyebrow={getBusinessTagline()}
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
