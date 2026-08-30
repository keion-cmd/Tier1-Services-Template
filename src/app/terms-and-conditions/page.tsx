import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section } from "@/components/blocks/PageBlocks";
import { copy, getBusinessTagline } from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: `Terms and Conditions — ${getBusinessTagline()}`,
  description: `Booking and contact terms for ${getBusinessTagline()}.`,
  path: "/terms-and-conditions",
});

export default function TermsAndConditions() {
  return (
    <main>
      <PageHero
        eyebrow={copy.termsAndConditions.heroEyebrow}
        title={copy.termsAndConditions.heroTitle}
        description={copy.termsAndConditions.heroSubtitle}
        cta={<BookingButton label="Book an Appointment" />}
      />

      <Section containerClassName="max-w-4xl">
        <div className="grid gap-6">
          <section className="rounded-xl bg-muted p-5">
            <h2 className="mb-2 min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">
              {copy.termsAndConditions.bookingChangesHeading}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{copy.termsAndConditions.bookingChangesBody}</p>
          </section>
          <section className="rounded-xl bg-muted p-5">
            <h2 className="mb-2 min-w-0 break-words text-xs font-semibold tracking-wide text-primary uppercase">
              {copy.termsAndConditions.contactingClinicHeading}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{copy.termsAndConditions.contactingClinicBody}</p>
          </section>
        </div>
      </Section>
    </main>
  );
}
