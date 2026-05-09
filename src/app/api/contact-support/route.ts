import { NextResponse } from 'next/server';

function buildEmailHtml(data: { email: string; whatsapp: string; telegram: string; message: string; pageUrl: string }): string {
  const now = new Date().toUTCString();
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; padding: 32px;">
  <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #6366f1, #7c3aed); padding: 24px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 20px;">📞 New Support Request</h1>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Contact Info</td><td></td></tr>
        <tr><td style="padding: 4px 0; color: #1e293b; font-weight: 600; width: 120px;">Email</td><td style="padding: 4px 0; color: #6366f1;">${esc(data.email)}</td></tr>
        ${data.whatsapp ? `<tr><td style="padding: 4px 0; color: #1e293b; font-weight: 600;">WhatsApp</td><td style="padding: 4px 0;">${esc(data.whatsapp)}</td></tr>` : ''}
        ${data.telegram ? `<tr><td style="padding: 4px 0; color: #1e293b; font-weight: 600;">Telegram</td><td style="padding: 4px 0;">${esc(data.telegram)}</td></tr>` : ''}
        <tr><td style="padding: 16px 0 4px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">User's Question</td><td></td></tr>
        <tr><td colspan="2" style="padding: 8px 12px; background: #f1f5f9; border-radius: 8px; color: #1e293b; font-size: 14px; line-height: 1.5;">${esc(data.message || 'No question provided')}</td></tr>
        <tr><td style="padding: 16px 0 4px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Metadata</td><td></td></tr>
        <tr><td style="padding: 4px 0; color: #1e293b; font-weight: 600;">Source</td><td style="padding: 4px 0;">Chat Widget</td></tr>
        <tr><td style="padding: 4px 0; color: #1e293b; font-weight: 600;">Page URL</td><td style="padding: 4px 0; color: #6366f1;">${esc(data.pageUrl)}</td></tr>
        <tr><td style="padding: 4px 0; color: #1e293b; font-weight: 600;">Timestamp</td><td style="padding: 4px 0;">${now}</td></tr>
      </table>
    </div>
    <div style="background: #f8fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="color: #94a3b8; font-size: 12px; margin: 0;">TaskBloom Chat Widget &bull; docs.taskbloom.co.uk</p>
    </div>
  </div>
</body>
</html>`;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, whatsapp = '', telegram = '', message = '', pageUrl = '' } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const apiKey = process.env.TASKBLOOM_BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const html = buildEmailHtml({ email: email.trim(), whatsapp: whatsapp.trim(), telegram: telegram.trim(), message: message.trim(), pageUrl });

    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { name: 'TaskBloom Chat Widget', email: 'no-reply@taskbloom.co.uk' },
        to: [{ email: 'support@taskbloom.co.uk', name: 'TaskBloom Support' }],
        subject: `🔔 New Support Request from ${email.trim()}`,
        htmlContent: html,
        replyTo: { email: email.trim(), name: email.trim() },
      }),
    });

    if (!brevoRes.ok) {
      const errText = await brevoRes.text();
      console.error('Brevo send error:', brevoRes.status, errText);
      return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Your request has been sent. Our team will reach out within 24 hours.' });

  } catch (error) {
    console.error('Contact support error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
