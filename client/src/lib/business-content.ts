export const businessConfig = {
  name: "Summit Air & Home Services",
  shortName: "Summit Air",
  tagline: "Comfort at Every Season.",
  descriptor: "HVAC, Air Conditioning & Indoor Air Quality",
  schemaType: "HVACBusiness",
  address: "125 Rizal Avenue",
  city: "San Pablo City, Laguna, Philippines",
  phone: "+63 917 555 0148",
  phoneDigits: "+639175550148",
  email: "hello@summitairhome.example",
  hours: "Mon–Fri 8AM–6PM · Sat 8AM–4PM · Sun Emergency Only",
  googleReviewUrl: "https://www.google.com/search?q=Summit+Air+%26+Home+Services+reviews",
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=125+Rizal+Avenue,+San+Pablo+City,+Laguna,+Philippines",
  businessHours: [
    { days: "Monday–Friday", hours: "8:00 AM–6:00 PM" },
    { days: "Saturday", hours: "8:00 AM–4:00 PM" },
    { days: "Sunday", hours: "Emergency Service Only" },
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
    heroHeadline: "Reliable Comfort for Every Season.",
    heroSubheadline:
      "From air conditioner repairs and installations to preventive maintenance and indoor air quality solutions, Summit Air & Home Services helps keep your home or business comfortable.",
    heroStatValue: "12+ Years",
    heroStatCaption: "Keeping Laguna homes and businesses comfortable",
    heroBadgeText: "HVAC & Home Comfort Services",
    trustStatsTitle: "Trusted Service for Everyday Comfort",
    servicesEyebrow: "Our Services",
    servicesTitle: "HVAC Solutions Built Around Your Needs",
    servicesSubtitle:
      "From urgent repairs to full system installations, explore the full range of HVAC services we provide for homes and small businesses across Laguna.",
    whyUsEyebrow: "Why Choose Us",
    whyUsTitle: "Why Homeowners Choose Summit",
    whyUsSubtitle: "Practical, dependable HVAC service without the unnecessary upselling.",
    teamEyebrow: "Our Team",
    teamTitle: "Meet the Team Behind the Service",
    teamSubtitle: "Experienced technicians and specialists dedicated to keeping your home comfortable.",
    howItWorksEyebrow: "How It Works",
    howItWorksTitle: "Getting Comfortable Is Simple",
    howItWorksSubtitle: "A straightforward path from your first call to a fully restored system.",
    facilityEyebrow: "Our Work",
    facilityTitle: "What to Expect From Our Team",
    successStoriesTitle: "Real Comfort Stories From Real Clients",
    reviewsTitle: "What Our Customers Are Saying",
    reviewsSubtitle: "Real feedback from homeowners and businesses we've helped stay comfortable.",
    resourcesEyebrow: "Resources",
    resourcesTitle: "HVAC Tips & Guides",
    resourcesSubtitle: "Practical advice to help you get more from your HVAC system.",
    resourceCardLabel: "Guide",
    carePlansEyebrow: "Maintenance Plans",
    carePlansTitle: "Proactive Care for Every Season",
    faqTeaserEyebrow: "FAQs",
    faqTeaserTitle: "Frequently Asked Questions",
    faqTeaserSubtitle: "Answers to common questions about our HVAC services.",
    locationEyebrow: "Service Area",
    locationTitle: "Serving Laguna and Nearby Communities",
    finalCtaTitle: "Ready for Reliable Comfort?",
    finalCtaSubtitle: "Book a service or call our team to get started today.",
    leadGenForm: {
      heading: "Need Help With Your HVAC System?",
      subheading: "Tell us what you need, and our team will get back to you about the next steps.",
      submitButton: "Request Service",
      successMessage: "Thanks! Our team will reach out shortly to confirm your service details.",
      privacyNote: "We respect your privacy and will only use your information to respond to your request.",
    },
  },
  about: {
    heroEyebrow: "About Us",
    heroTitle: "About Summit Air & Home Services",
    heroSubtitle: "Reliable comfort solutions for homes and small businesses, serving Laguna since 2014.",
    valuesEyebrow: "Our Values",
    valuesTitle: "What Guides Our Work",
    valueLabel: "Value",
    approachEyebrow: "Our Approach",
    approachParagraph1:
      "Founded in 2014, Summit Air & Home Services set out to bring dependable, straightforward HVAC service to homes and small businesses across Laguna. What started as a small team of technicians has grown into a trusted name for air conditioning repair, installation, and indoor air quality solutions.",
    approachParagraph2:
      "Every visit is guided by the same principle: diagnose carefully, explain clearly, and do the work right the first time. Whether it's a same-day repair or a full system installation, our technicians take the time to walk clients through their options before any work begins.",
    staffEyebrow: "Our People",
    staffTitle: "Meet the Team Behind the Service",
    ctaTitle: "Ready to Work With Our Team?",
  },
  services: {
    heroTitle: "HVAC Solutions Built Around Your Needs",
    heroSubtitle: "Explore our full range of air conditioning and HVAC services for homes and small businesses in Laguna.",
    introText: "From urgent repairs to full system installations, here's how we help keep your space comfortable year-round.",
    ctaTitle: "Need Help Choosing the Right Service?",
  },
  serviceDetail: {
    benefitsEyebrow: "Benefits",
    processEyebrow: "Our Process",
    processTitle: "How This Service Works",
  },
  team: {
    heroEyebrow: "Our Team",
    heroTitle: "Meet the Team Behind the Service",
    heroSubtitle: "Experienced technicians and specialists who keep Laguna homes and businesses comfortable.",
    gridEyebrow: "Technicians & Specialists",
    gridTitle: "Meet Our HVAC Technicians",
    ctaTitle: "Ready to Schedule a Visit?",
  },
  proof: {
    heroEyebrow: "Testimonials",
    heroTitle: "What Our Customers Are Saying",
    heroSubtitle: "Real feedback from homeowners and businesses across Laguna.",
    statsEyebrow: "By the Numbers",
    statsTitle: "Trusted Service for Everyday Comfort",
    statsCaption: "Numbers that reflect our commitment to reliable HVAC service.",
    statCardLabel: "Stat",
    storiesEyebrow: "Client Stories",
    ctaTitle: "Ready to Experience the Difference?",
  },
  faq: {
    heroEyebrow: "FAQs",
    heroTitle: "Frequently Asked Questions",
    heroSubtitle: "Answers to common questions about our HVAC services, scheduling, and more.",
    contactEyebrow: "Still Have Questions?",
    contactTitle: "Get in Touch",
    callLabel: "Call Us",
    callDescription: "Speak directly with our team about your HVAC needs.",
    emailLabel: "Email Us",
    emailDescription: "Send us a message and we'll respond as soon as we can.",
    ctaTitle: "Ready to Book a Service?",
  },
  location: {
    heroEyebrow: "Service Area",
    heroTitle: "Serving Laguna and Nearby Communities",
    heroSubtitle: "Find us in San Pablo City, or reach out for service anywhere in our coverage area.",
    startTitle: "Getting Started",
    directionsEyebrow: "Directions",
    directionsTitle: "Find Your Way to Summit Air & Home Services",
    landmarkLabel: "Nearby Landmark",
    addressLabel: "Our Address",
    hoursEyebrow: "Hours",
    hoursTitle: "Business Hours",
    emergencyTitle: "HVAC Emergency?",
    referralLabel: "Emergency Line",
    whatToDoLabel: "What To Do",
    afterHoursTitle: "After-Hours Emergency Support",
  },
  resources: {
    heroEyebrow: "Resources",
    heroTitle: "HVAC Tips & Guides",
    heroSubtitle: "Practical advice to help you get more from your HVAC system.",
    disclaimerText: "These articles are general guides and not a substitute for an in-person inspection by a qualified technician.",
    gridEyebrow: "Latest Articles",
    gridTitle: "Browse All Articles",
    ctaTitle: "Have a Question We Didn't Cover?",
  },
  articleDetail: {
    bodyEyebrow: "Guide",
    disclaimerText: "This article is for general informational purposes and does not replace a professional inspection.",
    relatedEyebrow: "Keep Reading",
    relatedTitle: "Related Articles",
    ctaTitle: "Need Help With Your HVAC System?",
  },
  newClients: {
    heroEyebrow: "New Customers",
    heroTitle: "What to Expect as a New Customer",
    heroSubtitle: "Here's how to get started with Summit Air & Home Services.",
    stepsEyebrow: "Getting Started",
    stepsTitle: "Your First Service Visit, Step by Step",
    bringEyebrow: "Before We Arrive",
    bringTitle: "What to Have Ready",
    ctaTitle: "Ready to Book Your First Visit?",
  },
  notFound: {
    heroTitle: "Page Not Found",
    heroSubtitle: "The page you're looking for doesn't exist or may have moved.",
    ctaTitle: "Let's Get You Back on Track",
  },
  siteShell: {
    footerTagline: "Comfort at Every Season.",
    bookingDetailsText: "Book online or call our team directly to schedule your HVAC service.",
  },
} as const;

