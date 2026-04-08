'use client'
import { ChevronFirst, Grid } from "lucide-react"
import { Grid2X2 } from "lucide-react"
import { useState } from "react"

export default function Sidebar() {
  
  const [isActive, setIsActive] = useState(false)
  
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white">
        <div className="p-4 flex justify-between items-center">
          <img src="/logoipsum-296.svg" alt="" className="w-6" />
          <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
            <ChevronFirst />
          </button>
        </div>

        <ul className="flex-1 px-3">
          <li className="p-1.5">
            <Grid2X2 size={24}></Grid2X2>
            <p></p>
          </li>
        </ul>
      </nav>
    </aside>
  )
}