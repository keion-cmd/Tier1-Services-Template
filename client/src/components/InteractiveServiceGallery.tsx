/**
 * Shared Paws+Pine signature component: compact service cards become image-led on hover or keyboard focus.
 */
import { useState } from "react";
import { Link } from "wouter";
import { Activity, ArrowUpRight, Heart, ShieldCheck, Smile, Sparkles, Stethoscope } from "lucide-react";
import { assets, services } from "@/lib/clinic-content";

const icons = { stethoscope: Stethoscope, shield: ShieldCheck, sparkles: Sparkles, heart: Heart, smile: Smile, activity: Activity };
const serviceVisuals = [assets.serviceExam, assets.dogCare, assets.catCare, assets.clinicHero, assets.dentalCare, assets.diagnosticsCare];
const categoryFilters = ["All", "Preventive", "Clinical & Dental", "Diagnostics"] as const;

type InteractiveServiceGalleryProps = { variant: "home" | "services"; count?: number };

export function InteractiveServiceGallery({ variant, count = 6 }: InteractiveServiceGalleryProps) {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<(typeof categoryFilters)[number]>("All");
  const galleryServices = services.slice(0, count);
  const visibleServices = variant === "services" && activeFilter !== "All"
    ? galleryServices.filter((service) => service.category === activeFilter)
    : galleryServices;

  return <div>
    {variant === "services" && <div className="pp-service-filter-tabs" role="tablist" aria-label="Filter services by category">
      {categoryFilters.map((filter) => <button key={filter} type="button" role="tab" aria-selected={activeFilter === filter} className={`pp-service-filter-tab ${activeFilter === filter ? "is-active" : ""}`} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
    </div>}
    <div className={`pp-service-gallery pp-service-gallery--${variant}`}>
      {visibleServices.map((service) => {
        const index = galleryServices.indexOf(service);
        const Icon = icons[service.icon];
        const active = activeService === index;
        const detailHref = `/services/${service.slug}`;
        const cardBody = <>
          <div className="pp-service-card-image"><img src={serviceVisuals[index]} alt={`${service.title} at Paws and Pine`} /></div>
          <div className="pp-service-card-copy"><Icon size={20} strokeWidth={1.6} /><h3>{service.title}</h3><p>{service.short}</p></div>
          <strong className="pp-service-card-index">{service.number}.</strong>
        </>;
        return <article key={service.title} tabIndex={variant === "services" ? -1 : 0} className={`pp-service-card ${active ? "is-active" : ""}`} onMouseEnter={() => setActiveService(index)} onMouseLeave={() => setActiveService(null)} onFocus={() => setActiveService(index)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setActiveService(null); }}>
          <div className="pp-service-card-top"><span>{service.number} · Care path</span><Link href={`/request?service=${service.slug}`} aria-label={`Start a service request about ${service.title}`}><span className="pp-service-card-request-label">Start a request</span><ArrowUpRight size={17} /></Link></div>
          {variant === "services" ? <Link href={detailHref} aria-label={`View details about ${service.title}`}>{cardBody}</Link> : cardBody}
        </article>;
      })}
    </div>
  </div>;
}
