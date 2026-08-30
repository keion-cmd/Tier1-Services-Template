export interface IndustryBrand {
  /** Visible token shown inside the placeholder card — swap for the real partner/vendor name (text only, no logo file needed). */
  name: string;
}

// No image files required — each brand renders as a text/monogram placeholder card.
// Add or remove array items freely; the marquee re-flows automatically.
export const industryBrands: IndustryBrand[] = [
  { name: "Head" },
  { name: "Bullpadel" },
  { name: "Adidas Padel" },
];
