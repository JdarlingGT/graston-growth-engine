export type Tier = "Free" | "Preferred" | "Premier";

export type ClinicianType = 'PT' | 'DC' | 'LMT' | 'ATC' | 'OT' | 'Other';

export type Condition = string;
export type Language = string;

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface AccreditationLogo {
  name: string;
  logoUrl: string;
  url?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  source?: string;
  rating?: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface MarketingResource {
  id: string;
  title: string;
  description: string;
  category: string;
  tier: Tier;
  image: string;
  filePath: string;
}

export interface FullProviderProfile {
  id: string;
  name: string;
  specialty: string | null;
  bio: string | null;
  experience: string | null;
  education: string | null;
  profile_image: string | null;
  phone: string | null;
  email: string;
  website: string | null;
  linkedin: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  services: string[] | null;
  certifications: string[] | null;
  location: string | null;
  clinic_address: string | null;
  coordinates: Coordinates | null;
  gt_certifications: string[] | null;
  verification_badges: string[] | null;
  accreditation_logos: AccreditationLogo[] | null;
  languages_spoken: string[] | null;
  patient_types: string[] | null;
  conditions_treated: string[] | null;
  rating: number | null;
  review_count: number | null;
  is_favorite: boolean | null;
  tier: Tier | null;
  clinician_type: string | null;
  updated_at: string | null;
  gallery_images: string[] | null;
  gallery_videos: string[] | null;
  testimonials: Testimonial[] | null;
  faqs: FAQ[] | null;
  can_compare: boolean | null;
  views: number | null;
  accepting_new_patients: boolean | null;
  
  // Properties added to fix compile errors
  engagementScore?: number;
  churnRisk?: boolean;
  trialStatus?: string;
}