import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  TemplateConfig, 
  ServiceItem, 
  OfferItem, 
  GalleryItem, 
  AppointmentRecord, 
  AppointmentStatus,
  AdminUser,
  TestimonialItem
} from '../types';
import { defaultConfig, allServices, demoOffers, galleryItems, demoTestimonials } from '../data/salonData';
import { initialAppointments } from '../data/initialAppointments';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface SalonContextType {
  config: TemplateConfig;
  services: ServiceItem[];
  offers: OfferItem[];
  gallery: GalleryItem[];
  appointments: AppointmentRecord[];
  reviews: TestimonialItem[];
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginAdmin: (pass: string, email?: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;
  updateConfig: (newConfig: TemplateConfig) => Promise<void>;
  addService: (service: Omit<ServiceItem, 'id'>) => Promise<void>;
  updateService: (service: ServiceItem) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  addOffer: (offer: Omit<OfferItem, 'id'>) => Promise<void>;
  updateOffer: (offer: OfferItem) => Promise<void>;
  deleteOffer: (id: string) => Promise<void>;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  toggleGalleryActive: (id: string) => Promise<void>;
  addAppointment: (appointment: Omit<AppointmentRecord, 'id' | 'createdAt' | 'status'>) => Promise<AppointmentRecord>;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  addReview: (review: Omit<TestimonialItem, 'id'>) => Promise<void>;
  updateReview: (review: TestimonialItem) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  toggleReviewApproval: (id: string) => Promise<void>;
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

export const SalonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Config State
  const [config, setConfig] = useState<TemplateConfig>(() => {
    try {
      const saved = localStorage.getItem('afroza_salon_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultConfig;
  });

  // Services State
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem('afroza_salon_services');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return allServices.map(s => ({ ...s, isActive: s.isActive ?? true }));
  });

  // Offers State
  const [offers, setOffers] = useState<OfferItem[]>(() => {
    try {
      const saved = localStorage.getItem('afroza_salon_offers');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return demoOffers.map(o => ({ ...o, isActive: o.isActive ?? true }));
  });

  // Gallery State
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('afroza_salon_gallery');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return galleryItems.map(g => ({ ...g, isActive: g.isActive ?? true }));
  });

  // Appointments State
  const [appointments, setAppointments] = useState<AppointmentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('afroza_salon_appointments');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialAppointments;
  });

  // Reviews State
  const [reviews, setReviews] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem('afroza_salon_reviews');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return demoTestimonials.map(t => ({ ...t, isApproved: t.isApproved ?? true }));
  });

  // Auth State
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('afroza_admin_session');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  // Helper to check if a string is a valid UUID
  const isUUID = (str: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

  // Load from Supabase if configured
  useEffect(() => {
    const loadFromSupabase = async () => {
      if (!isSupabaseConfigured || !supabase) {
        setIsLoading(false);
        return;
      }

      try {
        // 1. Load Salons Settings
        const { data: salonData } = await supabase.from('salon_settings').select('*').limit(1).maybeSingle();
        if (salonData) {
          const fetchedConfig: TemplateConfig = {
            salonName: salonData.salon_name || defaultConfig.salonName,
            tagline: salonData.tagline || defaultConfig.tagline,
            address: salonData.address || defaultConfig.address,
            locationArea: salonData.location_area || defaultConfig.locationArea,
            phone: salonData.phone || defaultConfig.phone,
            whatsapp: salonData.whatsapp || defaultConfig.whatsapp,
            whatsappRaw: salonData.whatsapp_raw || defaultConfig.whatsappRaw,
            email: salonData.email || defaultConfig.email,
            instagram: salonData.instagram || defaultConfig.instagram,
            googleMapsUrl: salonData.google_maps_url || defaultConfig.googleMapsUrl,
            currency: salonData.currency || defaultConfig.currency,
            workingHoursMonSat: salonData.working_hours_mon_sat || defaultConfig.workingHoursMonSat,
            workingHoursSun: salonData.working_hours_sun || defaultConfig.workingHoursSun,
            googleRating: salonData.google_rating || defaultConfig.googleRating,
            googleReviewCount: salonData.google_review_count || defaultConfig.googleReviewCount,
            priceNotice: salonData.price_notice || defaultConfig.priceNotice,
          };
          setConfig(fetchedConfig);
          localStorage.setItem('afroza_salon_config', JSON.stringify(fetchedConfig));
        }

        // 2. Load Services (public gets active services, admin gets all)
        let srvQuery = supabase.from('services').select('*').order('display_order', { ascending: true });
        const { data: srvsData } = await srvQuery;
        if (srvsData && srvsData.length > 0) {
          const mappedServices: ServiceItem[] = srvsData.map(s => ({
            id: s.id,
            name: s.name,
            category: s.category,
            tier: s.tier || 'classic',
            description: s.description || '',
            startingPrice: Number(s.starting_price || 0),
            duration: s.duration || '20 min',
            image: s.image_url || s.image || '',
            benefits: s.benefits || [],
            whatToExpect: s.what_to_expect || '',
            preparation: s.preparation || '',
            aftercare: s.aftercare || '',
            popular: s.popular || false,
            isActive: s.is_active ?? true
          }));
          setServices(mappedServices);
          localStorage.setItem('afroza_salon_services', JSON.stringify(mappedServices));
        }

        // 3. Load Offers
        const { data: offsData } = await supabase.from('offers').select('*').order('display_order', { ascending: true });
        if (offsData && offsData.length > 0) {
          const mappedOffers: OfferItem[] = offsData.map(o => ({
            id: o.id,
            title: o.title,
            badge: o.badge,
            includedServices: o.included_services || [],
            price: Number(o.price || 0),
            originalPrice: o.original_price ? Number(o.original_price) : undefined,
            validity: o.validity || 'Limited Time',
            description: o.description || '',
            isDemo: o.is_demo || false,
            startDate: o.start_date,
            endDate: o.end_date,
            isActive: o.is_active ?? true
          }));
          setOffers(mappedOffers);
          localStorage.setItem('afroza_salon_offers', JSON.stringify(mappedOffers));
        }

        // 4. Load Gallery
        const { data: galData } = await supabase.from('gallery').select('*').order('display_order', { ascending: true });
        if (galData && galData.length > 0) {
          const mappedGallery: GalleryItem[] = galData.map(g => ({
            id: g.id,
            title: g.title,
            category: g.category,
            image: g.image_url || g.image || '',
            description: g.description || '',
            isActive: g.is_active ?? true
          }));
          setGallery(mappedGallery);
          localStorage.setItem('afroza_salon_gallery', JSON.stringify(mappedGallery));
        }

        // 5. Appointments are NOT loaded on public page load (Appointment Privacy)
        // Appointments select query is strictly reserved for authorized admins.

        // 6. Load Reviews (Public sees approved only unless admin)
        const { data: revData } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
        if (revData && revData.length > 0) {
          const mappedReviews: TestimonialItem[] = revData.map(r => ({
            id: r.id,
            clientName: r.customer_name,
            clientType: r.client_type,
            rating: Number(r.rating || 5),
            comment: r.review_text,
            service: r.service_name,
            isDemo: r.is_demo,
            isApproved: r.is_approved ?? true
          }));
          setReviews(mappedReviews);
          localStorage.setItem('afroza_salon_reviews', JSON.stringify(mappedReviews));
        }

        // 7. Check active Supabase auth session & verify in admin_users
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData?.session?.user) {
          const user = sessionData.session.user;
          
          // Verify matching record in admin_users table
          const { data: adminRecord } = await supabase
            .from('admin_users')
            .select('*')
            .or(`id.eq.${user.id},email.eq.${user.email}`)
            .maybeSingle();

          if (adminRecord) {
            const adminObj: AdminUser = {
              id: user.id,
              email: user.email || 'admin@afrozagentssalon.ae',
              name: adminRecord.name || user.user_metadata?.name || 'Salon Admin',
              role: adminRecord.role || 'owner'
            };
            setAdminUser(adminObj);
            localStorage.setItem('afroza_admin_session', JSON.stringify(adminObj));

            // Load appointments securely for verified admin
            try {
              const { data: aptsData } = await supabase
                .from('appointments')
                .select('*')
                .order('created_at', { ascending: false });

              if (aptsData && aptsData.length > 0) {
                const mappedApts: AppointmentRecord[] = aptsData.map(a => ({
                  id: a.id,
                  salonId: a.salon_id,
                  customerName: a.customer_name,
                  phone: a.phone,
                  email: a.email,
                  serviceId: a.service_id,
                  serviceName: a.service_name,
                  preferredDate: a.appointment_date || a.preferred_date,
                  preferredTime: a.appointment_time || a.preferred_time,
                  category: a.category,
                  numberOfGuests: a.number_of_guests,
                  specialRequest: a.notes || a.special_request,
                  preferredBarber: a.preferred_barber,
                  status: (a.status as AppointmentStatus) || 'Pending',
                  createdAt: a.created_at
                }));
                setAppointments(mappedApts);
                localStorage.setItem('afroza_salon_appointments', JSON.stringify(mappedApts));
              }
            } catch (e) {}
          } else {
            // User authenticated with Supabase Auth but NOT in admin_users!
            await supabase.auth.signOut();
            setAdminUser(null);
            localStorage.removeItem('afroza_admin_session');
          }
        }

        // Auth Listener
        supabase.auth.onAuthStateChange(async (_event, session) => {
          if (session?.user) {
            const user = session.user;
            const { data: adminRecord } = await supabase
              .from('admin_users')
              .select('*')
              .or(`id.eq.${user.id},email.eq.${user.email}`)
              .maybeSingle();

            if (adminRecord) {
              const adminObj: AdminUser = {
                id: user.id,
                email: user.email || 'admin@afrozagentssalon.ae',
                name: adminRecord.name || user.user_metadata?.name || 'Salon Admin',
                role: adminRecord.role || 'owner'
              };
              setAdminUser(adminObj);
              localStorage.setItem('afroza_admin_session', JSON.stringify(adminObj));
            } else {
              await supabase.auth.signOut();
              setAdminUser(null);
              localStorage.removeItem('afroza_admin_session');
            }
          } else {
            setAdminUser(null);
            localStorage.removeItem('afroza_admin_session');
          }
        });

      } catch (err) {
        console.warn('Supabase fetch notice (falling back to cached local store):', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFromSupabase();
  }, []);

  // Save to LocalStorage helpers
  const persistConfig = (c: TemplateConfig) => {
    setConfig(c);
    try { localStorage.setItem('afroza_salon_config', JSON.stringify(c)); } catch (e) {}
  };

  const persistServices = (s: ServiceItem[]) => {
    setServices(s);
    try { localStorage.setItem('afroza_salon_services', JSON.stringify(s)); } catch (e) {}
  };

  const persistOffers = (o: OfferItem[]) => {
    setOffers(o);
    try { localStorage.setItem('afroza_salon_offers', JSON.stringify(o)); } catch (e) {}
  };

  const persistGallery = (g: GalleryItem[]) => {
    setGallery(g);
    try { localStorage.setItem('afroza_salon_gallery', JSON.stringify(g)); } catch (e) {}
  };

  const persistAppointments = (a: AppointmentRecord[]) => {
    setAppointments(a);
    try { localStorage.setItem('afroza_salon_appointments', JSON.stringify(a)); } catch (e) {}
  };

  const persistReviews = (r: TestimonialItem[]) => {
    setReviews(r);
    try { localStorage.setItem('afroza_salon_reviews', JSON.stringify(r)); } catch (e) {}
  };

  // Auth Methods
  const loginAdmin = async (pass: string, explicitEmail?: string): Promise<{ success: boolean; error?: string }> => {
    const adminEmail = explicitEmail?.trim() || config.email || 'admin@afrozagentssalon.ae';

    if (isSupabaseConfigured && supabase) {
      try {
        let authUser: any = null;

        // 1. First attempt login via Supabase Edge Function (server-side secret validation)
        try {
          const { data: edgeData, error: edgeErr } = await supabase.functions.invoke('admin-login', {
            body: { password: pass }
          });
          if (!edgeErr && edgeData?.session) {
            await supabase.auth.setSession(edgeData.session);
            authUser = edgeData.user;
          }
        } catch (e) {
          // Edge function not invoked or not deployed
        }

        // 2. Fall back to standard Supabase Auth if Edge Function is not present
        if (!authUser) {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: adminEmail,
            password: pass
          });

          if (error) {
            return { success: false, error: error.message };
          }
          authUser = data.user;
        }

        if (authUser) {
          // Verify matching record in admin_users table
          const { data: adminRecord, error: adminError } = await supabase
            .from('admin_users')
            .select('*')
            .or(`id.eq.${authUser.id},email.eq.${authUser.email}`)
            .maybeSingle();

          if (!adminRecord || adminError) {
            await supabase.auth.signOut();
            setAdminUser(null);
            localStorage.removeItem('afroza_admin_session');
            return {
              success: false,
              error: 'Unauthorized: Account authenticated, but no matching record found in admin_users.'
            };
          }

          const userObj: AdminUser = {
            id: authUser.id,
            email: authUser.email || adminEmail,
            name: adminRecord.name || authUser.user_metadata?.name || 'Salon Admin',
            role: adminRecord.role || 'owner'
          };
          setAdminUser(userObj);
          localStorage.setItem('afroza_admin_session', JSON.stringify(userObj));

          // Load appointments for authorized admin
          try {
            const { data: aptsData } = await supabase
              .from('appointments')
              .select('*')
              .order('created_at', { ascending: false });

            if (aptsData && aptsData.length > 0) {
              const mappedApts: AppointmentRecord[] = aptsData.map(a => ({
                id: a.id,
                salonId: a.salon_id,
                customerName: a.customer_name,
                phone: a.phone,
                email: a.email,
                serviceId: a.service_id,
                serviceName: a.service_name,
                preferredDate: a.appointment_date || a.preferred_date,
                preferredTime: a.appointment_time || a.preferred_time,
                category: a.category,
                numberOfGuests: a.number_of_guests,
                specialRequest: a.notes || a.special_request,
                preferredBarber: a.preferred_barber,
                status: (a.status as AppointmentStatus) || 'Pending',
                createdAt: a.created_at
              }));
              setAppointments(mappedApts);
            }
          } catch (e) {}

          return { success: true };
        }
      } catch (e: any) {
        return { success: false, error: e.message || 'Login failed' };
      }
    }

    // Local fallback only if Supabase is NOT configured (e.g. initial offline setup)
    if (!isSupabaseConfigured && pass.trim()) {
      const userObj: AdminUser = { id: 'admin-local-id', email: adminEmail, name: 'Salon Admin', role: 'owner' };
      setAdminUser(userObj);
      localStorage.setItem('afroza_admin_session', JSON.stringify(userObj));
      return { success: true };
    }

    return { success: false, error: 'Please provide valid credentials' };
  };

  const logoutAdmin = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {}
    }
    setAdminUser(null);
    try { localStorage.removeItem('afroza_admin_session'); } catch (e) {}
  };

  // Config Update
  const updateConfig = async (newConfig: TemplateConfig) => {
    persistConfig(newConfig);

    if (isSupabaseConfigured && supabase) {
      try {
        const existing = await supabase.from('salon_settings').select('id').limit(1).maybeSingle();
        const payload = {
          salon_name: newConfig.salonName,
          tagline: newConfig.tagline,
          address: newConfig.address,
          location_area: newConfig.locationArea,
          phone: newConfig.phone,
          whatsapp: newConfig.whatsapp,
          whatsapp_raw: newConfig.whatsappRaw,
          email: newConfig.email,
          instagram: newConfig.instagram,
          google_maps_url: newConfig.googleMapsUrl,
          currency: newConfig.currency,
          working_hours_mon_sat: newConfig.workingHoursMonSat,
          working_hours_sun: newConfig.workingHoursSun,
          google_rating: String(newConfig.googleRating),
          google_review_count: String(newConfig.googleReviewCount),
          price_notice: newConfig.priceNotice
        };

        if (existing.data?.id) {
          await supabase.from('salon_settings').update(payload).eq('id', existing.data.id);
        } else {
          await supabase.from('salon_settings').insert(payload);
        }
      } catch (e) {
        console.warn('Supabase config sync error:', e);
      }
    }
  };

  // Services CRUD
  const addService = async (serviceData: Omit<ServiceItem, 'id'>) => {
    let newId = 'srv-' + Date.now();
    let insertPayload: any = {
      name: serviceData.name,
      category: serviceData.category,
      tier: serviceData.tier,
      description: serviceData.description,
      starting_price: serviceData.startingPrice,
      duration: serviceData.duration,
      image_url: serviceData.image,
      benefits: serviceData.benefits,
      what_to_expect: serviceData.whatToExpect,
      preparation: serviceData.preparation,
      aftercare: serviceData.aftercare,
      popular: serviceData.popular,
      is_active: serviceData.isActive ?? true
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('services').insert(insertPayload).select('*').single();
        if (data?.id) {
          newId = data.id;
        }
      } catch (e) {
        console.warn('Supabase service insert notice:', e);
      }
    }

    const newService: ServiceItem = {
      ...serviceData,
      id: newId,
      isActive: serviceData.isActive ?? true
    };
    persistServices([newService, ...services]);
  };

  const updateService = async (updatedService: ServiceItem) => {
    const updated = services.map(s => s.id === updatedService.id ? updatedService : s);
    persistServices(updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload: any = {
          name: updatedService.name,
          category: updatedService.category,
          tier: updatedService.tier,
          description: updatedService.description,
          starting_price: updatedService.startingPrice,
          duration: updatedService.duration,
          image_url: updatedService.image,
          benefits: updatedService.benefits,
          what_to_expect: updatedService.whatToExpect,
          preparation: updatedService.preparation,
          aftercare: updatedService.aftercare,
          popular: updatedService.popular,
          is_active: updatedService.isActive
        };

        if (isUUID(updatedService.id)) {
          await supabase.from('services').update(payload).eq('id', updatedService.id);
        } else {
          await supabase.from('services').update(payload).eq('name', updatedService.name);
        }
      } catch (e) {
        console.warn('Supabase service update notice:', e);
      }
    }
  };

  const deleteService = async (id: string) => {
    const target = services.find(s => s.id === id);
    const updated = services.filter(s => s.id !== id);
    persistServices(updated);

    if (isSupabaseConfigured && supabase) {
      try {
        if (isUUID(id)) {
          await supabase.from('services').delete().eq('id', id);
        } else if (target) {
          await supabase.from('services').delete().eq('name', target.name);
        }
      } catch (e) {}
    }
  };

  // Offers CRUD
  const addOffer = async (offerData: Omit<OfferItem, 'id'>) => {
    let newId = 'off-' + Date.now();
    const payload = {
      title: offerData.title,
      badge: offerData.badge,
      included_services: offerData.includedServices,
      price: offerData.price,
      original_price: offerData.originalPrice,
      validity: offerData.validity,
      description: offerData.description,
      is_demo: offerData.isDemo || false,
      start_date: offerData.startDate,
      end_date: offerData.endDate,
      is_active: offerData.isActive ?? true
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data } = await supabase.from('offers').insert(payload).select('*').single();
        if (data?.id) newId = data.id;
      } catch (e) {}
    }

    const newOffer: OfferItem = {
      ...offerData,
      id: newId,
      isActive: offerData.isActive ?? true
    };
    persistOffers([newOffer, ...offers]);
  };

  const updateOffer = async (updatedOffer: OfferItem) => {
    const updated = offers.map(o => o.id === updatedOffer.id ? updatedOffer : o);
    persistOffers(updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload = {
          title: updatedOffer.title,
          badge: updatedOffer.badge,
          included_services: updatedOffer.includedServices,
          price: updatedOffer.price,
          original_price: updatedOffer.originalPrice,
          validity: updatedOffer.validity,
          description: updatedOffer.description,
          start_date: updatedOffer.startDate,
          end_date: updatedOffer.endDate,
          is_active: updatedOffer.isActive
        };

        if (isUUID(updatedOffer.id)) {
          await supabase.from('offers').update(payload).eq('id', updatedOffer.id);
        } else {
          await supabase.from('offers').update(payload).eq('title', updatedOffer.title);
        }
      } catch (e) {}
    }
  };

  const deleteOffer = async (id: string) => {
    const target = offers.find(o => o.id === id);
    const updated = offers.filter(o => o.id !== id);
    persistOffers(updated);

    if (isSupabaseConfigured && supabase) {
      try {
        if (isUUID(id)) {
          await supabase.from('offers').delete().eq('id', id);
        } else if (target) {
          await supabase.from('offers').delete().eq('title', target.title);
        }
      } catch (e) {}
    }
  };

  // Gallery CRUD
  const addGalleryItem = async (itemData: Omit<GalleryItem, 'id'>) => {
    let newId = 'gal-' + Date.now();
    const payload = {
      title: itemData.title,
      category: itemData.category,
      image_url: itemData.image,
      description: itemData.description,
      is_active: itemData.isActive ?? true
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data } = await supabase.from('gallery').insert(payload).select('*').single();
        if (data?.id) newId = data.id;
      } catch (e) {}
    }

    const newItem: GalleryItem = {
      ...itemData,
      id: newId,
      isActive: itemData.isActive ?? true
    };
    persistGallery([newItem, ...gallery]);
  };

  const deleteGalleryItem = async (id: string) => {
    const target = gallery.find(g => g.id === id);
    const updated = gallery.filter(g => g.id !== id);
    persistGallery(updated);

    if (isSupabaseConfigured && supabase) {
      try {
        if (isUUID(id)) {
          await supabase.from('gallery').delete().eq('id', id);
        } else if (target) {
          await supabase.from('gallery').delete().eq('title', target.title);
        }
      } catch (e) {}
    }
  };

  const toggleGalleryActive = async (id: string) => {
    const updated = gallery.map(g => g.id === id ? { ...g, isActive: !g.isActive } : g);
    persistGallery(updated);

    const target = updated.find(g => g.id === id);
    if (target && isSupabaseConfigured && supabase) {
      try {
        if (isUUID(id)) {
          await supabase.from('gallery').update({ is_active: target.isActive }).eq('id', id);
        } else {
          await supabase.from('gallery').update({ is_active: target.isActive }).eq('title', target.title);
        }
      } catch (e) {}
    }
  };

  // Appointments Management
  const addAppointment = async (data: Omit<AppointmentRecord, 'id' | 'createdAt' | 'status'>): Promise<AppointmentRecord> => {
    let newId = 'apt-' + Date.now();
    const createdAt = new Date().toISOString();

    const insertPayload: any = {
      customer_name: data.customerName,
      phone: data.phone,
      email: data.email,
      service_name: data.serviceName,
      appointment_date: data.preferredDate,
      appointment_time: data.preferredTime,
      category: data.category,
      number_of_guests: data.numberOfGuests,
      notes: data.specialRequest,
      preferred_barber: data.preferredBarber,
      status: 'Pending',
      created_at: createdAt
    };

    if (data.serviceId && isUUID(data.serviceId)) {
      insertPayload.service_id = data.serviceId;
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data: resData, error } = await supabase.from('appointments').insert(insertPayload).select('*').single();
        if (resData?.id) {
          newId = resData.id;
        } else if (error) {
          console.warn('Supabase appointment insert notice:', error);
        }
      } catch (e) {
        console.warn('Supabase appointment insert catch:', e);
      }
    }

    const newRecord: AppointmentRecord = {
      ...data,
      id: newId,
      status: 'Pending',
      createdAt
    };

    persistAppointments([newRecord, ...appointments]);
    return newRecord;
  };

  const updateAppointmentStatus = async (id: string, status: AppointmentStatus) => {
    const updated = appointments.map(a => a.id === id ? { ...a, status } : a);
    persistAppointments(updated);

    if (isSupabaseConfigured && supabase) {
      try {
        if (isUUID(id)) {
          await supabase.from('appointments').update({ status }).eq('id', id);
        }
      } catch (e) {}
    }
  };

  const deleteAppointment = async (id: string) => {
    const updated = appointments.filter(a => a.id !== id);
    persistAppointments(updated);

    if (isSupabaseConfigured && supabase) {
      try {
        if (isUUID(id)) {
          await supabase.from('appointments').delete().eq('id', id);
        }
      } catch (e) {}
    }
  };

  // Reviews CRUD
  const addReview = async (reviewData: Omit<TestimonialItem, 'id'>) => {
    let newId = 'rev-' + Date.now();
    const payload = {
      customer_name: reviewData.clientName,
      client_type: reviewData.clientType,
      rating: reviewData.rating,
      review_text: reviewData.comment,
      service_name: reviewData.service,
      is_demo: reviewData.isDemo || false,
      is_approved: reviewData.isApproved ?? false // Default unapproved for public submissions unless set
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data } = await supabase.from('reviews').insert(payload).select('*').single();
        if (data?.id) newId = data.id;
      } catch (e) {}
    }

    const newReview: TestimonialItem = {
      ...reviewData,
      id: newId,
      isApproved: reviewData.isApproved ?? false
    };
    persistReviews([newReview, ...reviews]);
  };

  const updateReview = async (updatedReview: TestimonialItem) => {
    const updated = reviews.map(r => r.id === updatedReview.id ? updatedReview : r);
    persistReviews(updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload = {
          customer_name: updatedReview.clientName,
          client_type: updatedReview.clientType,
          rating: updatedReview.rating,
          review_text: updatedReview.comment,
          service_name: updatedReview.service,
          is_approved: updatedReview.isApproved
        };

        if (isUUID(updatedReview.id)) {
          await supabase.from('reviews').update(payload).eq('id', updatedReview.id);
        } else {
          await supabase.from('reviews').update(payload).eq('customer_name', updatedReview.clientName);
        }
      } catch (e) {}
    }
  };

  const toggleReviewApproval = async (id: string) => {
    const target = reviews.find(r => r.id === id);
    if (!target) return;
    const updatedRev = { ...target, isApproved: !target.isApproved };
    await updateReview(updatedRev);
  };

  const deleteReview = async (id: string) => {
    const target = reviews.find(r => r.id === id);
    const updated = reviews.filter(r => r.id !== id);
    persistReviews(updated);

    if (isSupabaseConfigured && supabase) {
      try {
        if (isUUID(id)) {
          await supabase.from('reviews').delete().eq('id', id);
        } else if (target) {
          await supabase.from('reviews').delete().eq('customer_name', target.clientName);
        }
      } catch (e) {}
    }
  };

  return (
    <SalonContext.Provider value={{
      config,
      services,
      offers,
      gallery,
      appointments,
      reviews,
      adminUser,
      isAuthenticated: Boolean(adminUser),
      isLoading,
      loginAdmin,
      logoutAdmin,
      updateConfig,
      addService,
      updateService,
      deleteService,
      addOffer,
      updateOffer,
      deleteOffer,
      addGalleryItem,
      deleteGalleryItem,
      toggleGalleryActive,
      addAppointment,
      updateAppointmentStatus,
      deleteAppointment,
      addReview,
      updateReview,
      deleteReview,
      toggleReviewApproval
    }}>
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => {
  const context = useContext(SalonContext);
  if (!context) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return context;
};
