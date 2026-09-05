/**
 * Site footer — two-tier band structure: a slim top band (tagline, social
 * links, booking CTA) over a much larger band (oversized business-name
 * wordmark, grouped nav columns, contact block), then a bottom copyright bar.
 * Ported from the old SiteShell.tsx's footer half. The former inline
 * email-capture form now lives in NewsletterCTA.tsx as its own homepage
 * section. Still needs "use client": it imports `navItems`, a plain data
 * export from Header.tsx ("use client") — RSC only resolves that kind of
 * export correctly when the importer is also a client module.
 */
"use client";

import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BookingButton } from "@/components/BookingButton";
import { SocialIconLinks, navItems } from "@/components/layout/Header";
import { TemplateSelfPromo } from "@/components/layout/TemplateSelfPromo";
import { businessConfig, clinic, copy, getBusinessTagline } from "@/lib/business-content";

// Real navItems split across up to 3 columns (rather than one flat list) to
// match the reference's grouped-nav-columns pattern; no per-column titles
// since navItems carries no category/grouping field to label them by.
function chunk<T>(items: T[], columns: number): T[][] {
  const size = Math.ceil(items.length / columns);
  return Array.from({ length: columns }, (_, i) => items.slice(i * size, i * size + size)).filter((c) => c.length > 0);
}

export function Footer() {
  const navColumns = chunk(navItems, 3);

  return (
    <footer className="bg-foreground text-background">
      {/* Top band */}
      <div className="border-b border-background/10">
        <div className="mx-auto flex min-w-0 max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p className="max-w-md min-w-0 text-sm leading-relaxed break-words text-background/70">{copy.siteShell.footerTagline}</p>
          <div className="flex min-w-0 flex-wrap items-center gap-4">
            <span className="text-xs font-semibold tracking-wide text-[hsl(200,80%,55%)] uppercase">Follow us</span>
            <SocialIconLinks />
            <BookingButton label="Book an Appointment" size="sm" iconSize={14} className="w-fit" />
          </div>
        </div>
      </div>

      {/* Large band */}
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="flex min-w-0 flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <h2 className="font-heading min-w-0 max-w-full shrink basis-0 grow break-words text-[clamp(2rem,6vw,7rem)] leading-[0.95] font-black tracking-tight text-background lg:max-w-[55%]">
            {clinic.name}
          </h2>

          <div className="grid min-w-0 shrink-0 grid-cols-2 gap-8 sm:grid-cols-3 lg:w-auto lg:auto-cols-max lg:grid-flow-col">
            {navColumns.map((col, i) => (
              <nav key={i} aria-label="Footer navigation" className="flex min-w-0 flex-col gap-2.5">
                {col.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="w-fit text-sm text-background/80 transition-colors hover:text-primary-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            ))}

            <div className="flex min-w-0 flex-col gap-2.5">
              <span className="text-xs font-semibold tracking-wide text-[hsl(200,80%,55%)] uppercase">Contact</span>
              <a
                href={clinic.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-w-0 items-start gap-2 text-sm text-background/80 hover:text-primary-foreground"
              >
                <MapPin size={15} className="mt-0.5 shrink-0" />
                <span className="min-w-0 break-words">
                  {clinic.address}
                  <br />
                  {clinic.city}
                </span>
              </a>
              <a
                href={`tel:${clinic.phoneDigits}`}
                className="flex items-center gap-2 text-sm text-background/80 hover:text-primary-foreground"
              >
                <Phone size={15} /> {clinic.phone}
              </a>
              <a
                href={`mailto:${clinic.email}`}
                className="flex items-center gap-2 text-sm text-background/80 hover:text-primary-foreground"
              >
                <Mail size={15} /> {clinic.email}
              </a>
              <span className="flex min-w-0 items-start gap-2 text-xs leading-relaxed text-background/60">
                <Clock3 size={14} className="mt-0.5 shrink-0" />
                <span className="max-w-[200px] min-w-0 break-words">{clinic.hours}</span>
              </span>
            </div>
          </div>
        </div>

        {businessConfig.isTemplateDemo && (
          <>
            <Separator className="my-10 bg-background/15" />
            <TemplateSelfPromo />
          </>
        )}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="mx-auto flex min-w-0 max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-background/55 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span className="min-w-0 break-words">© 2026 {getBusinessTagline()}</span>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-background/80">
              Privacy Policy
            </Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/terms-and-conditions" className="underline underline-offset-4 hover:text-background/80">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
