"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content, FactItem } from "@/content";

export default function IdentityCheck() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardScannerRef = useRef<HTMLDivElement>(null);
  const scanBeamRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const stampCheckRef = useRef<SVGPathElement>(null);
  const rulesRef = useRef<HTMLDivElement[]>([]);

  const [scanProgress, setScanProgress] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setScanProgress(100);
      setIsVerified(true);
      return;
    }

    const ctx = gsap.context(() => {
      // Main Scrubbed Timeline pinned for 120svh of scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            // Scan beam progress 0 -> 100% between 0.1 and 0.6 of timeline
            const beamP = Math.min(
              100,
              Math.max(0, Math.round(((p - 0.08) / 0.52) * 100))
            );
            setScanProgress(beamP);
            setIsVerified(beamP >= 98);
          },
        },
      });

      // 1. Scanner beam sweep top to bottom
      if (scanBeamRef.current) {
        tl.fromTo(
          scanBeamRef.current,
          { top: "0%", opacity: 0 },
          { top: "100%", opacity: 1, ease: "none", duration: 0.55 },
          0.05
        );
      }

      // 2. Right-hand panel fade & slide in earlier
      if (rightPanelRef.current) {
        tl.fromTo(
          rightPanelRef.current,
          { opacity: 0.2, y: 24 },
          { opacity: 1, y: 0, ease: "power2.out", duration: 0.4 },
          0.1
        );
      }

      // 3. Rules draw in from left (scaleX 0 -> 1)
      const validRules = rulesRef.current.filter(Boolean);
      if (validRules.length > 0) {
        tl.fromTo(
          validRules,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, stagger: 0.04, ease: "power2.out", duration: 0.35 },
          0.2
        );
      }

      // 4. Round cobalt stamp stamps in (scale 1.4 -> 1 with fade)
      if (stampRef.current) {
        tl.fromTo(
          stampRef.current,
          { scale: 1.4, opacity: 0, rotation: -24 },
          { scale: 1, opacity: 1, rotation: -12, ease: "back.out(1.7)", duration: 0.35 },
          0.55
        );
      }

      // 5. Stamp checkmark stroke draw
      if (stampCheckRef.current) {
        const length = stampCheckRef.current.getTotalLength?.() || 50;
        gsap.set(stampCheckRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        tl.to(
          stampCheckRef.current,
          { strokeDashoffset: 0, duration: 0.25, ease: "power2.out" },
          0.68
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  const getFactIcon = (iconName: FactItem["icon"]) => {
    switch (iconName) {
      case "user":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        );
      case "film":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18" />
            <line x1="7" x2="7" y1="2" y2="22" />
            <line x1="17" x2="17" y1="2" y2="22" />
            <line x1="2" x2="22" y1="12" y2="12" />
            <line x1="2" x2="7" y1="7" y2="7" />
            <line x1="2" x2="7" y1="17" y2="17" />
            <line x1="17" x2="22" y1="17" y2="17" />
            <line x1="17" x2="22" y1="7" y2="7" />
          </svg>
        );
      case "map-pin":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        );
      case "clock":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      case "sparkles":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          </svg>
        );
      case "radio":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="2" />
            <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
          </svg>
        );
    }
  };

  return (
    <section
      ref={containerRef}
      id="about"
      aria-label="Identity check section"
      className="relative min-h-[100svh] w-full flex items-center justify-center py-16 md:py-24 px-5 sm:px-8 md:px-14 lg:px-20 overflow-hidden z-20 border-t border-[rgba(27,24,21,0.08)] bg-[#f8f6f2]/60 backdrop-blur-xs"
    >
      <div className="w-full max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left-Centre Column: The Scanner Frame with ID Badge */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            ref={cardScannerRef}
            className="relative p-4 sm:p-5 rounded-[24px] bg-white/40 border border-white/90 shadow-[0_20px_45px_rgba(27,24,21,0.08)] backdrop-blur-md"
          >
            {/* Corner Brackets (22px bright corner accents) */}
            <span className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#1c3a94] rounded-tl-sm pointer-events-none" />
            <span className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#1c3a94] rounded-tr-sm pointer-events-none" />
            <span className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#1c3a94] rounded-bl-sm pointer-events-none" />
            <span className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#1c3a94] rounded-br-sm pointer-events-none" />

            {/* Corner Mono Labels */}
            <div className="flex items-center justify-between px-2 pt-1 pb-2">
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#1c3a94] font-medium">
                {content.about.scannerBadge.cornerTopLeft}
              </span>
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#726a60]">
                {content.about.scannerBadge.cornerTopRight}
              </span>
            </div>

            {/* The Badge inside scanner */}
            <div className="relative w-[240px] sm:w-[280px] md:w-[310px] rounded-[18px] p-4 sm:p-5 bg-white/80 border border-white/90 shadow-md overflow-hidden">
              {/* Left Edge Tiny Calibration Ticks */}
              <div className="absolute top-10 left-1.5 flex flex-col gap-2 opacity-50 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <span
                    key={i}
                    className={`h-[1px] bg-[#1c3a94] ${
                      i % 3 === 0 ? "w-2 bg-[#1c3a94]" : "w-1 bg-[#726a60]"
                    }`}
                  />
                ))}
              </div>

              {/* Glowing Horizontal Scanning Beam */}
              <div
                ref={scanBeamRef}
                className="absolute left-0 right-0 h-[2.5px] pointer-events-none z-30"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, #ffffff 30%, #3b82f6 50%, #ffffff 70%, transparent 100%)",
                  boxShadow:
                    "0 0 12px rgba(59, 130, 246, 0.9), 0 0 24px rgba(28, 58, 148, 0.7)",
                }}
              />

              {/* Badge Internal Face */}
              <div className="flex items-center justify-between pb-2 border-b border-[rgba(27,24,21,0.08)]">
                <span className="font-mono text-[9px] tracking-[0.18em] text-[#1b1815] uppercase font-medium">
                  {content.hero.badge.brandMark}
                </span>
                <span className="font-mono text-[8px] tracking-[0.14em] text-[#726a60]">
                  PASS #0001
                </span>
              </div>

              {/* Photo representation in scanner */}
              <div className="my-3 relative w-full h-[145px] sm:h-[175px] rounded-[10px] overflow-hidden bg-[#ebe5da] border border-white/80 shadow-inner flex items-center justify-center">
                {content.hero.badge.photo ? (
                  <img
                    src={content.hero.badge.photo}
                    alt={content.hero.badge.name}
                    className="w-full h-full object-cover object-[center_16%]"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-3">
                    <span className="font-mono text-[8.5px] tracking-[0.16em] uppercase text-[#5d564e]">
                      {content.hero.badge.name}
                    </span>
                  </div>
                )}
              </div>

              <div className="text-left mt-2">
                <h4 className="font-serif text-lg sm:text-xl font-light text-[#1b1815] leading-tight">
                  {content.hero.badge.name}
                </h4>
                <p className="font-mono text-[9px] tracking-[0.18em] text-[#1c3a94] uppercase font-medium mt-0.5">
                  {content.hero.badge.role}
                </p>
              </div>

              {/* Status and verification code */}
              <div className="mt-3 pt-2.5 border-t border-[rgba(27,24,21,0.08)] flex items-center justify-between">
                <span className="font-mono text-[8px] tracking-[0.14em] text-[#4a9f6e] uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4a9f6e] inline-block animate-pulse" />
                  {isVerified ? "SECURE ENCLAVE" : "SCANNING FEED"}
                </span>
                <span className="font-mono text-[8px] tracking-[0.14em] text-[#726a60]">
                  UID: 9842-88
                </span>
              </div>
            </div>

            {/* Bottom Corner Labels & Progress Counter */}
            <div className="flex items-center justify-between px-2 pt-2 pb-1">
              <span
                className={`font-mono text-[9px] tracking-[0.18em] uppercase font-medium transition-colors duration-300 ${
                  isVerified ? "text-[#4a9f6e]" : "text-[#726a60]"
                }`}
              >
                {isVerified
                  ? content.about.scannerBadge.verifiedText
                  : content.about.scannerBadge.cornerBottomLeft}
              </span>
              <span className="font-mono text-[9px] tracking-[0.18em] font-medium text-[#1c3a94]">
                {String(scanProgress).padStart(3, "0")}%
              </span>
            </div>
          </div>
        </div>

        {/* Right-Hand Panel: 2-Column Facts & Verified Copy */}
        <div
          ref={rightPanelRef}
          className="lg:col-span-7 flex flex-col items-start text-left relative"
        >
          {/* Section Number & Label */}
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-[10.5px] tracking-[0.2em] text-[#1c3a94] uppercase">
              {content.about.sectionNumber} / {content.about.label}
            </span>
          </div>

          {/* Heading: "<dot> Identity Verified." (last word italic cobalt) */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1b1815] tracking-tight mb-4 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#4a9f6e] transform translate-y-0.5" />
            <span>
              {content.about.headingFirstPart}{" "}
              <span className="italic text-[#1c3a94]">
                {content.about.headingAccentWord}
              </span>
            </span>
          </h2>

          <p className="font-serif font-light text-[#5d564e] text-base sm:text-lg leading-[1.5] max-w-[48ch] mb-8">
            {content.about.paragraph}
          </p>

          {/* 2-Column List of Facts with Animated 1px Staggered Rules */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8">
            {content.about.facts.map((fact, index) => (
              <div key={fact.label} className="flex flex-col relative pb-3">
                <div className="flex items-center gap-2 text-[#726a60] mb-1">
                  <span className="text-[#1c3a94]">{getFactIcon(fact.icon)}</span>
                  <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase">
                    {fact.label}
                  </span>
                </div>
                <span className="font-serif text-[15px] sm:text-base text-[#1b1815] font-normal leading-snug">
                  {fact.value}
                </span>

                {/* Animated 1px rule under each fact */}
                <div
                  ref={(el) => {
                    if (el) rulesRef.current[index] = el;
                  }}
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-[rgba(27,24,21,0.12)]"
                />
              </div>
            ))}
          </div>

          {/* CTA Link: "EXPLORE SELECTED WORK" with Down Arrow */}
          <div className="flex items-center justify-between w-full pt-2">
            <a
              href={content.about.cta.href}
              className="group inline-flex items-center gap-3 py-2 font-mono text-[11px] tracking-[0.18em] uppercase text-[#1b1815] transition-colors hover:text-[#1c3a94]"
            >
              <span className="relative">
                {content.about.cta.label}
                {/* Underline scales to 55% on hover */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1c3a94] origin-left scale-x-0 group-hover:scale-x-55 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[3px]"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </a>

            {/* Round Cobalt "Verified" Stamp (Rotated -12deg) */}
            <div
              ref={stampRef}
              className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center select-none"
              style={{
                transform: "rotate(-12deg)",
              }}
            >
              {/* Circular SVG text ring */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-[#1c3a94] animate-[spin_24s_linear_infinite]"
              >
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="font-mono text-[7px] uppercase tracking-[0.18em] fill-[#1c3a94] font-medium">
                  <textPath href="#circlePath">
                    {content.about.stampText}
                  </textPath>
                </text>
              </svg>

              {/* Center Checkmark & Circle */}
              <div className="absolute inset-2.5 rounded-full border border-[#1c3a94]/30 flex items-center justify-center">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1c3a94"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    ref={stampCheckRef}
                    d="M20 6 9 17l-5-5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
