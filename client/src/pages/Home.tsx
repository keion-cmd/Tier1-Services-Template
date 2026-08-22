/**
 * Hero-refinement reminder: title architecture, the pet cutout, blue field, and support content read as one editorial canvas.
 */
import { Link } from "wouter";
import { ArrowUpRight, PawPrint } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InteractiveServiceGallery } from "@/components/InteractiveServiceGallery";
import { PageMeta } from "@/components/PageMeta";
import { ReviewForm } from "@/components/ReviewForm";
import { assets, faqs } from "@/lib/clinic-content";

export default function Home() {
  return <main className="neo-main fidelity-home">
    <PageMeta title="Paws+Pine Veterinary Clinic" description="Thoughtful veterinary care conversations, clear service pathways, and a simple visit request process." />
    <section className="fidelity-hero pp-major-light-stage">
      <div className="fidelity-blue-field" aria-hidden="true" />
      <div className="fidelity-title-stack"><span className="fidelity-kicker"><PawPrint size={15} /> Paws+Pine Veterinary Clinic</span><div className="fidelity-title-mask"><h1>Paws+Pine <span>Clinic</span></h1></div></div>
      <img className="fidelity-pets" src={assets.heroPets} width="2560" height="1440" fetchPriority="high" alt="Paws and Pine clinic dog and cat" />
      <div className="hero-value"><p>Care that feels easier<br />to understand.</p><Link href="/services" className="lime-link">Explore services <ArrowUpRight size={15} /></Link></div>
      <div className="hero-proof"><strong>06</strong><span>care pathways<br />to explore</span></div>
    </section>

    <section className="fidelity-about"><div className="fidelity-about-visual"><img src={assets.aboutPup} alt="A small dog in a lime green sweater" /></div><div className="fidelity-about-copy"><span className="fidelity-kicker">About Paws+Pine</span><h2>Gentle care begins with <em>clear conversations.</em></h2><p>From routine visits to moments that need a closer look, Paws+Pine gives pet parents an easier way to understand their options and choose a next step.</p><div className="fidelity-metrics"><div><strong>06</strong><span>care pathways</span></div><div><strong>01</strong><span>clear starting point</span></div><div><strong>03</strong><span>thoughtful steps</span></div></div></div></section>

    <section className="fidelity-services"><div className="fidelity-services-heading"><div><span className="fidelity-kicker fidelity-kicker-light">How we can help</span><h2>Our services<span>.</span></h2></div><div><p>Explore the care paths that make a future visit easier to understand. Each one starts with a conversation.</p><Link href="/services" className="lime-link">See all services <ArrowUpRight size={15} /></Link></div></div><InteractiveServiceGallery variant="home" count={4} /></section>

    <div className="pp-marquee" aria-label="Paws and Pine care paths"><span>Wellness visits <PawPrint size={14} /> Prevention planning <PawPrint size={14} /> Puppy and kitten care <PawPrint size={14} /> Senior pet check-ins <PawPrint size={14} /> Dental care <PawPrint size={14} /> Diagnostics and procedures <PawPrint size={14} /></span><span aria-hidden="true">Wellness visits <PawPrint size={14} /> Prevention planning <PawPrint size={14} /> Puppy and kitten care <PawPrint size={14} /> Senior pet check-ins <PawPrint size={14} /> Dental care <PawPrint size={14} /> Diagnostics and procedures <PawPrint size={14} /></span></div>

    <section className="pp-reviews-section"><div className="pp-reviews-intro"><span className="fidelity-kicker">Custom feedback</span><h2>Tell us how<br /><em>care felt.</em></h2><p>Your feedback goes to the clinic team for private review. No visitor reviews, ratings, or testimonials are shown on this page.</p></div><ReviewForm /></section>

    <section className="fidelity-faq"><div><span className="fidelity-kicker">A few helpful answers</span><h2>Everything starts with <em>one good question.</em></h2><p>We keep the details clear so you can feel more prepared for the conversation ahead.</p></div><Accordion type="single" collapsible className="fidelity-faq-list">{faqs.map((faq,index) => <AccordionItem value={`faq-${index}`} key={faq.question}><AccordionTrigger>{faq.question}</AccordionTrigger><AccordionContent>{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></section>

    <section className="fidelity-cta"><div><span className="fidelity-kicker fidelity-kicker-light">Paws+Pine Veterinary Clinic</span><h2>A better beginning<br />starts <em>here.</em></h2></div><div><p>Send a few useful details, then let the right next step take shape from there.</p><Link href="/request" className="lime-cta">Request a visit <ArrowUpRight size={17} /></Link></div></section>
  </main>;
}
