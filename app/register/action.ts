"use server"

import { createClient } from '@/lib/supabase/server'

export type ActionState = { message: string } | null

export async function handleRegister(prevState: ActionState, formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const username = formData.get("username") as string

    console.log("Data yang diterima:", { email, username, password });

    const supabase = await createClient()
        
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username: username,
                full_name: username,
            },
            emailRedirectTo: 'http://localhost:3000/auth/callback',
        }
    })

    if (error) {
        console.error("ERROR SUPABASE:", error.message);
        return {message: error.message}
    }
    console.log("Registrasi Berhasil!\n");
    
    return { status: 'success', message: "Sign Up success! Redirecting..." }
}

