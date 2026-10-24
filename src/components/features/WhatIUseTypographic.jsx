import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { techStackData } from "../../data/techData.jsx";
import SectionBadge from "../ui/SectionBadge";
import AnimatedCircularProgressBar from "../ui/AnimatedCircularProgressBar";
import { HandwrittenBadge } from "../decoration/doodleCard";

/* ──────────────────────────────────────────────
   Filter Tabs Configuration
   ────────────────────────────────────────────── */
const TABS = [
  { id: "all", label: "All Stack" },
  { id: "frontend", label: "Frontend & UI" },
  { id: "backend", label: "Backend & DB" },
  { id: "workflow", label: "Design & Workflow" },
];

const SHORT_LABELS = {
  frontend: "Frontend",
  backend: "Backend",
  workflow: "Workflow",
};

const EASE = [0.22, 1, 0.36, 1];

export default function WhatIUseTypographic() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(techStackData[0]?.id || "");
  const shouldReduceMotion = useReducedMotion();

  const filteredTech = useMemo(
    () =>
      techStackData.filter(
        (item) => activeFilter === "all" || item.category === activeFilter,
      ),
    [activeFilter],
  );

  const categoryCounts = useMemo(() => {
    const counts = { all: techStackData.length };
    TABS.forEach((tab) => {
      if (tab.id !== "all") {
        counts[tab.id] = techStackData.filter(
          (item) => item.category === tab.id,
        ).length;
      }
    });
    return counts;
  }, []);

  // Ensure an item is always active in the spotlight panel
  const activeTech = useMemo(() => {
    return (
      filteredTech.find((item) => item.id === selectedId) ||
      filteredTech[0] ||
      techStackData[0]
    );
  }, [filteredTech, selectedId]);

  // Ring tabhi dikhega jab data me `level` (0-100) ho
  const hasLevels = techStackData.some((t) => typeof t.level === "number");

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.65, ease: EASE };

  return (
    <section
      id="tools"
      aria-labelledby="stack-heading"
      // Ensure z-20 so it layers cleanly above the journey section bottom
      className="ab-tech-section relative z-20 isolate overflow-hidden border-b border-black/8 bg-[#FAF8F5] py-14 sm:py-20 lg:py-24 scroll-mt-20"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14">
        {/* ── 1. EDITORIAL HEADER (Matches Journey.jsx Typography & Grid) ── */}
        <motion.div
          className="mb-10 grid grid-cols-1 items-end gap-6 border-b border-black/8 pb-6 sm:mb-14 sm:pb-8 lg:grid-cols-12"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={transition}
        >
          <div className="lg:col-span-7">
            <div className="mb-3">
              <SectionBadge number="01.2" label="Stack" />
            </div>

            {/* Heading with "Daily tools" doodle annotation (matches reference screenshot) */}
            <div className="relative inline-block">
              <h2
                id="stack-heading"
                className="font-display text-[clamp(2.2rem,4vw+0.6rem,3.6rem)] leading-[1.05] font-bold tracking-[-0.03em] text-[#111111]"
              >
                What I work{" "}
                <span className="font-normal italic text-brand-dark">
                  with.
                </span>
              </h2>

              {/* Doodle: "Daily tools" with curved-down arrow — positioned top-right of title */}
              <div className="pointer-events-none absolute -top-6 -right-4 hidden sm:flex sm:flex-col sm:items-start select-none">
                <span className="font-doodle text-base font-bold text-[#333333] -rotate-3 leading-tight whitespace-nowrap">
                  Daily tools
                </span>
                {/* Hand-drawn arrow SVG pointing down-left */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 60 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-9 w-9 ml-2 mt-0.5 text-[#333333] overflow-visible"
                >
                  <path d="M 54 5 C 51 23, 36 39, 14 49" />
                  <path d="M 27 38 L 14 49 L 28 51" />
                </svg>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pb-1">
            <p className="max-w-md text-sm leading-relaxed font-normal text-[#4B5563] sm:text-base">
              A curated production stack for designing interfaces, architecting
              scalable APIs, and shipping fast web applications.
            </p>
          </div>
        </motion.div>

        {/* ── 2. CATEGORY FILTER BAR ── */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 sm:mb-10">
          <div
            role="tablist"
            aria-label="Filter technology stack"
            className="flex w-full min-w-0 items-center gap-1.5 overflow-x-auto rounded-2xl border border-black/8 bg-white p-1.5 shadow-2xs sm:w-fit sm:rounded-full"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          >
            {TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative text-xs sm:text-sm font-semibold transition-colors duration-300 px-3.5 py-2 sm:px-4 sm:py-2 rounded-full cursor-pointer flex shrink-0 items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                    isActive
                      ? "text-white"
                      : "text-[#555555] hover:text-[#111111] hover:bg-white/90"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="stack-filter-pill"
                      className="absolute inset-0 rounded-full bg-[#111111] shadow-md shadow-black/20 ring-1 ring-white/10"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 32 }
                      }
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span
                    className={`relative z-10 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors ${
                      isActive
                        ? "bg-brand text-white"
                        : "bg-black/6 text-[#666666]"
                    }`}
                  >
                    {categoryCounts[tab.id] || 0}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 font-mono text-xs text-[#777777] md:flex">
            <span className="inline-block h-2 w-2 rounded-full bg-brand" />
            <span>Select or hover a tool to inspect</span>
          </div>
        </div>

        {/* ── 3. TYPOGRAPHIC TOOL ROWS ── */}
        <div className="relative flex flex-col gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech, idx) => {
              const isSelected = activeTech?.id === tech.id;
              const label =
                tech.categoryLabel ||
                SHORT_LABELS[tech.category] ||
                "Core Tool";
              const hasTags = Array.isArray(tech.tags) && tech.tags.length > 0;

              return (
                <motion.article
                  key={tech.id}
                  layout={!shouldReduceMotion}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 48, scale: 0.97 }
                  }
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                    margin: "0px 0px -60px 0px",
                  }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  onMouseEnter={() => setSelectedId(tech.id)}
                  onFocus={() => setSelectedId(tech.id)}
                  onClick={() => setSelectedId(tech.id)}
                  tabIndex={0}
                  className={`group relative cursor-pointer overflow-hidden rounded-3xl border transition-[background-color,border-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
                    isSelected
                      ? "border-brand/30 bg-white shadow-[0_18px_50px_rgba(var(--brand-rgb),0.14)]"
                      : "border-black/8 bg-white/60 hover:border-black/15 hover:bg-white"
                  }`}
                >
                  {/* Active left accent bar */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-y-5 left-0 w-1 origin-center rounded-r-full bg-brand"
                    initial={false}
                    animate={{
                      scaleY: isSelected ? 1 : 0,
                      opacity: isSelected ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />

                  <div className="px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
                    <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                      {/* Index */}
                      <span
                        className={`hidden w-7 shrink-0 font-mono text-xs font-bold transition-colors sm:block ${
                          isSelected ? "text-brand-dark" : "text-[#BBBBBB]"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      {/* Name + tags */}
                      <div className="min-w-0 flex-1">
                        <h3
                          className={`font-display font-black italic uppercase leading-[0.95] tracking-[-0.03em] break-words text-[clamp(1.9rem,3.6vw+0.4rem,3.9rem)] transition-colors duration-300 ${
                            isSelected ? "text-brand" : "text-[#111111]"
                          }`}
                        >
                          {tech.name}.
                        </h3>

                        {hasTags && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {tech.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-colors duration-300 ${
                                  isSelected
                                    ? "border-brand/30 bg-brand/10 text-brand-dark"
                                    : "border-black/10 bg-black/4 text-[#666666]"
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Category + description (md+) */}
                      <div className="hidden max-w-[19rem] shrink-0 text-right md:block">
                        <p className="mb-1.5 text-[11px] font-extrabold uppercase tracking-wider text-brand-dark">
                          {label}
                        </p>
                        <p className="text-sm leading-relaxed text-[#4B5563]">
                          {tech.description}
                        </p>
                      </div>

                      {/* Icon tile */}
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border bg-white transition-[transform,border-color,box-shadow] duration-300 group-hover:scale-105 sm:h-16 sm:w-16 ${
                          isSelected
                            ? "border-brand/30 shadow-[0_8px_24px_rgba(var(--brand-rgb),0.2)]"
                            : "border-black/8 shadow-xs"
                        }`}
                      >
                        {tech.icon}
                      </div>

                      {/* Skill ring */}
                      {hasLevels && (
                        <div className="hidden size-14 shrink-0 lg:block">
                          {isSelected && typeof tech.level === "number" && (
                            <AnimatedCircularProgressBar
                              value={tech.level}
                              min={0}
                              max={100}
                              gaugePrimaryColor="rgb(var(--brand-rgb))"
                              gaugeSecondaryColor="rgba(0, 0, 0, 0.08)"
                              className="size-14 text-xs"
                            />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Mobile: description expands under the active row */}
                    <div className="md:hidden">
                      <AnimatePresence initial={false}>
                        {isSelected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 border-t border-black/8 pt-3">
                              <p className="mb-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-dark">
                                {label}
                              </p>
                              <p className="text-xs leading-relaxed text-[#4B5563] sm:text-sm">
                                {tech.description}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
