import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BookingButton } from "@/components/BookingButton";
import { Section, SectionHeading } from "@/components/blocks/PageBlocks";
import { FinalCTA } from "@/components/blocks/FinalCTA";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TeamMemberRows } from "@/components/TeamMemberRows";
import { clinic, copy, getBusinessTagline, providers, sectionVisibility } from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: `Meet Our Team — ${getBusinessTagline()}`,
  description: `Meet the team behind ${clinic.name}.`,
  path: "/team",
});

const isPlaceholderToken = (value: string) => /^\[.*\]$/.test(value);

function buildTeamIntro(): string {
  const allPlaceholder = providers.every((provider) => provider.placeholder);
  if (allPlaceholder) {
    return `${providers.length} demo profile${providers.length === 1 ? "" : "s"} showing how ${clinic.name}'s team page can be presented.`;
  }
  const specialties = Array.from(new Set(providers.map((provider) => provider.specialty))).filter(
    (specialty) => !isPlaceholderToken(specialty)
  );
  return specialties.length > 0
    ? `Meet the people behind ${clinic.name}: ${specialties.join(", ")}.`
    : `Meet the people behind ${clinic.name}.`;
}

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
          <p className="min-w-0 max-w-md break-words text-sm leading-relaxed text-muted-foreground">{buildTeamIntro()}</p>
          <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            See our values <ArrowUpRight size={15} />
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
          <span id="team-grid-title" className="sr-only">
            {copy.team.gridTitle}
          </span>
          <TeamMemberRows providers={providers} eyebrow={copy.team.gridEyebrow} title={copy.team.gridTitle} />
        </Section>
        </ScrollReveal>
      )}

      <FinalCTA
        eyebrow={getBusinessTagline()}
        title={copy.team.ctaTitle}
        cta={<BookingButton label="Schedule an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
