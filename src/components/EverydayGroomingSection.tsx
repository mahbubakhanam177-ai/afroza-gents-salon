import React from 'react';
import { Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TemplateConfig, ServiceItem, NavigationPage } from '../types';
import { useSalon } from '../context/SalonContext';

interface EverydayGroomingSectionProps {
  config: TemplateConfig;
  onNavigate: (page: NavigationPage) => void;
  onOpenBooking: (serviceId?: string) => void;
  onSelectService: (service: ServiceItem) => void;
}

export const EverydayGroomingSection: React.FC<EverydayGroomingSectionProps> = ({
  config,
  onNavigate,
  onOpenBooking,
  onSelectService
}) => {
  const { services } = useSalon();
  const everydayServices = services
    .filter((s) => s.tier === 'essential' && s.isActive !== false)
    .slice(0, 4);

  return (
    <section className="py-16 bg-[#F5F2EC] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Everyday Value Grooming</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              Fresh Look. Fair Price.
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Professional grooming for your everyday routine. Fast, clean, and reliable cuts for every hardworking man in Dubai.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="text-amber-700 hover:text-amber-800 text-sm font-semibold flex items-center gap-1.5 shrink-0 hover:underline"
          >
            <span>View All Everyday Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Everyday Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {everydayServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col justify-between hover:border-amber-600/40 transition-all group shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200">
                    ⏱ {service.duration}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                    From {config.currency} {service.startingPrice}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-stone-900 text-base group-hover:text-amber-700 transition-colors mb-2">
                  {service.name}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                <button
                  onClick={() => onSelectService(service)}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs py-2 rounded-lg border border-stone-300 font-medium transition-colors"
                >
                  Details
                </button>
                <button
                  onClick={() => onOpenBooking(service.id)}
                  className="bg-bronze-gradient text-stone-950 text-xs py-2 px-3 rounded-lg font-bold flex items-center gap-1 transition-colors shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-stone-950" />
                  <span>Book</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
