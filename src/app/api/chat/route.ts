import { NextResponse } from 'next/server';

const FAQ_MAP: { keyword: string; answer: string }[] = [
  { keyword: 'how to withdraw', answer: 'Minimum withdrawal is $10. Fees are 2.9% + $0.30 per payout. Withdrawals are held for 72 hours for fraud prevention, then processed within 24-48 hours. Go to Wallet > Withdraw to request.' },
  { keyword: 'minimum withdrawal', answer: 'The minimum payout amount is $10. A payout fee of 2.9% + $0.30 applies. Withdrawals go through a 72-hour hold period before processing.' },
  { keyword: 'task rejected', answer: 'Tasks are rejected if incomplete, suspicious activity is detected, or VPN/proxy is used. New users are limited to 5 tasks/day. Minimum task time is 30 seconds.' },
  { keyword: 'referral bonus', answer: 'Referral commissions: Level 1 (direct): 5%, Level 2: 3%, Level 3: 1%. Up to 3 referral levels. Commissions are paid on your referral\'s task earnings.' },
  { keyword: 'how to earn', answer: 'Complete micro-tasks to earn $0.50 per task baseline. New users: 5 tasks/day, max 50 tasks/day. Browse available tasks in your dashboard.' },
  { keyword: 'payout fee', answer: 'Payout fees are 2.9% + $0.30 per withdrawal. Example: withdrawing $10 costs $0.59 in fees.' },
  { keyword: 'registration fee', answer: 'There is a one-time $1.00 registration fee to create an account. This helps prevent fraud.' },
  { keyword: 'forgot password', answer: 'Go to the Login page, click "Forgot Password", enter your email, and check your inbox for the reset link.' },
  { keyword: 'what is taskbloom', answer: 'TaskBloom connects advertisers with real users across 120+ countries. Users earn $0.50/task completing micro-tasks. Advertisers pay $1.00/task for real human engagement.' },
  { keyword: 'support', answer: 'Contact us at support@taskbloom.co.uk or visit the Contact page. We respond within 24 hours on business days.' },
  { keyword: 'pricing', answer: 'Campaigns start from £99 (Starter plan, up to 500 tasks). Advertisers pay $1.00/task, users earn $0.50/task. Visit the Pricing page for full details.' },
  { keyword: 'advertiser', answer: 'Advertisers can launch campaigns targeting 120+ countries. Pay $1.00/task, users earn $0.50/task. Create your first campaign from the Advertiser dashboard.' },
  { keyword: 'age requirement', answer: 'You must be at least 18 years old to use TaskBloom. This applies to all users globally.' },
  { keyword: 'fraud detection', answer: 'Fraud detection monitors: device fingerprints (max 3 per campaign), IP addresses (max 5), minimum task time (30s), and activity patterns.' },
];

function fuzzyScore(msg: string, keyword: string): number {
  const m = msg.toLowerCase();
  const k = keyword.toLowerCase();
  if (m === k) return 1;
  const msgWords = m.split(/\s+/).filter(Boolean);
  const kwWords = k.split(/\s+/).filter(Boolean);
  if (!msgWords.length || !kwWords.length) return 0;
  const overlap = kwWords.filter(w => msgWords.includes(w)).length;
  const union = new Set([...msgWords, ...kwWords]).size;
  return overlap / union;
}

function findBestMatch(msg: string): { answer: string; source: 'exact' | 'fuzzy' } | null {
  const m = msg.toLowerCase().trim();
  let best: { answer: string; source: 'exact' | 'fuzzy'; score: number } | null = null;
  for (const entry of FAQ_MAP) {
    const k = entry.keyword.toLowerCase();
    if (m === k || m.includes(k) || k.includes(m)) {
      return { answer: entry.answer, source: 'exact' };
    }
    const score = fuzzyScore(m, k);
    if (score > 0.4 && (!best || score > best.score)) {
      best = { answer: entry.answer, source: 'fuzzy', score };
    }
  }
  return best;
}

const SYSTEM_PROMPT = `You are the TaskBloom AI assistant. TaskBloom is a micro-task platform connecting advertisers with real users across 120+ countries. Key facts: Minimum withdrawal $10, payout fee 2.9%+$0.30, 72-hour hold period, registration fee $1, users earn $0.50/task, advertisers pay $1.00/task, new users limited to 5 tasks/day (max 50), 3-level referral commissions (5%/3%/1%), campaigns start at £99, age minimum 18. Keep responses concise under 100 words. Be friendly and professional. Use accurate data only. If unsure, suggest contacting support@taskbloom.co.uk.`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    if (!message || typeof message !== 'string' || message.trim().length < 3) {
      return NextResponse.json({ error: 'Message must be at least 3 characters' }, { status: 400 });
    }
    const sanitized = message.trim().slice(0, 500);

    // Layer 1 & 2: FAQ match
    const match = findBestMatch(sanitized);
    if (match) {
      return NextResponse.json({ answer: match.answer, source: match.source, confidence: match.source === 'exact' ? 100 : 85 });
    }

    // Layer 3: AI fallback via Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ answer: 'I\'m unable to answer that right now. Please email support@taskbloom.co.uk for help.', source: 'ai', confidence: 0 });
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: SYSTEM_PROMPT },
                { text: `User question: ${sanitized}` },
                { text: 'Provide a concise, helpful answer as the TaskBloom assistant.' },
              ],
            },
          ],
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('Gemini API error:', geminiRes.status, errText);
      return NextResponse.json({ answer: 'Sorry, I\'m having trouble connecting. Please email support@taskbloom.co.uk.', source: 'ai', confidence: 0 });
    }

    const data = await geminiRes.json();
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!answer) {
      return NextResponse.json({ answer: 'Sorry, I couldn\'t generate a response. Please try again or email support@taskbloom.co.uk.', source: 'ai', confidence: 0 });
    }

    return NextResponse.json({ answer: answer.slice(0, 600), source: 'ai', confidence: 90 });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ answer: 'An error occurred. Please email support@taskbloom.co.uk.', source: 'ai', confidence: 0 });
  }
}
