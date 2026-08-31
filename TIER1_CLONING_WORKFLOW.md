# Tier1 Cloning Workflow

How to clone this template for a new client, as of Phase 8. This replaces the old process of
hand-editing `src/lib/business-content.ts` and `src/data/locations.ts` in place — those two
files are now thin facades over `src/config/active-client.ts`, and cloning means adding a new
file under `src/config/clients/` and flipping one constant.

```
NEW CLIENT
   ↓
COPY CLIENT CONFIG TEMPLATE
   ↓
FILL CLIENT DATA
   ↓
ADD IMAGES
   ↓
RUN VALIDATION
   ↓
RUN WEBSITE
   ↓
QA
   ↓
DEPLOY
```

## 1. Create the client config

Copy `src/config/clients/template.ts` to `src/config/clients/<client-id>.ts` (e.g.
`src/config/clients/riverside-dental.ts`), and rename its export:

```ts
export const riversideDental: ClientConfig = { ... };
```

## 2. Add business data

Fill in `business` and `siteSettings` — name, contact info, hours, social links,
`bookingMode`, and **set `isTemplateDemo: false`**. See `CLIENT_CONFIG_TEMPLATE.md` → BUSINESS.

## 3. Add services

Fill in the `services` array. Give every service a stable, semantic `slug` — this is what every
other section (providers, locations, reviews, stories, articles, FAQs) links back to. See
`CLIENT_CONFIG_TEMPLATE.md` → SERVICES.

## 4. Add providers (team)

Fill in the `providers` array. Set `relatedServiceSlugs` on each provider to link them to the
services they offer — this also powers the reverse "providers for this service" list, so you
only maintain the relationship once. See `CLIENT_CONFIG_TEMPLATE.md` → TEAM.

## 5. Add locations

Fill in the `locations` array — one entry per physical location, referencing `serviceSlugs` and
optionally `providerSlugs`. A single-location business just has one array entry. See
`CLIENT_CONFIG_TEMPLATE.md` → LOCATIONS.

## 6. Add proof (stats, testimonials, stories)

Fill in `content.trustStats`, `content.proofStatHighlight`, `content.proofCareStats`,
`content.proofPageStories`, `testimonials`, and `stories`. Link testimonials/stories to a
`serviceSlug` where relevant. See `CLIENT_CONFIG_TEMPLATE.md` → PROOF / TESTIMONIALS / STORIES.

## 7. Add resources (articles)

Fill in the `resources` array with the client's educational/blog content. Long-form `body`
content is an array of paragraph strings — don't compress articles into a single short field.
See `CLIENT_CONFIG_TEMPLATE.md` → RESOURCES.

## 8. Add FAQs

Fill in the `faqs` array. `category` values are read dynamically to build the FAQ page's
category groups — there's no fixed category list to update elsewhere. See
`CLIENT_CONFIG_TEMPLATE.md` → FAQ.

## 9. Add images

Set descriptive `imageKey` values across services, providers, locations, and stories (see
`CLIENT_CONFIG_TEMPLATE.md` → MEDIA). Image upload/hosting isn't automated yet — this phase only
ensures the data model can carry image references; wiring actual files in is a manual step per
clone until a future phase adds real asset handling.

## 10. Run validation

```
npm run validate:clients
```

This runs `src/config/validate.ts` against every registered client (including yours, once it's
added to `CLIENTS` in `src/config/active-client.ts` — see step 11) and reports duplicate slugs
or dangling cross-references with a specific, fixable error message. Fix everything it reports
before moving on — this is the same check that also runs automatically every time the active
config loads (dev server start, `next build`).

## 11. Point the site at the new client

In `src/config/active-client.ts`:

```ts
import { riversideDental } from "./clients/riverside-dental";

const CLIENTS = { template, clearview, cascade, amberlyn, riversideDental } satisfies Record<string, ClientConfig>;

const ACTIVE_CLIENT: keyof typeof CLIENTS = "riversideDental";
```

This is the **only** file that changes to switch which business the entire site renders — no
page, layout, or component file is touched.

## 12. Run the website

```
npm run dev
```

Click through every page — home, about, services (+ each service detail), team (+ each
provider), locations (+ each location detail), proof, FAQ, resources (+ each article), contact,
new clients, success stories. Confirm sections with no data (e.g. no `bestFor` on a service, no
`accessNotes` on a location) hide gracefully rather than rendering empty.

## 13. QA

- `npx tsc --noEmit` — no type errors.
- `npm run build` — production build succeeds and every dynamic route (`/services/[slug]`,
  `/team/[slug]`, `/locations/[slug]`, `/resources/[slug]`) lists the expected slugs in the
  build output.
- Confirm the header/footer nav only shows sections with real (non-placeholder) data — this is
  automatic via `hasRealEntries()` in `src/lib/utils.ts`, but verify it for your specific content.
- Confirm `isTemplateDemo: false` — the "this is a template" footer strip must not appear.

## 14. Deploy

Deploy as normal (this repo's existing deployment process is unchanged by Phase 8 — only the
content-authoring layer moved). Keep `ACTIVE_CLIENT` pointed at the new client's config in the
deployed branch/environment.

---

## Keeping the regression suite current

`test-fixtures/phase7-cloneability/` holds the three validated Phase 7 businesses (Clearview —
sparse, Cascade Point — normal, Amberlyn — detailed) as real, buildable client configs under
`src/config/clients/{clearview,cascade,amberlyn}.ts`. Whenever you make an architectural change
to the Tier1 engine (a page, a component, the schema), re-run `npm run validate:clients` and
spot-check `tsc --noEmit` + `npm run build` with `ACTIVE_CLIENT` set to each of the three in turn
— that's the repeatable proof that the change didn't quietly assume something about one specific
business's content shape.
