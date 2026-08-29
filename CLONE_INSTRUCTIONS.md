# Clone Instructions

This repository is a cloneable, niche-agnostic service-business website template built on **Next.js 15
(App Router)** with an optional **Supabase** backend for the booking flow. It works equally well for a
dental practice, med-spa, physical therapy clinic, law office, home-services business, salon, or
veterinary clinic. Every client-specific string (name, contact info, staff bios, service copy, stats,
FAQs, etc.) has been replaced with a `[BRACKETED_PLACEHOLDER_TOKEN]`. Follow the steps below to turn
this into a live site for a new client.

To adapt the template to a specific niche, set `businessConfig.descriptor` (e.g. `"Dental Clinic"`,
`"Wellness Spa"`, `"Physical Therapy Practice"`, `"Law Office"`) and fill in the placeholder tokens
below with copy appropriate to that niche. No component code needs to change — every page reads its
niche-specific language from `business-content.ts` and the sibling files in `src/data/`.

## 1. Clone the repo

```bash
git clone <this-repo-url> new-client-site
cd new-client-site
npm install
cp .env.example .env.local
```

Create a new git remote (or a fresh repo) for the client if you don't want to push back to this template.

## 2. Fill in the content files

All client content lives in `src/lib/business-content.ts` plus a handful of sibling data files in
`src/data/`. Nothing else needs to change to get a working, on-brand site.

### `src/lib/business-content.ts`

The primary content file. Exports:

- `businessConfig` (aliased as `clinic`) — name, short name, tagline, descriptor (the niche label),
  address, city, phone, email, hours, Google review URL, maps URL, `businessHours[]`, `socialLinks[]`.
- `copy` — every routed page's section headlines/subheadlines, keyed by page: `copy.home`,
  `copy.about`, `copy.services`, `copy.serviceDetail`, `copy.team`, `copy.proof`, `copy.faq`,
  `copy.locations`, `copy.location`, `copy.resources`, `copy.articleDetail`, `copy.newClients`,
  `copy.notFound`, `copy.siteShell`, `copy.chat`, `copy.booking`.
- Content arrays: `aboutValues`, `services`, `trustStats`, `differentiators`, `howItWorks`,
  `healthResources`, `marqueeReviews`, `faqs`, `staff`, `emergencyInfo`, `paymentInfo`, `providers`,
  `articles` (doubles as the blog — see `/resources`), `carePlans`, `newClientSteps`, `whatToBring`,
  `clinicExperienceFeatures`, `clientStories`.

Replace every `[PLACEHOLDER]` token — in the data arrays **and** in `copy` — with real,
client-approved copy, and set `businessConfig.descriptor` to the client's niche. Replace **all**
visible section titles/subtitles this way, not just the business-identity fields (name, phone,
address) — the hero headline, every section heading and supporting sentence, and every page's final
CTA heading/subheading all read from `copy`. Do not rename the exported constants, object keys, or
`slug` values — routes and the service/team/resources/locations detail pages
(`/services/[slug]`, `/team/[slug]`, `/resources/[slug]`, `/locations/[slug]`) depend on them.

### `src/data/insurance.ts`

Feeds both the homepage `InsuranceMarquee` and the `InsuranceCombobox` used in the booking modal.
Replace each `[INSURANCE_PROVIDER_n_NAME]` token with a real accepted provider/payer name. Add or
remove entries freely — both the marquee and the combobox re-flow automatically. Leave the
`"Other / Not Listed"` entry in place; the booking form's "specify your provider" field depends on
that exact string.

### `src/data/megaMenus.ts`

Not client-edited directly — it auto-generates the Services/Resources/Locations nav flyouts from
`services`, `articles`, and `locations`, grouped by each item's `category` (or `city`, for
locations). Editing the `category`/`city` field on entries in the source arrays is enough to reshape
the nav; you should not need to touch this file.

### `src/data/locations.ts`

One entry per physical location. A single-location clone can delete every entry but the first;
a multi-location clone adds one object per location. Fields: `slug`, `name`, `address`, `city`,
`phone`, `phoneDigits`, `email`, `mapsUrl`, `landmark`, `description`, `servicesOffered[]`,
`businessHours[]`, `imageKey`. `mapsUrl` doubles as the directions link; the embedded map on the
detail page is generated automatically from `address` + `city`, no manual embed URL needed.

