export interface MarketingResource {
  id: string;
  title: string;
  description: string;
  tier: Tier;
  category: string;
  image: string;
  filePath: string;
}

export interface AccreditationLogo {
  name: string;
  logoUrl: string;
  url: string;
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

export type Condition =
  | 'Back Pain'
  | 'Neck Pain'
  | 'Shoulder Pain'
  | 'Knee Pain'
  | 'Headaches'
  | 'Sports Injury'
  | 'Post-surgical Rehab'
  | 'Prenatal Therapy'
  | 'Ankle Rehab'
  | 'Sports Injuries'
  | 'Post-Surgical Rehab'
  | 'Chronic Pain';

export type ClinicianType = 'Chiropractor' | 'Physical Therapist' | 'Athletic Trainer' | 'Massage Therapist' | 'Other' | 'Medical Doctor';
export type Language = 'English' | 'Spanish' | 'French' | 'German' | 'Mandarin' | 'Cantonese' | 'Arabic' | 'Hindi' | 'Korean';
export type RadiusOption = 5 | 10 | 25 | 50 | 100;
export type SortOption = 'premier-first' | 'top-rated' | 'most-reviewed';
export type Tier = 'Premier' | 'Preferred' | 'Free';
export type TrainingLevel = 'GTS' | 'Advanced' | 'Essential';
export type PatientDemographic = 'Adult' | 'Pediatric' | 'Geriatric' | 'Adolescent';

export interface FullProviderProfile {
  id: string;
  name: string;
  email: string;
  tier: Tier;
  engagementScore?: number;
  churnRisk: boolean;
  profileImage?: string;
  location?: string;
  specialty?: string;
  bio?: string;
  experience?: string;
  education?: string;
  website?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  services?: string[];
  certifications?: string[];
  phone?: string;
  clinicAddress?: string;
  coordinates?: { lat: number; lng: number };
  clinicianType?: ClinicianType;
  languagesSpoken?: Language[];
  conditionsTreated?: Condition[];
  patientTypes?: PatientDemographic[];
  trialStatus?: 'Active' | 'Expired' | 'N/A';
  activity?: number;
  rating?: number;
  reviewCount?: number;
  isFavorite?: boolean;
  can_compare?: boolean;
  gtCertifications?: TrainingLevel[];
  verificationBadges?: string[];
  accreditationLogos?: AccreditationLogo[];
  galleryImages?: string[];
  galleryVideos?: string[];
  testimonials?: Testimonial[];
  faqs?: FAQ[];
  views?: number;
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
  favoritesOnly?: boolean;
  sortBy?: SortOption;
}