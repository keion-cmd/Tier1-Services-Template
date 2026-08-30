import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading } from "@/components/blocks/PageBlocks";
import { clinic, copy } from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: `Privacy Policy — ${clinic.name} ${clinic.descriptor}`,
  description: `How ${clinic.name} ${clinic.descriptor} collects, uses, and protects your information.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicy() {
  return (
    <main>
      <PageHero
        eyebrow={copy.privacyPolicy.heroEyebrow}
        title={copy.privacyPolicy.heroTitle}
        description={copy.privacyPolicy.heroSubtitle}
        cta={<BookingButton label="Book an Appointment" />}
      />

      <Section containerClassName="max-w-4xl">
        <SectionHeading title={copy.privacyPolicy.bodyHeading} />
        <div className="grid gap-4 text-sm leading-relaxed text-muted-foreground">
          <p>{copy.privacyPolicy.bodyParagraph1}</p>
          <p>{copy.privacyPolicy.bodyParagraph2}</p>
        </div>
      </Section>
    </main>
  );
}
