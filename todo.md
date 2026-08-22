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

## Hero and Navigation Refinement

- [ ] Recompose the homepage hero as one off-white and blue visual canvas with pets bridging the background title and blue field.
- [ ] Increase pet prominence while removing the visible magenta fringing and retaining clean, natural cutout edges.
- [ ] Rebalance the lower-left message, lime CTA, and right-side pathway annotation without adding visual clutter.
- [ ] Upgrade the shared navbar’s scale, spacing, active indicator, mobile behavior, and subtle sticky scroll treatment.
- [ ] Validate the refined hero and header at desktop and mobile widths, then save and deliver a checkpoint without publishing.

## Hero Audit Findings

The original hero separated the off-white title plane, blue stage, and pet treatment too visibly. The revised structure now uses one hero canvas with a lower blue field, title architecture behind the pet layer, larger central pet placement, outward support content, a rising About transition, and enlarged shared navigation. The first cleanup variation exposed a baked checkerboard and was not retained; the project now references a purpose-built true-alpha replacement while its generation finishes. Final visual acceptance must occur only after the generated asset has replaced its temporary placeholder.

## Hero Asset QA Update

The generated alpha candidate replaced its placeholder but retained an opaque gray field, so it fails the required clean-cutout criterion and will not remain in the composition. Desktop and mobile geometry otherwise confirm that the integrated title, blue ground, pets, support message, and pathway annotation follow the intended hierarchy. The project will return to the known transparent source cutout while avoiding added glows or shadows; the remaining pass is its final visual confirmation.

## Final Hero and Header Visual Verification

The fresh storage upload restored the approved transparent pet cutout without missing-image or opaque-field artifacts. A restrained grayscale treatment suppresses the residual colored fringe without adding a glow, shadow, or background. At 1440px, the title remains legible behind the pets, the pets bridge the off-white/blue split, and the support copy plus the 06 annotation remain clear. At 390px, the mobile header, title, animal pair, support copy, CTA, and pathway annotation are stacked intentionally with no horizontal overflow. Automated checks also pass for the sticky header, accessible menu opening, Escape-to-close focus return, and reduced-motion behavior.

## Final Technical Validation

The final TypeScript check, Vite production build, and focused hero/navigation Playwright suite all pass. The automated suite covers the desktop floating-navbar dimensions, title-to-pet overlap, sticky scroll state, backdrop blur, responsive overflow at six requested breakpoints, mobile menu visibility, expanded state, focus transfer, Escape close, focus return, and reduced-motion handling.
***
