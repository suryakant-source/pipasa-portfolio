"use client";

import React, { useEffect, useState, useRef } from "react";
import { content } from "@/content";

interface IdBadgeProps {
  isLoaded?: boolean;
}

export default function IdBadge({ isLoaded = true }: IdBadgeProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hasEntered, setHasEntered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Trigger drop-in on load
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setHasEntered(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  // Desktop 3D cursor tilt (smoothed)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || window.innerWidth < 1024) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - cardCenterX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - cardCenterY) / (window.innerHeight / 2);

      // Clamp to +-6 degrees
      const clampedX = Math.max(-6, Math.min(6, deltaY * -6));
      const clampedY = Math.max(-6, Math.min(6, deltaX * 6));

      setTilt({ x: clampedX, y: clampedY });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="relative flex flex-col items-center select-none"
      style={{
        perspective: "1200px",
      }}
    >
      {/* Whole Lanyard & Badge wrapper with idle sway animation */}
      <div
        className={`flex flex-col items-center transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          hasEntered
            ? "translate-y-0 opacity-100 animate-lanyard"
            : "-translate-y-36 opacity-0 rotate-[-8deg]"
        }`}
        style={{
          transformOrigin: "top center",
        }}
      >
        {/* 1. Braided Lanyard Strap (hanging from above viewport) */}
        <div className="relative w-[15px] sm:w-[18px] md:w-[22px] h-[45px] sm:h-[70px] md:h-[110px] bg-[#1b1815] shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex flex-col items-center overflow-hidden">
          {/* Subtle woven texture pattern on lanyard */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 4px)",
            }}
          />
          {/* Edge stitching highlights */}
          <div className="absolute inset-y-0 left-[2px] w-[1px] bg-white/20" />
          <div className="absolute inset-y-0 right-[2px] w-[1px] bg-white/20" />
        </div>

        {/* 2. Metal Crimp & Buckle */}
        <div className="relative z-10 w-[22px] sm:w-[26px] md:w-[30px] h-[13px] sm:h-[16px] bg-gradient-to-b from-[#e6e6e6] via-[#cccccc] to-[#999999] rounded-[3px] shadow-[0_2px_4px_rgba(0,0,0,0.2)] border border-[#ffffff]/70 flex items-center justify-center">
          <div className="w-[10px] h-[2px] bg-[#666666] rounded-full" />
        </div>

        {/* 3. Rocking Metal Swivel Ring */}
        <div className="animate-clip-rock flex flex-col items-center -mt-[3px] z-10">
          {/* Metal Ring */}
          <div className="w-[15px] sm:w-[18px] md:w-[22px] h-[15px] sm:h-[18px] md:h-[22px] rounded-full border-[2.5px] md:border-[3px] border-[#d1d5db] bg-transparent shadow-sm relative">
            <div className="absolute inset-0 rounded-full border border-white/60" />
          </div>

          {/* Metal Spring Clasp / Lobster clip */}
          <div className="w-[12px] sm:w-[14px] md:w-[16px] h-[18px] sm:h-[24px] md:h-[28px] bg-gradient-to-b from-[#d4d4d8] to-[#71717a] rounded-b-[4px] -mt-[5px] border border-white/60 shadow-[0_2px_5px_rgba(0,0,0,0.15)] flex items-end justify-center pb-0.5">
            <div className="w-[5px] h-[8px] border-b-2 border-r-2 border-[#3f3f46] rounded-br-[2px]" />
          </div>
        </div>

        {/* 4. Frosted Acrylic Card (portrait ~340px wide desktop / 220px mobile, rounded 18px) */}
        <div
          ref={cardRef}
          className="relative -mt-[8px] md:-mt-[10px] w-[220px] sm:w-[280px] md:w-[340px] rounded-[18px] p-3.5 sm:p-5 md:p-6 transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) rotate(1.2deg)`,
            transformStyle: "preserve-3d",
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(248, 246, 242, 0.75) 100%)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255, 255, 255, 0.85)",
            boxShadow:
              "0 25px 50px -12px rgba(27, 24, 21, 0.16), 0 8px 24px -4px rgba(27, 24, 21, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(27, 24, 21, 0.04)",
          }}
        >
          {/* Subtle noise grain inside acrylic card */}
          <div className="absolute inset-0 rounded-[18px] paper-noise-pattern opacity-40 pointer-events-none" />

          {/* Punch Slot for clip ring */}
          <div className="mx-auto -mt-1.5 md:-mt-2 mb-3 md:mb-4 w-7 md:w-9 h-2 md:h-2.5 rounded-full bg-[#3d3832]/80 border border-white/40 shadow-inner" />

          {/* Card Header: Brand wordmark left, NFC icon right */}
          <div className="flex items-center justify-between pb-2.5 md:pb-3.5 border-b border-[rgba(27,24,21,0.08)]">
            <span className="font-mono text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] font-medium text-[#1b1815] uppercase">
              {content.hero.badge.brandMark}
            </span>
            {/* NFC Wave Icon */}
            <div
              className="flex items-center gap-1 text-[#726a60]"
              title={content.hero.badge.nfcLabel}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <span className="font-mono text-[7px] md:text-[8px] tracking-[0.12em] text-[#726a60]">
                NFC
              </span>
            </div>
          </div>

          {/* Portrait Photo Area (Placeholder) */}
          <div className="my-2.5 md:my-4 relative w-full h-[135px] sm:h-[185px] md:h-[240px] rounded-[10px] md:rounded-[12px] overflow-hidden bg-gradient-to-b from-[#ebe5da] via-[#dfd8ca] to-[#d3ccbd] border border-white/70 shadow-inner flex flex-col items-center justify-center text-center p-3">
            <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-white/75 border border-white shadow-sm flex items-center justify-center text-[#1c3a94] mb-1.5 md:mb-2">
              <svg
                width="24"
                height="24"
                className="md:w-9 md:h-9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span className="font-mono text-[8px] md:text-[10px] tracking-[0.16em] uppercase text-[#5d564e] font-medium">
              [Photo Placeholder]
            </span>
            <span className="font-serif italic text-[10px] md:text-xs text-[#726a60]">
              Pipasa • Portrait
            </span>

            {/* Subtle frosted tag overlay in corner */}
            <div className="absolute bottom-2 left-2 px-1.5 py-0.5 md:px-2 md:py-1 rounded bg-black/40 backdrop-blur-md text-white font-mono text-[7px] md:text-[8px] tracking-[0.16em]">
              OFFICIAL CREATOR
            </div>
          </div>

          {/* Identity Info: Name & Role */}
          <div className="text-left mt-1.5 md:mt-2">
            <h3 className="font-serif text-base sm:text-lg md:text-2xl font-light text-[#1b1815] tracking-tight leading-tight">
              {content.hero.badge.name}
            </h3>
            <p className="font-mono text-[8.5px] sm:text-[9.5px] md:text-[10px] tracking-[0.18em] text-[#1c3a94] uppercase font-medium mt-0.5">
              {content.hero.badge.role}
            </p>
          </div>

          {/* Bottom Bar: Status Pill + Mini QR Code + Pass Serial */}
          <div className="mt-2.5 md:mt-4 pt-2.5 md:pt-3.5 border-t border-[rgba(27,24,21,0.08)] flex items-center justify-between">
            {/* Status Pill with Pulsing Green Dot */}
            <div className="flex flex-col gap-0.5">
              <div className="inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full bg-[#f4f1eb] border border-[rgba(27,24,21,0.08)] shadow-xs">
                <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                  <span className="animate-status-ring absolute inline-flex h-full w-full rounded-full bg-[#4a9f6e] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-[#4a9f6e]" />
                </span>
                <span className="font-mono text-[7.5px] md:text-[9px] tracking-[0.14em] text-[#1b1815] font-medium uppercase whitespace-nowrap">
                  {content.hero.badge.status}
                </span>
              </div>
              <span className="font-mono text-[7px] md:text-[8px] tracking-[0.14em] text-[#726a60] uppercase pl-0.5 hidden sm:inline">
                {content.hero.badge.passType}
              </span>
            </div>

            {/* Small QR Vector Code */}
            <div className="flex items-center gap-1.5 md:gap-2.5">
              <div className="w-7 h-7 md:w-10 md:h-10 rounded-[5px] md:rounded-[6px] bg-white p-0.5 md:p-1 border border-[rgba(27,24,21,0.12)] shadow-xs flex items-center justify-center">
                <svg
                  viewBox="0 0 32 32"
                  className="w-full h-full text-[#1b1815]"
                  fill="currentColor"
                >
                  <rect x="2" y="2" width="10" height="10" rx="1.5" />
                  <rect x="4" y="4" width="6" height="6" fill="#fff" />
                  <rect x="5.5" y="5.5" width="3" height="3" />
                  <rect x="20" y="2" width="10" height="10" rx="1.5" />
                  <rect x="22" y="4" width="6" height="6" fill="#fff" />
                  <rect x="23.5" y="5.5" width="3" height="3" />
                  <rect x="2" y="20" width="10" height="10" rx="1.5" />
                  <rect x="4" y="22" width="6" height="6" fill="#fff" />
                  <rect x="5.5" y="23.5" width="3" height="3" />
                  <rect x="14" y="4" width="3" height="3" />
                  <rect x="15" y="10" width="2" height="3" />
                  <rect x="4" y="14" width="3" height="2" />
                  <rect x="10" y="15" width="3" height="3" />
                  <rect x="14" y="14" width="4" height="4" />
                  <rect x="20" y="15" width="3" height="2" />
                  <rect x="25" y="14" width="3" height="3" />
                  <rect x="14" y="21" width="3" height="3" />
                  <rect x="20" y="20" width="3" height="4" />
                  <rect x="25" y="25" width="4" height="4" />
                </svg>
              </div>
              <div className="font-mono text-[7.5px] md:text-[9px] tracking-[0.16em] text-[#726a60] uppercase">
                {content.hero.badge.serial}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
