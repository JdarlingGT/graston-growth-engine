export interface ProviderProfile {
  id: string;
  provider_name: string;
  credentials: string;
  practitioner_type: string;
  tier: 'Free' | 'Preferred' | 'Premier';
  tier_badge: string;
  profile_photo?: string;
  
  // Contact & Location
  clinic_name?: string;
  clinic_street?: string;
  clinic_city: string;
  clinic_state: string;
  clinic_zip?: string;
  clinic_phone?: string;
  provider_email?: string;
  clinic_website_url?: string;
  location_map?: {
    lat: number;
    lng: number;
  };
  
  // Bio & Content
  provider_bio?: string;
  specialties: string[];
  conditions_treated: string[];
  
  // Qualifications & Trust Signals
  provider_accreditations: string[];
  insurance_accepted: string[];
  avg_rating?: number;
  total_reviews?: number;
  
  // Availability & Services
  telehealth_available: boolean;
  accepting_new_patients: boolean;
  office_hours?: OfficeHours[];
  
  // Social Media
  social_media?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  
  // Premier Features
  clinic_gallery?: GalleryImage[];
  video_intro?: string;
  testimonials?: Testimonial[];
  faqs?: FAQ[];
  booking_url?: string;
  custom_sections?: CustomSection[];
  published_articles?: Article[];
  upcoming_events?: Event[];
  community_activity?: CommunityPost[];
}

export interface OfficeHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

export interface Testimonial {
  id: string;
  patient_name: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface CustomSection {
  id: string;
  type: 'text' | 'video' | 'download' | 'gallery';
  title: string;
  content: any;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  published_date: string;
  read_time: number;
  slug: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  registration_url: string;
  description: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  type: 'topic' | 'reply';
  date: string;
  engagement: number;
}