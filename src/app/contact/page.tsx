import Link from "next/link";
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { LeadGenForm } from "@/components/LeadGenForm";
import { BookingButton } from "@/components/BookingButton";
import { Section, SectionHeading, PageOutro } from "@/components/blocks/PageBlocks";
import { EditorialList } from "@/components/blocks/EditorialBlocks";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { clinic, copy, differentiators, faqs, getBusinessTagline, services } from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: `Contact — ${getBusinessTagline()}`,
  description: `Get in touch with ${clinic.name} — phone, email, hours, and a direct message form.`,
  path: "/contact",
});

export default function Contact() {
  return (
    <main>
      <ImmersiveHero
        eyebrow={copy.contact.heroEyebrow}
        headline={copy.contact.heroTitle}
        subheadline={copy.contact.heroSubtitle}
        imageToken="[CLINIC_IMAGE]"
        imageLabel="Clinic image"
        cta={<BookingButton label="Book an Appointment" size="lg" />}
      />

      {differentiators.length > 0 && (
        <ScrollReveal>
          <Section aria-labelledby="contact-why-title">
            <SectionHeading eyebrow={copy.contact.whyEyebrow} title={<span id="contact-why-title">{copy.contact.whyTitle}</span>} />
            <EditorialList items={differentiators.map((item) => ({ title: item.title, description: item.copy }))} />
          </Section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <Section className="bg-secondary/30" aria-labelledby="contact-methods-title">
          <SectionHeading eyebrow={copy.contact.methodsEyebrow} title={<span id="contact-methods-title">{copy.contact.methodsTitle}</span>} />
          <div className="grid min-w-0 gap-x-10 gap-y-8 border-t border-border pt-8 sm:grid-cols-2">
            {[
              { icon: Phone, value: <a href={`tel:${clinic.phoneDigits}`} className="hover:text-primary">{clinic.phone}</a>, note: "Call us directly" },
              { icon: Mail, value: <a href={`mailto:${clinic.email}`} className="hover:text-primary">{clinic.email}</a>, note: "Email us anytime" },
              { icon: MapPin, value: clinic.address, note: clinic.city },
              { icon: Clock3, value: clinic.hours, note: "Business hours" },
            ].map(({ icon: Icon, value, note }, i) => (
              <div key={i} className="flex min-w-0 items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-card text-primary">
                  <Icon size={18} />
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="min-w-0 max-w-full break-words text-base font-semibold text-foreground">{value}</span>
                  <span className="min-w-0 break-words text-sm text-muted-foreground">{note}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </ScrollReveal>

      <ScrollReveal>
        <Section aria-labelledby="contact-form-title">
          <SectionHeading eyebrow={copy.contact.formEyebrow} title={<span id="contact-form-title">{copy.contact.formTitle}</span>} align="center" />
          <LeadGenForm />
        </Section>
      </ScrollReveal>

      {services.length > 0 && (
        <ScrollReveal>
          <Section className="bg-secondary/30 flex flex-wrap items-center justify-between gap-4">
            <p className="min-w-0 max-w-2xl break-words text-sm leading-relaxed text-muted-foreground">
              Not sure which service fits your needs?
            </p>
            <Link href="/services" className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              Explore our services <ArrowUpRight size={15} />
            </Link>
          </Section>
        </ScrollReveal>
      )}

      {faqs.length > 0 && (
        <ScrollReveal>
          <Section className="flex flex-wrap items-center justify-between gap-4">
            <p className="min-w-0 max-w-2xl break-words text-sm leading-relaxed text-muted-foreground">
              Have a quick question before reaching out?
            </p>
            <Link href="/faq" className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              Read common questions <ArrowUpRight size={15} />
            </Link>
          </Section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <PageOutro
          eyebrow={getBusinessTagline()}
          title={copy.contact.ctaTitle}
          cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
        />
      </ScrollReveal>
    </main>
  );
}
