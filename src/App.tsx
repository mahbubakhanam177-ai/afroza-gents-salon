import React, { useState, useEffect } from 'react';
import { TemplateConfig, NavigationPage, ServiceItem, AdminRoute } from './types';
import { SalonProvider, useSalon } from './context/SalonContext';

// Public Components
import { TopInfoBar } from './components/TopInfoBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustValueSection } from './components/TrustValueSection';
import { EverydayGroomingSection } from './components/EverydayGroomingSection';
import { PremiumGroomingSection } from './components/PremiumGroomingSection';
import { PricingSection } from './components/PricingSection';
import { SignatureExperience } from './components/SignatureExperience';
import { WhyChooseUs } from './components/WhyChooseUs';
import { OffersSection } from './components/OffersSection';
import { GallerySection } from './components/GallerySection';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { DubaiLocationSection } from './components/DubaiLocationSection';

// Public Pages
import { AboutPage } from './components/AboutPage';
import { ServicesPage } from './components/ServicesPage';
import { PricingPage } from './components/PricingPage';
import { OffersPage } from './components/OffersPage';
import { ContactPage } from './components/ContactPage';

// Admin Components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminAppointments } from './components/admin/AdminAppointments';
import { AdminServices } from './components/admin/AdminServices';
import { AdminOffers } from './components/admin/AdminOffers';
import { AdminGallery } from './components/admin/AdminGallery';
import { AdminReviews } from './components/admin/AdminReviews';
import { AdminSettings } from './components/admin/AdminSettings';

// Modals & Footer
import { TemplateCustomizer } from './components/TemplateCustomizer';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { BookingModal } from './components/BookingModal';
import { PwaInstallModal } from './components/PwaInstallModal';
import { LegalModal } from './components/LegalModal';
import { Footer } from './components/Footer';

