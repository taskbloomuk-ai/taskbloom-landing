'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KNOWLEDGE_BASE: { keyword: string; answer: string }[] = [
  { keyword: 'how to withdraw', answer: 'To withdraw your earnings: 1) Go to Wallet in your dashboard 2) Click "Withdraw" 3) Minimum withdrawal is $10 4) A 2.9% + $0.30 fee applies 5) Choose payment method 6) Confirm. Payouts process within 24-48 hours after a 72-hour hold period.' },
  { keyword: 'withdraw money', answer: 'Minimum withdrawal is $10. Fees are 2.9% + $0.30 per payout. Withdrawals are held for 72 hours for fraud prevention, then processed within 24-48 hours. Go to Wallet > Withdraw to request.' },
  { keyword: 'minimum withdrawal', answer: 'The minimum payout amount on TaskBloom is $10. Your available balance must be at least $10 to request a withdrawal. A payout fee of 2.9% + $0.30 applies.' },
  { keyword: 'task rejected', answer: 'Tasks can be rejected for incomplete steps, suspicious activity, VPN/proxy detection, or policy violations. New users are limited to 5 tasks per day. If flagged for fraud review (threshold: 5 flags), tasks are held for manual review.' },
  { keyword: 'why rejected', answer: 'Rejection reasons include: incomplete steps, duplicate submissions, automated scripts, VPN detection, mismatched device/location, or exceeding the fraud review threshold. Minimum task completion time is 30 seconds. Contact support with your task ID for specifics.' },
  { keyword: 'referral bonus', answer: 'TaskBloom offers a 3-level referral commission system: Level 1 (Direct): 5% of referral earnings, Level 2 (Grandparent): 3%, Level 3 (Great-grandparent): 1%. Max referral levels: 3. Earn ongoing commissions as your referrals complete tasks.' },
  { keyword: 'invite friend', answer: 'To invite friends: 1) Go to the Referrals page 2) Copy your unique referral link 3) Share it via social media, email, or messaging apps 4) Earn referral commissions: 5% from direct referrals, 3% from their referrals, 1% from the third level.' },
  { keyword: 'referral commission', answer: 'Referral commissions are paid as a percentage of your referral\'s task earnings: Level 1 (direct): 5%, Level 2: 3%, Level 3: 1%. Up to 3 referral levels. Commissions are credited automatically when your referrals complete approved tasks.' },
  { keyword: 'how to earn', answer: 'Earn money on TaskBloom by completing micro-tasks. Each task pays a baseline of $0.50. Task types include: sign-ups, surveys, app downloads, video watches, and link clicks. Browse available tasks in your dashboard. New users can complete up to 5 tasks per day, increasing to a max of 50 tasks/day.' },
  { keyword: 'payment method', answer: 'TaskBloom supports withdrawals via bank transfer, PayPal, and mobile money (depending on your region). Minimum withdrawal is $10. Payout fee: 2.9% + $0.30. Funds are sent within 24–48 hours after a 72-hour security hold period.' },
  { keyword: 'task limit', answer: 'New users can complete up to 5 tasks per day. As you build trust, your daily limit increases up to a maximum of 50 tasks per day. Each task has a minimum completion time of 30 seconds to prevent automated activity.' },
  { keyword: 'payout fee', answer: 'Payout fees are 2.9% + $0.30 per withdrawal. For example, withdrawing $10 incurs a fee of $0.59, so your net amount would be $9.41.' },
  { keyword: 'payout hold', answer: 'All withdrawal requests go through a 72-hour (3 day) security hold period before processing. This is for fraud prevention. After the hold, payments are processed within 24-48 hours.' },
  { keyword: 'registration fee', answer: 'There is a $1.00 registration fee to create an account on TaskBloom. This is a one-time fee to verify genuine users and prevent fraud.' },
  { keyword: 'account blocked', answer: 'If your account is blocked, it may be due to suspicious activity, policy violations, or fraud detection. The age minimum is 18. Contact support via the Contact page or email support@taskbloom.co.uk to appeal the block.' },
  { keyword: 'forgot password', answer: 'To reset your password: 1) Go to the Login page 2) Click "Forgot Password" 3) Enter your email address 4) Check your inbox for the reset link 5) Create a new password (min 8 characters).' },
  { keyword: 'verify email', answer: 'After registration, check your email inbox for a verification link. If you don\'t see it, check your spam/junk folder. Click the link to verify your email and activate your account.' },
  { keyword: 'how to start', answer: 'Getting started: 1) Create an account on taskbloom.co.uk (one-time registration fee: $1) 2) Verify your email 3) Complete your profile 4) Browse available tasks in the dashboard 5) Complete tasks and earn money. Minimum payout is $10.' },
  { keyword: 'what is taskbloom', answer: 'TaskBloom is a global human engagement platform where users complete micro-tasks to earn money. Advertisers post tasks to promote their websites, apps, and content. It\'s a win-win marketplace connecting businesses with real users across 120+ countries.' },
  { keyword: 'support', answer: 'Need help? Contact us at support@taskbloom.co.uk or use this chat widget. For urgent issues, check the FAQ section or visit the Contact page. We aim to respond within 24 hours on business days.' },
  { keyword: 'contact', answer: 'You can reach TaskBloom support via: Email: support@taskbloom.co.uk, Contact form: taskbloom.co.uk/contact, or use this chat widget. We aim to respond within 24 hours on business days.' },
  { keyword: 'pricing', answer: 'Campaigns start from £99 (Starter plan, up to 500 tasks). You can set daily spending caps and pause anytime. Advertisers pay $1.00 per task, with users earning $0.50 per task baseline.' },
  { keyword: 'advertiser', answer: 'Advertisers on TaskBloom can launch campaigns to promote websites, YouTube videos, apps, and more. Target 120+ countries with real human engagement. Advertisers pay $1.00 per task, users earn $0.50. Create your first campaign from the Advertiser dashboard.' },
  { keyword: 'campaign', answer: 'TaskBloom supports 8 campaign types: Website Traffic, YouTube Promotion, App Downloads, Social Engagement, Business Reviews, Search Visibility, Ecommerce Awareness, and Content Promotion. Advertisers pay $1.00/task, users earn $0.50/task.' },
  { keyword: 'fraud detection', answer: 'TaskBloom\'s fraud detection monitors: device fingerprints (max 3 per campaign), IP addresses (max 5 per campaign), minimum task time (30 seconds), screenshot size checks (10KB-5MB), and activity pattern analysis. Violations trigger manual review.' },
  { keyword: 'age requirement', answer: 'You must be at least 18 years old to use TaskBloom. This is a compliance requirement and applies to all users globally.' },
  { keyword: 'data retention', answer: 'TaskBloom retains your data for up to 730 days (2 years) for compliance purposes. You have the right to request data deletion or export under GDPR/CCPA. Contact support to exercise these rights.' },
];

