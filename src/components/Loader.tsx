"use client";

import React, { useEffect, useState, useRef } from "react";
import { content } from "@/content";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [animStage, setAnimStage] = useState<"init" | "animating" | "exiting" | "done">("init");
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReduced);

    if (prefersReduced) {
      const timer = setTimeout(() => {
        setAnimStage("done");
        onComplete();
      }, 450);
      return () => clearTimeout(timer);
    }

    // Start reveal sequence
    const startTimer = setTimeout(() => {
      setAnimStage("animating");
    }, 50);

    // Slide up exit at ~2.1s
    const exitTimer = setTimeout(() => {
      setAnimStage("exiting");
    }, 2100);

    // Completely finish after slide up (0.95s later)
    const doneTimer = setTimeout(() => {
      setAnimStage("done");
      onComplete();
    }, 3050);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (animStage === "done") {
    return null;
  }

  if (reducedMotion) {
    return (
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f4f1eb] transition-opacity duration-400 ${
          animStage === "exiting" ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span className="font-script text-6xl text-[#1c3a94]">
          {content.loader.scriptName}
        </span>
      </div>
    );
  }

  const isWriting = animStage === "animating" || animStage === "exiting";
  const isExiting = animStage === "exiting";

  return (
    <aside
      ref={containerRef}
      aria-label="Loading animation"
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-[#f4f1eb] p-8 md:p-14 select-none paper-noise-pattern pointer-events-auto transition-transform duration-[950ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? "-translate-y-full pointer-events-none" : "translate-y-0"
      }`}
    >
      {/* Top micro brand stamp */}
      <div
        className={`flex items-center justify-between transition-opacity duration-450 ${
          isExiting ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] text-[#726a60] uppercase">
          {content.hero.eyebrow}
        </span>
        <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] text-[#726a60]">
          {content.hero.badge.serial}
        </span>
      </div>

      {/* Centre: Name Script reveal + Role fade-up */}
      <div
        className={`my-auto flex flex-col items-center justify-center text-center transition-opacity duration-450 ${
          isExiting ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Name in handwritten script (The Nautigal, cobalt #1c3a94) */}
        <div className="overflow-visible px-4">
          <h1
            className="font-script font-normal text-[#1c3a94] leading-[0.9] select-none tracking-normal"
            style={{
              fontSize: "clamp(5rem, 14vw, 11rem)",
              clipPath: isWriting ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              transition:
                "clip-path 1.15s cubic-bezier(0.65, 0, 0.35, 1) 0.15s",
            }}
          >
            {content.loader.scriptName}
          </h1>
        </div>

        {/* Role in italic serif fades up 10px -> 0 */}
        <p
          className="font-serif italic font-light text-[#5d564e] text-lg md:text-2xl mt-1 tracking-tight"
          style={{
            opacity: isWriting ? 1 : 0,
            transform: isWriting ? "translateY(0)" : "translateY(10px)",
            transition:
              "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s",
          }}
        >
          {content.loader.role}
        </p>
      </div>

      {/* Footer Text "Portfolio, 2026" */}
      <div
        className={`flex items-center justify-between border-t border-[rgba(27,24,21,0.08)] pt-4 transition-opacity duration-450 ${
          isExiting ? "opacity-0" : "opacity-100"
        }`}
        style={{
          opacity: isWriting ? 1 : 0,
          transition: "opacity 0.8s ease 0.5s",
        }}
      >
        <span className="font-mono text-[10px] md:text-[11px] tracking-[0.18em] text-[#726a60] uppercase">
          {content.loader.footerNote}
        </span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4a9f6e] animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.16em] text-[#726a60] uppercase">
            STUDIO VERIFIED
          </span>
        </div>
      </div>
    </aside>
  );
}
