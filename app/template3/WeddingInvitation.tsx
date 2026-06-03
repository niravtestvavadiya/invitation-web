import { useState, useEffect, useRef, useCallback } from "react";
import weddingData, { Theme } from "./weddingData";
import Marquee from "react-fast-marquee";

// ─── Petal Canvas ────────────────────────────────────────────────────────────
interface Petal {
  x: number;
  y: number;
  size: number;
  color: string;
  speedY: number;
  speedX: number;
  rot: number;
  rotSpeed: number;
  wobble: number;
  wobbleSpeed: number;
  opacity: number;
  shape: number;
}

function usePetalCanvas(
  containerRef: React.RefObject<HTMLDivElement>,
  theme: Theme,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const rafRef = useRef<number>(0);

  const makePetal = useCallback(
    (width: number): Petal => {
      const colors = theme.petalColors;
      return {
        x: Math.random() * width,
        y: -20,
        size: 4 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: 0.8 + Math.random() * 1.6,
        speedX: (Math.random() - 0.5) * 0.8,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.02,
        opacity: 0.55 + Math.random() * 0.4,
        shape: Math.floor(Math.random() * 3),
      };
    },
    [theme],
  );

  useEffect(() => {
    petalsRef.current = [];
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d")!;

    const animate = () => {
      const newW = container.offsetWidth;
      const newH = container.scrollHeight || container.offsetHeight;
      if (canvas.width !== newW) canvas.width = newW;
      if (canvas.height !== newH) canvas.height = newH;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (petalsRef.current.length < 55)
        petalsRef.current.push(makePetal(canvas.width));
      petalsRef.current.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.wobble) * 0.5;
        p.rot += p.rotSpeed;
        p.wobble += p.wobbleSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 0.5;
        if (p.shape === 0) {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 1) {
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(
            p.size * 0.8,
            -p.size * 0.5,
            p.size * 0.8,
            p.size * 0.5,
            0,
            p.size,
          );
          ctx.bezierCurveTo(
            -p.size * 0.8,
            p.size * 0.5,
            -p.size * 0.8,
            -p.size * 0.5,
            0,
            -p.size,
          );
          ctx.fill();
        } else {
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const a = i * Math.PI * 0.4 - Math.PI / 2;
            const r = i % 2 === 0 ? p.size : p.size * 0.45;
            i === 0
              ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
              : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
          }
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      });
      petalsRef.current = petalsRef.current.filter(
        (p) => p.y < canvas.height + 30,
      );
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [makePetal, containerRef]);

  return canvasRef;
}

// ─── Floral SVG Divider ──────────────────────────────────────────────────────
function FloralDivider({
  theme,
  flip = false,
}: {
  theme: Theme;
  flip?: boolean;
}) {
  return (
    <svg
      width="100%"
      viewBox="0 0 280 40"
      fill="none"
      style={{
        opacity: 0.55,
        transform: flip ? "scaleY(-1)" : undefined,
        marginBottom: flip ? undefined : 4,
      }}
    >
      <path
        d="M20 20 Q35 8 50 20 Q35 32 20 20Z"
        stroke={theme.secondary}
        strokeWidth="0.7"
        fill="none"
      />
      {!flip && (
        <path
          d="M20 20 Q8 35 20 50 Q32 35 20 20Z"
          stroke={theme.secondary}
          strokeWidth="0.7"
          fill="none"
        />
      )}
      <circle
        cx="20"
        cy="20"
        r="2.5"
        stroke={theme.secondary}
        fill={theme.primary}
      />
      <line
        x1="22"
        y1="20"
        x2={flip ? "258" : "80"}
        y2="20"
        stroke={theme.secondary}
        strokeWidth="0.5"
      />
      {!flip && (
        <>
          <circle
            cx="85"
            cy="20"
            r="1.5"
            stroke={theme.secondary}
            fill={theme.primary}
          />
          <line
            x1="90"
            y1="20"
            x2="130"
            y2="20"
            stroke={theme.secondary}
            strokeWidth="0.5"
          />
        </>
      )}
      <path
        d="M140 20 m-5 0 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0"
        fill="none"
        stroke={theme.secondary}
        strokeWidth="0.7"
      />
      <circle
        cx="140"
        cy="20"
        r="1.8"
        stroke={theme.secondary}
        fill={theme.primary}
      />
      {!flip && (
        <>
          <line
            x1="150"
            y1="20"
            x2="190"
            y2="20"
            stroke={theme.secondary}
            strokeWidth="0.5"
          />
          <circle
            cx="195"
            cy="20"
            r="1.5"
            stroke={theme.secondary}
            fill={theme.primary}
          />
          <line
            x1="200"
            y1="20"
            x2="258"
            y2="20"
            stroke={theme.secondary}
            strokeWidth="0.5"
          />
        </>
      )}
      {flip && (
        <line
          x1="150"
          y1="20"
          x2="258"
          y2="20"
          stroke={theme.secondary}
          strokeWidth="0.5"
        />
      )}
      <path
        d="M260 20 Q275 8 290 20 Q275 32 260 20Z"
        stroke={theme.secondary}
        strokeWidth="0.7"
        fill="none"
      />
      <circle
        cx="260"
        cy="20"
        r="2.5"
        stroke={theme.secondary}
        fill={theme.primary}
      />
    </svg>
  );
}

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("vis");
        }),
      { threshold: 0.08 },
    );
    els.forEach((e) => {
      e.classList.remove("vis");
      obs.observe(e);
    });
    return () => obs.disconnect();
  });
}

