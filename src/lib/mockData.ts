import { FullProviderProfile } from "@/types";

export const mockProviders: FullProviderProfile[] = [
  {
    id: "1",
    name: "Dr. Alice Smith",
    specialty: "Pediatrician",
    location: "New York, NY",
    bio: "Dr. Smith is a board-certified pediatrician with over 15 years of experience caring for children from infancy through adolescence. She is passionate about preventative care and building strong relationships with families.",
    profileImage: "https://via.placeholder.com/150/FF5733/FFFFFF?text=AS",
    tier: "Premier",
    contactInfo: {
      phone: "555-123-4567",
      email: "alice.smith@example.com",
      website: "https://www.alicesmithpediatrics.com",
    },
    servicesOffered: ["Well-child visits", "Vaccinations", "Sick visits", "Developmental screenings"],
    galleryImages: [
      "https://via.placeholder.com/400/FF5733/FFFFFF?text=Clinic+1",
      "https://via.placeholder.com/400/FF5733/FFFFFF?text=Clinic+2",
    ],
    testimonials: [
      { quote: "Dr. Smith is amazing with my kids!", author: "Parent A" },
      { quote: "Always thorough and caring.", author: "Parent B" },
    ],
    faqs: [
      { question: "Do you accept new patients?", answer: "Yes, we are currently accepting new patients." },
      { question: "What are your office hours?", answer: "Monday-Friday, 9 AM - 5 PM." },
    ],
  },
  {
    id: "2",
    name: "Dr. Bob Johnson",
    specialty: "Dentist",
    location: "Los Angeles, CA",
    bio: "Dr. Johnson provides comprehensive dental care, from routine cleanings to cosmetic procedures. He is committed to making every patient's visit comfortable and stress-free.",
    profileImage: "https://via.placeholder.com/150/3366FF/FFFFFF?text=BJ",
    tier: "Preferred",
    contactInfo: {
      phone: "555-987-6543",
      email: "bob.johnson@example.com",
      website: "https://www.bobjohnsondental.com",
    },
    servicesOffered: ["Cleanings", "Fillings", "Crowns", "Teeth whitening"],
    galleryImages: [
      "https://via.placeholder.com/400/3366FF/FFFFFF?text=Office+1",
      "https://via.placeholder.com/400/3366FF/FFFFFF?text=Office+2",
    ],
    testimonials: [
      { quote: "Best dentist I've ever had!", author: "Patient C" },
      { quote: "Painless and professional.", author: "Patient D" },
    ],
    faqs: [
      { question: "Do you offer emergency appointments?", answer: "Yes, please call our office for urgent care." },
      { question: "What insurance do you accept?", answer: "We accept most major dental insurance plans." },
    ],
  },
  {
    id: "3",
    name: "Dr. Carol White",
    specialty: "Dermatologist",
    location: "Chicago, IL",
    bio: "Dr. White specializes in medical and cosmetic dermatology, helping patients achieve healthy, radiant skin. She offers personalized treatment plans for various skin conditions.",
    profileImage: "https://via.placeholder.com/150/33FF57/FFFFFF?text=CW",
    tier: "Free",
    contactInfo: {
      phone: "555-555-1212",
      email: "carol.white@example.com",
      website: "https://www.carolwhitederm.com",
    },
    servicesOffered: ["Acne treatment", "Skin cancer screenings", "Botox", "Fillers"],
    galleryImages: [
      "https://via.placeholder.com/400/33FF57/FFFFFF?text=Clinic+Interior",
      "https://via.placeholder.com/400/33FF57/FFFFFF?text=Treatment+Room",
    ],
    testimonials: [
      { quote: "My skin has never looked better!", author: "Patient E" },
      { quote: "Very knowledgeable and kind.", author: "Patient F" },
    ],
    faqs: [
      { question: "Do you treat pediatric skin conditions?", answer: "Yes, we see patients of all ages." },
      { question: "What is your cancellation policy?", answer: "Please notify us 24 hours in advance for cancellations." },
    ],
  },
  {
    id: "4",
    name: "Dr. David Green",
    specialty: "Cardiologist",
    location: "Houston, TX",
    bio: "Dr. Green is a leading cardiologist dedicated to providing exceptional heart care. He focuses on preventive strategies and advanced treatments for cardiovascular diseases.",
    profileImage: "https://via.placeholder.com/150/FF33CC/FFFFFF?text=DG",
    tier: "Premier",
    contactInfo: {
      phone: "555-777-8888",
      email: "david.green@example.com",
      website: "https://www.davidgreencardio.com",
    },
    servicesOffered: ["Cardiac evaluations", "Stress tests", "Echocardiograms", "Hypertension management"],
    galleryImages: [
      "https://via.placeholder.com/400/FF33CC/FFFFFF?text=Heart+Center",
      "https://via.placeholder.com/400/FF33CC/FFFFFF?text=Consultation+Room",
    ],
    testimonials: [
      { quote: "Dr. Green saved my life!", author: "Patient G" },
      { quote: "Highly recommend for heart health.", author: "Patient H" },
    ],
    faqs: [
      { question: "Do you perform surgeries?", answer: "No, we focus on diagnostic and non-invasive treatments." },
      { question: "How often should I get a check-up?", answer: "It depends on your risk factors; consult with us." },
    ],
  },
  {
    id: "5",
    name: "Dr. Emily Brown",
    specialty: "Physical Therapist",
    location: "Miami, FL",
    bio: "Dr. Brown helps patients recover from injuries and improve mobility through personalized physical therapy programs. She emphasizes active recovery and patient education.",
    profileImage: "https://via.placeholder.com/150/33CCFF/FFFFFF?text=EB",
    tier: "Preferred",
    contactInfo: {
      phone: "555-222-3333",
      email: "emily.brown@example.com",
      website: "https://www.emilybrownpt.com",
    },
    servicesOffered: ["Rehabilitation", "Pain management", "Sports injury therapy", "Post-surgical recovery"],
    galleryImages: [
      "https://via.placeholder.com/400/33CCFF/FFFFFF?text=Therapy+Gym",
      "https://via.placeholder.com/400/33CCFF/FFFFFF?text=Exercise+Area",
    ],
    testimonials: [
      { quote: "I'm back on my feet thanks to Dr. Brown!", author: "Patient I" },
      { quote: "Very supportive and effective therapy.", author: "Patient J" },
    ],
    faqs: [
      { question: "Do I need a referral?", answer: "Some insurance plans require a referral; please check with your provider." },
      { question: "What should I wear to my appointment?", answer: "Comfortable clothing that allows for movement." },
    ],
  },
];