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

/* ---------- Tab icons (sab currentColor use karte hain) ---------- */

const AllIcon = (
  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <rect x="2" y="2" width="5" height="5" rx="1.2" />
    <rect x="9" y="2" width="5" height="5" rx="1.2" />
    <rect x="2" y="9" width="5" height="5" rx="1.2" />
    <rect x="9" y="9" width="5" height="5" rx="1.2" />
  </svg>
);

const FrontendIcon = (
  <svg
    className="h-4 w-4"
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

// Backend: tumhara server SVG
const BackendIcon = (
  <svg className="h-4 w-4" viewBox="0 0 16 16" aria-hidden="true">
    <path
      fill="currentColor"
      d="M14 11a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zM3 12a1 1 0 1 0 0 2a1 1 0 0 0 0-2m3 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8-6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM3 7a1 1 0 1 0 0 2a1 1 0 0 0 0-2m3 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8-6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM3 2a1 1 0 1 0 0 2a1 1 0 0 0 0-2m3 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2"
    />
  </svg>
);

const WorkflowIcon = (
  <svg className="h-4 w-4" viewBox="0 0 16 16" aria-hidden="true">
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
  const [activeHoverId, setActiveHoverId] = useState(techStackData[0]?.id || "react");

  const filteredTech = techStackData.filter((t) =>
    activeFilter === "all" ? true : t.category === activeFilter
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
  useGsapScope(
    containerRef,
    () => {
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
            }
          );
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".wiu-row", { opacity: 1, y: 0, clearProps: "all" });
      });
    },
    [activeFilter]
  );

  return (
    <section
      id="tools"
      ref={containerRef}
      className="ab-tech-section relative z-10 pt-20 sm:pt-28 pb-20 sm:pb-32 overflow-hidden select-none bg-[#FAF8F5] scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-black/8 pb-8">
          <div>
            <SectionBadge label="Tools I use daily" className="mb-2.5" />
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="font-black italic uppercase text-3xl sm:text-5xl lg:text-6xl tracking-[-0.03em] leading-tight">
                <span className="text-[#111111]">WHAT I </span>
                <span className="relative inline-block text-[#FF7700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.32)]">
                  WORK WITH.
                  <HandDrawnUnderline className="absolute -bottom-1 sm:-bottom-2 left-0 w-full" color="#FF8A00" />
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

          {/* Filter tabs: icon + label + count */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            {TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-200 py-1 border-b-2 ${
                    isActive
                      ? "text-[#FF8A00] border-[#FF8A00]"
                      : "text-[#666666] border-transparent hover:text-[#111111]"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none transition-colors duration-200 ${
                      isActive ? "bg-[#FF8A00] text-white" : "bg-black/6 text-[#666666]"
                    }`}
                  >
                    {getCount(tab.id)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools list */}
        <div className="wiu-list flex flex-col divide-y divide-black/10 border-b border-black/10">
          {filteredTech.map((tech, idx) => {
            const isActive = activeHoverId === tech.id;
            return (
              // OUTER: sirf GSAP reveal ke liye
              <div key={tech.id} data-id={tech.id} className="wiu-row py-1">
                {/* INNER: hover/active ka styling aur shift */}
                <div
                  onMouseEnter={() => setActiveHoverId(tech.id)}
                  onClick={() => setActiveHoverId(tech.id)}
                  className={`group relative cursor-pointer rounded-2xl px-5 sm:px-8 lg:px-10 py-6 sm:py-8
                    transition-[background-color,box-shadow,transform] duration-300 ${
                    isActive
                      ? "bg-white/80 shadow-[0_12px_32px_rgba(0,0,0,0.04)] translate-x-1 sm:translate-x-2"
                      : "hover:bg-white/40"
                  }`}
                >
                  {/* Active indicator line */}
                  <div
                    className={`absolute left-1.5 sm:left-2.5 top-3.5 bottom-3.5 w-1.5 rounded-full bg-[#FF8A00] transition-[opacity,transform] duration-300 shadow-[0_0_12px_rgba(255,138,0,0.55)] ${
                      isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-50"
                    }`}
                    aria-hidden="true"
                  />

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pl-2 sm:pl-3">
                    {/* Left: number + name + tags */}
                    <div className="flex items-baseline gap-4 sm:gap-7">
                      <span
                        className={`font-mono text-xs sm:text-sm font-bold tracking-wider w-6 sm:w-8 shrink-0 transition-colors duration-300 select-none ${
                          isActive ? "text-[#FF8A00]" : "text-[#888888] group-hover:text-[#FF8A00]"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <div className="flex flex-col gap-3">
                        <h3
                          className={`font-black italic uppercase tracking-[-0.03em] leading-none transition-colors duration-300 text-3xl sm:text-5xl md:text-6xl lg:text-7xl ${
                            isActive ? "text-[#FF8A00]" : "text-[#111111] group-hover:text-[#FF8A00]"
                          }`}
                        >
                          {tech.name}.
                        </h3>

                        {Array.isArray(tech.tags) && tech.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {tech.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-colors duration-300 ${
                                  isActive
                                    ? "border-[#FF8A00]/40 bg-[#FF8A00]/10 text-[#FF8A00]"
                                    : "border-black/10 text-[#666666]"
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: category + description + icon tile + arrow */}
                    <div className="flex items-center gap-4 sm:gap-6 justify-between lg:justify-end">
                      <div className="flex flex-col lg:items-end gap-1 max-w-sm">
                        <span className="text-[11px] font-semibold tracking-wider uppercase text-[#FF8A00] lg:text-right">
                          {tech.categoryLabel}
                        </span>
                        <p className="text-xs sm:text-sm text-[#4B5563] font-normal leading-relaxed lg:text-right">
                          {tech.description}
                        </p>
                      </div>

                      {/* Icon tile */}
                      <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl border border-black/8 bg-white p-2.5 shadow-sm transition-[transform,box-shadow,border-color] duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(255,138,0,0.18)] group-hover:border-[#FF8A00]/40">
                        {tech.icon}
                      </div>

                      {/* Arrow: sirf active row par */}
                      <svg
                        className={`hidden sm:block h-5 w-5 shrink-0 text-[#FF8A00] transition-[opacity,transform] duration-300 ${
                          isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
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

        {/* Footer line */}
        <div className="mt-6 flex items-center justify-between text-xs font-mono text-[#888888]">
          <span>
            Showing {filteredTech.length} of {techStackData.length} tools
          </span>
          <span className="hidden sm:inline">Hover over a row to explore</span>
        </div>
      </div>
    </section>
  );
}