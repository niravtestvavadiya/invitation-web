"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/theme";
import { Reveal } from "@/components/ui/Motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Invitation() {
  const c = content.invitation;
  return (
    <section className="relative px-6 py-28 text-center sm:py-36">
      <Reveal>
        <p className="font-label text-[10px] uppercase tracking-[0.4em] text-muted">
          {c.kicker}
        </p>
      </Reveal>

      <div className="mx-auto mt-7 max-w-2xl">
        {c.lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ delay: i * 0.18, duration: 1, ease: EASE }}
            className="font-display text-2xl leading-relaxed text-ink sm:text-4xl"
          >
            {line}
          </motion.p>
        ))}
      </div>

      <Reveal delay={0.4}>
        <p className="mx-auto mt-10 max-w-md font-body text-sm italic text-muted sm:text-base">
          {content.dateLong}
        </p>
      </Reveal>
    </section>
  );
}
