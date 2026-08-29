// Nav mega-menu config — generated from existing content arrays (services, articles) rather
// than hand-duplicated, so desktop and mobile nav always reflect the same underlying data.
// Rendered as a flat single-column list (no category grouping) under one eyebrow label.
import { services, articles } from "@/lib/business-content";
import { locations } from "@/data/locations";

export interface MegaMenuItem {
  title: string;
  href: string;
}

export interface MegaMenuConfig {
  eyebrow: string;
  items: MegaMenuItem[];
  viewAllHref: string;
  viewAllLabel: string;
}

export const servicesMegaMenu: MegaMenuConfig = {
  eyebrow: "Our Services",
  items: services.map((s) => ({ title: s.title, href: `/services/${s.slug}` })),
  viewAllHref: "/services",
  viewAllLabel: "View all services",
};

export const resourcesMegaMenu: MegaMenuConfig = {
  eyebrow: "Resources",
  items: articles.map((a) => ({ title: a.title, href: `/resources/${a.slug}` })),
  viewAllHref: "/resources",
  viewAllLabel: "View all resources",
};

export const locationsMegaMenu: MegaMenuConfig = {
  eyebrow: "Locations",
  items: locations.map((l) => ({ title: l.name, href: `/locations/${l.slug}` })),
  viewAllHref: "/locations",
  viewAllLabel: "View all locations",
};
