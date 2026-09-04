import Link from "next/link";
import { AlertTriangle, ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { EditorialServiceRows } from "@/components/EditorialServiceRows";
import { TeamMemberRows } from "@/components/TeamMemberRows";
import { HealthResourceRows } from "@/components/HealthResourceRows";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LeadGenForm } from "@/components/LeadGenForm";
import { ReviewsMarquee } from "@/components/ReviewsMarquee";
import { LogoMarquee } from "@/components/LogoMarquee";
import { BookingButton } from "@/components/BookingButton";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { JsonLd } from "@/components/JsonLd";
import { EditorialImageGrid, EditorialList, EditorialStatement, EditorialStats } from "@/components/blocks/EditorialBlocks";
import { FinalCTA } from "@/components/blocks/FinalCTA";
import { Section, SectionHeading, Eyebrow, StepList } from "@/components/blocks/PageBlocks";
import {
  buildLocalBusinessSchema,
  carePlans,
  clinic,
  clientStories,
  clinicExperienceFeatures,
  copy,
  differentiators,
  providers,
  emergencyInfo,
  faqs,
  getBusinessTagline,
  healthResources,
  howItWorks,
  logoMarquees,
  LOCATIONS_ADJACENT_MARQUEE_ID,
  marqueeReviews,
  sectionVisibility,
  services,
  trustStats,
} from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: getBusinessTagline(),
  description: "Thoughtful care conversations, clear service pathways, and a simple visit request process.",
  path: "/",
});

