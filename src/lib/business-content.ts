import { industryBrands } from "@/lib/industryBrands";
import { insuranceProviders } from "@/data/insurance";

export const businessConfig = {
  // "modal" (default) opens the in-page Supabase-backed BookingModal from every CTA.
  // "external" makes every CTA link out to BOOKING_URL (src/lib/booking.ts) instead.
  bookingMode: "modal" as "modal" | "external",
  // Gates <TemplateSelfPromo /> in Footer.tsx (the "this is a template, get one for your
  // business" strip). Must stay false in every clone — only this template's own
  // business-content.ts sets it to true. See CLONE_INSTRUCTIONS.md.
  isTemplateDemo: true,
  name: "[BUSINESS_NAME]",
  shortName: "[BUSINESS_SHORT_NAME]",
  tagline: "[BUSINESS_TAGLINE]",
  descriptor: "[BUSINESS_DESCRIPTOR]",
  schemaType: "LocalBusiness",
  address: "[BUSINESS_ADDRESS]",
  city: "[BUSINESS_CITY]",
  phone: "[BUSINESS_PHONE]",
  phoneDigits: "[BUSINESS_PHONE_DIGITS]",
  email: "[BUSINESS_EMAIL]",
  hours: "[BUSINESS_HOURS_SUMMARY]",
  googleReviewUrl: "https://www.google.com/search?q=[BUSINESS_NAME]+reviews",
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=[BUSINESS_ADDRESS]",
  businessHours: [
    { days: "[HOURS_ROW_1_DAYS]", hours: "[HOURS_ROW_1_HOURS]" },
    { days: "[HOURS_ROW_2_DAYS]", hours: "[HOURS_ROW_2_HOURS]" },
    { days: "[HOURS_ROW_3_DAYS]", hours: "[HOURS_ROW_3_HOURS]" },
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
    heading: "[HOME_INDUSTRY_BRANDS_TITLE]",
    subheading: "[HOME_INDUSTRY_BRANDS_SUBTITLE]",
    items: industryBrands,
  },
  {
    id: "insurance",
    heading: "[HOME_INSURANCE_TITLE]",
    subheading: "[HOME_INSURANCE_SUBTITLE]",
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
    heroHeadline: "[HOME_HERO_HEADLINE]",
    heroSubheadline: "[HOME_HERO_SUBHEADLINE]",
    heroStatValue: "[HOME_HERO_STAT_VALUE]",
    heroStatCaption: "[HOME_HERO_STAT_CAPTION]",
    heroBadgeText: "[HOME_HERO_BADGE_TEXT]",
    trustStatsTitle: "[HOME_TRUST_STATS_TITLE]",
    servicesEyebrow: "[HOME_SERVICES_EYEBROW]",
    servicesTitle: "[HOME_SERVICES_TITLE]",
    servicesSubtitle: "[HOME_SERVICES_SUBTITLE]",
    whyUsEyebrow: "[HOME_WHY_US_EYEBROW]",
    whyUsTitle: "[HOME_WHY_US_TITLE]",
    whyUsSubtitle: "[HOME_WHY_US_SUBTITLE]",
    teamEyebrow: "[HOME_TEAM_EYEBROW]",
    teamTitle: "[HOME_TEAM_TITLE]",
    teamSubtitle: "[HOME_TEAM_SUBTITLE]",
    howItWorksEyebrow: "[HOME_HOW_IT_WORKS_EYEBROW]",
    howItWorksTitle: "[HOME_HOW_IT_WORKS_TITLE]",
    howItWorksSubtitle: "[HOME_HOW_IT_WORKS_SUBTITLE]",
    facilityEyebrow: "[HOME_FACILITY_EYEBROW]",
    facilityTitle: "[HOME_FACILITY_TITLE]",
    successStoriesTitle: "[HOME_SUCCESS_STORIES_TITLE]",
    reviewsTitle: "[HOME_REVIEWS_TITLE]",
    reviewsSubtitle: "[HOME_REVIEWS_SUBTITLE]",
    resourcesEyebrow: "[HOME_RESOURCES_EYEBROW]",
    resourcesTitle: "[HOME_RESOURCES_TITLE]",
    resourcesSubtitle: "[HOME_RESOURCES_SUBTITLE]",
    resourceCardLabel: "[HOME_RESOURCE_CARD_LABEL]",
    carePlansEyebrow: "[HOME_CARE_PLANS_EYEBROW]",
    carePlansTitle: "[HOME_CARE_PLANS_TITLE]",
    faqTeaserEyebrow: "[HOME_FAQ_TEASER_EYEBROW]",
    faqTeaserTitle: "[HOME_FAQ_TEASER_TITLE]",
    faqTeaserSubtitle: "[HOME_FAQ_TEASER_SUBTITLE]",
    locationEyebrow: "[HOME_LOCATION_EYEBROW]",
    locationTitle: "[HOME_LOCATION_TITLE]",
    finalCtaTitle: "[HOME_FINAL_CTA_TITLE]",
    finalCtaSubtitle: "[HOME_FINAL_CTA_SUBTITLE]",
    leadGenForm: {
      heading: "[HOME_LEAD_FORM_HEADING]",
      subheading: "[HOME_LEAD_FORM_SUBHEADING]",
      submitButton: "[HOME_LEAD_FORM_SUBMIT_BUTTON]",
      successMessage: "[HOME_LEAD_FORM_SUCCESS_MESSAGE]",
      privacyNote: "[HOME_LEAD_FORM_PRIVACY_NOTE]",
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
    benefitsEyebrow: "[SERVICE_DETAIL_BENEFITS_EYEBROW]",
    processEyebrow: "[SERVICE_DETAIL_PROCESS_EYEBROW]",
    processTitle: "[SERVICE_DETAIL_PROCESS_TITLE]",
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
    reviewsEyebrow: "[PROOF_REVIEWS_EYEBROW]",
    reviewsTitleLead: "[PROOF_REVIEWS_TITLE_LEAD]",
    reviewsTitleAccent: "[PROOF_REVIEWS_TITLE_ACCENT]",
    reviewsBody: "[PROOF_REVIEWS_BODY]",
    mapsEyebrow: "[PROOF_MAPS_EYEBROW]",
    mapsTitleLead: "[PROOF_MAPS_TITLE_LEAD]",
    mapsTitleAccent: "[PROOF_MAPS_TITLE_ACCENT]",
    mapsBody: "[PROOF_MAPS_BODY]",
    mapsCardAriaLabel: "[PROOF_MAPS_CARD_ARIA_LABEL]",
    reviewButtonLabel: "[PROOF_REVIEW_BUTTON_LABEL]",
    mapsHint: "[PROOF_MAPS_HINT]",
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
  locations: {
    heroEyebrow: "[LOCATIONS_HERO_EYEBROW]",
    heroTitle: "[LOCATIONS_HERO_TITLE]",
    heroSubtitle: "[LOCATIONS_HERO_SUBTITLE]",
    gridEyebrow: "[LOCATIONS_GRID_EYEBROW]",
    gridTitle: "[LOCATIONS_GRID_TITLE]",
    ctaTitle: "[LOCATIONS_CTA_TITLE]",
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
    bodyEyebrow: "[ARTICLE_DETAIL_BODY_EYEBROW]",
    disclaimerText: "[ARTICLE_DETAIL_DISCLAIMER_TEXT]",
    relatedEyebrow: "[ARTICLE_DETAIL_RELATED_EYEBROW]",
    relatedTitle: "[ARTICLE_DETAIL_RELATED_TITLE]",
    ctaTitle: "[ARTICLE_DETAIL_CTA_TITLE]",
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
    footerTagline: "[SITE_SHELL_FOOTER_TAGLINE]",
    bookingDetailsText: "[SITE_SHELL_BOOKING_DETAILS_TEXT]",
    emailCaptureHeading: "[SITE_SHELL_EMAIL_CAPTURE_HEADING]",
    emailCaptureBody: "[SITE_SHELL_EMAIL_CAPTURE_BODY]",
    emailCapturePlaceholder: "[SITE_SHELL_EMAIL_CAPTURE_PLACEHOLDER]",
    emailCaptureSubmitButton: "[SITE_SHELL_EMAIL_CAPTURE_SUBMIT_BUTTON]",
    emailCaptureSuccessMessage: "[SITE_SHELL_EMAIL_CAPTURE_SUCCESS_MESSAGE]",
  },
  chat: {
    greetingMessage: "[CHAT_GREETING_MESSAGE]",
    noMatchMessage: "[CHAT_NO_MATCH_MESSAGE]",
    humanHandoffMessage: "[CHAT_HUMAN_HANDOFF_MESSAGE]",
    leadCaptureOfferMessage: "[CHAT_LEAD_CAPTURE_OFFER_MESSAGE]",
    leadCaptureAskNameMessage: "[CHAT_LEAD_CAPTURE_ASK_NAME_MESSAGE]",
    leadCaptureAskPhoneMessage: "[CHAT_LEAD_CAPTURE_ASK_PHONE_MESSAGE]",
    leadCaptureThankYouMessage: "[CHAT_LEAD_CAPTURE_THANK_YOU_MESSAGE]",
    leadCaptureDeclineMessage: "[CHAT_LEAD_CAPTURE_DECLINE_MESSAGE]",
    farewellMessage: "[CHAT_FAREWELL_MESSAGE]",
    windowTitle: "[CHAT_WINDOW_TITLE]",
    inputPlaceholder: "[CHAT_INPUT_PLACEHOLDER]",
    chatWithLabel: "[CHAT_WITH_LABEL]",
    askPromptMessage: "[CHAT_ASK_PROMPT_MESSAGE]",
  },
  booking: {
    modalEyebrow: "[BOOKING_MODAL_EYEBROW]",
    modalHeadline: "[BOOKING_MODAL_HEADLINE]",
    modalSubtext: "[BOOKING_MODAL_SUBTEXT]",
    successHeadline: "[BOOKING_SUCCESS_HEADLINE]",
    successMessage: "[BOOKING_SUCCESS_MESSAGE]",
  },
} as const;

export const aboutValues = [
  { title: "[ABOUT_VALUE_1_TITLE]", copy: "[ABOUT_VALUE_1_DESCRIPTION]" },
  { title: "[ABOUT_VALUE_2_TITLE]", copy: "[ABOUT_VALUE_2_DESCRIPTION]" },
  { title: "[ABOUT_VALUE_3_TITLE]", copy: "[ABOUT_VALUE_3_DESCRIPTION]" },
  { title: "[ABOUT_VALUE_4_TITLE]", copy: "[ABOUT_VALUE_4_DESCRIPTION]" },
] as { title: string; copy: string }[];

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
    slug: "service-1",
    title: "[SERVICE_1_NAME]",
    short: "[SERVICE_1_SHORT_DESCRIPTION]",
    detail: "[SERVICE_1_DESCRIPTION]",
    category: "Category 1",
    benefits: ["[SERVICE_1_BENEFIT_1]", "[SERVICE_1_BENEFIT_2]", "[SERVICE_1_BENEFIT_3]"],
    process: serviceProcess(1, [
      ["[SERVICE_1_PROCESS_STEP_1_TITLE]", "[SERVICE_1_PROCESS_STEP_1_DESCRIPTION]"],
      ["[SERVICE_1_PROCESS_STEP_2_TITLE]", "[SERVICE_1_PROCESS_STEP_2_DESCRIPTION]"],
      ["[SERVICE_1_PROCESS_STEP_3_TITLE]", "[SERVICE_1_PROCESS_STEP_3_DESCRIPTION]"],
    ]),
    duration: "[SERVICE_1_DURATION]",
    imageKey: "[SERVICE_1_IMAGE]",
  },
  {
    number: "02",
    slug: "service-2",
    title: "[SERVICE_2_NAME]",
    short: "[SERVICE_2_SHORT_DESCRIPTION]",
    detail: "[SERVICE_2_DESCRIPTION]",
    category: "Category 2",
    benefits: ["[SERVICE_2_BENEFIT_1]", "[SERVICE_2_BENEFIT_2]", "[SERVICE_2_BENEFIT_3]"],
    process: serviceProcess(2, [
      ["[SERVICE_2_PROCESS_STEP_1_TITLE]", "[SERVICE_2_PROCESS_STEP_1_DESCRIPTION]"],
      ["[SERVICE_2_PROCESS_STEP_2_TITLE]", "[SERVICE_2_PROCESS_STEP_2_DESCRIPTION]"],
      ["[SERVICE_2_PROCESS_STEP_3_TITLE]", "[SERVICE_2_PROCESS_STEP_3_DESCRIPTION]"],
    ]),
    duration: "[SERVICE_2_DURATION]",
    imageKey: "[SERVICE_2_IMAGE]",
  },
  {
    number: "03",
    slug: "service-3",
    title: "[SERVICE_3_NAME]",
    short: "[SERVICE_3_SHORT_DESCRIPTION]",
    detail: "[SERVICE_3_DESCRIPTION]",
    category: "Category 3",
    benefits: ["[SERVICE_3_BENEFIT_1]", "[SERVICE_3_BENEFIT_2]", "[SERVICE_3_BENEFIT_3]"],
    process: serviceProcess(3, [
      ["[SERVICE_3_PROCESS_STEP_1_TITLE]", "[SERVICE_3_PROCESS_STEP_1_DESCRIPTION]"],
      ["[SERVICE_3_PROCESS_STEP_2_TITLE]", "[SERVICE_3_PROCESS_STEP_2_DESCRIPTION]"],
      ["[SERVICE_3_PROCESS_STEP_3_TITLE]", "[SERVICE_3_PROCESS_STEP_3_DESCRIPTION]"],
    ]),
    duration: "[SERVICE_3_DURATION]",
    imageKey: "[SERVICE_3_IMAGE]",
  },
  {
    number: "04",
    slug: "service-4",
    title: "[SERVICE_4_NAME]",
    short: "[SERVICE_4_SHORT_DESCRIPTION]",
    detail: "[SERVICE_4_DESCRIPTION]",
    category: "Category 3",
    benefits: ["[SERVICE_4_BENEFIT_1]", "[SERVICE_4_BENEFIT_2]", "[SERVICE_4_BENEFIT_3]"],
    process: serviceProcess(4, [
      ["[SERVICE_4_PROCESS_STEP_1_TITLE]", "[SERVICE_4_PROCESS_STEP_1_DESCRIPTION]"],
      ["[SERVICE_4_PROCESS_STEP_2_TITLE]", "[SERVICE_4_PROCESS_STEP_2_DESCRIPTION]"],
      ["[SERVICE_4_PROCESS_STEP_3_TITLE]", "[SERVICE_4_PROCESS_STEP_3_DESCRIPTION]"],
    ]),
    duration: "[SERVICE_4_DURATION]",
    imageKey: "[SERVICE_4_IMAGE]",
  },
  {
    number: "05",
    slug: "service-5",
    title: "[SERVICE_5_NAME]",
    short: "[SERVICE_5_SHORT_DESCRIPTION]",
    detail: "[SERVICE_5_DESCRIPTION]",
    category: "Category 2",
    benefits: ["[SERVICE_5_BENEFIT_1]", "[SERVICE_5_BENEFIT_2]", "[SERVICE_5_BENEFIT_3]"],
    process: serviceProcess(5, [
      ["[SERVICE_5_PROCESS_STEP_1_TITLE]", "[SERVICE_5_PROCESS_STEP_1_DESCRIPTION]"],
      ["[SERVICE_5_PROCESS_STEP_2_TITLE]", "[SERVICE_5_PROCESS_STEP_2_DESCRIPTION]"],
      ["[SERVICE_5_PROCESS_STEP_3_TITLE]", "[SERVICE_5_PROCESS_STEP_3_DESCRIPTION]"],
    ]),
    duration: "[SERVICE_5_DURATION]",
    imageKey: "[SERVICE_5_IMAGE]",
  },
  {
    number: "06",
    slug: "service-6",
    title: "[SERVICE_6_NAME]",
    short: "[SERVICE_6_SHORT_DESCRIPTION]",
    detail: "[SERVICE_6_DESCRIPTION]",
    category: "Category 4",
    benefits: ["[SERVICE_6_BENEFIT_1]", "[SERVICE_6_BENEFIT_2]", "[SERVICE_6_BENEFIT_3]"],
    process: serviceProcess(6, [
      ["[SERVICE_6_PROCESS_STEP_1_TITLE]", "[SERVICE_6_PROCESS_STEP_1_DESCRIPTION]"],
      ["[SERVICE_6_PROCESS_STEP_2_TITLE]", "[SERVICE_6_PROCESS_STEP_2_DESCRIPTION]"],
      ["[SERVICE_6_PROCESS_STEP_3_TITLE]", "[SERVICE_6_PROCESS_STEP_3_DESCRIPTION]"],
    ]),
    duration: "[SERVICE_6_DURATION]",
    imageKey: "[SERVICE_6_IMAGE]",
  },
  {
    number: "07",
    slug: "service-7",
    title: "[SERVICE_7_NAME]",
    short: "[SERVICE_7_SHORT_DESCRIPTION]",
    detail: "[SERVICE_7_DESCRIPTION]",
    category: "Category 3",
    benefits: ["[SERVICE_7_BENEFIT_1]", "[SERVICE_7_BENEFIT_2]", "[SERVICE_7_BENEFIT_3]"],
    process: serviceProcess(7, [
      ["[SERVICE_7_PROCESS_STEP_1_TITLE]", "[SERVICE_7_PROCESS_STEP_1_DESCRIPTION]"],
      ["[SERVICE_7_PROCESS_STEP_2_TITLE]", "[SERVICE_7_PROCESS_STEP_2_DESCRIPTION]"],
      ["[SERVICE_7_PROCESS_STEP_3_TITLE]", "[SERVICE_7_PROCESS_STEP_3_DESCRIPTION]"],
    ]),
    duration: "[SERVICE_7_DURATION]",
    imageKey: "[SERVICE_7_IMAGE]",
  },
  {
    number: "08",
    slug: "service-8",
    title: "[SERVICE_8_NAME]",
    short: "[SERVICE_8_SHORT_DESCRIPTION]",
    detail: "[SERVICE_8_DESCRIPTION]",
    category: "Category 2",
    benefits: ["[SERVICE_8_BENEFIT_1]", "[SERVICE_8_BENEFIT_2]", "[SERVICE_8_BENEFIT_3]"],
    process: serviceProcess(8, [
      ["[SERVICE_8_PROCESS_STEP_1_TITLE]", "[SERVICE_8_PROCESS_STEP_1_DESCRIPTION]"],
      ["[SERVICE_8_PROCESS_STEP_2_TITLE]", "[SERVICE_8_PROCESS_STEP_2_DESCRIPTION]"],
      ["[SERVICE_8_PROCESS_STEP_3_TITLE]", "[SERVICE_8_PROCESS_STEP_3_DESCRIPTION]"],
    ]),
    duration: "[SERVICE_8_DURATION]",
    imageKey: "[SERVICE_8_IMAGE]",
  },
  {
    number: "09",
    slug: "service-9",
    title: "[SERVICE_9_NAME]",
    short: "[SERVICE_9_SHORT_DESCRIPTION]",
    detail: "[SERVICE_9_DESCRIPTION]",
    category: "Category 5",
    benefits: ["[SERVICE_9_BENEFIT_1]", "[SERVICE_9_BENEFIT_2]", "[SERVICE_9_BENEFIT_3]"],
    process: serviceProcess(9, [
      ["[SERVICE_9_PROCESS_STEP_1_TITLE]", "[SERVICE_9_PROCESS_STEP_1_DESCRIPTION]"],
      ["[SERVICE_9_PROCESS_STEP_2_TITLE]", "[SERVICE_9_PROCESS_STEP_2_DESCRIPTION]"],
      ["[SERVICE_9_PROCESS_STEP_3_TITLE]", "[SERVICE_9_PROCESS_STEP_3_DESCRIPTION]"],
    ]),
    duration: "[SERVICE_9_DURATION]",
    imageKey: "[SERVICE_9_IMAGE]",
  },
] as const;

