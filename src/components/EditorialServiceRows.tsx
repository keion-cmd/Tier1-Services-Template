"use client";

/**
 * Homepage services showcase — eyebrow-pill + copy header row (matching the
 * About/FAQ header pattern), then a 2-up photo-card grid: pill category tag
 * overlaid top-left, caption + arrow overlaid bottom-left. When there are
 * more than 2 services, prev/next arrows page through the set two at a time.
 */
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { EyebrowPill } from "@/components/blocks/PageBlocks";
import { type Service } from "@/lib/business-content";

const PAGE_SIZE = 2;

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
  const [page, setPage] = useState(0);
  if (services.length === 0) return null;

  const pageCount = Math.ceil(services.length / PAGE_SIZE);
  const current = services.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="flex min-w-0 flex-col gap-10 lg:gap-12">
      <div className="flex min-w-0 flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-12">
        <EyebrowPill className="shrink-0">{eyebrow}</EyebrowPill>
        <div className="flex min-w-0 max-w-2xl flex-col gap-5">
          <h2 className="font-heading min-w-0 break-words text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="min-w-0 break-words text-base leading-relaxed text-muted-foreground">{description}</p>
          <Link href="/services" className="w-fit">
            <Button size="sm">
              See all services <ArrowUpRight size={14} />
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <div className="grid min-w-0 gap-5 sm:grid-cols-2">
          {current.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative block aspect-[4/5] min-w-0 overflow-hidden rounded-xl border border-border"
            >
              <ImagePlaceholder
                label="Service image"
                token={service.imageKey}
                className="h-full w-full border-0 transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 max-w-[calc(100%-2rem)] rounded-full bg-background/90 px-3.5 py-1 text-xs font-semibold break-words text-foreground shadow-sm backdrop-blur-sm">
                {service.category}
              </span>
              <div className="absolute inset-x-4 bottom-4 flex min-w-0 items-end justify-between gap-3">
                <span className="min-w-0 max-w-[calc(100%-2.5rem)] truncate rounded-full bg-foreground/85 px-3.5 py-1.5 text-sm font-semibold text-background">
                  {service.title}
                </span>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-background text-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {pageCount > 1 && (
          <div className="flex min-w-0 items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon-circle"
              aria-label="Previous services"
              onClick={() => setPage((p) => (p - 1 + pageCount) % pageCount)}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-circle"
              aria-label="Next services"
              onClick={() => setPage((p) => (p + 1) % pageCount)}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
