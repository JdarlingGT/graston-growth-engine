export type Tier = "Free" | "Preferred" | "Premier";
export type TrialStatus = "Active" | "Expired" | "N/A";
export type ClinicianType =
  | "Physical Therapist"
  | "Chiropractor"
  | "Massage Therapist"
  | "Athletic Trainer"
  | "Other";
export type TrainingLevel = "GTS" | "Advanced" | "Essential" | "All";
// Added "Hindi" here
export type Language = "English" | "Spanish" | "French" | "Hindi";
export type RadiusOption = 10 | 25 | 50 | 100;
export type SortOption =
  | "premier-first"
  | "closest"
  | "top-rated"
  | "most-active"
  | "most-reviewed";