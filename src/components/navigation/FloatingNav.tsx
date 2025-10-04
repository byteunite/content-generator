import { Home, Sparkles } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

export function FloatingNav() {
  const location = useLocation()

  const navItems = [
    {
      path: "/",
      icon: Home,
      label: "Templates",
    },
    {
      path: "/outputs",
      icon: Sparkles,
      label: "Outputs",
    },
  ]

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-background/80 backdrop-blur-xl border shadow-2xl rounded-full px-2 py-2 flex items-center">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "group relative px-6 py-3 rounded-full transition-all duration-300 overflow-hidden",
                isActive
                  ? `bg-black shadow-lg scale-105 text-white`
                  : `hover:scale-105 text-muted-foreground hover:text-foreground`
              )}
            >
              <div className="flex items-center gap-2 relative z-10">
                <Icon
                  className="transition-all duration-300 flex-shrink-0"
                  size={20}
                />
                <span
                  className={cn(
                    "font-medium text-sm transition-all duration-300 whitespace-nowrap overflow-hidden",
                    isActive
                      ? "max-w-20 opacity-100"
                      : "max-w-0 opacity-0 group-hover:max-w-20 group-hover:opacity-100"
                  )}
                >
                  {item.label}
                </span>
              </div>

              {isActive && (
                <div className="absolute inset-0 rounded-full opacity-20 bg-white" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
