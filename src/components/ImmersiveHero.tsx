import type { ReactNode } from "react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { AnimatedHeading } from "@/components/AnimatedHeading";

interface ImmersiveHeroStat {
  value: string;
  caption: string;
}

interface ImmersiveHeroUtilityItem {
  label: string;
  value: string;
}

interface ImmersiveHeroProps {
  eyebrow: string;
  headline: ReactNode;
  subheadline: ReactNode;
  imageToken: string;
  imageLabel?: string;
  badgeText?: string;
  cta?: ReactNode;
  stat?: ImmersiveHeroStat;
  /** Small pill tags rendered under the eyebrow — e.g. real service category names. */
  tags?: string[];
  trustStrip?: ReactNode;
  /** Bottom utility row (e.g. phone / hours / address) rendered inside the hero frame itself. */
  utilityItems?: ImmersiveHeroUtilityItem[];
}

/**
 * Inset, framed immersive hero: rounded full-bleed image container, gradient
 * overlay, headline anchored upper-left, optional bottom utility row pinned
 * to the frame's bottom edge via mt-auto. Optional floating stat card and
 * trust-strip slot degrade gracefully when omitted, since not every page has
 * that data. Inset on all four sides (matching the fixed header's own inset
 * in Header.tsx) so the hero reads as a framed canvas card rather than
 * starting flush at the viewport edge; the floating white header pill sits
 * inside that same frame, overlapping the top of the image.
 */
export function ImmersiveHero({
  eyebrow,
  headline,
  subheadline,
  imageToken,
  imageLabel = "Hero image",
  badgeText,
  cta,
  stat,
  tags,
  trustStrip,
  utilityItems,
}: ImmersiveHeroProps) {
  const showBadge = badgeText && !/^\[.*\]$/.test(badgeText);
  const showStat = stat && !/^\[.*\]$/.test(stat.value) && !/^\[.*\]$/.test(stat.caption);
  const visibleUtilityItems = utilityItems?.filter((item) => !/^\[.*\]$/.test(item.value)) ?? [];
  const visibleTags = tags?.filter((tag) => !/^\[.*\]$/.test(tag)) ?? [];

  return (
    <>
      <section className="relative isolate mx-3 mt-3 overflow-hidden rounded-[1.75rem] sm:mx-6 sm:mt-6 sm:rounded-[2.5rem] lg:mx-8 lg:mt-8">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="hero-image-in h-full w-full">
            <ImagePlaceholder
              label={imageLabel}
              token={imageToken}
              className="h-full w-full border-0 lg:items-end lg:pr-10"
            />
          </div>
          <div className="absolute inset-0 bg-foreground/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/45 to-foreground/20" />
          {/* Dedicated top-edge gradient — keeps the transparent nav's white text legible
              over the hero regardless of the underlying image, independent of the bottom
              overlay above (which is intentionally near-transparent near the top). */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-foreground/60 to-transparent" />
        </div>

        <div className="hero-content-in mx-auto flex min-h-140 max-w-7xl flex-col px-6 pt-28 pb-10 sm:min-h-155 sm:pt-32 lg:px-10 lg:pt-36 lg:pb-12">
          {showBadge && (
            <span className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide break-words text-white backdrop-blur-sm">
              {badgeText}
            </span>
          )}
          <span className="mb-3 inline-flex w-fit min-w-0 items-center gap-2 text-xs font-semibold tracking-wider break-words text-white/80 uppercase">
            <span className="text-primary" aria-hidden="true">/</span>
            {eyebrow}
          </span>
          {visibleTags.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {visibleTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide break-words text-white uppercase backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <AnimatedHeading
              as="h1"
              trigger="load"
              delay={260}
              className="font-heading max-w-3xl min-w-0 text-5xl leading-[0.98] font-semibold tracking-tight break-words text-white sm:text-7xl lg:text-8xl"
            >
              {headline}
            </AnimatedHeading>
            <div className="flex max-w-xs min-w-0 shrink-0 flex-col gap-5 lg:pb-2">
              <p className="text-base leading-relaxed break-words text-white/80">{subheadline}</p>
              {cta && <div className="flex flex-wrap items-center gap-5">{cta}</div>}
            </div>
          </div>

          {visibleUtilityItems.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-x-8 gap-y-3 border-t border-white/20 pt-6 sm:pt-8">
              {visibleUtilityItems.map((item) => (
                <div key={item.label} className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-[11px] font-semibold tracking-wider break-words text-white/60 uppercase">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold break-words text-white">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {showStat && (
          <div className="hero-fade-in absolute top-8 right-6 hidden w-44 min-w-0 rounded-xl border border-border bg-card p-4 shadow-lg [animation-delay:620ms] sm:block sm:top-10 sm:right-8 sm:w-48">
            <strong className="block break-words text-2xl font-bold text-primary sm:text-3xl">{stat.value}</strong>
            <span className="text-xs font-medium break-words text-muted-foreground">{stat.caption}</span>
          </div>
        )}
      </section>

      {trustStrip}
    </>
  );
}
