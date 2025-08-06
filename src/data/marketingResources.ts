import { MarketingResource } from "@/types";

export const marketingResources: MarketingResource[] = [
  {
    id: 'res_001',
    title: 'Patient Intake Forms',
    description: 'Comprehensive intake forms for new patients',
    category: 'Forms',
    tier: 'Free',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    filePath: '/resources/intake-forms.pdf'
  },
  {
    id: 'res_002',
    title: 'Social Media Templates',
    description: 'Ready-to-use social media post templates',
    category: 'Marketing',
    tier: 'Preferred',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    filePath: '/resources/social-templates.zip'
  },
  {
    id: 'res_003',
    title: 'Video Marketing Guide',
    description: 'Complete guide to video marketing for healthcare providers',
    category: 'Marketing',
    tier: 'Premier',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop',
    filePath: '/resources/video-guide.pdf'
  }
];