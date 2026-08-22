/**
 * Shared public navigation, footer, and the demo-only cancellation/contact policy presentation.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { assets, clinic } from "@/lib/clinic-content";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our services" },
  { href: "/location", label: "Clinic location", benefit: "Free" },
  { href: "/request", label: "Request a visit" },
];

function ClinicMark() {
  return <Link href="/" className="neo-mark" aria-label={`${clinic.name} ${clinic.descriptor} home`}><img src={assets.seal} alt="" aria-hidden="true" /><span><strong>{clinic.name}</strong><small>{clinic.descriptor}</small></span></Link>;
}

function FacebookIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 21v-8h2.8l.4-3h-3.2V8.1c0-.9.3-1.5 1.6-1.5H17V4a22 22 0 0 0-2.3-.1c-2.3 0-3.8 1.4-3.8 4V10H8.3v3H11v8h2.7Z" fill="currentColor" /></svg>;
}

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.6" cy="6.6" r="1.1" fill="currentColor" /></svg>;
}

function PolicyDialog() {
  return <Dialog><DialogTrigger asChild><button type="button" className="neo-policy-trigger">Cancellation & contact policy</button></DialogTrigger><DialogContent className="pp-policy-dialog"><DialogHeader><span className="pp-page-eyebrow">Demo policy</span><DialogTitle>Cancellation & contact</DialogTitle><DialogDescription>This fictional policy is a presentation placeholder. Replace it with the client-approved policy before launch.</DialogDescription></DialogHeader><div className="pp-policy-content"><section><h3>Booking changes</h3><p>A visit request is not an appointment confirmation. Once the clinic confirms a visit directly, the pet parent should contact the clinic as soon as possible if plans need to change.</p></section><section><h3>Contacting the clinic</h3><p>For request follow-up, rescheduling questions, or urgent clarification, use the approved clinic phone or email shown on this website. The team will confirm the appropriate next step directly.</p></section><section><h3>Request information</h3><p>Details submitted through the request form are recorded for secure staff review. The public request flow does not guarantee availability, reserve a time, or replace direct clinic guidance.</p></section></div></DialogContent></Dialog>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    requestAnimationFrame(() => mobileMenuRef.current?.querySelector<HTMLElement>("a")?.focus());
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      menuButtonRef.current?.focus();
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return <div className="neo-site"><header className={`neo-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-menu-open" : ""}`}><div className="neo-nav-wrap"><ClinicMark /><nav className="neo-desktop-nav" aria-label="Primary navigation">{navItems.map((item) => <Link key={item.href} href={item.href} className={location === item.href ? "neo-nav-link current" : "neo-nav-link"}><span>{item.label}</span>{item.benefit && <small className="neo-nav-benefit">{item.benefit}</small>}</Link>)}</nav><Link href="/request" className="neo-header-cta">Request a visit <ArrowUpRight size={14} /></Link><Button ref={menuButtonRef} variant="ghost" size="icon" className="neo-menu" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="primary-mobile-menu">{open ? <X size={22} /> : <Menu size={22} />}</Button></div>{open && <nav ref={mobileMenuRef} id="primary-mobile-menu" className="neo-mobile-nav" aria-label="Mobile navigation">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={closeMenu} className={location === item.href ? "neo-mobile-link current" : "neo-mobile-link"}><span>{item.label}</span>{item.benefit && <small className="neo-mobile-benefit">Complimentary page</small>}<ArrowUpRight size={20} /></Link>)}<Link href="/request" onClick={closeMenu} className="neo-mobile-cta">Request a visit <ArrowUpRight size={18} /></Link></nav>}</header>{children}<footer className="neo-footer"><div className="neo-footer-top"><div className="neo-footer-brand"><ClinicMark /><p>Clear service information, thoughtful conversations, and a practical next step for every pet parent.</p><Link href="/request" className="neo-footer-cta">Request a visit <ArrowUpRight size={14} /></Link></div><nav className="neo-footer-links" aria-label="Footer navigation"><span>Explore</span>{navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}{item.benefit && <small className="neo-footer-benefit"> {item.benefit}</small>}</Link>)}</nav><div><span>Contact</span><p>{clinic.address}<br />{clinic.city}</p><p className="neo-footer-contact-placeholder">{clinic.phone}<br />{clinic.email}</p><span className="neo-footer-hours">{clinic.hours}</span></div><div><span>Request details</span><p>Requests are recorded for staff review. A request does not reserve a time or confirm a visit.</p><Link href="/request#request-privacy">Privacy & request handling</Link><PolicyDialog /></div><nav className="neo-footer-links neo-footer-socials" aria-label="Social media"><span>Social</span>{clinic.socialLinks.map((social) => <a key={social.href} href={social.href} target="_blank" rel="noreferrer" aria-label={`${social.label} placeholder profile`} title={`${social.label} placeholder profile`}><span className="neo-social-icon">{social.label === "Facebook" ? <FacebookIcon /> : <InstagramIcon />}</span><span>{social.label}</span>{social.placeholder && <small>Placeholder</small>}</a>)}</nav></div><div className="neo-footer-bottom"><span>Website setup for Hayop Kalinga Veterinary Clinic.</span><span>© 2026 {clinic.name} {clinic.descriptor}</span></div></footer></div>;
}