function levenshteinSimilarity(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  const dist = (() => {
    const matrix: number[][] = [];
    for (let i = 0; i <= a.length; i++) { matrix[i] = [i]; }
    for (let j = 0; j <= b.length; j++) { matrix[0][j] = j; }
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        matrix[i][j] = a[i-1] === b[j-1]
          ? matrix[i-1][j-1]
          : Math.min(matrix[i-1][j-1] + 1, matrix[i][j-1] + 1, matrix[i-1][j] + 1);
      }
    }
    return matrix[a.length][b.length];
  })();
  return 1 - dist / maxLen;
}

function fuzzyScore(msg: string, keyword: string): number {
  const m = msg.toLowerCase();
  const k = keyword.toLowerCase();
  if (m === k) return 1;
  const msgWords = m.split(/\s+/).filter(Boolean);
  const kwWords = k.split(/\s+/).filter(Boolean);
  if (!msgWords.length || !kwWords.length) return 0;
  const overlap = kwWords.filter(w => msgWords.includes(w)).length;
  const union = new Set([...msgWords, ...kwWords]).size;
  const wordScore = overlap / union;
  const charScore = levenshteinSimilarity(m, k);
  return wordScore * 0.6 + charScore * 0.4;
}

function findBestMatch(msg: string): { answer: string; score: number; source: 'exact' | 'fuzzy' } | null {
  const m = msg.toLowerCase().trim();
  let best: { answer: string; score: number; source: 'exact' | 'fuzzy' } | null = null;
  for (const entry of KNOWLEDGE_BASE) {
    const k = entry.keyword.toLowerCase();
    if (m === k || m.includes(k) || k.includes(m)) {
      return { answer: entry.answer, score: 1, source: 'exact' };
    }
    const score = fuzzyScore(m, k);
    if (score > 0.45 && (!best || score > best.score)) {
      best = { answer: entry.answer, score, source: 'fuzzy' };
    }
  }
  return best;
}

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
  source?: 'exact' | 'fuzzy' | 'ai';
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: 'Hi! 👋 How can I help you today?', source: 'exact' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || text.length < 3 || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text }]);
    setLoading(true);

    const match = findBestMatch(text);
    if (match && match.score > 0.5) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', text: match!.answer, source: match!.source }]);
        setLoading(false);
      }, 400);
      return;
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.answer, source: data.source || 'ai' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I\'m having trouble right now. Please try again or email support@taskbloom.co.uk.', source: 'ai' }]);
    }
    setLoading(false);
  };

  return (
    <div className="chat-widget-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="chat-window"
          >
            <div className="chat-header">
              <h3>💬 Chat Support</h3>
              <button onClick={() => setIsOpen(false)} aria-label="Close chat">✕</button>
            </div>

            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-msg ${msg.role}`}>
                  {msg.text}
                  <div className="msg-source">
                    {msg.source === 'exact' ? 'FAQ' : msg.source === 'fuzzy' ? 'Suggested' : msg.source === 'ai' ? 'AI' : ''}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="typing-dots">
                  <span /><span /><span />
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="chat-input-area">
              <input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                maxLength={500}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                disabled={loading}
              />
              <button onClick={handleSend} disabled={loading || !input.trim() || input.trim().length < 3} aria-label="Send">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#7c3aed] flex items-center justify-center text-white shadow-xl shadow-[#6366f1]/30 hover:shadow-[#6366f1]/50 transition-shadow cursor-pointer"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
          </svg>
        )}
      </motion.button>
    </div>
  );
}
