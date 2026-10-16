"use client";

import React, { useState } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IdentityCheck from "@/components/IdentityCheck";
import SelectedWork from "@/components/SelectedWork";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import BackgroundRoom from "@/components/BackgroundRoom";
import SmoothScroll from "@/components/SmoothScroll";
import InteractiveLanyardBadge from "@/components/InteractiveLanyardBadge";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full bg-[#f4f1eb] text-[#1b1815] selection:bg-[#1c3a94] selection:text-white">
        {/* Full-Screen Script Reveal Loader */}
        <Loader
          onComplete={() => {
            setIsLoaded(true);
            try {
              ScrollTrigger.refresh();
            } catch {}
          }}
        />

        {/* Fixed Background Room: Window Light, Leaf Shadow, Concentric Arcs, Noise */}
        <BackgroundRoom />

        {/* Transparent Top Navigation with Paper Veil Transition (z-40) */}
        <Navbar />

        {/* Hero & About Pinned Stage Wrapper (z-20, below Navbar z-40 and below Work z-30) */}
        <div id="hero-about-stage" className="relative z-20 w-full">
          {/* Interactive Lanyard Badge for Hero and Identity Check */}
          <InteractiveLanyardBadge />

          {/* Section 00: Hero + Signature Lanyard ID Badge */}
          <Hero isLoaded={isLoaded} />

          {/* Section 01: Identity Check (About Scanner - Pinned for 2500px) */}
          <IdentityCheck />
        </div>

        {/* Main Subsequent Sections Flow (z-30, relative, scrolls cleanly over Hero & About stage) */}
        <main className="relative z-30 w-full flex flex-col bg-[#f4f1eb]">
          {/* Section 02: Selected Work (3D Orbit Carousel / Mobile Snap List) */}
          <SelectedWork />

          {/* Section 03: Process ("How I work" Paper Folder Cards) */}
          <Process />

          {/* Section 04: Contact (Contact Pass Badge + Swoosh Underline) */}
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
}