export const aboutValues = [
  { title: "Reliability", copy: "Dependable service and practical solutions." },
  { title: "Clarity", copy: "Straightforward explanations and transparent recommendations." },
  { title: "Respect", copy: "Care for every home, business, and customer." },
  { title: "Continuous Improvement", copy: "Ongoing development of skills and processes." },
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
    slug: "air-conditioning-repair",
    title: "Air Conditioning Repair",
    short: "Fast diagnostics and reliable repairs to restore cooling and comfort.",
    detail:
      "When your air conditioner stops cooling properly, our technicians diagnose the issue quickly and walk you through repair options before any work begins.",
    category: "Repair",
    benefits: ["Same-day diagnostics available", "Transparent repair pricing", "Workmanship-backed repairs"],
    process: serviceProcess(1, [
      ["Diagnose the Issue", "We inspect your system and identify what's causing the problem."],
      ["Explain Your Options", "We walk you through the recommended repair and its cost before starting."],
      ["Complete the Repair", "We complete the approved work and confirm the system is cooling properly."],
    ]),
    duration: "45–90 mins",
    imageKey: "[SERVICE_1_IMAGE]",
  },
  {
    number: "02",
    slug: "air-conditioner-installation",
    title: "Air Conditioner Installation",
    short: "Professional installation sized and configured for your space.",
    detail:
      "We assess your space, cooling needs, and budget to recommend and install a system sized correctly for your home or business.",
    category: "Installation",
    benefits: ["Sized for your space", "Manufacturer-trained installers", "Clear walkthrough after installation"],
    process: serviceProcess(2, [
      ["Assess Your Space", "We evaluate room size, layout, and cooling needs."],
      ["Recommend a System", "We suggest a unit sized and configured for your space and budget."],
      ["Install & Test", "We install the system and test it before we leave."],
    ]),
    duration: "3–6 hours",
    imageKey: "[SERVICE_2_IMAGE]",
  },
  {
    number: "03",
    slug: "air-conditioner-cleaning",
    title: "Air Conditioner Cleaning",
    short: "Deep cleaning to improve airflow, efficiency, and indoor comfort.",
    detail:
      "Routine deep cleaning removes built-up dust and debris that can restrict airflow and reduce cooling efficiency.",
    category: "Maintenance",
    benefits: ["Improved airflow", "Better energy efficiency", "Extended unit lifespan"],
    process: serviceProcess(3, [
      ["Inspect the Unit", "We check the condition of filters, coils, and drainage."],
      ["Deep Clean", "We clean the components that affect airflow and efficiency."],
      ["Test Performance", "We confirm the unit is cooling and draining properly."],
    ]),
    duration: "45–60 mins",
    imageKey: "[SERVICE_3_IMAGE]",
  },
  {
    number: "04",
    slug: "preventive-maintenance",
    title: "Preventive Maintenance",
    short: "Scheduled maintenance designed to help prevent unexpected breakdowns.",
    detail:
      "Scheduled inspections and tune-ups designed to catch small issues before they become costly breakdowns.",
    category: "Maintenance",
    benefits: ["Fewer unexpected breakdowns", "Consistent system performance", "Documented service history"],
    process: serviceProcess(4, [
      ["Full Inspection", "We check every major component for early signs of wear."],
      ["Tune-Up", "We make small adjustments to keep the system running efficiently."],
      ["Report & Recommendations", "We share what we found and any recommended next steps."],
    ]),
    duration: "60–90 mins",
    imageKey: "[SERVICE_4_IMAGE]",
  },
  {
    number: "05",
    slug: "hvac-system-installation",
    title: "HVAC System Installation",
    short: "Complete HVAC installation for homes and small commercial spaces.",
    detail:
      "Complete HVAC system installation for homes and small commercial spaces, from planning through final testing.",
    category: "Installation",
    benefits: ["Full system design and planning", "Licensed installation team", "Post-install performance check"],
    process: serviceProcess(5, [
      ["Plan the System", "We design a layout suited to your space and usage."],
      ["Install", "Our team installs the full system according to plan."],
      ["Final Testing", "We test every zone and walk you through the new system."],
    ]),
    duration: "1–2 days",
    imageKey: "[SERVICE_5_IMAGE]",
  },
  {
    number: "06",
    slug: "indoor-air-quality",
    title: "Indoor Air Quality Solutions",
    short: "Practical solutions designed to improve indoor comfort and airflow.",
    detail:
      "Practical solutions, from filtration to ventilation improvements, designed to improve indoor comfort and airflow.",
    category: "Air Quality",
    benefits: ["Reduced dust and allergens", "Improved airflow balance", "Options for every budget"],
    process: serviceProcess(6, [
      ["Assess Air Quality", "We evaluate airflow, filtration, and ventilation in your space."],
      ["Recommend Solutions", "We suggest practical, budget-conscious improvements."],
      ["Install & Confirm", "We install the agreed solution and confirm the improvement."],
    ]),
    duration: "60–90 mins",
    imageKey: "[SERVICE_6_IMAGE]",
  },
  {
    number: "07",
    slug: "duct-cleaning",
    title: "Duct Cleaning",
    short: "Professional cleaning to remove accumulated dust and debris from ductwork.",
    detail:
      "Professional cleaning to remove accumulated dust and debris from ductwork, supporting better airflow and air quality.",
    category: "Maintenance",
    benefits: ["Improved air quality", "Reduced dust circulation", "Better airflow throughout your space"],
    process: serviceProcess(7, [
      ["Inspect Ductwork", "We check for buildup, blockages, or leaks."],
      ["Clean Thoroughly", "We remove accumulated dust and debris from the ducts."],
      ["Confirm Airflow", "We verify airflow has improved throughout your space."],
    ]),
    duration: "2–3 hours",
    imageKey: "[SERVICE_7_IMAGE]",
  },
  {
    number: "08",
    slug: "thermostat-installation",
    title: "Thermostat Installation",
    short: "Modern comfort control with professionally installed thermostat systems.",
    detail:
      "Modern comfort control with professionally installed thermostat systems, configured to match your HVAC setup.",
    category: "Installation",
    benefits: ["Compatible with most HVAC systems", "Professional setup and configuration", "Walkthrough of new features"],
    process: serviceProcess(8, [
      ["Check Compatibility", "We confirm the thermostat works with your existing system."],
      ["Install & Configure", "We install the unit and configure it to your preferences."],
      ["Walkthrough", "We show you how to use the new features."],
    ]),
    duration: "30–60 mins",
    imageKey: "[SERVICE_8_IMAGE]",
  },
  {
    number: "09",
    slug: "emergency-hvac-repair",
    title: "Emergency HVAC Repair",
    short: "Priority support for urgent heating and cooling problems.",
    detail:
      "Priority support for urgent heating and cooling problems, including after-hours dispatch when available.",
    category: "Emergency",
    benefits: ["Priority scheduling", "Available for urgent issues", "Clear next-step guidance"],
    process: serviceProcess(9, [
      ["Call Our Emergency Line", "Describe what's happening so we can prioritize your visit."],
      ["Rapid Diagnosis", "A technician inspects the system as quickly as possible."],
      ["Restore Comfort", "We complete the necessary repair and explain the next steps."],
    ]),
    duration: "Varies by issue",
    imageKey: "[SERVICE_9_IMAGE]",
  },
] as const;

