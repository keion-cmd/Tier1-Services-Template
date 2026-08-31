# Tier1 Client Intake

This is the questionnaire to run with a new client (or fill out from their existing materials —
website, brochures, Google Business Profile, past marketing copy) **before** any `ClientConfig`
gets written. It is organized by real-world topic, not by TypeScript shape, so a client or an
intake person can answer it without reading code.

For the field-level schema this content eventually lands in, see
[`CLIENT_CONFIG_TEMPLATE.md`](CLIENT_CONFIG_TEMPLATE.md). For how a filled-out copy of this
document becomes a config, see
[`TIER1_CLIENT_CONFIG_GENERATOR_PROMPT.md`](TIER1_CLIENT_CONFIG_GENERATOR_PROMPT.md).

**Ground rule: leave a field blank if the client doesn't provide it.** Never guess or invent
years-of-experience, stats, awards, or credentials to fill a gap — an omitted section is correct;
a fabricated one is not. See "What happens when information is missing" at the bottom.

---

## A. Business Identity

- Legal business name
- Display / marketing name (if different from legal name)
- Short name (used where space is tight — nav logo, chat header)
- Tagline (one short line — the thing under the logo)
- Business category / schema type (e.g. "Physical Therapy Clinic", "Home Renovation & Design
  Studio" — used both for on-page copy and for structured-data `@type`)
- Business description — one paragraph, "what we do and for whom"
- Short description — one sentence, for cards/previews
- Long description — several paragraphs, for the About page

## B. Brand Story

- Founding story — how and why the business started
- Why the company exists — the problem it was built to solve
- Mission statement
- Vision statement
- Values (a short list, each with a one-line explanation)
- Philosophy / approach to the work
- Differentiators — what makes this business different from competitors (concrete, not generic
  "quality service")
- Brand personality — tone of voice (formal/casual, warm/clinical, etc.) — informs how the
  generator should write copy, not a field that renders directly

## C. Services

Repeat this block **for every service** the business offers. This is the deepest section of the
intake — see §4 below for why.

- Name
- Slug (or let the generator derive one from the name)
- Short description (one sentence — used on list/card views)
- Detailed description (multi-paragraph — used on the service's own page)
- Problem it solves
- Who it's for (2-4 short "good fit if..." phrases)
- Who it's *not* for, if there's a natural mismatch worth naming up front
- Benefits (bullet list)
- What's included
- What's *not* included, if relevant (avoids a support question later)
- Process — what happens, step by step, from first contact to completion
- Typical timeline / duration
- What the client needs to prepare or bring
- What the client should expect during and after
- Common concerns or hesitations people have about this service
- FAQs specific to this service
- Related services (if there's a natural pairing worth cross-linking)
- Images available for this service (hero, in-progress, before/after, etc.)

## D. Team / Providers

Repeat for every provider/staff member who should appear on the site.

- Name
- Role / title
- Credentials (licenses, certifications — as a single line, e.g. "PT, DPT, OCS")
- Short biography (1-2 sentences, for grid cards)
- Full biography (multi-paragraph, for their own page) — optional, falls back to the short bio
- Areas of expertise / interest
- Years of experience
- Which services they provide (so the site can cross-link "services this provider offers")
- Photo

## E. Locations

Repeat for every physical location. A single-location business just answers this once.

- Name (e.g. "Cascade Point — Brightwater Clinic")
- Address and city
- Description — what this location offers or specializes in
- Business hours
- Phone
- Email
- Which services are offered at this location
- Which providers work at this location
- Parking information
- Accessibility information
- Directions / landmark (e.g. "across from Brightwater Regional Medical Center")
- Any additional access notes (transit, entrance quirks, building access codes for the front
  desk to communicate — anything that answers "how do I actually get there")

## F. Proof

- Testimonials / reviews (author, what they said, what service it relates to, star rating)
- Success stories (a fuller narrative than a testimonial — client name or initials, their
  situation, the outcome, which service was involved)
- Projects / case studies, if the business has before/after or project-based work
- Awards — **only if the client actually has them**
- Certifications — **only if the client actually has them**
- Statistics (years in business, number of clients served, completion rate, etc.) — **only real
  numbers the client can stand behind**
- Credentials at the business level (distinct from individual provider credentials — e.g. BBB
  accreditation, industry association membership)

## G. Resources

- Articles / guides the business wants published
- Educational content explaining services, conditions, or processes in more depth
- FAQs that don't belong to one specific service (general business/logistics questions)

## H. Contact

- Phone
- Email
- Address
- Social media links
- Preferred contact method / instructions (e.g. "call for same-day requests, email for
  general questions")
- Response-time expectations (e.g. "we respond within one business day")

## I. Media

- Logo (not yet wired into `ClientConfig` — see the note in
  [`CLIENT_CONFIG_TEMPLATE.md`](CLIENT_CONFIG_TEMPLATE.md#brand); collect it anyway so it's ready
  for whenever that phase lands)
- Favicon / app icon
- Hero images (homepage, About)
- Service images (one or more per service)
- Team photos (one per provider)
- Location photos (one or more per location)
- Brand/story images (for About page storytelling sections)
- General gallery images, if the business has a portfolio-style body of work

---

## 4. Why services are the deepest section

A service entry that only has a name, a description, and an image is not enough. A complete
service answer should be able to independently answer all of the following, because the website
will surface a subset of these answers on the service's own page and will not send the visitor
elsewhere to find them:

- What is this service?
- Who is it for? Who isn't it for?
- What problem does it solve, and why does the client need it?
- What are the benefits?
- What's included? What's not included?
- How does the process work — what happens first, what happens next?
- How long does it take?
- What does the client need to prepare?
- What should the client expect?
- Who provides it (which team members)?
- What makes this company's version of the service different?
- What common concerns or objections come up?
- What questions do people typically ask?
- What related services might also help?

If the intake answer to any of these is "we don't have that yet," leave it blank rather than
writing filler — see §8 below.

## 5. Information depth principle

Not every answer belongs on the homepage. Depth increases as the visitor moves deeper into the
site:

```
HOME        → high-level understanding (what the business does, why trust it, where to go next)
ABOUT       → business depth (story, values, differentiators)
SERVICES    → service discovery (what's offered, at a glance)
SERVICE     → service depth (everything in §4, in full)
TEAM        → people depth (who does the work, their background)
LOCATION    → location depth (how to actually get there and what's offered there)
PROOF       → trust depth (testimonials, stats, stories)
RESOURCES   → education depth (articles, guides)
FAQ         → question depth (uncommon/edge-case questions)
CONTACT     → conversion depth (how to reach out, what to expect)
```

Each page must still stand on its own — a visitor who lands directly on a service page from a
search result should never need to visit another page to answer a basic question about that
service.

## 6. Contextual information rule

If a page can answer a basic question directly, it must — it should not defer to the FAQ page.
For example, a service page should never say "learn more in our FAQ" for a question like "how
long does this take?" or "who is this for?"; that belongs in the service's own `duration` and
`bestFor` answers. The FAQ page is reserved for deeper, less common, or clarifying questions that
don't belong to any single service or page — see the per-service FAQ vs. general FAQ split in
§C and §G above.

---

## 7. Mapping: intake section → ClientConfig → page

| Intake section | ClientConfig destination | Renders on |
|---|---|---|
| A. Business Identity | `business.*`, `siteSettings.*` | Header, footer, Home, About, JSON-LD |
| B. Brand Story | `content.aboutValues`, `content.differentiators`, `copy.about.*` | About |
| C. Services | `services[]` | Services list, `/services/[slug]`, cross-linked from Team/Locations/FAQ/Proof/Resources |
| D. Team / Providers | `providers[]` | Team list, `/team/[slug]`, About staff grid |
| E. Locations | `locations[]` | Locations list, `/locations/[slug]` |
| F. Proof | `testimonials[]`, `stories[]`, `content.trustStats`, `content.proofStatHighlight`, `content.proofCareStats`, `content.proofPageStories` | Proof page, Home trust bar, Success Stories |
| G. Resources | `resources[]` (articles), `faqs[]` | Resources list, `/resources/[slug]`, FAQ page |
| H. Contact | `business.*` (no separate contact block) | Contact page, footer |
| I. Media | `imageKey` fields throughout | Every page (rendered as placeholder cards until real files are wired in) |

This is a summary view — [`CLIENT_CONFIG_TEMPLATE.md`](CLIENT_CONFIG_TEMPLATE.md) has the
authoritative field-by-field mapping with exact TypeScript field names, types, and the specific
component each one feeds.

## 8. What happens when information is missing

Optional fields (`bestFor`, `fullBio`, `relatedServiceSlugs`, `accessNotes`, service-level FAQs,
awards/stats/certifications, etc.) are designed to be omitted. The site gracefully hides the
corresponding section rather than rendering an empty or placeholder-looking block. Do not invent
values to fill a gap — see the generator's missing-information report in
[`TIER1_CLIENT_CONFIG_GENERATOR_PROMPT.md`](TIER1_CLIENT_CONFIG_GENERATOR_PROMPT.md), which
surfaces gaps explicitly instead of silently papering over them.
