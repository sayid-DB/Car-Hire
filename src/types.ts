export interface VehiclePlan {
  id: string;
  name: string;
  totalCostFormatted: string;
  depositFormatted: string;
  monthlyFormatted: string;
  totalCost: number;
  deposit: number;
  monthlyPayment: number;
  paymentPeriodMonths: number;
  registrationCostFormatted: string;
  imageUrl: string;
  tag: string;
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export interface ApplicationFormData {
  vehicle: string;
  fullName: string;
  dob: string;
  fullAddress: string;
  maritalStatus: string;
  phoneNumber: string;
  placeOfWork: string;
  drivingExperience: string;
  licenseNumber: string;
  depositAvailable: 'Yes' | 'No';
  proofOfPaymentFile: string | null;
  meansOfIdFile: string | null;
  driversLicenseFile: string | null;
  nepaBillFile: string | null;
  guarantorIdFile: string | null;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}
