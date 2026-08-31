import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingButton } from "@/components/BookingButton";
import { Section, SectionHeading, StepList, PageOutro } from "@/components/blocks/PageBlocks";
import { EditorialList } from "@/components/blocks/EditorialBlocks";
import { ImmersiveHero } from "@/components/ImmersiveHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { clinic, copy, getBusinessTagline, newClientSteps, whatToBring } from "@/lib/business-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: `New Clients — ${getBusinessTagline()}`,
  description: `First visit? Here's what to expect at ${getBusinessTagline()}, from your first request to follow-up care.`,
  path: "/new-clients",
});

export default function NewClients() {
  return (
    <main>
      <ImmersiveHero
        eyebrow={copy.newClients.heroEyebrow}
        headline={copy.newClients.heroTitle}
        subheadline={copy.newClients.heroSubtitle}
        imageToken="[SERVICE_IMAGE]"
        imageLabel="Service image"
        cta={<BookingButton label="Book Your First Visit" size="lg" />}
        stat={{ value: String(newClientSteps.length), caption: "simple steps" }}
      />

      {newClientSteps.length > 0 && (
        <ScrollReveal>
        <Section aria-labelledby="new-clients-steps-title">
          <SectionHeading
            eyebrow={copy.newClients.stepsEyebrow}
            title={<span id="new-clients-steps-title">{copy.newClients.stepsTitle}</span>}
            description={`From your first booking to a follow-up visit, here's the ${newClientSteps.length}-step path most new clients follow.`}
          />
          <StepList steps={newClientSteps} />
        </Section>
        </ScrollReveal>
      )}

      {whatToBring.length > 0 && (
        <ScrollReveal>
        <Section className="bg-secondary/30" aria-labelledby="new-clients-bring-title">
          <SectionHeading
            eyebrow={copy.newClients.bringEyebrow}
            title={<span id="new-clients-bring-title">{copy.newClients.bringTitle}</span>}
            className="mb-6"
          />
          <EditorialList items={whatToBring.map((item) => ({ title: item }))} />
        </Section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <Section className="flex flex-wrap items-center justify-center gap-4 text-center">
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href="/faq">
              {copy.newClients.faqPrompt} <ArrowUpRight size={16} />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href="/services">
              {copy.newClients.servicesPrompt} <ArrowUpRight size={16} />
            </Link>
          </Button>
        </Section>
      </ScrollReveal>

      <ScrollReveal>
        <PageOutro
          eyebrow={getBusinessTagline()}
          title={copy.newClients.ctaTitle}
          cta={<BookingButton label="Book Your First Visit" variant="secondary" size="lg" />}
        />
      </ScrollReveal>
    </main>
  );
}
