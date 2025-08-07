export type Tier = "Free" | "Preferred" | "Premier";
export type TrialStatus = "Active" | "Expired" | "N/A";
export type ClinicianType = "Physical Therapist" | "Chiropractor" | "Massage Therapist" | "Athletic Trainer" | "Other";
export type TrainingLevel = "GTS" | "Advanced" | "Essential" | "All";
export type Language = "English" | "Spanish" | "French" | "Hindi";
export type RadiusOption = 10 | 25 | 50 | 100;
export type SortOption = 'premier-first' | 'closest' | 'top-rated' | 'most-active' | 'most-reviewed';

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
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
  clinicianType?: ClinicianType;
  location?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  bio?: string;
  experience?: string;
  education?: string;
  website?: string;
  socialMedia?: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  services?: string[]; // from old form
  servicesOffered?: string[]; // from public profile
  certifications?: string[];
  languagesSpoken?: Language[];
  rating?: number;
  reviewCount?: number;
  activityScore?: number;
  trainingLevel?: TrainingLevel;
  contactInfo?: ContactInfo;
  galleryImages?: string[];
  testimonials?: Testimonial[];
  faqs?: FAQ[];
}

export interface DirectoryFilters {
  sortBy?: SortOption;
  city?: string;
  state?: string;
  zipCode?: string;
  radius?: RadiusOption;
  clinicianType?: ClinicianType | 'All';
  specialty?: string | 'All';
  tier?: Tier | 'All';
  trainingLevel?: TrainingLevel;
  languages?: Language[];
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