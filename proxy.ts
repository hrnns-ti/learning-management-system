import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'
// ❌ HAPUS IMPORT INI: 
// import { createClient } from './lib/supabase/server'

export default async function proxy(request: NextRequest) {
  // 1. Dapatkan response yang sudah berisi update cookie dari Supabase
  const { response, user, supabase } = await updateSession(request)
  const url = request.nextUrl.clone()

  // Helper untuk membuat redirect tapi tetap membawa cookie dari updateSession
  const redirectWithCookies = (path: string) => {
    const redirectResponse = NextResponse.redirect(new URL(path, request.url))
    // Salin cookie dari response updateSession ke response redirect
    response.cookies.getAll().forEach((cookie: any) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie.options)
    })
    return redirectResponse
  }

  // 2. Logika Proteksi Route Admin
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

  // 3. Logika Proteksi Route User
  if (url.pathname.startsWith('/user')) {
    if (!user) return redirectWithCookies('/login')
  }

  // 4. Mencegah user login mengakses halaman auth
  if ((url.pathname === '/login' || url.pathname === '/register') && user) {
    return redirectWithCookies('/user/dashboard')
  }

  // 5. Jika lolos semua, return response bawaan
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}