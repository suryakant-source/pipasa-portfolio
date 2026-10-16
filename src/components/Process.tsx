"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const glintsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Scrubbed entrance for 4 cards settling from +-4deg rotation and translateY
      const validCards = cardsRef.current.filter(Boolean);
      const validGlints = glintsRef.current.filter(Boolean);

      const rotations = [-4, 3, -3, 4];

      validCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            y: 70,
            rotation: rotations[i % 4],
            opacity: 0.6,
          },
          {
            y: 0,
            rotation: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.6,
            },
          }
        );
      });

      // Glint sweep across cards on arrival
      validGlints.forEach((glint, i) => {
        gsap.fromTo(
          glint,
          { x: "-120%" },
          {
            x: "240%",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: validCards[i],
              start: "top 70%",
              toggleActions: "play none none none",
            },
            duration: 1.2,
            delay: i * 0.15,
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const getTabPositionClass = (align: string) => {
    switch (align) {
      case "left":
        return "left-6";
      case "left-center":
        return "left-20 sm:left-24";
      case "right-center":
        return "right-20 sm:right-24";
      case "right":
        return "right-6";
      default:
        return "left-6";
    }
  };

  return (
    <section
      ref={containerRef}
      id="process"
      aria-label="Process section"
      className="relative min-h-[100svh] w-full flex flex-col justify-center py-20 md:py-28 px-5 sm:px-8 md:px-14 lg:px-20 overflow-hidden z-20 border-t border-[rgba(27,24,21,0.08)] bg-[#f8f6f2]"
    >
      <div className="w-full max-w-[1320px] mx-auto flex flex-col">
        {/* Section Header */}
        <div className="text-left mb-14 md:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-[10.5px] tracking-[0.2em] text-[#1c3a94] uppercase">
              {content.process.sectionNumber} / {content.process.label}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#1b1815] tracking-tight">
            {content.process.titleFirstWord}{" "}
            <span className="italic text-[#1c3a94]">
              {content.process.titleAccentWord}
            </span>
          </h2>
        </div>

        {/* 4 Paper Cards in a Row on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-7 items-stretch">
          {content.process.steps.map((step, index) => (
            <div
              key={step.tab}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative flex flex-col pt-7 pb-8 px-6 sm:px-7 rounded-[18px] border border-white/90 shadow-[0_12px_30px_rgba(27,24,21,0.06)] hover:shadow-[0_20px_45px_rgba(27,24,21,0.12)] hover:-translate-y-1.5 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden select-none"
              style={{ backgroundColor: step.bgColor }}
            >
              {/* Folder Top Tab */}
              <div
                className={`absolute top-0 ${getTabPositionClass(
                  step.tabAlign
                )} -translate-y-full px-4 py-1.5 rounded-t-[10px] border-t border-x border-white/90 font-mono text-[9.5px] tracking-[0.16em] uppercase text-[#1c3a94] font-medium shadow-xs`}
                style={{ backgroundColor: step.bgColor }}
              >
                {step.tab}
              </div>

              {/* Diagonal Light Glint (55% wide white band) */}
              <div
                ref={(el) => {
                  if (el) glintsRef.current[index] = el;
                }}
                className="pointer-events-none absolute inset-0 w-[55%] opacity-20 transform -skew-x-[25deg]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)",
                }}
              />

              {/* Tactile Paper Texture */}
              <div className="absolute inset-0 paper-noise-pattern opacity-40 pointer-events-none" />

              {/* Big Condensed Bold Verb (Bricolage Grotesque ~56-62px) */}
              <h3 className="font-grotesk font-extrabold text-4xl sm:text-5xl text-[#1b1815] tracking-tight uppercase leading-none mb-1">
                {step.verb}
              </h3>

              {/* Italic Serif Phrase Under Verb */}
              <span className="font-serif italic text-sm sm:text-base text-[#1c3a94] font-normal mb-5 block">
                {step.italicPhrase}
              </span>

              {/* Short Serif Paragraph (max 30ch) */}
              <p className="font-serif font-light text-[#5d564e] text-[15px] sm:text-base leading-[1.5] max-w-[30ch] mb-8">
                {step.description}
              </p>

              {/* "What comes of it:" tag row */}
              <div className="mt-auto pt-4 border-t border-[rgba(27,24,21,0.08)] flex flex-col gap-1.5">
                <span className="font-mono text-[8px] sm:text-[8.5px] tracking-[0.16em] uppercase text-[#726a60]">
                  What comes of it:
                </span>
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[9px] sm:text-[9.5px] tracking-[0.14em] text-[#1c3a94] uppercase font-medium">
                  {step.tags.map((tag, tIdx) => (
                    <span key={tag} className="inline-flex items-center gap-1.5">
                      <span>{tag}</span>
                      {tIdx < step.tags.length - 1 && <span className="text-[rgba(27,24,21,0.2)]">/</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
