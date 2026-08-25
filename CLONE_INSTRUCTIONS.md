# Clone Instructions

This repository is a cloneable Tier 1 veterinary-clinic website template. Every client-specific string
(name, contact info, staff bios, service copy, stats, FAQs, etc.) has been replaced with a
`[BRACKETED_PLACEHOLDER_TOKEN]`. Follow the steps below to turn this into a live site for a new client.

## 1. Clone the repo

```bash
git clone <this-repo-url> new-client-site
cd new-client-site
npm install
```

Create a new git remote (or a fresh repo) for the client if you don't want to push back to this template.

## 2. Fill in the two content files

All client content lives in two files. Nothing else needs to change to get a working, on-brand site.

### `client/src/lib/clinic-content.ts`

This file exports the `clinic` object plus every content array rendered across the site
(`services`, `trustStats`, `differentiators`, `howItWorks`, `healthResources`, `faqs`, `staff`,
`doctors`, `emergencyInfo`). Replace every `[PLACEHOLDER]` token with real, client-approved copy.
Do not rename the exported constants, object keys, or `slug` values — pages, routes, and the
service/team detail pages (`/services/:slug`, `/team/:slug`) depend on them.

### `client/src/lib/booking.ts`

Replace the fallback booking URL with the client's real Calendly (or other scheduler) link. You can
also set it via the `VITE_BOOKING_URL` environment variable instead of editing the file.

```ts
export const BOOKING_URL = import.meta.env.VITE_BOOKING_URL || "https://calendly.com/your-client/30min";
```

## 3. Search-and-replace token checklist

Search the repo for `[` to find every remaining token, or work through this list. All tokens live in
`client/src/lib/clinic-content.ts` unless noted otherwise.

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

**Team / doctor profile pages** (`doctors[1-3]`)
`[VET_n_NAME]` · `[VET_n_SPECIALTY]` · `[VET_n_BIO]` — for n = 1 through 3

**Emergency & after-hours referral**
`[EMERGENCY_HOSPITAL_NAME]` · `[EMERGENCY_PHONE]` · `[EMERGENCY_PHONE_DIGITS]` · `[EMERGENCY_ADDRESS]`

**Other files**
- `client/src/lib/booking.ts` → `[EXTERNAL_BOOKING_OR_CALENDLY_URL]`
- `client/index.html` → `[CLINIC_NAME]` (page `<title>` and meta description)
- `client/src/index.css` → `[CLINIC_NAME]` (top-of-file comment only, cosmetic)
- `client/src/pages/Location.tsx` → `[GOOGLE_MAPS_EMBED_URL]` (the map `<iframe>` src — paste the
  client's "Embed a map" URL from Google Maps) and `[NEARBY_LANDMARK_NAME]` (an optional nearby
  landmark used in the directions copy)

Everything else on the site (button labels, section headings, generic educational articles under
`articles`, generic care-plan and new-client-steps copy) is reusable boilerplate and does not need to
change unless you want to.

## 4. Update the theme color

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

## 5. Run, test, and deploy

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
`client/src/lib/clinic-content.ts` to the client's real production domain.
