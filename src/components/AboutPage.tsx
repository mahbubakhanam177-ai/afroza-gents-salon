import React from 'react';
import { Shield, Users, HeartHandshake, MapPin, Calendar, MessageSquare } from 'lucide-react';
import { TemplateConfig } from '../types';
import { IMAGES } from '../data/salonData';

interface AboutPageProps {
  config: TemplateConfig;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ config, onOpenBooking }) => {
  return (
    <div className="py-16 bg-stone-950 min-h-screen space-y-16 animate-fadeIn">
      
      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 lg:p-12 overflow-hidden relative shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-400 tracking-widest uppercase font-mono">
                About Afroza Gents Salon
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-100">
                Professional Men's Grooming in International City, Dubai
              </h1>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                <strong>{config.salonName}</strong> is a dedicated men's salon located in International City Phase 2 / Warsan 4, Dubai. We provide clean, reliable haircuts, beard trimming, head shaves, and traditional hot towel shaves for residents, workers, and visitors.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={onOpenBooking}
                  className="bg-bronze-gradient text-stone-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 hover:brightness-110 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </button>
                <a
                  href={`https://wa.me/${config.whatsappRaw}?text=Hello%20Afroza%20Gents%20Salon%2C%20I%20have%20a%20question.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-stone-800 h-72 lg:h-96 relative">
              <img
                src={IMAGES.interior}
                alt="Afroza Gents Salon Dubai Interior"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Salon Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-stone-100">
            Our Service Commitment
          </h2>
          <p className="text-sm text-stone-300 mt-2">
            Providing practical, clean, and professional grooming for every client who walks through our doors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-stone-900/80 p-6 rounded-2xl border border-stone-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-stone-100 text-lg">Everyday Grooming</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Tailored haircuts and beard trims for daily comfort, work presentability, and personal confidence.
            </p>
          </div>

          <div className="bg-stone-900/80 p-6 rounded-2xl border border-stone-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-stone-100 text-lg">Clean Hygiene</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Clean tools, sanitized equipment, single-use razor blades, and fresh towels for every service.
            </p>
          </div>

          <div className="bg-stone-900/80 p-6 rounded-2xl border border-stone-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-stone-100 text-lg">Welcoming Atmosphere</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Serving a broad clientele in International City — residents, workers, drivers, and visitors from across Dubai.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

