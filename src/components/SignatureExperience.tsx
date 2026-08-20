import React from 'react';
import { MessageSquare, Search, Scissors, Sparkles, Compass } from 'lucide-react';

export const SignatureExperience: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: MessageSquare,
      title: 'Consultation',
      description: 'We listen to your lifestyle needs, hair habits, and desired look before pick up a pair of shears.',
    },
    {
      number: '02',
      icon: Search,
      title: 'Hair & Beard Assessment',
      description: 'We analyze hair growth patterns, scalp condition, and facial geometry for natural balance.',
    },
    {
      number: '03',
      icon: Scissors,
      title: 'Precision Grooming',
      description: 'Master scissor work, clipper blending, and sharp razor sculpting with sanitized tools.',
    },
    {
      number: '04',
      icon: Sparkles,
      title: 'Hot Towel Finishing',
      description: 'Warm steam towel wrap, hair cleanse, and scalp massage to remove stray hairs.',
    },
    {
      number: '05',
      icon: Compass,
      title: 'Style Recommendation',
      description: 'Personalized product advice so you can effortlessly recreate your fresh look at home.',
    },
  ];

  return (
    <section className="py-20 bg-[#F5F2EC] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-700 tracking-widest uppercase mb-2 block">
            Our Standard Protocol
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-stone-900">
            The Signature Grooming Journey
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Every client receives our structured 5-step grooming workflow for guaranteed consistency and satisfaction.
          </p>
        </div>

        {/* 5 Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-amber-600/40 transition-all flex flex-col justify-between relative group shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-display text-amber-700/40 group-hover:text-amber-700 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-amber-700">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-stone-900 text-base mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
