# Reference-Led Veterinary UI Redesign

- [ ] Replace the field-guide palette and typography with the supplied reference’s electric-blue, white, black, and lime visual system.
- [ ] Add a custom dog-and-cat hero asset plus a second supporting pet portrait that fit the new composition.
- [ ] Recompose Home, Services, and Request pages with oversized wordmarks, sculptural rounded panels, sparse navigation, and editorial service cards.
- [ ] Preserve the exact Tier 1 three-page scope, fictional-demo disclosure, no-testimonial rule, and non-live request-form behavior.
- [ ] Run TypeScript/build/route checks, review all three pages visually, save a checkpoint, and deliver the redesign.

## Validation Notes

Desktop and mobile visual checks confirm that the redesign applies the requested pet-first electric-blue composition across all three pages. The large wordmark stage, rounded white panels, lime calls to action, service-card rhythm, mobile stacking, disclosure language, and non-live request form are all visible and readable. TypeScript, production build, and three route checks are complete; the remaining task is the final checkpoint and delivery.

## Homepage Fidelity and Interaction Pass

- [ ] Integrate the pet cutout across the white title plane and blue stage without increasing overall hero height.
- [ ] Reduce visible fictional-demo wording to an unobtrusive footer disclosure while keeping the request-form notice explicit.
- [ ] Recompose the About panel with a larger pet image field, stronger headline, readable supporting copy, and prominent metrics.
- [ ] Add desktop hover/focus service-card expansion with image reveal, while retaining an accessible static mobile card presentation.
- [ ] Validate the refined homepage at desktop and mobile sizes, then save and deliver a checkpoint.

## Fidelity Pass Results

The refined homepage has passed desktop and mobile visual checks. The pet cutout now bridges the white title plane and blue stage without increasing the hero height; the About composition uses an image-led left field with a stronger editorial statement and legible metrics; and visible demo language is limited to the footer plus the intentionally explicit non-live request-form guidance. The Playwright suite passed all service-card hover, image reveal, reset, keyboard-focus, containment, and mobile-default checks. TypeScript and production builds also pass.

## Cross-Page UI/UX Correction

- [ ] Consolidate homepage-derived layout, type, color, radius, spacing, and motion values into reusable tokens.
- [ ] Rebuild the Services page as a 3-column interactive service gallery with content-preserving per-service imagery and keyboard-accessible expansion.
- [ ] Apply the same signature interaction to the homepage’s four service cards while reducing excess vertical spacing.
- [ ] Compact and rebalance the Request hero, convert the lime sidebar to a restrained information rail, and refine form sizing and focus behavior.
- [ ] Validate Services and Request desktop/mobile behavior, interaction states, type checking, production build, and cross-page visual consistency.

## Cross-Page Desktop Audit

At the 1280px desktop breakpoint, the shared header, footer, palette, rounded stage transitions, display type treatment, lime actions, and page gutters now read as one Paws+Pine system. Services has a compact hero, editorial six-service introduction, and a stable three-column card gallery. Request brings the headline and form into view earlier and uses a low-contrast process rail instead of a full-height lime block. The remaining validation is a direct mobile visual review and final checkpoint.

## Cross-Page Verification Results

Mobile review at 390px confirms that Services uses a one-column image-visible gallery and that Request stacks its process rail before the form without a tall lime panel. The expanded Playwright suite passed every Home and Services card hover, image-reveal, text-containment, number-containment, collapse, keyboard-focus, responsive overflow, and mobile-default image check. The viewport sweep passed at 1440×1000, 1280×800, 1024×768, 768×1024, 430×932, 390×844, and 360×800 across Home, Services, and Request. TypeScript and the production build pass.
***
