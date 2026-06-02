"use client";

import { content } from "@/lib/theme";
import { Reveal } from "@/components/ui/Motion";
import FloralAccent from "@/components/ui/FloralAccent";

export default function Footer() {
  const c = content.footer;
  return (
    <footer className="relative px-6 py-20 text-center">
      <Reveal>
        <FloralAccent className="mx-auto h-16 w-16 opacity-70" />
        <p className="mt-5 font-display text-3xl italic text-ink">{c.monogram}</p>
        <p className="mt-4 font-label text-[10px] uppercase tracking-[0.3em] text-muted">
          {c.line}
        </p>
        <p className="mt-2 font-body text-sm italic text-muted/80">{c.signoff}</p>
      </Reveal>
    </footer>
  );
}
