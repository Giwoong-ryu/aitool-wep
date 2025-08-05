import { clerkMiddleware, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware((auth, req) => {
  const { userId, sessionId } = auth();
  if (!userId) return NextResponse.next();

  // Supabase JWT 쿠키 주입 (필요 시)
  const res = NextResponse.next();
  res.cookies.set('sb-access-token', sessionId!, { path: '/' });
  return res;
});

export const config = { matcher: ['/((?!_next|favicon).*)'] };