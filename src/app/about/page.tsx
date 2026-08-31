import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, FeatureCard, PageOutro } from "@/components/blocks/PageBlocks";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ScrollReveal } from "@/components/ScrollReveal";
import { aboutValues, copy, getBusinessTagline, sectionVisibility, staff } from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: `About — ${getBusinessTagline()}`,
  description: `The story, care philosophy, and clinical standards behind ${getBusinessTagline()}.`,
  path: "/about",
});

export default function About() {
  return (
    <main>
      <PageHero
        eyebrow={copy.about.heroEyebrow}
        title={copy.about.heroTitle}
        description={copy.about.heroSubtitle}
        cta={<BookingButton label="Book an Appointment" />}
        image={{ label: "About image", token: "[ABOUT_IMAGE]" }}
      />

      <ScrollReveal>
      <Section aria-labelledby="about-values-title">
        <SectionHeading
          eyebrow={copy.about.valuesEyebrow}
          title={<span id="about-values-title">{copy.about.valuesTitle}</span>}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aboutValues.map((value) => (
            <FeatureCard key={value.title} label={copy.about.valueLabel} title={value.title} description={value.copy} />
          ))}
        </div>
      </Section>
      </ScrollReveal>

      <ScrollReveal>
      <Section className="bg-secondary/30" aria-labelledby="about-team-title">
        <SectionHeading eyebrow={copy.about.approachEyebrow} title={<span id="about-team-title" className="sr-only">{copy.about.approachEyebrow}</span>} className="mb-6" />
        <div className="grid gap-5 sm:grid-cols-2">
          <Card>
            <CardContent className="min-w-0">
              <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">{copy.about.approachParagraph1}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="min-w-0">
              <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">{copy.about.approachParagraph2}</p>
            </CardContent>
          </Card>
        </div>
      </Section>
      </ScrollReveal>

      {sectionVisibility.aboutTeamGrid && staff.length > 0 && (
        <ScrollReveal>
        <Section aria-labelledby="about-staff-title">
          <SectionHeading
            eyebrow={copy.about.staffEyebrow}
            title={<span id="about-staff-title">{copy.about.staffTitle}</span>}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {staff.map((member) => (
              <Card key={member.name} className="gap-3 p-4">
                <ImagePlaceholder label="Staff photo" token={member.imageKey} className="aspect-[4/3] w-full rounded-xl" />
                <div className="flex min-w-0 flex-col gap-1.5 px-1">
                  <span className="min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">
                    {member.title}
                    {member.placeholder && " (demo profile)"}
                  </span>
                  <h3 className="min-w-0 break-words text-lg font-semibold text-foreground">
                    {member.name}, {member.credentials}
                  </h3>
                  <p className="min-w-0 break-words text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <Section className="bg-secondary/30" aria-labelledby="about-explore-title">
          <SectionHeading
            eyebrow={copy.about.exploreEyebrow}
            title={<span id="about-explore-title">{copy.about.exploreTitle}</span>}
          />
          <div className="grid gap-5 sm:grid-cols-3">
            <Link href="/team" className="block h-full">
              <FeatureCard className="card-hover" title={copy.about.exploreTeamLabel} description={copy.about.exploreTeamDescription} />
            </Link>
            <Link href="/services" className="block h-full">
              <FeatureCard className="card-hover" title={copy.about.exploreServicesLabel} description={copy.about.exploreServicesDescription} />
            </Link>
            <Link href="/resources" className="block h-full">
              <FeatureCard className="card-hover" title={copy.about.exploreResourcesLabel} description={copy.about.exploreResourcesDescription} />
            </Link>
          </div>
        </Section>
      </ScrollReveal>

      <ScrollReveal>
        <PageOutro
          eyebrow={getBusinessTagline()}
          title={copy.about.ctaTitle}
          cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
        />
      </ScrollReveal>
    </main>
  );
}
