import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Playfair_Display,
  Fraunces,
  EB_Garamond,
  Jost,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-ebgaramond",
});
const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });

export const metadata: Metadata = {
  title: "Elowen & Julian · A Garden Wedding",
  description:
    "You are warmly invited to the wedding of Elowen & Julian — September 14, 2026, Oxfordshire, England.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${fraunces.variable} ${ebGaramond.variable} ${jost.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
