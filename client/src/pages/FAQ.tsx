import { Mail, PawPrint, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, FeatureCard, PageOutro } from "@/components/PageBlocks";
import { assets, buildFaqSchema, clinic, faqs } from "@/lib/clinic-content";

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
        eyebrowIcon={PawPrint}
        eyebrow="Frequently asked"
        title={
          <>
            Questions, <span className="text-primary">answered clearly.</span>
          </>
        }
        description="A few honest answers about how booking, visits, and next steps actually work."
        cta={<BookingButton label="Book an Appointment" />}
        image={{ src: assets.clinicHero, alt: `${clinic.name} consultation space` }}
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
          icon={Phone}
          eyebrow="Still have a question?"
          title={
            <span id="faq-contact-title">
              Reach us <span className="text-primary">directly.</span>
            </span>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <FeatureCard
            icon={Phone}
            label="Call the clinic"
            title={<a href={`tel:${clinic.phoneDigits}`} className="hover:text-primary">{clinic.phone}</a>}
            description="Available during posted business hours for follow-up questions."
          />
          <FeatureCard
            icon={Mail}
            label="Email the team"
            title={<a href={`mailto:${clinic.email}`} className="hover:text-primary">{clinic.email}</a>}
            description="For non-urgent questions or details you'd rather write out."
          />
        </div>
      </Section>

      <PageOutro
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={
          <>
            Ready for a <span className="text-primary-foreground/80">real answer?</span>
          </>
        }
        cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
