import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const couple = [
  {
    name: "Sophia Laurent",
    role: "The Bride",
    quote:
      "Love is not about how many days, months, or years you have been together. It is about how much you love each other every day.",
    image:
      "https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=600",
    parents: "Daughter of Mr. & Mrs. Laurent",
    detail: "Art director & dreamer",
  },
  {
    name: "Alexander Rhodes",
    role: "The Groom",
    quote:
      "I love you not only for what you are, but for what I am when I am with you.",
    image:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
    parents: "Son of Mr. & Mrs. Rhodes",
    detail: "Architect & adventurer",
  },
];

export default function CoupleSection() {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-28 px-6 relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${theme.backgroundLight} 0%, ${theme.backgroundLight} 100%)`,
      }}
    >
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${theme.primary} 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${theme.primary} 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            With Love
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              color: theme.text,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 300,
            }}
          >
            Meet the Couple
          </h2>
          <div className="divider-gold mt-6 max-w-xs mx-auto" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              fontFamily: "Great Vibes, cursive",
              color: theme.primary,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              marginTop: "1rem",
            }}
          >
            Two hearts, one soul
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">
          {couple.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, x: i === 0 ? -60 : 60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 + i * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Image frame */}
              <div className="relative mb-8">
                {/* Outer frame */}
                <motion.div
                  className="absolute -inset-3"
                  style={{ border: "1px solid rgba(201,169,110,0.3)" }}
                  animate={{ rotate: [0, 1, -1, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: "clamp(200px, 40vw, 280px)",
                    height: "clamp(250px, 50vw, 360px)",
                  }}
                >
                  <motion.img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover object-top"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.3) 100%)",
                    }}
                  />
                </div>
                {/* Corner ornaments */}
                {[
                  ["top-0 left-0", "border-t border-l"],
                  ["top-0 right-0", "border-t border-r"],
                  ["bottom-0 left-0", "border-b border-l"],
                  ["bottom-0 right-0", "border-b border-r"],
                ].map(([pos, bord], ci) => (
                  <div
                    key={ci}
                    className={`absolute ${pos} w-6 h-6 ${bord}`}
                    style={{ borderColor: "#c9a96e" }}
                  />
                ))}
              </div>

              {/* Role badge */}
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: theme.primary,
                  letterSpacing: "0.35em",
                  fontSize: "0.6rem",
                }}
                className="uppercase mb-3"
              >
                {person.role}
              </p>

              {/* Name */}
              <h3
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  color: theme.text,
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
                className="mb-2"
              >
                {person.name}
              </h3>

              {/* Detail */}
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "rgba(44,44,44,0.5)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                }}
                className="uppercase mb-4"
              >
                {person.detail}
              </p>

              <div className="divider-gold max-w-[120px] mb-6" />

              {/* Parents */}
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  color: "rgba(44,44,44,0.6)",
                  fontSize: "1rem",
                  fontStyle: "italic",
                }}
                className="mb-5"
              >
                {person.parents}
              </p>

              {/* Quote */}
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  color: theme.text,
                  fontSize: "1.05rem",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  maxWidth: 320,
                }}
              >
                "{person.quote}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Center ampersand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center pointer-events-none"
          style={{ marginTop: "4rem" }}
        >
          <span
            style={{
              fontFamily: "Great Vibes, cursive",
              color: theme.primary,
              fontSize: "6rem",
              opacity: 0.3,
            }}
          >
            &amp;
          </span>
        </motion.div>
      </div>
    </section>
  );
}
