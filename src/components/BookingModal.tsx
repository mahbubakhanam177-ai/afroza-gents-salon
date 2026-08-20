import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, Users, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { TemplateConfig, AppointmentForm, ServiceItem } from '../types';
import { useSalon } from '../context/SalonContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: TemplateConfig;
  initialServiceId?: string;
  initialOfferTitle?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  config,
  initialServiceId,
  initialOfferTitle,
}) => {
  const { services, addAppointment } = useSalon();
  const availableServices = services.filter(s => s.isActive !== false);

  const todayStr = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState<AppointmentForm>({
    fullName: '',
    phone: '',
    email: '',
    preferredDate: todayStr,
    preferredTime: '11:00 AM',
    category: 'all',
    serviceId: initialServiceId || (availableServices[0]?.id || 'cut-mens'),
    numberOfGuests: 1,
    specialRequest: initialOfferTitle ? `Claiming Offer: ${initialOfferTitle}` : '',
    preferredBarber: 'Any Master Barber',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialServiceId) {
      const found = availableServices.find(s => s.id === initialServiceId);
      if (found) {
        setForm(prev => ({
          ...prev,
          serviceId: initialServiceId,
          category: found.category
        }));
      }
    }
  }, [initialServiceId, availableServices]);

  if (!isOpen) return null;

  const filteredServices = form.category === 'all'
    ? availableServices
    : availableServices.filter(s => s.category === form.category);

  const selectedServiceObj = availableServices.find(s => s.id === form.serviceId);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!form.phone.trim()) errs.phone = 'Phone number is required.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email is required.';
    if (!form.preferredDate) errs.preferredDate = 'Please select a date.';
    if (form.preferredDate < todayStr) errs.preferredDate = 'Date cannot be in the past.';
    if (!form.serviceId) errs.serviceId = 'Please select a service.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await addAppointment({
        customerName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        serviceId: form.serviceId,
        serviceName: selectedServiceObj?.name || 'Selected Service',
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
        category: form.category,
        numberOfGuests: form.numberOfGuests,
        specialRequest: form.specialRequest,
        preferredBarber: form.preferredBarber
      });
    } catch (err) {
      console.warn('Appointment creation fallback notice:', err);
    }

    setSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const text = `Hello ${config.salonName}, I would like to confirm my appointment request:
- Name: ${form.fullName}
- Phone: ${form.phone}
- Date: ${form.preferredDate}
- Time: ${form.preferredTime}
- Service: ${selectedServiceObj?.name || 'Selected Service'}
- Guests: ${form.numberOfGuests}
- Preferred Barber: ${form.preferredBarber}
${form.specialRequest ? `- Notes: ${form.specialRequest}` : ''}`;

    window.open(`https://wa.me/${config.whatsappRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-stone-100 text-lg">
                Book An Appointment
              </h3>
              <p className="text-xs text-stone-400">
                Quick 1-minute booking • {config.salonName}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-heading text-2xl font-bold text-stone-100 mb-2">
                  Appointment Request Received
                </h4>
                <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
                  Your appointment request has been received. <span className="font-bold text-amber-400">{config.salonName}</span> will contact you to confirm availability.
                </p>
              </div>

              <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 text-xs text-stone-400 text-left space-y-2">
                <div className="flex justify-between">
                  <span>Selected Service:</span>
                  <span className="font-bold text-stone-200">{selectedServiceObj?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Starting Price:</span>
                  <span className="font-bold text-amber-400">{config.currency} {selectedServiceObj?.startingPrice}</span>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  onClick={handleWhatsAppSend}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Request Instantly via WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="w-full bg-stone-800 hover:bg-stone-700 text-stone-200 py-2.5 rounded-xl text-xs font-medium"
                >
                  Close & Return
                </button>
              </div>

            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={e => setForm({ ...form, fullName: e.target.value })}
                    placeholder="e.g. Tariq Ahmad"
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg pl-9 pr-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+971 50 000 0000"
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg pl-9 pr-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="client@example.ae"
                      className="w-full bg-stone-950 border border-stone-700 rounded-lg pl-9 pr-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={form.preferredDate}
                    onChange={e => setForm({ ...form, preferredDate: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
                  />
                  {errors.preferredDate && <p className="text-[11px] text-red-400 mt-1">{errors.preferredDate}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                    Preferred Time *
                  </label>
                  <select
                    value={form.preferredTime}
                    onChange={e => setForm({ ...form, preferredTime: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
                  >
                    <option value="10:00">10:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                    <option value="19:00">07:00 PM</option>
                    <option value="21:00">09:00 PM</option>
                    <option value="22:30">10:30 PM</option>
                    <option value="23:30">11:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                  Select Specific Service *
                </label>
                <select
                  value={form.serviceId}
                  onChange={e => setForm({ ...form, serviceId: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
                >
                  {filteredServices.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({config.currency} {s.startingPrice})
                    </option>
                  ))}
                </select>
              </div>

              {/* Number of Guests & Barber Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                    Number of Guests
                  </label>
                  <select
                    value={form.numberOfGuests}
                    onChange={e => setForm({ ...form, numberOfGuests: parseInt(e.target.value) })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
                  >
                    <option value={1}>1 Person</option>
                    <option value={2}>2 Persons (Friends / Family)</option>
                    <option value={3}>3 Persons Group</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                    Barber Preference
                  </label>
                  <select
                    value={form.preferredBarber}
                    onChange={e => setForm({ ...form, preferredBarber: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Any Master Barber">First Available Master Barber</option>
                    <option value="Senior Fade Specialist">Senior Fade Specialist</option>
                    <option value="Beard Sculpting Specialist">Beard Sculpting Specialist</option>
                    <option value="Executive Lounge Specialist">Executive Lounge Specialist</option>
                  </select>
                </div>
              </div>

              {/* Special Request */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                  Special Requests / Hair Notes
                </label>
                <textarea
                  value={form.specialRequest}
                  onChange={e => setForm({ ...form, specialRequest: e.target.value })}
                  rows={2}
                  placeholder="e.g. Sensitive skin, skin fade preferencia, or promotional package claim..."
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-bronze-gradient text-stone-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 shadow-lg transition-all mt-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Submit Booking Request</span>
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
