import { industryBrands } from "@/lib/industryBrands";
import { insuranceProviders } from "@/data/insurance";

export const businessConfig = {
  // "modal" (default) opens the in-page Supabase-backed BookingModal from every CTA.
  // "external" makes every CTA link out to BOOKING_URL (src/lib/booking.ts) instead.
  bookingMode: "modal" as "modal" | "external",
  // Gates <TemplateSelfPromo /> in Footer.tsx (the "this is a template, get one for your
  // business" strip). Must stay false in every clone — only this template's own
  // business-content.ts sets it to true. See CLONE_INSTRUCTIONS.md.
  isTemplateDemo: false,
  name: "Nova Padel Club",
  shortName: "Nova Padel",
  tagline: "Where the game gets serious",
  descriptor: "Padel Club",
  schemaType: "LocalBusiness",
  address: "14 Meridian Court",
  city: "Taguig, Metro Manila",
  phone: "0917 555 0142",
  phoneDigits: "639175550142",
  email: "play@novapadel.ph",
  hours: "Daily, 6AM–11PM",
  googleReviewUrl: "https://www.google.com/search?q=Nova+Padel+Club+reviews",
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=14+Meridian+Court%2C+Taguig%2C+Metro+Manila",
  businessHours: [
    { days: "Monday–Friday", hours: "6:00 AM – 11:00 PM" },
    { days: "Saturday–Sunday", hours: "6:00 AM – 10:00 PM" },
  ] as { days: string; hours: string }[],
  socialLinks: [
    { label: "Facebook", href: "https://www.facebook.com/novapadelph", placeholder: false },
    { label: "Instagram", href: "https://www.instagram.com/novapadel", placeholder: false },
  ] as { label: string; href: string; placeholder: boolean }[],
};

