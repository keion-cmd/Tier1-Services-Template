"use client";

/**
 * Premium editorial service list for the homepage services section — replaces
 * the equal-sized InteractiveServiceGallery card grid. Desktop: a sticky
 * section heading on the left, large stacked hover rows on the right where
 * hovering a row reveals that service's image via a clip-path wipe. Mobile:
 * a plain vertical list with an inline thumbnail per row (no hover state on
 * touch, so the image can't be hidden behind an interaction that never fires).
 */
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { copy as siteCopy, type Service } from "@/lib/business-content";
import { cn } from "@/lib/utils";

export function EditorialServiceRows({
  services,
  eyebrow,
  title,
  description,
}: {
  services: Service[];
  eyebrow: string;
  title: string;
  description: string;
}) {
  const [activeSlug, setActiveSlug] = useState<string>(services[0]?.slug ?? "");
  const active = services.find((s) => s.slug === activeSlug) ?? services[0];

  if (services.length === 0) return null;

  return (
    <div className="grid min-w-0 gap-10 lg:grid-cols-[0.85fr_1.4fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <span className="inline-flex w-fit min-w-0 items-center text-xs font-semibold tracking-wider break-words text-primary uppercase">
          {eyebrow}
        </span>
        <h2 className="font-heading mt-3 min-w-0 max-w-md break-words text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 min-w-0 max-w-sm break-words text-base leading-relaxed text-muted-foreground">{description}</p>
        <Link
          href="/services"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          See all services <ArrowUpRight size={15} />
        </Link>

        {/* Desktop-only preview image, revealed per hovered/focused row. */}
        {active && (
          <div className="relative mt-8 hidden aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border shadow-sm lg:block">
            {services.map((service) => (
              <div
                key={service.slug}
                aria-hidden={service.slug !== active.slug}
                className={cn(
                  "absolute inset-0 transition-[clip-path,opacity] duration-500 ease-out",
                  service.slug === active.slug
                    ? "[clip-path:inset(0%_0_0_0)] opacity-100"
                    : "[clip-path:inset(0_0_100%_0)] opacity-0"
                )}
              >
                <ImagePlaceholder label="Service image" token={service.imageKey} className="h-full w-full border-0" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="min-w-0 divide-y divide-border border-t border-border" role="list">
        {services.map((service) => {
          const isActive = service.slug === active?.slug;
          return (
            <div key={service.slug} role="listitem">
            <Link
              href={`/services/${service.slug}`}
              onMouseEnter={() => setActiveSlug(service.slug)}
              onFocus={() => setActiveSlug(service.slug)}
              className="group flex min-w-0 items-center gap-4 py-6 sm:gap-6 sm:py-8"
            >
              <div className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg border border-border sm:w-20 lg:hidden">
                <ImagePlaceholder label="Service image" token={service.imageKey} className="h-full w-full border-0" />
              </div>
              <span
                className={cn(
                  "font-heading hidden shrink-0 text-2xl font-semibold transition-colors sm:text-3xl lg:block",
                  isActive ? "text-primary" : "text-primary/40"
                )}
              >
                {service.number}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <h3
                  className={cn(
                    "min-w-0 truncate text-xl font-semibold text-foreground transition-transform duration-300 sm:text-2xl",
                    "group-hover:translate-x-1.5 lg:group-hover:translate-x-2"
                  )}
                >
                  {service.title}
                </h3>
                <p className="min-w-0 truncate text-sm break-words text-muted-foreground">{service.short}</p>
                <span
                  className={cn(
                    "min-w-0 text-xs font-medium break-words text-muted-foreground transition-opacity duration-300",
                    "lg:max-w-0 lg:overflow-hidden lg:opacity-0 lg:group-hover:max-w-xs lg:group-hover:opacity-100 lg:whitespace-nowrap"
                  )}
                >
                  {service.category}
                  {service.duration ? ` · ${service.duration}` : ""} · {siteCopy.services.cardLabel}
                </span>
              </div>
              <ArrowUpRight
                size={20}
                className="shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
