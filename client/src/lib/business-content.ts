export const businessConfig = {
  name: "[BUSINESS_NAME]",
  shortName: "[BUSINESS_SHORT_NAME]",
  tagline: "[BUSINESS_TAGLINE]",
  descriptor: "[BUSINESS_TYPE]",
  schemaType: "LocalBusiness",
  address: "[BUSINESS_ADDRESS]",
  city: "[CITY_STATE_ZIP]",
  phone: "[PHONE_NUMBER]",
  phoneDigits: "[PHONE_DIGITS_ONLY]",
  email: "[EMAIL_ADDRESS]",
  hours: "[BUSINESS_HOURS_SUMMARY]",
  googleReviewUrl: "[GOOGLE_REVIEW_DESTINATION_URL]",
  mapsUrl: "[GOOGLE_MAPS_DIRECTIONS_URL]",
  businessHours: [
    { days: "Monday–Friday", hours: "[HOURS_WEEKDAY]" },
    { days: "Saturday", hours: "[HOURS_SATURDAY]" },
    { days: "Sunday", hours: "[HOURS_SUNDAY]" },
  ] as { days: string; hours: string }[],
  // Clearly labelled platform-homepage placeholders for the fictional demo.
  // Replace these with client-approved business-profile URLs before launch.
  socialLinks: [
    { label: "Facebook", href: "https://www.facebook.com/", placeholder: true },
    { label: "Instagram", href: "https://www.instagram.com/", placeholder: true },
  ] as { label: string; href: string; placeholder: boolean }[],
};

/** Backward-compatible alias — prefer `businessConfig` in new code. */
export const clinic = businessConfig;