export type Service = (typeof services)[number];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const trustStats = [
  { value: "[TRUST_STAT_1_VALUE]", label: "[TRUST_STAT_1_LABEL]" },
  { value: "[TRUST_STAT_2_VALUE]", label: "[TRUST_STAT_2_LABEL]" },
  { value: "[TRUST_STAT_3_VALUE]", label: "[TRUST_STAT_3_LABEL]" },
  { value: "[TRUST_STAT_4_VALUE]", label: "[TRUST_STAT_4_LABEL]" },
  { value: "[TRUST_STAT_5_VALUE]", label: "[TRUST_STAT_5_LABEL]" },
] as { value: string; label: string }[];

export const differentiators = [
  { title: "[DIFFERENTIATOR_1_TITLE]", copy: "[DIFFERENTIATOR_1_DESCRIPTION]" },
  { title: "[DIFFERENTIATOR_2_TITLE]", copy: "[DIFFERENTIATOR_2_DESCRIPTION]" },
  { title: "[DIFFERENTIATOR_3_TITLE]", copy: "[DIFFERENTIATOR_3_DESCRIPTION]" },
  { title: "[DIFFERENTIATOR_4_TITLE]", copy: "[DIFFERENTIATOR_4_DESCRIPTION]" },
  { title: "[DIFFERENTIATOR_5_TITLE]", copy: "[DIFFERENTIATOR_5_DESCRIPTION]" },
  { title: "[DIFFERENTIATOR_6_TITLE]", copy: "[DIFFERENTIATOR_6_DESCRIPTION]" },
] as { title: string; copy: string }[];

