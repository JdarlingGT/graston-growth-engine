import { FullProviderProfile } from "@/types";

export const mockProviders: FullProviderProfile[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    specialty: "Physical Therapy",
    location: "New York, NY",
    bio: "Experienced physical therapist specializing in sports injuries and rehabilitation.",
    profileScore: 85,
    membershipTier: "Premier",
    tier: "Premier", // Legacy alias
    joinDate: "2023-01-15",
    lastActive: "2024-01-20",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    website: "https://drjohnsonpt.com",
    socialMedia: {
      linkedin: "https://linkedin.com/in/sarahjohnsonpt",
      facebook: "https://facebook.com/drjohnsonpt"
    },
    services: [
      "Sports Injury Rehabilitation",
      "Manual Therapy",
      "Movement Analysis",
      "Post-Surgical Recovery"
    ],
    certifications: [
      "Licensed Physical Therapist",
      "Certified Strength and Conditioning Specialist",
      "Dry Needling Certification"
    ],
    experience: "12 years",
    education: "Doctor of Physical Therapy, Columbia University",
    trialStatus: "N/A",
    activity: 1200,
    churnRisk: false,
    first_name: "Sarah",
    last_name: "Johnson"
  },
  {
    id: "2", 
    name: "Dr. Michael Chen",
    email: "michael.chen@example.com",
    phone: "(555) 987-6543",
    specialty: "Chiropractic Care",
    location: "Los Angeles, CA",
    bio: "Board-certified chiropractor focused on holistic wellness and pain management.",
    profileScore: 92,
    membershipTier: "Premier",
    tier: "Premier",
    joinDate: "2022-08-10",
    lastActive: "2024-01-19",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    website: "https://drchenwellness.com",
    socialMedia: {
      linkedin: "https://linkedin.com/in/michaelchenwellness",
      instagram: "https://instagram.com/drchenwellness"
    },
    services: [
      "Spinal Adjustments",
      "Soft Tissue Therapy",
      "Wellness Coaching",
      "Nutritional Counseling"
    ],
    certifications: [
      "Doctor of Chiropractic",
      "Certified Functional Medicine Practitioner",
      "Active Release Technique Certified"
    ],
    experience: "8 years",
    education: "Doctor of Chiropractic, Palmer College of Chiropractic",
    trialStatus: "N/A",
    activity: 800,
    churnRisk: false,
    first_name: "Michael",
    last_name: "Chen"
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@example.com", 
    phone: "(555) 456-7890",
    specialty: "Massage Therapy",
    location: "Miami, FL",
    bio: "Licensed massage therapist specializing in therapeutic and relaxation techniques.",
    profileScore: 78,
    membershipTier: "Preferred",
    tier: "Preferred",
    joinDate: "2023-06-20",
    lastActive: "2024-01-18",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1594824388853-e0c8b8b0b6e5?w=400&h=400&fit=crop&crop=face",
    website: "https://rodrigueztherapy.com",
    socialMedia: {
      facebook: "https://facebook.com/rodrigueztherapy",
      instagram: "https://instagram.com/rodrigueztherapy"
    },
    services: [
      "Deep Tissue Massage",
      "Swedish Massage", 
      "Trigger Point Therapy",
      "Prenatal Massage"
    ],
    certifications: [
      "Licensed Massage Therapist",
      "Certified Myofascial Release Therapist",
      "Prenatal Massage Certification"
    ],
    experience: "6 years",
    education: "Massage Therapy Diploma, Miami School of Massage",
    trialStatus: "Active",
    activity: 350,
    churnRisk: false,
    first_name: "Emily",
    last_name: "Rodriguez"
  }
];

// Mock data for admin dashboard
export const mockMetrics = {
  totalProviders: 1247,
  activeProviders: 1089,
  newThisMonth: 23,
  churnRisk: 15,
  tierCounts: {
    premier: 456,
    preferred: 633,
    basic: 158
  }
};

// Mock leads data for testing
export const mockLeads = [
  {
    id: 1,
    first_name: "John",
    last_name: "Smith", 
    email: "john.smith@example.com",
    created_at: "2024-01-20T10:30:00Z"
  },
  {
    id: 2,
    first_name: "Maria",
    last_name: "Garcia",
    email: "maria.garcia@example.com", 
    created_at: "2024-01-19T14:15:00Z"
  },
  {
    id: 3,
    first_name: "David",
    last_name: "Wilson",
    email: "david.wilson@example.com",
    created_at: "2024-01-18T09:45:00Z"
  }
];