'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const plans = [
  {
    name: 'Starter',
    desc: 'Perfect for testing the platform',
    price: '£99',
    period: '/mo',
    features: ['Up to 500 tasks/mo', '5 campaign types', '10 countries', 'Email support', 'Basic analytics'],
    cta: 'Start Free Trial',
    featured: false,
    gradient: 'from-[#64748b] to-[#94a3b8]',
  },
  {
    name: 'Growth',
    desc: 'For growing businesses',
    price: '£299',
    period: '/mo',
    features: ['Up to 2,500 tasks/mo', 'All campaign types', '50+ countries', 'Priority support', 'Advanced analytics', 'Geo targeting'],
    cta: 'Start Free Trial',
    featured: true,
    gradient: 'from-[#6366f1] to-[#7c3aed]',
  },
  {
    name: 'Agency',
    desc: 'For agencies & resellers',
    price: '£999',
    period: '/mo',
    features: ['Up to 10,000 tasks/mo', 'All campaign types', '120+ countries', 'Dedicated manager', 'White-label option', 'API access', 'Custom reporting'],
    cta: 'Contact Sales',
    featured: false,
    gradient: 'from-[#10b981] to-[#00d4ff]',
  },
  {
    name: 'Enterprise',
    desc: 'For large-scale operations',
    price: 'Custom',
    period: '',
    features: ['Unlimited tasks', 'All campaign types', 'All countries', 'SLA guarantee', 'Custom integration', 'Multi-account', '24/7 support', 'Dedicated infrastructure'],
    cta: 'Contact Sales',
    featured: false,
    gradient: 'from-[#e94560] to-[#f59e0b]',
  },
];

export default function PricingPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-[#0a0a0f]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-[#94a3b8] max-w-xl mx-auto">
            Start small, scale big. No hidden fees, no long-term contracts.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                plan.featured
                  ? 'border-[#6366f1]/40 bg-[#12121a] shadow-lg shadow-[#6366f1]/10 scale-[1.02] lg:scale-105'
                  : 'border-[#1e1e2e] bg-[#12121a] hover:border-[#2a2a3e]'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#6366f1] to-[#7c3aed] text-xs font-semibold text-white whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <p className="text-xs text-[#64748b]">{plan.desc}</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-sm text-[#64748b]">{plan.period}</span>
              </div>
              <ul className="space-y-2.5 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-[#94a3b8]">
                    <svg className="w-3.5 h-3.5 text-[#6366f1] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://app.task-rewards.com"
                className={`block text-center py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                  plan.featured
                    ? 'bg-gradient-to-r from-[#6366f1] to-[#7c3aed] text-white hover:shadow-lg hover:shadow-[#6366f1]/20'
                    : 'border border-[#2a2a3e] text-[#cbd5e1] hover:border-[#6366f1]/50'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