// Centralized, placeholder-driven section copy. Every routed page pulls its headline and
// subheadline text from here so a clone only has to edit tokens in one place. Add/remove
// nested keys freely if a page gains or loses a section.
export const copy = {
  home: {
    heroHeadline: "[HERO_HEADLINE]",
    heroSubheadline: "[HERO_SUBHEADLINE]",
    heroStatValue: "[HERO_STAT_VALUE]",
    heroStatCaption: "[HERO_STAT_CAPTION]",
    heroBadgeText: "[HERO_BADGE_TEXT]",
    trustStatsTitle: "[TRUST_STATS_SECTION_TITLE]",
    servicesEyebrow: "[SERVICES_SECTION_EYEBROW]",
    servicesTitle: "[SERVICES_SECTION_TITLE]",
    servicesSubtitle: "[SERVICES_SECTION_SUBTITLE]",
    whyUsEyebrow: "[WHY_US_EYEBROW]",
    whyUsTitle: "[WHY_US_TITLE]",
    whyUsSubtitle: "[WHY_US_SUBTITLE]",
    teamEyebrow: "[TEAM_SECTION_EYEBROW]",
    teamTitle: "[TEAM_SECTION_TITLE]",
    teamSubtitle: "[TEAM_SECTION_SUBTITLE]",
    howItWorksEyebrow: "[HOW_IT_WORKS_EYEBROW]",
    howItWorksTitle: "[HOW_IT_WORKS_TITLE]",
    howItWorksSubtitle: "[HOW_IT_WORKS_SUBTITLE]",
    facilityEyebrow: "[FACILITY_SECTION_EYEBROW]",
    facilityTitle: "[FACILITY_SECTION_TITLE]",
    successStoriesTitle: "[SUCCESS_STORIES_SECTION_TITLE]",
    reviewsTitle: "[REVIEWS_SECTION_TITLE]",
    reviewsSubtitle: "[REVIEWS_SECTION_SUBTITLE]",
    resourcesEyebrow: "[RESOURCES_SECTION_EYEBROW]",
    resourcesTitle: "[RESOURCES_SECTION_TITLE]",
    resourcesSubtitle: "[RESOURCES_SECTION_SUBTITLE]",
    resourceCardLabel: "[RESOURCE_CARD_LABEL]",
    carePlansEyebrow: "[CARE_PLANS_SECTION_EYEBROW]",
    carePlansTitle: "[CARE_PLANS_SECTION_TITLE]",
    faqTeaserEyebrow: "[FAQ_SECTION_EYEBROW]",
    faqTeaserTitle: "[FAQ_SECTION_TITLE]",
    faqTeaserSubtitle: "[FAQ_SECTION_SUBTITLE]",
    locationEyebrow: "[LOCATION_SECTION_EYEBROW]",
    locationTitle: "[LOCATION_SECTION_TITLE]",
    finalCtaTitle: "[FINAL_CTA_TITLE]",
    finalCtaSubtitle: "[FINAL_CTA_SUBTITLE]",
    leadGenForm: {
      heading: "[LEAD_FORM_HEADING]",
      subheading: "[LEAD_FORM_SUBHEADING]",
      submitButton: "[LEAD_FORM_CTA]",
      successMessage: "[LEAD_FORM_SUCCESS]",
      privacyNote: "[LEAD_FORM_PRIVACY]",
    },
  },
  about: {
    heroEyebrow: "[ABOUT_HERO_EYEBROW]",
    heroTitle: "[ABOUT_HERO_TITLE]",
    heroSubtitle: "[ABOUT_HERO_SUBTITLE]",
    valuesEyebrow: "[ABOUT_VALUES_EYEBROW]",
    valuesTitle: "[ABOUT_VALUES_TITLE]",
    valueLabel: "[ABOUT_VALUE_LABEL]",
    approachEyebrow: "[ABOUT_APPROACH_EYEBROW]",
    approachParagraph1: "[ABOUT_APPROACH_PARAGRAPH_1]",
    approachParagraph2: "[ABOUT_APPROACH_PARAGRAPH_2]",
    staffEyebrow: "[ABOUT_STAFF_EYEBROW]",
    staffTitle: "[ABOUT_STAFF_TITLE]",
    ctaTitle: "[ABOUT_CTA_TITLE]",
  },
  services: {
    heroTitle: "[SERVICES_HERO_TITLE]",
    heroSubtitle: "[SERVICES_HERO_SUBTITLE]",
    introText: "[SERVICES_INTRO_TEXT]",
    ctaTitle: "[SERVICES_CTA_TITLE]",
  },
  serviceDetail: {
    benefitsEyebrow: "[SERVICE_BENEFITS_EYEBROW]",
    processEyebrow: "[SERVICE_PROCESS_EYEBROW]",
    processTitle: "[SERVICE_PROCESS_TITLE]",
  },
  team: {
    heroEyebrow: "[TEAM_HERO_EYEBROW]",
    heroTitle: "[TEAM_HERO_TITLE]",
    heroSubtitle: "[TEAM_HERO_SUBTITLE]",
    gridEyebrow: "[TEAM_GRID_EYEBROW]",
    gridTitle: "[TEAM_GRID_TITLE]",
    ctaTitle: "[TEAM_CTA_TITLE]",
  },
  proof: {
    heroEyebrow: "[PROOF_HERO_EYEBROW]",
    heroTitle: "[PROOF_HERO_TITLE]",
    heroSubtitle: "[PROOF_HERO_SUBTITLE]",
    statsEyebrow: "[PROOF_STATS_EYEBROW]",
    statsTitle: "[PROOF_STATS_TITLE]",
    statsCaption: "[PROOF_STATS_CAPTION]",
    statCardLabel: "[PROOF_STAT_CARD_LABEL]",
    storiesEyebrow: "[PROOF_STORIES_EYEBROW]",
    ctaTitle: "[PROOF_CTA_TITLE]",
  },
  faq: {
    heroEyebrow: "[FAQ_HERO_EYEBROW]",
    heroTitle: "[FAQ_HERO_TITLE]",
    heroSubtitle: "[FAQ_HERO_SUBTITLE]",
    contactEyebrow: "[FAQ_CONTACT_EYEBROW]",
    contactTitle: "[FAQ_CONTACT_TITLE]",
    callLabel: "[FAQ_CALL_LABEL]",
    callDescription: "[FAQ_CALL_DESCRIPTION]",
    emailLabel: "[FAQ_EMAIL_LABEL]",
    emailDescription: "[FAQ_EMAIL_DESCRIPTION]",
    ctaTitle: "[FAQ_CTA_TITLE]",
  },
  location: {
    heroEyebrow: "[LOCATION_HERO_EYEBROW]",
    heroTitle: "[LOCATION_HERO_TITLE]",
    heroSubtitle: "[LOCATION_HERO_SUBTITLE]",
    startTitle: "[LOCATION_START_TITLE]",
    directionsEyebrow: "[LOCATION_DIRECTIONS_EYEBROW]",
    directionsTitle: "[LOCATION_DIRECTIONS_TITLE]",
    landmarkLabel: "[LOCATION_LANDMARK_LABEL]",
    addressLabel: "[LOCATION_ADDRESS_LABEL]",
    hoursEyebrow: "[LOCATION_HOURS_EYEBROW]",
    hoursTitle: "[LOCATION_HOURS_TITLE]",
    emergencyTitle: "[LOCATION_EMERGENCY_TITLE]",
    referralLabel: "[LOCATION_REFERRAL_LABEL]",
    whatToDoLabel: "[LOCATION_WHAT_TO_DO_LABEL]",
    afterHoursTitle: "[LOCATION_AFTER_HOURS_TITLE]",
  },
  resources: {
    heroEyebrow: "[RESOURCES_HERO_EYEBROW]",
    heroTitle: "[RESOURCES_HERO_TITLE]",
    heroSubtitle: "[RESOURCES_HERO_SUBTITLE]",
    disclaimerText: "[RESOURCES_DISCLAIMER_TEXT]",
    gridEyebrow: "[RESOURCES_GRID_EYEBROW]",
    gridTitle: "[RESOURCES_GRID_TITLE]",
    ctaTitle: "[RESOURCES_CTA_TITLE]",
  },
  articleDetail: {
    bodyEyebrow: "[ARTICLE_BODY_EYEBROW]",
    disclaimerText: "[ARTICLE_DISCLAIMER_TEXT]",
    relatedEyebrow: "[ARTICLE_RELATED_EYEBROW]",
    relatedTitle: "[ARTICLE_RELATED_TITLE]",
    ctaTitle: "[ARTICLE_CTA_TITLE]",
  },
  newClients: {
    heroEyebrow: "[NEW_CLIENTS_HERO_EYEBROW]",
    heroTitle: "[NEW_CLIENTS_HERO_TITLE]",
    heroSubtitle: "[NEW_CLIENTS_HERO_SUBTITLE]",
    stepsEyebrow: "[NEW_CLIENTS_STEPS_EYEBROW]",
    stepsTitle: "[NEW_CLIENTS_STEPS_TITLE]",
    bringEyebrow: "[NEW_CLIENTS_BRING_EYEBROW]",
    bringTitle: "[NEW_CLIENTS_BRING_TITLE]",
    ctaTitle: "[NEW_CLIENTS_CTA_TITLE]",
  },
  notFound: {
    heroTitle: "[NOT_FOUND_HERO_TITLE]",
    heroSubtitle: "[NOT_FOUND_HERO_SUBTITLE]",
    ctaTitle: "[NOT_FOUND_CTA_TITLE]",
  },
  siteShell: {
    footerTagline: "[SITE_FOOTER_TAGLINE]",
    bookingDetailsText: "[SITE_BOOKING_DETAILS_TEXT]",
  },
} as const;

