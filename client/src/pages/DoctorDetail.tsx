/**
 * Cross-page consistency pass: doctor profile reuses the same blue editorial field and card system as ServiceDetail.
 */
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowUpRight, PawPrint } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { assets, buildBreadcrumbSchema, buildPersonSchema, getDoctorBySlug } from "@/lib/clinic-content";
import NotFound from "./NotFound";

export default function DoctorDetail() {
  const { slug } = useParams<{ slug: string }>();
  const doctor = slug ? getDoctorBySlug(slug) : undefined;

  if (!doctor) return <NotFound />;

  const heroImage = assets[doctor.imageKey];

  return <main className="neo-main pp-services-page">
    <PageMeta title={`${doctor.name}, ${doctor.credentials} — Paws+Pine Veterinary Clinic`} description={`${doctor.name}, ${doctor.credentials} — ${doctor.specialty} at Paws+Pine Veterinary Clinic.`} path={`/team/${doctor.slug}`} image={heroImage} jsonLd={[buildPersonSchema(doctor), buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Meet the Vets", path: "/team" }, { name: doctor.name, path: `/team/${doctor.slug}` }])]} />

    <section className="pp-page-hero pp-services-hero pp-major-light-stage pp-reveal">
      <div className="pp-page-hero-copy">
        <Link href="/team" className="pp-text-action"><ArrowLeft size={15} /> Meet the Vets</Link>
        <span className="pp-page-eyebrow"><PawPrint size={15} /> {doctor.specialty}{doctor.placeholder && " · Demo profile"}</span>
        <h1>{doctor.name}<br /><em>{doctor.credentials}</em></h1>
        <p>{doctor.bio}</p>
        <BookingButton label="Schedule With Our Team" className="lime-link" />
      </div>
      <div className="pp-services-hero-image"><img src={heroImage} alt={`${doctor.name} at Paws and Pine`} /></div>
    </section>

    <section className="pp-services-intro pp-reveal">
      <div className="pp-services-intro-count"><strong>{doctor.yearsExperience}</strong><span>years experience</span></div>
      <p>{doctor.specialty} at Paws+Pine, with a steady, unhurried approach to every visit.</p>
      <Link href="/team" className="pp-text-action">See the full team <ArrowUpRight size={17} /></Link>
    </section>

    <section className="pp-services-gallery-section pp-reveal" aria-labelledby="doctor-interests-title">
      <h2 id="doctor-interests-title" className="pp-page-eyebrow"><PawPrint size={15} /> Areas of interest</h2>
      <div className="flex flex-wrap gap-2 mt-4">
        {doctor.areasOfInterest.map((interest) => <span key={interest} className="inline-flex items-center rounded-full border border-[var(--pp-divider)] px-4 py-2 text-sm font-semibold">{interest}</span>)}
      </div>
    </section>

    <section className="pp-page-outro pp-reveal">
      <span className="pp-page-eyebrow">Paws+Pine Veterinary Clinic</span>
      <h2>Ready to talk with<br /><em>{doctor.name}?</em></h2>
      <BookingButton label="Schedule an Appointment" className="lime-cta" iconSize={17} />
    </section>
  </main>;
}
