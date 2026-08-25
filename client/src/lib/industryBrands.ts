export interface IndustryBrand {
  /** Visible token shown inside the placeholder card — swap for the real partner/vendor name (text only, no logo file needed). */
  name: string;
}

// No image files required — each brand renders as a text/monogram placeholder card.
// Add or remove array items freely; the marquee re-flows automatically.
export const industryBrands: IndustryBrand[] = [
  { name: "[PARTNER_BRAND_1]" },
  { name: "[PARTNER_BRAND_2]" },
  { name: "[PARTNER_BRAND_3]" },
  { name: "[PARTNER_BRAND_4]" },
  { name: "[PARTNER_BRAND_5]" },
  { name: "[PARTNER_BRAND_6]" },
  { name: "[PARTNER_BRAND_7]" },
];
