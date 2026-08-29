/**
 * Site footer — nav links, contact/hours, booking-details dialog, cancellation-policy
 * dialog, social links. Ported from the old SiteShell.tsx's footer half. The
 * PolicyDialog uses shadcn Dialog (Radix, client-only), so this file needs "use client";
 * everything else here is static markup.
 */
"use client";

import { useId, useState, type FormEvent } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BookingButton } from "@/components/BookingButton";
import { ClinicMark, navItems } from "@/components/layout/Header";
import { clinic, copy } from "@/lib/business-content";
import { FOOTER_SIGNUP_ENDPOINT_URL } from "@/lib/footerSignup";

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
          className="w-fit min-w-0 break-words text-left text-sm text-background/70 underline underline-offset-4 transition-colors hover:text-primary-foreground"
        >
          {copy.siteShell.policyDetailsLinkLabel}
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[min(620px,calc(100dvh-2rem))] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
            {copy.siteShell.policyDetailsBadge}
          </span>
          <DialogTitle className="text-2xl font-semibold tracking-tight">{copy.siteShell.policyDetailsTitle}</DialogTitle>
          <DialogDescription>{copy.siteShell.policyDetailsDescription}</DialogDescription>
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

function FooterEmailCapture() {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const isConfigured =
    !!FOOTER_SIGNUP_ENDPOINT_URL && !FOOTER_SIGNUP_ENDPOINT_URL.includes("[") && !FOOTER_SIGNUP_ENDPOINT_URL.includes("]");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isConfigured) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      // Same fire-and-forget, opaque-response pattern as LeadGenForm.tsx — Apps Script
      // Web Apps don't return CORS headers, so `no-cors` is required and a resolved
      // fetch (no thrown network error) is the only success signal available.
      await fetch(FOOTER_SIGNUP_ENDPOINT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ email, source: "footer-email-capture", submittedAt: new Date().toISOString() }),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="text-sm text-background/80">{copy.siteShell.emailCaptureSuccessMessage}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-1 flex min-w-0 flex-col gap-2">
      <span className="text-xs font-semibold tracking-wide text-primary uppercase">{copy.siteShell.emailCaptureHeading}</span>
      <p className="min-w-0 break-words text-xs leading-relaxed text-background/60">{copy.siteShell.emailCaptureBody}</p>
      <div className="flex min-w-0 gap-2">
        <Label htmlFor={inputId} className="sr-only">
          Email address
        </Label>
        <Input
          id={inputId}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={copy.siteShell.emailCapturePlaceholder}
          className="min-w-0 flex-1 border-background/25 bg-background/10 text-background placeholder:text-background/50"
        />
        <Button type="submit" size="sm" variant="secondary" disabled={status === "submitting"} className="w-fit shrink-0">
          {copy.siteShell.emailCaptureSubmitButton}
        </Button>
      </div>
      {status === "error" && (
        <p className="text-xs text-destructive-foreground/80">
          {isConfigured ? "Something went wrong. Please try again." : "Signup is not yet configured."}
        </p>
      )}
    </form>
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
            <FooterEmailCapture />
          </div>

          <div className="flex min-w-0 flex-col gap-2.5">
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
