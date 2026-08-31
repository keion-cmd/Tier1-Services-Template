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
  name: "Amberlyn Home Renovation & Design Studio",
  shortName: "Amberlyn Studio",
  tagline: "Whole-Home Renovation, Designed Around How You Actually Live",
  descriptor: "Home Renovation & Design Studio",
  schemaType: "LocalBusiness",
  address: "482 Foundry Row, Ashford Mills, OR 97045",
  city: "Ashford Mills, OR",
  phone: "(503) 555-0148",
  phoneDigits: "5035550148",
  email: "hello@amberlynstudio.com",
  hours: "Mon–Fri 8a–6p, Sat 9a–2p",
  googleReviewUrl: "https://www.google.com/search?q=Amberlyn+Home+Renovation+Design+Studio+reviews",
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=482+Foundry+Row%2C+Ashford+Mills%2C+OR+97045",
  businessHours: [
    { days: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
    { days: "Saturday", hours: "9:00 AM – 2:00 PM" },
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
    heading: "Materials, Fixtures & Trade Partners We Build With",
    subheading: "We spec and install through a vetted bench of manufacturers and suppliers so every material choice is backed by real warranties, not guesswork.",
    items: industryBrands,
  },
  {
    id: "insurance",
    heading: "Insurance Carriers We Coordinate With on Storm & Restoration Claims",
    subheading: "For water, fire, and storm-damage rebuilds, our project managers work directly with your adjuster and carrier to keep the claim and the construction schedule moving together.",
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
    heroHeadline: "Renovations Built Around How You Actually Live, Not a Showroom Catalog",
    heroSubheadline: "Amberlyn Home Renovation & Design Studio pairs licensed architects, interior designers, and our own carpentry crews under one roof — so your kitchen, addition, or whole-home remodel moves from first sketch to final walkthrough without a single handoff getting dropped.",
    heroStatValue: "540+",
    heroStatCaption: "renovations completed across the Ashford Mills region since 2011",
    heroBadgeText: "Design-Build Studio · Licensed, Bonded & Insured",
    trustStatsTitle: "Fifteen years of renovations, measured in more than square footage",
    servicesEyebrow: "What we build",
    servicesTitle: "Renovation and design services, end to end",
    servicesSubtitle: "From a single reimagined bathroom to a full structural addition, every service below is delivered by the same in-house design and build team — no subcontracted design, no outsourced project management.",
    whyUsEyebrow: "Why homeowners choose Amberlyn",
    whyUsTitle: "The difference is in who's actually on your project",
    whyUsSubtitle: "We turn away roughly a third of the projects we're asked to bid because they're not a fit for our model — fixed-fee, design-build, one accountable team. Here's what that model gets you.",
    teamEyebrow: "The people behind the plans",
    teamTitle: "Meet the design and build team",
    teamSubtitle: "Architects, interior designers, project managers, and lead carpenters who work from the same set of drawings, in the same office, on the same timeline.",
    howItWorksEyebrow: "How a project actually unfolds",
    howItWorksTitle: "From first call to final walkthrough",
    howItWorksSubtitle: "Every renovation follows the same four-stage process, whether it's a $28,000 bathroom or a $410,000 addition.",
    facilityEyebrow: "Inside the studio",
    facilityTitle: "A working design studio and material showroom, not a sales office",
    successStoriesTitle: "Recent renovations, in the homeowners' own words",
    reviewsTitle: "What it's actually like to renovate with us",
    reviewsSubtitle: "Verified reviews pulled from Google and our post-project client surveys — unedited, including the constructive ones.",
    reviewsLinkLabel: "Read all reviews",
    resourcesEyebrow: "Renovation resources",
    resourcesTitle: "Straight answers before you sign anything",
    resourcesSubtitle: "Budgeting guides, layout primers, and permit explainers written by our own design and project-management staff.",
    resourceCardLabel: "Read the guide",
    carePlansEyebrow: "How we price projects",
    carePlansTitle: "Three ways to work with us",
    faqTeaserEyebrow: "Common questions",
    faqTeaserTitle: "Renovation questions, answered plainly",
    faqTeaserSubtitle: "Budgets, timelines, permits, insurance claims, and everything in between.",
    locationEyebrow: "Where we work",
    locationTitle: "Studio, design center, and project offices across the region",
    finalCtaTitle: "Let's talk about what your home actually needs",
    finalCtaSubtitle: "A 45-minute consultation, no pressure, no generic quote — just an honest read on scope, budget range, and whether we're the right fit.",
    leadGenForm: {
      heading: "Start with a project consultation",
      subheading: "Tell us a little about the space and we'll follow up within one business day to schedule a walkthrough.",
      submitButton: "Request My Consultation",
      successMessage: "Thank you — a member of our project team will reach out within one business day to schedule your walkthrough.",
      privacyNote: "Your information is used only to schedule and prepare for your consultation. We never sell or share client data.",
    },
    insuranceCtaPrompt: "Rebuilding after storm or water damage? We coordinate directly with your carrier.",
  },
  about: {
    heroEyebrow: "Our story",
    heroTitle: "Built by a carpenter who got tired of watching good design fall apart on site",
    heroSubtitle: "Amberlyn started in 2011 as a two-person framing crew and grew into a full design-build studio because our founder kept seeing beautiful renderings get value-engineered into disappointing houses.",
    valuesEyebrow: "What we believe",
    valuesTitle: "The values that shape every project",
    valueLabel: "Our approach",
    approachEyebrow: "How we work",
    approachParagraph1: "Mireille Halden founded Amberlyn after a decade working as a carpenter for design firms that treated construction as an afterthought — gorgeous plans handed to the lowest-bid contractor, with no one in the room who understood both the drawing and the drywall. She started Amberlyn on the premise that the people designing a space and the people building it should be the same company, sitting at the same table, accountable to the same client.",
    approachParagraph2: "Fifteen years later, that's still the whole model. Every renovation is led by one project manager who was in the room for design, is on-site during framing, and signs off on the final punch list. We keep our crews in-house rather than subcontracting the core trades, we price projects as a fixed fee rather than time-and-materials, and we tell clients when an idea won't work for their budget instead of drawing it anyway and letting the bid come back as a surprise.",
    staffEyebrow: "Licensed and credentialed",
    staffTitle: "The team behind every renovation",
    exploreEyebrow: "Explore Amberlyn",
    exploreTitle: "Where to go next",
    exploreTeamLabel: "Meet the team",
    exploreTeamDescription: "Architects, designers, and project managers with real tenure and real credentials.",
    exploreServicesLabel: "Browse services",
    exploreServicesDescription: "Nine renovation and design services, from kitchens to historic restoration.",
    exploreResourcesLabel: "Read our guides",
    exploreResourcesDescription: "Budgeting, permitting, and design primers written by our own staff.",
    ctaTitle: "Ready to see what your project would actually take?",
  },
  services: {
    heroTitle: "Renovation and design services",
    heroSubtitle: "Every service is delivered by our in-house architecture, interior design, and carpentry teams — never subcontracted design, never a different project manager than the one you met at your consultation.",
    introText: "Whether you're reimagining one room or adding square footage to the whole house, each service below includes design, permitting coordination, and construction under a single fixed-fee contract.",
    ctaTitle: "Not sure which service fits your project?",
    cardLabel: "View service details",
    chooseEyebrow: "How to choose",
    chooseTitle: "Not sure where to start?",
  },
  serviceDetail: {
    benefitsEyebrow: "What's included",
    processEyebrow: "How it works",
    processTitle: "Our process for this service",
  },
  team: {
    heroEyebrow: "The people who build it",
    heroTitle: "Architects, designers, and builders under one roof",
    heroSubtitle: "Every project is staffed by the same core team from first sketch to final walkthrough — no rotating subcontractors making decisions without you in the room.",
    gridEyebrow: "Our team",
    gridTitle: "Meet the studio",
    ctaTitle: "Want to work with this team on your project?",
    cultureEyebrow: "How we work",
    cultureBody: "We keep project teams small and consistent on purpose. The designer who draws your kitchen is the same person who reviews the cabinet shop drawings; the project manager who quotes your addition is the same person standing in your yard when the footings get poured. It slows down how many projects we can run at once, and we think that trade-off is the whole point.",
  },
  proof: {
    heroEyebrow: "The evidence",
    heroTitle: "Fifteen years of renovations, on the record",
    heroSubtitle: "Reviews, completion stats, and outcomes pulled directly from our project files and third-party review platforms — not curated testimonials.",
    statsEyebrow: "By the numbers",
    statsTitle: "What fifteen years of renovations adds up to",
    statsCaption: "Figures reflect completed projects and post-project client surveys through 2026.",
    statCardLabel: "See the detail",
    storiesEyebrow: "Recent projects",
    ctaTitle: "Ready to add your project to this list?",
    reviewsEyebrow: "Client reviews",
    reviewsTitleLead: "What homeowners say",
    reviewsTitleAccent: "after the crew leaves",
    reviewsBody: "These are unedited reviews from Google and our own post-project surveys, including the ones that mention things we could have done better.",
    mapsEyebrow: "Find us",
    mapsTitleLead: "Visit the",
    mapsTitleAccent: "studio & showroom",
    mapsBody: "Walk through our material library, see finish samples in person, and sit down with a designer before you commit to anything.",
    mapsCardAriaLabel: "Map showing the Amberlyn Home Renovation & Design Studio location",
    reviewButtonLabel: "Leave us a review",
    mapsHint: "Free client parking is available directly behind the studio, off Kiln Alley.",
  },
  faq: {
    heroEyebrow: "Questions, answered",
    heroTitle: "Frequently asked questions",
    heroSubtitle: "Budgets, timelines, permits, materials, and insurance claims — the questions we hear most, answered without the sales pitch.",
    contactEyebrow: "Still have questions?",
    contactTitle: "Talk to a real project manager",
    callLabel: "Call the studio",
    callDescription: "Reach our front desk Monday through Saturday to ask a question or schedule a walkthrough.",
    emailLabel: "Email us",
    emailDescription: "Send project photos, inspiration, or questions and we'll respond within one business day.",
    ctaTitle: "Ready to talk about your project?",
  },
  locations: {
    heroEyebrow: "Where to find us",
    heroTitle: "Studio, design center & project offices",
    heroSubtitle: "Three locations across the Ashford Mills region, each staffed with the designers and project managers assigned to work in that area.",
    gridEyebrow: "Our locations",
    gridTitle: "Find the location closest to your project",
    ctaTitle: "Ready to schedule a walkthrough?",
  },
  location: {
    heroEyebrow: "This location",
    heroTitle: "Visit this studio",
    heroSubtitle: "See finish samples, review floor plans with a designer, or drop off inspiration photos in person.",
    startTitle: "Start a project here",
    directionsEyebrow: "Getting here",
    directionsTitle: "Directions & parking",
    landmarkLabel: "Look for",
    addressLabel: "Address",
    hoursEyebrow: "Studio hours",
    hoursTitle: "When we're open",
    emergencyTitle: "Storm or water damage right now?",
    referralLabel: "Call our emergency line",
    whatToDoLabel: "What to do while you wait",
    afterHoursTitle: "After-hours emergency response",
  },
  resources: {
    heroEyebrow: "Renovation resources",
    heroTitle: "Guides, checklists & explainers",
    heroSubtitle: "Written by our own designers and project managers — the same answers we'd give you in a consultation, just written down.",
    disclaimerText: "These guides are general information based on our own project experience. Every home, municipality, and budget is different — treat this as a starting point, not a substitute for a project-specific consultation.",
    gridEyebrow: "Browse guides",
    gridTitle: "All resources",
    ctaTitle: "Have a question these guides didn't answer?",
  },
  articleDetail: {
    bodyEyebrow: "Guide",
    disclaimerText: "This guide reflects our own project experience in the Ashford Mills region as of publication. Local permitting rules, material costs, and lead times change — confirm specifics with your project manager before budgeting.",
    relatedEyebrow: "Related service",
    relatedTitle: "See the service this guide covers",
    ctaTitle: "Ready to talk through your own project?",
  },
  successStories: {
    heroEyebrow: "Client outcomes",
    heroTitle: "Real renovations, real homeowners",
    heroSubtitle: "Project outcomes told by the homeowners who lived through them — budgets, timelines, and how the finished space actually gets used.",
    gridEyebrow: "Client stories",
    gridTitle: "Real outcomes, real care",
    ctaTitle: "Want a story like this for your own home?",
  },
  contact: {
    heroEyebrow: "Get in touch",
    heroTitle: "Let's talk about your project",
    heroSubtitle: "Whether you have a full set of plans or just a Pinterest board and a headache, we're happy to talk it through.",
    whyEyebrow: "Why reach out",
    whyTitle: "How we can help",
    methodsEyebrow: "Get in touch",
    methodsTitle: "Ways to reach us",
    formEyebrow: "Send a message",
    formTitle: "Tell us what you need",
    ctaTitle: "Prefer to just pick up the phone?",
  },
  newClients: {
    heroEyebrow: "New to Amberlyn",
    heroTitle: "What to expect from your first consultation",
    heroSubtitle: "No high-pressure sales pitch — just a working conversation about scope, budget range, and whether we're the right fit for your project.",
    stepsEyebrow: "The process",
    stepsTitle: "From first call to signed proposal",
    bringEyebrow: "Come prepared",
    bringTitle: "What to bring to your consultation",
    faqPrompt: "Have more questions? Check our FAQ.",
    servicesPrompt: "Not sure which service fits? Browse all services.",
    ctaTitle: "Ready to schedule your first consultation?",
  },
  notFound: {
    heroTitle: "We couldn't find that page",
    heroSubtitle: "The page you're looking for may have moved, or the link may be out of date. Try one of the links below, or head back to the homepage.",
    ctaTitle: "Looking for something specific?",
  },
  privacyPolicy: {
    heroEyebrow: "Legal",
    heroTitle: "Privacy Policy",
    heroSubtitle: "How Amberlyn Home Renovation & Design Studio collects, uses, and protects your information.",
    bodyHeading: "Our commitment to your privacy",
    bodyParagraph1: "Amberlyn Home Renovation & Design Studio collects only the information needed to schedule consultations, prepare project proposals, and communicate with current and prospective clients. This includes contact details submitted through our website forms, booking modal, and email correspondence.",
    bodyParagraph2: "We do not sell, rent, or share your personal information with third parties for marketing purposes. Information shared with insurance carriers or material suppliers is shared only with your explicit direction, such as when coordinating a storm-damage claim or a special-order material purchase.",
  },
  termsAndConditions: {
    heroEyebrow: "Legal",
    heroTitle: "Terms & Conditions",
    heroSubtitle: "The terms that govern consultations, bookings, and project proposals with Amberlyn Home Renovation & Design Studio.",
    bookingChangesHeading: "Consultation & scheduling changes",
    bookingChangesBody: "Consultations may be rescheduled or canceled up to 24 hours in advance at no charge by contacting our studio directly. Project construction schedules, once contracted, follow the change-order process outlined in your signed proposal.",
    contactingClinicHeading: "Contacting the studio",
    contactingClinicBody: "For scheduling, project questions, or urgent site issues, contact us by phone during studio hours or by email at any time. Emergency water and storm damage calls are prioritized and returned as quickly as possible.",
  },
  siteShell: {
    footerTagline: "Design-build renovations for the Ashford Mills region since 2011.",
    bookingDetailsText: "Prefer to talk it through first? Call the studio directly and we'll walk you through scheduling.",
    emailCaptureHeading: "Get renovation tips in your inbox",
    emailCaptureBody: "One email a month — budgeting guides, design trends, and the occasional before-and-after we're proud of.",
    emailCapturePlaceholder: "you@email.com",
    emailCaptureSubmitButton: "Subscribe",
    emailCaptureSuccessMessage: "You're on the list — look for our next issue soon.",
  },
  chat: {
    greetingMessage: "Hi! I'm here to help with questions about Amberlyn Home Renovation & Design Studio. What can I help you with?",
    noMatchMessage: "I don't have a good answer for that one — want me to connect you with our studio team directly?",
    humanHandoffMessage: "I'll pass this along to our project team, who can give you a more detailed answer.",
    leadCaptureOfferMessage: "Would you like someone from our team to follow up with you directly?",
    leadCaptureAskNameMessage: "Great — what's your name?",
    leadCaptureAskPhoneMessage: "And what's the best phone number to reach you?",
    leadCaptureThankYouMessage: "Thanks! Someone from our project team will reach out within one business day.",
    leadCaptureDeclineMessage: "No problem — feel free to reach out any time using the contact info on our site.",
    farewellMessage: "Thanks for stopping by! Reach out any time with questions.",
    windowTitle: "Chat with Amberlyn Studio",
    inputPlaceholder: "Type your question...",
    chatWithLabel: "Chat with us",
    askPromptMessage: "Have a question about a service, timeline, or budget? Ask away.",
  },
  booking: {
    modalEyebrow: "Schedule a consultation",
    modalHeadline: "Let's talk about your project",
    modalSubtext: "Share a few details and we'll follow up within one business day to schedule your walkthrough.",
    successHeadline: "Request received",
    successMessage: "Thank you — a member of our project team will reach out within one business day to schedule your consultation.",
  },
} as const;

