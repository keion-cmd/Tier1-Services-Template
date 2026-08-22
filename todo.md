# Reference-Led Veterinary UI Redesign

- [x] Replace the field-guide palette and typography with the supplied reference’s electric-blue, white, black, and lime visual system.
- [x] Add a custom dog-and-cat hero asset plus a second supporting pet portrait that fit the new composition.
- [x] Recompose Home, Services, and Request pages with oversized wordmarks, sculptural rounded panels, sparse navigation, and editorial service cards.
- [x] Preserve the exact Tier 1 three-page scope, fictional-demo disclosure, no-testimonial rule, and staff-reviewed pending-request behavior.
- [x] Run TypeScript/build/route checks, review all three pages visually, save a checkpoint, and deliver the redesign.

## Validation Notes

Desktop and mobile visual checks confirm that the redesign applies the requested pet-first electric-blue composition across all three pages. The large wordmark stage, rounded white panels, lime calls to action, service-card rhythm, mobile stacking, disclosure language, and non-live request form are all visible and readable. TypeScript, production build, and three route checks are complete; the remaining task is the final checkpoint and delivery.

## Homepage Fidelity and Interaction Pass

- [x] Integrate the pet cutout across the white title plane and blue stage without increasing overall hero height.
- [x] Reduce visible fictional-demo wording to an unobtrusive footer disclosure while keeping the request-form notice explicit.
- [x] Recompose the About panel with a larger pet image field, stronger headline, readable supporting copy, and prominent metrics.
- [x] Add desktop hover/focus service-card expansion with image reveal, while retaining an accessible static mobile card presentation.
- [x] Validate the refined homepage at desktop and mobile sizes, then save and deliver a checkpoint.

## Fidelity Pass Results

The refined homepage has passed desktop and mobile visual checks. The pet cutout now bridges the white title plane and blue stage without increasing the hero height; the About composition uses an image-led left field with a stronger editorial statement and legible metrics; and visible demo language is limited to the footer plus the intentionally explicit non-live request-form guidance. The Playwright suite passed all service-card hover, image reveal, reset, keyboard-focus, containment, and mobile-default checks. TypeScript and production builds also pass.

## Cross-Page UI/UX Correction

- [x] Consolidate homepage-derived layout, type, color, radius, spacing, and motion values into reusable tokens.
- [x] Rebuild the Services page as a 3-column interactive service gallery with content-preserving per-service imagery and keyboard-accessible expansion.
- [x] Apply the same signature interaction to the homepage’s four service cards while reducing excess vertical spacing.
- [x] Compact and rebalance the Request hero, convert the lime sidebar to a restrained information rail, and refine form sizing and focus behavior.
- [x] Validate Services and Request desktop/mobile behavior, interaction states, type checking, production build, and cross-page visual consistency.

## Cross-Page Desktop Audit

At the 1280px desktop breakpoint, the shared header, footer, palette, rounded stage transitions, display type treatment, lime actions, and page gutters now read as one Paws+Pine system. Services has a compact hero, editorial six-service introduction, and a stable three-column card gallery. Request brings the headline and form into view earlier and uses a low-contrast process rail instead of a full-height lime block. The remaining validation is a direct mobile visual review and final checkpoint.

## Cross-Page Verification Results

Mobile review at 390px confirms that Services uses a one-column image-visible gallery and that Request stacks its process rail before the form without a tall lime panel. The expanded Playwright suite passed every Home and Services card hover, image-reveal, text-containment, number-containment, collapse, keyboard-focus, responsive overflow, and mobile-default image check. The viewport sweep passed at 1440×1000, 1280×800, 1024×768, 768×1024, 430×932, 390×844, and 360×800 across Home, Services, and Request. TypeScript and the production build pass.

## Hero and Navigation Refinement

- [x] Recompose the homepage hero as one off-white and blue visual canvas with pets bridging the background title and blue field.
- [x] Increase pet prominence while removing the visible magenta fringing and retaining clean, natural cutout edges.
- [x] Rebalance the lower-left message, lime CTA, and right-side pathway annotation without adding visual clutter.
- [x] Upgrade the shared navbar’s scale, spacing, active indicator, mobile behavior, and subtle sticky scroll treatment.
- [x] Validate the refined hero and header at desktop and mobile widths, then save and deliver a checkpoint without publishing.

