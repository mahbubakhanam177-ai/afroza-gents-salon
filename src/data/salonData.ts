import { 
  TemplateConfig, 
  ServiceItem, 
  PricingTier, 
  GalleryItem, 
  OfferItem, 
  TestimonialItem 
} from '../types';

import heroImg from '../assets/images/hero_salon_owner_1787250129053.jpg';
import classicCutImg from '../assets/images/classic_haircut_1786246774961.jpg';
import beardImg from '../assets/images/beard_grooming_1786246785936.jpg';
import fadeImg from '../assets/images/hair_styling_fade_1786246797445.jpg';
import premiumTreatmentImg from '../assets/images/premium_treatment_1786246810054.jpg';
import facialImg from '../assets/images/facial_skincare_1786246821201.jpg';
import hotTowelImg from '../assets/images/hot_towel_shave_1786246833679.jpg';
import interiorImg from '../assets/images/barbershop_interior_1786246846022.jpg';
import happyClientImg from '../assets/images/happy_client_1786246857841.jpg';

export const IMAGES = {
  hero: heroImg,
  classicCut: classicCutImg,
  beard: beardImg,
  fade: fadeImg,
  premiumTreatment: premiumTreatmentImg,
  facial: facialImg,
  hotTowel: hotTowelImg,
  interior: interiorImg,
  happyClient: happyClientImg,
};

export const defaultConfig: TemplateConfig = {
  salonName: "Afroza Gents Salon",
  tagline: "Sharp Looks. Fresh Confidence.",
  address: "International City Phase 2, Warsan 4, Dubai, UAE",
  locationArea: "International City Phase 2 / Warsan 4, Dubai",
  phone: "+971 56 717 9467",
  whatsapp: "+971 56 717 9467",
  whatsappRaw: "971567179467",
  email: "info@afrozagentssalon.ae",
  instagram: "@afroza.gents.salon",
  googleMapsUrl: "https://maps.app.goo.gl/fVroDt5YXfmSTfnGA",
  currency: "AED",
  workingHoursMonSat: "10:00 AM – 12:00 AM",
  workingHoursSun: "10:00 AM – 12:00 AM",
  googleRating: "4.6",
  googleReviewCount: "83",
  priceNotice: "Price on request — Contact salon for current pricing",
};

export const pricingTiers: PricingTier[] = [
  {
    id: 'essential',
    title: 'HAIRCUT & BASIC',
    subtitle: 'Everyday Grooming',
    tagline: 'Clean, reliable haircuts and basic trims for your regular routine.',
    startingPrice: 0,
    description: 'Everyday haircuts, quick trims, and routine maintenance for residents, workers, and professionals in International City.',
    targetAudience: 'Residents, workers, professionals, and daily commuters in International City.',
    features: [
      'Men\'s Haircut (Classic / Fade)',
      'Quick Beard Trim & Outline',
      'Head Shave / Buzz Cut',
      'Kids Haircut',
      'Hygiene-Sanitized Tools',
      'Contact salon for current rates'
    ]
  },
  {
    id: 'classic',
    title: 'HAIRCUT + BEARD COMBO',
    subtitle: 'Complete Care',
    tagline: 'Complete haircut, beard grooming, styling & clean razor lines.',
    startingPrice: 0,
    highlight: true,
    popularBadge: 'Most Popular',
    description: 'Our most requested service combination for a complete, sharp transformation.',
    targetAudience: 'Everyday professionals, local residents, and visitors.',
    features: [
      'Full Men\'s Haircut & Styling',
      'Beard Trim & Razor Sculpting',
      'Hot Towel Shave Refresh',
      'Neck & Hairline Razor Clean',
      'Styling Product Touch-up',
      'Price on Request / Contact Salon'
    ]
  },
  {
    id: 'premium',
    title: 'FULL GROOMING PACKAGE',
    subtitle: 'Full Service',
    tagline: 'Haircut, beard sculpting, hot towel shave & facial refresh.',
    startingPrice: 0,
    description: 'A complete top-to-bottom grooming refresh before events, weekend gatherings, or business meetings.',
    targetAudience: 'Men preparing for weekend events, celebrations, or full relaxation.',
    features: [
      'Precision Men\'s Haircut',
      'Beard Sculpting & Razor Line',
      'Traditional Hot Towel Shave',
      'Hair Wash & Scalp Cleanse',
      'Express Skin / Facial Refresh',
      'Contact for Current Pricing'
    ]
  }
];

