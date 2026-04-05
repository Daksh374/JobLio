import React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "./ThemeProvider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("light")
    } else {
      // If system, swap to the opposite of what system currently prefers
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(isSystemDark ? "light" : "dark")
    }
  }

  return (
    <Button variant="outline" size="icon" className="rounded-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800" onClick={toggleTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