## Hero Audit Findings

The original hero separated the off-white title plane, blue stage, and pet treatment too visibly. The revised structure now uses one hero canvas with a lower blue field, title architecture behind the pet layer, larger central pet placement, outward support content, a rising About transition, and enlarged shared navigation. The first cleanup variation exposed a baked checkerboard and was not retained; the project now references a purpose-built true-alpha replacement while its generation finishes. Final visual acceptance must occur only after the generated asset has replaced its temporary placeholder.

## Hero Asset QA Update

The generated alpha candidate replaced its placeholder but retained an opaque gray field, so it fails the required clean-cutout criterion and will not remain in the composition. Desktop and mobile geometry otherwise confirm that the integrated title, blue ground, pets, support message, and pathway annotation follow the intended hierarchy. The project will return to the known transparent source cutout while avoiding added glows or shadows; the remaining pass is its final visual confirmation.

## Final Hero and Header Visual Verification

The fresh storage upload restored the approved transparent pet cutout without missing-image or opaque-field artifacts. A restrained grayscale treatment suppresses the residual colored fringe without adding a glow, shadow, or background. At 1440px, the title remains legible behind the pets, the pets bridge the off-white/blue split, and the support copy plus the 06 annotation remain clear. At 390px, the mobile header, title, animal pair, support copy, CTA, and pathway annotation are stacked intentionally with no horizontal overflow. Automated checks also pass for the sticky header, accessible menu opening, Escape-to-close focus return, and reduced-motion behavior.

## Final Technical Validation

The final TypeScript check, Vite production build, and focused hero/navigation Playwright suite all pass. The automated suite covers the desktop floating-navbar dimensions, title-to-pet overlap, sticky scroll state, backdrop blur, responsive overflow at six requested breakpoints, mobile menu visibility, expanded state, focus transfer, Escape close, focus return, and reduced-motion handling.

## Final Navigation and Light-Stage Fidelity Pass

- [x] Replace the shared header’s floating rounded container with a quieter integrated bar, without changing its navigation destinations or mobile-menu behavior.
- [x] Introduce one major structural-radius token for hero, About, and FAQ stages while preserving distinct smaller service-card radii.
- [x] Remove excessive outer gutters around the About and FAQ off-white stages so they read as page architecture rather than floating cards.
- [x] Preserve all approved hero, pet, service, FAQ, CTA, footer, and content behavior while validating desktop and mobile geometry.
- [x] Run final visual, TypeScript, build, and navigation interaction checks; save a checkpoint without publishing.

## Precision Fidelity Verification

The desktop review confirms that the header is now a flat, quiet line integrated with the hero rather than a floating white SaaS panel. The hero spans the full page width with lower-only curvature, while About and FAQ use the shared structural-radius language with minimal side insets instead of large blue gutters. The mobile review confirms a 60px integrated header and near-edge-to-edge light stages with 24px structural curvature. Hero, services, FAQ, CTA, footer, content ordering, and interactive cards were not altered.

## Final Precision QA

TypeScript and production builds pass. The updated Playwright suite confirms the 58–64px desktop integrated header, zero-radius navigation bar, restrained 38–42px CTA, minimal About and FAQ insets, title-pet overlap, sticky scroll state with header blur, no horizontal overflow at all requested widths, accessible mobile menu/focus/Escape behavior, and reduced-motion support.

## Functional Appointment Workflow

- [x] Inspect available project capabilities and connected integrations for secure appointment-request handling.
- [x] Confirm whether submissions should create staff-reviewed requests in Google Sheets, a connected scheduling platform, or another explicitly approved destination.
- [x] Upgrade the static project to a server-backed workflow if required and configure only the approved destination.
- [x] Replace the showcase-only request handling with validated live submission, honest pending-approval messaging, and appropriate privacy guidance.
- [x] Test success and failure states without submitting fabricated appointments, then save and present the completed workflow.
- [x] Resolve the full-stack upgrade merge conflicts while preserving the approved three-page Paws+Pine site and shared visual system.

