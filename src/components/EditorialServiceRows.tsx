"use client";

/**
 * Premium editorial service list for the homepage services section — replaces
 * the equal-sized InteractiveServiceGallery card grid. Desktop: full-width
 * rows under strong horizontal rules; hovering/focusing a row reveals a small
 * image annotation near the row's right edge via a clip-path wipe, rather
 * than a permanently-visible large preview panel. Mobile: a plain vertical
 * list with an inline thumbnail per row (no hover state on touch, so the
 * image can't be hidden behind an interaction that never fires).
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
  const [hovering, setHovering] = useState(false);
  const active = services.find((s) => s.slug === activeSlug) ?? services[0];

  if (services.length === 0) return null;

  return (
    <div className="flex min-w-0 flex-col gap-10 lg:gap-14">
      <div className="flex min-w-0 flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
        <div className="min-w-0 max-w-xl">
          <span className="inline-flex w-fit min-w-0 items-center text-xs font-semibold tracking-wider break-words text-primary uppercase">
            {eyebrow}
          </span>
          <h2 className="font-heading mt-3 min-w-0 break-words text-4xl leading-[0.95] font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h2>
        </div>
        <div className="flex min-w-0 max-w-sm shrink-0 flex-col gap-4 sm:text-right">
          <p className="min-w-0 break-words text-base leading-relaxed text-muted-foreground">{description}</p>
          <Link
            href="/services"
            className="inline-flex w-fit items-center gap-1.5 self-start text-sm font-semibold text-primary hover:underline sm:self-end"
          >
            See all services <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <div className="relative min-w-0" onMouseLeave={() => setHovering(false)}>
        <div className="min-w-0 divide-y divide-border border-t border-border" role="list">
        {services.map((service) => {
          const isActive = service.slug === active?.slug;
          return (
            <div key={service.slug} role="listitem">
            <Link
              href={`/services/${service.slug}`}
              onMouseEnter={() => {
                setActiveSlug(service.slug);
                setHovering(true);
              }}
              onFocus={() => {
                setActiveSlug(service.slug);
                setHovering(true);
              }}
              onBlur={() => setHovering(false)}
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

        {/* Desktop-only hover annotation: a small image sliver near the right
            edge, revealed only while a row is hovered/focused — not a
            permanently-visible preview pane. */}
        {active && (
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute top-1/2 right-0 z-10 hidden h-48 w-36 -translate-y-1/2 overflow-hidden rounded-xl border border-border shadow-lg transition-[opacity,transform] duration-300 ease-out lg:block",
              hovering ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
            )}
          >
            {services.map((service) => (
              <div
                key={service.slug}
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
    </div>
  );
}