### `src/data/sampleActivity.ts`

Simulated "recent booking" social-proof feed shown by `<ActivityNotification />` (bottom-left toast
that cycles fake bookings). Every entry is explicitly `isSimulated: true`. Replace the placeholder
names/locations with real ones only if the client has consented to displaying this kind of social
proof — otherwise leave the placeholders, or remove `<ActivityNotification />` from
`src/app/layout.tsx` entirely to disable the feature.

### `src/lib/industryBrands.ts`

The `industryBrands` array feeds the homepage's partner-marks marquee (`IndustryBrandMarquee.tsx`).
Each entry is `{ name: string }` only — **no logo image file is required**; every brand renders as a
bordered text/placeholder card. Replace each token with the real partner/vendor name, or empty the
array if the client has no partner marks to show.

### `src/lib/booking.ts`

`BOOKING_URL` is an optional external scheduler link (e.g. Calendly) used as a fallback in a couple
of places. It is **not** the primary booking flow — that's the in-page `BookingModal` (Supabase-backed,
see step 4). Set it via the `NEXT_PUBLIC_BOOKING_URL` environment variable if needed.

## 3. Search-and-replace token checklist

Search the repo for `[` to find every remaining token. All tokens live in `src/lib/business-content.ts`
unless noted otherwise.

**Business identity & contact** (`businessConfig`)
`[BUSINESS_NAME]` · `[BUSINESS_SHORT_NAME]` · `[BUSINESS_TAGLINE]` · `[BUSINESS_DESCRIPTOR]` ·
`[BUSINESS_ADDRESS]` · `[BUSINESS_CITY]` · `[BUSINESS_PHONE]` · `[BUSINESS_PHONE_DIGITS]` ·
`[BUSINESS_EMAIL]` · `[BUSINESS_HOURS_SUMMARY]` · `[HOURS_ROW_n_DAYS/HOURS]` — n = 1 through 3

**Services** (`services[1-9]`) — each: `[SERVICE_n_NAME]` · `[SERVICE_n_SHORT_DESCRIPTION]` ·
`[SERVICE_n_DESCRIPTION]` · `[SERVICE_n_BENEFIT_1/2/3]` · `[SERVICE_n_PROCESS_STEP_1/2/3_TITLE/DESCRIPTION]` ·
`[SERVICE_n_DURATION]` · `[SERVICE_n_IMAGE]` (leave `category` — used to group the Services mega menu)

**Trust stats bar** (`trustStats[1-5]`) `[TRUST_STAT_n_VALUE]` · `[TRUST_STAT_n_LABEL]`

**Why choose us** (`differentiators[1-6]`) `[DIFFERENTIATOR_n_TITLE]` · `[DIFFERENTIATOR_n_DESCRIPTION]`

**How it works** (`howItWorks[1-4]`) `[HOW_IT_WORKS_STEP_n_TITLE]` · `[HOW_IT_WORKS_STEP_n_DESCRIPTION]`

**Health/education resource teasers** (`healthResources[1-3]`) `[RESOURCE_n_TITLE]` ·
`[RESOURCE_n_EXCERPT]` · `[RESOURCE_n_IMAGE]`

**Homepage review marquee** (`marqueeReviews[1-5]`) `[REVIEW_n_AUTHOR]` · `[REVIEW_n_SEGMENT]` ·
`[REVIEW_n_QUOTE]`

**FAQs** (`faqs[1-8]`) `[FAQ_n_QUESTION]` · `[FAQ_n_ANSWER]` (leave `category` untouched — the FAQ
page groups entries by that exact string)

**About-page team grid** (`staff[1-4]`) `[STAFF_n_NAME]` · `[STAFF_n_TITLE]` · `[STAFF_n_CREDENTIALS]` ·
`[STAFF_n_BIO]` · `[STAFF_n_PHOTO]`

**Team / provider profile pages** (`providers[1-4]`) `[PROVIDER_n_NAME]` · `[PROVIDER_n_CREDENTIALS]` ·
`[PROVIDER_n_SPECIALTY]` · `[PROVIDER_n_BIO]` · `[PROVIDER_n_INTEREST_1/2/3]` · `[PROVIDER_n_PHOTO]`