export type Service = (typeof services)[number];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const trustStats = [
  { value: "12+ Years", label: "Industry experience" },
  { value: "5,000+", label: "Service visits completed" },
  { value: "4.9/5", label: "Average customer rating" },
  { value: "24/7", label: "Emergency support availability" },
  { value: "100%", label: "Focus on clear recommendations" },
] as { value: string; label: string }[];

export const differentiators = [
  { title: "Experienced Technicians", copy: "Skilled professionals who diagnose problems carefully before recommending solutions." },
  { title: "Clear Recommendations", copy: "Straightforward explanations so customers understand their options." },
  { title: "Respect for Your Space", copy: "We work carefully and aim to leave your home or business clean." },
  { title: "Reliable Scheduling", copy: "Appointment coordination designed to make service convenient." },
  { title: "Quality-Focused Work", copy: "Practical, dependable solutions without unnecessary upselling." },
  { title: "Ongoing Support", copy: "Maintenance and follow-up options to help protect your HVAC investment." },
] as { title: string; copy: string }[];

export const howItWorks = [
  { step: "01", title: "Tell Us What's Happening", copy: "Call, book online, or send us a message." },
  { step: "02", title: "Schedule Your Service", copy: "Choose a convenient time for an inspection or service visit." },
  { step: "03", title: "Get a Clear Assessment", copy: "Our technician evaluates the issue and explains recommended options." },
  { step: "04", title: "Restore Your Comfort", copy: "We complete the agreed service and explain the next steps." },
] as { step: string; title: string; copy: string }[];

