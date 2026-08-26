import { Link, useParams } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, PageOutro } from "@/components/PageBlocks";
import { buildBreadcrumbSchema, buildPersonSchema, businessConfig, getProviderBySlug } from "@/lib/business-content";
import NotFound from "./NotFound";

export default function ProviderDetail() {
  const { slug } = useParams<{ slug: string }>();
  const provider = slug ? getProviderBySlug(slug) : undefined;

  if (!provider) return <NotFound />;

  return (
    <main>
      <PageMeta
        title={`${provider.name}, ${provider.credentials} — ${businessConfig.name} ${businessConfig.descriptor}`}
        description={`${provider.name}, ${provider.credentials} — ${provider.specialty} at ${businessConfig.name} ${businessConfig.descriptor}.`}
        path={`/team/${provider.slug}`}
        jsonLd={[
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
