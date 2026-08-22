/**
 * Companion Field Notes design reminder: navigation is calm, clear, and quietly editorial.
 */
import { useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assets, clinic } from "@/lib/clinic-content";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/request", label: "Request a visit" },
];

function ClinicMark() {
  return (
    <Link href="/" className="clinic-mark" aria-label="Paws and Pine home">
      <img src={assets.seal} alt="" aria-hidden="true" />
      <span><strong>Paws &amp; Pine</strong><small>Veterinary Clinic</small></span>
    </Link>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="site-shell">
      <div className="demo-banner" role="note">
        <span>Fictional Tier 1 website demo</span>
        <span aria-hidden="true">•</span>
        <span>No real appointments or data submission</span>
      </div>
      <header className="site-header">
        <div className="shell-width header-inner">
          <ClinicMark />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => <Link key={item.href} href={item.href} className={location === item.href ? "nav-link is-active" : "nav-link"}>{item.label}</Link>)}
          </nav>
          <Link href="/request" className="header-cta">Begin a request <ArrowUpRight size={15} /></Link>
          <Button variant="ghost" size="icon" className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>
        {open && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map((item) => <Link key={item.href} href={item.href} className={location === item.href ? "mobile-nav-link is-active" : "mobile-nav-link"} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={16} /></Link>)}
          </nav>
        )}
      </header>
      {children}
      <footer className="site-footer">
        <div className="shell-width footer-grid">
          <div className="footer-brand"><ClinicMark /><p>A fictional, content-complete demonstration of a three-page Tier 1 veterinary clinic website.</p></div>
          <div className="footer-note"><span className="footer-label">Sample clinic details</span><p>{clinic.address}<br />{clinic.city}</p><p>{clinic.hours}<br />{clinic.phone}</p></div>
          <div className="footer-note"><span className="footer-label">Demo boundary</span><p>This site does not provide medical advice, live availability, or real booking. Replace all content before production use.</p></div>
        </div>
        <div className="shell-width footer-bottom"><span>© 2026 Paws &amp; Pine · fictional demonstration</span><span>Built as a Tier 1 package example</span></div>
      </footer>
    </div>
  );
}