/** Backward-compatible alias — prefer `businessConfig` in new code. */
export const clinic = businessConfig;

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
    heading: "Gear We Trust",
    subheading: "Equipment brands our members and coaches play with.",
    items: industryBrands,
  },
  {
    id: "insurance",
    heading: "Accepted Coverage",
    subheading: "Not applicable for Nova Padel Club.",
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
    heroHeadline: "Every Match Starts Here",
    heroSubheadline: "Championship-grade courts, real coaching, and a club that plays as hard as you do.",
    heroStatValue: "500+",
    heroStatCaption: "Active Members",
    heroBadgeText: "Now Booking Peak Hours",
    trustStatsTitle: "The Numbers Don't Lie",
    servicesEyebrow: "Book Your Court",
    servicesTitle: "Play Your Way",
    servicesSubtitle: "Courts, coaching, and programs for every level of player.",
    whyUsEyebrow: "Why Nova Padel",
    whyUsTitle: "Built Different",
    whyUsSubtitle: "The details that set our club apart.",
    teamEyebrow: "Meet The Coaches",
    teamTitle: "Learn From The Best",
    teamSubtitle: "Certified coaches dedicated to sharpening your game.",
    howItWorksEyebrow: "Getting Started",
    howItWorksTitle: "How It Works",
    howItWorksSubtitle: "From first booking to first match, here's what to expect.",
    facilityEyebrow: "The Facility",
    facilityTitle: "Built for the Game",
    successStoriesTitle: "Real Members, Real Progress",
    reviewsTitle: "What Our Members Say",
    reviewsSubtitle: "Real feedback from real players at the club.",
    resourcesEyebrow: "Resources",
    resourcesTitle: "Player Development",
    resourcesSubtitle: "Tips and news for club members.",
    resourceCardLabel: "Read More",
    carePlansEyebrow: "Membership",
    carePlansTitle: "Join The Club",
    faqTeaserEyebrow: "FAQ",
    faqTeaserTitle: "Got Questions?",
    faqTeaserSubtitle: "Everything you need to know before you play.",
    locationEyebrow: "Visit Us",
    locationTitle: "Find The Club",
    finalCtaTitle: "Ready To Play?",
    finalCtaSubtitle: "Book your court and join the club today.",
    leadGenForm: {
      heading: "Get In Touch",
      subheading: "Questions about membership or coaching? Send us a message.",
      submitButton: "Send Message",
      successMessage: "Thanks — we'll be in touch shortly.",
      privacyNote: "We respect your privacy and never share your information.",
    },
  },
  about: {
    heroEyebrow: "About Us",
    heroTitle: "Built For Players Who Take Their Game Seriously",
    heroSubtitle: "Nova Padel Club brings championship-grade courts and real coaching to Taguig.",
    valuesEyebrow: "Our Values",
    valuesTitle: "What We Stand For",
    valueLabel: "Value",
    approachEyebrow: "Our Approach",
    approachParagraph1: "We built Nova Padel Club for players who want more than a court booking — a place with real coaching, real competition, and a clubhouse that feels like home turf.",
    approachParagraph2: "Whether you're picking up a racket for the first time or chasing a competitive ranking, our coaches meet you where your game is and push you toward where it's going.",
    staffEyebrow: "The Team",
    staffTitle: "Coaches",
    ctaTitle: "Ready To Book Your Court?",
  },
  services: {
    heroTitle: "Play Your Way",
    heroSubtitle: "Courts, coaching, and programs for every level of player.",
    introText: "From casual court time to competitive coaching, Nova Padel Club has a path for your game.",
    ctaTitle: "Ready To Book?",
  },
  serviceDetail: {
    benefitsEyebrow: "Why It Works",
    processEyebrow: "How It Works",
    processTitle: "What To Expect",
  },
  team: {
    heroEyebrow: "Our Coaches",
    heroTitle: "Meet The Team",
    heroSubtitle: "Certified coaches dedicated to your game.",
    gridEyebrow: "The Coaches",
    gridTitle: "Learn From The Best",
    ctaTitle: "Ready To Train?",
  },
  proof: {
    heroEyebrow: "Proof",
    heroTitle: "Why Players Choose Nova Padel",
    heroSubtitle: "Real results, real reviews, real club.",
    statsEyebrow: "By The Numbers",
    statsTitle: "Club Stats",
    statsCaption: "Numbers that back up the hype.",
    statCardLabel: "Members",
    storiesEyebrow: "Member Stories",
    ctaTitle: "Ready To Join?",
    reviewsEyebrow: "Reviews",
    reviewsTitleLead: "What Our",
    reviewsTitleAccent: "Members Say",
    reviewsBody: "Real feedback from real players.",
    mapsEyebrow: "Find Us",
    mapsTitleLead: "Visit The",
    mapsTitleAccent: "Club",
    mapsBody: "Located in the heart of Taguig.",
    mapsCardAriaLabel: "Map to Nova Padel Club",
    reviewButtonLabel: "Leave a Review",
    mapsHint: "Tap to get directions",
  },
  faq: {
    heroEyebrow: "FAQ",
    heroTitle: "Common Questions",
    heroSubtitle: "Everything you need to know before you play.",
    contactEyebrow: "Still Have Questions?",
    contactTitle: "Get In Touch",
    callLabel: "Call Us",
    callDescription: "Speak with our front desk team.",
    emailLabel: "Email Us",
    emailDescription: "We'll respond within one business day.",
    ctaTitle: "Ready To Book Your Court?",
  },
  locations: {
    heroEyebrow: "Locations",
    heroTitle: "Find Your Court",
    heroSubtitle: "One club, built for every player.",
    gridEyebrow: "Our Club",
    gridTitle: "Where We Play",
    ctaTitle: "Ready To Book?",
  },
  location: {
    heroEyebrow: "Nova Padel Club",
    heroTitle: "Taguig",
    heroSubtitle: "Championship courts in the heart of the city.",
    startTitle: "Start Here",
    directionsEyebrow: "Getting Here",
    directionsTitle: "Directions",
    landmarkLabel: "Landmark",
    addressLabel: "Address",
    hoursEyebrow: "Hours",
    hoursTitle: "Club Hours",
    emergencyTitle: "Need Help?",
    referralLabel: "Contact",
    whatToDoLabel: "What To Do",
    afterHoursTitle: "After Hours",
  },
  resources: {
    heroEyebrow: "Resources",
    heroTitle: "Player Resources",
    heroSubtitle: "Tips, news, and updates for the club.",
    disclaimerText: "Content is for general informational purposes only.",
    gridEyebrow: "Latest",
    gridTitle: "From The Club",
    ctaTitle: "Ready To Play?",
  },
  articleDetail: {
    bodyEyebrow: "Article",
    disclaimerText: "This article is for general informational purposes only.",
    relatedEyebrow: "Read Next",
    relatedTitle: "More From The Club",
    ctaTitle: "Ready To Book?",
  },
  newClients: {
    heroEyebrow: "New Members",
    heroTitle: "Getting Started",
    heroSubtitle: "Everything you need for your first visit to Nova Padel Club.",
    stepsEyebrow: "The Process",
    stepsTitle: "How To Join",
    bringEyebrow: "What To Bring",
    bringTitle: "Come Prepared",
    ctaTitle: "Ready To Book Your First Session?",
  },
  notFound: {
    heroTitle: "Page Not Found",
    heroSubtitle: "Looks like this court doesn't exist.",
    ctaTitle: "Back To The Club",
  },
  privacyPolicy: {
    heroEyebrow: "[PRIVACY_POLICY_HERO_EYEBROW]",
    heroTitle: "[PRIVACY_POLICY_HERO_TITLE]",
    heroSubtitle: "[PRIVACY_POLICY_HERO_SUBTITLE]",
    bodyHeading: "[PRIVACY_POLICY_BODY_HEADING]",
    bodyParagraph1: "[PRIVACY_POLICY_BODY_PARAGRAPH_1]",
    bodyParagraph2: "[PRIVACY_POLICY_BODY_PARAGRAPH_2]",
  },
  termsAndConditions: {
    heroEyebrow: "[TERMS_AND_CONDITIONS_HERO_EYEBROW]",
    heroTitle: "[TERMS_AND_CONDITIONS_HERO_TITLE]",
    heroSubtitle: "[TERMS_AND_CONDITIONS_HERO_SUBTITLE]",
    bookingChangesHeading: "[TERMS_AND_CONDITIONS_BOOKING_CHANGES_HEADING]",
    bookingChangesBody: "[TERMS_AND_CONDITIONS_BOOKING_CHANGES_BODY]",
    contactingClinicHeading: "[TERMS_AND_CONDITIONS_CONTACTING_CLINIC_HEADING]",
    contactingClinicBody: "[TERMS_AND_CONDITIONS_CONTACTING_CLINIC_BODY]",
  },
  siteShell: {
    footerTagline: "Where the game gets serious.",
    bookingDetailsText: "Book online or call the front desk — courts fill up fast.",
    emailCaptureHeading: "Stay In The Loop",
    emailCaptureBody: "Get court availability, clinics, and club news.",
    emailCapturePlaceholder: "Your email address",
    emailCaptureSubmitButton: "Subscribe",
    emailCaptureSuccessMessage: "You're on the list — welcome to the club.",
  },
  chat: {
    greetingMessage: "Hey! Welcome to Nova Padel Club — how can we help you today?",
    noMatchMessage: "Sorry, I didn't quite catch that. Could you rephrase?",
    humanHandoffMessage: "Let me connect you with our front desk team.",
    leadCaptureOfferMessage: "Want us to follow up with you directly?",
    leadCaptureAskNameMessage: "What's your name?",
    leadCaptureAskPhoneMessage: "What's the best number to reach you?",
    leadCaptureThankYouMessage: "Thanks! Our team will reach out soon.",
    leadCaptureDeclineMessage: "No problem — feel free to reach out anytime.",
    farewellMessage: "Thanks for stopping by Nova Padel Club!",
    windowTitle: "Nova Padel Chat",
    inputPlaceholder: "Type your message...",
    chatWithLabel: "Chat with Nova Padel",
    askPromptMessage: "Ask us about courts, coaching, or membership.",
  },
  booking: {
    modalEyebrow: "Book Your Court",
    modalHeadline: "Reserve Your Spot",
    modalSubtext: "Pick a service and we'll confirm your session.",
    successHeadline: "You're Booked!",
    successMessage: "We'll see you on the court — check your email for details.",
  },
} as const;

