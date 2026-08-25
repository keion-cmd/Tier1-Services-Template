/**
 * Hero-refinement reminder: title architecture, the pet cutout, blue field, and support content read as one editorial canvas.
 */
import { Link } from "wouter";
import { Activity, AlertTriangle, ArrowUpRight, Clock3, Heart, MapPin, PawPrint, Shield, Smile, Sparkles, Stethoscope } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InteractiveServiceGallery } from "@/components/InteractiveServiceGallery";
import { ReviewsMarquee } from "@/components/ReviewsMarquee";
import { PetCareMarquee } from "@/components/PetCareMarquee";
import { PageMeta } from "@/components/PageMeta";
import { BookingButton } from "@/components/BookingButton";
import { assets, buildLocalBusinessSchema, carePlans, clinic, clinicExperienceFeatures, differentiators, doctors, emergencyInfo, faqs, healthResources, howItWorks, patientSuccessStories, trustStats } from "@/lib/clinic-content";
import { petCareBrands } from "@/lib/petCareBrands";

const differentiatorIcons = { heart: Heart, stethoscope: Stethoscope, activity: Activity, shield: Shield, sparkles: Sparkles, smile: Smile };
const carePlanIcons = { sparkles: Sparkles, shield: Shield, heart: Heart };

export default function Home() {
  return <main className="neo-main fidelity-home">
    <PageMeta title="Paws+Pine Veterinary Clinic" description="Thoughtful veterinary care conversations, clear service pathways, and a simple visit request process." path="/" image={assets.heroPets} jsonLd={buildLocalBusinessSchema()} />

    {/* 1. Hero */}
    <section className="fidelity-hero pp-major-light-stage">
      <div className="fidelity-blue-field" aria-hidden="true" />
      <div className="fidelity-title-stack"><span className="fidelity-kicker"><PawPrint size={15} /> Paws+Pine Veterinary Clinic</span><div className="fidelity-title-mask"><h1>Your best friend<br /><span>deserves care.</span></h1></div></div>
      <img className="fidelity-pets" src={assets.heroPets} width="2560" height="1440" fetchPriority="high" alt="Paws and Pine clinic dog and cat" />
      <div className="hero-value"><p>Kind, clear support<br />for every visit.</p><Link href="/services" className="lime-link">Explore services <ArrowUpRight size={15} /></Link></div>
      <div className="hero-proof"><strong>06</strong><span>care pathways<br />to explore</span></div>
    </section>

    {/* 1b. Pet Care Industry Marquee */}
    <PetCareMarquee items={petCareBrands} />

    {/* 2. Trust Stats Bar */}
    <section className="pp-home-stats pp-reveal" aria-labelledby="home-trust-stats-title">
      <span id="home-trust-stats-title" className="sr-only">Care at a glance</span>
      <div className="pp-home-stats-row">{trustStats.map((stat) => <div className="pp-home-stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
    </section>

    {/* 3. Services Showcase */}
    <section className="fidelity-services pp-reveal"><div className="fidelity-services-heading"><div><span className="fidelity-kicker fidelity-kicker-light">How we can help</span><h2>Our services<span>.</span></h2></div><div><p>Explore the care paths that make a future visit easier to understand. Each one starts with a conversation.</p><Link href="/services" className="lime-link">See all services <ArrowUpRight size={15} /></Link></div></div><InteractiveServiceGallery variant="home" count={4} /></section>

    <div className="pp-marquee" aria-label="Paws and Pine care paths"><span>Wellness visits <PawPrint size={14} /> Prevention planning <PawPrint size={14} /> Puppy and kitten care <PawPrint size={14} /> Senior pet check-ins <PawPrint size={14} /> Dental care <PawPrint size={14} /> Diagnostics and procedures <PawPrint size={14} /></span><span aria-hidden="true">Wellness visits <PawPrint size={14} /> Prevention planning <PawPrint size={14} /> Puppy and kitten care <PawPrint size={14} /> Senior pet check-ins <PawPrint size={14} /> Dental care <PawPrint size={14} /> Diagnostics and procedures <PawPrint size={14} /></span></div>

    {/* 4. Why Choose Us */}
    <section className="pp-directions-section pp-home-section--light pp-reveal" aria-labelledby="home-why-choose-title">
      <div><span className="fidelity-kicker">Why choose us</span><h2 id="home-why-choose-title">Care that shows<br /><em>in the details.</em></h2></div>
      <div className="pp-differentiator-grid">{differentiators.map((item) => {
        const Icon = differentiatorIcons[item.icon];
        return <article className="pp-differentiator-card" key={item.title}><Icon size={22} strokeWidth={1.6} /><h3>{item.title}</h3><p>{item.copy}</p></article>;
      })}</div>
    </section>

    {/* 4b. Meet Our Veterinary Team */}
    <section className="pp-services-gallery-section pp-reveal" aria-labelledby="home-team-title">
      <div className="fidelity-services-heading"><div><span className="fidelity-kicker">Meet our veterinary team</span><h2 id="home-team-title">Care from a team<br /><em>you can trust.</em></h2></div><div><p>Three demo profiles representing the kind of clinical range a real Paws+Pine team could offer.</p><Link href="/team" className="lime-link">Meet the full team <ArrowUpRight size={15} /></Link></div></div>
      <div className="pp-directions-grid">{doctors.map((doctor) => <article key={doctor.slug}><img src={assets[doctor.imageKey]} alt="" aria-hidden="true" className="w-full h-56 object-cover rounded-xl mb-3" /><span>{doctor.specialty}</span><h3>{doctor.name}, {doctor.credentials}</h3><p>{doctor.bio}</p><Link href={`/team/${doctor.slug}`} className="pp-text-action">View profile <ArrowUpRight size={17} /></Link></article>)}</div>
    </section>

    {/* 5. How It Works */}
    <section className="pp-directions-section pp-reveal" aria-labelledby="home-how-it-works-title">
      <div><span className="fidelity-kicker">How it works</span><h2 id="home-how-it-works-title">A simple path<br /><em>to lifelong care.</em></h2></div>
      <div className="pp-how-it-works">{howItWorks.map((item) => <div className="pp-how-it-works-step" key={item.step}><strong>{item.step}</strong><h3>{item.title}</h3><p>{item.copy}</p></div>)}</div>
    </section>

    {/* 5b. Designed Around Your Pet's Comfort */}
    <section className="pp-clinic-gallery pp-reveal" aria-labelledby="home-clinic-experience-title">
      <div className="pp-clinic-gallery-heading"><span className="fidelity-kicker">Designed around your pet's comfort</span><h2 id="home-clinic-experience-title">A space built<br /><em>for calm visits.</em></h2></div>
      <div className="pp-clinic-gallery-layout">
        <figure className="pp-clinic-gallery-hero"><img src={assets[clinicExperienceFeatures[0].imageKey]} alt="" aria-hidden="true" /><figcaption>{clinicExperienceFeatures[0].title}</figcaption></figure>
        <div className="pp-clinic-gallery-side">{clinicExperienceFeatures.slice(1, 3).map((feature) => <figure key={feature.title}><img src={assets[feature.imageKey]} alt="" aria-hidden="true" /><figcaption>{feature.title}</figcaption></figure>)}</div>
      </div>
      <p className="pp-clinic-gallery-note">{clinicExperienceFeatures.slice(3).map((feature) => <span key={feature.title}><strong>{feature.title}.</strong> {feature.copy}</span>)}</p>
    </section>

    {/* 6. Infinite Reviews Marquee */}
    <ReviewsMarquee />
    <p className="pp-location-note"><Link href="/proof" className="lime-link">Read verified patient stories <ArrowUpRight size={15} /></Link></p>

    {/* 6b. Real Care. Real Stories. */}
    <section className="pp-services-gallery-section pp-reveal" aria-labelledby="home-success-stories-title">
      <h2 id="home-success-stories-title" className="pp-page-eyebrow"><PawPrint size={15} /> Real care. Real stories.</h2>
      <div className="grid gap-4 sm:grid-cols-3 mt-4">{patientSuccessStories.map((story) => <div key={story.petName} className="pp-location-card pp-location-copy flex flex-col items-start gap-2 p-5 rounded-2xl"><img src={assets[story.imageKey]} alt="" aria-hidden="true" className="w-full h-48 object-cover rounded-xl mb-2" /><span className="pp-page-eyebrow">{story.petName} · {story.breed} · {story.category}</span><p className="m-0">{story.story}</p></div>)}</div>
      <p className="pp-location-note">Paws+Pine is a fictional demonstration clinic; these demo patient stories are illustrative placeholders, not real medical outcomes.</p>
    </section>

    {/* 7. Pet Health Resources */}
    <section className="pp-directions-section pp-reveal" aria-labelledby="home-health-resources-title">
      <div><span className="fidelity-kicker">Pet health resources</span><h2 id="home-health-resources-title">Helpful reading<br /><em>before your visit.</em></h2></div>
      <div className="pp-health-resource-grid">{healthResources.map((article) => <article className="pp-health-resource-card" key={article.title}><img src={assets[article.imageKey]} alt="" aria-hidden="true" /><div className="pp-health-resource-copy"><span>Pet health guide</span><h3>{article.title}</h3><p>{article.excerpt}</p></div></article>)}</div>
    </section>

    {/* 7b. Proactive Care for Every Stage */}
    <section className="pp-directions-section pp-home-section--light pp-reveal" aria-labelledby="home-care-plans-title">
      <div><span className="fidelity-kicker">Proactive care for every stage</span><h2 id="home-care-plans-title">Planned around<br /><em>your pet's life stage.</em></h2></div>
      <div className="pp-directions-grid">{carePlans.map((plan) => {
        const Icon = carePlanIcons[plan.icon];
        return <article key={plan.title}><Icon size={20} /><span>{plan.subtitle}</span><h3>{plan.title}</h3><ul className="m-0 mt-2 pl-4 flex flex-col gap-1 text-[14px] leading-[1.5]">{plan.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>;
      })}</div>
      <Link href="/new-clients" className="lime-link">Explore Preventive Care <ArrowUpRight size={15} /></Link>
    </section>

    {/* 8. FAQ Teaser */}
    <section className="fidelity-faq pp-reveal"><div><span className="fidelity-kicker">A few helpful answers</span><h2>Everything starts with <em>one good question.</em></h2><p>We keep the details clear so you can feel more prepared for the conversation ahead.</p></div><Accordion type="single" collapsible className="fidelity-faq-list">{faqs.slice(0, 3).map((faq,index) => <AccordionItem value={`faq-${index}`} key={faq.question}><AccordionTrigger>{faq.question}</AccordionTrigger><AccordionContent>{faq.answer}</AccordionContent></AccordionItem>)}</Accordion><Link href="/faq" className="lime-link">View all FAQs <ArrowUpRight size={15} /></Link></section>

    {/* 9. Visit Our Clinic — hours, address, emergency protocol */}
    <section className="pp-hours-section pp-reveal" aria-labelledby="home-location-title"><div><span className="fidelity-kicker">Visit Our Clinic</span><h2 id="home-location-title">Plan your visit<br /><em>with confidence.</em></h2><div className="pp-location-facts"><div className="pp-location-fact"><MapPin size={20} /><div><span>Address</span><p>{clinic.address}<br />{clinic.city}</p></div></div><div className="pp-location-fact"><Clock3 size={20} /><div><span>Hours</span><p>{clinic.hours}</p></div></div><div className="pp-location-fact"><AlertTriangle size={20} /><div><span>Emergency</span><p>{emergencyInfo.note}</p></div></div></div><Link href="/location" className="lime-link">View map, hours & emergency info <ArrowUpRight size={15} /></Link></div><dl className="pp-hours-grid">{clinic.businessHours.map((entry) => <div key={entry.days}><dt>{entry.days}</dt><dd>{entry.hours}</dd></div>)}</dl></section>

    {/* 10. Final CTA */}
    <section className="fidelity-cta pp-reveal"><div><span className="fidelity-kicker fidelity-kicker-light">Paws+Pine Veterinary Clinic</span><h2>A better beginning<br />starts <em>here.</em></h2></div><div><p>Pick a time that works for you, and our online scheduler takes care of the rest.</p><BookingButton label="Book an Appointment" className="lime-cta" iconSize={17} /></div></section>
  </main>;
}