export const healthResources = [
  {
    title: "7 Signs Your Air Conditioner May Need Professional Attention",
    excerpt: "Common warning signs that your air conditioner may need a closer look from a professional.",
    imageKey: "[RESOURCE_1_IMAGE]",
  },
  {
    title: "How Regular Air Conditioner Cleaning Can Support Better Performance",
    excerpt: "Why routine cleaning matters more than most homeowners realize.",
    imageKey: "[RESOURCE_2_IMAGE]",
  },
  {
    title: "Choosing the Right Air Conditioner for Your Space",
    excerpt: "A general overview of what to consider before installing a new system.",
    imageKey: "[RESOURCE_3_IMAGE]",
  },
] as { title: string; excerpt: string; imageKey: string }[];

export const marqueeReviews = [
  {
    author: "Maria L.",
    segment: "Homeowner",
    quote:
      "Our air conditioner stopped cooling during a very hot week. The technician explained the issue clearly and had us comfortable again quickly.",
    rating: 5,
  },
  {
    author: "Joseph R.",
    segment: "New Installation Client",
    quote: "Professional from scheduling through completion. They arrived prepared and explained the work before starting.",
    rating: 5,
  },
  {
    author: "Angela P.",
    segment: "Maintenance Plan Client",
    quote: "The maintenance visit was smooth and thorough. Our unit has been running noticeably better.",
    rating: 5,
  },
  {
    author: "Roberto D.",
    segment: "Business Owner",
    quote: "We used Summit for a new installation and appreciated how clearly they explained the options.",
    rating: 5,
  },
  {
    author: "Claire M.",
    segment: "Homeowner",
    quote: "Friendly staff, easy booking, and no confusing technical language.",
    rating: 5,
  },
] as { author: string; segment: string; quote: string; rating: number }[];

