/**
 * Reference-led electric-blue veterinary UI: sparse white navigation, graphic logo, and a single lime action.
 */
import { useState, type ReactNode } from "react";
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
  return <div className="neo-site"><header className="neo-header"><div className="neo-nav-wrap"><ClinicMark /><nav className="neo-desktop-nav" aria-label="Primary navigation">{navItems.map((item) => <Link key={item.href} href={item.href} className={location === item.href ? "neo-nav-link current" : "neo-nav-link"}>{item.label}</Link>)}</nav><span className="demo-microcopy">Fictional demo</span><Link href="/request" className="neo-header-cta">Request a visit <ArrowUpRight size={14} /></Link><Button variant="ghost" size="icon" className="neo-menu" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X size={22} /> : <Menu size={22} />}</Button></div>{open && <nav className="neo-mobile-nav" aria-label="Mobile navigation">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={location === item.href ? "neo-mobile-link current" : "neo-mobile-link"}>{item.label}<ArrowUpRight size={17} /></Link>)}</nav>}</header>{children}<footer className="neo-footer"><div className="neo-footer-top"><ClinicMark /><div><span>Fictional Tier 1 demo</span><p>No real appointments, medical advice, or data submissions.</p></div><div><span>Sample clinic</span><p>{clinic.address}<br />{clinic.city}</p></div><div><span>Request flow</span><p>Replace with approved contacts and a configured Google Sheets endpoint before launch.</p></div></div><div className="neo-footer-bottom"><span>© 2026 Paws+Pine Veterinary Clinic</span><span>Demo website · Tier 1</span></div></footer></div>;
}
