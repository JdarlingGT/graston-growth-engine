import { FullProviderProfile, Tier, ClinicianType, Language, SortOption, RadiusOption } from '@/types';
import providerData from '@/data/providers.json';

// Helper function to generate a random number within a range
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;
const getRandomInt = (min: number, max: number) => Math.floor(getRandom(min, max));

// Helper to map provider_tier from JSON to the Tier type
const mapTier = (tier: string): Tier => {
  if (tier === 'Premier') return 'Premier';
  if (tier === 'Preferred') return 'Preferred';
  return 'Free'; // "Basic" maps to "Free"
};

export const mockProviders: FullProviderProfile[] = providerData.map((provider, index) => {
  const tier = mapTier(provider.provider_tier);
  const reviewCount = getRandomInt(5, 150);
  const rating = tier === 'Premier' ? getRandom(4.5, 5) : tier === 'Preferred' ? getRandom(4.0, 4.8) : getRandom(3.5, 4.5);

  return {
    id: `provider_${index + 1}`,
    name: provider.provider_name,
    email: provider.email,
    tier: tier,
    trialStatus: tier === 'Free' ? 'N/A' : (Math.random() > 0.7 ? 'Active' : 'Expired'),
    activity: getRandomInt(100, 2000),
    churnRisk: Math.random() > 0.85,
    profileImage: `https://i.pravatar.cc/150?u=${provider.email}`,
    specialty: provider.specialties[0] || 'General Practice',
    clinicianType: provider.clinician_type as ClinicianType,
    location: `${provider.city}, ${provider.state}`,
    city: provider.city,
    state: provider.state,
    zipCode: ``, // Not in source data
    coordinates: {
      lat: provider.latitude,
      lng: provider.longitude,
    },
    bio: `A dedicated ${provider.clinician_type} at ${provider.clinic_name} with a passion for helping patients with ${provider.specialties.join(', ')}. Committed to providing the highest quality care.`,
    experience: `${getRandomInt(2, 20)} years`,
    education: `University of Health Sciences`,
    website: provider.website,
    socialMedia: {
      linkedin: `https://linkedin.com/in/${provider.provider_name.replace(/\s+/g, '-').toLowerCase()}`,
      twitter: `https://twitter.com/${provider.provider_name.replace(/\s+/g, '').toLowerCase()}`,
    },
    services: provider.specialties,
    servicesOffered: provider.specialties,
    certifications: provider.accreditations,
    languagesSpoken: provider.languages_spoken as Language[],
    rating: parseFloat(rating.toFixed(1)),
    reviewCount: reviewCount,
    activityScore: getRandomInt(50, 500),
    trainingLevel: 'GTS', // Placeholder
    contactInfo: {
      phone: provider.phone,
      email: provider.email,
      website: provider.website,
    },
    galleryImages: [
        `https://picsum.photos/seed/${index+1}/400/300`,
        `https://picsum.photos/seed/${index+2}/400/300`,
        `https://picsum.photos/seed/${index+3}/400/300`,
    ],
    testimonials: [
        { author: 'Jane D.', quote: `Excellent care and wonderful staff at ${provider.clinic_name}. Highly recommend!` },
        { author: 'John S.', quote: `${provider.provider_name} is a true professional. My recovery was faster than I expected.` },
    ],
    faqs: [
        { question: 'Do you accept new patients?', answer: 'Yes, we are currently accepting new patients. Please call our office to schedule an appointment.' },
        { question: 'What are your office hours?', answer: 'We are open Monday to Friday, from 9 AM to 5 PM.' },
    ]
  };
});

// Static data for filters, can be derived or kept static
export const states = [...new Set(mockProviders.map(p => p.state).filter(Boolean))] as string[];
export const clinicianTypes: ClinicianType[] = ["Physical Therapist", "Chiropractor", "Massage Therapist", "Athletic Trainer", "Other"];
export const languages: Language[] = ["English", "Spanish", "French", "Hindi"];
export const radiusOptions: RadiusOption[] = [10, 25, 50, 100];
export const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'premier-first', label: 'Premier Providers First' },
  { value: 'closest', label: 'Closest to Me' },
  { value: 'top-rated', label: 'Top Rated' },
  { value: 'most-active', label: 'Most Active' },
  { value: 'most-reviewed', label: 'Most Reviewed' },
];