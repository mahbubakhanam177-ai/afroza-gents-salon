import React from 'react';
import { Check, Star, Calendar } from 'lucide-react';
import { TemplateConfig, PricingTier } from '../types';
import { pricingTiers } from '../data/salonData';

interface PricingSectionProps {
  config: TemplateConfig;
  onOpenBooking: (tierId?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ config, onOpenBooking }) => {
  return (
    <section className="py-20 bg-white border-b border-stone-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-700 tracking-widest uppercase mb-2 block">
            Transparent Tiered Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-stone-900 tracking-tight">
            Good Grooming. Fair Prices.
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Whether you need a quick everyday haircut or a complete premium grooming experience, choose the service that fits your style and schedule.
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier: PricingTier) => {
            const isClassic = tier.id === 'classic';
            return (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isClassic
                    ? 'bg-white border-2 border-amber-600 shadow-2xl shadow-amber-900/10 lg:-translate-y-2'
                    : 'bg-[#FAF8F5] border border-stone-200 hover:border-stone-300 shadow-xs'
                }`}
              >
                {/* Popular Badge */}
                {tier.popularBadge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-bronze-gradient text-stone-950 font-bold px-4 py-1 rounded-full text-xs uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-stone-950 text-stone-950" />
                    <span>{tier.popularBadge}</span>
                  </div>
                )}

                <div>
                  {/* Title & Subtitle */}
                  <div className="mb-4 text-center sm:text-left">
                    <h3 className="font-display text-xl font-bold text-stone-900 uppercase tracking-wider">
                      {tier.title}
                    </h3>
                    <p className="text-xs text-amber-700 font-semibold tracking-wide">
                      {tier.subtitle}
                    </p>
                  </div>

                  {/* Price Header */}
                  <div className="my-6 pb-6 border-b border-stone-200 text-center sm:text-left">
                    <span className="text-xs text-stone-500 uppercase tracking-wider block mb-1">Starting From</span>
                    <div className="flex items-baseline justify-center sm:justify-start gap-1">
                      <span className="text-stone-600 text-sm font-semibold">{config.currency}</span>
                      <span className="text-4xl sm:text-5xl font-extrabold font-display text-stone-900">{tier.startingPrice}</span>
                    </div>
                    <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Audience Badge */}
                  <div className="mb-6 p-3 bg-stone-100 rounded-xl border border-stone-200 text-[11px] text-stone-700">
                    <span className="font-semibold text-amber-800 block mb-0.5">Recommended For:</span>
                    {tier.targetAudience}
                  </div>

                  {/* Included Services List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-semibold text-stone-950 uppercase tracking-wider block">
                      Services & Options:
                    </span>
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                        <div className="w-4 h-4 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 mt-0.5 text-amber-800">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                <button
                  onClick={() => onOpenBooking(tier.id)}
                  className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isClassic
                      ? 'bg-bronze-gradient text-stone-950 hover:brightness-105 shadow-md'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book {tier.title} Service</span>
                </button>

              </div>
            );
          })}
        </div>

        {/* Pricing Disclaimer */}
        <div className="mt-12 text-center max-w-2xl mx-auto p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs text-stone-600 shadow-xs">
          <p>
            ℹ️ <span className="text-stone-900 font-medium">Demo Pricing Notice:</span> Prices shown are demo starting prices and may vary by service combination, hair length, specialized products, or salon policy. All services clearly communicated before cutting begins.
          </p>
        </div>

      </div>
    </section>
  );
};
