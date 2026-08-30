import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, PageOutro } from "@/components/blocks/PageBlocks";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ScrollReveal } from "@/components/ScrollReveal";
import { copy, getBusinessTagline } from "@/lib/business-content";
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
      <PageHero
        eyebrow={copy.locations.heroEyebrow}
        title={copy.locations.heroTitle}
        description={copy.locations.heroSubtitle}
        cta={<BookingButton label="Book an Appointment" />}
        image={{ label: "Locations image", token: "[LOCATIONS_IMAGE]" }}
      />

      <ScrollReveal>
      <Section aria-labelledby="locations-grid-title">
        <SectionHeading
          eyebrow={copy.locations.gridEyebrow}
          title={<span id="locations-grid-title">{copy.locations.gridTitle}</span>}
        />
        <div className={cn("grid gap-5", locations.length === 1 ? "mx-auto max-w-md" : "sm:grid-cols-2")}>
          {locations.map((location) => (
            <Link key={location.slug} href={`/locations/${location.slug}`}>
              <Card className="card-hover h-full gap-0 overflow-hidden p-0">
                <ImagePlaceholder label="Location image" token={location.imageKey} className="card-hover-image aspect-[16/9] w-full border-0" />
                <div className="flex min-w-0 flex-col gap-2 p-5">
                  <h3 className="min-w-0 break-words text-lg font-semibold text-foreground">{location.name}</h3>
                  <p className="flex min-w-0 items-start gap-2 text-sm leading-relaxed break-words text-muted-foreground">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                    {location.address}, {location.city}
                  </p>
                  <p className="flex min-w-0 items-center gap-2 text-sm leading-relaxed break-words text-muted-foreground">
                    <Phone size={16} className="shrink-0 text-primary" />
                    {location.phone}
                  </p>
                  <span className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                    View location <ArrowUpRight size={15} />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
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
