# Tier1 Content Quality Checklist

Run this after a `ClientConfig` is generated (or hand-written) and after
`npm run validate:clients` passes structurally. Structural validation checks that the config
*compiles and cross-references correctly* — it says nothing about whether the content is actually
good. This checklist is the human judgment pass on top of that.

Use it during the human-review step of the pipeline (see step 13 of the Phase 9 plan): after
generation and validation, before visual QA and client approval.

An unchecked box is not automatically a blocker — many of these are legitimately optional
depending on what the client provided (see [`TIER1_CLIENT_INTAKE.md`](TIER1_CLIENT_INTAKE.md)
§8: missing information should be omitted, not invented). Use this list to confirm that every gap
is a *real* gap in what the client gave you, not a gap introduced during generation.

## Business

- [ ] Positioning is clear — a first-time visitor can tell what the business does and who it's
      for within the hero section
- [ ] `business.tagline` and `business.descriptor` are specific to this business, not generic
      boilerplate
- [ ] Founding story / "why we exist" is present on About (or intentionally omitted because the
      client didn't provide one)
- [ ] Differentiators are concrete and specific, not interchangeable with any competitor's
      ("licensed and insured on every job" beats "quality you can trust")
- [ ] Mission / values are present where the client supplied them, and are not fabricated where
      they didn't

## Services

- [ ] Every service has a clear, specific `short` and `detail` description (not a rename of the
      title)
- [ ] Every service explains who it's for (`bestFor`) where the client gave that information
- [ ] `benefits` are concrete outcomes, not restatements of the service name
- [ ] `process` steps describe what actually happens, in order, not generic placeholders
- [ ] `duration` is filled in with a real answer, not "varies" as a default dodge
- [ ] Expectations are set — a visitor reading the service page knows what to prepare and what
      happens next
- [ ] Related services are sensible (same-category derivation isn't pulling in an unrelated
      service just because categories loosely match)
- [ ] Service-level FAQs exist where the client's intake surfaced service-specific questions
      (general/logistics questions belong on the FAQ page instead, not duplicated here)
- [ ] No two services have overlapping `slug`s or near-duplicate `short` descriptions that make
      them hard to tell apart on the list page

## People

- [ ] Every provider has a bio that says something specific about them, not just their title
      restated
- [ ] Credentials are accurate as given by the client — not upgraded, not invented
- [ ] `areasOfInterest` reflect real specialties, not a copy-pasted generic list across providers
- [ ] `relatedServiceSlugs` actually match services this person provides (check against the
      client's answers in §D, not assumed from job title)
- [ ] Placeholder providers (`placeholder: true`) are flagged and excluded from launch content,
      not left in as if real

## Locations

- [ ] `serviceSlugs` accurately reflects what's offered at that specific location (not just every
      service in the config)
- [ ] `providerSlugs` accurately reflects who works there
- [ ] Access information (`accessNotes`, `landmark`) answers "how do I actually get there" — not
      left as a placeholder token
- [ ] Contact info (phone, email, hours) is location-specific where the client gave
      location-specific answers, not a copy of the business-level contact info by default

## Proof

- [ ] Testimonials are attributed and specific (not "Great service!" with no context)
- [ ] Stories/case studies describe a real situation and outcome, not a generic before/after
- [ ] Every trust signal (stat, award, certification) is something the client actually provided
      — cross-check against the generator's missing-information report; nothing here should be a
      round, suspiciously-convenient number that wasn't in the intake
- [ ] `testimonials[].serviceSlug` and `stories[].serviceSlug` are set where a review clearly
      relates to a specific service, so the Proof page's service grouping isn't empty

## Resources & FAQ

- [ ] Articles read as genuinely useful content, not thin filler written to fill a slot
- [ ] `relatedServiceSlugs` on articles points to services the article content actually discusses
- [ ] FAQ entries are genuinely deeper/edge-case questions, not duplicates of what a service page
      already answers directly (see the contextual information rule in
      [`TIER1_CLIENT_INTAKE.md`](TIER1_CLIENT_INTAKE.md) §6)
- [ ] FAQ `category` groupings make sense as section headers, not a pile of one-off categories
      with a single question each

## Cross-cutting

- [ ] `npm run validate:clients` passes (no duplicate slugs, no dangling cross-references)
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` passes
- [ ] No `[BRACKET_TOKEN]` placeholder text remains anywhere in the config
- [ ] No invented statistics, years-of-experience, awards, or certifications anywhere in the
      config — everything traces back to something the client actually said
