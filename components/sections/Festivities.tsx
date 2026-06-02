"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/theme";
import { Reveal } from "@/components/ui/Motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Festivities() {
  const c = content.festivities;
  return (
    <section className="relative bg-surface px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-4xl">
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

        <div className="mt-14">
          {c.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ delay: i * 0.1, duration: 0.9, ease: EASE }}
              className="group relative grid grid-cols-[88px_1fr] items-center gap-4 border-t border-line py-7 last:border-b sm:grid-cols-[140px_1fr_180px] sm:gap-8"
            >
              {/* hover wash */}
              <span className="pointer-events-none absolute inset-0 -mx-4 origin-left scale-x-0 bg-accent/[0.05] transition-transform duration-500 group-hover:scale-x-100" />

              <div className="relative font-label text-[11px] uppercase tracking-[0.2em] text-muted">
                <div className="text-ink">{card.time}</div>
                <div className="mt-1 text-accent">{card.day}</div>
              </div>

              <div className="relative">
                <h3 className="font-display text-2xl italic text-ink transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl">
                  {card.title}
                </h3>
                <p className="mt-1 font-body text-sm text-ink/70">
                  {card.description}
                </p>
              </div>

              <div className="relative col-span-2 font-label text-[10px] uppercase tracking-[0.25em] text-accent sm:col-span-1 sm:text-right">
                {card.location}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
