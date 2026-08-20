import React, { useState } from 'react';
import { Search, Calendar, Clock, Sparkles } from 'lucide-react';
import { TemplateConfig, ServiceItem, ServiceCategory } from '../types';
import { useSalon } from '../context/SalonContext';

interface ServicesPageProps {
  config: TemplateConfig;
  onOpenBooking: (serviceId?: string) => void;
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  config,
  onOpenBooking,
  onSelectService,
}) => {
  const { services } = useSalon();
  const availableServices = services.filter(s => s.isActive !== false);

  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: ServiceCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Services' },
    { id: 'haircuts', label: 'Haircuts' },
    { id: 'beard', label: 'Beard Grooming' },
    { id: 'shaving', label: 'Shaving' },
    { id: 'styling', label: 'Hair Styling' },
    { id: 'skincare', label: 'Facial & Skincare' },
    { id: 'treatments', label: 'Hair & Scalp Treatments' },
  ];

  const filteredServices = availableServices.filter(s => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-16 bg-stone-950 min-h-screen space-y-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-amber-400 tracking-widest uppercase block mb-2">
            Dubai Service Menu
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-stone-100">
            Services & Grooming Menu
          </h1>
          <p className="mt-2 text-stone-300 text-sm sm:text-base">
            Select a service category or search for specific haircut, beard sculpting, or facial treatments.
          </p>
        </div>

        {/* Search & Category Tabs */}
        <div className="space-y-4 max-w-4xl mx-auto mb-10">
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g. skin fade, beard, facial)..."
              className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-100 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                    : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-stone-900/80 rounded-2xl border border-stone-800 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    {service.tier.toUpperCase()} TIER
                  </span>
                  <span className="text-xs font-bold text-stone-200 bg-stone-950 px-2.5 py-1 rounded-md border border-stone-800">
                    From {config.currency} {service.startingPrice}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-stone-100 text-lg group-hover:text-amber-400 transition-colors mb-2">
                  {service.name}
                </h3>

                <p className="text-xs text-stone-400 leading-relaxed mb-4 line-clamp-3">
                  {service.description}
                </p>

                <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-4">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Duration: {service.duration}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center gap-2">
                <button
                  onClick={() => onSelectService(service)}
                  className="flex-1 bg-stone-950 hover:bg-stone-800 text-stone-300 text-xs py-2.5 rounded-xl border border-stone-800 font-medium transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => onOpenBooking(service.id)}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