## Confirmed Tier 1 Booking Direction

The selected scope is a **staff-reviewed Google Sheet appointment request**, not self-service slot booking. Each valid request will be recorded with a pending status for clinic staff follow-up. The public flow must not claim confirmation, calendar reservation, payment processing, or real-time availability.

## Apps Script Intake Revision

- [x] Create a Google Apps Script project bound to the approved appointment-request Sheet and configure its narrow write-only intake behavior.
- [x] Require a server-held shared secret on all website-to-script requests; do not expose Google credentials or the secret in browser code.
- [x] Store the deployed Apps Script URL and shared secret as project secrets, then connect the existing request form through a server-side procedure.

## Appointment Workflow Verification

The browser form now uses the live server-side submission path and clearly states that a request does not reserve a time or confirm a visit. Desktop and 390px mobile checks show the consent control, pending-review notice, and submit state are readable within the existing Paws+Pine layout. No browser submission was made, so no fictitious appointment or request row was created. The server-side unit test passed, and the live credential probe used a deliberately incomplete request that Apps Script rejected before any Sheet row could be appended.

- [x] Submit one clearly labelled, non-appointment integration-test row through the deployed server and verify its pending-review row in the approved Google Sheet before checkpointing.

## Live Sheet Verification

With explicit approval, the server-side intake submitted reference `9a80f23f-7be8-4a72-be35-ad5279649c6f`. The approved Google Sheet records it as `Pending staff review`, with the test-only labels, an empty preferred date, no staff note, and no confirmed appointment value. This confirms the production website path reaches the Apps Script endpoint and Sheet while preserving the no-confirmation Tier 1 boundary.

## Internal Page Hero Shell Alignment

- [x] Remove route-specific internal-page hero container geometry and reuse one full-width off-white stage shell with shared lower-only curvature.
- [x] Apply the homepage-equivalent sticky navbar and divider behavior uniformly to Home, Services, and Request.
- [x] Connect Services and Request light hero stages directly to their blue content stages with no detached outer gutters or page gap.
- [x] Preserve Services image/copy/cards and the Request form/progress rail/appointment workflow unchanged.
- [x] Validate all three routes at desktop and mobile widths, including sticky scroll behavior and active navigation states, then save a checkpoint without publishing.

## Shared Shell Desktop Comparison

At 1440px, Home, Services, and Request now use the same integrated header and full-width off-white architectural stage. Services and Request no longer carry the previous blue line or side gutter around their hero shells; their blue page surfaces meet the shared lower-only curved boundary directly. The page-specific hero content, Services imagery and cards, Request form and progress rail, active nav links, CTA, and appointment workflow are unchanged. Mobile and sticky-scroll validation remain.

## Internal Page Shell Final Validation

The six-viewport Playwright sweep passed at 1440×1000, 1280×800, 1024×768, 768×1024, 430×932, and 390×844 for Home, Services, and Request. It confirms identical 62px desktop/60px mobile header geometry, expected active links, full-width hero stages, lower-only curvature, no horizontal overflow, and sticky headers remaining at the viewport top after scroll. The `neo-site` wrapper now clips horizontally without creating a vertical scroll container, preserving the shared header behavior. TypeScript, all appointment-workflow regression tests, and the production build pass.

## GitHub Export

- [x] Verify the target `keion-cmd/Tier1-Vet-Demo` repository and local project state.
- [x] Resolve the `403 Write access to repository not granted` response for the target GitHub repository or provide a writable replacement repository.
- [x] Commit the current validated project with generated outputs, credentials, and local QA artifacts excluded.
- [x] Push the commit to the target repository and verify the remote branch points to it.

The project has been pushed to `keion-cmd/Tier1-Vet-Demo` on `main`. Remote verification confirmed commit `dc463aad4efaf1bea576ff10dcf4221a3a6862e8` matches the local export commit.