function MainAppContent() {
  const { config, updateConfig, isAuthenticated } = useSalon();

  // Route State: 'public' or 'admin'
  const [isAdminPath, setIsAdminPath] = useState<boolean>(() => {
    return window.location.pathname.startsWith('/admin');
  });

  const [adminRoute, setAdminRoute] = useState<AdminRoute>(() => {
    const path = window.location.pathname as AdminRoute;
    if (path.startsWith('/admin')) {
      return path;
    }
    return '/admin';
  });

  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');

  // Modal states
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>();
  const [bookingOfferTitle, setBookingOfferTitle] = useState<string | undefined>();
  const [pwaModalOpen, setPwaModalOpen] = useState(false);
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'refunds' | 'cookies' | 'disclaimer' | null>(null);

  // PWA Prompt states
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIos, setIsIos] = useState(false);
  const [isPwaInstalled, setIsPwaInstalled] = useState(false);

  // Handle URL changes & browser history
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/admin')) {
        setIsAdminPath(true);
        setAdminRoute(path as AdminRoute);
      } else {
        setIsAdminPath(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateAdmin = (route: AdminRoute) => {
    setAdminRoute(route);
    setIsAdminPath(true);
    window.history.pushState({}, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigatePublicPage = (page: NavigationPage) => {
    setCurrentPage(page);
    setIsAdminPath(false);
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Check if running as standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone) {
      setIsPwaInstalled(true);
    }

    // iOS detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIos(/iphone|ipad|ipod/.test(userAgent));

    // Listen for PWA installation prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleTriggerPwaInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setIsPwaInstalled(true);
        }
        setDeferredPrompt(null);
        setPwaModalOpen(false);
      });
    }
  };

  const handleOpenBooking = (serviceIdOrOffer?: string) => {
    if (serviceIdOrOffer) {
      setBookingServiceId(serviceIdOrOffer);
      setBookingOfferTitle(undefined);
    } else {
      setBookingServiceId(undefined);
      setBookingOfferTitle(undefined);
    }
    setBookingOpen(true);
  };

  // IF ADMIN ROUTE
  if (isAdminPath) {
    if (!isAuthenticated || adminRoute === '/admin/login') {
      return (
        <AdminLogin
          onSuccess={() => navigateAdmin('/admin')}
          onNavigatePublic={() => navigatePublicPage('home')}
        />
      );
    }

    return (
      <AdminLayout
        currentRoute={adminRoute}
        onNavigate={(route) => navigateAdmin(route)}
        onNavigatePublic={() => navigatePublicPage('home')}
      >
        {adminRoute === '/admin' && (
          <AdminDashboard onNavigate={(route) => navigateAdmin(route)} />
        )}
        {adminRoute === '/admin/appointments' && (
          <AdminAppointments />
        )}
        {adminRoute === '/admin/services' && (
          <AdminServices />
        )}
        {adminRoute === '/admin/offers' && (
          <AdminOffers />
        )}
        {adminRoute === '/admin/gallery' && (
          <AdminGallery />
        )}
        {adminRoute === '/admin/reviews' && (
          <AdminReviews />
        )}
        {adminRoute === '/admin/settings' && (
          <AdminSettings />
        )}
      </AdminLayout>
    );
  }

  // PUBLIC WEBSITE RENDER
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans flex flex-col justify-between selection:bg-amber-500 selection:text-stone-950">
      
      <div>
        {/* Top Information Bar */}
        <TopInfoBar
          config={config}
          onOpenCustomizer={() => setCustomizerOpen(true)}
        />

        {/* Header */}
        <Header
          config={config}
          currentPage={currentPage}
          onNavigate={(page) => setCurrentPage(page)}
          onOpenBooking={() => handleOpenBooking()}
          onOpenPwaModal={() => setPwaModalOpen(true)}
          isPwaInstalled={isPwaInstalled}
        />

        {/* Page Render */}
        <main>
          {currentPage === 'home' && (
            <>
              {/* 1. Hero */}
              <Hero
                config={config}
                onNavigate={(page) => setCurrentPage(page)}
                onOpenBooking={() => handleOpenBooking()}
              />

              {/* 2. Trust Value Points */}
              <TrustValueSection />

              {/* 3. Everyday Grooming (Budget-conscious & Everyday) */}
              <EverydayGroomingSection
                config={config}
                onNavigate={(page) => setCurrentPage(page)}
                onOpenBooking={(serviceId) => handleOpenBooking(serviceId)}
                onSelectService={(service) => setSelectedServiceModal(service)}
              />

              {/* 4. Premium Grooming (Executive & Elevated) */}
              <PremiumGroomingSection
                config={config}
                onNavigate={(page) => setCurrentPage(page)}
                onOpenBooking={(serviceId) => handleOpenBooking(serviceId)}
                onSelectService={(service) => setSelectedServiceModal(service)}
              />

              {/* 5. Pricing Tiers */}
              <PricingSection
                config={config}
                onOpenBooking={() => handleOpenBooking()}
              />

              {/* 6. Signature Grooming Journey */}
              <SignatureExperience />

              {/* 7. Why Choose Us */}
              <WhyChooseUs />

              {/* 8. Offers */}
              <OffersSection
                config={config}
                onOpenBooking={(offerTitle) => handleOpenBooking(offerTitle)}
              />

              {/* 9. Gallery */}
              <GallerySection />

              {/* 10. Google Customer Reviews */}
              <GoogleReviewsSection config={config} />

              {/* 11. Dubai Location */}
              <DubaiLocationSection
                config={config}
                onOpenBooking={() => handleOpenBooking()}
              />
            </>
          )}

          {currentPage === 'about' && (
            <AboutPage
              config={config}
              onOpenBooking={() => handleOpenBooking()}
            />
          )}

          {currentPage === 'services' && (
            <ServicesPage
              config={config}
              onOpenBooking={(serviceId) => handleOpenBooking(serviceId)}
              onSelectService={(service) => setSelectedServiceModal(service)}
            />
          )}

          {currentPage === 'pricing' && (
            <PricingPage
              config={config}
              onOpenBooking={() => handleOpenBooking()}
            />
          )}

          {currentPage === 'offers' && (
            <OffersPage
              config={config}
              onOpenBooking={(offerTitle) => handleOpenBooking(offerTitle)}
            />
          )}

          {currentPage === 'gallery' && (
            <div className="py-8 bg-stone-950">
              <GallerySection />
            </div>
          )}

          {currentPage === 'contact' && (
            <ContactPage
              config={config}
              onOpenBooking={() => handleOpenBooking()}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer
        config={config}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={() => handleOpenBooking()}
        onOpenPwaModal={() => setPwaModalOpen(true)}
        onOpenLegal={(type) => setLegalModalType(type)}
        isPwaInstalled={isPwaInstalled}
      />

      {/* Modals */}
      <TemplateCustomizer
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        config={config}
        onUpdateConfig={updateConfig}
        onResetConfig={() => {}}
      />

      <ServiceDetailModal
        service={selectedServiceModal}
        onClose={() => setSelectedServiceModal(null)}
        config={config}
        onOpenBooking={(serviceId) => handleOpenBooking(serviceId)}
      />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        config={config}
        initialServiceId={bookingServiceId}
        initialOfferTitle={bookingOfferTitle}
      />

      <PwaInstallModal
        isOpen={pwaModalOpen}
        onClose={() => setPwaModalOpen(false)}
        config={config}
        deferredPrompt={deferredPrompt}
        isIos={isIos}
        isPwaInstalled={isPwaInstalled}
        onTriggerInstall={handleTriggerPwaInstall}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
        config={config}
      />

    </div>
  );
}

export default function App() {
  return (
    <SalonProvider>
      <MainAppContent />
    </SalonProvider>
  );
}
