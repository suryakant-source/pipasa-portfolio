"use client";

import React from "react";
import DustParticles from "./DustParticles";

export default function BackgroundRoom() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* 1. Base Paper Color */}
      <div className="absolute inset-0 bg-[#f4f1eb]" />

      {/* Floating Dust Particles Canvas */}
      <DustParticles />

      {/* 2. Soft Skewed Window-Light Panes */}
      <div
        className="absolute -top-[12%] right-[5%] w-[680px] h-[780px] opacity-45 transform -rotate-[16deg] skew-x-[-12deg] pointer-events-none blur-[48px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,250,240,0.6) 40%, rgba(244,241,235,0) 80%)",
        }}
      />
      <div
        className="absolute top-[2%] right-[18%] w-[380px] h-[520px] opacity-35 transform -rotate-[14deg] skew-x-[-8deg] pointer-events-none blur-[36px]"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(250,246,238,0.3) 50%, rgba(244,241,235,0) 85%)",
        }}
      />

      {/* 3. Soft Leaf-Shadow Layer (Olive Branch with Ambient Wind Sway) */}
      <div className="absolute -top-10 -right-6 w-[340px] md:w-[480px] h-[360px] md:h-[500px] opacity-[0.14] pointer-events-none animate-leaf-sway filter blur-[3.5px]">
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#1b1815]"
        >
          {/* Main olive branch stem */}
          <path
            d="M390 10 C320 80 230 150 140 280 C90 350 50 390 10 400"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Secondary branchlet */}
          <path
            d="M260 125 C200 160 170 210 130 250"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Leaves along branch */}
          <path
            d="M360 45 C340 30 320 40 310 65 C325 70 350 65 360 45 Z"
            fill="currentColor"
          />
          <path
            d="M340 85 C310 75 295 95 300 115 C320 115 335 105 340 85 Z"
            fill="currentColor"
          />
          <path
            d="M305 100 C275 80 260 100 270 120 C285 125 300 115 305 100 Z"
            fill="currentColor"
          />
          <path
            d="M280 145 C250 130 230 150 240 175 C260 175 275 160 280 145 Z"
            fill="currentColor"
          />
          <path
            d="M240 170 C210 150 190 175 200 195 C220 200 235 185 240 170 Z"
            fill="currentColor"
          />
          <path
            d="M210 215 C175 195 155 220 170 245 C190 245 205 230 210 215 Z"
            fill="currentColor"
          />
          <path
            d="M175 240 C140 220 120 245 135 270 C155 270 170 255 175 240 Z"
            fill="currentColor"
          />
          <path
            d="M140 290 C105 270 85 295 100 320 C120 320 135 305 140 290 Z"
            fill="currentColor"
          />
          <path
            d="M95 330 C65 315 45 340 60 365 C80 365 90 350 95 330 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* 4. Big Faint Concentric Circle Arcs (Curved Room Architecture) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id="arcGlow"
            cx="65%"
            cy="35%"
            r="65%"
            fx="65%"
            fy="35%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#1b1815" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#1b1815" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Concentric arcs centered towards upper right quadrant */}
        <g stroke="rgba(27,24,21,0.07)" strokeWidth="1" fill="none">
          <circle cx="68%" cy="32%" r="280" />
          <circle cx="68%" cy="32%" r="480" />
          <circle cx="68%" cy="32%" r="720" />
          <circle cx="68%" cy="32%" r="1020" />
          <circle cx="68%" cy="32%" r="1360" />
        </g>

        {/* Highlight inner arc segment for tactile depth */}
        <path
          d="M 500,80 A 720,720 0 0,1 1500,450"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.25"
          fill="none"
        />
        <path
          d="M 380,240 A 1020,1020 0 0,1 1650,850"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* 5. Tiling Paper-Grain Noise Overlay */}
      <div className="absolute inset-0 paper-noise-pattern opacity-90 pointer-events-none" />
    </div>
  );
}
