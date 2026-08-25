import { CheckCircle2, PawPrint } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, StepList, PageOutro } from "@/components/PageBlocks";
import { clinic, newClientSteps, whatToBring } from "@/lib/clinic-content";

export default function NewClients() {
  return (
    <main>
      <PageMeta
        title={`New Clients — ${clinic.name} ${clinic.descriptor}`}
        description={`First visit? Here's what to expect at ${clinic.name} ${clinic.descriptor}, from your first request to follow-up care.`}
        path="/new-clients"
      />

      <PageHero
        eyebrowIcon={PawPrint}
        eyebrow="New clients"
        title={
          <>
            First visit? <span className="text-primary">Here&rsquo;s what to expect.</span>
          </>
        }
        description="A calm, unhurried walkthrough of what happens from your first booking to your pet's follow-up care."
        cta={<BookingButton label="Book Your First Visit" />}
        image={{ label: "Service image", token: "[SERVICE_IMAGE]" }}
      />

      <Section aria-labelledby="new-clients-steps-title">
        <SectionHeading
          icon={PawPrint}
          eyebrow="What to expect"
          title={
            <span id="new-clients-steps-title">
              A simple path <span className="text-primary">from start to finish.</span>
            </span>
          }
          description={`From your first booking to a follow-up visit, here's the ${newClientSteps.length}-step path most new clients follow.`}
        />
        <StepList steps={newClientSteps} />
      </Section>

      <Section className="bg-secondary/30" aria-labelledby="new-clients-bring-title">
        <SectionHeading
          icon={PawPrint}
          eyebrow="What to bring"
          title={<span id="new-clients-bring-title" className="sr-only">What to bring</span>}
          className="mb-6"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {whatToBring.map((item) => (
            <Card key={item}>
              <CardContent className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-foreground">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <PageOutro
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={
          <>
            Ready for your <span className="text-primary-foreground/80">first visit?</span>
          </>
        }
        cta={<BookingButton label="Book Your First Visit" variant="secondary" size="lg" />}
      />
    </main>
  );
}
