# Client Revision System (Current, Manual Process)

**There is no automated diff/changeset tooling in this codebase today.**
Revising an existing client's live clone is a manual, human-driven process:
someone reads what changed for the client and hand-edits the relevant data
file(s). This document describes that real process as it exists right now —
it does not describe or imply any AI-assisted or automated alternative.
Field-level detail is in [CLONEABLE_CONTENT_SCHEMA.md](CLONEABLE_CONTENT_SCHEMA.md);
render/visibility detail is in [CONTENT_UI_MAPPING.md](CONTENT_UI_MAPPING.md).

---

## 1. How to identify what changed

No tooling exists for this. In practice, revising a client's site means:

- Reading the client's new information (an email, a call summary, a form
  resubmission — whatever channel they used) manually.
- Manually comparing it against what's currently in that clone's
  `business-content.ts` / `src/data/insurance.ts` / `src/data/locations.ts`
  / `src/lib/industryBrands.ts` to spot what's different.
- There is no before/after diff generator, no changeset log tied to client
  revisions, and no confidence/source tracking on any field. `git diff` on
  the clone's own repo will show the edit once made, but nothing helps
  identify *what needs to change* before a human reads the client's request.

## 2. Which file(s) to edit, by content type

Direct cross-reference to [CLONEABLE_CONTENT_SCHEMA.md](CLONEABLE_CONTENT_SCHEMA.md):

| Content type | File |
|---|---|
| `services`, `providers`, `staff`, `articles`, `carePlans`, `newClientSteps`, `whatToBring`, `logoMarquees`, `marqueeReviews`, `clientStories`, `proofCareStats`, `proofPageStories`, `trustStats`, `differentiators`, `howItWorks`, `healthResources`, `aboutValues`, `clinicExperienceFeatures`, `businessConfig`/`clinic`, `emergencyInfo`, `paymentInfo`, `sectionVisibility`, `copy` | `src/lib/business-content.ts` |
| `locations` | `src/data/locations.ts` |
| `insuranceProviders` | `src/data/insurance.ts` |
| `industryBrands` | `src/lib/industryBrands.ts` |

Everything a human needs to touch for a content revision lives in these four
files. No other file needs to change for a pure content/copy revision.

## 3. The array-based hide/show mechanism

Confirmed by the architecture already in place (see
[CONTENT_UI_MAPPING.md](CONTENT_UI_MAPPING.md) for the exact conditionals):
adding/removing an item from an array, or flipping a `sectionVisibility`
boolean, or emptying an array entirely, is sufficient on its own — **no
component or page code ever needs to change for a content revision.**

Concretely:

- To hide a boolean+length-gated section (e.g. `carePlans`,
  `clientStories`, `trustStats`, etc.): either set the matching
  `sectionVisibility.<key>` to `false`, or empty the backing array. Either
  is sufficient; you don't need both.
- To hide a length-only-gated item (logo marquee groups, the Team/
  Resources/Locations nav items and their mega-menu flyouts): empty the
  backing array (`industryBrands`, `insuranceProviders`, `providers`,
  `articles`, `locations`). There is no separate boolean for these — the
  array length is the only control.
- For the small set of **ungated** content types (`services`, `faqs` full
  page, `locations` full index, `articles` full index, `newClientSteps`,
  `whatToBring`, `aboutValues`, `emergencyInfo`, `paymentInfo`) — see the
  "no visibility gating at all" list in
  [CLONEABLE_CONTENT_SCHEMA.md](CLONEABLE_CONTENT_SCHEMA.md) — emptying the
  array/removing the content is still safe (it just produces an empty
  list/section rather than a hidden one; nothing crashes), but there is no
  boolean toggle available for these if a human wants to hide a *non-empty*
  version of that content temporarily. The only lever for those is editing
  the array's contents directly.
