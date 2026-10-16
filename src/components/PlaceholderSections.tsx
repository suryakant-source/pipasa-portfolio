"use client";

import React from "react";
import { content } from "@/content";

export default function PlaceholderSections() {
  return (
    <div className="relative z-10 w-full flex flex-col">
      {/* 3) IDENTITY CHECK (About Preview Anchor) */}
      <section
        id="about"
        className="w-full min-h-[60vh] py-24 px-6 md:px-16 max-w-[1280px] mx-auto flex flex-col justify-center border-t border-[rgba(27,24,21,0.08)]"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[11px] tracking-[0.2em] text-[#1c3a94] uppercase">
            {content.about.sectionNumber} / {content.about.label}
          </span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#1b1815] tracking-tight">
          {content.about.titleFirstWord}{" "}
          <span className="italic text-[#1c3a94]">
            {content.about.titleAccentWord}
          </span>
        </h2>
        <p className="font-serif text-lg md:text-xl text-[#5d564e] font-light max-w-xl mt-4">
          {content.about.paragraph}
        </p>
        <div className="mt-8">
          <span className="inline-block px-4 py-2 rounded-full border border-[rgba(27,24,21,0.12)] font-mono text-[10px] tracking-[0.16em] uppercase text-[#726a60]">
            Phase 1 Scaffold • Interactive Scanner & Facts queued for Phase 2
          </span>
        </div>
      </section>

      {/* 4) SELECTED WORK Anchor */}
      <section
        id="work"
        className="w-full min-h-[60vh] py-24 px-6 md:px-16 max-w-[1280px] mx-auto flex flex-col justify-center border-t border-[rgba(27,24,21,0.08)]"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[11px] tracking-[0.2em] text-[#1c3a94] uppercase">
            {content.work.sectionNumber} / {content.work.label}
          </span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#1b1815] tracking-tight">
          {content.work.titleFirstWord}{" "}
          <span className="italic text-[#1c3a94]">
            {content.work.titleAccentWord}
          </span>
        </h2>
        <p className="font-serif text-lg md:text-xl text-[#5d564e] font-light max-w-xl mt-4">
          {content.work.hint}
        </p>
        <div className="mt-8">
          <span className="inline-block px-4 py-2 rounded-full border border-[rgba(27,24,21,0.12)] font-mono text-[10px] tracking-[0.16em] uppercase text-[#726a60]">
            Phase 1 Scaffold • 3D Ring Orbit Carousel queued for Phase 2
          </span>
        </div>
      </section>

      {/* 5) PROCESS Anchor */}
      <section
        id="process"
        className="w-full min-h-[60vh] py-24 px-6 md:px-16 max-w-[1280px] mx-auto flex flex-col justify-center border-t border-[rgba(27,24,21,0.08)]"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[11px] tracking-[0.2em] text-[#1c3a94] uppercase">
            {content.process.sectionNumber} / {content.process.label}
          </span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#1b1815] tracking-tight">
          {content.process.titleFirstWord}{" "}
          <span className="italic text-[#1c3a94]">
            {content.process.titleAccentWord}
          </span>
        </h2>
        <div className="mt-8">
          <span className="inline-block px-4 py-2 rounded-full border border-[rgba(27,24,21,0.12)] font-mono text-[10px] tracking-[0.16em] uppercase text-[#726a60]">
            Phase 1 Scaffold • 4 Tabbed Paper Cards queued for Phase 2
          </span>
        </div>
      </section>

      {/* 6) CONTACT Anchor */}
      <section
        id="contact"
        className="w-full min-h-[70vh] py-28 px-6 md:px-16 max-w-[1280px] mx-auto flex flex-col justify-center border-t border-[rgba(27,24,21,0.08)]"
      >
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#1b1815] tracking-tight">
          {content.contact.headline}{" "}
          <span className="italic text-[#1c3a94]">
            {content.contact.highlight}
          </span>
        </h2>
        <p className="font-serif text-lg md:text-xl text-[#5d564e] font-light max-w-xl mt-6">
          {content.contact.subtext}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href={`mailto:${content.contact.email}`}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#1c3a94] text-white font-mono text-[11.5px] tracking-[0.18em] uppercase hover:bg-[#142c74] transition-colors"
          >
            {content.contact.email}
          </a>
        </div>

        <div className="mt-16 pt-8 border-t border-[rgba(27,24,21,0.08)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="font-mono text-[10px] tracking-[0.18em] text-[#726a60] uppercase">
            {content.contact.closingSignoff}
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-[#726a60]">
            {content.contact.copyright}
          </span>
        </div>
      </section>
    </div>
  );
}
