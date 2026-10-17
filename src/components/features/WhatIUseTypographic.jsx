import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { techStackData } from "../../data/techData.jsx";
import SectionBadge from "../ui/SectionBadge";
import HandDrawnUnderline from "../decorative/HandDrawnUnderline";
import { HandwrittenBadge } from "../decorative/DoodleCard";
import { useGsapScope } from "../../animation/useGsapScope";
import { ANIM } from "../../animation/config";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Tab icons ---------- */

const AllIcon = (
  <svg
    className="w-3.5 h-3.5"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="5" height="5" rx="1.2" />
    <rect x="9" y="2" width="5" height="5" rx="1.2" />
    <rect x="2" y="9" width="5" height="5" rx="1.2" />
    <rect x="9" y="9" width="5" height="5" rx="1.2" />
  </svg>
);

const FrontendIcon = (
  <svg
    className="w-3.5 h-3.5"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5.5 4L1.5 8l4 4M10.5 4l4 4-4 4" />
  </svg>
);

const BackendIcon = (
  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" aria-hidden="true">
    <path
      fill="currentColor"
      d="M14 11a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zM3 12a1 1 0 1 0 0 2a1 1 0 0 0 0-2m3 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8-6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM3 7a1 1 0 1 0 0 2a1 1 0 0 0 0-2m3 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8-6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM3 2a1 1 0 1 0 0 2a1 1 0 0 0 0-2m3 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2"
    />
  </svg>
);

const WorkflowIcon = (
  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M2 4.5h7M12 4.5h2M2 11.5h2M7 11.5h7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="10.5" cy="4.5" r="1.7" fill="currentColor" />
    <circle cx="5.5" cy="11.5" r="1.7" fill="currentColor" />
  </svg>
);

const TABS = [
  { id: "all", label: "All tools", icon: AllIcon },
  { id: "frontend", label: "Frontend", icon: FrontendIcon },
  { id: "backend", label: "Backend", icon: BackendIcon },
  { id: "tools", label: "Workflow", icon: WorkflowIcon },
];