export const aboutValues = [
  { title: "[ABOUT_VALUE_1_TITLE]", copy: "[ABOUT_VALUE_1_COPY]" },
  { title: "[ABOUT_VALUE_2_TITLE]", copy: "[ABOUT_VALUE_2_COPY]" },
  { title: "[ABOUT_VALUE_3_TITLE]", copy: "[ABOUT_VALUE_3_COPY]" },
] as { title: string; copy: string }[];

function serviceProcess(serviceNumber: number) {
  return [
    { step: "01", title: `[SERVICE_${serviceNumber}_PROCESS_STEP_1_TITLE]`, description: `[SERVICE_${serviceNumber}_PROCESS_STEP_1_COPY]` },
    { step: "02", title: `[SERVICE_${serviceNumber}_PROCESS_STEP_2_TITLE]`, description: `[SERVICE_${serviceNumber}_PROCESS_STEP_2_COPY]` },
    { step: "03", title: `[SERVICE_${serviceNumber}_PROCESS_STEP_3_TITLE]`, description: `[SERVICE_${serviceNumber}_PROCESS_STEP_3_COPY]` },
  ];
}

export const services = [
  {
    number: "01",
    slug: "wellness-exams",
    title: "[SERVICE_1_TITLE]",
    short: "[SERVICE_1_SHORT]",
    detail: "[SERVICE_1_DETAIL]",
    category: "Preventive",
    benefits: ["[SERVICE_1_BENEFIT_1]", "[SERVICE_1_BENEFIT_2]", "[SERVICE_1_BENEFIT_3]"],
    process: serviceProcess(1),
    duration: "30–45 mins",
    imageKey: "[SERVICE_1_IMAGE]",
  },
  {
    number: "02",
    slug: "prevention-planning",
    title: "[SERVICE_2_TITLE]",
    short: "[SERVICE_2_SHORT]",
    detail: "[SERVICE_2_DETAIL]",
    category: "Preventive",
    benefits: ["[SERVICE_2_BENEFIT_1]", "[SERVICE_2_BENEFIT_2]", "[SERVICE_2_BENEFIT_3]"],
    process: serviceProcess(2),
    duration: "20–30 mins",
    imageKey: "[SERVICE_2_IMAGE]",
  },
  {
    number: "03",
    slug: "new-client-care",
    title: "[SERVICE_3_TITLE]",
    short: "[SERVICE_3_SHORT]",
    detail: "[SERVICE_3_DETAIL]",
    category: "Preventive",
    benefits: ["[SERVICE_3_BENEFIT_1]", "[SERVICE_3_BENEFIT_2]", "[SERVICE_3_BENEFIT_3]"],
    process: serviceProcess(3),
    duration: "30–40 mins",
    imageKey: "[SERVICE_3_IMAGE]",
  },
  {
    number: "04",
    slug: "long-term-care",
    title: "[SERVICE_4_TITLE]",
    short: "[SERVICE_4_SHORT]",
    detail: "[SERVICE_4_DETAIL]",
    category: "Preventive",
    benefits: ["[SERVICE_4_BENEFIT_1]", "[SERVICE_4_BENEFIT_2]", "[SERVICE_4_BENEFIT_3]"],
    process: serviceProcess(4),
    duration: "30–45 mins",
    imageKey: "[SERVICE_4_IMAGE]",
  },
  {
    number: "05",
    slug: "specialty-care",
    title: "[SERVICE_5_TITLE]",
    short: "[SERVICE_5_SHORT]",
    detail: "[SERVICE_5_DETAIL]",
    category: "Clinical & Specialty",
    benefits: ["[SERVICE_5_BENEFIT_1]", "[SERVICE_5_BENEFIT_2]", "[SERVICE_5_BENEFIT_3]"],
    process: serviceProcess(5),
    duration: "20–30 mins",
    imageKey: "[SERVICE_5_IMAGE]",
  },
  {
    number: "06",
    slug: "diagnostics-assessment",
    title: "[SERVICE_6_TITLE]",
    short: "[SERVICE_6_SHORT]",
    detail: "[SERVICE_6_DETAIL]",
    category: "Diagnostics",
    benefits: ["[SERVICE_6_BENEFIT_1]", "[SERVICE_6_BENEFIT_2]", "[SERVICE_6_BENEFIT_3]"],
    process: serviceProcess(6),
    duration: "45–60 mins",
    imageKey: "[SERVICE_6_IMAGE]",
  },
] as const;

