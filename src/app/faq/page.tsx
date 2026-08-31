import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BookingButton } from "@/components/BookingButton";
import { JsonLd } from "@/components/JsonLd";
import { Section, SectionHeading, FeatureCard, PageOutro } from "@/components/blocks/PageBlocks";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { buildFaqSchema, clinic, copy, faqs, getBusinessTagline } from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";

// Categories are derived from faqs data (first-seen order), not a fixed list — a client whose
// FAQ set uses different category names never has entries silently dropped from this page.
const categoryOrder = Array.from(new Set(faqs.map((faq) => faq.category)));
const categories = categoryOrder
  .map((label) => ({ label, items: faqs.filter((faq) => faq.category === label) }))
  .filter((category) => category.items.length);

export const metadata = buildMetadata({
  title: `FAQ — ${getBusinessTagline()}`,
  description: `Answers to common questions about requesting a visit at ${getBusinessTagline()}.`,
  path: "/faq",
});

export default function FAQ() {
  return (
    <main>
      <JsonLd data={buildFaqSchema(faqs)} />

      <ImmersiveHero
        eyebrow={copy.faq.heroEyebrow}
        headline={copy.faq.heroTitle}
        subheadline={copy.faq.heroSubtitle}
        imageToken="[CLINIC_IMAGE]"
        imageLabel="Clinic image"
        cta={<BookingButton label="Book an Appointment" size="lg" />}
        stat={{ value: String(faqs.length), caption: "questions answered" }}
      />

      <ScrollReveal>
      <Section containerClassName="max-w-4xl">
        <h2 className="font-heading mb-3 min-w-0 break-words text-4xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-6xl">
          Frequently
          <br />
          asked questions
        </h2>
        {categories.length > 1 && (
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button key={category.label} asChild variant="outline" size="sm" className="rounded-full">
                <a href={`#faq-${category.label}`}>{category.label}</a>
              </Button>
            ))}
          </div>
        )}
        {categories.map((category, index) => (
          <div key={category.label} className={index > 0 ? "mt-12" : "mt-10"} aria-labelledby={`faq-${category.label}-heading`}>
            <h3
              id={`faq-${category.label}-heading`}
              className="font-heading min-w-0 scroll-mt-24 break-words text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              <a id={`faq-${category.label}`} className="scroll-mt-24 no-underline">
                {category.label}
              </a>
            </h3>
            <Accordion type="single" collapsible className="mt-4 border-t border-border">
              {category.items.map((faq, itemIndex) => (
                <AccordionItem value={`${category.label}-${itemIndex}`} key={faq.question}>
                  <AccordionTrigger className="text-base font-semibold">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </Section>
      </ScrollReveal>

      <ScrollReveal>
      <Section className="bg-secondary/30" aria-labelledby="faq-contact-title">
        <SectionHeading
          eyebrow={copy.faq.contactEyebrow}
          title={<span id="faq-contact-title">{copy.faq.contactTitle}</span>}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <FeatureCard
            label={copy.faq.callLabel}
            title={<a href={`tel:${clinic.phoneDigits}`} className="hover:text-primary">{clinic.phone}</a>}
            description={copy.faq.callDescription}
          />
          <FeatureCard
            label={copy.faq.emailLabel}
            title={<a href={`mailto:${clinic.email}`} className="hover:text-primary">{clinic.email}</a>}
            description={copy.faq.emailDescription}
          />
        </div>
      </Section>
      </ScrollReveal>

      <ScrollReveal>
        <PageOutro
          eyebrow={getBusinessTagline()}
          title={copy.faq.ctaTitle}
          cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
        />
      </ScrollReveal>
    </main>
  );
}
