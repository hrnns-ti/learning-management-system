import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'
import { createClient } from './lib/supabase/server'

export async function proxy(request: NextRequest) {

  const response = await updateSession(request)
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const url = request.nextUrl.clone()

  if (url.pathname.startsWith('/admin')) {
    // Jika tidak login, lempar ke login
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Ambil role dari tabel profiles
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/user/dashboard', request.url))
    }
  }

  if (url.pathname.startsWith('/user')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if ((url.pathname === '/login' || url.pathname === '/register') && user) {
    return NextResponse.redirect(new URL('/user/dashboard', request.url))
  }

  return response
  // return await updateSession(request)
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}