export const howItWorks = [
  { step: "01", title: "[HOW_IT_WORKS_STEP_1_TITLE]", copy: "[HOW_IT_WORKS_STEP_1_DESCRIPTION]" },
  { step: "02", title: "[HOW_IT_WORKS_STEP_2_TITLE]", copy: "[HOW_IT_WORKS_STEP_2_DESCRIPTION]" },
  { step: "03", title: "[HOW_IT_WORKS_STEP_3_TITLE]", copy: "[HOW_IT_WORKS_STEP_3_DESCRIPTION]" },
  { step: "04", title: "[HOW_IT_WORKS_STEP_4_TITLE]", copy: "[HOW_IT_WORKS_STEP_4_DESCRIPTION]" },
] as { step: string; title: string; copy: string }[];

export const healthResources = [
  {
    title: "[RESOURCE_1_TITLE]",
    excerpt: "[RESOURCE_1_EXCERPT]",
    imageKey: "[RESOURCE_1_IMAGE]",
  },
  {
    title: "[RESOURCE_2_TITLE]",
    excerpt: "[RESOURCE_2_EXCERPT]",
    imageKey: "[RESOURCE_2_IMAGE]",
  },
  {
    title: "[RESOURCE_3_TITLE]",
    excerpt: "[RESOURCE_3_EXCERPT]",
    imageKey: "[RESOURCE_3_IMAGE]",
  },
] as { title: string; excerpt: string; imageKey: string }[];

