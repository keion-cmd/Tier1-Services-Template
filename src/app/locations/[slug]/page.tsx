import { notFound } from "next/navigation";
import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BookingButton } from "@/components/BookingButton";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, Section, SectionHeading, FeatureCard, PageOutro } from "@/components/blocks/PageBlocks";
import { buildBreadcrumbSchema, clinic, copy, getBusinessTagline, sectionVisibility } from "@/lib/business-content";
import { locations, getLocationBySlug } from "@/data/locations";
import { buildMetadata } from "@/lib/metadata";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};

  return buildMetadata({
    title: `${location.name} — ${getBusinessTagline()}`,
    description: `Find ${clinic.name} at ${location.address}, ${location.city}.`,
    path: `/locations/${location.slug}`,
  });
}

function LocationMap({ address, city, landmark }: { address: string; city: string; landmark: string }) {
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(`${address}, ${city}`)}&z=15&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${address}, ${city}`)}`;

  return (
    <Card className="relative min-h-[400px] gap-0 overflow-hidden p-0 md:min-h-[510px]">
      <div className="absolute top-4 left-4 z-10 grid max-w-[calc(100%-2rem)] min-w-0 gap-0.5 rounded-xl bg-foreground/85 px-3.5 py-2.5 text-background">
        <span className="text-[10px] font-bold tracking-wide text-primary-foreground/70 uppercase">Nearby landmark</span>
        <strong className="min-w-0 break-words text-lg font-medium">{landmark}</strong>
      </div>
      <iframe
        className="h-full min-h-[400px] w-full border-0 md:min-h-[510px]"
        title={`Google Maps location for ${address}, ${city}`}
        src={embedUrl}
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <a
        className="absolute bottom-6 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-primary-foreground shadow-md hover:bg-primary/90"
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open driving directions <ArrowUpRight size={14} />
      </a>
    </Card>
  );
}

export default async function LocationDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) notFound();

  return (
    <main>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: location.name, path: `/locations/${location.slug}` },
        ])}
      />

      <PageHero
        eyebrow={copy.location.heroEyebrow}
        title={location.name}
        description={location.description}
        cta={<BookingButton label="Book an Appointment" />}
        backLink={{ href: "/locations", label: "All Locations" }}
        image={{ label: "Location image", token: location.imageKey }}
      />

      <Section aria-label="Location details and map">
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="gap-0 overflow-hidden p-0">
            <div className="flex min-w-0 flex-col gap-5 p-6">
              <span className="min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">{location.name}</span>
              <h2 className="min-w-0 break-words text-3xl leading-tight font-bold tracking-tight text-foreground">{copy.location.startTitle}</h2>
              <div className="flex min-w-0 flex-col gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold tracking-wide text-primary uppercase">Address</span>
                    <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">
                      <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        {location.address}
                        <br />
                        {location.city}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex min-w-0 items-start gap-3">
                  <Phone size={20} className="mt-0.5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold tracking-wide text-primary uppercase">Contact</span>
                    <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">
                      <a href={`tel:${location.phoneDigits}`} className="hover:text-primary">
                        {location.phone}
                      </a>
                      <br />
                      <a href={`mailto:${location.email}`} className="hover:text-primary">
                        {location.email}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex min-w-0 items-start gap-3">
                  <Clock3 size={20} className="mt-0.5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold tracking-wide text-primary uppercase">Hours</span>
                    <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">
                      {location.businessHours.map((entry) => (
                        <span key={entry.days} className="block">
                          {entry.days}: {entry.hours}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
              <BookingButton label="Book an Appointment" className="w-fit" />
            </div>
          </Card>
          <LocationMap address={location.address} city={location.city} landmark={location.landmark} />
        </div>
      </Section>

      {sectionVisibility.locationServicesAndHours && location.servicesOffered.length > 0 && (
        <Section className="bg-secondary/30" aria-labelledby="location-services-title">
          <SectionHeading
            eyebrow={copy.location.directionsEyebrow}
            title={<span id="location-services-title">Services offered at this location</span>}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {location.servicesOffered.map((service) => (
              <FeatureCard key={service} label="Available here" title={service} description={`Offered at the ${location.name} location.`} />
            ))}
          </div>
        </Section>
      )}

      {sectionVisibility.locationServicesAndHours && location.businessHours.length > 0 && (
      <Section aria-labelledby="location-hours-title">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <SectionHeading
              eyebrow={copy.location.hoursEyebrow}
              title={<span id="location-hours-title">{copy.location.hoursTitle}</span>}
              description={`These are template hours for ${location.name}. Confirm client-approved hours before any production launch.`}
              className="mb-0"
            />
          </div>
          <dl className="grid content-start divide-y divide-border border-t border-border">
            {location.businessHours.map((entry) => (
              <div key={entry.days} className="flex min-w-0 items-center justify-between gap-4 py-4">
                <dt className="min-w-0 break-words text-sm font-semibold text-foreground">{entry.days}</dt>
                <dd className="min-w-0 break-words text-right text-sm font-semibold text-primary">{entry.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
      )}

      <PageOutro
        eyebrow={getBusinessTagline()}
        title={copy.location.heroTitle}
        cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
