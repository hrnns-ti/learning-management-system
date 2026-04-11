'use client'

import { Grid2X2, BookOpen, UserRound, ClipboardList, ChevronFirst } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {

  const pathname = usePathname()

  const navItems = [
    { label: "Dashboard", href: "/user/dashboard", icon: Grid2X2 },
    { label: "Course", href: "/user/courses", icon: BookOpen },
    { label: "Assignment", href: "/user/assignments", icon: ClipboardList },
    { label: "Profile", href: "/user/profile", icon: UserRound },
  ]
  
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  return (
    <aside className={`h-screen transition-all ease-in-out duration-700  ${isCollapsed ? "w-20" : "w-64"}`}>
      <nav className="h-full flex flex-col bg-white">
        <div className="px-6 py-8 flex justify-between items-center">
          <div className={`overflow-hidden transition-all ease-in-out duration-300 ${isCollapsed ? "w-0 rotate-45" : "w-24"}`}>
            <img src="/logoipsum-296.svg" alt="Logo" className={`w-6 duration-1000 ease-in-out transition-all ${isCollapsed ? "rotate-45" : ""}`} />
          </div>
          <button 
            className="p-1.5 rounded-lg text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronFirst className={`transition-all ${isCollapsed ? "rotate-180" : ""}`} />
          </button>
        </div>

        <ul className="flex flex-col w-full px-4 py-6 gap-2">
          {navItems.map((item) => {
            const isNavActive = pathname === item.href
            const Icon = item.icon
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={
                    `group relative flex items-center gap-2 px-3.5 py-2 rounded-md transition-all 
                    ${isNavActive ? "bg-blue-100": "hover:bg-blue-100"}
                  `}
                >
                  <Icon 
                    size={20} 
                    className=
                      {`
                        shrink-0 ${isNavActive ? "text-blue-700" : "text-gray-800"}
                        ${isCollapsed ? "justify-between": ""}
                      `}  
                  />
                  <p className=
                    {`transition-all
                      ${isNavActive ? "text-blue-700" : "text-gray-800"}
                      ${isCollapsed ? "w-0 opacity-0" : "opacity-100" }
                    `}>
                      {item.label}
                  </p>

                  {isCollapsed && (
                    <div className="
                      absolute left-full top-1/2 -translate-y-1/2 ml-6 
                      pointer-events-none z-999 whitespace-nowrap
                      invisible opacity-0 -translate-x-3 transition-all duration-300
                      group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                    ">
                      <div className="bg-blue-200 text-blue-700 text-sm px-3 py-1 rounded-md">
                        {item.label}
                      </div>
                    </div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}