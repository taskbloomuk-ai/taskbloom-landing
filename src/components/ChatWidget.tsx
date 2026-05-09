'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KB: { k: string; a: string }[] = [
  { k: 'how to withdraw', a: 'To withdraw your earnings:\n 1) Go to Wallet in your dashboard\n 2) Click "Withdraw"\n 3) Minimum withdrawal is $10\n 4) A 2.9% + $0.30 fee applies\n 5) Choose payment method (PayPal, Stripe, Wise, Crypto)\n 6) Confirm\n\nPayouts process within 24-48 hours after a 72-hour hold period.' },
  { k: 'minimum withdrawal', a: 'Minimum withdrawal: $10\nFee: 2.9% + $0.30\nHold period: 72 hours\nProcessing: 24-48 hours after hold\n\nMethods: PayPal, Stripe, Wise, Crypto' },
  { k: 'payout fee', a: 'Fee: 2.9% + $0.30 per withdrawal\n\nExample:\nWithdrawing $10\nFee = ($10 × 2.9%) + $0.30 = $0.59\nNet = $9.41' },
  { k: 'payout method', a: 'Payment methods:\n- PayPal\n- Stripe (credit card)\n- Wise (international bank transfer)\n- Crypto\n\nMinimum: $10 | Fee: 2.9% + $0.30\n72-hour hold, then 24-48h processing.' },
  { k: 'payout hold', a: 'All withdrawals go through a 72-hour (3 day) security hold.\n\nPurpose: Fraud prevention\nAfter hold: Payment processes within 24-48 hours.\nIf longer than 7 days total, contact support.' },
  { k: 'task rejected', a: 'Tasks can be rejected for:\n- Incomplete action\n- Invalid or unclear proof/screenshot\n- Wrong account used\n- VPN or proxy detected\n\nYou can try another task after 24 hours.\nContact support with your task ID for specifics.' },
  { k: 'task review time', a: 'Task review typically takes 24-72 hours after submission.\n\nIf your task is approved: Earnings are credited.\nIf rejected: You\'ll see the reason and can try again after 24 hours.' },
  { k: 'task expired', a: 'Tasks have a 48-hour deadline from when you start them.\n\nIf you don\'t submit within 48 hours, the task expires and you won\'t be paid.\nComplete tasks promptly to avoid this.' },
  { k: 'cancel task', a: 'To cancel a task:\n 1) Go to the task page\n 2) Click "Cancel Task"\n\nYou can only cancel tasks in "locked" or "in progress" status.\nSubmitted tasks cannot be canceled.' },
  { k: 'task limit', a: 'Daily task limits depend on your package:\n\nBronze: 5/day (150/month)\nSilver: 20/day (300/month)\nGold: 40/day (750/month)\nPlatinum: 100/day (1,800/month)\nDiamond: Unlimited\n\nLimits reset at midnight daily and on the 1st of each month.' },
  { k: 'no task available', a: 'Possible reasons no tasks are available:\n- Daily or monthly limit reached (wait for reset)\n- No campaigns in your region right now\n- Earning cap reached (upgrade your package)\n- A task is already in progress (complete or cancel it first)\n- No active package (purchase/renew at /packages)\n\nCheck back later or upgrade your package.' },
  { k: 'how to earn', a: 'Earn money by completing tasks on TaskBloom:\n\nGoogle Review: $0.40-$0.70\nYouTube Subscribe: $0.10-$0.18\nYouTube Like: $0.05-$0.10\nInstagram Follow: $0.08-$0.12\nInstagram Like: $0.04-$0.08\nTikTok View: $0.05-$0.12\nTikTok Like: $0.04-$0.08\nFacebook Video View: $0.05-$0.15\nSurvey: $0.25-$0.50\nApp Download: $0.15-$0.25\n\nBrowse available tasks in your dashboard.' },
  { k: 'google review', a: 'Google Review tasks pay $0.40-$0.70.\n\nProof required: Screenshot of your published review.\nSubmit a clear, well-lit screenshot showing the completed review.' },
  { k: 'youtube subscribe', a: 'YouTube Subscribe tasks pay $0.10-$0.18.\n\nProof required: Screenshot showing you\'re subscribed to the channel.' },
  { k: 'instagram follow', a: 'Instagram Follow tasks pay $0.08-$0.12.\n\nProof required: Screenshot showing you follow the account.' },
  { k: 'tiktok view', a: 'TikTok View tasks pay $0.05-$0.12.\n\nProof: Automatic (no screenshot needed). Just watch the video.' },
  { k: 'survey', a: 'Survey tasks pay $0.25-$0.50.\n\nProof required: Link or screenshot of the confirmation page after completing the survey.' },
  { k: 'referral', a: 'TaskBloom 3-level referral system:\n\nLevel 1 (direct referrals): 5% of their earnings\nLevel 2 (their referrals): 3%\nLevel 3: 1%\n\nPlus: Bonus daily tasks per active referral.\nCommissions credited when referral\'s task is approved.\nFind your referral code at /referrals.' },
  { k: 'referral code', a: 'Find your referral code at /referrals.\n\nShare this link: taskbloom.co.uk/register?ref=YOURCODE\n\nYou earn:\n- 5% from direct referrals\n- 3% from their referrals\n- 1% from the third level\n- Bonus daily tasks per active referral' },
  { k: 'package', a: 'TaskBloom packages:\n\nBronze: $9.99/mo — 5 tasks/day, 150/month, earn up to $11.99/mo\nSilver: $49.99/mo — 20 tasks/day, 300/month, earn up to $74.99/mo\nGold: $99.99/mo — 40 tasks/day, 750/month, earn up to $199.98/mo\nPlatinum: $499.99/mo — 100 tasks/day, 1,800/month, earn up to $1,499.97/mo\nDiamond: $999.99/mo — Unlimited tasks, unlimited earnings\n\nUpgrade at /packages using a voucher code.' },
  { k: 'bronze package', a: 'Bronze package: $9.99/month\n- 5 tasks per day\n- 150 tasks per month\n- Max earnings: $11.99/month\n- Referral bonus: +1 task per active referral' },
  { k: 'silver package', a: 'Silver package: $49.99/month\n- 20 tasks per day\n- 300 tasks per month\n- Max earnings: $74.99/month\n- Referral bonus: +2 tasks per active referral' },
  { k: 'earning cap', a: 'Each package has a monthly earning cap:\n\nBronze: $11.99/mo (120% of package price)\nSilver: $74.99/mo (150%)\nGold: $199.98/mo (200%)\nPlatinum: $1,499.97/mo (300%)\nDiamond: Unlimited\n\nOnce you hit your cap, new tasks unlock on the 1st of next month, or upgrade your package.' },
  { k: 'how to register', a: 'To register on TaskBloom:\n 1) Go to /register\n 2) Enter your full name and email\n 3) Create a password (min 8 characters)\n 4) Enter a valid voucher code (required)\n 5) Enter referral code if invited (optional)\n 6) Select your country\n 7) Click "Create Account"\n\nNo email verification needed — you\'re logged in automatically and redirected to your dashboard.' },
  { k: 'registration rejected', a: 'Registration rejection reasons:\n- "Email already registered" — you already have an account\n- "Invalid voucher code" — check the code and try again\n- "All fields required" — make sure every field is filled in\n\nRegistration requires a VALID voucher code.\nGet one from a reseller if you don\'t have it.' },
  { k: 'create account', a: 'To create an account:\n 1) Go to taskbloom.co.uk/register\n 2) Fill in: Full Name, Email, Password (min 8 chars)\n 3) Enter a valid voucher code (required)\n 4) Add referral code if invited (optional)\n 5) Select your country\n 6) Click "Create Account"\n\nAfter registering: Redirected to /tasks to start earning!' },
  { k: 'how to get voucher', a: 'Vouchers are digital codes required to register on TaskBloom.\n\nHow to get one:\n- Purchase from a TaskBloom reseller (they buy in bulk and sell registration codes)\n- Resellers distribute vouchers at their own pricing\n- Contact our support team for reseller recommendations\n\nVouchers activate your package (Bronze, Silver, Gold, etc.) and unlock your account.' },
  { k: 'who is reseller', a: 'Resellers are independent distributors who buy TaskBloom voucher codes in bulk at wholesale prices and sell them to workers at their own pricing.\n\nThey profit from the markup. To find one: contact support for recommendations.\nTo become a reseller: register at /reseller (may require admin approval).' },
  { k: 'how to contact reseller', a: 'Resellers are independent distributors of TaskBloom vouchers.\n\nTo find a reseller:\n- Contact our support team for recommendations\n- Use the form below to reach support\n- They\'ll connect you with trusted resellers\n\nTo become a reseller yourself: Register at /reseller (may require admin approval).' },
  { k: 'voucher code', a: 'A voucher code is required to register on TaskBloom.\n\nHow to get one:\n- Purchase from a reseller\n- Resellers buy in bulk and sell registration/upgrade codes\n- Contact support for reseller recommendations\n\nVoucher types: Registration (new users), Package Upgrade (upgrade tier), Advertiser (campaign funding).\nPrefixes: TB-BRNZ (Bronze), TB-SILV (Silver), TB-GOLD (Gold), TB-PLAT (Platinum), TB-DMND (Diamond).' },
  { k: 'upgrade package', a: 'To upgrade your package:\n 1) Go to /packages/upgrade\n 2) Use a voucher code for the target package\n 3) Or meet achievement requirements\n\nHigher packages = more tasks/day + higher earning caps.\nUpgrade to unlock your full earning potential!' },
  { k: 'forgot password', a: 'To reset your password:\n 1) Go to the Login page\n 2) Click "Forgot Password"\n 3) Enter your email address\n 4) Check your inbox for the reset link\n 5) Create a new password (min 8 characters)' },
  { k: 'account blocked', a: 'Possible reasons:\n- Suspicious activity detected\n- Policy violations\n- Fraud detection flags\n- Age verification (minimum 18)\n\nTo appeal: Contact support@taskbloom.co.uk with your registered email and details.' },
  { k: 'what is taskbloom', a: 'TaskBloom is a global human engagement platform connecting businesses with real users across 120+ countries.\n\n- Workers: Complete micro-tasks and earn real money\n- Advertisers: Launch campaigns to promote their businesses\n- Resellers: Distribute vouchers at their own pricing\n\nTask types: Google Reviews, YouTube, Instagram, TikTok, Surveys, App Downloads, and more.' },
  { k: 'advertiser', a: 'Advertisers on TaskBloom can:\n- Launch campaigns targeting 120+ countries\n- Get real human engagement (not bots)\n- Choose from 8 campaign types\n- Set daily spending caps and pause anytime\n- Pay $1.00 per task task (user earns $0.40-$0.70)\n\nCreate your first campaign from the Advertiser dashboard.' },
  { k: 'campaign', a: '8 campaign types:\n 1) Website Traffic\n 2) YouTube Promotion\n 3) App Downloads\n 4) Social Engagement\n 5) Business Reviews\n 6) Search Visibility\n 7) Ecommerce Awareness\n 8) Content Promotion\n\nAdvertiser pays $1.00/task | User earns $0.40-$0.70/task depending on type.' },
  { k: 'pricing', a: 'Advertiser pricing:\n\nStarter plan: £99 (up to 500 tasks)\nCost per task: $1.00\n\nWorker packages:\nBronze: $9.99/mo (5 tasks/day)\nSilver: $49.99/mo (20 tasks/day)\nGold: $99.99/mo (40 tasks/day)\nPlatinum: $499.99/mo (100 tasks/day)\nDiamond: $999.99/mo (unlimited)\n\nSet daily caps, pause campaigns anytime.' },
  { k: 'support', a: 'Need help? Fill in the contact form below and our team will reach out within 24 hours.\n\nOr email: support@taskbloom.co.uk\nDocs: docs.taskbloom.co.uk' },
  { k: 'talk to human', a: '__CONTACT__' },
  { k: 'contact support', a: '__CONTACT__' },
  { k: 'real person', a: '__CONTACT__' },
  { k: 'human agent', a: '__CONTACT__' },
  { k: 'contact form', a: '__CONTACT__' },
  { k: 'where is form', a: '__CONTACT__' },
  { k: 'show form', a: '__CONTACT__' },
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
  const m = msg.toLowerCase().trim();
  const k = keyword.toLowerCase();
  if (m === k) return 1;
  const mw = m.split(/\s+/).filter(Boolean);
  const kw = k.split(/\s+/).filter(Boolean);
  if (!mw.length || !kw.length) return 0;
  const overlap = kw.filter(w => mw.includes(w)).length;
  const union = new Set([...mw, ...kw]).size;
  return (overlap / union) * 0.6 + levenshteinSimilarity(m, k) * 0.4;
}

