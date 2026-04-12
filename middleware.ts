import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

export const runtime = 'experimental-edge'

export default async function proxy(request: NextRequest) {
  const { response, user, supabase } = await updateSession(request)
  const url = request.nextUrl.clone()

  const redirectWithCookies = (path: string) => {
    const redirectResponse = NextResponse.redirect(new URL(path, request.url))
    response.cookies.getAll().forEach((cookie: any) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie.options)
    })
    return redirectResponse
  }

  if (url.pathname.startsWith('/admin')) {
    if (!user) return redirectWithCookies('/login')

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'ADMIN') {
      return redirectWithCookies('/user/dashboard')
    }
  }

  if (url.pathname.startsWith('/user')) {
    if (!user) return redirectWithCookies('/login')
  }

  if ((url.pathname === '/login' || url.pathname === '/register') && user) {
    return redirectWithCookies('/user/dashboard')
  }

  return response
}

export const config = {
  runtime: 'experimental-edge',
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}