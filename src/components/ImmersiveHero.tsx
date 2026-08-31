import type { ReactNode } from "react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { AnimatedHeading } from "@/components/AnimatedHeading";

interface ImmersiveHeroStat {
  value: string;
  caption: string;
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
  trustStrip?: ReactNode;
}

/**
 * Full-bleed immersive hero: background image, gradient overlay, headline
 * anchored lower-left. Optional floating stat card and trust-strip slot
 * degrade gracefully when omitted, since not every page has that data.
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
  trustStrip,
}: ImmersiveHeroProps) {
  const showBadge = badgeText && !/^\[.*\]$/.test(badgeText);
  const showStat = stat && !/^\[.*\]$/.test(stat.value) && !/^\[.*\]$/.test(stat.caption);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="hero-image-in h-full w-full">
            <ImagePlaceholder label={imageLabel} token={imageToken} className="h-full w-full border-0" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-foreground/5" />
          {/* Dedicated top-edge gradient — keeps the transparent nav's white text legible
              over the hero regardless of the underlying image, independent of the bottom
              overlay above (which is intentionally near-transparent near the top). */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-foreground/60 to-transparent" />
        </div>

        <div className="hero-content-in mx-auto flex min-h-[620px] max-w-7xl flex-col justify-end px-6 pt-28 pb-16 sm:min-h-[720px] lg:px-8 lg:pb-20">
          {showBadge && (
            <span className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide break-words text-white backdrop-blur-sm">
              {badgeText}
            </span>
          )}
          <span className="mb-3 inline-flex w-fit min-w-0 items-center text-xs font-semibold tracking-wider break-words text-white/80 uppercase">
            {eyebrow}
          </span>
          <AnimatedHeading
            as="h1"
            trigger="load"
            delay={260}
            className="font-heading max-w-3xl text-6xl leading-[0.98] font-semibold tracking-tight break-words text-white sm:text-7xl lg:text-8xl"
          >
            {headline}
          </AnimatedHeading>
          <p className="mt-6 max-w-md text-base leading-relaxed break-words text-white/80">{subheadline}</p>
          {cta && <div className="mt-8 flex flex-wrap items-center gap-5">{cta}</div>}
        </div>

        {showStat && (
          <div className="hero-fade-in absolute top-8 right-6 w-44 min-w-0 rounded-2xl border border-border bg-card p-4 shadow-lg [animation-delay:620ms] sm:top-10 sm:right-8 sm:w-48">
            <strong className="block break-words text-2xl font-bold text-primary sm:text-3xl">{stat.value}</strong>
            <span className="text-xs font-medium break-words text-muted-foreground">{stat.caption}</span>
          </div>
        )}
      </section>

      {trustStrip && (
        <div className="relative z-10 mx-auto -mt-14 max-w-6xl px-6 sm:-mt-16 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-border shadow-xl">{trustStrip}</div>
        </div>
      )}
    </>
  );
}
