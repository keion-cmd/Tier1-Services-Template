/**
 * The Tier1 engine's content contract. Every client config in `src/config/clients/*` must
 * satisfy `ClientConfig`. Pages and components never import from `src/config/clients/*`
 * directly — they read through `@/lib/business-content` and `@/data/locations`, which are
 * thin facades over the active client (see `src/config/active-client.ts`).
 */

export type BusinessInfo = {
  name: string;
  shortName: string;
  tagline: string;
  descriptor: string;
  schemaType: string;
  address: string;
  city: string;
  phone: string;
  phoneDigits: string;
  email: string;
  hours: string;
  googleReviewUrl: string;
  mapsUrl: string;
  businessHours: { days: string; hours: string }[];
  socialLinks: { label: string; href: string; placeholder: boolean }[];
};

export type SiteSettings = {
  /** "modal" opens the in-page BookingModal from every CTA; "external" links out to BOOKING_URL. */
  bookingMode: "modal" | "external";
  /** Gates <TemplateSelfPromo /> in Footer.tsx. Must stay false for every real client. */
  isTemplateDemo: boolean;
};

export type SeoConfig = {
  siteOrigin: string;
};

export type SectionVisibility = {
  trustStats: boolean;
  whyChooseUs: boolean;
  meetTheTeam: boolean;
  howItWorks: boolean;
  clinicExperience: boolean;
  reviewsMarquee: boolean;
  clientStories: boolean;
  healthResources: boolean;
  carePlans: boolean;
  faqTeaser: boolean;
  proofStories: boolean;
  proofCareStats: boolean;
  aboutTeamGrid: boolean;
  teamProvidersGrid: boolean;
  providerAreasOfInterest: boolean;
  relatedArticles: boolean;
  locationServicesAndHours: boolean;
};

export type LogoMarqueeGroup = {
  id: string;
  heading: string;
  subheading: string;
  items: { name: string }[];
};

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

export type Provider = {
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
};

export type Location = {
  slug: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  phoneDigits: string;
  email: string;
  mapsUrl: string;
  landmark: string;
  description: string;
  /** Slugs into `services[]` — resolved via getServiceBySlug, not matched by name. */
  serviceSlugs: string[];
  /** Optional slugs into `providers[]` — which team members work at this location. */
  providerSlugs?: string[];
  businessHours: { days: string; hours: string }[];
  imageKey: string;
  /** Optional parking/transit/accessibility notes — answers "how do I actually get there." */
  accessNotes?: string;
};

export type Testimonial = {
  author: string;
  segment: string;
  quote: string;
  rating: number;
  /** Optional slug into `services[]` — replaces free-text service-name matching. */
  serviceSlug?: string;
};

export type Story = {
  clientName: string;
  segment: string;
  category: string;
  story: string;
  imageKey: string;
  /** Optional slug into `services[]` — replaces category-string matching. */
  serviceSlug?: string;
};

export type Article = {
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
};

export type Faq = {
  question: string;
  answer: string;
  category: string;
  /** Optional link to a Service.slug — powers the per-service FAQ section on /services/[slug]. */
  serviceSlug?: string;
};

/** Miscellaneous fixed-shape content collections that don't warrant their own top-level key. */
export type ContentExtras = {
  aboutValues: { title: string; copy: string }[];
  trustStats: { value: string; label: string }[];
  differentiators: { title: string; copy: string; icon?: string }[];
  howItWorks: { step: string; title: string; copy: string; icon?: string }[];
  healthResources: { title: string; excerpt: string; imageKey: string }[];
  carePlans: { title: string; subtitle: string; bullets: string[] }[];
  serviceChoiceSteps: { step: string; title: string; copy: string }[];
  newClientSteps: { step: string; title: string; copy: string }[];
  whatToBring: string[];
  clinicExperienceFeatures: { title: string; copy: string; imageKey: string }[];
  emergencyInfo: {
    heading: string;
    note: string;
    referralLocationName: string;
    referralLocationPhone: string;
    referralLocationPhoneDigits: string;
    referralLocationAddress: string;
    instructions: string;
    placeholder: boolean;
  };
  paymentInfo: { heading: string; methods: string[]; insuranceNote: string };
  proofStatHighlight: { number: string; label: string };
  proofCareStats: { value: string; label: string; description: string }[];
  proofPageStories: { label: string; note: string }[];
  logoMarquees: LogoMarqueeGroup[];
  /** Which logoMarquees group (by id) renders below the Locations section instead of at the top of the homepage. */
  locationsAdjacentMarqueeId: string;
};