export type Service = (typeof services)[number];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const trustStats = [
  { value: "[STAT_1_VALUE]", label: "[STAT_1_LABEL]" },
  { value: "[STAT_2_VALUE]", label: "[STAT_2_LABEL]" },
  { value: "[STAT_3_VALUE]", label: "[STAT_3_LABEL]" },
  { value: "[STAT_4_VALUE]", label: "[STAT_4_LABEL]" },
] as { value: string; label: string }[];

export const differentiators = [
  { title: "[FEATURE_1_TITLE]", copy: "[FEATURE_1_COPY]" },
  { title: "[FEATURE_2_TITLE]", copy: "[FEATURE_2_COPY]" },
  { title: "[FEATURE_3_TITLE]", copy: "[FEATURE_3_COPY]" },
  { title: "[FEATURE_4_TITLE]", copy: "[FEATURE_4_COPY]" },
  { title: "[FEATURE_5_TITLE]", copy: "[FEATURE_5_COPY]" },
  { title: "[FEATURE_6_TITLE]", copy: "[FEATURE_6_COPY]" },
] as { title: string; copy: string }[];

export const howItWorks = [
  { step: "01", title: "[STEP_1_TITLE]", copy: "[STEP_1_COPY]" },
  { step: "02", title: "[STEP_2_TITLE]", copy: "[STEP_2_COPY]" },
  { step: "03", title: "[STEP_3_TITLE]", copy: "[STEP_3_COPY]" },
  { step: "04", title: "[STEP_4_TITLE]", copy: "[STEP_4_COPY]" },
] as { step: string; title: string; copy: string }[];

