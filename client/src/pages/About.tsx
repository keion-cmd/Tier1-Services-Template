import { Card, CardContent } from "@/components/ui/card";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, FeatureCard, PageOutro } from "@/components/PageBlocks";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { aboutValues, clinic, copy, staff } from "@/lib/business-content";

export default function About() {
  return (
    <main>
      <PageMeta
        title={`About — ${clinic.name} ${clinic.descriptor}`}
        description={`The story, care philosophy, and clinical standards behind ${clinic.name} ${clinic.descriptor}.`}
        path="/about"
      />

      <PageHero
        eyebrow={copy.about.heroEyebrow}
        title={copy.about.heroTitle}
        description={copy.about.heroSubtitle}
        cta={<BookingButton label="Book an Appointment" />}
        image={{ label: "About image", token: "[ABOUT_IMAGE]" }}
      />

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

      <PageOutro
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={copy.about.ctaTitle}
        cta={<BookingButton label="Book an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