export const marqueeReviews = [
  { author: "[REVIEW_1_AUTHOR]", segment: "[REVIEW_1_SEGMENT]", quote: "[REVIEW_1_QUOTE]", rating: 5 },
  { author: "[REVIEW_2_AUTHOR]", segment: "[REVIEW_2_SEGMENT]", quote: "[REVIEW_2_QUOTE]", rating: 5 },
  { author: "[REVIEW_3_AUTHOR]", segment: "[REVIEW_3_SEGMENT]", quote: "[REVIEW_3_QUOTE]", rating: 5 },
  { author: "[REVIEW_4_AUTHOR]", segment: "[REVIEW_4_SEGMENT]", quote: "[REVIEW_4_QUOTE]", rating: 5 },
  { author: "[REVIEW_5_AUTHOR]", segment: "[REVIEW_5_SEGMENT]", quote: "[REVIEW_5_QUOTE]", rating: 5 },
] as { author: string; segment: string; quote: string; rating: number }[];

export const faqs = [
  {
    question: "[FAQ_1_QUESTION]",
    answer: "[FAQ_1_ANSWER]",
    category: "Requests & visits",
  },
  {
    question: "[FAQ_2_QUESTION]",
    answer: "[FAQ_2_ANSWER]",
    category: "Emergency",
  },
  {
    question: "[FAQ_3_QUESTION]",
    answer: "[FAQ_3_ANSWER]",
    category: "Requests & visits",
  },
  {
    question: "[FAQ_4_QUESTION]",
    answer: "[FAQ_4_ANSWER]",
    category: "Requests & visits",
  },
  {
    question: "[FAQ_5_QUESTION]",
    answer: "[FAQ_5_ANSWER]",
    category: "Requests & visits",
  },
  {
    question: "[FAQ_6_QUESTION]",
    answer: "[FAQ_6_ANSWER]",
    category: "Requests & visits",
  },
  {
    question: "[FAQ_7_QUESTION]",
    answer: "[FAQ_7_ANSWER]",
    category: "Payment & insurance",
  },
  {
    question: "[FAQ_8_QUESTION]",
    answer: "[FAQ_8_ANSWER]",
    category: "First visit",
  },
] as const;

