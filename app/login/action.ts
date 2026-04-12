"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export const runtime = 'experimental-edge'

export type ActionState = { message: string } | null

export async function handleLogin(prevState: ActionState, formData: FormData) {
  let redirectPath: string | null = null;

  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    console.log("Mencoba login untuk:", email);

    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      console.error("Login Error:", error.message);
      return { message: error.message }
    }

    const { data: myProfile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .maybeSingle()
    
    if (profileError) {
      console.error("Profile Fetch Error:", profileError.message);
      return { message: "Gagal memuat data profil. Silakan coba lagi." }
    }
    
    if (myProfile?.role === 'ADMIN') { 
      redirectPath = '/admin/dashboard' 
    } else if (myProfile?.role === 'STUDENT') { 
      redirectPath = '/user/dashboard' 
    } else {
      redirectPath = '/dashboard'
    }

  } catch (err: any) {
    console.error("🔥 CRITICAL SERVER ERROR LOGIN:", err.message, err.stack);
    return { message: `Sistem Error: ${err.message}` }
  }

  if (redirectPath) {
    redirect(redirectPath)
  }
  
  return { message: "Memproses login..." }
}