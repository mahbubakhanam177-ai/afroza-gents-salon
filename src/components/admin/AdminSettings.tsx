import React, { useState } from 'react';
import { Save, CheckCircle, Store, Phone, MapPin, Clock, DollarSign, Globe, Info } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';

export const AdminSettings: React.FC = () => {
  const { config, updateConfig } = useSalon();

  const [formData, setFormData] = useState({
    salonName: config.salonName,
    tagline: config.tagline,
    phone: config.phone,
    whatsapp: config.whatsapp,
    whatsappRaw: config.whatsappRaw,
    email: config.email,
    instagram: config.instagram,
    address: config.address,
    locationArea: config.locationArea,
    workingHoursMonSat: config.workingHoursMonSat,
    workingHoursSun: config.workingHoursSun,
    googleMapsUrl: config.googleMapsUrl,
    currency: config.currency,
    priceNotice: config.priceNotice,
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateConfig({
      ...config,
      ...formData
    });

    setNotification('Salon business settings updated successfully across the entire website!');
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Page Header */}
      <div className="border-b border-stone-800 pb-5">
        <h1 className="font-display text-2xl font-bold text-stone-100">
          Salon Business Settings
        </h1>
        <p className="text-xs text-stone-300 mt-1">
          Update core business details, contact phone numbers, working hours, and location.
        </p>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2.5 shadow-xl">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{notification}</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: General Business Identity */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm border-b border-stone-800 pb-3 uppercase tracking-wider">
            <Store className="w-4 h-4" />
            <span>General Business Profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                Salon Name
              </label>
              <input
                type="text"
                required
                value={formData.salonName}
                onChange={e => setFormData({ ...formData, salonName: e.target.value })}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact & Phone Numbers */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm border-b border-stone-800 pb-3 uppercase tracking-wider">
            <Phone className="w-4 h-4" />
            <span>Contact & Communication</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                Primary Phone Number
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                WhatsApp Display Number
              </label>
              <input
                type="text"
                required
                value={formData.whatsapp}
                onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                WhatsApp Raw Digits (for links)
              </label>
              <input
                type="text"
                required
                value={formData.whatsappRaw}
                onChange={e => setFormData({ ...formData, whatsappRaw: e.target.value })}
                placeholder="971567179467"
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 font-mono focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Location & Opening Hours */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm border-b border-stone-800 pb-3 uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>Opening Hours & Location</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                Daily Opening Hours
              </label>
              <input
                type="text"
                required
                value={formData.workingHoursMonSat}
                onChange={e => setFormData({ ...formData, workingHoursMonSat: e.target.value })}
                placeholder="Every day: 10:00 AM – 12:00 AM"
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                Sunday Opening Hours
              </label>
              <input
                type="text"
                required
                value={formData.workingHoursSun}
                onChange={e => setFormData({ ...formData, workingHoursSun: e.target.value })}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                Full Physical Address
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                Google Maps Embed/Reference Link
              </label>
              <input
                type="url"
                required
                value={formData.googleMapsUrl}
                onChange={e => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 font-mono text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Notice Banner */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm border-b border-stone-800 pb-3 uppercase tracking-wider">
            <Info className="w-4 h-4" />
            <span>Pricing Notice / Menu Disclaimer</span>
          </div>

          <div className="text-xs">
            <textarea
              rows={2}
              value={formData.priceNotice}
              onChange={e => setFormData({ ...formData, priceNotice: e.target.value })}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl p-3 text-stone-100 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>Save All Salon Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
};
