export interface SectionContentAnswers {
  industryBrandsMarquee: boolean;
  insuranceMarquee: boolean;
  trustStats: boolean;
  whyChooseUs: boolean;
  meetTheTeam: boolean;
  howItWorks: boolean;
  clinicExperience: boolean;
  reviewsMarquee: boolean;
  clientStories: boolean;
  healthResources: boolean;
  carePlans: boolean;
  faqTeaser: boolean;
  proofStories: boolean;
  proofCareStats: boolean;
  aboutTeamGrid: boolean;
  teamProvidersGrid: boolean;
}

export type BookingModeAnswer = "modal" | "external";

export interface IntakeFormData {
  businessName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  niche: string;
  numberOfLocations: number;
  currentBookingSystem?: string;
  notes?: string;
  bookingMode: BookingModeAnswer;
  sectionContent: SectionContentAnswers;
}

export interface IntakeRecord extends IntakeFormData {
  id: string;
  created_at: string;
}

export interface IntakeApiResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
