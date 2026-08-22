/**
 * Companion Field Notes design reminder: an asymmetrical editorial welcome with structured warmth.
 */
import { Link } from "wouter";
import { ArrowDownRight, ArrowUpRight, CalendarDays, ClipboardPenLine, HeartHandshake, PawPrint, ShieldCheck, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageMeta } from "@/components/PageMeta";
import { assets, clinic, faqs, services } from "@/lib/clinic-content";

const principles = [
  { icon: HeartHandshake, title: "A conversation-first start", copy: "A clear way to tell a real clinic what has changed, what you have noticed, and where you need guidance." },
  { icon: ClipboardPenLine, title: "Details kept useful", copy: "Care pathways, contact details, and next steps are organized without guessing at policy or availability." },
  { icon: ShieldCheck, title: "Honest request patterns", copy: "A request is never presented as a confirmed appointment—and this demo does not submit data at all." },
];

export default function Home() {
  return (
    <main>
      <PageMeta title="Paws & Pine Veterinary Clinic — Fictional Tier 1 Demo" description="A fictional three-page Tier 1 veterinary clinic website demo with sample clinic content and a non-live visit request form." />
      <section className="hero-section">
        <div className="shell-width hero-layout">
          <div className="hero-copy">
            <div className="eyebrow"><PawPrint size={14} /> Fictional clinic demo · Cedarfield</div>
            <h1>A calmer way to begin <em>your pet’s care.</em></h1>
            <p className="hero-lead">Paws &amp; Pine is a warm, fictional clinic concept built to show how a Tier 1 website can make services, care conversations, and visit requests feel clear from the first click.</p>
            <div className="hero-actions"><Link href="/request" className="button button-pine">Request a visit <ArrowUpRight size={17} /></Link><Link href="/services" className="text-link">Explore care paths <ArrowDownRight size={17} /></Link></div>
            <div className="hero-note"><span className="note-number">01</span><p><strong>For a real clinic:</strong> replace every fictional detail with approved content, contacts, services, and form configuration.</p></div>
          </div>
          <figure className="hero-image"><img src={assets.hero} alt="Fictional veterinarian greeting a calm dog during a clinic visit" /><figcaption><span>Fictional clinic scene</span><span>— Paws &amp; Pine demo</span></figcaption></figure>
        </div>
      </section>

      <section className="care-note-section">
        <div className="shell-width care-note-layout">
          <div className="vertical-kicker">THE PAWS &amp; PINE APPROACH</div>
          <div className="care-note-copy"><span className="eyebrow">A note for pet people</span><h2>Useful context, <em>not a noisy maze.</em></h2><p>There is no substitute for a real clinical conversation. But a thoughtful website can help a pet owner arrive with better questions, clear contact options, and a more confident sense of what happens next.</p></div>
          <figure className="care-note-image"><img src={assets.catCare} alt="Fictional cat receiving a calm veterinary wellness check" /></figure>
        </div>
      </section>

      <section className="principles-section">
        <div className="shell-width section-heading split-heading"><div><span className="eyebrow">Care that reads clearly</span><h2>Made for the moment a pet owner thinks, <em>“I should ask.”</em></h2></div><p>Structured service information and a gentle conversion path make a small site feel considered rather than thin.</p></div>
        <div className="shell-width principle-grid">{principles.map(({ icon: Icon, title, copy }, index) => <article key={title} className="principle-card"><span className="principle-index">0{index + 1}</span><Icon size={24} strokeWidth={1.7} /><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="pathways-section">
        <div className="shell-width"><div className="section-heading pathways-heading"><div><span className="eyebrow eyebrow-light">Six sample care paths</span><h2>Give the next step <em>a little shape.</em></h2></div><Link href="/services" className="button button-cream">See all services <ArrowUpRight size={17} /></Link></div><div className="pathway-list">{services.slice(0, 4).map((service) => <Link key={service.title} href="/services" className="pathway-row"><span>{service.number}</span><h3>{service.title}</h3><p>{service.short}</p><ArrowUpRight size={19} /></Link>)}</div></div>
      </section>

      <section className="visit-preview-section">
        <div className="shell-width visit-preview-layout"><figure className="visit-image"><img src={assets.clinicDetail} alt="Fictional clinic consultation objects on a pale oak table" /></figure><div className="visit-copy"><span className="eyebrow"><CalendarDays size={14} /> A clear next conversation</span><h2>Tell us what’s changed. <em>We’ll help you choose the next step.</em></h2><p>This request pattern demonstrates the Tier 1 approach: pet owners share a small amount of approved information, the clinic receives the request, and follow-up remains human.</p><div className="demo-callout"><Sparkles size={17} /><p><strong>Demo note:</strong> the live version would require a provider-managed Google Sheets endpoint. This prototype does not collect or transmit your information.</p></div><Link href="/request" className="text-link">Open the request form <ArrowUpRight size={17} /></Link></div></div>
      </section>

      <section className="faq-section">
        <div className="shell-width faq-layout"><div className="faq-intro"><span className="eyebrow">Helpful notes</span><h2>Clear on what this <em>is—and isn’t.</em></h2><p>These optional in-page FAQs keep the Tier 1 site within its fixed three-page structure.</p></div><Accordion type="single" collapsible className="faq-list">{faqs.map((faq, index) => <AccordionItem value={`faq-${index}`} key={faq.question}><AccordionTrigger>{faq.question}</AccordionTrigger><AccordionContent>{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></div>
      </section>

      <section className="closing-section"><div className="shell-width closing-layout"><div><span className="eyebrow eyebrow-light">Paws &amp; Pine veterinary clinic</span><h2>A warm hello is a <em>good place to start.</em></h2></div><div><p>Explore the sample service structure, then see a transparent, non-live request experience designed for the Tier 1 package.</p><Link href="/request" className="button button-marigold">Begin a visit request <ArrowUpRight size={17} /></Link></div></div></section>
    </main>
  );
}
