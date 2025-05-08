// export { auth as middleware } from '@/auth'
import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  })

  const { pathname } = request.nextUrl

  if (!token && pathname.startsWith('/me/liked-songs')) {
    return NextResponse.redirect(new URL('/guest/liked-songs', request.url))
  }
  if (token && pathname.startsWith('/guest/liked-songs')) {
    return NextResponse.redirect(new URL('/me/liked-songs', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/me/liked-songs', '/guest/liked-songs'],
}
