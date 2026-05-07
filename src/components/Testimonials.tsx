'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Founder, GrowthAgency UK',
    avatar: 'SM',
    flag: '🇬🇧',
    color: '#6366f1',
    text: 'We run YouTube promotion campaigns for our clients and TaskBloom delivers consistent, real engagement. The geo-targeting is exactly what we needed.',
    metrics: '2,400 tasks completed · 94% approval rate',
  },
  {
    name: 'James Chen',
    role: 'Marketing Director, TechScale',
    avatar: 'JC',
    flag: '🇺🇸',
    color: '#00d4ff',
    text: 'The ability to target specific countries for app installs has transformed our UA strategy. Real users, real results.',
    metrics: '1,800 app installs · 4.5 star avg rating',
  },
  {
    name: 'Priya Sharma',
    role: 'CEO, EcomBoost India',
    avatar: 'PS',
    flag: '🇮🇳',
    color: '#f59e0b',
    text: 'TaskBloom helped us launch in 5 new markets within a week. The platform is incredibly easy to use and the support team is outstanding.',
    metrics: '12 campaigns · 8 countries · 98% completion',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 6000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Trusted by Advertisers Worldwide</h2>
          <p className="text-[#94a3b8] mb-12">
            Hear from businesses that scale with organic global engagement
          </p>
        </motion.div>

        <div
          className="relative min-h-[280px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="p-8 sm:p-10 rounded-2xl border border-[#1e1e2e] bg-[#12121a]"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="text-2xl">{testimonials[current].flag}</span>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: testimonials[current].color }}
                >
                  {testimonials[current].avatar}
                </div>
              </div>
              <blockquote className="text-base sm:text-lg text-[#cbd5e1] mb-6 leading-relaxed italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </blockquote>
              <div className="font-semibold">{testimonials[current].name}</div>
              <div className="text-sm text-[#64748b]">{testimonials[current].role}</div>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-xs text-[#6366f1]">
                {testimonials[current].metrics}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? 'bg-[#6366f1] w-6' : 'bg-[#2a2a3e] hover:bg-[#6366f1]/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
