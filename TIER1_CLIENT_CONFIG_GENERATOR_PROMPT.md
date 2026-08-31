# Tier1 Client Config Generator Prompt

This is the standardized prompt to give Claude Code when turning a filled-out
[`TIER1_CLIENT_INTAKE.md`](TIER1_CLIENT_INTAKE.md) into a real `src/config/clients/<client>.ts`
file. Paste the prompt below, then attach or paste in the client's completed intake answers.

This step is AI-assisted **structuring**, not AI-assisted **invention**. The model's job is to
take information the client already gave and shape it into the `ClientConfig` schema — never to
add facts, claims, or numbers the client didn't provide.

---

## The prompt

```
You are generating a Tier1 ClientConfig for a new client, from their completed intake
questionnaire (based on TIER1_CLIENT_INTAKE.md).

INPUT: The client's completed intake answers (business identity, brand story, services, team,
locations, proof, resources, contact, media notes) — pasted or attached below this prompt.

OUTPUT: A single TypeScript file, src/config/clients/<client-id>.ts, exporting a ClientConfig
that satisfies src/config/schema.ts. Use src/config/clients/template.ts as the structural
starting point (copy its shape, not its placeholder content) and
src/config/clients/amberlyn.ts / test-fixtures/phase7-cloneability/amberlyn-source-business.ts
as a reference for what fully fleshed-out, non-placeholder content looks like at this depth.

HARD RULES — do not violate these under any circumstance:

1. PRESERVE FACTUAL INFORMATION. Every claim, number, name, credential, and description in the
   output must trace back to something the client actually said in their intake. Do not
   paraphrase in a way that changes meaning or overstates a claim.

2. NEVER INVENT CLAIMS. If the client did not provide a stat, award, certification, years of
   experience, or specific claim, do not add one — not even a plausible-sounding placeholder,
   and not even to make a section "feel complete." An omitted field is correct. A fabricated
   field is a failure.

3. PRESERVE LONG-FORM DETAIL. Do not compress a client's multi-paragraph answer (service
   descriptions, bios, founding story, testimonials) into a thin one-liner to save space. The
   schema has room for long-form content (`detail`, `fullBio`, `body[]`, etc.) — use it.

4. GENERATE STABLE SLUGS. Every service, provider, location, and article needs a url-safe,
   lowercase-hyphenated slug derived from its name (e.g. "Orthopedic & Sports Injury Rehab" →
   "orthopedic-sports-rehab"). Slugs must be unique within their collection. Once generated,
   treat a slug as stable — renaming a display title later must never require renaming the slug.

5. PRESERVE RELATIONSHIPS. Read the client's answers for which providers work at which
   locations, which services each provider offers, which services each location provides, which
   testimonials/stories relate to which service, and which articles relate to which service.
   Encode every one of these as the corresponding slug field
   (providers[].relatedServiceSlugs, locations[].serviceSlugs, locations[].providerSlugs,
   testimonials[].serviceSlug, stories[].serviceSlug, resources[].relatedServiceSlugs,
   faqs[].serviceSlug) — never leave an implied relationship unencoded, and never invent one the
   client didn't state.

6. CREATE CROSS-LINKS WHERE THE CLIENT'S CONTENT SUPPORTS THEM. If a testimonial clearly
   describes a specific service, set serviceSlug even if the client didn't explicitly label it —
   but only when the connection is unambiguous from their own words. When in doubt, leave the
   link unset rather than guessing.

7. IDENTIFY MISSING INFORMATION. For every optional field left unset because the client didn't
   provide the underlying information, and for every service/provider/location that's missing a
   commonly-expected piece of content (see the depth checklist in TIER1_CLIENT_INTAKE.md §4),
   record it. Do not silently omit the gap — report it.

8. NEVER SILENTLY FABRICATE FIELDS. If a required (non-optional) schema field has no answer in
   the intake, do not invent a value to satisfy the type checker. Instead, flag it explicitly in
   the missing-information report and leave an obvious, honest placeholder in the code (e.g. a
   comment, not invented prose) so a human catches it before launch — never ship invented prose
   in a required field.

PROCESS:

1. Read the intake answers section by section (A through I).
2. Map each answer to its ClientConfig destination using the table in TIER1_CLIENT_INTAKE.md §7
   and the field-by-field reference in CLIENT_CONFIG_TEMPLATE.md.
3. Write services[] first and most thoroughly — each entry should independently answer every
   question listed in TIER1_CLIENT_INTAKE.md §4.
4. Write providers[], locations[], testimonials[], stories[], resources[], faqs[], wiring slug
   cross-references as you go.
5. Write content.* (trustStats, proofStatHighlight, proofCareStats, aboutValues,
   differentiators, howItWorks, etc.) from whatever the client's business/brand/proof answers
   support — omit any sub-collection the client gave nothing for rather than inventing entries.
6. Write copy.* page microcopy in the client's stated brand voice, grounded in real business
   facts — this is the one area where original phrasing is expected (headlines, subheadlines),
   but it must never introduce a new factual claim.
7. Set siteSettings.isTemplateDemo = false and fill seo.siteOrigin from the client's domain if
   known, otherwise flag it as missing.
8. Register the new client in src/config/active-client.ts's CLIENTS map (do not switch
   ACTIVE_CLIENT unless asked to).

OUTPUT FORMAT: Return the complete .ts file contents, followed by a "MISSING / OPTIONAL
INFORMATION" report in this format:

MISSING / OPTIONAL INFORMATION

Services:
- <service name> has no process information
- <service name> has no FAQ

Providers:
- <provider name> has no credentials

Locations:
- <location name> has no parking information

Business:
- <field> not provided

(Omit any category with nothing to report.)

VALIDATION: After writing the file, remind the user to run, in order:
  npm run validate:clients
  npx tsc --noEmit
  npm run build
and to fix any failure before this config goes to human review.
```

---

## After running the prompt

1. `npm run validate:clients` — must pass (no duplicate slugs, no dangling cross-references).
2. `npx tsc --noEmit` — must pass.
3. `npm run build` — must pass.
4. Human review against [`TIER1_CONTENT_QUALITY_CHECKLIST.md`](TIER1_CONTENT_QUALITY_CHECKLIST.md),
   using the generator's missing-information report as the starting checklist of known gaps.
5. Website preview, content QA, visual QA, client approval, deploy — never generation straight to
   deploy. See the pipeline stages below.

## Pipeline this prompt fits into

```
Client questionnaire
        ↓
Config generation (this prompt)
        ↓
Validation (validate:clients, tsc, build)
        ↓
Human review (TIER1_CONTENT_QUALITY_CHECKLIST.md)
        ↓
Website preview
        ↓
Content QA
        ↓
Visual QA
        ↓
Client approval
        ↓
Deploy
```

Config generation never deploys automatically. Every generated config is a draft until a human
has reviewed it against the checklist and the client has approved the preview.
