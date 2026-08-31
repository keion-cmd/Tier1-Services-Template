# Tier1 Client Config Template

This is the intake reference for filling out a new client's `src/config/clients/<client>.ts`
(copy `src/config/clients/template.ts` as your starting point — every field below is a
`[BRACKET_TOKEN]` placeholder in that file). It doubles as the questionnaire to hand a client
or an internal intake person: gather every field below before writing code.

Field types used throughout:
- **string** — a single line or short paragraph of text
- **long-form** — a multi-paragraph field; don't compress this into a one-liner
- **slug** — a short, url-safe, lowercase-hyphenated identifier (`whole-home-renovation`, not
  `Whole Home Renovation`). Slugs are how services, providers, locations, and content
  cross-link — see "Slugs and relationships" at the bottom.

---

## BUSINESS

Core identity and contact info. Lives under `ClientConfig.business` and `ClientConfig.siteSettings`.

| Field | Type | Required | Example | Where it appears |
|---|---|---|---|---|
| `name` | string | Yes | "Cascade Point Physical Therapy & Wellness" | Page titles, JSON-LD, footer, chat |
| `shortName` | string | Yes | "Cascade Point PT" | Nav logo, short references |
| `tagline` | string | Yes | "Move Better. Live Fuller." | Meta description fallback |
| `descriptor` | string | Yes | "Physical Therapy & Wellness Clinic" | Combined with `name` via `getBusinessTagline()` for OG/social titles |
| `schemaType` | string | Yes | "LocalBusiness" (or a more specific schema.org type) | JSON-LD `@type` |
| `address` / `city` | string | Yes | "482 Alder Ridge Way, Suite 200" / "Brightwater, OR" | Footer, JSON-LD, maps links |
| `phone` / `phoneDigits` | string | Yes | "(541) 555-0142" / "5415550142" | Header, footer, `tel:` links |
| `email` | string | Yes | "hello@cascadepointpt.com" | Contact page, footer |
| `hours` | string | Yes | "Mon–Fri 7:00 AM–7:00 PM, Sat 8:00 AM–1:00 PM" | Short hours summary |
| `googleReviewUrl` | string | Yes | Full URL to leave a Google review | Proof page review CTA |
| `mapsUrl` | string | Yes | Google Maps directions URL | Proof/location pages |
| `businessHours` | array of `{days, hours}` | Yes | `[{days:"Monday – Friday", hours:"7:00 AM – 7:00 PM"}]` | Footer, location hours grid |
| `socialLinks` | array of `{label, href, placeholder}` | Yes | Facebook/Instagram URLs | Footer icons |
| `siteSettings.bookingMode` | `"modal" \| "external"` | Yes | `"modal"` | Whether CTAs open the in-page booking modal or link out to an external scheduler |
| `siteSettings.isTemplateDemo` | boolean | Yes | `false` for every real client | Gates the "this is a template" footer strip — must be `false` |

## SERVICES

Array under `ClientConfig.services`. One entry per bookable service/offering.

| Field | Type | Required | Example | Where it appears |
|---|---|---|---|---|
| `slug` | slug | Yes | `"orthopedic-sports-rehab"` | URL at `/services/[slug]`, cross-links from providers/locations/faqs/reviews/stories/articles |
| `number` | string | Yes | `"01"` | Decorative index on the services list |
| `title` | string | Yes | "Orthopedic & Sports Injury Rehab" | Page titles, cards |
| `short` | string | Yes | One-sentence summary | Services list card |
| `detail` | long-form | Yes | Full paragraph description | Service detail page hero |
| `category` | string | Yes | "Orthopedic Rehab" | Category filter tabs on `/services` (derived dynamically — no fixed category list to maintain) |
| `benefits` | string[] | Yes | 2-4 short bullet phrases | "What's included" section |
| `process` | array of `{step, title, description}` | Yes | 3 steps describing what happens | "How it works" section |
| `duration` | string | Yes | "45–60 minutes" | Service detail page |
| `imageKey` | string | Yes (placeholder ok pre-launch) | `"service-ortho-rehab"` | Hero/card image reference — see MEDIA below |
| `bestFor` | string[] | No | 2-3 "good fit if..." phrases | "Who this is for" section — omit entirely to hide the section |

## TEAM (Providers)

Array under `ClientConfig.providers`. One entry per staff member/practitioner.

