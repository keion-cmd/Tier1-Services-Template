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
  name: "Clearview Home Cleaning",
  shortName: "Clearview",
  tagline: "Reliable, detail-first house cleaning",
  descriptor: "Residential Cleaning",
  schemaType: "LocalBusiness",
  address: "4417 SE Foster Rd, Suite B",
  city: "Portland, OR 97206",
  phone: "(503) 555-0148",
  phoneDigits: "5035550148",
  email: "hello@clearviewhomecleaning.com",
  hours: "Mon–Fri, 8am–5pm",
  googleReviewUrl: "https://www.google.com/search?q=Clearview+Home+Cleaning+reviews",
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=4417+SE+Foster+Rd+Suite+B+Portland+OR+97206",
  businessHours: [
    { days: "Monday – Friday", hours: "8:00am – 5:00pm" },
    { days: "Saturday", hours: "9:00am – 1:00pm" },
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
    heading: "Products and supplies we trust",
    subheading: "We clean with pet- and kid-safe, low-odor products from brands you already know.",
    items: industryBrands,
  },
  {
    id: "insurance",
    heading: "Ways to pay",
    subheading: "Clearview is a one-person operation — no insurance billing, just simple, upfront payment.",
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
    heroHeadline: "A cleaner home, without adding it to your to-do list",
    heroSubheadline: "Clearview Home Cleaning brings dependable, detail-first house cleaning to Southeast Portland — same cleaner every visit, no franchise turnover.",
    heroStatValue: "6+",
    heroStatCaption: "years cleaning Portland homes",
    heroBadgeText: "Locally owned & operated",
    trustStatsTitle: "Why Portland homeowners keep booking Clearview",
    servicesEyebrow: "What we offer",
    servicesTitle: "Two ways to get your home cleaned right",
    servicesSubtitle: "From regular upkeep to a top-to-bottom reset, pick the cleaning that matches what your home needs right now.",
    whyUsEyebrow: "The Clearview difference",
    whyUsTitle: "Cleaning you don't have to double-check",
    whyUsSubtitle: "You'll get the same cleaner every time, a checklist we actually follow, and a text the moment we're done.",
    teamEyebrow: "Meet your cleaner",
    teamTitle: "One cleaner, one standard, every visit",
    teamSubtitle: "No rotating crews — you'll always know who's coming and what to expect.",
    howItWorksEyebrow: "Getting started",
    howItWorksTitle: "Booking a cleaning takes about two minutes",
    howItWorksSubtitle: "From your first message to a spotless home, here's what happens.",
    facilityEyebrow: "Behind the mop bucket",
    facilityTitle: "How we show up to your home",
    successStoriesTitle: "Homes we've made easier to live in",
    reviewsTitle: "What Portland clients are saying",
    reviewsSubtitle: "Real feedback from homes across Foster-Powell, Woodstock, and Mount Tabor.",
    reviewsLinkLabel: "Read more reviews",
    resourcesEyebrow: "Cleaning tips",
    resourcesTitle: "A few things we've learned on the job",
    resourcesSubtitle: "Short, practical reads on keeping a home cleaner between visits.",
    resourceCardLabel: "Cleaning tip",
    carePlansEyebrow: "Recurring plans",
    carePlansTitle: "Pick a rhythm that fits your home",
    faqTeaserEyebrow: "Questions",
    faqTeaserTitle: "Common questions before your first clean",
    faqTeaserSubtitle: "Still wondering something? Send us a message — we reply the same business day.",
    locationEyebrow: "Service area",
    locationTitle: "Where we clean",
    finalCtaTitle: "Ready for a home that cleans itself off your mind?",
    finalCtaSubtitle: "Grab a spot on the schedule — most first-time cleanings can be booked within a week.",
    leadGenForm: {
      heading: "Get a free cleaning estimate",
      subheading: "Tell us a little about your home and we'll follow up with a straightforward quote.",
      submitButton: "Request my estimate",
      successMessage: "Thanks — we'll text or email your estimate within one business day.",
      privacyNote: "We only use your info to follow up about your cleaning. No spam, ever.",
    },
    insuranceCtaPrompt: "Curious what a cleaning costs? Get a free, no-obligation estimate.",
  },
  about: {
    metaDescription: "The story and cleaning standards behind Clearview Home Cleaning.",
    heroEyebrow: "Our story",
    heroTitle: "A cleaning business built on showing up",
    heroSubtitle: "Clearview started with one person, one vacuum, and a promise to do the job right every single time.",
    valuesEyebrow: "What we stand for",
    valuesTitle: "The values behind every visit",
    valueLabel: "Value",
    approachEyebrow: "Our approach",
    approachParagraph1: "Clearview Home Cleaning started in 2019 when Nella Ramirez was cleaning houses solo on the side of a full-time job, driving between Foster-Powell and Woodstock with a trunk full of supplies. Word of mouth from a handful of neighbors turned into a full calendar, and in 2021 Nella left her other job to clean homes full time.",
    approachParagraph2: "Clearview is still a one-person operation on purpose. Every home gets the same cleaner, the same checklist, and the same attention to the details that get skipped when a different crew shows up each time — baseboards, light switches, the tops of door frames.",
    staffEyebrow: "Who you'll meet",
    staffTitle: "The person behind every clean",
    exploreEyebrow: "Explore Clearview",
    exploreTitle: "See more of what we do",
    exploreTeamLabel: "Meet Nella",
    exploreTeamDescription: "Get to know the owner who cleans every home personally.",
    exploreServicesLabel: "Our services",
    exploreServicesDescription: "Compare standard cleanings with deep and move-out cleaning.",
    exploreResourcesLabel: "Cleaning tips",
    exploreResourcesDescription: "Quick reads on keeping your home tidy between visits.",
    ctaTitle: "Ready to see your home spotless?",
  },
  services: {
    heroTitle: "Cleaning services for every kind of clean",
    heroSubtitle: "Two straightforward options — regular upkeep or a full deep clean — no confusing add-on menus.",
    introText: "Every service includes the same checklist, the same supplies, and the same cleaner: Nella. Choose the option that fits where your home is at right now.",
    ctaTitle: "Not sure which service fits your home?",
    cardLabel: "Service",
    chooseEyebrow: "How to choose",
    chooseTitle: "Not sure where to start?",
  },
  serviceDetail: {
    benefitsEyebrow: "What's included",
    processEyebrow: "How it works",
    processTitle: "What happens during your cleaning",
  },
  team: {
    heroEyebrow: "Meet the team",
    heroTitle: "One cleaner. One standard.",
    heroSubtitle: "Clearview is a team of one — which means the person who quotes your cleaning is the same person who does it.",
    gridEyebrow: "Say hello",
    gridTitle: "Your cleaner",
    ctaTitle: "Ready to book your first cleaning?",
    cultureEyebrow: "How we work",
    cultureBody: "No subcontractors, no rotating crews. Every home on the schedule gets cleaned personally, using the same checklist, so the quality never depends on who happened to show up that day.",
  },
  proof: {
    heroEyebrow: "Proof it works",
    heroTitle: "See why Portland homeowners trust Clearview",
    heroSubtitle: "Real reviews, real results, from real homes across Southeast Portland.",
    statsEyebrow: "By the numbers",
    statsTitle: "A small business with a solid track record",
    statsCaption: "Numbers we're proud of, even as a team of one.",
    statCardLabel: "Stat",
    storiesEyebrow: "Client stories",
    ctaTitle: "Want results like these in your own home?",
    reviewsEyebrow: "Reviews",
    reviewsTitleLead: "Homeowners say it",
    reviewsTitleAccent: "best",
    reviewsBody: "Every review below is from a real Clearview client — no incentives, no cherry-picking.",
    mapsEyebrow: "Find us",
    mapsTitleLead: "Cleaning homes across",
    mapsTitleAccent: "Southeast Portland",
    mapsBody: "Based in Foster-Powell and serving nearby neighborhoods within about a 20-minute drive.",
    mapsCardAriaLabel: "Map showing Clearview Home Cleaning's service area",
    reviewButtonLabel: "Leave us a review",
    mapsHint: "Not sure if your address is in range? Just ask — most of inner Southeast Portland is covered.",
  },
  faq: {
    heroEyebrow: "FAQ",
    heroTitle: "Questions before you book",
    heroSubtitle: "Everything homeowners usually ask before their first Clearview cleaning.",
    contactEyebrow: "Still have questions?",
    contactTitle: "We're happy to talk it through",
    callLabel: "Call or text",
    callDescription: "Reach Nella directly during business hours.",
    emailLabel: "Email",
    emailDescription: "We reply within one business day.",
    ctaTitle: "Ready to get on the schedule?",
  },
  locations: {
    heroEyebrow: "Where we work",
    heroTitle: "Our service area",
    heroSubtitle: "Clearview is based in Foster-Powell and cleans homes throughout inner Southeast Portland.",
    gridEyebrow: "Home base",
    gridTitle: "Our location",
    ctaTitle: "See if your address is in range",
    emptyTitle: "No service area listed yet",
    emptyBody: "We're still setting up our location details — reach out directly and we'll confirm whether we cover your address.",
  },
  location: {
    heroEyebrow: "Foster-Powell, Portland",
    heroTitle: "Clearview Home Cleaning",
    heroSubtitle: "Serving Foster-Powell, Woodstock, Mount Tabor, and nearby Southeast Portland neighborhoods.",
    startTitle: "Ready to book?",
    directionsEyebrow: "Getting here",
    directionsTitle: "Find our office",
    landmarkLabel: "Landmark",
    addressLabel: "Address",
    hoursEyebrow: "Availability",
    hoursTitle: "Booking hours",
    emergencyTitle: "Need to change a booking?",
    referralLabel: "Contact",
    whatToDoLabel: "What to do",
    afterHoursTitle: "After-hours requests",
  },
  resources: {
    heroEyebrow: "Cleaning tips",
    heroTitle: "A few things we've learned on the job",
    heroSubtitle: "Practical, no-nonsense reads on keeping your home cleaner between Clearview visits.",
    disclaimerText: "These are general tips, not a substitute for a professional deep clean — every home is different.",
    gridEyebrow: "Latest tips",
    gridTitle: "Browse all articles",
    ctaTitle: "Want us to handle it instead?",
  },
  articleDetail: {
    bodyEyebrow: "Cleaning tip",
    disclaimerText: "General guidance only — for stubborn stains or unique surfaces, ask us directly.",
    relatedEyebrow: "Keep reading",
    relatedTitle: "More cleaning tips",
    ctaTitle: "Ready to book a cleaning?",
  },
  successStories: {
    heroEyebrow: "Client stories",
    heroTitle: "Homes we've made easier to live in",
    heroSubtitle: "A couple of the homeowners we've had the pleasure of cleaning for, regularly.",
    gridEyebrow: "Client stories",
    gridTitle: "Real outcomes, real care",
    ctaTitle: "Want a story like this from your own home?",
  },
  contact: {
    heroEyebrow: "Get in touch",
    heroTitle: "Let's talk about your home",
    heroSubtitle: "Questions, quotes, or scheduling changes — reach out any way that's easiest for you.",
    whyEyebrow: "Why reach out",
    whyTitle: "How we can help",
    methodsEyebrow: "Get in touch",
    methodsTitle: "Ways to reach us",
    visitEyebrow: "Service area",
    visitTitle: "Where we clean",
    viewAllLocationsLabel: "See our service area",
    formEyebrow: "Send a message",
    formTitle: "Tell us what you need",
    ctaTitle: "Prefer to just book directly?",
  },
  newClients: {
    heroEyebrow: "New clients",
    heroTitle: "What to expect from your first cleaning",
    heroSubtitle: "A quick walkthrough of how we get your home from first message to spotless.",
    stepsEyebrow: "The process",
    stepsTitle: "Three simple steps",
    bringEyebrow: "Before we arrive",
    bringTitle: "How to get ready for your first visit",
    faqPrompt: "Have a question we didn't cover?",
    servicesPrompt: "Not sure which service fits your home?",
    ctaTitle: "Ready to book your first cleaning?",
  },
  notFound: {
    heroTitle: "We couldn't find that page",
    heroSubtitle: "The page you're looking for may have moved. Let's get you back on track.",
    ctaTitle: "Ready to book a cleaning instead?",
  },
  privacyPolicy: {
    heroEyebrow: "Privacy",
    heroTitle: "Privacy Policy",
    heroSubtitle: "How Clearview Home Cleaning collects and uses your information.",
    bodyHeading: "Your information, handled responsibly",
    bodyParagraph1: "Clearview Home Cleaning collects only the information needed to schedule and provide cleaning services — your name, address, phone number, and email. We never sell your information to third parties.",
    bodyParagraph2: "Information submitted through our booking form or contact form is used solely to respond to your request, schedule appointments, and send appointment reminders. You can ask us to delete your information at any time by emailing hello@clearviewhomecleaning.com.",
  },
  termsAndConditions: {
    heroEyebrow: "Terms",
    heroTitle: "Terms & Conditions",
    heroSubtitle: "The basics of how booking and cancellations work with Clearview Home Cleaning.",
    bookingChangesHeading: "Rescheduling & cancellations",
    bookingChangesBody: "We ask for at least 48 hours' notice to reschedule or cancel a cleaning. Cancellations with less notice may be subject to a $35 fee, since that slot could have gone to another client.",
    contactingClinicHeading: "Contacting us",
    contactingClinicBody: "For scheduling changes, questions, or feedback about a cleaning, call or text (503) 555-0148, or email hello@clearviewhomecleaning.com. We reply within one business day.",
  },
  siteShell: {
    footerTagline: "Reliable, detail-first house cleaning for Southeast Portland homes.",
    bookingDetailsText: "Tell us a bit about your home and preferred schedule — we'll confirm within one business day.",
    emailCaptureHeading: "Get seasonal cleaning tips",
    emailCaptureBody: "Occasional emails with quick cleaning tips and scheduling reminders. No spam.",
    emailCapturePlaceholder: "you@example.com",
    emailCaptureSubmitButton: "Sign up",
    emailCaptureSuccessMessage: "You're on the list — thanks for subscribing!",
  },
  chat: {
    greetingMessage: "Hi! I'm the Clearview virtual assistant. Ask me about services, pricing, or booking a cleaning.",
    noMatchMessage: "I didn't quite catch that — could you rephrase, or ask about services, pricing, or scheduling?",
    humanHandoffMessage: "I'll have Nella follow up with you directly for that one.",
    leadCaptureOfferMessage: "Want me to pass your info along so we can follow up with a quote?",
    leadCaptureAskNameMessage: "Sure — what's your name?",
    leadCaptureAskPhoneMessage: "Thanks! And what's the best phone number to reach you?",
    leadCaptureThankYouMessage: "Got it — we'll be in touch soon!",
    leadCaptureDeclineMessage: "No problem — feel free to reach out any time at hello@clearviewhomecleaning.com.",
    farewellMessage: "Thanks for stopping by! Have a great day.",
    windowTitle: "Chat with Clearview",
    inputPlaceholder: "Type your question...",
    chatWithLabel: "Chat with Clearview",
    askPromptMessage: "What would you like to know?",
  },
  booking: {
    modalEyebrow: "Book a cleaning",
    modalHeadline: "Let's get your home on the schedule",
    modalSubtext: "Fill out a few details and we'll confirm your cleaning within one business day.",
    successHeadline: "You're on the schedule!",
    successMessage: "Thanks for booking with Clearview — we'll send a confirmation text or email shortly.",
  },
} as const;

