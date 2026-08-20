import React from 'react';
import { MapPin, Clock, MessageSquare, Settings2, Sparkles } from 'lucide-react';
import { TemplateConfig } from '../types';

interface TopInfoBarProps {
  config: TemplateConfig;
  onOpenCustomizer: () => void;
}

export const TopInfoBar: React.FC<TopInfoBarProps> = ({ config, onOpenCustomizer }) => {
  return (
    <div className="w-full bg-[#F4F1EA] text-[#2E2822] border-b border-[#E3DDD1] py-2.5 sm:py-3 px-4 sm:px-6 lg:px-10 transition-colors">
      <div className="max-w-[1550px] mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        
        {/* Left: Location & Working Hours */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs sm:text-[13.5px] font-medium">
          {/* Address */}
          <div className="flex items-center gap-2 text-stone-800 hover:text-amber-800 transition-colors">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="truncate max-w-[260px] sm:max-w-md font-medium text-stone-800">{config.address}</span>
          </div>

          <div className="h-3.5 w-px bg-stone-300 hidden md:block" />

          {/* Opening Hours */}
          <div className="hidden md:flex items-center gap-2 text-stone-700">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong className="font-semibold text-stone-800">Mon–Sat:</strong> {config.workingHoursMonSat} 
              <span className="mx-1.5 text-stone-400">•</span> 
              <strong className="font-semibold text-stone-800">Sun:</strong> {config.workingHoursSun}
            </span>
          </div>
        </div>

        {/* Right: WhatsApp CTA & Template Customizer */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto text-xs sm:text-[13.5px]">
          {/* Direct WhatsApp Callout */}
          <a
            href={`https://wa.me/${config.whatsappRaw}?text=Hello%20${encodeURIComponent(config.salonName)},%20I%20would%20like%20to%20ask%20a%20question.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 transition-colors font-semibold group py-0.5"
            title="Chat directly on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-medium text-stone-600">WhatsApp:</span>
            <span className="text-emerald-800 font-bold">{config.whatsapp}</span>
          </a>

          <div className="h-3.5 w-px bg-stone-300 hidden sm:block" />

          {/* Master Template Customizer Button */}
          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-600/30 px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-2xs hover:shadow-xs"
            title="Configure Salon Branding Template"
          >
            <Settings2 className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden xs:inline">Template Settings</span>
            <Sparkles className="w-3 h-3 text-amber-600" />
          </button>
        </div>

      </div>
    </div>
  );
};

