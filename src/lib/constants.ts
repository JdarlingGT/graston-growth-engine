// Tier badge configuration - Using official Graston Technique badges
export const TIER_BADGES = {
  Free: null, // No badge for basic/free tier
  Preferred: {
    name: 'Preferred',
    image: '/PreferredBadge_01 (1).webp',
    alt: 'Graston Technique Preferred Provider Badge'
  },
  Premier: {
    name: 'Premier', 
    image: '/PremierBadge_01-04 (1).webp',
    alt: 'Graston Technique Premier Provider Badge'
  }
} as const;

// Accreditation configuration - mirroring WordPress helper function
export const ACCREDITATION_DEFAULTS = {
  fsbpt: {
    name: 'FSBPT',
    logo: 'https://grastontechnique.com/wp-content/uploads/fsbpt-logo.png',
    url: 'https://www.fsbpt.org/',
    alt: 'Federation of State Boards of Physical Therapy'
  },
  nata: {
    name: 'NATA',
    logo: 'https://grastontechnique.com/wp-content/uploads/Nata.png', 
    url: 'https://www.nata.org/',
    alt: 'National Athletic Trainers Association'
  },
  apta: {
    name: 'APTA',
    logo: 'https://grastontechnique.com/wp-content/uploads/apta-logo.png',
    url: 'https://www.apta.org/',
    alt: 'American Physical Therapy Association'
  },
  aota: {
    name: 'AOTA',
    logo: 'https://grastontechnique.com/wp-content/uploads/aota-logo.png',
    url: 'https://www.aota.org/',
    alt: 'American Occupational Therapy Association'
  },
  amta: {
    name: 'AMTA',
    logo: 'https://grastontechnique.com/wp-content/uploads/amta-logo.png',
    url: 'https://www.amtamassage.org/',
    alt: 'American Massage Therapy Association'
  },
  ica: {
    name: 'ICA',
    logo: 'https://grastontechnique.com/wp-content/uploads/ica-logo.png',
    url: 'https://www.chiropractic.org/',
    alt: 'International Chiropractors Association'
  },
  aca: {
    name: 'ACA',
    logo: 'https://grastontechnique.com/wp-content/uploads/aca-logo.png',
    url: 'https://www.acatoday.org/',
    alt: 'American Chiropractic Association'
  }
} as const;

// GT Brand colors
export const GT_COLORS = {
  primary: '#435769',
  accent: '#fff647', 
  secondary: '#7C9099'
} as const;

export type AccreditationType = keyof typeof ACCREDITATION_DEFAULTS;
