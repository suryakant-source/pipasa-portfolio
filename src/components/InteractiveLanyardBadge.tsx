"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { content } from "@/content";

interface RopeNode {
  x: number;
  y: number;
  oldX: number;
  oldY: number;
}

interface BadgePosition {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  ropeAlpha: number;
  section: "hero" | "about" | "work" | "contact";
}

export default function InteractiveLanyardBadge() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Drag physics state (stored in ref for 60fps loop)
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
    vx: 0,
    vy: 0,
    lastX: 0,
    lastY: 0,
  });

  // Tilt state
  const tiltRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Scroll target position
  const targetPosRef = useRef<BadgePosition>({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    ropeAlpha: 1,
    section: "hero",
  });

  // Current interpolated position
  const currentPosRef = useRef({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    swingAngle: 0,
    ropeAlpha: 1,
  });

  // Rope simulation nodes
  const nodesRef = useRef<RopeNode[]>([]);
  const [activeSection, setActiveSection] = useState<
    "hero" | "about" | "work" | "contact"
  >("hero");
  const activeSectionRef = useRef<"hero" | "about" | "work" | "contact">("hero");
  const [copied, setCopied] = useState(false);
  const [downloadBouncing, setDownloadBouncing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Initialize rope nodes
  const initRope = useCallback((startX: number, startY: number) => {
    const nodes: RopeNode[] = [];
    const nodeCount = 9;
    const ropeLength = 120;
    const segmentLength = ropeLength / (nodeCount - 1);

    for (let i = 0; i < nodeCount; i++) {
      const y = -20 + i * segmentLength;
      nodes.push({
        x: startX,
        y: y,
        oldX: startX,
        oldY: y,
      });
    }
    nodesRef.current = nodes;
  }, []);

  // Update target positions from viewport & section progression
  const updateTargets = useCallback(() => {
    if (typeof window === "undefined") return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isMobile = width < 1024;
    const isSmallMobile = width < 640;

    // Anchor positions in viewport calculated from actual section slots
    const heroSlot = document.getElementById("badge-slot-hero");
    const aboutSlot = document.getElementById("badge-slot-scanner");
    const contactSlot = document.getElementById("badge-slot-contact");

    let heroX = isMobile ? width * 0.5 : width * 0.72;
    let heroY = isMobile ? (isSmallMobile ? 210 : 230) : height * 0.44;
    if (heroSlot) {
      const rect = heroSlot.getBoundingClientRect();
      heroX = rect.left + rect.width / 2;
      if (rect.top > -400 && rect.top < height * 1.5) {
        heroY = rect.top + rect.height / 2;
      }
    }

    let aboutX = isMobile ? width * 0.5 : width * 0.22;
    let aboutY = isMobile ? height * 0.36 : height * 0.5;
    if (aboutSlot) {
      const rect = aboutSlot.getBoundingClientRect();
      aboutX = rect.left + rect.width / 2;
      if (rect.top > -400 && rect.top < height * 1.5) {
        aboutY = rect.top + rect.height / 2;
      }
    }

    const workTarget = {
      x: isMobile ? width * 0.5 : width * 0.12,
      y: isMobile ? 86 : height * 0.22,
      scale: isMobile ? 0.62 : 0.74,
      rotation: -3.5,
      ropeAlpha: 0.75,
    };

    let contactX = width * 0.5;
    let contactY = isMobile ? height * 0.36 : height * 0.38;
    if (contactSlot) {
      const rect = contactSlot.getBoundingClientRect();
      contactX = rect.left + rect.width / 2;
      if (rect.top > -400 && rect.top < height * 1.5) {
        contactY = rect.top + rect.height / 2;
      }
    }

    const heroTarget = {
      x: heroX,
      y: heroY,
      scale: isMobile ? (isSmallMobile ? 0.84 : 0.88) : 1.0,
      rotation: 1.2,
      ropeAlpha: 1.0,
    };

    const aboutTarget = {
      x: aboutX,
      y: aboutY,
      scale: isMobile ? (isSmallMobile ? 0.78 : 0.84) : 0.94,
      rotation: 0,
      ropeAlpha: 0, // In laser scanner frame, rope fades out for clean inspection
    };

    const contactTarget = {
      x: contactX,
      y: contactY,
      scale: isMobile ? (isSmallMobile ? 0.88 : 0.92) : 1.02,
      rotation: 0,
      ropeAlpha: 1.0,
    };

    // Calculate progression using section positions
    const aboutEl = document.getElementById("about");
    const workEl = document.getElementById("work");
    const contactEl = document.getElementById("contact");

    const aboutTop = aboutEl ? aboutEl.getBoundingClientRect().top : height;
    const workTop = workEl ? workEl.getBoundingClientRect().top : height * 2;
    const contactTop = contactEl
      ? contactEl.getBoundingClientRect().top
      : height * 3;

    let target: BadgePosition;

    if (aboutTop > 0) {
      // Transition from Hero -> About
      const rawProgress = 1 - aboutTop / height;
      const p = Math.max(0, Math.min(1, (rawProgress - 0.25) / 0.75));

      target = {
        x: gsap.utils.interpolate(heroTarget.x, aboutTarget.x, p),
        y: gsap.utils.interpolate(heroTarget.y, aboutTarget.y, p),
        scale: gsap.utils.interpolate(heroTarget.scale, aboutTarget.scale, p),
        rotation: gsap.utils.interpolate(
          heroTarget.rotation,
          aboutTarget.rotation,
          p
        ),
        ropeAlpha: gsap.utils.interpolate(
          heroTarget.ropeAlpha,
          aboutTarget.ropeAlpha,
          p
        ),
        section: p > 0.65 ? "about" : "hero",
      };
    } else if (workTop > height * 0.7) {
      // Solidly inside About (Identity Check)
      target = {
        ...aboutTarget,
        section: "about",
      };
    } else if (contactTop > height * 0.8) {
      // Transition from About -> Work
      const p = Math.max(0, Math.min(1, 1 - workTop / (height * 0.7)));
      target = {
        x: gsap.utils.interpolate(aboutTarget.x, workTarget.x, p),
        y: gsap.utils.interpolate(aboutTarget.y, workTarget.y, p),
        scale: gsap.utils.interpolate(aboutTarget.scale, workTarget.scale, p),
        rotation: gsap.utils.interpolate(
          aboutTarget.rotation,
          workTarget.rotation,
          p
        ),
        ropeAlpha: gsap.utils.interpolate(
          aboutTarget.ropeAlpha,
          workTarget.ropeAlpha,
          p
        ),
        section: "work",
      };
    } else {
      // Transition into Contact Section
      const p = Math.max(0, Math.min(1, 1 - contactTop / (height * 0.8)));
      target = {
        x: gsap.utils.interpolate(workTarget.x, contactTarget.x, p),
        y: gsap.utils.interpolate(workTarget.y, contactTarget.y, p),
        scale: gsap.utils.interpolate(
          workTarget.scale,
          contactTarget.scale,
          p
        ),
        rotation: gsap.utils.interpolate(
          workTarget.rotation,
          contactTarget.rotation,
          p
        ),
        ropeAlpha: gsap.utils.interpolate(
          workTarget.ropeAlpha,
          contactTarget.ropeAlpha,
          p
        ),
        section: p > 0.4 ? "contact" : "work",
      };
    }

    targetPosRef.current = target;
    if (activeSectionRef.current !== target.section) {
      activeSectionRef.current = target.section;
      setActiveSection(target.section);
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const width = window.innerWidth;
    const initialX = width > 1024 ? width * 0.72 : width * 0.5;
    const initialY = width > 1024 ? window.innerHeight * 0.44 : 220;

    initRope(initialX, initialY);
    currentPosRef.current = {
      x: initialX,
      y: initialY - 140, // drops in from above
      scale: 1,
      rotation: -10,
      swingAngle: 0,
      ropeAlpha: 1,
    };

    updateTargets();
    setIsReady(true);

    const handleScroll = () => {
      updateTargets();
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
      updateTargets();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // Initial canvas sizing
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }

    // 3D Pointer tilt listener
    const handlePointerMove = (e: PointerEvent) => {
      const badge = badgeRef.current;
      if (!badge || window.innerWidth < 1024) return;
      const rect = badge.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const deltaX = (e.clientX - cx) / (window.innerWidth / 2);
      const deltaY = (e.clientY - cy) / (window.innerHeight / 2);

      tiltRef.current.targetX = Math.max(-8, Math.min(8, deltaY * -8));
      tiltRef.current.targetY = Math.max(-8, Math.min(8, deltaX * 8));
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    // Main 60fps Physics & Render Loop
    let animId: number;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const loop = () => {
      updateTargets();
      const target = targetPosRef.current;
      const current = currentPosRef.current;
      const drag = dragRef.current;
      const tilt = tiltRef.current;
      const width = window.innerWidth;
      const isMobile = width < 1024;

      // 1. Spring physics for drag offset
      if (!drag.isDragging) {
        const springK = 0.08;
        const damping = 0.84;

        const ax = -springK * drag.offsetX;
        const ay = -springK * drag.offsetY;

        drag.vx = (drag.vx + ax) * damping;
        drag.vy = (drag.vy + ay) * damping;

        drag.offsetX += drag.vx;
        drag.offsetY += drag.vy;
      }

      // 2. Smoothly interpolate position towards target + drag offset
      const lerpFactor = prefersReducedMotion ? 0.35 : isMobile ? 0.16 : 0.14;
      current.x += (target.x + drag.offsetX - current.x) * lerpFactor;
      current.y += (target.y + drag.offsetY - current.y) * lerpFactor;
      current.scale += (target.scale - current.scale) * lerpFactor;
      current.ropeAlpha += (target.ropeAlpha - current.ropeAlpha) * lerpFactor;

      // 3. Smooth tilt
      tilt.x += (tilt.targetX - tilt.x) * 0.12;
      tilt.y += (tilt.targetY - tilt.y) * 0.12;

      // 4. Calculate card swing from horizontal velocity & drag displacement
      const targetSwing = prefersReducedMotion
        ? 0
        : Math.max(-18, Math.min(18, drag.offsetX * 0.08 + drag.vx * 1.2));
      current.swingAngle += (targetSwing - current.swingAngle) * 0.1;

      // 5. Update Rope Physics (Verlet Simulation)
      const nodes = nodesRef.current;
      const totalRot = target.rotation + current.swingAngle;
      const rotRad = (totalRot * Math.PI) / 180;
      const halfHeight =
        target.section === "contact" ? 230 : width < 640 ? 175 : 220;

      // Punch slot attachment point
      const badgeClipX =
        current.x + Math.sin(rotRad) * (halfHeight - 12) * current.scale;
      const badgeClipY =
        current.y - Math.cos(rotRad) * (halfHeight - 12) * current.scale;
      const topAnchorX = current.x;
      const topAnchorY = -25;

      if (nodes.length > 0 && !prefersReducedMotion) {
        // Pin top node
        nodes[0].x = topAnchorX;
        nodes[0].y = topAnchorY;

        // Pin bottom node to badge clasp
        const last = nodes[nodes.length - 1];
        last.x = badgeClipX;
        last.y = badgeClipY;

        // Verlet integration on internal nodes
        const gravity = 0.45;
        const friction = 0.95;

        for (let i = 1; i < nodes.length - 1; i++) {
          const n = nodes[i];
          const vx = (n.x - n.oldX) * friction;
          const vy = (n.y - n.oldY) * friction + gravity;

          n.oldX = n.x;
          n.oldY = n.y;
          n.x += vx;
          n.y += vy;
        }

        // Distance constraint relaxation (fewer iterations on mobile for speed)
        const ropeTotalLength = Math.max(80, badgeClipY - topAnchorY);
        const segmentLen = ropeTotalLength / (nodes.length - 1);
        const relaxIter = isMobile ? 4 : 7;

        for (let iter = 0; iter < relaxIter; iter++) {
          for (let i = 0; i < nodes.length - 1; i++) {
            const p1 = nodes[i];
            const p2 = nodes[i + 1];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.hypot(dx, dy) || 1;
            const diff = (dist - segmentLen) / dist;

            const p1Fixed = i === 0;
            const p2Fixed = i + 1 === nodes.length - 1;

            if (p1Fixed && !p2Fixed) {
              p2.x -= dx * diff;
              p2.y -= dy * diff;
            } else if (!p1Fixed && p2Fixed) {
              p1.x += dx * diff;
              p1.y += dy * diff;
            } else if (!p1Fixed && !p2Fixed) {
              p1.x += dx * 0.5 * diff;
              p1.y += dy * 0.5 * diff;
              p2.x -= dx * 0.5 * diff;
              p2.y -= dy * 0.5 * diff;
            }
          }
        }
      }

      // 6. Draw Canvas Rope
      const canvas = canvasRef.current;
      if (canvas) {
        if (
          canvas.width !== window.innerWidth ||
          canvas.height !== window.innerHeight
        ) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (
            nodes.length > 1 &&
            current.ropeAlpha > 0.02 &&
            !prefersReducedMotion
          ) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, Math.min(1, current.ropeAlpha));

            // Draw braided cord spline
            ctx.beginPath();
            ctx.moveTo(nodes[0].x, nodes[0].y);

            for (let i = 1; i < nodes.length - 1; i++) {
              const xc = (nodes[i].x + nodes[i + 1].x) / 2;
              const yc = (nodes[i].y + nodes[i + 1].y) / 2;
              ctx.quadraticCurveTo(nodes[i].x, nodes[i].y, xc, yc);
            }
            ctx.lineTo(nodes[nodes.length - 1].x, nodes[nodes.length - 1].y);

            // Outer dark strap
            ctx.strokeStyle = "#1b1815";
            ctx.lineWidth = 14 * current.scale;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();

            // Inner textured highlight cord
            ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
            ctx.lineWidth = 3.5 * current.scale;
            ctx.stroke();

            // Metallic swivel ring & clasp at bottom node
            const clip = nodes[nodes.length - 1];
            ctx.save();
            ctx.translate(clip.x, clip.y);
            ctx.rotate(rotRad);
            ctx.fillStyle = "#d4d4d8";
            ctx.strokeStyle = "#52525b";
            ctx.lineWidth = 2 * current.scale;

            // Clasp ring
            ctx.beginPath();
            ctx.arc(
              0,
              6 * current.scale,
              7 * current.scale,
              0,
              Math.PI * 2
            );
            ctx.stroke();

            // Buckle rectangle
            ctx.fillRect(
              -8 * current.scale,
              -6 * current.scale,
              16 * current.scale,
              8 * current.scale
            );
            ctx.strokeRect(
              -8 * current.scale,
              -6 * current.scale,
              16 * current.scale,
              8 * current.scale
            );
            ctx.restore();
            ctx.restore();
          }
        }
      }

      // 7. Update DOM Badge transform
      const badge = badgeRef.current;
      if (badge) {
        badge.style.transform = `translate3d(${current.x}px, ${current.y}px, 0px) translate(-50%, -50%) scale(${current.scale}) rotate(${totalRot}deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, [initRope, updateTargets]);

  // Pointer drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    const drag = dragRef.current;
    drag.isDragging = true;
    drag.startX = e.clientX;
    drag.startY = e.clientY;
    drag.lastX = e.clientX;
    drag.lastY = e.clientY;
    drag.vx = 0;
    drag.vy = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag.isDragging) return;

    const dx = e.clientX - drag.lastX;
    const dy = e.clientY - drag.lastY;

    drag.offsetX += dx;
    drag.offsetY += dy;

    // Moving average velocity
    drag.vx = drag.vx * 0.6 + dx * 0.4;
    drag.vy = drag.vy * 0.6 + dy * 0.4;

    drag.lastX = e.clientX;
    drag.lastY = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
    dragRef.current.isDragging = false;
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(content.contact.email);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadBouncing(true);
    setTimeout(() => setDownloadBouncing(false), 1100);
  };

  if (!isReady) return null;

  return (
    <>
      {/* Canvas Rope */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[28] w-full h-full select-none"
      />

      {/* Single Persistent Interactive Badge */}
      <div
        ref={badgeRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="fixed top-0 left-0 z-[30] touch-none cursor-grab active:cursor-grabbing select-none will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1200px",
        }}
      >
        {/* Acrylic Card Shell */}
        <div
          className={`relative w-[230px] sm:w-[280px] md:w-[330px] rounded-[18px] p-4 sm:p-5 md:p-6 transition-colors duration-500 ease-out border border-white/85 shadow-[0_25px_50px_-12px_rgba(27,24,21,0.18),0_8px_24px_-4px_rgba(27,24,21,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)] backdrop-blur-[18px] ${
            activeSection === "contact"
              ? "bg-gradient-to-b from-white/95 to-[#f8f6f2]/90 min-h-[460px]"
              : "bg-gradient-to-b from-white/88 to-[#f8f6f2]/75"
          }`}
        >
          {/* Paper texture overlay */}
          <div className="absolute inset-0 rounded-[18px] paper-noise-pattern opacity-40 pointer-events-none" />

          {/* Punch Slot for clip ring */}
          <div className="mx-auto -mt-1 md:-mt-2 mb-3 md:mb-4 w-8 md:w-9 h-2 md:h-2.5 rounded-full bg-[#3d3832]/80 border border-white/40 shadow-inner" />

          {/* STATE A: Studio Pass Mode (Hero, Identity Check, Selected Work) */}
          {activeSection !== "contact" ? (
            <>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(27,24,21,0.08)]">
                <span className="font-mono text-[8.5px] md:text-[10px] tracking-[0.2em] font-medium text-[#1b1815] uppercase">
                  {content.hero.badge.brandMark}
                </span>
                <div className="flex items-center gap-1 text-[#726a60]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                  <span className="font-mono text-[7px] md:text-[8px] tracking-[0.12em]">
                    NFC
                  </span>
                </div>
              </div>

              {/* Portrait Photo Area */}
              <div className="my-2.5 md:my-3.5 relative w-full h-[145px] sm:h-[195px] md:h-[245px] rounded-[10px] md:rounded-[12px] overflow-hidden bg-[#ebe5da] border border-white/80 shadow-inner flex items-center justify-center">
                <img
                  src={content.hero.badge.photo}
                  alt={content.hero.badge.name}
                  className="w-full h-full object-cover object-[center_16%]"
                  draggable={false}
                />
                <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-md text-white font-mono text-[7px] md:text-[8px] tracking-[0.16em]">
                  OFFICIAL CREATOR
                </div>
              </div>

              {/* Identity Info */}
              <div className="text-left mt-1.5">
                <h3 className="font-serif text-base sm:text-lg md:text-2xl font-light text-[#1b1815] tracking-tight leading-tight">
                  {content.hero.badge.name}
                </h3>
                <p className="font-mono text-[8px] sm:text-[9.5px] md:text-[10px] tracking-[0.18em] text-[#1c3a94] uppercase font-medium mt-0.5">
                  {content.hero.badge.role}
                </p>
              </div>

              {/* Bottom Bar: Status Pill + Mini QR */}
              <div className="mt-2.5 md:mt-3.5 pt-2.5 border-t border-[rgba(27,24,21,0.08)] flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 md:py-1 rounded-full bg-[#f4f1eb] border border-[rgba(27,24,21,0.08)]">
                  <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                    <span className="animate-status-ring absolute inline-flex h-full w-full rounded-full bg-[#4a9f6e] opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-[#4a9f6e]" />
                  </span>
                  <span className="font-mono text-[7.5px] md:text-[8.5px] tracking-[0.14em] text-[#1b1815] font-medium uppercase whitespace-nowrap">
                    {content.hero.badge.status}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded bg-white p-0.5 border border-[rgba(27,24,21,0.12)]">
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
                      <rect x="14" y="14" width="4" height="4" />
                      <rect x="20" y="20" width="3" height="4" />
                    </svg>
                  </div>
                  <span className="font-mono text-[7.5px] md:text-[8.5px] tracking-[0.16em] text-[#726a60] uppercase">
                    {content.hero.badge.serial}
                  </span>
                </div>
              </div>
            </>
          ) : (
            /* STATE B: Contact Pass Mode (When scrolled to Contact Section) */
            <div className="flex flex-col text-left">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(27,24,21,0.08)]">
                <span className="font-mono text-[9.5px] tracking-[0.2em] font-medium text-[#1c3a94] uppercase">
                  {content.contact.badgeTitle}
                </span>
                <span className="font-mono text-[8.5px] tracking-[0.16em] text-[#726a60] uppercase">
                  OFFICIAL PASS
                </span>
              </div>

              {/* Name & Role */}
              <div className="text-center my-4">
                <h3 className="font-serif text-2xl font-light text-[#1b1815] tracking-[0.14em] uppercase">
                  {content.contact.name}
                </h3>
                <p className="font-mono text-[9px] tracking-[0.18em] text-[#726a60] uppercase mt-0.5">
                  {content.contact.role}
                </p>
              </div>

              {/* Interactive Contact Rows */}
              <div className="flex flex-col border-t border-[rgba(27,24,21,0.08)]">
                {/* Email Row */}
                <div
                  onClick={handleCopyEmail}
                  className="flex items-center justify-between py-2.5 border-b border-[rgba(27,24,21,0.08)] cursor-pointer hover:bg-white/50 px-1 rounded transition-colors"
                >
                  <div>
                    <span className="font-mono text-[8px] tracking-[0.16em] text-[#726a60] uppercase block">
                      DIRECT EMAIL
                    </span>
                    <span className="font-serif text-sm text-[#1b1815] hover:text-[#1c3a94]">
                      {content.contact.email}
                    </span>
                  </div>
                  <span className="w-6 h-6 rounded-full bg-white border border-[rgba(27,24,21,0.1)] flex items-center justify-center text-[#1c3a94] shadow-xs">
                    {copied ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4a9f6e" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                    )}
                  </span>
                </div>

                {/* WhatsApp Row */}
                {content.contact.socials
                  .filter((s) => s.icon === "message-circle")
                  .map((wa) => (
                    <a
                      key={wa.label}
                      href={wa.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-2.5 border-b border-[rgba(27,24,21,0.08)] hover:bg-white/50 px-1 rounded transition-colors"
                    >
                      <div>
                        <span className="font-mono text-[8px] tracking-[0.16em] text-[#726a60] uppercase block">
                          WHATSAPP CHAT
                        </span>
                        <span className="font-serif text-sm text-[#1b1815] hover:text-[#1c3a94]">
                          {wa.value}
                        </span>
                      </div>
                      <span className="w-6 h-6 rounded-full bg-white border border-[rgba(27,24,21,0.1)] flex items-center justify-center text-[#1c3a94] shadow-xs">
                        ↗
                      </span>
                    </a>
                  ))}

                {/* Instagram Row */}
                {content.contact.socials
                  .filter((s) => s.icon === "instagram")
                  .map((ig) => (
                    <a
                      key={ig.label}
                      href={ig.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-2.5 border-b border-[rgba(27,24,21,0.08)] hover:bg-white/50 px-1 rounded transition-colors"
                    >
                      <div>
                        <span className="font-mono text-[8px] tracking-[0.16em] text-[#726a60] uppercase block">
                          INSTAGRAM PROFILE
                        </span>
                        <span className="font-serif text-sm text-[#1b1815] hover:text-[#1c3a94]">
                          {ig.value}
                        </span>
                      </div>
                      <span className="w-6 h-6 rounded-full bg-white border border-[rgba(27,24,21,0.1)] flex items-center justify-center text-[#1c3a94] shadow-xs">
                        ↗
                      </span>
                    </a>
                  ))}

                {/* Media Kit Download */}
                {content.contact.socials
                  .filter((s) => s.icon === "download")
                  .map((mk) => (
                    <a
                      key={mk.label}
                      href={mk.href}
                      onClick={handleDownload}
                      className="flex items-center justify-between py-2.5 border-b border-[rgba(27,24,21,0.08)] hover:bg-white/50 px-1 rounded transition-colors"
                    >
                      <div>
                        <span className="font-mono text-[8px] tracking-[0.16em] text-[#726a60] uppercase block">
                          MEDIA KIT
                        </span>
                        <span className="font-serif text-sm text-[#1b1815] hover:text-[#1c3a94]">
                          {mk.value}
                        </span>
                      </div>
                      <span
                        className={`w-6 h-6 rounded-full bg-white border border-[rgba(27,24,21,0.1)] flex items-center justify-center text-[#1c3a94] shadow-xs ${
                          downloadBouncing ? "animate-bounce" : ""
                        }`}
                      >
                        ↓
                      </span>
                    </a>
                  ))}
              </div>

              {/* Bottom QR Block */}
              <div className="mt-4 pt-2.5 flex items-center justify-between">
                <div className="w-11 h-11 rounded bg-white p-1 border border-white shadow-xs">
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
                    <rect x="14" y="14" width="4" height="4" />
                    <rect x="20" y="20" width="3" height="4" />
                  </svg>
                </div>
                <div className="text-right">
                  <span className="font-serif italic text-xs text-[#1b1815] block">
                    {content.contact.qrPrompt}
                  </span>
                  <span className="font-mono text-[7.5px] tracking-[0.16em] text-[#726a60] uppercase">
                    ENCRYPTED VCARD PASS
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
