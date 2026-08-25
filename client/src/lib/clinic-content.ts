export const clinic = {
  name: "[CLINIC_NAME]",
  shortName: "[CLINIC_SHORT_NAME]",
  tagline: "[CLINIC_TAGLINE]",
  descriptor: "Veterinary Clinic",
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
    slug: "vaccines-prevention",
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
    slug: "puppy-kitten-care",
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
    slug: "senior-pet-care",
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
    slug: "dental-care",
    title: "[SERVICE_5_TITLE]",
    short: "[SERVICE_5_SHORT]",
    detail: "[SERVICE_5_DETAIL]",
    icon: "smile",
    category: "Clinical & Dental",
    benefits: ["[SERVICE_5_BENEFIT_1]", "[SERVICE_5_BENEFIT_2]", "[SERVICE_5_BENEFIT_3]"],
    process: ["Intake", "Oral Care Overview", "Clinic Referral"],
    duration: "20–30 mins",
    imageKey: "[SERVICE_5_IMAGE]",
  },
  {
    number: "06",
    slug: "diagnostics-labs",
    title: "[SERVICE_6_TITLE]",
    short: "[SERVICE_6_SHORT]",
    detail: "[SERVICE_6_DETAIL]",
    icon: "activity",
    category: "Diagnostics",
    benefits: ["[SERVICE_6_BENEFIT_1]", "[SERVICE_6_BENEFIT_2]", "[SERVICE_6_BENEFIT_3]"],
    process: ["Intake", "Diagnostic Overview", "Clinic Recommendation"],
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
  { name: "Renz A.", pet: "Dog owner", quote: "The team took real time with our nervous rescue dog instead of rushing the exam. Genuinely fear-free care.", rating: 5 },
  { name: "Mika D.", pet: "Cat owner", quote: "Clear explanations at every step, no confusing jargon. I finally understood our cat's care plan.", rating: 5 },
  { name: "Joyce T.", pet: "Puppy owner", quote: "Booking was easy and the follow-up communication after our puppy's first visit was excellent.", rating: 5 },
  { name: "Paolo S.", pet: "Senior dog owner", quote: "They noticed a small change we'd missed and walked us through what to watch for. Really attentive team.", rating: 5 },
  { name: "Bea L.", pet: "Kitten owner", quote: "Our kitten's first vaccination visit was calm and stress-free thanks to the patient staff.", rating: 5 },
  { name: "Anton R.", pet: "Multi-pet owner", quote: "Consistent, honest care across three different pets over the years. Wouldn't go anywhere else.", rating: 5 },
] as { name: string; pet: string; quote: string; rating: number }[];

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
    credentials: "DVM",
    bio: "[STAFF_1_BIO]",
    imageKey: "[STAFF_1_PHOTO]",
    placeholder: true,
  },
  {
    name: "[STAFF_2_NAME]",
    title: "[STAFF_2_TITLE]",
    credentials: "DVM",
    bio: "[STAFF_2_BIO]",
    imageKey: "[STAFF_2_PHOTO]",
    placeholder: true,
  },
  {
    name: "[STAFF_3_NAME]",
    title: "[STAFF_3_TITLE]",
    credentials: "RVT",
    bio: "[STAFF_3_BIO]",
    imageKey: "[STAFF_3_PHOTO]",
    placeholder: true,
  },
] as { name: string; title: string; credentials: string; bio: string; imageKey: string; placeholder: boolean }[];

export const emergencyInfo = {
  heading: "Emergency & after-hours care",
  note: `${clinic.name} provides scheduled care during posted business hours and is not an emergency hospital.`,
  referralHospitalName: "[EMERGENCY_HOSPITAL_NAME]",
  referralHospitalPhone: "[EMERGENCY_PHONE]",
  referralHospitalPhoneDigits: "[EMERGENCY_PHONE_DIGITS]",
  referralHospitalAddress: "[EMERGENCY_ADDRESS]",
  instructions: "If your pet has a life-threatening emergency outside our business hours, please contact the referral hospital above directly rather than waiting for a callback from our clinic.",
  placeholder: true,
};

export const paymentInfo = {
  heading: "Payment & insurance",
  methods: ["Cash", "Debit and credit cards", "CareCredit financing"],
  insuranceNote: "We don't bill pet insurance providers directly, but we provide itemized invoices so you can submit a reimbursement claim with most major pet insurance plans.",
};

