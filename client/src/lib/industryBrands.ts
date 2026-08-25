export interface IndustryBrand {
  name: string;
  logo: string;
  /** Renders the logo on a dark chip — for wordmarks (e.g. light/gold on transparent) designed for dark backgrounds. */
  onDark?: boolean;
}

// Logo files under /public/partners are demo placeholder graphics — swap them for the
// client's actual partner/vendor logos and update the `name` tokens below.
export const industryBrands: IndustryBrand[] = [
  { name: "[PARTNER_BRAND_1]", logo: "/partners/royal-canin.png" },
  { name: "[PARTNER_BRAND_2]", logo: "/partners/hills-pet-nutrition.png" },
  { name: "[PARTNER_BRAND_3]", logo: "/partners/purina-pro-plan.png", onDark: true },
  { name: "[PARTNER_BRAND_4]", logo: "/partners/zoetis.png" },
  { name: "[PARTNER_BRAND_5]", logo: "/partners/elanco.png" },
  { name: "[PARTNER_BRAND_6]", logo: "/partners/idexx.png" },
  { name: "[PARTNER_BRAND_7]", logo: "/partners/boehringer-ingelheim.png" },
];
