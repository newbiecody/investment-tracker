import { useEffect, useState } from "react";

const THEME_KEY = "color-mode";
function UseLightMode() {
  const [theme, setThemeState] = useState<"light" | "dark">("light");

  // Sync with localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = stored ?? (prefersDark ? "dark" : "light");

    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (theme: "light" | "dark") => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  };

  const setTheme = (newTheme: "light" | "dark") => {
    localStorage.setItem(THEME_KEY, newTheme);
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  return { theme, setTheme };
}

export default UseLightMode;
