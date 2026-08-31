"use client";

/**
 * Editorial resources index for /resources: a numbered, hoverable list on the
 * left drives a large sticky preview on the right (desktop) — the same
 * compositional system as EditorialServiceIndex (/services) and
 * TeamMemberRows (/team), so the three index pages read as one site instead
 * of the services/team pages being editorial and resources reverting to a
 * generic blog card grid. Mobile drops the hover dependency and shows an
 * inline thumbnail per row. Works unchanged from a single article (sticky
 * preview with nothing to switch between) up to a large library.
 */
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { articles, type Article } from "@/lib/business-content";
import { cn } from "@/lib/utils";

export function EditorialResourceIndex() {
  const categories = ["All", ...Array.from(new Set(articles.map((article) => article.category)))];
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeSlug, setActiveSlug] = useState<string>(articles[0]?.slug ?? "");

  const filtered = activeFilter === "All" ? articles : articles.filter((article) => article.category === activeFilter);
  const active: Article | undefined = filtered.find((article) => article.slug === activeSlug) ?? filtered[0];

  function selectFilter(filter: string) {
    setActiveFilter(filter);
    const next = (filter === "All" ? articles : articles.filter((article) => article.category === filter))[0];
    if (next) setActiveSlug(next.slug);
  }

  if (articles.length === 0) return null;

  return (
    <div>
      {categories.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter articles by category">
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
      )}

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div className="min-w-0 divide-y divide-border border-t border-border" role="list">
          {filtered.map((article, i) => {
            const isActive = article.slug === active?.slug;
            return (
              <div key={article.slug} role="listitem">
              <Link
                href={`/resources/${article.slug}`}
                onMouseEnter={() => setActiveSlug(article.slug)}
                onFocus={() => setActiveSlug(article.slug)}
                className={cn(
                  "flex min-w-0 items-center gap-4 py-5 transition-colors sm:gap-6 sm:py-6",
                  isActive && "lg:bg-secondary/40"
                )}
              >
                <div className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg border border-border sm:w-20 lg:hidden">
                  <ImagePlaceholder label="Resource image" token={article.imageKey} className="h-full w-full border-0" />
                </div>
                <span className="font-heading hidden shrink-0 text-2xl font-semibold text-primary/50 sm:text-3xl lg:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <h3 className="min-w-0 truncate text-lg font-semibold text-foreground sm:text-xl">{article.title}</h3>
                  <p className="min-w-0 truncate text-sm break-words text-muted-foreground">{article.excerpt}</p>
                  <span className="min-w-0 text-xs font-medium break-words text-muted-foreground">
                    {article.category} · {article.readingTime}
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
              <ImagePlaceholder label="Resource image" token={active.imageKey} className="h-full w-full border-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6">
                <span className="w-fit min-w-0 break-words text-xs font-semibold tracking-wide text-white/80 uppercase">
                  {active.category} · {active.readingTime}
                </span>
                <h3 className="font-heading min-w-0 break-words text-2xl font-semibold text-white">{active.title}</h3>
                <p className="min-w-0 max-w-sm break-words text-sm leading-relaxed text-white/80">{active.excerpt}</p>
                <Link
                  href={`/resources/${active.slug}`}
                  className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-white hover:underline"
                >
                  Read article <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