export const faqs = [
  {
    question: "How often should I have my air conditioner cleaned?",
    answer:
      "The ideal schedule depends on usage and environment, but regular professional cleaning can help maintain airflow and performance.",
    category: "Requests & visits",
  },
  {
    question: "Do you provide emergency HVAC repair?",
    answer: "Yes. Contact our emergency line for urgent heating or cooling issues requiring priority attention.",
    category: "Emergency",
  },
  {
    question: "How do I know if my air conditioner needs repair?",
    answer:
      "Reduced cooling, unusual sounds, leaks, odors, or unusually high energy usage may indicate that your system should be inspected.",
    category: "Requests & visits",
  },
  {
    question: "Can you install a new air conditioner?",
    answer: "Yes. We can assess your space and recommend suitable installation options.",
    category: "Requests & visits",
  },
  {
    question: "Do you service commercial properties?",
    answer: "We provide light commercial HVAC services depending on the system and property requirements.",
    category: "Requests & visits",
  },
  {
    question: "How long does air conditioner cleaning take?",
    answer: "Service time varies depending on the unit type and condition.",
    category: "Requests & visits",
  },
  {
    question: "Do you provide maintenance plans?",
    answer: "Yes. We offer preventive maintenance options designed to help keep HVAC systems performing reliably.",
    category: "Payment & insurance",
  },
  {
    question: "How can I book an appointment?",
    answer: "Call us, submit the contact form, or use the online booking link.",
    category: "First visit",
  },
] as const;

