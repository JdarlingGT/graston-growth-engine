import { FullProviderProfile, ClinicianType, Language, Condition, PatientDemographic, SortOption, RadiusOption } from "@/types";

export const states: string[] = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

export const clinicianTypes: ClinicianType[] = [
  "Physical Therapist", "Chiropractor", "Occupational Therapist", "Athletic Trainer", "Massage Therapist", "Medical Doctor", "Other"
];

export const languages: Language[] = [
  "English", "Spanish", "French", "German", "Mandarin", "Cantonese", "Hindi", "Arabic", "Portuguese", "Russian", "Japanese", "Korean", "Italian", "Vietnamese"
];

export const radiusOptions: RadiusOption[] = [5, 10, 25, 50, 100];

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'premier-first', label: 'Recommended' },
  { value: 'top-rated', label: 'Top Rated' },
  { value: 'most-reviewed', label: 'Most Reviewed' },
  { value: 'distance', label: 'Distance' },
];

export const conditions: Condition[] = [
  "Back Pain", "Neck Pain", "Shoulder Injuries", "Knee Pain", "Headaches",
  "Plantar Fasciitis", "Carpal Tunnel Syndrome", "TMJ Dysfunction", "Sciatica",
  "Sports Injuries", "Post-Surgical Rehab", "Chronic Pain", "Tennis Elbow", "Golfers Elbow",
  "Shin Splints", "Rotator Cuff Tendinopathy", "Achilles Tendinopathy", "IT Band Syndrome"
];

export const patientDemographics: PatientDemographic[] = [
  "Adults", "Children", "Adolescents", "Geriatrics", "Athletes", "Pregnant Women", "Post-Surgical", "Seniors", "Post-Surgical Patients"
];

