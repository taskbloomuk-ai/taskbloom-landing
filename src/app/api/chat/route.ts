import { NextResponse } from 'next/server';

const FAQ_MAP: { keyword: string; answer: string }[] = [
  { keyword: 'how to withdraw', answer: 'To withdraw your earnings:\n 1) Go to Wallet\n 2) Click "Withdraw"\n 3) Minimum $10\n 4) Fee: 2.9% + $0.30\n 5) Choose payment: PayPal, Stripe, Wise, or Crypto\n 6) Confirm\n\n72-hour hold, then 24-48h processing.' },
  { keyword: 'how to get voucher', answer: 'Vouchers are required to register. Get one from a TaskBloom reseller. Resellers buy vouchers in bulk and sell registration codes. Contact support for reseller recommendations.' },
  { keyword: 'how to contact reseller', answer: 'Resellers are independent distributors. For reseller recommendations, contact our support team via the form in the chat widget.' },
  { keyword: 'how to register', answer: 'To register:\n 1) Go to /register\n 2) Enter name, email, password (min 8 chars)\n 3) Enter a valid voucher code (required)\n 4) Referral code (optional)\n 5) Select your country\n 6) Click "Create Account"\n\nNo email verification needed.' },
  { keyword: 'package', answer: 'Bronze: $9.99/mo — 5 tasks/day, 150/mo, earn $11.99/mo\nSilver: $49.99/mo — 20 tasks/day, 300/mo, earn $74.99/mo\nGold: $99.99/mo — 40 tasks/day, 750/mo, earn $199.98/mo\nPlatinum: $499.99/mo — 100 tasks/day, 1800/mo, earn $1,499.97/mo\nDiamond: $999.99/mo — Unlimited tasks and earnings.' },
  { keyword: 'task types', answer: 'Google Review: $0.40-$0.70\nYouTube Subscribe: $0.10-$0.18\nYouTube Like: $0.05-$0.10\nInstagram Follow: $0.08-$0.12\nInstagram Like: $0.04-$0.08\nTikTok View: $0.05-$0.12\nSurvey: $0.25-$0.50\nApp Download: $0.15-$0.25\nFacebook Video View: $0.05-$0.15' },
  { keyword: 'referral', answer: '3-level referral:\nLevel 1 (direct): 5%\nLevel 2: 3%\nLevel 3: 1%\nPlus bonus daily tasks per active referral.' },
  { keyword: 'payout method', answer: 'Payment methods: PayPal, Stripe, Wise, Crypto.\nMinimum: $10 | Fee: 2.9% + $0.30\n72-hour hold, 24-48h processing.' },
  { keyword: 'earning cap', answer: 'Bronze: $11.99/mo | Silver: $74.99/mo\nGold: $199.98/mo | Platinum: $1,499.97/mo\nDiamond: Unlimited\nReset on the 1st of each month.' },
  { keyword: 'task review', answer: 'Tasks take 24-72 hours to review. If rejected, try again after 24 hours. Tasks expire after 48 hours if not submitted.' },
  { keyword: 'support', answer: 'Contact our team via the chat widget form or email support@taskbloom.co.uk. We respond within 24 hours.' },
  { keyword: 'what is taskbloom', answer: 'TaskBloom connects businesses with real users across 120+ countries. Workers earn $0.04-$0.70 per task. Advertisers pay $1.00/task. Resellers distribute vouchers.' },
];

