'use client'

import Sidebar from '@/components/user/sidebar'
import { LayoutDashboard } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-blue-500 font-sans dark:bg-black">
      <Sidebar />
      Dashboard
    </div>
  )
}