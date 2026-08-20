import React from 'react';
import { Crown, Sparkles, ArrowRight, Calendar } from 'lucide-react';
import { TemplateConfig, ServiceItem, NavigationPage } from '../types';
import { IMAGES } from '../data/salonData';
import { useSalon } from '../context/SalonContext';

interface PremiumGroomingSectionProps {
  config: TemplateConfig;
  onNavigate: (page: NavigationPage) => void;
  onOpenBooking: (serviceId?: string) => void;
  onSelectService: (service: ServiceItem) => void;
}

export const PremiumGroomingSection: React.FC<PremiumGroomingSectionProps> = ({
  config,
  onNavigate,
  onOpenBooking,
  onSelectService
}) => {
  const { services } = useSalon();
  const premiumServices = services
    .filter((s) => (s.tier === 'premium' || s.tier === 'classic') && s.isActive !== false)
    .slice(0, 4);

  return (
    <section className="py-20 bg-white relative overflow-hidden border-b border-stone-200">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <Crown className="w-3.5 h-3.5" />
              <span>Elevated Executive Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-stone-900">
              Upgrade Your Grooming
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-xl">
              For occasions, business meetings, international travel, and when you simply want a luxury grooming ritual with master barbers.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="text-amber-700 hover:text-amber-800 text-sm font-semibold flex items-center gap-1.5 shrink-0 hover:underline"
          >
            <span>Explore Premium Grooming</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 2x2 or 4-col Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {premiumServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#FAF8F5] rounded-2xl border border-stone-200 hover:border-amber-600/50 overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-md"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image || IMAGES.happyClient}
                  alt={service.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
                
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md border border-amber-600/40 px-2.5 py-1 rounded-full text-xs font-bold text-amber-800 shadow-xs">
                  From {config.currency} {service.startingPrice}
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] font-semibold text-stone-900 bg-white/90 px-2.5 py-0.5 rounded-full border border-stone-200 shadow-xs">
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  <span>{service.duration}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-stone-900 text-base group-hover:text-amber-700 transition-colors mb-2">
                    {service.name}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-stone-200">
                  <button
                    onClick={() => onSelectService(service)}
                    className="w-full text-center text-xs text-amber-700 hover:underline font-semibold"
                  >
                    View Included Treatments →
                  </button>

                  <button
                    onClick={() => onOpenBooking(service.id)}
                    className="w-full bg-bronze-gradient text-stone-950 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-105 transition-all shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5 text-stone-950" />
                    <span>Book Experience</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
