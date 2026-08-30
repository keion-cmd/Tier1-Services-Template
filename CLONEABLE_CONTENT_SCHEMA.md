# Cloneable Content Schema

Grounded against the working tree as of 2026-08-30 (branch `main`, on top of
commit `d6611c8`, **including uncommitted changes** currently on disk to
`Header.tsx`, `MegaMenu.tsx`, `Footer.tsx`, `business-content.ts`, and
`generate-clone-config.mjs` — those changes are read as current, live code
below, not as pending/aspirational). See [CLONEABLE_SYSTEM_AUDIT.md](CLONEABLE_SYSTEM_AUDIT.md)
for the prior read against the committed state only; several gaps it
identified are fixed in the working tree now (noted inline where relevant,
and summarized in [CONTENT_UI_MAPPING.md](CONTENT_UI_MAPPING.md)).

Every content type below is real, present in the codebase today. None of
this is aspirational.

Legend for the **Gating** column:
- **boolean+length** — gated by both a `sectionVisibility.<key>` boolean AND a `.length` check on the array.
- **length-only** — gated only by an array/derived-list length check (no `sectionVisibility` key exists for it).
- **none** — renders unconditionally; an empty array/string just produces an empty list or a placeholder-token string, nothing hides the surrounding section/page.

---

## 1. `services` — [src/lib/business-content.ts:328-473](src/lib/business-content.ts#L328)

