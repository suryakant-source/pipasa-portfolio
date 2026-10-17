"use client";

import React, { useEffect, useState, useRef } from "react";
import { content } from "@/content";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [animStage, setAnimStage] = useState<
    "check" | "init" | "animating" | "exiting" | "done"
  >("check");
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReducedMotion(prefersReduced);

    if (prefersReduced) {
      setAnimStage("init");
      const exitTimer = setTimeout(() => {
        setAnimStage("exiting");
      }, 600);
      const doneTimer = setTimeout(() => {
        setAnimStage("done");
        onCompleteRef.current?.();
      }, 1000);
      return () => {
        clearTimeout(exitTimer);
        clearTimeout(doneTimer);
      };
    }

    setAnimStage("init");

    // 1. Script "handwritten" reveal starts at ~100ms
    const startTimer = setTimeout(() => {
      setAnimStage("animating");
    }, 100);

    // 2. Sheet wipe slides up at 2.0s
    const exitTimer = setTimeout(() => {
      setAnimStage("exiting");
    }, 2000);

    // 3. Complete and unmount loader at 2.9s, notifying parent once
    const doneTimer = setTimeout(() => {
      setAnimStage("done");
      onCompleteRef.current?.();
    }, 2900);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (animStage === "done" || animStage === "check") {
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
    <>
      {/* Underlying Sheet Layer for Dual-Stage Sheet Wipe */}
      <div
        className={`fixed inset-0 z-[99] bg-[#eae3d5] pointer-events-none transition-transform duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isExiting ? "-translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Main Foreground Paper Sheet */}
      <aside
        ref={containerRef}
        aria-label="Loading animation"
        className={`fixed inset-0 z-[100] flex flex-col justify-between bg-[#f4f1eb] p-8 md:p-14 select-none paper-noise-pattern pointer-events-auto transition-transform duration-[950ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isExiting ? "-translate-y-full pointer-events-none" : "translate-y-0"
        }`}
      >
        {/* Top Header Stamp */}
        <div
          className={`flex items-center justify-between transition-opacity duration-450 ${
            isExiting ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1c3a94]" />
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] text-[#726a60] uppercase">
              {content.hero.eyebrow}
            </span>
          </div>
          <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] text-[#726a60]">
            {content.hero.badge.serial}
          </span>
        </div>

        {/* Centre Brand Mark + Name Script reveal + Role fade-up */}
        <div
          className={`my-auto flex flex-col items-center justify-center text-center transition-opacity duration-450 ${
            isExiting ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Brand Mark Monogram Badge */}
          <div
            className="mb-4 sm:mb-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[rgba(27,24,21,0.12)] bg-white/70 shadow-xs flex items-center justify-center relative overflow-hidden"
            style={{
              opacity: isWriting ? 1 : 0,
              transform: isWriting ? "scale(1)" : "scale(0.8)",
              transition:
                "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
          >
            {/* Subtle orbital ring */}
            <span className="absolute inset-1 rounded-full border border-[#1c3a94]/20 border-dashed animate-[spin_18s_linear_infinite]" />
            <span className="font-serif text-2xl font-normal text-[#1b1815] relative z-10">
              P<span className="text-[#1c3a94]">.</span>
            </span>
          </div>

          {/* Name in handwritten script (The Nautigal, cobalt #1c3a94) */}
          <div className="overflow-visible px-4">
            <h1
              className="font-script font-normal text-[#1c3a94] leading-[0.9] select-none tracking-normal"
              style={{
                fontSize: "clamp(5rem, 14vw, 11rem)",
                clipPath: isWriting ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                transition:
                  "clip-path 1.15s cubic-bezier(0.65, 0, 0.35, 1) 0.2s",
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
                "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.95s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.95s",
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
            transition: "opacity 0.8s ease 0.6s",
          }}
        >
          <span className="font-mono text-[10px] md:text-[11px] tracking-[0.18em] text-[#726a60] uppercase">
            {content.loader.footerNote}
          </span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a9f6e] animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#726a60] uppercase">
              STUDIO PASS VERIFIED
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
