import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import * as jose from 'jose';

const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'default_fallback_secret_do_not_use_in_prod'
);

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }

    // The hashed admin password should be stored in env
    const hashedAdminPassword = process.env.ADMIN_PASSWORD_HASH;
    
    // If not configured, block login
    if (!hashedAdminPassword) {
      console.warn('ADMIN_PASSWORD_HASH is not set in environment variables');
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
    }

    // Compare with bcrypt
    const match = await bcrypt.compare(password, hashedAdminPassword);

    if (!match) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Create session token
    const alg = 'HS256';
    const token = await new jose.SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    const response = NextResponse.json({ success: true });
    
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