export const allServices: ServiceItem[] = [
  // PRIMARY SERVICES
  {
    id: 'cut-mens',
    name: 'Men\'s Haircut',
    category: 'haircuts',
    tier: 'essential',
    description: 'Clean, professional scissors or clipper haircut tailored to your head shape and style preference in International City.',
    startingPrice: 0,
    duration: '25 min',
    image: classicCutImg,
    popular: true,
    benefits: ['Precision scissor & clipper cutting', 'Clean neck shave & outline', 'Sharp, presentable finish'],
    whatToExpect: 'Consultation with barber, haircut according to your requested length, clean neck line, and light dusting.',
    preparation: 'Arrive with dry hair if possible.',
    aftercare: 'Easy daily comb through.'
  },
  {
    id: 'beard-trim',
    name: 'Beard Trim & Edging',
    category: 'beard',
    tier: 'essential',
    description: 'Clipper beard trimming, length balancing, cheek line clean-up, and mustache shaping.',
    startingPrice: 0,
    duration: '15 min',
    image: beardImg,
    popular: true,
    benefits: ['Tidy, well-defined beard', 'Quick 15-minute grooming', 'Mustache & cheek line shaping'],
    whatToExpect: 'Length trim with clippers, razor cheek lineup, and comb finish.',
    preparation: 'Clean, dry beard.',
    aftercare: 'Daily comb and light beard oil.'
  },
  {
    id: 'head-shave',
    name: 'Head Shave / Buzz Cut',
    category: 'haircuts',
    tier: 'essential',
    description: 'Uniform clipper cut or clean razor head shave with soothing post-shave balm.',
    startingPrice: 0,
    duration: '20 min',
    image: fadeImg,
    benefits: ['Ultra-neat and low maintenance', 'Smooth razor or clipper finish', 'Cooling scalp balm'],
    whatToExpect: 'Full head clipper trim or smooth razor shave followed by a warm towel wipe.',
    preparation: 'None needed.',
    aftercare: 'Apply scalp moisturizer.'
  },
  {
    id: 'shave-hottowel',
    name: 'Hot Towel Shave',
    category: 'shaving',
    tier: 'classic',
    description: 'Traditional lather, steaming hot towel press, smooth straight razor shave, and refreshing aftershave splash.',
    startingPrice: 0,
    duration: '25 min',
    image: hotTowelImg,
    popular: true,
    benefits: ['Steam softens facial hair', 'Ultra-close smooth shave', 'Soothing hot towel relaxation'],
    whatToExpect: 'Warm towel wrap, rich shaving cream, single-use blade razor shave, and cooling post-shave lotion.',
    preparation: 'Relax and enjoy.',
    aftercare: 'Apply gentle aftershave balm.'
  },

  // ADDITIONAL SERVICES (Marked clearly)
  {
    id: 'combo-hair-beard',
    name: 'Haircut & Beard Trim Combo',
    category: 'haircuts',
    tier: 'classic',
    description: 'Our complete everyday value combination: Men\'s Haircut + Beard Grooming in one visit. (Please confirm availability with salon).',
    startingPrice: 0,
    duration: '35 min',
    image: happyClientImg,
    popular: true,
    benefits: ['Complete fresh look', 'Seamless chair visit', 'Haircut + Beard in one session'],
    whatToExpect: 'Full haircut and beard trim tailored to your style.',
    preparation: 'Arrive on time.',
    aftercare: 'Daily comb.'
  },
  {
    id: 'style-wash',
    name: 'Hair Wash & Styling',
    category: 'styling',
    tier: 'essential',
    description: 'Refreshing shampoo wash, blow dry, and neat product styling. (Additional service — please confirm availability with salon).',
    startingPrice: 0,
    duration: '15 min',
    image: fadeImg,
    benefits: ['Removes cut hair & dust', 'Neat styling finish', 'Quick refresh'],
    whatToExpect: 'Shampoo wash, blow dry, and styling application.',
    preparation: 'None.',
    aftercare: 'Style as desired.'
  },
  {
    id: 'skin-express',
    name: 'Express Facial / Skin Refresh',
    category: 'skincare',
    tier: 'classic',
    description: 'Quick skin cleanse, facial scrub, and moisturizer. (Additional service — please confirm availability with salon).',
    startingPrice: 0,
    duration: '20 min',
    image: facialImg,
    benefits: ['Clears dust & oil', 'Instant clean feel', 'Refreshing add-on'],
    whatToExpect: 'Facial wash, scrub exfoliation, and hydration.',
    preparation: 'Clean skin.',
    aftercare: 'Stay hydrated.'
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Afroza Gents Salon Interior',
    category: 'interior',
    image: heroImg,
    description: 'Clean, modern barber stations and welcoming atmosphere at Afroza Gents Salon in International City Phase 2.'
  },
  {
    id: 'g2',
    title: 'Classic Haircut Precision',
    category: 'haircuts',
    image: classicCutImg,
    description: 'Precision scissor and clipper haircut tailored for a clean, professional finish.'
  },
  {
    id: 'g3',
    title: 'Beard Trimming & Razor Line',
    category: 'beard',
    image: beardImg,
    description: 'Sharp razor cheek lines and sculpted beard trimming for everyday grooming.'
  },
  {
    id: 'g4',
    title: 'Precision Skin Fade',
    category: 'haircuts',
    image: fadeImg,
    description: 'Seamless skin fade with textured top styling for residents and workers across Dubai.'
  },
  {
    id: 'g5',
    title: 'Steaming Hot Towel Shave',
    category: 'shaving' as any,
    image: hotTowelImg,
    description: 'Traditional hot towel steam press followed by smooth straight razor shave.'
  },
  {
    id: 'g6',
    title: 'Clean Barber Stations & Hygiene',
    category: 'interior',
    image: interiorImg,
    description: 'Sanitized tools, fresh towels, and hygienic equipment at every workstation.'
  },
  {
    id: 'g7',
    title: 'Satisfied Afroza Client',
    category: 'haircuts',
    image: happyClientImg,
    description: 'Sharp haircut and styled beard giving fresh confidence for work and lifestyle.'
  }
];

