import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

const navLinks = [
  { label: "Our Story", href: "#story" },
  { label: "Details", href: "#details" },
  { label: "Gallery", href: "#gallery" },
  { label: "RSVP", href: "#rsvp" },
];

const sparkles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 4,
  size: 4 + Math.random() * 6,
}));

export default function FooterSection() {
  const { theme } = useTheme();
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${theme.background} 0%, ${theme.background} 100%)`,
      }}
    >
      {/* Top divider with sparkles */}
      <div
        className="relative h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${theme.primary} 50%, transparent 100%)`,
        }}
      >
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            className="absolute -top-2"
            style={{ left: s.left, width: s.size, height: s.size }}
            animate={{ opacity: [0, 1, 0], y: [-4, 4, -4] }}
            transition={{
              duration: 2 + Math.random(),
              delay: s.delay,
              repeat: Infinity,
            }}
          >
            <svg viewBox="0 0 24 24" fill="#c9a96e">
              <path d="M12 2L13.5 9 20 10.5 13.5 12 12 19 10.5 12 4 10.5 10.5 9z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          {/* Brand */}
          <div className="text-center md:text-left">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                fontFamily: "Great Vibes, cursive",
                color: theme.primary,
                fontSize: "3rem",
                lineHeight: 1.1,
              }}
              className="mb-4"
            >
              Sophia & Alexander
            </motion.h3>
            <p
              style={{
                fontFamily: "Cormorant Garamond, serif",
                color: "rgba(250,248,243,0.4)",
                fontSize: "0.95rem",
                fontStyle: "italic",
                lineHeight: 1.8,
              }}
            >
              Two souls finding their forever in the eternal city of love.
            </p>
            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              {/* <motion.a
                href="#"
                className="w-10 h-10 flex items-center justify-center border transition-all duration-300"
                style={{
                  borderColor: "rgba(201,169,110,0.25)",
                  color: "#c9a96e",
                }}
                whileHover={{
                  borderColor: "#c9a96e",
                  background: "rgba(201,169,110,0.1)",
                }}
              >
                <Instagram size={16} strokeWidth={1.5} />
              </motion.a> */}
              <motion.a
                href="mailto:sophia.alexander.wedding@gmail.com"
                className="w-10 h-10 flex items-center justify-center border transition-all duration-300"
                style={{
                  borderColor: "rgba(201,169,110,0.25)",
                  color: "#c9a96e",
                }}
                whileHover={{
                  borderColor: "#c9a96e",
                  background: "rgba(201,169,110,0.1)",
                }}
              >
                <Mail size={16} strokeWidth={1.5} />
              </motion.a>
            </div>
          </div>

          {/* Quick links */}
          {/* <div className="text-center">
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                color: theme.primary,
                fontSize: "0.6rem",
                letterSpacing: "0.35em",
              }}
              className="uppercase mb-6"
            >
              Navigation
            </p>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      color: "rgba(250,248,243,0.5)",
                      fontSize: "1rem",
                      fontStyle: "italic",
                    }}
                    whileHover={{ color: "#c9a96e" }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact */}
          <div className="text-center md:text-right">
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                color: theme.primary,
                fontSize: "0.6rem",
                letterSpacing: "0.35em",
              }}
              className="uppercase mb-6"
            >
              Contact
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3 justify-center md:justify-end">
                <Mail
                  size={14}
                  color="#c9a96e"
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0"
                />
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "rgba(250,248,243,0.45)",
                    fontSize: "0.75rem",
                  }}
                >
                  wedding@sophiaalexander.com
                </p>
              </div>
              <div className="flex items-start gap-3 justify-center md:justify-end">
                <Phone
                  size={14}
                  color="#c9a96e"
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0"
                />
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "rgba(250,248,243,0.45)",
                    fontSize: "0.75rem",
                  }}
                >
                  +1 (555) 892-4710
                </p>
              </div>
              <div className="flex items-start gap-3 justify-center md:justify-end">
                <MapPin
                  size={14}
                  color="#c9a96e"
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0"
                />
                <p
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "rgba(250,248,243,0.45)",
                    fontSize: "0.75rem",
                  }}
                >
                  Venice, Italy · September 2026
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center gap-6 mb-10">
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(201,169,110,0.3))",
            }}
          />
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="#c9a96e"
            opacity={0.5}
          >
            <path d="M10 1L11.5 8 18 9.5 11.5 11 10 18 8.5 11 2 9.5 8.5 8z" />
          </svg>
          <span
            style={{
              fontFamily: "Great Vibes, cursive",
              color: "rgba(201,169,110,0.4)",
              fontSize: "1.5rem",
            }}
          >
            &amp;
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="#c9a96e"
            opacity={0.5}
          >
            <path d="M10 1L11.5 8 18 9.5 11.5 11 10 18 8.5 11 2 9.5 8.5 8z" />
          </svg>
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg, rgba(201,169,110,0.3), transparent)",
            }}
          />
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              color: "rgba(250,248,243,0.2)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
            }}
          >
            © 2026 Sophia & Alexander Wedding
          </p>
          <div className="flex items-center gap-2">
            <span
              style={{
                fontFamily: "Cormorant Garamond, serif",
                color: "rgba(250,248,243,0.25)",
                fontSize: "0.85rem",
                fontStyle: "italic",
              }}
            >
              Made with
            </span>
            <Heart size={10} color="#c9a96e" fill="#c9a96e" />
            <span
              style={{
                fontFamily: "Cormorant Garamond, serif",
                color: "rgba(250,248,243,0.25)",
                fontSize: "0.85rem",
                fontStyle: "italic",
              }}
            >
              for a lifetime of love
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
