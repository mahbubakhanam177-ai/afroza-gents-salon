import React from 'react';
import { Smartphone, Download, Share, PlusSquare, CheckCircle2, X } from 'lucide-react';
import { TemplateConfig } from '../types';

interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: TemplateConfig;
  deferredPrompt: any;
  isIos: boolean;
  isPwaInstalled: boolean;
  onTriggerInstall: () => void;
}

export const PwaInstallModal: React.FC<PwaInstallModalProps> = ({
  isOpen,
  onClose,
  config,
  deferredPrompt,
  isIos,
  isPwaInstalled,
  onTriggerInstall,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon Header */}
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 shadow-lg">
          <Smartphone className="w-7 h-7" />
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-stone-100 text-xl mb-1">
          Install {config.salonName} App
        </h3>
        <p className="text-xs text-stone-300 leading-relaxed mb-6">
          Enjoy instant access, appointment reminders, exclusive Dubai grooming offers, and quick booking right from your phone home screen.
        </p>

        {isPwaInstalled ? (
          <div className="p-4 bg-emerald-950/60 rounded-xl border border-emerald-500/40 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-stone-100 text-sm">App Already Installed</h4>
            <p className="text-xs text-stone-300">
              {config.salonName} is already saved on your home screen.
            </p>
          </div>
        ) : isIos ? (
          /* iOS Step-by-Step Instructions */
          <div className="space-y-4 text-left">
            <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-2.5 text-xs text-stone-300">
              <span className="font-bold text-amber-400 block border-b border-stone-800 pb-1">
                Safari iOS Installation Instructions:
              </span>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-800 flex items-center justify-center font-bold text-amber-400 text-[11px] shrink-0">
                  1
                </div>
                <div className="flex items-center gap-2">
                  <span>Tap the</span>
                  <span className="inline-flex items-center gap-1 bg-stone-800 px-2 py-0.5 rounded text-stone-200 font-semibold">
                    <Share className="w-3.5 h-3.5 text-blue-400" /> Share
                  </span>
                  <span>icon below</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-800 flex items-center justify-center font-bold text-amber-400 text-[11px] shrink-0">
                  2
                </div>
                <div className="flex items-center gap-2">
                  <span>Scroll down & select</span>
                  <span className="inline-flex items-center gap-1 bg-stone-800 px-2 py-0.5 rounded text-stone-200 font-semibold">
                    <PlusSquare className="w-3.5 h-3.5 text-amber-400" /> Add to Home Screen
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-800 flex items-center justify-center font-bold text-amber-400 text-[11px] shrink-0">
                  3
                </div>
                <div>
                  <span>Tap <strong className="text-white">Add</strong> in the top right corner.</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-stone-800 hover:bg-stone-700 text-stone-200 py-2.5 rounded-xl text-xs font-semibold"
            >
              Got It
            </button>
          </div>
        ) : (
          /* Android / Chrome Native Prompt */
          <div className="space-y-3">
            <button
              onClick={onTriggerInstall}
              className="w-full bg-bronze-gradient text-stone-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Install App Now</span>
            </button>

            <button
              onClick={onClose}
              className="w-full bg-stone-800 hover:bg-stone-700 text-stone-300 py-2.5 rounded-xl text-xs font-medium"
            >
              Maybe Later
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
