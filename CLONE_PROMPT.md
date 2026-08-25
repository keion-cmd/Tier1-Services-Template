# Clone Prompt (for AI / Claude)

Use this as the system/task prompt when an AI assistant clones this repository for a new client.

## System Prompt

> You are a senior frontend engineer cloning this template for a service business.

## Task

Turn this generic, niche-agnostic Tier 1 service-business template into a production-ready site for
a specific client — any service niche (Dental, Med-Spa, Physical Therapy, Legal, Home Services,
Salon, Veterinary, etc.) — by replacing every `[PLACEHOLDER]` token with real, client-approved
content, and by expanding the content arrays to match however much content the client actually has —
not just the demo's default counts.

### 1. Token replacement

All client content lives in two files:

- `client/src/lib/business-content.ts` — `businessConfig` identity (including the `descriptor` field
  that names the niche, e.g. `"Dental Clinic"`, `"Med-Spa"`, `"Law Office"`), contact info, services,
  trust stats, differentiators, how-it-works steps, health resources, FAQs, staff, providers, and
  emergency info.
- `client/src/lib/booking.ts` — the fallback booking/scheduler URL.

Replace every `[BRACKETED_PLACEHOLDER_TOKEN]` in both files with the client's real copy, and set
`businessConfig.descriptor` to the client's niche. Do not rename exported constants, object keys, or
`slug` values — routes and detail pages (`/services/:slug`, `/team/:slug`) depend on them. See
`CLONE_INSTRUCTIONS.md` for the full token checklist, including the handful of tokens that live
outside these two files (`client/index.html`, `client/src/index.css`, `client/src/pages/Location.tsx`).

### 2. Unbounded arrays rule

The demo arrays (`services`, `providers`/`staff`, `faqs`, `healthResources`, `trustStats`,
`differentiators`, `howItWorks`) each ship with a fixed demo count (e.g. 6 services, 3 providers).
**Treat these counts as a minimum, not a limit.**

If the client provides **more** services, staff/providers, FAQs, or resources than the demo arrays
contain, **append additional objects** to the relevant array (`services[]`, `providers[]`,
`staff[]`, `faqs[]`, `healthResources[]`, etc.) rather than dropping or merging content to fit.

- Every new object must follow the exact shape of its sibling entries in the same array (same
  keys, same types — e.g. a new service needs `number`, `slug`, `title`, `short`, `detail`,
  `icon`, `category`, `benefits`, `process`, `duration`, `imageKey`).
- Generate a unique, URL-safe `slug` for every new entry (kebab-case, derived from the item's
  name/title, unique within its array).
- If the client provides **fewer** items than the demo count, remove the unused demo entries
  entirely rather than leaving placeholder tokens unfilled in production.
- Do not hardcode a max length anywhere in components — the UI already renders these arrays via
  `.map()`, so it auto-expands and auto-contracts to whatever length the array actually is. Do
  not add slicing, pagination, or "show only first N" logic unless the client explicitly asks
  for it.

### 3. Image slot rule

Every image in this template is a placeholder slot (`<ImagePlaceholder>` from
`client/src/components/ImagePlaceholder.tsx`), not a real photo. For every array entry —
including every newly appended item from step 2 — assign a matching, uniquely numbered
placeholder token consistent with the existing naming convention, e.g.:

- `[SERVICE_7_IMAGE]`, `[SERVICE_8_IMAGE]`, … for services beyond the demo's 6
- `[PROVIDER_4_PHOTO]`, `[PROVIDER_5_PHOTO]`, … for providers beyond the demo's 3
- `[STAFF_4_PHOTO]`, … for staff beyond the demo's 3
- `[RESOURCE_4_IMAGE]`, `[RESOURCE_5_IMAGE]`, … for resources/articles beyond the demo's 3

Wire the token through the entry's `imageKey` field (or the equivalent field used by that array)
exactly as the existing entries do, so the `<ImagePlaceholder>` usage at the render site picks it
up automatically. Do not leave a new array entry without an image slot.

### 4. Theme color rule

Update the `--primary` HSL value (and the paired `--ring` value, which should stay close to
`--primary`) in `client/src/index.css`, under both `:root` (light mode) and `.dark` (dark mode),
to match the client's primary brand color. Convert the client's brand hex to HSL first (hue,
saturation%, lightness%, space-separated, no commas) — see `CLONE_INSTRUCTIONS.md` step 5 for the
exact block format and an example.

### 5. Verify before handing off

After all tokens are replaced and arrays are expanded/contracted to match the client's real
content:

```bash
npm run check     # TypeScript typecheck — must report zero errors
npm run build      # Production build — must complete cleanly
```

Search the repo for a literal `[` to confirm no placeholder tokens remain (aside from intentional
bracket characters in normal prose, if any). Then follow the deployment steps in
`CLONE_INSTRUCTIONS.md`.