| Field | Type | Required | Example | Where it appears |
|---|---|---|---|---|
| `slug` | slug | Yes | `"dr-emily-chan"` | URL at `/team/[slug]` |
| `name` | string | Yes | "Dr. Emily Chan" | Team grid, bio page |
| `credentials` | string | Yes | "PT, DPT, OCS" | Under the name everywhere |
| `specialty` | string | Yes | "Orthopedic & Post-Surgical Rehabilitation" | Also reused as the About page's staff-grid title |
| `bio` | string | Yes | Short 1-2 sentence bio | Team grid card |
| `fullBio` | long-form | No | Multi-paragraph bio | Provider detail page — falls back to `bio` if omitted |
| `yearsExperience` | number | Yes | `15` | Provider detail page |
| `areasOfInterest` | string[] | Yes | 2-4 focus areas | Provider detail page |
| `imageKey` | string | Yes (placeholder ok) | `"provider-emily-chan"` | Headshot reference |
| `relatedServiceSlugs` | slug[] | No | `["service-1","service-2"]` | Powers "services this provider offers" and the reverse "providers for this service" lookup — **must reference real service slugs** |
| `placeholder` | boolean | Yes | `false` once real data is entered | Internal flag, not rendered |

## LOCATIONS

Array under `ClientConfig.locations`. One entry per physical location — a single-location
business just keeps one entry.

| Field | Type | Required | Example | Where it appears |
|---|---|---|---|---|
| `slug` | slug | Yes | `"brightwater-clinic"` | URL at `/locations/[slug]` |
| `name` | string | Yes | "Cascade Point — Brightwater Clinic" | Locations list, detail page |
| `address` / `city` | string | Yes | Street address / City, State | Location detail |
| `phone` / `phoneDigits` | string | Yes | Location-specific phone | Location detail |
| `email` | string | Yes | Location-specific email | Location detail |
| `mapsUrl` | string | Yes | Google Maps directions URL | Location detail |
| `landmark` | string | Yes | "Across from Brightwater Regional Medical Center" | "Getting here" section |
| `description` | long-form | Yes | What this location offers/specializes in | Location detail hero |
| `serviceSlugs` | slug[] | Yes | Services offered at this location | Location detail's services list — **must reference real service slugs** |
| `providerSlugs` | slug[] | No | Team members working here | Location detail's team list |
| `businessHours` | array of `{days, hours}` | Yes | Location-specific hours | Location detail |
| `imageKey` | string | Yes (placeholder ok) | `"location-brightwater"` | Location image reference |
| `accessNotes` | string | No | Parking/transit/accessibility notes | Location detail — omit to hide |

## PROOF (Stats)

Under `ClientConfig.content`: `trustStats`, `proofStatHighlight`, `proofCareStats`, `proofPageStories`.

| Field | Type | Required | Example | Where it appears |
|---|---|---|---|---|
| `trustStats` | array of `{value, label}` | Yes | `{value:"10+", label:"Years serving the area"}` | Homepage trust bar |
| `proofStatHighlight` | `{number, label}` | Yes | `{number:"180+", label:"homes cleaned since 2019"}` | Proof page hero stat |
| `proofCareStats` | array of `{value, label, description}` | Yes | 2-3 headline stats with a sentence each | Proof page stats grid |
| `proofPageStories` | array of `{label, note}` | Yes | Short trust callouts | Proof page |

## TESTIMONIALS

Array under `ClientConfig.testimonials` (was `marqueeReviews`).

| Field | Type | Required | Example | Where it appears |
|---|---|---|---|---|
| `author` | string | Yes | "Jordan Micheli" | Reviews marquee, proof page |
| `segment` | string | Yes | "Sports injury patient" | Under the author name |
| `quote` | long-form | Yes | The review text | Reviews marquee, proof page |
| `rating` | number | Yes | `5` | Star display |
| `serviceSlug` | slug | No | `"service-1"` | Groups reviews by service on `/proof` — **must reference a real service slug** |

## STORIES

Array under `ClientConfig.stories` (was `clientStories`).

| Field | Type | Required | Example | Where it appears |
|---|---|---|---|---|
| `clientName` | string | Yes | "Marissa T." | Success stories page |
| `segment` | string | Yes | "Foster-Powell" | Under the client name |
| `category` | string | Yes | "Recurring Cleaning" | Story tag |
| `story` | long-form | Yes | The full story/testimonial narrative | Success stories page |
| `imageKey` | string | Yes (placeholder ok) | `"client-1-photo"` | Story photo reference |
| `serviceSlug` | slug | No | `"service-1"` | Links to "Explore this service" — **must reference a real service slug** |

