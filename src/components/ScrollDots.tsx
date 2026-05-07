'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'global-reach', label: 'Global Reach' },
  { id: 'pricing', label: 'Pricing' },
];

export default function ScrollDots() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const winH = window.innerHeight;
      setVisible(scrollY > winH * 0.5);

      let current = 0;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top <= winH * 0.4) {
          current = i;
          break;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3" aria-label="Section navigation">
      {sections.map((s, i) => (
        <button
          key={s.id}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative flex items-center justify-center"
          aria-label={s.label}
        >
          <motion.span
            animate={{
              width: active === i ? 12 : 6,
              height: active === i ? 12 : 6,
              opacity: active === i ? 1 : 0.4,
            }}
            transition={{ duration: 0.2 }}
            className="block rounded-full bg-[#6366f1] cursor-pointer"
            style={{
              boxShadow: active === i ? '0 0 8px rgba(99,102,241,0.5)' : 'none',
            }}
          />
          <span className="absolute right-full mr-3 px-2 py-0.5 rounded-md bg-[#1a1a2e] border border-[#2a2a3e] text-[10px] text-[#94a3b8] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {s.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
