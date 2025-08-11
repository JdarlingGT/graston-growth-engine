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
  clearFilters: () => void; // New action
}

export const useFilterStore = create<FilterState>((set) => ({
  searchTerm: '',
  clinicianType: null,
  condition: null,
  language: null,
  tiers: ['Premier', 'Preferred', 'Free'], // Default to all tiers selected
  acceptingNewPatients: false,
  setSearchTerm: (term) => set({ searchTerm: term }),
  setClinicianType: (type) => set({ clinicianType: type }),
  setCondition: (condition) => set({ condition: condition }),
  setLanguage: (language) => set({ language: language }),
  setTiers: (tiers) => set({ tiers: tiers }),
  setAcceptingNewPatients: (value) => set({ acceptingNewPatients: value }),
  clearFilters: () => set({ // Implementation of clearFilters
    searchTerm: '',
    clinicianType: null,
    condition: null,
    language: null,
    tiers: ['Premier', 'Preferred', 'Free'],
    acceptingNewPatients: false,
  }),
}));