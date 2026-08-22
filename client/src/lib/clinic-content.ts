export const clinic = {
  name: "Paws+Pine",
  descriptor: "Veterinary Clinic",
  address: "124 Cedar Lane, Willow District",
  city: "Cedarfield",
  phone: "(demo) 02 0000 0000",
  email: "hello@pawsandpine.example",
  hours: "Mon–Fri 8:30–18:00 · Sat 9:00–13:00",
};

export const services = [
  { number: "01", title: "Wellness visits", short: "A clear starting point for routine check-ins and everyday questions.", detail: "A structured conversation space for a pet’s routine health history, daily habits, and the questions their people want to raise.", icon: "stethoscope" },
  { number: "02", title: "Prevention planning", short: "Practical planning for the small things that support everyday wellbeing.", detail: "A focused way to introduce a real clinic’s approved vaccination, parasite-prevention, or general wellbeing pathways without overpromising outcomes.", icon: "shield" },
  { number: "03", title: "Puppy & kitten care", short: "Support for the early months, first questions, and first visits.", detail: "A welcoming space to explain an approved young-pet care pathway, early questions, and the next step for a new family.", icon: "sparkles" },
  { number: "04", title: "Senior pet check-ins", short: "Thoughtful touchpoints for pets moving through later life.", detail: "A clear place to discuss observable changes and help a pet owner prepare useful notes for a future clinic conversation.", icon: "heart" },
  { number: "05", title: "Dental care conversations", short: "An approachable introduction to oral-care options.", detail: "A concise service explanation that helps real clients understand how to ask about a pet’s oral care without presenting treatment advice or pricing claims.", icon: "smile" },
  { number: "06", title: "Diagnostics & procedures", short: "A measured route for care that needs a closer look.", detail: "A careful service overview for a real clinic’s approved diagnostic or procedure pathway, with the final recommendation left to the clinic team.", icon: "activity" },
] as const;

export const faqs = [
  { question: "What happens after I request a visit?", answer: "A care-team conversation begins with the details you choose to share. The next appropriate step is confirmed directly, rather than assumed online." },
  { question: "Can I choose a care path before I visit?", answer: "Yes. The service overview helps you recognize which conversation may be most helpful, while leaving room for the clinic team to guide the final next step." },
  { question: "How does this request page work?", answer: "It is designed to gather the useful essentials first. This showcase keeps submissions inside the browser; a production version connects its approved fields to the clinic’s configured follow-up process." },
] as const;

export const assets = {
  heroPets: "/manus-storage/paws-pine-blue-hero-pets_3d556a25.png",
  aboutPup: "/manus-storage/paws-pine-blue-about-pup_b0373fc3.png",
  serviceExam: "/manus-storage/paws-pine-blue-service-exam_9e31f9d3.jpg",
  dogCare: "/manus-storage/paws-pine-dog-care_a22a2df2.jpg",
  catCare: "/manus-storage/paws-pine-cat-care_7c4ca6cf.jpg",
  clinicHero: "/manus-storage/paws-pine-hero_7806da61.jpg",
  dentalCare: "/manus-storage/paws-pine-dental-care_69f1729e.jpg",
  diagnosticsCare: "/manus-storage/paws-pine-diagnostics-care_5f460451.jpg",
  seal: "/manus-storage/paws-pine-seal_41d53572.png",
};
