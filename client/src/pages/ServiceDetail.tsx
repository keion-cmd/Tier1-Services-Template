/**
 * Cross-page consistency pass: service detail reuses the same blue editorial field and card system as Services.
 */
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowUpRight, CheckCircle2, PawPrint } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { assets, buildBreadcrumbSchema, getServiceBySlug } from "@/lib/clinic-content";
import NotFound from "./NotFound";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) return <NotFound />;

  const heroImage = assets[service.imageKey];

  return <main className="neo-main pp-services-page">
    <PageMeta title={`${service.title} — Paws+Pine Veterinary Clinic`} description={service.short} path={`/services/${service.slug}`} image={heroImage} jsonLd={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: service.title, path: `/services/${service.slug}` }])} />

    <section className="pp-page-hero pp-services-hero pp-major-light-stage pp-reveal">
      <div className="pp-page-hero-copy">
        <Link href="/services" className="pp-text-action"><ArrowLeft size={15} /> All Services</Link>
        <span className="pp-page-eyebrow"><PawPrint size={15} /> {service.number} · Care path · {service.duration}</span>
        <h1>{service.title}</h1>
        <p>{service.detail}</p>
        <BookingButton label="Book an Appointment" className="lime-link" />
      </div>
      <div className="pp-services-hero-image"><img src={heroImage} alt={`${service.title} at Paws and Pine`} /></div>
    </section>

    <section className="pp-services-intro pp-reveal">
      <div className="pp-services-intro-count"><strong>{service.number}</strong><span>care path</span></div>
      <p>{service.short}</p>
      <BookingButton label="Schedule Care for Your Pet" className="pp-text-action" iconSize={17} />
    </section>

    <section className="pp-services-gallery-section pp-reveal" aria-labelledby="service-benefits-title">
      <h2 id="service-benefits-title" className="pp-page-eyebrow"><PawPrint size={15} /> Key benefits</h2>
      <div className="grid gap-4 sm:grid-cols-2 mt-4">
        {service.benefits.map((benefit) => <div key={benefit} className="pp-location-card pp-location-copy flex items-start gap-3 p-5 rounded-2xl">
          <CheckCircle2 size={20} className="shrink-0 text-[var(--pp-blue,#0957f6)]" />
          <p className="m-0">{benefit}</p>
        </div>)}
      </div>
    </section>

    <section className="pp-directions-section pp-reveal" aria-labelledby="service-process-title">
      <div><span className="pp-page-eyebrow"><PawPrint size={15} /> What to expect</span><h2 id="service-process-title">A clear path<br /><em>from start to finish.</em></h2></div>
      <div className="pp-directions-grid">
        {service.process.map((step, index) => <article key={step}><span>Step {index + 1}</span><h3>{step}</h3><p>{stepDescription(step)}</p></article>)}
      </div>
    </section>

    <section className="pp-page-outro pp-reveal">
      <span className="pp-page-eyebrow">Paws+Pine Veterinary Clinic</span>
      <h2>Ready to talk through<br /><em>{service.title.toLowerCase()}?</em></h2>
      <BookingButton label="Book an Appointment" className="lime-cta" iconSize={17} />
    </section>
  </main>;
}

function stepDescription(step: string) {
  if (step === "Intake") return "Share your pet's history and the questions you'd like to raise.";
  if (step === "Examination") return "A hands-on look guided by what you shared during intake.";
  if (step === "Care Plan") return "A clear next step, discussed directly rather than assumed online.";
  return "Part of this care path's structured conversation.";
}
