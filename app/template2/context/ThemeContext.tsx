import React, { createContext, useState, useContext, useEffect } from "react";

export type ThemeName = "luxury" | "blush" | "emerald" | "ocean" | "champagne";

export interface Theme {
  name: ThemeName;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  background: string;
  backgroundLight: string;
  text: string;
  textLight: string;
  accent: string;
}

export const themes: Record<ThemeName, Theme> = {
  luxury: {
    name: "luxury",
    primary: "#c9a96e",
    primaryLight: "#e8d5a3",
    primaryDark: "#a0783a",
    background: "#0a0a0a",
    backgroundLight: "#faf8f3",
    text: "#2c2c2c",
    textLight: "#faf8f3",
    accent: "#e8d5a3",
  },
  blush: {
    name: "blush",
    primary: "#d4a5a5",
    primaryLight: "#e8c5c5",
    primaryDark: "#b08585",
    background: "#1a0f0f",
    backgroundLight: "#fdf9f8",
    text: "#3d2020",
    textLight: "#fdf9f8",
    accent: "#e8c5c5",
  },
  emerald: {
    name: "emerald",
    primary: "#2d7d6f",
    primaryLight: "#5fa39d",
    primaryDark: "#1a4d45",
    background: "#0a1412",
    backgroundLight: "#f0f5f4",
    text: "#1a3530",
    textLight: "#f0f5f4",
    accent: "#5fa39d",
  },
  ocean: {
    name: "ocean",
    primary: "#4a90a4",
    primaryLight: "#7ab5d1",
    primaryDark: "#2d5a74",
    background: "#0a1820",
    backgroundLight: "#f0f4f7",
    text: "#1a3a4a",
    textLight: "#f0f4f7",
    accent: "#7ab5d1",
  },
  champagne: {
    name: "champagne",
    primary: "#d4af37",
    primaryLight: "#f0e6c3",
    primaryDark: "#b8941f",
    background: "#1a1612",
    backgroundLight: "#fffdf8",
    text: "#3d3530",
    textLight: "#fffdf8",
    accent: "#f0e6c3",
  },
};

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    if (typeof window === "undefined") return "luxury";
    const saved = localStorage.getItem("wedding-theme");
    return (saved as ThemeName) || "luxury";
  });

  const theme = themes[themeName];

  useEffect(() => {
    localStorage.setItem("wedding-theme", themeName);
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme: setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
