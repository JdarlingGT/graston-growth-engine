import { FullProviderProfile } from "@/types";

export const mockProviders: FullProviderProfile[] = [
  {
    id: "728ed52f",
    name: "Premier Provider",
    first_name: "Jane",
    last_name: "Doe",
    email: "jane.doe@example.com",
    tier: "Premier",
    trialStatus: "Active",
    activity: 450,
    churnRisk: false,
    profile_image: 'https://i.pravatar.cc/150?u=jane_doe',
    bio: 'An experienced professional with over 10 years in the industry.',
    website_url: 'https://example.com',
    booking_url: 'https://calendly.com/janedoe',
    video_url: 'https://youtube.com/example',
    social_media_links: {
        linkedin: 'https://linkedin.com/in/janedoe'
    }
  },
  {
    id: "489e1d42",
    name: "Preferred Provider",
    first_name: "John",
    last_name: "Smith",
    email: "john.smith@example.com",
    tier: "Preferred",
    trialStatus: "N/A",
    activity: 210,
    churnRisk: true,
    profile_image: 'https://i.pravatar.cc/150?u=john_smith',
    bio: 'A dedicated specialist focusing on modern solutions.',
    website_url: 'https://example.com',
    // Missing booking_url
  },
  {
    id: "f47ac10b",
    name: "Free Provider",
    first_name: "Emily",
    last_name: "White",
    email: "emily.white@example.com",
    tier: "Free",
    trialStatus: "Expired",
    activity: 50,
    churnRisk: false,
    // Missing profile_image and bio
  },
];