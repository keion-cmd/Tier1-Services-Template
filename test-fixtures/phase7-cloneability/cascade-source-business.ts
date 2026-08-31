import { industryBrands } from "../../src/lib/industryBrands";
import { insuranceProviders } from "../../src/data/insurance";

export const businessConfig = {
  // "modal" (default) opens the in-page Supabase-backed BookingModal from every CTA.
  // "external" makes every CTA link out to BOOKING_URL (src/lib/booking.ts) instead.
  bookingMode: "modal" as "modal" | "external",
  // Gates <TemplateSelfPromo /> in Footer.tsx (the "this is a template, get one for your
  // business" strip). Must stay false in every clone — only this template's own
  // business-content.ts sets it to true. See CLONE_INSTRUCTIONS.md.
  isTemplateDemo: false,
  name: "Cascade Point Physical Therapy & Wellness",
  shortName: "Cascade Point PT",
  tagline: "Move Better. Live Fuller.",
  descriptor: "Physical Therapy & Wellness Clinic",
  schemaType: "LocalBusiness",
  address: "482 Alder Ridge Way, Suite 200",
  city: "Brightwater, OR",
  phone: "(541) 555-0142",
  phoneDigits: "5415550142",
  email: "hello@cascadepointpt.com",
  hours: "Mon–Fri 7:00 AM–7:00 PM, Sat 8:00 AM–1:00 PM",
  googleReviewUrl: "https://www.google.com/search?q=Cascade+Point+Physical+Therapy+reviews",
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=482+Alder+Ridge+Way+Suite+200+Brightwater+OR",
  businessHours: [
    { days: "Monday – Friday", hours: "7:00 AM – 7:00 PM" },
    { days: "Saturday", hours: "8:00 AM – 1:00 PM" },
    { days: "Sunday", hours: "Closed" },
  ] as { days: string; hours: string }[],
  // Clearly labelled platform-homepage placeholders for the generic template.
  // Replace these with client-approved business-profile URLs before launch.
  socialLinks: [
    { label: "Facebook", href: "https://www.facebook.com/", placeholder: true },
    { label: "Instagram", href: "https://www.instagram.com/", placeholder: true },
  ] as { label: string; href: string; placeholder: boolean }[],
};

/** Backward-compatible alias — prefer `businessConfig` in new code. */
export const clinic = businessConfig;

/**
 * Combines businessConfig.name + businessConfig.descriptor for display, but skips the
 * descriptor when its words are already substantially contained in the name (e.g. a business
 * named "Nova Padel Club" with descriptor "Padel Club" would otherwise render
 * "Nova Padel Club Padel Club").
 */
export function getBusinessTagline(): string {
  const { name, descriptor } = businessConfig;
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  const nameWords = new Set(normalize(name));
  const descriptorWords = normalize(descriptor);
  const isRedundant = descriptorWords.length > 0 && descriptorWords.every((word) => nameWords.has(word));
  return isRedundant ? name : `${name} ${descriptor}`.trim();
}

// Generalized, repeatable homepage logo-marquee groups (Partners, Insurance, Awards,
// "As Seen In", etc). Add or remove groups freely — a group is shown only when its
// `items` array is non-empty (see LogoMarquee.tsx's empty-array guard).
export type LogoMarqueeGroup = {
  id: string;
  heading: string;
  subheading: string;
  items: { name: string }[];
};

// Which logoMarquees group (by id) renders below the Locations section instead of at the
// top of the homepage. Change this if a clone renames/replaces the "insurance" group.
export const LOCATIONS_ADJACENT_MARQUEE_ID = "insurance";

export const logoMarquees: LogoMarqueeGroup[] = [
  {
    id: "partners",
    heading: "Trusted by physicians and athletic programs across the region",
    subheading: "We coordinate care with referring providers, orthopedic surgeons, and local sports programs.",
    items: industryBrands,
  },
  {
    id: "insurance",
    heading: "We work with most major insurance plans",
    subheading: "Not sure if your plan is in-network? Our front desk verifies benefits before your first visit at no cost to you.",
    // Derived from insuranceProviders (also used by InsuranceCombobox) — not a
    // separate data source. "Other / Not Listed" is a form placeholder, not a
    // real provider, so it's excluded from the marquee.
    items: insuranceProviders.filter((p) => p.id !== "other").map((p) => ({ name: p.name })),
  },
];

// Per-section visibility toggles for optional homepage/proof/about/team sections. Every key
// defaults to true; set a key to false, or empty its backing data array where applicable, to
// hide that section without deleting code or data.
export const sectionVisibility = {
  trustStats: true,
  whyChooseUs: true,
  meetTheTeam: true,
  howItWorks: true,
  clinicExperience: true,
  reviewsMarquee: true,
  clientStories: true,
  healthResources: true,
  carePlans: true,
  faqTeaser: true,
  proofStories: true,
  proofCareStats: true,
  aboutTeamGrid: true,
  teamProvidersGrid: true,
  providerAreasOfInterest: true,
  relatedArticles: true,
  locationServicesAndHours: true,
};