export const doctors = [
  {
    slug: "vet-1",
    name: "[VET_1_NAME]",
    credentials: "DVM",
    specialty: "[VET_1_SPECIALTY]",
    bio: "[VET_1_BIO]",
    yearsExperience: 9,
    areasOfInterest: ["Wellness exams", "Puppy & kitten care", "Client education"],
    imageKey: "[VET_1_PHOTO]",
    placeholder: true,
  },
  {
    slug: "vet-2",
    name: "[VET_2_NAME]",
    credentials: "DVM",
    specialty: "[VET_2_SPECIALTY]",
    bio: "[VET_2_BIO]",
    yearsExperience: 12,
    areasOfInterest: ["Diagnostic imaging", "Surgical planning", "Pain management"],
    imageKey: "[VET_2_PHOTO]",
    placeholder: true,
  },
  {
    slug: "vet-3",
    name: "[VET_3_NAME]",
    credentials: "DVM",
    specialty: "[VET_3_SPECIALTY]",
    bio: "[VET_3_BIO]",
    yearsExperience: 7,
    areasOfInterest: ["Preventive care plans", "Senior pet wellness", "Nutrition guidance"],
    imageKey: "[VET_3_PHOTO]",
    placeholder: true,
  },
] as { slug: string; name: string; credentials: string; specialty: string; bio: string; yearsExperience: number; areasOfInterest: string[]; imageKey: string; placeholder: boolean }[];

export type Doctor = (typeof doctors)[number];

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return doctors.find((doctor) => doctor.slug === slug);
}

