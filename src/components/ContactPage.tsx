import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Clock, Send, CheckCircle2 } from 'lucide-react';
import { TemplateConfig } from '../types';
import { DubaiLocationSection } from './DubaiLocationSection';

interface ContactPageProps {
  config: TemplateConfig;
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ config, onOpenBooking }) => {
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="py-12 bg-stone-950 min-h-screen space-y-16 animate-fadeIn">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <span className="text-xs font-bold text-amber-400 tracking-widest uppercase block mb-2">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-stone-100">
          Contact & Location
        </h1>
        <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
          Have a question or need special group booking arrangements? Call us, drop a message on WhatsApp, or send an inquiry.
        </p>
      </div>

      {/* Location Section */}
      <DubaiLocationSection config={config} onOpenBooking={onOpenBooking} />

      {/* Direct Contact Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-100 mb-2 text-center">
            Send Us A Direct Message
          </h2>
          <p className="text-xs text-stone-400 text-center mb-6">
            For general inquiries, corporate accounts, or custom feedback.
          </p>

          {sent ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="font-heading font-bold text-stone-100 text-lg">Message Sent Successfully!</h3>
              <p className="text-xs text-stone-300">Thank you for reaching out to {config.salonName}. We will reply within 2 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={contactForm.phone}
                    onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
                    placeholder="+971 50 000 0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
                  placeholder="client@example.ae"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none resize-none"
                  placeholder="How can we assist you today?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Inquiry</span>
              </button>
            </form>
          )}

        </div>
      </div>

    </div>
  );
};
