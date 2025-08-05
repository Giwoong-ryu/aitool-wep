import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth) => {
  const { userId, sessionId } = await auth();
  if (!userId) return NextResponse.next();

  // Supabase JWT 쿠키 주입 (필요 시)
  const res = NextResponse.next();
  res.cookies.set('sb-access-token', sessionId!, { path: '/' });
  return res;
});

export const config = { matcher: ['/((?!_next|favicon).*)'] };