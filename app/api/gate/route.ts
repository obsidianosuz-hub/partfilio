import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import * as jose from 'jose';

const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'default_fallback_secret_do_not_use_in_prod'
);

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Insert or update visitor
    const visitorResult = await pool.query(`
      INSERT INTO visitors (email, name)
      VALUES ($1, $2)
      ON CONFLICT (email) 
      DO UPDATE SET 
        last_visit_at = CURRENT_TIMESTAMP, 
        visit_count = visitors.visit_count + 1
      RETURNING id;
    `, [email, name || null]);

    const visitorId = visitorResult.rows[0].id;

    // Track visit event
    await pool.query(`
      INSERT INTO visit_events (visitor_id, pages_viewed)
      VALUES ($1, $2)
    `, [visitorId, JSON.stringify([{ path: '/', timestamp: new Date().toISOString() }])]);

    // Create session token
    const alg = 'HS256';
    const token = await new jose.SignJWT({ email, visitorId })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(secret);

    const response = NextResponse.json({ success: true });
    
    // Set cookie
    response.cookies.set('visitor_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Gate error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
