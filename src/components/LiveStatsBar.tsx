'use client';
import { useRef, useState, useEffect } from 'react';
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
  const [displayValue, setDisplayValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView || started) return;
    setStarted(true);

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds
    const from = 0;
    const to = stat.value;

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(to);
      }
    }

    requestAnimationFrame(animate);
  }, [inView, started, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-2xl sm:text-3xl font-bold text-white">
        {stat.prefix || ''}
        <span>
          {displayValue.toFixed(stat.decimals)}
          {stat.suffix}
        </span>
      </div>
      <div className="text-xs sm:text-sm text-[#64748b] mt-1">{stat.label}</div>
    </motion.div>
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