export const staff = [
  {
    name: "[STAFF_1_NAME]",
    title: "[STAFF_1_TITLE]",
    credentials: "[STAFF_1_CREDENTIALS]",
    bio: "[STAFF_1_BIO]",
    imageKey: "[STAFF_1_PHOTO]",
    placeholder: true,
  },
  {
    name: "[STAFF_2_NAME]",
    title: "[STAFF_2_TITLE]",
    credentials: "[STAFF_2_CREDENTIALS]",
    bio: "[STAFF_2_BIO]",
    imageKey: "[STAFF_2_PHOTO]",
    placeholder: true,
  },
  {
    name: "[STAFF_3_NAME]",
    title: "[STAFF_3_TITLE]",
    credentials: "[STAFF_3_CREDENTIALS]",
    bio: "[STAFF_3_BIO]",
    imageKey: "[STAFF_3_PHOTO]",
    placeholder: true,
  },
  {
    name: "[STAFF_4_NAME]",
    title: "[STAFF_4_TITLE]",
    credentials: "[STAFF_4_CREDENTIALS]",
    bio: "[STAFF_4_BIO]",
    imageKey: "[STAFF_4_PHOTO]",
    placeholder: true,
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
    slug: "provider-1",
    name: "[PROVIDER_1_NAME]",
    credentials: "[PROVIDER_1_CREDENTIALS]",
    specialty: "[PROVIDER_1_SPECIALTY]",
    bio: "[PROVIDER_1_BIO]",
    yearsExperience: 12,
    areasOfInterest: ["[PROVIDER_1_INTEREST_1]", "[PROVIDER_1_INTEREST_2]", "[PROVIDER_1_INTEREST_3]"],
    imageKey: "[PROVIDER_1_PHOTO]",
    placeholder: true,
  },
  {
    slug: "provider-2",
    name: "[PROVIDER_2_NAME]",
    credentials: "[PROVIDER_2_CREDENTIALS]",
    specialty: "[PROVIDER_2_SPECIALTY]",
    bio: "[PROVIDER_2_BIO]",
    yearsExperience: 10,
    areasOfInterest: ["[PROVIDER_2_INTEREST_1]", "[PROVIDER_2_INTEREST_2]", "[PROVIDER_2_INTEREST_3]"],
    imageKey: "[PROVIDER_2_PHOTO]",
    placeholder: true,
  },
  {
    slug: "provider-3",
    name: "[PROVIDER_3_NAME]",
    credentials: "[PROVIDER_3_CREDENTIALS]",
    specialty: "[PROVIDER_3_SPECIALTY]",
    bio: "[PROVIDER_3_BIO]",
    yearsExperience: 6,
    areasOfInterest: ["[PROVIDER_3_INTEREST_1]", "[PROVIDER_3_INTEREST_2]", "[PROVIDER_3_INTEREST_3]"],
    imageKey: "[PROVIDER_3_PHOTO]",
    placeholder: true,
  },
  {
    slug: "provider-4",
    name: "[PROVIDER_4_NAME]",
    credentials: "[PROVIDER_4_CREDENTIALS]",
    specialty: "[PROVIDER_4_SPECIALTY]",
    bio: "[PROVIDER_4_BIO]",
    yearsExperience: 8,
    areasOfInterest: ["[PROVIDER_4_INTEREST_1]", "[PROVIDER_4_INTEREST_2]", "[PROVIDER_4_INTEREST_3]"],
    imageKey: "[PROVIDER_4_PHOTO]",
    placeholder: true,
  },
] as { slug: string; name: string; credentials: string; specialty: string; bio: string; yearsExperience: number; areasOfInterest: string[]; imageKey: string; placeholder: boolean }[];

