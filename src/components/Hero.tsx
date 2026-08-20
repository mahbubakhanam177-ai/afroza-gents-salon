import React from 'react';
import { Calendar, MapPin, MessageSquare, Star, ExternalLink } from 'lucide-react';
import { TemplateConfig, NavigationPage } from '../types';
import { IMAGES } from '../data/salonData';

interface HeroProps {
  config: TemplateConfig;
  onNavigate: (page: NavigationPage) => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onNavigate, onOpenBooking }) => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-900 py-16 lg:py-24">
      {/* Background Hero Image with Soft Warm Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="Afroza Gents Salon International City Dubai"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-100 filter brightness-90 contrast-100"
        />
        {/* Soft Warm Vignette & Gradients for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/65 to-stone-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-6">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-amber-600/40 text-stone-900 text-xs font-semibold tracking-wider uppercase shadow-sm backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>International City Phase 2 / Warsan 4, Dubai</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Sharp Looks. <br />
            <span className="text-bronze-gradient">Fresh Confidence.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl font-medium text-stone-100 tracking-wide font-heading">
            Professional men's grooming in International City, Dubai.
          </p>

          {/* Supporting text */}
          <p className="text-sm sm:text-base text-stone-200 max-w-2xl leading-relaxed">
            From everyday haircuts and beard grooming to a clean, complete grooming experience — visit Afroza Gents Salon for professional men's grooming in Dubai.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenBooking}
              className="bg-bronze-gradient text-stone-950 font-bold px-6 py-3.5 rounded-xl text-sm uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-stone-950" />
              <span>BOOK APPOINTMENT</span>
            </button>

            <a
              href={`https://wa.me/${config.whatsappRaw}?text=Hello%20Afroza%20Gents%20Salon%2C%20I%20would%20like%20to%20book%20an%20appointment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl text-sm uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WHATSAPP US</span>
            </a>

            <a
              href={config.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 hover:bg-white text-stone-900 font-semibold px-5 py-3.5 rounded-xl text-sm uppercase tracking-wider border border-amber-600/30 backdrop-blur-md transition-all flex items-center gap-2 shadow-sm"
            >
              <MapPin className="w-4 h-4 text-amber-700" />
              <span>GET DIRECTIONS</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
            </a>
          </div>

          {/* Quick Info Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-stone-200 border-t border-white/20">
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{config.googleRating} / 5</span>
              <span className="text-stone-300 font-normal">({config.googleReviewCount} Google Reviews)</span>
            </div>
            <div className="h-3 w-px bg-white/20 hidden sm:block" />
            <div>
              Open Daily: <span className="text-white font-semibold">{config.workingHoursMonSat}</span>
            </div>
            <div className="h-3 w-px bg-white/20 hidden sm:block" />
            <div>
              Walk-ins & Appointments Welcome
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

