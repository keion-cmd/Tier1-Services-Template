# Cloneable System Gap Audit (Read-Only)

Scope: Tier1-Services-Template only. All findings below are grep/read-verified
against the working tree as of commit `d6611c8` (2026-08-30). Section numbers
(§N) refer to the target architecture document's own numbering, used here
only as a reference frame — this repo does not implement that document.

---

## 1. What Already Matches the Target Architecture

### Golden Rule / conditional rendering (§2, §6, §7, §24)

`sectionVisibility` is defined once at [src/lib/business-content.ts:68-86](src/lib/business-content.ts#L68-L86)
with 17 keys. Every key's actual render site was checked individually — all
17 are gated by **both** the boolean flag **and** a `.length` check on the
backing array (`>= 4` in one case, `> 0` in the rest):

| Key | Gate site |
|---|---|
| trustStats | [page.tsx:84](src/app/page.tsx#L84) |
| whyChooseUs | [page.tsx:109](src/app/page.tsx#L109) |
| carePlans | [page.tsx:125](src/app/page.tsx#L125) |
| meetTheTeam | [page.tsx:156](src/app/page.tsx#L156) |
| howItWorks | [page.tsx:192](src/app/page.tsx#L192) |
| clinicExperience | [page.tsx:204](src/app/page.tsx#L204) (`>= 4`, not `> 0`) |
| reviewsMarquee | [page.tsx:243](src/app/page.tsx#L243) |
| healthResources | [page.tsx:255](src/app/page.tsx#L255) |
| clientStories | [page.tsx:278](src/app/page.tsx#L278) |
| faqTeaser | [page.tsx:305](src/app/page.tsx#L305) |
| proofCareStats | [proof/page.tsx:40](src/app/proof/page.tsx#L40) |
| proofStories | [proof/page.tsx:56](src/app/proof/page.tsx#L56) |
| aboutTeamGrid | [about/page.tsx:53](src/app/about/page.tsx#L53) |
| teamProvidersGrid | [team/page.tsx:43](src/app/team/page.tsx#L43) |
| providerAreasOfInterest | [team/[slug]/page.tsx:78](src/app/team/[slug]/page.tsx#L78) |
| relatedArticles | [resources/[slug]/page.tsx:76](src/app/resources/[slug]/page.tsx#L76) |
| locationServicesAndHours | [locations/[slug]/page.tsx:140,154](src/app/locations/[slug]/page.tsx#L140) (used twice, both gated) |

**Verdict: fully matches.** No key found that relies on the boolean alone or
the length check alone.

### Marquee independence (§8)

`logoMarquees[]` at [business-content.ts:47-63](src/lib/business-content.ts#L47-L63)
has two groups (`partners`, `insurance`). Their `items` arrays trace back to
two disjoint source files — `industryBrands` ([industryBrands.ts:8](src/lib/industryBrands.ts#L8))
and `insuranceProviders` ([insurance.ts:9](src/data/insurance.ts#L9), filtered
to exclude the `"other"` form placeholder). No shared dataset. The render
component, [LogoMarquee.tsx:18](src/components/LogoMarquee.tsx#L18), independently
returns `null` when `items.length === 0`. **Verdict: matches.**

### Single source of truth / no hardcoded client copy (§3, §32)

Re-ran the hardcoded-copy sweep, specifically re-checking `FooterEmailCapture`
(added in `9008370`, last touched in `e5b4248`) since it postdates any prior
sweep. **Result: this is a regression**, not a clean pass — see Section 2
below for the two concrete violations found in [Footer.tsx](src/components/layout/Footer.tsx).
Everything else touched by `FooterEmailCapture` itself (heading, body,
success message) correctly pulls from `copy.siteShell.*`.

### Navigation awareness (§12)

**Explicitly checked, not previously confirmed. Result: does NOT match —
see Section 2.** `MegaMenuDesktop`/`MegaMenuMobile` ([MegaMenu.tsx](src/components/nav/MegaMenu.tsx))
render whatever `config.items` they're given with no empty-check, and the
top-level `navItems` array in [Header.tsx:27-37](src/components/layout/Header.tsx#L27-L37)
is a static list with no filtering step at all — worse than "partial," this
is a genuine gap, moved to Section 2/3 boundary and detailed there.

### Services/pages fully dynamic count (§10, §11)

All four dynamic-route `generateStaticParams` functions were re-verified —
none contain `.slice(`, `.filter(` for a count limit, or a hardcoded number:

- [services/[slug]/page.tsx:12-14](src/app/services/[slug]/page.tsx#L12-L14) — `services.map(...)`
- [team/[slug]/page.tsx:13-15](src/app/team/[slug]/page.tsx#L13-L15) — `providers.map(...)`
- [resources/[slug]/page.tsx:14-16](src/app/resources/[slug]/page.tsx#L14-L16) — `articles.map(...)`
- [locations/[slug]/page.tsx:13-15](src/app/locations/[slug]/page.tsx#L13-L15) — `locations.map(...)`

**Verdict: matches.**

### No-fabrication discipline (§21)

**Positive evidence, but scoped to this repo, not a clone run.** This
repository is the master template itself — `business-content.ts` is
placeholder tokens (`[BUSINESS_NAME]`, `[HOME_HERO_HEADLINE]`, etc.)
end-to-end with zero invented client copy; that discipline is structural,
not just a one-time pass.

**I cannot verify the specific "10 arrays given plausible but unrequested
copy" counter-example requested.** That would be evidence from a specific
clone-run session (a different working directory/conversation applying this
template to a real client), which is not present in this repository's git
history — `git log` here shows only template-side commits (e.g. `0bb45fd
Clone Tier 1 template for Summit Air & Home Services` is the closest
clone-adjacent commit, and it predates the current architecture by many
commits, with no diff detail retained in this repo to inspect). Flagging
this as unverifiable from this codebase rather than asserting a fabricated
answer.

---

## 2. What Partially Matches (real but incomplete)

### Hardcoded copy regression in Footer.tsx

Two literal strings bypass the `copy` object entirely:

- [Footer.tsx:165](src/components/layout/Footer.tsx#L165) — `"Booking details"` label, hardcoded instead of `copy.siteShell.*`.
- [Footer.tsx:192](src/components/layout/Footer.tsx#L192) — `{clinic.name} is a customizable service-business template.` — hardcoded, and worse than a missed-tokenization issue: this sentence self-identifies the site as a template on every live client footer. This is the exact "new component added since last sweep regressed the discipline" pattern the audit was asked to check for.

### Nav does not hide empty sections (§12)

`navItems` in [Header.tsx:27-37](src/components/layout/Header.tsx#L27-L37) is
a static array (`Home, About, Services, Team, Resources, Reviews, FAQ, New
Clients, Locations`) rendered unconditionally in both desktop
(`navItems.map` at [Header.tsx:131](src/components/layout/Header.tsx#L131))
and mobile (`navItems.map` at [Header.tsx:179](src/components/layout/Header.tsx#L179)).
There is no check against `services.length`, `providers.length`,
`articles.length`, or `locations.length` before showing the "Team",
"Resources", or "Locations" nav items/mega-menus. A clone with zero
locations or zero articles would still show a "Locations" or "Resources"
nav item that either mega-menu-flyouts empty or 404s via `/locations`
`/resources` index pages. **This is a confirmed, previously-unverified gap.**

### TYPE B intake pipeline (§14, §19, §20)

`/get-started` ([page.tsx](src/app/get-started/page.tsx)) renders
`IntakeForm.tsx`, which collects, per [IntakeForm.tsx:120-166](src/components/intake/IntakeForm.tsx#L120-L166):
Business Name, Contact Name, Contact Email, Contact Phone, Business Type
(niche), Number of Locations, Current Booking System (optional), Notes
(optional), Booking Setup mode, plus (per `7fb4818`) a per-section boolean
checklist matching `sectionVisibility` keys. This is a **manual form with a
yes/no checklist** — no URL field, no scraping, no AI extraction step
anywhere in this component or its submission path.

The target chatbot-intake vision (§14/§19/§20) describes AI-driven URL
scraping with confidence-scored field extraction and an ambiguity-resolution
step. None of that exists here. The gap is not "partial AI intake" — it's
"a static form vs. an AI agent," a difference in kind, not degree.

### `generate-clone-config.mjs` output (§20)

[scripts/generate-clone-config.mjs](scripts/generate-clone-config.mjs) reads
a `clone_requests` Supabase row and emits **only** a `sectionVisibility`
boolean snippet ([generate-clone-config.mjs:93-113](scripts/generate-clone-config.mjs#L93-L113)),
plus a comment-only header echoing contact/business fields (not usable as
data — [lines 95-106](scripts/generate-clone-config.mjs#L95-L106)). It does
not emit a `copy` object, `businessConfig` fields, `logoMarquees`, services,
providers, locations, or articles — none of the actual content types a full
`ClientData` object would need.

**Additional finding not asked for but relevant:** `SECTION_KEYS` at
[generate-clone-config.mjs:16-33](scripts/generate-clone-config.mjs#L16-L33)
is now stale against the live `sectionVisibility` shape in
`business-content.ts`. It still lists `industryBrandsMarquee` and
`insuranceMarquee` (removed when those were generalized into `logoMarquees[]`
per `351b858`), and is missing `providerAreasOfInterest`,
`relatedArticles`, and `locationServicesAndHours` (16 keys in the script vs.
17 in the source of truth). Running this script today would silently
produce a snippet that doesn't compile against the current
`sectionVisibility` type.

---

## 3. What Does Not Exist At All

Confirmed via repo-wide search — no matches for scraping, extraction
confidence scoring, or an intake-agent pipeline:

- **Website URL scraping/analysis (§16, §17):** no HTTP-fetch-and-parse
  code, no `cheerio`/`playwright`-driven content scraper, nothing in
  `package.json` dependencies oriented toward this (playwright present is a
  devDependency for testing per `b44bb7e`, not a scraping tool).
- **AI content extraction with confidence/source tracking (§18):** no
  schema, type, or field anywhere for a confidence score or source
  attribution on extracted content.
- **Ambiguous/conflicting data detection and confirmation flow (§19):** no
  such UI state or logic in `IntakeForm.tsx` or anywhere else.
- **Chatbot-as-intake-agent (§31):** does not exist. `chatEngine.ts`
  ([src/lib/chatEngine.ts](src/lib/chatEngine.ts)) is a keyword/topic FAQ
  matcher (`findFaqMatch` at [chatEngine.ts:139-151](src/lib/chatEngine.ts#L139-L151),
  `getChatResponse` at [chatEngine.ts:193](src/lib/chatEngine.ts#L193)) built
  to answer **visitor** questions on a **live** client site using that
  site's own FAQ data. It has no connection to `/get-started`, no
  intake/extraction/classification/validation/normalization staging, and
  should not be treated as a starting point for a new intake agent — the
  two serve opposite directions of data flow (chatEngine reads existing
  client data outward to a visitor; an intake agent would need to write new
  client data inward from a prospect).

---

## 4. Risks If This Is Built Carelessly

### "AI → Data → UI" discipline

§31 specifically warns against "AI → random code changes → UI" in favor of
"AI → Data → UI." Checked whether any existing pattern in this codebase
violates that: **no violation found.** Every page component in `src/app`
reads from typed, centralized data modules (`business-content.ts`,
`data/*.ts`) and none were found generating or mutating UI structure at
runtime from free-form text. The two `dangerouslySetInnerHTML` uses in the
codebase ([JsonLd.tsx](src/components/JsonLd.tsx),
[ui/chart.tsx](src/components/ui/chart.tsx)) are standard JSON-LD structured
data and a chart-library CSS-var injector, respectively — not AI-driven code
generation. If a future scraping/extraction system is built, the existing
`sectionVisibility`/`copy`/`business-content.ts` shape is the correct target
to write into (extend the *data*, not generate new components or JSX), and
nothing in the current codebase would need to be unwound to preserve that
discipline.

### Untested live-infrastructure gap

`.env.example` has every credential-bearing variable
(`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
`NEXT_PUBLIC_BOOKING_URL`, `NEXT_PUBLIC_FOOTER_SIGNUP_ENDPOINT_URL`, etc.)
present but blank. Nothing in this session found evidence that the
booking/chat/intake pipeline has been exercised against live Supabase or
booking credentials. This is a standing, unresolved gap carried from earlier
work, not new. **It compounds directly:** a new AI-intake system (§16-§20,
§31) would sit downstream of this same unverified `clone_requests` /
Supabase pipeline (`generate-clone-config.mjs` already depends on it) — building
scraping/extraction on top of untested plumbing means two unverified systems
stacked instead of one, and a failure in the base layer would be
indistinguishable from a failure in the new AI layer during debugging.

---

## 5. Recommended Sequencing (recommendation only — not implemented)

Ranked by effort vs. value, not by section number:

1. **Fix the two Footer.tsx hardcoded strings (§3/§32 regression).**
   Trivial, isolated, one file. Do this regardless of anything else — it's
   the kind of leak that ships to a real client site with "template" in the
   footer copy.
2. **Fix `generate-clone-config.mjs`'s stale `SECTION_KEYS` list.**
   Trivial, isolated, one file. Currently silently produces
   output that won't match the live `sectionVisibility` type — cheap to fix,
   actively misleading if left as-is the next time it's run.
3. **Nav-visibility awareness (§12).** Small, isolated: filter `navItems` in
   `Header.tsx` by the same length checks already used for
   `sectionVisibility`, and add an empty-check to `MegaMenuDesktop`/
   `MegaMenuMobile` (mirroring `LogoMarquee.tsx`'s `items.length === 0`
   guard). Contained to two files, no new data model needed. Worth doing
   before any new clone ships with a real content gap in one category.
4. **Close the live-credentials verification gap.** Not code work — this is
   "actually run a booking/chat/intake flow against real Supabase +
   booking-provider credentials once." Comparatively cheap but currently
   totally unaddressed, and every layer above it (including any future
   AI-intake system) inherits its risk. Should happen before, not after,
   new intake work is layered on.
5. **Website scraping + AI extraction + confidence/ambiguity pipeline
   (§16-§20, §31).** This is the only item on this list that's a genuinely
   new, multi-week system: a scraper, an extraction/classification model
   call, a confidence-scoring and source-tracking data shape, an
   ambiguity-resolution UI, and a `ClientData` object shape wide enough to
   replace `generate-clone-config.mjs`'s current boolean-only output. Should
   be sequenced last, after items 1-4 are resolved, both because it's the
   largest effort and because it would be the first system built on top of
   the credentials gap in item 4 if that isn't closed first.
