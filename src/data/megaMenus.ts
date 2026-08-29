// Nav mega-menu config — generated from existing content arrays (services, articles) rather
// than hand-duplicated, so desktop and mobile nav always reflect the same underlying data.
import { services, articles } from "@/lib/business-content";
import { locations } from "@/data/locations";

export interface MegaMenuItem {
  title: string;
  href: string;
}

export interface MegaMenuCategory {
  title: string;
  items: MegaMenuItem[];
}

export interface MegaMenuConfig {
  categories: MegaMenuCategory[];
  viewAllHref: string;
  viewAllLabel: string;
}

function groupBy<T>(items: readonly T[], key: (item: T) => string): Map<string, T[]> {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const k = key(item);
    const existing = groups.get(k);
    if (existing) existing.push(item);
    else groups.set(k, [item]);
  }
  return groups;
}

export const servicesMegaMenu: MegaMenuConfig = {
  categories: Array.from(groupBy(services, (s) => s.category)).map(([category, items]) => ({
    title: category,
    items: items.map((s) => ({ title: s.title, href: `/services/${s.slug}` })),
  })),
  viewAllHref: "/services",
  viewAllLabel: "View all services",
};

export const resourcesMegaMenu: MegaMenuConfig = {
  categories: Array.from(groupBy(articles, (a) => a.category)).map(([category, items]) => ({
    title: category,
    items: items.map((a) => ({ title: a.title, href: `/resources/${a.slug}` })),
  })),
  viewAllHref: "/resources",
  viewAllLabel: "View all resources",
};

export const locationsMegaMenu: MegaMenuConfig = {
  categories: Array.from(groupBy(locations, (l) => l.city)).map(([city, items]) => ({
    title: city,
    items: items.map((l) => ({ title: l.name, href: `/locations/${l.slug}` })),
  })),
  viewAllHref: "/locations",
  viewAllLabel: "View all locations",
};
