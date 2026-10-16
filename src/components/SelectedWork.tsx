"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content, WorkItem } from "@/content";

export default function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedModalItem, setSelectedModalItem] = useState<WorkItem | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || window.innerWidth < 1024) {
      return () => window.removeEventListener("resize", checkMobile);
    }

    const cardsCount = content.work.items.length;
    const angleStep = 360 / cardsCount;

    const ctx = gsap.context(() => {
      // Pinned scrubbed rotation through cards
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=220%",
        pin: true,
        scrub: 0.8,
        snap: {
          snapTo: 1 / (cardsCount - 1),
          duration: { min: 0.2, max: 0.5 },
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const currentIdx = Math.min(
            cardsCount - 1,
            Math.max(0, Math.round(progress * (cardsCount - 1)))
          );
          setActiveIndex(currentIdx);

          if (ringRef.current) {
            // Rotate ring in 3D
            const rotationY = -progress * (cardsCount - 1) * angleStep;
            gsap.set(ringRef.current, {
              rotationY: rotationY,
            });
          }
        },
      });
    }, container);

    return () => {
      window.removeEventListener("resize", checkMobile);
      ctx.revert();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPos({ x, y });
  };

  const cardsCount = content.work.items.length;
  const radius = 560; // 3D ring orbit radius

  const handleSelectIndex = (index: number) => {
    setActiveIndex(index);
    if (ringRef.current && window.innerWidth >= 1024) {
      const angleStep = 360 / cardsCount;
      const targetRotationY = -index * angleStep;
      gsap.to(ringRef.current, {
        rotationY: targetRotationY,
        duration: 0.65,
        ease: "power2.out",
      });
    }
  };

  return (
    <section
      ref={containerRef}
      id="work"
      aria-label="Selected work section"
      className="relative min-h-[100svh] w-full flex flex-col justify-between py-16 md:py-20 px-4 sm:px-8 md:px-14 overflow-hidden z-20 border-t border-[rgba(27,24,21,0.08)] bg-[#f4f1eb]"
    >
      {/* Dynamic Background Room lighting & Concentric Arc line-art per active card */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-out z-0 overflow-hidden select-none"
        style={{
          background: `radial-gradient(ellipse at ${
            35 + activeIndex * 15
          }% 40%, rgba(255, 255, 255, 0.7) 0%, rgba(244, 241, 235, 0) 70%)`,
        }}
      >
        <svg className="absolute -top-40 right-0 w-[1000px] h-[1000px] opacity-35 text-[#1b1815]" viewBox="0 0 1000 1000" fill="none">
          <circle cx="800" cy="200" r="300" stroke="currentColor" strokeWidth="1" strokeOpacity="0.08" />
          <circle cx="800" cy="200" r="500" stroke="currentColor" strokeWidth="1" strokeOpacity="0.06" strokeDasharray="5 7" />
          <circle cx="800" cy="200" r="750" stroke="currentColor" strokeWidth="1" strokeOpacity="0.04" />
        </svg>
        <div className="absolute inset-0 paper-noise-pattern opacity-50" />
      </div>

      {/* Header Centred */}
      <div className="relative z-10 w-full max-w-[800px] mx-auto text-center pt-2 pb-6">
        <span className="font-mono text-[10.5px] tracking-[0.2em] text-[#1c3a94] uppercase">
          {content.work.sectionNumber} / {content.work.label}
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#1b1815] tracking-tight mt-1.5">
          {content.work.titleFirstWord}{" "}
          <span className="italic text-[#1c3a94]">
            {content.work.titleAccentWord}
          </span>
        </h2>
      </div>

      {/* DESKTOP: 3D Orbit Carousel Ring */}
      <div className="hidden lg:flex relative z-10 w-full h-[540px] items-center justify-center my-auto">
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            perspective: "1400px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {/* 3D Ring Container */}
          <div
            ref={ringRef}
            className="relative w-[680px] h-[460px] will-change-transform"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {content.work.items.map((item, index) => {
              const cardAngle = (index * 360) / cardsCount;
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isActive) {
                      setSelectedModalItem(item);
                    } else {
                      handleSelectIndex(index);
                    }
                  }}
                  onMouseMove={isActive ? handleMouseMove : undefined}
                  className={`absolute top-0 left-0 w-full h-full rounded-[22px] p-8 md:p-10 cursor-pointer overflow-hidden transition-all duration-500 ease-out select-none border border-white/80 shadow-[0_20px_45px_rgba(27,24,21,0.1)] ${
                    isActive ? "opacity-100 filter-none" : "opacity-65 blur-[1.5px]"
                  }`}
                  style={{
                    backgroundColor: item.bgColor,
                    transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Cursor Spotlight on Active Card */}
                  {isActive && (
                    <div
                      className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(560px circle at ${cursorPos.x}% ${cursorPos.y}%, rgba(255,255,255,0.85) 0%, transparent 60%)`,
                      }}
                    />
                  )}

                  {/* Glossy Sheen Band across card */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-15"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.9) 45%, transparent 70%)",
                      transform: `translateX(${(activeIndex - index) * 60}%)`,
                      transition: "transform 0.6s ease-out",
                    }}
                  />

                  {/* Top Bar: Title & Metadata */}
                  <div className="relative z-10 flex items-start justify-between border-b border-[rgba(27,24,21,0.08)] pb-4">
                    <div>
                      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#726a60]">
                        {item.platform}
                      </span>
                      <h3 className="font-grotesk font-semibold text-2xl md:text-3xl text-[#1b1815] tracking-tight mt-0.5">
                        {item.title}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/70 border border-white font-mono text-[11px] tracking-[0.14em] text-[#1c3a94] font-medium shadow-xs">
                        {item.metric}
                      </span>
                      <div className="font-mono text-[9px] tracking-[0.14em] text-[#726a60] uppercase mt-1">
                        {item.secondaryMetric}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Big Sentence with Italic Serif Phrase */}
                  <div className="relative z-10 my-8">
                    <p className="font-serif text-xl md:text-2xl font-light text-[#1b1815] leading-[1.3] max-w-[28ch]">
                      Where{" "}
                      <span className="italic font-normal text-[#1c3a94]">
                        {item.quoteItalic}
                      </span>
                      , commanding algorithmic momentum.
                    </p>
                    <p className="font-serif text-sm md:text-[15px] font-light text-[#5d564e] leading-relaxed max-w-[36ch] mt-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Huge Etched Word Cropped at Bottom */}
                  <div className="absolute -bottom-8 left-4 right-4 pointer-events-none select-none overflow-hidden opacity-[0.08] leading-none">
                    <span className="font-grotesk font-black text-[130px] tracking-tighter text-[#1b1815] uppercase whitespace-nowrap block">
                      {item.etchedWord}
                    </span>
                  </div>

                  {/* Bottom: Tags and "View Project" Pill CTA */}
                  <div className="relative z-10 mt-auto pt-4 border-t border-[rgba(27,24,21,0.08)] flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-[#726a60] uppercase">
                      {item.tags.join(" / ")}
                    </div>

                    {/* "View project" pill with cobalt round arrow knob */}
                    <div className="group/btn inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 hover:bg-[#1c3a94] border border-white text-[#1b1815] hover:text-white font-mono text-[10.5px] tracking-[0.18em] uppercase transition-all duration-300 shadow-xs">
                      <span>VIEW REEL</span>
                      <span className="w-5 h-5 rounded-full bg-[#1c3a94] group-hover/btn:bg-white text-white group-hover/btn:text-[#1c3a94] flex items-center justify-center transition-colors duration-300">
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MOBILE: Swipeable Horizontal Snap List */}
      <div className="lg:hidden relative z-10 w-full overflow-x-auto snap-x snap-mandatory flex gap-4 px-2 py-4 no-scrollbar">
        {content.work.items.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setSelectedModalItem(item)}
            className="flex-shrink-0 w-[86vw] max-w-[340px] snap-center rounded-[20px] p-6 border border-white/80 shadow-md relative overflow-hidden"
            style={{ backgroundColor: item.bgColor }}
          >
            <div className="flex items-start justify-between pb-3 border-b border-[rgba(27,24,21,0.08)]">
              <div>
                <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#726a60]">
                  {item.platform}
                </span>
                <h3 className="font-grotesk font-semibold text-xl text-[#1b1815] tracking-tight">
                  {item.title}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-white/80 font-mono text-[10px] tracking-[0.12em] text-[#1c3a94] font-medium">
                {item.metric}
              </span>
            </div>

            <p className="font-serif text-base font-light text-[#1b1815] my-4 leading-snug">
              Where{" "}
              <span className="italic text-[#1c3a94]">
                {item.quoteItalic}
              </span>
              .
            </p>

            <div className="font-mono text-[9px] tracking-[0.12em] text-[#726a60] uppercase mb-4">
              {item.tags.slice(0, 3).join(" / ")}
            </div>

            <button className="w-full py-2.5 rounded-full bg-white/90 border border-white text-[#1c3a94] font-mono text-[10px] tracking-[0.16em] uppercase font-medium flex items-center justify-center gap-2 shadow-xs">
              <span>EXPLORE CASE STUDY</span>
              <span className="w-4 h-4 rounded-full bg-[#1c3a94] text-white flex items-center justify-center text-[9px]">
                →
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Floor Oval Ring & Carousel Dots Navigation */}
      <div className="relative z-10 w-full max-w-[600px] mx-auto flex flex-col items-center pt-6">
        {/* Floor Ring SVG Indicator */}
        <div className="relative w-full h-8 flex items-center justify-center">
          <svg className="w-64 h-8" viewBox="0 0 240 32">
            <ellipse
              cx="120"
              cy="16"
              rx="100"
              ry="10"
              fill="none"
              stroke="rgba(27,24,21,0.15)"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
          </svg>
        </div>

        {/* Dots & Hint Text */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {content.work.items.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSelectIndex(i)}
                aria-label={`Go to reel ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === activeIndex
                    ? "w-6 h-2 bg-[#1c3a94]"
                    : "w-2 h-2 bg-[rgba(27,24,21,0.25)] hover:bg-[#1c3a94]/60"
                }`}
              />
            ))}
          </div>

          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.18em] text-[#726a60] uppercase">
            {content.work.hint}
          </span>
        </div>
      </div>

      {/* Lightweight Reel Detail Modal */}
      {selectedModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm"
          onClick={() => setSelectedModalItem(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-[22px] p-6 sm:p-8 bg-[#f8f6f2] border border-white/90 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: selectedModalItem.bgColor }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedModalItem(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/80 border border-white text-[#1b1815] flex items-center justify-center hover:bg-[#1c3a94] hover:text-white transition-colors"
            >
              ✕
            </button>

            <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-[#726a60]">
              {selectedModalItem.platform}
            </span>
            <h3 className="font-grotesk font-bold text-2xl sm:text-3xl text-[#1b1815] mt-1">
              {selectedModalItem.title}
            </h3>
            <p className="font-serif italic text-base text-[#1c3a94] mt-1">
              {selectedModalItem.subtitle}
            </p>

            {/* Metrics highlight strip */}
            <div className="my-5 p-3.5 rounded-[12px] bg-white/70 border border-white flex items-center justify-around text-center">
              <div>
                <div className="font-mono text-base font-bold text-[#1c3a94]">
                  {selectedModalItem.metric}
                </div>
                <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#726a60]">
                  Audience Reach
                </div>
              </div>
              <div className="w-[1px] h-8 bg-[rgba(27,24,21,0.1)]" />
              <div>
                <div className="font-mono text-base font-bold text-[#1b1815]">
                  {selectedModalItem.secondaryMetric}
                </div>
                <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#726a60]">
                  Engagement Signal
                </div>
              </div>
            </div>

            <p className="font-serif font-light text-[#5d564e] text-sm sm:text-base leading-relaxed mb-6">
              {selectedModalItem.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6 font-mono text-[9.5px] tracking-[0.12em] uppercase text-[#726a60]">
              {selectedModalItem.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded bg-white/60 border border-white"
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href={selectedModalItem.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-[#1c3a94] hover:bg-[#142c74] text-white font-mono text-[11px] tracking-[0.18em] uppercase font-medium flex items-center justify-center gap-3 transition-colors shadow-sm"
            >
              <span>OPEN REEL ON INSTAGRAM</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
