"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { content, type GalleryImage } from "@/lib/theme";
import { Reveal } from "@/components/ui/Motion";

export default function Gallery() {
  const c = content.gallery;
  return (
    <section className="relative px-6 py-28 sm:py-36">
      <div className="text-center">
        <Reveal>
          <p className="font-label text-[10px] uppercase tracking-[0.4em] text-muted">
            {c.kicker}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 font-display text-4xl italic text-ink sm:text-5xl">
            {c.title}
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 items-center gap-6 sm:grid-cols-3 sm:gap-8">
        {c.images.map((img, i) => (
          <GalleryCard key={i} img={img} index={i} />
        ))}
      </div>
    </section>
  );
}

function GalleryCard({ img, index }: { img: GalleryImage; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // each card uses its own `depth` from JSON → distinct parallax travel
  const travel = 130 * img.depth;
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel]);

  // middle card sits lower for an editorial, offset composition
  const offset = index === 1 ? "sm:mt-12" : "";

  return (
    <Reveal delay={index * 0.12} className={offset}>
      <motion.div
        ref={ref}
        style={{ y }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="group relative aspect-[4/5] overflow-hidden rounded-sm shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)]"
      >
        <img
          src={img.src}
          alt={img.alt}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-line/40" />
      </motion.div>
    </Reveal>
  );
}
