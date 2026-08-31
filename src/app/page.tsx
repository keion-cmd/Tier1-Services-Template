import Link from "next/link";
import { AlertTriangle, ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { EditorialServiceRows } from "@/components/EditorialServiceRows";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LeadGenForm } from "@/components/LeadGenForm";
import { ReviewsMarquee } from "@/components/ReviewsMarquee";
import { LogoMarquee } from "@/components/LogoMarquee";
import { BookingButton } from "@/components/BookingButton";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { JsonLd } from "@/components/JsonLd";
import { EditorialImageGrid } from "@/components/blocks/EditorialBlocks";
import { FinalCTA } from "@/components/blocks/FinalCTA";
import { Section, SectionHeading, Eyebrow, FeatureCard, StepList, StatBlock } from "@/components/blocks/PageBlocks";
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
import { cn } from "@/lib/utils";

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

      {/* 1c. Approach — alternating dark section (Tier1's own .dark palette, scoped to this
          subtree). Reuses facilityEyebrow/whyUsTitle/whyUsSubtitle and the first 3
          clinicExperienceFeatures images rather than introducing new required fields. */}
      {clinicExperienceFeatures.length > 0 && (
        <section className="dark border-b border-border bg-background text-foreground">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 md:gap-16">
              <div className="flex min-w-0 flex-col gap-3">
                <Eyebrow>{copy.home.facilityEyebrow}</Eyebrow>
                <h2 className="font-heading text-3xl leading-tight font-bold tracking-tight break-words sm:text-4xl">
                  {copy.home.whyUsTitle}
                </h2>
              </div>
              <p className="min-w-0 break-words text-base leading-relaxed text-muted-foreground md:pt-1">
                {copy.home.whyUsSubtitle}
              </p>
            </div>
            {/* Grid density adapts to however many features the client actually provided
                (1-3+) instead of requiring exactly 3 or hiding the whole section. */}
            <div
              className={cn(
                "mt-10 grid gap-4",
                clinicExperienceFeatures.length === 1 && "max-w-md sm:grid-cols-1",
                clinicExperienceFeatures.length === 2 && "sm:grid-cols-2",
                clinicExperienceFeatures.length >= 3 && "sm:grid-cols-3"
              )}
            >
              {clinicExperienceFeatures.slice(0, 3).map((feature) => (
                <div key={feature.title} className="overflow-hidden rounded-2xl">
                  <ImagePlaceholder label="Business image" token={feature.imageKey} className="aspect-[4/3] w-full border-0" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. Trust Stats Bar */}
      {sectionVisibility.trustStats && trustStats.length > 0 && (
        <ScrollReveal>
          <Section className="py-12 md:py-16" aria-labelledby="home-trust-stats-title">
            <span id="home-trust-stats-title" className="sr-only">
              {copy.home.trustStatsTitle}
            </span>
            <StatBlock stats={trustStats} />
          </Section>
        </ScrollReveal>
      )}

      {/* 2b. How It Works */}
      {sectionVisibility.howItWorks && howItWorks.length > 0 && (
        <Section className="bg-secondary/30" aria-labelledby="home-how-it-works-title">
          <SectionHeading
            eyebrow={copy.home.howItWorksEyebrow}
            title={<span id="home-how-it-works-title">{copy.home.howItWorksTitle}</span>}
            description={copy.home.howItWorksSubtitle}
          />
          <StepList steps={howItWorks} />
        </Section>
      )}

      {/* 3. Services — editorial row list: sticky heading + hover-revealed
          preview image on desktop, plain vertical list on mobile. */}
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

      {/* 4. Why Choose Us */}
      {sectionVisibility.whyChooseUs && differentiators.length > 0 && (
        <ScrollReveal>
          <Section className="bg-secondary/30" aria-labelledby="home-why-choose-title">
            <SectionHeading
              eyebrow={copy.home.whyUsEyebrow}
              title={<span id="home-why-choose-title">{copy.home.whyUsTitle}</span>}
              description={copy.home.whyUsSubtitle}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((item) => (
                <FeatureCard key={item.title} title={item.title} description={item.copy} icon={item.icon} />
              ))}
            </div>
          </Section>
        </ScrollReveal>
      )}

      {/* 4a. Proactive Care for Every Stage */}
      {sectionVisibility.carePlans && carePlans.length > 0 && (
        <Section aria-labelledby="home-care-plans-title">
          <SectionHeading
            eyebrow={copy.home.carePlansEyebrow}
            title={<span id="home-care-plans-title">{copy.home.carePlansTitle}</span>}
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {carePlans.map((plan) => (
              <Card key={plan.title} className="card-hover p-6">
                <span className="text-sm break-words text-muted-foreground">{plan.subtitle}</span>
                <h3 className="text-xl font-semibold break-words text-foreground">{plan.title}</h3>
                <ul className="mt-1 flex flex-col gap-1.5 pl-4 text-sm leading-relaxed break-words text-muted-foreground">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet} className="list-disc">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <Link
            href="/new-clients"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Explore New Client Info <ArrowUpRight size={15} />
          </Link>
        </Section>
      )}

      {/* 4b. Meet Our Team */}
      {sectionVisibility.meetTheTeam && providers.length > 0 && (
        <ScrollReveal>
        <Section className="bg-secondary/30" aria-labelledby="home-team-title">
          <SectionHeading
            eyebrow={copy.home.teamEyebrow}
            title={<span id="home-team-title">{copy.home.teamTitle}</span>}
            description={copy.home.teamSubtitle}
            action={
              <Link href="/team" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                Meet the full team <ArrowUpRight size={15} />
              </Link>
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {providers.map((provider) => (
              <Card key={provider.slug} className="card-hover gap-3 p-4">
                <ImagePlaceholder label="Provider photo" token={provider.imageKey} className="card-hover-image aspect-[4/3] w-full rounded-xl" />
                <div className="flex min-w-0 flex-col gap-1.5 px-1">
                  <span className="text-xs font-semibold tracking-wide break-words text-primary uppercase">{provider.specialty}</span>
                  <h3 className="text-lg font-semibold break-words text-foreground">
                    {provider.name}, {provider.credentials}
                  </h3>
                  <p className="text-sm leading-relaxed break-words text-muted-foreground">{provider.bio}</p>
                  <Link
                    href={`/team/${provider.slug}`}
                    className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    View profile <ArrowUpRight size={15} />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Section>
        </ScrollReveal>
      )}

      {/* 5b. Designed Around Your Comfort */}
      {sectionVisibility.clinicExperience && clinicExperienceFeatures.length > 0 && (
        <Section aria-labelledby="home-clinic-experience-title">
          <SectionHeading
            eyebrow={copy.home.facilityEyebrow}
            title={<span id="home-clinic-experience-title">{copy.home.facilityTitle}</span>}
          />
          {/* Layout degrades to however many features exist via EditorialImageGrid: a lone
              feature is a single full image, 2-3 add supporting images alongside it — instead
              of the whole section disappearing below a fixed minimum count. */}
          <EditorialImageGrid
            images={clinicExperienceFeatures.slice(0, 3).map((feature) => ({
              token: feature.imageKey,
              label: "Business image",
              caption: feature.title,
            }))}
          />
          {clinicExperienceFeatures.length > 3 && (
            <p className="mt-7 flex flex-wrap gap-x-8 gap-y-2 text-sm leading-relaxed break-words text-muted-foreground">
              {clinicExperienceFeatures.slice(3).map((feature) => (
                <span key={feature.title}>
                  <strong className="font-semibold text-foreground">{feature.title}.</strong> {feature.copy}
                </span>
              ))}
            </p>
          )}
        </Section>
      )}

      {/* 7. Health & Wellness Resources */}
      {sectionVisibility.healthResources && healthResources.length > 0 && (
        <Section className="bg-secondary/30" aria-labelledby="home-health-resources-title">
          <SectionHeading
            eyebrow={copy.home.resourcesEyebrow}
            title={<span id="home-health-resources-title">{copy.home.resourcesTitle}</span>}
            description={copy.home.resourcesSubtitle}
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {healthResources.map((article) => (
              <Card key={article.title} className="gap-0 overflow-hidden p-0">
                <ImagePlaceholder label="Resource image" token={article.imageKey} className="aspect-[16/10] w-full border-0" />
                <div className="flex min-w-0 flex-col gap-1.5 p-5">
                  <span className="min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">{copy.home.resourceCardLabel}</span>
                  <h3 className="text-lg font-semibold break-words text-foreground">{article.title}</h3>
                  <p className="text-sm leading-relaxed break-words text-muted-foreground">{article.excerpt}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* 7b. Real Care. Real Stories. */}
      {sectionVisibility.clientStories && clientStories.length > 0 && (
        <Section className="bg-secondary/30" aria-labelledby="home-success-stories-title">
          <Eyebrow>{copy.home.successStoriesTitle}</Eyebrow>
          <h2 id="home-success-stories-title" className="sr-only">
            {copy.home.successStoriesTitle}
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {clientStories.map((story) => (
              <Card key={story.clientName} className="gap-2.5 p-4">
                <ImagePlaceholder label="Client photo" token={story.imageKey} className="aspect-[4/3] w-full rounded-xl" />
                <div className="flex min-w-0 flex-col gap-1.5 px-1">
                  <Eyebrow>
                    {story.clientName} · {story.segment} · {story.category}
                  </Eyebrow>
                  <p className="text-sm leading-relaxed break-words text-muted-foreground">{story.story}</p>
                </div>
              </Card>
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
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow={copy.home.locationEyebrow}
              title={<span id="home-location-title">{copy.home.locationTitle}</span>}
              className="mb-0"
            />
            <div className="flex flex-col gap-5">
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
              <div key={entry.days} className="flex items-center justify-between gap-4 py-4">
                <dt className="text-sm font-semibold break-words text-foreground">{entry.days}</dt>
                <dd className="text-sm font-semibold break-words text-right text-primary">{entry.hours}</dd>
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
