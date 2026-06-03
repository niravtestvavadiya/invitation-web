import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Check, Heart } from "lucide-react";

type Attending = "yes" | "no" | "";
type MealChoice = "chicken" | "fish" | "vegetarian" | "";

interface FormState {
  name: string;
  email: string;
  attending: Attending;
  guests: string;
  meal: MealChoice;
  dietary: string;
  message: string;
}

const INIT: FormState = {
  name: "",
  email: "",
  attending: "",
  guests: "1",
  meal: "",
  dietary: "",
  message: "",
};

export default function RSVPSection() {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState<FormState>(INIT);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(key: keyof FormState, val: string) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  }

  const inputStyle = {
    fontFamily: "Montserrat, sans-serif",
    background: "transparent",
    borderBottom: "1px solid rgba(201,169,110,0.3)",
    color: theme.textLight,
    fontSize: "0.85rem",
    padding: "0.75rem 0",
    outline: "none",
    width: "100%",
    letterSpacing: "0.05em",
  };

  return (
    <section
      id="rsvp"
      ref={ref}
      className="py-28 px-6 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.background} 50%, ${theme.background} 100%)`,
      }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1920)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)",
          mixBlendMode: "luminosity",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10,8,5,0.85)" }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
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
            You Are Invited
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              color: theme.textLight,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 300,
            }}
          >
            RSVP
          </h2>
          <div className="divider-gold mt-6 max-w-xs mx-auto" />
          <p
            style={{
              fontFamily: "Cormorant Garamond, serif",
              color: "rgba(250,248,243,0.5)",
              fontSize: "1rem",
              fontStyle: "italic",
              marginTop: "1.5rem",
            }}
          >
            Kindly reply by August 1, 2026
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <motion.div
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
                  boxShadow: `0 0 60px ${theme.primary}4d`,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <Heart size={40} color="#fff" fill="#fff" />
              </motion.div>
              <h3
                style={{
                  fontFamily: "Great Vibes, cursive",
                  color: theme.primary,
                  fontSize: "3rem",
                }}
                className="mb-4"
              >
                Thank You, {form.name}!
              </h3>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  color: "rgba(250,248,243,0.7)",
                  fontSize: "1.1rem",
                  fontStyle: "italic",
                  lineHeight: 1.8,
                }}
              >
                We are so thrilled to celebrate with you. <br />
                Your presence will make our day complete.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      color: "rgba(201,169,110,0.7)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.3em",
                    }}
                    className="block uppercase mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    style={inputStyle}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      color: "rgba(201,169,110,0.7)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.3em",
                    }}
                    className="block uppercase mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    style={inputStyle}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Attending */}
              <div>
                <label
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "rgba(201,169,110,0.7)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.3em",
                  }}
                  className="block uppercase mb-4"
                >
                  Will You Attend? *
                </label>
                <div className="flex gap-4">
                  {(["yes", "no"] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => update("attending", opt)}
                      className="flex-1 py-4 text-xs tracking-widest uppercase transition-all duration-300"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        border: `1px solid ${form.attending === opt ? "#c9a96e" : "rgba(201,169,110,0.2)"}`,
                        color:
                          form.attending === opt
                            ? "#c9a96e"
                            : "rgba(250,248,243,0.4)",
                        background:
                          form.attending === opt
                            ? "rgba(201,169,110,0.1)"
                            : "transparent",
                      }}
                    >
                      {opt === "yes"
                        ? "Joyfully Accept"
                        : "Regretfully Decline"}
                    </button>
                  ))}
                </div>
              </div>

              {form.attending === "yes" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-8 overflow-hidden"
                >
                  {/* Guests & Meal */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          color: "rgba(201,169,110,0.7)",
                          fontSize: "0.55rem",
                          letterSpacing: "0.3em",
                        }}
                        className="block uppercase mb-2"
                      >
                        Number of Guests
                      </label>
                      <select
                        value={form.guests}
                        onChange={(e) => update("guests", e.target.value)}
                        style={{ ...inputStyle, cursor: "pointer" }}
                      >
                        {["1", "2", "3", "4"].map((n) => (
                          <option
                            key={n}
                            value={n}
                            style={{ background: "#1a160f" }}
                          >
                            {n} Guest{Number(n) > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          color: "rgba(201,169,110,0.7)",
                          fontSize: "0.55rem",
                          letterSpacing: "0.3em",
                        }}
                        className="block uppercase mb-2"
                      >
                        Meal Preference
                      </label>
                      <div className="flex gap-3 mt-2">
                        {(["chicken", "fish", "vegetarian"] as const).map(
                          (m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => update("meal", m)}
                              className="px-3 py-2 text-xs capitalize transition-all duration-200"
                              style={{
                                fontFamily: "Montserrat, sans-serif",
                                border: `1px solid ${form.meal === m ? "#c9a96e" : "rgba(201,169,110,0.2)"}`,
                                color:
                                  form.meal === m
                                    ? "#c9a96e"
                                    : "rgba(250,248,243,0.4)",
                                background:
                                  form.meal === m
                                    ? "rgba(201,169,110,0.1)"
                                    : "transparent",
                                fontSize: "0.6rem",
                                letterSpacing: "0.1em",
                              }}
                            >
                              {m}
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dietary */}
                  <div>
                    <label
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        color: "rgba(201,169,110,0.7)",
                        fontSize: "0.55rem",
                        letterSpacing: "0.3em",
                      }}
                      className="block uppercase mb-2"
                    >
                      Dietary Restrictions
                    </label>
                    <input
                      value={form.dietary}
                      onChange={(e) => update("dietary", e.target.value)}
                      style={inputStyle}
                      placeholder="Any allergies or dietary needs"
                    />
                  </div>
                </motion.div>
              )}

              {/* Message */}
              <div>
                <label
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "rgba(201,169,110,0.7)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.3em",
                  }}
                  className="block uppercase mb-2"
                >
                  Leave a Message
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  style={{
                    ...inputStyle,
                    resize: "none",
                    borderBottom: "1px solid rgba(201,169,110,0.3)",
                  }}
                  placeholder="Share your wishes with us..."
                />
              </div>

              {/* Submit */}
              <div className="text-center pt-4">
                <motion.button
                  type="submit"
                  disabled={!form.attending || loading}
                  className="px-16 py-5 text-xs tracking-widest uppercase relative overflow-hidden"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    background: "linear-gradient(135deg, #c9a96e, #a0783a)",
                    color: "#fff",
                    letterSpacing: "0.3em",
                    opacity: !form.attending ? 0.5 : 1,
                    cursor: !form.attending ? "not-allowed" : "pointer",
                  }}
                  whileHover={form.attending ? { scale: 1.02 } : {}}
                  whileTap={form.attending ? { scale: 0.98 } : {}}
                >
                  {loading ? (
                    <motion.span
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      Sending...
                    </motion.span>
                  ) : (
                    "Send RSVP"
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