export default function WhatIUseTypographic() {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeHoverId, setActiveHoverId] = useState(
    techStackData[0]?.id || "react",
  );

  const filteredTech = techStackData.filter((t) =>
    activeFilter === "all" ? true : t.category === activeFilter,
  );

  // Har tab me kitne tools hain
  const getCount = (tabId) =>
    tabId === "all"
      ? techStackData.length
      : techStackData.filter((t) => t.category === tabId).length;

  // Filter badalne par agar active tool naye filter me nahi hai to pehla tool active karo
  useEffect(() => {
    if (!filteredTech.some((t) => t.id === activeHoverId) && filteredTech[0]) {
      setActiveHoverId(filteredTech[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  // Rows ka scroll-reveal (filter badalne par dobara chalta hai)
  useGsapScope(containerRef, () => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const rows = gsap.utils.toArray(".wiu-row");
      if (rows.length > 0) {
        gsap.fromTo(
          rows,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            duration: ANIM.DURATION.fast + 0.1,
            ease: ANIM.EASE,
            clearProps: "transform",
            scrollTrigger: {
              trigger: containerRef.current,
              start: ANIM.SCROLL_START,
              once: true,
            },
          },
        );
      }
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".wiu-row", { opacity: 1, y: 0, clearProps: "all" });
    });
  }, [activeFilter]);

  return (
    <section
      id="tools"
      ref={containerRef}
      className="ab-tech-section relative z-10 pt-20 sm:pt-28 pb-24 sm:pb-36 overflow-hidden select-none bg-[#FAF8F5] scroll-mt-28"
    >
      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand/5 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-light/4 blur-[80px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* ── Section Header ── */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/8 pb-6">
            <div>
              <SectionBadge label="Tools I use daily" className="mb-2.5" />
              <div className="flex items-center gap-4 flex-wrap">
                <h2 className="font-black italic uppercase text-2xl sm:text-3xl lg:text-4xl tracking-[-0.03em] leading-tight text-[#111111]">
                  <span>WHAT I </span>
                  <span className="relative inline-block text-brand-dark drop-shadow-[0_2px_4px_rgba(0,0,0,0.32)]">
                    WORK WITH.
                    <HandDrawnUnderline
                      className="absolute -bottom-1 left-0 w-full"
                      color="var(--brand-primary)"
                    />
                  </span>
                </h2>
                <HandwrittenBadge
                  text="Daily tools"
                  direction="curved-right"
                  rotation="-rotate-6"
                  className="hidden sm:inline-flex"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── INTERACTIVE PILL BUTTONS (Category Navigation styled & positioned like What Drives Me) ── */}
        <div className="mb-8 sm:mb-10 flex items-center gap-2 sm:gap-3 flex-wrap bg-white/50 backdrop-blur-xl p-1.5 rounded-2xl sm:rounded-full border border-black/7 shadow-2xs w-fit">
          {TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#111111] text-white shadow-md shadow-black/20 ring-1 ring-white/10 scale-[1.02]"
                    : "text-[#666666] hover:text-[#111111] hover:bg-white/80"
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 flex items-center justify-center ${
                    isActive ? "text-brand" : "text-[#888888]"
                  }`}
                >
                  {tab.icon}
                </span>
                <span
                  className={`font-mono text-[11px] px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? "bg-brand text-white font-black"
                      : "bg-black/6 text-[#777777]"
                  }`}
                >
                  {String(getCount(tab.id)).padStart(2, "0")}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Tools List ── */}
        <div className="wiu-list flex flex-col gap-1.5">
          {filteredTech.map((tech, idx) => {
            const isActive = activeHoverId === tech.id;
            return (
              <div key={tech.id} data-id={tech.id} className="wiu-row">
                <div
                  onMouseEnter={() => setActiveHoverId(tech.id)}
                  onClick={() => setActiveHoverId(tech.id)}
                  className={`group relative cursor-pointer rounded-2xl px-5 sm:px-8 lg:px-10 py-5 sm:py-7
                    transition-all duration-300 overflow-hidden border ${
                      isActive
                        ? "bg-white/90 backdrop-blur-xl border-brand/25 shadow-[0_8px_40px_rgba(var(--brand-rgb),0.12),0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] translate-x-1 sm:translate-x-2 ring-1 ring-brand/15"
                        : "bg-transparent border-transparent hover:bg-white/50 hover:border-black/6 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                    }`}
                >
                  {/* Glass sheen on active */}
                  {isActive && (
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-brand/5 opacity-70"
                      aria-hidden="true"
                    />
                  )}

                  {/* Active gradient left bar */}
                  <div
                    className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full bg-gradient-to-b from-brand-light via-brand to-brand-deep transition-all duration-300 shadow-[2px_0_12px_rgba(var(--brand-rgb),0.5)] ${
                      isActive
                        ? "opacity-100 scale-y-100"
                        : "opacity-0 scale-y-0"
                    }`}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 pl-3 sm:pl-4">
                    {/* Left: index + name + tags */}
                    <div className="flex items-center gap-4 sm:gap-7 min-w-0">
                      <span
                        className={`font-mono text-xs sm:text-sm font-bold tracking-wider w-6 sm:w-8 shrink-0 transition-colors duration-300 select-none ${
                          isActive
                            ? "text-brand"
                            : "text-[#CCCCCC] group-hover:text-brand/60"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <div className="flex flex-col gap-2.5 min-w-0">
                        <h3
                          className={`font-black italic uppercase tracking-[-0.03em] leading-none transition-all duration-300 text-3xl sm:text-5xl md:text-6xl lg:text-7xl ${
                            isActive
                              ? "text-brand drop-shadow-[0_2px_8px_rgba(var(--brand-rgb),0.18)]"
                              : "text-[#111111] group-hover:text-[#333333]"
                          }`}
                        >
                          {tech.name}.
                        </h3>

                        {Array.isArray(tech.tags) && tech.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {tech.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-all duration-300 ${
                                  isActive
                                    ? "border-brand/35 bg-brand/10 text-brand-dark"
                                    : "border-black/8 bg-black/3 text-[#777777] group-hover:border-black/12"
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: category + description + icon + arrow */}
                    <div className="flex items-center gap-4 sm:gap-6 justify-between lg:justify-end shrink-0">
                      <div className="flex flex-col lg:items-end gap-1 max-w-xs">
                        <span className="text-[11px] font-bold tracking-wider uppercase text-brand lg:text-right">
                          {tech.categoryLabel}
                        </span>
                        <p className="text-xs sm:text-sm text-[#4B5563] font-normal leading-relaxed lg:text-right">
                          {tech.description}
                        </p>
                      </div>

                      {/* Icon tile */}
                      <div
                        className={`flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl p-2.5 transition-all duration-300 ${
                          isActive
                            ? "bg-white border border-brand/30 shadow-[0_8px_24px_rgba(var(--brand-rgb),0.2)] scale-105"
                            : "bg-white border border-black/8 shadow-sm group-hover:scale-105 group-hover:shadow-[0_6px_18px_rgba(var(--brand-rgb),0.15)] group-hover:border-brand/30"
                        }`}
                      >
                        {tech.icon}
                      </div>

                      {/* Arrow indicator */}
                      <svg
                        className={`hidden sm:block h-5 w-5 shrink-0 text-brand transition-all duration-300 ${
                          isActive
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-3"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <div className="mt-8 pt-5 border-t border-black/8 flex items-center justify-between">
          <span className="text-xs font-mono text-[#999999]">
            Showing{" "}
            <span className="text-brand font-bold">{filteredTech.length}</span>{" "}
            of{" "}
            <span className="font-semibold text-[#555555]">
              {techStackData.length}
            </span>{" "}
            tools
          </span>
          <span className="hidden sm:flex items-center gap-2 text-xs font-medium text-[#999999]">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            Hover to explore
          </span>
        </div>
      </div>
    </section>
  );
}
