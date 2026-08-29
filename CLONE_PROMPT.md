# Clone Prompt (for AI / Claude)

Use this as the system/task prompt when an AI assistant clones this repository for a new client.

## System Prompt

> You are a senior frontend engineer cloning this Next.js template for a service business.

## Task

Turn this generic, niche-agnostic service-business template into a production-ready site for a
specific client — any service niche (Dental, Med-Spa, Physical Therapy, Legal, Home Services, Salon,
Veterinary, etc.) — by replacing every `[PLACEHOLDER]` token with real, client-approved content, and
by expanding the content arrays to match however much content the client actually has — not just the
demo's default counts.

### 1. Token replacement

All client content lives in `src/lib/business-content.ts` plus these sibling files in `src/data/`:

- `src/lib/business-content.ts` — `businessConfig` identity (including the `descriptor` field that
  names the niche, e.g. `"Dental Clinic"`, `"Med-Spa"`, `"Law Office"`), contact info, services, trust
  stats, differentiators, how-it-works steps, health resources, FAQs, staff, providers, emergency
  info, `aboutValues`, `articles` (the blog, served at `/resources`) — **and** the `copy` object,
  which holds every routed page's section headlines/subheadlines plus chat and booking-modal copy.
  Replace **all** of these, not just the business-identity fields — a clone with real name/phone/
  address but placeholder section headlines is incomplete.
- `src/data/insurance.ts` — accepted insurance/coverage providers. Each entry is `{ id, name }`. Feeds
  both the homepage marquee and the booking modal's insurance combobox — one source, no duplication.
- `src/data/locations.ts` — one object per physical location (`slug`, `name`, `address`, `city`,
  `phone`, `email`, `mapsUrl`, `landmark`, `description`, `servicesOffered[]`, `businessHours[]`,
  `imageKey`). A single-location clone keeps one entry; a multi-location clone adds more.
- `src/data/sampleActivity.ts` — optional simulated "recent booking" social-proof feed. Every entry is
  `isSimulated: true`. Only replace placeholders with real names/locations if the client has
  consented to this kind of social proof.
- `src/lib/industryBrands.ts` — the homepage partner-marks marquee. Each entry is `{ name: string }`
  only; there is no logo image file to source, upload, or size.
- `src/lib/booking.ts` — an optional fallback external scheduler URL (not the primary booking flow,
  which is the in-page Supabase-backed `BookingModal`).

Do not rename exported constants, object keys, or `slug` values — routes and detail pages
(`/services/[slug]`, `/team/[slug]`, `/resources/[slug]`, `/locations/[slug]`) depend on them. See
`CLONE_INSTRUCTIONS.md` for the full token checklist.

### 2. Unbounded arrays rule

The demo arrays (`services`, `providers`/`staff`, `faqs`, `healthResources`, `trustStats`,
`differentiators`, `howItWorks`, `aboutValues`, `industryBrands`, `articles`, insurance providers,
locations) each ship with a fixed demo count. **Treat these counts as a minimum, not a limit** — add
or remove entries freely to match however much real content the client has (or drop an array to empty
and let the corresponding UI section render nothing, where the component supports it, e.g.
`industryBrands`).

If the client provides **more** services, staff/providers, FAQs, resources, insurance providers, or
locations than the demo arrays contain, **append additional objects** to the relevant array rather
than dropping or merging content to fit.

- Every new object must follow the exact shape of its sibling entries in the same array (same keys,
  same types — e.g. a new service needs `number`, `slug`, `title`, `short`, `detail`, `category`,
  `benefits`, `process`, `duration`, `imageKey`).
- Generate a unique, URL-safe `slug` for every new entry (kebab-case, derived from the item's
  name/title, unique within its array).
- If the client provides **fewer** items than the demo count, remove the unused demo entries entirely
  rather than leaving placeholder tokens unfilled in production.
- Do not hardcode a max length anywhere in components — the UI renders these arrays via `.map()`, so
  it auto-expands and auto-contracts to whatever length the array actually is. This also applies to
  the Services/Resources/Locations mega menus in the nav (`src/data/megaMenus.ts`), which are
  generated from these arrays — do not hand-edit the nav to add/remove entries.

#### ARRAY BASELINE & SIZING RULES

Reference table of exact default (demo) counts and per-item fields. Use these as the baseline when
deciding whether the client's real content means you must expand, shrink, or fully replace an array.