## Tier 3 Offer Redesign Planning

- [x] Reconfirm the Tier 2 price and current Tier 3 inclusions, third-party links, and renewal assumptions.
- [x] Define the proposed Tier 3 custom admin and staff dashboard roles, service-operation workflows, booking metrics, and data boundaries without e-commerce.
- [x] Calculate the exact Tier 3 price at three times Tier 2 and document payment, checkout, catalogue, delivery, and maintenance exclusions.
- [x] Present a decision-ready Tier 3 scope, architecture, milestones, and approval questions before implementation.

**Confirmed direction:** The revised Tier 3 offer is a services-operations website and dashboard only. It excludes products, e-commerce sales, checkout, payment processing, inventory, fulfillment, order tracking, and commerce platform integrations.

## All-Tier Google Location and Tier 3 Booking System Revision

- [x] Define the exact free one-page Google Location deliverable, ownership model, and how it remains separate from each tier’s fixed website page count.
- [x] Add the optional AI-generated location-site inclusion and its approved address/service-area, map, hours, brand, media, and deployment inputs to Tier 1, Tier 2, and Tier 3.
- [x] Define the fixed Tier 3 booking lifecycle for requests, meetings, service bookings, staff assignment, schedule management, confirmation, completion, and cancellation.
- [x] Define Tier 3 owner/admin and staff dashboard permissions, booking metrics, schedule views, notification boundaries, and record-retention rules.
- [x] Reconcile the ₱44,700 Tier 3 price with the approved fixed booking-system scope, exclusions, delivery timeline, and maintenance boundary.
- [x] Present a revised decision-ready three-tier package matrix and implementation approval checklist.

## Confirmed Location Site and Live-Slot Booking Decisions

- [x] Define the optional AI-generated one-page location site as a separate deliverable, not a Google Business Profile and not part of the fixed public-page count.
- [x] Set the minimum client-owned domain/hosting, approved map/address, brand, accessibility, and content requirements for the optional location site.
- [x] Replace Tier 3 request-only booking with direct public selection from live available slots, with transactional conflict prevention and secure dashboard capture.
- [x] Specify the dashboard-only notification model and public on-screen booking confirmation language; exclude email notifications from the fixed scope.
- [x] Recommend and obtain approval for the Tier 3 staff-user cap, including the owner/admin account and boundaries for later additional users.

## Approved Tier 3 Staffing Cap

- [x] Fix the Tier 3 launch capacity at one owner/admin plus up to five active staff accounts, with up to five bookable staff/resource calendars.
- [x] Define the onboarding, permission, availability, and role-change rules for the approved six-user maximum.

## Client-Ready Location Page and All-Tier Footer Value

- [x] Replace customer-facing references to AI-generated location pages with polished optional one-page location-site language.
- [x] Define a complete shared footer inclusion for every tier: approved logo/business name, quick links, contact details, social links, legal/privacy links, copyright, and appropriate primary CTA.
- [x] Preserve exact public-page limits by treating footer destinations only as approved existing routes or external links, never as automatic new public pages.
- [x] Update the Tier 3 and all-tier offer documents with the revised location-page and footer value wording.

## Tier 1 Live Google Sheet Form Revision

- [x] Define Tier 1’s selectable live booking-request and live service-request form modes, both writing securely to the client-approved Google Sheet.
- [x] Define the Tier 1 Google Sheet schema, server-mediated write path, validation, consent, on-screen success/error treatment, and fallback contact path.
- [x] State that Tier 1 creates a live recorded request, not a live-reserved calendar slot, unless a separately scoped live-availability engine is implemented.
- [x] Update the revised three-tier offer and supporting Tier 3 reference to describe the expanded Tier 1 form capability accurately.

## Tier 1 Services-Only Correction

- [x] Remove Tier 1 product, order, quantity, and product-catalogue language from the offer and supporting scope descriptions.
- [x] Limit Tier 1’s live Google Sheet form to service enquiry, service request, appointment request, or meeting request information.
- [x] Replace the Tier 1 fixed page label with Services and Contact / Book Request while retaining the exact three-page limit.
- [x] Deliver the corrected services-only offer file.

