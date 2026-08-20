import React from 'react';
import { Tag, Calendar, Check, AlertCircle } from 'lucide-react';
import { TemplateConfig } from '../types';
import { useSalon } from '../context/SalonContext';

interface OffersSectionProps {
  config: TemplateConfig;
  onOpenBooking: (offerTitle?: string) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ config, onOpenBooking }) => {
  const { offers } = useSalon();
  const activeOffers = offers.filter(o => {
    const isExpired = o.endDate && new Date(o.endDate) < new Date();
    return o.isActive !== false && !isExpired;
  });

  return (
    <section className="py-20 bg-[#F5F2EC] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>Special Value Bundles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-stone-900">
            Featured Grooming Offers
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Save on curated service combinations designed for workdays, business events, and weekend refreshers.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl border border-stone-200 hover:border-amber-600/50 p-6 flex flex-col justify-between relative transition-all group shadow-xs"
            >
              <div>
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-50 text-amber-800 border border-amber-300 px-2.5 py-1 rounded-full">
                    {offer.badge}
                  </span>
                  <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-mono">
                    SPECIAL OFFER
                  </span>
                </div>

                {/* Offer Title */}
                <h3 className="font-heading font-bold text-stone-900 text-lg group-hover:text-amber-700 transition-colors mb-2">
                  {offer.title}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-extrabold font-display text-amber-800">
                    {config.currency} {offer.price}
                  </span>
                  {offer.originalPrice && (
                    <span className="text-xs text-stone-400 line-through font-medium">
                      {config.currency} {offer.originalPrice}
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                  {offer.description}
                </p>

                {/* Included Services */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-semibold text-stone-900 uppercase tracking-wider block">
                    Included Services:
                  </span>
                  {offer.includedServices.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                      <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] text-stone-500 italic mb-4">
                  ⏳ {offer.validity}
                </p>

                <button
                  onClick={() => onOpenBooking(offer.title)}
                  className="w-full bg-bronze-gradient text-stone-950 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-105 transition-all shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5 text-stone-950" />
                  <span>Claim Offer</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
