import { create } from 'zustand';

interface FilterState {
  searchTerm: string;
  clinicianType: string | null;
  condition: string | null;
  language: string | null;
  tiers: string[];
  setSearchTerm: (term: string) => void;
  setClinicianType: (type: string | null) => void;
  setCondition: (condition: string | null) => void;
  setLanguage: (language: string | null) => void;
  setTiers: (tiers: string[]) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchTerm: '',
  clinicianType: null,
  condition: null,
  language: null,
  tiers: ['Premier', 'Preferred', 'Free'],
  setSearchTerm: (term) => set({ searchTerm: term }),
  setClinicianType: (type) => set({ clinicianType: type }),
  setCondition: (condition) => set({ condition: condition }),
  setLanguage: (language) => set({ language: language }),
  setTiers: (tiers) => set({ tiers: tiers }),
  clearFilters: () => set({
    searchTerm: '',
    clinicianType: null,
    condition: null,
    language: null,
    tiers: ['Premier', 'Preferred', 'Free'],
  }),
}));