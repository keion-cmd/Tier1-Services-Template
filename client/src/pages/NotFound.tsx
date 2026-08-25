import { Link } from "wouter";
import { ArrowUpRight, PawPrint } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";

export default function NotFound() {
  return <main className="neo-main pp-services-page">
    <PageMeta title="Page not found — Paws+Pine Veterinary Clinic" description="This page could not be found. Return to the Paws+Pine homepage or browse our services." />

    <section className="pp-page-hero pp-services-hero pp-major-light-stage pp-reveal">
      <div className="pp-page-hero-copy">
        <span className="pp-page-eyebrow"><PawPrint size={15} /> 404 · Page not found</span>
        <h1>That page<br /><em>wandered off.</em></h1>
        <p>The page you’re looking for doesn’t exist, may have moved, or was never here. Let’s get you back on track.</p>
        <Link href="/" className="lime-link">Back to home <ArrowUpRight size={15} /></Link>
      </div>
    </section>

    <section className="pp-page-outro pp-reveal">
      <span className="pp-page-eyebrow">Paws+Pine Veterinary Clinic</span>
      <h2>Try one of these<br /><em>instead.</em></h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        <Link href="/" className="lime-cta">Go to homepage <ArrowUpRight size={17} /></Link>
        <Link href="/services" className="pp-text-action">Browse our services <ArrowUpRight size={17} /></Link>
      </div>
    </section>
  </main>;
}