**Emergency & after-hours referral** (`emergencyInfo`) `[EMERGENCY_HEADING]` · `[EMERGENCY_NOTE]` ·
`[EMERGENCY_REFERRAL_NAME]` · `[EMERGENCY_REFERRAL_PHONE]` · `[EMERGENCY_REFERRAL_PHONE_DIGITS]` ·
`[EMERGENCY_REFERRAL_ADDRESS]` · `[EMERGENCY_INSTRUCTIONS]`

**Payment info** (`paymentInfo`) `[PAYMENT_INFO_HEADING]` · `[PAYMENT_INFO_NOTE]`

**About-page values grid** (`aboutValues[1-4]`) `[ABOUT_VALUE_n_TITLE]` · `[ABOUT_VALUE_n_DESCRIPTION]`

**Resources / blog articles** (`articles[1-4]`) `[ARTICLE_n_TITLE]` · `[ARTICLE_n_CATEGORY]` ·
`[ARTICLE_n_AUTHOR]` · `[ARTICLE_n_DATE]` · `[ARTICLE_n_READING_TIME]` · `[ARTICLE_n_EXCERPT]` ·
`[ARTICLE_n_BODY_PARAGRAPH_1-5]` · `[RESOURCE_n_IMAGE]`

**Care plans** (`carePlans[1-3]`) `[CARE_PLAN_n_TITLE]` · `[CARE_PLAN_n_SUBTITLE]` ·
`[CARE_PLAN_n_BULLET_1-4]`

**New-client onboarding steps** (`newClientSteps[1-5]`) `[NEW_CLIENT_STEP_n_TITLE]` ·
`[NEW_CLIENT_STEP_n_DESCRIPTION]`

**What to bring** (`whatToBring[1-5]`) `[WHAT_TO_BRING_ITEM_n]`

**Facility/experience features** (`clinicExperienceFeatures[1-5]`) `[EXPERIENCE_FEATURE_n_TITLE]` ·
`[EXPERIENCE_FEATURE_n_DESCRIPTION]` · `[CLINIC_n_IMAGE]`

**Client success stories** (`clientStories[1-3]`) `[CLIENT_STORY_n_NAME]` · `[CLIENT_STORY_n_SEGMENT]` ·
`[CLIENT_STORY_n_CATEGORY]` · `[CLIENT_STORY_n_TEXT]` · `[CLIENT_n_PHOTO]`

**Insurance providers** (`src/data/insurance.ts`, `insuranceProviders[1-8]`)
`[INSURANCE_PROVIDER_n_NAME]`

**Locations** (`src/data/locations.ts`, `locations[1-2]` by default) `[LOCATION_n_NAME]` ·
`[LOCATION_n_ADDRESS]` · `[LOCATION_n_CITY]` · `[LOCATION_n_PHONE]` · `[LOCATION_n_PHONE_DIGITS]` ·
`[LOCATION_n_EMAIL]` · `[LOCATION_n_LANDMARK]` · `[LOCATION_n_DESCRIPTION]` ·
`[LOCATION_n_HOURS_ROW_1-3_DAYS/HOURS]` · `[LOCATION_n_IMAGE]`

**Simulated activity feed** (`src/data/sampleActivity.ts`, optional) `[SAMPLE_ACTIVITY_NAME_n]` ·
`[SAMPLE_ACTIVITY_LOCATION_n]`

**Partner/vendor brand marquee** (`src/lib/industryBrands.ts`) `[PARTNER_BRAND_n]`

