import { NextResponse } from 'next/server';

const FAQ_MAP: { keyword: string; answer: string }[] = [
  { keyword: 'how to withdraw', answer: 'To withdraw your earnings: Go to the Wallet page, click "Withdraw", enter the amount (minimum $5), and confirm. Payments process within 24-48 hours.' },
  { keyword: 'task rejected', answer: 'Tasks are rejected if incomplete, suspicious activity is detected, or VPN/proxy is used. Complete all steps carefully and disable any VPN before starting tasks.' },
  { keyword: 'referral bonus', answer: 'Earn $5–$10 per referral when your friend completes their first task. Share your unique referral link from the Referrals page.' },
  { keyword: 'how to earn', answer: 'Complete micro-tasks like sign-ups, surveys, app downloads, and video watches. Each task pays $0.01–$0.50. Browse available tasks in your dashboard.' },
  { keyword: 'minimum withdrawal', answer: 'The minimum withdrawal amount is $5. Withdrawals are processed within 24-48 hours via bank transfer, PayPal, or mobile money.' },
  { keyword: 'forgot password', answer: 'Go to the Login page, click "Forgot Password", enter your email, and check your inbox for the reset link.' },
  { keyword: 'what is taskbloom', answer: 'TaskBloom is a micro-task platform where users earn money by completing simple online tasks. Advertisers post tasks to promote their businesses with real human engagement.' },
  { keyword: 'support', answer: 'Contact us at support@taskbloom.co.uk or visit the Contact page. We respond within 24 hours on business days.' },
  { keyword: 'pricing', answer: 'Campaigns start from £99 (Starter plan, up to 500 tasks). Visit the Pricing page for full plan details.' },
  { keyword: 'advertiser', answer: 'Advertisers can launch campaigns targeting 120+ countries with real human engagement. Create your first campaign from the Advertiser dashboard.' },
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

const SYSTEM_PROMPT = `You are the TaskBloom AI assistant. TaskBloom is a micro-task platform where users earn money completing simple tasks. Keep responses concise (under 100 words). Be friendly and professional. Topics: account help, tasks, payments, referrals, withdrawals, policies. If asked about non-TaskBloom topics, politely redirect. Current info: Withdrawals min $5, referrals pay $5-$10, campaigns start at £99.`;

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
