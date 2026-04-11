'use client'

import Sidebar from "@/components/user/sidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="">
          {children}
        </div>
      </main>
    </div>
  )
}