import Link from "next/link";
import { ArrowUpRight, Clock3, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { LeadGenForm } from "@/components/LeadGenForm";
import { BookingButton } from "@/components/BookingButton";
import { JsonLd } from "@/components/JsonLd";
import { LocationMap } from "@/components/LocationMap";
import { Section, SectionHeading } from "@/components/blocks/PageBlocks";
import { FinalCTA } from "@/components/blocks/FinalCTA";
import { EditorialList } from "@/components/blocks/EditorialBlocks";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { buildLocalBusinessSchema, clinic, copy, differentiators, faqs, getBusinessTagline, services } from "@/lib/business-content";
import { locations } from "@/data/locations";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: `Contact — ${getBusinessTagline()}`,
  description: `Get in touch with ${clinic.name} — phone, email, hours, and a direct message form.`,
  path: "/contact",
});

export default function Contact() {
  return (
    <main>
      <JsonLd data={buildLocalBusinessSchema()} />

      <ImmersiveHero
        eyebrow={copy.contact.heroEyebrow}
        headline={copy.contact.heroTitle}
        subheadline={copy.contact.heroSubtitle}
        imageToken="[BUSINESS_IMAGE]"
        imageLabel="Business image"
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

      {locations.length === 1 && (
        <ScrollReveal>
          <Section aria-labelledby="contact-visit-title">
            <SectionHeading
              eyebrow={copy.contact.visitEyebrow}
              title={<span id="contact-visit-title">{copy.contact.visitTitle}</span>}
              action={
                <Link href={`/locations/${locations[0].slug}`} className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                  View full location details <ArrowUpRight size={15} />
                </Link>
              }
            />
            <LocationMap
              address={locations[0].address}
              city={locations[0].city}
              landmark={locations[0].landmark}
              landmarkLabel={copy.location.landmarkLabel}
            />
          </Section>
        </ScrollReveal>
      )}

      {locations.length > 1 && (
        <ScrollReveal>
          <Section aria-labelledby="contact-visit-title">
            <SectionHeading
              eyebrow={copy.contact.visitEyebrow}
              title={<span id="contact-visit-title">{copy.contact.visitTitle}</span>}
              action={
                <Link href="/locations" className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                  {copy.contact.viewAllLocationsLabel} <ArrowUpRight size={15} />
                </Link>
              }
            />
            <div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {locations.map((location) => (
                <div key={location.slug} className="flex min-w-0 flex-col gap-2 rounded-2xl border border-border p-5">
                  <Link href={`/locations/${location.slug}`} className="min-w-0">
                    <h3 className="min-w-0 break-words text-base font-semibold text-foreground hover:text-primary">{location.name}</h3>
                  </Link>
                  <p className="flex min-w-0 items-start gap-2 text-sm leading-relaxed break-words text-muted-foreground">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                    {location.address}, {location.city}
                  </p>
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Get Directions <Navigation size={14} />
                  </a>
                </div>
              ))}
            </div>
          </Section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <Section className={locations.length > 0 ? "bg-secondary/30" : undefined} aria-labelledby="contact-form-title">
          <SectionHeading eyebrow={copy.contact.formEyebrow} title={<span id="contact-form-title">{copy.contact.formTitle}</span>} align="center" />
          <LeadGenForm source="contact-page-form" />
        </Section>
      </ScrollReveal>

      {services.length > 0 && (
        <ScrollReveal>
          <Section className="flex flex-wrap items-center justify-between gap-4">
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

      <FinalCTA
        eyebrow={getBusinessTagline()}
        title={copy.contact.ctaTitle}
        cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
