'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { taskFeedItems } from '@/lib/cities';

const taskIcons = ['▶️', '🌐', '📱', '⭐', '👍', '📝', '🎬', '📊', '🛒', '🔗'];

export default function FloatingTasks() {
  const [items, setItems] = useState<{ id: number; text: string; icon: string }[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const idx = counter % taskFeedItems.length;
      const newItem = {
        id: Date.now(),
        text: taskFeedItems[idx],
        icon: taskIcons[idx % taskIcons.length],
      };
      setItems((prev) => [newItem, ...prev].slice(0, 4));
      setCounter((c) => c + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [counter]);

  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 space-y-2 pointer-events-none z-10">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-[#12121a]/80 backdrop-blur-md border border-[#2a2a3e] rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs text-[#cbd5e1] leading-tight">{item.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
