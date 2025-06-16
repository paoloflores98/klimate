import { Moon, Sun } from "lucide-react"
import { useTheme } from "./context/theme-provider"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className={`flex items-center cursor-pointer transition-transform duration-500 ${theme === "dark" ? "rotate-180" : ""}`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark"
        ? <Sun className="h-6 w-6 text-yellow-500 transition-all" />
        : <Moon className="h-6 w-6 text-blue-500 transition-all" />
      }

      <span className="sr-only">Toggle theme</span>
    </div>
  )
}