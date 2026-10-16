"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isSmallScreen = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let lenis: Lenis | null = null;
    let updateTicker: ((time: number) => void) | null = null;

    if (!isSmallScreen && !prefersReducedMotion) {
      lenis = new Lenis({
        lerp: 0.12,
        wheelMultiplier: 0.9,
        syncTouch: false,
      });

      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      updateTicker = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);
    }

    // Refresh ScrollTrigger once web fonts and initial layout settle
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(refreshTimer);
      if (updateTicker) {
        gsap.ticker.remove(updateTicker);
      }
      if (lenis) {
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
        lenis.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
