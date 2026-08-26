import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageMeta } from "@/components/PageMeta";
import { ReviewsSection } from "@/components/ReviewsSection";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, FeatureCard, Eyebrow, PageOutro } from "@/components/PageBlocks";
import { clinic, copy } from "@/lib/business-content";

const careStats = [
  { value: "[PROOF_STAT_1_VALUE]", label: "[PROOF_STAT_1_LABEL]" },
  { value: "[PROOF_STAT_2_VALUE]", label: "[PROOF_STAT_2_LABEL]" },
  { value: "[PROOF_STAT_3_VALUE]", label: "[PROOF_STAT_3_LABEL]" },
];

const clientStories = [
  { label: "[PROOF_STORY_1_LABEL]", note: "[PROOF_STORY_1_NOTE]" },
  { label: "[PROOF_STORY_2_LABEL]", note: "[PROOF_STORY_2_NOTE]" },
  { label: "[PROOF_STORY_3_LABEL]", note: "[PROOF_STORY_3_NOTE]" },
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
        eyebrow={copy.proof.heroEyebrow}
        title={copy.proof.heroTitle}
        description={copy.proof.heroSubtitle}
        cta={<BookingButton label="Book an Appointment" />}
        image={{ label: "Service image", token: "[SERVICE_IMAGE]" }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div className="flex min-w-0 items-baseline gap-2">
            <strong className="min-w-0 break-words text-5xl font-bold text-primary">[PROOF_STAT_HIGHLIGHT_NUMBER]</strong>
            <span className="min-w-0 break-words text-sm font-semibold text-muted-foreground">[PROOF_STAT_HIGHLIGHT_LABEL]</span>
          </div>
          <p className="min-w-0 max-w-md break-words text-sm leading-relaxed text-muted-foreground">{copy.proof.statsCaption}</p>
          <Link href="/faq" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            Read common questions <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <Section aria-labelledby="proof-stats-title">
        <SectionHeading
          eyebrow={copy.proof.statsEyebrow}
          title={<span id="proof-stats-title">{copy.proof.statsTitle}</span>}
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {careStats.map((stat) => (
            <FeatureCard key={stat.label} label={copy.proof.statCardLabel} title={stat.value} description={stat.label} />
          ))}
        </div>
      </Section>

      <ReviewsSection />

      <Section aria-labelledby="proof-stories-title">
        <Eyebrow>{copy.proof.storiesEyebrow}</Eyebrow>
        <h2 id="proof-stories-title" className="sr-only">
          {copy.proof.storiesEyebrow}
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {clientStories.map((story) => (
            <Card key={story.label}>
              <CardContent className="flex min-w-0 flex-col gap-2">
                <Eyebrow>{story.label}</Eyebrow>
                <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">{story.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-6 min-w-0 break-words text-xs leading-relaxed text-muted-foreground">
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
