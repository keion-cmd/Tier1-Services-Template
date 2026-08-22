/**
 * Shared Paws+Pine signature component: compact service cards become image-led on hover or keyboard focus.
 */
import { useState } from "react";
import { Link } from "wouter";
import { Activity, ArrowUpRight, Heart, ShieldCheck, Smile, Sparkles, Stethoscope } from "lucide-react";
import { assets, services } from "@/lib/clinic-content";

const icons = { stethoscope: Stethoscope, shield: ShieldCheck, sparkles: Sparkles, heart: Heart, smile: Smile, activity: Activity };
const serviceVisuals = [assets.serviceExam, assets.dogCare, assets.catCare, assets.clinicHero, assets.dentalCare, assets.diagnosticsCare];

type InteractiveServiceGalleryProps = { variant: "home" | "services"; count?: number };

export function InteractiveServiceGallery({ variant, count = 6 }: InteractiveServiceGalleryProps) {
  const [activeService, setActiveService] = useState<number | null>(null);
  const galleryServices = services.slice(0, count);

  return <div className={`pp-service-gallery pp-service-gallery--${variant}`}>
    {galleryServices.map((service, index) => {
      const Icon = icons[service.icon];
      const active = activeService === index;
      return <article key={service.title} tabIndex={0} className={`pp-service-card ${active ? "is-active" : ""}`} onMouseEnter={() => setActiveService(index)} onMouseLeave={() => setActiveService(null)} onFocus={() => setActiveService(index)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setActiveService(null); }}>
        <div className="pp-service-card-top"><span>{service.number} · Care path</span><Link href="/request" aria-label={`Start a service request about ${service.title}`}><ArrowUpRight size={17} /></Link></div>
        <div className="pp-service-card-image"><img src={serviceVisuals[index]} alt={`${service.title} at Paws and Pine`} /></div>
        <div className="pp-service-card-copy"><Icon size={20} strokeWidth={1.6} /><h3>{service.title}</h3><p>{service.short}</p></div>
        <strong className="pp-service-card-index">{service.number}.</strong>
      </article>;
    })}
  </div>;
}
