import type { MetadataRoute } from "next";
import { SITE_ORIGIN, services, providers, articles } from "@/lib/business-content";
import { locations } from "@/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/about",
    "/services",
    "/team",
    "/resources",
    "/locations",
    "/proof",
    "/success-stories",
    "/faq",
    "/new-clients",
    "/contact",
  ];

  const dynamicPaths = [
    ...services.map((s) => `/services/${s.slug}`),
    ...providers.map((p) => `/team/${p.slug}`),
    ...articles.map((a) => `/resources/${a.slug}`),
    ...locations.map((l) => `/locations/${l.slug}`),
  ];

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: `${SITE_ORIGIN}${path}`,
    lastModified: new Date(),
  }));
}
