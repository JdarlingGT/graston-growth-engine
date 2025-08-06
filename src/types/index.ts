export type Tier = "Free" | "Preferred" | "Premier";

export interface FullProviderProfile {
  // For data table
  id: string;
  name: string;
  email: string;
  tier: Tier;
  trialStatus: "Active" | "Expired" | "N/A";
  activity: number;
  churnRisk: boolean;

  // For profile score and dashboard
  first_name: string;
  last_name: string;
  profile_image?: string;
  bio?: string;
  website_url?: string;
  booking_url?: string;
  video_url?: string;
  social_media_links?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}