export const staff = [
  {
    name: "Angela Ramos",
    title: "Customer Care Coordinator",
    credentials: "Client Relations",
    bio: "Angela coordinates client communication from first inquiry through service completion, making sure every request gets a clear and timely response.",
    imageKey: "[STAFF_1_PHOTO]",
    placeholder: false,
  },
  {
    name: "Paolo Garcia",
    title: "Service Scheduler",
    credentials: "Scheduling & Dispatch",
    bio: "Paolo manages the day-to-day service schedule, coordinating technician availability to get clients booked as quickly as possible.",
    imageKey: "[STAFF_2_PHOTO]",
    placeholder: false,
  },
  {
    name: "Jasmine Flores",
    title: "Operations Assistant",
    credentials: "Operations Support",
    bio: "Jasmine supports daily operations behind the scenes, helping keep service records, inventory, and logistics running smoothly.",
    imageKey: "[STAFF_3_PHOTO]",
    placeholder: false,
  },
  {
    name: "Mark Villanueva",
    title: "Customer Support Specialist",
    credentials: "Customer Support",
    bio: "Mark handles customer inquiries and follow-ups, helping clients get clear answers about their service requests.",
    imageKey: "[STAFF_4_PHOTO]",
    placeholder: false,
  },
] as { name: string; title: string; credentials: string; bio: string; imageKey: string; placeholder: boolean }[];

export const emergencyInfo = {
  heading: "HVAC Emergency?",
  note: "If your cooling or ventilation system has failed and requires urgent attention, contact our emergency support line.",
  referralLocationName: "Summit Air & Home Services — Emergency Line",
  referralLocationPhone: "+63 917 555 0199",
  referralLocationPhoneDigits: "+639175550199",
  referralLocationAddress: "125 Rizal Avenue, San Pablo City, Laguna, Philippines",
  instructions:
    "If there is smoke, a burning smell, an electrical hazard, or immediate danger, turn off the system if safe to do so and contact the appropriate emergency service.",
  placeholder: false,
};

export const paymentInfo = {
  heading: "Payment Options",
  methods: ["Cash", "Credit / Debit Card", "Bank Transfer"],
  insuranceNote: "Ask our team about available maintenance plans and financing options for larger installations.",
};

export const providers = [
  {
    slug: "daniel-reyes",
    name: "Daniel Reyes",
    credentials: "TESDA NC II Certified",
    specialty: "Lead HVAC Technician",
    bio: "Daniel has over 12 years of experience diagnosing and repairing residential and commercial HVAC systems.",
    yearsExperience: 12,
    areasOfInterest: ["AC diagnostics & repair", "Commercial HVAC systems", "Technician training"],
    imageKey: "[PROVIDER_1_PHOTO]",
    placeholder: false,
  },
  {
    slug: "miguel-santos",
    name: "Miguel Santos",
    credentials: "Certified HVAC Installer",
    specialty: "Senior Installation Specialist",
    bio: "Miguel specializes in HVAC system planning, installation, and performance optimization.",
    yearsExperience: 10,
    areasOfInterest: ["System sizing & planning", "New installations", "Performance optimization"],
    imageKey: "[PROVIDER_2_PHOTO]",
    placeholder: false,
  },
  {
    slug: "carlo-mendoza",
    name: "Carlo Mendoza",
    credentials: "TESDA NC II Certified",
    specialty: "HVAC Service Technician",
    bio: "Carlo focuses on preventive maintenance, cleaning, and efficient troubleshooting.",
    yearsExperience: 6,
    areasOfInterest: ["Preventive maintenance", "AC cleaning", "Troubleshooting"],
    imageKey: "[PROVIDER_3_PHOTO]",
    placeholder: false,
  },
  {
    slug: "adrian-cruz",
    name: "Adrian Cruz",
    credentials: "Indoor Air Quality Specialist Certification",
    specialty: "Indoor Air Quality Specialist",
    bio: "Adrian helps clients identify practical ways to improve airflow and indoor comfort.",
    yearsExperience: 8,
    areasOfInterest: ["Indoor air quality assessments", "Ventilation improvements", "Duct cleaning"],
    imageKey: "[PROVIDER_4_PHOTO]",
    placeholder: false,
  },
] as { slug: string; name: string; credentials: string; specialty: string; bio: string; yearsExperience: number; areasOfInterest: string[]; imageKey: string; placeholder: boolean }[];

export type Provider = (typeof providers)[number];

export function getProviderBySlug(slug: string): Provider | undefined {
  return providers.find((provider) => provider.slug === slug);
}

