# Tier1 Phase 6 — Content Architecture Audit

Scope: audit only, no code changes. Goal: determine whether the current content model can absorb a detailed, variable-depth client business dataset and distribute it intelligently across the site, without developers hand-rewriting pages per client.

All facts below are verified against the current repo state (`src/lib/business-content.ts`, `src/data/locations.ts`, `src/data/insurance.ts`, `src/data/megaMenus.ts`, `src/lib/industryBrands.ts`, and every page/component file).

---

## 1. Current content model

There is **one** central file, `src/lib/business-content.ts` (1031 lines), that owns almost all business data as a flat set of exported consts/types. Three satellite files exist: `src/data/locations.ts` (Location model), `src/data/insurance.ts` (insurance list), `src/lib/industryBrands.ts` (logo-only brand list). `src/data/megaMenus.ts` is derived, not primary.

There is no schema layer, no CMS, no per-entity file, no validation. Everything is a hardcoded TypeScript literal. "Cloning" today means manually editing this one file plus `locations.ts` and replacing every `[TOKEN]` placeholder by hand.

Collections that exist today, each as an untyped or lightly-typed inline array:

- `businessConfig` / `clinic` — one global business-identity object (singular, not a collection)
- `services: Service[]` — 9 items, typed
- `locations: Location[]` — 2 items, typed (separate file)
- `providers: Provider[]` — 4 items, derived type (Team page people)
- `staff` — 4 items, untyped inline array (About page people — **separate from `providers`**)
- `faqs: Faq[]` — 8 items, typed
- `articles: Article[]` (aka Resources) — 4 items, derived type
- `marqueeReviews` — 5 items, untyped
- `clientStories` — 3 items, untyped (Success Stories)
- `insuranceProviders` — 8 items, typed (separate file)
- assorted small fixed-shape arrays: `trustStats`, `differentiators`, `howItWorks`, `healthResources`, `carePlans`, `aboutValues`, `clinicExperienceFeatures`, `logoMarquees`, `industryBrands`, `proofCareStats`, `proofPageStories`, `serviceChoiceSteps`, `newClientSteps`, `whatToBring`
- `copy` — a giant nested object of page-level marketing microcopy (not structured business data)
- `sectionVisibility` — 17 boolean flags, page-section granularity only

---

## 2. Current fields (verbatim shapes)

**`Service`**
```ts
type Service = {
  number: string; slug: string; title: string; short: string; detail: string; category: string;
  benefits: string[];
  process: { step: string; title: string; description: string }[];
  duration: string; imageKey: string;
  bestFor?: string[];
};
```

**`Location`**
```ts
interface Location {
  slug: string; name: string; address: string; city: string; phone: string; phoneDigits: string;
  email: string; mapsUrl: string; landmark: string; description: string;
  servicesOffered: string[];   // free-text names, not slugs
  businessHours: { days: string; hours: string }[];
  imageKey: string;
  accessNotes?: string;
}
```

**`Provider`** (Team page)
```ts
{ slug: string; name: string; credentials: string; specialty: string; bio: string;
  fullBio?: string; yearsExperience: number; areasOfInterest: string[]; imageKey: string;
  relatedServiceSlugs?: string[]; placeholder: boolean }
```

**`staff`** (About page — different shape, different people set)
```ts
{ name: string; title: string; credentials: string; bio: string; imageKey: string; placeholder: boolean }
```

**`Article`**
```ts
{ slug: string; title: string; category: string; author: string; date: string; readingTime: string;
  excerpt: string; body: string[]; imageKey: string; disclaimer: boolean; relatedServiceSlugs?: string[] }
```

**`Faq`**
```ts
type Faq = { question: string; answer: string; category: string; serviceSlug?: string };
```

**`marqueeReviews` item**
```ts
{ author: string; segment: string; quote: string; rating: number; service?: string }
```

**`clientStories` item**
```ts
{ clientName: string; segment: string; category: string; story: string; imageKey: string }
```

**`businessConfig`**
```ts
{ bookingMode, isTemplateDemo, name, shortName, tagline, descriptor, schemaType,
  address, city, phone, phoneDigits, email, hours, googleReviewUrl, mapsUrl,
  businessHours: {days, hours}[], socialLinks: {label, href, placeholder}[] }
```

