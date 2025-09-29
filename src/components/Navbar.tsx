import * as React from "react"
import { NavLink } from "react-router"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const Navbar: React.FC = () => {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-3">
          <h1 className="text-lg font-semibold mr-12">ConGen</h1>

          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "ghost" }),
                "h-10 px-4",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/templates"
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "ghost" }),
                "h-10 px-4",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            Templates
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
