import { Link, useParams } from "wouter";
import { ArrowUpRight, PawPrint } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { PageHero, Section, SectionHeading, PageOutro } from "@/components/PageBlocks";
import { buildBreadcrumbSchema, buildPersonSchema, clinic, getDoctorBySlug } from "@/lib/clinic-content";
import NotFound from "./NotFound";

export default function DoctorDetail() {
  const { slug } = useParams<{ slug: string }>();
  const doctor = slug ? getDoctorBySlug(slug) : undefined;

  if (!doctor) return <NotFound />;

  return (
    <main>
      <PageMeta
        title={`${doctor.name}, ${doctor.credentials} — ${clinic.name} ${clinic.descriptor}`}
        description={`${doctor.name}, ${doctor.credentials} — ${doctor.specialty} at ${clinic.name} ${clinic.descriptor}.`}
        path={`/team/${doctor.slug}`}
        jsonLd={[
          buildPersonSchema(doctor),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Meet the Vets", path: "/team" },
            { name: doctor.name, path: `/team/${doctor.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrowIcon={PawPrint}
        eyebrow={doctor.specialty + (doctor.placeholder ? " · Demo profile" : "")}
        title={
          <>
            {doctor.name}
            <br />
            <span className="text-primary">{doctor.credentials}</span>
          </>
        }
        description={doctor.bio}
        cta={<BookingButton label="Schedule With Our Team" />}
        backLink={{ href: "/team", label: "Meet the Vets" }}
        image={{ label: "Vet photo", token: doctor.imageKey }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div className="flex items-baseline gap-2">
            <strong className="text-5xl font-bold text-primary">{doctor.yearsExperience}</strong>
            <span className="text-sm font-semibold text-muted-foreground">years experience</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {doctor.specialty} at {clinic.name}, with a steady, unhurried approach to every visit.
          </p>
          <Link href="/team" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            See the full team <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <Section aria-labelledby="doctor-interests-title">
        <SectionHeading
          icon={PawPrint}
          eyebrow="Areas of interest"
          title={
            <span id="doctor-interests-title" className="sr-only">
              Areas of interest
            </span>
          }
          className="mb-6"
        />
        <div className="flex flex-wrap gap-2">
          {doctor.areasOfInterest.map((interest) => (
            <Badge key={interest} variant="outline" className="rounded-full px-4 py-2 text-sm font-semibold">
              {interest}
            </Badge>
          ))}
        </div>
      </Section>

      <PageOutro
        eyebrow={`${clinic.name} ${clinic.descriptor}`}
        title={
          <>
            Ready to talk with <span className="text-primary-foreground/80">{doctor.name}?</span>
          </>
        }
        cta={<BookingButton label="Schedule an Appointment" variant="secondary" size="lg" />}
      />
    </main>
  );
}
