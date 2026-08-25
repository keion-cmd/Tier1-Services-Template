import { Link } from "wouter";
import { ArrowUpRight, UserCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, PageOutro } from "@/components/PageBlocks";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { clinic, providers } from "@/lib/business-content";

export default function Team() {
  return (
    <main>
      <PageMeta
        title={`Meet Our Team — ${clinic.name} ${clinic.descriptor}`}
        description={`Meet the professional team at ${clinic.name}, including primary care, diagnostics, and preventive care specialists.`}
        path="/team"
      />

      <PageHero
        eyebrowIcon={UserCheck}
        eyebrow="Our clinical team"
        title={
          <>
            Meet the <span className="text-primary">professional team.</span>
          </>
        }
        description="Every visit is guided by a professional team that takes the time to explain, listen, and plan the next step with you."
        cta={<BookingButton label="Schedule an Appointment" />}
        image={{ label: "Team hero image", token: "[TEAM_IMAGE]" }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div className="flex items-baseline gap-2">
            <strong className="text-5xl font-bold text-primary">{String(providers.length).padStart(2, "0")}</strong>
            <span className="text-sm font-semibold text-muted-foreground">team members</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {providers.length} demo profiles representing the kind of clinical range a real {clinic.name} team could offer: primary
            care, diagnostics, and preventive & long-term care.
          </p>
          <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            See our care values <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <Section aria-labelledby="team-grid-title">
        <SectionHeading
          icon={UserCheck}
          eyebrow="Demo profiles"
          title={
            <span id="team-grid-title">
              Care from a team <span className="text-primary">you can trust.</span>
            </span>
          }
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {providers.map((provider) => (
            <Card key={provider.slug} className="gap-3 p-4">
              <ImagePlaceholder label="Provider photo" token={provider.imageKey} className="h-44 w-full rounded-xl" />
              <div className="flex flex-col gap-1.5 px-1">
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {provider.specialty}
                  {provider.placeholder && " (demo profile)"}
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {provider.name}, {provider.credentials}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{provider.bio}</p>
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

      <PageOutro
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={
          <>
            Ready to meet the <span className="text-primary-foreground/80">team?</span>
          </>
        }
        cta={<BookingButton label="Schedule an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
