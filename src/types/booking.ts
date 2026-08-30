export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  serviceInterest: string;
  insuranceProvider?: string;
  otherInsurance?: string;
  notes: string;
  smsConsent: boolean;
}

export type BookingStatus = "new" | "contacted" | "scheduled" | "completed" | "cancelled";

export interface BookingRecord extends BookingFormData {
  id: string;
  reference: string;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  reference?: string;
  errors?: Record<string, string[]>;
}
