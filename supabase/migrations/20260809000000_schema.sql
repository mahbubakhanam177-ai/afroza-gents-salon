-- ==========================================
-- AFROZA GENTS SALON - SUPABASE DATABASE SCHEMA
-- ==========================================

-- Enable pgcrypto / uuid-ossp extension for UUID generation if needed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------
-- 1. SALON SETTINGS
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.salon_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_name TEXT NOT NULL DEFAULT 'Afroza Gents Salon',
  tagline TEXT DEFAULT 'Sharp Looks. Fresh Confidence.',
  phone TEXT NOT NULL DEFAULT '+971 56 717 9467',
  whatsapp TEXT DEFAULT '+971 56 717 9467',
  whatsapp_raw TEXT DEFAULT '971567179467',
  email TEXT DEFAULT 'info@afrozagentssalon.ae',
  address TEXT DEFAULT 'International City Phase 2, Warsan 4, Dubai, UAE',
  location_area TEXT DEFAULT 'International City Phase 2 / Warsan 4, Dubai',
  google_maps_url TEXT DEFAULT 'https://maps.app.goo.gl/fVroDt5YXfmSTfnGA',
  working_hours_mon_sat TEXT DEFAULT '10:00 AM – 12:00 AM',
  working_hours_sun TEXT DEFAULT '10:00 AM – 12:00 AM',
  currency TEXT DEFAULT 'AED',
  google_rating TEXT DEFAULT '4.6',
  google_review_count TEXT DEFAULT '83',
  price_notice TEXT DEFAULT 'Price on request — Contact salon for current pricing',
  logo_url TEXT,
  hero_image_url TEXT,
  instagram TEXT DEFAULT '@afroza.gents.salon',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------
-- 2. SERVICES
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'haircuts', 'beard', 'shaving', 'styling', 'skincare', 'treatments'
  tier TEXT DEFAULT 'classic', -- 'essential', 'classic', 'premium'
  description TEXT,
  starting_price NUMERIC DEFAULT 0 CHECK (starting_price >= 0),
  duration TEXT,
  image_url TEXT,
  benefits TEXT[] DEFAULT '{}',
  what_to_expect TEXT,
  preparation TEXT,
  aftercare TEXT,
  popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_display_order ON public.services(display_order);

-- ------------------------------------------
-- 3. OFFERS
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  badge TEXT,
  included_services TEXT[] DEFAULT '{}',
  description TEXT,
  discount_value TEXT,
  price NUMERIC DEFAULT 0 CHECK (price >= 0),
  original_price NUMERIC CHECK (original_price IS NULL OR original_price >= 0),
  validity TEXT,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  image_url TEXT,
  is_demo BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_offers_is_active ON public.offers(is_active);
CREATE INDEX IF NOT EXISTS idx_offers_display_order ON public.offers(display_order);

-- ------------------------------------------
-- 4. GALLERY
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'haircuts', -- 'haircuts', 'beard', 'skincare', 'interior'
  description TEXT,
  alt_text TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_gallery_category ON public.gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_is_active ON public.gallery(is_active);
CREATE INDEX IF NOT EXISTS idx_gallery_display_order ON public.gallery(display_order);

