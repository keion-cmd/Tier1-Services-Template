/**
 * Cross-page consistency pass: reuses the pp-how-it-works/pp-directions-grid system from Home's how-it-works section.
 */
import { Link } from "wouter";
import { ArrowUpRight, CheckCircle2, PawPrint } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { assets, newClientSteps, whatToBring } from "@/lib/clinic-content";

export default function NewClients() {
  return <main className="neo-main pp-services-page">
    <PageMeta title="New Clients — Paws+Pine Veterinary Clinic" description="First visit? Here's what to expect at Paws+Pine Veterinary Clinic, from your first request to follow-up care." path="/new-clients" />

    <section className="pp-page-hero pp-services-hero pp-major-light-stage pp-reveal">
      <div className="pp-page-hero-copy"><span className="pp-page-eyebrow"><PawPrint size={15} /> New clients</span><h1>First visit?<br /><em>Here's what to expect.</em></h1><p>A calm, unhurried walkthrough of what happens from your first booking to your pet's follow-up care.</p><BookingButton label="Book Your First Visit" className="lime-link" /></div>
      <div className="pp-services-hero-image"><img src={assets.serviceExam} alt="Veterinarian examining a dog at Paws and Pine" /></div>
    </section>

    <section className="pp-services-intro pp-reveal"><div className="pp-services-intro-count"><strong>{String(newClientSteps.length).padStart(2, "0")}</strong><span>simple steps</span></div><p>From your first booking to a follow-up visit, here's the path most new clients follow.</p><Link href="/faq" className="pp-text-action">Read common questions <ArrowUpRight size={17} /></Link></section>

    <section className="pp-directions-section pp-reveal" aria-labelledby="new-clients-steps-title">
      <div><span className="pp-page-eyebrow"><PawPrint size={15} /> What to expect</span><h2 id="new-clients-steps-title">A simple path<br /><em>from start to finish.</em></h2></div>
      <div className="pp-how-it-works">{newClientSteps.map((item) => <div className="pp-how-it-works-step" key={item.step}><strong>{item.step}</strong><h3>{item.title}</h3><p>{item.copy}</p></div>)}</div>
    </section>

    <section className="pp-services-gallery-section pp-reveal" aria-labelledby="new-clients-bring-title">
      <h2 id="new-clients-bring-title" className="pp-page-eyebrow"><PawPrint size={15} /> What to bring</h2>
      <div className="grid gap-4 sm:grid-cols-2 mt-4">
        {whatToBring.map((item) => <div key={item} className="pp-location-card pp-location-copy flex items-start gap-3 p-5 rounded-2xl">
          <CheckCircle2 size={20} className="shrink-0 text-[var(--pp-blue,#0957f6)]" />
          <p className="m-0">{item}</p>
        </div>)}
      </div>
    </section>

    <section className="pp-page-outro pp-reveal">
      <span className="pp-page-eyebrow">Paws+Pine Veterinary Clinic</span>
      <h2>Ready for your<br /><em>first visit?</em></h2>
      <BookingButton label="Book Your First Visit" className="lime-cta" iconSize={17} />
    </section>
  </main>;
}
