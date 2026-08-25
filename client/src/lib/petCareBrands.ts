export interface PetCareBrand {
  name: string;
  logo: string;
  /** Renders the logo on a dark chip — for wordmarks (e.g. light/gold on transparent) designed for dark backgrounds. */
  onDark?: boolean;
}

export const petCareBrands: PetCareBrand[] = [
  { name: "Royal Canin", logo: "/partners/royal-canin.png" },
  { name: "Hill's Pet Nutrition", logo: "/partners/hills-pet-nutrition.png" },
  { name: "Purina Pro Plan Veterinary Diets", logo: "/partners/purina-pro-plan.png", onDark: true },
  { name: "Zoetis", logo: "/partners/zoetis.png" },
  { name: "Elanco", logo: "/partners/elanco.png" },
  { name: "IDEXX", logo: "/partners/idexx.png" },
  { name: "Boehringer Ingelheim", logo: "/partners/boehringer-ingelheim.png" },
];