export const aboutValues = [] as { title: string; copy: string }[];

function serviceProcess(serviceNumber: number, steps: [string, string][]) {
  return steps.map(([title, description], index) => ({
    step: String(index + 1).padStart(2, "0"),
    title,
    description,
  }));
}

export const services = [
  {
    number: "01",
    slug: "court-standard",
    title: "Court Rental — Standard",
    short: "Book a panoramic court by the hour, day or night.",
    detail: "Our standard courts offer championship-grade panoramic glass, premium turf, and full night lighting — available for open play any time we're open.",
    category: "Play",
    benefits: ["Tournament-quality surface", "Available day or night", "Book by the hour"],
    process: serviceProcess(1, [
      ["Pick Your Time", "Choose an available slot from our real-time court calendar."],
      ["Show Up & Play", "Rental rackets and balls are available at the front desk."],
      ["Rate Your Session", "Leave feedback so we keep every court in top shape."],
    ]),
    duration: "90 min per session",
    imageKey: "[SERVICE_1_IMAGE]",
  },
  {
    number: "02",
    slug: "court-premium",
    title: "Court Rental — Premium Glass Court",
    short: "Our flagship glass-walled court with tournament-grade lighting.",
    detail: "The Premium Glass Court is our showcase venue — full glass enclosure, tournament-grade lighting, and broadcast-ready sightlines for your best matches.",
    category: "Play",
    benefits: ["Flagship glass-walled court", "Tournament-grade lighting", "Priority booking for members"],
    process: serviceProcess(2, [
      ["Reserve Early", "Our flagship court books fast — reserve ahead for peak hours."],
      ["Check In", "Front desk check-in gets you court-side in minutes."],
      ["Play At Your Best", "Broadcast-quality lighting and sightlines for serious matches."],
    ]),
    duration: "90 min per session",
    imageKey: "[SERVICE_2_IMAGE]",
  },
  {
    number: "03",
    slug: "private-coaching",
    title: "Private Coaching",
    short: "One-on-one sessions with certified padel coaches.",
    detail: "Work one-on-one with a certified Nova Padel coach on the exact parts of your game that need it — technique, strategy, or match-day mental preparation.",
    category: "Coaching",
    benefits: ["Fully personalized game plan", "Certified, experienced coaches", "Flexible scheduling"],
    process: serviceProcess(3, [
      ["Book Your Coach", "Choose Coach Rafael or Coach Isabel based on your goals."],
      ["Assess Your Game", "Your coach identifies the highest-impact areas to improve."],
      ["Train & Track", "Structured drills with progress tracked session to session."],
    ]),
    duration: "60 min per session",
    imageKey: "[SERVICE_3_IMAGE]",
  },
  {
    number: "04",
    slug: "group-clinics",
    title: "Group Clinics",
    short: "Small-group sessions for players building technique together.",
    detail: "Our Group Clinics pair you with players at a similar level for small-group technique work, competitive drills, and match play — a great way to build consistency.",
    category: "Coaching",
    benefits: ["Small-group format", "Level-matched players", "Coach-led drills and match play"],
    process: serviceProcess(4, [
      ["Join A Clinic", "Sign up for a session that fits your level and schedule."],
      ["Train Together", "Small-group drills led by a certified coach."],
      ["Play It Out", "Every clinic ends with supervised match play."],
    ]),
    duration: "75 min per session",
    imageKey: "[SERVICE_4_IMAGE]",
  },
  {
    number: "05",
    slug: "junior-program",
    title: "Junior Program",
    short: "Structured padel development for players under 16.",
    detail: "A structured, ongoing weekly program for players under 16 — building fundamentals, confidence, and a love for the game in a fun, supportive environment.",
    category: "Youth",
    benefits: ["Age-appropriate coaching", "Ongoing weekly development", "Confidence-first approach"],
    process: serviceProcess(5, [
      ["Enroll", "Sign up for our ongoing weekly junior sessions."],
      ["Build Fundamentals", "Coach Isabel leads age-appropriate technique work."],
      ["Keep Progressing", "Weekly sessions build skills and confidence over time."],
    ]),
    duration: "Ongoing weekly sessions",
    imageKey: "[SERVICE_5_IMAGE]",
  },
] as const;

