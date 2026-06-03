import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { X, ZoomIn } from "lucide-react";

const photos = [
  {
    src: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "The First Glance",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Paris in Bloom",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Golden Hour",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "The Proposal",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Venetian Dreams",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Forever Us",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/3014853/pexels-photo-3014853.jpeg?auto=compress&cs=tinysrgb&w=800",
    caption: "Santorini Sunset",
    span: "col-span-2",
  },
];

export default function GallerySection() {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selected, setSelected] = useState<null | (typeof photos)[0]>(null);

  return (
    <section
      ref={ref}
      className="py-28 px-6 relative"
      style={{ background: theme.backgroundLight }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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
            Memories
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              color: "#2c2c2c",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 300,
            }}
          >
            Our Gallery
          </h2>
          <div className="divider-gold mt-6 max-w-xs mx-auto" />
        </motion.div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              className={`relative overflow-hidden group cursor-pointer ${photo.span}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              onClick={() => setSelected(photo)}
            >
              <motion.img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.6 }}
              />
              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ZoomIn
                  size={28}
                  color="#c9a96e"
                  strokeWidth={1}
                  className="mb-2"
                />
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    color: "#faf8f3",
                    fontSize: "1rem",
                    fontStyle: "italic",
                  }}
                >
                  {photo.caption}
                </p>
              </motion.div>
              {/* Corner accent */}
              <div
                className="absolute top-2 left-2 w-4 h-4 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderColor: theme.primary }}
              />
              <div
                className="absolute bottom-2 right-2 w-4 h-4 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderColor: theme.primary }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.95)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.src}
                alt={selected.caption}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="flex items-center justify-between mt-4 px-2">
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    color: "#e8d5a3",
                    fontSize: "1.2rem",
                    fontStyle: "italic",
                  }}
                >
                  {selected.caption}
                </p>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
                >
                  <X size={20} color="#c9a96e" />
                </button>
              </div>
              {/* Frame corners */}
              {[
                ["top-0 left-0", "border-t-2 border-l-2"],
                ["top-0 right-0", "border-t-2 border-r-2"],
                ["bottom-12 left-0", "border-b-2 border-l-2"],
                ["bottom-12 right-0", "border-b-2 border-r-2"],
              ].map(([pos, bord], ci) => (
                <div
                  key={ci}
                  className={`absolute ${pos} w-8 h-8 ${bord}`}
                  style={{ borderColor: "#c9a96e" }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
