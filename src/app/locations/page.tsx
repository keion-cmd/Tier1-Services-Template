import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin, Navigation, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookingButton } from "@/components/BookingButton";
import { Section, SectionHeading, PageOutro } from "@/components/blocks/PageBlocks";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { copy, getBusinessTagline, getServiceBySlug } from "@/lib/business-content";
import { locations } from "@/data/locations";
import { buildMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: `Locations — ${getBusinessTagline()}`,
  description: `Find a ${getBusinessTagline()} location near you.`,
  path: "/locations",
});

export default function Locations() {
  return (
    <main>
      <ImmersiveHero
        eyebrow={copy.locations.heroEyebrow}
        headline={copy.locations.heroTitle}
        subheadline={copy.locations.heroSubtitle}
        imageToken="[LOCATIONS_IMAGE]"
        imageLabel="Locations image"
        cta={<BookingButton label="Book an Appointment" size="lg" />}
        stat={{ value: String(locations.length).padStart(2, "0"), caption: locations.length === 1 ? "location" : "locations" }}
      />

      <ScrollReveal>
      <Section aria-labelledby="locations-grid-title">
        <SectionHeading
          eyebrow={copy.locations.gridEyebrow}
          title={<span id="locations-grid-title">{copy.locations.gridTitle}</span>}
        />
        <div className={cn("grid gap-5", locations.length === 1 ? "mx-auto max-w-md" : "sm:grid-cols-2")}>
          {locations.map((location) => {
            const locationServices = location.serviceSlugs
              .map((slug) => getServiceBySlug(slug))
              .filter((service): service is NonNullable<typeof service> => Boolean(service));

            return (
              <Card key={location.slug} className="card-hover h-full gap-0 overflow-hidden p-0">
                <Link href={`/locations/${location.slug}`}>
                  <ImagePlaceholder label="Location image" token={location.imageKey} className="card-hover-image aspect-[16/9] w-full border-0" />
                </Link>
                <div className="flex min-w-0 flex-col gap-2 p-5">
                  <Link href={`/locations/${location.slug}`} className="min-w-0">
                    <h3 className="min-w-0 break-words text-lg font-semibold text-foreground hover:text-primary">{location.name}</h3>
                  </Link>
                  <p className="flex min-w-0 items-start gap-2 text-sm leading-relaxed break-words text-muted-foreground">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                    {location.address}, {location.city}
                  </p>
                  <p className="flex min-w-0 items-center gap-2 text-sm leading-relaxed break-words text-muted-foreground">
                    <Phone size={16} className="shrink-0 text-primary" />
                    {location.phone}
                  </p>
                  {location.businessHours.length > 0 && (
                    <p className="flex min-w-0 items-center gap-2 text-sm leading-relaxed break-words text-muted-foreground">
                      <Clock3 size={16} className="shrink-0 text-primary" />
                      {location.businessHours[0].days}: {location.businessHours[0].hours}
                    </p>
                  )}
                  {locationServices.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {locationServices.slice(0, 3).map((service) => (
                        <Link key={service.slug} href={`/services/${service.slug}`}>
                          <Badge variant="outline" className="max-w-full rounded-full text-xs font-semibold break-words whitespace-normal hover:border-primary/40">
                            {service.title}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  )}
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <Link href={`/locations/${location.slug}`} className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                      View location <ArrowUpRight size={15} />
                    </Link>
                    <a
                      href={location.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      Get Directions <Navigation size={14} />
                    </a>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>
      </ScrollReveal>

      <ScrollReveal>
        <PageOutro
          eyebrow={getBusinessTagline()}
          title={copy.locations.ctaTitle}
          cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
        />
      </ScrollReveal>
    </main>
  );
}
