import React from 'react';
import { Award, Sparkles, DollarSign, Globe2 } from 'lucide-react';

export const TrustValueSection: React.FC = () => {
  const valuePoints = [
    {
      icon: Award,
      title: 'Skilled Barbers',
      description: 'Experienced master barbers trained in classic scissor cuts, precision fades, and expert beard sculpting across all hair textures.',
    },
    {
      icon: Sparkles,
      title: 'Clean & Comfortable',
      description: 'Strict hygiene protocols, UV blade sanitizers, hot steam towels, and air-conditioned lounge comfort for every visitor.',
    },
    {
      icon: DollarSign,
      title: 'Fair, Transparent Pricing',
      description: 'Upfront prices starting from AED 15 with zero hidden fees. Quality grooming tailored to your budget.',
    },
    {
      icon: Globe2,
      title: 'International Clientele',
      description: 'Proudly serving Dubai’s diverse community — drivers, professionals, workers, executives, and tourists with equal respect.',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-stone-900">
            Professional Grooming Without the Complication
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            Four promises that ensure a consistent, high-standard experience every time you sit in our chair.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valuePoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <div
                key={index}
                className="bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200 hover:border-amber-600/40 transition-all group shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4 group-hover:scale-110 group-hover:bg-amber-100 transition-all">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-heading text-stone-900 mb-2">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
