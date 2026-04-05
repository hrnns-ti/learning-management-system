"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export type ActionState = { message: string } | null

export async function handleLogin(prevState: ActionState, formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.signInWithPassword({ email,password })

    if (error) return { message: error.message }

    const { data: myProfile } = await supabase.from('profiles').select('role').eq('id', data.user.id).maybeSingle()
    
    if (myProfile?.role === 'ADMIN') { redirect('/admin/dashboard') }
    if (myProfile?.role === 'STUDENT') { redirect('/user/dashboard') }
    
    redirect('/dashboard')
}