export const healthResources = [
  { title: "[RESOURCE_1_TITLE]", excerpt: "[RESOURCE_1_EXCERPT]", imageKey: "[RESOURCE_1_IMAGE]" },
  { title: "[RESOURCE_2_TITLE]", excerpt: "[RESOURCE_2_EXCERPT]", imageKey: "[RESOURCE_2_IMAGE]" },
  { title: "[RESOURCE_3_TITLE]", excerpt: "[RESOURCE_3_EXCERPT]", imageKey: "[RESOURCE_3_IMAGE]" },
] as { title: string; excerpt: string; imageKey: string }[];

export const marqueeReviews = [
  { author: "[CLIENT_NAME_1]", segment: "[CLIENT_SEGMENT_1]", quote: "[CLIENT_REVIEW_QUOTE_1]", rating: 5 },
  { author: "[CLIENT_NAME_2]", segment: "[CLIENT_SEGMENT_2]", quote: "[CLIENT_REVIEW_QUOTE_2]", rating: 5 },
  { author: "[CLIENT_NAME_3]", segment: "[CLIENT_SEGMENT_3]", quote: "[CLIENT_REVIEW_QUOTE_3]", rating: 5 },
  { author: "[CLIENT_NAME_4]", segment: "[CLIENT_SEGMENT_4]", quote: "[CLIENT_REVIEW_QUOTE_4]", rating: 5 },
] as { author: string; segment: string; quote: string; rating: number }[];

export const faqs = [
  { question: "[FAQ_1_QUESTION]", answer: "[FAQ_1_ANSWER]", category: "Requests & visits" },
  { question: "[FAQ_2_QUESTION]", answer: "[FAQ_2_ANSWER]", category: "Requests & visits" },
  { question: "[FAQ_3_QUESTION]", answer: "[FAQ_3_ANSWER]", category: "Requests & visits" },
  { question: "[FAQ_4_QUESTION]", answer: "[FAQ_4_ANSWER]", category: "First visit" },
  { question: "[FAQ_5_QUESTION]", answer: "[FAQ_5_ANSWER]", category: "Emergency" },
  { question: "[FAQ_6_QUESTION]", answer: "[FAQ_6_ANSWER]", category: "Payment & insurance" },
] as const;

export const staff = [
  {
    name: "[STAFF_1_NAME]",
    title: "[STAFF_1_TITLE]",
    credentials: "[CREDENTIALS]",
    bio: "[STAFF_1_BIO]",
    imageKey: "[STAFF_1_PHOTO]",
    placeholder: true,
  },
  {
    name: "[STAFF_2_NAME]",
    title: "[STAFF_2_TITLE]",
    credentials: "[CREDENTIALS]",
    bio: "[STAFF_2_BIO]",
    imageKey: "[STAFF_2_PHOTO]",
    placeholder: true,
  },
  {
    name: "[STAFF_3_NAME]",
    title: "[STAFF_3_TITLE]",
    credentials: "[CREDENTIALS]",
    bio: "[STAFF_3_BIO]",
    imageKey: "[STAFF_3_PHOTO]",
    placeholder: true,
  },
] as { name: string; title: string; credentials: string; bio: string; imageKey: string; placeholder: boolean }[];

export const emergencyInfo = {
  heading: "[EMERGENCY_INFO_HEADING]",
  note: "[EMERGENCY_INFO_NOTE]",
  referralLocationName: "[EMERGENCY_LOCATION_NAME]",
  referralLocationPhone: "[EMERGENCY_PHONE]",
  referralLocationPhoneDigits: "[EMERGENCY_PHONE_DIGITS]",
  referralLocationAddress: "[EMERGENCY_ADDRESS]",
  instructions: "[EMERGENCY_INFO_INSTRUCTIONS]",
  placeholder: true,
};