- Adding a *new* item to any of these arrays (new service, new provider, new
  location, etc.) works the same way in reverse — push an object matching
  the existing shape into the array. Routes for `[slug]`-based pages
  (`/services/[slug]`, `/team/[slug]`, `/resources/[slug]`,
  `/locations/[slug]`) are generated from the array via
  `generateStaticParams`, so a new array entry with a unique `slug`
  automatically gets its own page — no route file needs to be created or
  edited.

## 4. What's NOT automated today

Explicitly, so this isn't implied to exist by omission:

- **No AI extraction** from a client's message, email, or URL into
  structured data. A human reads the client's info and manually writes the
  corresponding object/string literal into the data files above.
- **No confidence scoring** on any field — there is no schema or type
  anywhere in this codebase for tracking how certain a piece of content is,
  or where it came from.
- **No before/after diff generation** between a client's old and new data.
  `git diff` shows the result of an edit already made; nothing produces a
  proposed diff from raw client input.
- **No website URL scraping.** No HTTP-fetch-and-parse code exists in this
  repo oriented toward pulling content from a client's existing site.
  (`playwright` is present only as a devDependency for testing.)
- **No ambiguity/conflict detection or confirmation UI.** If a human
  misreads or misinterprets a client's revision request, nothing in the
  system catches it — review is entirely manual (e.g. a PR review, or the
  human re-reading their own edit).

## 5. The one piece of semi-automation that exists: `generate-clone-config.mjs`

[scripts/generate-clone-config.mjs](scripts/generate-clone-config.mjs) is
real, but narrow in scope — it is an **initial-clone-setup** helper, not a
revision tool, and it does not touch an existing live client's data:

- **What it does:** reads one row from a Supabase `clone_requests` table
  (keyed by a `<clone_request_id>` CLI argument), pulls that row's
  `section_content` object (per-section yes/no answers collected by
  `IntakeForm.tsx` at `/get-started`), and writes a
  `scripts/output/clone-config-<id>.ts` file containing a ready-to-paste
  `export const sectionVisibility = { ... };` snippet plus a comment header
  echoing the row's contact/business fields (business name, contact name,
  email, phone, niche, number of locations, current booking system, notes —
  comments only, not usable as live data).
- **Current limitations, stated plainly:**
  - It emits **only** the `sectionVisibility` boolean block. It does not
    generate a `copy` object, `businessConfig` fields, `logoMarquees`,
    `services`, `providers`, `locations`, `articles`, or any other content
    type from [CLONEABLE_CONTENT_SCHEMA.md](CLONEABLE_CONTENT_SCHEMA.md) —
    none of the actual placeholder-token content a full clone needs.
  - Its output is explicitly "review before pasting" — the script's own
    generated header comment says so — it is not applied automatically to
    `business-content.ts`; a human still copies the relevant lines in by
    hand.
  - It requires live `NEXT_PUBLIC_SUPABASE_URL` and
    `SUPABASE_SERVICE_ROLE_KEY` credentials; the audit noted these are
    blank in `.env.example` and there's no confirmed evidence this pipeline
    has been exercised against live Supabase credentials in this repo.
  - **Drift protection (present in the current working tree, not yet
    committed):** the script now has an `assertSectionKeysMatchSource()`
    guard that reads `sectionVisibility`'s real keys straight out of
    `business-content.ts` and fails loudly if its own hardcoded
    `SECTION_KEYS` list has drifted from the source (missing or stale
    keys), instead of silently emitting a snippet that wouldn't compile.
    Previously (per the audit, reading the last-committed state) this list
    was stale — 16 keys vs. 17 in the real `sectionVisibility`, still
    listing two removed keys (`industryBrandsMarquee`, `insuranceMarquee`)
    and missing three current ones. That staleness is fixed in the current
    working-tree version of the script.
  - It has no equivalent for *revising* an already-live client — it is a
    one-shot generator tied to a single `clone_requests` row from initial
    intake, not a tool that reads a client's current deployed
    `business-content.ts` and proposes changes.
