import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { strengthsData } from "../../data/strengthsData";
import SectionBadge from "../ui/SectionBadge";
import HandDrawnUnderline from "../decorative/HandDrawnUnderline";
import { HandwrittenBadge } from "../decorative/DoodleCard";
import { OrangeSectionRightWave } from "../decorative/OrangeShapes";

import { useGsapScope } from "../../animation/useGsapScope";

gsap.registerPlugin(ScrollTrigger);

export default function WhatDrivesMePinned() {
  const pinContainerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useGsapScope(pinContainerRef, () => {
    const mm = gsap.matchMedia();

    // Desktop: Pinned 4-step sequence (disabled if reduced motion)
    mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
      const pinEl = pinContainerRef.current;
      if (!pinEl) return;

      const totalSteps = strengthsData.length;

      ScrollTrigger.create({
        trigger: pinEl,
        start: "top top",
        end: `+=${totalSteps * 800}`,
        pin: true,
        scrub: 0.5,
        snap: {
          snapTo: 1 / (totalSteps - 1),
          duration: { min: 0.2, max: 0.5 },
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const stepIndex = Math.min(
            totalSteps - 1,
            Math.floor(progress * totalSteps)
          );
          setActiveStep(stepIndex);
        },
      });
    });
  }, []);

  const current = strengthsData[activeStep] || strengthsData[0];
  const progressPercent = ((activeStep + 1) / strengthsData.length) * 100;

  return (
    <section
      id="strengths"
      ref={pinContainerRef}
      className="ab-strengths-section relative z-10 w-full min-h-screen bg-[#FAF8F5] text-[#111111] overflow-hidden select-none flex flex-col justify-between py-16 sm:py-20 lg:py-24 scroll-mt-28"
    >
      {/* ── Seamless Organic Orange Wave Accent on Right Side (Smooth top & bottom curve, no cut edges) ── */}
      <OrangeSectionRightWave />

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 relative z-10 flex-1 flex flex-col justify-between">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/8 pb-6">
          <div>
            <SectionBadge label="How I work" className="mb-2" />
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="font-black italic uppercase text-2xl sm:text-3xl lg:text-4xl tracking-[-0.03em] leading-tight text-[#111111]">
                WHAT DRIVES{" "}
                <span className="relative inline-block text-[#FF7700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.32)]">
                  ME.
                  <HandDrawnUnderline className="absolute -bottom-1 left-0 w-full" color="#FF8A00" />
                </span>
              </h2>
              <HandwrittenBadge
                text="Scroll to cycle through"
                direction="curved-right"
                rotation="-rotate-6"
                className="hidden sm:inline-flex"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-[#777777]">
            <span>Step</span>
            <span className="text-[#FF7700] font-black text-base drop-shadow-xs">
              {activeStep + 1}
            </span>
            <span>of {strengthsData.length}</span>
          </div>
        </div>

        {/* ── DESKTOP PINNED VIEW ── */}
        <div className="hidden md:grid grid-cols-12 gap-10 md:gap-14 lg:gap-20 xl:gap-28 items-center my-auto py-8">
          {/* Left: Big Number + Progress Line with generous spacing */}
          <div className="col-span-4 lg:col-span-3 flex items-start gap-8 sm:gap-10 lg:gap-12">
            <div className="relative h-64 w-1.5 bg-black/10 rounded-full overflow-hidden shrink-0 mt-3">
              <div
                className="w-full bg-[#FF8A00] transition-all duration-500 ease-out rounded-full shadow-[0_0_12px_rgba(255,138,0,0.8)]"
                style={{ height: `${progressPercent}%` }}
              />
            </div>
            <div className="ml-2 sm:ml-4">
              <span className="font-black italic text-7xl sm:text-8xl lg:text-9xl text-[#111111] tracking-tight block leading-none">
                {current.num}
              </span>
            </div>
          </div>

          {/* Right: Screen-Filling Typography + Human Headline & Manifesto */}
          <div className="col-span-8 lg:col-span-9 flex flex-col justify-center">
            <span className="text-sm font-bold text-[#FF7700] tracking-wide mb-3 block drop-shadow-xs">
              {current.subtitle}
            </span>

            <h3
              key={current.title}
              className="font-black italic uppercase leading-[0.9] tracking-[-0.04em] text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#111111] mb-6 transition-opacity duration-300"
            >
              {current.title}
            </h3>

            <p
              key={current.manifesto}
              className="text-[#4B5563] text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl font-normal mt-4 sm:mt-6 transition-opacity duration-300"
            >
              {current.manifesto}
            </p>
          </div>
        </div>

        {/* ── MOBILE SCROLL LIST (Simplified, non-pinned) ── */}
        <div className="md:hidden flex flex-col gap-12 my-8">
          {strengthsData.map((step) => (
            <div key={step.num} className="flex gap-6 items-start pt-6 border-t border-black/8">
              {/* Left Line + Number */}
              <div className="flex items-start gap-4 shrink-0">
                <div className="relative h-16 w-1.5 bg-black/10 rounded-full overflow-hidden shrink-0 mt-1">
                  <div className="w-full h-full bg-[#FF8A00] rounded-full" />
                </div>
                <span className="font-black italic text-4xl text-[#FF7700] leading-none ml-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                  {step.num}
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-2 pl-2">
                <span className="text-xs font-semibold text-[#888888]">
                  {step.subtitle}
                </span>
                <h3 className="font-black italic uppercase text-2xl text-[#111111] leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed font-normal mt-3">
                  {step.manifesto}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom indicator hint */}
        <div className="hidden md:flex items-center justify-between pt-6 border-t border-black/8 text-xs font-medium text-[#888888]">
          <span>Keep scrolling to view principles</span>
          <span>Quality standards for every project</span>
        </div>
      </div>
    </section>
  );
}
