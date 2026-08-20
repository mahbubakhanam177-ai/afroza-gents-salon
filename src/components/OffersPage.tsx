import React from 'react';
import { OffersSection } from './OffersSection';
import { TemplateConfig } from '../types';

interface OffersPageProps {
  config: TemplateConfig;
  onOpenBooking: (offerTitle?: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({ config, onOpenBooking }) => {
  return (
    <div className="py-12 bg-stone-950 min-h-screen space-y-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-bold text-amber-400 tracking-widest uppercase block mb-2">
          Promotional Grooming Bundles
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-stone-100">
          Exclusive Salon Packages & Offers
        </h1>
        <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
          Curated combinations designed for corporate professionals, weekend relaxations, and first-time salon visitors in Dubai.
        </p>
      </div>

      <OffersSection config={config} onOpenBooking={onOpenBooking} />
    </div>
  );
};
