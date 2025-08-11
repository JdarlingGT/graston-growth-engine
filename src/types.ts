export type Tier = "Premier" | "Preferred" | "Free";

export type Condition =
  | "Low Back Pain"
  | "Neck Pain"
  | "Sciatica"
  | "Sports Injuries"
  | "Headaches & Migraines"
  | "Plantar Fasciitis"
  | "Tennis Elbow"
  | "Carpal Tunnel Syndrome";

export type Language = "English" | "Spanish" | "French" | "Mandarin" | "German";

export type ClinicianType = "Chiropractor" | "Physical Therapist" | "Massage Therapist" | "Acupuncturist";

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
  rating?: number;
  source?: string;
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
  email: string;
  specialty?: string | null;
  clinician_type?: ClinicianType | null;
  tier?: Tier | null;
  
  // Contact & Location
  phone?: string | null;
  website?: string | null;
  location?: string | null; // e.g., "City, State"
  clinic_address?: string | null;
  coordinates?: Coordinates | null;

  // Profile Details
  bio?: string | null;
  profile_image?: string | null;
  rating?: number | null;
  review_count?: number | null;
  accepting_new_patients?: boolean | null;
  
  // Arrays
  services?: string[] | null;
  conditions_treated?: Condition[] | null;
  languages_spoken?: Language[] | null;
  certifications?: string[] | null;
  verification_badges?: string[] | null;
  gallery_images?: string[] | null;
  gallery_videos?: string[] | null;
  testimonials?: Testimonial[] | null;
  faqs?: FAQ[] | null;
  accreditation_logos?: AccreditationLogo[] | null;

  // Social
  linkedin?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  twitter?: string | null;

  // Other fields from schema (optional for mock data)
  experience?: string | null;
  education?: string | null;

  // Admin/Internal fields
  engagementScore?: number | null;
  churnRisk?: boolean | null;
  views?: number | null;
  isFavorite?: boolean | null;
  trialStatus?: 'Active' | 'Expired' | 'N/A' | null;
  can_compare?: boolean | null;
}