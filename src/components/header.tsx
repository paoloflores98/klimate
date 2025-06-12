import { Link } from "react-router-dom";
import { useTheme } from "./context/theme-provider";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <img
            className="h-14"
            src={theme === "dark" ? "/logo.png" : "/logo2.png"}
            alt="Klimate logo"
          />
        </Link>

        <div className="flex gap-4">
          {/* <CitySearch /> */}

          {/* <ThemeToggle /> */}

          <div
            className={`flex items-center cursor-pointer transition-transform duration-500 ${theme === "dark" ? "rotate-180" : ""}`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark"
              ? <Sun className="h-6 w-6 text-yellow-500 transition-all" />
              : <Moon className="h-6 w-6 text-blue-500 transition-all" />
            }
          </div>
        </div>
      </div>
    </header>
  )
}