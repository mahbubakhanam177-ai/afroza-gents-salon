import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Navigation, Calendar, ExternalLink } from 'lucide-react';
import { TemplateConfig } from '../types';

interface DubaiLocationSectionProps {
  config: TemplateConfig;
  onOpenBooking: () => void;
}

export const DubaiLocationSection: React.FC<DubaiLocationSectionProps> = ({ config, onOpenBooking }) => {
  return (
    <section id="location" className="py-16 sm:py-20 bg-[#F5F2EC] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-700 tracking-widest uppercase mb-2 block font-mono">
            Location & Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-stone-900">
            Find Afroza Gents Salon
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Located in International City Phase 2 / Warsan 4, Dubai, UAE. Welcoming walk-ins and appointments.
          </p>
        </div>

        {/* Location Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Info Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <h3 className="font-heading text-xl font-bold text-stone-900 pb-3 border-b border-stone-200">
                Salon Contact & Hours
              </h3>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Address</span>
                  <p className="text-sm text-stone-900 font-medium mt-0.5">{config.address}</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Opening Hours</span>
                  <p className="text-sm text-stone-900 font-medium mt-0.5">Every Day: {config.workingHoursMonSat}</p>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Phone & WhatsApp</span>
                  <a href={`tel:${config.phone.replace(/\s+/g, '')}`} className="text-sm text-amber-700 font-bold hover:underline block mt-0.5">
                    {config.phone}
                  </a>
                  <a
                    href={`https://wa.me/${config.whatsappRaw}?text=Hello%20Afroza%20Gents%20Salon%2C%20I%20need%20directions%20to%20your%20salon.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-700 font-semibold hover:underline block mt-0.5"
                  >
                    WhatsApp: {config.whatsapp}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 border-t border-stone-200 space-y-3">
              <a
                href={config.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-bronze-gradient text-stone-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm hover:brightness-105"
              >
                <Navigation className="w-4 h-4 fill-stone-950 text-stone-950" />
                <span>GET DIRECTIONS ON GOOGLE MAPS</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${config.phone.replace(/\s+/g, '')}`}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-900 font-medium py-2.5 rounded-xl text-xs border border-stone-300 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-700" />
                  <span>CALL NOW</span>
                </a>

                <a
                  href={`https://wa.me/${config.whatsappRaw}?text=Hello%20Afroza%20Gents%20Salon%2C%20I%20would%20like%20to%20ask%20a%20question.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WHATSAPP</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Map Preview Container (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 overflow-hidden relative min-h-[380px] flex flex-col justify-between p-6 shadow-sm">
            
            {/* Map Frame */}
            <div className="absolute inset-0 bg-[#FAF8F5]">
              <iframe
                title="Afroza Gents Salon Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1!2d55.409!3d25.158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6630f9a56c07%3A0xfVroDt5YXfmSTfnGA!2sWarsan%204%2C%20International%20City%20Phase%202%2C%20Dubai!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0, opacity: 0.95 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Floating Location Marker Card */}
            <div className="relative z-10 bg-white/95 border border-stone-200 p-4 rounded-xl max-w-sm backdrop-blur-md shadow-lg mt-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-bronze-gradient text-stone-950 font-bold flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 fill-stone-950 text-stone-950" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-stone-900 text-sm">
                    {config.salonName}
                  </h4>
                  <p className="text-xs text-stone-600">
                    International City Phase 2 / Warsan 4, Dubai
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

