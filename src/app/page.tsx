import Link from "next/link";
import { AlertTriangle, ArrowUpRight, Clock3, MapPin, ShieldCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { InteractiveServiceGallery } from "@/components/InteractiveServiceGallery";
import { LeadGenForm } from "@/components/LeadGenForm";
import { ReviewsMarquee } from "@/components/ReviewsMarquee";
import { LogoMarquee } from "@/components/LogoMarquee";
import { BookingButton } from "@/components/BookingButton";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { JsonLd } from "@/components/JsonLd";
import { Section, SectionHeading, Eyebrow, FeatureCard, StepList, StatBlock, PageOutro } from "@/components/blocks/PageBlocks";
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
  healthResources,
  howItWorks,
  marqueeReviews,
  sectionVisibility,
  trustStats,
} from "@/lib/business-content";
import { industryBrands } from "@/lib/industryBrands";
import { insuranceProviders } from "@/data/insurance";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: `${clinic.name} ${clinic.descriptor}`,
  description: "Thoughtful care conversations, clear service pathways, and a simple visit request process.",
  path: "/",
});

export default function Home() {
  return (
    <main>
      <JsonLd data={buildLocalBusinessSchema()} />

      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:grid-cols-2 md:items-center md:py-20 lg:px-8">
          <div className="flex min-w-0 flex-col gap-5">
            <Eyebrow>{clinic.name} {clinic.descriptor}</Eyebrow>
            <h1 className="text-5xl leading-[1.03] font-extrabold tracking-tight text-foreground break-words sm:text-6xl">
              {copy.home.heroHeadline}
            </h1>
            <p className="max-w-md text-base leading-relaxed break-words text-muted-foreground">{copy.home.heroSubheadline}</p>
            <div className="flex flex-wrap items-center gap-5 pt-1">
              <BookingButton label="Book an Appointment" size="lg" />
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Explore Services <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          <div className="min-w-0 overflow-hidden rounded-3xl border border-border shadow-sm">
            <ImagePlaceholder label="Hero image" token="[HERO_IMAGE]" className="aspect-[4/3] h-full w-full border-0" />
          </div>
        </div>
      </section>

      {/* 1b. Industry Partner Marquee */}
      {sectionVisibility.industryBrandsMarquee && (
        <LogoMarquee
          ariaId="industry-brand-marquee-title"
          items={industryBrands.map((brand) => ({ key: brand.name, label: brand.name }))}
          heading={copy.home.industryBrandsHeadline}
          supportingText={copy.home.industryBrandsSubheadline}
        />
      )}

      {/* 1c. Insurance Marquee */}
      {sectionVisibility.insuranceMarquee && (
        <LogoMarquee
          ariaId="insurance-marquee-title"
          items={insuranceProviders.map((provider) => ({
            key: provider.id,
            label: provider.name,
            icon: <ShieldCheck size={16} className="shrink-0 text-muted-foreground" aria-hidden />,
          }))}
          heading={copy.home.insuranceHeadline}
          supportingText={copy.home.insuranceSubheadline}
        />
      )}

      {/* 2. Trust Stats Bar */}
      {sectionVisibility.trustStats && trustStats.length > 0 && (
        <Section className="py-12 md:py-16" aria-labelledby="home-trust-stats-title">
          <span id="home-trust-stats-title" className="sr-only">
            {copy.home.trustStatsTitle}
          </span>
          <StatBlock stats={trustStats} />
        </Section>
      )}

      {/* 3. Services Showcase */}
      <Section aria-labelledby="home-services-title">
        <SectionHeading
          eyebrow={copy.home.servicesEyebrow}
          title={<span id="home-services-title">{copy.home.servicesTitle}</span>}
          description={copy.home.servicesSubtitle}
          action={
            <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              See all services <ArrowUpRight size={15} />
            </Link>
          }
        />
        <InteractiveServiceGallery variant="home" count={4} />
      </Section>

      {/* 4. Why Choose Us */}
      {sectionVisibility.whyChooseUs && differentiators.length > 0 && (
        <Section className="bg-secondary/30" aria-labelledby="home-why-choose-title">
          <SectionHeading
            eyebrow={copy.home.whyUsEyebrow}
            title={<span id="home-why-choose-title">{copy.home.whyUsTitle}</span>}
            description={copy.home.whyUsSubtitle}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item) => (
              <FeatureCard key={item.title} title={item.title} description={item.copy} />
            ))}
          </div>
        </Section>
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
              <Card key={plan.title} className="p-6">
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
            Explore Preventive Care <ArrowUpRight size={15} />
          </Link>
        </Section>
      )}

      {/* 4b. Meet Our Team */}
      {sectionVisibility.meetTheTeam && providers.length > 0 && (
        <Section aria-labelledby="home-team-title">
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
              <Card key={provider.slug} className="gap-3 p-4">
                <ImagePlaceholder label="Provider photo" token={provider.imageKey} className="aspect-[4/3] w-full rounded-xl" />
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
      )}

      {/* 5. How It Works */}
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

      {/* 5b. Designed Around Your Comfort */}
      {sectionVisibility.clinicExperience && clinicExperienceFeatures.length >= 4 && (
        <Section aria-labelledby="home-clinic-experience-title">
          <SectionHeading
            eyebrow={copy.home.facilityEyebrow}
            title={<span id="home-clinic-experience-title">{copy.home.facilityTitle}</span>}
          />
          <div className="grid gap-4 md:grid-cols-[1.3fr_1fr]">
            <figure className="relative min-h-[260px] overflow-hidden rounded-2xl md:min-h-[420px]">
              <ImagePlaceholder
                label="Clinic image"
                token={clinicExperienceFeatures[0].imageKey}
                className="h-full w-full border-0"
              />
              <figcaption className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] rounded-full bg-foreground/85 px-4 py-1.5 text-sm font-semibold break-words text-background">
                {clinicExperienceFeatures[0].title}
              </figcaption>
            </figure>
            <div className="grid grid-rows-2 gap-4">
              {clinicExperienceFeatures.slice(1, 3).map((feature) => (
                <figure key={feature.title} className="relative min-h-[160px] overflow-hidden rounded-2xl">
                  <ImagePlaceholder label="Clinic image" token={feature.imageKey} className="h-full w-full border-0" />
                  <figcaption className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-full bg-foreground/85 px-3.5 py-1 text-xs font-semibold break-words text-background">
                    {feature.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <p className="mt-7 flex flex-wrap gap-x-8 gap-y-2 text-sm leading-relaxed break-words text-muted-foreground">
            {clinicExperienceFeatures.slice(3).map((feature) => (
              <span key={feature.title}>
                <strong className="font-semibold text-foreground">{feature.title}.</strong> {feature.copy}
              </span>
            ))}
          </p>
        </Section>
      )}

      {/* 6. Infinite Reviews Marquee */}
      {sectionVisibility.reviewsMarquee && marqueeReviews.length > 0 && (
        <>
          <ReviewsMarquee heading={copy.home.reviewsTitle} supportingText={copy.home.reviewsSubtitle} />
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <Link href="/proof" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              Read verified patient stories <ArrowUpRight size={15} />
            </Link>
          </div>
        </>
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
          <p className="mt-6 min-w-0 break-words text-xs leading-relaxed text-muted-foreground">
            {clinic.name} is a template demonstration business; these demo client stories are illustrative placeholders,
            not real outcomes.
          </p>
        </Section>
      )}

      {/* 8. FAQ Teaser */}
      {sectionVisibility.faqTeaser && faqs.length > 0 && (
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
      )}

      {/* 9. Visit Our Clinic */}
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
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="mt-0.5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <span className="text-xs font-semibold tracking-wide text-primary uppercase">Emergency</span>
                  <p className="text-sm leading-relaxed break-words text-muted-foreground">{emergencyInfo.note}</p>
                </div>
              </div>
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

      {/* 9b. Lead Generation Form */}
      <Section id="contact-form" className="bg-secondary/30" aria-labelledby="home-lead-form-title">
        <SectionHeading
          align="center"
          title={<span id="home-lead-form-title">{copy.home.leadGenForm.heading}</span>}
          description={copy.home.leadGenForm.subheading}
          className="mb-8"
        />
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <div className="min-h-[280px] w-full overflow-hidden rounded-xl border border-border shadow-sm lg:min-h-0">
            <ImagePlaceholder
              label="Lead form image"
              token="[HOME_LEAD_FORM_IMAGE]"
              className="h-full w-full border-0"
            />
          </div>
          <LeadGenForm className="max-w-none" />
        </div>
      </Section>

      {/* 10. Final CTA */}
      <PageOutro
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={copy.home.finalCtaTitle}
        cta={
          <div className="flex flex-col gap-3">
            <p className="max-w-sm text-sm leading-relaxed break-words text-primary-foreground/85">{copy.home.finalCtaSubtitle}</p>
            <BookingButton label="Book an Appointment" variant="secondary" size="lg" className="w-fit" />
          </div>
        }
      />
    </main>
  );
}
