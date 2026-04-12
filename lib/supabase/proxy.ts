import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, 
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value)
          )
        },
      },
    }
  )

  // Menggunakan getClaims() untuk performa Edge yang lebih baik
  const { data } = await supabase.auth.getClaims()
  
  // Penyesuaian penting: getClaims mengembalikan ID dalam bentuk 'sub'
  // Kita petakan ke 'id' agar tidak error saat proxy.ts memanggil user.id
  const user = data?.claims ? { ...data.claims, id: data.claims.sub } : null

  // KITA HAPUS LOGIKA REDIRECT BAWAAN DI SINI
  // Karena proxy.ts yang sekarang menjadi "polisi lalu lintas" utamanya

  // Kembalikan ketiganya untuk dipakai di proxy.ts
  return { response: supabaseResponse, user, supabase }
}