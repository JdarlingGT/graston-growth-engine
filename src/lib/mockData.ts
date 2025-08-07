import type {
  ClinicianType,
  Language,
  RadiusOption,
  SortOption,
  FullProviderProfile,
} from "@/types";

// Sample/mock clinicians
export const clinicianTypes: ClinicianType[] = [
  "Physical Therapist",
  "Chiropractor",
  "Massage Therapist",
  "Athletic Trainer",
  "Other",
];

// Supported languages
export const languages: Language[] = [
  "English",
  "Spanish",
  "French",
  "Hindi",
] as Language[];

// Map radius options
export const radiusOptions: RadiusOption[] = [10, 25, 50, 100];

// U.S. state abbreviations
export const states: string[] = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

// Sort options for directory
export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "premier-first", label: "Premier First" },
  { value: "top-rated",    label: "Top Rated"    },
  { value: "most-reviewed",label: "Most Reviewed"},
];

// Mock list of providers (empty by default)
export const mockProviders: FullProviderProfile[] = [];