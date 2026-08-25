export const clinic = {
  name: "Paws+Pine",
  descriptor: "Veterinary Clinic",
  address: "Center Stall No. 4027, 2nd Street",
  city: "Calamba, Laguna",
  phone: "(demo) 02 0000 0000",
  phoneDigits: "0200000000",
  email: "hello@pawsandpine.example",
  hours: "Mon–Fri 8:30–18:00 · Sat 9:00–13:00",
  mapsUrl: "https://www.google.com/maps/dir/?api=1&origin=Center+Stall+No.+4027,+2nd+Street,+Calamba,+Laguna&destination=Calamba+Trade+Center,+JP+Rizal+Street,+Calamba,+Laguna&travelmode=driving",
  businessHours: [
    { days: "Monday–Friday", hours: "8:30 AM–6:00 PM" },
    { days: "Saturday", hours: "9:00 AM–1:00 PM" },
    { days: "Sunday", hours: "Closed" },
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
    title: "Wellness visits",
    short: "A clear starting point for routine check-ins and everyday questions.",
    detail: "A structured conversation space for a pet’s routine health history, daily habits, and the questions their people want to raise.",
    icon: "stethoscope",
    category: "Preventive",
    benefits: [
      "Establishes a routine health baseline for future visits",
      "Open space to raise everyday behavior or diet questions",
      "Helps identify patterns worth flagging to the clinic team",
    ],
    process: ["Intake", "Examination", "Care Plan"],
    duration: "30–45 mins",
    imageKey: "serviceExam",
  },
  {
    number: "02",
    slug: "vaccines-prevention",
    title: "Prevention planning",
    short: "Practical planning for the small things that support everyday wellbeing.",
    detail: "A focused way to introduce a real clinic’s approved vaccination, parasite-prevention, or general wellbeing pathways without overpromising outcomes.",
    icon: "shield",
    category: "Preventive",
    benefits: [
      "Introduces approved vaccination and parasite-prevention pathways",
      "Keeps prevention planning aligned to the clinic's actual protocols",
      "Gives owners a clear next step instead of guesswork",
    ],
    process: ["Intake", "Risk Review", "Prevention Plan"],
    duration: "20–30 mins",
    imageKey: "dogCare",
  },
  {
    number: "03",
    slug: "puppy-kitten-care",
    title: "Puppy & kitten care",
    short: "Support for the early months, first questions, and first visits.",
    detail: "A welcoming space to explain an approved young-pet care pathway, early questions, and the next step for a new family.",
    icon: "sparkles",
    category: "Preventive",
    benefits: [
      "Walks new pet owners through early-month care basics",
      "Answers first-visit questions before they become worries",
      "Sets clear expectations for the next scheduled step",
    ],
    process: ["Intake", "Early Care Review", "Next Visit Plan"],
    duration: "30–40 mins",
    imageKey: "catCare",
  },
  {
    number: "04",
    slug: "senior-pet-care",
    title: "Senior pet check-ins",
    short: "Thoughtful touchpoints for pets moving through later life.",
    detail: "A clear place to discuss observable changes and help a pet owner prepare useful notes for a future clinic conversation.",
    icon: "heart",
    category: "Preventive",
    benefits: [
      "Focuses on observable changes relevant to older pets",
      "Helps owners prepare useful notes ahead of a clinic visit",
      "Keeps later-life care conversations calm and structured",
    ],
    process: ["Intake", "Change Review", "Care Notes"],
    duration: "30–45 mins",
    imageKey: "aboutPup",
  },
  {
    number: "05",
    slug: "dental-care",
    title: "Dental care conversations",
    short: "An approachable introduction to oral-care options.",
    detail: "A concise service explanation that helps real clients understand how to ask about a pet’s oral care without presenting treatment advice or pricing claims.",
    icon: "smile",
    category: "Clinical & Dental",
    benefits: [
      "Explains how to ask about oral-care options clearly",
      "Avoids presenting treatment advice or pricing claims online",
      "Prepares owners with the right questions for the clinic team",
    ],
    process: ["Intake", "Oral Care Overview", "Clinic Referral"],
    duration: "20–30 mins",
    imageKey: "dentalCare",
  },
  {
    number: "06",
    slug: "diagnostics-labs",
    title: "Diagnostics & procedures",
    short: "A measured route for care that needs a closer look.",
    detail: "A careful service overview for a real clinic’s approved diagnostic or procedure pathway, with the final recommendation left to the clinic team.",
    icon: "activity",
    category: "Diagnostics",
    benefits: [
      "Overviews approved diagnostic and procedure pathways",
      "Leaves final recommendations to the clinic team",
      "Helps owners understand what a closer look involves",
    ],
    process: ["Intake", "Diagnostic Overview", "Clinic Recommendation"],
    duration: "45–60 mins",
    imageKey: "diagnosticsCare",
  },
] as const;

