import React, { useState } from 'react';
import { Settings2, X, RefreshCw, Check, Sparkles } from 'lucide-react';
import { TemplateConfig } from '../types';

interface TemplateCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  config: TemplateConfig;
  onUpdateConfig: (newConfig: TemplateConfig) => void;
  onResetConfig: () => void;
}

export const TemplateCustomizer: React.FC<TemplateCustomizerProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  onResetConfig,
}) => {
  const [formData, setFormData] = useState<TemplateConfig>(config);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'whatsapp' ? { whatsappRaw: value.replace(/[^0-9]/g, '') } : {}),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Settings2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-stone-100 text-lg flex items-center gap-2">
                Master Template Settings
                <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full uppercase">
                  Sales Demo Mode
                </span>
              </h3>
              <p className="text-xs text-stone-400">Customize salon branding in real-time to show prospective clients.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
              [ SALON NAME ]
            </label>
            <input
              type="text"
              name="salonName"
              value={formData.salonName}
              onChange={handleChange}
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
              [ TAGLINE ]
            </label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                [ UAE PHONE ]
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                [ WHATSAPP NUMBER ]
              </label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
              [ DUBAI ADDRESS ]
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                [ EMAIL ]
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 uppercase mb-1">
                CURRENCY SYMBOL
              </label>
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 text-xs text-stone-400 space-y-1">
            <p className="font-semibold text-stone-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Agency Master Template Feature
            </p>
            <p>Changes apply instantly across all pages, booking forms, location cards, and footers.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-800">
            <button
              type="button"
              onClick={() => {
                onResetConfig();
                onClose();
              }}
              className="text-stone-400 hover:text-stone-200 text-xs flex items-center gap-1 hover:underline"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold px-5 py-2 rounded-lg text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950" />
                  <span>Applied!</span>
                </>
              ) : (
                <span>Apply Branding</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