export const mockProviders: FullProviderProfile[] = [
  {
    id: "1",
    name: "Dr. Evelyn Reed",
    email: "evelyn.reed@example.com",
    specialty: "Sports Medicine & Rehabilitation",
    bio: "Dr. Evelyn Reed is a board-certified physical therapist with over 15 years of experience in sports medicine. She specializes in treating athletes of all levels, from weekend warriors to professional competitors. Her approach combines manual therapy, corrective exercise, and patient education to achieve long-lasting results. She is passionate about helping her patients return to the activities they love, stronger and more resilient than before.",
    experience: "15 years",
    education: "DPT, University of Southern California",
    profileImage: "https://i.pravatar.cc/150?img=1",
    phone: "555-0101",
    website: "evelynreedpt.com",
    linkedin: "linkedin.com/in/evelynreed",
    facebook: "facebook.com/evelynreedpt",
    instagram: "instagram.com/evelynreedpt",
    twitter: "twitter.com/evelynreedpt",
    services: ["Manual Therapy", "Sports Injury Rehab", "Post-operative Care", "Dry Needling", "Blood Flow Restriction"],
    certifications: ["OCS", "SCS", "FAAOMPT"],
    location: "San Diego, CA",
    clinicAddress: "123 Wellness Way, San Diego, CA 92101",
    coordinates: { lat: 32.7157, lng: -117.1611 },
    gtCertifications: ["Advanced", "Essential"],
    verificationBadges: ["Verified", "GT Certified"],
    accreditationLogos: [
      { name: "APTA", logoUrl: "/logos/apta.png", url: "https://www.apta.org/" },
      { name: "BOC", logoUrl: "/logos/boc.png", url: "https://www.bocatc.org/" }
    ],
    languagesSpoken: ["English", "Spanish"],
    patientTypes: ["Athletes", "Adults", "Geriatrics"],
    conditionsTreated: ["Knee Pain", "Shoulder Injuries", "Plantar Fasciitis", "Sports Injuries"],
    galleryImages: [
      "https://images.unsplash.com/photo-1517842645767-c6f90415ad90?q=80&w=800",
      "https://images.unsplash.com/photo-1583464639343-9b74e178a4c2?q=80&w=800",
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=800"
    ],
    galleryVideos: ["https://www.youtube.com/watch?v=ysz5S6PUM-U"],
    testimonials: [
      { quote: "Evelyn is a miracle worker! My shoulder feels better than it has in years.", author: "John D.", source: "Google", rating: 5 },
      { quote: "The best physical therapist in San Diego, hands down.", author: "Sarah L.", source: "Yelp", rating: 5 }
    ],
    faqs: [
      { question: "What should I expect on my first visit?", answer: "Your first visit will include a comprehensive evaluation to understand your condition, followed by an initial treatment and a plan for your recovery." },
      { question: "Do you accept insurance?", answer: "We are an out-of-network provider but can provide you with a superbill to submit to your insurance for reimbursement." }
    ],
    rating: 4.9,
    reviewCount: 88,
    isFavorite: true,
    tier: "Premier",
    clinicianType: "Physical Therapist",
    trialStatus: "N/A",
    activity: 120,
    churnRisk: false,
  },
  {
    id: "2",
    name: "Dr. Marcus Thorne",
    email: "marcus.thorne@example.com",
    specialty: "Chiropractic & Spine Care",
    bio: "Dr. Marcus Thorne focuses on spinal health and its impact on overall well-being. He uses a combination of adjustments, soft tissue work, and rehabilitative exercises to address the root cause of pain and dysfunction.",
    experience: "10 years",
    education: "DC, Palmer College of Chiropractic",
    profileImage: "https://i.pravatar.cc/150?img=2",
    phone: "555-0102",
    website: "thornespinecare.com",
    linkedin: "linkedin.com/in/marcusthorne",
    services: ["Spinal Adjustments", "Soft Tissue Therapy", "Corrective Exercise"],
    certifications: ["ART", "Graston Technique"],
    location: "Austin, TX",
    clinicAddress: "456 Health Ave, Austin, TX 78701",
    coordinates: { lat: 30.2672, lng: -97.7431 },
    gtCertifications: ["Essential"],
    verificationBadges: ["Verified", "GT Certified"],
    accreditationLogos: [],
    languagesSpoken: ["English"],
    patientTypes: ["Adults", "Seniors"],
    conditionsTreated: ["Back Pain", "Neck Pain", "Headaches", "Sciatica"],
    galleryImages: [],
    galleryVideos: [],
    testimonials: [
      { quote: "Dr. Thorne really listens and provides excellent, effective care.", author: "Emily R.", source: "ZocDoc", rating: 5 }
    ],
    faqs: [],
    rating: 4.8,
    reviewCount: 62,
    isFavorite: false,
    tier: "Preferred",
    clinicianType: "Chiropractor",
    trialStatus: "Expired",
    activity: 75,
    churnRisk: false,
  },
  {
    id: "3",
    name: "Dr. Lena Petrova",
    email: "lena.petrova@example.com",
    specialty: "Athletic Training",
    bio: "Lena Petrova is a certified athletic trainer specializing in the prevention and rehabilitation of sports injuries. She works closely with athletes to ensure they can perform at their peak.",
    experience: "8 years",
    education: "MS in Athletic Training, Ohio University",
    profileImage: "https://i.pravatar.cc/150?img=3",
    phone: "555-0103",
    website: "lenapetrovaat.com",
    services: ["Injury Prevention", "Rehabilitation", "Performance Enhancement"],
    certifications: ["ATC", "CSCS"],
    location: "Chicago, IL",
    clinicAddress: "789 Performance St, Chicago, IL 60601",
    coordinates: { lat: 41.8781, lng: -87.6298 },
    gtCertifications: ["GTS"],
    verificationBadges: ["GT Certified"],
    accreditationLogos: [],
    languagesSpoken: ["English", "Spanish"],
    patientTypes: ["Adults"],
    conditionsTreated: ["Neck Pain", "Shoulder Injuries", "Chronic Pain"],
    galleryImages: [],
    galleryVideos: [],
    testimonials: [],
    faqs: [],
    rating: 4.7,
    reviewCount: 45,
    isFavorite: false,
    tier: "Free",
    clinicianType: "Athletic Trainer",
    trialStatus: "N/A",
    activity: 30,
    churnRisk: true,
  },
  {
    id: "4",
    name: "Dr. Samuel Chen",
    email: "samuel.chen@example.com",
    specialty: "Pediatric Physical Therapy",
    bio: "Dr. Samuel Chen has a passion for working with children and helping them achieve their developmental milestones. He creates fun and engaging therapy sessions to make rehab enjoyable for his young patients.",
    experience: "12 years",
    education: "DPT, Columbia University",
    profileImage: "https://i.pravatar.cc/150?img=4",
    phone: "555-0104",
    website: "chenpediatricpt.com",
    services: ["Developmental Delay", "Torticollis", "Gait Abnormalities"],
    certifications: ["PCS"],
    location: "New York, NY",
    clinicAddress: "101 Kidzone Ave, New York, NY 10001",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    gtCertifications: ["Essential"],
    verificationBadges: ["Verified", "GT Certified"],
    accreditationLogos: [],
    languagesSpoken: ["English"],
    patientTypes: ["Children", "Adolescents"],
    conditionsTreated: ["Back Pain", "Neck Pain"],
    galleryImages: [],
    galleryVideos: [],
    testimonials: [
      { quote: "Dr. Chen was amazing with our son. We saw so much progress!", author: "The Lee Family", rating: 5 }
    ],
    faqs: [],
    rating: 5.0,
    reviewCount: 76,
    isFavorite: true,
    tier: "Preferred",
    clinicianType: "Physical Therapist",
    trialStatus: "Active",
    activity: 95,
    churnRisk: false,
  },
  {
    id: "5",
    name: "Dr. Anita Desai",
    email: "anita.desai@example.com",
    specialty: "Orthopedic Manual Therapy",
    bio: "Dr. Anita Desai is a Fellow of the American Academy of Orthopaedic Manual Physical Therapists, a distinction held by a small percentage of physical therapists. Her expertise lies in complex musculoskeletal conditions.",
    experience: "20 years",
    education: "DPT, Regis University",
    profileImage: "https://i.pravatar.cc/150?img=5",
    phone: "555-0105",
    website: "desaiomt.com",
    services: ["Spine Care", "Chronic Pain Management", "Manual Therapy"],
    certifications: ["FAAOMPT", "OCS"],
    location: "Denver, CO",
    clinicAddress: "212 Mountain View Rd, Denver, CO 80202",
    coordinates: { lat: 39.7392, lng: -104.9903 },
    gtCertifications: ["Advanced"],
    verificationBadges: ["Verified", "GT Certified"],
    accreditationLogos: [],
    languagesSpoken: ["English"],
    patientTypes: ["Adults", "Athletes", "Post-Surgical"],
    conditionsTreated: ["Knee Pain", "Back Pain", "Shoulder Injuries", "Post-Surgical Rehab"],
    galleryImages: [
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=800",
      "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?q=80&w=800"
    ],
    galleryVideos: [],
    testimonials: [
      { quote: "Anita's knowledge is incredible. She figured out my issue when no one else could.", author: "Mark T.", rating: 5 },
      { quote: "A true expert in her field. Highly recommend.", author: "Jessica P.", rating: 5 }
    ],
    faqs: [],
    rating: 5.0,
    reviewCount: 112,
    isFavorite: false,
    tier: "Premier",
    clinicianType: "Physical Therapist",
    trialStatus: "N/A",
    activity: 150,
    churnRisk: false,
  }
];