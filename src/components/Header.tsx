import React, { useState } from 'react';
import { 
  Scissors, 
  Phone, 
  MessageSquare, 
  Download, 
  Check, 
  Menu, 
  X, 
  Calendar 
} from 'lucide-react';
import { TemplateConfig, NavigationPage } from '../types';

interface HeaderProps {
  config: TemplateConfig;
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onOpenBooking: () => void;
  onOpenPwaModal: () => void;
  isPwaInstalled: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  currentPage,
  onNavigate,
  onOpenBooking,
  onOpenPwaModal,
  isPwaInstalled
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: NavigationPage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Offers', page: 'offers' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: NavigationPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/90 transition-all shadow-xs">
      <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20 sm:h-22 lg:h-[88px] gap-4">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 sm:gap-3.5 text-left group shrink-0"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 border border-amber-600/30 flex items-center justify-center text-amber-700 group-hover:border-amber-600 group-hover:bg-amber-100/60 transition-all duration-300 shadow-2xs group-hover:shadow-xs">
              <Scissors className="w-5 h-5 sm:w-6 sm:h-6 rotate-45 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-stone-950 block leading-tight">
                {config.salonName}
              </span>
              <span className="text-[10.5px] sm:text-xs text-amber-700 font-semibold tracking-widest uppercase block mt-0.5">
                {config.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation - Centered & Refined (16-18px font scale) */}
          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-1 px-4">
            {navItems.map((item) => {
              const active = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-[16px] xl:text-[17px] tracking-normal transition-all duration-200 py-2 relative ${
                    active 
                      ? 'text-amber-800 font-bold' 
                      : 'text-stone-700 hover:text-stone-950 font-medium hover:font-semibold'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-600 to-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5 lg:gap-3 shrink-0">
            {/* PWA Install App Button */}
            <button
              onClick={onOpenPwaModal}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold border transition-all duration-200 shadow-2xs hover:shadow-xs ${
                isPwaInstalled
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-stone-50/90 text-stone-800 border-stone-200 hover:bg-amber-50/60 hover:border-amber-400 hover:text-amber-900'
              }`}
            >
              {isPwaInstalled ? (
                <>
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>App Installed</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-amber-700" />
                  <span>Install App</span>
                </>
              )}
            </button>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${config.whatsappRaw}?text=Hello%20${encodeURIComponent(config.salonName)},%20I%20would%20like%20to%20book%20an%20appointment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/90 text-emerald-800 border border-emerald-300 hover:border-emerald-400 transition-all duration-200 shadow-2xs hover:shadow-xs text-xs sm:text-[13px] font-semibold"
              title="WhatsApp Booking"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>

            {/* Main Book Appointment Button */}
            <button
              onClick={onOpenBooking}
              className="bg-bronze-gradient text-stone-950 font-bold px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-[13.5px] tracking-wide uppercase shadow-sm hover:shadow-md hover:brightness-105 active:scale-[0.98] transition-all duration-200 flex items-center gap-2 border border-amber-400/40"
            >
              <Calendar className="w-4 h-4 text-stone-950" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="bg-bronze-gradient text-stone-950 text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 sm:hidden shadow-xs active:scale-95 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl bg-stone-100 text-stone-800 hover:text-amber-700 border border-stone-300 flex items-center justify-center focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 sm:px-6 pt-3 pb-6 space-y-3 shadow-xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-stone-200">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`text-left px-3.5 py-2.5 rounded-xl text-[15px] font-medium transition-colors ${
                  currentPage === item.page
                    ? 'bg-amber-50 text-amber-900 border border-amber-300 font-bold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-bronze-gradient text-stone-950 font-bold py-3.5 rounded-xl text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://wa.me/${config.whatsappRaw}?text=Hello%20${encodeURIComponent(config.salonName)},%20I%20would%20like%20to%20book%20an%20appointment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs sm:text-sm font-semibold transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  onOpenPwaModal();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs sm:text-sm font-semibold transition-colors"
              >
                <Download className="w-4 h-4 text-amber-700" />
                <span>{isPwaInstalled ? '✓ Installed' : 'Install App'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
