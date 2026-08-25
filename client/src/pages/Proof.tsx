import { Link } from "wouter";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageMeta } from "@/components/PageMeta";
import { ReviewsSection } from "@/components/ReviewsSection";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, FeatureCard, Eyebrow, PageOutro } from "@/components/PageBlocks";
import { clinic, copy } from "@/lib/business-content";

const careStats = [
  { value: "06", label: "care pathways offered" },
  { value: "01", label: "clear starting point for every visit" },
  { value: "03", label: "steps from request to a confirmed next step" },
];

const clientStories = [
  { label: "A long-time client check-in", note: "A calm, structured conversation helped prepare useful notes ahead of the visit, no guesswork, just clear next steps." },
  { label: "A new client's first visit", note: "First-visit questions were answered plainly, and the client left knowing exactly what the next scheduled step would be." },
  { label: "A prevention planning visit", note: "The visit stayed focused on the team's actual approved protocols, with a clear plan instead of an open-ended list of options." },
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
        title={copy.proof.heroTitle}
        description={copy.proof.heroSubtitle}
        cta={<BookingButton label="Book an Appointment" />}
        image={{ label: "Service image", token: "[SERVICE_IMAGE]" }}
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
          icon={ShieldCheck}
          eyebrow="Care at a glance"
          title={<span id="proof-stats-title">{copy.proof.statsTitle}</span>}
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {careStats.map((stat) => (
            <FeatureCard key={stat.label} label="At a glance" title={stat.value} description={stat.label} />
          ))}
        </div>
      </Section>

      <ReviewsSection />

      <Section aria-labelledby="proof-stories-title">
        <Eyebrow icon={ShieldCheck}>Verified client stories</Eyebrow>
        <h2 id="proof-stories-title" className="sr-only">
          Verified client stories
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {clientStories.map((story) => (
            <Card key={story.label}>
              <CardContent className="flex flex-col gap-2">
                <Eyebrow>{story.label}</Eyebrow>
                <p className="text-sm leading-relaxed text-muted-foreground">{story.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          {clinic.name} is a template demonstration business; these stories are illustrative placeholders. Replace with
          client-approved, consented stories before launch.
        </p>
      </Section>

      <PageOutro
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={copy.proof.ctaTitle}
        cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
