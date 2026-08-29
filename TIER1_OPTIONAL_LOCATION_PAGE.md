# Core Routes vs. Optional Extensions

The template's route set has grown since this note was first written for a 3-route governance model.
This is now the reference for which routes are considered **core** (part of every clone by default)
versus **optional extensions** (features a given engagement may or may not need).

## Core routes

These ship enabled by default and are expected on every clone:

- `/` — Home
- `/about`
- `/services`, `/services/[slug]`
- `/team`, `/team/[slug]`
- `/resources`, `/resources/[slug]` (also serves blog-style content)
- `/proof`
- `/faq`
- `/new-clients`

## Optional extensions

These are real, working features in the template, but not every business needs all of them. Disable
by removing the relevant nav entry and (if applicable) the mounted component — no other code changes
required.

- **`/locations`, `/locations/[slug]`** — multi-location support (`src/data/locations.ts`). A
  single-location business can keep exactly one entry in `locations[]` and effectively use it as a
  single "Location" page, or remove the routes and nav entry entirely and fold the address/hours into
  the home page instead.
- **Booking modal + Supabase persistence** — the booking flow (`BookingModal`, `/api/booking`) works
  with zero configuration (form renders, submission fails gracefully). Wiring up Supabase
  (`supabase/schema.sql` + env vars, see `CLONE_INSTRUCTIONS.md` step 4) is what makes bookings
  actually persist. Treat "Supabase configured" as an explicit go-live checklist item, not an
  assumption.
- **`<ActivityNotification />`** (mounted in `src/app/layout.tsx`) — simulated "recent booking"
  social-proof toast. Uses `src/data/sampleActivity.ts`, always `isSimulated: true`. Remove the
  mount in `layout.tsx` to disable; do not present simulated activity as real without the client's
  explicit sign-off.
- **AI-adjacent chatbot** (`ChatWidget`, mounted in `layout.tsx`) — client-side rule/keyword matching
  against `business-content.ts` (FAQs, services). No LLM call, no external API. Optional
  `/api/chat/message` and `/api/chat/route.ts` server routes exist for a clone that wants
  Supabase-backed chat-interaction logging; the widget itself works without them.
- **Insurance marquee/combobox** — only relevant to niches (healthcare, PT, some legal/financial
  services) where "accepted insurance/coverage" is a meaningful concept. Remove `<InsuranceMarquee>`
  from the home page and the `insuranceProvider` step from `BookingModal` for niches where it doesn't
  apply (e.g. a salon or home-services business).

For production client work, an optional extension may be deployed as a separate approved property
(e.g. a client-approved subdomain) rather than folded into the main site, if that's what the
engagement calls for — that's a deployment decision, not a code change.
