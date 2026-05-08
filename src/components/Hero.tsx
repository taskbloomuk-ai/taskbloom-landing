'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';

const GlobeScene = dynamic(() => import('@/components/globe/GlobeScene'), { ssr: false });
const FloatingTasks = dynamic(() => import('@/components/globe/FloatingTasks'), { ssr: false });
import WorldMapBackground from '@/components/WorldMapBackground';

const stats = [
  { value: '10K+', label: 'Active Users', num: 10, suffix: 'K+' },
  { value: '120+', label: 'Countries', num: 120, suffix: '+' },
  { value: 'Real', label: 'Human Traffic', num: 0, suffix: '' },
  { value: 'UK', label: 'Advertiser Focus', num: 0, suffix: '' },
];

function AnimatedHeroStat({ stat }: { stat: typeof stats[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView || started || stat.num === 0) return;
    setStarted(true);
    let startTime: number | null = null;
    const duration = 2000;
    function animate(ts: number) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(stat.num * eased));
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplay(stat.num);
    }
    requestAnimationFrame(animate);
  }, [inView, started, stat.num]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center sm:text-left"
    >
      <div className="text-lg font-bold text-white">
        {stat.num > 0 ? display + stat.suffix : stat.value}
      </div>
      <div className="text-xs text-[#64748b]">{stat.label}</div>
    </motion.div>
  );
}

function Particle({ i }: { i: number }) {
  const [style, setStyle] = useState<React.CSSProperties>({});
  useEffect(() => {
    setStyle({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
      opacity: 0.3 + Math.random() * 0.4,
    });
  }, []);
  return <div className="absolute w-1 h-1 bg-[#6366f1]/30 rounded-full animate-float" style={style} />;
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />
      <WorldMapBackground />
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

      {/* Particles — client-only to avoid hydration mismatch */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <Particle key={i} i={i} />
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

            <a
              href="https://docs.taskbloom.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-[#6366f1]/20 to-[#00d4ff]/20 border border-[#6366f1]/30 hover:from-[#6366f1]/30 hover:to-[#00d4ff]/30 hover:border-[#6366f1]/50 transition-all mb-5 shadow-sm"
            >
              <span className="text-base">📚</span>
              <span>Explore Guides</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>

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
                <AnimatedHeroStat key={s.label} stat={s} />
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
