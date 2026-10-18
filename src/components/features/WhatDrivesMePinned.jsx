import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { strengthsData } from "../../data/strengthsData";
import SectionBadge from "../ui/SectionBadge";
import HandDrawnUnderline from "../decorative/HandDrawnUnderline";
import { HandwrittenBadge } from "../decorative/DoodleCard";
import { BrandSectionRightWave } from "../decorative/BrandShapes";
import { useGsapScope } from "../../animation/useGsapScope";

gsap.registerPlugin(ScrollTrigger);

const principleMeta = [
  { short: "Clean Code", label: "Architecture & Speed", icon: Code2 },
  { short: "Responsive", label: "Universal Responsiveness", icon: Smartphone },
  { short: "Precision", label: "Reliability & Polish", icon: ShieldCheck },
  { short: "Real Results", label: "Business Impact", icon: TrendingUp },
];

export default function WhatDrivesMePinned() {
  const pinContainerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useGsapScope(pinContainerRef, () => {
    const mm = gsap.matchMedia();

    // Desktop: Pinned 4-step sequence (disabled if reduced motion)
    mm.add(
      "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
      () => {
        const pinEl = pinContainerRef.current;
        if (!pinEl) return;

        const totalSteps = strengthsData.length;

        ScrollTrigger.create({
          trigger: pinEl,
          start: "top top",
          end: `+=${totalSteps * 750}`,
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
              Math.floor(progress * totalSteps),
            );
            setActiveStep(stepIndex);
          },
        });
      },
    );
  }, []);

  const current = strengthsData[activeStep] || strengthsData[0];
  const meta = principleMeta[activeStep] || principleMeta[0];
  const CurrentIcon = meta.icon;
  const progressPercent = ((activeStep + 1) / strengthsData.length) * 100;

  const handlePrev = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : strengthsData.length - 1));
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev < strengthsData.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="strengths"
      ref={pinContainerRef}
      className="ab-strengths-section relative z-10 w-full min-h-screen bg-[#FAF8F5] text-[#111111] overflow-hidden select-none flex flex-col justify-between py-14 sm:py-18 lg:py-22 scroll-mt-28"
    >
      {/* ── Seamless Organic Brand Wave Accent on Right Side ── */}
      <BrandSectionRightWave />

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 relative z-10 flex-1 flex flex-col justify-between gap-8 sm:gap-12">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/8 pb-6">
          <div>
            <SectionBadge label="Work Philosophy & Standards" className="mb-2.5" />
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="font-black italic uppercase text-2xl sm:text-3xl lg:text-4xl tracking-[-0.03em] leading-tight text-[#111111]">
                WHAT DRIVES{" "}
                <span className="relative inline-block text-brand-dark drop-shadow-[0_2px_4px_rgba(0,0,0,0.32)]">
                  ME.
                  <HandDrawnUnderline
                    className="absolute -bottom-1 left-0 w-full"
                    color="var(--brand-primary)"
                  />
                </span>
              </h2>
              <span className="hidden md:inline-flex">
                <HandwrittenBadge
                  text="Scroll or click to switch"
                  direction="curved-right"
                  rotation="-rotate-6"
                />
              </span>
            </div>
          </div>
        </div>

        {/* ── INTERACTIVE PILL BUTTONS (Category Navigation with Lucide SVG Icons) ── */}
        <div className="hidden md:flex items-center gap-2 sm:gap-3 flex-wrap bg-white/50 backdrop-blur-xl p-1.5 rounded-2xl sm:rounded-full border border-black/7 shadow-2xs w-fit">
          {strengthsData.map((step, idx) => {
            const active = activeStep === idx;
            const pMeta = principleMeta[idx];
            const StepIcon = pMeta.icon;
            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  active
                    ? "bg-[#111111] text-white shadow-md shadow-black/20 ring-1 ring-white/10 scale-[1.02]"
                    : "text-[#666666] hover:text-[#111111] hover:bg-white/80"
                }`}
              >
                <StepIcon
                  className={`w-3.5 h-3.5 ${
                    active ? "text-brand" : "text-[#888888]"
                  }`}
                />
                <span
                  className={`font-mono text-[11px] px-1.5 py-0.5 rounded-md ${
                    active
                      ? "bg-brand text-white font-black"
                      : "bg-black/6 text-[#777777]"
                  }`}
                >
                  {step.num}
                </span>
                <span>{pMeta.short}</span>
              </button>
            );
          })}
        </div>

        {/* ── DESKTOP PINNED VIEW (OPEN EDITORIAL TYPOGRAPHY - NO CARD) ── */}
        <div className="hidden md:grid grid-cols-12 gap-10 lg:gap-16 xl:gap-24 items-center my-auto py-4">
          {/* Left Column: Big Number + Vertical Glowing Progress Indicator */}
          <div className="col-span-4 lg:col-span-3 flex items-start gap-8 lg:gap-10">
            {/* Vertical Progress Bar */}
            <div className="relative h-60 lg:h-72 w-2 bg-black/8 rounded-full overflow-hidden shrink-0 mt-3">
              <div
                className="w-full bg-gradient-to-b from-brand-light to-brand-deep transition-all duration-500 ease-out rounded-full shadow-[0_0_14px_rgba(var(--brand-rgb),0.85)]"
                style={{ height: `${progressPercent}%` }}
              />
            </div>

            {/* Giant Editorial Number */}
            <div className="flex flex-col">
              <span className="font-black italic text-7xl sm:text-8xl lg:text-9xl text-[#111111] tracking-tight block leading-none select-none">
                {current.num}
              </span>
              <span className="text-xs font-bold text-[#888888] uppercase tracking-wider mt-3">
                Standard 0{activeStep + 1}
              </span>
            </div>
          </div>

          {/* Right Column: Screen-Filling Typography & Manifesto */}
          <div className="col-span-8 lg:col-span-9 flex flex-col justify-center">
            {/* Category Tag with Lucide SVG Icon */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/12 border border-brand/25 text-xs font-bold text-brand-dark">
                <CurrentIcon className="w-3.5 h-3.5 text-brand-dark" />
                <span>{meta.label}</span>
              </span>
              <span className="text-sm font-semibold text-[#888888]">
                &bull; {current.subtitle}
              </span>
            </div>

            {/* Headline */}
            <h3
              key={current.title}
              className="font-black italic uppercase leading-[0.92] tracking-[-0.04em] text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#111111] mb-6 transition-opacity duration-300"
            >
              {current.title}
            </h3>

            {/* Manifesto */}
            <p
              key={current.manifesto}
              className="text-[#4B5563] text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-2xl font-normal transition-opacity duration-300"
            >
              {current.manifesto}
            </p>

            {/* Controls */}
            <div className="mt-8 pt-6 border-t border-black/8 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous principle"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 hover:bg-[#111111] text-[#111111] hover:text-white border border-black/10 text-xs font-bold transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next principle"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] hover:bg-brand text-white hover:text-[#111111] text-xs font-bold transition-all duration-200 shadow-sm hover:shadow-[0_4px_16px_rgba(var(--brand-rgb),0.35)] hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Next principle</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              <span className="text-xs font-semibold text-[#888888] flex items-center gap-1.5">
                {/* <Sparkles className="w-3.5 h-3.5 text-brand-dark" /> */}
                Zero fluff &bull; Clean craftsmanship
              </span>
            </div>
          </div>
        </div>

        {/* ── MOBILE VIEW (OPEN EDITORIAL LIST - NO CARD) ── */}
        <div className="md:hidden flex flex-col gap-3 my-6">
          {strengthsData.map((step, idx) => {
            const pMeta = principleMeta[idx];
            const StepIcon = pMeta.icon;
            return (
              <div
                key={step.num}
                className="group flex gap-3 items-start rounded-2xl border border-black/8 bg-white/60 p-4 shadow-[0_6px_18px_rgba(0,0,0,0.035)] transition-colors hover:border-brand/25"
              >
                {/* Left Line + Number */}
                <div className="flex items-start gap-3 shrink-0">
                  <div className="relative h-14 w-1 bg-brand/15 rounded-full overflow-hidden shrink-0 mt-1">
                    <div className="w-full h-full bg-brand rounded-full" />
                  </div>
                  <span className="font-black italic text-3xl text-brand-dark leading-none">
                    {step.num}
                  </span>
                </div>

                {/* Right Content */}
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark">
                    <StepIcon className="w-3.5 h-3.5 text-brand-dark" />
                    <span>{pMeta.label}</span>
                  </div>

                  <span className="text-xs font-semibold text-[#888888]">
                    {step.subtitle}
                  </span>

                  <h3 className="font-black italic uppercase text-xl text-[#111111] leading-tight mt-1">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#4B5563] leading-relaxed font-normal mt-2">
                    {step.manifesto}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Indicator Hint */}
        <div className="hidden md:flex items-center justify-between pt-4 border-t border-black/8 text-xs font-medium text-[#888888]">
          <span>Scroll to cycle through principles</span>
          <span>Quality standards for every client project</span>
        </div>
      </div>
    </section>
  );
}
