'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 2.4, suffix: 'M+', label: 'Tasks Completed', decimals: 1 },
  { value: 98.2, suffix: '%', label: 'Completion Rate', decimals: 1 },
  { value: 73, suffix: '', label: 'Countries Active Today', decimals: 0 },
  { value: 5, suffix: ' mins', label: 'Avg Campaign Launch', decimals: 0, prefix: '< ' },
];

function AnimatedCounter({ stat }: { stat: typeof stats[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-white">
        {stat.prefix || ''}
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          {inView ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CountUp from={0} to={stat.value} duration={2} decimals={stat.decimals} />
            </motion.span>
          ) : (
            <span>0</span>
          )}
          {stat.suffix}
        </motion.span>
      </div>
      <div className="text-xs sm:text-sm text-[#64748b] mt-1">{stat.label}</div>
    </div>
  );
}

function CountUp({ from, to, duration, decimals }: { from: number; to: number; duration: number; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <span ref={ref}>
      {inView ? to.toFixed(decimals) : from.toFixed(decimals)}
    </span>
  );
}

export default function LiveStatsBar() {
  return (
    <section className="relative py-12 border-y border-[#1e1e2e] bg-[#0a0a0f]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <AnimatedCounter key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
