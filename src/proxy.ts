import createMiddleware from 'next-intl/middleware'

import { routing } from '@/i18n/routing'
import { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export function proxy(request: NextRequest) {
  // const token = request.cookies.get('accessToken')?.value
  // const isSignInPage = request.nextUrl.pathname.includes('/sign-in')
  // const isDashboard = request.nextUrl.pathname.includes('/dashboard')

  // if (token && isSignInPage)
  //   return NextResponse.redirect(new URL('/dashboard', request.url))

  // if (!token && isDashboard)
  //   return NextResponse.redirect(new URL('/sign-in', request.url))

  return intlMiddleware(request)
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
