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
    servicesTitle: "[SERVICES_SECTION_TITLE]",
    servicesSubtitle: "[SERVICES_SECTION_SUBTITLE]",
    whyUsTitle: "[WHY_US_TITLE]",
    whyUsSubtitle: "[WHY_US_SUBTITLE]",
    teamTitle: "[TEAM_SECTION_TITLE]",
    teamSubtitle: "[TEAM_SECTION_SUBTITLE]",
    howItWorksTitle: "[HOW_IT_WORKS_TITLE]",
    howItWorksSubtitle: "[HOW_IT_WORKS_SUBTITLE]",
    facilityTitle: "[FACILITY_SECTION_TITLE]",
    successStoriesTitle: "[SUCCESS_STORIES_SECTION_TITLE]",
    reviewsTitle: "[REVIEWS_SECTION_TITLE]",
    reviewsSubtitle: "[REVIEWS_SECTION_SUBTITLE]",
    resourcesTitle: "[RESOURCES_SECTION_TITLE]",
    resourcesSubtitle: "[RESOURCES_SECTION_SUBTITLE]",
    carePlansTitle: "[CARE_PLANS_SECTION_TITLE]",
    faqTeaserTitle: "[FAQ_SECTION_TITLE]",
    faqTeaserSubtitle: "[FAQ_SECTION_SUBTITLE]",
    locationTitle: "[LOCATION_SECTION_TITLE]",
    finalCtaTitle: "[FINAL_CTA_TITLE]",
    finalCtaSubtitle: "[FINAL_CTA_SUBTITLE]",
  },
  about: {
    heroTitle: "[ABOUT_HERO_TITLE]",
    heroSubtitle: "[ABOUT_HERO_SUBTITLE]",
    valuesTitle: "[ABOUT_VALUES_TITLE]",
    approachParagraph1: "[ABOUT_APPROACH_PARAGRAPH_1]",
    approachParagraph2: "[ABOUT_APPROACH_PARAGRAPH_2]",
    staffTitle: "[ABOUT_STAFF_TITLE]",
    ctaTitle: "[ABOUT_CTA_TITLE]",
  },
  services: {
    heroTitle: "[SERVICES_HERO_TITLE]",
    heroSubtitle: "[SERVICES_HERO_SUBTITLE]",
    ctaTitle: "[SERVICES_CTA_TITLE]",
  },
  serviceDetail: {
    processTitle: "[SERVICE_PROCESS_TITLE]",
  },
  team: {
    heroTitle: "[TEAM_HERO_TITLE]",
    heroSubtitle: "[TEAM_HERO_SUBTITLE]",
    gridTitle: "[TEAM_GRID_TITLE]",
    ctaTitle: "[TEAM_CTA_TITLE]",
  },
  proof: {
    heroTitle: "[PROOF_HERO_TITLE]",
    heroSubtitle: "[PROOF_HERO_SUBTITLE]",
    statsTitle: "[PROOF_STATS_TITLE]",
    ctaTitle: "[PROOF_CTA_TITLE]",
  },
  faq: {
    heroTitle: "[FAQ_HERO_TITLE]",
    heroSubtitle: "[FAQ_HERO_SUBTITLE]",
    contactTitle: "[FAQ_CONTACT_TITLE]",
    ctaTitle: "[FAQ_CTA_TITLE]",
  },
  location: {
    heroTitle: "[LOCATION_HERO_TITLE]",
    heroSubtitle: "[LOCATION_HERO_SUBTITLE]",
    startTitle: "[LOCATION_START_TITLE]",
    directionsTitle: "[LOCATION_DIRECTIONS_TITLE]",
    hoursTitle: "[LOCATION_HOURS_TITLE]",
    emergencyTitle: "[LOCATION_EMERGENCY_TITLE]",
  },
  resources: {
    heroTitle: "[RESOURCES_HERO_TITLE]",
    heroSubtitle: "[RESOURCES_HERO_SUBTITLE]",
    gridTitle: "[RESOURCES_GRID_TITLE]",
    ctaTitle: "[RESOURCES_CTA_TITLE]",
  },
  articleDetail: {
    relatedTitle: "[ARTICLE_RELATED_TITLE]",
    ctaTitle: "[ARTICLE_CTA_TITLE]",
  },
  newClients: {
    heroTitle: "[NEW_CLIENTS_HERO_TITLE]",
    heroSubtitle: "[NEW_CLIENTS_HERO_SUBTITLE]",
    stepsTitle: "[NEW_CLIENTS_STEPS_TITLE]",
    bringTitle: "[NEW_CLIENTS_BRING_TITLE]",
    ctaTitle: "[NEW_CLIENTS_CTA_TITLE]",
  },
  notFound: {
    heroTitle: "[NOT_FOUND_HERO_TITLE]",
    heroSubtitle: "[NOT_FOUND_HERO_SUBTITLE]",
    ctaTitle: "[NOT_FOUND_CTA_TITLE]",
  },
} as const;

