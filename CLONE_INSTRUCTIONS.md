# Clone Instructions

This repository is a cloneable Tier 1 service-business website template — niche-agnostic by design, so
it works equally well for a dental practice, med-spa, physical therapy clinic, law office, home-services
business, salon, or veterinary clinic. Every client-specific string (name, contact info, staff bios,
service copy, stats, FAQs, etc.) has been replaced with a `[BRACKETED_PLACEHOLDER_TOKEN]`. Follow the
steps below to turn this into a live site for a new client.

To adapt the template to a specific niche, set `businessConfig.descriptor` (e.g. `"Dental Clinic"`,
`"Wellness Spa"`, `"Physical Therapy Practice"`, `"Law Office"`) and fill in the placeholder tokens
below with copy appropriate to that niche. No component code needs to change — every page reads its
niche-specific language from `business-content.ts`.

## 1. Clone the repo

```bash
git clone <this-repo-url> new-client-site
cd new-client-site
npm install
```

Create a new git remote (or a fresh repo) for the client if you don't want to push back to this template.

## 2. Fill in the two content files

All client content lives in two files. Nothing else needs to change to get a working, on-brand site.

### `client/src/lib/business-content.ts`

This file exports the `businessConfig` object (aliased as `clinic` for backward compatibility) plus
every content array rendered across the site (`services`, `trustStats`, `differentiators`,
`howItWorks`, `healthResources`, `faqs`, `staff`, `providers`, `emergencyInfo`, `aboutValues`) **and**
the `copy` object — every routed page's section headlines and subheadlines, keyed by page
(`copy.home`, `copy.about`, `copy.services`, `copy.serviceDetail`, `copy.team`, `copy.proof`,
`copy.faq`, `copy.location`, `copy.resources`, `copy.articleDetail`, `copy.newClients`,
`copy.notFound`). Replace every `[PLACEHOLDER]` token — in the data arrays **and** in `copy` — with
real, client-approved copy, and set `businessConfig.descriptor` to the client's niche (e.g.
`"Dental Clinic"`, `"Med-Spa"`, `"Physical Therapy Practice"`, `"Law Office"`). Replace **all**
visible section titles/subtitles this way, not just the business-identity fields (name, phone,
address) — the hero headline, every section heading and supporting sentence, and every page's final
CTA heading/subheading all read from `copy`. Do not rename the exported constants, object keys, or
`slug` values — pages, routes, and the service/team detail pages (`/services/:slug`, `/team/:slug`)
depend on them.

### `client/src/lib/industryBrands.ts`