**Section copy** (the `copy` object — every page's headlines/subheadlines) — search for `[` inside
each nested key (`copy.home`, `copy.about`, `copy.services`, `copy.serviceDetail`, `copy.team`,
`copy.proof`, `copy.faq`, `copy.locations`, `copy.location`, `copy.resources`, `copy.articleDetail`,
`copy.newClients`, `copy.notFound`, `copy.siteShell`, `copy.chat`, `copy.booking`) — every value is a
placeholder token that must be filled in.

Button labels (e.g. "Book an Appointment"), nav item labels, and structural copy are reusable
boilerplate and do not need to change unless you want to.

## 3b. Hide optional sections (`sectionVisibility`)

`sectionVisibility` in `business-content.ts` is a boolean map — one key per optional homepage/
proof/about/team section (e.g. `trustStats`, `whyChooseUs`, `carePlans`, `proofStories`). Every
key defaults to `true`. Set a key to `false` to hide that section entirely, or empty its backing
data array (where the section is array-backed) — either one hides it; you don't need to do both.
Hero, Services Showcase, the Lead Gen Form, and the Final CTA are always-required and are not part
of this map.

### Generating a first draft from an intake submission

`scripts/generate-clone-config.mjs` converts a submitted `/get-started` row (stored in the
`clone_requests` Supabase table) into a draft `sectionVisibility` object, so you don't have to
hand-transcribe the intake form's 16 yes/no answers. Run:

```bash
node scripts/generate-clone-config.mjs <clone_request_id>
```

It requires `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (from `.env`/`.env.local`)
and writes `scripts/output/clone-config-<id>.ts` — a commented header with the lead's identity
fields (business name, contact info, niche, notes) followed by the generated `sectionVisibility`
object. This file is gitignored and is a starting point only: review its values against the intake
notes before pasting the object into the new clone's `business-content.ts`.

## 4. Configure Supabase (booking flow)

The booking modal (`src/components/booking/BookingModal.tsx`) POSTs to `/api/booking`, which writes to
Supabase. The site **runs fine with no Supabase configured** — the booking form still renders, but
submissions fail gracefully with an error toast instead of persisting anywhere. To make bookings work:

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor (Dashboard → SQL Editor → New Query). This
   creates `bookings`, `appointments`, and `chat_interactions`.
3. Set these in `.env.local` (and in your host's environment variables for production):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. (Optional) Set `GOOGLE_SHEETS_SCRIPT_URL` to a Google Apps Script web app URL to also mirror every
   booking to a Google Sheet as a best-effort secondary sync (never blocks the booking response).

See `.env.example` for the full list of environment variables, all optional except the three Supabase
keys above (and those are only required if you want bookings to persist).

## 5. Replace image placeholders

Every image slot in this template renders a dashed `ImagePlaceholder` block
(`src/components/ImagePlaceholder.tsx`) instead of a real photo, so no demo client/business images
ship in the template. Each block shows a label and a bracketed token telling you exactly what belongs
there.

To swap a slot for a real photo, drop the client's file in `public/images/` (create the folder) and
replace the matching `<ImagePlaceholder ... />` usage with Next's `<Image src="/images/your-file.jpg" ... />`,
keeping the wrapping `className` (sizing, `rounded-*`, `object-cover`) so the layout doesn't shift.
Most image slots are wired through `imageKey` tokens on entries in `business-content.ts` and
`src/data/locations.ts` — you can either swap those call sites directly in each page/component, or
keep the token as a lookup key into your own image map.

**Recommended aspect ratios / sizes**
- Hero images: 4:3, at least 1200×900px
- Service card/detail images: 4:3, at least 800×600px
- Provider / staff photos: square or 4:3, at least 600×600px, headshot-style
- Resource / article images: 4:3, at least 800×600px
- Location images: 4:3, at least 1000×750px
- Client story photos: 4:3, at least 800×600px
- Business logo: swap the small dashed square in `ClinicMark` inside
  `src/components/layout/Header.tsx` for a square logo mark (SVG or PNG, ~64×64px, transparent background)

## 6. Update the theme color

Brand color is driven by CSS custom properties in `src/app/globals.css`. The primary color is an
HSL triplet (hue saturation% lightness%, no commas) set under `:root` and mirrored under `.dark`:

```css
:root {
  --primary: 173 77% 26%;   /* light mode brand color */
}
.dark {
  --primary: 173 60% 45%;   /* dark mode brand color */
}
```

Convert the client's brand hex color to HSL (e.g. via `https://hslpicker.com`) and replace the three
numbers on `--primary` in both blocks. All buttons, links, and accents read from this variable
automatically — no other CSS changes are needed.

## 7. Run, test, and deploy

```bash
npm run check     # TypeScript typecheck — should report zero errors
npm run build     # Production build
npm run dev        # Local dev server for manual QA
npm run lint       # ESLint — should report zero errors/warnings
```

**Deploying to Vercel**
1. Push the repo to GitHub/GitLab/Bitbucket.
2. Import the project in Vercel — it auto-detects Next.js, no build command overrides needed.
3. Add the environment variables from `.env.example` (Supabase keys, etc.) in the Vercel project
   settings.
4. Deploy.

After deploying, update the `SITE_ORIGIN` constant in `src/lib/business-content.ts` to the client's
real production domain (used in JSON-LD structured data and canonical URLs).
