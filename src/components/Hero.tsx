'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const GlobeScene = dynamic(() => import('@/components/globe/GlobeScene'), { ssr: false });
const FloatingTasks = dynamic(() => import('@/components/globe/FloatingTasks'), { ssr: false });

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '120+', label: 'Countries' },
  { value: 'Real', label: 'Human Traffic' },
  { value: 'UK', label: 'Advertiser Focus' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(99,102,241,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(124,58,237,0.06),transparent_60%)]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#6366f1]/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-16">
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left: Messaging — 3/5 on desktop */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-sm text-[#6366f1] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
              Global Human Engagement Network
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Reach Real Audiences{' '}
              <span className="bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#00d4ff] bg-clip-text text-transparent">
                Worldwide
              </span>{' '}
              — Organically
            </h1>

            <p className="text-lg text-[#94a3b8] max-w-lg mb-8 leading-relaxed">
              Promote websites, apps, videos, and businesses through 10,000+ active users across 120+ countries using real human engagement.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="https://task-rewards.com"
                className="px-8 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#4f46e5] hover:to-[#6d28d9] transition-all shadow-xl shadow-[#6366f1]/25 hover:shadow-[#6366f1]/40"
              >
                Launch Campaign
              </a>
              <a
                href="#global-reach"
                className="px-8 py-3.5 rounded-full text-base font-semibold text-[#cbd5e1] border border-[#2a2a3e] hover:border-[#6366f1]/50 hover:text-white transition-all"
              >
                View Live Network
              </a>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <div className="text-lg font-bold text-white">{s.value}</div>
                  <div className="text-xs text-[#64748b]">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Globe — 2/5 on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="lg:col-span-2 relative w-full max-w-sm md:max-w-md lg:max-w-none mx-auto"
          >
            <div className="relative w-full aspect-square max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full mx-auto">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_center,rgba(99,102,241,0.12),transparent_70%)] rounded-full" />
              <GlobeScene />
              <FloatingTasks />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
