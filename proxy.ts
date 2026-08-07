import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Handle owner bypass
  if (url.searchParams.get('owner') === 'true') {
    const token = url.searchParams.get('token');
    if (token === process.env.OWNER_ACCESS_TOKEN && token) {
      // Valid token, set cookie and redirect to strip URL params
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.set('visitor_session', 'owner_bypass', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
      return response;
    }
  }

  // Admin routes
  if (url.pathname.startsWith('/admin')) {
    if (url.pathname !== '/admin/login') {
      const adminSession = request.cookies.get('admin_session');
      if (!adminSession?.value) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
    return NextResponse.next();
  }

  // Pass all other routes to next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|ru|uz)/:path*', '/((?!api|_next|_vercel|admin|.*\\..*).*)'],
};
