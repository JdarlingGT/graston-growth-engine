export interface ProfilePhoto {
  url: string;
  alt: string;
}

export interface TierBadge {
  url: string;
  alt: string;
}

export interface LocationMap {
  address: string;
  lat: number;
  lng: number;
  zoom: number;
}

export interface Location {
  clinic_street: string;
  clinic_city: string;
  clinic_state: string;
  clinic_zip: string;
  clinic_country: string;
  time_zone: string;
  latitude: number;
  longitude: number;
  location_map: LocationMap;
}

export interface Contact {
  clinic_phone: string;
  provider_email: string;
  clinic_website_url: string;
  booking_url: string;
  appointment_page_url: string;
}

export interface SocialMedia {
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  twitter_url: string;
}

export interface BioExperience {
  provider_bio: string;
  years_experience: number;
  associations_affiliations: string;
  provider_accreditations: string[];
}

export interface CertificateUpload {
  url: string;
  filename: string;
}

export interface TrainingCompleted {
  training_name: string;
  training_date: string;
  ceu_value: number;
  certificate_upload: CertificateUpload;
}

export interface TrainingAndCeus {
  ceu_credits: number;
  training_completed: TrainingCompleted[];
}

export interface ClinicGalleryImage {
  url: string;
  alt: string;
}

export interface MediaContent {
  about_clinic: string;
  clinic_gallery: ClinicGalleryImage[];
  video_intro: string;
}

export interface ConditionTreated {
  id: number;
  name: string;
}

export interface InsuranceAccepted {
  id: number;
  name: string;
}

export interface Specialties {
  conditions_treated: ConditionTreated[];
  insurance_accepted: InsuranceAccepted[];
  payment_methods: string[];
}

export interface OfficeHour {
  day_of_week: string;
  open_time: string;
  close_time: string;
}

export interface Availability {
  telehealth_available: boolean;
  office_hours: OfficeHour[];
}

export interface Testimonial {
  patient_name_initials: string;
  testimonial_rating: number;
  testimonial_text: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface ReviewsAndFaqs {
  avg_rating: number;
  testimonials: Testimonial[];
  faqs: Faq[];
}

export interface LinkedUser {
  id: number;
  username: string;
}

export interface Admin {
  linked_user: LinkedUser;
  override_expiration_date: string;
}

export interface Provider {
  id: number;
  profile_status: string;
  membership_tier: string;
  search_priority: number;
  provider_name: string;
  practitioner_type: { id: number; name: string };
  profile_photo: ProfilePhoto;
  tier_badge: TierBadge;
  location: Location;
  contact: Contact;
  social_media: SocialMedia;
  bio_experience: BioExperience;
  training_and_ceus: TrainingAndCeus;
  media_content: MediaContent;
  specialties: Specialties;
  availability: Availability;
  reviews_and_faqs: ReviewsAndFaqs;
  admin: Admin;
}