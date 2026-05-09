'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KNOWLEDGE_BASE: { keyword: string; answer: string }[] = [
  { keyword: 'how to withdraw', answer: 'To withdraw your earnings:\n 1) Go to Wallet in your dashboard\n 2) Click "Withdraw"\n 3) Minimum withdrawal is $10\n 4) A 2.9% + $0.30 fee applies\n 5) Choose payment method\n 6) Confirm\n\nPayouts process within 24-48 hours after a 72-hour hold period.' },
  { keyword: 'withdraw money', answer: 'Minimum withdrawal: $10\nFee: 2.9% + $0.30 per payout\nHold period: 72 hours (fraud prevention)\nProcessing: 24-48 hours after hold\n\nGo to Wallet > Withdraw to request.' },
  { keyword: 'minimum withdrawal', answer: 'The minimum payout amount on TaskBloom is $10.\n\nRequirements:\n- Balance must be at least $10\n- Payout fee: 2.9% + $0.30\n- Hold period: 72 hours\n- Processing: 24-48 hours' },
  { keyword: 'task rejected', answer: 'Tasks can be rejected for:\n- Incomplete steps\n- Suspicious activity\n- VPN/proxy detection\n- Policy violations\n- Exceeding fraud thresholds\n\nNew users: 5 tasks/day limit.\nTasks flagged for review (5 flags) are held for manual review.' },
  { keyword: 'why rejected', answer: 'Common rejection reasons:\n- Incomplete steps\n- Duplicate submissions\n- Automated scripts/ bots\n- VPN or proxy detected\n- Mismatched device or location\n- Exceeded fraud review threshold\n\nMinimum task time: 30 seconds.\nContact support with your task ID for specifics.' },
  { keyword: 'referral bonus', answer: 'TaskBloom offers a 3-level referral commission system:\n\nLevel 1 (Direct): 5% of referral earnings\nLevel 2 (Grandparent): 3%\nLevel 3 (Great-grandparent): 1%\n\nCommissions are ongoing as your referrals complete tasks.' },
  { keyword: 'invite friend', answer: 'To invite friends:\n 1) Go to the Referrals page\n 2) Copy your unique referral link\n 3) Share via social media, email, or messaging\n\nYou earn:\n- 5% from direct referrals\n- 3% from their referrals\n- 1% from the third level' },
  { keyword: 'referral commission', answer: 'Referral commission tiers:\n\nLevel 1 (direct): 5% of their task earnings\nLevel 2: 3%\nLevel 3: 1%\n\nUp to 3 referral levels.\nCommissions are credited automatically when your referrals complete approved tasks.' },
  { keyword: 'how to earn', answer: 'Earn money by completing micro-tasks on TaskBloom:\n\n- Each task pays $0.50 (baseline)\n- Task types: sign-ups, surveys, app downloads, video watches, link clicks\n- New users: up to 5 tasks/day\n- Max limit: 50 tasks/day\n\nBrowse available tasks in your dashboard to get started.' },
  { keyword: 'payment method', answer: 'Supported payment methods:\n- Bank transfer\n- PayPal\n- Mobile money (region dependent)\n\nDetails:\n- Minimum withdrawal: $10\n- Payout fee: 2.9% + $0.30\n- 72-hour security hold\n- Processing: 24-48 hours after hold' },
  { keyword: 'task limit', answer: 'Daily task limits:\n- New users: 5 tasks per day\n- Maximum limit: 50 tasks per day\n- Minimum time per task: 30 seconds\n\nYour limit increases as you build trust on the platform.' },
  { keyword: 'payout fee', answer: 'Payout fee: 2.9% + $0.30 per withdrawal\n\nExample:\nWithdrawing $10\nFee = ($10 × 2.9%) + $0.30 = $0.59\nNet amount you receive = $9.41' },
  { keyword: 'payout hold', answer: 'All withdrawal requests go through a 72-hour (3 day) security hold period.\n\nPurpose: Fraud prevention\nAfter hold: Payment processes within 24-48 hours.' },
  { keyword: 'registration fee', answer: 'There is a one-time $1.00 registration fee to create an account on TaskBloom.\n\nPurpose: Verifies genuine users and prevents fraudulent sign-ups.' },
  { keyword: 'account blocked', answer: 'Possible reasons for account blocks:\n- Suspicious activity\n- Policy violations\n- Fraud detection flags\n- Age verification (minimum 18)\n\nTo appeal: Contact support@taskbloom.co.uk or use the Contact page.' },
  { keyword: 'forgot password', answer: 'To reset your password:\n 1) Go to the Login page\n 2) Click "Forgot Password"\n 3) Enter your email address\n 4) Check your inbox for the reset link\n 5) Create a new password (min 8 characters)' },
  { keyword: 'verify email', answer: 'After registration:\n 1) Check your email inbox\n 2) Look for the verification link\n 3) Check spam/junk if not found\n 4) Click the link to verify\n 5) Your account is now active' },
  { keyword: 'how to start', answer: 'Getting started on TaskBloom:\n 1) Create an account (one-time $1 fee)\n 2) Verify your email\n 3) Complete your profile\n 4) Browse available tasks\n 5) Complete tasks and earn\n\nMinimum payout: $10' },
  { keyword: 'what is taskbloom', answer: 'TaskBloom is a global human engagement platform connecting businesses with real users across 120+ countries.\n\n- Users: Complete micro-tasks and earn $0.50/task\n- Advertisers: Post tasks to promote their businesses for $1.00/task\n- A win-win marketplace for real human engagement.' },
  { keyword: 'support', answer: 'Need help? Reach TaskBloom support:\n\nEmail: support@taskbloom.co.uk\nChat: Use this widget\nWebsite: taskbloom.co.uk/contact\n\nResponse time: Within 24 hours on business days.' },
  { keyword: 'contact', answer: 'Ways to contact TaskBloom:\n\nEmail: support@taskbloom.co.uk\nContact form: taskbloom.co.uk/contact\nLive chat: Use this widget\n\nWe aim to respond within 24 hours on business days.' },
  { keyword: 'pricing', answer: 'Campaign pricing:\n\nStarter plan: £99 (up to 500 tasks)\nAdvertiser cost: $1.00 per task\nUser earning: $0.50 per task\n\nFeatures:\n- Set daily spending caps\n- Pause campaigns anytime\n- 8 campaign types available' },
  { keyword: 'advertiser', answer: 'Advertisers on TaskBloom:\n\n- Launch campaigns across 120+ countries\n- Real human engagement (not bots)\n- Pay $1.00 per task\n- Users earn $0.50 per task\n\n8 campaign types available.\nCreate your first campaign from the Advertiser dashboard.' },
  { keyword: 'campaign', answer: 'TaskBloom supports 8 campaign types:\n 1) Website Traffic\n 2) YouTube Promotion\n 3) App Downloads\n 4) Social Engagement\n 5) Business Reviews\n 6) Search Visibility\n 7) Ecommerce Awareness\n 8) Content Promotion\n\nAdvertiser pays $1.00/task | User earns $0.50/task' },
  { keyword: 'fraud detection', answer: 'TaskBloom fraud detection monitors:\n- Device fingerprints (max 3 per campaign)\n- IP addresses (max 5 per campaign)\n- Minimum task time (30 seconds)\n- Screenshot size checks (10KB-5MB)\n- Activity pattern analysis\n\nViolations trigger a manual review process.' },
  { keyword: 'age requirement', answer: 'You must be at least 18 years old to use TaskBloom.\n\nThis is a legal compliance requirement and applies to all users globally without exception.' },
  { keyword: 'data retention', answer: 'Data retention policy:\n- Retention period: Up to 730 days (2 years)\n- Purpose: Legal compliance\n- Your rights: Request data deletion or export\n\nContact support to exercise your GDPR/CCPA rights.' },
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
