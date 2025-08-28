import { BookOpen, Edit, Mail, Share2, Star } from "lucide-react";

export const aiCoachTips = [
    {
        icon: Edit,
        text: "A complete profile is 7x more likely to be viewed. Have you updated your bio and services recently?"
    },
    {
        icon: Star,
        text: "Providers with 5+ reviews get 50% more inquiries. Use the Reputation Manager to request feedback from recent patients."
    },
    {
        icon: Share2,
        text: "Share your latest blog post on social media. Use the Content AI to generate a compelling caption."
    },
    {
        icon: Mail,
        text: "Consider running a 'New Patient Special' campaign for the upcoming season. Find templates in the Campaign-in-a-Box."
    },
    {
        icon: BookOpen,
        text: "Patient education builds trust. Share the 'Benefits of Graston Technique' PDF with your email list."
    }
];

export const brandAssets = {
    logos: [
        { id: 'logo-1', title: 'Graston Technique Logo (Color)', type: 'PNG', url: '/resources/brand-assets/logo-color.png', image: '/images/asset-placeholders/logo-color.png' },
        { id: 'logo-2', title: 'Graston Technique Logo (White)', type: 'PNG', url: '/resources/brand-assets/logo-white.png', image: '/images/asset-placeholders/logo-white.png' },
    ],
    badges: [
        { id: 'badge-1', title: 'Premier Provider Badge', type: 'PNG', url: '/images/PremierBadge_01-04.png', image: '/images/PremierBadge_01-04.png' },
        { id: 'badge-2', title: 'Preferred Provider Badge', type: 'PNG', url: '/images/PreferredBadge_01.webp', image: '/images/PreferredBadge_01.webp' },
    ],
    templates: [
        { id: 'template-1', title: 'Patient Intake Form', type: 'PDF', url: '#', image: '/images/asset-placeholders/template-placeholder.png' },
        { id: 'template-2', title: 'Clinic Brochure (Tri-fold)', type: 'AI', url: '#', image: '/images/asset-placeholders/template-placeholder.png' },
    ],
    stockPhotos: [
        { id: 'photo-1', title: 'Clinic Interior', type: 'JPG', url: '/images/AdobeStock_1106097284-Medium.jpeg', image: '/images/AdobeStock_1106097284-Medium.jpeg' },
        { id: 'photo-2', title: 'Practitioner with Patient', type: 'JPG', url: '/images/AdobeStock_622858237.jpeg', image: '/images/AdobeStock_622858237.jpeg' },
    ],
    emailSignatures: [
        { id: 'sig-1', title: 'Standard Email Signature', type: 'HTML', url: '#', image: '/images/asset-placeholders/template-placeholder.png' },
    ],
    videos: [
        { id: 'video-1', title: 'Video Intro Template (15s)', type: 'MP4', url: '#', image: '/images/asset-placeholders/video-placeholder.png' },
        { id: 'video-2', title: 'Patient Testimonial B-Roll', type: 'MP4', url: '#', image: '/images/asset-placeholders/video-placeholder.png' },
    ]
};

export const campaigns = [
    {
        id: 'campaign-1',
        title: 'Back Pain Relief Campaign',
        description: 'Target patients with chronic back pain using educational content and a special offer.',
        image: '/images/campaign-placeholders/back-pain-campaign.jpg',
        assets: [
            { title: 'Social Media Post Templates', type: 'DOCX', url: '#' },
            { title: 'Email Newsletter Copy', type: 'DOCX', url: '#' },
            { title: 'Printable In-Clinic Flyer', type: 'PDF', url: '#' },
        ]
    },
    {
        id: 'campaign-2',
        title: 'Runner\'s Knee Recovery Campaign',
        description: 'Attract local runners by showcasing your expertise in treating common running injuries.',
        image: '/images/campaign-placeholders/runners-knee-campaign.jpg',
        assets: [
            { title: 'Facebook Ad Creatives', type: 'ZIP', url: '#' },
            { title: 'Educational Blog Post', type: 'DOCX', url: '#' },
            { title: 'Video Script for Testimonials', type: 'DOCX', url: '#' },
        ]
    },
    {
        id: 'campaign-3',
        title: 'Referral Marketing Kit',
        description: 'Build strong referral partnerships with local physicians and gyms.',
        image: '/images/campaign-placeholders/referral-campaign.jpg',
        assets: [
            { title: 'Introductory Letter Template', type: 'DOCX', url: '#' },
            { title: 'Referral Pad (Printable)', type: 'PDF', url: '#' },
            { title: 'Co-branded Social Media Post', type: 'PPTX', url: '#' },
        ]
    }
];