export type Service = (typeof services)[number];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const trustStats = [
  { value: "10+", label: "Years experience" },
  { value: "5,000+", label: "Pets cared for" },
  { value: "4.9★", label: "Average rating" },
  { value: "7 Days", label: "Open weekly" },
] as { value: string; label: string }[];

export const differentiators = [
  { icon: "heart", title: "Compassionate Care", copy: "Every visit is paced around your pet's comfort, not the clock, with patient handling at every step." },
  { icon: "stethoscope", title: "Experienced Veterinary Team", copy: "A clinical team with years of hands-on practice across routine, preventive, and diagnostic care." },
  { icon: "activity", title: "Modern Diagnostics", copy: "Approved diagnostic pathways help the clinic team get a clearer picture before recommending next steps." },
  { icon: "shield", title: "Preventive Focus", copy: "Vaccination and wellness planning aimed at catching small things before they become bigger ones." },
  { icon: "sparkles", title: "Fear-Free Environment", copy: "Calm handling techniques and an unhurried pace help keep visits low-stress for anxious pets." },
  { icon: "smile", title: "Transparent Communication", copy: "Clear explanations and honest next steps, with no pressure and no surprises." },
] as { icon: "heart" | "stethoscope" | "activity" | "shield" | "sparkles" | "smile"; title: string; copy: string }[];

export const howItWorks = [
  { step: "01", title: "Book a Visit", copy: "Pick a time that works for you through our online scheduler and choose the care path that fits." },
  { step: "02", title: "Meet Our Care Team", copy: "A member of our clinical team greets you and your pet, and starts an unhurried conversation." },
  { step: "03", title: "Get a Personalized Plan", copy: "Based on that conversation and a hands-on exam, the team outlines a clear, realistic next step." },
  { step: "04", title: "Lifelong Wellness", copy: "Follow-up visits and preventive check-ins keep your pet's care on track for years to come." },
] as { step: string; title: string; copy: string }[];

export const healthResources = [
  {
    title: "How Often Should Your Dog Visit the Vet?",
    excerpt: "A quick guide to routine check-in timing for puppies, adults, and senior dogs.",
    imageKey: "dogCare",
  },
  {
    title: "10 Signs Your Cat May Be Unwell",
    excerpt: "Subtle behavior and habit changes that are worth mentioning at your cat's next visit.",
    imageKey: "catCare",
  },
  {
    title: "Puppy & Kitten Vaccination Schedule",
    excerpt: "What a typical early vaccination pathway looks like, and how to prepare for it.",
    imageKey: "aboutPup",
  },
] as { title: string; excerpt: string; imageKey: keyof typeof assets }[];

export const marqueeReviews = [
  { name: "Renz A.", pet: "Dog owner", quote: "The team took real time with our nervous rescue dog instead of rushing the exam. Genuinely fear-free care.", rating: 5 },
  { name: "Mika D.", pet: "Cat owner", quote: "Clear explanations at every step, no confusing jargon. I finally understood our cat's care plan.", rating: 5 },
  { name: "Joyce T.", pet: "Puppy owner", quote: "Booking was easy and the follow-up communication after our puppy's first visit was excellent.", rating: 5 },
  { name: "Paolo S.", pet: "Senior dog owner", quote: "They noticed a small change we'd missed and walked us through what to watch for. Really attentive team.", rating: 5 },
  { name: "Bea L.", pet: "Kitten owner", quote: "Our kitten's first vaccination visit was calm and stress-free thanks to the patient staff.", rating: 5 },
  { name: "Anton R.", pet: "Multi-pet owner", quote: "Consistent, honest care across three different pets over the years. Wouldn't go anywhere else.", rating: 5 },
] as { name: string; pet: string; quote: string; rating: number }[];

