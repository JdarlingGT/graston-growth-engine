import { FullProviderProfile } from "@/types";

/**
 * Maps a single record from the Supabase 'profiles' table to the 
 * FullProviderProfile type used throughout the React application.
 * This ensures data consistency and makes it easy to manage type differences.
 * @param data - The raw data object from a Supabase query.
 * @returns A FullProviderProfile object.
 */
export const mapProfileToFullProviderProfile = (data: any): FullProviderProfile => {
  return {
    id: data.id,
    name: data.name || '',
    email: data.email || '',
    specialty: data.specialty || undefined,
    bio: data.bio || undefined,
    experience: data.experience || undefined,
    education: data.education || undefined,
    profileImage: data.profile_image || undefined,
    phone: data.phone || undefined,
    website: data.website || undefined,
    linkedin: data.linkedin || undefined,
    facebook: data.facebook || undefined,
    instagram: data.instagram || undefined,
    twitter: data.twitter || undefined,
    services: data.services || [],
    certifications: data.certifications || [],
    location: data.location || undefined,
    clinicAddress: data.clinic_address || undefined,
    coordinates: data.coordinates || undefined,
    gtCertifications: data.gt_certifications || [],
    verificationBadges: data.verification_badges || [],
    accreditationLogos: data.accreditation_logos || [],
    languagesSpoken: data.languages_spoken || [],
    patientTypes: data.patient_types || [],
    conditionsTreated: data.conditions_treated || [],
    rating: data.rating || undefined,
    reviewCount: data.review_count || undefined,
    isFavorite: data.is_favorite || false,
    tier: data.tier || 'Free',
    clinicianType: data.clinician_type || undefined,
    galleryImages: data.gallery_images || [],
    galleryVideos: data.gallery_videos || [],
    testimonials: data.testimonials || [],
    faqs: data.faqs || [],
    views: data.views || 0,
    // These fields are not in the DB and are used for client-side logic or mock data.
    // They will need to be derived or handled separately in the future.
    trialStatus: "N/A", 
    activity: 0,
    churnRisk: false,
    // Mock engagement score for now, will be calculated later
    engagementScore: Math.floor(Math.random() * 100),
  };
};