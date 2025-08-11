import { create } from 'zustand';
import { Condition, Language } from '@/types';

interface FilterState {
  searchTerm: string;
  clinicianType: string | null;
  condition: Condition | null;
  language: Language | null;
  tiers: string[];
  acceptingNewPatients: boolean;
  setSearchTerm: (term: string) => void;
  setClinicianType: (type: string | null) => void;
  setCondition: (condition: Condition | null) => void;
  setLanguage: (language: Language | null) => void;
  setTiers: (tiers: string[]) => void;
  setAcceptingNewPatients: (value: boolean) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchTerm: '',
  clinicianType: null,
  condition: null,
  language: null,
  tiers: ['Premier', 'Preferred', 'Free'],
  acceptingNewPatients: false,
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setClinicianType: (clinicianType) => set({ clinicianType }),
  setCondition: (condition) => set({ condition }),
  setLanguage: (language) => set({ language }),
  setTiers: (tiers) => set({ tiers }),
  setAcceptingNewPatients: (acceptingNewPatients) => set({ acceptingNewPatients }),
  clearFilters: () => set({
    searchTerm: '',
    clinicianType: null,
    condition: null,
    language: null,
    tiers: ['Premier', 'Preferred', 'Free'],
    acceptingNewPatients: false,
  }),
}));