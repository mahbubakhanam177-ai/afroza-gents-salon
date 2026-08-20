import React from 'react';
import { X, Calendar, Clock, Check, Sparkles, AlertCircle } from 'lucide-react';
import { TemplateConfig, ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  config: TemplateConfig;
  onOpenBooking: (serviceId?: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  config,
  onOpenBooking,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Header Image Bar */}
        <div className="relative h-56 sm:h-64 shrink-0 overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-950/80 border border-stone-700 flex items-center justify-center text-stone-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Service Title overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-stone-950/90 px-3 py-1 rounded-full border border-amber-500/30 inline-block mb-1">
              {service.category.toUpperCase()} • {service.tier.toUpperCase()} TIER
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              {service.name}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Price & Duration banner */}
          <div className="flex items-center justify-between p-4 bg-stone-950 rounded-xl border border-stone-800">
            <div>
              <span className="text-xs text-stone-400 block uppercase tracking-wider">Starting Price</span>
              <span className="text-2xl font-extrabold font-display text-amber-400">
                {config.currency} {service.startingPrice}
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs text-stone-400 block uppercase tracking-wider">Est. Duration</span>
              <span className="text-sm font-bold text-stone-200 flex items-center justify-end gap-1">
                <Clock className="w-4 h-4 text-amber-400" />
                {service.duration}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-1">
              Service Description
            </h4>
            <p className="text-sm text-stone-300 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Key Benefits */}
          <div>
            <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
              Key Service Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-stone-300 bg-stone-950/60 p-2.5 rounded-lg border border-stone-800">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What to Expect */}
          <div className="space-y-3 pt-2 border-t border-stone-800">
            <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/20 text-xs text-stone-300">
              <span className="font-bold text-amber-400 block mb-1">What To Expect:</span>
              <p>{service.whatToExpect}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800">
                <span className="font-bold text-stone-200 block mb-1">Preparation:</span>
                <p className="text-stone-400">{service.preparation}</p>
              </div>

              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800">
                <span className="font-bold text-stone-200 block mb-1">Aftercare Tip:</span>
                <p className="text-stone-400">{service.aftercare}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer CTA */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="text-xs text-stone-400 hover:text-stone-200 font-medium px-4 py-2"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenBooking(service.id);
            }}
            className="bg-bronze-gradient text-stone-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 hover:brightness-110 shadow-lg"
          >
            <Calendar className="w-4 h-4" />
            <span>Book This Service</span>
          </button>
        </div>

      </div>
    </div>
  );
};