---

## 3. Missing fields

Against the target model in the Phase 6 brief, the following are absent from the current schema entirely:

**Business-level:** legal/entity name, founding date/years-in-business as data (currently only free `trustStats` strings), mission, vision, values-as-structured-object (only `aboutValues` title/copy pairs), differentiators are present but shallow, history/story as structured milestones, awards/credentials as a collection, statistics beyond the single `trustStats` array, multiple locations under one brand vs. multi-brand support (only one `businessConfig` object exists — no multi-tenant/multi-brand concept).

**Service-level:** pricing/pricing tiers, problem/solution split (currently `short`/`detail` is a single blended description, no explicit "problem" field), timeline (only implicit via `process` steps, no duration-per-step or overall timeline), requirements/prerequisites, expectations, FAQ is linked but only via a flat `serviceSlug` filter, images plural (only one `imageKey`), projects/case-studies linkage, testimonials linkage (only loose string match, see §6), explicit related-services curation (currently auto-computed by shared `category`), SKU/booking-system ID, insurance/coverage applicability, age/eligibility constraints.

**Team-level:** location assignment, availability/schedule, license/board-certification numbers, direct email/phone, explicit services-offered (exists, but one-directional and only from provider→service), photo gallery, unified identity with `staff` (two disconnected people models today).

**Location-level:** geo-coordinates, region/state, timezone, per-location booking URL, per-location social links, holiday/seasonal hours exceptions, explicit team assignment, explicit service assignment (currently free-text names, not slugs).

**Proof-level:** case studies/projects as a distinct entity (currently blended into `clientStories`), explicit testimonial→service and testimonial→location links (both currently string-matched, fragile), review source/date, verified-purchase flags.

**Contact-level:** structured "what happens after inquiry," per-channel response-time expectations — currently just reuses `businessConfig` contact fields.

**Cross-cutting:** no content-completeness/scoring mechanism, no explicit content-importance tiering (primary/secondary/supporting/deep), no `id`-based relational integrity (most links are either optional slug arrays that resolve safely, or fragile string equality that fails silently).

---

## 4. Current page → data mapping

| Page | Primary sources |
|---|---|
| `/` | `businessConfig`, `logoMarquees`, `clinicExperienceFeatures`, `trustStats`, `howItWorks`, `services`, `differentiators`, `carePlans`, `providers`, `marqueeReviews`, `healthResources`, `clientStories`, `faqs`, `emergencyInfo` |
| `/about` | `aboutValues`, `staff` |
| `/services`, `/services/[slug]` | `services`, `locations` (city names only), `faqs` (via `serviceSlug`) |
| `/team`, `/team/[slug]` | `providers`, `services` (via `relatedServiceSlugs`) |
| `/locations`, `/locations/[slug]` | `locations` |
| `/proof` | `marqueeReviews`, `proofCareStats`, `proofPageStories`, `proofStatHighlight` |
| `/resources`, `/resources/[slug]` | `articles`, `services` (via `relatedServiceSlugs`) |
| `/faq` | `faqs` (grouped by a **hardcoded** category list, not derived from data) |
| `/new-clients` | `newClientSteps`, `whatToBring` |
| `/contact` (new) | `businessConfig`, `differentiators`, `services`, `faqs` |
| `/success-stories` (new) | `clientStories`, `services` (matched by `category` string) |

This is already reasonably close to the "one dataset → many pages" ideal for the collections that exist. The real gap isn't page wiring — it's that several data collections are too shallow or too loosely linked to power the deeper compositions the Phase 6 brief describes (service detail with problem/solution/timeline/requirements; proof with dedicated projects; location with team/service assignment).

---

## 5. Missing page mappings