export type Service = (typeof services)[number];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const trustStats = [
  { value: "6", label: "Championship Courts" },
  { value: "500+", label: "Active Members" },
  { value: "4.8★", label: "Member Rating" },
] as { value: string; label: string }[];

export const differentiators = [] as { title: string; copy: string }[];

export const howItWorks = [] as { step: string; title: string; copy: string }[];

export const healthResources = [] as { title: string; excerpt: string; imageKey: string }[];

export const marqueeReviews = [
  { author: "Marco T.", segment: "Member", quote: "Best courts in the city, hands down. The lighting alone is worth it.", rating: 5 },
  { author: "Priya S.", segment: "Group Clinic", quote: "Coach Isabel had my backhand sorted in two sessions.", rating: 5 },
  { author: "Danilo R.", segment: "Member", quote: "The clubhouse lounge makes this feel like a real club, not just courts.", rating: 5 },
] as { author: string; segment: string; quote: string; rating: number }[];

export const faqs = [
  {
    question: "Do I need to bring my own racket?",
    answer: "No — rental rackets are available at the front desk, free for members.",
    category: "General",
  },
  {
    question: "Can I book a court same-day?",
    answer: "Yes, subject to availability — same-day bookings open at 6 AM.",
    category: "Booking",
  },
  {
    question: "Is coaching available for complete beginners?",
    answer: "Yes, our Group Clinics and Junior Program are both beginner-friendly.",
    category: "Coaching",
  },
] as const;