export const aboutValues = [
  { icon: "stethoscope", title: "[ABOUT_VALUE_1_TITLE]", copy: "[ABOUT_VALUE_1_COPY]" },
  { icon: "shield", title: "[ABOUT_VALUE_2_TITLE]", copy: "[ABOUT_VALUE_2_COPY]" },
  { icon: "heart", title: "[ABOUT_VALUE_3_TITLE]", copy: "[ABOUT_VALUE_3_COPY]" },
] as { icon: "stethoscope" | "shield" | "heart"; title: string; copy: string }[];

export const services = [
  {
    number: "01",
    slug: "wellness-exams",
    title: "[SERVICE_1_TITLE]",
    short: "[SERVICE_1_SHORT]",
    detail: "[SERVICE_1_DETAIL]",
    icon: "stethoscope",
    category: "Preventive",
    benefits: ["[SERVICE_1_BENEFIT_1]", "[SERVICE_1_BENEFIT_2]", "[SERVICE_1_BENEFIT_3]"],
    process: ["Intake", "Examination", "Care Plan"],
    duration: "30–45 mins",
    imageKey: "[SERVICE_1_IMAGE]",
  },
  {
    number: "02",
    slug: "prevention-planning",
    title: "[SERVICE_2_TITLE]",
    short: "[SERVICE_2_SHORT]",
    detail: "[SERVICE_2_DETAIL]",
    icon: "shield",
    category: "Preventive",
    benefits: ["[SERVICE_2_BENEFIT_1]", "[SERVICE_2_BENEFIT_2]", "[SERVICE_2_BENEFIT_3]"],
    process: ["Intake", "Risk Review", "Prevention Plan"],
    duration: "20–30 mins",
    imageKey: "[SERVICE_2_IMAGE]",
  },
  {
    number: "03",
    slug: "new-client-care",
    title: "[SERVICE_3_TITLE]",
    short: "[SERVICE_3_SHORT]",
    detail: "[SERVICE_3_DETAIL]",
    icon: "sparkles",
    category: "Preventive",
    benefits: ["[SERVICE_3_BENEFIT_1]", "[SERVICE_3_BENEFIT_2]", "[SERVICE_3_BENEFIT_3]"],
    process: ["Intake", "Early Care Review", "Next Visit Plan"],
    duration: "30–40 mins",
    imageKey: "[SERVICE_3_IMAGE]",
  },
  {
    number: "04",
    slug: "long-term-care",
    title: "[SERVICE_4_TITLE]",
    short: "[SERVICE_4_SHORT]",
    detail: "[SERVICE_4_DETAIL]",
    icon: "heart",
    category: "Preventive",
    benefits: ["[SERVICE_4_BENEFIT_1]", "[SERVICE_4_BENEFIT_2]", "[SERVICE_4_BENEFIT_3]"],
    process: ["Intake", "Change Review", "Care Notes"],
    duration: "30–45 mins",
    imageKey: "[SERVICE_4_IMAGE]",
  },
  {
    number: "05",
    slug: "specialty-care",
    title: "[SERVICE_5_TITLE]",
    short: "[SERVICE_5_SHORT]",
    detail: "[SERVICE_5_DETAIL]",
    icon: "smile",
    category: "Clinical & Specialty",
    benefits: ["[SERVICE_5_BENEFIT_1]", "[SERVICE_5_BENEFIT_2]", "[SERVICE_5_BENEFIT_3]"],
    process: ["Intake", "Overview", "Referral"],
    duration: "20–30 mins",
    imageKey: "[SERVICE_5_IMAGE]",
  },
  {
    number: "06",
    slug: "diagnostics-assessment",
    title: "[SERVICE_6_TITLE]",
    short: "[SERVICE_6_SHORT]",
    detail: "[SERVICE_6_DETAIL]",
    icon: "activity",
    category: "Diagnostics",
    benefits: ["[SERVICE_6_BENEFIT_1]", "[SERVICE_6_BENEFIT_2]", "[SERVICE_6_BENEFIT_3]"],
    process: ["Intake", "Diagnostic Overview", "Recommendation"],
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
  { icon: "heart", title: "[FEATURE_1_TITLE]", copy: "[FEATURE_1_COPY]" },
  { icon: "stethoscope", title: "[FEATURE_2_TITLE]", copy: "[FEATURE_2_COPY]" },
  { icon: "activity", title: "[FEATURE_3_TITLE]", copy: "[FEATURE_3_COPY]" },
  { icon: "shield", title: "[FEATURE_4_TITLE]", copy: "[FEATURE_4_COPY]" },
  { icon: "sparkles", title: "[FEATURE_5_TITLE]", copy: "[FEATURE_5_COPY]" },
  { icon: "smile", title: "[FEATURE_6_TITLE]", copy: "[FEATURE_6_COPY]" },
] as { icon: "heart" | "stethoscope" | "activity" | "shield" | "sparkles" | "smile"; title: string; copy: string }[];

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
  heading: "Emergency & after-hours care",
  note: `${businessConfig.name} provides scheduled care during posted business hours and is not an emergency service provider.`,
  referralLocationName: "[EMERGENCY_LOCATION_NAME]",
  referralLocationPhone: "[EMERGENCY_PHONE]",
  referralLocationPhoneDigits: "[EMERGENCY_PHONE_DIGITS]",
  referralLocationAddress: "[EMERGENCY_ADDRESS]",
  instructions: "If you have a time-sensitive emergency outside our business hours, please contact the referral location above directly rather than waiting for a callback from our office.",
  placeholder: true,
};

