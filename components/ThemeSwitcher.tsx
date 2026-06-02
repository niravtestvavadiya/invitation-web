"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeSwitcher() {
  const { all, themeId, setThemeId } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6"
    >
      <div className="flex items-center gap-1 rounded-full border border-line bg-surface/80 p-1 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md">
        <span className="px-3 font-label text-[10px] uppercase tracking-[0.25em] text-muted">
          Theme
        </span>
        {all.map((t) => {
          const active = t.id === themeId;
          return (
            <button
              key={t.id}
              onClick={() => setThemeId(t.id)}
              title={t.tagline}
              className="relative rounded-full px-3 py-1.5 font-label text-[11px] uppercase tracking-[0.18em] transition-colors"
              style={{ color: active ? t.palette.ink : "var(--c-ink)" }}
            >
              {active && (
                <motion.span
                  layoutId="theme-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: t.palette.accent }}
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span
                className={`relative ${active ? " text-white" : " text-black"}`}
              >
                {t.name}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
