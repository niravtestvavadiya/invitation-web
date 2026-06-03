import { motion } from "framer-motion";
import { useTheme, type ThemeName } from "../context/ThemeContext";
import { Palette } from "lucide-react";
import { useState } from "react";

const themeNames: { name: ThemeName; label: string; color: string }[] = [
  { name: "luxury", label: "Luxury Gold", color: "#c9a96e" },
  { name: "blush", label: "Blush Rose", color: "#d4a5a5" },
  { name: "emerald", label: "Emerald", color: "#2d7d6f" },
  { name: "ocean", label: "Ocean Blue", color: "#4a90a4" },
  { name: "champagne", label: "Champagne", color: "#d4af37" },
];

export default function ThemeSwitcher() {
  const { themeName, setTheme, theme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5 }}
    >
      {/* Theme options */}
      <motion.div
        className="flex flex-col gap-2 md:flex-row md:flex-col-reverse"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          open
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.8, pointerEvents: "none" }
        }
        transition={{ duration: 0.3 }}
      >
        {themeNames.map((t) => (
          <motion.button
            key={t.name}
            onClick={() => {
              setTheme(t.name);
              setOpen(false);
            }}
            className="group flex items-center gap-2 px-4 py-2.5 rounded transition-all duration-300 text-xs font-medium backdrop-blur-md"
            style={{
              background:
                t.name === themeName
                  ? `${t.color}20`
                  : "rgba(255,255,255,0.05)",
              border: `1px solid ${t.color}30`,
              color: themeName === "luxury" ? t.color : theme.primary,
            }}
            whileHover={{ scale: 1.05, background: `${t.color}30` }}
            initial={{ opacity: 0, x: 20 }}
            animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.05 * themeNames.indexOf(t) }}
          >
            <div
              className="w-3 h-3 rounded-full border"
              style={{ background: t.color, borderColor: t.color }}
            />
            <span className="hidden sm:inline whitespace-nowrap">
              {t.label}
            </span>
            {t.name === themeName && (
              <motion.span layoutId="check" className="ml-1 text-xs">
                ✓
              </motion.span>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryLight})`,
          color: "#fff",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Palette size={20} strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
