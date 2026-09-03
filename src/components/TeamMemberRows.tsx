"use client";

/**
 * Editorial team listing — mirrors EditorialServiceRows' hover-reveal pattern
 * (sticky preview image on desktop, swapped by hovering/focusing a row) so the
 * Team page reads as one system with the homepage services list instead of a
 * generic card grid. Works unchanged from a single member (sticky preview with
 * nothing to switch between) up to a large roster (divide-y list scrolls).
 * Mobile drops the hover dependency entirely and shows an inline thumbnail per
 * row, matching EditorialServiceRows' touch fallback.
 */
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { getServiceBySlug, type Provider } from "@/lib/business-content";
import { cn } from "@/lib/utils";

export function TeamMemberRows({
  providers,
  eyebrow,
  title,
  description,
  action,
}: {
  providers: Provider[];
  eyebrow: string;
  title: string;
  /** Optional supporting copy under the title — used by teaser placements that skip a separate SectionHeading. */
  description?: string;
  /** Optional CTA rendered under the title/description (e.g. "Meet the full team"). */
  action?: ReactNode;
}) {
  const [activeSlug, setActiveSlug] = useState<string>(providers[0]?.slug ?? "");
  const active = providers.find((p) => p.slug === activeSlug) ?? providers[0];

  if (providers.length === 0) return null;

  return (
    <div className="grid min-w-0 gap-10 lg:grid-cols-[0.85fr_1.4fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <span className="inline-flex w-fit min-w-0 items-center text-xs font-semibold tracking-wider break-words text-primary uppercase">
          {eyebrow}
        </span>
        <h2 className="font-heading mt-3 min-w-0 max-w-md break-words text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 min-w-0 max-w-md break-words text-sm leading-relaxed text-muted-foreground">{description}</p>
        )}
        {action && <div className="mt-4">{action}</div>}

        {/* Desktop-only preview image, revealed per hovered/focused row. */}
        {active && (
          <div className="relative mt-8 hidden aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border shadow-sm lg:block">
            {providers.map((provider) => (
              <div
                key={provider.slug}
                aria-hidden={provider.slug !== active.slug}
                className={cn(
                  "absolute inset-0 transition-[clip-path,opacity] duration-500 ease-out",
                  provider.slug === active.slug
                    ? "[clip-path:inset(0%_0_0_0)] opacity-100"
                    : "[clip-path:inset(0_0_100%_0)] opacity-0"
                )}
              >
                <ImagePlaceholder label="Provider photo" token={provider.imageKey} className="h-full w-full border-0" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="min-w-0 divide-y divide-border border-t border-border" role="list">
        {providers.map((provider, i) => {
          const providerServices = (provider.relatedServiceSlugs ?? [])
            .map((slug) => getServiceBySlug(slug))
            .filter((service): service is NonNullable<typeof service> => Boolean(service));
          const isActive = provider.slug === active?.slug;

          return (
            <div key={provider.slug} role="listitem">
            <Link
              href={`/team/${provider.slug}`}
              onMouseEnter={() => setActiveSlug(provider.slug)}
              onFocus={() => setActiveSlug(provider.slug)}
              className="group flex min-w-0 items-start gap-4 py-6 sm:gap-6 sm:py-8"
            >
              <div className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg border border-border sm:w-20 lg:hidden">
                <ImagePlaceholder label="Provider photo" token={provider.imageKey} className="h-full w-full border-0" />
              </div>
              <span
                className={cn(
                  "font-heading hidden shrink-0 pt-1 text-2xl font-semibold transition-colors sm:text-3xl lg:block",
                  isActive ? "text-primary" : "text-primary/40"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className="min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">
                  {provider.specialty}
                  {provider.placeholder && " (demo profile)"}
                </span>
                <h3
                  className={cn(
                    "min-w-0 break-words text-xl font-semibold text-foreground transition-transform duration-300 sm:text-2xl",
                    "group-hover:translate-x-1.5 lg:group-hover:translate-x-2"
                  )}
                >
                  {provider.name}, {provider.credentials}
                </h3>
                <p className="min-w-0 max-w-2xl break-words text-sm leading-relaxed text-muted-foreground">{provider.bio}</p>
                {providerServices.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {providerServices.map((service) => (
                      <Badge
                        key={service.slug}
                        variant="outline"
                        className="max-w-full rounded-full text-xs font-semibold break-words whitespace-normal"
                      >
                        {service.title}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <ArrowUpRight
                size={20}
                className="mt-1 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