export const paymentInfo = {
  heading: "[PAYMENT_INFO_HEADING]",
  methods: ["[PAYMENT_METHOD_1]", "[PAYMENT_METHOD_2]", "[PAYMENT_METHOD_3]"],
  insuranceNote: "[PAYMENT_INSURANCE_NOTE]",
};

export const providers = [
  {
    slug: "provider-1",
    name: "[PROVIDER_1_NAME]",
    credentials: "[CREDENTIALS]",
    specialty: "[PROVIDER_1_SPECIALTY]",
    bio: "[PROVIDER_1_BIO]",
    yearsExperience: 9,
    areasOfInterest: ["Client consultations", "New client onboarding", "Client education"],
    imageKey: "[PROVIDER_1_PHOTO]",
    placeholder: true,
  },
  {
    slug: "provider-2",
    name: "[PROVIDER_2_NAME]",
    credentials: "[CREDENTIALS]",
    specialty: "[PROVIDER_2_SPECIALTY]",
    bio: "[PROVIDER_2_BIO]",
    yearsExperience: 12,
    areasOfInterest: ["Diagnostic assessment", "Treatment planning", "Comfort-focused care"],
    imageKey: "[PROVIDER_2_PHOTO]",
    placeholder: true,
  },
  {
    slug: "provider-3",
    name: "[PROVIDER_3_NAME]",
    credentials: "[CREDENTIALS]",
    specialty: "[PROVIDER_3_SPECIALTY]",
    bio: "[PROVIDER_3_BIO]",
    yearsExperience: 7,
    areasOfInterest: ["Preventive care plans", "Long-term client wellness", "Personalized guidance"],
    imageKey: "[PROVIDER_3_PHOTO]",
    placeholder: true,
  },
] as { slug: string; name: string; credentials: string; specialty: string; bio: string; yearsExperience: number; areasOfInterest: string[]; imageKey: string; placeholder: boolean }[];

export type Provider = (typeof providers)[number];

export function getProviderBySlug(slug: string): Provider | undefined {
  return providers.find((provider) => provider.slug === slug);
}

