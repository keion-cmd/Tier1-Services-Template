"use client";

/**
 * Editorial services index for /services: a numbered, hoverable list on the
 * left drives a large sticky visual on the right (desktop), replacing the
 * plain card grid. Each row also carries its own thumbnail so the mobile
 * layout (where there's no hover) still reads as a complete editorial list
 * rather than a stripped-down desktop view.
 */
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { copy as siteCopy, services, type Service } from "@/lib/business-content";
import { cn } from "@/lib/utils";

export function EditorialServiceIndex() {
  const categories = ["All", ...Array.from(new Set(services.map((service) => service.category)))];
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeSlug, setActiveSlug] = useState<string>(services[0]?.slug ?? "");

  const filtered = activeFilter === "All" ? services : services.filter((service) => service.category === activeFilter);
  const active: Service = filtered.find((service) => service.slug === activeSlug) ?? filtered[0];

  function selectFilter(filter: string) {
    setActiveFilter(filter);
    const next = (filter === "All" ? services : services.filter((service) => service.category === filter))[0];
    if (next) setActiveSlug(next.slug);
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter services by category">
        {categories.map((filter) => (
          <Button
            key={filter}
            type="button"
            role="tab"
            aria-selected={activeFilter === filter}
            variant={activeFilter === filter ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => selectFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div className="min-w-0 divide-y divide-border border-t border-border" role="list">
          {filtered.map((service) => {
            const isActive = service.slug === active?.slug;
            return (
              <div key={service.slug} role="listitem">
              <Link
                href={`/services/${service.slug}`}
                onMouseEnter={() => setActiveSlug(service.slug)}
                onFocus={() => setActiveSlug(service.slug)}
                className={cn(
                  "flex min-w-0 items-center gap-4 py-5 transition-colors sm:gap-6 sm:py-6",
                  isActive && "lg:bg-secondary/40"
                )}
              >
                <div className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg border border-border sm:w-20 lg:hidden">
                  <ImagePlaceholder label="Service image" token={service.imageKey} className="h-full w-full border-0" />
                </div>
                <span className="font-heading hidden shrink-0 text-2xl font-semibold text-primary/50 sm:text-3xl lg:block">
                  {service.number}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <h3 className="min-w-0 truncate text-lg font-semibold text-foreground sm:text-xl">{service.title}</h3>
                  <p className="min-w-0 truncate text-sm break-words text-muted-foreground">{service.short}</p>
                  <span className="min-w-0 text-xs font-medium break-words text-muted-foreground">
                    {service.category}
                    {service.duration ? ` · ${service.duration}` : ""}
                  </span>
                </div>
                <ArrowUpRight size={18} className="shrink-0 text-primary" />
              </Link>
              </div>
            );
          })}
        </div>

        {active && (
          <div className="sticky top-24 hidden min-w-0 lg:block">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border shadow-sm">
              <ImagePlaceholder label="Service image" token={active.imageKey} className="h-full w-full border-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6">
                <span className="w-fit min-w-0 break-words text-xs font-semibold tracking-wide text-white/80 uppercase">
                  {active.number} · {siteCopy.services.cardLabel}
                </span>
                <h3 className="font-heading min-w-0 break-words text-2xl font-semibold text-white">{active.title}</h3>
                <p className="min-w-0 max-w-sm break-words text-sm leading-relaxed text-white/80">{active.short}</p>
                <Link
                  href={`/services/${active.slug}`}
                  className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-white hover:underline"
                >
                  View details <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
