# Reference Site Analysis — trabahadoor.com & asikaxo.com

**Purpose:** Extract UI/UX patterns from two Philippine home-service platforms to evaluate applicability to the Tier1 single-business services template (clinics, legal, home services, salons, etc.). Both references are **two-sided gig marketplaces** (connecting customers with a pool of independent workers/providers) — a fundamentally different business model from Tier1's single-business template. This document separates what genuinely transfers from what is marketplace-specific noise.

Crawled: homepage + /for-customers, /for-workers, /impact, /about (trabahadoor.com); full single-page site (asikaxo.com).

---

## 1. Directly Applicable Patterns

These are structural/UX patterns that a single-business site could adopt regardless of the marketplace context they originated in.

| Pattern | Rationale |
|---|---|
| **Numbered "How It Works" process strip (3–4 steps, icon + short title + 1-sentence description)** | Both sites use this to demystify booking. A clinic/salon/legal template benefits equally — "Book → Confirm → Visit/Service → Follow-up" reduces booking anxiety regardless of business model. |
| **Animated/large stat counters near the top of the page (e.g., "X clients served," "Y years in business," "Z% satisfaction")** | Numeric social proof works for any local business, not just marketplaces. Needs real, defensible numbers, not fabricated ones. |
| **Trust badge row directly under the hero (small icon-label pairs: "Licensed," "Insured," "24/7 Support," "Verified")** | The one-line icon+label trust strip (asikaxo's "10+ / 100% / 24/7 / PH") is a compact, scannable credibility pattern that fits any service business hero section. |
| **Testimonial cards with named reviewer + role/context + specific service mentioned** ("Mhary Santos, Homeowner, Quezon City — booked aircon cleaning") | The specificity (name, location/role, and which service) reads as more credible than generic quotes. Directly portable to a single-business testimonials section. |
| **FAQ accordion section placed late in the page, addressing booking/pricing/cancellation logistics** | Standard, low-risk pattern; both sites use collapsible Q&A to handle "how do I cancel," "how are prices set" — same questions apply to a single clinic or law firm. |
| **"Why Us" / differentiator section with 3 short pillars (icon + title + 1-2 lines)** (trabahadoor's "Workers first / Trust you can verify / Proudly local"; asikaxo's "Verified Professionals / Easy Booking / Support / Reliable Work") | A clean 3-4 column value-prop grid is universally applicable — swap categories for whatever a single business's actual differentiators are (credentials, guarantees, local ownership, response time). |
| **Sticky/anchored nav with a distinct primary CTA visually separated from other nav items** (trabahadoor: "Join as Worker →" styled as a button; asikaxo: "Join as Provider") | The pattern of one CTA-styled nav item vs. plain text links is a reusable nav treatment — for Tier1 the CTA would be "Book Now" / "Call Now" / "Get a Quote." |
| **Footer organized into labeled columns (Explore/Company, Get the App or Contact, Legal, Follow Us)** | Structural footer organization (not the app-store content) is a reasonable template baseline: nav links, contact info, legal links, social icons. |
| **Coverage/service-area statement as its own section** (trabahadoor: "Started in Tacloban. Going nationwide."; also present as location list) | A single-location or multi-location business benefits from an explicit "where we serve" section — adapts to a single address + service radius map instead of a multi-city rollout narrative. |

---

## 2. Marketplace-Specific, NOT Applicable

Flagged explicitly so these are not mistaken for adoptable patterns in future builds.

- **Dual-audience nav/page structure** ("For Customers" vs. "For Workers"/"For Providers") — Tier1 has one audience (the customer/client); there is no worker-acquisition funnel.
- **App download CTAs (App Store / Google Play badges) as a primary conversion path** — both sites are mobile-app-first marketplaces; a single-business site's primary conversion is a booking form, phone call, or contact page, not an app install.
- **Worker/provider recruitment content** ("Join as Worker," "From application to first job in 1–3 days," TESDA certification upload flow, "Zero commission for 2025-2026," leaderboards/badges for top performers, OFW pathway, upskilling programs) — entirely about acquiring and retaining a labor supply. No equivalent in a single-business template.
- **Commission/payout economics messaging** ("We don't take 25% off the top," "keep 100%," "9–14% after," "₱40k+ avg. monthly earnings," "5,000+ active providers") — this is marketplace unit-economics marketing aimed at supply-side workers, meaningless to an end customer of a single business.
- **Multi-provider coverage/expansion maps and city-by-city rollout narrative** ("Live in Tacloban. Now in Ormoc," "expanding city by city across the Visayas") — this is inherently about scaling a marketplace across geographies with multiple independent workers per city. A single business has one (or a few) fixed locations, not a rollout story.
- **"Get matched" / algorithmic pairing step in the booking flow** (asikaxo step 03: "We connect you with a verified pro in your service zone") — implies choosing among many interchangeable providers. A single business doesn't "match" a customer to a worker; the business itself performs the service.
- **Facebook/social "recommendations" aggregator section as distinct from in-app reviews** (trabahadoor's "100% recommend" section, explicitly separate from in-app job reviews) — this dual-review-source structure exists because marketplace trust requires proving individual workers (not just the platform) are good; a single business only needs one review stream.
- **Newsroom/news section with dated press-style posts** ("From the newsroom," city ordinance signings, MOA partnerships) — this is PR content about platform expansion/government partnerships, not applicable to a single local business.
- **"Impact" page with platform-wide aggregate metrics as its own top-level nav item** — appropriate for a startup proving marketplace traction to investors/press; a single business would fold any comparable content (years in business, clients served) into an About page, not a dedicated Impact page.
- **Worker verification requirement lists as customer-facing trust content** (TESDA NC, NBI clearance, government ID checklists) — these are marketplace-specific because the platform is vetting *many independent third parties*. A single business's "trust" content should be about its own credentials/licensing, not a vetting pipeline for a workforce.

---

## 3. Section-by-Section Structural Map

### trabahadoor.com

**Homepage** — Hero (headline + location badge "LIVE IN TACLOBAN") → category ticker (scrolling service categories) → featured-workers carousel with star ratings + certifications → aggregate impact stats (workers/users/orders/₱ volume) → "Two doors, one platform" split how-it-works (Customers 3-step / Workers 3-step side by side) → "Why Us" differentiators + comparison heading ("Trabahadoor vs. the rest") → reviews section → coverage/expansion section → newsroom (3 dated posts) → final CTA (app download + worker signup) → footer (Explore / Get the App / Follow Us).

**/for-customers** — Hero ("A verified pro, in your pocket") → 3-step "How to Book" (numbered, emoji icon + title + description) → service catalog (11 categories, TESDA-aligned) → "Safety First" trust list (Phone OTP, Gov ID, NBI clearance, TESDA NC, live tracking, in-app messaging) → FAQ accordion → footer.

**/for-workers** — Hero ("Trabaho. On your terms") → earnings highlight stat → 4-step "How to Join" (Join online → Verification → Get approved → Earn) → requirements checklist → "Career Growth" pathway section (Leaderboards, OFW pathway, Upskilling) → footer.

**/impact** — Hero ("One year. Real proof.") → 4 headline stats (workers/users/orders/₱ volume) → origin story ("Why Tacloban?") → in-app reviews section → separate Facebook-recommendations section → footer.

**/about** — Hero ("Skilled help, one tap away") → mission statement → origin story → repeated impact stats block → "What We Stand For" 3-pillar section (Workers first / Trust you can verify / Proudly local) → team/founders section → expansion/coverage section → FAQ accordion → final CTA (download app / join as worker) → footer.

**Nav (all pages):** Home, For Customers, For Workers, Our Impact, Community, News, About, Contact, Join as Worker (CTA-styled).

**Footer:** Explore (site nav links) / Get the App (Play Store + App Store badges) / Follow Us (social) + tagline + contact email + Privacy & Terms link.

### asikaxo.com (single page, anchor sections)

Hero ("Trusted home help, booked in minutes" + category/location badge) → 4-item trust strip (10+ categories / 100% verified / 24/7 support / PH nationwide) → Services grid (10 categories: Cleaning, Appliance, Electrical, Plumbing, Handyman, Nanny, Caregiver, Beauty, Laundry, Lawn & Garden) → "Why Asikaxo" trust section (4.9/5 rating stat + background-check claim + 4-pillar grid: Verified Professionals / Easy Booking / Support / Reliable Work) → "How It Works" 4-step process (Choose service → Book time slot → Get matched → Relax & rate) → app-download promo section → "For Providers" recruitment section (stats: ₱40k+ avg monthly earnings, 5,000+ active providers, 4.9★ provider rating) → Reviews section (2 testimonials shown, each with name + role/location + specific service) → newsletter signup / contact section → footer.

**Nav:** Home, Services, Why Asikaxo, How it Works, For Providers, Reviews, Contact Us, Join as Provider (CTA-styled).

**Footer:** App Store / Google Play badges, Company (Home/About/Services/For Providers/Contact), Legal (Privacy/Terms/Cancellation/Refund policies), Get in touch (email + phone), agency credit ("VenderIT").

---

## 4. Ranked Recommendation — Highest-Impact Patterns for Tier1

1. **Numbered "How It Works" process strip.** Highest impact-to-effort ratio. Both reference sites lead with this because it directly reduces booking friction — the single biggest conversion blocker for a service business is "I don't know what happens after I click." A 3-step (Contact → Confirm → Service) strip near the top of the homepage would likely lift conversion more than any other single addition.

2. **Trust badge row under the hero + named/specific testimonials.** Together these attack the #1 objection for any local service business: "can I trust this provider?" The icon+label trust strip is cheap to build and immediately scannable; upgrading generic testimonial quotes to name + role/location + specific service booked (as asikaxo does) makes existing reviews feel far more credible with no new content needed, just reformatting.

3. **3-pillar "Why Us" differentiator grid.** Every Tier1 clone needs a differentiation section, and this pattern (icon + short title + 1-2 line description, 3-4 across) is the cleanest, most reusable layout for it — it scales to any vertical (clinic: "Board-certified / Same-day appointments / Insurance accepted"; legal: "Free consultation / Flat-fee pricing / 20 years local"; salon: "Licensed stylists / Premium products / Walk-ins welcome") without forcing marketplace-specific content into the template.

Stats counters and FAQ accordions are also worth keeping in the standard template toolkit, but they're lower-novelty/lower-impact than the three above — most Tier1 clones likely already have some version of them.
