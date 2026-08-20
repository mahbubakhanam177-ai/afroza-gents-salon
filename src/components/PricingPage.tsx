import React from 'react';
import { PricingSection } from './PricingSection';
import { TemplateConfig } from '../types';

interface PricingPageProps {
  config: TemplateConfig;
  onOpenBooking: (tierId?: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ config, onOpenBooking }) => {
  return (
    <div className="py-12 bg-stone-950 min-h-screen space-y-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-bold text-amber-400 tracking-widest uppercase block mb-2">
          Transparent Dubai Rates
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-stone-100">
          Simple Pricing. Better Grooming.
        </h1>
        <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
          No hidden fees or unexpected charges. Every gentleman gets clear starting rates whether you choose quick essential maintenance or a complete VIP lounge package.
        </p>
      </div>

      <PricingSection config={config} onOpenBooking={onOpenBooking} />
    </div>
  );
};
