import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { GalleryItem } from '../types';
import { useSalon } from '../context/SalonContext';

export const GallerySection: React.FC = () => {
  const { gallery } = useSalon();
  const activeGallery = gallery.filter(g => g.isActive !== false);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'all' 
    ? activeGallery 
    : activeGallery.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'haircuts', label: 'Haircuts & Fades' },
    { id: 'beard', label: 'Beard Grooming' },
    { id: 'skincare', label: 'Facials & Treatments' },
    { id: 'interior', label: 'Salon Interior' },
  ];

  return (
    <section className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-amber-700 tracking-widest uppercase mb-2 block">
            Craftsmanship in Action
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-stone-900">
            Grooming Gallery
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            A glimpse into our salon environment, barbershop interior, and real client grooming results.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-bronze-gradient text-stone-950 shadow-sm font-bold'
                  : 'bg-[#FAF8F5] text-stone-700 hover:text-stone-900 border border-stone-200 hover:border-amber-600/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden bg-[#FAF8F5] border border-stone-200 cursor-pointer shadow-xs aspect-[4/3]"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute inset-0 p-5 flex flex-col justify-end text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-stone-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30 w-max mb-1">
                  {item.category}
                </span>
                <h3 className="font-heading font-bold text-stone-100 text-base group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-1 opacity-90">
                  {item.description}
                </p>
              </div>

              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-950/80 border border-stone-700 flex items-center justify-center text-amber-400 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Accessible Full-screen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700 z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700 z-50"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image & Description Container */}
          <div className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center">
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl border border-stone-800 shadow-2xl"
            />
            <div className="mt-4 text-center">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-1">
                {filteredItems[lightboxIndex].category} • Photo {lightboxIndex + 1} of {filteredItems.length}
              </span>
              <h3 className="font-heading text-xl font-bold text-stone-100">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-lg mx-auto">
                {filteredItems[lightboxIndex].description}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700 z-50"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
