"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { content } from "@/lib/theme";
import { Reveal, useParallaxValue } from "@/components/ui/Motion";

export default function OurStory() {
  const c = content.story;
  const frame = useRef<HTMLDivElement>(null);
  // image translates within its frame for a depth/parallax effect
  const imgY = useParallaxValue(frame, 60);

  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <Reveal>
          <div
            ref={frame}
            className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)]"
          >
            <motion.img
              src={c.image}
              alt="The couple"
              style={{ y: imgY, scale: 1.18 }}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-line/40" />
          </div>
        </Reveal>

        <div className="md:pl-4">
          <Reveal delay={0.1}>
            <p className="font-label text-[10px] uppercase tracking-[0.4em] text-muted">
              {c.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="mt-3 font-display text-4xl italic text-ink sm:text-5xl">
              {c.title}
            </h2>
          </Reveal>
          {c.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.3 + i * 0.12}>
              <p className="mt-5 font-body text-[15px] leading-relaxed text-ink/80">
                {p}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.6}>
            <p className="mt-6 font-label text-[10px] uppercase tracking-[0.3em] text-accent">
              {c.meta}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