// Centralized, placeholder-driven section copy. Every routed page pulls its headline and
// subheadline text from here so a clone only has to edit tokens in one place. Add/remove
// nested keys freely if a page gains or loses a section.
export const copy = {
  home: {
    heroHeadline: "Feel like yourself again — without surgery or guesswork",
    heroSubheadline: "Cascade Point pairs one-on-one manual therapy with a personalized exercise plan so you recover fully and stay that way.",
    heroStatValue: "4.9",
    heroStatCaption: "average rating across 600+ verified patient reviews",
    heroBadgeText: "Direct access — no referral required in Oregon",
    trustStatsTitle: "Care that shows up in the numbers",
    servicesEyebrow: "What we treat",
    servicesTitle: "Physical therapy built around your body, not a generic protocol",
    servicesSubtitle: "From post-surgical recovery to performance recovery, every plan starts with a hands-on evaluation from a doctor of physical therapy.",
    whyUsEyebrow: "Why patients choose us",
    whyUsTitle: "The difference is the hour we spend with you",
    whyUsSubtitle: "Every visit is one-on-one with your assigned therapist — never handed off to an aide or split across three patients at once.",
    teamEyebrow: "Meet the clinicians",
    teamTitle: "Doctors of physical therapy who specialize, not generalize",
    teamSubtitle: "Each of our therapists has advanced training in a specific area of care, so you're matched to the right expert from day one.",
    howItWorksEyebrow: "Getting started",
    howItWorksTitle: "From first call to first real progress",
    howItWorksSubtitle: "Most patients are seen within 48 hours and notice a measurable change in pain or mobility by visit three.",
    facilityEyebrow: "Inside the clinic",
    facilityTitle: "A treatment space built for real recovery, not a hallway of machines",
    successStoriesTitle: "Real patients, real recoveries",
    reviewsTitle: "What our patients are saying",
    reviewsSubtitle: "Verified reviews from Google and our post-visit patient surveys.",
    reviewsLinkLabel: "Read all patient reviews",
    resourcesEyebrow: "Patient education",
    resourcesTitle: "Guides from our clinical team",
    resourcesSubtitle: "Practical, evidence-based articles written by the therapists who treat you — not generic health-site filler.",
    resourceCardLabel: "Read the guide",
    carePlansEyebrow: "How treatment is structured",
    carePlansTitle: "Plans that match the stage of your recovery",
    faqTeaserEyebrow: "Common questions",
    faqTeaserTitle: "Answers before you book",
    faqTeaserSubtitle: "Referrals, insurance, what to expect at your first visit — the questions we hear most.",
    locationEyebrow: "Where to find us",
    locationTitle: "Two Brightwater-area clinics, one standard of care",
    finalCtaTitle: "Ready to stop working around the pain?",
    finalCtaSubtitle: "Book a one-on-one evaluation and leave with a plan built specifically for your body and your goals.",
    leadGenForm: {
      heading: "Not sure where to start?",
      subheading: "Tell us what's going on and a clinician will follow up within one business day.",
      submitButton: "Request a callback",
      successMessage: "Thanks — a member of our clinical team will reach out within one business day.",
      privacyNote: "We never share your information. See our privacy policy for details.",
    },
    insuranceCtaPrompt: "Check if your insurance plan is in-network before you book.",
  },
  about: {
    metaDescription: "The story, care philosophy, and clinical team behind Cascade Point Physical Therapy & Wellness.",
    heroEyebrow: "About Cascade Point",
    heroTitle: "Physical therapy the way it should have been all along",
    heroSubtitle: "Founded in 2014 by Dr. Emily Chan, Cascade Point exists because too many patients were being rushed through 15-minute visits and handed off to aides. We built a clinic where the doctor of physical therapy who evaluates you is the same one who treats you every visit.",
    valuesEyebrow: "What we stand for",
    valuesTitle: "The principles behind every plan of care",
    valueLabel: "Our values",
    approachEyebrow: "Our approach",
    approachParagraph1: "Every plan of care starts with a full hour of one-on-one time with a doctor of physical therapy — not a screening, not a triage visit, a real evaluation of your movement, strength, and history. We test what's actually limiting you before we ever hand you an exercise sheet, because guessing wastes your time and your co-pay.",
    approachParagraph2: "From there, treatment blends hands-on manual therapy with a progressive exercise program you can actually keep up with outside the clinic. We track objective measures — range of motion, strength, gait, balance — at set intervals, so you and your therapist both know exactly how close you are to your goal, not just whether you 'feel a little better.'",
    staffEyebrow: "Our clinicians",
    staffTitle: "The team behind your recovery",
    exploreEyebrow: "Explore Cascade Point",
    exploreTitle: "More ways to get to know us",
    exploreTeamLabel: "Meet the team",
    exploreTeamDescription: "See the credentials and specialties behind every therapist on staff.",
    exploreServicesLabel: "Browse services",
    exploreServicesDescription: "Find the right care path for your specific injury or goal.",
    exploreResourcesLabel: "Read our guides",
    exploreResourcesDescription: "Clinician-written articles on recovery, prevention, and performance.",
    ctaTitle: "Come see the difference one-on-one care makes",
  },
  services: {
    heroTitle: "Services built around how your body actually moves",
    heroSubtitle: "Every service below starts with a hands-on evaluation from a doctor of physical therapy — never a generic intake form.",
    introText: "Whether you're recovering from surgery, managing a chronic injury, or trying to get back to your sport, we match you with a therapist who specializes in exactly that.",
    ctaTitle: "Not sure which service fits your situation?",
    cardLabel: "View service details",
    chooseEyebrow: "How to choose",
    chooseTitle: "Not sure where to start?",
  },
  serviceDetail: {
    benefitsEyebrow: "Why it works",
    processEyebrow: "What to expect",
    processTitle: "How this service unfolds, visit by visit",
  },
  team: {
    heroEyebrow: "Our clinicians",
    heroTitle: "Doctors of physical therapy, each with a specialty",
    heroSubtitle: "Every therapist at Cascade Point holds advanced certifications beyond their DPT degree — so you're never the first case someone has seen.",
    gridEyebrow: "The team",
    gridTitle: "Meet the clinicians",
    ctaTitle: "Ready to work with one of our specialists?",
    cultureEyebrow: "How we work",
    cultureBody: "We cap caseloads deliberately so every therapist spends real, uninterrupted time with each patient. No aide hand-offs, no double-booked treatment slots — the person who evaluates you is the person who treats you.",
  },
  proof: {
    heroEyebrow: "Results",
    heroTitle: "Outcomes we track, patients we've helped",
    heroSubtitle: "We measure recovery in objective terms — return-to-activity time, functional scores, and patient-reported outcomes — not just star ratings.",
    statsEyebrow: "By the numbers",
    statsTitle: "A decade of measurable outcomes",
    statsCaption: "Figures reflect patient outcomes tracked across 2015–2026.",
    statCardLabel: "See the detail",
    storiesEyebrow: "Patient stories",
    ctaTitle: "Add your own recovery story",
    reviewsEyebrow: "Verified reviews",
    reviewsTitleLead: "What our patients",
    reviewsTitleAccent: "actually say",
    reviewsBody: "Every review below comes from a verified Google review or a post-discharge patient survey — nothing is written by us.",
    mapsEyebrow: "Find us",
    mapsTitleLead: "Two clinics,",
    mapsTitleAccent: "one standard of care",
    mapsBody: "Both Cascade Point locations are run by the same clinical team with the same intake process and documentation standards.",
    mapsCardAriaLabel: "Map showing Cascade Point Physical Therapy locations",
    reviewButtonLabel: "Leave us a review",
    mapsHint: "Click a pin to see hours, services offered, and directions for that location.",
  },
  faq: {
    heroEyebrow: "Questions, answered",
    heroTitle: "Frequently asked questions",
    heroSubtitle: "Everything patients ask us before their first visit — referrals, insurance, scheduling, and what to expect.",
    contactEyebrow: "Still have questions?",
    contactTitle: "Reach out directly",
    callLabel: "Call the clinic",
    callDescription: "Our front desk can answer scheduling and insurance questions in real time.",
    emailLabel: "Email us",
    emailDescription: "We typically respond within one business day.",
    ctaTitle: "Ready to book your first visit?",
  },
  locations: {
    heroEyebrow: "Locations",
    heroTitle: "Two clinics serving the Brightwater area",
    heroSubtitle: "Both locations share the same clinicians, documentation, and plan-of-care standards — pick whichever is closer.",
    gridEyebrow: "Our clinics",
    gridTitle: "Find the location nearest you",
    ctaTitle: "Book at either location in under two minutes",
    emptyTitle: "No clinics listed yet",
    emptyBody: "We're finalizing our clinic details — call us directly and we'll help you find the nearest location.",
  },
  location: {
    heroEyebrow: "This location",
    heroTitle: "Visit us here",
    heroSubtitle: "Hours, parking, and the services offered at this clinic.",
    startTitle: "Ready to book?",
    directionsEyebrow: "Getting here",
    directionsTitle: "Directions & parking",
    landmarkLabel: "Nearby landmark",
    addressLabel: "Address",
    hoursEyebrow: "Hours",
    hoursTitle: "Clinic hours",
    emergencyTitle: "Medical emergency?",
    referralLabel: "Referring provider",
    whatToDoLabel: "What to do",
    afterHoursTitle: "After-hours concerns",
  },
  resources: {
    heroEyebrow: "Patient education",
    heroTitle: "Guides from our clinical team",
    heroSubtitle: "Practical, evidence-based articles on recovery, prevention, and performance — written by the therapists who treat you.",
    disclaimerText: "This article is for educational purposes and is not a substitute for an individualized evaluation. Always consult your physical therapist before starting a new exercise program.",
    gridEyebrow: "All articles",
    gridTitle: "Browse our patient guides",
    ctaTitle: "Have a question our guides didn't answer?",
  },
  articleDetail: {
    bodyEyebrow: "Patient guide",
    disclaimerText: "This article is for educational purposes and is not a substitute for an individualized evaluation. Always consult your physical therapist before starting a new exercise program.",
    relatedEyebrow: "Keep reading",
    relatedTitle: "Related guides",
    ctaTitle: "Ready to put this into practice?",
  },
  successStories: {
    heroEyebrow: "Patient outcomes",
    heroTitle: "Real recoveries, in our patients' own words",
    heroSubtitle: "A sample of the progress we track and celebrate with patients every week.",
    gridEyebrow: "Client stories",
    gridTitle: "Real outcomes, real care",
    ctaTitle: "Your recovery story could be next",
  },
  contact: {
    heroEyebrow: "Contact us",
    heroTitle: "We're here to help",
    heroSubtitle: "Questions about scheduling, insurance, or whether we're the right fit for your injury — reach out any time.",
    whyEyebrow: "Why reach out",
    whyTitle: "How we can help",
    methodsEyebrow: "Get in touch",
    methodsTitle: "Ways to reach us",
    visitEyebrow: "Our clinics",
    visitTitle: "Two locations serving the Brightwater area",
    viewAllLocationsLabel: "View all locations",
    formEyebrow: "Send a message",
    formTitle: "Tell us what you need",
    ctaTitle: "Prefer to just book directly?",
  },
  newClients: {
    heroEyebrow: "New patients",
    heroTitle: "What to expect at your first visit",
    heroSubtitle: "No referral needed in Oregon — most new patients are seen within 48 hours of calling.",
    stepsEyebrow: "Getting started",
    stepsTitle: "Your first visit, step by step",
    bringEyebrow: "Before you arrive",
    bringTitle: "What to bring",
    faqPrompt: "Have more questions about your first visit?",
    servicesPrompt: "Not sure which service fits your injury?",
    ctaTitle: "Ready to schedule your evaluation?",
  },
  notFound: {
    heroTitle: "We couldn't find that page",
    heroSubtitle: "The page you're looking for may have moved. Try one of the links below or head back to our homepage.",
    ctaTitle: "Looking for something specific?",
  },
  privacyPolicy: {
    heroEyebrow: "Legal",
    heroTitle: "Privacy Policy",
    heroSubtitle: "How Cascade Point Physical Therapy & Wellness collects, uses, and protects your information.",
    bodyHeading: "Our commitment to your privacy",
    bodyParagraph1: "Cascade Point Physical Therapy & Wellness collects only the information needed to schedule your care, verify insurance benefits, and communicate with you about your treatment. We never sell patient information to third parties.",
    bodyParagraph2: "Protected health information shared during your evaluation and treatment is handled in accordance with HIPAA. Contact our office directly with any questions about how your records are stored or shared with referring providers.",
  },
  termsAndConditions: {
    heroEyebrow: "Legal",
    heroTitle: "Terms & Conditions",
    heroSubtitle: "Policies covering scheduling, cancellations, and how to reach the clinic.",
    bookingChangesHeading: "Scheduling & cancellations",
    bookingChangesBody: "We ask for at least 24 hours' notice to cancel or reschedule an appointment. Late cancellations and no-shows may be subject to a fee, which helps us keep appointment slots open for other patients.",
    contactingClinicHeading: "Contacting the clinic",
    contactingClinicBody: "For scheduling or billing questions, call the front desk during business hours. For urgent clinical concerns outside business hours, follow the after-hours guidance provided at your evaluation.",
  },
  siteShell: {
    footerTagline: "One-on-one physical therapy for Brightwater and Alder Creek.",
    bookingDetailsText: "Most new patients are seen within 48 hours. No referral required in Oregon.",
    emailCaptureHeading: "Get recovery tips in your inbox",
    emailCaptureBody: "One short email a month with stretches, injury-prevention tips, and clinic updates — no spam.",
    emailCapturePlaceholder: "you@example.com",
    emailCaptureSubmitButton: "Subscribe",
    emailCaptureSuccessMessage: "You're subscribed — watch for our next issue.",
  },
  chat: {
    greetingMessage: "Hi! I'm here to help you find the right service or answer a quick question about Cascade Point. What can I help with?",
    noMatchMessage: "I'm not totally sure about that one — want me to connect you with our front desk?",
    humanHandoffMessage: "I'll pass this along to our front desk team and someone will follow up shortly.",
    leadCaptureOfferMessage: "Would you like a clinician to call you back about this?",
    leadCaptureAskNameMessage: "Great — what name should we use?",
    leadCaptureAskPhoneMessage: "And what's the best phone number to reach you?",
    leadCaptureThankYouMessage: "Thanks! Someone from our team will reach out within one business day.",
    leadCaptureDeclineMessage: "No problem — feel free to browse our services or call us directly anytime.",
    farewellMessage: "Thanks for stopping by Cascade Point — feel better soon!",
    windowTitle: "Chat with Cascade Point",
    inputPlaceholder: "Type your question...",
    chatWithLabel: "Chat with our front desk assistant",
    askPromptMessage: "Ask me about services, insurance, or booking an evaluation.",
  },
  booking: {
    modalEyebrow: "Book an evaluation",
    modalHeadline: "Let's get you scheduled",
    modalSubtext: "Tell us a bit about what's going on and we'll match you with the right therapist.",
    successHeadline: "You're on the schedule",
    successMessage: "We've received your request and will confirm your appointment time shortly by phone or email.",
  },
} as const;

