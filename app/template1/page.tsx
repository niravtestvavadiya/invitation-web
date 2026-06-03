"use client";
import React from "react";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Hero from "@/components/sections/Hero";
import Invitation from "@/components/sections/Invitation";
import OurStory from "@/components/sections/OurStory";
import Festivities from "@/components/sections/Festivities";
import Gallery from "@/components/sections/Gallery";
import Rsvp from "@/components/sections/Rsvp";
import Footer from "@/components/sections/Footer";
import "./TemplateOne.css";
const TemplateOne = () => {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
      <main className="relative z-10">
        <Hero />
        <Invitation />
        <OurStory />
        <Festivities />
        <Gallery />
        <Rsvp />
        <Footer />
      </main>
    </ThemeProvider>
  );
};

export default TemplateOne;