export const demoOffers: OfferItem[] = [
  {
    id: 'off-1',
    title: 'HAIRCUT & BEARD COMBO',
    badge: 'Popular Everyday Combo',
    includedServices: ['Men\'s Haircut', 'Beard Trim & Edging', 'Clean Razor Finish'],
    price: 0,
    validity: 'Available Daily (10:00 AM – 12:00 AM)',
    description: 'Our standard haircut and beard grooming combination for a neat, fresh look.',
    isDemo: true
  },
  {
    id: 'off-2',
    title: 'COMPLETE GROOMING REFRESH',
    badge: 'Full Service',
    includedServices: ['Men\'s Haircut', 'Beard Trim & Line', 'Hot Towel Shave', 'Hair Wash & Style'],
    price: 0,
    validity: 'Available Daily',
    description: 'Complete grooming treatment for weekend gatherings, events, or work meetings.',
    isDemo: true
  }
];

export const demoTestimonials: TestimonialItem[] = [
  {
    id: 't1',
    clientName: 'Tariq A.',
    clientType: 'Demo Client — Business Bay Resident',
    rating: 5,
    comment: 'Exceptional service. AED 35 for haircut and beard trim was incredible value for the precision and hot towel finish they provided.',
    service: 'Haircut + Beard Combo',
    isDemo: true
  },
  {
    id: 't2',
    clientName: 'Marcus V.',
    clientType: 'Demo Client — Tourist / Business Traveler',
    rating: 5,
    comment: 'Needed a sharp haircut before a conference at DWTC. The Executive Grooming Package was top tier. High-end salon experience at very reasonable rates.',
    service: 'Executive Grooming Package',
    isDemo: true
  },
  {
    id: 't3',
    clientName: 'Rajesh K.',
    clientType: 'Demo Client — Service Professional in Dubai',
    rating: 5,
    comment: 'Very polite barbers and extremely clean equipment. I get my AED 25 haircut every two weeks here. Best barbershop in the area.',
    service: 'Classic Haircut',
    isDemo: true
  },
  {
    id: 't4',
    clientName: 'Sami M.',
    clientType: 'Demo Client — UAE Resident & Entrepreneur',
    rating: 5,
    comment: 'The hot towel shave and beard line sculpting are razor precise. Welcoming atmosphere for all nationalities.',
    service: 'Hot Towel Shave & Beard Sculpting',
    isDemo: true
  }
];
