import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, contactInfo, message } = await req.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Missing Telegram credentials in env');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const text = `📬 *New Portfolio Message*\n\n*Name:* ${name || 'Anonymous'}\n*Contact:* ${contactInfo || 'Not provided'}\n\n*Message:*\n${message}`;

    const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown'
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Telegram API error:', errorData);
      return NextResponse.json({ error: 'Failed to send message via Telegram' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