export const paymentInfo = {
  heading: "Payment & insurance",
  methods: ["Cash", "Debit and credit cards", "CareCredit financing"],
  insuranceNote: "We don't bill insurance providers directly, but we provide itemized invoices so you can submit a reimbursement claim with your provider.",
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
    title: "Getting Started",
    subtitle: "Early-stage care for a confident start.",
    bullets: ["Structured early wellness visits", "Personalized prevention planning", "Guidance for first-time clients"],
    icon: "sparkles",
  },
  {
    title: "Ongoing Care",
    subtitle: "Steady, routine care that keeps pace with everyday life.",
    bullets: ["Annual wellness check-ins", "Approved prevention pathways", "A clear place to raise everyday questions"],
    icon: "shield",
  },
  {
    title: "Long-Term Care",
    subtitle: "Thoughtful touchpoints for clients moving through later stages.",
    bullets: ["More frequent check-in conversations", "Focus on observable changes over time", "Notes prepared ahead of each visit"],
    icon: "heart",
  },
] as { title: string; subtitle: string; bullets: string[]; icon: "sparkles" | "shield" | "heart" }[];

export const newClientSteps = [
  { step: "01", title: "Tell Us About Your Needs", copy: "Share a few details through our simple visit request form, including what brings you in and any early questions." },
  { step: "02", title: "Meet Your Care Team", copy: "A member of our team greets you and starts an unhurried, welcoming conversation." },
  { step: "03", title: "Complete Your Initial Consultation", copy: "A hands-on visit paced around your comfort, guided by the history and questions you've shared." },
  { step: "04", title: "Discuss Your Care Plan", copy: "The team walks through a clear, realistic next step based on the conversation and visit findings." },
  { step: "05", title: "Schedule Follow-Up Care", copy: "Any recommended follow-up or preventive check-ins are scheduled so your care stays on track." },
] as { step: string; title: string; copy: string }[];

export const whatToBring = [
  "Any previous records or documentation you have on hand",
  "A list of current medications, including dosage if known",
  "Any preparation materials requested ahead of your visit",
  "A written list of questions or observations you'd like to raise",
  "Please arrive a few minutes early to keep the visit calm and unhurried",
] as string[];

export const clinicExperienceFeatures = [
  { title: "Calm Reception", copy: "A quiet, welcoming front desk designed to ease first-visit nerves for every client.", imageKey: "[CLINIC_1_IMAGE]" },
  { title: "Comfortable Consultation Rooms", copy: "Spaces set up for unhurried, hands-on conversations rather than rushed appointments.", imageKey: "[CLINIC_2_IMAGE]" },
  { title: "Modern Diagnostic Equipment", copy: "Approved diagnostic tools that help the team get a clearer picture before recommending next steps.", imageKey: "[CLINIC_3_IMAGE]" },
  { title: "Separate Client-Friendly Spaces", copy: "Thoughtful layout choices that help keep visits low-stress for every client.", imageKey: "[CLINIC_4_IMAGE]" },
  { title: "Caring Staff", copy: "A team that paces every visit around your comfort, not the clock.", imageKey: "[CLINIC_5_IMAGE]" },
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
