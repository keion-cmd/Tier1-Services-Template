import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { Card } from "@/components/ui/card";
import { PageHero, Section, SectionHeading, FeatureCard } from "@/components/PageBlocks";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { clinic, copy, emergencyInfo } from "@/lib/business-content";

function ClinicMap() {
  const suppliedDirectionsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${clinic.address}, ${clinic.city}`
  )}&z=15&output=embed`;

  return (
    <Card className="relative min-h-[400px] gap-0 overflow-hidden p-0 md:min-h-[510px]">
      <div className="absolute top-4 left-4 z-10 grid max-w-[calc(100%-2rem)] min-w-0 gap-0.5 rounded-xl bg-foreground/85 px-3.5 py-2.5 text-background">
        <span className="text-[10px] font-bold tracking-wide text-primary-foreground/70 uppercase">Driving route</span>
        <strong className="min-w-0 break-words text-lg font-medium">{clinic.shortName} ↔ [LANDMARK]</strong>
      </div>
      <iframe
        className="h-full min-h-[400px] w-full border-0 md:min-h-[510px]"
        title={`Google Maps driving directions to ${clinic.name}`}
        src={suppliedDirectionsEmbed}
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <a
        className="absolute bottom-6 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-primary-foreground shadow-md hover:bg-primary/90"
        href={clinic.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open driving directions <ArrowUpRight size={14} />
      </a>
    </Card>
  );
}

export default function Location() {
  return (
    <main>
      <PageMeta
        title={`Location — ${clinic.name} ${clinic.descriptor}`}
        description={`Find ${clinic.name} at ${clinic.address}, ${clinic.city}.`}
        path="/location"
      />

      <PageHero
        eyebrow={copy.location.heroEyebrow}
        title={copy.location.heroTitle}
        description={copy.location.heroSubtitle}
        cta={<BookingButton label="Book an Appointment" />}
      />

      <Section aria-label="Clinic details and map">
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="gap-0 overflow-hidden p-0">
            <ImagePlaceholder label="Clinic image" token="[CLINIC_IMAGE]" className="aspect-[4/3] w-full border-0" />
            <div className="flex min-w-0 flex-col gap-5 p-6">
              <span className="min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">{clinic.name}</span>
              <h2 className="min-w-0 break-words text-3xl leading-tight font-bold tracking-tight text-foreground">{copy.location.startTitle}</h2>
              <div className="flex min-w-0 flex-col gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold tracking-wide text-primary uppercase">Address</span>
                    <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">
                      <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        {clinic.address}
                        <br />
                        {clinic.city}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex min-w-0 items-start gap-3">
                  <Phone size={20} className="mt-0.5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold tracking-wide text-primary uppercase">Contact</span>
                    <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">
                      <a href={`tel:${clinic.phoneDigits}`} className="hover:text-primary">
                        {clinic.phone}
                      </a>
                      <br />
                      <a href={`mailto:${clinic.email}`} className="hover:text-primary">
                        {clinic.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <BookingButton label="Book an Appointment" className="w-fit" />
            </div>
          </Card>
          <ClinicMap />
        </div>
      </Section>

      <Section className="bg-secondary/30" aria-labelledby="directions-title">
        <SectionHeading
          eyebrow={copy.location.directionsEyebrow}
          title={<span id="directions-title">{copy.location.directionsTitle}</span>}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <FeatureCard
            label={copy.location.landmarkLabel}
            title="[LANDMARK]"
            description={`The supplied Google Maps route connects ${clinic.name} with a nearby landmark.`}
          />
          <FeatureCard
            label={copy.location.addressLabel}
            title={clinic.name}
            description={
              <>
                <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary">
                  {clinic.address}, {clinic.city}
                </a>
                . Use the directions button for the provided driving route.
              </>
            }
          />
        </div>
      </Section>

      <Section aria-labelledby="business-hours-title">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <SectionHeading
              eyebrow={copy.location.hoursEyebrow}
              title={<span id="business-hours-title">{copy.location.hoursTitle}</span>}
              description={`These are ${clinic.name} template hours. Confirm client-approved hours before any production launch.`}
              className="mb-0"
            />
          </div>
          <dl className="grid content-start divide-y divide-border border-t border-border">
            {clinic.businessHours.map((entry) => (
              <div key={entry.days} className="flex min-w-0 items-center justify-between gap-4 py-4">
                <dt className="min-w-0 break-words text-sm font-semibold text-foreground">{entry.days}</dt>
                <dd className="min-w-0 break-words text-right text-sm font-semibold text-primary">{entry.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section className="bg-secondary/30" aria-labelledby="emergency-title">
        <SectionHeading
          eyebrow={emergencyInfo.heading}
          title={<span id="emergency-title">{copy.location.emergencyTitle}</span>}
          description={emergencyInfo.note}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <FeatureCard
            label={copy.location.referralLabel}
            title={emergencyInfo.referralLocationName}
            description={
              <>
                <a href={`tel:${emergencyInfo.referralLocationPhoneDigits}`} className="text-foreground hover:text-primary">
                  {emergencyInfo.referralLocationPhone}
                </a>
                <br />
                {emergencyInfo.referralLocationAddress}
              </>
            }
          />
          <FeatureCard label={copy.location.whatToDoLabel} title={copy.location.afterHoursTitle} description={emergencyInfo.instructions} />
        </div>
      </Section>

      <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <p className="min-w-0 break-words text-xs leading-relaxed text-muted-foreground">
          {clinic.name} is a template demonstration business. The supplied map location, directions route, and
          landmark are placeholder reference content; replace with your business's actual location details before
          launch.
        </p>
      </div>
    </main>
  );
}
