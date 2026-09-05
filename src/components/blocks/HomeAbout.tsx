/**
 * Homepage "About" section — eyebrow-pill + copy header row, a 3-column
 * unequal-width card row (dark feature card / photo card / stat card), and a
 * plain divided stat row underneath. Distinct from EditorialStatement (still
 * used on /about, /services/[slug], /proof) — this is a homepage-only
 * composition, so those shared primitives stay untouched.
 */
import type { ComponentType } from "react";
import { Award, Clock3, Heart, ShieldCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { EyebrowPill, Section } from "@/components/blocks/PageBlocks";
import { cn } from "@/lib/utils";

const DIFFERENTIATOR_ICONS: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  ShieldCheck,
  Clock3,
  Award,
  Heart,
};

/** Static class lookup (not a template literal) so Tailwind's JIT can see every variant. */
const STATS_COLS_CLASS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
};

export function HomeAbout({
  businessName,
  intro,
  featureCard,
  photoCard,
  statCard,
  factsLabel,
  stats,
}: {
  businessName: string;
  intro: string;
  featureCard?: { title: string; copy: string; icon?: string };
  photoCard?: { title: string; imageKey: string };
  statCard?: { number: string; label: string };
  factsLabel: string;
  stats: { value: string; label: string }[];
}) {
  const FeatureIcon = (featureCard?.icon && DIFFERENTIATOR_ICONS[featureCard.icon]) || ShieldCheck;

  return (
    <Section aria-labelledby="home-about-title">
      <div className="flex min-w-0 flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-12">
        <EyebrowPill className="shrink-0">
          About {businessName}
        </EyebrowPill>
        <p id="home-about-title" className="max-w-2xl min-w-0 break-words text-base leading-relaxed text-muted-foreground">
          {intro}
        </p>
      </div>

      <div className="mt-10 grid min-w-0 gap-5 lg:grid-cols-[0.85fr_1fr_1fr] lg:gap-6">
        {featureCard && (
          <div className="flex min-w-0 flex-col justify-between gap-8 rounded-xl bg-foreground p-7 text-background">
            <div className="flex min-w-0 flex-col gap-4">
              <FeatureIcon size={26} className="text-primary" />
              <div className="flex min-w-0 flex-col gap-2">
                <h3 className="min-w-0 break-words text-lg font-semibold text-background">{featureCard.title}</h3>
                <p className="min-w-0 break-words text-sm leading-relaxed text-background/65">{featureCard.copy}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Switch defaultChecked aria-label="Feature enabled" />
              <span className="text-xs font-medium text-background/60">Always on</span>
            </div>
          </div>
        )}

        {photoCard && (
          <div className="relative min-w-0 overflow-hidden rounded-xl border border-border">
            <ImagePlaceholder label="About photo" token={photoCard.imageKey} aspect="aspect-[4/5]" className="h-full w-full border-0" />
            <span className="absolute top-1/2 left-1/2 max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/90 px-4 py-1.5 text-center text-xs font-semibold break-words text-foreground shadow-sm backdrop-blur-sm">
              {photoCard.title}
            </span>
          </div>
        )}

        {statCard && (
          <div className="flex min-w-0 flex-col justify-center gap-2 rounded-xl border border-border bg-secondary/40 p-7">
            <strong className="font-heading min-w-0 break-words text-5xl leading-none font-bold text-foreground sm:text-6xl">
              {statCard.number}
            </strong>
            <span className="min-w-0 max-w-[16rem] break-words text-sm leading-relaxed text-muted-foreground">
              {statCard.label}
            </span>
          </div>
        )}
      </div>

      {stats.length > 0 && (
        <div className="mt-16 flex min-w-0 flex-col items-center gap-8">
          <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">{factsLabel}</span>
          <div
            className={cn(
              "grid w-full min-w-0 divide-x divide-border",
              STATS_COLS_CLASS[Math.min(stats.length, 5)] ?? "grid-cols-2 sm:grid-cols-4"
            )}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex min-w-0 flex-col items-center gap-1.5 px-4 text-center">
                <strong className="font-heading w-full min-w-0 break-words text-3xl font-bold text-foreground sm:text-4xl">
                  {stat.value}
                </strong>
                <span className="w-full min-w-0 max-w-[10rem] break-words text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
