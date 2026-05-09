import { NextResponse } from 'next/server';

const FAQ_MAP: { keyword: string; answer: string }[] = [
  { keyword: 'how to withdraw', answer: 'To withdraw your earnings:\n 1) Go to Wallet in your dashboard\n 2) Click "Withdraw"\n 3) Minimum withdrawal is $10\n 4) A 2.9% + $0.30 fee applies\n 5) Choose payment method\n 6) Confirm\n\nPayouts process within 24-48 hours after a 72-hour hold period.' },
  { keyword: 'minimum withdrawal', answer: 'Minimum payout: $10\nPayout fee: 2.9% + $0.30\nHold period: 72 hours\nProcessing: 24-48 hours after hold' },
  { keyword: 'task rejected', answer: 'Tasks can be rejected for:\n- Incomplete steps\n- Suspicious activity\n- VPN/proxy detection\n- Policy violations\n\nNew users: 5 tasks/day limit.\nMinimum task time: 30 seconds.' },
  { keyword: 'referral bonus', answer: 'Referral commission system:\n\nLevel 1 (direct): 5% of referral earnings\nLevel 2: 3%\nLevel 3: 1%\n\nUp to 3 referral levels.' },
  { keyword: 'how to earn', answer: 'Complete micro-tasks to earn $0.50 per task.\n\nTask types: sign-ups, surveys, app downloads, video watches, link clicks\nNew users: 5 tasks/day\nMax limit: 50 tasks/day' },
  { keyword: 'payout fee', answer: 'Payout fee: 2.9% + $0.30 per withdrawal.\n\nExample: Withdrawing $10 = $0.59 fee, you receive $9.41.' },
  { keyword: 'registration fee', answer: 'One-time registration fee: $1.00\n\nPurpose: Verifies genuine users and prevents fraud.' },
  { keyword: 'forgot password', answer: 'To reset your password:\n 1) Go to the Login page\n 2) Click "Forgot Password"\n 3) Enter your email\n 4) Check inbox for reset link\n 5) Create new password (min 8 chars)' },
  { keyword: 'what is taskbloom', answer: 'TaskBloom connects advertisers with real users across 120+ countries.\n\nUsers: Earn $0.50/task completing micro-tasks\nAdvertisers: Pay $1.00/task for real human engagement' },
  { keyword: 'support', answer: 'Contact TaskBloom support:\n\nEmail: support@taskbloom.co.uk\nContact form: taskbloom.co.uk/contact\n\nResponse time: Within 24 hours on business days.' },
  { keyword: 'pricing', answer: 'Campaign pricing:\n\nStarter plan: £99 (up to 500 tasks)\nAdvertiser cost: $1.00/task\nUser earning: $0.50/task\n\nSet daily caps, pause anytime.' },
  { keyword: 'advertiser', answer: 'Advertiser benefits:\n- Target 120+ countries\n- Real human engagement\n- Pay $1.00/task, users earn $0.50/task\n- 8 campaign types\n\nCreate your first campaign from the Advertiser dashboard.' },
  { keyword: 'age requirement', answer: 'You must be at least 18 years old to use TaskBloom.\n\nThis applies to all users globally.' },
  { keyword: 'fraud detection', answer: 'Fraud detection monitors:\n- Device fingerprints (max 3 per campaign)\n- IP addresses (max 5 per campaign)\n- Minimum task time (30 seconds)\n- Screenshot size checks (10KB-5MB)\n- Activity pattern analysis' },
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
