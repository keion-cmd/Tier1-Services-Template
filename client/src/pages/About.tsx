import { HeartHandshake, ShieldCheck, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, FeatureCard, PageOutro } from "@/components/PageBlocks";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { aboutValues, clinic, copy, staff } from "@/lib/business-content";

const valueIcons = { stethoscope: Stethoscope, shield: ShieldCheck, heart: HeartHandshake };

export default function About() {
  return (
    <main>
      <PageMeta
        title={`About — ${clinic.name} ${clinic.descriptor}`}
        description={`The story, care philosophy, and clinical standards behind ${clinic.name} ${clinic.descriptor}.`}
        path="/about"
      />

      <PageHero
        eyebrowIcon={ShieldCheck}
        eyebrow="Our story"
        title={copy.about.heroTitle}
        description={copy.about.heroSubtitle}
        cta={<BookingButton label="Book an Appointment" />}
        image={{ label: "About image", token: "[ABOUT_IMAGE]" }}
      />

      <Section aria-labelledby="about-values-title">
        <SectionHeading
          icon={ShieldCheck}
          eyebrow="What guides us"
          title={<span id="about-values-title">{copy.about.valuesTitle}</span>}
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {aboutValues.map((value) => (
            <FeatureCard key={value.title} icon={valueIcons[value.icon]} label="Care value" title={value.title} description={value.copy} />
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/30" aria-labelledby="about-team-title">
        <SectionHeading icon={ShieldCheck} eyebrow="Our team's approach" title={<span id="about-team-title" className="sr-only">Our team's approach</span>} className="mb-6" />
        <div className="grid gap-5 sm:grid-cols-2">
          <Card>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{copy.about.approachParagraph1}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{copy.about.approachParagraph2}</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section aria-labelledby="about-staff-title">
        <SectionHeading
          icon={ShieldCheck}
          eyebrow="Meet the team"
          title={<span id="about-staff-title">{copy.about.staffTitle}</span>}
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {staff.map((member) => (
            <Card key={member.name} className="gap-3 p-4">
              <ImagePlaceholder label="Staff photo" token={member.imageKey} className="h-44 w-full rounded-xl" />
              <div className="flex flex-col gap-1.5 px-1">
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {member.title}
                  {member.placeholder && " (demo profile)"}
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {member.name}, {member.credentials}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <PageOutro
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={copy.about.ctaTitle}
        cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
