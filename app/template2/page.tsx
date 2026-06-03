"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import HeroSection from "./components/HeroSection";
import CountdownSection from "./components/CountdownSection";
import CoupleSection from "./components/CoupleSection";
import StorySection from "./components/StorySection";
import EventDetailsSection from "./components/EventDetailsSection";
import GallerySection from "./components/GallerySection";
import RSVPSection from "./components/RSVPSection";
import FooterSection from "./components/FooterSection";
import ThemeSwitcher from "./components/ThemeSwitcher";
import "./Template2.css";
const Page = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <ThemeProvider>
      <main>
        <HeroSection />
        <CountdownSection />
        <CoupleSection />
        <StorySection />
        <EventDetailsSection />
        <div id="gallery">
          <GallerySection />
        </div>
        <RSVPSection />
        <FooterSection />
        {/* <ThemeSwitcher /> */}
      </main>
    </ThemeProvider>
  );
};

export default Page;
