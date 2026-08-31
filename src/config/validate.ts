import type { ClientConfig } from "./schema";

function findDuplicates(slugs: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const slug of slugs) {
    if (seen.has(slug)) duplicates.add(slug);
    seen.add(slug);
  }
  return [...duplicates];
}

/**
 * Development-time structural check for a client config: duplicate slugs and dangling
 * cross-references (a `relatedServiceSlugs`/`serviceSlug`/`serviceSlugs`/`providerSlugs`
 * field that points at a slug which doesn't exist). Throws with every problem found rather
 * than failing on the first one, so a bad config only needs one fix-and-rerun cycle.
 */
export function validateClientConfig(config: ClientConfig, clientId: string): void {
  const errors: string[] = [];

  const serviceSlugs = new Set(config.services.map((s) => s.slug));
  const providerSlugs = new Set(config.providers.map((p) => p.slug));
  const locationSlugs = new Set(config.locations.map((l) => l.slug));

  for (const [label, slugs] of [
    ["service", config.services.map((s) => s.slug)],
    ["provider", config.providers.map((p) => p.slug)],
    ["location", config.locations.map((l) => l.slug)],
  ] as const) {
    const dupes = findDuplicates(slugs);
    if (dupes.length > 0) errors.push(`Duplicate ${label} slug(s): ${dupes.join(", ")}`);
  }

  const checkServiceRef = (source: string, slug: string | undefined) => {
    if (slug && !serviceSlugs.has(slug)) errors.push(`${source} references unknown service slug "${slug}"`);
  };
  const checkServiceRefs = (source: string, slugs: string[] | undefined) => {
    (slugs ?? []).forEach((slug) => checkServiceRef(source, slug));
  };
  const checkProviderRefs = (source: string, slugs: string[] | undefined) => {
    (slugs ?? []).forEach((slug) => {
      if (!providerSlugs.has(slug)) errors.push(`${source} references unknown provider slug "${slug}"`);
    });
  };

  config.providers.forEach((p) => checkServiceRefs(`provider "${p.slug}"`, p.relatedServiceSlugs));
  config.locations.forEach((l) => {
    checkServiceRefs(`location "${l.slug}"`, l.serviceSlugs);
    checkProviderRefs(`location "${l.slug}"`, l.providerSlugs);
  });
  config.testimonials.forEach((t, i) => checkServiceRef(`testimonial #${i + 1}`, t.serviceSlug));
  config.stories.forEach((s, i) => checkServiceRef(`story #${i + 1}`, s.serviceSlug));
  config.resources.forEach((a) => checkServiceRefs(`article "${a.slug}"`, a.relatedServiceSlugs));
  config.faqs.forEach((f, i) => checkServiceRef(`faq #${i + 1}`, f.serviceSlug));

  // locationSlugs is currently unreferenced by anything else in the schema, but kept validated
  // (duplicate check above) so a future cross-link (e.g. article -> location) has somewhere to plug in.
  void locationSlugs;

  if (errors.length > 0) {
    throw new Error(
      `Client config "${clientId}" failed validation:\n` + errors.map((e) => `  - ${e}`).join("\n")
    );
  }
}
