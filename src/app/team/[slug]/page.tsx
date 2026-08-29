import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BookingButton } from "@/components/BookingButton";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, Section, SectionHeading, PageOutro } from "@/components/blocks/PageBlocks";
import { buildBreadcrumbSchema, buildPersonSchema, businessConfig, getProviderBySlug, providers } from "@/lib/business-content";
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
    title: `${provider.name}, ${provider.credentials} — ${businessConfig.name} ${businessConfig.descriptor}`,
    description: `${provider.name}, ${provider.credentials} — ${provider.specialty} at ${businessConfig.name} ${businessConfig.descriptor}.`,
    path: `/team/${provider.slug}`,
  });
}

export default async function ProviderDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);

  if (!provider) notFound();

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

      <PageHero
        eyebrow={provider.specialty + (provider.placeholder ? " · Demo profile" : "")}
        title={
          <>
            {provider.name}
            <br />
            <span className="text-primary">{provider.credentials}</span>
          </>
        }
        description={provider.bio}
        cta={<BookingButton label="Schedule With Our Team" />}
        backLink={{ href: "/team", label: "Our Team" }}
        image={{ label: "Provider photo", token: provider.imageKey }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div className="flex min-w-0 items-baseline gap-2">
            <strong className="min-w-0 break-words text-5xl font-bold text-primary">{provider.yearsExperience}</strong>
            <span className="text-sm font-semibold text-muted-foreground">years experience</span>
          </div>
          <p className="min-w-0 max-w-md break-words text-sm leading-relaxed text-muted-foreground">
            {provider.specialty} at {businessConfig.name}, with a steady, unhurried approach to every visit.
          </p>
          <Link href="/team" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            See the full team <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

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

      <PageOutro
        eyebrow={`${businessConfig.name} ${businessConfig.descriptor}`}
        title={
          <>
            Ready to talk with <span className="text-primary-foreground/80">{provider.name}?</span>
          </>
        }
        cta={<BookingButton label="Schedule an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