## All-Tier Services-Only Correction

- [x] Remove product, ordering, quantity, catalogue, fulfillment, and commerce terminology from Tier 1, Tier 2, and Tier 3 customer-facing scope.
- [x] Define Tier 1 as live service enquiry or appointment/meeting request intake to Google Sheets; Tier 2 as external service booking/inquiry; and Tier 3 as custom live service booking and operations.
- [x] Replace all public page labels with service-focused wording while preserving the original fixed page counts: 3, 9, and 11.
- [x] Rewrite the customer-ready offer and detailed Tier 3 plan as a consistent services-only package family.

## Complete Consolidated Services-Only Tier Plan

- [x] Consolidate every approved Tier 1, Tier 2, and Tier 3 services-only decision into one complete operational and commercial plan.
- [x] Include all fixed page structures, location-page option, complete footer scope, form/booking workflows, data destinations, role boundaries, security, QA, delivery, and exclusions.
- [x] Review the consolidated plan for consistent services-only wording, page counts, pricing, and confirmation claims.
- [x] Deliver the complete tier-plan file rather than only the customer-facing package matrix.

## Sample-Aligned Complete Tier Plan

- [x] Review the supplied sample offer-plan structure and presentation conventions without copying obsolete scope.
- [x] Reformat the complete services-only Tier 1–3 plan to use the sample’s decision-ready package-plan structure.
- [x] Preserve the approved Location Page, all-tier complete footer, Tier 1 Google Sheet intake, Tier 2 external service booking, and Tier 3 live service-booking dashboard decisions.
- [x] Deliver the reformatted complete tier-plan file.

## Template-Based Fast Delivery and Provider-Led Setup Correction

- [x] Set the delivery target for Tier 1, Tier 2, and Tier 3 to 1–5 business days after complete approved tier-specific inputs are received.
- [x] Explain that an existing approved website and dashboard template foundation enables the Tier 3 1–5 business-day target while preserving the stated fixed scope.
- [x] Prominently state the free optional Location Page, free SSL/HTTPS, free Launch-Ready SEO Setup, and free `.com` domain for one year in the all-tier value section.
- [x] Clarify that the provider completes agreed setup work—including domain registration, approved Google Sheet setup/integration, configuration, and launch checks—while the client supplies complete tier-specific information and approvals.
- [x] Deliver the corrected sample-aligned complete tier-plan file.

## Updated Tier 1 Project Completion

- [x] Audit the existing three public routes, live Google Sheet request workflow, service-only wording, and shared footer against the approved Tier 1 package plan.
- [x] Preserve exactly three public pages—Home, Services, and Contact / Book Request—while aligning each route with the updated service-only conversion path.
- [x] Complete the approved-content footer with contact, social, policy, copyright, and route-appropriate service CTA behavior without inventing client data.
- [x] Confirm the live Google Sheet form remains server-mediated, validates approved fields, records requests honestly, and does not promise a reserved slot or confirmed appointment.
- [x] Determine a scope-safe implementation of the optional Location Page without increasing the Tier 1 public page count unless the user explicitly authorizes a separate property.
- [x] Add or update Vitest coverage and run build, workflow, and responsive visual checks before saving the completed Tier 1 update.

## Tier 1 Social, Location, and Form-Validation Extension

- [x] Add clearly labelled placeholder Facebook and Instagram icon links to the shared footer without representing them as verified clinic profiles.
- [x] Activate the approved optional Location Page as a separate public route and add a Google Maps search embed for the approved fictional clinic address.
- [x] Add the Location Page to navigation/footer only as an authorized optional-page extension, preserving the original three-route Tier 1 core distinction.
- [x] Add live inline email and phone validation in the request form, plus matching server-side phone-format validation before Google Sheet forwarding.
- [x] Add or update Vitest coverage and run build, route, map, footer, form-validation, and responsive visual checks before checkpointing.

## Tier 1 Request Feedback, Policy, and Location Refinement

