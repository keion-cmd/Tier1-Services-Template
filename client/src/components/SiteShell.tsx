/**
 * Shared public navigation, footer, and the demo-only cancellation/contact policy presentation.
 */
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, ChevronDown, Mail, Menu, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BookingButton } from "@/components/BookingButton";
import { clinic, copy, services } from "@/lib/business-content";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/resources", label: "Resources" },
  { href: "/proof", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/new-clients", label: "New Clients" },
  { href: "/location", label: "Location" },
];

function ClinicMark({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center gap-2" aria-label={`${clinic.name} home`}>
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-dashed text-[7px] leading-none font-bold uppercase",
          dark ? "border-background/40 text-background/70" : "border-muted-foreground/40 text-muted-foreground"
        )}
        aria-hidden="true"
        title="[CLINIC_LOGO]"
      >
        Logo
      </span>
      <span className="grid leading-none">
        <strong className={cn("text-sm font-extrabold tracking-tight", dark ? "text-background" : "text-foreground")}>
          {clinic.shortName}
        </strong>
        <small
          className={cn(
            "mt-0.5 text-[10px] font-bold tracking-[0.15em] uppercase",
            dark ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {clinic.descriptor}
        </small>
      </span>
    </Link>
  );
}

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
          Cancellation & contact policy
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[min(620px,calc(100dvh-2rem))] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
            Demo policy
          </span>
          <DialogTitle className="text-2xl font-semibold tracking-tight">Cancellation & contact</DialogTitle>
          <DialogDescription>
            This fictional policy is a presentation placeholder. Replace it with the client-approved policy before
            launch.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pt-1">
          <section className="rounded-xl bg-muted p-4">
            <h3 className="mb-1.5 text-xs font-semibold tracking-wide text-primary uppercase">Booking changes</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Appointments are booked directly through our online scheduling tool. If plans need to change, please
              reschedule or cancel from your confirmation email, or contact the clinic as soon as possible.
            </p>
          </section>
          <section className="rounded-xl bg-muted p-4">
            <h3 className="mb-1.5 text-xs font-semibold tracking-wide text-primary uppercase">Contacting the clinic</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              For scheduling questions, rescheduling help, or urgent clarification, use the approved clinic phone or
              email shown on this website. The team will confirm the appropriate next step directly.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const routePath = location.split("#")[0];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [routePath]);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [routePath]);

  return (
    <div className="pb-16 lg:pb-0">
      {/* Mobile sticky quick-actions bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-card shadow-[0_-8px_24px_rgba(0,0,0,0.08)] lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        role="navigation"
        aria-label="Quick actions"
      >
        <a
          href={`tel:${clinic.phoneDigits}`}
          className="flex min-h-[var(--mobile-bar-height)] items-center justify-center gap-2 text-sm font-bold text-foreground"
        >
          <Phone size={16} /> Call Us
        </a>
        <BookingButton
          label="Book an Appointment"
          iconSize={16}
          className="min-h-[var(--mobile-bar-height)] w-full rounded-none border-l border-border/60"
        />
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-colors",
          scrolled ? "border-border bg-background/90 backdrop-blur-md" : "border-transparent bg-background"
        )}
      >
        <div className="mx-auto flex h-[var(--header-height-mobile)] max-w-7xl min-w-0 items-center justify-between gap-4 px-6 lg:h-[var(--header-height)] lg:px-8">
          <div className="shrink-0">
            <ClinicMark />
          </div>

          <NavigationMenu viewport={false} className="hidden min-w-0 max-w-none flex-1 justify-center lg:flex">
            <NavigationMenuList className="gap-1.5">
              {navItems.map((item) =>
                item.href === "/services" ? (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuTrigger
                      className={cn(
                        "whitespace-nowrap bg-transparent px-3 text-sm font-semibold",
                        location === item.href && "text-primary"
                      )}
                    >
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[280px] gap-1 p-1">
                        {services.map((service) => (
                          <li key={service.slug}>
                            <NavigationMenuLink asChild>
                              <Link href={`/services/${service.slug}`}>{service.title}</Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                        <li>
                          <NavigationMenuLink asChild>
                            <Link href="/services" className="flex items-center justify-between font-semibold text-primary">
                              View all services <ArrowUpRight size={14} />
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild data-active={location === item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "inline-flex h-9 items-center whitespace-nowrap rounded-md bg-transparent px-3 text-sm font-semibold text-foreground hover:bg-accent",
                          location === item.href && "text-primary"
                        )}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden shrink-0 lg:block">
            <BookingButton label="Book an Appointment" size="default" iconSize={14} />
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-sm">
              <SheetHeader className="border-b border-border p-4">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <ClinicMark />
              </SheetHeader>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4" aria-label="Mobile navigation">
                {navItems.map((item) =>
                  item.href === "/services" ? (
                    <Collapsible key={item.href} open={mobileServicesOpen} onOpenChange={setMobileServicesOpen}>
                      <CollapsibleTrigger
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-foreground hover:bg-accent",
                          location === item.href && "text-primary"
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          size={18}
                          className={cn("transition-transform", mobileServicesOpen && "rotate-180")}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="flex flex-col gap-1 py-1 pl-4">
                        {services.map((service) => (
                          <SheetClose asChild key={service.slug}>
                            <Link
                              href={`/services/${service.slug}`}
                              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                            >
                              {service.title}
                              <ArrowUpRight size={15} />
                            </Link>
                          </SheetClose>
                        ))}
                        <SheetClose asChild>
                          <Link
                            href="/services"
                            className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-primary"
                          >
                            View all services <ArrowUpRight size={15} />
                          </Link>
                        </SheetClose>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-foreground hover:bg-accent",
                          location === item.href && "text-primary"
                        )}
                      >
                        <span>{item.label}</span>
                      </Link>
                    </SheetClose>
                  )
                )}
              </nav>
              <div className="border-t border-border p-4">
                <BookingButton label="Book an Appointment" className="w-full justify-center" iconSize={16} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {children}

      <footer className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="flex flex-col gap-4 md:col-span-1">
              <ClinicMark dark />
              <p className="max-w-[240px] text-sm leading-relaxed text-background/70">{copy.siteShell.footerTagline}</p>
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
                rel="noreferrer"
                className="flex items-start gap-2 text-sm text-background/80 hover:text-primary-foreground"
              >
                <MapPin size={15} className="mt-0.5 shrink-0" />
                <span>
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
              <span className="max-w-[200px] text-xs leading-relaxed text-background/60">{clinic.hours}</span>
            </div>

            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold tracking-wide text-primary uppercase">Booking details</span>
              <p className="text-sm leading-relaxed text-background/70">{copy.siteShell.bookingDetailsText}</p>
              <PolicyDialog />
              <div className="mt-2 flex items-center gap-3">
                {clinic.socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
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

          <div className="flex flex-col gap-2 text-xs text-background/55 sm:flex-row sm:items-center sm:justify-between">
            <span>{clinic.name} is a customizable service-business template.</span>
            <span>© 2026 {clinic.name} {clinic.descriptor}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
