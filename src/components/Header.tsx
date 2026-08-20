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
    <header className="sticky top-[33px] z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-stone-100 border border-amber-600/30 flex items-center justify-center text-amber-700 group-hover:border-amber-600 group-hover:bg-amber-50 transition-all shadow-xs">
              <Scissors className="w-5 h-5 rotate-45 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-stone-900 block leading-tight">
                {config.salonName}
              </span>
              <span className="text-[10px] text-amber-700 tracking-widest uppercase font-semibold block">
                {config.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const active = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-sm font-medium transition-colors py-1 relative ${
                    active 
                      ? 'text-amber-700 font-semibold' 
                      : 'text-stone-700 hover:text-stone-950'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* PWA Install App Button */}
            <button
              onClick={onOpenPwaModal}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                isPwaInstalled
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-stone-50 text-stone-800 border-stone-200 hover:border-amber-500/50 hover:text-amber-800'
              }`}
            >
              {isPwaInstalled ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>App Installed</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-amber-700" />
                  <span>Install App</span>
                </>
              )}
            </button>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${config.whatsappRaw}?text=Hello%20${encodeURIComponent(config.salonName)},%20I%20would%20like%20to%20book%20an%20appointment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 transition-colors"
              title="WhatsApp Booking"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            {/* Main Book Button */}
            <button
              onClick={onOpenBooking}
              className="bg-bronze-gradient text-stone-950 font-semibold px-4 py-2.5 rounded-lg text-xs sm:text-sm tracking-wide uppercase shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-stone-950" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="bg-bronze-gradient text-stone-950 text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1 sm:hidden shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-stone-100 text-stone-800 hover:text-amber-700 border border-stone-300 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-stone-200">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'bg-amber-50 text-amber-800 border border-amber-300 font-semibold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-bronze-gradient text-stone-950 font-semibold py-3 rounded-lg text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://wa.me/${config.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  onOpenPwaModal();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-stone-100 text-stone-800 border border-stone-300 text-xs font-medium"
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