function findBestMatch(msg: string): { answer: string; score: number; source: 'exact' | 'fuzzy'; isContact: boolean } | null {
  const m = msg.toLowerCase().trim();
  let best: { answer: string; score: number; source: 'exact' | 'fuzzy'; isContact: boolean } | null = null;
  for (const entry of KB) {
    const k = entry.k.toLowerCase();
    const isContact = entry.a === '__CONTACT__';
    const answer = isContact ? '' : entry.a;
    if (m === k || m.includes(k) || k.includes(m)) {
      return { answer, score: 1, source: 'exact', isContact };
    }
    const score = fuzzyScore(m, k);
    if (score > 0.45 && (!best || score > best.score)) {
      best = { answer, score, source: 'fuzzy', isContact };
    }
  }
  return best;
}

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
  source?: 'exact' | 'fuzzy' | 'ai' | 'contact';
}

function ContactForm({ onSend }: { onSend: (data: { email: string; whatsapp: string; telegram: string; message: string }) => void }) {
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [telegram, setTelegram] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email.trim() || !email.includes('@')) { setError('Valid email is required'); return; }
    setError('');
    setSending(true);
    try {
      const res = await fetch('/api/contact-support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), whatsapp: whatsapp.trim(), telegram: telegram.trim(), message: message.trim(), pageUrl: window.location.href }),
      });
      if (!res.ok) throw new Error('Failed');
      setSent(true);
      onSend({ email: email.trim(), whatsapp: whatsapp.trim(), telegram: telegram.trim(), message: message.trim() });
    } catch {
      setError('Could not send. Please email support@taskbloom.co.uk directly with your details.');
    }
    setSending(false);
  };

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="chat-msg bot" style={{ maxWidth: '95%', padding: '16px', background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)' }}>
        <div style={{ color: '#a7f3d0', fontWeight: 600, marginBottom: 4 }}>✅ Sent!</div>
        <div style={{ color: '#d1fae5', fontSize: 13 }}>Our team will reach out within 24 hours. Please check your email (and spam folder).</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="chat-msg bot"
      style={{ maxWidth: '95%', padding: '16px', background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)' }}
    >
      <div style={{ color: '#a5b4fc', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
        📞 Contact Support
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email *" style={inputStyle} />
        <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="WhatsApp (optional)" style={inputStyle} />
        <input value={telegram} onChange={e => setTelegram(e.target.value)} placeholder="Telegram (optional)" style={inputStyle} />
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Your question (optional)" rows={2} style={{ ...inputStyle, resize: 'none', borderRadius: 10, padding: '10px 12px', fontFamily: 'inherit' }} />
        {error && <div style={{ color: '#fca5a5', fontSize: 12 }}>{error}</div>}
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={sending}
          style={{
            padding: '10px 0', borderRadius: 10, border: 'none', cursor: sending ? 'not-allowed' : 'pointer',
            background: 'linear-gradient(135deg, #6366f1, #7c3aed)', color: 'white', fontWeight: 600, fontSize: 13, opacity: sending ? 0.6 : 1,
          }}
        >
          {sending ? 'Sending...' : '✓ Send Request'}
        </motion.button>
        <div style={{ color: '#64748b', fontSize: 11, textAlign: 'center' }}>Our team responds within 24 hours</div>
      </div>
    </motion.div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.06)', color: '#e2e8f0', fontSize: 13, outline: 'none',
  boxSizing: 'border-box',
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: 'Hi! 👋 How can I help you today?', source: 'exact' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 300); }, [isOpen]);

  const handleContactDone = () => { setShowContact(false); };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || text.length < 3 || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text }]);
    setLoading(true);

    const match = findBestMatch(text);
    if (match && match.score > 0.5) {
      if (match.isContact) {
        setMessages(prev => [...prev, { role: 'bot', text: "I'll connect you with our team! Please fill in your details below:", source: 'exact' }]);
        setShowContact(true);
        setLoading(false);
        return;
      }
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', text: match!.answer, source: match!.source }]);
        setLoading(false);
      }, 300);
      return;
    }

    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text }) });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      if (data.source === 'ai' && (!data.answer || data.answer.includes('unable') || data.answer.includes('try again') || data.answer.includes('don\'t have') || data.answer.includes("don't have"))) {
        setMessages(prev => [...prev, { role: 'bot', text: data.answer, source: 'ai' }]);
        setMessages(prev => [...prev, { role: 'bot', text: "I wasn't able to fully answer that. Want to leave your details so our team can help personally?", source: 'contact' }]);
        setShowContact(true);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: data.answer, source: data.source || 'ai' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: "I'm having trouble right now. Leave your details below and our team will get back to you.", source: 'ai' }]);
      setShowContact(true);
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
                    {msg.source === 'exact' ? 'FAQ' : msg.source === 'fuzzy' ? 'Suggested' : msg.source === 'ai' ? 'AI' : msg.source === 'contact' ? 'Support' : ''}
                  </div>
                </div>
              ))}
              {showContact && <ContactForm onSend={handleContactDone} />}
              {loading && !showContact && (
                <div className="typing-dots"><span /><span /><span /></div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="chat-input-area" style={{ display: showContact ? 'none' : 'flex' }}>
              <input
                ref={inputRef} type="text" placeholder="Type your message..." maxLength={500}
                value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()} disabled={loading}
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
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
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
