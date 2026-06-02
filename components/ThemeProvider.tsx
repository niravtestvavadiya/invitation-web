"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  themes,
  themeList,
  defaultThemeId,
  themeToCssVars,
  type Theme,
} from "@/lib/theme";

type Ctx = {
  theme: Theme;
  themeId: string;
  setThemeId: (id: string) => void;
  all: Theme[];
};

const ThemeContext = createContext<Ctx | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeId, setThemeId] = useState(defaultThemeId);
  const theme = themes[themeId] ?? themes[defaultThemeId];

  const cssVars = useMemo(
    () => themeToCssVars(theme) as React.CSSProperties,
    [theme],
  );

  const value = useMemo<Ctx>(
    () => ({ theme, themeId, setThemeId, all: themeList }),
    [theme, themeId],
  );

  return (
    <ThemeContext.Provider value={value}>
      <motion.div
        style={cssVars}
        animate={{
      
          ["--c-bg" as string]: theme.palette.bg,
          ["--c-ink" as string]: theme.palette.ink,
          ["--c-accent" as string]: theme.palette.accent,
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen bg-bg text-ink font-body antialiased transition-colors"
      >
   
        <ThemeContext.Provider value={value}>
          <motion.div
            style={cssVars}
            animate={{
              "--c-bg": theme.palette.bg,
              "--c-ink": theme.palette.ink,
              "--c-accent": theme.palette.accent,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen bg-bg text-ink font-body antialiased"
          >
            {children}
          </motion.div>
        </ThemeContext.Provider>
      </motion.div>
    </ThemeContext.Provider>
  );
}
