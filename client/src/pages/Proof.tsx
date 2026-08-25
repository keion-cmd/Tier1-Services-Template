import { Link } from "wouter";
import { ArrowUpRight, PawPrint, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageMeta } from "@/components/PageMeta";
import { ReviewsSection } from "@/components/ReviewsSection";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, FeatureCard, Eyebrow, PageOutro } from "@/components/PageBlocks";
import { assets, clinic } from "@/lib/clinic-content";

const careStats = [
  { value: "06", label: "care pathways offered" },
  { value: "01", label: "clear starting point for every visit" },
  { value: "03", label: "steps from request to a confirmed next step" },
];

const patientStories = [
  { pet: "A senior dog check-in", note: "A calm, structured conversation helped prepare useful notes ahead of the clinic visit, no guesswork, just clear next steps." },
  { pet: "A puppy's first visit", note: "First-visit questions were answered plainly, and the family left knowing exactly what the next scheduled step would be." },
  { pet: "A prevention planning visit", note: "The visit stayed focused on the clinic's actual approved protocols, with a clear plan instead of an open-ended list of options." },
];

export default function Proof() {
  return (
    <main>
      <PageMeta
        title={`Proof & Reviews — ${clinic.name} ${clinic.descriptor}`}
        description={`Trust markers, care statistics, and verified patient stories from ${clinic.name} ${clinic.descriptor}.`}
        path="/proof"
      />

      <PageHero
        eyebrowIcon={ShieldCheck}
        eyebrow="Trust & proof"
        title={
          <>
            Care you can <span className="text-primary">verify.</span>
          </>
        }
        description="Real statistics, a direct path to Google reviews, and a few stories from pet parents who've been through the process."
        cta={<BookingButton label="Book an Appointment" />}
        image={{ src: assets.serviceExam, alt: `Veterinarian examining a dog at ${clinic.name}` }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div className="flex items-baseline gap-2">
            <strong className="text-5xl font-bold text-primary">06</strong>
            <span className="text-sm font-semibold text-muted-foreground">care paths</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            These numbers describe how the clinic is structured today, not promises about individual outcomes.
          </p>
          <Link href="/faq" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            Read common questions <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <Section aria-labelledby="proof-stats-title">
        <SectionHeading
          icon={PawPrint}
          eyebrow="Care at a glance"
          title={
            <span id="proof-stats-title">
              Numbers that <span className="text-primary">stay honest.</span>
            </span>
          }
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {careStats.map((stat) => (
            <FeatureCard key={stat.label} label="At a glance" title={stat.value} description={stat.label} />
          ))}
        </div>
      </Section>

      <ReviewsSection />

      <Section aria-labelledby="proof-stories-title">
        <Eyebrow icon={PawPrint}>Verified patient stories</Eyebrow>
        <h2 id="proof-stories-title" className="sr-only">
          Verified patient stories
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {patientStories.map((story) => (
            <Card key={story.pet}>
              <CardContent className="flex flex-col gap-2">
                <Eyebrow>{story.pet}</Eyebrow>
                <p className="text-sm leading-relaxed text-muted-foreground">{story.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          {clinic.name} is a template demonstration clinic; these stories are illustrative placeholders. Replace with
          client-approved, consented patient stories before launch.
        </p>
      </Section>

      <PageOutro
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={
          <>
            Join pet parents who <span className="text-primary-foreground/80">trust us.</span>
          </>
        }
        cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
