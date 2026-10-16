"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";

export default function Contact() {
  const swooshRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloadBouncing, setDownloadBouncing] = useState(false);

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
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownloadKit = (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloadBouncing(true);
    setTimeout(() => setDownloadBouncing(false), 1200);
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      aria-label="Contact section"
      className="relative min-h-[100svh] w-full flex flex-col justify-between py-20 md:py-28 px-5 sm:px-8 md:px-14 lg:px-20 overflow-hidden z-20 border-t border-[rgba(27,24,21,0.08)] bg-[#f4f1eb]"
    >
      {/* Background Concentric Arc Line-Art & Paper Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Ambient Top Glow */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 50% 25%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 250, 240, 0.5) 45%, rgba(244, 241, 235, 0) 80%)",
          }}
        />

        {/* Concentric Arcs */}
        <svg
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] opacity-35 text-[#1b1815]"
          viewBox="0 0 1100 1100"
          fill="none"
        >
          <circle cx="550" cy="250" r="240" stroke="currentColor" strokeWidth="1" strokeOpacity="0.08" />
          <circle cx="550" cy="250" r="420" stroke="currentColor" strokeWidth="1" strokeOpacity="0.06" strokeDasharray="4 6" />
          <circle cx="550" cy="250" r="620" stroke="currentColor" strokeWidth="1" strokeOpacity="0.04" />
          <circle cx="550" cy="250" r="840" stroke="currentColor" strokeWidth="1" strokeOpacity="0.03" />
        </svg>

        {/* Tactile Noise Texture */}
        <div className="absolute inset-0 paper-noise-pattern opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto flex flex-col items-center">
        {/* Section Number & Eyebrow */}
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-[10.5px] tracking-[0.2em] text-[#1c3a94] uppercase">
            04 / CONTACT
          </span>
        </div>

        {/* 1. Headline FIRST: "Have a brand that needs to be seen? Let's talk." with Swoosh Underline */}
        <div className="text-center max-w-4xl mb-12 sm:mb-16">
          <h2 className="font-serif font-light text-[#1b1815] text-[clamp(2.1rem,5vw,4.8rem)] leading-[1.05] tracking-tight">
            {content.contact.headline}{" "}
            <span className="relative inline-block text-[#1c3a94] italic font-normal whitespace-nowrap">
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

          <p className="font-serif font-light text-[#5d564e] text-base sm:text-lg md:text-xl max-w-xl mx-auto mt-6">
            {content.contact.subtext}
          </p>
        </div>

        {/* 2. Contact Pass Card (Stationery Card with Real WhatsApp QR & Links) */}
        <div className="relative w-full max-w-[420px] rounded-[22px] p-6 sm:p-8 bg-gradient-to-b from-white/95 to-[#f8f6f2]/90 border border-white/90 shadow-[0_25px_60px_-15px_rgba(27,24,21,0.12),0_8px_25px_-6px_rgba(27,24,21,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)] backdrop-blur-md select-none overflow-hidden mb-16">
          {/* Subtle noise on card */}
          <div className="absolute inset-0 paper-noise-pattern opacity-40 pointer-events-none" />

          {/* Punch Slot for clip ring */}
          <div className="mx-auto -mt-2 mb-5 w-9 h-2.5 rounded-full bg-[#3d3832]/80 border border-white/40 shadow-inner" />

          {/* Card Header */}
          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[rgba(27,24,21,0.08)]">
            <span className="font-mono text-[9.5px] tracking-[0.2em] font-medium text-[#1c3a94] uppercase">
              {content.contact.badgeTitle}
            </span>
            <div className="flex items-center gap-1.5 text-[#4a9f6e]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a9f6e] animate-pulse" />
              <span className="font-mono text-[8px] tracking-[0.16em] uppercase font-medium">
                OPEN FOR WORK
              </span>
            </div>
          </div>

          {/* Identity Name & Role */}
          <div className="relative z-10 text-left my-4">
            <h3 className="font-serif text-2xl font-light text-[#1b1815] tracking-tight">
              {content.contact.name}
            </h3>
            <p className="font-mono text-[9px] tracking-[0.18em] text-[#726a60] uppercase mt-0.5">
              {content.contact.role}
            </p>
          </div>

          {/* Contact Action Rows */}
          <div className="relative z-10 flex flex-col gap-2 my-5 text-left font-mono">
            {/* Direct Email with One-Click Copy */}
            <div
              onClick={handleCopyEmail}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-white/60 hover:bg-white border border-[rgba(27,24,21,0.06)] cursor-pointer transition-all shadow-xs group"
            >
              <div>
                <span className="text-[7.5px] tracking-[0.16em] text-[#726a60] uppercase block">
                  DIRECT EMAIL
                </span>
                <span className="font-serif text-sm text-[#1b1815] group-hover:text-[#1c3a94] transition-colors">
                  {content.contact.email}
                </span>
              </div>
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

            {/* WhatsApp Row with Direct Message Button */}
            <a
              href="https://wa.me/916371151811"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-white/60 hover:bg-white border border-[rgba(27,24,21,0.06)] transition-all shadow-xs group"
            >
              <div>
                <span className="text-[7.5px] tracking-[0.16em] text-[#726a60] uppercase block">
                  WHATSAPP CHAT
                </span>
                <span className="font-serif text-sm text-[#1b1815] group-hover:text-[#1c3a94] transition-colors">
                  +91 63711 51811
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#1c3a94] text-white text-[9px] tracking-[0.16em] uppercase flex items-center gap-1 group-hover:bg-[#142c74] transition-colors">
                <span>CHAT</span>
                <span>↗</span>
              </span>
            </a>

            {/* Instagram Row */}
            <a
              href="https://www.instagram.com/pipashha/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-white/60 hover:bg-white border border-[rgba(27,24,21,0.06)] transition-all shadow-xs group"
            >
              <div>
                <span className="text-[7.5px] tracking-[0.16em] text-[#726a60] uppercase block">
                  INSTAGRAM
                </span>
                <span className="font-serif text-sm text-[#1b1815] group-hover:text-[#1c3a94] transition-colors">
                  @pipashha
                </span>
              </div>
              <span className="w-7 h-7 rounded-full bg-white border border-[rgba(27,24,21,0.1)] flex items-center justify-center text-[#1c3a94] shadow-xs">
                ↗
              </span>
            </a>

            {/* Media Kit Download */}
            <div
              onClick={handleDownloadKit}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-white/60 hover:bg-white border border-[rgba(27,24,21,0.06)] cursor-pointer transition-all shadow-xs group"
            >
              <div>
                <span className="text-[7.5px] tracking-[0.16em] text-[#726a60] uppercase block">
                  PORTFOLIO MEDIA KIT
                </span>
                <span className="font-serif text-sm text-[#1b1815] group-hover:text-[#1c3a94] transition-colors">
                  {downloadBouncing ? "Downloading PDF..." : "Download Media Kit (PDF)"}
                </span>
              </div>
              <span className="w-7 h-7 rounded-full bg-white border border-[rgba(27,24,21,0.1)] flex items-center justify-center text-[#1c3a94] shadow-xs">
                ↓
              </span>
            </div>
          </div>

          {/* Real WhatsApp QR Code Section */}
          <div className="relative z-10 pt-4 border-t border-[rgba(27,24,21,0.08)] flex items-center justify-between gap-4">
            <a
              href="https://wa.me/916371151811"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-xl bg-white p-1.5 border border-[rgba(27,24,21,0.12)] shadow-xs flex-shrink-0 transition-transform hover:scale-105"
              title="Click or scan to message on WhatsApp"
            >
              <img
                src="/whatsapp-qr.svg"
                alt="Scan WhatsApp QR"
                className="w-full h-full object-contain"
                draggable={false}
              />
            </a>

            <div className="flex flex-col text-left">
              <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-[#1c3a94] font-medium">
                {content.contact.qrPrompt}
              </span>
              <span className="font-serif text-xs text-[#5d564e] mt-1 leading-snug">
                Point camera to initiate instant project chat.
              </span>
            </div>
          </div>
        </div>

        {/* Footer Sign-off Line */}
        <div className="w-full mt-8 pt-8 border-t border-[rgba(27,24,21,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
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
