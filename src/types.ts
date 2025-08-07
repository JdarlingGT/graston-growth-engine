export type Tier = "Free" | "Preferred" | "Premier";
export type TrainingLevel = "Essential" | "Advanced" | "GTS";
export type Language = "English" | "Spanish" | "French" | "German" | "Mandarin" | "Cantonese" | "Hindi" | "Arabic" | "Portuguese" | "Russian" | "Japanese" | "Korean" | "Italian" | "Vietnamese";
export type Condition = "Back Pain" | "Neck Pain" | "Shoulder Pain" | "Knee Pain" | "Headaches" | "Plantar Fasciitis" | "Tennis Elbow" | "Golfers Elbow" | "Carpal Tunnel Syndrome" | "Shin Splints" | "Rotator Cuff Tendinopathy" | "Achilles Tendinopathy" | "IT Band Syndrome" | "Sciatica" | "TMJ Dysfunction";
export type PatientDemographic = "Adults" | "Children" | "Adolescents" | "Seniors" | "Athletes" | "Pregnant Women" | "Post-Surgical Patients";
export type RadiusOption = 5 | 10 | 25 | 50 | 100;
export type ClinicianType = "Physical Therapist" | "Chiropractor" | "Occupational Therapist" | "Athletic Trainer" | "Massage Therapist" | "Medical Doctor" | "Other";

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}

export interface SocialMedia {
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  source?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Accreditation {
  name: string;
  logoUrl: string;
  url: string;
}

export interface MarketingResource {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  filePath: string;
  tier: Tier;
}

export interface FullProviderProfile {
  id: string;
  name: string;
  email: string; // Directly from profiles table
  specialty?: string;
  bio?: string;
  experience?: string;
  education?: string;
  profileImage?: string; // profile_image in DB
  phone?: string; // Directly from profiles table
  website?: string; // Directly from profiles table
  linkedin?: string; // Directly from profiles table
  facebook?: string; // Directly from profiles table
  instagram?: string; // Directly from profiles table
  twitter?: string; // Directly from profiles table
  services?: string[];
  certifications?: string[];
  location?: string;
  clinicAddress?: string;
  coordinates?: { lat: number; lng: number };
  gtCertifications?: TrainingLevel[]; // gt_certifications in DB
  verificationBadges?: string[];
  accreditationLogos?: Accreditation[];
  languagesSpoken?: Language[];
  patientTypes?: PatientDemographic[];
  conditionsTreated?: Condition[];
  rating?: number;
  reviewCount?: number;
  isFavorite?: boolean;
  tier: Tier;
  trialStatus?: "Active" | "Expired" | "N/A";
  activity?: number;
  churnRisk?: boolean;
  clinicianType?: ClinicianType;
}

export interface DirectoryFilters {
  searchTerm?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  radius?: RadiusOption;
  clinicianType?: ClinicianType | 'All';
  specialty?: string | 'All';
  tier?: Tier | 'All';
  trainingLevel?: TrainingLevel | 'All';
  languages?: Language[];
  conditionsTreated?: Condition[];
  patientTypes?: PatientDemographic[];
  sortBy?: SortOption;
  favoritesOnly?: boolean;
}

export type SortOption = 'premier-first' | 'top-rated' | 'most-reviewed';