// Canonical insurance/coverage provider list — single source of truth for both
// the InsuranceMarquee display and the InsuranceCombobox form field. Replace the
// placeholder names with the providers the client actually accepts.
export interface InsuranceProvider {
  id: string;
  name: string;
}

export const insuranceProviders: InsuranceProvider[] = [
  { id: "provider-1", name: "[INSURANCE_PROVIDER_1_NAME]" },
  { id: "provider-2", name: "[INSURANCE_PROVIDER_2_NAME]" },
  { id: "provider-3", name: "[INSURANCE_PROVIDER_3_NAME]" },
  { id: "provider-4", name: "[INSURANCE_PROVIDER_4_NAME]" },
  { id: "provider-5", name: "[INSURANCE_PROVIDER_5_NAME]" },
  { id: "provider-6", name: "[INSURANCE_PROVIDER_6_NAME]" },
  { id: "provider-7", name: "[INSURANCE_PROVIDER_7_NAME]" },
  { id: "provider-8", name: "[INSURANCE_PROVIDER_8_NAME]" },
  { id: "other", name: "Other / Not Listed" },
];

export const INSURANCE_PROVIDER_NAMES = insuranceProviders.map((p) => p.name) as [string, ...string[]];
