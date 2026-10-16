"use client";

import React, { useState } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BackgroundRoom from "@/components/BackgroundRoom";
import SmoothScroll from "@/components/SmoothScroll";
import PlaceholderSections from "@/components/PlaceholderSections";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full bg-[#f4f1eb] text-[#1b1815] selection:bg-[#1c3a94] selection:text-white">
        {/* Full-Screen Script Reveal Loader */}
        <Loader onComplete={() => setIsLoaded(true)} />

        {/* Fixed Background Room: Window Light, Leaf Shadow, Concentric Arcs, Noise */}
        <BackgroundRoom />

        {/* Transparent Top Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="relative z-10 w-full flex flex-col">
          {/* Hero Section with ID Badge on Lanyard */}
          <Hero isLoaded={isLoaded} />

          {/* Phased Anchor Sections */}
          <PlaceholderSections />
        </main>
      </div>
    </SmoothScroll>
  );
}
