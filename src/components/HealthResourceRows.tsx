"use client";

/**
 * Editorial homepage teaser for health/wellness resources — mirrors
 * EditorialServiceRows' hover-annotation pattern (small image sliver revealed
 * near the row's right edge on hover/focus) rather than a card grid. Reads
 * from `healthResources` (title/excerpt/imageKey only, no slug), which is a
 * distinct dataset from the full `/resources` article index, so rows are not
 * individually clickable — only the trailing "View all resources" CTA links
 * out. Mobile drops the hover dependency and shows an inline thumbnail.
 */
import { useState } from "react";
import { copy as siteCopy, healthResources } from "@/lib/business-content";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { cn } from "@/lib/utils";

type HealthResource = (typeof healthResources)[number];

export function HealthResourceRows({ resources }: { resources: HealthResource[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const active = resources[activeIndex];

  if (resources.length === 0) return null;

  return (
    <div className="relative min-w-0" onMouseLeave={() => setHovering(false)}>
      <div className="min-w-0 divide-y divide-border border-t border-border" role="list">
        {resources.map((article, i) => (
          <div
            key={article.title}
            role="listitem"
            tabIndex={0}
            onMouseEnter={() => {
              setActiveIndex(i);
              setHovering(true);
            }}
            onFocus={() => {
              setActiveIndex(i);
              setHovering(true);
            }}
            onBlur={() => setHovering(false)}
            className="group flex min-w-0 items-center gap-4 py-6 sm:gap-6 sm:py-8"
          >
            <div className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg border border-border sm:w-20 lg:hidden">
              <ImagePlaceholder label="Resource image" token={article.imageKey} className="h-full w-full border-0" />
            </div>
            <span className="font-heading hidden shrink-0 text-2xl font-semibold text-primary/40 sm:text-3xl lg:block">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <span className="min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">
                {siteCopy.home.resourceCardLabel}
              </span>
              <h3 className="min-w-0 truncate text-xl font-semibold text-foreground transition-transform duration-300 group-hover:translate-x-1.5 sm:text-2xl lg:group-hover:translate-x-2">
                {article.title}
              </h3>
              <p className="min-w-0 truncate text-sm break-words text-muted-foreground">{article.excerpt}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop-only hover annotation, matching EditorialServiceRows. */}
      {active && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-1/2 right-0 z-10 hidden h-48 w-36 -translate-y-1/2 overflow-hidden rounded-xl border border-border shadow-lg transition-[opacity,transform] duration-300 ease-out lg:block",
            hovering ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
          )}
        >
          {resources.map((article, i) => (
            <div
              key={article.title}
              className={cn(
                "absolute inset-0 transition-[clip-path,opacity] duration-500 ease-out",
                i === activeIndex ? "[clip-path:inset(0%_0_0_0)] opacity-100" : "[clip-path:inset(0_0_100%_0)] opacity-0"
              )}
            >
              <ImagePlaceholder label="Resource image" token={article.imageKey} className="h-full w-full border-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
