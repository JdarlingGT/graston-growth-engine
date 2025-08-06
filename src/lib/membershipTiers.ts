import { FullProviderProfile, Tier } from "@/types";

// Updated to use correct property names from FullProviderProfile
const tierRequirements: Record<Tier, (keyof FullProviderProfile)[]> = {
  Free: ['name', 'email', 'profileImage', 'bio'],
  Preferred: ['name', 'email', 'profileImage', 'bio', 'website'],
  Premier: ['name', 'email', 'profileImage', 'bio', 'website', 'socialMedia'],
};

const fieldLabels: Record<keyof FullProviderProfile, string> = {
  id: 'ID',
  name: 'Full Name',
  membershipTier: 'Membership Tier',
  tier: 'Tier',
  email: 'Email',
  phone: 'Phone',
  specialty: 'Specialty',
  location: 'Location',
  bio: 'Bio',
  profileScore: 'Profile Score',
  joinDate: 'Join Date',
  lastActive: 'Last Active',
  verified: 'Verified',
  profileImage: 'Profile Image',
  website: 'Website',
  socialMedia: 'Social Media',
  services: 'Services',
  certifications: 'Certifications',
  experience: 'Experience',
  education: 'Education',
  trialStatus: 'Trial Status',
  activity: 'Activity',
  churnRisk: 'Churn Risk',
  first_name: 'First Name',
  last_name: 'Last Name',
};

export const calculateProfileScore = (user: FullProviderProfile) => {
  const requirements = tierRequirements[user.membershipTier || user.tier];
  let completedFields = 0;

  requirements.forEach(field => {
    if (user[field]) {
      completedFields++;
    }
  });

  const score = Math.round((completedFields / requirements.length) * 100);
  
  let nextAction = "Complete your profile to improve your score.";
  if (score === 100) {
    nextAction = "Your profile is complete!";
  } else {
    const missingFields = requirements.filter(field => !user[field]);
    if (missingFields.length > 0) {
      const fieldName = fieldLabels[missingFields[0]];
      nextAction = `Add your ${fieldName} to improve your score.`;
    }
  }

  return { score, nextAction };
};