"use client";

/** Category-filterable grid for /resources. Categories are derived from the articles themselves. */
import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { articles } from "@/lib/business-content";

export function ResourceFilterGrid() {
  const categories = ["All", ...Array.from(new Set(articles.map((article) => article.category)))];
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const visibleArticles = activeFilter === "All" ? articles : articles.filter((article) => article.category === activeFilter);

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
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visibleArticles.map((article) => (
          <Link key={article.slug} href={`/resources/${article.slug}`}>
            <Card className="h-full gap-0 overflow-hidden p-0 transition-shadow hover:shadow-md">
              <ImagePlaceholder label="Resource image" token={article.imageKey} className="aspect-[16/10] w-full border-0" />
              <div className="flex min-w-0 flex-col gap-1.5 p-5">
                <span className="min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">
                  {article.category} · {article.date} · {article.readingTime}
                </span>
                <h3 className="min-w-0 break-words text-lg font-semibold text-foreground">{article.title}</h3>
                <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
