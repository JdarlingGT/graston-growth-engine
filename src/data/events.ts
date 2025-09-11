export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address?: string;
  registration_url: string;
  image?: string;
  category: 'workshop' | 'seminar' | 'conference' | 'certification' | 'webinar';
  provider?: string;
  price?: string;
  capacity?: number;
  registered?: number;
  featured?: boolean;
  tags: string[];
}

export const eventsData: Event[] = [
  {
    id: 'event-001',
    title: 'Advanced Graston Technique Workshop',
    description: 'Master advanced instrument-assisted soft tissue mobilization techniques. This intensive workshop covers advanced assessment protocols, treatment progressions, and evidence-based practice integration.',
    date: '2024-01-15',
    time: '9:00 AM - 5:00 PM',
    location: 'Austin Physical Therapy Institute',
    address: '1234 Medical Center Dr, Austin, TX 78701',
    registration_url: 'https://example.com/register/advanced-graston',
    category: 'workshop',
    provider: 'Dr. Sarah Mitchell',
    price: '$299',
    capacity: 25,
    registered: 18,
    featured: true,
    tags: ['Advanced', 'IASTM', 'Hands-on', 'CE Credits']
  },
  {
    id: 'event-002',
    title: 'Sports Injury Prevention Summit 2024',
    description: 'Join leading sports medicine professionals for a comprehensive summit on injury prevention strategies, latest research findings, and practical implementation techniques.',
    date: '2024-01-22',
    time: '8:00 AM - 6:00 PM',
    location: 'Denver Convention Center',
    address: '700 14th St, Denver, CO 80202',
    registration_url: 'https://example.com/register/sports-summit',
    category: 'conference',
    provider: 'Sports Medicine Alliance',
    price: '$450',
    capacity: 200,
    registered: 156,
    featured: true,
    tags: ['Sports Medicine', 'Prevention', 'Research', 'Networking']
  },
  {
    id: 'event-003',
    title: 'Graston Technique Certification Course',
    description: 'Become certified in the Graston Technique with this comprehensive 2-day course covering fundamentals, practical application, and patient safety protocols.',
    date: '2024-01-28',
    time: '8:30 AM - 5:30 PM',
    location: 'Phoenix Medical Training Center',
    address: '456 Healthcare Blvd, Phoenix, AZ 85001',
    registration_url: 'https://example.com/register/certification',
    category: 'certification',
    provider: 'Graston Technique Institute',
    price: '$795',
    capacity: 30,
    registered: 24,
    featured: true,
    tags: ['Certification', 'IASTM', 'Fundamentals', 'CE Credits']
  },
  {
    id: 'event-004',
    title: 'Telehealth Integration for Manual Therapists',
    description: 'Learn how to effectively integrate telehealth services into your manual therapy practice, including virtual assessment techniques and remote patient management.',
    date: '2024-02-05',
    time: '7:00 PM - 8:30 PM',
    location: 'Online Webinar',
    registration_url: 'https://example.com/register/telehealth-webinar',
    category: 'webinar',
    provider: 'Digital Health Solutions',
    price: 'Free',
    capacity: 500,
    registered: 342,
    featured: false,
    tags: ['Telehealth', 'Technology', 'Business', 'Free']
  },
  {
    id: 'event-005',
    title: 'Pediatric Manual Therapy Workshop',
    description: 'Specialized techniques for treating pediatric patients with manual therapy approaches. Covers age-appropriate assessment and treatment modifications.',
    date: '2024-02-12',
    time: '9:00 AM - 4:00 PM',
    location: 'Children\'s Healthcare Center',
    address: '789 Kids Care Ave, Seattle, WA 98101',
    registration_url: 'https://example.com/register/pediatric-workshop',
    category: 'workshop',
    provider: 'Dr. Michael Chen',
    price: '$275',
    capacity: 20,
    registered: 15,
    featured: false,
    tags: ['Pediatric', 'Specialized', 'Manual Therapy', 'CE Credits']
  },
  {
    id: 'event-006',
    title: 'Business of Physical Therapy Seminar',
    description: 'Essential business skills for physical therapy professionals including marketing, patient retention, insurance navigation, and practice growth strategies.',
    date: '2024-02-18',
    time: '1:00 PM - 5:00 PM',
    location: 'Business Development Center',
    address: '321 Commerce St, Chicago, IL 60601',
    registration_url: 'https://example.com/register/business-seminar',
    category: 'seminar',
    provider: 'PT Business Solutions',
    price: '$199',
    capacity: 50,
    registered: 28,
    featured: false,
    tags: ['Business', 'Marketing', 'Practice Management', 'Growth']
  },
  {
    id: 'event-007',
    title: 'Evidence-Based Practice in Manual Therapy',
    description: 'Deep dive into current research and evidence-based approaches in manual therapy. Learn to critically evaluate research and apply findings to clinical practice.',
    date: '2024-02-25',
    time: '10:00 AM - 3:00 PM',
    location: 'University Medical Center',
    address: '555 Research Dr, Boston, MA 02101',
    registration_url: 'https://example.com/register/evidence-based',
    category: 'seminar',
    provider: 'Dr. Lisa Rodriguez',
    price: '$225',
    capacity: 40,
    registered: 32,
    featured: false,
    tags: ['Research', 'Evidence-Based', 'Clinical Practice', 'CE Credits']
  },
  {
    id: 'event-008',
    title: 'Chronic Pain Management Workshop',
    description: 'Comprehensive approach to managing chronic pain conditions using manual therapy, patient education, and interdisciplinary collaboration strategies.',
    date: '2024-03-05',
    time: '9:00 AM - 6:00 PM',
    location: 'Pain Management Institute',
    address: '888 Wellness Way, Miami, FL 33101',
    registration_url: 'https://example.com/register/chronic-pain',
    category: 'workshop',
    provider: 'Chronic Pain Specialists',
    price: '$350',
    capacity: 35,
    registered: 22,
    featured: true,
    tags: ['Chronic Pain', 'Interdisciplinary', 'Patient Education', 'Advanced']
  },
  {
    id: 'event-009',
    title: 'Movement Assessment Masterclass',
    description: 'Advanced movement assessment techniques using modern screening tools and functional movement analysis. Hands-on practice with real case studies.',
    date: '2024-03-12',
    time: '8:00 AM - 4:00 PM',
    location: 'Movement Science Lab',
    address: '444 Kinetics Blvd, Los Angeles, CA 90001',
    registration_url: 'https://example.com/register/movement-assessment',
    category: 'workshop',
    provider: 'Movement Specialists Inc',
    price: '$395',
    capacity: 25,
    registered: 19,
    featured: true,
    tags: ['Movement Analysis', 'Assessment', 'Screening', 'Hands-on']
  },
  {
    id: 'event-010',
    title: 'Geriatric Manual Therapy Update',
    description: 'Latest techniques and considerations for treating elderly patients with manual therapy. Includes safety protocols and age-specific treatment modifications.',
    date: '2024-03-19',
    time: '1:00 PM - 6:00 PM',
    location: 'Senior Care Training Center',
    address: '777 Elder Ave, Portland, OR 97201',
    registration_url: 'https://example.com/register/geriatric-update',
    category: 'seminar',
    provider: 'Geriatric Specialists',
    price: '$175',
    capacity: 30,
    registered: 26,
    featured: false,
    tags: ['Geriatric', 'Safety', 'Age-Specific', 'CE Credits']
  }
];

export const eventCategories = [
  { value: 'all', label: 'All Events' },
  { value: 'workshop', label: 'Workshops' },
  { value: 'seminar', label: 'Seminars' },
  { value: 'conference', label: 'Conferences' },
  { value: 'certification', label: 'Certifications' },
  { value: 'webinar', label: 'Webinars' }
];