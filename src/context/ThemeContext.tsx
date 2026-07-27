"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  siteTheme: Theme;
  setSiteTheme: (theme: Theme | ((prev: Theme) => Theme)) => void;
  toggleSiteTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [siteTheme, setSiteThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("keyui_theme");
      if (saved === "light" || saved === "dark") return saved;
    }
    return "dark";
  });

  const setSiteTheme = (theme: Theme | ((prev: Theme) => Theme)) => {
    setSiteThemeState((prev) => {
      const next = typeof theme === "function" ? theme(prev) : theme;
      if (typeof window !== "undefined") {
        localStorage.setItem("keyui_theme", next);
      }
      return next;
    });
  };

  const toggleSiteTheme = () => {
    setSiteTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("keyui_theme", siteTheme);
    }
  }, [siteTheme]);

  return (
    <ThemeContext.Provider value={{ siteTheme, setSiteTheme, toggleSiteTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useSiteTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useSiteTheme must be used within a ThemeProvider");
  }
  return context;
}
