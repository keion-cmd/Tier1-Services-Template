import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Section, Eyebrow } from "@/components/PageBlocks";
import { approvedGoogleReviewUrl } from "@/lib/googleReview";

export function ReviewsSection() {
  return (
    <Section containerClassName="grid gap-10 rounded-2xl border border-border bg-secondary/40 p-8 md:grid-cols-[0.8fr_1.2fr] md:p-12">
      <div className="flex min-w-0 max-w-sm flex-col gap-3">
        <Eyebrow>Reviews</Eyebrow>
        <h2 className="text-3xl leading-tight font-bold tracking-tight text-foreground break-words sm:text-4xl">
          Tell us how <span className="text-primary">care felt.</span>
        </h2>
        <p className="text-base leading-relaxed break-words text-muted-foreground">
          Share an authentic experience directly on Google. Google manages sign-in, review publication, and its own
          community safeguards.
        </p>
      </div>
      <Card className="justify-center border-border shadow-sm" aria-label="Google review invitation">
        <CardContent className="flex min-w-0 flex-col items-start gap-3">
          <Eyebrow>Google Maps</Eyebrow>
          <h3 className="text-2xl leading-snug font-semibold tracking-tight text-foreground break-words">
            Help other clients <span className="text-primary">find their way.</span>
          </h3>
          <p className="max-w-lg text-sm leading-relaxed break-words text-muted-foreground">
            Open our Google Maps listing to write a review. Reviews are submitted to Google, not this
            website.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <a
              href={approvedGoogleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Review us on Google Maps (opens in a new tab)"
            >
              Review us on Google <ExternalLink size={16} />
            </a>
          </Button>
          <small className="text-xs text-muted-foreground">Opens Google Maps in a new tab.</small>
        </CardContent>
      </Card>
    </Section>
  );
}
