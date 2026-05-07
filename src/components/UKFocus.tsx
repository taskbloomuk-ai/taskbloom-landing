'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const perks = [
  'UK-based campaign management team',
  'GBP pricing with transparent currency conversion',
  'London-timezone support available 9AM-9PM',
  'Dedicated account managers for UK advertisers',
  'Compliant with UK advertising standards',
  'Local payment methods including BACS and Faster Payments',
];

export default function UKFocus() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="relative py-24 sm:py-32 bg-[#0a0a0f]/50 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(99,102,241,0.06),transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-sm text-[#6366f1] mb-6">
              🇬🇧 UK Focus
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Built for UK Businesses Seeking{' '}
              <span className="bg-gradient-to-r from-[#6366f1] to-[#00d4ff] bg-clip-text text-transparent">
                Global Reach
              </span>
            </h2>
            <p className="text-[#94a3b8] mb-8 leading-relaxed">
              From London to Manchester to Birmingham, we empower UK advertisers to run campaigns that span the globe. Our platform is designed specifically for the needs of British businesses.
            </p>
            <ul className="space-y-3">
              {perks.map((perk, i) => (
                <motion.li
                  key={perk}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  className="flex items-center gap-3 text-sm text-[#cbd5e1]"
                >
                  <span className="w-5 h-5 rounded-full bg-[#6366f1]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {perk}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* London-to-world visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative p-8 rounded-2xl border border-[#1e1e2e] bg-[#12121a] overflow-hidden"
          >
            <div className="text-center mb-6">
              <span className="text-4xl">🇬🇧</span>
              <div className="text-lg font-bold mt-2">London HQ</div>
              <div className="text-xs text-[#64748b]">Managing campaigns across 120+ countries</div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { flag: '🇦🇪', name: 'Dubai', time: '+3h' },
                { flag: '🇺🇸', name: 'New York', time: '-5h' },
                { flag: '🇩🇪', name: 'Berlin', time: '+1h' },
                { flag: '🇸🇬', name: 'Singapore', time: '+7h' },
                { flag: '🇮🇳', name: 'Mumbai', time: '+4.5h' },
                { flag: '🇦🇺', name: 'Sydney', time: '+9h' },
              ].map((loc) => (
                <div key={loc.name} className="text-center p-3 rounded-xl bg-[#1a1a2e] border border-[#2a2a3e]">
                  <div className="text-xl mb-1">{loc.flag}</div>
                  <div className="text-xs font-medium">{loc.name}</div>
                  <div className="text-[10px] text-[#64748b]">{loc.time}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-xs text-[#64748b]">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                Active campaign support in all timezones
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
