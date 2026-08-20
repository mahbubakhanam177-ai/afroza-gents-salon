import React from 'react';
import { Star, ExternalLink, MapPin, User, Quote } from 'lucide-react';
import { TemplateConfig } from '../types';
import { useSalon } from '../context/SalonContext';

interface TestimonialsSectionProps {
  config: TemplateConfig;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ config }) => {
  const { reviews } = useSalon();
  const approvedReviews = reviews.filter(r => r.isApproved !== false);

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-stone-900 border-b border-stone-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Card Wrapper */}
        <div className="bg-stone-950 rounded-3xl border border-stone-800 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle Background Accent Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-700/80 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            <span>Google Reviews</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-stone-100 tracking-tight">
            What Our Customers Say
          </h2>

          {/* Subheadline */}
          <p className="mt-3 text-stone-300 text-base sm:text-lg max-w-2xl mx-auto">
            Rated {config.googleRating}/5 on Google based on customer feedback.
          </p>

          {/* Prominent Rating Rating Badge */}
          <div className="my-8 inline-flex flex-col sm:flex-row items-center justify-center gap-4 bg-stone-900/90 border border-stone-800 px-6 py-4 rounded-2xl">
            <div className="flex items-center gap-1.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-center sm:text-left">
              <span className="text-2xl font-black text-stone-100 block sm:inline font-mono">
                ⭐ {config.googleRating} / 5
              </span>
              <span className="text-sm text-stone-400 sm:ml-2">
                based on {config.googleReviewCount} Google Reviews
              </span>
            </div>
          </div>

          {/* Description & Action */}
          <div className="max-w-xl mx-auto mt-2">
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
              See what customers are saying about {config.salonName} on Google.
            </p>

            <a
              href={config.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-base transition-all transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/20 active:translate-y-0"
            >
              <span>READ REVIEWS ON GOOGLE</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Verified Google Business Profile • {config.locationArea}</span>
            </div>
          </div>

        </div>

        {/* Customer Reviews Cards Grid (Approved Only) */}
        {approvedReviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedReviews.map((item) => (
              <div 
                key={item.id}
                className="bg-stone-950 border border-stone-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl hover:border-amber-500/30 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-stone-700 group-hover:text-amber-500/40 transition-colors" />
                  </div>

                  <p className="text-stone-300 text-sm italic leading-relaxed">
                    "{item.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                      {item.clientName.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-stone-100 text-xs block">{item.clientName}</span>
                      <span className="text-[10px] text-amber-400/90 font-medium">{item.clientType}</span>
                    </div>
                  </div>
                  {item.service && (
                    <span className="text-[10px] text-stone-400 bg-stone-900 border border-stone-800 px-2.5 py-1 rounded-md">
                      {item.service}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