export const aboutValues = [
  { title: "One team, start to finish", copy: "The designer who draws your plans, the project manager who prices them, and the carpenters who build them all work for Amberlyn — not a rotating cast of subcontractors assembled per project." },
  { title: "Honest scoping over pretty renderings", copy: "We'd rather tell you a wish-list item doesn't fit the budget in week one than draw it beautifully and let the number surprise you at bid time." },
  { title: "Fixed-fee pricing, no change-order ambushes", copy: "Every proposal is priced as a fixed fee before a hammer swings. If something changes mid-project, you approve the cost in writing before we proceed — never after." },
  { title: "Craftsmanship that outlasts the trend cycle", copy: "We build details — trim profiles, tile layouts, cabinet joinery — the way we'd build them for our own homes, because we want a project to still look intentional in fifteen years." },
  { title: "Respect for the house you're living in", copy: "Most of our clients are living in the home during construction. Daily site cleanup, dust containment, and clear daily schedules aren't extras — they're baseline." },
  { title: "Local accountability", copy: "We're licensed, bonded, and based in Ashford Mills — not a regional franchise. If something needs fixing after final walkthrough, the same crew that built it comes back." },
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
    slug: "whole-home-renovation",
    title: "Whole-Home Renovation",
    short: "A top-to-bottom reimagining of your entire house — layout, systems, and finishes — delivered under one fixed-fee contract.",
    detail:
      "Most whole-home renovations start with a house that technically works but no longer fits how the family actually lives — a chopped-up floor plan from the 1980s, a kitchen that's cut off from everything, bedrooms in the wrong places relative to how the household has grown. We begin with a full architectural assessment: structural, mechanical, electrical, and plumbing systems get evaluated alongside the floor plan, because a beautiful layout that ignores a failing furnace or undersized panel just becomes next year's emergency project. From there our design team produces a phased scope — what needs to happen for permitting and structural work, what's cosmetic, and where the two overlap — so you understand not just what the finished house will look like but why each piece of construction has to happen in the order it does.\n\nConstruction on a whole-home renovation typically runs in three overlapping phases: demolition and structural/systems work, rough-in (framing, electrical, plumbing, HVAC), and finish work (drywall, flooring, cabinetry, trim, paint). Because our design and construction teams share the same office, changes discovered mid-demolition — a load-bearing wall that wasn't on the original drawings, knob-and-tube wiring behind a wall you weren't touching — get priced and resolved in days, not weeks of back-and-forth between separate design and construction firms. We provide a written weekly schedule update throughout, plus a single point of contact (your project manager) who is present for every major milestone inspection.\n\nBecause whole-home renovations are the largest and most disruptive projects we run, we spend real time upfront on livability during construction: a phased sequence that keeps at least one functional bathroom and a temporary kitchen setup available whenever possible, dust containment between work zones and living space, and a hard stop on job-site noise before 8 AM. Expect an initial design phase of four to six weeks, permitting of two to eight weeks depending on your municipality and scope, and a construction timeline that we'll pin down to a specific number of weeks once structural scope is confirmed — no open-ended 'it depends' once contracts are signed.",
    category: "Full-Home Renovation",
    benefits: [
      "Single fixed-fee contract covering design, permitting, and construction",
      "One project manager present from first sketch through final walkthrough",
      "Phased construction sequencing that keeps part of the home livable when possible",
      "In-house structural, electrical, and plumbing coordination — no separate subcontractor hunt",
      "Weekly written schedule updates and milestone photos throughout construction",
    ],
    process: serviceProcess(1, [
      ["Whole-Home Assessment", "A licensed team member walks the entire house evaluating structure, systems, and layout, and flags anything — aging wiring, foundation issues, roof condition — that could affect scope or budget before design even starts."],
      ["Phased Design & Fixed-Fee Proposal", "Our architects and interior designers produce a full floor plan and finish package, sequenced into phases, priced as a single fixed fee so you know the total cost before permitting begins."],
      ["Construction & Milestone Walkthroughs", "Our in-house crews execute the build in the agreed phase order, with your project manager present at every milestone inspection and a scheduled walkthrough at the close of each phase."],
    ]),
    duration: "12–20 weeks depending on scope",
    imageKey: "service-whole-home-renovation",
    bestFor: [
      "Homeowners renovating more than 60% of their home's square footage at once",
      "Houses with outdated electrical, plumbing, or HVAC systems alongside cosmetic needs",
      "Families who've outgrown their current floor plan and need structural changes",
      "Anyone who wants one accountable team instead of separately hired architects and contractors",
    ],
  },
  {
    number: "02",
    slug: "kitchen-remodeling",
    title: "Kitchen Remodeling",
    short: "Full kitchen redesigns — layout, cabinetry, counters, and appliances — built around how your household actually cooks and gathers.",
    detail:
      "Kitchens fail for one of two reasons: the layout doesn't match how the household moves and cooks, or the finishes have simply worn out. We start every kitchen project with a working session about how you actually use the space — do you cook solo or does the whole family end up in there, do you need a landing zone for backpacks and mail, is the dining table five feet away or in another room entirely — because those answers drive the layout more than any Pinterest board. From there our designers produce two or three layout options, each with a rough budget range, before a single cabinet is selected, so you're deciding on function first and finishes second.\n\nOnce a layout is approved, our design team moves into cabinetry, counters, backsplash, lighting, and appliance selection, all shown to scale in a 3D rendering so you can see the finished room before demolition starts. Structural changes — removing a wall between kitchen and dining room, relocating plumbing for an island sink, upgrading electrical service for new appliances — are priced and permitted as part of the same fixed-fee proposal, not discovered and re-quoted mid-project. Our own carpentry crew handles framing, rough electrical and plumbing coordination, and cabinet installation; we bring in licensed electrical and plumbing subcontractors we've worked with for years for final connections and inspections.\n\nA typical kitchen remodel runs six to ten weeks from demolition to final walkthrough, depending on whether cabinetry is stock, semi-custom, or fully custom (custom cabinet lead times can add three to five weeks to the front end of the schedule, which we account for in your proposed start date). We install a temporary kitchenette — a mini fridge, microwave, and utility sink — in an adjacent space for the duration of construction whenever the layout allows, because we know most households don't have the option of eating out for two months.",
    category: "Kitchen & Bath",
    benefits: [
      "Two to three layout options with budget ranges before finish selection begins",
      "3D renderings of cabinetry, counters, and lighting before demolition starts",
      "Structural and plumbing relocation priced into the same fixed-fee proposal",
      "Temporary kitchenette setup for the duration of construction when the layout allows",
      "In-house carpentry crew with licensed electrical and plumbing partners for final connections",
    ],
    process: serviceProcess(2, [
      ["Layout & Lifestyle Consultation", "We walk through how your household actually cooks and gathers, then produce two to three layout concepts with budget ranges before any finishes are selected."],
      ["Design Development & Material Selection", "Cabinetry, counters, backsplash, lighting, and appliances are selected and rendered in 3D, with structural or plumbing changes priced into the fixed-fee proposal."],
      ["Demolition Through Final Walkthrough", "Our carpentry crew and licensed trade partners execute the build phase by phase, with a scheduled final walkthrough and punch-list sign-off."],
    ]),
    duration: "6–10 weeks",
    imageKey: "service-kitchen-remodeling",
    bestFor: [
      "Kitchens with a layout that no longer fits how the household cooks or gathers",
      "Homeowners planning to remove or relocate a wall, island, or major plumbing run",
      "Anyone replacing cabinetry, counters, and appliances at the same time",
      "Households wanting a single designer to coordinate finish selections start to finish",
    ],
  },
  {
    number: "03",
    slug: "bathroom-remodeling",
    title: "Bathroom Remodeling",
    short: "Primary, guest, and powder bathroom renovations, from full gut-and-reconfigure projects to focused fixture and tile updates.",
    detail:
      "Bathrooms are small rooms that hide a disproportionate amount of complexity — plumbing behind walls, ventilation requirements, waterproofing at every tiled surface, and often the tightest layouts in the house. We start by determining which category your project falls into: a cosmetic refresh (new fixtures, tile, and paint within the existing footprint), a reconfiguration (moving a shower, converting a tub to a curbless shower, relocating the vanity), or a full gut renovation that touches plumbing, electrical, and sometimes the subfloor. Each category has a meaningfully different timeline and budget, and we tell you which one your project is in before we start drawing anything.\n\nFor reconfiguration and full-gut projects, our design team produces a scaled layout showing exact fixture placement, tile layout (including waterproofing membrane details at showers and tub surrounds), lighting, and ventilation — bathrooms are one of the few rooms where a half-inch of clearance can be the difference between a code-compliant layout and one that requires a redesign mid-permit. We handle plumbing rough-in coordination, electrical for vanity lighting and exhaust fans, tile setting, and cabinetry installation with our own crews, working alongside licensed plumbing and electrical partners for connections and final inspection sign-off.\n\nA cosmetic bathroom refresh can move in three to four weeks; a full gut renovation with reconfigured plumbing typically runs five to six weeks per bathroom, longer if custom tile or a curbless shower pan is involved. For households with only one bathroom, we build a temporary access plan into the schedule — whether that's sequencing work to keep a second bathroom functional or coordinating a porta-facility for the shortest possible window — and we walk through that plan with you before signing the proposal, not after demolition has already started.",
    category: "Kitchen & Bath",
    benefits: [
      "Clear categorization upfront — cosmetic refresh vs. reconfiguration vs. full gut — with matching timeline and budget",
      "Scaled layout drawings showing exact fixture, tile, and waterproofing detail before construction",
      "In-house tile setting and cabinetry installation alongside licensed plumbing and electrical partners",
      "Single-bathroom household access plan built into the schedule before signing",
      "Ventilation and code-compliance review included at design stage, not discovered at inspection",
    ],
    process: serviceProcess(3, [
      ["Scope Categorization & Layout", "We determine whether your project is a cosmetic refresh, reconfiguration, or full gut, then produce a scaled layout with exact fixture and waterproofing detail."],
      ["Fixture, Tile & Lighting Selection", "Fixtures, tile, vanity, and lighting are selected together so the finished room reads as one cohesive design rather than a collection of separate choices."],
      ["Construction & Waterproofing Sign-Off", "Our crews execute plumbing rough-in coordination, tile setting, and cabinetry installation, with a formal waterproofing inspection before any tile is set."],
    ]),
    duration: "3–6 weeks per bathroom",
    imageKey: "service-bathroom-remodeling",
    bestFor: [
      "Households replacing a dated tub-shower combo with a curbless or walk-in shower",
      "Anyone reconfiguring plumbing or moving a vanity, toilet, or shower location",
      "Primary suites needing a double-vanity or in-suite laundry addition",
      "Guest or powder bathrooms needing a full cosmetic refresh before a home sale",
    ],
  },
  {
    number: "04",
    slug: "home-additions",
    title: "Custom Home Additions",
    short: "Ground-up additions — second stories, bump-outs, attached suites, and garage conversions — engineered to match your existing home.",
    detail:
      "An addition is structurally its own small construction project bolted onto a house that was never designed to accommodate it, which is why so many additions either look tacked-on or run into foundation and structural surprises mid-build. We start every addition with a structural and site assessment: existing foundation type and condition, roofline and how a new structure will tie into it, setback and height restrictions from local zoning, and utility capacity (electrical panel, water and sewer line sizing) for the added square footage. Our licensed architect produces structural drawings that are stamped for permitting, not just conceptual renderings, because additions carry the heaviest permitting and inspection load of any service we offer.\n\nDesign for an addition focuses as much on the exterior tie-in as the interior layout — roofline pitch matching, siding and trim profile matching, window proportions — because the goal for most clients is an addition that looks like it was always part of the house, not a visibly newer wing. We coordinate structural engineering, permitting submission, and utility upgrades as part of the same fixed-fee proposal, and we sequence construction to protect the existing home's building envelope (roof, walls, foundation) at every stage so you're not living with an open wall to the outdoors longer than necessary.\n\nAdditions are the longest projects we run, typically fourteen to twenty-four weeks depending on foundation type, square footage, and whether the addition includes a second story (which requires temporary shoring of the existing structure). Permitting alone can take four to ten weeks depending on your municipality and whether the addition requires a zoning variance. We build permitting time into your quoted start date rather than treating it as a separate, unplanned delay, and we handle all permit submissions and inspection scheduling directly so you're not the one shuttling paperwork to city hall.",
    category: "Additions & Structural",
    benefits: [
      "Stamped structural drawings from our licensed architect, not conceptual renderings alone",
      "Exterior tie-in design (roofline, siding, trim, window proportions) matched to the existing home",
      "Structural engineering, permitting, and utility upgrades priced into one fixed-fee proposal",
      "Building-envelope-first construction sequencing to minimize exposure to the elements",
      "Direct permit submission and inspection scheduling handled by our project management team",
    ],
    process: serviceProcess(4, [
      ["Structural & Site Assessment", "We evaluate foundation, roofline, zoning setbacks, and utility capacity to determine what the addition can structurally and legally accommodate."],
      ["Stamped Design & Permitting", "Our architect produces permit-ready structural drawings and exterior tie-in details, and our team manages the full permit submission and approval process."],
      ["Foundation Through Final Tie-In", "Construction proceeds from foundation and framing through roofing, siding, and interior finish, sequenced to protect the existing home's building envelope throughout."],
    ]),
    duration: "14–24 weeks",
    imageKey: "service-home-additions",
    bestFor: [
      "Growing families adding bedrooms, a second story, or an in-law suite",
      "Homeowners converting a detached garage into finished living space",
      "Anyone adding square footage who wants the addition to look original to the house",
      "Projects that will require zoning variance or significant structural engineering",
    ],
  },
  {
    number: "05",
    slug: "interior-design-space-planning",
    title: "Interior Design & Space Planning",
    short: "Standalone design and space-planning services — layout, furnishing, and finish direction — for clients who want design without full construction.",
    detail:
      "Not every project needs construction, and we offer interior design and space planning as a standalone service for clients who want professional layout and finish guidance without a full renovation contract — a furniture plan for a newly purchased home, a whole-house color and material palette, or space planning for a room that's underused but structurally fine as-is. We begin with a design consultation covering how each space is meant to function, existing furniture or fixtures you want to keep, and a style direction, then produce scaled floor plans showing furniture placement, traffic flow, and sightlines.\n\nFrom there our interior designers develop a full material and finish palette — paint colors, flooring, lighting fixtures, window treatments, and furnishings — presented as a mood board and shoppable specification sheet with sourcing links and lead times, so you can execute the plan on your own timeline or have us manage procurement and installation. For clients who do want us to execute, we handle ordering, delivery coordination, and installation day logistics, including furniture placement and styling on move-in day.\n\nStandalone design engagements typically run four to eight weeks depending on the number of rooms and whether procurement is included. This service is also the entry point for many clients who start with design-only work and later expand into a full renovation once they've lived with a space plan and decided structural changes make sense — in that case, the design work already completed carries directly into the renovation proposal rather than starting over.",
    category: "Design Services",
    benefits: [
      "Scaled floor plans showing furniture placement, traffic flow, and sightlines",
      "Full material and finish palette delivered as a shoppable specification sheet with sourcing links",
      "Optional full-service procurement, delivery coordination, and installation-day styling",
      "Design work carries directly into a future renovation proposal at no cost to redo",
      "Flexible engagement — single room, whole-house palette, or furniture plan only",
    ],
    process: serviceProcess(5, [
      ["Design Consultation & Space Planning", "We walk each space with you, discuss function and style direction, and produce scaled floor plans showing furniture placement and traffic flow."],
      ["Palette & Specification Development", "Our designers develop a full finish and furnishing palette, delivered as a mood board and shoppable specification sheet with sourcing and lead times."],
      ["Execution & Installation (Optional)", "For clients who want full service, we manage procurement, delivery scheduling, and on-site furniture placement and styling on move-in day."],
    ]),
    duration: "4–8 weeks (design phase only)",
    imageKey: "service-interior-design",
    bestFor: [
      "Homeowners in a newly purchased house who need a furniture and layout plan",
      "Clients wanting a professional finish palette before committing to construction",
      "Anyone who wants full-service procurement and installation without managing vendors themselves",
      "Households planning a future renovation who want design work to carry forward",
    ],
  },
  {
    number: "06",
    slug: "basement-finishing",
    title: "Basement Finishing",
    short: "Unfinished or partially finished basements converted into livable space, with moisture control and egress handled correctly the first time.",
    detail:
      "Basement finishing projects fail most often for the same two reasons: moisture that wasn't addressed before finishes went in, and egress or ceiling-height issues that weren't caught before the layout was designed. Our process starts with a moisture and structural assessment — we test for active water intrusion, evaluate existing waterproofing or drainage, and check foundation condition — before any layout conversation happens, because finishing over an unresolved moisture problem is the single most common basement renovation mistake we get called to fix from other contractors. If waterproofing or drainage work is needed, we scope and price it as phase one, separate from the finish-out budget, so you understand exactly what you're paying for and why.\n\nOnce the space is confirmed dry, our design team develops a layout that accounts for existing mechanical equipment (furnace, water heater, sump pump access), ceiling height after framing and drywall, and, for any bedroom being added, code-required egress — which usually means a window well and window large enough to meet fire-code egress dimensions, not just any basement window. We handle framing, insulation appropriate for below-grade spaces, electrical (including any new circuits needed), drywall, flooring rated for below-grade moisture conditions, and trim, coordinating licensed plumbing and electrical partners for any wet-bar, bathroom, or panel work the layout requires.\n\nA typical basement finishing project runs six to twelve weeks depending on square footage and whether a bathroom or egress window is being added (egress window installation, which involves excavation, adds one to two weeks and requires permitting before interior framing can begin). We build a full HVAC assessment into every basement project as well — many basements are conditioned by whatever ductwork happens to reach them, and we'll flag before construction if additional supply runs or a dedicated mini-split are needed to keep the finished space comfortable year-round.",
    category: "Additions & Structural",
    benefits: [
      "Moisture and structural assessment completed before any layout work begins",
      "Waterproofing or drainage work scoped and priced separately from finish-out costs",
      "Code-compliant egress window design and permitting for any bedroom being added",
      "Below-grade-rated insulation, flooring, and moisture-resistant material specification",
      "HVAC capacity assessment to ensure the finished space heats and cools properly",
    ],
    process: serviceProcess(6, [
      ["Moisture & Structural Assessment", "We test for active water intrusion and evaluate drainage and foundation condition before any finish layout is proposed."],
      ["Layout, Egress & Systems Design", "We design around existing mechanicals, plan code-compliant egress for any bedroom, and assess HVAC capacity for the finished space."],
      ["Framing Through Final Finish", "Our crews execute framing, insulation, electrical, drywall, and below-grade-rated flooring, coordinating licensed trades for wet-bar or bathroom additions."],
    ]),
    duration: "6–12 weeks",
    imageKey: "service-basement-finishing",
    bestFor: [
      "Homeowners converting an unfinished basement into a family room, home office, or bedroom",
      "Anyone with a known or suspected moisture issue that needs resolving before finishing",
      "Households adding a legal bedroom that requires code-compliant egress",
      "Basements needing a wet bar, bathroom, or home theater layout",
    ],
  },
  {
    number: "07",
    slug: "outdoor-living-deck-design",
    title: "Outdoor Living & Deck Design",
    short: "Decks, covered porches, and outdoor kitchens designed as an extension of the house, engineered for your region's weather and code.",
    detail:
      "Outdoor living spaces get judged on a different standard than interior rooms — they need to survive weather, structurally support furniture and sometimes a hot tub or outdoor kitchen, and tie visually into the house rather than reading as an afterthought bolted onto the back wall. We start with a site assessment covering grade, drainage, sun and wind exposure, and structural attachment options (ledger-attached vs. freestanding), because those factors determine both the engineering and the usable design of the space more than any style preference does.\n\nDesign covers layout, decking and railing material (we work in both wood and low-maintenance composite systems), roof or pergola structure if the space is covered, and any built-in elements — outdoor kitchen, fireplace, built-in seating — planned with the same attention to proportion and sightlines as an interior room. For covered structures and any space attached to the house, our team handles structural engineering and permitting; freestanding decks under a certain size may not require the same permit level depending on your municipality, and we'll tell you which category your project falls into during design rather than leaving you to find out at permit submission.\n\nMost outdoor living projects run four to eight weeks from permit approval to completion, with covered structures and outdoor kitchens on the longer end of that range due to added electrical, gas line, and sometimes plumbing coordination. We specify hardware and fasteners rated for exterior and coastal-adjacent conditions as standard, not an upgrade, because outdoor structures take the most weather exposure of anything we build and premature fastener failure is one of the most common outdoor-construction complaints we hear from clients of other builders.",
    category: "Outdoor & Landscape",
    benefits: [
      "Site assessment covering grade, drainage, and structural attachment before design begins",
      "Choice of wood or low-maintenance composite decking and railing systems",
      "Structural engineering and permitting handled for covered structures and house-attached decks",
      "Exterior-rated hardware and fasteners specified as standard, not an upsell",
      "Built-in outdoor kitchen, fireplace, and seating designed with interior-room-level attention to proportion",
    ],
    process: serviceProcess(7, [
      ["Site & Structural Assessment", "We evaluate grade, drainage, sun and wind exposure, and attachment options to determine engineering requirements before design begins."],
      ["Layout & Material Design", "We design the deck, cover structure, and any built-in elements, and select decking, railing, and roofing materials suited to your site."],
      ["Permitting & Construction", "We handle any required structural permitting, then build the structure with exterior-rated hardware and finish it ready for furniture."],
    ]),
    duration: "4–8 weeks",
    imageKey: "service-outdoor-living",
    bestFor: [
      "Homeowners adding a deck, covered porch, or pergola attached to the house",
      "Anyone planning an outdoor kitchen, fireplace, or built-in seating area",
      "Households replacing an aging or failing existing deck structure",
      "Projects on sloped or poorly draining sites needing structural design attention",
    ],
  },
  {
    number: "08",
    slug: "historic-home-restoration",
    title: "Historic Home Restoration",
    short: "Restoration and sensitive renovation of pre-1950s homes, preserving original character while updating systems and function.",
    detail:
      "Historic homes require a different discipline than standard renovation — original millwork, plaster, windows, and floor plans often carry both architectural and, in some cases, legal preservation value, and the goal is rarely to modernize everything but to selectively update what needs updating while preserving what makes the house what it is. We begin with a conditions assessment of original materials — plaster walls, wood windows, trim profiles, flooring — cataloguing what can be repaired, what needs sympathetic replacement matched to the original profile, and what's already been lost to prior renovations and could be reproduced.\n\nOur restoration carpenters work in traditional joinery and finish techniques alongside modern construction methods, which matters most in window restoration (weatherstripping and reglazing original wood windows rather than defaulting to vinyl replacement), plaster repair (skim-coating and patching rather than demolishing to drywall), and matching trim and millwork profiles when replacement is unavoidable. Where the home is in a designated historic district, we manage the local historic review board submission and approval process as part of the project, since exterior changes in those districts typically require separate approval beyond standard building permits.\n\nSystems updates — electrical, plumbing, HVAC, insulation — are planned to be as minimally invasive to original plaster and millwork as possible, often routing new wiring and ductwork through less visible paths even when it adds labor time, because re-plastering an entire wall to run a single new circuit defeats the purpose of a restoration project. Timelines run longer than comparable standard renovations — sixteen to thirty weeks depending on scope — both because historic-review approval adds time and because restoration work is inherently slower than demolition-and-replace construction. We think that trade-off is worth it for homes where the original character is the reason the client bought the house in the first place.",
    category: "Restoration",
    benefits: [
      "Conditions assessment cataloguing what can be repaired vs. sympathetically replaced",
      "Traditional joinery, window restoration, and plaster repair techniques by dedicated restoration carpenters",
      "Historic district review board submission and approval managed as part of the project",
      "Systems updates routed to minimize disruption to original plaster and millwork",
      "Trim and millwork profile matching for any replacement that can't be avoided",
    ],
    process: serviceProcess(8, [
      ["Conditions Assessment & Preservation Plan", "We catalogue original materials, determine what can be repaired versus sympathetically replaced, and build a preservation-first project plan."],
      ["Historic Review & Design", "For homes in a historic district, we manage review board submission alongside design work for any systems updates or additions."],
      ["Restoration Construction", "Our restoration carpenters execute repair and replacement work using traditional techniques, with systems updates routed to minimize impact on original materials."],
    ]),
    duration: "16–30 weeks depending on scope of preservation work",
    imageKey: "service-historic-restoration",
    bestFor: [
      "Owners of pre-1950s homes wanting to preserve original character during renovation",
      "Properties located in a designated local historic district requiring review approval",
      "Homes with original windows, plaster, or millwork worth repairing rather than replacing",
      "Restoration projects that also need updated electrical, plumbing, or HVAC systems",
    ],
  },
  {
    number: "09",
    slug: "smart-home-integration",
    title: "Smart Home & Systems Integration",
    short: "Whole-house smart lighting, climate, security, and audio systems, wired correctly whether as a standalone project or part of a larger renovation.",
    detail:
      "Smart home systems are easiest and most reliable when wired into a house intentionally rather than retrofitted piecemeal with wireless add-ons, which is why we offer this as both a standalone service and a default layer on every renovation and addition we build. As a standalone project, we assess your existing electrical panel capacity, network infrastructure, and household priorities — lighting control, climate zoning, security and camera coverage, whole-house audio — and design a system architecture using a centralized hub rather than a patchwork of single-purpose apps that don't talk to each other.\n\nWe run structured wiring for hardwired components wherever walls are open or accessible (in-ceiling speakers, wired security cameras, zoned thermostats) because hardwired systems are more reliable and secure than wireless-only setups, reserving wireless devices for retrofit situations where opening walls isn't practical or desired. Every system we install is documented with a wiring diagram and device inventory left with the homeowner, so that future service calls — by us or anyone else — don't require guessing what's behind the walls.\n\nAs a standalone project, most smart home integrations take one to three weeks depending on the number of systems involved; when bundled into a larger renovation, this work is scheduled into the same rough-in phase as standard electrical, adding minimal time to the overall project. We provide a walkthrough training session at project completion so every household member — not just whoever ordered the system — knows how to use it.",
    category: "Systems & Technology",
    benefits: [
      "Centralized hub architecture instead of a patchwork of disconnected single-purpose apps",
      "Structured, hardwired components prioritized over wireless-only setups for reliability",
      "Full wiring diagram and device inventory documentation left with the homeowner",
      "Seamlessly bundled into any renovation's electrical rough-in phase at minimal added time",
      "Household walkthrough training session included at project completion",
    ],
    process: serviceProcess(9, [
      ["Systems Assessment & Architecture Design", "We assess panel capacity and network infrastructure, then design a centralized system architecture around your household's priorities."],
      ["Structured Wiring & Installation", "We run hardwired components wherever practical and install the remaining wireless devices, documenting every connection as we go."],
      ["Configuration & Household Training", "We configure the centralized hub and provide a walkthrough training session so every household member can operate the finished system."],
    ]),
    duration: "1–3 weeks (standalone) or integrated into any renovation timeline",
    imageKey: "service-smart-home",
    // Intentionally no bestFor — demonstrates the "who this is for" section stays hidden when absent.
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const trustStats = [
  { value: "540+", label: "Renovations completed since 2011" },
  { value: "15 yrs", label: "In business in the Ashford Mills region" },
  { value: "4.9★", label: "Average rating across 380+ verified reviews" },
  { value: "92%", label: "Of clients come from referrals or repeat projects" },
  { value: "0", label: "Subcontracted design roles — every architect and designer is in-house" },
] as { value: string; label: string }[];

export const differentiators = [
  { title: "Design and construction, one company", copy: "Our architects, interior designers, and carpentry crews all work for Amberlyn. There's no separate design firm handing drawings to a contractor who has to reinterpret them.", icon: "ShieldCheck" },
  { title: "Fixed-fee pricing, not time-and-materials", copy: "Every proposal is priced as a single fixed fee before construction starts. Scope changes are priced and approved in writing before we proceed — never billed as a surprise.", icon: "Clock3" },
  { title: "Licensed, bonded, and locally based", copy: "We hold a Oregon CCB general contractor license, carry full liability and workers' compensation coverage, and are based in Ashford Mills — not a national franchise using our name.", icon: "Award" },
  { title: "One project manager, start to finish", copy: "The same person who scopes your project at the consultation is on-site through demolition, framing, and the final punch-list walkthrough — not handed off between departments.", icon: "Heart" },
  { title: "In-house material showroom", copy: "Our studio houses a working material library with real cabinet, counter, flooring, and tile samples, so you're selecting finishes in person, not guessing from a swatch photo.", icon: "Layers" },
] as { title: string; copy: string; icon?: string }[];

export const howItWorks = [
  { step: "01", title: "Initial Consultation", copy: "A 45-minute walkthrough of your space (in person or virtual) to understand scope, priorities, and budget range before any design work begins.", icon: "PhoneCall" },
  { step: "02", title: "Design & Fixed-Fee Proposal", copy: "Our design team produces layout options and a finish direction, priced as a single fixed-fee proposal covering design, permitting, and construction.", icon: "CalendarCheck" },
  { step: "03", title: "Permitting & Scheduling", copy: "Once you approve the proposal, we handle all permit submissions and lock in a construction start date and phased schedule.", icon: "ClipboardCheck" },
  { step: "04", title: "Construction & Final Walkthrough", copy: "Our in-house crews execute the build with weekly schedule updates, ending in a formal punch-list walkthrough before we call the project complete.", icon: "Hammer" },
] as { step: string; title: string; copy: string; icon?: string }[];

export const healthResources = [
  {
    title: "How to Budget for a Whole-Home Renovation Without Losing Your Mind",
    excerpt: "A realistic framework for setting a renovation budget, including the contingency fund every project needs and where costs most often run over.",
    imageKey: "resource-budgeting-guide",
  },
  {
    title: "Kitchen Layout 101: Working Triangle vs. Zone Planning",
    excerpt: "Why the classic 'work triangle' isn't the whole story anymore, and how modern kitchen layouts are actually planned around zones.",
    imageKey: "resource-kitchen-layout",
  },
  {
    title: "Permits, Inspections, and Timelines: What Actually Slows Down a Remodel",
    excerpt: "A plain-language walkthrough of the permitting process and the most common reasons renovation timelines slip.",
    imageKey: "resource-permits-timeline",
  },
] as { title: string; excerpt: string; imageKey: string }[];

export const marqueeReviews = [
  { author: "Danielle Okafor", segment: "Whole-Home Renovation Client", quote: "Amberlyn gutted and rebuilt our entire main floor and the project manager never once made us chase him for an update. Every week, like clockwork, we knew exactly where things stood.", rating: 5, serviceSlug: "whole-home-renovation" },
  { author: "Marcus Whitfield", segment: "Kitchen Remodel Client", quote: "We interviewed four design-build firms and Amberlyn was the only one that told us our original layout idea wouldn't work before we fell in love with a rendering of it. That honesty paid off.", rating: 5, serviceSlug: "kitchen-remodeling" },
  { author: "Renata Alvez", segment: "Bathroom Remodel Client", quote: "The curbless shower they built into our primary bath still looks flawless two years later — not a single grout crack, not a leak. Worth every penny.", rating: 5, serviceSlug: "bathroom-remodeling" },
  { author: "Owen Faircastle", segment: "Home Addition Client", quote: "Our second-story addition looks like it was part of the original 1962 build. Neighbors genuinely can't tell it was added — that was exactly what we asked for.", rating: 5, serviceSlug: "home-additions" },
  { author: "Priyanka Deshmukh", segment: "Interior Design Client", quote: "We hired Amberlyn for design only, no construction, and they still treated the project with total seriousness. The spec sheet they handed us made shopping painless.", rating: 5, serviceSlug: "interior-design-space-planning" },
  { author: "Terrence Boyle", segment: "Basement Finishing Client", quote: "They caught a moisture issue during the assessment that two other contractors missed entirely. Glad we didn't finish over that problem.", rating: 5, serviceSlug: "basement-finishing" },
  { author: "Solveig Marchand", segment: "Outdoor Living Client", quote: "Our covered outdoor kitchen has survived two brutal winters without a single fastener issue. You can tell they actually think about weather exposure.", rating: 5, serviceSlug: "outdoor-living-deck-design" },
  { author: "Harlan Beaumont", segment: "Historic Restoration Client", quote: "They restored our 1908 farmhouse's original windows instead of pushing us toward vinyl replacements. The historic review board approval process was painless because Amberlyn had done it before.", rating: 5, serviceSlug: "historic-home-restoration" },
  { author: "Yasmin Cortez-Reyes", segment: "Smart Home Integration Client", quote: "Every device in our house is actually wired properly instead of duct-taped together with a dozen different apps. My husband, who is genuinely hard to impress, is impressed.", rating: 5, serviceSlug: "smart-home-integration" },
  { author: "Bram Osei-Tutu", segment: "Whole-Home Renovation Client", quote: "We were living in the house the entire renovation and it was honestly manageable — daily cleanup, clear schedules, and a project manager who answered every text.", rating: 5, serviceSlug: "whole-home-renovation" },
  { author: "Colette Fenwick", segment: "Kitchen Remodel Client", quote: "The temporary kitchenette they set up in our dining room saved our sanity for eight weeks. Small thing, huge difference.", rating: 4, serviceSlug: "kitchen-remodeling" },
  { author: "Desmond Iyer", segment: "Custom Home Addition Client", quote: "Permitting for our in-law suite addition took longer than expected because of the county, but Amberlyn had told us that risk upfront and built it into the schedule, so nothing felt like a surprise.", rating: 5, serviceSlug: "home-additions" },
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
  { question: "How do I know if I need a designer, an architect, or a contractor?", answer: "You don't need to figure that out yourself — that's what our initial consultation determines. Any project touching structure (walls, additions, roofline) needs a licensed architect; any project changing layout or finishes benefits from an interior designer; and every project needs a general contractor to build it. Amberlyn provides all three under one roof, so you never have to coordinate them separately.", category: "Getting Started" },
  { question: "What happens during the first consultation?", answer: "A 45-minute walkthrough of the space (in person or virtual) where we discuss your priorities, constraints, and rough budget range, and flag any structural or systems issues we notice. You'll leave with a realistic sense of scope and next steps — no pressure to sign anything on the spot.", category: "Getting Started" },
  { question: "Do I need to have a full design or Pinterest board ready before I call?", answer: "Not at all. Some clients arrive with detailed inspiration folders; others just know their kitchen doesn't work anymore. Either is a fine starting point — our designers are equally comfortable building a vision from scratch or refining one you've already started.", category: "Getting Started" },
  { question: "How far in advance should I start the process before I want construction to begin?", answer: "For most renovations, plan on eight to twelve weeks between your first consultation and a construction start date, factoring in design, material lead times, and permitting. Additions and historic restorations should plan further ahead — permitting alone can take four to ten weeks depending on your municipality.", category: "Getting Started" },
  { question: "Can I see finished projects similar to mine before hiring you?", answer: "Yes — our studio showroom includes photo books and material samples organized by project type, and we're happy to arrange a phone introduction to a past client with a similar project who's agreed to take reference calls.", category: "Getting Started" },
  { question: "How many design options will I see before committing to a layout?", answer: "For layout-driving decisions like kitchens and additions, we typically present two to three concept options with rough budget ranges attached to each, so you're choosing based on both function and cost, not just aesthetics.", category: "Design" },
  { question: "Do you use 3D renderings so I can see the space before construction?", answer: "Yes, for any project involving cabinetry, structural changes, or a full room reconfiguration, we produce 3D renderings of the finished space as part of the design phase, before a final proposal is signed.", category: "Design" },
  { question: "Can I bring my own architect or designer into the project?", answer: "We're set up as a fully integrated design-build studio, which is most of what clients hire us for, but if you have an existing relationship with an architect, we can build from their stamped drawings — just note that our fixed-fee pricing model assumes our own in-house design process.", category: "Design" },
  { question: "What if I change my mind about a finish after it's been ordered?", answer: "We build a defined selection window into every schedule specifically to avoid this — once materials are ordered, changes typically mean re-ordering costs and lead-time delays, which we'll always quote honestly before you decide whether the change is worth it.", category: "Design" },
  { question: "How do you handle structural surprises found during demolition?", answer: "Because our architects and construction crews work for the same company, structural surprises — an unexpected load-bearing wall, old wiring behind a wall you weren't touching — get assessed and priced within days, documented in a written change order that you approve before we proceed.", category: "Construction" },
  { question: "Will I be able to live in my house during construction?", answer: "For most kitchen, bathroom, and basement projects, yes — we sequence work and set up temporary facilities (like a kitchenette) to keep the home livable. Whole-home renovations and additions with structural work sometimes require a partial or full temporary move, which we'll flag clearly during the design phase, not after signing.", category: "Construction" },
  { question: "How do you handle daily job-site cleanup and noise?", answer: "Daily cleanup at the end of each work day is standard on every project, along with dust containment barriers between construction and living areas. We don't run loud construction work before 8 AM out of respect for you and your neighbors.", category: "Construction" },
  { question: "Do you subcontract any of the actual construction work?", answer: "Our carpentry, framing, and finish crews are in-house. We partner with licensed, long-term electrical and plumbing subcontractors for final connections and inspection sign-off, since those trades require separate state licensing — but they're the same handful of partners on every project, not a rotating cast.", category: "Construction" },
  { question: "What's your policy on job-site safety around kids and pets?", answer: "We fence or barrier off active construction zones from living space whenever the layout allows, and we brief every household on daily hazards (open trenches, exposed wiring, tools left overnight) before each phase begins.", category: "Maintenance" },
  { question: "Do you offer a warranty on completed work?", answer: "Yes — every project includes a one-year workmanship warranty covering construction defects, in addition to manufacturer warranties on materials, fixtures, and appliances, which we register on your behalf at project completion.", category: "Maintenance" },
  { question: "Who do I call if something goes wrong after the project is finished?", answer: "Your project manager remains your point of contact for at least one year after completion. For anything covered under warranty, the same crew that built it comes back to address it — we don't hand you off to a general customer service line.", category: "Maintenance" },
  { question: "How should I maintain custom finishes like tile, wood floors, or custom cabinetry?", answer: "We provide a written care guide specific to the materials in your project at final walkthrough, covering cleaning products to avoid, resealing schedules for natural stone or wood, and hardware adjustment tips for cabinetry.", category: "Maintenance" },
  { question: "How is pricing structured — is it a fixed fee or time-and-materials?", answer: "Every project is priced as a single fixed fee covering design, permitting, and construction, agreed upon before work begins. We don't bill hourly or pass through material cost fluctuations without a documented, approved change order.", category: "Pricing" },
  { question: "What's a realistic budget range for a kitchen or bathroom remodel?", answer: "Kitchen remodels in our market typically range from $45,000 for a cosmetic refresh to $120,000+ for a full reconfiguration with custom cabinetry; bathroom remodels range from $18,000 for a cosmetic refresh to $55,000+ for a full gut with reconfigured plumbing. Your consultation will narrow this to your specific scope.", category: "Pricing" },
  { question: "Do you require a deposit, and how are payments structured?", answer: "Projects require a design deposit to begin the design phase, followed by a payment schedule tied to construction milestones (start of construction, rough-in complete, substantial completion, final walkthrough) rather than a lump sum upfront.", category: "Pricing" },
  { question: "How does the design-build process actually flow week to week?", answer: "After your signed proposal, we move through permitting and scheduling, then construction proceeds in phases with weekly written updates and photos, culminating in a scheduled final walkthrough and punch-list sign-off before the project is considered complete.", category: "Process" },
  { question: "What happens if a permit gets delayed by the city?", answer: "Permitting timelines are outside our direct control, but we build realistic permitting windows into your quoted schedule based on current municipal timelines, and we manage all submissions and follow-up directly so delays are caught and communicated early.", category: "Process" },
  { question: "How often will I get updates during construction?", answer: "You'll receive a written weekly schedule update with photos throughout construction, plus direct access to your project manager for anything time-sensitive in between.", category: "Process" },
  { question: "Do you help homeowners rebuild after a storm, fire, or water damage claim?", answer: "Yes — we regularly work storm, fire, and water-damage restoration projects and coordinate directly with insurance adjusters and carriers to align the scope of repair with what's covered under the claim.", category: "Insurance & Financing" },
  { question: "Will you work directly with my insurance adjuster?", answer: "Yes. Our project managers regularly meet adjusters on-site, submit itemized repair estimates that match carrier documentation formats, and communicate directly with your claims representative so you're not relaying information back and forth yourself.", category: "Insurance & Financing" },
  { question: "Do you offer financing options for renovation projects?", answer: "We don't originate financing directly, but we regularly work with clients using home equity lines, renovation-specific mortgage products, and personal financing, and can walk through how a payment schedule aligns with typical financing draw timelines.", category: "Insurance & Financing" },
  { question: "What if my insurance settlement doesn't cover the full scope of needed repairs?", answer: "This comes up often. We provide a clear breakdown of what's covered by the settlement versus what falls outside it, so you can decide whether to proceed with covered scope only, add out-of-pocket scope, or appeal the settlement with our documentation supporting the appeal.", category: "Insurance & Financing" },
  { question: "Do you provide documentation carriers require for a claim, like itemized estimates or photos?", answer: "Yes — we provide itemized scope-of-work estimates, before-and-after photo documentation, and any supplemental damage assessment your carrier requests, formatted to match standard restoration claim documentation.", category: "Insurance & Financing" },
  { question: "Are you licensed and insured as a contractor?", answer: "Yes — Amberlyn holds an active Oregon Construction Contractors Board (CCB) license and carries general liability and workers' compensation insurance, with documentation available on request before you sign a proposal.", category: "Permits & Compliance" },
  { question: "Who pulls the building permits for my project — me or you?", answer: "We pull and manage all required permits directly under our contractor license, including submission, plan review follow-up, and scheduling of all required inspections. You never have to visit city hall yourself.", category: "Permits & Compliance" },
  { question: "Does my home need to go through a historic review board?", answer: "Only if it's located in a designated local historic district — we'll confirm this during your consultation and, if applicable, manage the review board submission as part of the project rather than treating it as a separate process you have to navigate.", category: "Permits & Compliance" },
] as Faq[];

export const emergencyInfo = {
  heading: "Storm, Fire & Water Damage Emergency Response",
  note: "If your home has active water intrusion, storm damage, or fire damage requiring immediate stabilization, call our emergency line — available outside standard studio hours for active emergencies only.",
  referralLocationName: "Amberlyn Emergency Response Line",
  referralLocationPhone: "(503) 555-0199",
  referralLocationPhoneDigits: "5035550199",
  referralLocationAddress: "482 Foundry Row, Ashford Mills, OR 97045",
  instructions: "Shut off water at the main if there's active flooding, move valuables away from the affected area if it's safe to do so, and photograph visible damage before any cleanup begins — this documentation helps both our assessment and your insurance claim. Do not attempt structural repairs yourself.",
  placeholder: false,
};

export const paymentInfo = {
  heading: "How Payment Works",
  methods: ["Bank Transfer / ACH", "Cashier's Check", "Financing Draw Disbursement"],
  insuranceNote: "For insurance-related restoration projects, we invoice according to your carrier's approved scope and can coordinate direct payment from claim disbursements when your policy allows it.",
};

export const providers = [
  {
    slug: "provider-1",
    name: "Mireille Halden",
    credentials: "Founder & Principal Designer, CKD",
    specialty: "Whole-Home Renovation & Interior Design",
    bio: "Mireille founded Amberlyn in 2011 after a decade working as a carpenter for design firms, on the belief that the people designing a space and building it should be the same team.",
    fullBio: "Mireille Halden spent ten years as a working carpenter before earning her Certified Kitchen Designer (CKD) credential and founding Amberlyn in 2011. She holds a degree in Interior Architecture from Oregon State University and has personally led design on more than 150 whole-home renovations. Mireille still walks every whole-home renovation project herself during the initial assessment, and she chairs the studio's weekly design review, where every project's drawings are checked against real-world construction feasibility before a proposal goes to a client. She's a member of the National Kitchen & Bath Association and has served as a guest juror for the regional Remodeler of the Year awards for the past six years.",
    yearsExperience: 15,
    areasOfInterest: ["Whole-home layout reconfiguration", "Kitchen design", "Design-build process leadership"],
    imageKey: "provider-mireille-halden",
    relatedServiceSlugs: ["whole-home-renovation", "interior-design-space-planning"],
    placeholder: false,
  },
  {
    slug: "provider-2",
    name: "Dominic Ferro",
    credentials: "Lead Architect, AIA, Licensed Structural Designer",
    specialty: "Structural Design & Home Additions",
    bio: "Dominic leads structural and architectural design on every addition and structural renovation, translating zoning and engineering constraints into additions that look original to the house.",
    fullBio: "Dominic Ferro is a licensed architect and member of the American Institute of Architects (AIA) with a Master of Architecture from the University of Oregon. Before joining Amberlyn in 2015, he spent six years at a residential architecture firm specializing in additions and second-story conversions. Dominic personally stamps every set of structural drawings Amberlyn submits for permitting and has navigated zoning variance approvals in eleven different municipalities across the region. He teaches an evening continuing-education course on residential structural design at a local community college and is known internally for his rule that no addition ships to permitting without a full roofline tie-in study.",
    yearsExperience: 18,
    areasOfInterest: ["Structural engineering coordination", "Zoning and variance navigation", "Second-story addition design"],
    imageKey: "provider-dominic-ferro",
    relatedServiceSlugs: ["home-additions", "basement-finishing"],
    placeholder: false,
  },
  {
    slug: "provider-3",
    name: "Priya Anand Sethi",
    credentials: "Design Director, NCIDQ Certified",
    specialty: "Interior Design & Kitchen & Bath Design",
    bio: "Priya leads material and finish selection across every project, from kitchen cabinetry to whole-house design palettes, and holds the industry's NCIDQ certification.",
    fullBio: "Priya Anand Sethi is an NCIDQ-certified interior designer with twelve years of residential design experience, including four years at a boutique design firm in Portland before joining Amberlyn in 2018. She leads the studio's material library and vendor relationships, personally vetting every cabinet, counter, and tile line Amberlyn specifies for durability and lead-time reliability before it's added to the showroom. Priya has been featured twice in regional home design publications for kitchen projects and mentors two junior designers currently completing their NCIDQ certification through the studio.",
    yearsExperience: 12,
    areasOfInterest: ["Kitchen and bath material selection", "Whole-house design palettes", "Vendor and material sourcing"],
    imageKey: "provider-priya-anand-sethi",
    relatedServiceSlugs: ["interior-design-space-planning", "kitchen-remodeling"],
    placeholder: false,
  },
  {
    slug: "provider-4",
    name: "Callum Reyes",
    credentials: "Senior Project Manager, OSHA 30",
    specialty: "Construction Project Management",
    bio: "Callum manages the largest projects on our schedule, from whole-home renovations to additions, and is the single point of contact clients work with from proposal through final walkthrough.",
    fullBio: "Callum Reyes has managed construction projects for fourteen years, the last nine with Amberlyn, after starting his career as a framing carpenter and working his way into project management. He holds an OSHA 30 safety certification and personally oversees every milestone inspection on additions and whole-home renovations. Callum built the studio's current weekly client-update system after one too many projects in his early career left clients guessing about schedule status, and he's trained every project manager who has joined Amberlyn since 2019 on that same communication standard.",
    yearsExperience: 14,
    areasOfInterest: ["Large-scope project scheduling", "Client communication systems", "Site safety management"],
    imageKey: "provider-callum-reyes",
    relatedServiceSlugs: ["whole-home-renovation", "home-additions"],
    placeholder: false,
  },
  {
    slug: "provider-5",
    name: "Odalys Marchetti",
    credentials: "Kitchen & Bath Specialist, CBD",
    specialty: "Kitchen & Bathroom Remodeling",
    bio: "Odalys specializes exclusively in kitchen and bathroom layouts, bringing a Certified Bath Designer credential and a deep focus on waterproofing and fixture placement detail.",
    fullBio: "Odalys Marchetti holds a Certified Bath Designer (CBD) credential from the National Kitchen & Bath Association and has focused her entire eleven-year career on kitchen and bathroom design specifically, rather than general residential design. She joined Amberlyn in 2017 after five years designing for a plumbing fixture showroom, which gave her an unusually deep knowledge of fixture specifications, rough-in dimensions, and waterproofing detail that shows up in every layout she draws. Odalys personally reviews every bathroom waterproofing plan before tile work begins and has a zero-callback record on shower waterproofing across her tenure at Amberlyn.",
    yearsExperience: 11,
    areasOfInterest: ["Bathroom waterproofing detail", "Kitchen cabinetry layout", "Universal design and accessibility"],
    imageKey: "provider-odalys-marchetti",
    relatedServiceSlugs: ["kitchen-remodeling", "bathroom-remodeling"],
    placeholder: false,
  },
  {
    slug: "provider-6",
    name: "Thaddeus Okwuosa",
    credentials: "Restoration Carpenter, Preservation Trades Certified",
    specialty: "Historic Restoration & Outdoor Construction",
    bio: "Thaddeus leads all historic restoration projects, bringing traditional joinery and window-restoration expertise, and also heads our outdoor living construction crew.",
    fullBio: "Thaddeus Okwuosa trained as a preservation carpenter through a two-year historic trades apprenticeship before joining Amberlyn in 2013, and holds a Preservation Trades certification in traditional window restoration and plaster repair. He has led restoration work on nine homes listed on local historic registries and personally manages the studio's historic review board submissions, having navigated the approval process in every historic district within the Ashford Mills region. When not on a restoration project, Thaddeus heads Amberlyn's outdoor living construction crew, where his fine-joinery background shows up in built-in outdoor kitchen and seating details other crews often skip.",
    yearsExperience: 13,
    areasOfInterest: ["Historic window and plaster restoration", "Historic district review navigation", "Fine outdoor carpentry and built-ins"],
    imageKey: "provider-thaddeus-okwuosa",
    relatedServiceSlugs: ["historic-home-restoration", "outdoor-living-deck-design"],
    placeholder: false,
  },
  {
    slug: "provider-7",
    name: "Wren Castellane",
    credentials: "Interior Designer & Smart Home Integration Lead",
    specialty: "Interior Design & Smart Home Systems",
    bio: "Wren bridges interior design and technology, designing spaces and the smart systems within them together rather than as an afterthought.",
    fullBio: "Wren Castellane joined Amberlyn in 2020 with a background split between interior design and low-voltage systems integration, a combination that's rare in residential design and shows up directly in how cleanly Amberlyn's smart home installations integrate into finished spaces. Wren holds a Bachelor's degree in Interior Design and a certification in structured cabling and home automation systems, and personally designs the wiring architecture for every smart home project alongside the interior finish plan, rather than treating technology as a bolt-on after design is finished. Wren also runs the studio's annual client training sessions on getting the most out of a newly installed smart home system.",
    yearsExperience: 7,
    areasOfInterest: ["Smart lighting and climate design", "Structured wiring architecture", "Design-integrated technology planning"],
    imageKey: "provider-wren-castellane",
    relatedServiceSlugs: ["smart-home-integration", "interior-design-space-planning"],
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
    title: "How to Budget for a Whole-Home Renovation Without Losing Your Mind",
    category: "Budgeting",
    author: "Mireille Halden",
    date: "2026-02-11",
    readingTime: "8 min read",
    excerpt: "A realistic framework for setting a renovation budget, including the contingency fund every project needs and where costs most often run over.",
    body: [
      "Every whole-home renovation budget conversation we have starts the same way: a homeowner has a number in mind, usually pulled from a friend's project, a home-improvement show, or a rough online calculator, and that number is almost always disconnected from the specifics of their actual house. The single biggest budgeting mistake we see isn't spending too much — it's anchoring to a number before anyone has actually assessed the structural, electrical, and plumbing condition of the home, which is where the real cost variability lives.",
      "Start by separating your budget into three categories: structural and systems work (anything behind the walls that you can't see but absolutely have to address — outdated wiring, an undersized electrical panel, plumbing that's reaching the end of its lifespan), layout and construction (framing, drywall, flooring, the actual shape of the finished space), and finishes (cabinetry, counters, fixtures, paint, hardware). Homeowners tend to budget almost entirely around the third category because it's the most visible and exciting, but on older homes, the first category is often where 30 to 40 percent of the total project cost actually lands.",
      "Build a contingency fund of at least 15 percent of your total budget for whole-home renovations, and don't think of it as optional padding — think of it as the line item covering what a pre-renovation assessment can't fully predict, like what's actually inside a wall once it's opened. Projects that skip a contingency fund are the ones most likely to face a difficult mid-project choice between a costly change order and a compromised outcome.",
      "Get a fixed-fee proposal, not a rough estimate, before committing to a start date. A ballpark verbal number given during a first phone call is not the same thing as a proposal that's been through a structural and systems assessment — the gap between those two numbers is often significant, and it's a normal, expected part of a responsible design-build process rather than a sign that a company is bad at estimating.",
      "Finally, sequence your must-haves versus nice-to-haves before design starts, not after a proposal comes back over budget. Every renovation involves trade-offs, and it's far easier to make those trade-off decisions deliberately at the start — should the extra budget go toward a larger kitchen island or toward better-insulated windows — than to have them forced on you reactively when a bid comes back higher than expected.",
    ],
    imageKey: "resource-budgeting-guide",
    disclaimer: true,
    relatedServiceSlugs: ["whole-home-renovation"],
  },
  {
    slug: "article-2",
    title: "Kitchen Layout 101: Working Triangle vs. Zone Planning",
    category: "Kitchen & Bath",
    author: "Odalys Marchetti",
    date: "2026-03-04",
    readingTime: "6 min read",
    excerpt: "Why the classic 'work triangle' isn't the whole story anymore, and how modern kitchen layouts are actually planned around zones.",
    body: [
      "For decades, kitchen design was taught around the 'work triangle' — the idea that the sink, stove, and refrigerator should form an efficient triangular path with no leg too long or too short. It's not wrong, exactly, but it was developed for a single-cook kitchen in an era before kitchens became the multi-person, multi-purpose hub most households treat them as today, and applying it rigidly to a modern household often produces a layout that technically satisfies the triangle rule while still not working for how the family actually uses the space.",
      "Modern kitchen design is better planned around zones: a prep zone (counter space near the sink and a pull-out cutting board or trash), a cooking zone (stove, oven, and adjacent counter landing space for hot pans), a cleanup zone (sink, dishwasher, and trash/recycling), a cold-storage zone (refrigerator, ideally positioned so it doesn't block the main traffic path), and increasingly a landing zone near the entry for mail, bags, and keys. Zone planning accounts for the reality that most kitchens now have more than one person working in them at once, and that a lot of kitchen time isn't cooking at all — it's homework, morning coffee, and unloading groceries.",
      "One of the most common layout mistakes we see in pre-renovation kitchens is a single, narrow walkway that every zone funnels through, so that unloading groceries, cooking, and someone doing homework at the island are all competing for the same six feet of floor space. Widening or rerouting that circulation path is often a bigger functional upgrade than any single finish decision, even though it's less visually exciting than picking a counter material.",
      "Island size and placement deserves its own consideration separate from the rest of the zones. An island needs at least 42 inches of clearance on all sides for comfortable two-way traffic, and 48 inches where stools or a second cook will regularly be present — a common mistake is sizing an island for the showroom photo rather than the specific dimensions of the room it's going into, which results in a beautiful island that makes the kitchen feel cramped rather than more functional.",
      "When we start a kitchen layout consultation, we ask less about finishes and more about routine: who cooks, whether more than one person is in the kitchen at once, where backpacks and mail currently pile up, and whether the dining table is close by or in a separate room. Those answers, more than any style trend, determine whether a layout will actually work once the renovation is finished and daily life resumes.",
    ],
    imageKey: "resource-kitchen-layout",
    disclaimer: true,
    relatedServiceSlugs: ["kitchen-remodeling"],
  },
  {
    slug: "article-3",
    title: "Small Bathroom, Big Impact: Space-Saving Renovation Strategies",
    category: "Kitchen & Bath",
    author: "Odalys Marchetti",
    date: "2026-03-21",
    readingTime: "5 min read",
    excerpt: "Practical layout and fixture strategies for making a small bathroom feel and function larger, without expanding its footprint.",
    body: [
      "Most small bathrooms aren't actually short on square footage — they're short on efficient use of the square footage they have. Before assuming a bathroom needs to expand into an adjacent closet or bedroom to feel bigger, it's worth evaluating whether the existing footprint is being used well, because layout inefficiency, not raw size, is the more common culprit.",
      "A curbless or low-curb shower is one of the highest-impact small-bathroom moves available, because it removes a visual and physical barrier that makes even a generously sized shower feel like a separate, boxed-off compartment. Pairing a curbless shower with a frameless glass panel instead of a full enclosure lets sightlines carry across the whole room instead of stopping at a shower door.",
      "Wall-hung vanities and toilets free up visible floor space, which reads as more room even though the actual usable floor area hasn't technically increased — this is one of the more reliable 'feels bigger' tricks in small-bathroom design, because visible floor space is what our eyes actually use to judge a room's size.",
      "Large-format tile with minimal grout lines, used consistently on both floor and lower walls, reduces visual clutter and creates a sense of continuity that smaller, busier tile patterns interrupt. This doesn't mean small bathrooms need to be plain — it means pattern and color are often better used in one deliberate accent location (a shower niche, a single accent wall) rather than spread across every surface.",
      "Finally, lighting layered at multiple heights — not just a single overhead fixture — does more for a small bathroom's sense of space than almost any other single change. A wall sconce at mirror height plus a small amount of dimmable overhead light avoids the flat, harsh look that a single central fixture almost always produces in a compact room.",
    ],
    imageKey: "resource-small-bathroom",
    disclaimer: true,
    relatedServiceSlugs: ["bathroom-remodeling"],
  },
  {
    slug: "article-4",
    title: "Do You Need an Architect or a Designer? A Homeowner's Guide",
    category: "Design",
    author: "Priya Anand Sethi",
    date: "2026-04-02",
    readingTime: "6 min read",
    excerpt: "A plain-language breakdown of when a project needs an architect, when it needs an interior designer, and when it needs both.",
    body: [
      "One of the most common points of confusion at the start of a renovation is not knowing which professional a given project actually requires — the terms 'architect' and 'interior designer' get used loosely, but they represent genuinely different licenses, training, and scopes of responsibility, and knowing the difference helps set realistic expectations about timeline and cost.",
      "An architect is licensed to design and stamp drawings for anything involving a building's structure — load-bearing walls, foundations, additions, rooflines, and anything that requires structural engineering sign-off for permitting. If your project involves removing a wall, adding square footage, or changing the building's exterior form, you need an architect involved, whether or not you also want interior design help.",
      "An interior designer focuses on layout within existing structural boundaries, material and finish selection, lighting, and furnishings. Many interior designers, including our own team, are also trained in space planning that touches on non-structural layout changes — moving a non-load-bearing wall, reconfiguring a kitchen within its existing footprint — but that's a different scope than structural design.",
      "Many projects need both, sequentially or simultaneously: an addition needs an architect for the structural shell and an interior designer for the finished interior; a kitchen remodel that's staying within its existing footprint might need only an interior designer, unless it also involves removing a wall, in which case an architect needs to weigh in on that specific element even if the rest of the project doesn't require one.",
      "This is exactly why we built Amberlyn as a design-build studio with both licensed architects and interior designers on staff, working from the same set of drawings — most homeowners don't actually know at the outset which professional their project needs, and shouldn't have to figure that out themselves before they can even get a useful first consultation.",
    ],
    imageKey: "resource-architect-vs-designer",
    disclaimer: true,
    relatedServiceSlugs: ["interior-design-space-planning"],
  },
  {
    slug: "article-5",
    title: "Permits, Inspections, and Timelines: What Actually Slows Down a Remodel",
    category: "Process",
    author: "Callum Reyes",
    date: "2026-04-18",
    readingTime: "7 min read",
    excerpt: "A plain-language walkthrough of the permitting process and the most common reasons renovation timelines slip.",
    body: [
      "Permitting is the single most misunderstood piece of a renovation timeline. Homeowners often assume 'permit' means a quick form submission, but for anything beyond cosmetic finish work, it typically involves plan review by the municipality, sometimes multiple review cycles if the initial submission needs revisions, and then a series of scheduled inspections throughout construction that the project can't proceed past without passing.",
      "The most common permitting delay we see isn't a slow municipal review — it's an incomplete or inaccurate initial submission that triggers a revision cycle, which can add two to four weeks to a project that would otherwise have moved through review on the first pass. This is why we manage permit submissions directly with drawings prepared specifically to the standards of the municipality we're submitting to, rather than using a generic drawing template across every jurisdiction.",
      "Inspections happen at defined construction milestones — typically after rough framing, after rough electrical and plumbing, and at final completion — and each one has to pass before the next phase of construction can legally proceed. Scheduling these inspections early and tracking municipal inspector availability is a real part of project management, not an afterthought, because inspector scheduling backlogs are a genuine and common source of multi-week delays that have nothing to do with the quality of the work itself.",
      "Weather is the other major, and often underestimated, timeline factor for any project involving exterior work — additions, roofing, decks, or foundation work. We build reasonable weather contingency into any exterior-heavy project schedule rather than presenting an optimistic best-case timeline that's likely to slip the first time it rains for a week straight.",
      "The best way to protect your timeline isn't to rush the permitting process — it's to build a realistic timeline into your proposal from the start, informed by current, specific data about your municipality's actual review times, rather than a generic industry average. We track our own permitting turnaround times by jurisdiction and update our proposed schedules based on real, recent data rather than guesswork.",
    ],
    imageKey: "resource-permits-timeline",
    disclaimer: true,
    relatedServiceSlugs: ["home-additions"],
  },
  {
    slug: "article-6",
    title: "Basement Finishing Checklist: Moisture, Egress, and Ceiling Height",
    category: "Additions & Structural",
    author: "Dominic Ferro",
    date: "2026-05-06",
    readingTime: "7 min read",
    excerpt: "The three factors that determine whether a basement can actually be finished the way you're picturing it — before layout planning even starts.",
    body: [
      "Before any basement finishing layout conversation happens, three factors need to be evaluated, because each one can significantly change or limit what's actually possible in the space: moisture condition, ceiling height, and egress requirements for any bedroom being added. Skipping this assessment in favor of jumping straight to floor plans is the most common reason basement projects run into expensive mid-project surprises.",
      "Moisture is the most consequential of the three. A basement doesn't need to have obvious standing water to have a moisture problem — efflorescence (white mineral deposits on foundation walls), a musty smell, or condensation on cold surfaces during humid months are all signs of moisture that needs to be resolved before any finish materials go in. Finishing over an unresolved moisture issue doesn't just risk mold — it risks having to demolish brand-new finish work later to address the underlying problem, which is a far more expensive fix than addressing it upfront.",
      "Ceiling height matters both for comfort and for code. After accounting for framing, insulation, and drywall or a drop ceiling for mechanical access, most jurisdictions require a minimum finished ceiling height for habitable basement space — if your current unfinished ceiling height is close to that minimum, the finishing process itself could push you under the code threshold, which needs to be identified and planned around before construction, not discovered during a failed inspection.",
      "Egress is the requirement most homeowners haven't heard of before finishing a basement, and it only applies if you're adding a legal bedroom: any basement bedroom needs a window (or door) meeting specific minimum dimensions for both the opening and any exterior window well, sized so a person could exit through it in an emergency and a firefighter could enter through it. If your basement doesn't currently have a window meeting those dimensions, adding one — which involves exterior excavation for a window well — needs to be scoped and permitted as part of the project.",
      "Once these three factors are assessed and any necessary remediation (waterproofing, egress window installation) is scoped separately from the finish-out work, the layout planning conversation becomes much more straightforward, because you're designing within confirmed constraints rather than discovering a limitation midway through construction.",
    ],
    imageKey: "resource-basement-checklist",
    disclaimer: true,
    relatedServiceSlugs: ["basement-finishing"],
  },
  {
    slug: "article-7",
    title: "Restoring a Historic Home Without Losing Its Character",
    category: "Restoration",
    author: "Thaddeus Okwuosa",
    date: "2026-05-29",
    readingTime: "8 min read",
    excerpt: "How to approach updating a pre-1950s home's systems and function while preserving the original details that make it worth owning.",
    body: [
      "Owning a historic home comes with a specific tension: the systems (electrical, plumbing, insulation) are usually genuinely due for an update, but the original materials — plaster, wood windows, trim profiles, sometimes original flooring — often carry both aesthetic and, in some cases, real legal preservation significance. The goal in a good historic renovation isn't to modernize everything possible; it's to update what genuinely needs updating while protecting what makes the house what it is.",
      "Original wood windows are the most commonly, and unnecessarily, replaced element in historic homes. Well-built original windows, properly weatherstripped and paired with a storm window, can perform close to modern replacement windows on energy efficiency while preserving proportions and glass characteristics that vinyl replacements simply can't replicate. Restoration — reglazing, re-weatherstripping, repairing sash cords — is almost always the better long-term choice for windows in reasonable structural condition.",
      "Plaster walls, similarly, are often demolished and replaced with drywall out of assumed necessity rather than actual necessity. Cracked or damaged plaster can usually be repaired with skim-coating and patching techniques rather than full demolition, preserving the subtly different texture and sound-dampening qualities that plaster has compared to drywall — differences that are hard to notice individually but add up to a distinctly different feel in a finished room.",
      "Systems updates — new electrical circuits, updated plumbing, added insulation — are where a historic renovation requires the most planning discipline, because the natural path for these updates (cutting into walls and ceilings) is also the most destructive to original plaster and millwork. Routing new wiring through less visible paths, even when it takes more labor time, and using minimally invasive techniques for insulation upgrades preserves far more of the original material than a standard-approach renovation would.",
      "If your home sits within a designated local historic district, exterior changes typically require review board approval separate from standard building permits — a process that can feel intimidating to navigate alone but is far more manageable with a design-build team that has been through it before and knows what documentation the review board expects to see.",
    ],
    imageKey: "resource-historic-restoration",
    disclaimer: true,
    relatedServiceSlugs: ["historic-home-restoration"],
  },
  {
    slug: "article-8",
    title: "Outdoor Living Trends: Designing a Deck That Works Year-Round",
    category: "Outdoor & Landscape",
    author: "Thaddeus Okwuosa",
    date: "2026-06-14",
    readingTime: "6 min read",
    excerpt: "How to design an outdoor living space that gets used in more than just the three warmest months of the year.",
    body: [
      "The most common regret we hear about older decks isn't about materials or style — it's that the space only gets real use for a few months a year. A deck or outdoor living space designed with year-round use in mind looks meaningfully different from one designed purely for peak-summer entertaining, and that difference is worth planning for from the start rather than retrofitting later.",
      "Covering at least part of the space — a pergola, a covered porch extension, or a partial roof structure — is the single highest-impact decision for extending seasonal use, because it protects against both rain and direct sun, the two conditions that push people back indoors most often outside of genuinely cold weather. Even a modest covered zone, paired with an open area for sunny days, meaningfully extends how many months the space gets used.",
      "Adding a heat source — a built-in fire feature, a wall-mounted heater, or simply planning electrical capacity for portable heaters — turns a space that's comfortable for six months into one that's comfortable for nine or ten in most climates. This needs to be planned during design, not added as an afterthought, because heat sources have real clearance, ventilation, and electrical or gas requirements that are far easier to build in from the start.",
      "Material choice affects year-round comfort more than most people expect. Composite decking stays significantly cooler underfoot in direct summer sun than many wood species, while certain wood species handle freeze-thaw cycles and moisture better than others — the right material choice depends on your specific climate exposure and how the space will actually be used, which is a conversation worth having before defaulting to whatever material looks best in a showroom sample.",
      "Finally, outdoor kitchens and built-in seating benefit from the same proportion and sightline thinking as an interior room — a poorly proportioned outdoor kitchen counter or seating area feels just as awkward outside as it would inside, and it's one of the more common mistakes in DIY or poorly planned outdoor projects. Treating an outdoor living space with the same design discipline as an interior room, rather than as an afterthought project, is what makes the difference between a deck that gets used year-round and one that becomes a rarely used backdrop for a few summer barbecues.",
    ],
    imageKey: "resource-outdoor-living-trends",
    disclaimer: true,
    relatedServiceSlugs: ["outdoor-living-deck-design"],
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
    title: "Essential Refresh",
    subtitle: "For focused, single-room projects with a defined finish upgrade",
    bullets: [
      "Best for one bathroom, a cosmetic kitchen refresh, or a single-room design project",
      "Design phase of two to three weeks with one designer assigned",
      "Fixed-fee proposal delivered within five business days of design sign-off",
    ],
  },
  {
    title: "Full Renovation Partnership",
    subtitle: "Our most common engagement — full design-build for kitchens, baths, basements, and additions",
    bullets: [
      "Dedicated project manager and design team from consultation through final walkthrough",
      "In-house architecture, interior design, permitting management, and construction crews",
      "Weekly written progress updates with photos throughout construction",
      "One-year workmanship warranty included on all completed construction",
    ],
  },
  {
    title: "Estate & Historic Restoration Program",
    subtitle: "For historic homes, large estates, and multi-phase whole-property renovations",
    bullets: [
      "Dedicated restoration carpenter and historic review board coordination included",
      "Multi-phase project sequencing across a full property, scheduled over multiple seasons if needed",
      "Priority scheduling with our most senior design and construction staff",
      "Extended two-year workmanship warranty on restoration-specific craftsmanship",
    ],
  },
] as { title: string; subtitle: string; bullets: string[] }[];

export const serviceChoiceSteps = [
  { step: "01", title: "Tell us what's going on", copy: "Share a quick description of your concern, and our team points you to the right care path." },
  { step: "02", title: "Compare care paths", copy: "Browse services by category, duration, and who each one is best suited for." },
  { step: "03", title: "Book with confidence", copy: "Once you've found the right fit, book directly — no guesswork required." },
] as { step: string; title: string; copy: string }[];

export const newClientSteps = [
  { step: "01", title: "Schedule Your Consultation", copy: "Call, email, or use our online form to schedule a 45-minute walkthrough of your space, in person or virtual." },
  { step: "02", title: "Walkthrough & Assessment", copy: "A designer and, for structural projects, our architect walk the space, discuss priorities, and flag anything affecting scope or budget." },
  { step: "03", title: "Design & Fixed-Fee Proposal", copy: "We produce layout options and a finish direction, then deliver a single fixed-fee proposal covering design, permitting, and construction." },
  { step: "04", title: "Permitting & Scheduling", copy: "Once you sign, we handle all permit submissions and confirm a construction start date and phased schedule." },
  { step: "05", title: "Construction & Final Walkthrough", copy: "Our in-house crews build the project with weekly updates, ending in a scheduled punch-list walkthrough before handoff." },
] as { step: string; title: string; copy: string }[];

export const whatToBring = [
  "Photos or a folder of inspiration images for the space you're renovating",
  "A rough budget range you're comfortable sharing, even if it's a wide range",
  "Any existing floor plans, blueprints, or survey documents for the property",
  "A list of must-haves versus nice-to-haves for the project",
  "HOA covenants or historic district documentation, if applicable to your property",
] as string[];

export const clinicExperienceFeatures = [
  { title: "Working Material Library", copy: "A full showroom of real cabinet, counter, tile, and flooring samples you can see and touch in person before committing to a selection.", imageKey: "studio-material-library" },
  { title: "3D Design Visualization Suite", copy: "A dedicated design room where our team walks you through full 3D renderings of your project before construction ever starts.", imageKey: "studio-visualization-suite" },
  { title: "Sample Kitchen & Bath Vignettes", copy: "Full-scale built kitchen and bathroom vignettes on our showroom floor, so you can experience cabinetry, counters, and fixtures at real scale.", imageKey: "studio-sample-vignettes" },
  { title: "In-House Design Studio", copy: "Our architects and interior designers work out of the same studio space, not separate offices, so questions get answered in real time during your project.", imageKey: "studio-design-studio" },
  { title: "Client Coffee & Consultation Lounge", copy: "A comfortable lounge space for consultations and project check-ins, separate from the working studio floor.", imageKey: "studio-consultation-lounge" },
  { title: "Kids' Corner", copy: "A supervised-by-you play corner stocked with books and toys, because we know consultations are easier to schedule when you don't need separate childcare.", imageKey: "studio-kids-corner" },
] as { title: string; copy: string; imageKey: string }[];

export const clientStories = [
  {
    clientName: "The Okafor Family",
    segment: "Whole-Home Renovation",
    category: "Full-Home Renovation",
    story: "The Okafors bought a 1978 split-level with a chopped-up floor plan that no longer fit their family of five. Amberlyn's whole-home renovation opened the main floor, relocated the kitchen to face the backyard, and added a mudroom off the garage. Sixteen weeks later, the family describes the house as 'finally matching how we actually live' — and the open sightline from kitchen to living room means they can supervise homework and cook dinner at the same time for the first time in six years in the house.",
    imageKey: "story-okafor-family",
    serviceSlug: "whole-home-renovation",
  },
  {
    clientName: "Marcus & Elena Whitfield",
    segment: "Kitchen Remodeling",
    category: "Kitchen & Bath",
    story: "The Whitfields' original kitchen layout idea — a peninsula island against the exterior wall — would have blocked their best natural light source, something our design team flagged before any renderings were made. The revised layout centers a freestanding island and relocates the range to the exterior wall instead. Nine weeks after demolition, the family reports the kitchen 'finally feels like the heart of the house instead of a hallway with appliances in it.'",
    imageKey: "story-whitfield-kitchen",
    serviceSlug: "kitchen-remodeling",
  },
  {
    clientName: "Renata Alvez",
    segment: "Bathroom Remodeling",
    category: "Kitchen & Bath",
    story: "Renata's primary bathroom had a garden tub she never used and a shower too small for comfortable daily use. We removed the tub entirely, expanded the shower to a curbless walk-in design with a full glass panel, and relocated the vanity for better morning traffic flow. Two years post-completion, the waterproofing remains flawless, and Renata says the redesigned space added more daily quality-of-life improvement than any other renovation she's done to the house.",
    imageKey: "story-alvez-bathroom",
    serviceSlug: "bathroom-remodeling",
  },
  {
    clientName: "Owen & Priya Faircastle",
    segment: "Home Addition",
    category: "Additions & Structural",
    story: "The Faircastles needed two more bedrooms for a growing family but didn't want their 1962 ranch to look visibly renovated from the street. Dominic's structural team matched the new second story's roofline pitch and window proportions so precisely that several neighbors assumed the addition had always been part of the house. The project took twenty-two weeks including an eight-week permitting window for the structural addition, which the family says Amberlyn had accurately predicted from day one.",
    imageKey: "story-faircastle-addition",
    serviceSlug: "home-additions",
  },
  {
    clientName: "Terrence Boyle",
    segment: "Basement Finishing",
    category: "Additions & Structural",
    story: "Two other contractors had quoted Terrence's basement finishing project without mentioning the mild moisture readings our team flagged during assessment. We resolved the drainage issue as a separate phase-one scope before finishing the space into a home office and guest bedroom with a code-compliant egress window. Terrence's basement has been dry and comfortable through two full winters since completion, something he credits directly to catching the moisture issue before finish materials went in.",
    imageKey: "story-boyle-basement",
    serviceSlug: "basement-finishing",
  },
  {
    clientName: "The Beaumont Estate",
    segment: "Historic Home Restoration",
    category: "Restoration",
    story: "The Beaumonts' 1908 farmhouse sits within a designated local historic district, and they wanted updated systems without losing the home's original wood windows and plaster detail. Thaddeus's restoration crew reglazed and re-weatherstripped all eighteen original windows rather than replacing them, skim-coated and repaired the original plaster throughout, and routed all new wiring through minimally invasive paths. The historic review board approved the project's exterior scope on the first submission, something the family credits to Amberlyn's experience navigating that specific district's requirements.",
    imageKey: "story-beaumont-restoration",
    serviceSlug: "historic-home-restoration",
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
  number: "540+",
  label: "Renovations completed since Amberlyn opened in 2011",
};

export const proofCareStats = [
  { value: "4.9 / 5", label: "Average client rating", description: "Based on 380+ verified reviews across Google and our own post-project client surveys since 2011." },
  { value: "92%", label: "Referral & repeat client rate", description: "The majority of our projects come from past client referrals or homeowners returning for a second or third renovation." },
  { value: "0 callbacks", label: "Shower waterproofing callback rate", description: "Zero waterproofing-related callbacks across every bathroom project our Kitchen & Bath team has completed since 2017." },
] as { value: string; label: string; description: string }[];

export const proofPageStories = [
  { label: "Split-level to open-concept, in sixteen weeks", note: "The Okafor family's whole-home renovation reconfigured a chopped-up 1978 floor plan into an open main floor built around how a family of five actually lives." },
  { label: "An addition that fooled the neighbors", note: "The Faircastle family's second-story addition matched the original 1962 roofline and window proportions so precisely that neighbors couldn't tell it wasn't original construction." },
  { label: "Eighteen historic windows, zero replaced", note: "The Beaumont estate's 1908 farmhouse restoration preserved every original window through careful reglazing and re-weatherstripping instead of vinyl replacement." },
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