export const articles = [
  {
    slug: "how-often-should-your-dog-visit-the-vet",
    title: "How Often Should Your Dog Visit the Vet?",
    category: "Dog Care",
    date: "June 2026",
    readingTime: "5 min read",
    excerpt: "A general guide to how routine check-in timing tends to shift across a dog's puppy, adult, and senior years.",
    body: [
      "One of the most common questions new dog owners ask is how often a checkup is really needed. The honest answer is that it depends on your dog's age, general health, and lifestyle, but there are some general patterns worth knowing.",
      "Puppies typically need a series of early visits during their first few months, spaced closely together, to keep pace with their rapid growth and development. Once a dog reaches adulthood, an annual check-in is a common starting point for most healthy pets.",
      "Senior dogs, generally considered dogs in their later years, often benefit from more frequent visits so that any gradual changes can be noticed sooner rather than later. Your veterinary team can help you figure out what a reasonable schedule looks like for your specific dog.",
      "Between scheduled visits, it's worth paying attention to everyday things like appetite, energy level, and general behavior. Noting any changes, even small ones, gives your care team useful context at the next visit.",
      "If you're ever unsure whether something warrants an earlier conversation, it's generally better to ask. A quick call or a scheduled visit request is a simple way to get a clearer answer.",
    ],
    imageKey: "[RESOURCE_1_IMAGE]",
    disclaimer: true,
  },
  {
    slug: "7-signs-your-cat-may-need-veterinary-attention",
    title: "7 Signs Your Cat May Need Veterinary Attention",
    category: "Cat Care",
    date: "May 2026",
    readingTime: "6 min read",
    excerpt: "Cats are known for hiding discomfort — here are some general behavior changes that are worth mentioning at a visit.",
    body: [
      "Cats are famously good at masking discomfort, which can make it tricky to know when something is worth a closer look. Paying attention to gradual shifts in everyday behavior is often more useful than waiting for an obvious symptom.",
      "Changes in appetite or water intake, whether an increase or decrease, are commonly mentioned during visits. The same goes for shifts in litter box habits, since these can reflect a range of everyday changes.",
      "A drop in general activity, more time spent hiding, or a change in how a cat interacts with its household are also patterns pet parents often bring up. Cats are creatures of habit, so noticeable changes in routine are usually worth a mention.",
      "Changes in coat condition, unusual grooming habits, or noticeable weight change over time are additional things worth flagging. None of these on their own necessarily mean something serious, but they're useful details for a care conversation.",
      "If you notice any combination of these changes, or simply have a feeling that something is different, it's reasonable to reach out and describe what you're seeing. A conversation with your veterinary team is the best way to get a clear answer.",
    ],
    imageKey: "[RESOURCE_2_IMAGE]",
    disclaimer: true,
  },
  {
    slug: "a-new-pet-owners-guide-to-preventive-care",
    title: "A New Pet Owner's Guide to Preventive Care",
    category: "Preventive Care",
    date: "April 2026",
    readingTime: "5 min read",
    excerpt: "A general overview of what preventive care conversations tend to cover for a new dog or cat.",
    body: [
      "Bringing home a new pet comes with a long list of questions, and preventive care is often one of the first topics that comes up. In general terms, preventive care is about establishing good habits and a baseline understanding of your pet's health early on.",
      "For most new pets, this starts with an early wellness visit to talk through history, routine, and any early questions a new owner might have. From there, a clinic team can help outline what an approved prevention pathway might look like for that specific pet.",
      "Preventive planning conversations often touch on general wellbeing topics, everyday habits, and the kinds of questions worth raising at future visits. The goal is to keep things proactive rather than reactive whenever possible.",
      "New pet owners sometimes feel like they should already know all the answers. In reality, most of preventive care is simply about building a relationship with a care team you trust, and asking questions as they come up.",
      "If you've recently welcomed a new pet into your home, scheduling that first conversation is a reasonable place to start.",
    ],
    imageKey: "[RESOURCE_3_IMAGE]",
    disclaimer: true,
  },
  {
    slug: "understanding-your-pets-annual-wellness-exam",
    title: "Understanding Your Pet's Annual Wellness Exam",
    category: "Wellness",
    date: "March 2026",
    readingTime: "4 min read",
    excerpt: "What a typical annual wellness conversation is generally structured to cover.",
    body: [
      "An annual wellness exam is often described as a checkup, but it's really more of a structured conversation paired with a hands-on look. The idea is to establish a routine health baseline that future visits can be compared against.",
      "These visits generally start with a review of your pet's recent history, including everyday habits, diet, and any questions you've been meaning to ask. From there, a hands-on exam helps the care team form a general picture of your pet's current condition.",
      "Depending on your pet's age and history, a wellness visit may also be a good time to talk through prevention planning or any approved next steps. Nothing is assumed ahead of time; the visit is meant to be a two-way conversation.",
      "Many pet parents find it helpful to jot down questions or observations beforehand, so nothing gets forgotten once the visit starts. Bringing notes about appetite, behavior, or anything that seems different is generally a good idea.",
      "An annual visit is a reasonable default for most healthy adult pets, though your care team can help you figure out if a different schedule makes more sense.",
    ],
    imageKey: "[RESOURCE_4_IMAGE]",
    disclaimer: true,
  },
  {
    slug: "when-should-you-consider-a-dental-cleaning",
    title: "When Should You Consider a Dental Cleaning?",
    category: "Dental Care",
    date: "February 2026",
    readingTime: "4 min read",
    excerpt: "General signals that a dental care conversation might be worth having sooner rather than later.",
    body: [
      "Oral care is one of those topics that's easy to overlook until something prompts a closer look. In general, noticeable bad breath, visible tartar buildup, or a pet seeming hesitant while eating are the kinds of things worth mentioning at a visit.",
      "Every pet's mouth is different, and there's no single answer for how often a dental conversation should happen. That said, bringing it up during a routine wellness visit is a low-pressure way to get a general sense of what, if anything, might be worth watching.",
      "A dental care conversation is generally meant to walk through options and questions, not to present a fixed treatment plan online. The clinic team can offer a clearer picture once they've had a chance to take a look in person.",
      "Some pet parents find it useful to keep a general eye on things at home between visits, such as noticing any changes in chewing habits or appetite. These small observations can be useful context for the care team.",
      "If oral care has been on your mind, mentioning it at your pet's next scheduled visit is a reasonable way to start that conversation.",
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
    title: "Puppy + Kitten",
    subtitle: "Early-month care for a confident start.",
    bullets: ["Structured early wellness visits", "Age-appropriate prevention planning", "Guidance for first-time pet parents"],
    icon: "sparkles",
  },
  {
    title: "Adult Pet",
    subtitle: "Steady, routine care that keeps pace with everyday life.",
    bullets: ["Annual wellness check-ins", "Approved prevention pathways", "A clear place to raise everyday questions"],
    icon: "shield",
  },
  {
    title: "Senior Pet",
    subtitle: "Thoughtful touchpoints for pets moving through later life.",
    bullets: ["More frequent check-in conversations", "Focus on observable changes over time", "Notes prepared ahead of each visit"],
    icon: "heart",
  },
] as { title: string; subtitle: string; bullets: string[]; icon: "sparkles" | "shield" | "heart" }[];

export const newClientSteps = [
  { step: "01", title: "Tell Us About Your Pet", copy: "Share a few details through our simple visit request form, including what brings you in and any early questions." },
  { step: "02", title: "Meet Your Veterinary Team", copy: "A member of our clinical team greets you and your pet, and starts an unhurried, welcoming conversation." },
  { step: "03", title: "Complete the Wellness Examination", copy: "A hands-on exam paced around your pet's comfort, guided by the history and questions you've shared." },
  { step: "04", title: "Discuss Your Pet's Care Plan", copy: "The team walks through a clear, realistic next step based on the conversation and exam findings." },
  { step: "05", title: "Schedule Follow-Up Care", copy: "Any recommended follow-up or preventive check-ins are scheduled so your pet's care stays on track." },
] as { step: string; title: string; copy: string }[];

export const whatToBring = [
  "Any previous medical or vaccination records you have on hand",
  "A list of current medications, including dosage if known",
  "Your pet secured in a carrier (cats and small pets) or on a leash (dogs)",
  "A written list of questions or observations you'd like to raise",
  "Please arrive a few minutes early to keep the visit calm and unhurried",
] as string[];

export const clinicExperienceFeatures = [
  { title: "Calm Reception", copy: "A quiet, welcoming front desk designed to ease first-visit nerves for pets and people alike.", imageKey: "[CLINIC_1_IMAGE]" },
  { title: "Comfortable Exam Rooms", copy: "Exam spaces set up for unhurried, hands-on conversations rather than rushed appointments.", imageKey: "[CLINIC_2_IMAGE]" },
  { title: "Modern Diagnostic Equipment", copy: "Approved diagnostic tools that help the clinical team get a clearer picture before recommending next steps.", imageKey: "[CLINIC_3_IMAGE]" },
  { title: "Separate Pet-Friendly Spaces", copy: "Thoughtful layout choices that help keep visits low-stress for anxious cats and dogs alike.", imageKey: "[CLINIC_4_IMAGE]" },
  { title: "Caring Staff", copy: "A clinical team that paces every visit around your pet's comfort, not the clock.", imageKey: "[CLINIC_5_IMAGE]" },
] as { title: string; copy: string; imageKey: string }[];

export const patientSuccessStories = [
  {
    petName: "Max",
    breed: "Golden Retriever",
    category: "Dental Care",
    story: "Demo Patient Story: Max's family raised a general oral-care question during a routine visit, which led to a calm, informative conversation about his dental health with the clinical team.",
    imageKey: "[PATIENT_1_PHOTO]",
  },
  {
    petName: "Luna",
    breed: "Domestic Shorthair",
    category: "Wellness & Preventive Care",
    story: "Demo Patient Story: Luna's annual wellness visit gave her family a clear prevention plan and a better understanding of what to watch for between check-ins.",
    imageKey: "[PATIENT_2_PHOTO]",
  },
  {
    petName: "Charlie",
    breed: "Labrador",
    category: "Surgical Recovery",
    story: "Demo Patient Story: Charlie's family worked with the clinical team to understand his diagnostic overview and recovery expectations following a scheduled procedure.",
    imageKey: "[PATIENT_3_PHOTO]",
  },
] as { petName: string; breed: string; category: string; story: string; imageKey: string }[];

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
    "@type": "VeterinaryCare",
    name: clinic.name + " Veterinary Clinic",
    description: clinic.tagline,
    url: SITE_ORIGIN,
    telephone: clinic.phone,
    email: clinic.email,
    address: { "@type": "PostalAddress", streetAddress: clinic.address, addressLocality: clinic.city },
    openingHoursSpecification: clinic.businessHours.map((entry) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: entry.days, opens: entry.hours.split("–")[0]?.trim(), closes: entry.hours.split("–")[1]?.trim() })),
    sameAs: clinic.socialLinks.map((social) => social.href),
  };
}

export function buildFaqSchema(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  };
}

export function buildPersonSchema(doctor: Doctor) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: doctor.name,
    jobTitle: `${doctor.specialty} Veterinarian`,
    description: doctor.bio,
    worksFor: { "@type": "VeterinaryCare", name: clinic.name + " Veterinary Clinic" },
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
    publisher: { "@type": "Organization", name: clinic.name + " Veterinary Clinic" },
  };
}
