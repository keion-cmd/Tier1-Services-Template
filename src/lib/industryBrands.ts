export interface IndustryBrand {
  /** Visible token shown inside the placeholder card — swap for the real partner/vendor name (text only, no logo file needed). */
  name: string;
}

// No image files required — each brand renders as a text/monogram placeholder card.
// Add or remove array items freely; the marquee re-flows automatically.
export const industryBrands: IndustryBrand[] = [
  { name: "[INDUSTRY_BRAND_1]" },
  { name: "[INDUSTRY_BRAND_2]" },
  { name: "[INDUSTRY_BRAND_3]" },
  { name: "[INDUSTRY_BRAND_4]" },
  { name: "[INDUSTRY_BRAND_5]" },
  { name: "[INDUSTRY_BRAND_6]" },
  { name: "[INDUSTRY_BRAND_7]" },
  { name: "[INDUSTRY_BRAND_8]" },
  { name: "[INDUSTRY_BRAND_9]" },
];
