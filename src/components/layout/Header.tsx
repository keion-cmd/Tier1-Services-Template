"use client";

/**
 * Desktop nav (NavigationMenu w/ services flyout), mobile Sheet drawer, sticky-on-scroll
 * header, and scroll-to-top-on-route-change. Ported from the old SiteShell.tsx's header
 * half; the footer half now lives in Footer.tsx and the surrounding shell in layout.tsx.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Facebook, Instagram, Linkedin, Twitter, Youtube, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { BookingButton } from "@/components/BookingButton";
import { MegaMenuDesktop, MegaMenuMobile } from "@/components/nav/MegaMenu";
import { articles, clientStories, clinic, providers } from "@/lib/business-content";
import { locations } from "@/data/locations";
import { servicesMegaMenu, resourcesMegaMenu, locationsMegaMenu, type MegaMenuConfig } from "@/data/megaMenus";
import { cn, hasRealEntries } from "@/lib/utils";

// Data-backed nav items are dropped entirely (not just left as empty dropdowns) when their
// backing content array is empty, so a clone with e.g. no team members doesn't advertise a
// "Team" link to a blank page. Desktop nav, the mobile Sheet, and Footer's nav list all read
// this same already-filtered array, so there's nothing to keep in sync separately.
const allNavItems: { href: string; label: string; megaMenu?: MegaMenuConfig; visible?: boolean }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", megaMenu: servicesMegaMenu },
  { href: "/team", label: "Team", visible: hasRealEntries(providers, (p) => p.name) },
  { href: "/resources", label: "Resources", megaMenu: resourcesMegaMenu, visible: hasRealEntries(articles, (a) => a.title) },
  { href: "/proof", label: "Reviews" },
  {
    href: "/success-stories",
    label: "Client Stories",
    visible: hasRealEntries(clientStories, (s) => s.clientName),
  },
  { href: "/faq", label: "FAQ" },
  { href: "/new-clients", label: "New Clients" },
  { href: "/locations", label: "Locations", megaMenu: locationsMegaMenu, visible: hasRealEntries(locations, (l) => l.name) },
  { href: "/contact", label: "Contact" },
];

export const navItems = allNavItems.filter((item) => item.visible !== false);

// Routes that start with the full-bleed, dark-overlaid ImmersiveHero — the nav renders as a
// solid white pill floating with a gap inside the hero frame on these routes. Everything else
// (light PageHero pages, the plain get-started form, 404) keeps the original full-width sticky
// bar, unchanged.
const IMMERSIVE_HERO_PATHS = new Set([
  "/",
  "/about",
  "/services",
  "/team",
  "/proof",
  "/resources",
  "/contact",
  "/locations",
  "/faq",
  "/new-clients",
  "/success-stories",
]);
const IMMERSIVE_HERO_PREFIXES = ["/services/", "/team/", "/resources/", "/locations/"];

function pathHasImmersiveHero(pathname: string) {
  return IMMERSIVE_HERO_PATHS.has(pathname) || IMMERSIVE_HERO_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

// Real social links come from businessConfig (clinic.socialLinks). Icon lookup by label,
// falling back to a generic link glyph for any platform not in this short list.
const SOCIAL_ICONS: Record<string, typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  youtube: Youtube,
};

export function SocialIconLinks({ className }: { className?: string }) {
  if (clinic.socialLinks.length === 0) return null;
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {clinic.socialLinks.map((link) => {
        const Icon = SOCIAL_ICONS[link.label.toLowerCase()] ?? Link2;
        return (
          <Button
            key={link.label}
            asChild
            variant="outline"
            size="icon-circle"
            className="border-border/60"
          >
            <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
              <Icon size={14} />
            </a>
          </Button>
        );
      })}
    </div>
  );
}

export function ClinicMark({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center gap-2" aria-label={`${clinic.name} home`}>
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-dashed text-[7px] leading-none font-bold uppercase",
          dark ? "border-background/40 text-background/70" : "border-muted-foreground/40 text-muted-foreground"
        )}
        aria-hidden="true"
        title="[BUSINESS_LOGO]"
      >
        Logo
      </span>
      <span className="grid max-w-[9rem] min-w-0 leading-none xl:max-w-[7.5rem] 2xl:max-w-none">
        <strong
          className={cn(
            "truncate text-sm font-extrabold tracking-tight",
            dark ? "text-background" : "text-foreground"
          )}
        >
          {clinic.shortName}
        </strong>
        <small
          className={cn(
            "mt-0.5 truncate text-[10px] font-bold tracking-[0.15em] uppercase",
            dark ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {clinic.descriptor}
        </small>
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);

  const immersiveHero = pathHasImmersiveHero(pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMobileMenu(null);
  }, [pathname]);

  return (
    <>
      {/* Mobile sticky quick-actions bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-[var(--z-nav)] grid grid-cols-2 border-t border-border bg-card shadow-[0_-8px_24px_rgba(0,0,0,0.08)] xl:hidden"
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
          "z-50 border transition-[background-color,border-color,box-shadow] duration-300",
          // Immersive-hero pages: fixed and inset with a gap beyond ImmersiveHero's own
          // mx-3/mt-3 (sm:6, lg:8) frame margins, so the header reads as a solid white pill
          // floating inside the hero card rather than capping it. Non-immersive pages keep
          // the original full-width sticky bar (unchanged).
          immersiveHero
            ? "fixed top-6 right-3 left-3 rounded-full border-border/40 bg-background shadow-lg sm:top-9 sm:right-6 sm:left-6 lg:top-12 lg:right-8 lg:left-8"
            : "sticky top-0 w-full border-transparent border-b-border bg-background/90 backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex h-[var(--header-height-mobile)] max-w-7xl min-w-0 items-center justify-between gap-3 px-6 lg:h-[var(--header-height)] xl:gap-4 xl:px-5 2xl:max-w-[1440px] 2xl:px-8">
          <div className="shrink-0">
            <ClinicMark />
          </div>

          <NavigationMenu viewport={false} className="hidden min-w-0 max-w-none flex-1 justify-center xl:flex">
            <NavigationMenuList className="gap-0.5 2xl:gap-1.5">
              {navItems.map((item) =>
                item.megaMenu ? (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuTrigger
                      className={cn(
                        "whitespace-nowrap bg-transparent px-2 text-[11px] font-bold tracking-wide text-foreground uppercase 2xl:px-3 2xl:text-xs",
                        pathname === item.href && "text-primary"
                      )}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <MegaMenuDesktop config={item.megaMenu} />
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild data-active={pathname === item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "inline-flex h-9 items-center whitespace-nowrap rounded-full bg-transparent px-2 text-[11px] font-bold tracking-wide text-foreground uppercase hover:bg-accent 2xl:px-3 2xl:text-xs",
                          pathname === item.href && "text-primary"
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

          <div className="hidden shrink-0 items-center gap-3 xl:flex">
            <SocialIconLinks className="hidden 2xl:flex" />
            <BookingButton label="Book an Appointment" size="default" iconSize={14} />
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="xl:hidden"
                aria-label="Open menu"
              >
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
                  item.megaMenu ? (
                    <MegaMenuMobile
                      key={item.href}
                      label={item.label}
                      config={item.megaMenu}
                      open={openMobileMenu === item.href}
                      onOpenChange={(open) => setOpenMobileMenu(open ? item.href : null)}
                      active={pathname === item.href}
                    />
                  ) : (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-3 text-sm font-bold tracking-wide text-foreground uppercase hover:bg-accent",
                          pathname === item.href && "text-primary"
                        )}
                      >
                        <span>{item.label}</span>
                      </Link>
                    </SheetClose>
                  )
                )}
              </nav>
              <div className="flex flex-col gap-4 border-t border-border p-4">
                <BookingButton label="Book an Appointment" className="w-full justify-center" iconSize={16} />
                <SocialIconLinks className="justify-center" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
