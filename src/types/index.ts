export type Tier = 'Premier' | 'Preferred' | 'Free';

export interface DirectoryFilters {
  sortBy: "premier-first" | "top-rated" | "most-reviewed";
  searchTerm?: string;
  city?: string;
  state?: string;
  clinicianType?: string;
  specialty?: string;
  tier?: Tier | 'All';
  favoritesOnly?: boolean;
}

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  profileImage: string;
  location: string;
  clinicAddress: string;
  coordinates?: { lat: number; lng: number };
  tier: Tier;
  clinicianType: string;
  languagesSpoken: string[];
  email: string;
  phone: string;
  website: string;
  bio?: string;
  trialStatus: string;
  activity: number;
  churnRisk: boolean;
  rating?: number;
  reviewCount?: number;
  isFavorite: boolean;
  engagementScore?: number;
  views?: number;
  can_compare: boolean;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}

export interface Testimonial {
  author: string;
  avatar: string; // Added for TestimonialsCard.tsx
  text: string;
  rating: number;
}

export interface Faq { // Added for FaqCard.tsx
  question: string;
  answer: string;
}

export interface MediaItem { // Added for MediaCard.tsx
  type: 'image' | 'video';
  url: string;
}

export interface FullProviderProfile extends Provider {
  media?: MediaItem[]; // Added for PublicProviderProfilePage.tsx
  testimonials?: Testimonial[];
  faqs?: Faq[];
  services?: string[];
}