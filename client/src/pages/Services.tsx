/**
 * Reference-led electric-blue veterinary UI: large numbering, white sculptural cards, and a gallery-like service stage.
 */
import { Link } from "wouter";
import { Activity, ArrowUpRight, Heart, ShieldCheck, Smile, Sparkles, Stethoscope } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { assets, services } from "@/lib/clinic-content";

const icons = { stethoscope: Stethoscope, shield: ShieldCheck, sparkles: Sparkles, heart: Heart, smile: Smile, activity: Activity };

export default function Services() {
  return <main className="neo-main neo-services-page">
    <PageMeta title="Services — Paws+Pine Veterinary Clinic Demo" description="Six fictional veterinary service paths shown through a high-contrast Tier 1 website demonstration." />
    <section className="services-title-stage"><div><span className="neo-overline">Paws+Pine Clinic · Tier 1</span><h1>Care paths<br /><em>with intent.</em></h1><p>These six service blocks are fictional demo content. A real project publishes only its approved services, details, images, and contact path.</p></div><img src={assets.serviceExam} alt="Fictional dog receiving a veterinary examination" /></section>
    <section className="service-editorial-intro"><p><strong>06 services.</strong> One clear structure. No extra pages, unsupported claims, made-up pricing, or fictional testimonials.</p><Link href="/request" className="lime-link">Request a visit <ArrowUpRight size={15} /></Link></section>
    <section className="neo-all-services">{services.map((service, index) => { const Icon = icons[service.icon]; return <article key={service.title} className={`neo-all-service service-${index + 1}`}><div className="service-count">{service.number}.</div><div className="service-icon"><Icon size={25} strokeWidth={1.6} /></div><div className="service-content"><h2>{service.title}</h2><p>{service.detail}</p></div><Link href="/request" className="service-action" aria-label={`Request a visit about ${service.title}`}>Ask about this <ArrowUpRight size={18} /></Link></article>; })}</section>
    <section className="services-endcap"><span>Tier 1 service page</span><h2>Simple to navigate.<br /><em>Easy to make your own.</em></h2><Link href="/request" className="lime-cta">Begin a visit request <ArrowUpRight size={17} /></Link></section>
  </main>;
}
