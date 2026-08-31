import Link from "next/link";
import { Card } from "@/components/ui/card";
import { BookingButton } from "@/components/BookingButton";
import { Section, SectionHeading, FeatureCard, PageOutro } from "@/components/blocks/PageBlocks";
import { EditorialStatement, EditorialSplit, EditorialList } from "@/components/blocks/EditorialBlocks";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ImmersiveHero } from "@/components/ImmersiveHero";
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
      <ImmersiveHero
        eyebrow={copy.about.heroEyebrow}
        headline={copy.about.heroTitle}
        subheadline={copy.about.heroSubtitle}
        imageToken="[ABOUT_IMAGE]"
        imageLabel="About image"
        cta={<BookingButton label="Book an Appointment" size="lg" />}
      />

      <ScrollReveal>
        <EditorialStatement eyebrow={copy.about.approachEyebrow} statement={copy.about.approachParagraph1} />
      </ScrollReveal>

      <ScrollReveal>
        <EditorialSplit
          className="bg-secondary/30"
          eyebrow="Our story"
          body={<p>{copy.about.approachParagraph2}</p>}
          imageToken="[ABOUT_STORY_IMAGE]"
          imageLabel="Company story image"
        />
      </ScrollReveal>

      <ScrollReveal>
        <Section aria-labelledby="about-values-title">
          <SectionHeading
            eyebrow={copy.about.valuesEyebrow}
            title={<span id="about-values-title">{copy.about.valuesTitle}</span>}
          />
          <EditorialList items={aboutValues.map((value) => ({ title: value.title, description: value.copy }))} />
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
