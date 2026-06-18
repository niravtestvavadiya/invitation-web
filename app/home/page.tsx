"use client";

import { Routes } from "@/config/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const WEDDING_CARDS = [
  {
    id: 1,
    title: "Royal Wedding",
    subtitle: "Classic & Elegant",
    image: "/images/template2.png",
    route: Routes.template2,
    titlecolor: "#ffffff",
  },
  {
    id: 2,
    title: "Modern Minimal",
    subtitle: "Simple & Chic",
    image: "/images/template3.png",
    route: Routes.template3,
    titlecolor: "#000000",
  },
  {
    id: 3,
    title: "Floral Romance",
    subtitle: "Soft & Dreamy",
    image: "/images/template1.png",
    route: Routes.template1,
    titlecolor: "#000000",
  },
  //   {
  //     id: 4,
  //     title: "Traditional Indian",
  //     subtitle: "Rich & Cultural",
  //     image:
  //       "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
  //     route: Routes.template1,
  //     titlecolor: "#000000",
  //   },
];

function WeddingCard({
  card,
  tintClass,
}: {
  card: (typeof WEDDING_CARDS)[0];
  tintClass: string;
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const tints: Record<string, string> = {
    rose: "linear-gradient(160deg, rgba(240,210,200,0.35) 0%, rgba(20,10,8,0.72) 100%)",
    blue: "linear-gradient(160deg, rgba(210,220,235,0.35) 0%, rgba(20,15,30,0.72) 100%)",
    green:
      "linear-gradient(160deg, rgba(220,235,215,0.35) 0%, rgba(15,25,18,0.72) 100%)",
    amber:
      "linear-gradient(160deg, rgba(240,225,200,0.35) 0%, rgba(28,18,8,0.72) 100%)",
  };

  const badges: Record<string, { bg: string; color: string; border: string }> =
    {
      rose: {
        bg: "rgba(242,218,210,0.55)",
        color: "#7a3c30",
        border: "rgba(242,218,210,0.7)",
      },
      blue: {
        bg: "rgba(210,220,245,0.55)",
        color: "#2e3a6a",
        border: "rgba(210,220,245,0.7)",
      },
      green: {
        bg: "rgba(215,238,215,0.55)",
        color: "#2a5a30",
        border: "rgba(215,238,215,0.7)",
      },
      amber: {
        bg: "rgba(248,232,200,0.55)",
        color: "#6a4010",
        border: "rgba(248,232,200,0.7)",
      },
    };

  const b = badges[tintClass];

  return (
    <div
      onClick={() => router.push(card.route)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: 420,
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 48px rgba(180,120,100,0.18)" : "none",
        transition: "transform 0.4s cubic-bezier(.2,0,.2,1), box-shadow 0.4s",
      }}
    >
      <img
        src={card.image}
        alt={card.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          filter: hovered
            ? "saturate(1) brightness(1.02)"
            : "saturate(0.88) brightness(1.04)",
          transition: "transform 0.6s cubic-bezier(.2,0,.2,1), filter 0.6s",
        }}
      />

      {/* Pastel tint overlay */}
      {/* <div
        style={{
          position: "absolute",
          inset: 0,
          background: tints[tintClass],
          opacity: hovered ? 0.7 : 1,
          transition: "opacity 0.4s",
        }}
      /> */}

      {/* Badge */}
      {/* <span
        style={{
          position: "absolute",
          top: 18,
          left: 18,
          fontFamily: "Inter, sans-serif",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "4px 12px",
          borderRadius: 20,
          background: b.bg,
          color: b.color,
          border: `1px solid ${b.border}`,
        }}
      >
        {card.title.split(" ")[0]}
      </span> */}

      {/* Text */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "24px 22px 22px",
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          transition: "transform 0.4s",
        }}
      >
        {/* <div
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 20,
            fontWeight: 400,
            color: "#fff",
            marginBottom: 5,
          }}
        >
          {card.title}
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
            marginBottom: 14,
          }}
        >
          {card.subtitle}
        </div> */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: card?.titlecolor,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.3s 0.05s, transform 0.3s 0.05s",
          }}
        >
          <span
            style={{
              width: hovered ? 32 : 20,
              height: 1,
              background: card?.titlecolor,
              display: "inline-block",
              transition: "width 0.3s",
            }}
          />
          View Style
        </span>
      </div>
    </div>
  );
}

