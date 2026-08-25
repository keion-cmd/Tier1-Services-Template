/**
 * Cross-page consistency pass: reuses the pp-page-hero/pp-directions-grid/pp-page-outro system from About/Services.
 */
import { Link } from "wouter";
import { ArrowUpRight, PawPrint } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { assets, doctors } from "@/lib/clinic-content";

export default function Team() {
  return <main className="neo-main pp-services-page">
    <PageMeta title="Meet the Vets — Paws+Pine Veterinary Clinic" description="Meet the veterinary team at Paws+Pine, including primary care, surgery & diagnostics, and preventive & senior pet care." path="/team" />

    <section className="pp-page-hero pp-services-hero pp-major-light-stage pp-reveal">
      <div className="pp-page-hero-copy"><span className="pp-page-eyebrow"><PawPrint size={15} /> Our clinical team</span><h1>Meet the<br /><em>veterinary team.</em></h1><p>Every visit is guided by a clinical team that takes the time to explain, listen, and plan the next step with you.</p><BookingButton label="Schedule an Appointment" className="lime-link" /></div>
      <div className="pp-services-hero-image"><img src={assets.aboutPup} alt="A veterinarian at Paws and Pine" /></div>
    </section>

    <section className="pp-services-intro pp-reveal"><div className="pp-services-intro-count"><strong>03</strong><span>veterinarians</span></div><p>Three demo profiles representing the kind of clinical range a real Paws+Pine team could offer &mdash; primary care, surgery & diagnostics, and preventive & senior pet care.</p><Link href="/about" className="pp-text-action">See our care values <ArrowUpRight size={17} /></Link></section>

    <section className="pp-directions-section pp-reveal" aria-labelledby="team-grid-title">
      <div><span className="pp-page-eyebrow"><PawPrint size={15} /> Demo profiles</span><h2 id="team-grid-title">Care from a team<br /><em>you can trust.</em></h2></div>
      <div className="pp-directions-grid">
        {doctors.map((doctor) => <article key={doctor.slug}>
          <img src={assets[doctor.imageKey]} alt="" aria-hidden="true" className="w-full h-40 object-cover rounded-xl mb-3" />
          <span>{doctor.specialty}{doctor.placeholder && " (demo profile)"}</span>
          <h3>{doctor.name}, {doctor.credentials}</h3>
          <p>{doctor.bio}</p>
          <Link href={`/team/${doctor.slug}`} className="pp-text-action">View profile <ArrowUpRight size={17} /></Link>
        </article>)}
      </div>
    </section>

    <section className="pp-page-outro pp-reveal"><span className="pp-page-eyebrow">Paws+Pine Veterinary Clinic</span><h2>Ready to meet<br />the <em>team?</em></h2><BookingButton label="Schedule an Appointment" className="lime-cta" iconSize={17} /></section>
  </main>;
}