The `industryBrands` array feeds the homepage's partner-marks marquee
(`IndustryBrandMarquee.tsx`). Each entry is `{ name: string }` only — **no logo image file is
required**; every brand renders as a bordered text/placeholder card sized for easy reading (`h-16`
desktop / `h-20`+ on larger screens). Replace each `[PARTNER_BRAND_n]` token with the real
partner/vendor name (or delete the array entries entirely if the client has no partner marks to
show — the marquee section simply won't render brand cards). Add or remove array items freely; the
marquee re-flows automatically, no image assets to source or size.

### `client/src/lib/booking.ts`

Replace the fallback booking URL with the client's real Calendly (or other scheduler) link. You can
also set it via the `VITE_BOOKING_URL` environment variable instead of editing the file.

```ts
export const BOOKING_URL = import.meta.env.VITE_BOOKING_URL || "https://calendly.com/your-client/30min";
```

## 3. Search-and-replace token checklist

Search the repo for `[` to find every remaining token, or work through this list. All tokens live in
`client/src/lib/business-content.ts` unless noted otherwise.

**Clinic identity & contact**
`[CLINIC_NAME]` · `[CLINIC_SHORT_NAME]` · `[CLINIC_TAGLINE]` · `[PHONE_NUMBER]` · `[PHONE_DIGITS_ONLY]` ·
`[EMAIL_ADDRESS]` · `[BUSINESS_ADDRESS]` · `[CITY_STATE_ZIP]` · `[BUSINESS_HOURS_SUMMARY]` ·
`[HOURS_WEEKDAY]` · `[HOURS_SATURDAY]` · `[HOURS_SUNDAY]` · `[GOOGLE_REVIEW_DESTINATION_URL]` ·
`[GOOGLE_MAPS_DIRECTIONS_URL]`

**Services** (`services[1-6]`)
`[SERVICE_n_TITLE]` · `[SERVICE_n_SHORT]` · `[SERVICE_n_DETAIL]` ·
`[SERVICE_n_BENEFIT_1/2/3]` — for n = 1 through 6

**Trust stats bar** (`trustStats[1-4]`)
`[STAT_n_VALUE]` · `[STAT_n_LABEL]` — for n = 1 through 4

**Why choose us** (`differentiators[1-6]`)
`[FEATURE_n_TITLE]` · `[FEATURE_n_COPY]` — for n = 1 through 6

**How it works** (`howItWorks[1-4]`)
`[STEP_n_TITLE]` · `[STEP_n_COPY]` — for n = 1 through 4

**Health resources teaser** (`healthResources[1-3]`)
`[RESOURCE_n_TITLE]` · `[RESOURCE_n_EXCERPT]` — for n = 1 through 3

**FAQs** (`faqs[1-6]`)
`[FAQ_n_QUESTION]` · `[FAQ_n_ANSWER]` — for n = 1 through 6 (leave the `category` field on each entry
untouched — the FAQ page groups entries by that exact string)

**About-page team grid** (`staff[1-3]`)
`[STAFF_n_NAME]` · `[STAFF_n_TITLE]` · `[STAFF_n_BIO]` — for n = 1 through 3

**Team / provider profile pages** (`providers[1-3]`)
`[PROVIDER_n_NAME]` · `[PROVIDER_n_SPECIALTY]` · `[PROVIDER_n_BIO]` — for n = 1 through 3

**Emergency & after-hours referral**
`[EMERGENCY_HOSPITAL_NAME]` · `[EMERGENCY_PHONE]` · `[EMERGENCY_PHONE_DIGITS]` · `[EMERGENCY_ADDRESS]`

**About-page values grid** (`aboutValues[1-3]`)
`[ABOUT_VALUE_n_TITLE]` · `[ABOUT_VALUE_n_COPY]` — for n = 1 through 3

**Partner/vendor brand marquee** (`industryBrands[1-7]`, in `industryBrands.ts`)
`[PARTNER_BRAND_n]` — text-only tokens, no logo image files needed (see the
`industryBrands.ts` section above)

**Section copy** (the `copy` object — every page's headlines/subheadlines)

- `copy.home`: `[HERO_HEADLINE]` · `[HERO_SUBHEADLINE]` · `[HERO_STAT_VALUE]` · `[HERO_STAT_CAPTION]` ·
  `[HERO_BADGE_TEXT]` · `[TRUST_STATS_SECTION_TITLE]` · `[SERVICES_SECTION_TITLE]` ·
  `[SERVICES_SECTION_SUBTITLE]` · `[WHY_US_TITLE]` · `[WHY_US_SUBTITLE]` · `[TEAM_SECTION_TITLE]` ·
  `[TEAM_SECTION_SUBTITLE]` · `[HOW_IT_WORKS_TITLE]` · `[HOW_IT_WORKS_SUBTITLE]` ·
  `[FACILITY_SECTION_TITLE]` · `[SUCCESS_STORIES_SECTION_TITLE]` · `[REVIEWS_SECTION_TITLE]` ·
  `[REVIEWS_SECTION_SUBTITLE]` · `[RESOURCES_SECTION_TITLE]` · `[RESOURCES_SECTION_SUBTITLE]` ·
  `[CARE_PLANS_SECTION_TITLE]` · `[FAQ_SECTION_TITLE]` · `[FAQ_SECTION_SUBTITLE]` ·
  `[LOCATION_SECTION_TITLE]` · `[FINAL_CTA_TITLE]` · `[FINAL_CTA_SUBTITLE]`
- `copy.about`: `[ABOUT_HERO_TITLE]` · `[ABOUT_HERO_SUBTITLE]` · `[ABOUT_VALUES_TITLE]` ·
  `[ABOUT_APPROACH_PARAGRAPH_1]` · `[ABOUT_APPROACH_PARAGRAPH_2]` · `[ABOUT_STAFF_TITLE]` ·
  `[ABOUT_CTA_TITLE]`
- `copy.services`: `[SERVICES_HERO_TITLE]` · `[SERVICES_HERO_SUBTITLE]` · `[SERVICES_CTA_TITLE]`
- `copy.serviceDetail`: `[SERVICE_PROCESS_TITLE]`
- `copy.team`: `[TEAM_HERO_TITLE]` · `[TEAM_HERO_SUBTITLE]` · `[TEAM_GRID_TITLE]` · `[TEAM_CTA_TITLE]`
- `copy.proof`: `[PROOF_HERO_TITLE]` · `[PROOF_HERO_SUBTITLE]` · `[PROOF_STATS_TITLE]` ·
  `[PROOF_CTA_TITLE]`
- `copy.faq`: `[FAQ_HERO_TITLE]` · `[FAQ_HERO_SUBTITLE]` · `[FAQ_CONTACT_TITLE]` · `[FAQ_CTA_TITLE]`
- `copy.location`: `[LOCATION_HERO_TITLE]` · `[LOCATION_HERO_SUBTITLE]` · `[LOCATION_START_TITLE]` ·
  `[LOCATION_DIRECTIONS_TITLE]` · `[LOCATION_HOURS_TITLE]` · `[LOCATION_EMERGENCY_TITLE]`
- `copy.resources`: `[RESOURCES_HERO_TITLE]` · `[RESOURCES_HERO_SUBTITLE]` · `[RESOURCES_GRID_TITLE]` ·
  `[RESOURCES_CTA_TITLE]`
- `copy.articleDetail`: `[ARTICLE_RELATED_TITLE]` · `[ARTICLE_CTA_TITLE]`
- `copy.newClients`: `[NEW_CLIENTS_HERO_TITLE]` · `[NEW_CLIENTS_HERO_SUBTITLE]` ·
  `[NEW_CLIENTS_STEPS_TITLE]` · `[NEW_CLIENTS_BRING_TITLE]` · `[NEW_CLIENTS_CTA_TITLE]`
- `copy.notFound`: `[NOT_FOUND_HERO_TITLE]` · `[NOT_FOUND_HERO_SUBTITLE]` · `[NOT_FOUND_CTA_TITLE]`

**Other files**
- `client/src/lib/booking.ts` → `[EXTERNAL_BOOKING_OR_CALENDLY_URL]`
- `client/index.html` → `[CLINIC_NAME]` (page `<title>` and meta description)
- `client/src/index.css` → `[CLINIC_NAME]` (top-of-file comment only, cosmetic)
- `client/src/pages/Location.tsx` → `[GOOGLE_MAPS_EMBED_URL]` (the map `<iframe>` src — paste the
  client's "Embed a map" URL from Google Maps) and `[NEARBY_LANDMARK_NAME]` (an optional nearby
  landmark used in the directions copy)

Button labels (e.g. "Book an Appointment"), nav item labels, and generic educational content
(`articles`, `carePlans`, `newClientSteps`, `whatToBring`, `clinicExperienceFeatures`) are reusable
boilerplate and do not need to change unless you want to. Every visible section headline and
subheadline, by contrast, is a `[PLACEHOLDER]` token in `copy` and must be filled in — see the
**Section copy** checklist above.

## 4. Replace image placeholders

Every image slot in this template renders a dashed `ImagePlaceholder` block
(`client/src/components/ImagePlaceholder.tsx`) instead of a real photo, so no demo client/business
images ship in the template. Each block shows a label and a bracketed token telling you exactly
what belongs there.

To swap a slot for a real photo, drop the client's file in `client/public/images/` (create the
folder) and replace the matching `<ImagePlaceholder ... />` usage with an `<img src="/images/your-file.jpg" ... />`,
keeping the wrapping `className` (sizing, `rounded-*`, `object-cover`) so the layout doesn't shift.
Most image slots are wired through `imageKey` tokens on entries in `client/src/lib/business-content.ts`
(services, providers, staff, articles, etc.) — you can either swap those call sites directly in each
page/component, or keep the token as a lookup key into your own image map.

**Recommended aspect ratios / sizes**
- Hero images (`[HERO_IMAGE]`, `[ABOUT_IMAGE]`, `[TEAM_IMAGE]`): 4:3, at least 1200×900px
- Service card/detail images (`[SERVICE_IMAGE]`, `[SERVICE_1_IMAGE]`…`[SERVICE_6_IMAGE]`): 4:3, at least 800×600px
- Provider / staff photos (`[PROVIDER_1_PHOTO]`…`[PROVIDER_3_PHOTO]`, `[STAFF_1_PHOTO]`…`[STAFF_3_PHOTO]`): square or 4:3, at least 600×600px, headshot-style
- Resource / article images (`[RESOURCE_IMAGE]`, `[RESOURCE_1_IMAGE]`…`[RESOURCE_5_IMAGE]`): 4:3, at least 800×600px
- Business interior images (`[CLINIC_IMAGE]`, `[CLINIC_1_IMAGE]`…`[CLINIC_5_IMAGE]`): 4:3, at least 1000×750px
- Client photos (`[CLIENT_1_PHOTO]`…`[CLIENT_3_PHOTO]`): 4:3, at least 800×600px
- Business logo (`[CLINIC_LOGO]`): swap the small dashed square in `ClinicMark` inside
  `client/src/components/SiteShell.tsx` for a square logo mark (SVG or PNG, ~64×64px, transparent background)

**Map**
`client/src/pages/Location.tsx` already renders the embedded map as an iframe pointed at the
literal placeholder `[GOOGLE_MAPS_EMBED_URL]` (see step 3 above) — paste the client's real "Embed a
map" URL there. No `[MAP_EMBED]` image placeholder is needed since the iframe itself is the
placeholder.

## 5. Update the theme color

Brand color is driven by CSS custom properties in `client/src/index.css`. The primary color is an
HSL triplet (hue saturation% lightness%, no commas) set under `:root` and mirrored under `.dark`:

```css
:root {
  --primary: 160 84% 39%;   /* light mode brand color */
  --ring: 160 70% 40%;
}
.dark {
  --primary: 160 65% 48%;   /* dark mode brand color */
  --ring: 160 65% 48%;
}
```

Convert the client's brand hex color to HSL (e.g. via `https://hslpicker.com`) and replace the three
numbers on `--primary` (and `--ring`, which should stay close to `--primary`) in both blocks. All
buttons, links, and accents read from this variable automatically — no other CSS changes are needed.

## 6. Run, test, and deploy

```bash
npm run check     # TypeScript typecheck — should report zero errors
npm run build     # Production build (Vite client + server bundle)
npm run dev        # Local dev server for manual QA
npm test           # Run the test suite, if present
```

**Deploying to Vercel**
1. Push the repo to GitHub/GitLab/Bitbucket.
2. Import the project in Vercel and set the build command to `npm run build` and the output
   directory to `dist/public` (Vite's client build output).
3. Add any required environment variables (e.g. `VITE_BOOKING_URL`) in the Vercel project settings.
4. Deploy.

**Deploying to Netlify**
1. Push the repo to your git provider.
2. In Netlify, set the build command to `npm run build` and the publish directory to `dist/public`.
3. Add the same environment variables under Site settings → Environment variables.
4. Deploy.

After deploying, update `client/public/sitemap.xml`, `client/public/robots.txt`, and the
`SITE_ORIGIN` constants in `client/src/components/PageMeta.tsx` and
`client/src/lib/business-content.ts` to the client's real production domain.
