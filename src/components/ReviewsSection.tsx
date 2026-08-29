import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Section, Eyebrow } from "@/components/blocks/PageBlocks";
import { approvedGoogleReviewUrl } from "@/lib/googleReview";
import { copy } from "@/lib/business-content";

export function ReviewsSection() {
  return (
    <Section containerClassName="grid gap-10 rounded-2xl border border-border bg-secondary/40 p-8 md:grid-cols-[0.8fr_1.2fr] md:p-12">
      <div className="flex min-w-0 max-w-sm flex-col gap-3">
        <Eyebrow>{copy.proof.reviewsEyebrow}</Eyebrow>
        <h2 className="text-3xl leading-tight font-bold tracking-tight text-foreground break-words sm:text-4xl">
          {copy.proof.reviewsTitleLead} <span className="text-primary">{copy.proof.reviewsTitleAccent}</span>
        </h2>
        <p className="text-base leading-relaxed break-words text-muted-foreground">{copy.proof.reviewsBody}</p>
      </div>
      <Card className="justify-center border-border shadow-sm" aria-label={copy.proof.mapsCardAriaLabel}>
        <CardContent className="flex min-w-0 flex-col items-start gap-3">
          <Eyebrow>{copy.proof.mapsEyebrow}</Eyebrow>
          <h3 className="text-2xl leading-snug font-semibold tracking-tight text-foreground break-words">
            {copy.proof.mapsTitleLead} <span className="text-primary">{copy.proof.mapsTitleAccent}</span>
          </h3>
          <p className="max-w-lg text-sm leading-relaxed break-words text-muted-foreground">{copy.proof.mapsBody}</p>
          <Button asChild size="lg" className="rounded-full">
            <a
              href={approvedGoogleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${copy.proof.reviewButtonLabel} (opens in a new tab)`}
            >
              {copy.proof.reviewButtonLabel} <ExternalLink size={16} />
            </a>
          </Button>
          <small className="text-xs text-muted-foreground">{copy.proof.mapsHint}</small>
        </CardContent>
      </Card>
    </Section>
  );
}
