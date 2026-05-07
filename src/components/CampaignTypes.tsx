'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const campaigns = [
  { title: 'Website Traffic', desc: 'Drive real visitors to your website through organic discovery and browsing tasks.', icon: '🌐', gradient: 'from-[#6366f1] to-[#00d4ff]' },
  { title: 'YouTube Promotion', desc: 'Increase views, watch time, and engagement on your video content.', icon: '▶️', gradient: 'from-[#e94560] to-[#f59e0b]' },
  { title: 'App Downloads', desc: 'Boost app installs and user acquisition through real device-based installations.', icon: '📱', gradient: 'from-[#10b981] to-[#00d4ff]' },
  { title: 'Social Engagement', desc: 'Grow followers, likes, shares, and organic social media presence.', icon: '👍', gradient: 'from-[#7c3aed] to-[#6366f1]' },
  { title: 'Business Reviews', desc: 'Collect authentic reviews and ratings on Google, Trustpilot, and industry platforms.', icon: '⭐', gradient: 'from-[#f59e0b] to-[#e94560]' },
  { title: 'Search Visibility', desc: 'Improve organic search presence through natural behavior and engagement signals.', icon: '🔍', gradient: 'from-[#00d4ff] to-[#7c3aed]' },
  { title: 'Ecommerce Awareness', desc: 'Promote products and stores through targeted shopping and browsing campaigns.', icon: '🛒', gradient: 'from-[#6366f1] to-[#10b981]' },
  { title: 'Content Promotion', desc: 'Amplify blog posts, articles, and content through genuine readership.', icon: '📝', gradient: 'from-[#7c3aed] to-[#e94560]' },
];

export default function CampaignTypes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="campaigns" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Campaign Types</h2>
          <p className="text-[#94a3b8] max-w-xl mx-auto">
            From website visits to app installs — run any engagement campaign across our global network
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {campaigns.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="group relative p-5 md:p-6 rounded-2xl bg-[#12121a] neon-border cursor-default"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform`}>
                {c.icon}
              </div>
              <h3 className="text-base font-semibold mb-2">{c.title}</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
