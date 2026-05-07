'use client';
import { motion } from 'framer-motion';

export default function FinalCTA() {
  return (
    <section className="relative py-32 sm:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(99,102,241,0.08),transparent_50%)]" />

      {/* Network grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Turn Global Human Attention{' '}
            <span className="bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#00d4ff] bg-clip-text text-transparent">
              Into Growth
            </span>
          </h2>
          <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto mb-10 leading-relaxed">
            Join thousands of advertisers running global engagement campaigns. Launch in minutes, see results in hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://task-rewards.com"
              className="px-10 py-4 rounded-full text-base font-semibold text-white bg-gradient-to-r from-[#6366f1] to-[#7c3aed] hover:from-[#4f46e5] hover:to-[#6d28d9] transition-all shadow-2xl shadow-[#6366f1]/25 hover:shadow-[#6366f1]/40"
            >
              Start Campaign
            </a>
            <a
              href="#"
              className="px-10 py-4 rounded-full text-base font-semibold text-[#cbd5e1] border border-[#2a2a3e] hover:border-[#6366f1]/50 hover:text-white transition-all"
            >
              Request Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
