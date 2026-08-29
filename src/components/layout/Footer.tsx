/**
 * Site footer — nav links, contact/hours, booking-details dialog, cancellation-policy
 * dialog, social links. Ported from the old SiteShell.tsx's footer half. The
 * PolicyDialog uses shadcn Dialog (Radix, client-only), so this file needs "use client";
 * everything else here is static markup.
 */
"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookingButton } from "@/components/BookingButton";
import { ClinicMark, navItems } from "@/components/layout/Header";
import { clinic, copy } from "@/lib/business-content";

function FacebookIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={props.className}>
      <path
        d="M13.7 21v-8h2.8l.4-3h-3.2V8.1c0-.9.3-1.5 1.6-1.5H17V4a22 22 0 0 0-2.3-.1c-2.3 0-3.8 1.4-3.8 4V10H8.3v3H11v8h2.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={props.className}>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.6" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

function PolicyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="w-fit text-left text-sm text-background/70 underline underline-offset-4 transition-colors hover:text-primary-foreground"
        >
          {copy.siteShell.cancellationPolicyLinkLabel}
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[min(620px,calc(100dvh-2rem))] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
            {copy.siteShell.cancellationPolicyBadge}
          </span>
          <DialogTitle className="text-2xl font-semibold tracking-tight">{copy.siteShell.cancellationPolicyTitle}</DialogTitle>
          <DialogDescription>{copy.siteShell.cancellationPolicyDescription}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pt-1">
          <section className="rounded-xl bg-muted p-4">
            <h3 className="mb-1.5 text-xs font-semibold tracking-wide text-primary uppercase">{copy.siteShell.bookingChangesHeading}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{copy.siteShell.bookingChangesBody}</p>
          </section>
          <section className="rounded-xl bg-muted p-4">
            <h3 className="mb-1.5 text-xs font-semibold tracking-wide text-primary uppercase">{copy.siteShell.contactingClinicHeading}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{copy.siteShell.contactingClinicBody}</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-4 md:col-span-1">
            <ClinicMark dark />
            <p className="max-w-[240px] min-w-0 text-sm leading-relaxed break-words text-background/70">{copy.siteShell.footerTagline}</p>
            <BookingButton label="Book an Appointment" size="sm" iconSize={14} className="w-fit" />
          </div>

          <nav aria-label="Footer navigation" className="flex flex-col gap-2.5">
            <span className="text-xs font-semibold tracking-wide text-primary uppercase">Explore</span>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-fit text-sm text-background/80 transition-colors hover:text-primary-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-semibold tracking-wide text-primary uppercase">Contact</span>
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
            <span className="max-w-[200px] min-w-0 break-words text-xs leading-relaxed text-background/60">{clinic.hours}</span>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-semibold tracking-wide text-primary uppercase">Booking details</span>
            <p className="min-w-0 break-words text-sm leading-relaxed text-background/70">{copy.siteShell.bookingDetailsText}</p>
            <PolicyDialog />
            <div className="mt-2 flex items-center gap-3">
              {clinic.socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} placeholder profile`}
                  title={`${social.label} placeholder profile`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-background/25 text-background/80 transition-colors hover:border-primary hover:text-primary-foreground"
                >
                  {social.label === "Facebook" ? (
                    <FacebookIcon className="h-3.5 w-3.5" />
                  ) : (
                    <InstagramIcon className="h-3.5 w-3.5" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-background/15" />

        <div className="flex min-w-0 flex-col gap-2 text-xs text-background/55 sm:flex-row sm:items-center sm:justify-between">
          <span className="min-w-0 break-words">{clinic.name} is a customizable service-business template.</span>
          <span className="min-w-0 break-words">© 2026 {clinic.name} {clinic.descriptor}</span>
        </div>

        <div className="mt-4 text-xs text-background/40">
          Want a site like this for your business?{" "}
          <Link href="/get-started" className="underline underline-offset-4 hover:text-background/70">
            Get started
          </Link>
        </div>
      </div>
    </footer>
  );
}
