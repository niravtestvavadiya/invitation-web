"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

/**
 * Decorative, theme-aware vector accents. Each `floral` style draws a distinct
 * motif so the three themes feel genuinely different, not re-skinned.
 */
export default function FloralAccent({
  className,
  flip = false,
  spin = false,
}: {
  className?: string;
  flip?: boolean;
  spin?: boolean;
}) {
  const { theme } = useTheme();
  const transform = flip ? "scaleX(-1)" : undefined;

  const inner = (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      style={{ transform }}
      className="h-full w-full"
      aria-hidden
    >
      {theme.floral === "wildflower" && <Wildflower />}
      {theme.floral === "geometric" && <Geometric />}
      {theme.floral === "ornament" && <Ornament />}
    </svg>
  );

  if (spin) {
    return (
      <motion.div
        className={className}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, ease: "linear", repeat: Infinity }}
      >
        {inner}
      </motion.div>
    );
  }
  return <div className={className}>{inner}</div>;
}

function Wildflower() {
  return (
    <g
      stroke="var(--c-accent-soft)"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M100 190 C100 150 90 120 70 95" />
      <path d="M100 190 C100 150 112 120 132 95" />
      <path d="M100 190 C100 150 100 110 100 70" />
      {[55, 100, 145].map((x, i) => (
        <g key={i} stroke="var(--c-accent)">
          <circle cx={x} cy={70 - i * 4} r="6" fill="var(--c-accent-soft)" />
          <path d={`M${x} ${64 - i * 4} l0 -10 M${x} ${76 - i * 4} l0 8`} />
        </g>
      ))}
      {[78, 122].map((x, i) => (
        <path
          key={i}
          d={`M${x} 120 q ${i ? 18 : -18} -14 ${i ? 26 : -26} -34`}
          stroke="var(--c-accent-soft)"
        />
      ))}
      <path d="M86 150 q-22 -6 -30 -22" />
      <path d="M114 150 q22 -6 30 -22" />
    </g>
  );
}

function Geometric() {
  return (
    <g stroke="var(--c-accent)" strokeWidth="1.2" fill="none">
      <circle cx="100" cy="100" r="60" stroke="var(--c-accent-soft)" />
      <circle cx="100" cy="100" r="40" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={100 + Math.cos(a) * 40}
            y1={100 + Math.sin(a) * 40}
            x2={100 + Math.cos(a) * 60}
            y2={100 + Math.sin(a) * 60}
          />
        );
      })}
      <circle cx="100" cy="100" r="4" fill="var(--c-accent)" stroke="none" />
    </g>
  );
}

function Ornament() {
  return (
    <g
      stroke="var(--c-accent-soft)"
      strokeWidth="1.3"
      fill="none"
      strokeLinecap="round"
    >
      <path d="M40 100 C70 70 130 70 160 100 C130 130 70 130 40 100 Z" />
      <path d="M100 60 C130 78 130 122 100 140 C70 122 70 78 100 60 Z" />
      <circle cx="100" cy="100" r="8" stroke="var(--c-accent)" />
      <path d="M100 52 l0 -16 M100 148 l0 16 M48 100 l-16 0 M152 100 l16 0" />
    </g>
  );
}
