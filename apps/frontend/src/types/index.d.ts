export type Tier = "Free" | "Preferred" | "Premier";
export type TrialStatus = "Active" | "Expired" | "N/A";
export type ClinicianType =
  | "Physical Therapist"
  | "Chiropractor"
  | "Occupational Therapist"
  | "Athletic Trainer"
  | "Medical Doctor"
  | "Other";
export type TrainingLevel = "GTS" | "Advanced" | "Essential";
// Added "German" here
export type Language =
  | "English"
  | "Spanish"
  | "French"
  | "German"
  | "Mandarin"
  | "Arabic";

export interface ContactInfo {
  phone?: string;
  website?: string;
}

export interface SocialMedia {
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export interface Testimonial {
  author: string;
  quote: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FullProviderProfile {
  id: string;
  name: string;
  email: string;
  tier: Tier;
  trialStatus: TrialStatus;
  activity: number;
  churnRisk: boolean;
  profileImage?: string;
  specialty?: string;
  bio?: string;
  experience?: string;
  education?: string;
  socialMedia?: SocialMedia;
  services?: string[];
  certifications?: string[];
  location?: string;
  coordinates?: { lat: number; lng: number };
  city?: string;
  state?: string;
  zipCode?: string;
  clinicianType?: ClinicianType;
  trainingLevel?: TrainingLevel;
  languagesSpoken?: Language[];
  rating?: number;
  reviewCount?: number;
  activityScore?: number;
  galleryImages?: string[];
  testimonials?: Testimonial[];
  faqs?: FAQ[];
  contactInfo?: ContactInfo;
}

export interface DirectoryFilters {
  searchTerm?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  radius?: RadiusOption;
  tier?: Tier | "All";
  clinicianType?: ClinicianType | "All";
  specialty?: string | "All";
  trainingLevel?: TrainingLevel | "All";
  languages?: Language[];
  sortBy?: SortOption;
}

export type RadiusOption = 5 | 10 | 25 | 50 | 100;
export type SortOption =
  | "premier-first"
  | "closest"
  | "top-rated"
  | "most-active"
  | "most-reviewed";