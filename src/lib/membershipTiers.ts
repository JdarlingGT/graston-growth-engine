import { FullProviderProfile, Tier } from "@/types";

const requiredProfileFields: Record<Tier, (keyof FullProviderProfile)[]> = {
  Free: ['name', 'specialty', 'location', 'phone', 'email'],
  Preferred: [
    'name', 'specialty', 'location', 'phone', 'email', 
    'profile_image', 'bio', 'website', 'services'
  ],
  Premier: [
    'name', 'specialty', 'location', 'phone', 'email', 
    'profile_image', 'bio', 'website', 'services', 
    'certifications', 'gallery_images', 'testimonials', 'faqs'
  ],
};

const getNestedProperty = (obj: any, path: string): any => {
  return path.split('.').reduce((o, p) => (o && o[p] !== undefined ? o[p] : null), obj);
};

export const calculateProfileCompleteness = (user: FullProviderProfile): number => {
  if (!user.tier) return 0; // Add guard clause for null/undefined tier

  let completedFields = 0;
  const requiredFields = requiredProfileFields[user.tier];
  if (!requiredFields) return 0;

  requiredFields.forEach((fieldPath: string) => { // Explicitly type fieldPath
    const value = getNestedProperty(user, fieldPath);
    if (value !== null && value !== undefined && value !== '' && (!Array.isArray(value) || value.length > 0)) {
      completedFields++;
    }
  });

  return Math.round((completedFields / requiredFields.length) * 100);
};

export const calculateProfileScore = (user: FullProviderProfile): { score: number; nextAction: string } => {
  if (!user.tier) {
    return { score: 0, nextAction: "Please select a membership tier to see your profile score." };
  }

  const score = calculateProfileCompleteness(user);

  if (score === 100) {
    return { score: 100, nextAction: "Your profile is complete! Great job." };
  }

  const requiredFields = requiredProfileFields[user.tier];
  if (!requiredFields) {
    return { score: 0, nextAction: "Could not determine required fields for your tier." };
  }

  const missingField = requiredFields.find(fieldPath => {
    const value = getNestedProperty(user, fieldPath as keyof FullProviderProfile);
    return value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0);
  });

  const nextAction = missingField
    ? `To improve your score, add your ${missingField.replace(/_/g, ' ')}.`
    : "Your profile is looking great!";

  return { score, nextAction };
};