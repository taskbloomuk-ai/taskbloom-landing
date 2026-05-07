'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'How does TaskBloom ensure traffic comes from real humans?',
    a: 'Every user is verified through email, device fingerprinting, and activity pattern analysis. Our fraud detection system monitors for bot-like behaviour, proxy/VPN usage, and automated scripts. Only verified real users can complete tasks.',
  },
  {
    q: 'Which countries can I target for my campaigns?',
    a: 'We have active users in 120+ countries including UK, USA, Germany, UAE, India, Canada, Australia, Singapore, and many more. You can target by country, region, or city — or run globally.',
  },
  {
    q: 'What types of campaigns does TaskBloom support?',
    a: 'We support 8 campaign types: Website Traffic, YouTube Promotion, App Downloads, Social Engagement, Business Reviews, Search Visibility, Ecommerce Awareness, and Content Promotion. Each can be customised with specific instructions for users.',
  },
  {
    q: 'How does TaskBloom prevent fraud and fake engagement?',
    a: 'Our fraud detection system analyses user behaviour patterns, device fingerprints, IP addresses, and timing patterns. We block suspicious accounts and reject fraudulent submissions before they impact your campaign metrics.',
  },
  {
    q: 'What is the minimum budget to launch a campaign?',
    a: 'Campaigns start from as low as £99 for the Starter plan, which includes up to 500 tasks. You can set daily spending caps and pause campaigns at any time with zero commitment.',
  },
  {
    q: 'How do payments and billing work for advertisers?',
    a: 'We accept GBP payments via bank transfer, credit/debit card, and BACS. You pre-fund your campaign wallet, and funds are released to users only after tasks are approved. Unused balance can be refunded at any time.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-[#94a3b8]">Everything you need to know about running campaigns on TaskBloom</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.04 * i }}
              className="rounded-2xl border border-[#1e1e2e] bg-[#12121a] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[#1a1a2e] transition-colors"
              >
                <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
                <svg
                  className={`w-4 h-4 shrink-0 text-[#64748b] transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 text-sm text-[#94a3b8] leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