export const reputationTools = {
    reviewSites: [
        { value: 'google', label: 'Google' },
        { value: 'facebook', label: 'Facebook' },
        { value: 'yelp', label: 'Yelp' },
        { value: 'healthgrades', label: 'Healthgrades' },
    ],
    communicationMethods: [
        { value: 'email', label: 'Email' },
        { value: 'sms', label: 'SMS Text Message' },
    ],
    downloadableResources: [
        { id: 'rep-dl-1', title: 'Review Request Best Practices', type: 'PDF', url: '#' },
        { id: 'rep-dl-2', title: 'Responding to Negative Reviews', type: 'PDF', url: '#' },
    ]
};

export const patientEducation = [
    { id: 'pe-1', title: 'Understanding Plantar Fasciitis', url: '#', image: '/images/patient-ed-placeholders/patient-ed-1.jpg' },
    { id: 'pe-2', title: '5 Stretches for Lower Back Pain', url: '#', image: '/images/patient-ed-placeholders/patient-ed-2.jpg' },
    { id: 'pe-3', title: 'What to Expect from Your GT Session', url: '#', image: '/images/patient-ed-placeholders/patient-ed-3.jpg' },
    { id: 'pe-4', title: 'Guide to Tennis Elbow', url: '#', image: '/images/patient-ed-placeholders/patient-ed-4.jpg' },
    { id: 'pe-5', title: 'Managing Sciatica Pain', url: '#', image: '/images/patient-ed-placeholders/patient-ed-5.jpg' },
];

export const emailTemplates = [
    { id: 'email-1', title: 'New Patient Welcome Email', description: 'A warm welcome to new patients, outlining what to expect.', type: 'DOCX', url: '#', image: '/images/asset-placeholders/email-template-placeholder.png' },
    { id: 'email-2', title: 'Referral Partner Outreach', description: 'Template for reaching out to other local businesses for referrals.', type: 'DOCX', url: '#', image: '/images/asset-placeholders/email-template-placeholder.png' },
    { id: 'email-3', title: 'Post-Treatment Follow-Up', description: 'Check in with patients after their treatment and ask for feedback.', type: 'DOCX', url: '#', image: '/images/asset-placeholders/email-template-placeholder.png' },
];

export const contentGeneratorOptions = {
    types: [
        { value: 'social-media-post', label: 'Social Media Post' },
        { value: 'blog-post-idea', label: 'Blog Post Idea' },
        { value: 'email-newsletter-snippet', label: 'Email Newsletter Snippet' },
        { value: 'video-script-outline', label: 'Video Script Outline' },
    ],
    themes: [
        { value: 'patient-education', label: 'Patient Education' },
        { value: 'success-story', label: 'Success Story' },
        { value: 'service-highlight', label: 'Service Highlight' },
        { value: 'myth-busting', label: 'Myth Busting' },
    ],
    tones: [
        { value: 'professional', label: 'Professional' },
        { value: 'friendly', label: 'Friendly & Approachable' },
        { value: 'clinical', label: 'Clinical & Authoritative' },
        { value: 'inspirational', label: 'Inspirational' },
    ]
};