export const aboutValues = [
  { title: "Hands-on, every visit", copy: "You get real one-on-one time with a doctor of physical therapy, not fifteen minutes with a supervised aide." },
  { title: "Evidence over guesswork", copy: "We measure strength, range of motion, and function at set checkpoints so progress is tracked, not assumed." },
  { title: "Plans that fit your life", copy: "Home programs are built around equipment and time you actually have — not a generic printout." },
  { title: "Honest about timelines", copy: "We tell you upfront what recovery realistically looks like, including when physical therapy isn't the right next step." },
] as { title: string; copy: string }[];

function serviceProcess(serviceNumber: number, steps: [string, string][]) {
  return steps.map(([title, description], index) => ({
    step: String(index + 1).padStart(2, "0"),
    title,
    description,
  }));
}

export type Service = {
  number: string;
  slug: string;
  title: string;
  short: string;
  detail: string;
  category: string;
  benefits: string[];
  process: { step: string; title: string; description: string }[];
  duration: string;
  imageKey: string;
  /** Optional 2-3 short "good fit if..." phrases. Omit to hide the "Who this is for" section. */
  bestFor?: string[];
};

export const services: Service[] = [
  {
    number: "01",
    slug: "service-1",
    title: "Orthopedic & Sports Injury Rehab",
    short: "Hands-on treatment for sprains, strains, tendinitis, and overuse injuries.",
    detail: "For sprains, strains, tendinitis, and overuse injuries, we combine manual therapy with a progressive strength and mobility program to get you back to sport or daily activity without re-injury. Every plan starts with a movement assessment that identifies not just where it hurts, but why.",
    category: "Orthopedic Rehab",
    benefits: [
      "Reduces pain and inflammation without relying on medication alone",
      "Restores strength and range of motion faster than rest alone",
      "Addresses the movement pattern that caused the injury, lowering re-injury risk",
    ],
    process: serviceProcess(1, [
      ["Movement evaluation", "We assess strength, range of motion, and movement patterns to pinpoint the source of your pain, not just the symptom."],
      ["Hands-on treatment", "Manual therapy techniques reduce pain and restore mobility in the affected joint or tissue."],
      ["Progressive strengthening", "A staged exercise program rebuilds strength and confidence so you return to activity without setbacks."],
    ]),
    duration: "45–60 minutes",
    imageKey: "service-ortho-rehab",
    bestFor: ["Recent sprains, strains, or tendinitis", "Recurring overuse injuries from running or sport", "Nagging joint or muscle pain that hasn't improved with rest"],
  },
  {
    number: "02",
    slug: "service-2",
    title: "Post-Surgical Rehabilitation",
    short: "Structured recovery protocols after orthopedic surgery.",
    detail: "Following knee, shoulder, hip, or spine surgery, structured rehabilitation is what determines whether you regain full function. We work directly from your surgeon's protocol and communicate progress back to them at key milestones, so your recovery stays on track and on schedule.",
    category: "Orthopedic Rehab",
    benefits: [
      "Follows your surgeon's exact post-operative protocol, phase by phase",
      "Reduces scar tissue restriction and swelling in the early recovery window",
      "Rebuilds strength safely so you avoid setbacks or re-aggravation",
    ],
    process: serviceProcess(2, [
      ["Protocol review", "We review your surgeon's notes and post-op protocol before your first visit so treatment starts on the right timeline."],
      ["Early-phase recovery", "Gentle range-of-motion work and swelling management protect the surgical site while restoring mobility."],
      ["Return-to-function training", "Progressive strengthening and functional drills prepare you for daily activity, work, or sport."],
    ]),
    duration: "45–60 minutes",
    imageKey: "service-post-surgical",
    bestFor: ["Recovering from knee, hip, shoulder, or spine surgery", "Following a surgeon-prescribed rehab protocol", "Rebuilding strength safely after a cast or brace"],
  },
  {
    number: "03",
    slug: "service-3",
    title: "Manual Therapy & Myofascial Release",
    short: "Hands-on joint and soft-tissue work to relieve stiffness and pain.",
    detail: "Manual therapy uses skilled hands-on techniques — joint mobilization, soft-tissue work, and myofascial release — to relieve stiffness, break up restriction, and reduce pain that exercise alone hasn't resolved. It's frequently paired with another service as a way to accelerate progress.",
    category: "Manual Therapy",
    benefits: [
      "Relieves stiffness and restriction that limits your daily movement",
      "Reduces pain quickly, often within the first two visits",
      "Improves the effectiveness of your home exercise program",
    ],
    process: serviceProcess(3, [
      ["Palpation assessment", "We identify the specific joints and soft tissue restricting your movement."],
      ["Targeted hands-on treatment", "Joint mobilization and soft-tissue techniques address restriction directly."],
      ["Reassessment", "We retest your movement immediately after treatment to confirm the change and guide your home program."],
    ]),
    duration: "30–45 minutes",
    imageKey: "service-manual-therapy",
    bestFor: ["Chronic stiffness that hasn't responded to stretching alone", "Muscle tightness limiting range of motion", "Tension headaches linked to neck and shoulder restriction"],
  },
  {
    number: "04",
    slug: "service-4",
    title: "Vestibular & Balance Therapy",
    short: "Specialized treatment for dizziness, vertigo, and balance disorders.",
    detail: "Dizziness, vertigo, and balance disorders respond well to targeted vestibular rehabilitation. Our therapists are trained in canalith repositioning, gaze stabilization, and balance retraining to reduce dizziness and lower fall risk — often within just a few visits for BPPV.",
    category: "Balance & Neuro",
    benefits: [
      "Resolves many cases of BPPV vertigo in one to three visits",
      "Reduces fall risk through targeted balance retraining",
      "Improves confidence walking on uneven or crowded surfaces",
    ],
    process: serviceProcess(4, [
      ["Vestibular evaluation", "We test eye movement, balance, and positional triggers to identify the cause of your dizziness."],
      ["Targeted intervention", "Repositioning maneuvers or gaze-stabilization exercises address the specific vestibular issue found."],
      ["Balance retraining", "Progressive balance drills rebuild stability and reduce fall risk in real-world conditions."],
    ]),
    duration: "45 minutes",
    imageKey: "service-vestibular",
    bestFor: ["Recurring vertigo or spinning sensations", "Balance problems after a concussion or inner-ear issue", "Unsteadiness that's increased your risk of falling"],
  },
  {
    number: "05",
    slug: "service-5",
    title: "Pelvic Health Physical Therapy",
    short: "Discreet, specialized care for pelvic pain and postpartum recovery.",
    detail: "Pelvic floor dysfunction, postpartum recovery, and pelvic pain are treated in a private, dedicated treatment room by a therapist with specialized pelvic health training. We address strength, coordination, and pain in a way general physical therapy visits typically don't.",
    category: "Pelvic Health",
    benefits: [
      "Addresses pelvic pain, incontinence, and postpartum recovery directly",
      "Private treatment room and dedicated appointment length for sensitive care",
      "Individualized home program for continued progress between visits",
    ],
    process: serviceProcess(5, [
      ["Confidential intake", "A detailed, judgment-free conversation about your symptoms and history guides the evaluation."],
      ["Specialized assessment", "We evaluate pelvic floor strength, coordination, and movement patterns contributing to your symptoms."],
      ["Individualized treatment plan", "Manual therapy and targeted exercise address your specific goals, whether that's postpartum recovery or pain relief."],
    ]),
    duration: "60 minutes",
    imageKey: "service-pelvic-health",
    bestFor: ["Postpartum recovery and diastasis recti", "Pelvic pain or discomfort during daily activity", "Bladder control concerns affecting daily life"],
  },
  {
    number: "06",
    slug: "service-6",
    title: "Dry Needling & Performance Recovery",
    short: "Trigger-point dry needling paired with recovery-focused training.",
    detail: "Dry needling targets trigger points that limit muscle performance and cause referred pain, often relieving tightness that manual therapy alone can't fully resolve. Paired with performance-focused strength and mobility work, it's a favorite among our athletic and active patients.",
    category: "Performance & Recovery",
    benefits: [
      "Releases stubborn trigger points that limit strength and mobility",
      "Speeds recovery between training sessions or competitions",
      "Complements strength training rather than replacing it",
    ],
    process: serviceProcess(6, [
      ["Trigger-point assessment", "We locate the specific muscle trigger points contributing to your pain or restriction."],
      ["Dry needling treatment", "Thin filament needles target trigger points directly, releasing tension and improving blood flow."],
      ["Performance-focused follow-up", "Mobility and strength work reinforces the release and supports your training goals."],
    ]),
    duration: "30–45 minutes",
    imageKey: "service-dry-needling",
    bestFor: ["Chronic muscle tightness limiting athletic performance", "Trigger points contributing to referred pain", "Athletes wanting faster recovery between training blocks"],
  },
  {
    number: "07",
    slug: "service-7",
    title: "Senior Mobility & Fall Prevention",
    short: "Strength and balance training to help older adults move confidently.",
    detail: "Built specifically for older adults, this program combines strength training, balance work, and gait analysis to reduce fall risk and support independent living. Sessions are paced appropriately and progress is tracked against standardized fall-risk assessments.",
    category: "Balance & Neuro",
    benefits: [
      "Reduces fall risk through evidence-based balance training",
      "Builds functional strength for stairs, transfers, and daily tasks",
      "Supports continued independent living at home",
    ],
    process: serviceProcess(7, [
      ["Fall-risk assessment", "Standardized testing measures balance, gait, and strength against age-matched benchmarks."],
      ["Strength & balance training", "A paced program builds the specific strength and stability needed for daily activities."],
      ["Home safety guidance", "We provide practical recommendations to reduce fall hazards at home alongside your clinic progress."],
    ]),
    duration: "45 minutes",
    imageKey: "service-senior-mobility",
    // Intentionally no bestFor — demonstrates the "who this is for" section stays hidden when absent.
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const trustStats = [
  { value: "10+", label: "Years serving the Brightwater area" },
  { value: "600+", label: "Verified five-star patient reviews" },
  { value: "48 hrs", label: "Average time to first appointment" },
  { value: "92%", label: "Of patients meet their functional goals" },
  { value: "2", label: "Convenient clinic locations" },
] as { value: string; label: string }[];

export const differentiators = [
  { title: "One-on-one, every visit", copy: "Your assigned therapist treats you directly for the full appointment — never handed off to an aide or tech.", icon: "ShieldCheck" },
  { title: "Seen within 48 hours", copy: "Most new patients get an evaluation within two business days of calling, no long intake waitlist.", icon: "Clock3" },
  { title: "Specialist-level training", copy: "Every clinician holds advanced certifications beyond their DPT — orthopedic, vestibular, or pelvic health specialties.", icon: "Award" },
  { title: "Care that adapts with you", copy: "We reassess and adjust your plan at every checkpoint instead of running you through a fixed protocol.", icon: "Heart" },
] as { title: string; copy: string; icon?: string }[];

export const howItWorks = [
  { step: "01", title: "Call or book online", copy: "Reach our front desk or request an appointment online — no physician referral required in Oregon.", icon: "PhoneCall" },
  { step: "02", title: "Get scheduled fast", copy: "Most new patients are seen within 48 hours, often sooner for urgent post-surgical cases.", icon: "CalendarCheck" },
  { step: "03", title: "One-on-one evaluation", copy: "Spend a full hour with your assigned doctor of physical therapy building a plan specific to you.", icon: "Stethoscope" },
  { step: "04", title: "Track real progress", copy: "We measure strength, motion, and function at set checkpoints so you always know how recovery is going.", icon: "ClipboardCheck" },
] as { step: string; title: string; copy: string; icon?: string }[];

export const healthResources = [
  {
    title: "Returning to Running After a Knee Injury",
    excerpt: "A phased approach to rebuilding mileage safely after an ACL sprain or meniscus injury.",
    imageKey: "resource-return-to-running",
  },
  {
    title: "Understanding Vertigo: When Balance Therapy Can Help",
    excerpt: "What causes BPPV and why targeted vestibular therapy often resolves it in just a few visits.",
    imageKey: "resource-vertigo-balance",
  },
  {
    title: "Dry Needling 101: What It Is and Who It's For",
    excerpt: "A clear, practical explanation of dry needling and how it fits into a performance recovery plan.",
    imageKey: "resource-dry-needling-101",
  },
] as { title: string; excerpt: string; imageKey: string }[];

export const marqueeReviews = [
  { author: "Jordan Micheli", segment: "Sports injury patient", quote: "I tore my hamstring training for a half marathon and Dr. Webb had me back to running pain-free in ten weeks. The hands-on work every visit made all the difference.", rating: 5, serviceSlug: "service-1" },
  { author: "Renata Alvez", segment: "Total knee replacement", quote: "After my knee replacement I was terrified I'd never walk normally again. My therapist followed my surgeon's protocol exactly and checked in with my surgeon's office directly. I felt genuinely cared for.", rating: 5, serviceSlug: "service-2" },
  { author: "Devon Okafor", segment: "Chronic neck stiffness", quote: "Years of desk-job neck tension gone in three sessions of manual therapy. I wish I'd come in sooner instead of just living with it.", rating: 5, serviceSlug: "service-3" },
  { author: "Priya Natarajan", segment: "Vertigo patient", quote: "One repositioning treatment and the room-spinning vertigo I'd had for two weeks was just gone. I didn't know physical therapy could do that.", rating: 5, serviceSlug: "service-4" },
  { author: "Hannah Doss", segment: "Postpartum patient", quote: "Dr. Anand made a really vulnerable topic feel completely normal to talk about. Six months postpartum I finally feel like my body again.", rating: 5, serviceSlug: "service-5" },
  { author: "Marcus Fielding", segment: "Competitive cyclist", quote: "The dry needling combined with the recovery program got a stubborn calf trigger point to finally release. I was back to full training volume within two weeks.", rating: 5, serviceSlug: "service-6" },
  { author: "Eleanor Tran", segment: "Senior fall-prevention patient", quote: "At 74 I was scared of falling on the stairs. The balance program gave me back my confidence — I haven't had a close call since.", rating: 5, serviceSlug: "service-7" },
  { author: "Sam Whitfield", segment: "Rotator cuff strain", quote: "Every visit was a full hour with the same therapist, which is not what I experienced at the last PT clinic I tried. Big difference in how fast I recovered.", rating: 5, serviceSlug: "service-1" },
  { author: "Grace Lindqvist", segment: "Tension headache patient", quote: "The myofascial release work on my upper back and neck cut my headache frequency in half within a month.", rating: 5, serviceSlug: "service-3" },
] as {
  author: string;
  segment: string;
  quote: string;
  rating: number;
  /** Optional slug into `services[]` — replaces free-text service-name matching so a service rename can't silently break the "reviews by service" grouping on /proof. */
  serviceSlug?: string;
}[];

export type Faq = {
  question: string;
  answer: string;
  category: string;
  /** Optional link to a Service.slug — powers the per-service FAQ section on /services/[slug]. */
  serviceSlug?: string;
};

export const faqs: Faq[] = [
  {
    question: "Do I need a physician referral to book an evaluation?",
    answer: "No. Oregon allows direct access to physical therapy, so you can book an evaluation for orthopedic or sports injury concerns without a referral. Some insurance plans do require a referral for reimbursement, so we recommend checking your specific plan.",
    category: "Requests & visits",
    serviceSlug: "service-1",
  },
  {
    question: "What should I do if I have sudden, severe pain during a home exercise?",
    answer: "Stop the exercise immediately and contact our clinic. If you're experiencing chest pain, sudden severe swelling, numbness, or signs of a medical emergency, call 911 or go to the nearest emergency room rather than waiting for a callback.",
    category: "Emergency",
  },
  {
    question: "How do I reschedule or cancel an appointment?",
    answer: "Call or email our front desk at least 24 hours before your appointment. Late cancellations and no-shows may be subject to a fee, which helps keep appointment slots available for other patients.",
    category: "Requests & visits",
  },
  {
    question: "Can I request a specific therapist?",
    answer: "Yes. If you'd like to work with a specific clinician based on their specialty, let our front desk know when booking and we'll do our best to accommodate the request based on availability.",
    category: "Requests & visits",
  },
  {
    question: "How long is a typical follow-up visit?",
    answer: "Most follow-up visits run 45 to 60 minutes, one-on-one with your assigned therapist for the full appointment. Some manual therapy or dry needling sessions may run shorter, around 30 to 45 minutes.",
    category: "Requests & visits",
  },
  {
    question: "Do you offer telehealth visits?",
    answer: "We offer limited telehealth follow-ups for home exercise program adjustments and progress check-ins, but the initial evaluation and most hands-on treatment must be done in person.",
    category: "Requests & visits",
  },
  {
    question: "Which insurance plans do you accept?",
    answer: "We're in-network with most major insurance plans, including the providers listed on our insurance page. Our front desk verifies your specific benefits before your first visit at no cost to you, so there are no surprises.",
    category: "Payment & insurance",
  },
  {
    question: "What should I expect at my first evaluation?",
    answer: "Your first visit runs about 60 minutes and includes a detailed history, a hands-on movement and strength assessment, and the start of your individualized treatment plan. You'll leave with a clear understanding of what's going on and what recovery will look like.",
    category: "First visit",
    serviceSlug: "service-1",
  },
  {
    question: "What if my insurance requires a visit cap or authorization?",
    answer: "Some plans limit the number of covered visits per year or require prior authorization for certain services. Our billing team tracks these limits for you and will let you know well before you approach a cap.",
    category: "Payment & insurance",
  },
  {
    question: "What should I wear to my appointment?",
    answer: "Wear or bring comfortable, loose-fitting clothing that allows access to the area being treated — shorts for a knee or hip evaluation, for example, or a tank top for a shoulder issue.",
    category: "First visit",
  },
  {
    question: "Do you bill insurance directly for post-surgical rehab?",
    answer: "Yes, we bill your insurance directly for post-surgical rehabilitation and coordinate documentation with your surgeon's office as needed for authorization and progress updates.",
    category: "Payment & insurance",
    serviceSlug: "service-2",
  },
  {
    question: "Is pelvic health physical therapy covered by insurance?",
    answer: "Most insurance plans cover pelvic health physical therapy the same way they cover other physical therapy services. Our front desk can verify your specific benefits before your first pelvic health visit.",
    category: "Requests & visits",
    serviceSlug: "service-5",
  },
  {
    question: "What counts as a medical emergency versus something to bring up at my next visit?",
    answer: "Chest pain, sudden severe swelling, loss of sensation, inability to bear weight after a fall, or signs of infection at a surgical site warrant an immediate emergency room visit or a call to 911. Gradual soreness or mild symptom changes are appropriate to discuss at your next scheduled visit or by calling our clinic.",
    category: "Emergency",
  },
];

export const emergencyInfo = {
  heading: "If this is a medical emergency",
  note: "Our clinic treats musculoskeletal injuries and is not equipped for emergency medical care.",
  referralLocationName: "Brightwater Regional Medical Center",
  referralLocationPhone: "(541) 555-0199",
  referralLocationPhoneDigits: "5415550199",
  referralLocationAddress: "1200 Regional Parkway, Brightwater, OR",
  instructions: "For chest pain, severe swelling, loss of sensation, or an inability to bear weight after a fall, call 911 or go directly to the nearest emergency room rather than waiting for a callback from our clinic.",
  placeholder: false,
};

export const paymentInfo = {
  heading: "Payment & insurance",
  methods: ["Cash", "Credit / Debit Card", "Bank Transfer", "HSA / FSA Card"],
  insuranceNote: "We're in-network with most major insurance plans and verify your specific benefits before your first visit at no cost to you. Self-pay and package rates are also available.",
};

export const providers = [
  {
    slug: "provider-1",
    name: "Dr. Emily Chan",
    credentials: "PT, DPT, OCS",
    specialty: "Orthopedic & Post-Surgical Rehabilitation",
    bio: "Dr. Chan founded Cascade Point in 2014 and specializes in orthopedic rehabilitation and post-surgical recovery, with a particular focus on knee and shoulder cases.",
    fullBio: "Dr. Emily Chan earned her Doctor of Physical Therapy from Oregon Health & Science University and went on to complete a residency in orthopedic physical therapy, earning her board certification as an Orthopedic Clinical Specialist (OCS). Before founding Cascade Point in 2014, she spent six years treating post-surgical orthopedic patients at a regional hospital system, working closely with orthopedic surgeons on ACL reconstruction, total joint replacement, and rotator cuff repair protocols. Dr. Chan built Cascade Point around a simple frustration from her hospital years: patients deserved more than fifteen rushed minutes with a rotating cast of aides. She still carries a full caseload today and personally trains every new clinician who joins the practice on the clinic's hands-on, outcomes-tracked approach to care.",
    yearsExperience: 15,
    areasOfInterest: ["Post-surgical knee rehabilitation", "Rotator cuff and shoulder recovery", "Return-to-sport testing"],
    imageKey: "provider-emily-chan",
    relatedServiceSlugs: ["service-1", "service-2", "service-6"],
    placeholder: false,
  },
  {
    slug: "provider-2",
    name: "Dr. Marcus Webb",
    credentials: "PT, DPT, CSCS",
    specialty: "Sports Rehabilitation & Performance Recovery",
    bio: "Dr. Webb treats competitive and recreational athletes recovering from sports injuries, combining rehabilitation with strength and conditioning expertise.",
    fullBio: "Dr. Marcus Webb completed his Doctor of Physical Therapy at the University of Washington and is a Certified Strength and Conditioning Specialist (CSCS), a background that shapes how he treats athletes at every level. Before joining Cascade Point in 2017, he worked as a rehabilitation consultant for a regional collegiate track and field program, where he developed return-to-play protocols still used by several local high school sports medicine programs today. Marcus is trained in dry needling and blends it with performance-based strength programming, which makes him the clinic's go-to therapist for athletes trying to return not just to activity, but to competition. Outside the clinic, he coaches a youth track club and frequently speaks at local coaching clinics on injury prevention.",
    yearsExperience: 9,
    areasOfInterest: ["Hamstring and calf strain recovery", "Dry needling for trigger points", "Return-to-competition programming"],
    imageKey: "provider-marcus-webb",
    relatedServiceSlugs: ["service-1", "service-6", "service-7"],
    placeholder: false,
  },
  {
    slug: "provider-3",
    name: "Sarah Ionescu",
    credentials: "PT, DPT",
    specialty: "Vestibular Rehabilitation & Senior Mobility",
    bio: "Sarah specializes in treating dizziness, balance disorders, and fall risk in older adults, helping patients regain confidence in daily movement.",
    yearsExperience: 7,
    areasOfInterest: ["BPPV and vestibular disorders", "Fall-risk reduction for older adults", "Post-concussion balance recovery"],
    imageKey: "provider-sarah-ionescu",
    relatedServiceSlugs: ["service-4", "service-7"],
    placeholder: false,
  },
  {
    slug: "provider-4",
    name: "Dr. Priya Anand",
    credentials: "PT, DPT, WCS",
    specialty: "Pelvic Health & Manual Therapy",
    bio: "Dr. Anand provides specialized, private pelvic health care alongside manual therapy for chronic pain and stiffness, in a discreet, judgment-free setting.",
    fullBio: "Dr. Priya Anand earned her Doctor of Physical Therapy from the University of Southern California and completed advanced coursework to become a board-certified Women's Health Clinical Specialist (WCS). She joined Cascade Point in 2019 after several years focused exclusively on pelvic health at a specialty outpatient practice, and now sees both pelvic health patients and general orthopedic patients seeking manual therapy for chronic pain and stiffness. Dr. Anand is known among patients for making a historically under-discussed area of care feel approachable and normal — she spends the first visit almost entirely on listening before ever beginning a hands-on assessment. She also leads a monthly postpartum recovery workshop open to the public at the Alder Creek clinic.",
    yearsExperience: 11,
    areasOfInterest: ["Postpartum recovery and diastasis recti", "Pelvic pain management", "Myofascial release for chronic stiffness"],
    imageKey: "provider-priya-anand",
    relatedServiceSlugs: ["service-3", "service-5"],
    placeholder: false,
  },
] as {
  slug: string;
  name: string;
  credentials: string;
  specialty: string;
  bio: string;
  fullBio?: string;
  yearsExperience: number;
  areasOfInterest: string[];
  imageKey: string;
  /** Optional slugs into `services[]` — powers the "services this provider offers" cross-link on /team/[slug]. */
  relatedServiceSlugs?: string[];
  placeholder: boolean;
}[];

export type Provider = (typeof providers)[number];

export function getProviderBySlug(slug: string): Provider | undefined {
  return providers.find((provider) => provider.slug === slug);
}

/** Services a given provider offers, resolved from `Provider.relatedServiceSlugs`. */
export function getServicesByProvider(providerSlug: string): Service[] {
  const provider = getProviderBySlug(providerSlug);
  return (provider?.relatedServiceSlugs ?? [])
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is Service => Boolean(service));
}

/** Providers who offer a given service — the reverse of `Provider.relatedServiceSlugs`, so a service doesn't need its own hand-maintained provider list. */
export function getProvidersByService(serviceSlug: string): Provider[] {
  return providers.filter((provider) => (provider.relatedServiceSlugs ?? []).includes(serviceSlug));
}

/**
 * The About page's staff grid, derived from `providers` (the same people shown on /team) rather
 * than a second, hand-maintained "people" dataset — a real clinic's team only has to be entered
 * once. `title` reuses each provider's `specialty` to match the field About's grid already renders.
 */
export const staff = providers.map((provider) => ({
  name: provider.name,
  title: provider.specialty,
  credentials: provider.credentials,
  bio: provider.bio,
  imageKey: provider.imageKey,
  placeholder: provider.placeholder,
}));

export const articles = [
  {
    slug: "article-1",
    title: "Returning to Running After a Knee Injury",
    category: "Recovery",
    author: "Dr. Emily Chan, PT, DPT, OCS",
    date: "February 10, 2026",
    readingTime: "6 min read",
    excerpt: "A phased approach to rebuilding mileage safely after an ACL sprain or meniscus injury, without rushing back into re-injury.",
    body: [
      "One of the most common questions we hear from runners after a knee injury is some version of 'when can I run again?' The honest answer is that it depends less on the calendar and more on whether specific strength and control benchmarks have been met. Running is a high-impact, single-leg activity — each stride places roughly two to three times your body weight through the injured knee — so returning based on how many weeks have passed rather than how the joint is actually performing is one of the most common causes of setbacks we see in the clinic.",
      "The first phase of return-to-running rehab focuses on resolving swelling, restoring full range of motion, and rebuilding basic quad and hamstring strength through closed-chain exercises like step-downs and mini squats. We typically don't introduce any impact loading until a patient can perform a single-leg squat with good control and demonstrate quad strength within about 85 to 90 percent of the uninjured leg, measured objectively rather than by feel.",
      "Once strength benchmarks are met, we introduce impact gradually through a walk-jog progression, often starting with intervals as short as thirty seconds of jogging alternated with walking. The goal in this phase isn't distance, it's tolerance — we're watching for swelling, pain during or after the session, and whether your running mechanics hold up as fatigue sets in. Rushing mileage before mechanics are solid is exactly how a resolved injury turns into a chronic one.",
      "Hopping and single-leg landing drills are where we catch problems that walk-jog progressions can miss. A runner can often jog comfortably on a straight, flat surface while still lacking the deceleration control needed for a trail run, a quick direction change, or an unexpected stumble. We build these drills in progressively, checking for symmetry between legs before clearing someone for unrestricted running.",
      "Most runners we treat return to their prior mileage within eight to twelve weeks of starting formal rehab, though this varies significantly based on the specific injury, surgical history, and training goals. If you're several weeks post-injury and still unsure whether you're ready to run again, an evaluation can give you an objective answer rather than a guess — and a specific plan to close whatever gap remains.",
    ],
    imageKey: "resource-return-to-running",
    disclaimer: true,
    relatedServiceSlugs: ["service-1"],
  },
  {
    slug: "article-2",
    title: "What to Expect in the First 6 Weeks After Knee Replacement Surgery",
    category: "Post-Surgical Recovery",
    author: "Dr. Emily Chan, PT, DPT, OCS",
    date: "January 22, 2026",
    readingTime: "7 min read",
    excerpt: "A week-by-week look at what recovery actually looks like after a total knee replacement, and what determines a good outcome.",
    body: [
      "Total knee replacement is one of the most common orthopedic surgeries we support patients through, and it's also one of the most misunderstood in terms of timeline. Many patients arrive expecting to feel dramatically better within days; in reality, the first two weeks are typically the most difficult, with the real functional gains showing up over the following month as swelling resolves and strength returns.",
      "In week one, the priority is managing swelling and pain while restoring basic range of motion — we're looking for roughly 90 degrees of bend and near-full extension within the first ten to fourteen days, since motion lost early is significantly harder to regain later. Gentle exercises, ice, and elevation are just as important as the formal PT sessions during this window.",
      "By weeks two through four, most patients transition from a walker to a cane, and we shift focus toward quadriceps strength, which is almost always the limiting factor in how well a knee replacement ultimately performs. It's common to feel like the muscle 'won't turn on' even when pain has improved significantly — this is a normal post-surgical phenomenon called arthrogenic muscle inhibition, and it responds well to targeted strengthening.",
      "Weeks four through six typically bring the most encouraging visible progress: walking without an assistive device, climbing stairs with better control, and noticeably less swelling by end of day. We continue to track objective measures — range of motion in degrees, quad strength, and gait quality — at each visit so both you and your surgeon have clear data on how recovery is tracking relative to expected benchmarks.",
      "Recovery doesn't stop at six weeks; most patients continue seeing meaningful strength and endurance gains for three to six months post-surgery. What we've found matters most for a good long-term outcome isn't any single milestone, but consistency with the home exercise program between visits — the clinic time builds the plan, but the daily reps outside the clinic are what actually rebuild the knee.",
    ],
    imageKey: "resource-knee-replacement-recovery",
    disclaimer: true,
    relatedServiceSlugs: ["service-2"],
  },
  {
    slug: "article-3",
    title: "Why Manual Therapy Speeds Up Recovery",
    category: "Treatment Approach",
    author: "Dr. Priya Anand, PT, DPT, WCS",
    date: "March 5, 2026",
    readingTime: "5 min read",
    excerpt: "How hands-on joint and soft-tissue work fits alongside exercise to relieve stiffness and pain faster than exercise alone.",
    body: [
      "Patients sometimes assume physical therapy is only about exercises — a printed sheet of stretches and strengthening moves to do at home. Manual therapy, the hands-on component of treatment, is often what actually creates the window in which those exercises can work. When a joint is restricted or soft tissue is significantly guarded, asking a patient to strengthen through that restriction is asking the body to work against itself.",
      "Joint mobilization, one of the core manual therapy techniques, involves applying graded, specific pressure to a stiff joint to restore its normal glide and rotation. This isn't the same as a chiropractic adjustment — there's typically no popping or cracking involved, just sustained, controlled pressure that gradually improves how the joint moves. Patients frequently notice an immediate difference in range of motion right on the treatment table.",
      "Myofascial release and soft-tissue work address the muscle and connective tissue layer, which can become restricted and painful from injury, poor posture, or repetitive strain. Deep, sustained pressure to specific areas increases blood flow and reduces the guarding response that keeps a muscle tight even when the underlying injury has largely resolved.",
      "What makes manual therapy particularly effective is how it's sequenced with exercise. We typically use hands-on treatment to reduce pain and improve mobility first, then immediately layer in strengthening or motor control work while that window of improved mobility is open. Doing exercise alone, without first addressing significant joint or soft-tissue restriction, often means fighting an uphill battle against the stiffness itself.",
      "Manual therapy isn't a stand-alone fix, and we're upfront with patients about that — it's most effective as one part of a broader plan that includes a home exercise program and, where appropriate, lifestyle or ergonomic adjustments. But for stiffness and pain that hasn't responded to stretching or rest on its own, it's often the piece that finally moves the needle.",
    ],
    imageKey: "resource-manual-therapy-explained",
    disclaimer: true,
    relatedServiceSlugs: ["service-3"],
  },
  {
    slug: "article-4",
    title: "Understanding Vertigo: When Balance Therapy Can Help",
    category: "Balance & Vestibular Health",
    author: "Sarah Ionescu, PT, DPT",
    date: "April 18, 2026",
    readingTime: "6 min read",
    excerpt: "What causes BPPV and other common vestibular disorders, and why targeted balance therapy often resolves it in just a few visits.",
    body: [
      "Vertigo — the sensation that the room is spinning even when you're perfectly still — is one of the more disorienting symptoms a patient can experience, and it's also one of the most treatable when the cause is identified correctly. The most common cause we see is benign paroxysmal positional vertigo, or BPPV, caused by tiny calcium crystals in the inner ear becoming dislodged and triggering false signals about head position.",
      "BPPV responds remarkably well to a specific hands-on treatment called canalith repositioning, most commonly the Epley maneuver, which guides the dislodged crystals back to where they belong through a specific sequence of head and body positions. It's not unusual for a patient to walk in with vertigo that's been disrupting daily life for days or weeks and leave the same visit with symptoms substantially resolved.",
      "Not all dizziness is BPPV, though, which is why a thorough vestibular evaluation matters before jumping to a specific treatment. We assess eye movements, positional triggers, and balance to distinguish BPPV from other causes like vestibular neuritis, post-concussion dizziness, or balance issues stemming from a prior fall or general deconditioning — each of which calls for a different treatment approach.",
      "For dizziness that isn't a simple repositioning fix, treatment typically involves gaze stabilization exercises that retrain the connection between eye movement and head movement, along with balance retraining exercises performed on progressively more challenging surfaces. Progress can take several weeks rather than a single visit, but the underlying principle is the same: the vestibular system, like any other system in the body, can be retrained.",
      "If dizziness has been affecting your confidence walking, driving, or simply turning your head quickly, it's worth a vestibular-specific evaluation rather than assuming it's something you have to live with. Many patients have quietly adapted their lives around dizziness for months before realizing a targeted, evidence-based treatment exists — and that it often works faster than they expect.",
    ],
    imageKey: "resource-vertigo-balance",
    disclaimer: true,
    relatedServiceSlugs: ["service-4"],
  },
  {
    slug: "article-5",
    title: "Pelvic Floor Health After Pregnancy: A Physical Therapist's Guide",
    category: "Pelvic Health",
    author: "Dr. Priya Anand, PT, DPT, WCS",
    date: "May 9, 2026",
    readingTime: "7 min read",
    excerpt: "What's normal, what's not, and how pelvic health physical therapy supports a full postpartum recovery.",
    body: [
      "Pregnancy and delivery place significant demands on the pelvic floor, abdominal wall, and surrounding connective tissue, regardless of whether delivery was vaginal or cesarean. Yet postpartum recovery care in the US often ends at a single six-week check-up, leaving many people without guidance on issues like leaking, pelvic heaviness, or abdominal separation that don't resolve on their own timeline.",
      "Diastasis recti, a separation of the abdominal muscles that occurs to some degree in nearly all pregnancies, is one of the most common concerns we address. While some degree of separation is a normal part of pregnancy, a structured return to core strengthening — starting with deep abdominal and pelvic floor coordination before progressing to more demanding exercise — supports better closure and reduces the risk of ongoing core weakness or back pain.",
      "Urinary leaking during exercise, coughing, or sneezing is extremely common postpartum, but common doesn't mean it should be permanent or ignored. Pelvic floor muscles, like any other muscle group, can be weak, overly tight, or poorly coordinated after pregnancy — and the right treatment approach depends on which of those is actually happening, which is why a hands-on pelvic floor assessment matters more than generic Kegel advice.",
      "Pelvic pain, whether during intercourse, exercise, or daily activity, is another area we see under-treated. Scar tissue from a cesarean incision or perineal tear, muscle guarding, or nerve sensitivity can all contribute, and treatment is tailored to the specific cause rather than a one-size-fits-all protocol. A private, unhurried evaluation is essential here — this isn't a conversation that goes well in a rushed fifteen-minute visit.",
      "The right time to start pelvic health physical therapy varies by individual, but many people benefit from an evaluation as early as a few weeks postpartum, once cleared by their OB, and continue benefiting well beyond the traditional six-week mark. Whether you're weeks or years postpartum, pelvic floor symptoms are common but not something you have to just live with — targeted treatment can make a real difference at almost any point in recovery.",
    ],
    imageKey: "resource-pelvic-health-postpartum",
    disclaimer: true,
    relatedServiceSlugs: ["service-5"],
  },
  {
    slug: "article-6",
    title: "Dry Needling 101: What It Is and Who It's For",
    category: "Treatment Approach",
    author: "Dr. Marcus Webb, PT, DPT, CSCS",
    date: "June 3, 2026",
    readingTime: "5 min read",
    excerpt: "A clear, practical explanation of dry needling, how it differs from acupuncture, and how it fits into a performance recovery plan.",
    body: [
      "Dry needling is one of the treatments patients ask the most questions about before their first session, usually starting with 'does it hurt?' and 'is this the same as acupuncture?' The short answers are that most patients feel only mild discomfort, and while dry needling and acupuncture both use thin filament needles, they're grounded in different principles — dry needling targets specific muscular trigger points based on Western anatomy and neuromuscular science.",
      "A trigger point is a tight, irritable band within a muscle that can cause local pain, referred pain in another area of the body, and restricted movement. These often form after an acute injury, from repetitive strain, or from prolonged poor posture, and they can persist even after the original cause has resolved, effectively becoming their own source of ongoing pain and restriction.",
      "During treatment, a thin, sterile needle is inserted directly into the trigger point, often eliciting a brief muscle twitch response that's considered a good sign — it indicates the trigger point has been directly engaged. Many patients feel noticeably looser in the treated area within minutes, though it's common to feel mild soreness, similar to post-workout muscle soreness, for a day or two afterward.",
      "Dry needling is particularly effective when paired with strength and mobility work rather than used in isolation. We frequently use it to release a stubborn trigger point that's been limiting a patient's ability to fully engage in strengthening exercises, then immediately follow with the movement work that actually builds lasting change. Used alone, the relief from dry needling tends to be shorter-lived than when it's part of a broader plan.",
      "Dry needling isn't the right fit for everyone or every condition — patients on certain blood thinners, with needle phobia, or with specific medical conditions may need modified treatment or an alternative approach, which is something we screen for before your first session. For the right candidate, though, it's often one of the fastest ways to address a trigger point that's been limiting progress elsewhere in a rehab or performance program.",
    ],
    imageKey: "resource-dry-needling-101",
    disclaimer: true,
    relatedServiceSlugs: ["service-6"],
  },
] as {
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readingTime: string;
  excerpt: string;
  body: string[];
  imageKey: string;
  disclaimer: boolean;
  /** Optional slugs into `services[]` — powers the "related service" callout on /resources/[slug]. */
  relatedServiceSlugs?: string[];
}[];

export type Article = (typeof articles)[number];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export const carePlans = [
  {
    title: "Single Evaluation",
    subtitle: "For a quick assessment or second opinion",
    bullets: ["One 60-minute one-on-one evaluation", "Written home exercise program", "Recommendation for next steps"],
  },
  {
    title: "Standard Plan of Care",
    subtitle: "Our most common path for orthopedic and post-surgical recovery",
    bullets: ["Weekly one-on-one visits over 6–8 weeks", "Progress reassessment every 2 weeks", "Direct communication with your referring physician", "Home program updated at each checkpoint"],
  },
  {
    title: "Performance & Maintenance",
    subtitle: "For athletes and active patients managing recovery long-term",
    bullets: ["Flexible visit cadence built around training schedule", "Combined manual therapy and dry needling as needed", "Return-to-sport testing and clearance", "Ongoing check-ins during competitive seasons"],
  },
] as { title: string; subtitle: string; bullets: string[] }[];

export const serviceChoiceSteps = [
  { step: "01", title: "Tell us what's going on", copy: "Share a quick description of your concern, and our team points you to the right care path." },
  { step: "02", title: "Compare care paths", copy: "Browse services by category, duration, and who each one is best suited for." },
  { step: "03", title: "Book with confidence", copy: "Once you've found the right fit, book directly — no guesswork required." },
] as { step: string; title: string; copy: string }[];

export const newClientSteps = [
  { step: "01", title: "Call or book online", copy: "Reach out by phone or through our online form — no referral needed in Oregon." },
  { step: "02", title: "We verify your insurance", copy: "Our front desk checks your benefits before your first visit so there are no surprises." },
  { step: "03", title: "Complete new-patient forms", copy: "A short online intake form sent ahead of time keeps your first visit focused on you, not paperwork." },
  { step: "04", title: "Attend your evaluation", copy: "Spend a full hour with your assigned doctor of physical therapy building a plan specific to your goals." },
  { step: "05", title: "Start your plan of care", copy: "Leave with a clear treatment schedule, home exercises, and a realistic recovery timeline." },
] as { step: string; title: string; copy: string }[];

export const whatToBring = [
  "A photo ID and your insurance card",
  "Any physician referral or surgical notes, if applicable",
  "A list of current medications",
  "Comfortable clothing that allows access to the area being treated",
  "Any prior imaging reports (X-ray, MRI) related to your condition",
] as string[];

export const clinicExperienceFeatures = [
  { title: "Private treatment rooms", copy: "Dedicated rooms for pelvic health and sensitive evaluations, away from the open gym floor.", imageKey: "clinic-treatment-room" },
  { title: "Full open gym floor", copy: "A spacious strength and rehab gym equipped for everything from balance retraining to return-to-sport testing.", imageKey: "clinic-gym-floor" },
  { title: "One-on-one treatment bays", copy: "Individual treatment stations so every session stays focused and uninterrupted.", imageKey: "clinic-treatment-bays" },
  { title: "On-site balance & vestibular lab", copy: "Dedicated equipment for vestibular and fall-risk assessment not found in most outpatient clinics.", imageKey: "clinic-balance-lab" },
  { title: "Comfortable waiting area", copy: "A calm front-of-house space designed to make your visit feel unrushed from the moment you arrive.", imageKey: "clinic-reception" },
] as { title: string; copy: string; imageKey: string }[];

export const clientStories = [
  {
    clientName: "Jordan Micheli",
    segment: "Marathon runner",
    category: "Sports Injury Recovery",
    story: "After tearing my hamstring eight weeks before a marathon, I thought my race was over. Dr. Webb built a plan that got me back to full training volume in time to run — and finish. The trigger-point work combined with a real strength program made the difference.",
    imageKey: "client-jordan-micheli",
    serviceSlug: "service-1",
  },
  {
    clientName: "Renata Alvez",
    segment: "Total knee replacement patient",
    category: "Post-Surgical Recovery",
    story: "I was six weeks post total knee replacement and still couldn't get up a single stair without help. Twelve weeks of consistent visits later, I was back to gardening and walking my dog without a second thought.",
    imageKey: "client-renata-alvez",
    serviceSlug: "service-2",
  },
  {
    clientName: "Priya Natarajan",
    segment: "Vertigo patient",
    category: "Vestibular Recovery",
    story: "I'd had episodes of room-spinning vertigo for two weeks and had started avoiding driving entirely. One repositioning treatment with Sarah and it was resolved. I couldn't believe how fast it worked.",
    imageKey: "client-priya-natarajan",
    serviceSlug: "service-4",
  },
  {
    clientName: "Hannah Doss",
    segment: "Postpartum patient",
    category: "Pelvic Health Recovery",
    story: "Six months after my second child I still had significant abdominal separation and pelvic discomfort I assumed was permanent. Dr. Anand's program over three months changed that completely — I feel stronger now than before my pregnancy.",
    imageKey: "client-hannah-doss",
    serviceSlug: "service-5",
  },
  {
    clientName: "Marcus Fielding",
    segment: "Competitive cyclist",
    category: "Performance Recovery",
    story: "A stubborn calf trigger point had been limiting my power output for months despite stretching constantly. Dry needling paired with the recovery program cleared it up within two sessions, and I was back to full training within two weeks.",
    imageKey: "client-marcus-fielding",
    serviceSlug: "service-6",
  },
] as {
  clientName: string;
  segment: string;
  category: string;
  story: string;
  imageKey: string;
  /** Optional slug into `services[]` — replaces category-string matching so the "related service" link on /success-stories doesn't silently break on a category rename. */
  serviceSlug?: string;
}[];

export const proofStatHighlight = {
  number: "92%",
  label: "of patients meet their functional recovery goals within their plan of care",
};

export const proofCareStats = [
  { value: "600+", label: "Verified 5-star reviews", description: "Collected from Google and post-discharge patient surveys since 2015." },
  { value: "92%", label: "Goal achievement rate", description: "Share of patients who meet their individualized functional goals by discharge." },
  { value: "48 hrs", label: "Average time to first visit", description: "From initial phone call or online request to a scheduled evaluation." },
] as { value: string; label: string; description: string }[];

export const proofPageStories = [
  { label: "Marathon comeback", note: "Back to full training volume 8 weeks after a hamstring tear, in time for race day." },
  { label: "Knee replacement recovery", note: "Climbing stairs unassisted and back to gardening 12 weeks post-surgery." },
  { label: "Vertigo resolved in one visit", note: "A single canalith repositioning treatment resolved two weeks of persistent room-spinning vertigo." },
] as { label: string; note: string }[];

export const SITE_ORIGIN = "https://tier1-services-template.vercel.app";

export function buildBreadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_ORIGIN}${crumb.path}`,
    })),
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": businessConfig.schemaType || "LocalBusiness",
    name: businessConfig.name,
    description: businessConfig.tagline,
    url: SITE_ORIGIN,
    telephone: businessConfig.phone,
    email: businessConfig.email,
    address: { "@type": "PostalAddress", streetAddress: businessConfig.address, addressLocality: businessConfig.city },
    openingHoursSpecification: businessConfig.businessHours.map((entry) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: entry.days, opens: entry.hours.split("–")[0]?.trim(), closes: entry.hours.split("–")[1]?.trim() })),
    sameAs: businessConfig.socialLinks.map((social) => social.href),
  };
}

export function buildFaqSchema(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  };
}

export function buildPersonSchema(provider: Provider) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: provider.name,
    jobTitle: provider.specialty,
    description: provider.bio,
    worksFor: { "@type": businessConfig.schemaType || "LocalBusiness", name: businessConfig.name },
  };
}

export function buildArticleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    articleSection: article.category,
    publisher: { "@type": "Organization", name: businessConfig.name },
  };
}
