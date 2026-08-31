# Tier1 Phase 5 — Deep UX + Information Architecture Audit

Read-only audit. No code changed. Covers all 15 routes against `src/lib/business-content.ts`,
`src/data/locations.ts`, every `src/app/**/page.tsx`, and shared components
(`PageBlocks.tsx`, `ImmersiveHero.tsx`, `InteractiveServiceGallery.tsx`, `Header.tsx`, `MegaMenu.tsx`).

**Important context correction:** two prior audit docs exist in the repo root
(`CONTENT_DEPTH_AUDIT.md`, `REFERENCE_SITE_ANALYSIS.md`). They are now **stale** — most of the
structural gaps they flagged as P0/P1 (service "who's this for," per-service FAQ, related
services, provider→service cross-links, article→service cross-links, location parking/access
notes, new-clients dead-end) have already been implemented in the current codebase. This audit
reflects the code as it actually stands today, not those docs. Recommend archiving or deleting
those two files once this one is reviewed, to avoid future confusion.

---

## 1. Page-by-page matrix

| Page | Depth | Questions | Interaction | Cross-links | Visual |
|---|---|---|---|---|---|
| Home | HIGH | HIGH | MED | HIGH | HIGH |
| About | MED | MED | LOW | HIGH | HIGH |
| Services (list) | HIGH | MED | MED | HIGH | HIGH |
| Service Detail | HIGH | HIGH | MED | HIGH | HIGH |
| Team (list) | MED | MED | MED | HIGH | HIGH |
| Team Detail | MED | MED | LOW | HIGH | HIGH |
| Locations (list) | MED | MED | MED | HIGH | HIGH |
| Location Detail | HIGH | HIGH | MED | HIGH | HIGH |
| Resources (list) | MED | MED | LOW | HIGH | HIGH |
| Resource Detail | HIGH | HIGH | LOW | HIGH | HIGH |
| Proof | MED | MED | LOW | MED | HIGH |
| FAQ | MED | HIGH | MED | MED | HIGH |
| New Clients | MED | MED | LOW | MED | HIGH |
| Success Stories | MED | MED | LOW | MED | HIGH |
| Contact | MED | HIGH | LOW | MED | HIGH |

Visual is uniformly HIGH because every page shares the same disciplined component system
(`ImmersiveHero`, `Section`/`SectionHeading`, consistent type scale, consistent tint
alternation). That consistency is also the source of the one real systemic weakness — see §4.

---

## 2. What's already solved (don't re-touch)

Confirmed in code, contradicting the two stale audit docs:

- **Service Detail** (`services/[slug]/page.tsx`) has: benefits, process, a `bestFor[]`
  "is this right for you?" block (renders only when present), per-service FAQ via
  `faq.serviceSlug`, and a same-category "Related Services" grid. This was the single
  biggest structural gap identified previously — it's closed.
- **Provider Detail** (`team/[slug]/page.tsx`) links out via `provider.relatedServiceSlugs` to
  a "Services {name} offers" grid. Team list cards also surface these as clickable badges.
- **Article Detail** (`resources/[slug]/page.tsx`) links to `article.relatedServiceSlugs` and
  has a working related-articles section.
- **Location Detail** has `location.accessNotes` (parking/access), full hours, embedded map +
  directions CTA, and services-offered grid.
- **New Clients** no longer dead-ends — it has an explicit "Have questions? → FAQ / Services"
  row before the final CTA.
- **Generic "Learn More" spam does not exist.** A sitewide grep for Learn More/Explore/View
  Details/Read More/Discover found every CTA is already contextual: "Explore Services," "Meet
  the full team," "Explore {service.title}," "Read the full team," "Get Directions," "View
  profile," "Read article." Section 7 of the brief (avoid generic Learn More) is already met.
- **Anti-fabrication guards exist**: emergency note, access notes, and marquee review quotes
  are all gated behind `isPlaceholderToken`/regex checks so bracket placeholders never render
  to a real visitor; client stories and proof stories self-label as illustrative demo content.
