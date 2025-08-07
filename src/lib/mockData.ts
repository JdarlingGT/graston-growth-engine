import { FullProviderProfile, Tier, TrainingLevel, Condition, PatientDemographic, SortOption, ClinicianType, RadiusOption, Language } from "@/types";

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
  { value: 'premier-first', label: 'Premier First' },
  { value: 'top-rated', label: 'Top Rated' },
  { value: 'most-reviewed', label: 'Most Reviewed' },
];

export const conditions: Condition[] = [
  "Back Pain", "Neck Pain", "Shoulder Injuries", "Knee Pain", "Headaches",
  "Plantar Fasciitis", "Carpal Tunnel Syndrome", "TMJ Dysfunction", "Sciatica",
  "Sports Injuries", "Post-Surgical Rehab", "Chronic Pain", "Tennis Elbow", "Golfers Elbow",
  "Shin Splints", "Rotator Cuff Tendinopathy", "Achilles Tendinopathy", "IT Band Syndrome"
];

export const patientDemographics: PatientDemographic[] = [
  "Adults", "Children", "Adolescents", "Geriatric", "Athletes", "Pregnant Women", "Post-Surgical", "Seniors", "Post-Surgical Patients"
];

export const mockProviders: FullProviderProfile[] = [
  {
    id: '1',
    name: 'Dr. Sarah Williams, PT, DPT, GTS',
    email: 'sarah.williams@example.com',
    specialty: 'Orthopedic & Sports Physical Therapy',
    clinicianType: 'Physical Therapist',
    profileImage: 'https://i.pravatar.cc/150?img=1',
    location: 'San Diego, CA',
    clinicAddress: '123 Wellness Ave, San Diego, CA 92101',
    coordinates: { lat: 32.7157, lng: -117.1611 },
    tier: 'Premier',
    rating: 4.9,
    reviewCount: 128,
    isFavorite: true,
    canCompare: true,
    phone: '(555) 123-4567',
    website: 'https://sportstherapy.com',
    bio: 'Dr. Sarah Williams is a Graston Technique Specialist (GTS) with over 10 years of experience in treating musculoskeletal injuries. She is passionate about helping athletes return to their sport stronger than before.',
    experience: '10+ years',
    education: 'DPT, University of Southern California',
    services: ['Manual Therapy', 'Sports Injury Rehab', 'Post-operative Care', 'Graston Technique'],
    certifications: ['Orthopedic Clinical Specialist (OCS)', 'Certified Strength and Conditioning Specialist (CSCS)'],
    gtCertifications: ['GTS', 'Advanced'],
    verificationBadges: ['GTS Certified', 'Background Checked'],
    accreditationLogos: [
      { name: 'APTA', logoUrl: '/logos/apta.png', url: 'https://www.apta.org/' },
      { name: 'NSCA', logoUrl: '/logos/nsca.png', url: 'https://www.nsca.com/' }
    ],
    languagesSpoken: ["English", "Spanish"],
    patientTypes: ["Athletes", "Adults", "Geriatric"],
    conditionsTreated: ["Knee Pain", "Shoulder Injuries", "Plantar Fasciitis", "Sports Injuries"],
    galleryImages: [
      '/gallery/clinic-1.jpg',
      '/gallery/treatment-1.jpg',
      '/gallery/team-1.jpg',
    ],
    galleryVideos: [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    ],
    testimonials: [
      { quote: "Sarah is the best PT I've ever worked with. She got me back on the field in record time!", author: 'John D., Pro Athlete' },
      { quote: "Her expertise with the Graston Technique was a game-changer for my chronic tendonitis.", author: 'Jane S.' }
    ],
    faqs: [
      { question: 'Do you accept insurance?', answer: 'Yes, we accept most major PPO insurance plans. Please call our office to verify your coverage.' },
      { question: 'What should I wear to my appointment?', answer: 'Please wear comfortable, loose-fitting clothing that allows access to the area we will be treating.' }
    ]
  },
  {
    id: '2',
    name: 'Dr. Michael Chen, DC',
    email: 'michael.chen@example.com',
    specialty: 'Chiropractic & Wellness',
    clinicianType: 'Chiropractor',
    profileImage: 'https://i.pravatar.cc/150?img=2',
    location: 'Austin, TX',
    clinicAddress: '456 Health St, Austin, TX 78701',
    coordinates: { lat: 30.2672, lng: -97.7431 },
    tier: 'Preferred',
    rating: 4.8,
    reviewCount: 92,
    isFavorite: false,
    canCompare: true,
    phone: '(555) 987-6543',
    website: 'https://chenwellness.com',
    facebook: "https://facebook.com/michaelchenchiro",
    linkedin: "https://linkedin.com/in/michaelchenchiro",
    bio: 'Dr. Michael Chen focuses on holistic wellness and corrective chiropractic care. He is certified in the Graston Technique to address soft tissue restrictions and improve patient outcomes.',
    experience: '8 years',
    education: 'DC, Southern California University of Health Sciences',
    services: ['Chiropractic Adjustments', 'Spinal Decompression', 'Graston Technique', 'Nutritional Counseling'],
    certifications: ['Certified Chiropractic Sports Physician (CCSP)'],
    gtCertifications: ['Advanced'],
    verificationBadges: ['GT Advanced Certified'],
    accreditationLogos: [],
    languagesSpoken: ["English"],
    patientTypes: ["Adults", "Seniors"],
    conditionsTreated: ["Back Pain", "Neck Pain", "Headaches", "Sciatica"],
    galleryImages: [],
    galleryVideos: [],
    testimonials: [
      { quote: "Dr. Chen's adjustments and Graston work have completely resolved my chronic back pain.", author: 'Emily R.' }
    ],
    faqs: [
      { question: 'What is a typical first visit like?', answer: 'Your first visit will include a comprehensive consultation, examination, and your first adjustment if deemed appropriate.' }
    ]
  },
  {
    id: '3',
    name: 'Jessica Rodriguez, LMT',
    email: 'jessica.rodriguez@example.com',
    specialty: 'Therapeutic & Sports Massage',
    clinicianType: 'Massage Therapist',
    profileImage: 'https://i.pravatar.cc/150?img=3',
    location: 'Miami, FL',
    clinicAddress: '789 Relaxation Rd, Miami, FL 33101',
    coordinates: { lat: 25.7617, lng: -80.1918 },
    tier: 'Free',
    rating: 4.7,
    reviewCount: 75,
    isFavorite: false,
    canCompare: false,
    phone: '(555) 234-5678',
    website: 'https://jessicamassage.com',
    bio: 'Jessica Rodriguez is a licensed massage therapist with an Essential certification in the Graston Technique. She specializes in deep tissue and sports massage to alleviate pain and improve mobility.',
    experience: '5 years',
    education: 'Licensed Massage Therapist, Florida School of Massage',
    services: ['Deep Tissue Massage', 'Sports Massage', 'Swedish Massage', 'Graston Technique'],
    certifications: [],
    gtCertifications: ['Essential'],
    verificationBadges: [],
    accreditationLogos: [],
    languagesSpoken: ["English", "Spanish"],
    patientTypes: ["Adults"],
    conditionsTreated: ["Neck Pain", "Shoulder Injuries", "Chronic Pain"],
    galleryImages: [],
    galleryVideos: [],
    testimonials: [],
    faqs: []
  },
  {
    id: '4',
    name: 'Dr. Emily White, PT, DPT',
    email: 'emily.white@example.com',
    specialty: 'Pediatric Physical Therapy',
    clinicianType: 'Physical Therapist',
    profileImage: 'https://i.pravatar.cc/150?img=4',
    location: 'Seattle, WA',
    clinicAddress: '101 Kids Care Ct, Seattle, WA 98101',
    coordinates: { lat: 47.6062, lng: -122.3321 },
    tier: 'Preferred',
    rating: 4.9,
    reviewCount: 60,
    isFavorite: true,
    canCompare: true,
    phone: '(555) 345-6789',
    website: 'https://seattlekidspt.com',
    bio: 'Dr. Emily White is a board-certified pediatric physical therapist. She uses a gentle approach, including modified Graston Technique, to help children with developmental and motor challenges.',
    experience: '12 years',
    education: 'DPT, University of Washington',
    services: ['Pediatric PT', 'Developmental Delay', 'Torticollis Treatment', 'Gait Training'],
    certifications: ['Board-Certified Clinical Specialist in Pediatric Physical Therapy (PCS)'],
    gtCertifications: ['Essential'],
    verificationBadges: ['GT Essential Certified'],
    accreditationLogos: [],
    languagesSpoken: ["English"],
    patientTypes: ["Children", "Adolescents"],
    conditionsTreated: ["Back Pain", "Neck Pain"],
    galleryImages: [],
    galleryVideos: [],
    testimonials: [],
    faqs: []
  },
  {
    id: '5',
    name: 'David Lee, ATC',
    email: 'david.lee@example.com',
    specialty: 'Athletic Training',
    clinicianType: 'Athletic Trainer',
    profileImage: 'https://i.pravatar.cc/150?img=5',
    location: 'Chicago, IL',
    clinicAddress: '210 Sports Med Plaza, Chicago, IL 60601',
    coordinates: { lat: 41.8781, lng: -87.6298 },
    tier: 'Premier',
    rating: 4.8,
    reviewCount: 110,
    isFavorite: false,
    canCompare: true,
    phone: '(555) 456-7890',
    website: 'https://leespotsmed.com',
    bio: 'David Lee is a certified athletic trainer for a professional sports team with Advanced Graston Technique certification. He excels in on-field injury management and accelerated return-to-play protocols.',
    experience: '15 years',
    education: 'MS in Athletic Training, University of Illinois',
    services: ['Injury Prevention', 'Emergency Care', 'Rehabilitation Programs', 'Graston Technique'],
    certifications: ['Certified Athletic Trainer (ATC)'],
    gtCertifications: ['Advanced'],
    verificationBadges: ['GT Advanced Certified'],
    accreditationLogos: [],
    languagesSpoken: ["English"],
    patientTypes: ["Adults", "Athletes", "Post-Surgical"],
    conditionsTreated: ["Knee Pain", "Back Pain", "Shoulder Injuries", "Post-Surgical Rehab"],
    galleryImages: [
      '/gallery/clinic-2.jpg',
    ],
    galleryVideos: [],
    testimonials: [
      { quote: "David's expertise is unmatched. He's a critical part of our team's success.", author: 'Coach Miller' }
    ],
    faqs: []
  }
];