"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/lib/theme";
import { useTheme } from "@/components/ThemeProvider";
import { Reveal, Parallax } from "@/components/ui/Motion";
import FloralAccent from "@/components/ui/FloralAccent";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Rsvp() {
  const { theme } = useTheme();
  const c = content.rsvp;

  const [name, setName] = useState("");
  const [attending, setAttending] = useState(0);
  const [guests, setGuests] = useState(c.guestCountDefault);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const onBg = theme.palette.bg;

  return (
    <section
      className="relative overflow-hidden px-6 py-28 sm:py-36"
      style={{ backgroundColor: theme.palette.accent, color: onBg }}
    >
      {/* parallax floral corners */}
      <Parallax speed={0.45} className="pointer-events-none absolute -left-8 -top-8 opacity-60">
        <FloralAccent className="h-44 w-44" />
      </Parallax>
      <Parallax speed={0.6} className="pointer-events-none absolute -bottom-10 -right-8 opacity-60">
        <FloralAccent flip className="h-52 w-52" />
      </Parallax>

      <div className="relative mx-auto max-w-xl text-center">
        <Reveal>
          <h2
            className="font-display text-4xl italic sm:text-6xl"
            style={{ color: onBg }}
          >
            {c.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            className="mt-3 font-label text-[11px] uppercase tracking-[0.3em]"
            style={{ color: onBg, opacity: 0.85 }}
          >
            {c.kicker}
          </p>
        </Reveal>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-14"
          >
            <FloralAccent className="mx-auto h-20 w-20" />
            <p className="mt-4 font-display text-2xl italic" style={{ color: onBg }}>
              Thank you, {name || "friend"}.
            </p>
            <p className="mt-2 font-body text-sm" style={{ color: onBg, opacity: 0.85 }}>
              Your response has been noted with great joy.
            </p>
          </motion.div>
        ) : (
          <Reveal delay={0.2}>
            <div className="mt-12 space-y-7 text-left">
              <Field label="Full Name">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={c.namePlaceholder}
                  className="w-full border-b bg-transparent pb-2 font-display text-xl italic outline-none placeholder:opacity-50"
                  style={{ borderColor: onBg, color: onBg }}
                />
              </Field>

              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <Field label="Attendance">
                  <div className="space-y-2 pt-1">
                    {c.attendanceOptions.map((opt, i) => (
                      <button
                        key={opt}
                        onClick={() => setAttending(i)}
                        className="flex items-center gap-3 font-body text-sm"
                        style={{ color: onBg }}
                      >
                        <span
                          className="grid h-4 w-4 place-items-center rounded-full border"
                          style={{ borderColor: onBg }}
                        >
                          {attending === i && (
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: onBg }}
                            />
                          )}
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Guest Count">
                  <input
                    type="number"
                    min={0}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full border-b bg-transparent pb-2 font-display text-xl outline-none"
                    style={{ borderColor: onBg, color: onBg }}
                  />
                </Field>
              </div>

              <Field label="A Note For The Couple (optional)">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={c.notePlaceholder}
                  rows={2}
                  className="w-full resize-none border-b bg-transparent pb-2 font-body text-sm italic outline-none placeholder:opacity-50"
                  style={{ borderColor: onBg, color: onBg }}
                />
              </Field>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSent(true)}
                className="w-full border py-4 font-label text-[11px] uppercase tracking-[0.3em] transition-colors"
                style={{ borderColor: onBg, color: onBg }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = onBg;
                  e.currentTarget.style.color = theme.palette.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = onBg;
                }}
              >
                {c.deadlineNote}
              </motion.button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <div>
      <p
        className="mb-2 font-label text-[10px] uppercase tracking-[0.25em]"
        style={{ color: theme.palette.bg, opacity: 0.8 }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}
