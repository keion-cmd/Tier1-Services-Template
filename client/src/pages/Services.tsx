/**
 * Cross-page consistency pass: service content lives in the same blue editorial field and shared gallery as the homepage.
 */
import { Link } from "wouter";
import { ArrowUpRight, PawPrint } from "lucide-react";
import { InteractiveServiceGallery } from "@/components/InteractiveServiceGallery";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { assets } from "@/lib/clinic-content";

export default function Services() {
  return <main className="neo-main pp-services-page">
    <PageMeta title="Services — Paws+Pine Veterinary Clinic" description="Explore six thoughtfully organized veterinary care pathways at Paws and Pine." path="/services" />
    <section className="pp-page-hero pp-services-hero pp-major-light-stage pp-reveal">
      <div className="pp-page-hero-copy"><span className="pp-page-eyebrow"><PawPrint size={15} /> Paws+Pine Veterinary Clinic</span><h1>Care paths<br /><em>with intent.</em></h1><p>Every path begins with a conversation, then makes space for the questions that matter to you and your pet.</p><BookingButton label="Book an Appointment" className="lime-link" /></div>
      <div className="pp-services-hero-image"><img src={assets.serviceExam} alt="Veterinarian examining a dog at Paws and Pine" /></div>
    </section>

    <section className="pp-services-intro pp-reveal"><div className="pp-services-intro-count"><strong>06</strong><span>care paths</span></div><p>From the first question to a more detailed conversation, our service overview helps make the next step feel clearer.</p><BookingButton label="Schedule Care for Your Pet" className="pp-text-action" iconSize={17} /></section>

    <section className="pp-services-gallery-section"><InteractiveServiceGallery variant="services" /></section>

    <section className="pp-page-outro pp-reveal"><span className="pp-page-eyebrow">Paws+Pine Veterinary Clinic</span><h2>Care that makes room<br />for <em>every question.</em></h2><BookingButton label="Book an Appointment" className="lime-cta" iconSize={17} /></section>
  </main>;
}