- **Graceful degradation exists**: nearly every optional section is wrapped in
  `sectionVisibility.x && array.length > 0`, and nav items for Team/Resources/Locations/Client
  Stories are dropped entirely (not shown empty) via `hasRealEntries()` in `Header.tsx`. This
  is real handling of the sparse-data test (§16 of the brief), not a gap.

---

## 3. Mini-homepage test

**About** — story/mission/values/team/CTA are present, but "why this business exists" lives in
exactly two free-text paragraphs (`approachParagraph1/2`) with no distinct founding-story,
milestone, or credentials-with-detail structure separate from the 4 generic "values" cards. A
visitor gets *shape* (values, approach, staff) but not a distinct narrative arc — passes
loosely, weakest of the "mini-homepage" candidates.

**Services (list)** — passes: category filter, duration + top-2 benefit chips now render on
every card (already implemented in `InteractiveServiceGallery.tsx:72-87`, contradicting the
stale audit's claim these fields are unused), links to detail.

**Service Detail** — passes cleanly: what it is, who it's for, what happens (process), proof it
works (benefits), doubts resolved (per-service FAQ), what's next (related services + CTA). This
is now the most complete page-type in the site relative to its scope.

**Location Detail** — passes: address/hours/phone/email/map/directions/parking/services-here,
nothing forces a visitor elsewhere to decide "is this location right for me."

Weakest mini-homepage candidates: **Proof** (stats + reviews are present, but the page doesn't
independently explain *why* to trust these stats — no methodology/sourcing note) and
**Contact** (strong on "how do I reach you," thin on "why reach out" — no map embed on Contact
itself, unlike Location Detail, so a visitor has to leave to `/locations` to see one).

---

## 4. Real finding: inner-page rhythm homogeneity (the one systemic issue)

The brief's §13 concern — "Card Grid → Card Grid → Card Grid" — does **not** apply to the
homepage, which has genuine layout variety: immersive hero, a `.dark`-scoped section, an
asymmetric image collage ("Designed Around Your Comfort"), a `StatBlock`, a `StepList`, and
multiple marquees.

It **does** apply to every inner page. About, Service Detail, Proof, FAQ, New Clients, Contact,
Success Stories, Team, and Locations are all structurally: `ImmersiveHero` → `Section` +
`SectionHeading` + card-grid → (repeat 3-6x, alternating `bg-secondary/30` for the only visual
variation) → `PageOutro`. None of them borrow the homepage's asymmetric image collage, dark
section, or large-type editorial statement pattern (About actually has one large-type paragraph
buried mid-page at `about/page.tsx:47`, but it's the exception, not the rhythm).

This is the most defensible P1 finding in this audit: the component discipline that makes every
page feel *consistent and premium* is the same thing making inner pages feel *repetitive*
once you scroll two or three sections in.

---

## 5. Card usage audit (§12 of the brief)

Card is used 27 times across 11 files. Most usage is legitimate — services, team, locations,
resources, and testimonials are genuinely parallel, comparable, clickable entities, which is
exactly when a card grid is the right call.

Two patterns are Card-for-a-list overuse (single icon + one sentence, wrapped in a bordered box,
repeated 3-5x in a grid) that would read cleaner as a compact list/row:
- **"What to bring"** (`new-clients/page.tsx:49-57`) — 5 items, each its own Card.
- **Service benefits / bestFor reasons** (`services/[slug]/page.tsx:76-84`, `107-115`) — same
  pattern, repeated twice on the same page (benefits grid, then bestFor grid a few sections
  later), which also contributes to §4's rhythm problem since it's two near-identical card
  grids back to back.

Contact's 4-up FeatureCard grid (phone/email/address/hours) is a borderline but acceptable use —
it's a common, scannable pattern for a contact block, not flagged as a fix.

---

## 6. Interaction depth / progressive information (§5 of the brief)

The brief specifies three levels: Preview (card) → Explore (modal/drawer/expandable) → Full
detail (page). The current implementation has **Level 1 and Level 3, and skips Level 2
entirely** — every card either shows static preview info or navigates to a full page. There is
no modal/drawer/expandable-panel content anywhere except `BookingModal` (a transactional flow,
not a content-reveal) and `ChatWidget`.

This reads as correct restraint, not a gap: the brief itself warns "do not put huge content into
tiny modals," and none of the current content chunks (a service's 3 benefits, a provider's bio)
are large enough to need a Level 2 detour before the Level 3 page. The one place Level 2 already
exists and is used well is the **FAQ accordion** (`faq/page.tsx`, `services/[slug]/page.tsx`
per-service FAQ) — genuine expand-in-place progressive disclosure, correctly scoped.

Do not add drawers/modals for services, team, or locations — there's no content volume today
that justifies it, and it would fight the "no interaction for its own sake" rule (§21).

---

## 7. Animation / accessibility spot-check

- `prefers-reduced-motion` is respected in `globals.css` and `ScrollReveal.tsx` — base
  accessibility for motion is already handled.
- `ScrollReveal` wrapping is inconsistent: most sections on About/FAQ/Home are wrapped, but
  New Clients' step list and "what to bring" sections, and Proof's top stats strip, render with
  no reveal wrapper — animation feels slightly inconsistent page-to-page, not a functional bug.
- Accordion, Sheet (mobile nav), NavigationMenu, and Collapsible (mobile mega menu) all come
  from shadcn/Radix primitives, which already ship correct keyboard/focus/ESC/ARIA behavior —
  no custom audit needed there, it's inherited correctness.
- Nothing in this pass surfaced a broken keyboard trap, missing alt text, or contrast issue —
  a full manual accessibility pass (screen reader + keyboard-only walkthrough) is still worth
  doing before launch but wasn't run as part of this code-level audit.

---

## 8. Priority fix list

**P0 — Critical (contradicts the Tier1 vision)**
None found. The cross-linking, progressive-info, and mini-homepage architecture the vision
describes is already built for every page type.

**P1 — High (meaningfully reduces UX quality)**
1. Break inner-page rhythm homogeneity (§4) — give About and Service Detail at least one
   editorial/asymmetric moment (image + large-type story block, timeline, or similar) instead
   of another card grid, borrowing the pattern the homepage already has.
2. Collapse the double card-grid on Service Detail (benefits grid + bestFor grid back-to-back,
   §5) into one visually distinct block, or vary their layout from each other.
3. Convert "what to bring" (New Clients) from 5 Cards to a compact checklist row (§5).

**P2 — Medium (polish)**
1. Apply `ScrollReveal` consistently to New Clients' step/bring sections and Proof's stats
   strip so entry-animation rhythm matches the rest of the site.
2. Add a category filter to `/resources`, mirroring the pattern `/services` already has —
   today the two "browse" pages behave inconsistently.
3. Give Proof a one-line sourcing/methodology note near the stats so the trust section
   explains itself independently, not just via the linked FAQ.

**P3 — Nice to have**
1. Embed a small map/directions link on `/contact` itself (today it only lives on Location
   Detail), so Contact doesn't require a detour to answer "where are you."
2. If team size or location count grows meaningfully, revisit whether a specialty-match filter
   (Team) or comparison view (Locations) becomes justified — not needed at current scale.

---

## 9. What this audit is *not* saying

Per the brief's rule against fabrication (§17): most remaining "does this page really answer a
user's question" uncertainty is not a structural gap, it's that `business-content.ts` still
carries bracket placeholder copy (`[SERVICE_1_BEST_FOR_1]`, etc.) for large parts of the site.
The data shapes needed to answer real questions already exist and are already wired into every
page — what's missing is the client's real business content, which this audit correctly does
not attempt to invent.
