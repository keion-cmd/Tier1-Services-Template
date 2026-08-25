import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, FeatureCard, PageOutro } from "@/components/PageBlocks";
import { buildFaqSchema, clinic, copy, faqs } from "@/lib/business-content";

const categoryOrder = ["Requests & visits", "First visit", "Emergency", "Payment & insurance"] as const;
const categories = categoryOrder
  .map((label) => ({ label, items: faqs.filter((faq) => faq.category === label) }))
  .filter((category) => category.items.length);

export default function FAQ() {
  return (
    <main>
      <PageMeta
        title={`FAQ — ${clinic.name} ${clinic.descriptor}`}
        description={`Answers to common questions about requesting a visit at ${clinic.name} ${clinic.descriptor}.`}
        path="/faq"
        jsonLd={buildFaqSchema(faqs)}
      />

      <PageHero
        eyebrow={copy.faq.heroEyebrow}
        title={copy.faq.heroTitle}
        description={copy.faq.heroSubtitle}
        cta={<BookingButton label="Book an Appointment" />}
        image={{ label: "Clinic image", token: "[CLINIC_IMAGE]" }}
      />

      <Section containerClassName="max-w-4xl">
        {categories.map((category, index) => (
          <div key={category.label} className={index > 0 ? "mt-10" : undefined} aria-labelledby={`faq-${category.label}`}>
            <span id={`faq-${category.label}`} className="text-xs font-semibold tracking-wide text-primary uppercase">
              {category.label}
            </span>
            <Accordion type="single" collapsible className="mt-3 border-t border-border">
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

      <PageOutro
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={copy.faq.ctaTitle}
        cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