export type Provider = (typeof providers)[number];

export function getProviderBySlug(slug: string): Provider | undefined {
  return providers.find((provider) => provider.slug === slug);
}

export const articles = [
  {
    slug: "article-1",
    title: "[ARTICLE_1_TITLE]",
    category: "[ARTICLE_1_CATEGORY]",
    author: "[ARTICLE_1_AUTHOR]",
    date: "[ARTICLE_1_DATE]",
    readingTime: "[ARTICLE_1_READING_TIME]",
    excerpt: "[ARTICLE_1_EXCERPT]",
    body: [
      "[ARTICLE_1_BODY_PARAGRAPH_1]",
      "[ARTICLE_1_BODY_PARAGRAPH_2]",
      "[ARTICLE_1_BODY_PARAGRAPH_3]",
      "[ARTICLE_1_BODY_PARAGRAPH_4]",
      "[ARTICLE_1_BODY_PARAGRAPH_5]",
    ],
    imageKey: "[RESOURCE_1_IMAGE]",
    disclaimer: true,
  },
  {
    slug: "article-2",
    title: "[ARTICLE_2_TITLE]",
    category: "[ARTICLE_2_CATEGORY]",
    author: "[ARTICLE_2_AUTHOR]",
    date: "[ARTICLE_2_DATE]",
    readingTime: "[ARTICLE_2_READING_TIME]",
    excerpt: "[ARTICLE_2_EXCERPT]",
    body: [
      "[ARTICLE_2_BODY_PARAGRAPH_1]",
      "[ARTICLE_2_BODY_PARAGRAPH_2]",
      "[ARTICLE_2_BODY_PARAGRAPH_3]",
      "[ARTICLE_2_BODY_PARAGRAPH_4]",
      "[ARTICLE_2_BODY_PARAGRAPH_5]",
    ],
    imageKey: "[RESOURCE_2_IMAGE]",
    disclaimer: true,
  },
  {
    slug: "article-3",
    title: "[ARTICLE_3_TITLE]",
    category: "[ARTICLE_3_CATEGORY]",
    author: "[ARTICLE_3_AUTHOR]",
    date: "[ARTICLE_3_DATE]",
    readingTime: "[ARTICLE_3_READING_TIME]",
    excerpt: "[ARTICLE_3_EXCERPT]",
    body: [
      "[ARTICLE_3_BODY_PARAGRAPH_1]",
      "[ARTICLE_3_BODY_PARAGRAPH_2]",
      "[ARTICLE_3_BODY_PARAGRAPH_3]",
      "[ARTICLE_3_BODY_PARAGRAPH_4]",
      "[ARTICLE_3_BODY_PARAGRAPH_5]",
    ],
    imageKey: "[RESOURCE_3_IMAGE]",
    disclaimer: true,
  },
  {
    slug: "article-4",
    title: "[ARTICLE_4_TITLE]",
    category: "[ARTICLE_4_CATEGORY]",
    author: "[ARTICLE_4_AUTHOR]",
    date: "[ARTICLE_4_DATE]",
    readingTime: "[ARTICLE_4_READING_TIME]",
    excerpt: "[ARTICLE_4_EXCERPT]",
    body: [
      "[ARTICLE_4_BODY_PARAGRAPH_1]",
      "[ARTICLE_4_BODY_PARAGRAPH_2]",
      "[ARTICLE_4_BODY_PARAGRAPH_3]",
      "[ARTICLE_4_BODY_PARAGRAPH_4]",
      "[ARTICLE_4_BODY_PARAGRAPH_5]",
    ],
    imageKey: "[RESOURCE_4_IMAGE]",
    disclaimer: true,
  },
] as { slug: string; title: string; category: string; author: string; date: string; readingTime: string; excerpt: string; body: string[]; imageKey: string; disclaimer: boolean }[];