Type: `as const` array, formal type alias `Service` at [business-content.ts:475](src/lib/business-content.ts#L475).

| Field | Type | Notes |
|---|---|---|
| `number` | string | display index, e.g. `"01"` |
| `slug` | string | route key, used in `/services/[slug]` |
| `title` | string | |
| `short` | string | card/list summary |
| `detail` | string | full description |
| `category` | string | free text, used for grouping |
| `benefits` | string[] | fixed at 3 items per current placeholders, no enforced min/max in the type |
| `process` | `{ step, title, description }[]` | built by the `serviceProcess()` helper at [business-content.ts:320](business-content.ts#L320) |
| `duration` | string | |
| `imageKey` | string | placeholder image token |

**Gating: none.** No `sectionVisibility` key exists for `services`. The `/services` index page and the services mega-menu render whatever is in the array, including zero items (mega-menu link would just show an empty flyout — see [CONTENT_UI_MAPPING.md](CONTENT_UI_MAPPING.md)).

## 2. `providers` — [business-content.ts:626-671](src/lib/business-content.ts#L626)

Formal type: `Provider` at [business-content.ts:673](business-content.ts#L673).

| Field | Type |
|---|---|
| `slug` | string |
| `name` | string |
| `credentials` | string |
| `specialty` | string |
| `bio` | string |
| `yearsExperience` | number |
| `areasOfInterest` | string[] |
| `imageKey` | string |
| `placeholder` | boolean |

**Gating:** two distinct render sites, both **boolean+length**:
- Homepage teaser: `sectionVisibility.meetTheTeam && providers.length > 0`
- `/team` grid: `sectionVisibility.teamProvidersGrid && providers.length > 0`
- The `areasOfInterest` sub-field on a provider's detail page: `sectionVisibility.providerAreasOfInterest && provider.areasOfInterest.length > 0` (**boolean+length**).
- The "Team" nav item itself is gated **length-only**: `providers.length > 0` (`Header.tsx`, see [CONTENT_UI_MAPPING.md](CONTENT_UI_MAPPING.md)).

## 3. `staff` — [business-content.ts:574-607](src/lib/business-content.ts#L574)

Shape is implicit (inline array type annotation, no exported `interface`/`type`): `{ name, title, credentials, bio, imageKey, placeholder }[]`.

**Gating: boolean+length.** `sectionVisibility.aboutTeamGrid && staff.length > 0` on the About page ([about/page.tsx:53](src/app/about/page.tsx#L53)). Not used anywhere else — distinct from `providers`, which powers Team/`/team`.

## 4. `locations` — [src/data/locations.ts:20-59](src/data/locations.ts#L20)

Formal type: `Location` interface at [locations.ts:4-18](src/data/locations.ts#L4).

| Field | Type |
|---|---|
| `slug` | string |
| `name` | string |
| `address` | string |
| `city` | string |
| `phone` | string |
| `phoneDigits` | string |
| `email` | string |
| `mapsUrl` | string |
| `landmark` | string |
| `description` | string |
| `servicesOffered` | string[] |
| `businessHours` | `{ days, hours }[]` |
| `imageKey` | string |

**Gating:** the `/locations` index page itself: **none** (renders unconditionally). Two sub-sections on a location's detail page ARE gated, both **boolean+length**, both keyed off the same `sectionVisibility.locationServicesAndHours` boolean:
- `servicesOffered` block: `sectionVisibility.locationServicesAndHours && location.servicesOffered.length > 0` ([locations/[slug]/page.tsx:140](src/app/locations/[slug]/page.tsx#L140))
- `businessHours` block: `sectionVisibility.locationServicesAndHours && location.businessHours.length > 0` ([locations/[slug]/page.tsx:154](src/app/locations/[slug]/page.tsx#L154))
- The "Locations" nav item: **length-only**, `locations.length > 0` (`Header.tsx`).

## 5. `articles` — [business-content.ts:679-752](src/lib/business-content.ts#L679)

Formal type: `Article` at [business-content.ts:754](src/lib/business-content.ts#L754).

| Field | Type |
|---|---|
| `slug` | string |
| `title` | string |
| `category` | string |
| `author` | string |
| `date` | string |
| `readingTime` | string |
| `excerpt` | string |
| `body` | string[] (paragraphs) |
| `imageKey` | string |
| `disclaimer` | boolean |

**Gating:** `/resources` index page: **none** (renders unconditionally). The "related articles" block on an article detail page: **boolean+length**, `sectionVisibility.relatedArticles && related.length > 0` ([resources/[slug]/page.tsx:76](src/app/resources/[slug]/page.tsx#L76)). The "Resources" nav item: **length-only**, `articles.length > 0`.

## 6. `faqs` — [business-content.ts:531-572](src/lib/business-content.ts#L531)

`as const` array, no exported alias name. Shape: `{ question, answer, category }`.

**Gating:** the full `/faq` page: **length-only**, indirectly — categories are built by grouping `faqs` and then `.filter((category) => category.items.length)` ([faq/page.tsx:11](src/app/faq/page.tsx#L11)), so an empty category is dropped but there's no boolean gate on the page/section as a whole. The **homepage teaser** (`faqTeaser`) is separately gated **boolean+length**: `sectionVisibility.faqTeaser && faqs.length > 0`.

## 7. `carePlans` — [business-content.ts:760-776](src/lib/business-content.ts#L760)

Shape: `{ title, subtitle, bullets: string[] }[]`, implicit (inline type).

**Gating: boolean+length.** `sectionVisibility.carePlans && carePlans.length > 0` (homepage only — [page.tsx:125](src/app/page.tsx#L125)).

## 8. `newClientSteps` — [business-content.ts:778-784](src/lib/business-content.ts#L778)

Shape: `{ step, title, copy }[]`, implicit.

**Gating: none.** Rendered unconditionally on `/new-clients`; only used to compute a display count in the hero copy (`${newClientSteps.length}-step path`).

## 9. `whatToBring` — [business-content.ts:786-792](src/lib/business-content.ts#L786)

Type: `string[]`.

**Gating: none.** Rendered unconditionally on `/new-clients`.

## 10. `logoMarquees` (each group's `items`) — [business-content.ts:51-67](src/lib/business-content.ts#L51)

Formal type: `LogoMarqueeGroup` at [business-content.ts:44-49](src/lib/business-content.ts#L44). Two groups currently defined, `partners` (sourced from `industryBrands`) and `insurance` (sourced from `insuranceProviders`, filtering out the `"other"` form placeholder).

| Field | Type |
|---|---|
| `id` | string |
| `heading` | string |
| `subheading` | string |
| `items` | `{ name: string }[]` |

**Gating: length-only, and it lives in the component, not `sectionVisibility`.** `LogoMarquee.tsx:18` returns `null` when `items.length === 0`. There is no `sectionVisibility` key for either marquee group (the old `industryBrandsMarquee`/`insuranceMarquee` keys were removed when this was generalized into `logoMarquees[]`, per commit `351b858`).

## 11. `insuranceProviders` — [src/data/insurance.ts:9-19](src/data/insurance.ts#L9)

Formal type: `InsuranceProvider` interface at [insurance.ts:4-7](src/data/insurance.ts#L4).

| Field | Type |
|---|---|
| `id` | string |
| `name` | string |

**Gating: none** on the source array itself. Feeds two consumers independently: the `insurance` logoMarquee group (length-only, via `LogoMarquee.tsx`, excluding `id === "other"`) and `InsuranceCombobox` (a form field — not gated, always shows all entries including `"other"`).

## 12. `industryBrands` — [src/lib/industryBrands.ts:8-18](src/lib/industryBrands.ts#L8)

Formal type: `IndustryBrand` interface at [industryBrands.ts:1-4](src/lib/industryBrands.ts#L1). Field: `name: string`. Feeds only the `partners` logoMarquee group. **Gating: length-only** (via `LogoMarquee.tsx`, same as above).

## 13. `marqueeReviews` — [business-content.ts:523-529](src/lib/business-content.ts#L523)

Shape: `{ author, segment, quote, rating }[]`, implicit.

**Gating: boolean+length.** `sectionVisibility.reviewsMarquee && marqueeReviews.length > 0` (homepage — consumed by `ReviewsMarquee.tsx`). Not used on `/proof`, which shows a separate Google-reviews link/widget driven by `businessConfig.googleReviewUrl`, not this array.

## 14. `clientStories` — [business-content.ts:802-824](src/lib/business-content.ts#L802)

Shape: `{ clientName, segment, category, story, imageKey }[]`, implicit.

**Gating: boolean+length.** `sectionVisibility.clientStories && clientStories.length > 0` (homepage — [page.tsx:278](src/app/page.tsx#L278)).

## 15. `proofCareStats` — [business-content.ts:831-835](src/lib/business-content.ts#L831)

Shape: `{ value, label }[]`, implicit.

**Gating: boolean+length.** `sectionVisibility.proofCareStats && proofCareStats.length > 0` ([proof/page.tsx:40](src/app/proof/page.tsx#L40)). Distinct array from homepage `trustStats` — different section, different key.

## 16. `proofPageStories` — [business-content.ts:837-841](src/lib/business-content.ts#L837)

Shape: `{ label, note }[]`, implicit.

**Gating: boolean+length.** `sectionVisibility.proofStories && proofPageStories.length > 0` ([proof/page.tsx:56](src/app/proof/page.tsx#L56)).

## 17. `trustStats` — [business-content.ts:481-487](src/lib/business-content.ts#L481)

Shape: `{ value, label }[]`, implicit.

**Gating: boolean+length.** `sectionVisibility.trustStats && trustStats.length > 0` (homepage — [page.tsx:84](src/app/page.tsx#L84)). Also imported into `chatEngine.ts` for use in chat responses (unconditional there, no gating in a chat-response context).

## 18. `differentiators` — [business-content.ts:489-496](src/lib/business-content.ts#L489)

Shape: `{ title, copy }[]`, implicit.

**Gating: boolean+length.** `sectionVisibility.whyChooseUs && differentiators.length > 0` ([page.tsx:109](src/app/page.tsx#L109)).

## 19. `howItWorks` — [business-content.ts:498-503](src/lib/business-content.ts#L498)

Shape: `{ step, title, copy }[]`, implicit.

**Gating: boolean+length.** `sectionVisibility.howItWorks && howItWorks.length > 0` ([page.tsx:192](src/app/page.tsx#L192)). Also imported into `chatEngine.ts`, unconditional there.

## 20. `healthResources` — [business-content.ts:505-521](src/lib/business-content.ts#L505)

Shape: `{ title, excerpt, imageKey }[]`, implicit. Note: this is a **separate, smaller array from `articles`** — it powers only the homepage resources teaser; it is not the same data as the full `/resources` article list (the two are not kept in sync automatically).

**Gating: boolean+length.** `sectionVisibility.healthResources && healthResources.length > 0` ([page.tsx:255](src/app/page.tsx#L255)).

## 21. `aboutValues` — [business-content.ts:313-318](src/lib/business-content.ts#L313)

Shape: `{ title, copy }[]`, implicit (declared with an inline `as {...}[]` cast).

**Gating: none.** Rendered unconditionally on `/about`. No `sectionVisibility` key.

## 22. `clinicExperienceFeatures` — [business-content.ts:794-800](src/lib/business-content.ts#L794)

Shape: `{ title, copy, imageKey }[]`, implicit.

**Gating: boolean + length, with a non-standard threshold.** `sectionVisibility.clinicExperience && clinicExperienceFeatures.length >= 4` ([page.tsx:204](src/app/page.tsx#L204)) — this is the one array in the whole codebase gated at `>= 4` rather than `> 0`; a clone that trims this array below 4 items will silently lose the whole section even with the boolean set to `true`.

## 23. `businessConfig` — [business-content.ts:4-36](src/lib/business-content.ts#L4)

Singleton object (not an array), implicit inline shape. Key fields: `bookingMode` (`"modal" | "external"`), `isTemplateDemo: boolean`, `name`, `shortName`, `tagline`, `descriptor`, `schemaType`, `address`, `city`, `phone`, `phoneDigits`, `email`, `hours`, `googleReviewUrl`, `mapsUrl`, `businessHours: {days, hours}[]`, `socialLinks: {label, href, placeholder}[]`.

`clinic` ([business-content.ts:39](src/lib/business-content.ts#L39)) is a documented backward-compatible alias for the same object — `export const clinic = businessConfig;`.

**Gating: none** on the object as a whole (it's core identity data, always rendered). One field, `isTemplateDemo`, itself functions as a gate for a *different* component: `businessConfig.isTemplateDemo && <TemplateSelfPromo />` in `Footer.tsx`. This field currently defaults to `true` in this repo (correct only because this repo is the template's own demo site) and must be `false` on every real clone — see [CLONE_INSTRUCTIONS.md](CLONE_INSTRUCTIONS.md).

## 24. `emergencyInfo` — [business-content.ts:609-618](src/lib/business-content.ts#L609)

Singleton object, implicit shape: `heading, note, referralLocationName, referralLocationPhone, referralLocationPhoneDigits, referralLocationAddress, instructions, placeholder`.

**Gating: none.** Used unconditionally in two places: a homepage block ([page.tsx:356](src/app/page.tsx#L356), only `.note` is rendered there) and `chatEngine.ts` (`.note`, `.referralLocationName`, `.referralLocationPhone` interpolated into a chat response). Not consumed by any location detail page despite `copy.location.emergencyTitle` existing as a copy key — that copy key currently has no known array/object it pairs with data-wise on the location page (see [CONTENT_UI_MAPPING.md](CONTENT_UI_MAPPING.md) for the caveat).

## 25. `paymentInfo` — [business-content.ts:620-624](src/lib/business-content.ts#L620)

Singleton object: `heading: string`, `methods: string[]` (currently `["Cash", "Credit / Debit Card", "Bank Transfer"]`, not a placeholder-token array), `insuranceNote: string`.

**Gating: none.** Only consumed by `chatEngine.ts`, unconditionally. Not rendered on any page directly.

---

## Content types with NO visibility gating at all

Per the audit instructions, flagged explicitly rather than glossed over.
These render unconditionally regardless of array length or any boolean —
an empty array just produces an empty list/section, not a hidden one:

- `services` (full array; only the mega-menu items derive from it, and the mega-menu now hides itself when empty — see [CONTENT_UI_MAPPING.md](CONTENT_UI_MAPPING.md))
- `faqs` (full `/faq` page; only the homepage `faqTeaser` slice is gated)
- `locations` (full `/locations` index; only per-location sub-sections are gated)
- `articles` (full `/resources` index; only the `relatedArticles` teaser is gated)
- `newClientSteps`
- `whatToBring`
- `aboutValues`
- `businessConfig` / `clinic` (singleton, not applicable to length-gating, listed for completeness)
- `emergencyInfo` (singleton)
- `paymentInfo` (singleton)
- `insuranceProviders` (as a source array — its two derived consumers, `logoMarquees.insurance` and `InsuranceCombobox`, are separately gated/ungated as noted above)

---

## Total content types documented: 25
(17 arrays/objects gated via `sectionVisibility`'s 17 keys is a coincidental near-match — not every `sectionVisibility` key maps 1:1 to a distinct content type, e.g. `locationServicesAndHours` gates two fields on one `Location` record, not two arrays.)
