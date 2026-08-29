export interface IntakeFormData {
  businessName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  niche: string;
  numberOfLocations: number;
  currentBookingSystem?: string;
  notes?: string;
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
