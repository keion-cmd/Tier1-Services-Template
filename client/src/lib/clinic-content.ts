export const clinic = {
  name: "Paws+Pine",
  descriptor: "Veterinary Clinic",
  address: "Center Stall No. 4027, 2nd Street",
  city: "Calamba, Laguna",
  phone: "(demo) 02 0000 0000",
  email: "hello@pawsandpine.example",
  hours: "Mon–Fri 8:30–18:00 · Sat 9:00–13:00",
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

export const faqs = [
  { question: "What happens after I request a visit?", answer: "A care-team conversation begins with the details you choose to share. The next appropriate step is confirmed directly, rather than assumed online." },
  { question: "Can I choose a care path before I visit?", answer: "Yes. The service overview helps you recognize which conversation may be most helpful, while leaving room for the clinic team to guide the final next step." },
  { question: "How does this request page work?", answer: "A successful request is recorded securely for staff review. It does not reserve a time or confirm an appointment; the clinic follows up directly about the next step." },
] as const;

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
