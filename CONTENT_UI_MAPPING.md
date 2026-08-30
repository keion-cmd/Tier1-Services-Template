# Content → UI Mapping

Grounded against the working tree as of 2026-08-30, **including uncommitted
changes** currently on disk to `Header.tsx`, `MegaMenu.tsx`, `Footer.tsx`,
`business-content.ts`, and `generate-clone-config.mjs`. Companion to
[CLONEABLE_CONTENT_SCHEMA.md](CLONEABLE_CONTENT_SCHEMA.md) (field-level
schema) — this document maps each content type to the component(s)/page(s)
that render it and quotes the exact visibility conditional in code.

**Headline finding, stated once here so it isn't buried:** the nav-visibility
gap described in [CLONEABLE_SYSTEM_AUDIT.md](CLONEABLE_SYSTEM_AUDIT.md) §2
("Nav does not hide empty sections") **is fixed in the current working
tree.** The audit read the last-committed state (`d6611c8`); the fix landed
on top of that as an uncommitted change. Details in the "Navigation
awareness" section below.

---

## services

- **Components:** `ServiceCard`-style grid on `/services` (`src/app/services/page.tsx`), `servicesMegaMenu` items ([src/data/megaMenus.ts:19-24](src/data/megaMenus.ts#L19)), service detail page (`src/app/services/[slug]/page.tsx`).
- **Pages:** `/services`, `/services/[slug]`, referenced from homepage service grid.
- **Visibility condition:** none — no `if`/`&&` guard anywhere in the render path. `services.map(...)` runs unconditionally.
- **Nav item content-aware?** The "Services" nav item itself has no `visible` flag in `allNavItems` ([src/components/layout/Header.tsx](src/components/layout/Header.tsx)) — it always shows. Its mega-menu flyout (`MegaMenuDesktop`/`MegaMenuMobile`) DOES now self-hide when `config.items.length === 0` (see "Navigation awareness" below), so an empty `services` array would show a "Services" nav link with no dropdown flyout, but the `/services` page itself would still render (with a "00" count and an empty grid).

## providers

- **Components:** homepage team teaser, `/team` grid (`src/app/team/page.tsx`), provider detail page (`src/app/team/[slug]/page.tsx`).
- **Pages:** `/`, `/team`, `/team/[slug]`.
- **Visibility condition (homepage teaser):** `sectionVisibility.meetTheTeam && providers.length > 0` — [src/app/page.tsx:156](src/app/page.tsx#L156).
- **Visibility condition (`/team` grid):** `sectionVisibility.teamProvidersGrid && providers.length > 0` — [src/app/team/page.tsx:43](src/app/team/page.tsx#L43).
- **Visibility condition (provider's `areasOfInterest` block):** `sectionVisibility.providerAreasOfInterest && provider.areasOfInterest.length > 0` — [src/app/team/[slug]/page.tsx:78](src/app/team/[slug]/page.tsx#L78).
- **Nav item content-aware?** Yes. `{ href: "/team", label: "Team", visible: providers.length > 0 }` — [src/components/layout/Header.tsx:27](src/components/layout/Header.tsx#L27) (line number approximate post-edit). The item is filtered out of the exported `navItems` array entirely (not just visually hidden) when `providers.length === 0`.

## staff

- **Components:** `/about` team grid section.
- **Pages:** `/about` only.
- **Visibility condition:** `sectionVisibility.aboutTeamGrid && staff.length > 0` — [src/app/about/page.tsx:53](src/app/about/page.tsx#L53).
- **Nav item content-aware?** N/A — no dedicated nav item for `staff`; it lives on the always-visible "About" nav item.

## locations

- **Components:** `/locations` grid, `locationsMegaMenu` items ([src/data/megaMenus.ts:33-38](src/data/megaMenus.ts#L33)), location detail page (`src/app/locations/[slug]/page.tsx`).
- **Pages:** `/locations`, `/locations/[slug]`.
- **Visibility condition (index page):** none — `/locations` renders unconditionally.
- **Visibility condition (`servicesOffered` block on detail page):** `sectionVisibility.locationServicesAndHours && location.servicesOffered.length > 0` — [src/app/locations/[slug]/page.tsx:140](src/app/locations/[slug]/page.tsx#L140).
- **Visibility condition (`businessHours` block on detail page):** `sectionVisibility.locationServicesAndHours && location.businessHours.length > 0` — [src/app/locations/[slug]/page.tsx:154](src/app/locations/[slug]/page.tsx#L154).
- **Nav item content-aware?** Yes. `{ href: "/locations", label: "Locations", megaMenu: locationsMegaMenu, visible: locations.length > 0 }` — `Header.tsx`. Filtered out of `navItems` entirely when `locations.length === 0`.

## articles

- **Components:** `/resources` grid, `resourcesMegaMenu` items ([src/data/megaMenus.ts:26-31](src/data/megaMenus.ts#L26)), article detail page (`src/app/resources/[slug]/page.tsx`).
- **Pages:** `/resources`, `/resources/[slug]`.
- **Visibility condition (index page):** none — renders unconditionally.
- **Visibility condition (related-articles teaser on detail page):** `sectionVisibility.relatedArticles && related.length > 0` — [src/app/resources/[slug]/page.tsx:76](src/app/resources/[slug]/page.tsx#L76).
- **Nav item content-aware?** Yes. `{ href: "/resources", label: "Resources", megaMenu: resourcesMegaMenu, visible: articles.length > 0 }` — `Header.tsx`. Filtered out of `navItems` entirely when `articles.length === 0`.

## faqs

- **Components:** homepage FAQ teaser (`FaqTeaser`-style block), full FAQ accordion on `/faq`.
- **Pages:** `/`, `/faq`.
- **Visibility condition (homepage teaser):** `sectionVisibility.faqTeaser && faqs.length > 0` — [src/app/page.tsx:305](src/app/page.tsx#L305).
- **Visibility condition (`/faq` page):** no page-level boolean; categories are derived via `.filter((category) => category.items.length)` ([src/app/faq/page.tsx:11](src/app/faq/page.tsx#L11)) — length-only, per-category, no `sectionVisibility` key covers the page as a whole.
- **Nav item content-aware?** No. The "FAQ" nav item has no `visible` flag — always shown, even if `faqs` were empty (the page would just render zero categories/an empty accordion).

## carePlans

- **Components:** homepage care-plans cards.
- **Pages:** `/` only.
- **Visibility condition:** `sectionVisibility.carePlans && carePlans.length > 0` — [src/app/page.tsx:125](src/app/page.tsx#L125).
- **Nav item content-aware?** N/A — no dedicated nav item.

## newClientSteps

- **Components:** `/new-clients` step list (`StepList`).
- **Pages:** `/new-clients` only.
- **Visibility condition:** none — rendered unconditionally; only used to compute a display count in the hero copy string.
- **Nav item content-aware?** No. The "New Clients" nav item has no `visible` flag.

## whatToBring

- **Components:** `/new-clients` checklist block.
- **Pages:** `/new-clients` only.
- **Visibility condition:** none — `whatToBring.map(...)` runs unconditionally.
- **Nav item content-aware?** Same as `newClientSteps` — "New Clients" nav item is unconditional.

## logoMarquees (`partners`, `insurance` groups)

- **Components:** `LogoMarquee.tsx`, rendered once per group on the homepage.
- **Pages:** `/` only.
- **Visibility condition:** `if (items.length === 0) return null;` inside `LogoMarquee.tsx:18` — a component-level guard, not a `sectionVisibility` key. Each group is independent: `partners` (from `industryBrands`) can be empty while `insurance` (from `insuranceProviders`) still renders, and vice versa.
- **Nav item content-aware?** N/A — no nav item.

## insuranceProviders

- **Components:** feeds the `insurance` `logoMarquees` group (filtered, excludes `id === "other"`) and `InsuranceCombobox` (a booking/intake form field, unfiltered, includes `"other"`).
- **Pages:** homepage (via marquee), booking/intake forms wherever `InsuranceCombobox` is used.
- **Visibility condition:** none on the source array. The marquee consumer is length-gated as described above; the form combobox is not gated by anything (a form field with zero options would just be an empty dropdown — not currently guarded against).
- **Nav item content-aware?** N/A.

## industryBrands

- **Components:** feeds the `partners` `logoMarquees` group only.
- **Pages:** homepage.
- **Visibility condition:** none on the source array; the `LogoMarquee.tsx` length guard applies to the derived `logoMarquees[0].items`.
- **Nav item content-aware?** N/A.

## marqueeReviews

- **Components:** `ReviewsMarquee.tsx`, homepage.
- **Pages:** `/` only.
- **Visibility condition:** `sectionVisibility.reviewsMarquee && marqueeReviews.length > 0` — [src/app/page.tsx:243](src/app/page.tsx#L243).
- **Nav item content-aware?** N/A. (`/proof` — the "Reviews" nav item's target page — does not use this array; see `proofCareStats`/`proofPageStories` below and note under `trustStats`.)

## clientStories

- **Components:** homepage client-story cards.
- **Pages:** `/` only.
- **Visibility condition:** `sectionVisibility.clientStories && clientStories.length > 0` — [src/app/page.tsx:278](src/app/page.tsx#L278).
- **Nav item content-aware?** N/A.

## proofCareStats

- **Components:** `/proof` stats block.
- **Pages:** `/proof` only.
- **Visibility condition:** `sectionVisibility.proofCareStats && proofCareStats.length > 0` — [src/app/proof/page.tsx:40](src/app/proof/page.tsx#L40).
- **Nav item content-aware?** No. The "Reviews" nav item (which links to `/proof`) has no `visible` flag — always shown regardless of whether `proofCareStats` or `proofPageStories` are empty.

## proofPageStories

- **Components:** `/proof` stories block.
- **Pages:** `/proof` only.
- **Visibility condition:** `sectionVisibility.proofStories && proofPageStories.length > 0` — [src/app/proof/page.tsx:56](src/app/proof/page.tsx#L56).
- **Nav item content-aware?** Same as `proofCareStats` — "Reviews" nav item unconditional.

## trustStats

- **Components:** homepage trust-stats strip. Also imported (unconditionally) into `chatEngine.ts` for chat responses.
- **Pages:** `/`.
- **Visibility condition:** `sectionVisibility.trustStats && trustStats.length > 0` — [src/app/page.tsx:84](src/app/page.tsx#L84). No gating inside `chatEngine.ts`'s usage.
- **Nav item content-aware?** N/A.

## differentiators

- **Components:** homepage "why choose us" grid.
- **Pages:** `/` only.
- **Visibility condition:** `sectionVisibility.whyChooseUs && differentiators.length > 0` — [src/app/page.tsx:109](src/app/page.tsx#L109).
- **Nav item content-aware?** N/A.

## howItWorks

- **Components:** homepage steps section. Also imported (unconditionally) into `chatEngine.ts`.
- **Pages:** `/`.
- **Visibility condition:** `sectionVisibility.howItWorks && howItWorks.length > 0` — [src/app/page.tsx:192](src/app/page.tsx#L192).
- **Nav item content-aware?** N/A.

## healthResources

- **Components:** homepage resources teaser (distinct data from the full `articles` array/`/resources` page — see schema doc).
- **Pages:** `/` only.
- **Visibility condition:** `sectionVisibility.healthResources && healthResources.length > 0` — [src/app/page.tsx:255](src/app/page.tsx#L255).
- **Nav item content-aware?** N/A directly — but note this teaser sits above/near the "Resources" nav item's target page and is a *different* array from what drives that nav item's `visible` flag (`articles.length > 0`). A clone could have `healthResources` empty (hiding the homepage teaser) while `articles` is non-empty (keeping the "Resources" nav item visible), or vice versa — the two are not synchronized.

## aboutValues

- **Components:** `/about` values grid.
- **Pages:** `/about` only.
- **Visibility condition:** none — renders unconditionally.
- **Nav item content-aware?** N/A — "About" nav item always shown.

## clinicExperienceFeatures

- **Components:** homepage "facility/experience" gallery section.
- **Pages:** `/` only.
- **Visibility condition:** `sectionVisibility.clinicExperience && clinicExperienceFeatures.length >= 4` — [src/app/page.tsx:204](src/app/page.tsx#L204). Note the non-standard `>= 4` threshold (every other array-backed section uses `> 0`).
- **Nav item content-aware?** N/A.

## businessConfig / clinic

- **Components:** used throughout `Header.tsx`, `Footer.tsx`, every page hero, `JsonLd.tsx` schema builders, `chatEngine.ts`.
- **Pages:** all pages.
- **Visibility condition:** none — core identity data, always rendered. The `isTemplateDemo` field is itself a boolean gate for a different, separate component: `{businessConfig.isTemplateDemo && <TemplateSelfPromo />}` — [src/components/layout/Footer.tsx](src/components/layout/Footer.tsx) (uncommitted working-tree change; `TemplateSelfPromo.tsx` is a new, currently-untracked component file).
- **Nav item content-aware?** N/A.

## emergencyInfo

- **Components:** a homepage block ([src/app/page.tsx:356](src/app/page.tsx#L356), `.note` only) and `chatEngine.ts` (`.note`, `.referralLocationName`, `.referralLocationPhone`).
- **Pages:** `/` (homepage block), plus any page with the chat widget mounted (chat responses are page-independent).
- **Visibility condition:** none — both consumers render/use it unconditionally.
- **Nav item content-aware?** N/A.

## paymentInfo

- **Components:** `chatEngine.ts` only (`.methods`, `.insuranceNote`).
- **Pages:** none directly — only surfaces through chat responses.
- **Visibility condition:** none.
- **Nav item content-aware?** N/A.

---

## Navigation awareness — detailed status

The audit ([CLONEABLE_SYSTEM_AUDIT.md §2](CLONEABLE_SYSTEM_AUDIT.md)) found,
against the last committed state (`d6611c8`), that `navItems` was a static
array with no content-length filtering and that `MegaMenuDesktop`/
`MegaMenuMobile` had no empty-check.

**Current working-tree state (uncommitted): fixed.**

1. `Header.tsx` now builds an internal `allNavItems` array where the Team,
   Resources, and Locations entries carry a `visible: <array>.length > 0`
   flag. The exported `navItems` is `allNavItems.filter((item) => item.visible !== false)`
   — items are dropped from the array entirely, not just visually hidden,
   so `Footer.tsx`'s nav list (which imports the same `navItems`) inherits
   the fix automatically.
2. `MegaMenuDesktop` and `MegaMenuMobile` (`src/components/nav/MegaMenu.tsx`)
   each now start with `if (config.items.length === 0) return null;`,
   mirroring `LogoMarquee.tsx`'s existing guard. This is a defensive
   fallback per the code's own comment — `Header.tsx` already prevents the
   parent nav item (and thus the flyout) from mounting when the backing
   array is empty, so this second guard only matters if a mega-menu config
   is ever rendered from a path that doesn't go through `navItems`.

**Not covered by this fix** (still `none`/unconditional, per the entries
above): "Services", "FAQ", "New Clients", "About", "Reviews" nav items —
none of these check any array length. This is not necessarily a bug: a
services business is unlikely to ship with zero services, and "About",
"FAQ", "New Clients" aren't array-count-dependent pages in the same way.
Flagged here for completeness rather than as a confirmed defect.
