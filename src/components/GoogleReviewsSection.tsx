import React from 'react';
import { Star, ExternalLink, MapPin, CheckCircle } from 'lucide-react';
import { TemplateConfig } from '../types';

interface GoogleReviewsSectionProps {
  config: TemplateConfig;
}

export const GoogleReviewsSection: React.FC<GoogleReviewsSectionProps> = ({ config }) => {
  return (
    <section id="google-reviews" className="py-16 sm:py-20 bg-[#F5F2EC] border-b border-stone-200 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 text-center relative overflow-hidden shadow-md">
          
          {/* Subtle Ambient Background Accent Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

          {/* Header Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-6">
            <svg className="w-4 h-4 fill-current text-amber-700" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            <span>Google Customer Reviews</span>
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-stone-900 tracking-tight">
            What Our Customers Say
          </h2>

          <p className="mt-3 text-stone-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Rated {config.googleRating}/5 on Google based on customer feedback.
          </p>

          {/* Prominent Rating Card Box */}
          <div className="my-8 inline-flex flex-col sm:flex-row items-center justify-center gap-4 bg-[#FAF8F5] border border-stone-200 px-8 py-5 rounded-2xl shadow-xs">
            <div className="flex items-center gap-1.5 text-amber-600">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-7 h-7 fill-amber-500 text-amber-500" />
              ))}
            </div>
            
            <div className="text-center sm:text-left">
              <span className="text-2xl sm:text-3xl font-black text-stone-900 block sm:inline font-display">
                {config.googleRating} / 5
              </span>
              <span className="text-sm text-stone-600 sm:ml-3 font-medium">
                ({config.googleReviewCount} Google Reviews)
              </span>
            </div>
          </div>

          {/* Notice & CTA Button */}
          <div className="max-w-xl mx-auto space-y-6">
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              See what customers are saying about <strong className="text-stone-900">{config.salonName}</strong> on Google.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={config.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-bronze-gradient text-stone-950 font-extrabold text-sm sm:text-base uppercase tracking-wider transition-all transform hover:brightness-105 shadow-md active:translate-y-0"
              >
                <span>View All Google Reviews</span>
                <ExternalLink className="w-4 h-4 stroke-[2.5] text-stone-950" />
              </a>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-stone-500">
              <MapPin className="w-4 h-4 text-amber-700" />
              <span>Verified Google Business Listing • {config.locationArea}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
