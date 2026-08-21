"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function BlogThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => typeof document !== "undefined" && document.documentElement.dataset.theme === "dark" ? "dark" : "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <button className="blog-theme" type="button" aria-label="Toggle color theme" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>◐</button>;
}
