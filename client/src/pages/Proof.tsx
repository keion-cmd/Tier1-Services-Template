/**
 * Cross-page consistency pass: reuses ReviewsSection plus the pp-directions-grid/pp-hours-grid system for trust markers.
 */
import { Link } from "wouter";
import { ArrowUpRight, PawPrint, ShieldCheck } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { ReviewsSection } from "@/components/ReviewsSection";
import { assets } from "@/lib/clinic-content";

const careStats = [
  { value: "06", label: "care pathways offered" },
  { value: "01", label: "clear starting point for every visit" },
  { value: "03", label: "steps from request to a confirmed next step" },
];

const patientStories = [
  { pet: "A senior dog check-in", note: "A calm, structured conversation helped prepare useful notes ahead of the clinic visit &mdash; no guesswork, just clear next steps." },
  { pet: "A puppy's first visit", note: "First-visit questions were answered plainly, and the family left knowing exactly what the next scheduled step would be." },
  { pet: "A prevention planning visit", note: "The visit stayed focused on the clinic's actual approved protocols, with a clear plan instead of an open-ended list of options." },
];

export default function Proof() {
  return <main className="neo-main pp-services-page">
    <PageMeta title="Proof & Reviews — Paws+Pine Veterinary Clinic" description="Trust markers, care statistics, and verified patient stories from Paws+Pine Veterinary Clinic." />

    <section className="pp-page-hero pp-services-hero pp-major-light-stage pp-reveal">
      <div className="pp-page-hero-copy"><span className="pp-page-eyebrow"><ShieldCheck size={15} /> Trust & proof</span><h1>Care you can<br /><em>verify.</em></h1><p>Real statistics, a direct path to Google reviews, and a few stories from pet parents who've been through the process.</p><Link href="/request" className="lime-link">Request a visit <ArrowUpRight size={15} /></Link></div>
      <div className="pp-services-hero-image"><img src={assets.serviceExam} alt="Veterinarian examining a dog at Paws and Pine" /></div>
    </section>

    <section className="pp-services-intro pp-reveal"><div className="pp-services-intro-count"><strong>06</strong><span>care paths</span></div><p>These numbers describe how the clinic is structured today &mdash; not promises about individual outcomes.</p><Link href="/faq" className="pp-text-action">Read common questions <ArrowUpRight size={17} /></Link></section>

    <section className="pp-directions-section pp-reveal" aria-labelledby="proof-stats-title">
      <div><span className="pp-page-eyebrow"><PawPrint size={15} /> Care at a glance</span><h2 id="proof-stats-title">Numbers that<br /><em>stay honest.</em></h2></div>
      <div className="pp-directions-grid">
        {careStats.map((stat) => <article key={stat.label}><span>At a glance</span><h3>{stat.value}</h3><p>{stat.label}</p></article>)}
      </div>
    </section>

    <ReviewsSection />

    <section className="pp-services-gallery-section pp-reveal" aria-labelledby="proof-stories-title">
      <h2 id="proof-stories-title" className="pp-page-eyebrow"><PawPrint size={15} /> Verified patient stories</h2>
      <div className="grid gap-4 sm:grid-cols-3 mt-4">
        {patientStories.map((story) => <div key={story.pet} className="pp-location-card pp-location-copy flex flex-col items-start gap-2 p-5 rounded-2xl"><span className="pp-page-eyebrow">{story.pet}</span><p className="m-0">{story.note}</p></div>)}
      </div>
      <p className="pp-location-note">Paws+Pine is a fictional demonstration clinic; these stories are illustrative placeholders. Replace with client-approved, consented patient stories before launch.</p>
    </section>

    <section className="pp-page-outro pp-reveal"><span className="pp-page-eyebrow">Paws+Pine Veterinary Clinic</span><h2>Join pet parents<br />who <em>trust us.</em></h2><Link href="/request" className="lime-cta">Request a visit <ArrowUpRight size={17} /></Link></section>
  </main>;
}