- [x] Add an accessible in-form loading treatment during the live Google Sheet submission without implying that a request is an appointment confirmation.
- [x] Strengthen the successful submission state to state that the request was received by the secure staff-review workflow and include the request reference.
- [x] Add a client-approved cancellation and contact policy link to the footer and a simple accessible policy presentation with demo-only content clearly labelled.
- [x] Improve the optional demo Location Page composition, map framing, and address information so it aligns with the established Paws+Pine UI/UX.
- [x] Add or update non-submitting browser checks and run tests, build, policy, feedback, location, and responsive visual validation before checkpointing.

## Tier 1 Preferred Slot and Approved Calamba Location

- [x] Add preferred appointment date and time controls to the live request form, preserving the staff-reviewed and no-confirmation boundary.
- [x] Carry the approved preferred time safely through the server-side Google Sheet intake contract and tests.
- [x] Replace the fictional location content and Google Maps destination with Center Stall No. 4027, 2nd Street, Calamba, Laguna.
- [x] Add a polished, accessible business-hours section to the Location Page using the approved clinic hours.
- [x] Run type checks, request-contract tests, non-writing browser QA, map/address checks, and responsive visual validation before checkpointing.

## Complimentary Location Page Navigation Refinement

- [x] Add the complimentary Location Page to the desktop and mobile primary navigation with an accurate active state.
- [x] Use concise included-benefit wording that makes the location entry discoverable without crowding the Tier 1 navigation.
- [x] Refine the Location Page navigation CTA and visual hierarchy to align with the Paws+Pine UI/UX system.
- [x] Validate desktop and mobile navigation, location active state, keyboard interaction, overflow, and responsive page presentation before checkpointing.

## Supplied Directions and Landmark Enhancement

- [x] Replace the generic Google Maps search frame with the user-supplied directions embed for the approved clinic and Calamba Trade Center route.
- [x] Add Calamba Trade Center as the approved nearby landmark and present a concise directions action without inventing additional driving guidance.
- [x] Preserve accessible iframe labelling, external-map access, and responsive map/directions layout.
- [x] Run type checks, browser checks, embed/landmark verification, and responsive visual validation before checkpointing.

## Scope Correction: Paws+Pine Brand with Accurate Location Only

- [x] Roll back the site-wide Hayop Kalinga rebrand to the pre-rebrand Paws+Pine checkpoint.
- [x] Keep Hayop Kalinga Veterinary Clinic, Center Stall No. 4027, 2nd Street, Calamba, Laguna only in the Location Page address, map, driving directions, and landmark context.
- [x] Confirm that homepage, Services, request flow, shared header/footer, metadata, and Google Sheet source remain Paws+Pine branded.
- [x] Validate the restored brand and accurate Location Page details before checkpointing.

## Location Map Visibility Refinement

- [x] Move the driving-route label to the right side of the embedded map so it does not conceal the clinic location.
- [x] Move the Open driving directions action into a centered control below the map, away from Google Maps controls and content.
- [x] Preserve accessible map labelling, external directions access, and responsive desktop/mobile layout.
- [x] Run visual and browser checks for map visibility and action placement before checkpointing.

## In-Map Directions Action Correction

- [x] Return the Open driving directions action to the inside of the embedded map card, centered along its lower edge.
- [x] Keep the driving-route label right-aligned and ensure the in-map action avoids Google Maps zoom, attribution, and keyboard controls.
- [x] Update browser geometry checks and validate desktop/mobile map-card behavior before checkpointing.

## Full-Height Google Maps Card Refinement

- [x] Make the supplied Google Maps iframe fill the entire right-hand map card without an empty lower area.
- [x] Preserve the right-aligned driving-route label and centered lower in-map directions action inside the full-height map.
- [x] Update browser geometry checks and validate the full map-card layout at desktop and mobile sizes before checkpointing.

## Custom Staff-Reviewed Reviews Section

