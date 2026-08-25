/**
 * Shared service card grid, reused on the homepage (compact) and the full Services page (filterable).
 */
import { useState } from "react";
import { Link } from "wouter";
import { Activity, Heart, ShieldCheck, Smile, Sparkles, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingButton } from "@/components/BookingButton";
import { assets, clinic, services } from "@/lib/clinic-content";
import { cn } from "@/lib/utils";

const icons = { stethoscope: Stethoscope, shield: ShieldCheck, sparkles: Sparkles, heart: Heart, smile: Smile, activity: Activity };
const serviceVisuals = [assets.serviceExam, assets.dogCare, assets.catCare, assets.clinicHero, assets.dentalCare, assets.diagnosticsCare];
const categoryFilters = ["All", "Preventive", "Clinical & Dental", "Diagnostics"] as const;

type InteractiveServiceGalleryProps = { variant: "home" | "services"; count?: number };

export function InteractiveServiceGallery({ variant, count = 6 }: InteractiveServiceGalleryProps) {
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
          variant === "home" ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {visibleServices.map((service) => {
          const index = galleryServices.indexOf(service);
          const Icon = icons[service.icon];
          const detailHref = `/services/${service.slug}`;
          const media = (
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={serviceVisuals[index]}
                alt={`${service.title} at ${clinic.name}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          );
          const copy = (
            <CardContent className="flex flex-1 flex-col gap-2 pt-4">
              <Icon size={20} strokeWidth={1.75} className="text-primary" />
              <h3 className="text-xl leading-snug font-semibold tracking-tight text-foreground">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{service.short}</p>
            </CardContent>
          );

          return (
            <Card key={service.title} className="group flex flex-col overflow-hidden gap-0 py-0 transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between px-5 pt-4">
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">
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
              <div className="flex items-end justify-end px-5 pb-4">
                <span className="text-3xl leading-none font-bold text-primary/25">{service.number}.</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
