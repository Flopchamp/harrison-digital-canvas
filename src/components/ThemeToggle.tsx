import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  // Deterministic on both the server render and the client's first hydration
  // pass — matches index.html's inline script only by coincidence when a
  // visitor's real preference happens to be dark. Reading the real value here
  // synchronously (as this used to) caused a structural mismatch whenever it
  // didn't: server always guesses "dark", so a visitor whose actual
  // preference resolves to "light" would hydrate a different icon (Moon vs
  // Sun) in the same DOM position — a hard hydration failure that discards
  // the entire prerendered page, not just this button. The effect below
  // corrects the icon a moment after mount instead; the page's actual
  // dark/light CSS class is already correct instantly regardless (set by the
  // inline script before React ever runs), so only the icon itself can flash.
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="hover:bg-accent transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </Button>
  );
};

export default ThemeToggle;
