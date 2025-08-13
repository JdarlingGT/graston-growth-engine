export type ResourceCategory = 'Logos' | 'Social Media' | 'Print' | 'Templates';

export interface MarketingResource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  type: 'PNG' | 'SVG' | 'PDF' | 'DOCX';
  tags: string[];
  thumbnailUrl: string;
  fileUrl: string;
}

export const marketingResources: MarketingResource[] = [
  {
    id: 'res-1',
    title: 'Graston Technique Logo (Color)',
    description: 'The official full-color logo for digital and print use.',
    category: 'Logos',
    type: 'PNG',
    tags: ['logo', 'brand', 'color'],
    thumbnailUrl: 'https://grastontechnique.com/wp-content/uploads/2021/12/GT-Logo-for-Website-1.png',
    fileUrl: 'https://grastontechnique.com/wp-content/uploads/2021/12/GT-Logo-for-Website-1.png',
  },
  {
    id: 'res-2',
    title: 'Social Media Post Template (Facebook)',
    description: 'A customizable template for creating engaging Facebook posts.',
    category: 'Social Media',
    type: 'DOCX',
    tags: ['facebook', 'template', 'social'],
    thumbnailUrl: 'https://placehold.co/600x400/7c3aed/white?text=Facebook+Template',
    fileUrl: '#',
  },
  {
    id: 'res-3',
    title: 'Patient Intake Form',
    description: 'A printable PDF form for new patients.',
    category: 'Print',
    type: 'PDF',
    tags: ['form', 'patient', 'print'],
    thumbnailUrl: 'https://placehold.co/600x400/2563eb/white?text=Intake+Form',
    fileUrl: '#',
  },
  {
    id: 'res-4',
    title: 'Brand Style Guide',
    description: 'Guidelines for using the Graston Technique® brand assets correctly.',
    category: 'Logos',
    type: 'PDF',
    tags: ['brand', 'style guide', 'logo'],
    thumbnailUrl: 'https://placehold.co/600x400/a1a1aa/white?text=Style+Guide',
    fileUrl: '#',
  },
  {
    id: 'res-5',
    title: 'Instagram Story Template',
    description: 'Engage your audience with this ready-to-use Instagram story template.',
    category: 'Social Media',
    type: 'DOCX',
    tags: ['instagram', 'template', 'social', 'story'],
    thumbnailUrl: 'https://placehold.co/600x400/f59e0b/white?text=Instagram+Story',
    fileUrl: '#',
  },
];