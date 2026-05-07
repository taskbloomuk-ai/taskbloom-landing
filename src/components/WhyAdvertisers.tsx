'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
  { title: 'Real Human Interactions', desc: 'Every engagement comes from verified real users — not bots or automated scripts.', icon: '👤' },
  { title: 'Fraud Detection', desc: 'Advanced AI-powered fraud monitoring detects and blocks fake activity in real-time.', icon: '🛡️' },
  { title: 'Worldwide Reach', desc: 'Access users in 120+ countries across 6 continents. Go global from day one.', icon: '🌍' },
  { title: 'Geo Targeting', desc: 'Target campaigns by country, city, or region. Precise geographic control.', icon: '🎯' },
  { title: 'Fast Scaling', desc: 'Scale from 100 to 10,000 tasks per day instantly. No minimum commitments required.', icon: '⚡' },
  { title: 'Budget Control', desc: 'Set daily caps, per-task budgets, and total campaign spend. Full financial transparency.', icon: '💰' },
  { title: 'Live Reporting', desc: 'Real-time dashboard with engagement metrics, geographic data, and performance analytics.', icon: '📊' },
  { title: 'Organic Promotion', desc: 'All actions appear as genuine organic engagement — no patterns, no footprints.', icon: '🌱' },
];

export default function WhyAdvertisers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Advertisers Choose Us</h2>
          <p className="text-[#94a3b8] max-w-xl mx-auto">
            Built for businesses that demand authentic global engagement
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.04 * i }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group p-5 md:p-6 rounded-2xl bg-[#12121a] neon-border"
            >
              <span className="text-2xl mb-3 block">{f.icon}</span>
              <h3 className="text-sm font-semibold mb-2">{f.title}</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
