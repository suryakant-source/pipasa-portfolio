"use client";

import React, { useState } from "react";
import { content } from "@/content";

export default function Navbar() {
  const [veilActive, setVeilActive] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href === "#contact") {
      e.preventDefault();
      setVeilActive(true);
      setTimeout(() => {
        const el = document.querySelector("#contact");
        if (el) {
          el.scrollIntoView({ behavior: "auto" });
        }
        setTimeout(() => {
          setVeilActive(false);
        }, 300);
      }, 550);
    }
  };

  return (
    <>
      {/* Paper-coloured veil for smooth contact transition */}
      <div
        className={`fixed inset-0 z-50 bg-[#f4f1eb] pointer-events-none transition-opacity duration-550 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          veilActive ? "opacity-100" : "opacity-0"
        }`}
      />

      <header className="absolute top-0 left-0 right-0 z-40 w-full py-7 pointer-events-auto bg-transparent">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Left */}
          <a
            href="#"
            className="group flex items-center gap-2 text-inherit tracking-tight transition-transform duration-300 ease-out active:scale-95"
          >
            <span className="font-serif text-xl md:text-2xl font-light text-[#1b1815] group-hover:opacity-85 transition-opacity">
              {content.navigation.logoText}
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1c3a94] transform translate-y-0.5" />
          </a>

          {/* Right Mono Nav Links */}
          <nav className="flex items-center gap-7 md:gap-10">
            {content.navigation.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group relative py-1 text-[11px] font-mono tracking-[0.18em] uppercase text-[#1b1815] transition-colors hover:text-[#1c3a94]"
              >
                <span>{link.label}</span>
                {/* Hairline underline scaling from left */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1c3a94] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
