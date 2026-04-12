"use server"

import { createClient } from '@/lib/supabase/server'
export type ActionState = { message: string } | null

export async function handleRegister(prevState: ActionState, formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const username = formData.get("username") as string

    console.log("Mencoba mendaftar:", { email, username });

    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
          full_name: username,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
      }
    })

    if (error) {
      console.error("Supabase Error:", error.message);
      return { message: error.message }
    }

    return { message: "Pendaftaran berhasil, silakan cek email!" };

  } catch (err: any) {
    console.error("🔥 CRITICAL SERVER ERROR:", err.message, err.stack);
    return { message: `Sistem Error: ${err.message}` };
  }
}