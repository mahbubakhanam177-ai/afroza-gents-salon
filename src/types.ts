export interface TemplateConfig {
  salonName: string;
  tagline: string;
  address: string;
  locationArea: string;
  phone: string;
  whatsapp: string;
  whatsappRaw: string;
  email: string;
  instagram: string;
  googleMapsUrl: string;
  currency: string;
  workingHoursMonSat: string;
  workingHoursSun: string;
  googleRating: number | string;
  googleReviewCount: number | string;
  priceNotice: string;
}

export type ServiceCategory = 'haircuts' | 'beard' | 'shaving' | 'styling' | 'skincare' | 'treatments';
export type ServiceTier = 'essential' | 'classic' | 'premium';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  tier: ServiceTier;
  description: string;
  startingPrice: number;
  duration: string;
  image: string;
  benefits: string[];
  whatToExpect: string;
  preparation: string;
  aftercare: string;
  popular?: boolean;
  isActive?: boolean;
}

export interface PricingTier {
  id: ServiceTier;
  title: string;
  subtitle: string;
  tagline: string;
  startingPrice: number;
  highlight?: boolean;
  popularBadge?: string;
  description: string;
  features: string[];
  targetAudience: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientType?: string;
  rating: number;
  comment: string;
  service: string;
  isDemo?: boolean;
  isApproved?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'haircuts' | 'beard' | 'skincare' | 'interior';
  image: string;
  description: string;
  isActive?: boolean;
}

export interface OfferItem {
  id: string;
  title: string;
  badge: string;
  includedServices: string[];
  price: number;
  originalPrice?: number;
  validity: string;
  description: string;
  isDemo: boolean;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface AppointmentRecord {
  id: string;
  salonId?: string;
  customerName: string;
  phone: string;
  email?: string;
  serviceId?: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  category?: string;
  numberOfGuests?: number;
  specialRequest?: string;
  preferredBarber?: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export type AdminRoute = 
  | '/admin'
  | '/admin/login'
  | '/admin/appointments'
  | '/admin/services'
  | '/admin/offers'
  | '/admin/gallery'
  | '/admin/reviews'
  | '/admin/settings';

export interface AppointmentForm {
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  category: ServiceCategory | 'all';
  serviceId: string;
  numberOfGuests: number;
  specialRequest: string;
  preferredBarber: string;
}

export type NavigationPage = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'pricing' 
  | 'gallery' 
  | 'offers' 
  | 'contact' 
  | 'book'
  | 'privacy'
  | 'terms'
  | 'refunds'
  | 'cookies'
  | 'disclaimer';
