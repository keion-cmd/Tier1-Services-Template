import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Car, Clock3, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BookingButton } from "@/components/BookingButton";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { JsonLd } from "@/components/JsonLd";
import { LocationMap } from "@/components/LocationMap";
import { Section, SectionHeading, FeatureCard, PageOutro } from "@/components/blocks/PageBlocks";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { buildBreadcrumbSchema, buildLocationSchema, clinic, copy, getBusinessTagline, getProviderBySlug, getServiceBySlug, sectionVisibility } from "@/lib/business-content";
import { locations, getLocationBySlug } from "@/data/locations";
import { buildMetadata } from "@/lib/metadata";
import { isPlaceholderToken } from "@/lib/utils";

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

export default async function LocationDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) notFound();

  const locationServices = location.serviceSlugs
    .map((serviceSlug) => getServiceBySlug(serviceSlug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));
  const locationProviders = (location.providerSlugs ?? [])
    .map((providerSlug) => getProviderBySlug(providerSlug))
    .filter((provider): provider is NonNullable<typeof provider> => Boolean(provider));

  return (
    <main>
      <JsonLd
        data={[
          buildLocationSchema(location),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations" },
            { name: location.name, path: `/locations/${location.slug}` },
          ]),
        ]}
      />

      <ImmersiveHero
        eyebrow={copy.location.heroEyebrow}
        headline={location.name}
        subheadline={location.description}
        imageToken={location.imageKey}
        imageLabel="Location image"
        cta={<BookingButton label="Book an Appointment" size="lg" />}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <Link href="/locations" className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft size={15} /> All Locations
        </Link>
      </div>

      <ScrollReveal>
      <Section aria-labelledby="location-details-title">
        <SectionHeading
          eyebrow={copy.location.directionsEyebrow}
          title={<span id="location-details-title">{copy.location.directionsTitle}</span>}
        />
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="gap-0 overflow-hidden p-0">
            <div className="flex min-w-0 flex-col gap-5 p-6">
              <span className="min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">{location.name}</span>
              <h2 className="min-w-0 break-words text-3xl leading-tight font-bold tracking-tight text-foreground">{copy.location.startTitle}</h2>
              <div className="flex min-w-0 flex-col gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold tracking-wide text-primary uppercase">{copy.location.addressLabel}</span>
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
                {location.accessNotes && !isPlaceholderToken(location.accessNotes) && (
                  <div className="flex min-w-0 items-start gap-3">
                    <Car size={20} className="mt-0.5 shrink-0 text-primary" />
                    <div className="min-w-0">
                      <span className="text-xs font-semibold tracking-wide text-primary uppercase">Parking &amp; access</span>
                      <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">{location.accessNotes}</p>
                    </div>
                  </div>
                )}
              </div>
              <BookingButton label="Book an Appointment" className="w-fit" />
            </div>
          </Card>
          <LocationMap
            address={location.address}
            city={location.city}
            landmark={location.landmark}
            landmarkLabel={copy.location.landmarkLabel}
          />
        </div>
      </Section>
      </ScrollReveal>

      {sectionVisibility.locationServicesAndHours && locationServices.length > 0 && (
        <ScrollReveal>
        <Section className="bg-secondary/30" aria-labelledby="location-services-title">
          <SectionHeading
            eyebrow="Available here"
            title={<span id="location-services-title">Services offered at this location</span>}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {locationServices.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} aria-label={`View details about ${service.title}`}>
                <FeatureCard label="Available here" title={service.title} description={service.short} />
              </Link>
            ))}
          </div>
        </Section>
        </ScrollReveal>
      )}

      {locationProviders.length > 0 && (
        <ScrollReveal>
        <Section aria-labelledby="location-team-title">
          <SectionHeading
            eyebrow="Meet the team"
            title={<span id="location-team-title">Team at this location</span>}
          />
          <div className={`grid gap-5 ${locationProviders.length === 1 ? "mx-auto max-w-sm" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {locationProviders.map((provider) => (
              <Card key={provider.slug} className="card-hover gap-3 p-4">
                <ImagePlaceholder label="Provider photo" token={provider.imageKey} className="card-hover-image aspect-[4/3] w-full rounded-xl" />
                <div className="flex min-w-0 flex-col gap-1.5 px-1">
                  <span className="min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">{provider.specialty}</span>
                  <h3 className="min-w-0 break-words text-lg font-semibold text-foreground">
                    {provider.name}, {provider.credentials}
                  </h3>
                  <Link
                    href={`/team/${provider.slug}`}
                    className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    View profile <ArrowUpRight size={15} />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Section>
        </ScrollReveal>
      )}

      {sectionVisibility.locationServicesAndHours && location.businessHours.length > 0 && (
      <ScrollReveal>
      <Section aria-labelledby="location-hours-title">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <SectionHeading
              eyebrow={copy.location.hoursEyebrow}
              title={<span id="location-hours-title">{copy.location.hoursTitle}</span>}
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
      </ScrollReveal>
      )}

      <ScrollReveal>
        <PageOutro
          eyebrow={getBusinessTagline()}
          title={copy.location.heroTitle}
          cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
        />
      </ScrollReveal>
    </main>
  );
}
