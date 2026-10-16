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
  const startTimeRef = useRef<number>(0);
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

    let heroX = isMobile ? width * 0.5 : width * 0.72;
    let heroY = isMobile ? (isSmallMobile ? 210 : 230) : height * 0.44;
    if (heroSlot) {
      const rect = heroSlot.getBoundingClientRect();
      heroX = rect.left + rect.width / 2;
      if (rect.top > -400 && rect.top < height * 1.5) {
        heroY = rect.top + rect.height / 2;
      }
    }

    let aboutX = isMobile ? width * 0.5 : width * 0.25;
    let aboutY = isMobile ? height * 0.38 : height * 0.5;
    if (aboutSlot) {
      const rect = aboutSlot.getBoundingClientRect();
      aboutX = rect.left + rect.width / 2;
      if (rect.top > -400 && rect.top < height * 1.5) {
        aboutY = rect.top + rect.height / 2;
      }
    }

    const heroTarget = {
      x: heroX,
      y: heroY,
      scale: isMobile ? (isSmallMobile ? 0.84 : 0.88) : 1.0,
      rotation: 1.2,
      ropeAlpha: 1.0,
      section: "hero" as const,
    };

    const aboutTarget = {
      x: aboutX,
      y: aboutY,
      scale: isMobile ? (isSmallMobile ? 0.78 : 0.84) : 0.94,
      rotation: 0,
      ropeAlpha: 0, // In laser scanner frame, rope fades out for clean inspection
      section: "about" as const,
    };

    // Calculate progression from the 2500px Identity ScrollTrigger
    const st = ScrollTrigger.getById("identity-check");
    let target: BadgePosition;

    if (!st || window.scrollY < st.start) {
      // User is in Section 00: Hero
      const scrollRatio = st ? Math.max(0, Math.min(1, window.scrollY / Math.max(1, st.start))) : 0;
      target = {
        x: gsap.utils.interpolate(heroTarget.x, aboutTarget.x, scrollRatio * 0.15),
        y: gsap.utils.interpolate(heroTarget.y, aboutTarget.y, scrollRatio * 0.15),
        scale: gsap.utils.interpolate(heroTarget.scale, aboutTarget.scale, scrollRatio * 0.15),
        rotation: gsap.utils.interpolate(heroTarget.rotation, aboutTarget.rotation, scrollRatio * 0.15),
        ropeAlpha: 1.0,
        section: "hero",
      };
    } else if (window.scrollY <= st.end) {
      // User is inside the 2500px pinned Identity Check scan
      const p = st.progress; // 0.0 to 1.0
      if (p <= 0.28) {
        // Badge flight into scanner frame
        const fp = p / 0.28;
        target = {
          x: gsap.utils.interpolate(heroTarget.x, aboutTarget.x, fp),
          y: gsap.utils.interpolate(heroTarget.y, aboutTarget.y, fp),
          scale: gsap.utils.interpolate(heroTarget.scale, aboutTarget.scale, fp),
          rotation: gsap.utils.interpolate(heroTarget.rotation, aboutTarget.rotation, fp),
          ropeAlpha: gsap.utils.interpolate(1.0, 0, fp),
          section: "about",
        };
      } else {
        // Locked inside scanner frame while scan & facts reveal
        target = {
          ...aboutTarget,
          section: "about",
        };
      }
    } else {
      // User scrolled past Identity Check (Section 02 Selected Work and onwards)
      // Hide badge completely so it NEVER overlaps Work or Process cards!
      target = {
        x: aboutTarget.x,
        y: -999,
        scale: 0.8,
        rotation: 0,
        ropeAlpha: 0,
        section: "about",
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

    startTimeRef.current = performance.now();
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
      if (!badge || window.innerWidth < 768) return;
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

      const now = performance.now();
      const elapsed = startTimeRef.current > 0 ? (now - startTimeRef.current) / 1000 : 0;

      // 1. Damped pendulum drop oscillation on load (~1.5s)
      const dropOscillation = prefersReducedMotion || elapsed > 2.2
        ? 0
        : Math.sin(elapsed * 7.2) * Math.exp(-elapsed * 2.2) * 8.5;

      // 2. Idle lanyard sway (9s cycle, +-1.6deg)
      const idleSway = prefersReducedMotion || target.section !== "hero"
        ? 0
        : Math.sin((elapsed * 2 * Math.PI) / 9) * 1.6;

      // 3. Swivel clip rock (3.1s cycle, +-5deg)
      const clipRock = prefersReducedMotion || target.section !== "hero"
        ? 0
        : Math.sin((elapsed * 2 * Math.PI) / 3.1) * 5.0;

      // 4. Pointer motion reaction
      const pointerSwing = prefersReducedMotion ? 0 : tilt.y * 0.35;

      // 5. Spring physics for drag offset
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

      // 6. Smoothly interpolate position towards target + drag offset
      const lerpFactor = prefersReducedMotion ? 0.35 : isMobile ? 0.16 : 0.14;
      current.x += (target.x + drag.offsetX - current.x) * lerpFactor;
      current.y += (target.y + drag.offsetY - current.y) * lerpFactor;
      current.scale += (target.scale - current.scale) * lerpFactor;
      current.ropeAlpha += (target.ropeAlpha - current.ropeAlpha) * lerpFactor;

      // 7. Smooth tilt
      tilt.x += (tilt.targetX - tilt.x) * 0.12;
      tilt.y += (tilt.targetY - tilt.y) * 0.12;

      // 8. Calculate dynamic card swing from velocity & displacement
      const targetSwing = prefersReducedMotion
        ? 0
        : Math.max(-18, Math.min(18, drag.offsetX * 0.08 + drag.vx * 1.2));
      current.swingAngle += (targetSwing - current.swingAngle) * 0.1;

      // Combined total rotation angle
      const totalRot =
        target.rotation +
        dropOscillation +
        idleSway +
        pointerSwing +
        current.swingAngle;
      const rotRad = (totalRot * Math.PI) / 180;

      // 9. Update Rope Physics (Verlet Simulation)
      const nodes = nodesRef.current;
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

        // Distance constraint relaxation
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

      // 10. Draw Canvas Rope
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

            // Outer subtle drop shadow
            ctx.strokeStyle = "rgba(27, 24, 21, 0.16)";
            ctx.lineWidth = 5.2 * current.scale;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();

            // Clean crisp white braided cord
            ctx.strokeStyle = "rgba(255, 255, 255, 0.98)";
            ctx.lineWidth = 3.6 * current.scale;
            ctx.stroke();

            // Inner faint woven thread line
            ctx.strokeStyle = "rgba(230, 224, 212, 0.75)";
            ctx.lineWidth = 1.2 * current.scale;
            ctx.stroke();

            // Metallic swivel ring & clasp at bottom node
            const clip = nodes[nodes.length - 1];
            ctx.save();
            ctx.translate(clip.x, clip.y);
            const claspRockRad = rotRad + ((clipRock * Math.PI) / 180);
            ctx.rotate(claspRockRad);

            // Ring
            ctx.beginPath();
            ctx.arc(0, 5 * current.scale, 5.5 * current.scale, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
            ctx.fill();
            ctx.strokeStyle = "#8c857b";
            ctx.lineWidth = 1.6 * current.scale;
            ctx.stroke();

            // Buckle rectangle
            ctx.fillStyle = "#e8e5df";
            ctx.strokeStyle = "#5d564e";
            ctx.lineWidth = 1.4 * current.scale;
            ctx.fillRect(
              -6 * current.scale,
              -5 * current.scale,
              12 * current.scale,
              6 * current.scale
            );
            ctx.strokeRect(
              -6 * current.scale,
              -5 * current.scale,
              12 * current.scale,
              6 * current.scale
            );
            ctx.restore();
            ctx.restore();
          }
        }
      }

      // 11. Update DOM Badge transform & scroll visibility
      const badge = badgeRef.current;
      if (badge) {
        const st = ScrollTrigger.getById("identity-check");
        const isPastAbout = st && window.scrollY > st.end + 50;
        if (isPastAbout) {
          badge.style.opacity = "0";
          badge.style.pointerEvents = "none";
        } else {
          badge.style.opacity = "1";
          badge.style.pointerEvents = "auto";
        }
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
        className="pointer-events-none fixed inset-0 z-[22] w-full h-full select-none"
      />

      {/* Single Persistent Interactive Badge */}
      <div
        ref={badgeRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="fixed top-0 left-0 z-[25] touch-none cursor-grab active:cursor-grabbing select-none will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1200px",
        }}
      >
        {/* Acrylic Card Shell */}
        <div
          className="relative w-[230px] sm:w-[280px] md:w-[330px] rounded-[18px] p-4 sm:p-5 md:p-6 transition-colors duration-500 ease-out border border-white/85 shadow-[0_25px_50px_-12px_rgba(27,24,21,0.18),0_8px_24px_-4px_rgba(27,24,21,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)] backdrop-blur-[18px] bg-gradient-to-b from-white/88 to-[#f8f6f2]/75"
        >
          {/* Paper texture overlay */}
          <div className="absolute inset-0 rounded-[18px] paper-noise-pattern opacity-40 pointer-events-none" />

          {/* Punch Slot for clip ring */}
          <div className="mx-auto -mt-1 md:-mt-2 mb-3 md:mb-4 w-8 md:w-9 h-2 md:h-2.5 rounded-full bg-[#3d3832]/80 border border-white/40 shadow-inner" />

          {/* Studio Pass Card Face */}
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

            {/* Bottom Bar: Status Pill + Real WhatsApp QR */}
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
                <a
                  href="https://wa.me/916371151811"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 md:w-8 md:h-8 rounded bg-white p-0.5 border border-[rgba(27,24,21,0.12)] overflow-hidden transition-transform hover:scale-105"
                  title="Scan or click to message on WhatsApp"
                >
                  <img
                    src="/whatsapp-qr.svg"
                    alt="WhatsApp QR Code"
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                </a>
                <span className="font-mono text-[7.5px] md:text-[8.5px] tracking-[0.16em] text-[#726a60] uppercase">
                  {content.hero.badge.serial}
                </span>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
}
