export const mockProviderData = [
  {
    id: 101,
    provider_name: "Dr. Eleanor Vance",
    membership_tier: "Premier",
    practitioner_type: { name: "Physical Therapist" },
    location: { clinic_street: "123 Wellness Way", clinic_city: "Healingsburg", clinic_state: "California", clinic_zip: "90210" },
    contact: { clinic_phone: "555-123-4567", provider_email: "e.vance@wellnessway.com" },
    profile_photo: { url: "https://placehold.co/150x150/6366f1/ffffff?text=EV" },
    bio_experience: { 
        provider_bio: "Dr. Eleanor Vance is a board-certified Physical Therapist with over 15 years of experience specializing in sports rehabilitation and chronic pain management. She believes in a holistic approach to recovery, integrating manual therapy with personalized exercise programs.",
        graston_level: "Specialist" 
    },
    specialties: { conditions_treated: ["Back Pain", "Sports Injuries", "Post-Surgical Rehab"] },
    media_content: {
        video_intro: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        clinic_gallery: [
            { url: "https://placehold.co/600x400/a5b4fc/ffffff?text=Lobby" },
            { url: "https://placehold.co/600x400/818cf8/ffffff?text=Treatment+Room" },
            { url: "https://placehold.co/600x400/4f46e5/ffffff?text=Gym" }
        ]
    },
    reviews_and_faqs: {
        testimonials: [{ rating: 5, text: "Truly life-changing care! Dr. Vance is attentive and incredibly knowledgeable." }]
    }
  },
  {
    id: 102,
    provider_name: "Dr. Ben Carter",
    membership_tier: "Preferred",
    practitioner_type: { name: "Chiropractor" },
    location: { clinic_street: "456 Spine Align Ave", clinic_city: "Springfield", clinic_state: "Illinois", clinic_zip: "62704" },
    contact: { clinic_phone: "555-987-6543", provider_email: "b.carter@alignchiro.com" },
    profile_photo: { url: "https://placehold.co/150x150/f59e0b/ffffff?text=BC" },
    bio_experience: { 
        provider_bio: "Focused on spinal adjustments and holistic wellness for the whole family. Dr. Carter helps patients achieve optimal health through natural, non-invasive care.",
        graston_level: "M2"
    },
    specialties: { conditions_treated: ["Headaches & Migraines", "Sciatica", "Neck Pain"] },
    media_content: {},
    reviews_and_faqs: {
        testimonials: [{ rating: 5, text: "My back pain is gone after just a few sessions. Highly recommend!" }]
    }
  },
  {
    id: 103,
    provider_name: "Dr. Olivia Chen",
    membership_tier: "Free",
    practitioner_type: { name: "Acupuncturist" },
    location: { clinic_street: "789 Meridian Point", clinic_city: "Healingsburg", clinic_state: "California", clinic_zip: "90210" },
    contact: { clinic_phone: "555-555-1212", provider_email: "o.chen@pointperfect.com" },
    profile_photo: { url: "https://placehold.co/150x150/10b981/ffffff?text=OC" },
    bio_experience: { 
        provider_bio: "Expert in traditional Chinese medicine and pain relief. Dr. Chen provides a calm and healing environment for all her patients.",
        graston_level: "M1"
    },
    specialties: {},
    media_content: {},
    reviews_and_faqs: {}
  },
  {
    id: 104,
    provider_name: "Dr. Marcus Thorne",
    membership_tier: "Premier",
    practitioner_type: { name: "Chiropractor" },
    location: { clinic_street: "101 Victory Lane", clinic_city: "Boulder", clinic_state: "Colorado", clinic_zip: "80302" },
    contact: { clinic_phone: "555-222-3333", provider_email: "m.thorne@victorychiro.co" },
    profile_photo: { url: "https://placehold.co/150x150/ef4444/ffffff?text=MT" },
    bio_experience: { 
        provider_bio: "Specializing in performance chiropractic for elite athletes and weekend warriors. Dr. Thorne's goal is to optimize function and prevent injury.",
        graston_level: "Specialist"
    },
    specialties: { conditions_treated: ["Athletic Injuries", "Joint Pain", "Mobility Issues"] },
    media_content: {
        video_intro: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        clinic_gallery: [
            { url: "https://placehold.co/600x400/f87171/ffffff?text=Facility" },
            { url: "https://placehold.co/600x400/dc2626/ffffff?text=Adjustment+Area" }
        ]
    },
    reviews_and_faqs: {
        testimonials: [
            { rating: 5, text: "The best chiropractor for athletes in Colorado." },
            { rating: 5, text: "I wouldn't be competing without Dr. Thorne's help." }
        ]
    }
  },
  {
    id: 105,
    provider_name: "Dr. Sofia Rossi",
    membership_tier: "Preferred",
    practitioner_type: { name: "Physical Therapist" },
    location: { clinic_street: "234 Recovery Rd", clinic_city: "Miami", clinic_state: "Florida", clinic_zip: "33101" },
    contact: { clinic_phone: "555-789-0123", provider_email: "s.rossi@miamirehab.com" },
    profile_photo: { url: "https://placehold.co/150x150/3b82f6/ffffff?text=SR" },
    bio_experience: { 
        provider_bio: "A dedicated physical therapist with a focus on post-operative rehabilitation and aquatic therapy.",
        graston_level: "M2"
    },
    specialties: { conditions_treated: ["Knee Replacement Rehab", "Shoulder Surgery Recovery", "Aquatic Therapy"] },
    media_content: {},
    reviews_and_faqs: {
        testimonials: [{ rating: 5, text: "Sofia was instrumental in my recovery. Her expertise is unmatched." }]
    }
  }
];

export const states = ["California", "Illinois", "Colorado", "Florida"];
export const clinicianTypes = ["Physical Therapist", "Chiropractor", "Acupuncturist"];
export const languages = ["English", "Spanish"];
export const radiusOptions = [5, 10, 25, 50];
export const sortOptions = [
  { value: "premier-first", label: "Premier First" },
  { value: "top-rated", label: "Top Rated" },
  { value: "most-reviewed", label: "Most Reviewed" },
];
export const conditions = ["Back Pain", "Sports Injuries", "Post-Surgical Rehab", "Headaches & Migraines", "Sciatica", "Neck Pain", "Athletic Injuries", "Joint Pain", "Mobility Issues", "Knee Replacement Rehab", "Shoulder Surgery Recovery", "Aquatic Therapy"];
export const patientDemographics = ["Athletes", "Seniors", "Pediatric", "General"];
export const specialties = ["Sports Rehabilitation", "Chronic Pain Management", "Spinal Adjustments", "Traditional Chinese Medicine", "Performance Chiropractic", "Post-Operative Rehabilitation", "Aquatic Therapy"];