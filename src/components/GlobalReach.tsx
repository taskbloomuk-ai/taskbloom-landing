'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const regions = [
  { name: 'United Kingdom', users: 2400, flag: '🇬🇧', color: '#6366f1' },
  { name: 'United States', users: 1800, flag: '🇺🇸', color: '#00d4ff' },
  { name: 'Germany', users: 1200, flag: '🇩🇪', color: '#7c3aed' },
  { name: 'India', users: 950, flag: '🇮🇳', color: '#f59e0b' },
  { name: 'UAE', users: 800, flag: '🇦🇪', color: '#10b981' },
  { name: 'Canada', users: 650, flag: '🇨🇦', color: '#e94560' },
  { name: 'Pakistan', users: 700, flag: '🇵🇰', color: '#06b6d4' },
  { name: 'Australia', users: 500, flag: '🇦🇺', color: '#8b5cf6' },
];

const maxUsers = Math.max(...regions.map((r) => r.users));

export default function GlobalReach() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="global-reach" className="relative py-24 sm:py-32 bg-[#0a0a0f]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Global Reach Dashboard</h2>
          <p className="text-[#94a3b8] max-w-xl mx-auto">
            Real-time engagement metrics across 120+ countries. Know exactly where your users are.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Regions bar chart */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-[#12121a] neon-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Active Users by Region</h3>
              <span className="text-xs text-[#64748b]">{regions.reduce((a, b) => a + b.users, 0).toLocaleString()} total</span>
            </div>
            <div className="space-y-3">
              {regions.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  className="flex items-center gap-3"
                >
                  <span className="text-lg w-8">{r.flag}</span>
                  <span className="text-sm text-[#94a3b8] min-w-0 truncate" style={{maxWidth:'120px'}}>{r.name}</span>
                  <div className="flex-1 h-6 rounded-full bg-[#1a1a2e] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${(r.users / maxUsers) * 100}%` } : {}}
                      transition={{ duration: 0.8, delay: 0.1 * i, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: r.color }}
                    />
                  </div>
                  <span className="text-sm font-medium text-white w-16 text-right">{r.users.toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats cards */}
          <div className="space-y-4">
            {[
              { label: 'Active Countries', value: '120+', change: '+12 this month', color: '#6366f1' },
              { label: 'Daily Active Users', value: '6,200', change: '+8% vs last week', color: '#10b981' },
              { label: 'Tasks Completed/hr', value: '3,400', change: '24/7 activity', color: '#00d4ff' },
              { label: 'Avg. User Rating', value: '4.8 / 5', change: 'Based on 2.1K reviews', color: '#f59e0b' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="p-5 rounded-2xl bg-[#12121a] neon-border"
              >
                <div className="text-xs text-[#64748b] mb-1">{s.label}</div>
                <div className="text-xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-xs" style={{ color: s.color }}>{s.change}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
