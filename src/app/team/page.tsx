import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, PageOutro } from "@/components/blocks/PageBlocks";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { clinic, copy, providers, sectionVisibility } from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: `Meet Our Team — ${clinic.name} ${clinic.descriptor}`,
  description: `Meet the professional team at ${clinic.name}, including primary care, diagnostics, and preventive care specialists.`,
  path: "/team",
});

export default function Team() {
  return (
    <main>
      <PageHero
        eyebrow={copy.team.heroEyebrow}
        title={copy.team.heroTitle}
        description={copy.team.heroSubtitle}
        cta={<BookingButton label="Schedule an Appointment" />}
        image={{ label: "Team hero image", token: "[TEAM_IMAGE]" }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div className="flex min-w-0 items-baseline gap-2">
            <strong className="min-w-0 break-words text-5xl font-bold text-primary">{String(providers.length).padStart(2, "0")}</strong>
            <span className="text-sm font-semibold text-muted-foreground">team members</span>
          </div>
          <p className="min-w-0 max-w-md break-words text-sm leading-relaxed text-muted-foreground">
            {providers.length} demo profiles representing the kind of clinical range a real {clinic.name} team could offer: primary
            care, diagnostics, and preventive & long-term care.
          </p>
          <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            See our care values <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      {sectionVisibility.teamProvidersGrid && providers.length > 0 && (
        <Section aria-labelledby="team-grid-title">
          <SectionHeading
            eyebrow={copy.team.gridEyebrow}
            title={<span id="team-grid-title">{copy.team.gridTitle}</span>}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {providers.map((provider) => (
              <Card key={provider.slug} className="gap-3 p-4">
                <ImagePlaceholder label="Provider photo" token={provider.imageKey} className="aspect-[4/3] w-full rounded-xl" />
                <div className="flex min-w-0 flex-col gap-1.5 px-1">
                  <span className="min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">
                    {provider.specialty}
                    {provider.placeholder && " (demo profile)"}
                  </span>
                  <h3 className="min-w-0 break-words text-lg font-semibold text-foreground">
                    {provider.name}, {provider.credentials}
                  </h3>
                  <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">{provider.bio}</p>
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
      )}

      <PageOutro
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={copy.team.ctaTitle}
        cta={<BookingButton label="Schedule an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
