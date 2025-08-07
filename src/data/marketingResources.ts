import { MarketingResource } from "@/types";

export const marketingResources: MarketingResource[] = [
  {
    id: 'res_001',
    title: 'Social Media Kit',
    description: 'Ready-to-use social media posts and images to promote your practice.',
    tier: 'Preferred',
    category: 'Social Media',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
    filePath: '/resources/social-media-kit.zip',
  },
  {
    id: 'res_002',
    title: 'Advanced SEO Guide',
    description: 'A comprehensive guide to improve your search engine ranking and attract more patients.',
    tier: 'Premier',
    category: 'SEO',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    filePath: '/resources/seo-guide.pdf',
  },
  {
    id: 'res_003',
    title: 'Patient Welcome Packet',
    description: 'A customizable welcome packet for new patients to your clinic.',
    tier: 'Free',
    category: 'Patient Resources',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=800&auto=format&fit=crop',
    filePath: '/resources/welcome-packet.docx',
  },
  {
    id: 'res_004',
    title: 'Email Marketing Templates',
    description: 'Professionally written email templates for patient newsletters and promotions.',
    tier: 'Preferred',
    category: 'Email Marketing',
    image: 'https://images.unsplash.com/photo-1586953208448-3073a0323149?q=80&w=800&auto=format&fit=crop',
    filePath: '/resources/email-templates.zip',
  },
];