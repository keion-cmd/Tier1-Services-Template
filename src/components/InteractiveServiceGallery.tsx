/**
 * Compact service card grid used on the homepage teaser. The full /services
 * index uses EditorialServiceIndex instead.
 */
import { Card, CardContent } from "@/components/ui/card";
import { BookingButton } from "@/components/BookingButton";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { copy as siteCopy, services } from "@/lib/business-content";

export function InteractiveServiceGallery({ count = services.length }: { count?: number }) {
  const galleryServices = services.slice(0, count);

  return (
    <div
      className={
        galleryServices.length === 1 ? "mx-auto grid max-w-md gap-5" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      }
    >
      {galleryServices.map((service, index) => (
        <Card key={service.title} className="card-hover flex flex-col overflow-hidden gap-0 py-0">
          <div className="flex min-w-0 items-center justify-between gap-2 px-5 pt-4">
            <span className="min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">
              {service.number} · {siteCopy.services.cardLabel}
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
          <div className="mt-3 flex flex-1 flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
              <ImagePlaceholder
                label="Service image"
                token={`[SERVICE_${index + 1}_IMAGE]`}
                className="card-hover-image h-full w-full border-0"
              />
            </div>
            <CardContent className="flex min-w-0 flex-1 flex-col gap-2 pt-4">
              <h3 className="text-xl leading-snug font-semibold tracking-tight text-foreground break-words">{service.title}</h3>
              {service.duration && (
                <span className="min-w-0 break-words text-xs font-medium text-muted-foreground">{service.duration}</span>
              )}
              <p className="text-sm leading-relaxed break-words text-muted-foreground">{service.short}</p>
              {service.benefits && service.benefits.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                  {service.benefits.slice(0, 2).map((benefit) => (
                    <li
                      key={benefit}
                      className="min-w-0 max-w-full truncate rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {benefit}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </div>
          <div className="flex min-w-0 items-end justify-end px-5 pb-4">
            <span className="min-w-0 break-words text-3xl leading-none font-bold text-primary/25">{service.number}.</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