-- ------------------------------------------
-- 5. APPOINTMENTS
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID REFERENCES public.salon_settings(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp_number TEXT,
  email TEXT,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  service_name TEXT NOT NULL,
  category TEXT,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  number_of_guests INTEGER DEFAULT 1 CHECK (number_of_guests >= 1),
  notes TEXT,
  preferred_barber TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show', 'Pending', 'Confirmed', 'Completed', 'Cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON public.appointments(created_at DESC);

-- ------------------------------------------
-- 6. REVIEWS
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  client_type TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  service_name TEXT,
  review_date DATE DEFAULT CURRENT_DATE,
  is_demo BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reviews_is_approved ON public.reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_reviews_display_order ON public.reviews(display_order);

-- ------------------------------------------
-- 7. ADMIN USERS
-- ------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin' NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);

-- ------------------------------------------
-- HELPER FUNCTIONS & TRIGGERS
-- ------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply Triggers
DROP TRIGGER IF EXISTS tr_salon_settings_updated_at ON public.salon_settings;
CREATE TRIGGER tr_salon_settings_updated_at BEFORE UPDATE ON public.salon_settings FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

DROP TRIGGER IF EXISTS tr_services_updated_at ON public.services;
CREATE TRIGGER tr_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

DROP TRIGGER IF EXISTS tr_offers_updated_at ON public.offers;
CREATE TRIGGER tr_offers_updated_at BEFORE UPDATE ON public.offers FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

DROP TRIGGER IF EXISTS tr_gallery_updated_at ON public.gallery;
CREATE TRIGGER tr_gallery_updated_at BEFORE UPDATE ON public.gallery FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

DROP TRIGGER IF EXISTS tr_appointments_updated_at ON public.appointments;
CREATE TRIGGER tr_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

DROP TRIGGER IF EXISTS tr_reviews_updated_at ON public.reviews;
CREATE TRIGGER tr_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

DROP TRIGGER IF EXISTS tr_admin_users_updated_at ON public.admin_users;
CREATE TRIGGER tr_admin_users_updated_at BEFORE UPDATE ON public.admin_users FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.salon_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------
-- SALON SETTINGS POLICIES
-- ------------------------------------------
DROP POLICY IF EXISTS "Public select salon_settings" ON public.salon_settings;
CREATE POLICY "Public select salon_settings" ON public.salon_settings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin write salon_settings" ON public.salon_settings;
CREATE POLICY "Admin write salon_settings" ON public.salon_settings
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ------------------------------------------
-- SERVICES POLICIES
-- ------------------------------------------
DROP POLICY IF EXISTS "Public select active services" ON public.services;
CREATE POLICY "Public select active services" ON public.services
  FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Admin write services" ON public.services;
CREATE POLICY "Admin write services" ON public.services
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ------------------------------------------
-- OFFERS POLICIES
-- ------------------------------------------
DROP POLICY IF EXISTS "Public select active offers" ON public.offers;
CREATE POLICY "Public select active offers" ON public.offers
  FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Admin write offers" ON public.offers;
CREATE POLICY "Admin write offers" ON public.offers
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ------------------------------------------
-- GALLERY POLICIES
-- ------------------------------------------
DROP POLICY IF EXISTS "Public select active gallery" ON public.gallery;
CREATE POLICY "Public select active gallery" ON public.gallery
  FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Admin write gallery" ON public.gallery;
CREATE POLICY "Admin write gallery" ON public.gallery
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ------------------------------------------
-- APPOINTMENTS POLICIES (STRICT PUBLIC INSERT, ADMIN ALL)
-- ------------------------------------------
DROP POLICY IF EXISTS "Public insert appointments" ON public.appointments;
CREATE POLICY "Public insert appointments" ON public.appointments
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access appointments" ON public.appointments;
CREATE POLICY "Admin full access appointments" ON public.appointments
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ------------------------------------------
-- REVIEWS POLICIES
-- ------------------------------------------
DROP POLICY IF EXISTS "Public select approved reviews" ON public.reviews;
CREATE POLICY "Public select approved reviews" ON public.reviews
  FOR SELECT USING (is_approved = true OR public.is_admin());

DROP POLICY IF EXISTS "Public insert reviews" ON public.reviews;
CREATE POLICY "Public insert reviews" ON public.reviews
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write reviews" ON public.reviews;
CREATE POLICY "Admin write reviews" ON public.reviews
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ------------------------------------------
-- ADMIN USERS POLICIES
-- ------------------------------------------
DROP POLICY IF EXISTS "Users read own admin_users record" ON public.admin_users;
CREATE POLICY "Users read own admin_users record" ON public.admin_users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admin full access admin_users" ON public.admin_users;
CREATE POLICY "Admin full access admin_users" ON public.admin_users
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ==========================================
-- STORAGE SETUP & POLICIES
-- ==========================================

-- Create storage bucket if not existing
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage object policies for 'gallery' bucket
DROP POLICY IF EXISTS "Public read gallery storage" ON storage.objects;
CREATE POLICY "Public read gallery storage" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery');

DROP POLICY IF EXISTS "Admin upload gallery storage" ON storage.objects;
CREATE POLICY "Admin upload gallery storage" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery' AND public.is_admin());

DROP POLICY IF EXISTS "Admin update gallery storage" ON storage.objects;
CREATE POLICY "Admin update gallery storage" ON storage.objects
  FOR UPDATE USING (bucket_id = 'gallery' AND public.is_admin());

DROP POLICY IF EXISTS "Admin delete gallery storage" ON storage.objects;
CREATE POLICY "Admin delete gallery storage" ON storage.objects
  FOR DELETE USING (bucket_id = 'gallery' AND public.is_admin());
