/**
 * Cross-page consistency pass: reuses the pp-page-hero/pp-health-resource card system from Home's health resources section.
 */
import { Link } from "wouter";
import { ArrowUpRight, Info, PawPrint } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { articles, assets } from "@/lib/clinic-content";

export default function Resources() {
  return <main className="neo-main pp-services-page">
    <PageMeta title="Pet Health Resources — Paws+Pine Veterinary Clinic" description="General educational articles on dog and cat health, preventive care, wellness exams, and dental care from Paws+Pine Veterinary Clinic." path="/resources" />

    <section className="pp-page-hero pp-services-hero pp-major-light-stage pp-reveal">
      <div className="pp-page-hero-copy"><span className="pp-page-eyebrow"><PawPrint size={15} /> Pet health resources</span><h1>Helpful reading<br /><em>before your visit.</em></h1><p>General, educational articles to help you feel more prepared for a conversation with your veterinary team.</p><BookingButton label="Book an Appointment" className="lime-link" /></div>
      <div className="pp-services-hero-image"><img src={assets.dogCare} alt="A dog at Paws and Pine" /></div>
    </section>

    <section className="pp-services-intro pp-reveal"><div className="pp-services-intro-count"><strong>{String(articles.length).padStart(2, "0")}</strong><span>articles</span></div><p className="flex items-start gap-2"><Info size={18} className="shrink-0 mt-1" /> This content is for general educational purposes and does not replace professional veterinary advice.</p><BookingButton label="Talk to our team" className="pp-text-action" iconSize={17} /></section>

    <section className="pp-directions-section pp-reveal" aria-labelledby="resources-grid-title">
      <div><span className="pp-page-eyebrow"><PawPrint size={15} /> Latest articles</span><h2 id="resources-grid-title">Read at your<br /><em>own pace.</em></h2></div>
      <div className="pp-health-resource-grid">
        {articles.map((article) => <Link key={article.slug} href={`/resources/${article.slug}`} className="pp-health-resource-card">
          <img src={assets[article.imageKey]} alt="" aria-hidden="true" />
          <div className="pp-health-resource-copy">
            <span>{article.category} · {article.date} · {article.readingTime}</span>
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
          </div>
        </Link>)}
      </div>
    </section>

    <section className="pp-page-outro pp-reveal"><span className="pp-page-eyebrow">Paws+Pine Veterinary Clinic</span><h2>Still have<br /><em>questions?</em></h2><BookingButton label="Book an Appointment" className="lime-cta" iconSize={17} /></section>
  </main>;
}
