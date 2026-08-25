/**
 * Shared public navigation, footer, and the demo-only cancellation/contact policy presentation.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BookingButton } from "@/components/BookingButton";
import { assets, clinic, services } from "@/lib/clinic-content";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Our services" },
  { href: "/team", label: "Meet the Vets" },
  { href: "/resources", label: "Resources" },
  { href: "/proof", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/new-clients", label: "New Clients" },
  { href: "/location", label: "Clinic location", benefit: "Free" },
];

function ClinicMark() {
  return <Link href="/" className="neo-mark" aria-label="Paws and Pine home"><img src={assets.seal} alt="" aria-hidden="true" /><span><strong>Paws+Pine</strong><small>Veterinary Clinic</small></span></Link>;
}

function FacebookIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 21v-8h2.8l.4-3h-3.2V8.1c0-.9.3-1.5 1.6-1.5H17V4a22 22 0 0 0-2.3-.1c-2.3 0-3.8 1.4-3.8 4V10H8.3v3H11v8h2.7Z" fill="currentColor" /></svg>;
}

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.6" cy="6.6" r="1.1" fill="currentColor" /></svg>;
}

function PolicyDialog() {
  return <Dialog><DialogTrigger asChild><button type="button" className="neo-policy-trigger">Cancellation & contact policy</button></DialogTrigger><DialogContent className="pp-policy-dialog"><DialogHeader><span className="pp-page-eyebrow">Demo policy</span><DialogTitle>Cancellation & contact</DialogTitle><DialogDescription>This fictional policy is a presentation placeholder. Replace it with the client-approved policy before launch.</DialogDescription></DialogHeader><div className="pp-policy-content"><section><h3>Booking changes</h3><p>Appointments are booked directly through our online scheduling tool. If plans need to change, please reschedule or cancel from your confirmation email, or contact the clinic as soon as possible.</p></section><section><h3>Contacting the clinic</h3><p>For scheduling questions, rescheduling help, or urgent clarification, use the approved clinic phone or email shown on this website. The team will confirm the appropriate next step directly.</p></section></div></DialogContent></Dialog>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const routePath = location.split("#")[0];

  useEffect(() => {
    const frame = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
    return () => cancelAnimationFrame(frame);
  }, [routePath]);

  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(".pp-reveal"));
    if (!revealTargets.length) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.classList.add("is-revealed"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    const frame = requestAnimationFrame(() => revealTargets.forEach((target, index) => {
      target.style.setProperty("--pp-reveal-delay", `${Math.min(index % 3, 2) * 70}ms`);
      observer.observe(target);
    }));
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [location]);

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

  const closeMenu = () => { setOpen(false); setMobileServicesOpen(false); };

  return <div className="neo-site">{!open && <div className="neo-mobile-sticky-bar" role="navigation" aria-label="Quick actions"><a href={`tel:${clinic.phoneDigits}`} className="neo-mobile-sticky-call"><Phone size={16} /> Call Us</a><BookingButton label="Book an Appointment" className="neo-mobile-sticky-request" iconSize={16} /></div>}<header className={`neo-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-menu-open" : ""}`}><div className="neo-nav-wrap"><ClinicMark /><nav className="neo-desktop-nav" aria-label="Primary navigation">{navItems.map((item) => item.href === "/services" ? <DropdownMenu key={item.href}><DropdownMenuTrigger className={`neo-nav-link neo-nav-dropdown-trigger ${location === item.href ? "current" : ""}`}><span>{item.label}</span><ChevronDown size={14} aria-hidden="true" /></DropdownMenuTrigger><DropdownMenuContent align="start" className="neo-nav-dropdown-content">{services.map((service) => <DropdownMenuItem key={service.slug} asChild><Link href={`/services/${service.slug}`}>{service.title}</Link></DropdownMenuItem>)}<DropdownMenuSeparator /><DropdownMenuItem asChild><Link href="/services" className="neo-nav-dropdown-viewall">View all services <ArrowUpRight size={14} /></Link></DropdownMenuItem></DropdownMenuContent></DropdownMenu> : <Link key={item.href} href={item.href} className={location === item.href ? "neo-nav-link current" : "neo-nav-link"}><span>{item.label}</span></Link>)}</nav><BookingButton label="Book an Appointment" className="neo-header-cta" iconSize={14} /><Button ref={menuButtonRef} variant="ghost" size="icon" className="neo-menu" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="primary-mobile-menu">{open ? <X size={22} /> : <Menu size={22} />}</Button></div>{open && <nav ref={mobileMenuRef} id="primary-mobile-menu" className="neo-mobile-nav" aria-label="Mobile navigation">{navItems.map((item) => item.href === "/services" ? <Collapsible key={item.href} open={mobileServicesOpen} onOpenChange={setMobileServicesOpen} className="neo-mobile-accordion"><CollapsibleTrigger className={`neo-mobile-link neo-mobile-accordion-trigger ${location === item.href ? "current" : ""}`}><span>{item.label}</span><ChevronDown size={20} className={mobileServicesOpen ? "neo-mobile-accordion-chevron is-open" : "neo-mobile-accordion-chevron"} /></CollapsibleTrigger><CollapsibleContent className="neo-mobile-accordion-content">{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} onClick={closeMenu} className="neo-mobile-accordion-link"><span>{service.title}</span><ArrowUpRight size={16} /></Link>)}<Link href="/services" onClick={closeMenu} className="neo-mobile-accordion-link neo-mobile-accordion-viewall"><span>View all services</span><ArrowUpRight size={16} /></Link></CollapsibleContent></Collapsible> : <Link key={item.href} href={item.href} onClick={closeMenu} className={location === item.href ? "neo-mobile-link current" : "neo-mobile-link"}><span>{item.label}</span><ArrowUpRight size={20} /></Link>)}<BookingButton label="Book an Appointment" onClick={closeMenu} className="neo-mobile-cta" iconSize={18} /></nav>}</header>{children}<footer className="neo-footer"><div className="neo-footer-top"><div className="neo-footer-brand"><ClinicMark /><p>Clear service information, thoughtful conversations, and a practical next step for every pet parent.</p><BookingButton label="Book an Appointment" className="neo-footer-cta" iconSize={14} /></div><nav className="neo-footer-links" aria-label="Footer navigation"><span>Explore</span>{navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}{item.benefit && <small className="neo-footer-benefit"> {item.benefit}</small>}</Link>)}</nav><div><span>Contact</span><p><a href={clinic.mapsUrl} target="_blank" rel="noreferrer">{clinic.address}<br />{clinic.city}</a></p><a href={`tel:${clinic.phoneDigits}`}>{clinic.phone}</a><a href={`mailto:${clinic.email}`}>{clinic.email}</a><span className="neo-footer-hours">{clinic.hours}</span></div><div><span>Booking details</span><p>Appointments are booked directly through our online scheduling tool, which handles confirmation and reminders.</p><PolicyDialog /></div><nav className="neo-footer-links neo-footer-socials" aria-label="Social media"><span>Social</span>{clinic.socialLinks.map((social) => <a key={social.href} href={social.href} target="_blank" rel="noreferrer" aria-label={`${social.label} placeholder profile`} title={`${social.label} placeholder profile`}><span className="neo-social-icon">{social.label === "Facebook" ? <FacebookIcon /> : <InstagramIcon />}</span><span>{social.label}</span>{social.placeholder && <small>Placeholder</small>}</a>)}</nav></div><div className="neo-footer-bottom"><span>Paws+Pine is a fictional veterinary concept created for demonstration.</span><span>© 2026 Paws+Pine Veterinary Clinic</span></div></footer></div>;
}