/** Every routed page's headline/subheadline copy, keyed by page — every leaf is a string. */
export type PageCopy = {
  home: {
    heroHeadline: string;
    heroSubheadline: string;
    heroStatValue: string;
    heroStatCaption: string;
    heroBadgeText: string;
    trustStatsTitle: string;
    servicesEyebrow: string;
    servicesTitle: string;
    servicesSubtitle: string;
    whyUsEyebrow: string;
    whyUsTitle: string;
    whyUsSubtitle: string;
    teamEyebrow: string;
    teamTitle: string;
    teamSubtitle: string;
    howItWorksEyebrow: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    facilityEyebrow: string;
    facilityTitle: string;
    successStoriesTitle: string;
    reviewsTitle: string;
    reviewsSubtitle: string;
    reviewsLinkLabel: string;
    resourcesEyebrow: string;
    resourcesTitle: string;
    resourcesSubtitle: string;
    resourceCardLabel: string;
    carePlansEyebrow: string;
    carePlansTitle: string;
    faqTeaserEyebrow: string;
    faqTeaserTitle: string;
    faqTeaserSubtitle: string;
    locationEyebrow: string;
    locationTitle: string;
    finalCtaTitle: string;
    finalCtaSubtitle: string;
    leadGenForm: {
      heading: string;
      subheading: string;
      submitButton: string;
      successMessage: string;
      privacyNote: string;
    };
    insuranceCtaPrompt: string;
  };
  about: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    valuesEyebrow: string;
    valuesTitle: string;
    valueLabel: string;
    approachEyebrow: string;
    approachParagraph1: string;
    approachParagraph2: string;
    staffEyebrow: string;
    staffTitle: string;
    exploreEyebrow: string;
    exploreTitle: string;
    exploreTeamLabel: string;
    exploreTeamDescription: string;
    exploreServicesLabel: string;
    exploreServicesDescription: string;
    exploreResourcesLabel: string;
    exploreResourcesDescription: string;
    ctaTitle: string;
  };
  services: {
    heroTitle: string;
    heroSubtitle: string;
    introText: string;
    ctaTitle: string;
    cardLabel: string;
    chooseEyebrow: string;
    chooseTitle: string;
  };
  serviceDetail: {
    benefitsEyebrow: string;
    processEyebrow: string;
    processTitle: string;
  };
  team: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    gridEyebrow: string;
    gridTitle: string;
    ctaTitle: string;
    cultureEyebrow: string;
    cultureBody: string;
  };
  proof: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    statsEyebrow: string;
    statsTitle: string;
    statsCaption: string;
    statCardLabel: string;
    storiesEyebrow: string;
    ctaTitle: string;
    reviewsEyebrow: string;
    reviewsTitleLead: string;
    reviewsTitleAccent: string;
    reviewsBody: string;
    mapsEyebrow: string;
    mapsTitleLead: string;
    mapsTitleAccent: string;
    mapsBody: string;
    mapsCardAriaLabel: string;
    reviewButtonLabel: string;
    mapsHint: string;
  };
  faq: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    contactEyebrow: string;
    contactTitle: string;
    callLabel: string;
    callDescription: string;
    emailLabel: string;
    emailDescription: string;
    ctaTitle: string;
  };
  locations: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    gridEyebrow: string;
    gridTitle: string;
    ctaTitle: string;
  };
  location: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    startTitle: string;
    directionsEyebrow: string;
    directionsTitle: string;
    landmarkLabel: string;
    addressLabel: string;
    hoursEyebrow: string;
    hoursTitle: string;
    emergencyTitle: string;
    referralLabel: string;
    whatToDoLabel: string;
    afterHoursTitle: string;
  };
  resources: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    disclaimerText: string;
    gridEyebrow: string;
    gridTitle: string;
    ctaTitle: string;
  };
  articleDetail: {
    bodyEyebrow: string;
    disclaimerText: string;
    relatedEyebrow: string;
    relatedTitle: string;
    ctaTitle: string;
  };
  successStories: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    gridEyebrow: string;
    gridTitle: string;
    ctaTitle: string;
  };
  contact: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    whyEyebrow: string;
    whyTitle: string;
    methodsEyebrow: string;
    methodsTitle: string;
    formEyebrow: string;
    formTitle: string;
    ctaTitle: string;
  };
  newClients: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    stepsEyebrow: string;
    stepsTitle: string;
    bringEyebrow: string;
    bringTitle: string;
    faqPrompt: string;
    servicesPrompt: string;
    ctaTitle: string;
  };
  notFound: {
    heroTitle: string;
    heroSubtitle: string;
    ctaTitle: string;
  };
  privacyPolicy: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    bodyHeading: string;
    bodyParagraph1: string;
    bodyParagraph2: string;
  };
  termsAndConditions: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    bookingChangesHeading: string;
    bookingChangesBody: string;
    contactingClinicHeading: string;
    contactingClinicBody: string;
  };
  siteShell: {
    footerTagline: string;
    bookingDetailsText: string;
    emailCaptureHeading: string;
    emailCaptureBody: string;
    emailCapturePlaceholder: string;
    emailCaptureSubmitButton: string;
    emailCaptureSuccessMessage: string;
  };
  chat: {
    greetingMessage: string;
    noMatchMessage: string;
    humanHandoffMessage: string;
    leadCaptureOfferMessage: string;
    leadCaptureAskNameMessage: string;
    leadCaptureAskPhoneMessage: string;
    leadCaptureThankYouMessage: string;
    leadCaptureDeclineMessage: string;
    farewellMessage: string;
    windowTitle: string;
    inputPlaceholder: string;
    chatWithLabel: string;
    askPromptMessage: string;
  };
  booking: {
    modalEyebrow: string;
    modalHeadline: string;
    modalSubtext: string;
    successHeadline: string;
    successMessage: string;
  };
};

export type ClientConfig = {
  business: BusinessInfo;
  siteSettings: SiteSettings;
  seo: SeoConfig;
  sectionVisibility: SectionVisibility;
  copy: PageCopy;
  services: Service[];
  providers: Provider[];
  locations: Location[];
  testimonials: Testimonial[];
  stories: Story[];
  resources: Article[];
  faqs: Faq[];
  content: ContentExtras;
};