const SYSTEM_PROMPT = `You are the TaskBloom AI assistant. Use ONLY these facts:

REGISTRATION: /register — name, email, password (8+ chars), voucher code REQUIRED, referral optional, country. No email verification. Redirects to /tasks.

PACKAGES:
Bronze $9.99/mo — 5 tasks/day, 150/mo, earn $11.99/mo
Silver $49.99/mo — 20/day, 300/mo, earn $74.99/mo
Gold $99.99/mo — 40/day, 750/mo, earn $199.98/mo
Platinum $499.99/mo — 100/day, 1800/mo, earn $1,499.97/mo
Diamond $999.99/mo — unlimited

TASK TYPES & PAY:
Google Review $0.40-$0.70, YouTube Subscribe $0.10-$0.18, YouTube Like $0.05-$0.10, Instagram Follow $0.08-$0.12, Instagram Like $0.04-$0.08, TikTok View $0.05-$0.12, Survey $0.25-$0.50, App Download $0.15-$0.25, Facebook Video View $0.05-$0.15.

PAYOUTS: Min $10. Fee 2.9%+$0.30. 72h hold + 24-48h processing. Methods: PayPal, Stripe, Wise, Crypto.

REFERRALS: 3 levels (5%/3%/1%) + bonus daily tasks per active referral.

VOUCHERS: Required to register. Get from resellers. Prefixes: TB-BRNZ, TB-SILV, TB-GOLD, TB-PLAT, TB-DMND.

TASKS: 48h deadline. 24-72h review. Cancel only if locked/in-progress.

If you cannot answer accurately, say: "I don't have that information. Please use the contact form in the chat widget and our team will help you."

Keep responses concise under 100 words. Use line breaks for readability.`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    if (!message || typeof message !== 'string' || message.trim().length < 3) {
      return NextResponse.json({ error: 'Message must be at least 3 characters' }, { status: 400 });
    }
    const sanitized = message.trim().slice(0, 500);

    // Layer 1 & 2: FAQ match
    const m = sanitized.toLowerCase().trim();
    let best: { answer: string; source: 'exact' | 'fuzzy'; score: number } | null = null;
    for (const entry of FAQ_MAP) {
      const k = entry.keyword.toLowerCase();
      if (m === k || m.includes(k) || k.includes(m)) {
        return NextResponse.json({ answer: entry.answer, source: 'exact', confidence: 100 });
      }
      const mw = m.split(/\s+/).filter(Boolean);
      const kw = k.split(/\s+/).filter(Boolean);
      const overlap = kw.filter(w => mw.includes(w)).length;
      const union = new Set([...mw, ...kw]).size;
      const maxLen = Math.max(m.length, k.length);
      let levDist = maxLen;
      if (maxLen > 0) {
        const d: number[][] = [];
        for (let i = 0; i <= m.length; i++) d[i] = [i];
        for (let j = 0; j <= k.length; j++) d[0][j] = j;
        for (let i = 1; i <= m.length; i++) {
          for (let j = 1; j <= k.length; j++) {
            d[i][j] = m[i-1] === k[j-1] ? d[i-1][j-1] : Math.min(d[i-1][j-1]+1, d[i][j-1]+1, d[i-1][j]+1);
          }
        }
        levDist = d[m.length][k.length];
      }
      const score = (overlap / union) * 0.6 + (1 - levDist / maxLen) * 0.4;
      if (score > 0.4 && (!best || score > best.score)) {
        best = { answer: entry.answer, source: 'fuzzy', score };
      }
    }
    if (best) {
      return NextResponse.json({ answer: best.answer, source: best.source, confidence: Math.round(best.score * 100) });
    }

    // Layer 3: AI fallback via Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ answer: "I don't have that information. Please use the contact form in the chat widget and our team will help you.", source: 'ai', confidence: 0 });
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: SYSTEM_PROMPT }, { text: `User: ${sanitized}` }, { text: 'Answer concisely:' }] }],
        }),
      }
    );

    if (!geminiRes.ok) {
      return NextResponse.json({ answer: "I don't have that information. Please use the contact form in the chat widget and our team will help you.", source: 'ai', confidence: 0 });
    }

    const data = await geminiRes.json();
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!answer || answer.includes('unable') || answer.includes('sorry')) {
      return NextResponse.json({ answer: "I don't have that information. Please use the contact form in the chat widget and our team will help you.", source: 'ai', confidence: 0 });
    }

    return NextResponse.json({ answer: answer.slice(0, 600), source: 'ai', confidence: 90 });

  } catch {
    return NextResponse.json({ answer: "I don't have that information. Please use the contact form in the chat widget and our team will help you.", source: 'ai', confidence: 0 });
  }
}