export default function Home() {
  // Top-of-page logo-marquee groups (excludes the Locations-adjacent group, rendered separately
  // below Locations). The first one is treated as the "primary" group and repositioned into a
  // card overlapping the hero's bottom edge; any further groups render inline beneath it.
  const topMarqueeGroups = logoMarquees.filter(
    (group) => group.items.length > 0 && group.id !== LOCATIONS_ADJACENT_MARQUEE_ID
  );
  const [primaryMarqueeGroup, ...otherMarqueeGroups] = topMarqueeGroups;

  return (
    <main>
      <JsonLd data={buildLocalBusinessSchema()} />

      {/* 1. Hero — full-bleed image with headline anchored lower-left, stat card floating
          upper-right, reusing the existing heroBadgeText/heroStatValue/heroStatCaption fields.
          1b. Trust/Logo Strip — the primary logo-marquee group repositioned into a rounded card
          that overlaps the hero's bottom edge. */}
      <ImmersiveHero
        eyebrow={getBusinessTagline()}
        headline={copy.home.heroHeadline}
        subheadline={copy.home.heroSubheadline}
        imageToken="[HERO_IMAGE]"
        badgeText={copy.home.heroBadgeText}
        cta={
          <>
            <BookingButton label="Book an Appointment" size="lg" />
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:underline"
            >
              Explore Services <ArrowUpRight size={15} />
            </Link>
          </>
        }
        stat={{ value: copy.home.heroStatValue, caption: copy.home.heroStatCaption }}
        tags={[...new Set(services.map((service) => service.category))].slice(0, 4)}
        utilityItems={[
          { label: "Call", value: clinic.phone },
          { label: "Hours", value: clinic.hours },
          { label: "Visit", value: clinic.city },
        ]}
        trustStrip={
          primaryMarqueeGroup && (
            <LogoMarquee
              ariaId={`${primaryMarqueeGroup.id}-marquee-title`}
              items={primaryMarqueeGroup.items.map((item) => ({ key: item.name, label: item.name }))}
              heading={primaryMarqueeGroup.heading}
              supportingText={primaryMarqueeGroup.subheading}
              className="bg-card"
            />
          )
        }
      />
      {otherMarqueeGroups.map((group) => (
        <LogoMarquee
          key={group.id}
          ariaId={`${group.id}-marquee-title`}
          items={group.items.map((item) => ({ key: item.name, label: item.name }))}
          heading={group.heading}
          supportingText={group.subheading}
        />
      ))}

      {/* 2. Editorial Statement — a single large-type claim (not a generic centered
          section), with a supporting CTA aligned independently alongside it rather
          than centered underneath. Reuses whyUsEyebrow/whyUsTitle/whyUsSubtitle. */}
      <ScrollReveal>
        <EditorialStatement
          eyebrow={copy.home.whyUsEyebrow}
          statement={copy.home.whyUsTitle}
          cta={
            <div className="flex flex-col gap-3">
              <p className="max-w-sm text-sm leading-relaxed break-words text-muted-foreground">{copy.home.whyUsSubtitle}</p>
              <Link href="/about" className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                More about us <ArrowUpRight size={15} />
              </Link>
            </div>
          }
        />
      </ScrollReveal>

      {/* 3. Image Story — asymmetric editorial image composition (one feature image
          plus supporting images), not a set of equal-sized cards. Reuses
          facilityEyebrow/facilityTitle and clinicExperienceFeatures. */}
      {sectionVisibility.clinicExperience && clinicExperienceFeatures.length > 0 && (
        <Section aria-labelledby="home-clinic-experience-title">
          <SectionHeading
            eyebrow={copy.home.facilityEyebrow}
            title={<span id="home-clinic-experience-title">{copy.home.facilityTitle}</span>}
          />
          <EditorialImageGrid
            images={clinicExperienceFeatures.slice(0, 3).map((feature) => ({
              token: feature.imageKey,
              label: "Business image",
              caption: feature.title,
            }))}
          />
        </Section>
      )}

      {/* 4. Stats — minimal horizontal number layout with thin rules, not stat cards. */}
      {sectionVisibility.trustStats && trustStats.length > 0 && (
        <ScrollReveal>
          <Section className="py-12 md:py-16" aria-labelledby="home-trust-stats-title">
            <span id="home-trust-stats-title" className="sr-only">
              {copy.home.trustStatsTitle}
            </span>
            <EditorialStats stats={trustStats.map((stat) => ({ value: stat.value, label: stat.label }))} />
          </Section>
        </ScrollReveal>
      )}

      {/* 5. Dark Editorial Services — full-bleed dark chapter (Tier1's own .dark palette,
          scoped to this subtree) with an oversized heading and the editorial service
          row list, instead of a generic light-background card grid. */}
      <div className="dark border-y border-border bg-background text-foreground">
        <ScrollReveal>
          <Section aria-labelledby="home-services-title">
            <h2 id="home-services-title" className="sr-only">
              {copy.home.servicesTitle}
            </h2>
            <EditorialServiceRows
              services={services.slice(0, 5)}
              eyebrow={copy.home.servicesEyebrow}
              title={copy.home.servicesTitle}
              description={copy.home.servicesSubtitle}
            />
          </Section>
        </ScrollReveal>
      </div>

      {/* 5b. How It Works — optional, only rendered when the client has process-step
          content and the section is enabled; continues the established visual language
          rather than being auto-inserted. */}
      {sectionVisibility.howItWorks && howItWorks.length > 0 && (
        <Section aria-labelledby="home-how-it-works-title">
          <SectionHeading
            eyebrow={copy.home.howItWorksEyebrow}
            title={<span id="home-how-it-works-title">{copy.home.howItWorksTitle}</span>}
            description={copy.home.howItWorksSubtitle}
          />
          <StepList steps={howItWorks} />
        </Section>
      )}

      {/* 6. Why Choose Us — numbered editorial rows instead of an equal-width
          white-card grid, consistent with the rest of the homepage's editorial
          language (rules + large type rather than boxed UI). */}
      {sectionVisibility.whyChooseUs && differentiators.length > 0 && (
        <ScrollReveal>
          <Section aria-labelledby="home-why-choose-title">
            <SectionHeading
              eyebrow={copy.home.whyUsEyebrow}
              title={<span id="home-why-choose-title">{copy.home.whyUsTitle}</span>}
              description={copy.home.whyUsSubtitle}
            />
            <EditorialList
              items={differentiators.map((item) => ({ title: item.title, description: item.copy }))}
            />
          </Section>
        </ScrollReveal>
      )}

      {/* 6a. Proactive Care for Every Stage — numbered editorial rows (title +
          bullets, right-aligned on desktop) instead of a 3-card grid, consistent
          with EditorialList used elsewhere on the page. */}
      {sectionVisibility.carePlans && carePlans.length > 0 && (
        <Section aria-labelledby="home-care-plans-title">
          <SectionHeading
            eyebrow={copy.home.carePlansEyebrow}
            title={<span id="home-care-plans-title">{copy.home.carePlansTitle}</span>}
          />
          <EditorialList
            items={carePlans.map((plan) => ({
              title: (
                <>
                  {plan.title}
                  <span className="ml-2 font-sans text-sm font-normal text-muted-foreground">{plan.subtitle}</span>
                </>
              ),
              trailing: (
                <ul className="flex min-w-0 flex-col gap-1 sm:items-end">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet} className="max-w-xs min-w-0 break-words text-sm leading-relaxed text-muted-foreground sm:text-right">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ),
            }))}
          />
          <Link
            href="/new-clients"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Explore New Client Info <ArrowUpRight size={15} />
          </Link>
        </Section>
      )}

      {/* 6b. Meet Our Team — reuses TeamMemberRows (same hover-reveal editorial
          list as the /team page) instead of a 4-card grid, so the homepage
          teaser and the full team index read as one system. */}
      {sectionVisibility.meetTheTeam && providers.length > 0 && (
        <ScrollReveal>
        <Section className="bg-secondary/30" aria-labelledby="home-team-title">
          <h2 id="home-team-title" className="sr-only">
            {copy.home.teamTitle}
          </h2>
          <TeamMemberRows
            providers={providers.slice(0, 4)}
            eyebrow={copy.home.teamEyebrow}
            title={copy.home.teamTitle}
            description={copy.home.teamSubtitle}
            action={
              <Link href="/team" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                Meet the full team <ArrowUpRight size={15} />
              </Link>
            }
          />
        </Section>
        </ScrollReveal>
      )}

      {/* Remaining clinicExperienceFeatures beyond the 3 used in the Image Story above
          (rendered earlier in the page) still get their copy surfaced, inline, so no
          client-provided content is silently dropped. */}
      {sectionVisibility.clinicExperience && clinicExperienceFeatures.length > 3 && (
        <Section aria-labelledby="home-clinic-experience-more-title">
          <span id="home-clinic-experience-more-title" className="sr-only">
            {copy.home.facilityTitle}
          </span>
          <p className="flex flex-wrap gap-x-8 gap-y-2 text-sm leading-relaxed break-words text-muted-foreground">
            {clinicExperienceFeatures.slice(3).map((feature) => (
              <span key={feature.title}>
                <strong className="font-semibold text-foreground">{feature.title}.</strong> {feature.copy}
              </span>
            ))}
          </p>
        </Section>
      )}

      {/* 7. Health & Wellness Resources — numbered rows with a hover image
          reveal (matching EditorialServiceRows' pattern) instead of a 3-card
          grid; links out to the full /resources index since this teaser's
          data (healthResources) has no per-article slug of its own. */}
      {sectionVisibility.healthResources && healthResources.length > 0 && (
        <Section className="bg-secondary/30" aria-labelledby="home-health-resources-title">
          <SectionHeading
            eyebrow={copy.home.resourcesEyebrow}
            title={<span id="home-health-resources-title">{copy.home.resourcesTitle}</span>}
            description={copy.home.resourcesSubtitle}
            action={
              <Link href="/resources" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                View all resources <ArrowUpRight size={15} />
              </Link>
            }
          />
          <HealthResourceRows resources={healthResources} />
        </Section>
      )}

      {/* 7b. Real Care. Real Stories. — asymmetric editorial rows (large
          pull-quote text + small inline photo) instead of equal-width white
          cards, consistent with the rest of the homepage's editorial rhythm. */}
      {sectionVisibility.clientStories && clientStories.length > 0 && (
        <Section aria-labelledby="home-success-stories-title">
          <Eyebrow>{copy.home.successStoriesTitle}</Eyebrow>
          <h2 id="home-success-stories-title" className="sr-only">
            {copy.home.successStoriesTitle}
          </h2>
          <div className="mt-5 divide-y divide-border border-t border-border">
            {clientStories.map((story) => (
              <div key={story.clientName} className="grid min-w-0 grid-cols-[4.5rem_1fr] items-start gap-4 py-6 sm:grid-cols-[6rem_1fr] sm:gap-8 sm:py-8">
                <ImagePlaceholder
                  label="Client photo"
                  token={story.imageKey}
                  className="aspect-square w-full rounded-full border-0"
                />
                <div className="flex min-w-0 flex-col gap-2">
                  <p className="font-heading min-w-0 max-w-2xl break-words text-lg leading-snug font-medium text-foreground sm:text-xl">
                    “{story.story}”
                  </p>
                  <Eyebrow>
                    {story.clientName} · {story.segment} · {story.category}
                  </Eyebrow>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <Link href="/success-stories" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              View all stories <ArrowUpRight size={15} />
            </Link>
            <p className="min-w-0 break-words text-xs leading-relaxed text-muted-foreground">
              {clinic.name} is a template demonstration business; these demo client stories are illustrative placeholders,
              not real outcomes.
            </p>
          </div>
        </Section>
      )}

      {/* 8. FAQ Teaser */}
      {sectionVisibility.faqTeaser && faqs.length > 0 && (
        <ScrollReveal>
        <Section className="bg-secondary/30">
          <SectionHeading eyebrow={copy.home.faqTeaserEyebrow} title={copy.home.faqTeaserTitle} description={copy.home.faqTeaserSubtitle} />
          <Accordion type="single" collapsible className="mx-auto max-w-3xl border-t border-border">
            {faqs.slice(0, 3).map((faq, index) => (
              <AccordionItem value={`faq-${index}`} key={faq.question}>
                <AccordionTrigger className="text-base font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mx-auto mt-6 max-w-3xl">
            <Link href="/faq" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              View all FAQs <ArrowUpRight size={15} />
            </Link>
          </div>
        </Section>
        </ScrollReveal>
      )}

      {/* 9. Visit Our Clinic */}
      <ScrollReveal>
      <Section aria-labelledby="home-location-title">
        <div className="grid min-w-0 gap-10 md:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-5">
            <SectionHeading
              eyebrow={copy.home.locationEyebrow}
              title={<span id="home-location-title">{copy.home.locationTitle}</span>}
              className="mb-0"
            />
            <div className="flex min-w-0 flex-col gap-5">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <span className="text-xs font-semibold tracking-wide text-primary uppercase">Address</span>
                  <p className="text-sm leading-relaxed break-words text-muted-foreground">
                    {clinic.address}
                    <br />
                    {clinic.city}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock3 size={20} className="mt-0.5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <span className="text-xs font-semibold tracking-wide text-primary uppercase">Hours</span>
                  <p className="text-sm leading-relaxed break-words text-muted-foreground">{clinic.hours}</p>
                </div>
              </div>
              {/* Content-completeness gate, not a sectionVisibility toggle: hides this
                  subsection only while emergencyInfo.note is still an unfilled clone
                  placeholder token (e.g. "[EMERGENCY_NOTE]"), so real visitors never see
                  literal bracket text on this emergency-procedures subsection. */}
              {!/^\[.*\]$/.test(emergencyInfo.note) && (
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="mt-0.5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold tracking-wide text-primary uppercase">Emergency</span>
                    <p className="text-sm leading-relaxed break-words text-muted-foreground">{emergencyInfo.note}</p>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/locations"
              className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              View locations, hours & emergency info <ArrowUpRight size={15} />
            </Link>
          </div>
          <dl className="grid content-start divide-y divide-border border-t border-border">
            {clinic.businessHours.map((entry) => (
              <div key={entry.days} className="flex min-w-0 items-center justify-between gap-4 py-4">
                <dt className="min-w-0 break-words text-sm font-semibold text-foreground">{entry.days}</dt>
                <dd className="min-w-0 break-words text-right text-sm font-semibold text-primary">{entry.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
      </ScrollReveal>

      {/* 9a. Trust/Reviews Marquee — sits directly under the location section rather than
          as an arbitrary hero/global strip, so it reads as "here's proof, right where you're
          deciding whether to visit." */}
      {sectionVisibility.reviewsMarquee && marqueeReviews.length > 0 && (
        <>
          <ReviewsMarquee heading={copy.home.reviewsTitle} supportingText={copy.home.reviewsSubtitle} />
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <Link href="/proof" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              {copy.home.reviewsLinkLabel} <ArrowUpRight size={15} />
            </Link>
          </div>
        </>
      )}

      {/* 9b. Locations-adjacent Logo Marquee Group (e.g. Insurance) */}
      {logoMarquees
        .filter((group) => group.items.length > 0 && group.id === LOCATIONS_ADJACENT_MARQUEE_ID)
        .map((group) => (
          <div key={group.id}>
            <LogoMarquee
              ariaId={`${group.id}-marquee-title`}
              items={group.items.map((item) => ({ key: item.name, label: item.name }))}
              heading={group.heading}
              supportingText={group.subheading}
              className="bg-secondary/30"
            />
            <p className="bg-secondary/30 pb-10 text-center text-sm text-muted-foreground">
              {copy.home.insuranceCtaPrompt}{" "}
              <a href={`tel:${clinic.phoneDigits}`} className="font-semibold text-primary hover:underline">
                {clinic.phone}
              </a>
            </p>
          </div>
        ))}

      {/* 9c. Lead Generation Form */}
      <Section id="contact-form" className="bg-secondary/30" aria-labelledby="home-lead-form-title">
        <SectionHeading
          align="center"
          title={<span id="home-lead-form-title">{copy.home.leadGenForm.heading}</span>}
          description={copy.home.leadGenForm.subheading}
          className="mb-8"
        />
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <Card className="gap-0 overflow-hidden p-0">
            <div className="flex min-w-0 flex-col gap-5 p-6">
              <span className="min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">{clinic.name}</span>
              <div className="flex min-w-0 flex-col gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold tracking-wide text-primary uppercase">Address</span>
                    <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">
                      <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        {clinic.address}
                        <br />
                        {clinic.city}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex min-w-0 items-start gap-3">
                  <Phone size={20} className="mt-0.5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold tracking-wide text-primary uppercase">Contact</span>
                    <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">
                      <a href={`tel:${clinic.phoneDigits}`} className="hover:text-primary">
                        {clinic.phone}
                      </a>
                      <br />
                      <a href={`mailto:${clinic.email}`} className="hover:text-primary">
                        {clinic.email}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex min-w-0 items-start gap-3">
                  <Clock3 size={20} className="mt-0.5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold tracking-wide text-primary uppercase">Hours</span>
                    <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">
                      {clinic.businessHours.map((entry) => (
                        <span key={entry.days} className="block">
                          {entry.days}: {entry.hours}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <LeadGenForm className="max-w-none" />
        </div>
      </Section>

      {/* 10. Final CTA */}
      <FinalCTA
        eyebrow={getBusinessTagline()}
        title={copy.home.finalCtaTitle}
        decorative={clinic.shortName}
        cta={
          <div className="flex flex-col gap-3">
            <p className="max-w-sm text-sm leading-relaxed break-words text-background/75">{copy.home.finalCtaSubtitle}</p>
            <BookingButton label="Book an Appointment" variant="secondary" size="lg" className="w-fit" />
          </div>
        }
      />
    </main>
  );
}