export type Article = (typeof articles)[number];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export const carePlans = [
  {
    title: "[CARE_PLAN_1_TITLE]",
    subtitle: "[CARE_PLAN_1_SUBTITLE]",
    bullets: ["[CARE_PLAN_1_BULLET_1]", "[CARE_PLAN_1_BULLET_2]", "[CARE_PLAN_1_BULLET_3]"],
  },
  {
    title: "[CARE_PLAN_2_TITLE]",
    subtitle: "[CARE_PLAN_2_SUBTITLE]",
    bullets: ["[CARE_PLAN_2_BULLET_1]", "[CARE_PLAN_2_BULLET_2]", "[CARE_PLAN_2_BULLET_3]", "[CARE_PLAN_2_BULLET_4]"],
  },
  {
    title: "[CARE_PLAN_3_TITLE]",
    subtitle: "[CARE_PLAN_3_SUBTITLE]",
    bullets: ["[CARE_PLAN_3_BULLET_1]", "[CARE_PLAN_3_BULLET_2]", "[CARE_PLAN_3_BULLET_3]", "[CARE_PLAN_3_BULLET_4]"],
  },
] as { title: string; subtitle: string; bullets: string[] }[];

export const newClientSteps = [
  { step: "01", title: "[NEW_CLIENT_STEP_1_TITLE]", copy: "[NEW_CLIENT_STEP_1_DESCRIPTION]" },
  { step: "02", title: "[NEW_CLIENT_STEP_2_TITLE]", copy: "[NEW_CLIENT_STEP_2_DESCRIPTION]" },
  { step: "03", title: "[NEW_CLIENT_STEP_3_TITLE]", copy: "[NEW_CLIENT_STEP_3_DESCRIPTION]" },
  { step: "04", title: "[NEW_CLIENT_STEP_4_TITLE]", copy: "[NEW_CLIENT_STEP_4_DESCRIPTION]" },
  { step: "05", title: "[NEW_CLIENT_STEP_5_TITLE]", copy: "[NEW_CLIENT_STEP_5_DESCRIPTION]" },
] as { step: string; title: string; copy: string }[];

