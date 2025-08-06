import { FullProviderProfile, Tier } from "@/types";

const tierRequirements: Record<Tier, (keyof FullProviderProfile)[]> = {
  Free: ['first_name', 'last_name', 'email', 'profile_image', 'bio'],
  Preferred: ['first_name', 'last_name', 'email', 'profile_image', 'bio', 'website_url', 'booking_url'],
  Premier: ['first_name', 'last_name', 'email', 'profile_image', 'bio', 'website_url', 'booking_url', 'video_url', 'social_media_links'],
};

const fieldFriendlyNames: Record<keyof FullProviderProfile, string> = {
    id: 'ID',
    name: 'Full Name',
    tier: 'Membership Tier',
    first_name: 'First Name',
    last_name: 'Last Name',
    email: 'Email Address',
    profile_image: 'Profile Image',
    bio: 'Biography',
    website_url: 'Website URL',
    booking_url: 'Booking URL',
    video_url: 'Intro Video URL',
    social_media_links: 'Social Media Links',
    trialStatus: 'Trial Status',
    activity: 'Activity',
    churnRisk: 'Churn Risk',
};

export const calculateProfileScore = (user: FullProviderProfile) => {
  const requirements = tierRequirements[user.tier];
  let completedFields = 0;
  let nextAction = "Your profile is complete!";
  let firstMissingField: keyof FullProviderProfile | null = null;

  for (const field of requirements) {
    const value = user[field];
    if (value && (typeof value !== 'object' || (value && Object.keys(value).length > 0))) {
      completedFields++;
    } else if (!firstMissingField) {
        firstMissingField = field;
    }
  }

  const score = Math.round((completedFields / requirements.length) * 100);
  
  if (firstMissingField) {
    nextAction = `Next step: Add your ${fieldFriendlyNames[firstMissingField]}.`;
  }

  return { score, nextAction };
};