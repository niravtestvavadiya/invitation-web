"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { gradientWithAlpha } from "../untils/colors";

// const petals = Array.from({ length: 18 }, (_, i) => ({
//   id: i,
//   left: `${Math.random() * 100}%`,
//   delay: Math.random() * 8,
//   duration: 6 + Math.random() * 6,
//   size: 6 + Math.random() * 10,
// }));

const sparkles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  top: `${10 + Math.random() * 80}%`,
  left: `${5 + Math.random() * 90}%`,
  delay: Math.random() * 3,
  size: 3 + Math.random() * 5,
}));

export default function HeroSection() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [mounted, setMounted] = useState(false);
  const [petals, setPetals] = useState<any[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 6,
        size: 6 + Math.random() * 10,
      })),
    );
  }, []);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${theme.background} 0%, ${theme.background} 40%, ${theme.background} 100%)`,
      }}
    >
      {/* Parallax background image */}
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1920)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,0.5) 0%, ${gradientWithAlpha(theme.background, 0.85)} 50%, rgba(0,0,0,0.85) 100%)`,
          }}
        />
      </motion.div>

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${gradientWithAlpha(theme.primary, 0.08)} 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Sparkles */}
      {mounted &&
        sparkles.map((s) => (
          <motion.div
            key={s.id}
            className="absolute pointer-events-none"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: s.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 4,
            }}
          >
            <svg viewBox="0 0 24 24" fill={theme.primary}>
              <path d="M12 2L13.5 9 20 10.5 13.5 12 12 19 10.5 12 4 10.5 10.5 9z" />
            </svg>
          </motion.div>
        ))}

      {/* Falling petals */}
      {mounted &&
        petals.map((p) => (
          <motion.div
            key={p.id}
            className="absolute pointer-events-none rounded-full"
            style={{
              left: p.left,
              top: -20,
              width: p.size,
              height: p.size * 0.6,
              background: `radial-gradient(ellipse, ${gradientWithAlpha(theme.primary, 0.6)} 0%, ${gradientWithAlpha(theme.primary, 0.2)} 100%)`,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            }}
            animate={{
              y: ["0vh", "110vh"],
              rotate: [0, 720],
              x: [0, 40, -20, 60],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ opacity }}
      >
        {/* Ornament top */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div
            className="h-px w-24"
            style={{
              background: `linear-gradient(to right, transparent, ${theme.primary})`,
            }}
          />
          <svg width="24" height="24" viewBox="0 0 24 24" fill={theme.primary}>
            <path d="M12 2L13.5 9 20 10.5 13.5 12 12 19 10.5 12 4 10.5 10.5 9z" />
          </svg>
          <div
            className="h-px w-24"
            style={{
              background: `linear-gradient(to left, transparent, ${theme.primary})`,
            }}
          />
        </motion.div>

        {/* Together Forever */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="tracking-[0.4em] text-xs uppercase mb-6"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 300,
            color: theme.primary,
          }}
        >
          Together Forever
        </motion.p>

        {/* Couple names */}
        {/* <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="mb-4"
          style={{
            fontFamily: "Great Vibes, cursive",
            fontSize: "clamp(4rem, 12vw, 9rem)",
            lineHeight: 1.1,
            color: theme.textLight,
          }}
        > */}
        <motion.h1
          initial={hasAnimatedRef.current ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          onAnimationComplete={() => {
            hasAnimatedRef.current = true;
          }}
          className="mb-4"
          style={{
            fontFamily: "Great Vibes, cursive",
            fontSize: "clamp(4rem, 12vw, 9rem)",
            lineHeight: 1.1,
          }}
        >
          <span
            style={{
              background: `linear-gradient(90deg, ${theme.primaryDark}, ${theme.primaryLight}, ${theme.primary}, ${theme.primaryLight}, ${theme.primaryDark})`,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
            }}
          >
            Sophia
          </span>
          <span
            className="mx-4 text-5xl"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
              color: theme.primary,
            }}
          >
            &amp;
          </span>
          <span
            style={{
              background: `linear-gradient(90deg, ${theme.primaryDark}, ${theme.primaryLight}, ${theme.primary}, ${theme.primaryLight}, ${theme.primaryDark})`,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
            }}
          >
            Alexander
          </span>
        </motion.h1>

        {/* Date tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center justify-center gap-4 mt-8 mb-12"
        >
          <div
            className="h-px w-16"
            style={{
              background: `linear-gradient(to right, transparent, ${theme.primary})`,
            }}
          />
          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              color: theme.primaryLight,
              fontSize: "1.5rem",
              fontStyle: "italic",
              letterSpacing: "0.1em",
            }}
          >
            September 14, 2026
          </p>
          <div
            className="h-px w-16"
            style={{
              background: `linear-gradient(to left, transparent, ${theme.primary})`,
            }}
          />
        </motion.div>

        {/* Venue */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="uppercase tracking-widest mb-12"
          style={{
            fontFamily: "Montserrat, sans-serif",
            color: gradientWithAlpha(theme.textLight, 0.55),
            letterSpacing: "0.3em",
            fontSize: "0.7rem",
          }}
        >
          The Grand Palazzo Venezia &nbsp;·&nbsp; Venice, Italy
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#rsvp"
            className="px-10 py-4 text-xs tracking-[0.25em] uppercase transition-all duration-500"
            style={{
              fontFamily: "Montserrat, sans-serif",
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
              color: "#fff",
              letterSpacing: "0.25em",
            }}
          >
            RSVP Now
          </a>
          <a
            href="#story"
            className="px-10 py-4 text-xs tracking-[0.25em] uppercase border transition-all duration-500 hover:bg-white hover:bg-opacity-5"
            style={{
              fontFamily: "Montserrat, sans-serif",
              borderColor: gradientWithAlpha(theme.primary, 0.5),
              color: theme.primary,
            }}
          >
            Our Story
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border rounded-full flex items-start justify-center pt-1.5"
            style={{ borderColor: gradientWithAlpha(theme.primary, 0.4) }}
          >
            <div
              className="w-1 h-1.5 rounded-full"
              style={{ background: theme.primary }}
            />
          </motion.div>
          <span
            style={{
              color: gradientWithAlpha(theme.primary, 0.5),
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            SCROLL
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