export const faqs = [
  { question: "What happens after I book a visit?", answer: "Our online scheduler confirms your appointment instantly and sends a calendar invite with the visit details. The clinic team will be ready for you and your pet at the time you selected.", category: "Requests & visits" },
  { question: "Can I choose a care path before I visit?", answer: "Yes. The service overview helps you recognize which conversation may be most helpful, and you can note it when you book online.", category: "Requests & visits" },
  { question: "How does online booking work?", answer: "Clicking any \"Book an Appointment\" button opens our scheduling tool in a new tab, where you can pick an available date and time. Your appointment is confirmed as soon as you complete the booking.", category: "Requests & visits" },
  { question: "What should I bring for my pet's first visit?", answer: "Please bring any previous medical records or vaccination history you have, a list of current medications, and your pet secured in a carrier (cats and small pets) or on a leash (dogs). Arriving a few minutes early helps keep the visit calm and unhurried.", category: "First visit" },
  { question: "What do I do if my pet has an emergency after hours?", answer: "Paws+Pine is not a 24/7 emergency hospital. If your pet needs urgent care outside our posted hours, please contact our referral emergency hospital directly — see the Emergency & Urgent Care details on our Location page for the hospital's phone number and address.", category: "Emergency" },
  { question: "What payment methods and pet insurance plans are accepted?", answer: "We accept cash, major debit and credit cards, and CareCredit financing. We don't bill pet insurance directly, but we can provide an itemized invoice so you can submit a claim to your provider for reimbursement.", category: "Payment & insurance" },
] as const;

export const staff = [
  {
    name: "Dr. Amara Reyes",
    title: "Lead Veterinarian",
    credentials: "DVM",
    bio: "Leads clinical direction at Paws+Pine, focusing on preventive care and calm, clear communication with pet parents.",
    imageKey: "aboutPup",
    placeholder: true,
  },
  {
    name: "Dr. Miguel Santos",
    title: "Associate Veterinarian",
    credentials: "DVM",
    bio: "Supports wellness exams, diagnostics, and senior pet check-ins with a steady, detail-oriented approach.",
    imageKey: "dogCare",
    placeholder: true,
  },
  {
    name: "Jamie Cruz",
    title: "Head Veterinary Technician",
    credentials: "RVT",
    bio: "Coordinates day-to-day patient care and keeps every visit organized, comfortable, and on schedule.",
    imageKey: "catCare",
    placeholder: true,
  },
] as { name: string; title: string; credentials: string; bio: string; imageKey: keyof typeof assets; placeholder: boolean }[];

