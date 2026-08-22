/**
 * Hero-refinement reminder: the shell is a single floating editorial navigation system across all public routes.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assets, clinic } from "@/lib/clinic-content";

const navItems = [{ href: "/", label: "Home" }, { href: "/services", label: "Our services" }, { href: "/request", label: "Request a visit" }];

function ClinicMark() {
  return <Link href="/" className="neo-mark" aria-label="Paws and Pine home"><img src={assets.seal} alt="" aria-hidden="true" /><span><strong>Paws+Pine</strong><small>Veterinary Clinic</small></span></Link>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);

  useEffect(() => { const update = () => setScrolled(window.scrollY > 48); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  useEffect(() => { if (!open) return; const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); }; const originalOverflow = document.body.style.overflow; document.body.style.overflow = "hidden"; window.addEventListener("keydown", closeOnEscape); requestAnimationFrame(() => mobileMenuRef.current?.querySelector<HTMLElement>("a")?.focus()); return () => { document.body.style.overflow = originalOverflow; window.removeEventListener("keydown", closeOnEscape); menuButtonRef.current?.focus(); }; }, [open]);
  const closeMenu = () => setOpen(false);

  return <div className="neo-site"><header className={`neo-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-menu-open" : ""}`}><div className="neo-nav-wrap"><ClinicMark /><nav className="neo-desktop-nav" aria-label="Primary navigation">{navItems.map((item) => <Link key={item.href} href={item.href} className={location === item.href ? "neo-nav-link current" : "neo-nav-link"}>{item.label}</Link>)}</nav><Link href="/request" className="neo-header-cta">Request a visit <ArrowUpRight size={14} /></Link><Button ref={menuButtonRef} variant="ghost" size="icon" className="neo-menu" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="primary-mobile-menu">{open ? <X size={22} /> : <Menu size={22} />}</Button></div>{open && <nav ref={mobileMenuRef} id="primary-mobile-menu" className="neo-mobile-nav" aria-label="Mobile navigation">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={closeMenu} className={location === item.href ? "neo-mobile-link current" : "neo-mobile-link"}>{item.label}<ArrowUpRight size={20} /></Link>)}<Link href="/request" onClick={closeMenu} className="neo-mobile-cta">Request a visit <ArrowUpRight size={18} /></Link></nav>}</header>{children}<footer className="neo-footer"><div className="neo-footer-top"><div className="neo-footer-brand"><ClinicMark /><p>Clear service information, thoughtful conversations, and a practical next step for every pet parent.</p><Link href="/request" className="neo-footer-cta">Request a visit <ArrowUpRight size={14} /></Link></div><nav className="neo-footer-links" aria-label="Footer navigation"><span>Explore</span>{navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><div><span>Contact</span><p>{clinic.address}<br />{clinic.city}</p><a href={`mailto:${clinic.email}`}>{clinic.email}</a><span className="neo-footer-hours">{clinic.hours}</span></div><div><span>Request details</span><p>Requests are recorded for staff review. A request does not reserve a time or confirm a visit.</p><Link href="/request#request-privacy">Privacy & request handling</Link></div>{clinic.socialLinks.length > 0 && <nav className="neo-footer-links" aria-label="Social media"> <span>Social</span>{clinic.socialLinks.map((social) => <a key={social.href} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>)}</nav>}</div><div className="neo-footer-bottom"><span>Paws+Pine is a fictional veterinary concept created for demonstration.</span><span>© 2026 Paws+Pine Veterinary Clinic</span></div></footer></div>;
}
