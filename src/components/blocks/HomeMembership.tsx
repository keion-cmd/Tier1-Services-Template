/**
 * Homepage membership/care-plans section — left column: one featured plan
 * card (sky-blue fill, 2x2 feature grid, CTA) over 1-2 collapsed plan rows;
 * right column: eyebrow/heading/decorative icon, same height as the left
 * stack. `carePlans` has no price or "featured" field, so — per the layout
 * spec's own instruction to skip elements with no backing data — this omits
 * the price line and "Most Popular" badge rather than inventing them.
 */
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EyebrowPill, Section } from "@/components/blocks/PageBlocks";

export function HomeMembership({
  eyebrow,
  title,
  plans,
}: {
  eyebrow: string;
  title: string;
  plans: { title: string; subtitle: string; bullets: string[] }[];
}) {
  if (plans.length === 0) return null;

  const [featured, ...rest] = plans;

  return (
    <Section aria-labelledby="home-membership-title">
      <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex min-w-0 flex-col gap-5">
          <div className="flex min-w-0 flex-col gap-6 rounded-xl bg-primary p-7 text-primary-foreground">
            <div className="flex min-w-0 flex-col gap-1">
              <h3 className="min-w-0 break-words text-2xl font-bold tracking-tight">{featured.title}</h3>
              <p className="min-w-0 break-words text-sm text-primary-foreground/80">{featured.subtitle}</p>
            </div>
            <div className="grid min-w-0 grid-cols-2 gap-3">
              {featured.bullets.slice(0, 4).map((bullet) => (
                <span
                  key={bullet}
                  className="min-w-0 rounded-lg bg-primary-foreground/10 px-3 py-2 text-xs leading-snug font-medium break-words"
                >
                  {bullet}
                </span>
              ))}
            </div>
            <Link href="/new-clients" className="w-fit">
              <Button size="sm" variant="secondary">
                Explore plan <ArrowUpRight size={14} />
              </Button>
            </Link>
          </div>

          {rest.slice(0, 2).map((plan) => (
            <div
              key={plan.title}
              className="flex min-w-0 items-center justify-between gap-4 rounded-xl border border-border px-6 py-4"
            >
              <span className="min-w-0 break-words text-sm font-semibold text-foreground">{plan.title}</span>
              <Link href="/new-clients" className="w-fit shrink-0">
                <Button size="sm" variant="outline">
                  View features
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="relative flex min-w-0 flex-col justify-center gap-4 overflow-hidden rounded-xl border border-border bg-secondary/30 p-8">
          <Sparkles size={220} strokeWidth={1} className="pointer-events-none absolute -right-10 -bottom-10 text-primary/10" aria-hidden="true" />
          <EyebrowPill className="relative w-fit">{eyebrow}</EyebrowPill>
          <h2 id="home-membership-title" className="font-heading relative min-w-0 max-w-md break-words text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
        </div>
      </div>
    </Section>
  );
}