export const staff = [
  {
    name: "Coach Rafael Domingo",
    title: "Advanced Technique & Strategy",
    credentials: "9 Years Experience",
    bio: "Rafael has coached club and national-level players, with a focus on shot precision and match strategy.",
    imageKey: "[STAFF_1_PHOTO]",
    placeholder: false,
  },
  {
    name: "Coach Isabel Cruz",
    title: "Junior & Beginner Development",
    credentials: "6 Years Experience",
    bio: "Isabel specializes in getting new players confident on court fast, with an emphasis on fundamentals and fun.",
    imageKey: "[STAFF_2_PHOTO]",
    placeholder: false,
  },
] as { name: string; title: string; credentials: string; bio: string; imageKey: string; placeholder: boolean }[];

export const emergencyInfo = {
  heading: "[EMERGENCY_HEADING]",
  note: "[EMERGENCY_NOTE]",
  referralLocationName: "[EMERGENCY_REFERRAL_NAME]",
  referralLocationPhone: "[EMERGENCY_REFERRAL_PHONE]",
  referralLocationPhoneDigits: "[EMERGENCY_REFERRAL_PHONE_DIGITS]",
  referralLocationAddress: "[EMERGENCY_REFERRAL_ADDRESS]",
  instructions: "[EMERGENCY_INSTRUCTIONS]",
  placeholder: true,
};

export const paymentInfo = {
  heading: "[PAYMENT_INFO_HEADING]",
  methods: ["Cash", "Credit / Debit Card", "Bank Transfer"],
  insuranceNote: "[PAYMENT_INFO_NOTE]",
};

export const providers = [
  {
    slug: "rafael-domingo",
    name: "Coach Rafael Domingo",
    credentials: "9 Years Experience",
    specialty: "Advanced Technique & Strategy",
    bio: "Rafael has coached club and national-level players, with a focus on shot precision and match strategy.",
    yearsExperience: 9,
    areasOfInterest: ["Match strategy", "Shot precision", "Competitive play prep"],
    imageKey: "[PROVIDER_1_PHOTO]",
    placeholder: false,
  },
  {
    slug: "isabel-cruz",
    name: "Coach Isabel Cruz",
    credentials: "6 Years Experience",
    specialty: "Junior & Beginner Development",
    bio: "Isabel specializes in getting new players confident on court fast, with an emphasis on fundamentals and fun.",
    yearsExperience: 6,
    areasOfInterest: ["Beginner fundamentals", "Junior coaching", "Confidence-building"],
    imageKey: "[PROVIDER_2_PHOTO]",
    placeholder: false,
  },
] as { slug: string; name: string; credentials: string; specialty: string; bio: string; yearsExperience: number; areasOfInterest: string[]; imageKey: string; placeholder: boolean }[];

export type Provider = (typeof providers)[number];

export function getProviderBySlug(slug: string): Provider | undefined {
  return providers.find((provider) => provider.slug === slug);
}

export const articles = [] as { slug: string; title: string; category: string; author: string; date: string; readingTime: string; excerpt: string; body: string[]; imageKey: string; disclaimer: boolean }[];

export type Article = (typeof articles)[number];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export const carePlans = [
  {
    title: "Player Membership",
    subtitle: "Unlimited off-peak court access, 10% off coaching, member rates on gear",
    bullets: ["Unlimited off-peak court access", "10% off all coaching", "Member rates on gear"],
  },
  {
    title: "Elite Membership",
    subtitle: "Unlimited access any time, 2 free coaching sessions/month, guest passes",
    bullets: ["Unlimited access any time", "2 free coaching sessions/month", "Guest passes included"],
  },
] as { title: string; subtitle: string; bullets: string[] }[];

export const newClientSteps = [] as { step: string; title: string; copy: string }[];

export const whatToBring = [] as string[];

export const clinicExperienceFeatures = [] as { title: string; copy: string; imageKey: string }[];

export const clientStories = [] as { clientName: string; segment: string; category: string; story: string; imageKey: string }[];

export const proofStatHighlight = {
  number: "500+",
  label: "Active Members",
};

export const proofCareStats = [] as { value: string; label: string }[];

export const proofPageStories = [] as { label: string; note: string }[];

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