export const articles = [
  {
    slug: "how-often-should-you-schedule-a-visit",
    title: "How Often Should You Schedule a Visit?",
    category: "Client Guide",
    date: "June 2026",
    readingTime: "5 min read",
    excerpt: "A general guide to how routine check-in timing tends to shift as a client relationship matures.",
    body: [
      "One of the most common questions new clients ask is how often a check-in is really needed. The honest answer is that it depends on your individual situation, general needs, and goals, but there are some general patterns worth knowing.",
      "New clients typically benefit from a series of early visits, spaced closely together, to establish a clear baseline. Once that baseline is set, an annual check-in is a common starting point for most steady, ongoing relationships.",
      "Long-term clients, generally those further along in the relationship, often benefit from more frequent visits so that any gradual changes can be noticed sooner rather than later. Your care team can help you figure out what a reasonable schedule looks like for your specific situation.",
      "Between scheduled visits, it's worth paying attention to everyday details relevant to your situation. Noting any changes, even small ones, gives your care team useful context at the next visit.",
      "If you're ever unsure whether something warrants an earlier conversation, it's generally better to ask. A quick call or a scheduled visit request is a simple way to get a clearer answer.",
    ],
    imageKey: "[RESOURCE_1_IMAGE]",
    disclaimer: true,
  },
  {
    slug: "7-signs-you-may-want-to-schedule-a-visit-sooner",
    title: "7 Signs You May Want to Schedule a Visit Sooner",
    category: "Client Guide",
    date: "May 2026",
    readingTime: "6 min read",
    excerpt: "Some general changes and patterns that are worth mentioning at your next visit.",
    body: [
      "It can be tricky to know when something is worth a closer look. Paying attention to gradual shifts in everyday patterns is often more useful than waiting for something more obvious.",
      "Noticeable changes in routine, whether an increase or decrease in usual patterns, are commonly mentioned during visits. The same goes for shifts in day-to-day habits, since these can reflect a range of everyday changes.",
      "A drop in general engagement, more time between check-ins, or a change in how things are going are also patterns clients often bring up. Most people are creatures of habit, so noticeable changes in routine are usually worth a mention.",
      "Changes in overall condition, unusual patterns, or a noticeable shift over time are additional things worth flagging. None of these on their own necessarily mean something serious, but they're useful details for a care conversation.",
      "If you notice any combination of these changes, or simply have a feeling that something is different, it's reasonable to reach out and describe what you're seeing. A conversation with your care team is the best way to get a clear answer.",
    ],
    imageKey: "[RESOURCE_2_IMAGE]",
    disclaimer: true,
  },
  {
    slug: "a-new-clients-guide-to-preventive-care",
    title: "A New Client's Guide to Preventive Care",
    category: "Preventive Care",
    date: "April 2026",
    readingTime: "5 min read",
    excerpt: "A general overview of what preventive care conversations tend to cover for a new client.",
    body: [
      "Getting started with a new provider comes with a long list of questions, and preventive care is often one of the first topics that comes up. In general terms, preventive care is about establishing good habits and a baseline understanding early on.",
      "For most new clients, this starts with an early visit to talk through history, goals, and any early questions a new client might have. From there, a care team can help outline what an approved prevention pathway might look like for that specific situation.",
      "Preventive planning conversations often touch on general wellbeing topics, everyday habits, and the kinds of questions worth raising at future visits. The goal is to keep things proactive rather than reactive whenever possible.",
      "New clients sometimes feel like they should already know all the answers. In reality, most of preventive care is simply about building a relationship with a care team you trust, and asking questions as they come up.",
      "If you've recently become a new client, scheduling that first conversation is a reasonable place to start.",
    ],
    imageKey: "[RESOURCE_3_IMAGE]",
    disclaimer: true,
  },
  {
    slug: "understanding-your-annual-wellness-visit",
    title: "Understanding Your Annual Wellness Visit",
    category: "Wellness",
    date: "March 2026",
    readingTime: "4 min read",
    excerpt: "What a typical annual wellness conversation is generally structured to cover.",
    body: [
      "An annual wellness visit is often described as a checkup, but it's really more of a structured conversation paired with a hands-on look. The idea is to establish a routine baseline that future visits can be compared against.",
      "These visits generally start with a review of your recent history, including everyday habits, goals, and any questions you've been meaning to ask. From there, a closer look helps the care team form a general picture of your current situation.",
      "Depending on your history, a wellness visit may also be a good time to talk through prevention planning or any approved next steps. Nothing is assumed ahead of time; the visit is meant to be a two-way conversation.",
      "Many clients find it helpful to jot down questions or observations beforehand, so nothing gets forgotten once the visit starts. Bringing notes about anything that seems different is generally a good idea.",
      "An annual visit is a reasonable default for most steady, ongoing relationships, though your care team can help you figure out if a different schedule makes more sense.",
    ],
    imageKey: "[RESOURCE_4_IMAGE]",
    disclaimer: true,
  },
  {
    slug: "when-should-you-consider-a-specialty-consultation",
    title: "When Should You Consider a Specialty Consultation?",
    category: "Specialty Care",
    date: "February 2026",
    readingTime: "4 min read",
    excerpt: "General signals that a specialty conversation might be worth having sooner rather than later.",
    body: [
      "Specialty care is one of those topics that's easy to overlook until something prompts a closer look. In general, noticeable changes, ongoing discomfort, or hesitation about a specific concern are the kinds of things worth mentioning at a visit.",
      "Every situation is different, and there's no single answer for how often a specialty conversation should happen. That said, bringing it up during a routine wellness visit is a low-pressure way to get a general sense of what, if anything, might be worth watching.",
      "A specialty conversation is generally meant to walk through options and questions, not to present a fixed plan online. The care team can offer a clearer picture once they've had a chance to take a look in person.",
      "Some clients find it useful to keep a general eye on things between visits, such as noticing any changes in day-to-day patterns. These small observations can be useful context for the care team.",
      "If a specialty concern has been on your mind, mentioning it at your next scheduled visit is a reasonable way to start that conversation.",
    ],
    imageKey: "[RESOURCE_5_IMAGE]",
    disclaimer: true,
  },
] as { slug: string; title: string; category: string; date: string; readingTime: string; excerpt: string; body: string[]; imageKey: string; disclaimer: boolean }[];