- [x] Define a custom review form with only approved fields, consent for staff follow-up, clear privacy language, and no automatic public display.
- [x] Add a homepage Reviews section and accessible custom feedback form without fabricated ratings, testimonials, or review content.
- [x] Extend the existing server-mediated Google Sheet/App Script workflow to store review submissions in a separate staff-review tab with an explicit pending status.
- [x] Add unit and non-writing browser coverage for review validation, pending-review confirmation, and absence of public-review claims.
- [x] Document the required Apps Script deployment update and verify the build, tests, responsive homepage layout, and live-flow boundary before checkpointing.

## Approved Reviews Display Workflow

- [x] Replace “Custom feedback” wording with client-ready Reviews language across the homepage form and success state.
- [x] Define a staff-approved public-review workflow that renders only genuine, explicitly approved submissions and never fabricates review content.
- [x] Preserve immediate submission acknowledgement while making public visibility dependent on explicit staff approval.
- [x] Add tests and documentation for the approval-to-public-display boundary before checkpointing.

## Immediate Reviews Display Simplification

- [x] Remove the separate publication checkbox and staff-approval dependency from the review submission form and public display flow.
- [x] Make each successfully submitted genuine review appear in the homepage Reviews section immediately after the secure Google Sheet write returns.
- [x] Preserve clear data minimization by displaying only the review name, rating, and review text; never display email or staff notes.
- [x] Update Apps Script status/columns, tests, copy, and browser QA for the streamlined immediate-display workflow before checkpointing.

## Reviews Abuse Protection and Live-Path Verification

- [x] Superseded the proposed server-side rate limit when the user changed Reviews to a browser-display-only feature with no submission endpoint.
- [x] Refine review-form loading and success feedback for immediate browser-session display without a secure write.
- [x] Run non-writing validation for session-only display, refresh clearing, and private-field boundaries.
- [x] Stop live Sheet-path review testing after the user removed Google Sheet from the Reviews feature.

## Display-Only Reviews Revision

- [x] Remove Google Sheet and server-side storage from review submission and public review retrieval.
- [x] Display a visitor-submitted review immediately in the current homepage session only, with no persistence after refresh.
- [x] Keep clear loading and success feedback while removing unnecessary rate-limit and external-review deployment dependencies.
- [x] Update tests, QA, and copy to state the accurate browser-session-only retention boundary.

## Complimentary All-Tier Google Reviews Pathway

- [x] Replace the temporary browser-session Reviews form with a polished Google Business Profile review CTA that does not fabricate or scrape reviews.
- [x] Add a complimentary Google Reviews pathway to the Tier 1, Tier 2, and Tier 3 offer scope, including the client-provided review destination requirement.
- [x] Validate the review CTA across desktop/mobile using the client-provided Google Maps destination.

## Clinic Location Navigation Label

- [x] Remove the FREE label from the desktop and mobile Clinic location navigation item without changing its route or map content.

## Complete Updated Tier Plan File

- [x] Consolidate the approved Tier 1, Tier 2, and Tier 3 services-only scope, pricing, page structure, inclusions, exclusions, delivery, and client-input requirements.
- [x] Add the complimentary Google Reviews pathway, optional Location Page, complete footer, SSL/HTTPS, SEO setup, and one-year domain inclusion consistently across all tiers.
- [x] Deliver a new client-ready complete tier plan file with accurate Google Sheet, external booking, and Tier 3 live-slot/dashboard boundaries.

## Sample-Aligned Updated Tier Plan PDF

- [x] Reformat the current complete three-tier plan to follow the supplied fixed-offer PDF’s comparative package and detailed-tier structure.
- [x] Produce a polished PDF that retains the updated services-only scope, ₱44,700 Tier 3 dashboard, and complimentary Google Reviews pathway.
- [x] Compile, verify, and visually review the new PDF before delivery.

## Final Package Comparison Revision

- [x] Reformat the PDF’s Final Package Comparison in the supplied compact four-column offer-table style.
- [x] Populate every comparison row with complete current Tier 1, Tier 2, and Tier 3 values, including the ₱44,700 Tier 3 operations dashboard scope.
- [x] Recompile, verify, and visually review the corrected comparison before delivering the replacement PDF.

