/**
 * Cross-page consistency pass: extends the Home FAQ accordion with categorized groups and a contact fallback rail.
 */
import { Link } from "wouter";
import { ArrowUpRight, Mail, PawPrint, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageMeta } from "@/components/PageMeta";
import { assets, clinic, faqs } from "@/lib/clinic-content";

const categories = [
  { label: "Requests & visits", items: faqs },
];

export default function FAQ() {
  return <main className="neo-main pp-services-page">
    <PageMeta title="FAQ — Paws+Pine Veterinary Clinic" description="Answers to common questions about requesting a visit at Paws+Pine Veterinary Clinic." />

    <section className="pp-page-hero pp-services-hero pp-major-light-stage pp-reveal">
      <div className="pp-page-hero-copy"><span className="pp-page-eyebrow"><PawPrint size={15} /> Frequently asked</span><h1>Questions,<br /><em>answered clearly.</em></h1><p>A few honest answers about how requests, visits, and next steps actually work.</p><Link href="/request" className="lime-link">Request a visit <ArrowUpRight size={15} /></Link></div>
      <div className="pp-services-hero-image"><img src={assets.clinicHero} alt="Paws and Pine clinic consultation space" /></div>
    </section>

    <section className="fidelity-faq pp-reveal">
      {categories.map((category) => <div key={category.label} className="pp-services-gallery-section" aria-labelledby={`faq-${category.label}`}>
        <span id={`faq-${category.label}`} className="pp-page-eyebrow">{category.label}</span>
        <Accordion type="single" collapsible className="fidelity-faq-list">
          {category.items.map((faq, index) => <AccordionItem value={`${category.label}-${index}`} key={faq.question}><AccordionTrigger>{faq.question}</AccordionTrigger><AccordionContent>{faq.answer}</AccordionContent></AccordionItem>)}
        </Accordion>
      </div>)}
    </section>

    <section className="pp-directions-section pp-reveal" aria-labelledby="faq-contact-title">
      <div><span className="pp-page-eyebrow"><Phone size={15} /> Still have a question?</span><h2 id="faq-contact-title">Reach us<br /><em>directly.</em></h2></div>
      <div className="pp-directions-grid">
        <article><Phone size={20} /><span>Call the clinic</span><h3>{clinic.phone}</h3><p>Available during posted business hours for follow-up questions.</p></article>
        <article><Mail size={20} /><span>Email the team</span><h3>{clinic.email}</h3><p>For non-urgent questions or details you'd rather write out.</p></article>
      </div>
    </section>

    <section className="pp-page-outro pp-reveal"><span className="pp-page-eyebrow">Paws+Pine Veterinary Clinic</span><h2>Ready for a<br /><em>real answer?</em></h2><Link href="/request" className="lime-cta">Request a visit <ArrowUpRight size={17} /></Link></section>
  </main>;
}
