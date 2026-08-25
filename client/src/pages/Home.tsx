import { Link } from "wouter";
import { Activity, AlertTriangle, ArrowUpRight, Clock3, Heart, MapPin, PawPrint, Shield, Smile, Sparkles, Stethoscope } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { InteractiveServiceGallery } from "@/components/InteractiveServiceGallery";
import { ReviewsMarquee } from "@/components/ReviewsMarquee";
import { PetCareMarquee } from "@/components/PetCareMarquee";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Section, SectionHeading, Eyebrow, FeatureCard, StepList, StatBlock, PageOutro } from "@/components/PageBlocks";
import {
  buildLocalBusinessSchema,
  carePlans,
  clinic,
  clinicExperienceFeatures,
  differentiators,
  doctors,
  emergencyInfo,
  faqs,
  healthResources,
  howItWorks,
  patientSuccessStories,
  trustStats,
} from "@/lib/clinic-content";
import { petCareBrands } from "@/lib/petCareBrands";

const differentiatorIcons = { heart: Heart, stethoscope: Stethoscope, activity: Activity, shield: Shield, sparkles: Sparkles, smile: Smile };
const carePlanIcons = { sparkles: Sparkles, shield: Shield, heart: Heart };

export default function Home() {
  return (
    <main>
      <PageMeta
        title={`${clinic.name} ${clinic.descriptor}`}
        description="Thoughtful veterinary care conversations, clear service pathways, and a simple visit request process."
        path="/"
        jsonLd={buildLocalBusinessSchema()}
      />

      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:grid-cols-2 md:items-center md:py-20 lg:px-8">
          <div className="flex flex-col gap-5">
            <Eyebrow>{clinic.name} {clinic.descriptor}</Eyebrow>
            <h1 className="text-5xl leading-[1.03] font-extrabold tracking-tight text-foreground sm:text-6xl">
              Care built around <span className="text-primary">your pet.</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Combining approachable diagnostics with heart-led care conversations, so every visit starts with clarity,
              not urgency.
            </p>
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

          <div className="relative pb-6 sm:pb-8">
            <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
              <ImagePlaceholder label="Hero image" token="[HERO_IMAGE]" className="aspect-[4/3] h-full w-full border-0" />
            </div>
            <div className="absolute -bottom-2 left-3 max-w-[190px] rounded-2xl border border-border bg-card p-4 shadow-md sm:left-5">
              <strong className="block text-3xl font-bold text-primary">12,5K+</strong>
              <p className="mt-1 text-xs leading-snug text-muted-foreground">
                Healthy pets treated with love and professional care.
              </p>
            </div>
            <div className="absolute -bottom-2 right-3 hidden max-w-[220px] rounded-2xl border border-border bg-card p-4 shadow-md sm:right-5 md:block">
              <p className="text-sm leading-snug font-semibold text-foreground">The future of veterinary care is here.</p>
              <Link
                href="/services"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                Explore Services <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1b. Pet Care Industry Marquee */}
      <PetCareMarquee items={petCareBrands} />

      {/* 2. Trust Stats Bar */}
      <Section className="py-12 md:py-16" aria-labelledby="home-trust-stats-title">
        <span id="home-trust-stats-title" className="sr-only">
          Care at a glance
        </span>
        <StatBlock stats={trustStats} />
      </Section>

      {/* 3. Services Showcase */}
      <Section aria-labelledby="home-services-title">
        <SectionHeading
          eyebrow="How we can help"
          title={
            <span id="home-services-title">
              Our services<span className="text-primary">.</span>
            </span>
          }
          description="Explore the care paths that make a future visit easier to understand. Each one starts with a conversation."
          action={
            <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              See all services <ArrowUpRight size={15} />
            </Link>
          }
        />
        <InteractiveServiceGallery variant="home" count={4} />
      </Section>

      {/* 4. Why Choose Us */}
      <Section className="bg-secondary/30" aria-labelledby="home-why-choose-title">
        <SectionHeading
          eyebrow="Why choose us"
          title={
            <span id="home-why-choose-title">
              Care that shows <span className="text-primary">in the details.</span>
            </span>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item) => (
            <FeatureCard key={item.title} icon={differentiatorIcons[item.icon]} title={item.title} description={item.copy} />
          ))}
        </div>
      </Section>

      {/* 4b. Meet Our Veterinary Team */}
      <Section aria-labelledby="home-team-title">
        <SectionHeading
          eyebrow="Meet our veterinary team"
          title={
            <span id="home-team-title">
              Care from a team <span className="text-primary">you can trust.</span>
            </span>
          }
          description={`${doctors.length} demo profiles representing the kind of clinical range a real ${clinic.name} team could offer.`}
          action={
            <Link href="/team" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              Meet the full team <ArrowUpRight size={15} />
            </Link>
          }
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {doctors.map((doctor) => (
            <Card key={doctor.slug} className="gap-3 p-4">
              <ImagePlaceholder label="Vet photo" token={doctor.imageKey} className="h-48 w-full rounded-xl" />
              <div className="flex flex-col gap-1.5 px-1">
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">{doctor.specialty}</span>
                <h3 className="text-lg font-semibold text-foreground">
                  {doctor.name}, {doctor.credentials}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{doctor.bio}</p>
                <Link
                  href={`/team/${doctor.slug}`}
                  className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  View profile <ArrowUpRight size={15} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 5. How It Works */}
      <Section className="bg-secondary/30" aria-labelledby="home-how-it-works-title">
        <SectionHeading
          eyebrow="How it works"
          title={
            <span id="home-how-it-works-title">
              A simple path <span className="text-primary">to lifelong care.</span>
            </span>
          }
        />
        <StepList steps={howItWorks} />
      </Section>

      {/* 5b. Designed Around Your Pet's Comfort */}
      <Section aria-labelledby="home-clinic-experience-title">
        <SectionHeading
          eyebrow="Designed around your pet's comfort"
          title={
            <span id="home-clinic-experience-title">
              A space built <span className="text-primary">for calm visits.</span>
            </span>
          }
        />
        <div className="grid gap-4 md:grid-cols-[1.3fr_1fr]">
          <figure className="relative min-h-[260px] overflow-hidden rounded-2xl md:min-h-[420px]">
            <ImagePlaceholder
              label="Clinic image"
              token={clinicExperienceFeatures[0].imageKey}
              className="h-full w-full border-0"
            />
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-foreground/85 px-4 py-1.5 text-sm font-semibold text-background">
              {clinicExperienceFeatures[0].title}
            </figcaption>
          </figure>
          <div className="grid grid-rows-2 gap-4">
            {clinicExperienceFeatures.slice(1, 3).map((feature) => (
              <figure key={feature.title} className="relative min-h-[160px] overflow-hidden rounded-2xl">
                <ImagePlaceholder label="Clinic image" token={feature.imageKey} className="h-full w-full border-0" />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-foreground/85 px-3.5 py-1 text-xs font-semibold text-background">
                  {feature.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <p className="mt-7 flex flex-wrap gap-x-8 gap-y-2 text-sm leading-relaxed text-muted-foreground">
          {clinicExperienceFeatures.slice(3).map((feature) => (
            <span key={feature.title}>
              <strong className="font-semibold text-foreground">{feature.title}.</strong> {feature.copy}
            </span>
          ))}
        </p>
      </Section>

      {/* 6. Infinite Reviews Marquee */}
      <ReviewsMarquee />
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <Link href="/proof" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          Read verified patient stories <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* 6b. Real Care. Real Stories. */}
      <Section aria-labelledby="home-success-stories-title">
        <Eyebrow icon={PawPrint}>Real care. Real stories.</Eyebrow>
        <h2 id="home-success-stories-title" className="sr-only">
          Real care. Real stories.
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {patientSuccessStories.map((story) => (
            <Card key={story.petName} className="gap-2.5 p-4">
              <ImagePlaceholder label="Patient photo" token={story.imageKey} className="h-48 w-full rounded-xl" />
              <div className="flex flex-col gap-1.5 px-1">
                <Eyebrow>
                  {story.petName} · {story.breed} · {story.category}
                </Eyebrow>
                <p className="text-sm leading-relaxed text-muted-foreground">{story.story}</p>
              </div>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          {clinic.name} is a template demonstration clinic; these demo patient stories are illustrative placeholders,
          not real medical outcomes.
        </p>
      </Section>

      {/* 7. Pet Health Resources */}
      <Section className="bg-secondary/30" aria-labelledby="home-health-resources-title">
        <SectionHeading
          eyebrow="Pet health resources"
          title={
            <span id="home-health-resources-title">
              Helpful reading <span className="text-primary">before your visit.</span>
            </span>
          }
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {healthResources.map((article) => (
            <Card key={article.title} className="gap-0 overflow-hidden p-0">
              <ImagePlaceholder label="Resource image" token={article.imageKey} className="h-40 w-full border-0" />
              <div className="flex flex-col gap-1.5 p-5">
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">Pet health guide</span>
                <h3 className="text-lg font-semibold text-foreground">{article.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 7b. Proactive Care for Every Stage */}
      <Section aria-labelledby="home-care-plans-title">
        <SectionHeading
          eyebrow="Proactive care for every stage"
          title={
            <span id="home-care-plans-title">
              Planned around <span className="text-primary">your pet's life stage.</span>
            </span>
          }
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {carePlans.map((plan) => {
            const Icon = carePlanIcons[plan.icon];
            return (
              <Card key={plan.title} className="p-6">
                <Icon size={22} className="text-primary" />
                <span className="text-sm text-muted-foreground">{plan.subtitle}</span>
                <h3 className="text-xl font-semibold text-foreground">{plan.title}</h3>
                <ul className="mt-1 flex flex-col gap-1.5 pl-4 text-sm leading-relaxed text-muted-foreground">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet} className="list-disc">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
        <Link
          href="/new-clients"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Explore Preventive Care <ArrowUpRight size={15} />
        </Link>
      </Section>

      {/* 8. FAQ Teaser */}
      <Section className="bg-secondary/30">
        <SectionHeading
          eyebrow="A few helpful answers"
          title={
            <>
              Everything starts with <span className="text-primary">one good question.</span>
            </>
          }
          description="We keep the details clear so you can feel more prepared for the conversation ahead."
        />
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

      {/* 9. Visit Our Clinic */}
      <Section aria-labelledby="home-location-title">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Visit our clinic"
              title={
                <span id="home-location-title">
                  Plan your visit <span className="text-primary">with confidence.</span>
                </span>
              }
              className="mb-0"
            />
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <span className="text-xs font-semibold tracking-wide text-primary uppercase">Address</span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {clinic.address}
                    <br />
                    {clinic.city}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock3 size={20} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <span className="text-xs font-semibold tracking-wide text-primary uppercase">Hours</span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{clinic.hours}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <span className="text-xs font-semibold tracking-wide text-primary uppercase">Emergency</span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{emergencyInfo.note}</p>
                </div>
              </div>
            </div>
            <Link
              href="/location"
              className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              View map, hours & emergency info <ArrowUpRight size={15} />
            </Link>
          </div>
          <dl className="grid content-start divide-y divide-border border-t border-border">
            {clinic.businessHours.map((entry) => (
              <div key={entry.days} className="flex items-center justify-between gap-4 py-4">
                <dt className="text-sm font-semibold text-foreground">{entry.days}</dt>
                <dd className="text-sm font-semibold text-primary">{entry.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* 10. Final CTA */}
      <PageOutro
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={
          <>
            A better beginning starts <span className="text-primary-foreground/80">here.</span>
          </>
        }
        cta={
          <div className="flex flex-col gap-3">
            <p className="max-w-sm text-sm leading-relaxed text-primary-foreground/85">
              Pick a time that works for you, and our online scheduler takes care of the rest.
            </p>
            <BookingButton label="Book an Appointment" variant="secondary" size="lg" className="w-fit" />
          </div>
        }
      />
    </main>
  );
}
