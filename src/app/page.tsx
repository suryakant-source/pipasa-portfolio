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

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full bg-[#f4f1eb] text-[#1b1815] selection:bg-[#1c3a94] selection:text-white">
        {/* Full-Screen Script Reveal Loader */}
        <Loader onComplete={() => setIsLoaded(true)} />

        {/* Fixed Background Room: Window Light, Leaf Shadow, Concentric Arcs, Noise */}
        <BackgroundRoom />

        {/* Transparent Top Navigation with Paper Veil Transition */}
        <Navbar />

        {/* Main Sections Flow */}
        <main className="relative z-10 w-full flex flex-col">
          {/* Section 00: Hero + Signature Lanyard ID Badge */}
          <Hero isLoaded={isLoaded} />

          {/* Section 01: Identity Check (About Scanner) */}
          <IdentityCheck />

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
