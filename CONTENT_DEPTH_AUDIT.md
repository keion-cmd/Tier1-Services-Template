# Content-Depth Audit — Tier1-Services-Template (read-only)

Audited against current `src/lib/business-content.ts`, `src/data/locations.ts`, and all page components under `src/app`. No files modified.

---

## 1. Homepage (`src/app/page.tsx`)

**Current state:** 10 sections in order: hero, logo marquees, trust stats, services preview (4 cards via `InteractiveServiceGallery`), why-choose-us, care plans, meet-the-team (4 cards), how-it-works, clinic-experience gallery, reviews marquee, health resources, client stories, FAQ teaser (3 Qs), visit/hours block, lead-gen form, final CTA.

- **Services preview section — CONTENT gap.** `InteractiveServiceGallery` (home variant) renders only `service.title` + `service.short` (one sentence) + image per card ([InteractiveServiceGallery.tsx:71-72](src/components/InteractiveServiceGallery.tsx#L71-L72)). The `service` object already carries `duration`, `category`, and `benefits[]` — none of it surfaces on the card. A visitor sees a title and one line, nothing that differentiates one service from another before clicking through.
- Trust stats, why-choose-us, how-it-works, care plans: each is a fixed-length array of title+one-sentence copy. This is CONTENT (richer copy) not structural — the shape is adequate for what these sections are (a scannable strip), so padding further would be NOT-A-GAP unless the copy itself is generic once filled in.
- Client stories / reviews marquee: template correctly self-labels these as demo placeholders — fine as scaffolding, not a gap to fix at the template level.
- FAQ teaser shows only 3 of 8 FAQs with a link to `/faq` — reasonable teaser pattern, NOT-A-GAP.

**Missing for decision/action:** the services preview is the first real content a visitor evaluates services from, and it currently gives no reason to pick one card over another beyond a title.

---

## 2. `/services` (listing)

**Current state:** Hero + count strip + `InteractiveServiceGallery` (services variant, filterable by category) + outro CTA.

- Same **CONTENT gap** as homepage: `InteractiveServiceGallery` renders title + `short` only ([InteractiveServiceGallery.tsx:71-72](src/components/InteractiveServiceGallery.tsx#L71-L72)) regardless of variant. `duration` and `benefits` exist on every service object and are unused here too.
- Category filter tabs work off `service.category` — functional, not a gap.
- No dead-end: cards link to `/services/[slug]`.

**Missing:** a visitor filtering by category still can't compare services without opening each one — no duration/benefit preview to scan.

---

## 3. `/services/[slug]` (detail) — thinnest page, confirmed

**Current data fields on `Service`** (re-verified against `business-content.ts:349-494`): `number, slug, title, short, detail, category, benefits[3], process[3 steps], duration, imageKey`. That's it — no more, no less.

**Page structure:** hero (title + `detail`, one paragraph) → stat strip (number + `short`) → 3 benefit cards (one line each) → 3-step process cards → CTA outro. Matches the screenshot evidence exactly.

- **"Who this is for" / "best for" content — STRUCTURAL gap.** No field on `Service` carries this (no `bestFor`, `idealFor`, or similar). Would need both a new data field and a new component block.
- **Per-service FAQ — STRUCTURAL gap.** `faqs[]` (business-content.ts:552) has a flat `category` field ("Requests & visits", "Emergency", "Payment & insurance", "First visit") with no `serviceSlug` or similar linkage. The sitewide FAQ page is fully generic relative to any given service — a visitor reading about "Service 3" gets zero service-specific Q&A, and the service detail page has no FAQ section at all.
- **Related services / cross-links — STRUCTURAL gap.** The `Service` type has no `relatedSlugs` or shared-category cross-link logic, and the page component builds no such section. `category` field exists and could theoretically drive a "same category" query without a new field (CONTENT/structural hybrid — the category field exists, but the "related services" UI block on the page does not, so it's still a net-new component addition). A visitor who finishes reading a service page has exactly one path forward: the CTA (book) or the "All Services" back-link. No adjacent-service discovery.
- **Benefits (3 bullets) and process (3 steps) — CONTENT gap**, not structural. The fields exist; they're just placeholder-thin by design (1 short sentence per benefit/step). Whether deeper copy here is warranted depends on subject matter — for many services 3 crisp benefits is legitimately enough (NOT-A-GAP territory) unless the real content ends up genuinely thin once filled in.
- **Duration field** is captured but only shown in the hero eyebrow and stat strip — used already, not a gap.

**Net:** this page has 3 real structural gaps (who-it's-for, per-service FAQ, related services) stacked on one already-thin page, which is why it reads as the thinnest destination in the site — a visitor lands, reads one paragraph + 3 bullets + 3 steps, and has no way to resolve doubts (is this for me? what if I have X question? what else is like this?) without leaving to a generic FAQ or going back to the full list.

---

## 4. `/about`

**Current state:** hero → 4 values (title+sentence) → 2 "approach" paragraphs → staff grid (name/title/credentials/bio) → CTA.

- **CONTENT gap**, not structural: `aboutValues` and the two `approachParagraph` fields are generic-shaped ("value + one sentence", "philosophy paragraph x2") and will only differentiate the business if the copy itself is specific (a real story, a named turning point, a concrete standard) rather than templated "we care about quality" language. The shape is fine; nothing here is structurally missing.
- No mechanism ties "why choose us" to anything concrete like outcomes, certifications-with-detail, or history/founding story beyond two free-text paragraphs — those paragraphs *could* carry that, so this is a CONTENT gap (richer paragraph content), not a new field.
- No dead-end — ends on staff grid + CTA, staff cards don't link anywhere (see #5).

**Missing:** nothing structurally; the page will only answer "why this business" if the two approach paragraphs and 4 values are written with real specifics rather than generic value statements.

---

## 5. `/team` and `/team/[slug]`

**Current data fields on `Provider`:** `slug, name, credentials, specialty, bio, yearsExperience, areasOfInterest[], imageKey`.

- Team grid (`/team`) cards do **not** link staff bios to anything need-based — a visitor with a specific concern has no way to match it to a provider beyond reading `specialty` and free-text `bio`.
- `/team/[slug]` shows: hero (name/credentials/specialty/bio), years-experience stat, and an "Areas of interest" badge list (`areasOfInterest[]`, already exists, already rendered — [team/[slug]/page.tsx:78-101](src/app/team/[slug]/page.tsx#L78-L101)).
- **"Match to a common visitor question" — CONTENT gap, not structural**, *if* `areasOfInterest` is written specifically enough (e.g., "post-surgical rehab", "pediatric first visits") to function as an implicit answer to "does this provider handle my situation?" As currently filled with generic placeholder tokens it reads as decorative; the field itself is capable of doing this job without a new data field.
- **Dead-end:** provider detail page has no link to relevant services (e.g., a provider whose specialty maps to specific `services[]` entries) — a visitor who picks a provider by specialty still has to separately go find the matching service. There's no `relatedServiceSlugs` on `Provider`. **STRUCTURAL gap** if service-provider cross-linking is desired; today the connection exists only informally through matching text in `specialty`/`areasOfInterest` vs. `service.category`/`title`.

---

## 6. `/locations` and `/locations/[slug]`

**Current data fields on `Location`:** `slug, name, address, city, phone, phoneDigits, email, mapsUrl, landmark, description, servicesOffered[], businessHours[], imageKey`.

- `/locations/[slug]` already surfaces address, hours, phone, email, an embedded map with driving-directions CTA, a "nearby landmark" callout, and a services-offered grid. This is more complete than the other detail pages.
- **"Why this location vs. another" — STRUCTURAL gap** for parking/transit/accessibility specifics: no field exists for parking instructions, transit access, or accessibility notes. `landmark` is the only wayfinding aid, and it's a single string, not enough to answer "how do I actually get there and park."
- **Cross-location comparison — NOT-A-GAP** as a dedicated feature: for a 2-location business, a simple grid (already present on `/locations`) plus per-location detail is proportionate; a comparison table would be over-engineering unless the business has meaningfully different location profiles (different specialties per location, etc.) — which `servicesOffered[]` already partially supports.
- No dead-end: detail page links back to `/locations`, has booking CTA, and services-offered section.

**Missing:** parking/transit/accessibility specifics (structural — no field for it today) — this is the one concrete "why/how to visit this location" gap.

---

## 7. `/faq`

**Current state:** flat array of 8 FAQs, grouped into 4 fixed categories (`Requests & visits`, `Emergency`, `Payment & insurance`, `First visit`), rendered as accordions under category headers — not a flat undifferentiated list, category grouping already exists.

- No search/filter input, no per-service linkage (see #3). For 8 items, a search box would be over-engineering — **NOT-A-GAP** at this item count. If FAQ count grows substantially (20+), a search affordance becomes justified; today it isn't.
- **STRUCTURAL gap** only in the sense already noted under #3: no way to jump from a specific service page to the FAQs relevant to that service (no `serviceSlug` tag on `faqs[]` entries).

**Missing:** nothing at current scale beyond the cross-link to service-specific questions already flagged in #3.

---

## 8. `/new-clients`

**Current state:** hero → step list (`newClientSteps`, 5 steps: title+sentence) → "what to bring" (5 short items) → CTA. (0-step bug already fixed per prior session.)

- **CONTENT gap:** `newClientSteps[].copy` and `whatToBring[]` items are single-line by shape; whether this "actually reduces anxiety" depends entirely on whether the copy answers real first-visit questions (what happens in the room, how long it takes, what if I'm late, insurance verification specifics) versus restating generic step names. No structural additions needed — the array shapes can hold that level of detail already.
- No FAQ-style anxiety-specific content (cost surprises, cancellation policy, what if this is the wrong service) integrated into this page — could be answered by linking to relevant `/faq` categories, which today it does not do. **CONTENT/linking gap**, not structural (a `Link` to `/faq` or `/faq#category` is trivial to add without new data fields — flagging as a dead-end below).
- **Dead-end:** page ends on CTA only — no link out to `/faq` or `/services` for a visitor who still has questions after reading the steps.

---

## 9. `/proof`

**Current state:** hero → stat highlight strip → proof-care-stats (3 stat+label cards) → `ReviewsSection` component → proof-page-stories (3 label+note cards, self-labeled as illustrative placeholders) → CTA.

- **CONTENT gap:** `proofCareStats` and `proofPageStories` are generic-shaped (stat+label, label+note) — genuine trust-building depends on specificity once real data replaces placeholders (real review counts, named outcomes) rather than the shape changing.
- **NOT-A-GAP:** the page already separates "stats," "reviews" (via `ReviewsSection`, not opened in this audit but distinct from the marquee), and "stories" into three different trust mechanisms — adding a 4th generic trust block would be padding, not a real gap.
- Links to `/faq` from the stat strip — no dead-end.

---

## 10. `/resources` (articles)

**Current state:** hero → count/disclaimer strip → article grid (category/date/reading-time/title/excerpt) → CTA. Detail page (`/resources/[slug]`) has full paragraph body (5 paragraphs), disclaimer, and a related-articles section (already implemented, not a gap).

- Positioning: hero copy token (`RESOURCES_HERO_TITLE`/`SUBTITLE`) determines whether this reads as "answer your question" vs. generic "blog" — **CONTENT gap**, entirely dependent on how those tokens get filled, no structural issue.
- Related-articles section already exists and functions (`sectionVisibility.relatedArticles`, [resources/[slug]/page.tsx:76-103](src/app/resources/%5Bslug%5D/page.tsx#L76-L103)) — **NOT-A-GAP**, already solved.
- No link from an article back to a relevant service (e.g., an article about a condition linking to the service that treats it) — **STRUCTURAL gap**, no `relatedServiceSlugs` field on `Article`.

---

## Dead-ends summary

| Page | Dead-end? |
|---|---|
| Homepage | No — always routes to a next section or `/services`/`/team`/`/faq` |
| `/services` | No |
| `/services/[slug]` | **Yes** — after CTA, only path back is "All Services"; no related-service or FAQ path |
| `/about` | No (staff grid doesn't link out, but page ends on CTA) |
| `/team` | No |
| `/team/[slug]` | Partial — no link to related services matching the provider's specialty |
| `/locations` / `/locations/[slug]` | No |
| `/faq` | No |
| `/new-clients` | **Yes** — no link to `/faq` or `/services` after the steps |
| `/proof` | No |
| `/resources` / `/resources/[slug]` | No (related-articles already exists) |

---

## Ranked: highest-impact gaps to fix first

1. **`/services/[slug]` — related-services + per-service FAQ linkage (STRUCTURAL).** Most evidence (screenshot-flagged as thinnest), most dead-end risk, and it's the page most visitors reach right before a booking decision. Fixing this closes the single biggest "reads one page, has nowhere to go" gap sitewide.
2. **Services preview cards sitewide (homepage + `/services`) surfacing `duration`/`benefits` (CONTENT + minor component change).** No new data needed — `duration` and `benefits[]` already exist on every `Service` and are simply not rendered in `InteractiveServiceGallery`. High leverage relative to effort: touches two pages at once.
3. **`/services/[slug]` — "who this is for" field (STRUCTURAL).** Directly answers the most common pre-booking hesitation ("is this the right service for my situation?") and is currently unanswerable anywhere on the service detail page.
4. **`/new-clients` dead-end fix — link to `/faq` and `/services` after the steps (CONTENT/linking, trivial structurally).** Low effort, closes a real dead-end on a page specifically meant to reduce first-visit anxiety.

Everything else identified (about/proof/new-clients copy depth, team-to-service cross-linking, location parking/transit info, article-to-service links) is real but secondary — either lower-traffic pages, smaller dead-end risk, or purely copy-depth gaps that don't require a build sequence, only better content once the business's real details are in hand.