| Array | Default count | Fields |
| --- | --- | --- |
| `services[]` | 9 | `number`, `slug`, `title`, `short`, `detail`, `category`, `benefits[]`, `process[]`, `duration`, `imageKey` |
| `staff[]` | 4 | `name`, `title`, `credentials`, `bio`, `imageKey` |
| `providers[]` | 4 | `slug`, `name`, `credentials`, `specialty`, `bio`, `yearsExperience`, `areasOfInterest[]`, `imageKey` |
| `faqs[]` | 8 | `question`, `answer`, `category` |
| `trustStats[]` | 5 | `value`, `label` |
| `differentiators[]` | 6 | `title`, `copy` |
| `marqueeReviews[]` | 5 | `author`, `segment`, `quote`, `rating` |
| `industryBrands[]` | — | `name` |
| `clientStories[]` | 3 | `clientName`, `segment`, `category`, `story`, `imageKey` |
| `articles[]` | 4 | `slug`, `title`, `category`, `author`, `date`, `readingTime`, `excerpt`, `body[]`, `imageKey`, `disclaimer` |
| `carePlans[]` | 3 | `title`, `subtitle`, `bullets[]` |
| `newClientSteps[]` | 5 | `step`, `title`, `copy` |
| `howItWorks[]` | 4 | `step`, `title`, `copy` |
| `aboutValues[]` | 4 | `title`, `copy` |
| `whatToBring[]` | 5 | string |
| `clinicExperienceFeatures[]` | 5 | `title`, `copy`, `imageKey` |
| `healthResources[]` | 3 | `title`, `excerpt`, `imageKey` |
| `insuranceProviders[]` (`src/data/insurance.ts`) | 8 + "Other" | `id`, `name` |
| `locations[]` (`src/data/locations.ts`) | 2 | `slug`, `name`, `address`, `city`, `phone`, `phoneDigits`, `email`, `mapsUrl`, `landmark`, `description`, `servicesOffered[]`, `businessHours[]`, `imageKey` |
| `sampleActivity[]` (`src/data/sampleActivity.ts`) | 8 | `id`, `name`, `location`, `service`, `minutesAgo`, `isSimulated` |

Sizing rules:

- **EXPANSION:** If the client provides MORE items than the default count, duplicate the object shape
  with unique slugs/IDs/imageKeys.
- **SHRINKAGE:** If the client provides FEWER items than the default count, remove excess objects so
  no empty or dummy entries remain.
- **IMAGE TOKENS:** For every added item, assign a unique placeholder token following the existing
  convention (e.g., `[SERVICE_10_IMAGE]`, `[PROVIDER_5_PHOTO]`).
- **STATIC NARRATIVE WARNING:** `clientStories[]` and `articles[]` contain full narrative demo copy,
  not just bracketed tokens — completely rewrite them to match the client's niche.

### 3. Image slot rule

Every image in this template is a placeholder slot (`<ImagePlaceholder>` from
`src/components/ImagePlaceholder.tsx`), not a real photo. For every array entry — including every
newly appended item from step 2 — assign a matching, uniquely numbered placeholder token consistent
with the existing naming convention (e.g. `[SERVICE_10_IMAGE]`, `[PROVIDER_5_PHOTO]`,
`[LOCATION_3_IMAGE]`). Wire the token through the entry's `imageKey` field exactly as the existing
entries do. Do not leave a new array entry without an image slot.

**Exception — partner brand marquee and insurance marquee:** `industryBrands` (`{ name: string }`)
and `insuranceProviders` (`{ id, name }`) entries are text-only and never get an image slot. Both
marquees render every entry as a bordered placeholder card — do not add a logo `<img>`, an
`imageKey`, or source any logo files for these arrays.

### 4. Theme color rule

Update the `--primary` HSL value in `src/app/globals.css`, under both `:root` (light mode) and
`.dark` (dark mode), to match the client's primary brand color. Convert the client's brand hex to HSL
first (hue, saturation%, lightness%, space-separated, no commas) — see `CLONE_INSTRUCTIONS.md` step 6
for the exact block format.

### 5. Supabase booking backend

The booking modal writes to Supabase via `/api/booking`. Run `supabase/schema.sql` against a Supabase
project and set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
`SUPABASE_SERVICE_ROLE_KEY` — see `CLONE_INSTRUCTIONS.md` step 4. The app runs fine with these unset
(bookings just won't persist), so this step can be deferred, but flag it clearly if left undone.

### 6. Verify before handing off

After all tokens are replaced and arrays are expanded/contracted to match the client's real content:

```bash
npm run check     # TypeScript typecheck — must report zero errors
npm run build      # Production build — must complete cleanly
npm run lint        # ESLint — must report zero errors/warnings
```

Search the repo for a literal `[` to confirm no placeholder tokens remain (aside from intentional
bracket characters in normal prose, if any). Then follow the deployment steps in
`CLONE_INSTRUCTIONS.md`.