const TINTS = ["rose", "blue", "green", "amber"];

export default function WeddingCardList() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "56px 32px",
        fontFamily: "Georgia, serif",
        background: "linear-gradient(120deg, #fdf6f0, #fdeee6, #fff8f2)",
        backgroundSize: "300% 300%",
        animation: "weddingGradient 12s ease infinite",
      }}
    >
      <style>
        {`
      @keyframes weddingGradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    `}
      </style>
      <p
        style={{
          textAlign: "center",
          fontFamily: "Inter, sans-serif",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#c9a99a",
          marginBottom: 12,
        }}
      >
        Wedding Invitations
      </p>
      <h2
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: 400,
          fontStyle: "italic",
          color: "#3d2b25",
          marginBottom: 6,
        }}
      >
        Choose Your Perfect Style
      </h2>
      <p
        style={{
          textAlign: "center",
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          color: "#b89d95",
          marginBottom: 44,
          letterSpacing: "0.04em",
        }}
      >
        Handcrafted designs for your most cherished day
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        {/* <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
          maxWidth: 720,
          margin: "0 auto",
        }}
      > */}
        {WEDDING_CARDS.map((card, i) => (
          <WeddingCard key={card.id} card={card} tintClass={TINTS[i]} />
        ))}
      </div>

      <p
        style={{
          textAlign: "center",
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          color: "#c9b0a8",
          marginTop: 36,
          letterSpacing: "0.04em",
        }}
      >
        Every design is fully personalised with your names, date & venue
      </p>
    </div>
  );
}

// function WeddingCard({ card }: any) {
//   const router = useRouter();

//   return (
//     <div
//       onClick={() => router.push(card.route)}
//       style={{
//         width: "100%",
//         height: 500,
//         borderRadius: 18,
//         overflow: "hidden",
//         cursor: "pointer",
//         position: "relative",
//         transition: "transform 0.3s ease, box-shadow 0.3s ease",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = "translateY(-6px)";
//         e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = "translateY(0)";
//         e.currentTarget.style.boxShadow = "none";
//       }}
//     >
//       {/* Image */}
//       <img
//         src={card.image}
//         alt={card.title}
//         style={{
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           display: "block",
//         }}
//       />

//       {/* Gradient Overlay */}
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           background:
//             "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))",
//         }}
//       />

//       {/* Title Content */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: 24,
//           left: 20,
//           right: 20,
//           color: "#fff",
//         }}
//       >
//         <h3
//           style={{
//             margin: 0,
//             fontSize: 20,
//             fontWeight: 600,
//             letterSpacing: "0.4px",
//           }}
//         >
//           {card.title}
//         </h3>
//         <p
//           style={{
//             margin: "6px 0 0",
//             fontSize: 13,
//             opacity: 0.85,
//           }}
//         >
//           {card.subtitle}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default function WeddingCardList() {
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#faf7f3",
//         padding: "48px 40px",
//       }}
//     >
//       {/* Page Title */}
//       <h2
//         style={{
//           textAlign: "center",
//           fontSize: 28,
//           fontWeight: 600,
//           marginBottom: 40,
//           letterSpacing: "0.5px",
//         }}
//       >
//         Choose Your Preferred Wedding Card
//       </h2>

//       {/* Card Grid */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//           gap: 32,
//           justifyItems: "center",
//         }}
//       >
//         {WEDDING_CARDS.map((card) => (
//           <WeddingCard key={card.id} card={card} />
//         ))}
//       </div>
//     </div>
//   );
// }