## RESOURCES (Articles)

Array under `ClientConfig.resources` (was `articles`).

| Field | Type | Required | Example | Where it appears |
|---|---|---|---|---|
| `slug` | slug | Yes | `"returning-to-running-after-knee-injury"` | URL at `/resources/[slug]` |
| `title` | string | Yes | Article headline | Resources list, article page |
| `category` | string | Yes | "Recovery" | Category filter (derived dynamically, only shown if 3+ categories exist) |
| `author` | string | Yes | "Dr. Emily Chan, PT, DPT, OCS" | Byline |
| `date` | string | Yes | "February 10, 2026" | Byline |
| `readingTime` | string | Yes | "6 min read" | Article card |
| `excerpt` | string | Yes | 1-2 sentence summary | Resources list card |
| `body` | string[] | Yes | Array of paragraph strings (long-form, one string per paragraph) | Article body |
| `imageKey` | string | Yes (placeholder ok) | Image reference | Article hero/card |
| `disclaimer` | boolean | Yes | `true` if a "for educational purposes" note should show | Article footer |
| `relatedServiceSlugs` | slug[] | No | `["service-1"]` | "Related service" callout — **must reference real service slugs** |

## FAQ

Array under `ClientConfig.faqs`.

| Field | Type | Required | Example | Where it appears |
|---|---|---|---|---|
| `question` | string | Yes | "Do I need a physician referral?" | FAQ page, accordion |
| `answer` | long-form | Yes | Full answer | FAQ page, accordion |
| `category` | string | Yes | "Requests & visits" | Groups the FAQ list — categories are derived dynamically from whatever values are used here, no fixed list to maintain |
| `serviceSlug` | slug | No | `"service-1"` | Powers the per-service FAQ section on `/services/[slug]` — omitting it everywhere just means that section doesn't appear; **must reference a real service slug if set** |

## CONTACT

Reuses `ClientConfig.business` fields (`phone`, `email`, `address`, `hours`, `businessHours`,
`socialLinks`) — there's no separate contact block. The `/contact` page also reads
`ClientConfig.content.differentiators` and `ClientConfig.faqs` for its supporting sections.

## BRAND

Currently limited to `business.name`, `business.shortName`, `business.tagline`,
`business.descriptor`, and `business.socialLinks`. **There is no logo/favicon/color-palette
config yet** — the site's color tokens live in `src/app/globals.css` and the favicon is a static
app icon file; both are edited directly, not through client config, as of Phase 8. Treat this as
a known gap for a future phase, not something to work around here.

## MEDIA

Every content type above carries an `imageKey` string (service, provider, location, story,
article). As of Phase 8 there's no image upload/CMS — `imageKey` is a plain string reference
that components render as a placeholder card until real image files are wired in per clone. Keep
`imageKey` values short and descriptive (`"service-ortho-rehab"`, not `"[SERVICE_1_IMAGE]"`) once
real content is ready, even before real image files exist.

## SEO

`ClientConfig.seo.siteOrigin` — the canonical production URL (e.g.
`"https://cascadepointpt.com"`), used to build canonical links, OG URLs, and JSON-LD `@id`/`url`
fields via `buildMetadata()` and the `build*Schema()` helpers. No other SEO fields exist yet
(no separate default-title/default-description overrides beyond `getBusinessTagline()`).

---

## Slugs and relationships

Every cross-reference between content types (provider ↔ service, location ↔ service/provider,
review/story/faq/article → service) is a **slug string**, resolved at render time via helpers
in `src/config/helpers.ts` (`getServiceBySlug`, `getProvidersByService`, etc.) — never a name or
category string match. This means:

- Renaming a service's `title` never breaks a cross-link, as long as its `slug` stays the same.
- `src/config/validate.ts` runs automatically whenever a client config loads (dev server start,
  `next build`, and `npm run validate:clients`) and will throw a descriptive error listing every
  duplicate slug or dangling reference — fix these before shipping.
- Slugs don't have to follow a `service-1`/`location-1` numbering pattern — semantic slugs like
  `whole-home-renovation` or `ashford-mills-studio` work identically (see
  `src/config/clients/amberlyn.ts`).
