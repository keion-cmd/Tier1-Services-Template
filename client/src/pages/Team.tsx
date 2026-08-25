import { Link } from "wouter";
import { ArrowUpRight, PawPrint } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, PageOutro } from "@/components/PageBlocks";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { clinic, doctors } from "@/lib/clinic-content";

export default function Team() {
  return (
    <main>
      <PageMeta
        title={`Meet the Vets — ${clinic.name} ${clinic.descriptor}`}
        description={`Meet the veterinary team at ${clinic.name}, including primary care, surgery & diagnostics, and preventive & senior pet care.`}
        path="/team"
      />

      <PageHero
        eyebrowIcon={PawPrint}
        eyebrow="Our clinical team"
        title={
          <>
            Meet the <span className="text-primary">veterinary team.</span>
          </>
        }
        description="Every visit is guided by a clinical team that takes the time to explain, listen, and plan the next step with you."
        cta={<BookingButton label="Schedule an Appointment" />}
        image={{ label: "Team hero image", token: "[TEAM_IMAGE]" }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div className="flex items-baseline gap-2">
            <strong className="text-5xl font-bold text-primary">{String(doctors.length).padStart(2, "0")}</strong>
            <span className="text-sm font-semibold text-muted-foreground">veterinarians</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {doctors.length} demo profiles representing the kind of clinical range a real {clinic.name} team could offer: primary
            care, surgery & diagnostics, and preventive & senior pet care.
          </p>
          <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            See our care values <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <Section aria-labelledby="team-grid-title">
        <SectionHeading
          icon={PawPrint}
          eyebrow="Demo profiles"
          title={
            <span id="team-grid-title">
              Care from a team <span className="text-primary">you can trust.</span>
            </span>
          }
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {doctors.map((doctor) => (
            <Card key={doctor.slug} className="gap-3 p-4">
              <ImagePlaceholder label="Vet photo" token={doctor.imageKey} className="h-44 w-full rounded-xl" />
              <div className="flex flex-col gap-1.5 px-1">
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {doctor.specialty}
                  {doctor.placeholder && " (demo profile)"}
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {doctor.name}, {doctor.credentials}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{doctor.bio}</p>
                <Link
                  href={`/team/${doctor.slug}`}
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