export const articles = [
  {
    slug: "signs-air-conditioner-needs-repair",
    title: "7 Signs Your Air Conditioner May Need Professional Attention",
    category: "AC Repair",
    date: "August 2026",
    readingTime: "5 min read",
    excerpt: "Common warning signs that your air conditioner may need a closer look from a professional.",
    body: [
      "Air conditioners rarely fail without warning. In most cases, there are a handful of signs that show up well before a full breakdown, giving you time to schedule a repair before things get worse.",
      "Reduced airflow or noticeably weaker cooling is often one of the first things homeowners notice. If a room that used to cool quickly now takes much longer, it may be time to have the system checked.",
      "Unusual sounds, such as grinding, rattling, or clicking, can point to a mechanical issue inside the unit. Unpleasant odors when the system runs are also worth mentioning to a technician, since they can indicate anything from a dirty filter to a more significant issue.",
      "Rising energy bills without a clear explanation are another common sign. A system working harder than it should to maintain the same temperature will often show up first in your utility bill before it shows up as a comfort problem.",
      "Water leaks, frequent cycling on and off, or a thermostat that no longer seems to keep up are all reasonable reasons to schedule a repair visit. Catching these signs early can often mean a simpler, less costly fix.",
    ],
    imageKey: "[RESOURCE_1_IMAGE]",
    disclaimer: true,
  },
  {
    slug: "air-conditioner-cleaning-benefits",
    title: "How Regular Air Conditioner Cleaning Can Support Better Performance",
    category: "Maintenance",
    date: "July 2026",
    readingTime: "4 min read",
    excerpt: "Why routine cleaning matters more than most homeowners realize.",
    body: [
      "Regular cleaning is one of the simplest ways to help an air conditioner perform the way it was designed to. Over time, dust and debris build up inside the unit, and that buildup can affect nearly every part of how the system runs.",
      "A clean unit generally has better airflow, which means it doesn't have to work as hard to reach the temperature you've set. That can translate into more consistent cooling throughout your space.",
      "Cleaning also plays a role in indoor air quality. As dust and debris accumulate, they can circulate through the air your household breathes every day, which is one reason routine cleaning is worth prioritizing.",
      "Beyond comfort and air quality, regular cleaning can also support the long-term lifespan of your system. Components that stay cleaner tend to experience less strain over time.",
      "Most professionals recommend a cleaning schedule based on usage and environment rather than a one-size-fits-all interval. A technician can help you figure out what makes sense for your specific system.",
    ],
    imageKey: "[RESOURCE_2_IMAGE]",
    disclaimer: true,
  },
  {
    slug: "choosing-right-air-conditioner",
    title: "Choosing the Right Air Conditioner for Your Space",
    category: "Installation",
    date: "June 2026",
    readingTime: "6 min read",
    excerpt: "A general overview of what to consider before installing a new system.",
    body: [
      "Choosing a new air conditioner involves more than picking a unit off a shelf. The right choice depends on the size of the space, how it's used, and a handful of other practical details.",
      "Sizing is one of the most important factors. A unit that's too small will struggle to keep up, while one that's too large can cycle on and off more than necessary, which isn't ideal for comfort or efficiency.",
      "Layout also matters. Room shape, ceiling height, window placement, and insulation all play a role in how a system performs once it's installed.",
      "Budget is naturally part of the conversation too, both the upfront installation cost and the ongoing running costs. It's worth discussing the trade-offs between different options with your installer.",
      "A proper assessment from a technician is generally the best way to land on the right recommendation. They can walk through the specifics of your space and explain the reasoning behind their suggestion.",
    ],
    imageKey: "[RESOURCE_3_IMAGE]",
    disclaimer: true,
  },
  {
    slug: "improve-indoor-airflow",
    title: "Simple Ways to Improve Indoor Airflow",
    category: "Air Quality",
    date: "May 2026",
    readingTime: "4 min read",
    excerpt: "A few practical adjustments that can make a noticeable difference in everyday comfort.",
    body: [
      "Uneven airflow is a common complaint in homes and small offices, especially in spaces with multiple rooms or an older layout. The good news is that there are usually a few practical adjustments that can help.",
      "Keeping vents and returns unobstructed by furniture or curtains is one of the simplest changes you can make. Blocked vents restrict airflow and can throw off the overall balance of a system.",
      "Regularly checking and replacing filters also supports better airflow. A clogged filter forces a system to work harder and can reduce how effectively air moves through your space.",
      "In some cases, ductwork issues are the underlying cause of uneven airflow. A cleaning or inspection can reveal whether debris or a leak is affecting performance.",
      "If simple adjustments don't solve the issue, a technician can take a closer look at your specific setup and recommend next steps suited to your space.",
    ],
    imageKey: "[RESOURCE_4_IMAGE]",
    disclaimer: true,
  },
] as { slug: string; title: string; category: string; date: string; readingTime: string; excerpt: string; body: string[]; imageKey: string; disclaimer: boolean }[];

