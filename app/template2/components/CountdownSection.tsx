import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { gradientWithAlpha } from "../untils/colors";


interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const WEDDING_DATE = new Date("2026-09-14T16:00:00");

function Digit({
  value,
  label,
  theme,
}: {
  value: number;
  label: string;
  theme: any;
}) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{
          width: "clamp(70px, 15vw, 120px)",
          height: "clamp(80px, 17vw, 140px)",
          background: `linear-gradient(180deg, ${gradientWithAlpha(theme.primary, 0.08)} 0%, ${gradientWithAlpha(theme.primary, 0.03)} 100%)`,
          border: `1px solid ${gradientWithAlpha(theme.primary, 0.2)}`,
        }}
      >
        <motion.span
          key={display}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            color: theme.primary,
            fontWeight: 300,
            lineHeight: 1,
          }}
        >
          {display}
        </motion.span>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)",
          }}
        />
      </div>
      <p
        className="mt-3 tracking-[0.3em] uppercase"
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "0.6rem",
          color: gradientWithAlpha(theme.primary, 0.6),
          fontWeight: 400,
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function CountdownSection() {
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(WEDDING_DATE));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(WEDDING_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${theme.background} 0%, ${theme.background} 100%)`,
      }}
    >
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none">
          <circle
            cx="300"
            cy="300"
            r="280"
            stroke={theme.primary}
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <circle
            cx="300"
            cy="300"
            r="200"
            stroke={theme.primary}
            strokeWidth="0.5"
          />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              color: theme.primary,
              letterSpacing: "0.4em",
              fontSize: "0.65rem",
            }}
            className="uppercase mb-4"
          >
            The Big Day
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              color: theme.textLight,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            Counting Down
          </h2>
          <div
            className="divider-gold mt-6 max-w-xs mx-auto"
            style={{
              background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)`,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="flex items-center justify-center gap-4 sm:gap-8"
        >
          <Digit value={timeLeft.days} label="Days" theme={theme} />
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: gradientWithAlpha(theme.primary, 0.3),
              alignSelf: "center",
              marginTop: "-20px",
            }}
          >
            :
          </span>
          <Digit value={timeLeft.hours} label="Hours" theme={theme} />
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: gradientWithAlpha(theme.primary, 0.3),
              alignSelf: "center",
              marginTop: "-20px",
            }}
          >
            :
          </span>
          <Digit value={timeLeft.minutes} label="Minutes" theme={theme} />
          <span
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: gradientWithAlpha(theme.primary, 0.3),
              alignSelf: "center",
              marginTop: "-20px",
            }}
          >
            :
          </span>
          <Digit value={timeLeft.seconds} label="Seconds" theme={theme} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-center mt-14"
          style={{
            fontFamily: "Great Vibes, cursive",
            color: theme.primary,
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          }}
        >
          Until We Say "I Do"
        </motion.p>
      </div>
    </section>
  );
}