export const emergencyInfo = {
  heading: "Emergency & after-hours care",
  note: "Paws+Pine provides scheduled care during posted business hours and is not an emergency hospital.",
  referralHospitalName: "(demo) Calamba 24/7 Animal Emergency Hospital",
  referralHospitalPhone: "(demo) 02 0000 1111",
  referralHospitalPhoneDigits: "0200001111",
  referralHospitalAddress: "(demo) Sample referral address, Calamba, Laguna",
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
    slug: "dr-maya-bennett",
    name: "Dr. Maya Bennett",
    credentials: "DVM",
    specialty: "Primary Care",
    bio: "Dr. Bennett anchors day-to-day wellness visits at Paws+Pine, focusing on routine exams, everyday health questions, and building trust with first-time pet parents. She believes the best care starts with an unhurried conversation.",
    yearsExperience: 9,
    areasOfInterest: ["Wellness exams", "Puppy & kitten care", "Client education"],
    imageKey: "aboutPup",
    placeholder: true,
  },
  {
    slug: "dr-ethan-brooks",
    name: "Dr. Ethan Brooks",
    credentials: "DVM",
    specialty: "Surgery & Diagnostics",
    bio: "Dr. Brooks leads the clinic's surgical and diagnostic conversations, helping pet parents understand what a closer look involves before any procedure is recommended. He's known for calm, detail-oriented explanations.",
    yearsExperience: 12,
    areasOfInterest: ["Diagnostic imaging", "Surgical planning", "Pain management"],
    imageKey: "dogCare",
    placeholder: true,
  },
  {
    slug: "dr-olivia-chen",
    name: "Dr. Olivia Chen",
    credentials: "DVM",
    specialty: "Preventive & Senior Pet Care",
    bio: "Dr. Chen focuses on prevention planning and later-life care, helping families notice small changes early and prepare useful notes ahead of a visit. She's a steady presence for pets moving through every stage of life.",
    yearsExperience: 7,
    areasOfInterest: ["Preventive care plans", "Senior pet wellness", "Nutrition guidance"],
    imageKey: "catCare",
    placeholder: true,
  },
] as { slug: string; name: string; credentials: string; specialty: string; bio: string; yearsExperience: number; areasOfInterest: string[]; imageKey: keyof typeof assets; placeholder: boolean }[];

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
    imageKey: "dogCare",
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
    imageKey: "catCare",
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
    imageKey: "aboutPup",
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
    imageKey: "serviceExam",
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
    imageKey: "dentalCare",
    disclaimer: true,
  },
] as { slug: string; title: string; category: string; date: string; readingTime: string; excerpt: string; body: string[]; imageKey: keyof typeof assets; disclaimer: boolean }[];

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
  { title: "Calm Reception", copy: "A quiet, welcoming front desk designed to ease first-visit nerves for pets and people alike.", imageKey: "clinicHero" },
  { title: "Comfortable Exam Rooms", copy: "Exam spaces set up for unhurried, hands-on conversations rather than rushed appointments.", imageKey: "serviceExam" },
  { title: "Modern Diagnostic Equipment", copy: "Approved diagnostic tools that help the clinical team get a clearer picture before recommending next steps.", imageKey: "diagnosticsCare" },
  { title: "Separate Pet-Friendly Spaces", copy: "Thoughtful layout choices that help keep visits low-stress for anxious cats and dogs alike.", imageKey: "catCare" },
  { title: "Caring Staff", copy: "A clinical team that paces every visit around your pet's comfort, not the clock.", imageKey: "dogCare" },
] as { title: string; copy: string; imageKey: keyof typeof assets }[];

export const patientSuccessStories = [
  {
    petName: "Max",
    breed: "Golden Retriever",
    category: "Dental Care",
    story: "Demo Patient Story: Max's family raised a general oral-care question during a routine visit, which led to a calm, informative conversation about his dental health with the clinical team.",
    imageKey: "dentalCare",
  },
  {
    petName: "Luna",
    breed: "Domestic Shorthair",
    category: "Wellness & Preventive Care",
    story: "Demo Patient Story: Luna's annual wellness visit gave her family a clear prevention plan and a better understanding of what to watch for between check-ins.",
    imageKey: "catCare",
  },
  {
    petName: "Charlie",
    breed: "Labrador",
    category: "Surgical Recovery",
    story: "Demo Patient Story: Charlie's family worked with the clinical team to understand his diagnostic overview and recovery expectations following a scheduled procedure.",
    imageKey: "diagnosticsCare",
  },
] as { petName: string; breed: string; category: string; story: string; imageKey: keyof typeof assets }[];

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
    description: "A fictional demo veterinary clinic showcasing preventive, dental, diagnostic, and senior pet care conversations.",
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
    image: assets[article.imageKey],
    publisher: { "@type": "Organization", name: clinic.name + " Veterinary Clinic" },
  };
}

export const assets = {
  heroPets: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663749726843/QIFiAEAkzojmOWyq.png",
  aboutPup: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663749726843/gxfDSdEuEMcvCNZD.png",
  serviceExam: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663749726843/tZrJrjlYhJUEPsuF.jpg",
  dogCare: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663749726843/sReyFxXTOZUMnDdX.jpg",
  catCare: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663749726843/tFvKKOWqRtINcxSU.jpg",
  clinicHero: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663749726843/NMymCvSdJzRaedlt.jpg",
  dentalCare: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663749726843/jKJAZemUJEByvNjO.jpg",
  diagnosticsCare: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663749726843/bDWSKfDPDwSbwKMc.jpg",
  seal: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663749726843/GDXOEaCkzyTwwmpA.png",
};
