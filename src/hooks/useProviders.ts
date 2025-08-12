import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { FullProviderProfile, Tier, Condition, Language } from '@/types';

interface ProviderFilters {
  searchTerm?: string;
  clinicianType?: string | null;
  condition?: Condition | null;
  language?: Language | null;
  tiers?: Tier[];
  acceptingNewPatients?: boolean;
}

const fetchProviders = async (filters: ProviderFilters): Promise<FullProviderProfile[]> => {
  let query = supabase.from('profiles').select('*');

  if (filters.searchTerm) {
    query = query.ilike('name', `%${filters.searchTerm}%`);
  }
  if (filters.clinicianType) {
    query = query.eq('clinician_type', filters.clinicianType);
  }
  if (filters.condition) {
    query = query.contains('conditions_treated', [filters.condition]);
  }
  if (filters.language) {
    query = query.contains('languages_spoken', [filters.language]);
  }
  if (filters.tiers && filters.tiers.length > 0) {
    query = query.in('tier', filters.tiers);
  }
  if (filters.acceptingNewPatients) {
    query = query.eq('accepting_new_patients', true);
  }

  const { data, error } = await query.limit(100); // Add a limit to avoid fetching too much data

  if (error) {
    console.error('Error fetching providers:', error);
    throw new Error(error.message);
  }

  return (data as FullProviderProfile[]) || [];
};

export const useProviders = (filters: ProviderFilters) => {
  return useQuery<FullProviderProfile[], Error>({
    queryKey: ['providers', filters],
    queryFn: () => fetchProviders(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};