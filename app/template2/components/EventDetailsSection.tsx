import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { MapPin, Clock, Calendar, Music, Utensils, Camera } from "lucide-react";

const events = [
  {
    title: "Wedding Ceremony",
    date: "September 14, 2026",
    time: "4:00 PM",
    venue: "Basilica di San Marco",
    address: "Piazza San Marco, Venice, Italy",
    dress: "Black Tie",
    icon: "◆",
    image:
      "https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Join us as we exchange vows in the breathtaking Basilica, surrounded by the golden mosaics that have witnessed centuries of love stories.",
  },
  {
    title: "Cocktail Reception",
    date: "September 14, 2026",
    time: "6:00 PM",
    venue: "Terrace del Palazzo",
    address: "Grand Canal Terrace, Venice",
    dress: "Smart Elegant",
    icon: "✦",
    image:
      "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Sip on Bellinis as the sun sets over the Grand Canal, creating a golden backdrop for an evening of celebration.",
  },
  {
    title: "Wedding Dinner & Dance",
    date: "September 14, 2026",
    time: "8:00 PM",
    venue: "The Grand Palazzo Venezia",
    address: "Riva degli Schiavoni 4196, Venice",
    dress: "Black Tie",
    icon: "★",
    image:
      "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "An unforgettable evening of exquisite dining, dancing, and memories that will last a lifetime in the grandest palazzo in Venice.",
  },
];

const details = [
  { icon: Calendar, label: "Date", value: "September 14, 2026" },
  { icon: Clock, label: "Time", value: "4:00 PM onwards" },
  { icon: MapPin, label: "Location", value: "Venice, Italy" },
  { icon: Music, label: "Entertainment", value: "Live Orchestra & DJ" },
  { icon: Utensils, label: "Dining", value: "Fine Italian Cuisine" },
  { icon: Camera, label: "Photography", value: "Professional Coverage" },
];

export default function EventDetailsSection() {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="details"
      ref={ref}
      className="py-28 px-6 relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${theme.background} 0%, ${theme.background} 100%)`,
      }}
    >
      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,169,110,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

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
            Celebration Details
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              color: theme.textLight,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 300,
            }}
          >
            The Wedding Events
          </h2>
          <div className="divider-gold mt-6 max-w-xs mx-auto" />
        </motion.div>

        {/* Quick details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-24"
        >
          {details.map((d, i) => (
            <motion.div
              key={d.label}
              className="flex flex-col items-center text-center p-6 border"
              style={{
                borderColor: `rgba(${parseInt(theme.primary.slice(1, 3), 16)},${parseInt(theme.primary.slice(3, 5), 16)},${parseInt(theme.primary.slice(5, 7), 16)},0.15)`,
                background: `rgba(${parseInt(theme.primary.slice(1, 3), 16)},${parseInt(theme.primary.slice(3, 5), 16)},${parseInt(theme.primary.slice(5, 7), 16)},0.04)`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{
                borderColor: "rgba(201,169,110,0.4)",
                background: "rgba(201,169,110,0.08)",
              }}
            >
              <d.icon
                size={20}
                color="#c9a96e"
                strokeWidth={1}
                className="mb-3"
              />
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  color: "rgba(250,248,243,0.4)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.25em",
                }}
                className="uppercase mb-1"
              >
                {d.label}
              </p>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  color: theme.textLight,
                  fontSize: "0.9rem",
                }}
              >
                {d.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Event cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              className="group relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.15 }}
              whileHover={{ y: -6 }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7 }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
                  }}
                />
                {/* Dress code badge */}
                <div
                  className="absolute top-4 right-4 px-3 py-1.5"
                  style={{
                    background: "rgba(201,169,110,0.9)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      color: "#fff",
                      fontSize: "0.55rem",
                      letterSpacing: "0.2em",
                    }}
                  >
                    {event.dress}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div
                className="p-6"
                style={{
                  background: "rgba(20,16,10,0.95)",
                  border: "1px solid rgba(201,169,110,0.15)",
                  borderTop: "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    color: theme.primary,
                    fontSize: "0.55rem",
                    letterSpacing: "0.3em",
                  }}
                  className="uppercase block mb-3"
                >
                  {event.date} · {event.time}
                </span>
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    color: theme.textLight,
                    fontSize: "1.4rem",
                    fontStyle: "italic",
                  }}
                  className="mb-2"
                >
                  {event.title}
                </h3>
                <div className="flex items-start gap-2 mb-3">
                  <MapPin
                    size={12}
                    color="#c9a96e"
                    strokeWidth={1.5}
                    className="mt-1 shrink-0"
                  />
                  <p
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      color: "rgba(250,248,243,0.5)",
                      fontSize: "0.7rem",
                    }}
                  >
                    {event.address}
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    color: "rgba(250,248,243,0.7)",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    fontStyle: "italic",
                  }}
                >
                  {event.description}
                </p>

                {/* Bottom line */}
                <motion.div
                  className="mt-4 h-px"
                  style={{
                    background: "linear-gradient(90deg, #c9a96e, transparent)",
                    transformOrigin: "left",
                  }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
