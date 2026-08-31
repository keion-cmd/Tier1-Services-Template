import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookingButton } from "@/components/BookingButton";
import { Section, SectionHeading, PageOutro } from "@/components/blocks/PageBlocks";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { clinic, copy, getBusinessTagline, getServiceBySlug, providers, sectionVisibility } from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: `Meet Our Team — ${getBusinessTagline()}`,
  description: `Meet the professional team at ${clinic.name}, including primary care, diagnostics, and preventive care specialists.`,
  path: "/team",
});

export default function Team() {
  return (
    <main>
      <ImmersiveHero
        eyebrow={copy.team.heroEyebrow}
        headline={copy.team.heroTitle}
        subheadline={copy.team.heroSubtitle}
        imageToken="[TEAM_IMAGE]"
        imageLabel="Team hero image"
        cta={<BookingButton label="Schedule an Appointment" size="lg" />}
        stat={{ value: String(providers.length).padStart(2, "0"), caption: "team members" }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <p className="min-w-0 max-w-md break-words text-sm leading-relaxed text-muted-foreground">
            {providers.length} demo profiles representing the kind of clinical range a real {clinic.name} team could offer: primary
            care, diagnostics, and preventive & long-term care.
          </p>
          <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            See our care values <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <Section className="bg-secondary/30" aria-labelledby="team-culture-title">
        <SectionHeading
          eyebrow={copy.team.cultureEyebrow}
          title={<span id="team-culture-title" className="sr-only">{copy.team.cultureEyebrow}</span>}
          className="mb-6"
        />
        <p className="font-heading min-w-0 max-w-3xl break-words text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl">
          {copy.team.cultureBody}
        </p>
      </Section>

      {sectionVisibility.teamProvidersGrid && providers.length > 0 && (
        <ScrollReveal>
        <Section aria-labelledby="team-grid-title">
          <SectionHeading
            eyebrow={copy.team.gridEyebrow}
            title={<span id="team-grid-title">{copy.team.gridTitle}</span>}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {providers.map((provider) => {
              const providerServices = (provider.relatedServiceSlugs ?? [])
                .map((slug) => getServiceBySlug(slug))
                .filter((service): service is NonNullable<typeof service> => Boolean(service));

              return (
                <Card key={provider.slug} className="card-hover gap-3 p-4">
                  <ImagePlaceholder label="Provider photo" token={provider.imageKey} className="card-hover-image aspect-[4/3] w-full rounded-xl" />
                  <div className="flex min-w-0 flex-col gap-1.5 px-1">
                    <span className="min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">
                      {provider.specialty}
                      {provider.placeholder && " (demo profile)"}
                    </span>
                    <h3 className="min-w-0 break-words text-lg font-semibold text-foreground">
                      {provider.name}, {provider.credentials}
                    </h3>
                    <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">{provider.bio}</p>
                    {providerServices.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {providerServices.map((service) => (
                          <Link key={service.slug} href={`/services/${service.slug}`}>
                            <Badge variant="outline" className="max-w-full rounded-full text-xs font-semibold break-words whitespace-normal hover:border-primary/40">
                              {service.title}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    )}
                    <Link
                      href={`/team/${provider.slug}`}
                      className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      View profile <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </Section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <PageOutro
          eyebrow={getBusinessTagline()}
          title={copy.team.ctaTitle}
          cta={<BookingButton label="Schedule an Appointment" variant="secondary" size="lg" />}
        />
      </ScrollReveal>
    </main>
  );
}