export type Article = (typeof articles)[number];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export const carePlans = [
  {
    title: "Basic Care",
    subtitle: "For light residential use",
    bullets: ["1 annual maintenance visit", "Priority scheduling", "10% off repair parts"],
  },
  {
    title: "Comfort Plan",
    subtitle: "Our most popular plan",
    bullets: ["2 seasonal maintenance visits", "Priority scheduling", "15% off repair parts", "Free filter replacement"],
  },
  {
    title: "Business Care",
    subtitle: "For small commercial spaces",
    bullets: ["Quarterly maintenance visits", "Priority emergency response", "20% off repair parts", "Dedicated account contact"],
  },
] as { title: string; subtitle: string; bullets: string[] }[];

export const newClientSteps = [
  { step: "01", title: "Reach Out", copy: "Call, book online, or send a message describing what's going on with your system." },
  { step: "02", title: "Get Scheduled", copy: "We'll confirm a convenient time for your first service visit." },
  { step: "03", title: "Meet Your Technician", copy: "Our technician arrives on time, ready to take a look at your system." },
  { step: "04", title: "Review Your Options", copy: "We walk you through what we found and explain the recommended next steps clearly." },
  { step: "05", title: "Get Back to Comfortable", copy: "Once you approve the work, we complete the service and answer any follow-up questions." },
] as { step: string; title: string; copy: string }[];

export const whatToBring = [
  "Your system's make and model, if known",
  "Any recent energy bills, if you're concerned about efficiency",
  "A list of rooms or areas where you've noticed issues",
  "Access to your indoor unit, outdoor unit, and thermostat",
  "Any previous service or maintenance records",
] as string[];

export const clinicExperienceFeatures = [
  { title: "Professional Service Visits", copy: "Every technician arrives prepared and ready to explain the work before it starts.", imageKey: "[CLINIC_1_IMAGE]" },
  { title: "Modern Diagnostic Tools", copy: "We use up-to-date tools to diagnose issues accurately the first time.", imageKey: "[CLINIC_2_IMAGE]" },
  { title: "Clean, Careful Work", copy: "We treat every home and business with the same care we'd want in our own.", imageKey: "[CLINIC_3_IMAGE]" },
  { title: "Fully Stocked Service Vehicles", copy: "Common parts and tools on hand help us complete many repairs in a single visit.", imageKey: "[CLINIC_4_IMAGE]" },
  { title: "Respectful, Transparent Service", copy: "Straightforward pricing and clear explanations, with no pressure to upsell.", imageKey: "[CLINIC_5_IMAGE]" },
] as { title: string; copy: string; imageKey: string }[];

export const clientStories = [
  {
    clientName: "The Dela Cruz Family",
    segment: "Homeowner",
    category: "AC Repair",
    story:
      "Just days before hosting relatives, a family in San Pablo noticed their air conditioner losing cooling power. Our technician diagnosed the issue, walked through the repair options, and had the system running normally again in time for their gathering.",
    imageKey: "[CLIENT_1_PHOTO]",
  },
  {
    clientName: "Riverside Office Park",
    segment: "Small Business",
    category: "HVAC Installation",
    story:
      "A growing office needed to replace an aging, unreliable cooling system. After assessing the space and discussing usage patterns, we recommended and installed a system suited to the office layout, restoring consistent comfort for the whole team.",
    imageKey: "[CLIENT_2_PHOTO]",
  },
  {
    clientName: "A San Pablo Homeowner",
    segment: "Homeowner",
    category: "Indoor Air Quality",
    story:
      "A homeowner noticed uneven temperatures between rooms in an older house. After inspecting the system and airflow conditions, our team recommended practical improvements that created more consistent comfort throughout the home.",
    imageKey: "[CLIENT_3_PHOTO]",
  },
] as { clientName: string; segment: string; category: string; story: string; imageKey: string }[];

const SITE_ORIGIN = "https://summit-air-home-demo.vercel.app";

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
