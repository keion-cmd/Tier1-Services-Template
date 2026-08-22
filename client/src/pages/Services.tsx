/**
 * Companion Field Notes design reminder: service information is organized like practical care notes, not a sales catalog.
 */
import { Link } from "wouter";
import { Activity, ArrowUpRight, Heart, ShieldCheck, Smile, Sparkles, Stethoscope } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { assets, services } from "@/lib/clinic-content";

const icons = { stethoscope: Stethoscope, shield: ShieldCheck, sparkles: Sparkles, heart: Heart, smile: Smile, activity: Activity };

export default function Services() {
  return (
    <main>
      <PageMeta title="Services — Paws & Pine Veterinary Clinic Demo" description="Explore six fictional sample veterinary care paths for the Paws & Pine Tier 1 website demonstration." />
      <section className="page-hero services-hero"><div className="shell-width page-hero-layout"><div><span className="eyebrow">Services / Products · Tier 1</span><h1>Care paths with <em>clear context.</em></h1><p>Six fictional service examples show how a Tier 1 clinic website can organize essential information without adding unsupported claims, pricing, or extra pages.</p></div><figure><img src={assets.dogCare} alt="Fictional dog waiting calmly for a veterinary wellness conversation" /></figure></div></section>
      <section className="services-intro"><div className="shell-width service-intro-layout"><span className="vertical-kicker">SIX SAMPLE PATHWAYS</span><p>For a production clinic, each card should be replaced with approved service names, descriptions, prices only when authorized, and only the images the clinic has approved for public use.</p></div></section>
      <section className="service-grid-section"><div className="shell-width service-grid">{services.map((service) => { const Icon = icons[service.icon]; return <article className="service-card" key={service.title}><div className="service-card-top"><span>{service.number}</span><Icon size={22} strokeWidth={1.6} /></div><h2>{service.title}</h2><p>{service.detail}</p><div className="service-card-bottom"><span>Fictional demo service</span><Link href="/request" aria-label={`Request a visit about ${service.title}`}>Ask about this path <ArrowUpRight size={16} /></Link></div></article>; })}</div></section>
      <section className="service-footnote"><div className="shell-width footnote-layout"><div><span className="eyebrow">Keep the promise honest</span><h2>Service pages should explain, not <em>overstate.</em></h2></div><p>This demo does not claim appointments, outcome guarantees, pricing, treatment recommendations, or availability. A real Tier 1 clinic site should publish only approved details and guide visitors to a verified next contact path.</p></div></section>
      <section className="small-cta-section"><div className="shell-width small-cta-layout"><span>Ready to see the request pattern?</span><Link href="/request" className="text-link">Request a visit <ArrowUpRight size={17} /></Link></div></section>
    </main>
  );
}
