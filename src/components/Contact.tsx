"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [downloadBouncing, setDownloadBouncing] = useState(false);
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

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(content.contact.email);
    }
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1600);
  };

  const handleDownloadClick = () => {
    setDownloadBouncing(true);
    setTimeout(() => {
      setDownloadBouncing(false);
    }, 1100);
  };

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
        {/* Second, Bigger Contact Pass Badge Hanging from Top */}
        <div className="relative flex flex-col items-center mb-16 select-none">
          {/* Lanyard Cord hanging down */}
          <div className="relative w-[20px] md:w-[24px] h-[55px] md:h-[80px] bg-[#1b1815] shadow-sm flex flex-col items-center overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 4px)",
              }}
            />
          </div>

          {/* Metal Buckle & Ring */}
          <div className="relative z-10 w-[28px] md:w-[32px] h-[15px] bg-gradient-to-b from-[#e5e5e5] to-[#a3a3a3] rounded-[3px] border border-white/70 shadow-xs flex items-center justify-center -mt-0.5" />
          <div className="animate-clip-rock flex flex-col items-center -mt-[3px] z-10">
            <div className="w-[18px] md:w-[22px] h-[18px] md:h-[22px] rounded-full border-[2.5px] border-[#d1d5db] bg-transparent" />
          </div>

          {/* Contact Pass Acrylic Card */}
          <div
            className="animate-lanyard relative -mt-[10px] w-[310px] sm:w-[360px] md:w-[410px] rounded-[22px] p-6 sm:p-8 border border-white/90 shadow-[0_30px_60px_rgba(27,24,21,0.14)] backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(145deg, rgba(255, 255, 255, 0.92) 0%, rgba(248, 246, 242, 0.8) 100%)",
            }}
          >
            {/* Punch Slot */}
            <div className="mx-auto -mt-2 mb-4 w-9 h-2.5 rounded-full bg-[#3d3832]/80 border border-white/40 shadow-inner" />

            {/* Badge Title: "CONTACT No 0001" */}
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(27,24,21,0.08)]">
              <span className="font-mono text-[10px] tracking-[0.2em] font-medium text-[#1c3a94] uppercase">
                {content.contact.badgeTitle}
              </span>
              <span className="font-mono text-[9px] tracking-[0.16em] text-[#726a60] uppercase">
                OFFICIAL CHANNEL
              </span>
            </div>

            {/* Name in spaced serif caps & role in mono */}
            <div className="text-center my-5">
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1b1815] tracking-[0.14em] uppercase">
                {content.contact.name}
              </h3>
              <p className="font-mono text-[9.5px] sm:text-[10px] tracking-[0.2em] text-[#726a60] uppercase mt-1">
                {content.contact.role}
              </p>
            </div>

            {/* Contact Rows with 1px Rules */}
            <div className="flex flex-col border-t border-[rgba(27,24,21,0.08)]">
              {/* Row 1: EMAIL (click copies, shows "Copied" for ~1.5s, underline scales from right on hover) */}
              <div
                onClick={handleCopyEmail}
                role="button"
                tabIndex={0}
                className="group relative flex items-center justify-between py-3.5 border-b border-[rgba(27,24,21,0.08)] cursor-pointer text-left"
              >
                <div>
                  <span className="font-mono text-[9px] tracking-[0.18em] text-[#726a60] uppercase block">
                    DIRECT EMAIL
                  </span>
                  <span className="font-serif text-base sm:text-lg text-[#1b1815] group-hover:text-[#1c3a94] transition-colors">
                    {content.contact.email}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-[9.5px] tracking-[0.14em] text-[#4a9f6e] uppercase font-medium transition-opacity duration-300 ${
                      copied ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {content.contact.copiedNotice}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-white border border-[rgba(27,24,21,0.1)] flex items-center justify-center text-[#1c3a94] shadow-xs">
                    {copied ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4a9f6e" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                    )}
                  </span>
                </div>

                {/* Underline scaling from right on hover (.7s) */}
                <span className="absolute bottom-0 right-0 w-full h-[1px] bg-[#1c3a94] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </div>

              {/* Social Rows: Instagram, WhatsApp */}
              {content.contact.socials
                .filter((s) => s.icon !== "download")
                .map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3 border-b border-[rgba(27,24,21,0.08)] text-left hover:bg-white/40 px-1 rounded transition-colors"
                  >
                    <div>
                      <span className="font-mono text-[9px] tracking-[0.18em] text-[#726a60] uppercase block">
                        {social.label}
                      </span>
                      <span className="font-serif text-[15px] sm:text-base text-[#1b1815] group-hover:text-[#1c3a94] transition-colors">
                        {social.value}
                      </span>
                    </div>

                    <span className="w-7 h-7 rounded-full bg-white border border-[rgba(27,24,21,0.1)] flex items-center justify-center text-[#726a60] group-hover:text-[#1c3a94] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shadow-xs">
                      ↗
                    </span>
                  </a>
                ))}

              {/* Download Row: Download Media Kit (arrow bounces down once on click, 1.1s) */}
              {content.contact.socials
                .filter((s) => s.icon === "download")
                .map((mediaKit) => (
                  <a
                    key={mediaKit.label}
                    href={mediaKit.href}
                    onClick={handleDownloadClick}
                    className="group flex items-center justify-between py-3 border-b border-[rgba(27,24,21,0.08)] text-left hover:bg-white/40 px-1 rounded transition-colors"
                  >
                    <div>
                      <span className="font-mono text-[9px] tracking-[0.18em] text-[#726a60] uppercase block">
                        {mediaKit.label}
                      </span>
                      <span className="font-serif text-[15px] sm:text-base text-[#1b1815] group-hover:text-[#1c3a94] transition-colors">
                        {mediaKit.value}
                      </span>
                    </div>

                    <span
                      className={`w-7 h-7 rounded-full bg-white border border-[rgba(27,24,21,0.1)] flex items-center justify-center text-[#1c3a94] shadow-xs ${
                        downloadBouncing ? "animate-bounce" : ""
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <polyline points="19 12 12 19 5 12" />
                      </svg>
                    </span>
                  </a>
                ))}
            </div>

            {/* Bottom Block: QR in white rounded plate + "Scan to connect" */}
            <div className="mt-5 pt-3 flex items-center justify-between">
              <div
                className="group/qr w-14 h-14 rounded-[12px] bg-white p-1.5 border border-white shadow-xs hover:scale-[1.035] focus:scale-[1.035] transition-transform duration-300"
              >
                <svg viewBox="0 0 32 32" className="w-full h-full text-[#1b1815]" fill="currentColor">
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

              <div className="text-right">
                <span className="font-serif italic text-sm text-[#1b1815] block">
                  {content.contact.qrPrompt}
                </span>
                <span className="font-mono text-[8.5px] tracking-[0.16em] text-[#726a60] uppercase">
                  Encrypted VCard Pass
                </span>
              </div>
            </div>
          </div>
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
