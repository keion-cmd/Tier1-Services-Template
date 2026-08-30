"use client";

/**
 * Shared service card grid, reused on the homepage (compact) and the full Services page (filterable).
 */
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingButton } from "@/components/BookingButton";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { services } from "@/lib/business-content";
import { cn } from "@/lib/utils";

const categoryFilters = ["All", "Category 1", "Category 2", "Category 3", "Category 4", "Category 5"] as const;

type InteractiveServiceGalleryProps = { variant: "home" | "services"; count?: number };

export function InteractiveServiceGallery({ variant, count = services.length }: InteractiveServiceGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<(typeof categoryFilters)[number]>("All");
  const galleryServices = services.slice(0, count);
  const visibleServices =
    variant === "services" && activeFilter !== "All"
      ? galleryServices.filter((service) => service.category === activeFilter)
      : galleryServices;

  return (
    <div>
      {variant === "services" && (
        <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter services by category">
          {categoryFilters.map((filter) => (
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
      <div
        className={cn(
          "grid gap-5",
          visibleServices.length === 1
            ? "mx-auto max-w-md"
            : variant === "home"
              ? "sm:grid-cols-2 lg:grid-cols-4"
              : "sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {visibleServices.map((service) => {
          const index = galleryServices.indexOf(service);
          const detailHref = `/services/${service.slug}`;
          const media = (
            <div className="relative aspect-[4/3] overflow-hidden">
              <ImagePlaceholder
                label="Service image"
                token={`[SERVICE_${index + 1}_IMAGE]`}
                className="card-hover-image h-full w-full border-0"
              />
            </div>
          );
          const copy = (
            <CardContent className="flex min-w-0 flex-1 flex-col gap-2 pt-4">
              <h3 className="text-xl leading-snug font-semibold tracking-tight text-foreground break-words">{service.title}</h3>
              <p className="text-sm leading-relaxed break-words text-muted-foreground">{service.short}</p>
            </CardContent>
          );

          return (
            <Card key={service.title} className="card-hover flex flex-col overflow-hidden gap-0 py-0">
              <div className="flex min-w-0 items-center justify-between gap-2 px-5 pt-4">
                <span className="min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">
                  {service.number} · Care path
                </span>
                <BookingButton
                  label="Book Now"
                  aria-label={`Book an appointment for ${service.title}`}
                  size="sm"
                  variant="secondary"
                  iconSize={14}
                  className="h-8 px-3 text-xs"
                />
              </div>
              {variant === "services" ? (
                <Link href={detailHref} aria-label={`View details about ${service.title}`} className="mt-3 flex flex-1 flex-col">
                  {media}
                  {copy}
                </Link>
              ) : (
                <div className="mt-3 flex flex-1 flex-col">
                  {media}
                  {copy}
                </div>
              )}
              <div className="flex min-w-0 items-end justify-end px-5 pb-4">
                <span className="min-w-0 break-words text-3xl leading-none font-bold text-primary/25">{service.number}.</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