- Services do not surface on `/team` (a service page doesn't show which providers can be found on `/locations` either) — location and team are dead ends relative to services beyond the existing one-way links.
- `/locations/[slug]` does not show team members at that location (no data field exists to support it).
- `/proof` has no per-service or per-location filtering beyond the fragile string match already noted.
- Home page pulls from ~11 collections already — no missing wiring there, but see §14-style dumping risk in §8.
- No page currently renders `industryBrands` or `paymentInfo` (the latter is exported but unused anywhere — dead data).

---

## 6. Content relationships (existing graph)

Typed/explicit (slug-based, safe):
- `Provider.relatedServiceSlugs → Service`
- `Article.relatedServiceSlugs → Service`
- `Faq.serviceSlug → Service`

Untyped/string-matched (fragile — silently drops the link on any typo or rename, no error):
- `Location.servicesOffered: string[]` — literal display names, never resolved to a `Service`
- `clientStories[].category === Service.category` — first-match only, arbitrary
- `marqueeReviews[].service === Service.title` — exact string equality

Missing entirely:
- `Location ↔ Provider` (no field either direction)
- `staff ↔ providers` (two disconnected "people" datasets)
- `Service → Provider` (reverse of the one existing link)
- `Service → Project/CaseStudy` (no Project entity exists)
- `Testimonial → Location`

---

## 7. Missing relationships

To reach the content-graph vision in the brief (§7-8 of the brief), the model needs, at minimum, slug-based links for: Location→Service, Location→Provider, Service→Provider (or keep it provider-owned but add a derived reverse index), ClientStory/Testimonial→Service (explicit, not category-matched), ClientStory/Testimonial→Location, and a merge or explicit link between `staff` and `providers`.

---

## 8. Content-depth limitations

The repo already has real safeguards against sparse data (see §9), but several sections have a **minimum cardinality gate** that silently removes a whole section below a threshold, rather than degrading gracefully to a lighter composition:

- Homepage `clinicExperienceFeatures` section requires `.length >= 3`; a variant of the same section requires `.length >= 4`. A client with 2 "experience" facts loses the section outright instead of getting a 2-item version.
- No analogous *upper*-bound handling exists — nothing caps how many items render in grids/marquees when a client provides far more than the current 4–9 item baseline (e.g., a 12-service or 30-FAQ client). This isn't broken, but it's untested; components like `EditorialServiceIndex` and `ResourceFilterGrid` render whatever the array contains with no pagination/virtualization or density-aware layout switch.
- `Faq` categories are matched against a **hardcoded** `categoryOrder` list on `/faq` — a client whose FAQs use categories outside that fixed list will have those FAQs silently vanish from the page. This is the one clear correctness bug worth fixing regardless of Phase 6 scope.
- Body content for `Article` is `string[]` (plain paragraphs only) — a client with rich media-heavy resource content (images, subheadings, lists) has no way to express that today.

---

## 9. Dynamic composition — what already exists (this is good news)

The repo already implements much of the "don't render empty sections" principle the brief asks for, via two established conventions in `src/lib/utils.ts`:

- `isPlaceholderToken(value)` — detects unfilled `[TOKEN]` strings and treats them as absent.
- `hasRealEntries(collection, accessor)` — used to gate sections like the services-page locations teaser.

Combined with per-section `sectionVisibility` flags and `array.length > 0` guards used consistently across every page, and `ImmersiveHero`'s own placeholder-stripping logic for badges/stats, the site already fails gracefully on individual missing fields and empty collections. What it does **not** yet do is choose a *different, still-rich composition* when data is sparse (it only has "render" / "don't render," no middle tier) — that's the gap between today's state and the brief's §17-19 "content-driven composition selection" vision.

---

## 10. Cloneability risks

1. **String-matched cross-links are the single biggest fragility.** Any client-data edit to a service title, category label, or location's service list can silently break a testimonial grouping or a location's service badges with no compile-time or runtime warning.
2. **Two disconnected "people" models** (`staff` vs `providers`) mean a real client's team has to be entered twice, in two different shapes, with no guarantee of consistency.
3. **Hardcoded FAQ category order** breaks for any client whose FAQ taxonomy differs from the current 4-category demo set.
4. **No minimum/maximum density handling for most sections** beyond the two hardcoded `clinicExperienceFeatures` thresholds — sparse-vs-rich behavior is currently binary (show/hide), not graduated.
5. **Everything lives in one 1000+ line file.** This is fine at demo scale; it will become an editing/reviewing bottleneck as fields grow, and it has no per-entity validation (a required field left as `""` won't be caught until it renders wrong).
6. **No content-completeness signal** — there's no way today to know, for a given client, "team is 60% filled in" the way the brief's §16 describes; that has to be eyeballed.
7. **`paymentInfo` is dead data** — evidence that the schema already has fields with no consuming page, i.e. schema growth without page-mapping discipline is already happening once.

None of these are architecture-breaking. They are the concrete things that would bite a real client onboarding today, in priority order.

---

## 11. Recommended schema improvements (not yet implemented — for review)

In priority order, scoped to fixing real fragility rather than speculative expansion:

1. Replace all string-matched cross-links with slug-based fields: `Location.serviceSlugs: string[]`, `clientStories[].serviceSlug?`, `marqueeReviews[].serviceSlug?`, plus reverse-derivation helpers (`getServicesByProvider`, `getProvidersByService`) instead of hand-maintained one-way arrays.
2. Merge `staff` and `providers` into a single `people`/`team` collection with an optional `locationSlugs?: string[]` and `pageContext` distinction if About and Team genuinely need different subsets, rather than two parallel arrays.
3. Derive FAQ categories from the data (`Array.from(new Set(faqs.map(f => f.category)))`) the same way `EditorialServiceIndex` and `ResourceFilterGrid` already do, instead of the hardcoded `categoryOrder`.
4. Add `Location.providerSlugs?: string[]` to close the Location↔Provider gap.
5. Introduce a small `Project`/`CaseStudy` type only if a real client's data justifies it distinctly from `clientStories` — don't add it speculatively.
6. Add lightweight per-entity "required vs optional" documentation (JSDoc) rather than a validation framework, to keep intake mapping unambiguous without over-engineering.

Explicitly **not** recommended yet: splitting `business-content.ts` into a database, adding a content-importance-tier field, or building a completeness-scoring system — these are speculative until a second/third real client dataset actually stresses the current shape. Revisit after the cloneability test in §13.

---

## 12. Recommended component improvements

1. Fix the two hardcoded cardinality gates in `page.tsx` (`clinicExperienceFeatures.length >= 3 / >= 4`) to degrade to a smaller layout variant instead of disappearing outright — this is the one concrete "section vanishes below threshold" bug worth fixing.
2. Where slug-based links are added per §11, update the relevant page components to resolve them (mirroring the existing `relatedServiceSlugs` resolution pattern already used three times) rather than inventing a new pattern.
3. No changes needed to `EditorialServiceIndex`/`ResourceFilterGrid`/`ImmersiveHero` — their existing dynamic-derivation and placeholder-stripping behavior is already the right pattern and should be the template for any new list-rendering component.

---

## 13. Test business strategy

Before any schema change lands, define three fixture datasets (sparse / normal / detailed) reusing the exact current `Service`/`Location`/`Provider`/`Faq`/`Article` shapes plus whatever slug fields are added in §11, and render all pages against each to confirm:
- Sparse (3 services, 1 location, 2 providers, 5 FAQs, 3 reviews) never shows an empty/broken section — this is largely already true today per §9, but should be checked against the two hardcoded thresholds in §8/§12.
- Detailed (12 services, 4 locations, 8 providers, 30 FAQs, 20 reviews, 15 stories) renders without layout breakage in grids/marquees — currently untested at this scale.
This should be a manual QA pass (three data swaps + visual check across all pages), not new tooling, given the "don't over-engineer" directive in the brief.

---

## Summary

The current model already implements the core discipline the brief asks for — placeholder-awareness, section-level visibility gating, empty-array guards, dynamic category derivation in the newer components (`EditorialServiceIndex`, `ResourceFilterGrid`) — more thoroughly than the brief's framing assumes. The real gaps are narrower and more concrete than a full content-graph rebuild: fragile string-matched cross-links (§6, §10.1), a duplicated/disconnected people model (§10.2), one hardcoded taxonomy (§10.3), and two hardcoded density thresholds (§8, §12.1). Recommend fixing those five items plus the slug-based relationship additions in §11, then re-running the three-tier cloneability test in §13, before considering any larger schema or composition-engine work.
