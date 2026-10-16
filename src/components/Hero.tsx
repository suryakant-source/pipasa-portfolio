"use client";

import React, { useEffect, useState } from "react";
import { content } from "@/content";

interface HeroProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setRevealed(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <section
      id="hero"
      aria-label="Hero section"
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-10 px-6 md:px-12 overflow-hidden z-10"
    >
      {/* Two columns on desktop: Text Left, ID Badge Right */}
      <div className="w-full max-w-[1440px] mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* On mobile: Badge sits at top, partly cropped by top edge */}
        <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end -mt-10 sm:-mt-6 lg:mt-0">
          <div
            id="badge-slot-hero"
            className="w-[230px] sm:w-[280px] md:w-[330px] h-[340px] sm:h-[400px] md:h-[460px] pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Text Left Column: Flush with nav logo */}
        <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-start text-left">
          {/* Eyebrow with 32px hairline */}
          <div
            className="flex items-center gap-3 mb-4 sm:mb-6 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "0ms",
            }}
          >
            <span className="w-8 h-[1px] bg-[rgba(27,24,21,0.25)]" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#726a60]">
              {content.hero.eyebrow}
            </span>
          </div>

          {/* Headline 3 lines:
              Line 1: "Hello," (serif light, ink)
              Line 2: "I'm Pipasa," (script font, cobalt, bigger)
              Line 3: "a content creator & strategist." (serif light italic)
              Mobile: headline at ~28-36px
              Desktop: Heading ~ clamp(3rem, 7vw, 6.5rem)
          */}
          <h1 className="flex flex-col text-[#1b1815] leading-[0.98] select-none tracking-[-0.03em] mb-5 sm:mb-8">
            {/* Line 1 */}
            <span
              className="font-serif font-light text-[#1b1815] text-[28px] sm:text-[34px] md:text-[clamp(2.75rem,6.2vw,5.5rem)] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(24px)",
                transitionDelay: "120ms",
              }}
            >
              {content.hero.greeting}
            </span>

            {/* Line 2: The Nautigal Script, Cobalt, Bigger with clean breathing room */}
            <span
              className="font-script font-normal text-[#1c3a94] text-[48px] sm:text-[62px] md:text-[clamp(4.25rem,10vw,8.5rem)] leading-[1.08] my-1 sm:my-2 pb-1 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(24px)",
                transitionDelay: "240ms",
              }}
            >
              {content.hero.nameLead}
              {content.hero.name}
            </span>

            {/* Line 3: Serif light italic */}
            <span
              className="font-serif italic font-light text-[#5d564e] text-[24px] sm:text-[30px] md:text-[clamp(2.25rem,5vw,4.75rem)] leading-[1.04] mt-1 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(24px)",
                transitionDelay: "360ms",
              }}
            >
              {content.hero.rolePrefix}
              {content.hero.role}
            </span>
          </h1>

          {/* Tagline */}
          <div
            className="font-serif italic text-[17px] sm:text-xl text-[#1c3a94] font-normal -mt-2 mb-4 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "420ms",
            }}
          >
            &ldquo;{content.hero.tagline}&rdquo;
          </div>

          {/* Paragraph in serif ~18-20px, soft ink, max ~34ch */}
          <p
            className="font-serif font-light text-[#5d564e] text-base sm:text-lg md:text-[19.5px] leading-[1.48] max-w-[34ch] mb-6 sm:mb-9 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "480ms",
            }}
          >
            {content.hero.bio}
          </p>

          {/* Action Buttons: Filled Cobalt Pill + Plain Mono Link */}
          <div
            className="flex flex-wrap items-center gap-4 sm:gap-7 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "600ms",
            }}
          >
            {/* Primary Filled Cobalt Pill: MESSAGE ON WHATSAPP */}
            <a
              href={content.hero.primaryCta.href}
              target={content.hero.primaryCta.href.startsWith("http") ? "_blank" : undefined}
              rel={content.hero.primaryCta.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-3 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#1c3a94] hover:bg-[#142c74] text-white font-mono text-[10.5px] sm:text-[11.5px] tracking-[0.18em] uppercase transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_4px_14px_rgba(28,58,148,0.25)] hover:shadow-[0_6px_20px_rgba(28,58,148,0.35)] active:scale-[0.98]"
            >
              <span>{content.hero.primaryCta.label}</span>
              {/* White circle holding arrow, nudges on hover */}
              <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#1c3a94] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>

            {/* Secondary Mono Text Link: ABOUT PIPASA */}
            <a
              href={content.hero.secondaryCta.href}
              className="group relative py-2 font-mono text-[10.5px] sm:text-[11.5px] tracking-[0.18em] uppercase text-[#1b1815] transition-colors hover:text-[#1c3a94]"
            >
              <span>{content.hero.secondaryCta.label}</span>
              {/* Underline scales from left (.5s, cubic-bezier(.16,1,.3,1)) */}
              <span className="absolute bottom-1 left-0 w-full h-[1px] bg-[#1c3a94] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue: 1px vertical line with dark sliding segment */}
      <div
        className="mx-auto flex flex-col items-center gap-1.5 pt-4 transition-opacity duration-1000 ease-out"
        style={{
          opacity: revealed ? 1 : 0,
          transitionDelay: "800ms",
        }}
      >
        <span className="font-mono text-[8.5px] sm:text-[9px] tracking-[0.2em] uppercase text-[#726a60]">
          {content.hero.scrollCue}
        </span>
        <div className="relative w-[1px] h-8 sm:h-10 bg-[rgba(27,24,21,0.14)] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 sm:h-4 bg-[#1b1815] animate-scroll-bar" />
        </div>
      </div>
    </section>
  );
}
