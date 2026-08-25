/**
 * Hero-refinement reminder: title architecture, the pet cutout, blue field, and support content read as one editorial canvas.
 */
import { Link } from "wouter";
import { ArrowUpRight, Clock3, MapPin, PawPrint } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InteractiveServiceGallery } from "@/components/InteractiveServiceGallery";
import { PageMeta } from "@/components/PageMeta";
import { ReviewsSection } from "@/components/ReviewsSection";
import { assets, clinic, faqs } from "@/lib/clinic-content";

const galleryTeaserImages = [
  { src: assets.clinicHero, alt: "Paws and Pine clinic consultation space" },
  { src: assets.serviceExam, alt: "Veterinarian examining a dog at Paws and Pine" },
  { src: assets.catCare, alt: "A cat during a puppy and kitten care visit" },
  { src: assets.dentalCare, alt: "A dental care conversation at the clinic" },
];

const homeCareStats = [
  { value: "06", label: "care pathways offered" },
  { value: "01", label: "clear starting point for every visit" },
  { value: "03", label: "steps from request to a confirmed next step" },
];

export default function Home() {
  return <main className="neo-main fidelity-home">
    <PageMeta title="Paws+Pine Veterinary Clinic" description="Thoughtful veterinary care conversations, clear service pathways, and a simple visit request process." />
    <section className="fidelity-hero pp-major-light-stage">
      <div className="fidelity-blue-field" aria-hidden="true" />
      <div className="fidelity-title-stack"><span className="fidelity-kicker"><PawPrint size={15} /> Paws+Pine Veterinary Clinic</span><div className="fidelity-title-mask"><h1>Your best friend<br /><span>deserves care.</span></h1></div></div>
      <img className="fidelity-pets" src={assets.heroPets} width="2560" height="1440" fetchPriority="high" alt="Paws and Pine clinic dog and cat" />
      <div className="hero-value"><p>Kind, clear support<br />for every visit.</p><Link href="/services" className="lime-link">Explore services <ArrowUpRight size={15} /></Link></div>
      <div className="hero-proof"><strong>06</strong><span>care pathways<br />to explore</span></div>
    </section>

    <section className="fidelity-about pp-reveal"><div className="fidelity-about-visual"><img src={assets.aboutPup} alt="A small dog in a lime green sweater" /></div><div className="fidelity-about-copy"><span className="fidelity-kicker">About Paws+Pine</span><h2>Gentle care begins with <em>clear conversations.</em></h2><p>From routine visits to moments that need a closer look, Paws+Pine gives pet parents an easier way to understand their options and choose a next step.</p><div className="fidelity-metrics"><div><strong>06</strong><span>care pathways</span></div><div><strong>01</strong><span>clear starting point</span></div><div><strong>03</strong><span>thoughtful steps</span></div></div><Link href="/about" className="lime-link">Learn more about our practice <ArrowUpRight size={15} /></Link></div></section>

    <section className="fidelity-services pp-reveal"><div className="fidelity-services-heading"><div><span className="fidelity-kicker fidelity-kicker-light">How we can help</span><h2>Our services<span>.</span></h2></div><div><p>Explore the care paths that make a future visit easier to understand. Each one starts with a conversation.</p><Link href="/services" className="lime-link">See all services <ArrowUpRight size={15} /></Link></div></div><InteractiveServiceGallery variant="home" count={4} /></section>

    <div className="pp-marquee" aria-label="Paws and Pine care paths"><span>Wellness visits <PawPrint size={14} /> Prevention planning <PawPrint size={14} /> Puppy and kitten care <PawPrint size={14} /> Senior pet check-ins <PawPrint size={14} /> Dental care <PawPrint size={14} /> Diagnostics and procedures <PawPrint size={14} /></span><span aria-hidden="true">Wellness visits <PawPrint size={14} /> Prevention planning <PawPrint size={14} /> Puppy and kitten care <PawPrint size={14} /> Senior pet check-ins <PawPrint size={14} /> Dental care <PawPrint size={14} /> Diagnostics and procedures <PawPrint size={14} /></span></div>

    <section className="fidelity-gallery-teaser pp-services-gallery-section pp-reveal" aria-labelledby="home-gallery-title"><h2 id="home-gallery-title" className="fidelity-kicker"><PawPrint size={15} /> Facility & Patient Gallery</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">{galleryTeaserImages.map((image) => <div key={image.src} className="pp-location-card overflow-hidden rounded-2xl p-0"><img src={image.src} alt={image.alt} className="w-full h-full object-cover aspect-[4/3]" loading="lazy" /></div>)}</div><Link href="/gallery" className="lime-link">View full photo gallery <ArrowUpRight size={15} /></Link></section>

    <section className="pp-directions-section pp-reveal" aria-labelledby="home-proof-stats-title"><div><span className="fidelity-kicker">Care at a glance</span><h2 id="home-proof-stats-title">Numbers that<br /><em>stay honest.</em></h2></div><div className="pp-directions-grid">{homeCareStats.map((stat) => <article key={stat.label}><span>At a glance</span><h3>{stat.value}</h3><p>{stat.label}</p></article>)}</div></section>

    <ReviewsSection />
    <p className="pp-location-note"><Link href="/proof" className="lime-link">Read verified patient stories <ArrowUpRight size={15} /></Link></p>

    <section className="fidelity-faq pp-reveal"><div><span className="fidelity-kicker">A few helpful answers</span><h2>Everything starts with <em>one good question.</em></h2><p>We keep the details clear so you can feel more prepared for the conversation ahead.</p></div><Accordion type="single" collapsible className="fidelity-faq-list">{faqs.slice(0, 3).map((faq,index) => <AccordionItem value={`faq-${index}`} key={faq.question}><AccordionTrigger>{faq.question}</AccordionTrigger><AccordionContent>{faq.answer}</AccordionContent></AccordionItem>)}</Accordion><Link href="/faq" className="lime-link">View all FAQs <ArrowUpRight size={15} /></Link></section>

    <section className="pp-hours-section pp-reveal" aria-labelledby="home-location-title"><div><span className="fidelity-kicker">Visit Our Clinic</span><h2 id="home-location-title">Plan your visit<br /><em>with confidence.</em></h2><div className="pp-location-facts"><div className="pp-location-fact"><MapPin size={20} /><div><span>Address</span><p>{clinic.address}<br />{clinic.city}</p></div></div><div className="pp-location-fact"><Clock3 size={20} /><div><span>Hours</span><p>{clinic.hours}</p></div></div></div><Link href="/location" className="lime-link">View map & hours <ArrowUpRight size={15} /></Link></div><dl className="pp-hours-grid">{clinic.businessHours.map((entry) => <div key={entry.days}><dt>{entry.days}</dt><dd>{entry.hours}</dd></div>)}</dl></section>

    <section className="fidelity-cta pp-reveal"><div><span className="fidelity-kicker fidelity-kicker-light">Paws+Pine Veterinary Clinic</span><h2>A better beginning<br />starts <em>here.</em></h2></div><div><p>Send a few useful details, then let the right next step take shape from there.</p><Link href="/request" className="lime-cta">Request a visit <ArrowUpRight size={17} /></Link></div></section>
  </main>;
}