## Editable Raw Tier Plan with FREE Comparison

- [x] Create a raw editable complete tier-plan file instead of a PDF.
- [x] Use a compact Final Package Comparison table matching the supplied reference structure with every approved FREE inclusion visible for Tier 1, Tier 2, and Tier 3.
- [x] Verify the raw file includes the complete current services-only scope and deliver only the raw file.

## Homepage Hero Copy Refinement

- [x] Replace the redundant homepage hero headline with a warm, care-focused message and supporting line while preserving the existing primary CTA.

## Centered Bold Hero Title Refinement

- [x] Center the homepage hero headline and increase its scale and weight while preserving mobile readability and the pet-image composition.

## Cross-Page Readability Refinement

- [x] Increase homepage supporting copy and action control sizes, including the hero value message and Explore services action.
- [x] Increase footer text, navigation, social, policy, and request-detail readability without changing the footer’s information architecture.
- [x] Raise the minimum readable size of important supporting details and actions across Services, Clinic location, and Request a visit pages.
- [x] Validate readable text hierarchy and controls across desktop and mobile public routes.

## Complete Mobile Usability and Interaction Pass

- [x] Audit Home, Services, Clinic location, Request a visit, mobile navigation, and footer for small text, contrast, overflow, and undersized tap targets.
- [x] Increase the mobile minimum size of important supporting text, detail labels, form instructions, footer content, and every section-level action.
- [x] Improve interactive affordances for mobile navigation, service cards, accordion content, map/directions, and primary actions while respecting reduced motion.
- [x] Validate all public pages on desktop and mobile with interaction and touch-target QA.

## Desktop Action Hover Feedback

- [x] Add consistent desktop hover lift, color/shadow response, arrow motion, and active press feedback to enlarged public action controls without affecting touch devices or reduced-motion users.

## Scroll Reveals and Mobile Interface Refinement

## Mobile Navigation Overlay Bug Fix

- [x] Fix mobile menu stacking and overflow so navigation content is not overlapped by page/footer content.
- [x] Validate close control, link spacing, scroll behavior, and menu readability at 360px, 390px, and 430px widths.


- [x] Add accessible, reduced-motion-safe scroll-based section reveals to the public pages.
- [x] Improve the mobile interface hierarchy, navigation controls, spacing, and visual feedback across Home, Services, Clinic location, and Request a visit.
- [x] Validate scrolling, reveal behavior, mobile navigation, touch controls, and readable layout at mobile and desktop breakpoints.

## Route Navigation Scroll Reset

- [x] Reset scroll to the first section whenever visitors navigate between Home, Services, Clinic location, and Request a visit on desktop and mobile.
- [x] Add regression coverage for route changes from a scrolled position and verify the refreshed route begins at the top.
- [x] Validate the fix across desktop and mobile navigation before checkpointing.


## GitHub Sync and Vercel Handoff

- [x] Sync the verified project to the private `keion-cmd/Tier1-Vet-Demo` GitHub repository.
- [x] Provide the exact Vercel import and deployment handoff for a project named `Tier1-Vet-Demo`; direct deployment is not performed from this workflow.


## Vercel Environment Configuration

- [x] Inventory environment variables actually referenced by the current full-stack project and classify them as server-only or browser-exposed.
- [x] Document the correct Vercel scopes, sources, and deployment compatibility requirements without exposing secret values.
- [x] Guide post-configuration verification for build, OAuth, tRPC, appointment intake, and browser functionality.


## CLI Vercel Environment Setup

- [x] Check Vercel CLI authentication, team, and `Tier1-Vet-Demo` project linkage without exposing credentials.
- [x] Compare required environment-variable names with securely available values.
- [x] Add only verified variables through CLI and document any missing values or full-stack deployment blockers.


## Vercel Deployment Verification

- [x] Inspect the current Vercel deployment status and recent deployment details.
- [x] Run non-destructive checks against the live site and configured routes.
- [x] Check for backend routing or runtime blockers without publishing.
- [x] Report the verification results and the remaining user-controlled publish action.

