import { FullProviderProfile, ClinicianType, Language, Condition, PatientDemographic, Tier, SortOption, TrainingLevel } from "@/types";

export const states: string[] = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD",
  "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH",
  "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY",
];

export const sortOptions: { value: SortOption, label: string }[] = [
  { value: "premier-first", label: "Premier First" },
  { value: "top-rated", label: "Top Rated" },
  { value: "most-reviewed", label: "Most Reviewed" }
];

export const specialties: string[] = ["Physical Therapy", "Chiropractic", "Multi-specialty", "Sports Medicine", "Massage Therapy", "Athletic Training"];

export const clinicianTypes: ClinicianType[] = [
  "Chiropractor", "Physical Therapist", "Athletic Trainer", "Massage Therapist", "Other", "Medical Doctor"
];

export const languages: Language[] = [
  "English", "Spanish", "French", "German", "Mandarin", "Cantonese", "Arabic", "Hindi", "Korean"
];

export const radiusOptions: number[] = [5, 10, 25, 50, 100];

export const conditions: Condition[] = [
  "Back Pain", "Neck Pain", "Shoulder Pain", "Knee Pain", "Headaches", "Sports Injury",
  "Post-surgical Rehab", "Prenatal Therapy", "Ankle Rehab", "Chronic Pain"
];

export const patientDemographics: PatientDemographic[] = [
  "Adult", "Pediatric", "Geriatric", "Adolescent"
];

export const mockProviders: FullProviderProfile[] = [
  {
    id: "1",
    name: "Dr. Emily White",
    email: "emily.white@example.com",
    tier: "Premier",
    engagementScore: 95,
    churnRisk: false,
    profileImage: "https://i.pravatar.cc/150?img=1",
    location: "New York, NY",
    specialty: "Physical Therapy",
    bio: "Dr. White specializes in sports injury rehabilitation and preventative care. With over a decade of experience, she is dedicated to providing personalized treatment plans to help patients achieve their functional goals.",
    experience: "12 years",
    education: "DPT, New York University",
    website: "https://emilywhitept.com",
    linkedin: "https://linkedin.com/in/emilywhite",
    services: ["Sports Rehab", "Post-op Recovery", "Manual Therapy", "Dry Needling"],
    certifications: ["OCS", "CSCS"],
    phone: "(212) 555-0100",
    clinicAddress: "123 Main St, New York, NY 10001",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    clinicianType: "Physical Therapist",
    languagesSpoken: ["English", "Spanish"],
    conditionsTreated: ["Knee Pain", "Shoulder Pain", "Sports Injury"],
    patientTypes: ["Adult", "Adolescent"],
    trialStatus: "N/A",
    activity: 100,
    rating: 4.8,
    reviewCount: 120,
    isFavorite: false,
    can_compare: true,
    gtCertifications: ["Advanced", "Essential"],
    verificationBadges: ["Verified"],
    accreditationLogos: [{ name: "APTA", logoUrl: "/logos/apta.png", url: "#" }],
    galleryImages: ["/placeholders/gallery1.jpg", "/placeholders/gallery2.jpg"],
    galleryVideos: ["/placeholders/video1.mp4"],
    testimonials: [{ quote: "Dr. White is amazing!", author: "John D.", rating: 5 }],
    faqs: [{ question: "Do you accept insurance?", answer: "Yes, we accept most major insurance plans." }],
    views: 2500,
  },
  {
    id: "2",
    name: "Dr. John Davis",
    email: "john.davis@example.com",
    tier: "Preferred",
    engagementScore: 70,
    churnRisk: false,
    profileImage: "https://i.pravatar.cc/150?img=2",
    location: "Los Angeles, CA",
    specialty: "Chiropractic",
    bio: "Dr. Davis focuses on holistic chiropractic care for chronic pain management.",
    experience: "8 years",
    education: "DC, Palmer College of Chiropractic",
    website: "https://johndavischiropractic.com",
    services: ["Spinal Adjustments", "Posture Correction", "Massage Therapy"],
    certifications: ["CCSP"],
    phone: "(310) 555-0101",
    clinicAddress: "456 Oak Ave, Los Angeles, CA 90001",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    clinicianType: "Chiropractor",
    languagesSpoken: ["English"],
    conditionsTreated: ["Back Pain", "Neck Pain", "Headaches", "Chronic Pain"],
    patientTypes: ["Adult"],
    trialStatus: "N/A",
    activity: 75,
    rating: 4.5,
    reviewCount: 80,
    isFavorite: false,
    can_compare: true,
    gtCertifications: ["Essential"],
    views: 1800,
  },
  {
    id: "3",
    name: "Wellness Clinic",
    email: "info@wellnessclinic.com",
    tier: "Free",
    engagementScore: 30,
    churnRisk: true,
    profileImage: "https://i.pravatar.cc/150?img=3",
    location: "Chicago, IL",
    specialty: "Multi-specialty",
    bio: "A clinic offering a range of wellness services including physical therapy and massage.",
    experience: "5 years",
    education: "Various",
    services: ["Physical Therapy", "Massage Therapy"],
    phone: "(312) 555-0102",
    clinicAddress: "789 Pine St, Chicago, IL 60601",
    coordinates: { lat: 41.8781, lng: -87.6298 },
    clinicianType: "Other",
    languagesSpoken: ["English"],
    conditionsTreated: ["Back Pain", "Neck Pain"],
    patientTypes: ["Adult"],
    trialStatus: "N/A",
    activity: 30,
    rating: 3.9,
    reviewCount: 45,
    isFavorite: false,
    can_compare: false,
    views: 500,
  },
  {
    id: "10",
    name: "Dr. Sophia Lee",
    email: "sophia.lee@example.com",
    tier: "Preferred",
    engagementScore: 82,
    churnRisk: false,
    profileImage: "https://i.pravatar.cc/150?img=10",
    location: "Dallas, TX",
    specialty: "Physical Therapy",
    bio: "Specializing in post-surgical rehabilitation and chronic pain management.",
    experience: "11 years",
    education: "DPT, UT Southwestern",
    services: ["Post-surgical Rehab", "Chronic Pain Management", "Dry Needling"],
    phone: "(214) 555-0109",
    clinicAddress: "707 Commerce St, Dallas, TX 75201",
    coordinates: { lat: 32.7767, lng: -96.7970 },
    clinicianType: "Physical Therapist",
    languagesSpoken: ["English", "Korean"],
    conditionsTreated: ["Post-surgical Rehab", "Chronic Pain"],
    patientTypes: ["Adult"],
    trialStatus: "N/A",
    activity: 85,
    rating: 4.6,
    reviewCount: 88,
    isFavorite: false,
    can_compare: true,
    gtCertifications: ["Advanced"],
    views: 1650,
  },
];