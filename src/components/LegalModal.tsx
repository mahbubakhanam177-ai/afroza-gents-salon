import React from 'react';
import { X, ShieldCheck, FileText, AlertCircle } from 'lucide-react';
import { TemplateConfig } from '../types';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'refunds' | 'cookies' | 'disclaimer' | null;
  onClose: () => void;
  config: TemplateConfig;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose, config }) => {
  if (!type) return null;

  const titleMap = {
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    refunds: 'Cancellation & Refund Policy',
    cookies: 'Cookie Policy',
    disclaimer: 'Legal Disclaimer & Master Template Notice',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-bold text-stone-100 text-lg">
              {titleMap[type]}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legal Document Content */}
        <div className="py-4 space-y-4 text-xs text-stone-300 overflow-y-auto flex-1 leading-relaxed">
          <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-[11px] text-amber-400/90 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Master Template Legal Notice: The contents below serve as a structured draft for {config.salonName}.</span>
          </div>

          {type === 'privacy' && (
            <>
              <p>
                At <strong>{config.salonName}</strong>, accessible at {config.email}, we prioritize the privacy of our visitors and clients in Dubai, UAE. This Privacy Policy documents the types of personal information collected and how it is protected.
              </p>
              <h4 className="font-bold text-stone-100 text-sm">Information We Collect</h4>
              <p>When you fill our appointment request form or contact us via WhatsApp, we collect your name, phone number, email address, preferred appointment time, and grooming requests.</p>
              <h4 className="font-bold text-stone-100 text-sm">How We Use Your Information</h4>
              <p>We use your information solely to confirm appointment availability, send reminder notifications, provide requested grooming services, and improve our customer service standards.</p>
              <h4 className="font-bold text-stone-100 text-sm">Data Protection & UAE Regulations</h4>
              <p>We do not sell, trade, or transfer your personal data to third parties. All client details are maintained securely under applicable UAE privacy standards.</p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>Welcome to <strong>{config.salonName}</strong>. By accessing our website or booking a appointment, you agree to comply with the following terms:</p>
              <h4 className="font-bold text-stone-100 text-sm">Appointments & Arrival</h4>
              <p>Please arrive 5 to 10 minutes prior to your scheduled time. If you arrive more than 15 minutes late, your appointment may need to be rescheduled to respect other clients.</p>
              <h4 className="font-bold text-stone-100 text-sm">Pricing & Payments</h4>
              <p>All prices listed on this website are starting prices in {config.currency}. Final pricing is confirmed with your barber prior to service delivery based on hair length and specialized products.</p>
              <h4 className="font-bold text-stone-100 text-sm">Right of Service</h4>
              <p>We maintain a respectful, welcoming atmosphere for all clients and staff. We reserve the right to refuse service in cases of abusive behavior or severe health contraindications.</p>
            </>
          )}

          {type === 'refunds' && (
            <>
              <p><strong>{config.salonName}</strong> is committed to 100% customer satisfaction with every haircut and grooming service.</p>
              <h4 className="font-bold text-stone-100 text-sm">Cancellations</h4>
              <p>We appreciate at least 2 hours advance notice for appointment cancellations or modifications. You can modify your booking free of charge via WhatsApp ({config.whatsapp}).</p>
              <h4 className="font-bold text-stone-100 text-sm">Service Adjustments</h4>
              <p>If you are not fully satisfied with your cut or beard shape, please inform your barber or reception before leaving the salon. We will gladly adjust it immediately at no extra cost.</p>
            </>
          )}

          {type === 'cookies' && (
            <>
              <p>This website uses essential local browser storage to remember your PWA app installation status, theme preferences, and form states.</p>
              <p>We do not use invasive third-party tracking cookies or sell browser analytics to third parties.</p>
            </>
          )}

          {type === 'disclaimer' && (
            <>
              <p>
                <strong>Master Template Notice:</strong> This website is a production-quality master template designed for demonstration and sale to men's salons and barbershops in Dubai, UAE.
              </p>
              <p>
                All brand credentials, prices, addresses, and phone numbers are configurable placeholders ([ SALON NAME ], [ UAE PHONE ], etc.). Fictional client testimonials are clearly identified as sample demonstration data.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-5 py-2 rounded-xl text-xs uppercase"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