export type Article = (typeof articles)[number];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export const carePlans = [
  {
    title: "[PLAN_1_TITLE]",
    subtitle: "[PLAN_1_COPY]",
    bullets: ["[PLAN_1_BULLET_1]", "[PLAN_1_BULLET_2]", "[PLAN_1_BULLET_3]"],
  },
  {
    title: "[PLAN_2_TITLE]",
    subtitle: "[PLAN_2_COPY]",
    bullets: ["[PLAN_2_BULLET_1]", "[PLAN_2_BULLET_2]", "[PLAN_2_BULLET_3]"],
  },
  {
    title: "[PLAN_3_TITLE]",
    subtitle: "[PLAN_3_COPY]",
    bullets: ["[PLAN_3_BULLET_1]", "[PLAN_3_BULLET_2]", "[PLAN_3_BULLET_3]"],
  },
] as { title: string; subtitle: string; bullets: string[] }[];

export const newClientSteps = [
  { step: "01", title: "[NEW_CLIENT_STEP_1_TITLE]", copy: "[NEW_CLIENT_STEP_1_COPY]" },
  { step: "02", title: "[NEW_CLIENT_STEP_2_TITLE]", copy: "[NEW_CLIENT_STEP_2_COPY]" },
  { step: "03", title: "[NEW_CLIENT_STEP_3_TITLE]", copy: "[NEW_CLIENT_STEP_3_COPY]" },
  { step: "04", title: "[NEW_CLIENT_STEP_4_TITLE]", copy: "[NEW_CLIENT_STEP_4_COPY]" },
  { step: "05", title: "[NEW_CLIENT_STEP_5_TITLE]", copy: "[NEW_CLIENT_STEP_5_COPY]" },
] as { step: string; title: string; copy: string }[];

export const whatToBring = [
  "[WHAT_TO_BRING_ITEM_1]",
  "[WHAT_TO_BRING_ITEM_2]",
  "[WHAT_TO_BRING_ITEM_3]",
  "[WHAT_TO_BRING_ITEM_4]",
  "[WHAT_TO_BRING_ITEM_5]",
] as string[];

export const clinicExperienceFeatures = [
  { title: "[EXPERIENCE_FEATURE_1_TITLE]", copy: "[EXPERIENCE_FEATURE_1_COPY]", imageKey: "[CLINIC_1_IMAGE]" },
  { title: "[EXPERIENCE_FEATURE_2_TITLE]", copy: "[EXPERIENCE_FEATURE_2_COPY]", imageKey: "[CLINIC_2_IMAGE]" },
  { title: "[EXPERIENCE_FEATURE_3_TITLE]", copy: "[EXPERIENCE_FEATURE_3_COPY]", imageKey: "[CLINIC_3_IMAGE]" },
  { title: "[EXPERIENCE_FEATURE_4_TITLE]", copy: "[EXPERIENCE_FEATURE_4_COPY]", imageKey: "[CLINIC_4_IMAGE]" },
  { title: "[EXPERIENCE_FEATURE_5_TITLE]", copy: "[EXPERIENCE_FEATURE_5_COPY]", imageKey: "[CLINIC_5_IMAGE]" },
] as { title: string; copy: string; imageKey: string }[];

export const clientStories = [
  {
    clientName: "Max",
    segment: "Long-time client",
    category: "Specialty Care",
    story: "Demo Client Story: Max raised a general question during a routine visit, which led to a calm, informative conversation about his care with the team.",
    imageKey: "[CLIENT_1_PHOTO]",
  },
  {
    clientName: "Luna",
    segment: "New client",
    category: "Wellness & Preventive Care",
    story: "Demo Client Story: Luna's annual wellness visit gave her a clear prevention plan and a better understanding of what to watch for between check-ins.",
    imageKey: "[CLIENT_2_PHOTO]",
  },
  {
    clientName: "Charlie",
    segment: "Referral client",
    category: "Recovery & Follow-Up",
    story: "Demo Client Story: Charlie worked with the team to understand his diagnostic overview and recovery expectations following a scheduled procedure.",
    imageKey: "[CLIENT_3_PHOTO]",
  },
] as { clientName: string; segment: string; category: string; story: string; imageKey: string }[];

const SITE_ORIGIN = "https://tier1-vet-demo.vercel.app";

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