// ─── Cover Screen ─────────────────────────────────────────────────────────────
function Cover({ theme, onOpen }: { theme: Theme; onOpen: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = usePetalCanvas(
    rootRef as React.RefObject<HTMLDivElement>,
    theme,
  );
  const [hoverBtn, setHoverBtn] = useState(false);
  const [fading, setFading] = useState(false);

  const handleOpen = () => {
    setFading(true);
    setTimeout(onOpen, 850);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = document.getElementById("envCard");
    if (!card || !rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const my = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    card.style.transform = `perspective(900px) rotateX(${my * -3}deg) rotateY(${mx * 3}deg)`;
  };

  const D = weddingData;

  return (
    <div
      ref={rootRef}
      onMouseMove={handleMouseMove}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: `radial-gradient(ellipse 80% 70% at 50% 40%, ${theme.accent} 0%, ${theme.bg} 100%)`,
      }}
    >
      
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      <div
        id="envCard"
        style={{
          position: "relative",
          width: 360,
          maxWidth: "92%",
          zIndex: 3,
          transition: fading
            ? "all 1s cubic-bezier(0.25,0.46,0.45,0.94)"
            : "transform 0.25s ease",
          opacity: fading ? 0 : 1,
          transform: fading ? "scale(0.88) translateY(-16px)" : undefined,
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            inset: -18,
            borderRadius: 22,
            pointerEvents: "none",
            zIndex: 0,
            background: `radial-gradient(ellipse at center, ${theme.secondary}30 0%, transparent 70%)`,
          }}
        />
        {/* Envelope box */}
        <div
          style={{
            padding: "40px 36px",
            borderRadius: 16,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            zIndex: 1,
            background: "rgba(255,255,255,0.82)",
            border: `1px solid ${theme.border}`,
            boxShadow: `0 16px 60px ${theme.primary}20`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 10,
              borderRadius: 10,
              pointerEvents: "none",
              border: `0.5px solid ${theme.primary}30`,
            }}
          />
          <FloralDivider theme={theme} />
          {/* Seal */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              margin: "0 auto 14px",
              border: `2px solid ${theme.secondary}`,
              color: theme.primary,
              background: `radial-gradient(circle at 35% 35%, white, ${theme.accent})`,
              boxShadow: `0 4px 16px ${theme.primary}25`,
            }}
          >
            ✿
          </div>
          <p
            style={{
              fontSize: 11,
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 10,
              color: theme.primary,
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            An Exclusive Invitation
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              lineHeight: 1.05,
              fontSize: "clamp(28px,7vw,46px)",
              marginBottom: 6,
              color: theme.text,
            }}
          >
            {D.couple.bride}
            <span
              style={{
                display: "block",
                fontSize: "0.38em",
                letterSpacing: 5,
                fontStyle: "italic",
                color: theme.primary,
              }}
            >
              &amp;
            </span>
            {D.couple.groom}
          </h1>
          <p
            style={{
              fontStyle: "italic",
              lineHeight: 1.75,
              fontSize: 14,
              marginBottom: 14,
              opacity: 0.8,
              color: theme.muted,
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            {D.couple.tagline}
          </p>
          <FloralDivider theme={theme} flip />
          <p
            style={{
              fontSize: 12,
              letterSpacing: 2,
              opacity: 0.65,
              marginBottom: 4,
              color: theme.muted,
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            {D.event.date}
          </p>
          <p
            style={{
              fontSize: 11,
              letterSpacing: 2,
              opacity: 0.5,
              marginBottom: 20,
              color: theme.muted,
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            {D.event.venue}
          </p>
          <button
            onClick={handleOpen}
            onMouseEnter={() => setHoverBtn(true)}
            onMouseLeave={() => setHoverBtn(false)}
            style={{
              padding: "12px 32px",
              borderRadius: 2,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 12,
              letterSpacing: 4,
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.4s",
              border: `1px solid ${theme.primary}`,
              color: hoverBtn ? "white" : theme.primary,
              background: hoverBtn ? theme.primary : "transparent",
            }}
          >
            Open Invitation
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection({ theme }: { theme: Theme }) {
  const D = weddingData;
  return (
    <div
      className="wi-section"
      style={{
        minHeight: 440,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "56px 24px",
        textAlign: "center",
        position: "relative",
        zIndex: 3,
        background: theme.bg,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=80') center/cover",
          opacity: 0.06,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 560,
          width: "100%",
        }}
      >
        <p
          className="reveal wi-label"
          style={{
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 10,
            color: theme.primary,
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          Together with their families
        </p>
        <h1
          className="reveal"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: "clamp(44px,9vw,76px)",
            lineHeight: 1,
            marginBottom: 0,
            color: theme.text,
          }}
        >
          {D.couple.bride}
        </h1>
        <div
          className="reveal"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            margin: "6px 0",
          }}
        >
          <div
            style={{ height: 0.5, width: 56, background: theme.secondary }}
          />
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              fontStyle: "italic",
              color: theme.primary,
            }}
          >
            &amp;
          </span>
          <div
            style={{ height: 0.5, width: 56, background: theme.secondary }}
          />
        </div>
        <h1
          className="reveal"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: "clamp(44px,9vw,76px)",
            lineHeight: 1,
            marginBottom: 20,
            color: theme.text,
          }}
        >
          {D.couple.groom}
        </h1>
        <p
          className="reveal"
          style={{
            fontStyle: "italic",
            lineHeight: 1.75,
            fontSize: 17,
            marginBottom: 6,
            color: theme.muted,
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          {D.event.date}
        </p>
        <p
          className="reveal wi-label"
          style={{
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: theme.primary,
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          {D.event.venue}
        </p>
      </div>
    </div>
  );
}

// ─── Families Section ─────────────────────────────────────────────────────────
function FamiliesSection({ theme }: { theme: Theme }) {
  const D = weddingData;
  return (
    <div
      style={{
        padding: "56px 24px",
        textAlign: "center",
        position: "relative",
        zIndex: 3,
        background: `${theme.accent}60`,
      }}
    >
      <p
        className="reveal"
        style={{
          fontSize: 11,
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 10,
          color: theme.primary,
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        With Blessings Of
      </p>
      <h2
        className="reveal"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 30,
          fontWeight: 400,
          marginBottom: 28,
          color: theme.text,
        }}
      >
        Our Families
      </h2>
      <div
        className="reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))",
          gap: 14,
          maxWidth: 600,
          margin: "0 auto 22px",
        }}
      >
        {[D.families.bride, D.families.groom].map((f, i) => (
          <div
            key={i}
            style={{
              borderRadius: 12,
              padding: 24,
              background: "rgba(255,255,255,0.75)",
              border: `1px solid ${theme.border}`,
            }}
          >
            <p
              style={{
                fontSize: 11,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: theme.primary,
                marginBottom: 8,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {f.side}
            </p>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 16,
                lineHeight: 1.5,
                color: theme.text,
              }}
            >
              {f.parents}
            </p>
          </div>
        ))}
      </div>
      <p
        className="reveal"
        style={{
          fontStyle: "italic",
          lineHeight: 1.75,
          maxWidth: 520,
          margin: "0 auto",
          fontSize: 17,
          color: theme.muted,
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        {D.message}
      </p>
    </div>
  );
}

// ─── Date & Venue Section ─────────────────────────────────────────────────────
function DateSection({ theme }: { theme: Theme }) {
  const D = weddingData;
  const cards = [
    { icon: "📅", label: "Date", value: D.event.date },
    { icon: "🕐", label: "Time", value: D.event.time },
    { icon: "🏛️", label: "Venue", value: D.event.venue },
  ];
  return (
    <div
      style={{
        padding: "56px 24px",
        textAlign: "center",
        position: "relative",
        zIndex: 3,
        background: theme.bg,
      }}
    >
      <p
        className="reveal"
        style={{
          fontSize: 11,
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 10,
          color: theme.primary,
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        Save The Date
      </p>
      <h2
        className="reveal"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 30,
          fontWeight: 400,
          marginBottom: 28,
          color: theme.text,
        }}
      >
        Date &amp; Venue
      </h2>
      <div
        className="reveal"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
          gap: 14,
          maxWidth: 640,
          margin: "0 auto 16px",
        }}
      >
        {cards.map((c, i) => (
          <div
            key={i}
            style={{
              borderRadius: 12,
              padding: 24,
              background: "rgba(255,255,255,0.75)",
              border: `1px solid ${theme.border}`,
            }}
          >
            <div style={{ fontSize: 26, marginBottom: 8 }}>{c.icon}</div>
            <p
              style={{
                fontSize: 11,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: theme.primary,
                marginBottom: 6,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {c.label}
            </p>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 15,
                lineHeight: 1.4,
                color: theme.text,
              }}
            >
              {c.value}
            </p>
          </div>
        ))}
      </div>
      <div
        className="reveal"
        style={{
          borderRadius: 12,
          padding: 24,
          maxWidth: 480,
          margin: "0 auto",
          background: "rgba(255,255,255,0.75)",
          border: `1px solid ${theme.border}`,
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: theme.primary,
            marginBottom: 6,
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          Address
        </p>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 15,
            marginBottom: 14,
            color: theme.text,
          }}
        >
          {D.event.address}
        </p>
        <a
          href={D.event.mapLink}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            padding: "9px 22px",
            borderRadius: 2,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 12,
            letterSpacing: 3,
            textTransform: "uppercase",
            textDecoration: "none",
            border: `1px solid ${theme.primary}`,
            color: theme.primary,
            transition: "all 0.3s",
          }}
        >
          View on Map
        </a>
      </div>
    </div>
  );
}

// ─── Schedule / Timeline Section ──────────────────────────────────────────────
function ScheduleSection({ theme }: { theme: Theme }) {
  const D = weddingData;
  return (
    <div
      style={{
        padding: "56px 24px",
        textAlign: "center",
        position: "relative",
        zIndex: 3,
        background: `${theme.accent}60`,
      }}
    >
      <p
        className="reveal"
        style={{
          fontSize: 11,
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 10,
          color: theme.primary,
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        Wedding Day
      </p>
      <h2
        className="reveal"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 30,
          fontWeight: 400,
          marginBottom: 28,
          color: theme.text,
        }}
      >
        Program
      </h2>
      <div
        className="reveal"
        style={{ position: "relative", maxWidth: 540, margin: "0 auto" }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 0.5,
            transform: "translateX(-50%)",
            background: theme.border,
          }}
        />
        {D.schedule.map((item, i) => {
          const card = (
            <div
              style={{
                borderRadius: 10,
                padding: "18px 20px",
                background: "rgba(255,255,255,0.75)",
                border: `1px solid ${theme.border}`,
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: theme.primary,
                  marginBottom: 4,
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                {item.time}
              </p>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 15,
                  marginBottom: 3,
                  color: theme.text,
                }}
              >
                {item.title}
              </p>
              <p
                style={{
                  fontStyle: "italic",
                  fontSize: 13,
                  margin: 0,
                  color: theme.muted,
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                {item.desc}
              </p>
            </div>
          );
          const dot = (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 8,
                  position: "relative",
                  zIndex: 1,
                  background: theme.primary,
                  color: "white",
                  border: `2px solid ${theme.bg}`,
                }}
              >
                ✿
              </div>
            </div>
          );
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 26px 1fr",
                gap: 10,
                alignItems: "center",
                marginBottom: 18,
              }}
            >
              {i % 2 === 0 ? (
                <>
                  {card}
                  {dot}
                  <div />
                </>
              ) : (
                <>
                  <div />
                  {dot}
                  {card}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Gallery Section ──────────────────────────────────────────────────────────
function GallerySection({ theme }: { theme: Theme }) {
  const t = theme;
  const [active, setActive] = useState<string | null>(null);

  return (
    <section style={{ padding: "100px 24px", background: t.bg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13,
              letterSpacing: 5,
              color: t.primary,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Our Story
          </p>

          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 6vw, 48px)",
              fontWeight: 400,
              color: t.text,
              marginBottom: 16,
            }}
          >
            Cherished Moments
          </h2>
        </div>

        {/* Marquee */}
        <Marquee speed={40} pauseOnHover gradient={false}>
          {weddingData.gallery.map((img, i) => (
            <div
              key={i}
              onClick={() => setActive(img.src)}
              style={{
                width: 280,
                height: 340, // ✅ SAME HEIGHT FOR ALL
                marginRight: 16,
                overflow: "hidden",
                borderRadius: 12,
                border: `1px solid ${t.border}`,
                cursor: "pointer",
                position: "relative",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                const image = e.currentTarget.querySelector(
                  "img",
                ) as HTMLImageElement;
                const overlay = e.currentTarget.querySelector(
                  ".overlay",
                ) as HTMLElement;
                image.style.transform = "scale(1.08)";
                overlay.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const image = e.currentTarget.querySelector(
                  "img",
                ) as HTMLImageElement;
                const overlay = e.currentTarget.querySelector(
                  ".overlay",
                ) as HTMLElement;
                image.style.transform = "scale(1)";
                overlay.style.opacity = "0";
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  transition: "transform 0.6s ease",
                  display: "block",
                }}
              />

              <div
                className="overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `${t.primary}30`,
                  opacity: 0,
                  transition: "opacity 0.4s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                <span style={{ color: "#fff", fontSize: 24 }}>✦</span>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={active}
            alt=""
            style={{
              maxWidth: "85vw",
              maxHeight: "85vh",
              objectFit: "contain",
              borderRadius: 10,
              border: `1px solid ${t.primary}40`,
            }}
          />

          <button
            onClick={() => setActive(null)}
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "transparent",
              border: `1px solid ${t.primary}60`,
              color: t.primary,
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}

// ─── RSVP Section ─────────────────────────────────────────────────────────────
function RSVPSection({ theme }: { theme: Theme }) {
  const D = weddingData;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState("yes");
  const [guests, setGuests] = useState("1");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) return;
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 6,
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 16,
    outline: "none",
    background: "rgba(255,255,255,0.7)",
    border: `1px solid ${theme.border}`,
    color: theme.text,
    transition: "border-color 0.3s",
  };

  return (
    <div
      style={{
        padding: "56px 24px",
        textAlign: "center",
        position: "relative",
        zIndex: 3,
        background: `${theme.accent}60`,
      }}
    >
      <p
        className="reveal"
        style={{
          fontSize: 11,
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 10,
          color: theme.primary,
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        Kindly Reply By {D.rsvp.deadline}
      </p>
      <h2
        className="reveal"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 30,
          fontWeight: 400,
          marginBottom: 28,
          color: theme.text,
        }}
      >
        RSVP
      </h2>
      {!submitted ? (
        <div style={{ maxWidth: 460, margin: "0 auto", textAlign: "left" }}>
          {[
            {
              label: "Your Full Name",
              input: (
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                />
              ),
            },
            {
              label: "Email Address",
              input: (
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />
              ),
            },
          ].map((f, i) => (
            <div key={i} className="reveal" style={{ marginBottom: 14 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontSize: 11,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: theme.primary,
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                {f.label}
              </label>
              {f.input}
            </div>
          ))}
          <div
            className="reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontSize: 11,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: theme.primary,
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Attending
              </label>
              <select
                value={attending}
                onChange={(e) => setAttending(e.target.value)}
                style={{ ...inputStyle, appearance: "none" as const }}
              >
                <option value="yes">Joyfully Accepts</option>
                <option value="no">Regretfully Declines</option>
              </select>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontSize: 11,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: theme.primary,
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                style={{ ...inputStyle, appearance: "none" as const }}
              >
                {["1", "2", "3", "4", "5"].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="reveal" style={{ marginBottom: 14 }}>
            <label
              style={{
                display: "block",
                marginBottom: 6,
                fontSize: 11,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: theme.primary,
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              A Note for the Couple
            </label>
            <textarea
              placeholder="Share your wishes..."
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>
          <button
            className="reveal"
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: 13,
              borderRadius: 2,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13,
              letterSpacing: 4,
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.4s",
              background: "transparent",
              marginTop: 6,
              border: `1px solid ${theme.primary}`,
              color: theme.primary,
            }}
          >
            Confirm Attendance
          </button>
        </div>
      ) : (
        <div style={{ padding: "44px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 14 }}>✿</div>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26,
              marginBottom: 10,
              color: theme.text,
            }}
          >
            Thank you, {name}!
          </h3>
          <p
            style={{
              fontStyle: "italic",
              fontFamily: "'Cormorant Garamond', serif",
              color: theme.muted,
            }}
          >
            We can&apos;t wait to celebrate with you.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ theme }: { theme: Theme }) {
  const D = weddingData;
  return (
    <footer
      style={{
        padding: "56px 24px 44px",
        textAlign: "center",
        borderTop: `1px solid ${theme.border}`,
        position: "relative",
        zIndex: 3,
        background: theme.bg,
      }}
    >
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 28,
          fontWeight: 400,
          marginBottom: 8,
          color: theme.text,
        }}
      >
        {D.couple.bride} &amp; {D.couple.groom}
      </h2>
      <p
        style={{
          fontSize: 11,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: theme.primary,
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        {D.event.date}
      </p>
      <p
        style={{
          fontSize: 13,
          letterSpacing: 2,
          marginTop: 22,
          opacity: 0.45,
          color: theme.muted,
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        {D.couple.hashtag}
      </p>
    </footer>
  );
}

// ─── Theme Panel ──────────────────────────────────────────────────────────────
function ThemePanel({
  current,
  onSelect,
}: {
  current: string;
  onSelect: (key: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const D = weddingData;
  const theme = D.themes[current];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px 16px 0",
        position: "relative",
        zIndex: 10,
      }}
    >
      {open && (
        <div
          style={{
            position: "absolute",
            top: 44,
            right: 16,
            borderRadius: 10,
            padding: 10,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            minWidth: 148,
            zIndex: 20,
            backdropFilter: "blur(16px)",
            background: "rgba(255,255,255,0.95)",
            border: `1px solid ${theme.border}`,
          }}
        >
          {Object.entries(D.themes).map(([key, th]) => (
            <button
              key={key}
              onClick={() => {
                onSelect(key);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                borderRadius: 6,
                border:
                  key === current
                    ? `1px solid ${th.primary}`
                    : "1px solid transparent",
                cursor: "pointer",
                background: "transparent",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 13,
                letterSpacing: 1,
                textAlign: "left",
                color: th.text,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: th.primary,
                }}
              />
              {th.name}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          fontSize: 16,
          transition: "transform 0.25s",
          background: theme.primary,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.12) rotate(15deg)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        title="Change theme"
      >
        🎨
      </button>
    </div>
  );
}

// ─── Invitation Content ───────────────────────────────────────────────────────
function InvitationContent({
  theme,
  onThemeChange,
}: {
  theme: Theme;
  themeKey: string;
  onThemeChange: (key: string) => void;
}) {
  useReveal();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = usePetalCanvas(
    wrapRef as React.RefObject<HTMLDivElement>,
    theme,
  );

  return (
    <div
      ref={wrapRef}
      style={{ position: "relative", background: theme.bg, color: theme.text }}
    >
      {/* Petal rain canvas — floats above all sections */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
      <ThemePanel
        current={
          Object.keys(weddingData.themes).find(
            (k) => weddingData.themes[k] === theme,
          ) || "blossom"
        }
        onSelect={onThemeChange}
      />
      <HeroSection theme={theme} />
      <FamiliesSection theme={theme} />
      <DateSection theme={theme} />
      <ScheduleSection theme={theme} />
      <GallerySection theme={theme} />
      <RSVPSection theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────
export default function WeddingInvitation() {
  const [themeKey, setThemeKey] = useState("blossom");
  const [opened, setOpened] = useState(false);
  const theme = weddingData.themes[themeKey];

  return (
    <>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          overflow: "hidden",
          position: "relative",
          borderRadius: 12,
          minHeight: 500,
          background: theme.bg,
          color: theme.text,
        }}
      >
        {!opened ? (
          <Cover theme={theme} onOpen={() => setOpened(true)} />
        ) : (
          <InvitationContent
            theme={theme}
            themeKey={themeKey}
            onThemeChange={setThemeKey}
          />
        )}
      </div>
    </>
  );
}
// import { useState, useEffect, useRef, useCallback } from "react";
// import weddingData, { Theme } from "./weddingData";
// import Marquee from "react-fast-marquee";

// // ─── Petal Canvas ────────────────────────────────────────────────────────────
// interface Petal {
//   x: number;
//   y: number;
//   size: number;
//   color: string;
//   speedY: number;
//   speedX: number;
//   rot: number;
//   rotSpeed: number;
//   wobble: number;
//   wobbleSpeed: number;
//   opacity: number;
//   shape: number;
// }

// function usePetalCanvas(
//   containerRef: React.RefObject<HTMLDivElement>,
//   theme: Theme,
// ) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const petalsRef = useRef<Petal[]>([]);
//   const rafRef = useRef<number>(0);

//   const makePetal = useCallback(
//     (width: number): Petal => {
//       const colors = theme.petalColors;
//       return {
//         x: Math.random() * width,
//         y: -20,
//         size: 4 + Math.random() * 8,
//         color: colors[Math.floor(Math.random() * colors.length)],
//         speedY: 0.8 + Math.random() * 1.6,
//         speedX: (Math.random() - 0.5) * 0.8,
//         rot: Math.random() * Math.PI * 2,
//         rotSpeed: (Math.random() - 0.5) * 0.04,
//         wobble: Math.random() * Math.PI * 2,
//         wobbleSpeed: 0.02 + Math.random() * 0.02,
//         opacity: 0.55 + Math.random() * 0.4,
//         shape: Math.floor(Math.random() * 3),
//       };
//     },
//     [theme],
//   );

//   useEffect(() => {
//     petalsRef.current = [];
//   }, [theme]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const container = containerRef.current;
//     if (!canvas || !container) return;
//     const ctx = canvas.getContext("2d")!;

//     const animate = () => {
//       canvas.width = container.offsetWidth;
//       canvas.height = container.offsetHeight;
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       if (petalsRef.current.length < 55)
//         petalsRef.current.push(makePetal(canvas.width));
//       petalsRef.current.forEach((p) => {
//         p.y += p.speedY;
//         p.x += p.speedX + Math.sin(p.wobble) * 0.5;
//         p.rot += p.rotSpeed;
//         p.wobble += p.wobbleSpeed;
//         ctx.save();
//         ctx.translate(p.x, p.y);
//         ctx.rotate(p.rot);
//         ctx.globalAlpha = p.opacity;
//         ctx.fillStyle = p.color;
//         ctx.strokeStyle = p.color;
//         ctx.lineWidth = 0.5;
//         if (p.shape === 0) {
//           ctx.beginPath();
//           ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
//           ctx.fill();
//         } else if (p.shape === 1) {
//           ctx.beginPath();
//           ctx.moveTo(0, -p.size);
//           ctx.bezierCurveTo(
//             p.size * 0.8,
//             -p.size * 0.5,
//             p.size * 0.8,
//             p.size * 0.5,
//             0,
//             p.size,
//           );
//           ctx.bezierCurveTo(
//             -p.size * 0.8,
//             p.size * 0.5,
//             -p.size * 0.8,
//             -p.size * 0.5,
//             0,
//             -p.size,
//           );
//           ctx.fill();
//         } else {
//           ctx.beginPath();
//           for (let i = 0; i < 5; i++) {
//             const a = i * Math.PI * 0.4 - Math.PI / 2;
//             const r = i % 2 === 0 ? p.size : p.size * 0.45;
//             i === 0
//               ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
//               : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
//           }
//           ctx.closePath();
//           ctx.fill();
//         }
//         ctx.restore();
//       });
//       petalsRef.current = petalsRef.current.filter(
//         (p) => p.y < canvas.height + 30,
//       );
//       rafRef.current = requestAnimationFrame(animate);
//     };

//     rafRef.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(rafRef.current);
//   }, [makePetal, containerRef]);

//   return canvasRef;
// }

// // ─── Floral SVG Divider ──────────────────────────────────────────────────────
// function FloralDivider({
//   theme,
//   flip = false,
// }: {
//   theme: Theme;
//   flip?: boolean;
// }) {
//   return (
//     <svg
//       width="100%"
//       viewBox="0 0 280 40"
//       fill="none"
//       style={{
//         opacity: 0.55,
//         transform: flip ? "scaleY(-1)" : undefined,
//         marginBottom: flip ? undefined : 4,
//       }}
//     >
//       <path
//         d="M20 20 Q35 8 50 20 Q35 32 20 20Z"
//         stroke={theme.secondary}
//         strokeWidth="0.7"
//         fill="none"
//       />
//       {!flip && (
//         <path
//           d="M20 20 Q8 35 20 50 Q32 35 20 20Z"
//           stroke={theme.secondary}
//           strokeWidth="0.7"
//           fill="none"
//         />
//       )}
//       <circle
//         cx="20"
//         cy="20"
//         r="2.5"
//         stroke={theme.secondary}
//         fill={theme.primary}
//       />
//       <line
//         x1="22"
//         y1="20"
//         x2={flip ? "258" : "80"}
//         y2="20"
//         stroke={theme.secondary}
//         strokeWidth="0.5"
//       />
//       {!flip && (
//         <>
//           <circle
//             cx="85"
//             cy="20"
//             r="1.5"
//             stroke={theme.secondary}
//             fill={theme.primary}
//           />
//           <line
//             x1="90"
//             y1="20"
//             x2="130"
//             y2="20"
//             stroke={theme.secondary}
//             strokeWidth="0.5"
//           />
//         </>
//       )}
//       <path
//         d="M140 20 m-5 0 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0"
//         fill="none"
//         stroke={theme.secondary}
//         strokeWidth="0.7"
//       />
//       <circle
//         cx="140"
//         cy="20"
//         r="1.8"
//         stroke={theme.secondary}
//         fill={theme.primary}
//       />
//       {!flip && (
//         <>
//           <line
//             x1="150"
//             y1="20"
//             x2="190"
//             y2="20"
//             stroke={theme.secondary}
//             strokeWidth="0.5"
//           />
//           <circle
//             cx="195"
//             cy="20"
//             r="1.5"
//             stroke={theme.secondary}
//             fill={theme.primary}
//           />
//           <line
//             x1="200"
//             y1="20"
//             x2="258"
//             y2="20"
//             stroke={theme.secondary}
//             strokeWidth="0.5"
//           />
//         </>
//       )}
//       {flip && (
//         <line
//           x1="150"
//           y1="20"
//           x2="258"
//           y2="20"
//           stroke={theme.secondary}
//           strokeWidth="0.5"
//         />
//       )}
//       <path
//         d="M260 20 Q275 8 290 20 Q275 32 260 20Z"
//         stroke={theme.secondary}
//         strokeWidth="0.7"
//         fill="none"
//       />
//       <circle
//         cx="260"
//         cy="20"
//         r="2.5"
//         stroke={theme.secondary}
//         fill={theme.primary}
//       />
//     </svg>
//   );
// }

// // ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
// function useReveal() {
//   useEffect(() => {
//     const els = document.querySelectorAll<HTMLElement>(".reveal");
//     const obs = new IntersectionObserver(
//       (entries) =>
//         entries.forEach((e) => {
//           if (e.isIntersecting) e.target.classList.add("vis");
//         }),
//       { threshold: 0.08 },
//     );
//     els.forEach((e) => {
//       e.classList.remove("vis");
//       obs.observe(e);
//     });
//     return () => obs.disconnect();
//   });
// }

// // ─── Cover Screen ─────────────────────────────────────────────────────────────
// function Cover({ theme, onOpen }: { theme: Theme; onOpen: () => void }) {
//   const rootRef = useRef<HTMLDivElement>(null);
//   const canvasRef = usePetalCanvas(
//     rootRef as React.RefObject<HTMLDivElement>,
//     theme,
//   );
//   const [hoverBtn, setHoverBtn] = useState(false);
//   const [fading, setFading] = useState(false);

//   const handleOpen = () => {
//     setFading(true);
//     setTimeout(onOpen, 850);
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     const card = document.getElementById("envCard");
//     if (!card || !rootRef.current) return;
//     const rect = rootRef.current.getBoundingClientRect();
//     const mx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
//     const my = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
//     card.style.transform = `perspective(900px) rotateX(${my * -3}deg) rotateY(${mx * 3}deg)`;
//   };

//   const D = weddingData;

//   return (
//     <div
//       ref={rootRef}
//       onMouseMove={handleMouseMove}
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         position: "relative",
//         overflow: "hidden",
//         background: `radial-gradient(ellipse 80% 70% at 50% 40%, ${theme.accent} 0%, ${theme.bg} 100%)`,
//       }}
//     >
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           inset: 0,
//           width: "100%",
//           height: "100%",
//           pointerEvents: "none",
//           zIndex: 2,
//         }}
//       />
//       <div
//         id="envCard"
//         style={{
//           position: "relative",
//           width: 360,
//           maxWidth: "92%",
//           zIndex: 3,
//           transition: fading
//             ? "all 1s cubic-bezier(0.25,0.46,0.45,0.94)"
//             : "transform 0.25s ease",
//           opacity: fading ? 0 : 1,
//           transform: fading ? "scale(0.88) translateY(-16px)" : undefined,
//         }}
//       >
//         {/* Glow */}
//         <div
//           style={{
//             position: "absolute",
//             inset: -18,
//             borderRadius: 22,
//             pointerEvents: "none",
//             zIndex: 0,
//             background: `radial-gradient(ellipse at center, ${theme.secondary}30 0%, transparent 70%)`,
//           }}
//         />
//         {/* Envelope box */}
//         <div
//           style={{
//             padding: "40px 36px",
//             borderRadius: 16,
//             textAlign: "center",
//             position: "relative",
//             overflow: "hidden",
//             zIndex: 1,
//             background: "rgba(255,255,255,0.82)",
//             border: `1px solid ${theme.border}`,
//             boxShadow: `0 16px 60px ${theme.primary}20`,
//           }}
//         >
//           <div
//             style={{
//               position: "absolute",
//               inset: 10,
//               borderRadius: 10,
//               pointerEvents: "none",
//               border: `0.5px solid ${theme.primary}30`,
//             }}
//           />
//           <FloralDivider theme={theme} />
//           {/* Seal */}
//           <div
//             style={{
//               width: 52,
//               height: 52,
//               borderRadius: "50%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: 20,
//               margin: "0 auto 14px",
//               border: `2px solid ${theme.secondary}`,
//               color: theme.primary,
//               background: `radial-gradient(circle at 35% 35%, white, ${theme.accent})`,
//               boxShadow: `0 4px 16px ${theme.primary}25`,
//             }}
//           >
//             ✿
//           </div>
//           <p
//             style={{
//               fontSize: 11,
//               letterSpacing: 4,
//               textTransform: "uppercase",
//               marginBottom: 10,
//               color: theme.primary,
//               fontFamily: "'Cormorant Garamond', serif",
//             }}
//           >
//             An Exclusive Invitation
//           </p>
//           <h1
//             style={{
//               fontFamily: "'Playfair Display', serif",
//               fontWeight: 400,
//               lineHeight: 1.05,
//               fontSize: "clamp(28px,7vw,46px)",
//               marginBottom: 6,
//               color: theme.text,
//             }}
//           >
//             {D.couple.bride}
//             <span
//               style={{
//                 display: "block",
//                 fontSize: "0.38em",
//                 letterSpacing: 5,
//                 fontStyle: "italic",
//                 color: theme.primary,
//               }}
//             >
//               &amp;
//             </span>
//             {D.couple.groom}
//           </h1>
//           <p
//             style={{
//               fontStyle: "italic",
//               lineHeight: 1.75,
//               fontSize: 14,
//               marginBottom: 14,
//               opacity: 0.8,
//               color: theme.muted,
//               fontFamily: "'Cormorant Garamond', serif",
//             }}
//           >
//             {D.couple.tagline}
//           </p>
//           <FloralDivider theme={theme} flip />
//           <p
//             style={{
//               fontSize: 12,
//               letterSpacing: 2,
//               opacity: 0.65,
//               marginBottom: 4,
//               color: theme.muted,
//               fontFamily: "'Cormorant Garamond', serif",
//             }}
//           >
//             {D.event.date}
//           </p>
//           <p
//             style={{
//               fontSize: 11,
//               letterSpacing: 2,
//               opacity: 0.5,
//               marginBottom: 20,
//               color: theme.muted,
//               fontFamily: "'Cormorant Garamond', serif",
//             }}
//           >
//             {D.event.venue}
//           </p>
//           <button
//             onClick={handleOpen}
//             onMouseEnter={() => setHoverBtn(true)}
//             onMouseLeave={() => setHoverBtn(false)}
//             style={{
//               padding: "12px 32px",
//               borderRadius: 2,
//               fontFamily: "'Cormorant Garamond', serif",
//               fontSize: 12,
//               letterSpacing: 4,
//               textTransform: "uppercase",
//               cursor: "pointer",
//               transition: "all 0.4s",
//               border: `1px solid ${theme.primary}`,
//               color: hoverBtn ? "white" : theme.primary,
//               background: hoverBtn ? theme.primary : "transparent",
//             }}
//           >
//             Open Invitation
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Hero Section ─────────────────────────────────────────────────────────────
// function HeroSection({ theme }: { theme: Theme }) {
//   const D = weddingData;
//   return (
//     <div
//       className="wi-section"
//       style={{
//         minHeight: 440,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "56px 24px",
//         textAlign: "center",
//         position: "relative",
//         zIndex: 3,
//         background: theme.bg,
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           background:
//             "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=80') center/cover",
//           opacity: 0.06,
//           zIndex: 0,
//         }}
//       />
//       <div
//         style={{
//           position: "relative",
//           zIndex: 1,
//           maxWidth: 560,
//           width: "100%",
//         }}
//       >
//         <p
//           className="reveal wi-label"
//           style={{
//             fontSize: 11,
//             letterSpacing: 4,
//             textTransform: "uppercase",
//             marginBottom: 10,
//             color: theme.primary,
//             fontFamily: "'Cormorant Garamond', serif",
//           }}
//         >
//           Together with their families
//         </p>
//         <h1
//           className="reveal"
//           style={{
//             fontFamily: "'Playfair Display', serif",
//             fontWeight: 400,
//             fontSize: "clamp(44px,9vw,76px)",
//             lineHeight: 1,
//             marginBottom: 0,
//             color: theme.text,
//           }}
//         >
//           {D.couple.bride}
//         </h1>
//         <div
//           className="reveal"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 14,
//             margin: "6px 0",
//           }}
//         >
//           <div
//             style={{ height: 0.5, width: 56, background: theme.secondary }}
//           />
//           <span
//             style={{
//               fontFamily: "'Playfair Display', serif",
//               fontSize: 22,
//               fontStyle: "italic",
//               color: theme.primary,
//             }}
//           >
//             &amp;
//           </span>
//           <div
//             style={{ height: 0.5, width: 56, background: theme.secondary }}
//           />
//         </div>
//         <h1
//           className="reveal"
//           style={{
//             fontFamily: "'Playfair Display', serif",
//             fontWeight: 400,
//             fontSize: "clamp(44px,9vw,76px)",
//             lineHeight: 1,
//             marginBottom: 20,
//             color: theme.text,
//           }}
//         >
//           {D.couple.groom}
//         </h1>
//         <p
//           className="reveal"
//           style={{
//             fontStyle: "italic",
//             lineHeight: 1.75,
//             fontSize: 17,
//             marginBottom: 6,
//             color: theme.muted,
//             fontFamily: "'Cormorant Garamond', serif",
//           }}
//         >
//           {D.event.date}
//         </p>
//         <p
//           className="reveal wi-label"
//           style={{
//             fontSize: 11,
//             letterSpacing: 4,
//             textTransform: "uppercase",
//             color: theme.primary,
//             fontFamily: "'Cormorant Garamond', serif",
//           }}
//         >
//           {D.event.venue}
//         </p>
//       </div>
//     </div>
//   );
// }

// // ─── Families Section ─────────────────────────────────────────────────────────
// function FamiliesSection({ theme }: { theme: Theme }) {
//   const D = weddingData;
//   return (
//     <div
//       style={{
//         padding: "56px 24px",
//         textAlign: "center",
//         position: "relative",
//         zIndex: 3,
//         background: `${theme.accent}60`,
//       }}
//     >
//       <p
//         className="reveal"
//         style={{
//           fontSize: 11,
//           letterSpacing: 4,
//           textTransform: "uppercase",
//           marginBottom: 10,
//           color: theme.primary,
//           fontFamily: "'Cormorant Garamond', serif",
//         }}
//       >
//         With Blessings Of
//       </p>
//       <h2
//         className="reveal"
//         style={{
//           fontFamily: "'Playfair Display', serif",
//           fontSize: 30,
//           fontWeight: 400,
//           marginBottom: 28,
//           color: theme.text,
//         }}
//       >
//         Our Families
//       </h2>
//       <div
//         className="reveal"
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))",
//           gap: 14,
//           maxWidth: 600,
//           margin: "0 auto 22px",
//         }}
//       >
//         {[D.families.bride, D.families.groom].map((f, i) => (
//           <div
//             key={i}
//             style={{
//               borderRadius: 12,
//               padding: 24,
//               background: "rgba(255,255,255,0.75)",
//               border: `1px solid ${theme.border}`,
//             }}
//           >
//             <p
//               style={{
//                 fontSize: 11,
//                 letterSpacing: 4,
//                 textTransform: "uppercase",
//                 color: theme.primary,
//                 marginBottom: 8,
//                 fontFamily: "'Cormorant Garamond', serif",
//               }}
//             >
//               {f.side}
//             </p>
//             <p
//               style={{
//                 fontFamily: "'Playfair Display', serif",
//                 fontSize: 16,
//                 lineHeight: 1.5,
//                 color: theme.text,
//               }}
//             >
//               {f.parents}
//             </p>
//           </div>
//         ))}
//       </div>
//       <p
//         className="reveal"
//         style={{
//           fontStyle: "italic",
//           lineHeight: 1.75,
//           maxWidth: 520,
//           margin: "0 auto",
//           fontSize: 17,
//           color: theme.muted,
//           fontFamily: "'Cormorant Garamond', serif",
//         }}
//       >
//         {D.message}
//       </p>
//     </div>
//   );
// }

// // ─── Date & Venue Section ─────────────────────────────────────────────────────
// function DateSection({ theme }: { theme: Theme }) {
//   const D = weddingData;
//   const cards = [
//     { icon: "📅", label: "Date", value: D.event.date },
//     { icon: "🕐", label: "Time", value: D.event.time },
//     { icon: "🏛️", label: "Venue", value: D.event.venue },
//   ];
//   return (
//     <div
//       style={{
//         padding: "56px 24px",
//         textAlign: "center",
//         position: "relative",
//         zIndex: 3,
//         background: theme.bg,
//       }}
//     >
//       <p
//         className="reveal"
//         style={{
//           fontSize: 11,
//           letterSpacing: 4,
//           textTransform: "uppercase",
//           marginBottom: 10,
//           color: theme.primary,
//           fontFamily: "'Cormorant Garamond', serif",
//         }}
//       >
//         Save The Date
//       </p>
//       <h2
//         className="reveal"
//         style={{
//           fontFamily: "'Playfair Display', serif",
//           fontSize: 30,
//           fontWeight: 400,
//           marginBottom: 28,
//           color: theme.text,
//         }}
//       >
//         Date &amp; Venue
//       </h2>
//       <div
//         className="reveal"
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
//           gap: 14,
//           maxWidth: 640,
//           margin: "0 auto 16px",
//         }}
//       >
//         {cards.map((c, i) => (
//           <div
//             key={i}
//             style={{
//               borderRadius: 12,
//               padding: 24,
//               background: "rgba(255,255,255,0.75)",
//               border: `1px solid ${theme.border}`,
//             }}
//           >
//             <div style={{ fontSize: 26, marginBottom: 8 }}>{c.icon}</div>
//             <p
//               style={{
//                 fontSize: 11,
//                 letterSpacing: 4,
//                 textTransform: "uppercase",
//                 color: theme.primary,
//                 marginBottom: 6,
//                 fontFamily: "'Cormorant Garamond', serif",
//               }}
//             >
//               {c.label}
//             </p>
//             <p
//               style={{
//                 fontFamily: "'Playfair Display', serif",
//                 fontSize: 15,
//                 lineHeight: 1.4,
//                 color: theme.text,
//               }}
//             >
//               {c.value}
//             </p>
//           </div>
//         ))}
//       </div>
//       <div
//         className="reveal"
//         style={{
//           borderRadius: 12,
//           padding: 24,
//           maxWidth: 480,
//           margin: "0 auto",
//           background: "rgba(255,255,255,0.75)",
//           border: `1px solid ${theme.border}`,
//         }}
//       >
//         <p
//           style={{
//             fontSize: 11,
//             letterSpacing: 4,
//             textTransform: "uppercase",
//             color: theme.primary,
//             marginBottom: 6,
//             fontFamily: "'Cormorant Garamond', serif",
//           }}
//         >
//           Address
//         </p>
//         <p
//           style={{
//             fontFamily: "'Playfair Display', serif",
//             fontSize: 15,
//             marginBottom: 14,
//             color: theme.text,
//           }}
//         >
//           {D.event.address}
//         </p>
//         <a
//           href={D.event.mapLink}
//           target="_blank"
//           rel="noreferrer"
//           style={{
//             display: "inline-block",
//             padding: "9px 22px",
//             borderRadius: 2,
//             fontFamily: "'Cormorant Garamond', serif",
//             fontSize: 12,
//             letterSpacing: 3,
//             textTransform: "uppercase",
//             textDecoration: "none",
//             border: `1px solid ${theme.primary}`,
//             color: theme.primary,
//             transition: "all 0.3s",
//           }}
//         >
//           View on Map
//         </a>
//       </div>
//     </div>
//   );
// }

// // ─── Schedule / Timeline Section ──────────────────────────────────────────────
// function ScheduleSection({ theme }: { theme: Theme }) {
//   const D = weddingData;
//   return (
//     <div
//       style={{
//         padding: "56px 24px",
//         textAlign: "center",
//         position: "relative",
//         zIndex: 3,
//         background: `${theme.accent}60`,
//       }}
//     >
//       <p
//         className="reveal"
//         style={{
//           fontSize: 11,
//           letterSpacing: 4,
//           textTransform: "uppercase",
//           marginBottom: 10,
//           color: theme.primary,
//           fontFamily: "'Cormorant Garamond', serif",
//         }}
//       >
//         Wedding Day
//       </p>
//       <h2
//         className="reveal"
//         style={{
//           fontFamily: "'Playfair Display', serif",
//           fontSize: 30,
//           fontWeight: 400,
//           marginBottom: 28,
//           color: theme.text,
//         }}
//       >
//         Program
//       </h2>
//       <div
//         className="reveal"
//         style={{ position: "relative", maxWidth: 540, margin: "0 auto" }}
//       >
//         <div
//           style={{
//             position: "absolute",
//             left: "50%",
//             top: 0,
//             bottom: 0,
//             width: 0.5,
//             transform: "translateX(-50%)",
//             background: theme.border,
//           }}
//         />
//         {D.schedule.map((item, i) => {
//           const card = (
//             <div
//               style={{
//                 borderRadius: 10,
//                 padding: "18px 20px",
//                 background: "rgba(255,255,255,0.75)",
//                 border: `1px solid ${theme.border}`,
//               }}
//             >
//               <p
//                 style={{
//                   fontSize: 10,
//                   letterSpacing: 3,
//                   textTransform: "uppercase",
//                   color: theme.primary,
//                   marginBottom: 4,
//                   fontFamily: "'Cormorant Garamond', serif",
//                 }}
//               >
//                 {item.time}
//               </p>
//               <p
//                 style={{
//                   fontFamily: "'Playfair Display', serif",
//                   fontSize: 15,
//                   marginBottom: 3,
//                   color: theme.text,
//                 }}
//               >
//                 {item.title}
//               </p>
//               <p
//                 style={{
//                   fontStyle: "italic",
//                   fontSize: 13,
//                   margin: 0,
//                   color: theme.muted,
//                   fontFamily: "'Cormorant Garamond', serif",
//                 }}
//               >
//                 {item.desc}
//               </p>
//             </div>
//           );
//           const dot = (
//             <div style={{ display: "flex", justifyContent: "center" }}>
//               <div
//                 style={{
//                   width: 20,
//                   height: 20,
//                   borderRadius: "50%",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontSize: 8,
//                   position: "relative",
//                   zIndex: 1,
//                   background: theme.primary,
//                   color: "white",
//                   border: `2px solid ${theme.bg}`,
//                 }}
//               >
//                 ✿
//               </div>
//             </div>
//           );
//           return (
//             <div
//               key={i}
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 26px 1fr",
//                 gap: 10,
//                 alignItems: "center",
//                 marginBottom: 18,
//               }}
//             >
//               {i % 2 === 0 ? (
//                 <>
//                   {card}
//                   {dot}
//                   <div />
//                 </>
//               ) : (
//                 <>
//                   <div />
//                   {dot}
//                   {card}
//                 </>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // ─── Gallery Section ──────────────────────────────────────────────────────────
// function GallerySection({ theme }: { theme: Theme }) {
//   const t = theme;
//   const [active, setActive] = useState<string | null>(null);

//   return (
//     <section style={{ padding: "100px 24px", background: t.bg }}>
//       <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//         {/* Heading */}
//         <div style={{ textAlign: "center", marginBottom: 56 }}>
//           <p
//             style={{
//               fontFamily: "'Cormorant Garamond', serif",
//               fontSize: 13,
//               letterSpacing: 5,
//               color: t.primary,
//               textTransform: "uppercase",
//               marginBottom: 12,
//             }}
//           >
//             Our Story
//           </p>

//           <h2
//             style={{
//               fontFamily: "'Playfair Display', serif",
//               fontSize: "clamp(32px, 6vw, 48px)",
//               fontWeight: 400,
//               color: t.text,
//               marginBottom: 16,
//             }}
//           >
//             Cherished Moments
//           </h2>
//         </div>

//         {/* Marquee */}
//         <Marquee speed={40} pauseOnHover gradient={false}>
//           {weddingData.gallery.map((img, i) => (
//             <div
//               key={i}
//               onClick={() => setActive(img.src)}
//               style={{
//                 width: 280,
//                 height: 340, // ✅ SAME HEIGHT FOR ALL
//                 marginRight: 16,
//                 overflow: "hidden",
//                 borderRadius: 12,
//                 border: `1px solid ${t.border}`,
//                 cursor: "pointer",
//                 position: "relative",
//                 flexShrink: 0,
//               }}
//               onMouseEnter={(e) => {
//                 const image = e.currentTarget.querySelector(
//                   "img",
//                 ) as HTMLImageElement;
//                 const overlay = e.currentTarget.querySelector(
//                   ".overlay",
//                 ) as HTMLElement;
//                 image.style.transform = "scale(1.08)";
//                 overlay.style.opacity = "1";
//               }}
//               onMouseLeave={(e) => {
//                 const image = e.currentTarget.querySelector(
//                   "img",
//                 ) as HTMLImageElement;
//                 const overlay = e.currentTarget.querySelector(
//                   ".overlay",
//                 ) as HTMLElement;
//                 image.style.transform = "scale(1)";
//                 overlay.style.opacity = "0";
//               }}
//             >
//               <img
//                 src={img.src}
//                 alt={img.alt}
//                 loading="lazy"
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                   objectPosition: "center",
//                   transition: "transform 0.6s ease",
//                   display: "block",
//                 }}
//               />

//               <div
//                 className="overlay"
//                 style={{
//                   position: "absolute",
//                   inset: 0,
//                   background: `${t.primary}30`,
//                   opacity: 0,
//                   transition: "opacity 0.4s ease",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   pointerEvents: "none",
//                 }}
//               >
//                 <span style={{ color: "#fff", fontSize: 24 }}>✦</span>
//               </div>
//             </div>
//           ))}
//         </Marquee>
//       </div>

//       {/* Lightbox */}
//       {active && (
//         <div
//           onClick={() => setActive(null)}
//           style={{
//             position: "fixed",
//             inset: 0,
//             zIndex: 1000,
//             background: "rgba(0,0,0,0.9)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <img
//             src={active}
//             alt=""
//             style={{
//               maxWidth: "85vw",
//               maxHeight: "85vh",
//               objectFit: "contain",
//               borderRadius: 10,
//               border: `1px solid ${t.primary}40`,
//             }}
//           />

//           <button
//             onClick={() => setActive(null)}
//             style={{
//               position: "absolute",
//               top: 24,
//               right: 24,
//               width: 44,
//               height: 44,
//               borderRadius: "50%",
//               background: "transparent",
//               border: `1px solid ${t.primary}60`,
//               color: t.primary,
//               fontSize: 18,
//               cursor: "pointer",
//             }}
//           >
//             ✕
//           </button>
//         </div>
//       )}
//     </section>
//   );
// }
// // function GallerySection({ theme }: { theme: Theme }) {
// //   const D = weddingData;
// //   const [lightbox, setLightbox] = useState<string | null>(null);
// //   return (
// //     <div
// //       style={{
// //         padding: "56px 24px",
// //         textAlign: "center",
// //         position: "relative",
// //         zIndex: 3,
// //         background: theme.bg,
// //       }}
// //     >
// //       <p
// //         className="reveal"
// //         style={{
// //           fontSize: 11,
// //           letterSpacing: 4,
// //           textTransform: "uppercase",
// //           marginBottom: 10,
// //           color: theme.primary,
// //           fontFamily: "'Cormorant Garamond', serif",
// //         }}
// //       >
// //         Our Story
// //       </p>
// //       <h2
// //         className="reveal"
// //         style={{
// //           fontFamily: "'Playfair Display', serif",
// //           fontSize: 30,
// //           fontWeight: 400,
// //           marginBottom: 28,
// //           color: theme.text,
// //         }}
// //       >
// //         Cherished Moments
// //       </h2>
// //       <div
// //         className="reveal"
// //         style={{
// //           display: "grid",
// //           gridTemplateColumns: "repeat(3,1fr)",
// //           gap: 8,
// //           maxWidth: 620,
// //           margin: "0 auto",
// //         }}
// //       >
// //         {D.gallery.map((item, i) => (
// //           <div
// //             key={i}
// //             onClick={() => setLightbox(item.src)}
// //             style={{
// //               overflow: "hidden",
// //               borderRadius: 8,
// //               cursor: "pointer",
// //               aspectRatio: i === 0 || i === 5 ? "1/1.35" : "1/1",
// //               border: `1px solid ${theme.border}`,
// //             }}
// //           >
// //             <img
// //               src={item.src}
// //               alt={item.alt}
// //               loading="lazy"
// //               style={{
// //                 width: "100%",
// //                 height: "100%",
// //                 objectFit: "cover",
// //                 display: "block",
// //                 transition: "transform 0.5s",
// //               }}
// //               onMouseEnter={(e) =>
// //                 (e.currentTarget.style.transform = "scale(1.08)")
// //               }
// //               onMouseLeave={(e) =>
// //                 (e.currentTarget.style.transform = "scale(1)")
// //               }
// //             />
// //           </div>
// //         ))}
// //       </div>
// //       {lightbox && (
// //         <div
// //           onClick={() => setLightbox(null)}
// //           style={{
// //             position: "fixed",
// //             inset: 0,
// //             zIndex: 100,
// //             background: "rgba(0,0,0,0.88)",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //           }}
// //         >
// //           <img
// //             src={lightbox}
// //             alt=""
// //             style={{
// //               maxWidth: "80%",
// //               maxHeight: "70vh",
// //               objectFit: "contain",
// //               borderRadius: 8,
// //             }}
// //           />
// //           <button
// //             onClick={() => setLightbox(null)}
// //             style={{
// //               position: "fixed",
// //               top: 16,
// //               right: 16,
// //               background: "transparent",
// //               border: "1px solid rgba(255,255,255,0.3)",
// //               color: "white",
// //               width: 36,
// //               height: 36,
// //               borderRadius: "50%",
// //               fontSize: 16,
// //               cursor: "pointer",
// //             }}
// //           >
// //             ✕
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // ─── RSVP Section ─────────────────────────────────────────────────────────────
// function RSVPSection({ theme }: { theme: Theme }) {
//   const D = weddingData;
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [attending, setAttending] = useState("yes");
//   const [guests, setGuests] = useState("1");
//   const [note, setNote] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = () => {
//     if (!name.trim()) return;
//     setSubmitted(true);
//   };

//   const inputStyle = {
//     width: "100%",
//     padding: "11px 14px",
//     borderRadius: 6,
//     fontFamily: "'Cormorant Garamond', serif",
//     fontSize: 16,
//     outline: "none",
//     background: "rgba(255,255,255,0.7)",
//     border: `1px solid ${theme.border}`,
//     color: theme.text,
//     transition: "border-color 0.3s",
//   };

//   return (
//     <div
//       style={{
//         padding: "56px 24px",
//         textAlign: "center",
//         position: "relative",
//         zIndex: 3,
//         background: `${theme.accent}60`,
//       }}
//     >
//       <p
//         className="reveal"
//         style={{
//           fontSize: 11,
//           letterSpacing: 4,
//           textTransform: "uppercase",
//           marginBottom: 10,
//           color: theme.primary,
//           fontFamily: "'Cormorant Garamond', serif",
//         }}
//       >
//         Kindly Reply By {D.rsvp.deadline}
//       </p>
//       <h2
//         className="reveal"
//         style={{
//           fontFamily: "'Playfair Display', serif",
//           fontSize: 30,
//           fontWeight: 400,
//           marginBottom: 28,
//           color: theme.text,
//         }}
//       >
//         RSVP
//       </h2>
//       {!submitted ? (
//         <div style={{ maxWidth: 460, margin: "0 auto", textAlign: "left" }}>
//           {[
//             {
//               label: "Your Full Name",
//               input: (
//                 <input
//                   type="text"
//                   placeholder="Enter your name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   style={inputStyle}
//                 />
//               ),
//             },
//             {
//               label: "Email Address",
//               input: (
//                 <input
//                   type="email"
//                   placeholder="your@email.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   style={inputStyle}
//                 />
//               ),
//             },
//           ].map((f, i) => (
//             <div key={i} className="reveal" style={{ marginBottom: 14 }}>
//               <label
//                 style={{
//                   display: "block",
//                   marginBottom: 6,
//                   fontSize: 11,
//                   letterSpacing: 4,
//                   textTransform: "uppercase",
//                   color: theme.primary,
//                   fontFamily: "'Cormorant Garamond', serif",
//                 }}
//               >
//                 {f.label}
//               </label>
//               {f.input}
//             </div>
//           ))}
//           <div
//             className="reveal"
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               gap: 12,
//               marginBottom: 14,
//             }}
//           >
//             <div>
//               <label
//                 style={{
//                   display: "block",
//                   marginBottom: 6,
//                   fontSize: 11,
//                   letterSpacing: 4,
//                   textTransform: "uppercase",
//                   color: theme.primary,
//                   fontFamily: "'Cormorant Garamond', serif",
//                 }}
//               >
//                 Attending
//               </label>
//               <select
//                 value={attending}
//                 onChange={(e) => setAttending(e.target.value)}
//                 style={{ ...inputStyle, appearance: "none" as const }}
//               >
//                 <option value="yes">Joyfully Accepts</option>
//                 <option value="no">Regretfully Declines</option>
//               </select>
//             </div>
//             <div>
//               <label
//                 style={{
//                   display: "block",
//                   marginBottom: 6,
//                   fontSize: 11,
//                   letterSpacing: 4,
//                   textTransform: "uppercase",
//                   color: theme.primary,
//                   fontFamily: "'Cormorant Garamond', serif",
//                 }}
//               >
//                 Guests
//               </label>
//               <select
//                 value={guests}
//                 onChange={(e) => setGuests(e.target.value)}
//                 style={{ ...inputStyle, appearance: "none" as const }}
//               >
//                 {["1", "2", "3", "4", "5"].map((n) => (
//                   <option key={n}>{n}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="reveal" style={{ marginBottom: 14 }}>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: 6,
//                 fontSize: 11,
//                 letterSpacing: 4,
//                 textTransform: "uppercase",
//                 color: theme.primary,
//                 fontFamily: "'Cormorant Garamond', serif",
//               }}
//             >
//               A Note for the Couple
//             </label>
//             <textarea
//               placeholder="Share your wishes..."
//               rows={2}
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               style={{ ...inputStyle, resize: "vertical" }}
//             />
//           </div>
//           <button
//             className="reveal"
//             onClick={handleSubmit}
//             style={{
//               width: "100%",
//               padding: 13,
//               borderRadius: 2,
//               fontFamily: "'Cormorant Garamond', serif",
//               fontSize: 13,
//               letterSpacing: 4,
//               textTransform: "uppercase",
//               cursor: "pointer",
//               transition: "all 0.4s",
//               background: "transparent",
//               marginTop: 6,
//               border: `1px solid ${theme.primary}`,
//               color: theme.primary,
//             }}
//           >
//             Confirm Attendance
//           </button>
//         </div>
//       ) : (
//         <div style={{ padding: "44px 20px", textAlign: "center" }}>
//           <div style={{ fontSize: 40, marginBottom: 14 }}>✿</div>
//           <h3
//             style={{
//               fontFamily: "'Playfair Display', serif",
//               fontSize: 26,
//               marginBottom: 10,
//               color: theme.text,
//             }}
//           >
//             Thank you, {name}!
//           </h3>
//           <p
//             style={{
//               fontStyle: "italic",
//               fontFamily: "'Cormorant Garamond', serif",
//               color: theme.muted,
//             }}
//           >
//             We can&apos;t wait to celebrate with you.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Footer ───────────────────────────────────────────────────────────────────
// function Footer({ theme }: { theme: Theme }) {
//   const D = weddingData;
//   return (
//     <footer
//       style={{
//         padding: "56px 24px 44px",
//         textAlign: "center",
//         borderTop: `1px solid ${theme.border}`,
//         position: "relative",
//         zIndex: 3,
//         background: theme.bg,
//       }}
//     >
//       <h2
//         style={{
//           fontFamily: "'Playfair Display', serif",
//           fontSize: 28,
//           fontWeight: 400,
//           marginBottom: 8,
//           color: theme.text,
//         }}
//       >
//         {D.couple.bride} &amp; {D.couple.groom}
//       </h2>
//       <p
//         style={{
//           fontSize: 11,
//           letterSpacing: 4,
//           textTransform: "uppercase",
//           color: theme.primary,
//           fontFamily: "'Cormorant Garamond', serif",
//         }}
//       >
//         {D.event.date}
//       </p>
//       <p
//         style={{
//           fontSize: 13,
//           letterSpacing: 2,
//           marginTop: 22,
//           opacity: 0.45,
//           color: theme.muted,
//           fontFamily: "'Cormorant Garamond', serif",
//         }}
//       >
//         {D.couple.hashtag}
//       </p>
//     </footer>
//   );
// }

// // ─── Theme Panel ──────────────────────────────────────────────────────────────
// function ThemePanel({
//   current,
//   onSelect,
// }: {
//   current: string;
//   onSelect: (key: string) => void;
// }) {
//   const [open, setOpen] = useState(false);
//   const D = weddingData;
//   const theme = D.themes[current];

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "flex-end",
//         padding: "10px 16px 0",
//         position: "relative",
//         zIndex: 10,
//       }}
//     >
//       {open && (
//         <div
//           style={{
//             position: "absolute",
//             top: 44,
//             right: 16,
//             borderRadius: 10,
//             padding: 10,
//             display: "flex",
//             flexDirection: "column",
//             gap: 6,
//             minWidth: 148,
//             zIndex: 20,
//             backdropFilter: "blur(16px)",
//             background: "rgba(255,255,255,0.95)",
//             border: `1px solid ${theme.border}`,
//           }}
//         >
//           {Object.entries(D.themes).map(([key, th]) => (
//             <button
//               key={key}
//               onClick={() => {
//                 onSelect(key);
//                 setOpen(false);
//               }}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//                 padding: "8px 12px",
//                 borderRadius: 6,
//                 border:
//                   key === current
//                     ? `1px solid ${th.primary}`
//                     : "1px solid transparent",
//                 cursor: "pointer",
//                 background: "transparent",
//                 fontFamily: "'Cormorant Garamond', serif",
//                 fontSize: 13,
//                 letterSpacing: 1,
//                 textAlign: "left",
//                 color: th.text,
//               }}
//             >
//               <div
//                 style={{
//                   width: 12,
//                   height: 12,
//                   borderRadius: "50%",
//                   flexShrink: 0,
//                   background: th.primary,
//                 }}
//               />
//               {th.name}
//             </button>
//           ))}
//         </div>
//       )}
//       <button
//         onClick={() => setOpen((o) => !o)}
//         style={{
//           width: 38,
//           height: 38,
//           borderRadius: "50%",
//           border: "none",
//           cursor: "pointer",
//           fontSize: 16,
//           transition: "transform 0.25s",
//           background: theme.primary,
//         }}
//         onMouseEnter={(e) =>
//           (e.currentTarget.style.transform = "scale(1.12) rotate(15deg)")
//         }
//         onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
//         title="Change theme"
//       >
//         🎨
//       </button>
//     </div>
//   );
// }

// // ─── Invitation Content ───────────────────────────────────────────────────────
// function InvitationContent({
//   theme,
//   onThemeChange,
// }: {
//   theme: Theme;
//   themeKey: string;
//   onThemeChange: (key: string) => void;
// }) {
//   useReveal();
//   return (
//     <div style={{ background: theme.bg, color: theme.text }}>
//       <ThemePanel
//         current={
//           Object.keys(weddingData.themes).find(
//             (k) => weddingData.themes[k] === theme,
//           ) || "blossom"
//         }
//         onSelect={onThemeChange}
//       />
//       <HeroSection theme={theme} />
//       <FamiliesSection theme={theme} />
//       <DateSection theme={theme} />
//       <ScheduleSection theme={theme} />
//       <GallerySection theme={theme} />
//       <RSVPSection theme={theme} />
//       <Footer theme={theme} />
//     </div>
//   );
// }

// // ─── Root Component ───────────────────────────────────────────────────────────
// export default function WeddingInvitation() {
//   const [themeKey, setThemeKey] = useState("blossom");
//   const [opened, setOpened] = useState(false);
//   const theme = weddingData.themes[themeKey];

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.75s ease, transform 0.75s ease; }
//         .reveal.vis { opacity: 1; transform: translateY(0); }
//       `}</style>
//       <div
//         style={{
//           fontFamily: "'Cormorant Garamond', serif",
//           overflow: "hidden",
//           position: "relative",
//           borderRadius: 12,
//           minHeight: 500,
//           background: theme.bg,
//           color: theme.text,
//         }}
//       >
//         {!opened ? (
//           <Cover theme={theme} onOpen={() => setOpened(true)} />
//         ) : (
//           <InvitationContent
//             theme={theme}
//             themeKey={themeKey}
//             onThemeChange={setThemeKey}
//           />
//         )}
//       </div>
//     </>
//   );
// }
