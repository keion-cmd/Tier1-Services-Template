// Template Google Apps Script Web App URL for the footer email-updates capture — replace
// with the client's deployed Apps Script endpoint (bound to its own subscribers Google
// Sheet) before production. Kept separate from LEAD_FORM_ENDPOINT_URL and the intake
// sync's GOOGLE_SHEETS_INTAKE_SCRIPT_URL so subscriber emails land in their own sheet.
export const FOOTER_SIGNUP_ENDPOINT_URL =
  process.env.NEXT_PUBLIC_FOOTER_SIGNUP_ENDPOINT_URL || "https://hooks.example.com/[BUSINESS_SUBSCRIBERS_SLUG]";
