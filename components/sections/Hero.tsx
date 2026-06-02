"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { content } from "@/lib/theme";
import { useTheme } from "@/components/ThemeProvider";
import FloralAccent from "@/components/ui/FloralAccent";

const EASE = [0.22, 1, 0.36, 1] as const;

function useCountdown(target: string) {
  const [t, setT] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const end = new Date(target).getTime();
    const tick = () => {
      const d = Math.max(0, end - Date.now());
      setT({
        days: Math.floor(d / 86400000),
        hours: Math.floor((d / 3600000) % 24),
        mins: Math.floor((d / 60000) % 60),
        secs: Math.floor((d / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

export default function Hero() {
  const { theme } = useTheme();
  const c = content;
  const cd = useCountdown(c.countdownTarget);

  const { scrollYProgress } = useScroll();
  // hero content drifts up and fades as you scroll past it
  const contentY = useTransform(scrollYProgress, [0, 0.25], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const farY = useTransform(scrollYProgress, [0, 0.4], [0, 120]);
  const nearY = useTransform(scrollYProgress, [0, 0.4], [0, -120]);

  const units = [
    { v: cd.days, l: "Days" },
    { v: cd.hours, l: "Hours" },
    { v: cd.mins, l: "Mins" },
    { v: cd.secs, l: "Secs" },
  ];
  const heroBg = c.heroBackground;
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      <div className="absolute inset-0 -z-10 bg-white/70 backdrop-blur-[1px]" />

      <motion.div
        style={{ y: farY }}
        className="pointer-events-none absolute inset-0"
      >
        <FloralAccent
          spin
          className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 opacity-40"
        />
      </motion.div>
      <FloralAccent className="pointer-events-none absolute -left-8 top-10 h-40 w-40 opacity-70 sm:h-56 sm:w-56" />
      <FloralAccent
        flip
        className="pointer-events-none absolute -right-6 bottom-24 h-40 w-40 opacity-70 sm:h-56 sm:w-56"
      />
      <motion.div
        style={{ y: nearY }}
        className="pointer-events-none absolute inset-0"
      >
        <FloralAccent className="absolute right-[12%] top-[18%] h-24 w-24 opacity-60" />
        <FloralAccent
          flip
          className="absolute left-[14%] bottom-[16%] h-24 w-24 opacity-60"
        />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.42em" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="font-label text-[10px] uppercase tracking-[0.42em] text-muted sm:text-xs"
        >
          {c.kicker}
        </motion.p>

        <h1 className="mt-5 font-display leading-[0.92]">
          <Names
            a={c.couple.partnerA}
            amp={c.couple.ampersand}
            b={c.couple.partnerB}
          />
        </h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.9, ease: EASE }}
          className="mx-auto mt-6 flex max-w-xs items-center gap-4"
        >
          <span className="h-px flex-1 bg-line" />
          <span className="font-label text-[11px] uppercase tracking-[0.3em] text-ink/80">
            {c.dateShort}
          </span>
          <span className="h-px flex-1 bg-line" />
        </motion.div>

        <div className="mt-8 flex items-start justify-center gap-6 sm:gap-10">
          {units.map((u, i) => (
            <motion.div
              key={u.l}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.08, duration: 0.7, ease: EASE }}
              className="text-center"
            >
              <div className="font-display text-3xl tabular-nums text-ink sm:text-4xl">
                {String(u.v).padStart(2, "0")}
              </div>
              <div className="mt-1 font-label text-[9px] uppercase tracking-[0.3em] text-muted">
                {u.l}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-8 font-display text-base italic text-muted sm:text-lg"
        >
          {c.venue}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <div className="font-label text-[9px] uppercase tracking-[0.4em] text-muted">
          Scroll
        </div>
        <motion.div
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mt-2 h-8 w-px origin-top"
          style={{ backgroundColor: theme.palette.accent }}
        />
      </motion.div>
    </section>
  );
}

function Names({ a, amp, b }: { a: string; amp: string; b: string }) {
  const item = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  };
  return (
    <motion.span
      className="inline-flex flex-wrap items-center justify-center gap-x-4"
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.18, delayChildren: 0.25 }}
    >
      <motion.span
        variants={item}
        transition={{ duration: 1, ease: EASE }}
        className="text-6xl italic sm:text-8xl"
      >
        {a}
      </motion.span>
      <motion.span
        variants={item}
        transition={{ duration: 1, ease: EASE }}
        className="text-4xl italic text-accent sm:text-6xl"
      >
        {amp}
      </motion.span>
      <motion.span
        variants={item}
        transition={{ duration: 1, ease: EASE }}
        className="text-6xl italic sm:text-8xl"
      >
        {b}
      </motion.span>
    </motion.span>
  );
}
