'use client'

import Image from "next/image";
import Form from "next/form"
import Link from "next/link";

import { handleRegister } from "./action";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Register() {

  const [state, formAction, isPending] = useActionState(handleRegister, null)
  const router = useRouter()

  useEffect(() => {
  if (state?.message?.toLowerCase().includes('success')) {
    const timer = setTimeout(() => {
      router.push('/login')
    }, 2000);
    return () => clearTimeout(timer);
  }
}, [state]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-blue-500 font-sans dark:bg-black">
      <Image 
        src="/polygon-scatter-haikei.svg"
        alt="Circle Scatter"
        fill={true}
        className="z-0 opacity-10 object-cover"
      />
      
      {/* REGISTER CARD */}
      <main className="z-10 flex w-full max-w-3xl h-128 gap-10 rounded-xl flex-row p-4 bg-white dark:bg-black items-center shadow-md">
        <div className="relative h-full w-3/6 rounded-2xl">
          <Image 
            src="/edward-lawrence-unsplash.jpg"
            alt="Environment Study"
            fill={true}
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex h-full min-w-3/6 flex-col rounded-md items-center gap-4 ">
          <div className="p-10">
            <h1 className="font-bold text-blue-500 text-3xl">Register</h1>
          </div>
          {state?.message && (
            <div className={`fixed top-5 right-5 z-50 flex items-center justify-between w-80 p-4 rounded-lg shadow-lg border animate-in fade-in slide-in-from-top-4 duration-300 ${
              state.message.toLowerCase().includes("success") 
                ? "bg-green-50 text-green-800 border-green-200" 
                : "bg-red-50 text-red-800 border-red-200"
            }`}>
              <div className="flex items-center gap-3">
                {/* Ikon opsional agar lebih pro */}
                <span className="font-bold">
                  {state.message.includes("berhasil") ? "✓" : "⚠"}
                </span>
                <p className="text-sm font-medium leading-none">{state.message}</p>
              </div>
              
              {/* Tombol Close (&times;) */}
              <button 
                onClick={(e) => (e.currentTarget.parentElement!.style.display = 'none')}
                className="text-lg font-bold opacity-50 hover:opacity-100 transition-opacity ml-4"
              >
                &times;
              </button>
            </div>
          )}
          <Form
            action={formAction}
            className=" flex flex-col gap-4 w-3/4"
          >
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm">Email</label>
              <input type="email" name="email" placeholder="nama@email.com" required className="border border-blue-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded py-1 px-3 text-sm" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm">Username</label>
              <input type="text" name="username" placeholder="username" required className="border border-blue-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded py-1 px-3 text-sm" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm">Password</label>
              <input type="password" name="password" placeholder="*****" required minLength={6} className="border border-blue-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded py-1 px-3 text-sm" />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="my-4 rounded-lg bg-blue-600 p-2 text-center font-bold text-white transition hover:bg-blue-700"
            >
              {isPending ? "Processing..." : "Sign Up"}
            </button>
          </Form>

          <Link href='/login' className="text-xs text-blue-500">Already have an account?</Link>

        </div>
      </main>


    </div>
  );
}
