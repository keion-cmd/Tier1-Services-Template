/**
 * Reusable premium final-CTA section: dark full-bleed band, oversized
 * heading, accent CTA, and a muted oversized decorative word behind the
 * copy. Replaces the plain `PageOutro` treatment on major pages while
 * reusing the same eyebrow/title/cta contract so call sites barely change.
 */
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Section } from "@/components/blocks/PageBlocks";
import { cn } from "@/lib/utils";

export function FinalCTA({
  eyebrow,
  title,
  cta,
  decorative,
  className,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  cta: ReactNode;
  /** Short word/phrase rendered huge and muted behind the content, e.g. business shortName. Omit to skip. */
  decorative?: ReactNode;
  className?: string;
}) {
  return (
    <ScrollReveal>
      <Section
        className={cn(
          "relative overflow-hidden border-t border-border bg-foreground text-background",
          className
        )}
      >
        {decorative && (
          <span
            aria-hidden="true"
            className="font-heading pointer-events-none absolute -bottom-6 left-1/2 w-full -translate-x-1/2 text-center text-[18vw] leading-none font-bold whitespace-nowrap text-background/[0.04] select-none sm:text-[12vw]"
          >
            {decorative}
          </span>
        )}
        <div className="relative flex min-w-0 flex-col items-start gap-6">
          <Badge
            variant="secondary"
            className="w-fit max-w-full gap-1.5 rounded-full border-none bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide break-words text-background uppercase"
          >
            {eyebrow}
          </Badge>
          <h2 className="font-heading max-w-3xl min-w-0 break-words text-4xl leading-[1.08] font-bold tracking-tight sm:text-6xl">
            {title}
          </h2>
          {cta}
        </div>
      </Section>
    </ScrollReveal>
  );
}
