/**
 * Hero-refinement reminder: title architecture, the pet cutout, blue field, and support content read as one editorial canvas.
 */
import { Link } from "wouter";
import { Activity, AlertTriangle, ArrowUpRight, Clock3, Heart, MapPin, PawPrint, ShieldCheck, Shield, Smile, Sparkles, Stethoscope } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InteractiveServiceGallery } from "@/components/InteractiveServiceGallery";
import { ReviewsMarquee } from "@/components/ReviewsMarquee";
import { PageMeta } from "@/components/PageMeta";
import { assets, clinic, differentiators, emergencyInfo, faqs, healthResources, howItWorks, trustStats } from "@/lib/clinic-content";

const differentiatorIcons = { heart: Heart, stethoscope: Stethoscope, activity: Activity, shield: Shield, sparkles: Sparkles, smile: Smile };

export default function Home() {
  return <main className="neo-main fidelity-home">
    <PageMeta title="Paws+Pine Veterinary Clinic" description="Thoughtful veterinary care conversations, clear service pathways, and a simple visit request process." />

    {/* 1. Hero */}
    <section className="fidelity-hero pp-major-light-stage">
      <div className="fidelity-blue-field" aria-hidden="true" />
      <div className="fidelity-title-stack"><span className="fidelity-kicker"><PawPrint size={15} /> Paws+Pine Veterinary Clinic</span><div className="fidelity-title-mask"><h1>Your best friend<br /><span>deserves care.</span></h1></div></div>
      <img className="fidelity-pets" src={assets.heroPets} width="2560" height="1440" fetchPriority="high" alt="Paws and Pine clinic dog and cat" />
      <div className="hero-value"><p>Kind, clear support<br />for every visit.</p><Link href="/services" className="lime-link">Explore services <ArrowUpRight size={15} /></Link><div className="pp-hero-trust-badges"><span className="pp-hero-trust-badge"><ShieldCheck size={13} /> Licensed Vets</span><span className="pp-hero-trust-badge"><Sparkles size={13} /> Modern Facility</span><span className="pp-hero-trust-badge"><Heart size={13} /> Fear-Free Approach</span></div></div>
      <div className="hero-proof"><strong>06</strong><span>care pathways<br />to explore</span></div>
    </section>

    {/* 2. Trust Stats Bar */}
    <section className="pp-directions-section pp-reveal" aria-labelledby="home-trust-stats-title">
      <div><span className="fidelity-kicker">Care at a glance</span><h2 id="home-trust-stats-title">Numbers that<br /><em>stay honest.</em></h2></div>
      <div className="pp-trust-stats">{trustStats.map((stat) => <div className="pp-trust-stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
    </section>

    {/* 3. Services Showcase */}
    <section className="fidelity-services pp-reveal"><div className="fidelity-services-heading"><div><span className="fidelity-kicker fidelity-kicker-light">How we can help</span><h2>Our services<span>.</span></h2></div><div><p>Explore the care paths that make a future visit easier to understand. Each one starts with a conversation.</p><Link href="/services" className="lime-link">See all services <ArrowUpRight size={15} /></Link></div></div><InteractiveServiceGallery variant="home" count={4} /></section>

    <div className="pp-marquee" aria-label="Paws and Pine care paths"><span>Wellness visits <PawPrint size={14} /> Prevention planning <PawPrint size={14} /> Puppy and kitten care <PawPrint size={14} /> Senior pet check-ins <PawPrint size={14} /> Dental care <PawPrint size={14} /> Diagnostics and procedures <PawPrint size={14} /></span><span aria-hidden="true">Wellness visits <PawPrint size={14} /> Prevention planning <PawPrint size={14} /> Puppy and kitten care <PawPrint size={14} /> Senior pet check-ins <PawPrint size={14} /> Dental care <PawPrint size={14} /> Diagnostics and procedures <PawPrint size={14} /></span></div>

    {/* 4. Why Choose Us */}
    <section className="pp-directions-section pp-reveal" aria-labelledby="home-why-choose-title">
      <div><span className="fidelity-kicker">Why choose us</span><h2 id="home-why-choose-title">Care that shows<br /><em>in the details.</em></h2></div>
      <div className="pp-differentiator-grid">{differentiators.map((item) => {
        const Icon = differentiatorIcons[item.icon];
        return <article className="pp-differentiator-card" key={item.title}><Icon size={22} strokeWidth={1.6} /><h3>{item.title}</h3><p>{item.copy}</p></article>;
      })}</div>
    </section>

    {/* 5. How It Works */}
    <section className="pp-directions-section pp-reveal" aria-labelledby="home-how-it-works-title">
      <div><span className="fidelity-kicker">How it works</span><h2 id="home-how-it-works-title">A simple path<br /><em>to lifelong care.</em></h2></div>
      <div className="pp-how-it-works">{howItWorks.map((item) => <div className="pp-how-it-works-step" key={item.step}><strong>{item.step}</strong><h3>{item.title}</h3><p>{item.copy}</p></div>)}</div>
    </section>

    {/* 6. Infinite Reviews Marquee */}
    <ReviewsMarquee />
    <p className="pp-location-note"><Link href="/proof" className="lime-link">Read verified patient stories <ArrowUpRight size={15} /></Link></p>

    {/* 7. Pet Health Resources */}
    <section className="pp-directions-section pp-reveal" aria-labelledby="home-health-resources-title">
      <div><span className="fidelity-kicker">Pet health resources</span><h2 id="home-health-resources-title">Helpful reading<br /><em>before your visit.</em></h2></div>
      <div className="pp-health-resource-grid">{healthResources.map((article) => <article className="pp-health-resource-card" key={article.title}><img src={assets[article.imageKey]} alt="" aria-hidden="true" /><div className="pp-health-resource-copy"><span>Pet health guide</span><h3>{article.title}</h3><p>{article.excerpt}</p></div></article>)}</div>
    </section>

    {/* 8. FAQ Teaser */}
    <section className="fidelity-faq pp-reveal"><div><span className="fidelity-kicker">A few helpful answers</span><h2>Everything starts with <em>one good question.</em></h2><p>We keep the details clear so you can feel more prepared for the conversation ahead.</p></div><Accordion type="single" collapsible className="fidelity-faq-list">{faqs.slice(0, 3).map((faq,index) => <AccordionItem value={`faq-${index}`} key={faq.question}><AccordionTrigger>{faq.question}</AccordionTrigger><AccordionContent>{faq.answer}</AccordionContent></AccordionItem>)}</Accordion><Link href="/faq" className="lime-link">View all FAQs <ArrowUpRight size={15} /></Link></section>

    {/* 9. Visit Our Clinic — hours, address, emergency protocol */}
    <section className="pp-hours-section pp-reveal" aria-labelledby="home-location-title"><div><span className="fidelity-kicker">Visit Our Clinic</span><h2 id="home-location-title">Plan your visit<br /><em>with confidence.</em></h2><div className="pp-location-facts"><div className="pp-location-fact"><MapPin size={20} /><div><span>Address</span><p>{clinic.address}<br />{clinic.city}</p></div></div><div className="pp-location-fact"><Clock3 size={20} /><div><span>Hours</span><p>{clinic.hours}</p></div></div><div className="pp-location-fact"><AlertTriangle size={20} /><div><span>Emergency</span><p>{emergencyInfo.note}</p></div></div></div><Link href="/location" className="lime-link">View map, hours & emergency info <ArrowUpRight size={15} /></Link></div><dl className="pp-hours-grid">{clinic.businessHours.map((entry) => <div key={entry.days}><dt>{entry.days}</dt><dd>{entry.hours}</dd></div>)}</dl></section>

    {/* 10. Final CTA */}
    <section className="fidelity-cta pp-reveal"><div><span className="fidelity-kicker fidelity-kicker-light">Paws+Pine Veterinary Clinic</span><h2>A better beginning<br />starts <em>here.</em></h2></div><div><p>Send a few useful details, then let the right next step take shape from there.</p><Link href="/request" className="lime-cta">Request a visit <ArrowUpRight size={17} /></Link></div></section>
  </main>;
}
