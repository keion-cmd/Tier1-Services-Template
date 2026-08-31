import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookingButton } from "@/components/BookingButton";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { JsonLd } from "@/components/JsonLd";
import { Section, SectionHeading } from "@/components/blocks/PageBlocks";
import { FinalCTA } from "@/components/blocks/FinalCTA";
import { EditorialStatement, EditorialList, EditorialTimeline } from "@/components/blocks/EditorialBlocks";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { buildBreadcrumbSchema, copy, faqs, getBusinessTagline, getProvidersByService, getServiceBySlug, marqueeReviews, services } from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";
import { isPlaceholderToken } from "@/lib/utils";

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
  const serviceProviders = getProvidersByService(service.slug);
  const serviceReviews = marqueeReviews.filter(
    (review) => review.serviceSlug === service.slug && !isPlaceholderToken(review.quote)
  );

  return (
    <main>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />

      <ImmersiveHero
        eyebrow={`${service.number} · ${copy.services.cardLabel}`}
        headline={service.title}
        subheadline={service.detail}
        imageToken={service.imageKey}
        imageLabel="Service image"
        cta={<BookingButton label="Book an Appointment" size="lg" />}
        stat={{ value: service.duration, caption: "typical duration" }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-border pb-6">
          <Link href="/services" className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            <ArrowLeft size={15} /> All Services
          </Link>
          <BookingButton label="Schedule Your Care" variant="link" iconSize={15} className="h-auto p-0" />
        </div>
      </div>

      <ScrollReveal>
        <EditorialStatement eyebrow="About this service" statement={service.short} />
      </ScrollReveal>

      {service.bestFor && service.bestFor.length > 0 && (
        <ScrollReveal>
        <Section className="bg-secondary/30" aria-labelledby="service-best-for-title">
          <SectionHeading
            eyebrow="Is this right for you?"
            title={<span id="service-best-for-title">This service is a good fit if...</span>}
            className="mb-6"
          />
          <div className="flex flex-wrap gap-3">
            {service.bestFor.map((reason) => (
              <span
                key={reason}
                className="inline-flex min-w-0 max-w-full items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-2.5 text-sm leading-snug break-words text-foreground"
              >
                <Sparkles size={16} className="shrink-0 text-primary" />
                {reason}
              </span>
            ))}
          </div>
        </Section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <Section aria-labelledby="service-benefits-title">
          <SectionHeading eyebrow={copy.serviceDetail.benefitsEyebrow} title={<span id="service-benefits-title" className="sr-only">{copy.serviceDetail.benefitsEyebrow}</span>} className="mb-6" />
          <EditorialList items={service.benefits.map((benefit) => ({ title: benefit }))} />
        </Section>
      </ScrollReveal>

      <ScrollReveal>
        <Section className="bg-secondary/30" aria-labelledby="service-process-title">
          <SectionHeading
            eyebrow={copy.serviceDetail.processEyebrow}
            title={<span id="service-process-title">{copy.serviceDetail.processTitle}</span>}
          />
          <EditorialTimeline
            items={service.process.map((step) => ({ label: `Step ${step.step}`, title: step.title, description: step.description }))}
          />
        </Section>
      </ScrollReveal>

      {serviceReviews.length > 0 && (
        <ScrollReveal>
        <Section aria-labelledby="service-proof-title">
          <SectionHeading
            eyebrow="Client feedback"
            title={<span id="service-proof-title">What clients say about {service.title.toLowerCase()}</span>}
          />
          <div className={`grid gap-5 ${serviceReviews.length === 1 ? "max-w-md" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {serviceReviews.map((review) => (
              <Card key={review.author} className="gap-3 p-5">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: review.rating }).map((_, starIndex) => (
                    <Star key={starIndex} size={13} fill="currentColor" />
                  ))}
                </div>
                <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">&ldquo;{review.quote}&rdquo;</p>
                <span className="min-w-0 break-words text-xs font-semibold text-foreground">
                  {review.author} · {review.segment}
                </span>
              </Card>
            ))}
          </div>
        </Section>
        </ScrollReveal>
      )}

      {serviceProviders.length > 0 && (
        <ScrollReveal>
        <Section className="bg-secondary/30" aria-labelledby="service-providers-title">
          <SectionHeading
            eyebrow="Meet the team"
            title={<span id="service-providers-title">Who provides {service.title.toLowerCase()}</span>}
          />
          <div className={`grid gap-5 ${serviceProviders.length === 1 ? "mx-auto max-w-sm" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {serviceProviders.map((provider) => (
              <Link key={provider.slug} href={`/team/${provider.slug}`} aria-label={`View ${provider.name}'s profile`}>
                <Card className="card-hover gap-3 p-4">
                  <ImagePlaceholder label="Provider photo" token={provider.imageKey} className="card-hover-image aspect-[4/3] w-full rounded-xl" />
                  <div className="flex min-w-0 flex-col gap-1.5 px-1">
                    <span className="min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">{provider.specialty}</span>
                    <h3 className="min-w-0 break-words text-lg font-semibold text-foreground">
                      {provider.name}, {provider.credentials}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
        </ScrollReveal>
      )}

      {serviceFaqs.length > 0 && (
        <ScrollReveal>
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
        </ScrollReveal>
      )}

      {relatedServices.length > 0 && (
        <ScrollReveal>
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
        </ScrollReveal>
      )}

      <FinalCTA
        eyebrow={getBusinessTagline()}
        title={
            <>
              Ready to talk through <span className="text-background/70">{service.title.toLowerCase()}?</span>
            </>
          }
        cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
