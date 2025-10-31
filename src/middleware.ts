import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
// Paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/register',
  '/about',
  '/contact',
  '/features',
  '/forgot-password',
  '/view'
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check if the path is public
  const isPublicPath = publicPaths.some(publicPath => 
    path === publicPath || path.startsWith('/api/auth/') || path.startsWith('/_next/') || path.startsWith('/images/') || path.startsWith('/view/')
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  // Get the token from the cookies
  const token = request.cookies.get('auth-token')?.value;

  // If there's no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};