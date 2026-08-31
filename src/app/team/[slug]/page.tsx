import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BookingButton } from "@/components/BookingButton";
import { JsonLd } from "@/components/JsonLd";
import { Section, SectionHeading, FeatureCard, PageOutro } from "@/components/blocks/PageBlocks";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { buildBreadcrumbSchema, buildPersonSchema, businessConfig, getBusinessTagline, getProviderBySlug, getServiceBySlug, providers, sectionVisibility } from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return providers.map((provider) => ({ slug: provider.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);
  if (!provider) return {};

  return buildMetadata({
    title: `${provider.name}, ${provider.credentials} — ${getBusinessTagline()}`,
    description: `${provider.name}, ${provider.credentials} — ${provider.specialty} at ${getBusinessTagline()}.`,
    path: `/team/${provider.slug}`,
  });
}

export default async function ProviderDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);

  if (!provider) notFound();

  const relatedServices = (provider.relatedServiceSlugs ?? [])
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <main>
      <JsonLd
        data={[
          buildPersonSchema(provider),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Our Team", path: "/team" },
            { name: provider.name, path: `/team/${provider.slug}` },
          ]),
        ]}
      />

      <ImmersiveHero
        eyebrow={provider.specialty + (provider.placeholder ? " · Demo profile" : "")}
        headline={
          <>
            {provider.name}
            <br />
            <Badge variant="outline" className="mt-1 rounded-full px-4 py-1.5 text-base font-semibold">
              {provider.credentials}
            </Badge>
          </>
        }
        subheadline={provider.fullBio ?? provider.bio}
        imageToken={provider.imageKey}
        imageLabel="Provider photo"
        cta={<BookingButton label="Schedule With Our Team" size="lg" />}
        stat={{ value: String(provider.yearsExperience), caption: "years experience" }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <Link href="/team" className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            <ArrowLeft size={15} /> Our Team
          </Link>
          <p className="min-w-0 max-w-md break-words text-sm leading-relaxed text-muted-foreground">
            {provider.specialty} at {businessConfig.name}, with a steady, unhurried approach to every visit.
          </p>
          <Link href="/team" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            See the full team <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      {sectionVisibility.providerAreasOfInterest && provider.areasOfInterest.length > 0 && (
        <ScrollReveal>
        <Section aria-labelledby="provider-interests-title">
          <SectionHeading
            eyebrow="Areas of interest"
            title={
              <span id="provider-interests-title" className="sr-only">
                Areas of interest
              </span>
            }
            className="mb-6"
          />
          <div className="flex flex-wrap gap-2">
            {provider.areasOfInterest.map((interest) => (
              <Badge
                key={interest}
                variant="outline"
                className="max-w-full rounded-full px-4 py-2 text-sm font-semibold break-words whitespace-normal"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </Section>
        </ScrollReveal>
      )}

      {relatedServices.length > 0 && (
        <ScrollReveal>
        <Section className="bg-secondary/30" aria-labelledby="provider-services-title">
          <SectionHeading
            eyebrow="Works with"
            title={<span id="provider-services-title">Services {provider.name} offers</span>}
          />
          <div className={`grid gap-5 ${relatedServices.length === 1 ? "mx-auto max-w-md" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
            {relatedServices.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} aria-label={`View details about ${service.title}`}>
                <FeatureCard label={service.category} title={service.title} description={service.short} />
              </Link>
            ))}
          </div>
        </Section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <PageOutro
          eyebrow={getBusinessTagline()}
          title={
            <>
              Ready to talk with <span className="text-primary-foreground/80">{provider.name}?</span>
            </>
          }
          cta={<BookingButton label="Schedule an Appointment" variant="secondary" size="lg" />}
        />
      </ScrollReveal>
    </main>
  );
}
