import { clientConfig } from "./active-client";
import type { Article, Location, Provider, Service } from "./schema";
import { isPlaceholderToken } from "@/lib/utils";

/**
 * Shared by buildLocalBusinessSchema/buildLocationSchema: drops placeholder and "Closed" rows,
 * since schema.org expects closed days omitted from openingHoursSpecification rather than
 * included with empty/garbage opens-closes values.
 */
function buildOpeningHours(businessHours: { days: string; hours: string }[]) {
  return businessHours
    .filter((entry) => !isPlaceholderToken(entry.days) && !isPlaceholderToken(entry.hours) && entry.hours.trim().toLowerCase() !== "closed")
    .map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days,
      opens: entry.hours.split("–")[0]?.trim(),
      closes: entry.hours.split("–")[1]?.trim(),
    }));
}

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

/**
 * Returns null when the business's core identity is still unfilled placeholder tokens, so an
 * un-cloned template doesn't ship LocalBusiness JSON-LD full of literal `[BUSINESS_NAME]` strings.
 * Individual contact fields (phone/email/address) are each omitted rather than failing the whole
 * schema, since a real client might legitimately still be missing one of them.
 */
export function buildLocalBusinessSchema() {
  const { business } = clientConfig;
  if (isPlaceholderToken(business.name)) return null;

  const hasAddress = !isPlaceholderToken(business.address) && !isPlaceholderToken(business.city);
  const openingHoursSpecification = buildOpeningHours(business.businessHours);

  return {
    "@context": "https://schema.org",
    "@type": business.schemaType || "LocalBusiness",
    name: business.name,
    description: isPlaceholderToken(business.tagline) ? undefined : business.tagline,
    url: clientConfig.seo.siteOrigin,
    telephone: isPlaceholderToken(business.phone) ? undefined : business.phone,
    email: isPlaceholderToken(business.email) ? undefined : business.email,
    address: hasAddress
      ? { "@type": "PostalAddress", streetAddress: business.address, addressLocality: business.city }
      : undefined,
    openingHoursSpecification: openingHoursSpecification.length > 0 ? openingHoursSpecification : undefined,
    sameAs: business.socialLinks.map((social) => social.href),
  };
}

/** Returns null when every FAQ item is still an unfilled placeholder, so no hollow FAQPage schema ships. */
export function buildFaqSchema(items: readonly { question: string; answer: string }[]) {
  const realItems = items.filter((item) => !isPlaceholderToken(item.question) && !isPlaceholderToken(item.answer));
  if (realItems.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: realItems.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  };
}

/** Returns null for a still-placeholder provider (e.g. an un-cloned template's demo team member). */
export function buildPersonSchema(provider: Provider) {
  const { business } = clientConfig;
  if (isPlaceholderToken(provider.name)) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: provider.name,
    jobTitle: provider.specialty,
    description: provider.bio,
    worksFor: { "@type": business.schemaType || "LocalBusiness", name: business.name },
  };
}

/**
 * AggregateRating + individual Review nodes for /proof, built from real (non-placeholder)
 * testimonials only. Returns null for a client with no real reviews yet, so the page can skip
 * emitting the tag entirely instead of publishing a hollow/zero-review schema.
 */
export function buildReviewSchema() {
  const { business } = clientConfig;
  const realReviews = clientConfig.testimonials.filter((review) => !isPlaceholderToken(review.quote));
  if (realReviews.length === 0) return null;

  const average = realReviews.reduce((sum, review) => sum + review.rating, 0) / realReviews.length;

  return {
    "@context": "https://schema.org",
    "@type": business.schemaType || "LocalBusiness",
    name: business.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(average.toFixed(1)),
      reviewCount: realReviews.length,
    },
    review: realReviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.author },
      reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5 },
      reviewBody: review.quote,
    })),
  };
}

/**
 * LocalBusiness schema for a single /locations/[slug] page — distinct from
 * buildLocalBusinessSchema (the business as a whole), since a multi-location client's individual
 * branches have their own address/phone/hours. Returns null for a still-placeholder location.
 */
export function buildLocationSchema(location: Location) {
  const { business } = clientConfig;
  if (isPlaceholderToken(location.name)) return null;

  const hasAddress = !isPlaceholderToken(location.address) && !isPlaceholderToken(location.city);
  const openingHoursSpecification = buildOpeningHours(location.businessHours);

  return {
    "@context": "https://schema.org",
    "@type": business.schemaType || "LocalBusiness",
    name: location.name,
    description: isPlaceholderToken(location.description) ? undefined : location.description,
    telephone: isPlaceholderToken(location.phone) ? undefined : location.phone,
    email: isPlaceholderToken(location.email) ? undefined : location.email,
    address: hasAddress
      ? { "@type": "PostalAddress", streetAddress: location.address, addressLocality: location.city }
      : undefined,
    hasMap: isPlaceholderToken(location.mapsUrl) ? undefined : location.mapsUrl,
    openingHoursSpecification: openingHoursSpecification.length > 0 ? openingHoursSpecification : undefined,
  };
}

/** Returns null for a still-placeholder article (e.g. an un-cloned template's demo resource). */
export function buildArticleSchema(article: Article) {
  if (isPlaceholderToken(article.title)) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: isPlaceholderToken(article.date) ? undefined : article.date,
    articleSection: article.category,
    author: isPlaceholderToken(article.author) ? undefined : { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: clientConfig.business.name },
  };
}
