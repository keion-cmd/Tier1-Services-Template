import { clientConfig } from "./active-client";
import type { Article, Provider, Service } from "./schema";

export function getServiceBySlug(slug: string): Service | undefined {
  return clientConfig.services.find((service) => service.slug === slug);
}

export function getProviderBySlug(slug: string): Provider | undefined {
  return clientConfig.providers.find((provider) => provider.slug === slug);
}

/** Services a given provider offers, resolved from `Provider.relatedServiceSlugs`. */
export function getServicesByProvider(providerSlug: string): Service[] {
  const provider = getProviderBySlug(providerSlug);
  return (provider?.relatedServiceSlugs ?? [])
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is Service => Boolean(service));
}

/** Providers who offer a given service — the reverse of `Provider.relatedServiceSlugs`. */
export function getProvidersByService(serviceSlug: string): Provider[] {
  return clientConfig.providers.filter((provider) => (provider.relatedServiceSlugs ?? []).includes(serviceSlug));
}

export function getLocationBySlug(slug: string) {
  return clientConfig.locations.find((location) => location.slug === slug);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return clientConfig.resources.find((article) => article.slug === slug);
}

/**
 * The About page's staff grid, derived from `providers` (the same people shown on /team) rather
 * than a second, hand-maintained "people" dataset — a real client's team only has to be entered
 * once. `title` reuses each provider's `specialty` to match the field About's grid already renders.
 */
export const staff = clientConfig.providers.map((provider) => ({
  name: provider.name,
  title: provider.specialty,
  credentials: provider.credentials,
  bio: provider.bio,
  imageKey: provider.imageKey,
  placeholder: provider.placeholder,
}));

/**
 * Combines business.name + business.descriptor for display, but skips the descriptor when its
 * words are already substantially contained in the name (e.g. a business named "Nova Padel Club"
 * with descriptor "Padel Club" would otherwise render "Nova Padel Club Padel Club").
 */
export function getBusinessTagline(): string {
  const { name, descriptor } = clientConfig.business;
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  const nameWords = new Set(normalize(name));
  const descriptorWords = normalize(descriptor);
  const isRedundant = descriptorWords.length > 0 && descriptorWords.every((word) => nameWords.has(word));
  return isRedundant ? name : `${name} ${descriptor}`.trim();
}

export function buildBreadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${clientConfig.seo.siteOrigin}${crumb.path}`,
    })),
  };
}

export function buildLocalBusinessSchema() {
  const { business } = clientConfig;
  return {
    "@context": "https://schema.org",
    "@type": business.schemaType || "LocalBusiness",
    name: business.name,
    description: business.tagline,
    url: clientConfig.seo.siteOrigin,
    telephone: business.phone,
    email: business.email,
    address: { "@type": "PostalAddress", streetAddress: business.address, addressLocality: business.city },
    openingHoursSpecification: business.businessHours.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.hours.split("–")[0]?.trim(),
      closes: entry.hours.split("–")[1]?.trim(),
    })),
    sameAs: business.socialLinks.map((social) => social.href),
  };
}

export function buildFaqSchema(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  };
}

export function buildPersonSchema(provider: Provider) {
  const { business } = clientConfig;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: provider.name,
    jobTitle: provider.specialty,
    description: provider.bio,
    worksFor: { "@type": business.schemaType || "LocalBusiness", name: business.name },
  };
}

export function buildArticleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    articleSection: article.category,
    publisher: { "@type": "Organization", name: clientConfig.business.name },
  };
}
