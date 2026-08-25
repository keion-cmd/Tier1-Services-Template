/**
 * Cross-page consistency pass: reuses the pp-page-hero/pp-directions-grid/pp-page-outro system from Services.
 */
import { Link } from "wouter";
import { ArrowUpRight, HeartHandshake, PawPrint, ShieldCheck, Stethoscope } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { assets, staff } from "@/lib/clinic-content";

const values = [
  { icon: Stethoscope, title: "Clear conversations", copy: "Every visit starts with a real conversation, not assumptions made online before you've been heard." },
  { icon: ShieldCheck, title: "Clinical standards", copy: "Care pathways follow the clinic team's approved protocols, with final recommendations always made in person." },
  { icon: HeartHandshake, title: "Steady support", copy: "From a first question to a follow-up visit, the same thoughtful approach carries through." },
];

export default function About() {
  return <main className="neo-main pp-services-page">
    <PageMeta title="About — Paws+Pine Veterinary Clinic" description="The story, care philosophy, and clinical standards behind Paws+Pine Veterinary Clinic." />

    <section className="pp-page-hero pp-services-hero pp-major-light-stage pp-reveal">
      <div className="pp-page-hero-copy"><span className="pp-page-eyebrow"><PawPrint size={15} /> Our story</span><h1>Care built on<br /><em>trust.</em></h1><p>Paws+Pine started with a simple idea: pet parents deserve clear information and a calm place to ask questions before any decision is made.</p><Link href="/request" className="lime-link">Request a visit <ArrowUpRight size={15} /></Link></div>
      <div className="pp-services-hero-image"><img src={assets.aboutPup} alt="A small dog in a lime green sweater at Paws and Pine" /></div>
    </section>

    <section className="pp-services-intro pp-reveal"><div className="pp-services-intro-count"><strong>01</strong><span>clear philosophy</span></div><p>We believe good care starts with understanding, not urgency. Every conversation is paced to what you and your pet actually need.</p><Link href="/services" className="pp-text-action">See our care paths <ArrowUpRight size={17} /></Link></section>

    <section className="pp-directions-section pp-reveal" aria-labelledby="about-values-title">
      <div><span className="pp-page-eyebrow"><PawPrint size={15} /> What guides us</span><h2 id="about-values-title">Values that shape<br /><em>every visit.</em></h2></div>
      <div className="pp-directions-grid">
        {values.map((value) => <article key={value.title}><value.icon size={20} /><span>Care value</span><h3>{value.title}</h3><p>{value.copy}</p></article>)}
      </div>
    </section>

    <section className="pp-services-gallery-section pp-reveal" aria-labelledby="about-team-title">
      <h2 id="about-team-title" className="pp-page-eyebrow"><PawPrint size={15} /> Our team's approach</h2>
      <div className="grid gap-4 sm:grid-cols-2 mt-4">
        <div className="pp-location-card pp-location-copy flex items-start gap-3 p-5 rounded-2xl"><p className="m-0">Our clinic team keeps explanations honest and jargon-free, so every pet parent leaves a conversation feeling more prepared, not more confused.</p></div>
        <div className="pp-location-card pp-location-copy flex items-start gap-3 p-5 rounded-2xl"><p className="m-0">Recommendations are always made directly by the clinic team, in person &mdash; this website is a starting point for a conversation, never a substitute for one.</p></div>
      </div>
    </section>

    <section className="pp-directions-section pp-reveal" aria-labelledby="about-staff-title">
      <div><span className="pp-page-eyebrow"><PawPrint size={15} /> Meet the team</span><h2 id="about-staff-title">Meet our<br /><em>clinical team.</em></h2></div>
      <div className="pp-directions-grid">
        {staff.map((member) => <article key={member.name}>
          <img src={assets[member.imageKey]} alt="" aria-hidden="true" className="w-full h-40 object-cover rounded-xl mb-3" />
          <span>{member.title}{member.placeholder && " (demo profile)"}</span>
          <h3>{member.name}, {member.credentials}</h3>
          <p>{member.bio}</p>
        </article>)}
      </div>
    </section>

    <section className="pp-page-outro pp-reveal"><span className="pp-page-eyebrow">Paws+Pine Veterinary Clinic</span><h2>Ready to start<br />the <em>conversation?</em></h2><Link href="/request" className="lime-cta">Request a visit <ArrowUpRight size={17} /></Link></section>
  </main>;
}
