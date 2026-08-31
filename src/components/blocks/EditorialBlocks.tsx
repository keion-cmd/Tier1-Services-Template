/**
 * Editorial section primitives for inner pages. These sit alongside PageBlocks
 * (Section/SectionHeading/PageOutro etc, still the base layout grid) and give
 * inner pages the same compositional variety as the homepage: large statements,
 * asymmetric splits, numbered lists, timelines, and dark chapters, instead of
 * defaulting every array of data to a card grid.
 */
import type { ReactNode } from "react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Section } from "@/components/blocks/PageBlocks";
import { cn } from "@/lib/utils";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit min-w-0 items-center text-xs font-semibold tracking-wider break-words text-primary uppercase">
      {children}
    </span>
  );
}

/**
 * Full-width, large-type statement — a single sentence or short paragraph set
 * in heading type. Use in place of a generic SectionHeading when a section is
 * a claim/thesis rather than a header for a grid below it.
 */
export function EditorialStatement({
  eyebrow,
  statement,
  className,
}: {
  eyebrow?: ReactNode;
  statement: ReactNode;
  className?: string;
}) {
  return (
    <Section className={className}>
      <div className="flex max-w-4xl min-w-0 flex-col gap-6">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <p className="font-heading min-w-0 break-words text-3xl leading-[1.15] font-semibold tracking-tight text-foreground sm:text-5xl">
          {statement}
        </p>
      </div>
    </Section>
  );
}

/**
 * Asymmetric two-column editorial layout: image on one side, text on the
 * other. `reverse` flips which side the image sits on at the md breakpoint;
 * both stack image-first on mobile.
 */
export function EditorialSplit({
  eyebrow,
  title,
  body,
  imageToken,
  imageLabel = "Section image",
  reverse = false,
  extra,
  className,
}: {
  eyebrow?: ReactNode;
  title?: ReactNode;
  body: ReactNode;
  imageToken: string;
  imageLabel?: string;
  reverse?: boolean;
  extra?: ReactNode;
  className?: string;
}) {
  return (
    <Section className={className}>
      <div
        className={cn(
          "grid min-w-0 items-center gap-10 md:grid-cols-2 md:gap-16",
          reverse && "md:[&>*:first-child]:order-2"
        )}
      >
        <div className="relative aspect-[4/5] min-w-0 overflow-hidden rounded-2xl border border-border shadow-sm">
          <ImagePlaceholder label={imageLabel} token={imageToken} className="h-full w-full border-0" />
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {title && (
            <h2 className="font-heading min-w-0 break-words text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
          )}
          <div className="min-w-0 space-y-4 text-base leading-relaxed break-words text-muted-foreground">{body}</div>
          {extra}
        </div>
      </div>
    </Section>
  );
}

/**
 * Numbered editorial list — replaces a card grid when items are read
 * sequentially (values, checklist, what-to-bring) rather than compared
 * side-by-side. Rows separated by rules; large index numerals.
 */
export function EditorialList({
  items,
  className,
}: {
  items: { title: ReactNode; description?: ReactNode; index?: string }[];
  className?: string;
}) {
  return (
    <div className={cn("min-w-0 divide-y divide-border border-t border-border", className)}>
      {items.map((item, i) => (
        <div key={i} className="grid min-w-0 grid-cols-[3rem_1fr] gap-4 py-6 sm:grid-cols-[4rem_1fr] sm:gap-8 sm:py-8">
          <span className="font-heading min-w-0 text-2xl font-semibold text-primary/60 sm:text-3xl">
            {item.index ?? String(i + 1).padStart(2, "0")}
          </span>
          <div className="flex min-w-0 flex-col gap-1.5">
            <h3 className="min-w-0 break-words text-lg font-semibold text-foreground sm:text-xl">{item.title}</h3>
            {item.description && (
              <p className="min-w-0 max-w-2xl break-words text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Vertical connected timeline for milestones / process steps that have an
 * inherent order, as opposed to StepList's grid (which reads fine for
 * parallel, unordered steps).
 */
export function EditorialTimeline({
  items,
  className,
}: {
  items: { label: ReactNode; title: ReactNode; description?: ReactNode }[];
  className?: string;
}) {
  return (
    <div className={cn("relative min-w-0 border-l border-border pl-8 sm:pl-10", className)}>
      {items.map((item, i) => (
        <div key={i} className={cn("relative min-w-0", i !== items.length - 1 && "pb-10 sm:pb-12")}>
          <span className="absolute top-1 -left-[calc(2rem+5px)] h-2.5 w-2.5 rounded-full bg-primary sm:-left-[calc(2.5rem+5px)]" />
          <span className="mb-1 block text-xs font-semibold tracking-wide break-words text-primary uppercase">
            {item.label}
          </span>
          <h3 className="min-w-0 break-words text-lg font-semibold text-foreground sm:text-xl">{item.title}</h3>
          {item.description && (
            <p className="mt-1.5 min-w-0 max-w-2xl break-words text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Full-bleed dark chapter break — used sparingly to change register between
 * two lighter sections (mirrors the homepage's dark-section rhythm).
 */
export function DarkEditorialSection({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Section className={cn("border-y border-border bg-foreground text-background", className)}>
      <div className="flex min-w-0 flex-col gap-6">
        {eyebrow && (
          <span className="inline-flex w-fit min-w-0 items-center text-xs font-semibold tracking-wider break-words text-background/70 uppercase">
            {eyebrow}
          </span>
        )}
        {title && (
          <h2 className="font-heading max-w-3xl min-w-0 break-words text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
        )}
        {children}
      </div>
    </Section>
  );
}

/** Large pull-quote styled testimonial/quote block. */
export function EditorialQuote({
  quote,
  attribution,
  className,
}: {
  quote: ReactNode;
  attribution?: ReactNode;
  className?: string;
}) {
  return (
    <blockquote className={cn("max-w-3xl min-w-0", className)}>
      <p className="font-heading min-w-0 break-words text-2xl leading-snug font-medium tracking-tight text-foreground sm:text-3xl">
        “{quote}”
      </p>
      {attribution && <footer className="mt-4 min-w-0 break-words text-sm text-muted-foreground">{attribution}</footer>}
    </blockquote>
  );
}

/**
 * Large-numeral stat row with a short explanatory sentence under each metric,
 * instead of a bare number+label pair — for pages (Proof) where stats should
 * self-explain why they matter.
 */
export function EditorialStats({
  stats,
  className,
}: {
  stats: { value: string; label: string; description?: string }[];
  className?: string;
}) {
  const count = stats.length;
  const colsClass = count >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : count === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div className={cn("grid min-w-0 gap-8 border-t border-border pt-10", colsClass, className)}>
      {stats.map((stat, i) => (
        <div key={i} className="flex min-w-0 flex-col gap-2">
          <strong className="font-heading min-w-0 break-words text-4xl font-bold text-primary sm:text-5xl">
            {stat.value}
          </strong>
          <span className="min-w-0 break-words text-sm font-semibold text-foreground">{stat.label}</span>
          {stat.description && (
            <p className="min-w-0 max-w-xs break-words text-sm leading-relaxed text-muted-foreground">
              {stat.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
