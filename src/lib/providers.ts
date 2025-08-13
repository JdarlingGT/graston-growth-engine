import { FullProviderProfile, Tier } from '@/types';
import { mockProviders } from '@/lib/mockData';
import smallProvidersRaw from '@/lib/smallProviderData.json';

type RawProvider = {
  provider_name: string;
  clinic_name: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  website: string;
  specialties: string[];
  languages_spoken: string[];
  clinician_type: string;
  provider_tier: string;
  latitude: number;
  longitude: number;
  bio?: string;
};

let allProviders: FullProviderProfile[] | null = null;

export const getAllProviders = (): FullProviderProfile[] => {
  if (allProviders) {
    return allProviders;
  }

  const external = (smallProvidersRaw as RawProvider[]).map((p: RawProvider, idx: number) => ({
    ...p,
    id: `ext-${idx}`,
    name: p.provider_name,
    specialty: p.specialties.join(', '),
    profileImage: `https://i.pravatar.cc/150?u=ext-${idx}`,
    location: `${p.city}, ${p.state}`,
    clinicAddress: p.clinic_name,
    coordinates: { lat: p.latitude, lng: p.longitude },
    tier: (p.provider_tier === 'Basic' ? 'Free' : p.provider_tier) as Tier,
    clinicianType: p.clinician_type as any,
    languagesSpoken: p.languages_spoken as any[],
    email: p.email,
    phone: p.phone,
    website: p.website,
    bio: p.bio || 'This provider has not yet added a biography. Please check back later for more information about their practice and specialties.',
    trialStatus: 'N/A',
    activity: 0,
    churnRisk: false,
    rating: 4 + (idx % 10) / 10,
    reviewCount: 5 + (idx % 20),
    isFavorite: false,
    engagementScore: Math.floor(Math.random() * 100),
    views: Math.floor(Math.random() * 1000),
    can_compare: p.provider_tier !== 'Basic',
  } as FullProviderProfile));

  const base = [...mockProviders, ...external];
  const list: FullProviderProfile[] = [];
  for (let i = 0; i < 100; i++) {
    const p = base[i % base.length];
    list.push({ 
      ...p, 
      id: `${p.id}-${i}`, 
      can_compare: p.tier !== 'Free',
      engagementScore: p.engagementScore || Math.floor(Math.random() * 100),
      views: p.views || Math.floor(Math.random() * 1000)
    });
  }
  
  allProviders = list;
  return allProviders;
};

export const getProviderById = (id: string): FullProviderProfile | null => {
  const providers = getAllProviders();
  return providers.find(p => p.id === id) || null;
};