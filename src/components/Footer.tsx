import React from 'react';
import { 
  Scissors, 
  Smartphone, 
  Download, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  MessageSquare, 
  Calendar,
  Check
} from 'lucide-react';
import { TemplateConfig, NavigationPage } from '../types';

interface FooterProps {
  config: TemplateConfig;
  onNavigate: (page: NavigationPage) => void;
  onOpenBooking: () => void;
  onOpenPwaModal: () => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'refunds' | 'cookies' | 'disclaimer') => void;
  isPwaInstalled: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onNavigate,
  onOpenBooking,
  onOpenPwaModal,
  onOpenLegal,
  isPwaInstalled
}) => {
  return (
    <footer className="bg-[#1A1816] text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top App Download Footer Banner Card */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/40 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-2xl mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Smartphone className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-stone-100 text-lg sm:text-xl">
                Download Our App
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-lg mt-0.5">
                Book appointments, explore services, and stay updated with our latest grooming offers directly from your home screen.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenPwaModal}
            className={`px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 shrink-0 transition-all ${
              isPwaInstalled
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                : 'bg-bronze-gradient text-stone-950 hover:brightness-110 shadow-lg'
            }`}
          >
            {isPwaInstalled ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>App Installed</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-stone-950" />
                <span>Install App</span>
              </>
            )}
          </button>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand Info (2 cols width) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-stone-900 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Scissors className="w-5 h-5 rotate-45" />
              </div>
              <div>
                <span className="font-display text-xl font-bold tracking-wider text-stone-100 block">
                  {config.salonName}
                </span>
                <span className="text-[10px] text-amber-400 tracking-widest uppercase font-medium block">
                  {config.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Professional men's grooming for residents, professionals, workers, and international visitors in Dubai. Exceptional hair, beard, facial, and shaving care tailored to every gentleman.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://instagram.com/${config.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${config.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                title="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenBooking}
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ml-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-stone-100 text-sm uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                  About Our Salon
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-amber-400 transition-colors">
                  All Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-amber-400 transition-colors">
                  Pricing Tiers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-amber-400 transition-colors">
                  Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('offers')} className="hover:text-amber-400 transition-colors">
                  Special Offers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-amber-400 transition-colors">
                  Contact & Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Services */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-stone-100 text-sm uppercase tracking-wider">
              Grooming Services
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Gentlemen Haircut (From AED 20)</li>
              <li>Beard Trimming & Shaping (From AED 15)</li>
              <li>Hot Towel Razor Shave (From AED 20)</li>
              <li>Hair Color & Grey Blending (From AED 35)</li>
              <li>Deep Cleansing Facial (From AED 30)</li>
              <li>Complete Grooming Combo (From AED 50)</li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-stone-100 text-sm uppercase tracking-wider">
              Dubai Salon Info
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{config.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${config.phone}`} className="hover:text-amber-400">{config.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${config.email}`} className="hover:text-amber-400">{config.email}</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            © 2026 <span className="text-stone-300 font-bold">{config.salonName}</span>. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <button onClick={() => onOpenLegal('privacy')} className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onOpenLegal('terms')} className="hover:text-amber-400 transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => onOpenLegal('refunds')} className="hover:text-amber-400 transition-colors">
              Cancellation Policy
            </button>
            <button onClick={() => onOpenLegal('cookies')} className="hover:text-amber-400 transition-colors">
              Cookie Policy
            </button>
            <button onClick={() => onOpenLegal('disclaimer')} className="hover:text-amber-400 transition-colors">
              Disclaimer
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
