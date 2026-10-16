"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";

export default function Contact() {
  const swooshRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Draw hand-drawn swoosh underline on arrival
      if (swooshRef.current) {
        const length = swooshRef.current.getTotalLength?.() || 280;
        gsap.set(swooshRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(swooshRef.current, {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: swooshRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="contact"
      aria-label="Contact section"
      className="relative min-h-[100svh] w-full flex flex-col justify-between py-20 md:py-28 px-5 sm:px-8 md:px-14 lg:px-20 overflow-hidden z-20 border-t border-[rgba(27,24,21,0.08)] bg-[#f4f1eb]"
    >
      {/* Background Brightening Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 25%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 250, 240, 0.5) 45%, rgba(244, 241, 235, 0) 80%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto flex flex-col items-center">
        {/* Slot for the single traveling badge in Contact section */}
        <div className="relative flex flex-col items-center mt-2 mb-16 sm:mb-24 select-none">
          <div
            id="badge-slot-contact"
            className="w-[280px] sm:w-[330px] md:w-[380px] h-[480px] pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Big Closing Line under Card: "Let's Build Something Beautiful." with Hand-Drawn Swoosh Underline */}
        <div className="text-center max-w-4xl my-6">
          <h2 className="font-serif font-light text-[#1b1815] text-[clamp(2.1rem,5vw,4.8rem)] leading-[1.05] tracking-tight">
            {content.contact.headline}{" "}
            <span className="relative inline-block text-[#1c3a94] italic font-normal">
              {content.contact.highlight}
              {/* Hand-drawn cobalt swoosh underline that draws in via SVG mask */}
              <svg
                viewBox="0 0 280 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-2 left-0 w-full h-[18px] pointer-events-none"
              >
                <path
                  ref={swooshRef}
                  d="M 5,18 C 50,6 150,4 275,14 C 210,22 90,26 35,22"
                  stroke="#1c3a94"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="font-serif font-light text-[#5d564e] text-base sm:text-lg md:text-xl max-w-xl mx-auto mt-7">
            {content.contact.subtext}
          </p>
        </div>

        {/* Accessibility & SEO Visually Hidden Link List */}
        <div className="sr-only">
          <ul>
            <li><a href={`mailto:${content.contact.email}`}>{content.contact.email}</a></li>
            {content.contact.socials.map((s) => (
              <li key={s.label}><a href={s.href}>{s.label}: {s.value}</a></li>
            ))}
          </ul>
        </div>

        {/* Footer Sign-off Line */}
        <div className="w-full mt-16 pt-8 border-t border-[rgba(27,24,21,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <span className="font-mono text-[10px] tracking-[0.18em] text-[#726a60] uppercase">
            {content.contact.closingSignoff}
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-[#726a60]">
            {content.contact.copyright}
          </span>
        </div>
      </div>
    </section>
  );
}
