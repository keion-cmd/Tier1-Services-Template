import type { ReactNode } from "react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

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
        <div className="absolute inset-0 -z-10">
          <ImagePlaceholder label={imageLabel} token={imageToken} className="h-full w-full border-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-foreground/5" />
        </div>

        <div className="mx-auto flex min-h-[560px] max-w-7xl flex-col justify-end px-6 pt-24 pb-16 sm:min-h-[640px] lg:px-8 lg:pb-20">
          {showBadge && (
            <span className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide break-words text-white backdrop-blur-sm">
              {badgeText}
            </span>
          )}
          <span className="mb-3 inline-flex w-fit min-w-0 items-center text-xs font-semibold tracking-wider break-words text-white/80 uppercase">
            {eyebrow}
          </span>
          <h1 className="font-heading max-w-2xl text-5xl leading-[1.02] font-semibold tracking-tight break-words text-white sm:text-7xl">
            {headline}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed break-words text-white/80">{subheadline}</p>
          {cta && <div className="mt-7 flex flex-wrap items-center gap-5">{cta}</div>}
        </div>

        {showStat && (
          <div className="absolute top-8 right-6 w-44 min-w-0 rounded-2xl border border-border bg-card p-4 shadow-lg sm:top-10 sm:right-8 sm:w-48">
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
