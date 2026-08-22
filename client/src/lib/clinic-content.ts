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
  { number: "01", title: "Wellness visits", short: "A calm starting point for regular check-ins and everyday questions.", detail: "A structured conversation space for a pet’s routine health history, daily habits, and the questions their people want to raise.", icon: "stethoscope" },
  { number: "02", title: "Prevention planning", short: "Clear, clinic-approved prevention conversations tailored to the pet in front of you.", detail: "A focused way to introduce a real clinic’s approved vaccination, parasite-prevention, or general wellbeing pathways without overpromising outcomes.", icon: "shield" },
  { number: "03", title: "Puppy & kitten care", short: "Practical guidance for a pet’s early months and first clinic conversations.", detail: "A welcoming space to explain an approved young-pet care pathway, early questions, and the next step for a new family.", icon: "sparkles" },
  { number: "04", title: "Senior pet check-ins", short: "Thoughtful touchpoints for pets moving through later life.", detail: "A clear place to discuss observable changes and help a pet owner prepare useful notes for a future clinic conversation.", icon: "heart" },
  { number: "05", title: "Dental care conversations", short: "An approachable introduction to your clinic’s approved oral-care options.", detail: "A concise service explanation that helps real clients understand how to ask about a pet’s oral care without presenting treatment advice or pricing claims.", icon: "smile" },
  { number: "06", title: "Diagnostics & procedures", short: "An information-first route for more detailed care conversations.", detail: "A careful service overview for a real clinic’s approved diagnostic or procedure pathway, with the final recommendation left to the clinic team.", icon: "activity" },
] as const;

export const faqs = [
  { question: "Is Paws+Pine a real clinic?", answer: "No. Paws+Pine is fictional sample content created to demonstrate a Tier 1 veterinary website. Names, contact details, hours, services, and imagery are presentation material only." },
  { question: "What happens when I send this request?", answer: "In a real Tier 1 site, an approved form can record a request in a provider-managed Google Sheet for clinic follow-up. This demo form only shows a local confirmation and does not send data or create an appointment." },
  { question: "Can a real clinic use this layout?", answer: "Yes. A production version should replace every fictional detail with approved clinic information, verified contacts, authorized imagery, and the agreed request-workflow configuration." },
] as const;

export const assets = {
  heroPets: "/manus-storage/paws-pine-blue-hero-pets_06cdd9d9.png",
  aboutPup: "/manus-storage/paws-pine-blue-about-pup_b0373fc3.png",
  serviceExam: "/manus-storage/paws-pine-blue-service-exam_9e31f9d3.jpg",
  seal: "/manus-storage/paws-pine-seal_41d53572.png",
};