export const whatToBring = [
  "[WHAT_TO_BRING_ITEM_1]",
  "[WHAT_TO_BRING_ITEM_2]",
  "[WHAT_TO_BRING_ITEM_3]",
  "[WHAT_TO_BRING_ITEM_4]",
  "[WHAT_TO_BRING_ITEM_5]",
] as string[];

export const clinicExperienceFeatures = [
  { title: "[EXPERIENCE_FEATURE_1_TITLE]", copy: "[EXPERIENCE_FEATURE_1_DESCRIPTION]", imageKey: "[CLINIC_1_IMAGE]" },
  { title: "[EXPERIENCE_FEATURE_2_TITLE]", copy: "[EXPERIENCE_FEATURE_2_DESCRIPTION]", imageKey: "[CLINIC_2_IMAGE]" },
  { title: "[EXPERIENCE_FEATURE_3_TITLE]", copy: "[EXPERIENCE_FEATURE_3_DESCRIPTION]", imageKey: "[CLINIC_3_IMAGE]" },
  { title: "[EXPERIENCE_FEATURE_4_TITLE]", copy: "[EXPERIENCE_FEATURE_4_DESCRIPTION]", imageKey: "[CLINIC_4_IMAGE]" },
  { title: "[EXPERIENCE_FEATURE_5_TITLE]", copy: "[EXPERIENCE_FEATURE_5_DESCRIPTION]", imageKey: "[CLINIC_5_IMAGE]" },
] as { title: string; copy: string; imageKey: string }[];

export const clientStories = [
  {
    clientName: "[CLIENT_STORY_1_NAME]",
    segment: "[CLIENT_STORY_1_SEGMENT]",
    category: "[CLIENT_STORY_1_CATEGORY]",
    story: "[CLIENT_STORY_1_TEXT]",
    imageKey: "[CLIENT_1_PHOTO]",
  },
  {
    clientName: "[CLIENT_STORY_2_NAME]",
    segment: "[CLIENT_STORY_2_SEGMENT]",
    category: "[CLIENT_STORY_2_CATEGORY]",
    story: "[CLIENT_STORY_2_TEXT]",
    imageKey: "[CLIENT_2_PHOTO]",
  },
  {
    clientName: "[CLIENT_STORY_3_NAME]",
    segment: "[CLIENT_STORY_3_SEGMENT]",
    category: "[CLIENT_STORY_3_CATEGORY]",
    story: "[CLIENT_STORY_3_TEXT]",
    imageKey: "[CLIENT_3_PHOTO]",
  },
] as { clientName: string; segment: string; category: string; story: string; imageKey: string }[];

export const proofStatHighlight = {
  number: "[PROOF_STAT_HIGHLIGHT_NUMBER]",
  label: "[PROOF_STAT_HIGHLIGHT_LABEL]",
};

export const proofCareStats = [
  { value: "[PROOF_STAT_1_VALUE]", label: "[PROOF_STAT_1_LABEL]" },
  { value: "[PROOF_STAT_2_VALUE]", label: "[PROOF_STAT_2_LABEL]" },
  { value: "[PROOF_STAT_3_VALUE]", label: "[PROOF_STAT_3_LABEL]" },
] as { value: string; label: string }[];

export const proofPageStories = [
  { label: "[PROOF_STORY_1_LABEL]", note: "[PROOF_STORY_1_NOTE]" },
  { label: "[PROOF_STORY_2_LABEL]", note: "[PROOF_STORY_2_NOTE]" },
  { label: "[PROOF_STORY_3_LABEL]", note: "[PROOF_STORY_3_NOTE]" },
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