export const aboutValues = [
  { title: "Show up on time", copy: "You'll get a text when Nella is on her way, and the appointment window we agree on is the one we keep." },
  { title: "Same cleaner, every visit", copy: "No rotating crews. The person who cleans your home this month is the same one who cleaned it last month." },
  { title: "Follow the checklist", copy: "Every visit uses the same room-by-room checklist, so nothing gets skipped just because we're in a hurry." },
  { title: "Keep it simple", copy: "Two services, straightforward pricing, and honest answers if a job is bigger than expected." },
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
    title: "Standard Home Cleaning",
    short: "Recurring upkeep cleaning for kitchens, bathrooms, bedrooms, and living areas.",
    detail: "Our most popular service — a thorough, room-by-room cleaning designed to keep your home consistently spotless on a weekly, biweekly, or monthly schedule. We dust, vacuum, mop, sanitize surfaces, and tidy as we go, using the same checklist every visit.",
    category: "Recurring Cleaning",
    benefits: [
      "Same cleaner every visit, so nothing gets missed or re-explained",
      "Pet- and kid-safe, low-odor cleaning products",
      "Flexible weekly, biweekly, or monthly scheduling",
    ],
    process: serviceProcess(1, [
      ["Quick walkthrough", "We do a two-minute walkthrough of your home so nothing gets overlooked and we can flag anything that needs extra attention."],
      ["Room-by-room clean", "We work through kitchens, bathrooms, bedrooms, and living spaces using our standard checklist, top to bottom."],
      ["Final check & text", "We do a final pass, tidy up our supplies, and send a text when we're done and locking up."],
    ]),
    duration: "1.5–2.5 hours",
    imageKey: "[SERVICE_1_IMAGE]",
    bestFor: ["Homes on a weekly or biweekly cleaning rhythm", "Busy households who want consistent upkeep without thinking about it"],
  },
  {
    number: "02",
    slug: "service-2",
    title: "Deep Cleaning & Move-Out Cleaning",
    short: "A top-to-bottom reset for first-time cleanings, spring cleaning, or moving out.",
    detail: "A more intensive, detail-heavy cleaning that covers everything a standard clean does plus baseboards, inside appliances, window sills, cabinet fronts, and other spots that build up over time. It's the right choice for a first Clearview visit, a seasonal reset, or preparing a home for move-in or move-out.",
    category: "Deep Cleaning",
    benefits: [
      "Covers baseboards, cabinet fronts, and inside major appliances",
      "Great starting point before switching to recurring standard cleanings",
      "Move-out ready results for landlords and lease walk-throughs",
    ],
    process: serviceProcess(2, [
      ["Detailed walkthrough", "We review the whole home together and note any problem areas — grout, appliance interiors, built-up grime."],
      ["Deep clean pass", "We work top to bottom through every room, including the extra detail areas skipped in standard cleanings."],
      ["Final inspection", "We walk the home a second time to catch anything missed and leave a checklist of what was covered."],
    ]),
    duration: "3–5 hours",
    imageKey: "[SERVICE_2_IMAGE]",
    bestFor: ["First-time Clearview clients", "Move-in / move-out cleanings and lease walk-throughs"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const trustStats = [
  { value: "6+", label: "years in business" },
  { value: "180+", label: "homes cleaned" },
  { value: "4.9★", label: "average review rating" },
] as { value: string; label: string }[];

export const differentiators = [
  { title: "Same cleaner, every time", copy: "No rotating crews or subcontractors — Nella personally cleans every home on the schedule.", icon: "ShieldCheck" },
  { title: "Text when we're done", copy: "You'll always get a heads-up text when we're on the way, and another when the cleaning's finished.", icon: "Clock3" },
  { title: "Straightforward pricing", copy: "Flat, upfront quotes with no surprise add-on fees at the door.", icon: "Heart" },
] as { title: string; copy: string; icon?: string }[];

export const howItWorks = [
  { step: "01", title: "Request a quote", copy: "Tell us about your home's size and how often you'd like it cleaned.", icon: "PhoneCall" },
  { step: "02", title: "Pick a time", copy: "We'll confirm a day and arrival window that works for your schedule.", icon: "CalendarCheck" },
  { step: "03", title: "We clean, you relax", copy: "We handle the cleaning start to finish and text you the moment we're wrapped up.", icon: "ClipboardCheck" },
] as { step: string; title: string; copy: string; icon?: string }[];

export const healthResources = [
  {
    title: "5 Quick Habits That Keep a Clean Home Cleaner Longer",
    excerpt: "Small daily habits that stretch the time between deep cleans.",
    imageKey: "[RESOURCE_1_IMAGE]",
  },
  {
    title: "What to Do (and Not Do) Before Your First Cleaning",
    excerpt: "A short checklist to help your first Clearview visit go smoothly.",
    imageKey: "[RESOURCE_2_IMAGE]",
  },
] as { title: string; excerpt: string; imageKey: string }[];

export const marqueeReviews = [
  { author: "Marissa T.", segment: "Foster-Powell homeowner", quote: "Nella has cleaned our house biweekly for two years and it's the most consistent service we've ever had. Same great result, every time.", rating: 5, serviceSlug: "service-1" },
  { author: "David & Priya K.", segment: "Woodstock homeowners", quote: "We booked the deep clean before moving in and it made the whole house feel brand new. Worth every penny.", rating: 5, serviceSlug: "service-2" },
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
    question: "Do I need to be home during the cleaning?",
    answer: "Not at all. Most clients give us a key, garage code, or lockbox code and go about their day. We'll text you when we arrive and when we're finished.",
    category: "Requests & visits",
    serviceSlug: "service-1",
  },
  {
    question: "What if I need to reschedule or cancel?",
    answer: "Just let us know at least 48 hours ahead and we'll find a new time with no fee. Cancellations with less notice may include a $35 fee since that slot can't be rebooked.",
    category: "Scheduling",
  },
  {
    question: "Do you bring your own cleaning supplies?",
    answer: "Yes — we bring all supplies and equipment, using pet- and kid-safe, low-odor products. If you'd prefer we use specific products you already own, just let us know.",
    category: "First visit",
    serviceSlug: "service-2",
  },
];

export const emergencyInfo = {
  heading: "Need to change a booking on short notice?",
  note: "If something comes up and you need to reschedule with less than 48 hours' notice, text or call us as early as possible — we'll do our best to find a new slot, though a $35 late-change fee may apply.",
  referralLocationName: "Clearview Home Cleaning",
  referralLocationPhone: "(503) 555-0148",
  referralLocationPhoneDigits: "5035550148",
  referralLocationAddress: "4417 SE Foster Rd, Suite B, Portland, OR 97206",
  instructions: "Text or call as soon as you know your plans have changed — we'll confirm a new time by the next business day.",
  placeholder: false,
};

export const paymentInfo = {
  heading: "How payment works",
  methods: ["Cash", "Credit / Debit Card", "Venmo"],
  insuranceNote: "As a residential cleaning business, we don't work with insurance — payment is due at the end of each cleaning, or you can set up autopay for recurring visits.",
};

export const providers = [
  {
    slug: "provider-1",
    name: "Nella Ramirez",
    credentials: "Owner & Lead Cleaning Technician",
    specialty: "Owner-Operator",
    bio: "Nella founded Clearview Home Cleaning in 2019 and personally cleans every home on the schedule.",
    fullBio: "Nella Ramirez started cleaning houses on evenings and weekends in 2019 while working a full-time office job, and went full time with Clearview in 2021 once word of mouth filled her calendar. She's cleaned homes across Foster-Powell, Woodstock, and Mount Tabor ever since, and still handles every booking herself — no subcontractors, no rotating crews.",
    yearsExperience: 6,
    areasOfInterest: ["Recurring home upkeep", "Move-in / move-out deep cleans", "Pet- and kid-safe products"],
    imageKey: "[PROVIDER_1_PHOTO]",
    relatedServiceSlugs: ["service-1", "service-2"],
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
    title: "5 Quick Habits That Keep a Clean Home Cleaner Longer",
    category: "Cleaning Tips",
    author: "Nella Ramirez",
    date: "2026-03-04",
    readingTime: "3 min read",
    excerpt: "Small daily habits that stretch the time between deep cleans.",
    body: [
      "A professional cleaning gets your home to a great baseline — but a few small daily habits can keep it looking that way much longer between visits.",
      "First, do a five-minute nightly reset: dishes in the dishwasher, counters wiped, items back in their spots. It's a small habit that prevents clutter from becoming a bigger cleaning job.",
      "Second, keep a microfiber cloth under the bathroom sink and wipe down counters and the mirror after your morning routine. It takes thirty seconds and keeps water spots from building up.",
      "Third, take shoes off at the door. It's the single biggest thing you can do to keep floors cleaner between visits, especially in Portland's wetter months.",
      "None of this replaces a thorough cleaning — but it does mean your home stays more consistently comfortable in between our visits.",
    ],
    imageKey: "[RESOURCE_1_IMAGE]",
    disclaimer: true,
    relatedServiceSlugs: ["service-1"],
  },
  {
    slug: "article-2",
    title: "What to Do (and Not Do) Before Your First Cleaning",
    category: "New Clients",
    author: "Nella Ramirez",
    date: "2026-01-18",
    readingTime: "3 min read",
    excerpt: "A short checklist to help your first Clearview visit go smoothly.",
    body: [
      "First-time clients often ask how much they should tidy up before we arrive. The short answer: not much.",
      "You don't need to clean before we clean. Picking up loose items like laundry, toys, or paperwork from floors and surfaces helps us focus on the actual cleaning rather than organizing, but that's it.",
      "Do let us know about anything fragile, sentimental, or off-limits — a note in the booking form works great, or just leave a sticky note if we're cleaning while you're out.",
      "If you have pets, a quick heads-up on their names and whether they'll be home helps us plan around them comfortably.",
      "Beyond that, just leave a way in — a key, code, or lockbox — and we'll take it from there.",
    ],
    imageKey: "[RESOURCE_2_IMAGE]",
    disclaimer: true,
    relatedServiceSlugs: ["service-2"],
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
    title: "Weekly",
    subtitle: "Our most popular recurring plan",
    bullets: ["Same day and time every week", "Lowest per-visit rate", "Ideal for busy households and pet owners"],
  },
  {
    title: "Biweekly",
    subtitle: "A steady middle-ground rhythm",
    bullets: ["Cleaning every other week", "Great for smaller households", "Most popular plan overall"],
  },
  {
    title: "Monthly",
    subtitle: "A lighter-touch reset",
    bullets: ["One thorough cleaning per month", "Good for households that self-maintain between visits", "Easy to upgrade to biweekly later"],
  },
] as { title: string; subtitle: string; bullets: string[] }[];

export const serviceChoiceSteps = [
  { step: "01", title: "Tell us what's going on", copy: "Share a quick description of your concern, and our team points you to the right care path." },
  { step: "02", title: "Compare care paths", copy: "Browse services by category, duration, and who each one is best suited for." },
  { step: "03", title: "Book with confidence", copy: "Once you've found the right fit, book directly — no guesswork required." },
] as { step: string; title: string; copy: string }[];

export const newClientSteps = [
  { step: "01", title: "Request a quote", copy: "Tell us your home's size, condition, and how often you'd like it cleaned." },
  { step: "02", title: "Confirm your appointment", copy: "We'll text or email to lock in a day and arrival window that works for you." },
  { step: "03", title: "We clean your home", copy: "Nella arrives, follows our standard checklist, and texts you when the cleaning's done." },
] as { step: string; title: string; copy: string }[];

export const whatToBring = [
  "Access to your home (key, code, or lockbox)",
  "A note on any fragile or off-limits items",
  "A heads-up about pets, if applicable",
] as string[];

export const clinicExperienceFeatures = [
  { title: "Pet- and kid-safe products", copy: "We clean with low-odor, non-toxic products safe for households with children and pets.", imageKey: "[CLINIC_1_IMAGE]" },
  { title: "Fully equipped, every visit", copy: "We bring our own vacuum, mop, and supplies — you don't need to provide anything.", imageKey: "[CLINIC_2_IMAGE]" },
  { title: "Text-based updates", copy: "You'll get a text when we're on the way and another the moment we're finished.", imageKey: "[CLINIC_3_IMAGE]" },
] as { title: string; copy: string; imageKey: string }[];

export const clientStories = [
  {
    clientName: "Marissa T.",
    segment: "Foster-Powell",
    category: "Recurring Cleaning",
    story: "After our second baby, keeping the house clean became impossible. Clearview's biweekly visits gave us back our weekends — the house is spotless every other Friday, no matter how chaotic the week was.",
    imageKey: "[CLIENT_1_PHOTO]",
    serviceSlug: "service-1",
  },
  {
    clientName: "David & Priya K.",
    segment: "Woodstock",
    category: "Deep Cleaning",
    story: "We hired Clearview for a deep clean before moving into our new place. Every cabinet, baseboard, and appliance was spotless — it genuinely felt like a different house when we walked in.",
    imageKey: "[CLIENT_2_PHOTO]",
    serviceSlug: "service-2",
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
  number: "180+",
  label: "homes cleaned since 2019",
};

export const proofCareStats = [
  { value: "6+", label: "years in business", description: "Cleaning Southeast Portland homes since 2019." },
  { value: "180+", label: "homes cleaned", description: "Recurring and one-time cleanings completed to date." },
  { value: "4.9★", label: "average rating", description: "Based on client reviews across Google and Facebook." },
] as { value: string; label: string; description: string }[];

export const proofPageStories = [
  { label: "Recurring clients", note: "Most clients stay on a weekly or biweekly plan for years, not months." },
  { label: "Referral-driven", note: "The majority of new bookings come from word of mouth, not advertising." },
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
