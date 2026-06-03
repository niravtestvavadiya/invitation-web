import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const events = [
  {
    year: "2019",
    title: "First Meeting",
    description:
      "A chance encounter at a gallery opening in Paris changed everything. Their eyes met across a room filled with masterpieces, and the most beautiful story began.",
    icon: "✦",
  },
  {
    year: "2020",
    title: "First Date",
    description:
      "A candlelit dinner along the Seine, long walks through Montmartre, and the realization that they had found something extraordinary in each other.",
    icon: "♥",
  },
  {
    year: "2022",
    title: "The Journey",
    description:
      "Together they explored Santorini, Kyoto, and the Amalfi Coast — discovering that every destination was more magical with each other by their side.",
    icon: "✦",
  },
  {
    year: "2024",
    title: "The Proposal",
    description:
      "On a rooftop in Florence, beneath a canopy of stars, Alexander got down on one knee. Sophia said yes before he could finish the question.",
    icon: "◆",
  },
  {
    year: "2026",
    title: "Forever Begins",
    description:
      "Among the timeless beauty of Venice, surrounded by family and friends, they will promise each other a lifetime of love, laughter, and adventure.",
    icon: "★",
  },
];

export default function StorySection() {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="story"
      ref={ref}
      className="py-28 px-6 relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${theme.backgroundLight} 0%, ${theme.backgroundLight} 100%)`,
      }}
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
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
            How It All Began
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              color: theme.text,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 300,
            }}
          >
            Our Love Story
          </h2>
          <div className="divider-gold mt-6 max-w-xs mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(180deg, transparent, #c9a96e 10%, #c9a96e 90%, transparent)",
              transformOrigin: "top",
            }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 2, delay: 0.5 }}
          />

          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={event.year}
                className={`relative flex items-center mb-16 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
              >
                {/* Content */}
                <div
                  className={`w-5/12 ${isLeft ? "text-right pr-10" : "text-left pl-10"}`}
                >
                  <p
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      color: theme.primary,
                      fontSize: "0.65rem",
                      letterSpacing: "0.25em",
                    }}
                    className="uppercase mb-1"
                  >
                    {event.year}
                  </p>
                  <h3
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      color: theme.text,
                      fontSize: "1.5rem",
                      fontWeight: 500,
                      fontStyle: "italic",
                    }}
                    className="mb-3"
                  >
                    {event.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      color: "rgba(44,44,44,0.65)",
                      fontSize: "0.8rem",
                      lineHeight: 1.8,
                    }}
                  >
                    {event.description}
                  </p>
                </div>

                {/* Center dot */}
                <div className="w-2/12 flex items-center justify-center z-10">
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
                      boxShadow: `0 0 20px ${theme.primary}66`,
                    }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span style={{ color: "#fff", fontSize: "0.7rem" }}>
                      {event.icon}
                    </span>
                  </motion.div>
                </div>

                {/* Empty spacer */}
                <div className="w-5/12" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
