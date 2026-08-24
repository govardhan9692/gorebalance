import { LucideIcon } from 'lucide-react';

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  orientation?: 'portrait' | 'landscape' | 'square' | 'tall';
}

export const galleryItems: GalleryItem[] = [
  {
    id: "clinic",
    src: "https://images.unsplash.com/photo-1586773860418-d37222d8dfde?auto=format&fit=crop&q=80&w=1200",
    alt: "Consultation room at the GoRebalance clinic",
    caption: "Consultation Room",
    category: "Clinic",
  },
  {
    id: "consultation",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200",
    alt: "Nutritionist consulting with a client",
    caption: "One-on-One Consultation",
    category: "Consultation",
  },
  {
    id: "meal-plans",
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1200",
    alt: "A printed personalised nutrition plan on a desk",
    caption: "Personalised Meal Plans",
    category: "Plans",
  },
  {
    id: "indian-meals",
    src: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=1200",
    alt: "Fresh Indian home-cooked meal with vegetables and curd",
    caption: "Gut-Friendly Indian Meals",
    category: "Nutrition",
  },
  {
    id: "workshop",
    src: "https://images.unsplash.com/photo-1517048657685-9854495e5095?auto=format&fit=crop&q=80&w=1200",
    alt: "A group nutrition workshop session",
    caption: "Nutrition Workshop",
    category: "Community",
  },
  {
    id: "ingredients",
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200",
    alt: "Fresh vegetables, seeds and fermented foods laid out",
    caption: "Fresh, Whole Ingredients",
    category: "Nutrition",
  },
];

// PLACEHOLDER IMAGERY — replace with the client's real clinic and practice photographs before launch.
export const galleryFull: GalleryItem[] = [
  // Clinic (5)
  {
    id: "clinic-1",
    src: "https://images.unsplash.com/photo-1629909613654-28717ee448f3?auto=format&fit=crop&q=80&w=1200",
    alt: "Modern clinic reception with warm lighting",
    caption: "Reception area, Hyderabad clinic",
    category: "Clinic",
    orientation: "landscape"
  },
  {
    id: "clinic-2",
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    alt: "Comfortable consultation chair in a bright room",
    caption: "Consultation space",
    category: "Clinic",
    orientation: "portrait"
  },
  {
    id: "clinic-3",
    src: "https://images.unsplash.com/photo-1538108149393-fdfd81690835?auto=format&fit=crop&q=80&w=1200",
    alt: "Neat and professional clinic corridor",
    caption: "Main clinic hallway",
    category: "Clinic",
    orientation: "landscape"
  },
  {
    id: "clinic-4",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    alt: "Modern minimalist workspace for the nutritionist",
    caption: "Nutritionist's workspace",
    category: "Clinic",
    orientation: "square"
  },
  {
    id: "clinic-5",
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200",
    alt: "Waiting area with comfortable seating and greenery",
    caption: "Guest waiting area",
    category: "Clinic",
    orientation: "landscape"
  },

  // Consultations (4)
  {
    id: "cons-1",
    src: "https://images.unsplash.com/photo-1559839734-2b71f1e3c77d?auto=format&fit=crop&q=80&w=1200",
    alt: "Nutritionist explaining a plan to a client",
    caption: "In-depth clinical discussion",
    category: "Consultations",
    orientation: "landscape"
  },
  {
    id: "cons-2",
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
    alt: "Nutritionist taking notes during a consultation",
    caption: "Capture every symptom detail",
    category: "Consultations",
    orientation: "portrait"
  },
  {
    id: "cons-3",
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200",
    alt: "Client discussing reports with Dt. Sai Sowjanya",
    caption: "Understanding your reports",
    category: "Consultations",
    orientation: "landscape"
  },
  {
    id: "cons-4",
    src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200",
    alt: "Laptop set up for an online consultation",
    caption: "Online consultations across India",
    category: "Consultations",
    orientation: "landscape"
  },

  // Meal Plans (4)
  {
    id: "plan-1",
    src: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1200",
    alt: "Handwritten notes on a meal plan template",
    caption: "Building a fortnight's meal plan",
    category: "Meal Plans",
    orientation: "square"
  },
  {
    id: "plan-2",
    src: "https://images.unsplash.com/photo-1454165833767-02746a7c3b58?auto=format&fit=crop&q=80&w=1200",
    alt: "Digital nutrition plan on a tablet and phone",
    caption: "Your plan, always accessible",
    category: "Meal Plans",
    orientation: "landscape"
  },
  {
    id: "plan-3",
    src: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=1200",
    alt: "Calendar view of a structured nutrition cycle",
    caption: "Cycle-aware nutrition planning",
    category: "Meal Plans",
    orientation: "portrait"
  },
  {
    id: "plan-4",
    src: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1200",
    alt: "Journaling progress and symptoms",
    caption: "Tracking symptom shifts",
    category: "Meal Plans",
    orientation: "square"
  },

  // Nutrition (6)
  {
    id: "nut-1",
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200",
    alt: "Colorful salad bowl with diverse vegetables",
    caption: "Diverse fibers for gut health",
    category: "Nutrition",
    orientation: "tall"
  },
  {
    id: "nut-2",
    src: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=1200",
    alt: "Traditional Indian thali with balanced portions",
    caption: "Balanced Indian thali",
    category: "Nutrition",
    orientation: "landscape"
  },
  {
    id: "nut-3",
    src: "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80&w=1200",
    alt: "Selection of sprouted beans and lentils",
    caption: "Plant-based protein sources",
    category: "Nutrition",
    orientation: "square"
  },
  {
    id: "nut-4",
    src: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=1200",
    alt: "Fermented foods like curd and pickles",
    caption: "Fermented foods for gut repair",
    category: "Nutrition",
    orientation: "portrait"
  },
  {
    id: "nut-5",
    src: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1200",
    alt: "Fresh ginger, turmeric and whole spices",
    caption: "Anti-inflammatory ingredients",
    category: "Nutrition",
    orientation: "landscape"
  },
  {
    id: "nut-6",
    src: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=1200",
    alt: "Assorted nuts and seeds for healthy fats",
    caption: "Micronutrients and healthy fats",
    category: "Nutrition",
    orientation: "square"
  },

  // Community (3)
  {
    id: "comm-1",
    src: "https://images.unsplash.com/photo-1528605248644-14dd04cb11c7?auto=format&fit=crop&q=80&w=1200",
    alt: "People sharing a healthy meal at a workshop",
    caption: "Community kitchen session",
    category: "Community",
    orientation: "landscape"
  },
  {
    id: "comm-2",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
    alt: "Group discussion about gut health",
    caption: "Gut health support group",
    category: "Community",
    orientation: "landscape"
  },
  {
    id: "comm-3",
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200",
    alt: "Smiling clients after a wellness talk",
    caption: "Empowered through education",
    category: "Community",
    orientation: "portrait"
  },

  // Events (2)
  {
    id: "event-1",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1200",
    alt: "Dt. Sai Sowjanya giving a talk at a health event",
    caption: "Public awareness health talk",
    category: "Events",
    orientation: "landscape"
  },
  {
    id: "event-2",
    src: "https://images.unsplash.com/photo-1540575861501-7c911b2c2c43?auto=format&fit=crop&q=80&w=1200",
    alt: "Presentation slide on nutrition at a corporate event",
    caption: "Corporate wellness event",
    category: "Events",
    orientation: "landscape"
  }
];