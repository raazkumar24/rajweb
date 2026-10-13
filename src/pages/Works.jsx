import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { projectsData } from "../data/projectsData";
import SectionHeader from "../components/ui/SectionHeader";
import ProjectMedia from "../components/features/ProjectMedia";
import {
  BrandSectionSideWave,
  SectionWaveDivider,
} from "../components/decorative";
import { useGsapScope } from "../animation/useGsapScope";
import { ANIM } from "../animation/config";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [modalImageIdx, setModalImageIdx] = useState(0);

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "fullstack")
      return p.stack.includes("Node.js") || p.stack.includes("MongoDB");
    if (activeFilter === "frontend")
      return p.stack.includes("GSAP 3") || p.stack.includes("Web Storage");
    return true;
  });

  useGsapScope(sectionRef, () => {
    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const rows = gsap.utils.toArray(".wk-project-row");
        rows.forEach((row) => {
          const img = row.querySelector(".wk-project-img");
          const clipWrap =
            row.querySelector(".wk-clip-wrap") ||
            row.querySelector(".wk-img-wrap");
          const info = row.querySelector(".wk-project-info");

          if (clipWrap) {
            gsap.fromTo(
              clipWrap,
              {
                clipPath: "polygon(0 12%, 100% 12%, 100% 100%, 0 100%)",
                opacity: 0.88,
              },
              {
                clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                opacity: 1,
                duration: ANIM.DURATION.base,
                ease: ANIM.EASE,
                scrollTrigger: {
                  trigger: row,
                  start: ANIM.SCROLL_START,
                  once: true,
                },
              },
            );
          }

          if (img) {
            // Subtle desktop parallax (yPercent +-5) without competing CSS transitions
            gsap.fromTo(
              img,
              { yPercent: -5, scale: 1.05 },
              {
                yPercent: 5,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: row,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.2,
                },
              },
            );
          }

          if (info) {
            gsap.fromTo(
              info,
              { y: ANIM.REVEAL_Y, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: ANIM.DURATION.base,
                ease: ANIM.EASE,
                scrollTrigger: {
                  trigger: row,
                  start: ANIM.SCROLL_START,
                  once: true,
                },
              },
            );
          }
        });
      },
    );

    mm.add(
      "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.utils.toArray(".wk-project-row").forEach((row) => {
          gsap.fromTo(
            row,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: ANIM.SCROLL_START,
                once: true,
              },
            },
          );
        });
      },
    );

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        [
          ".wk-clip-wrap",
          ".wk-img-wrap",
          ".wk-project-img",
          ".wk-project-info",
          ".wk-project-row",
        ],
        {
          opacity: 1,
          y: 0,
          yPercent: 0,
          scale: 1,
          clipPath: "none",
          clearProps: "all",
        },
      );
    });
  }, [activeFilter]);

  useEffect(() => {
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }
  }, [activeFilter]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActiveProjectModal(null);
    };
    if (activeProjectModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeProjectModal]);

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative w-full bg-[#FAF8F5] text-[#111111] overflow-hidden select-none pt-0 pb-0 font-sans scroll-mt-20 sm:scroll-mt-28"
    >
      {/* ── Subtle Decorative Top SVG Wave Divider (About -> Works) ── */}
      {/* <SectionWaveDivider variant="about-to-works" className="relative z-10 mb-4 sm:mb-8" /> */}

      {/* Organic Curved Brand Accent Shape on Left Side with smooth top & bottom taper */}
      <BrandSectionSideWave />

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Header with clean text tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 sm:mb-24 border-b border-black/8 pb-8">
          <div>
            <SectionHeader
              badge="Selected work"
              titleTop="SELECTED"
              titleMain="WORKS"
              titleAccent="&amp; PROJECTS."
              description="Real websites and applications built for clients, engineered to load fast and convert visitors."
              annotation="Real projects &bull; Real clients"
              align="split"
              className="!mb-0"
            />
          </div>

          {/* Refined Filter Tabs - Glassmorphism Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2  bg-white/60 backdrop-blur-xl p-1.5 rounded-full border border-black/8 shadow-xs">
            {[
              { id: "all", label: "All work", count: projectsData.length },
              {
                id: "fullstack",
                label: "Full-stack apps",
                count: projectsData.filter(
                  (p) =>
                    p.stack.includes("Node.js") || p.stack.includes("MongoDB"),
                ).length,
              },
              {
                id: "frontend",
                label: "Frontend & motion",
                count: projectsData.filter(
                  (p) =>
                    p.stack.includes("GSAP 3") ||
                    p.stack.includes("Web Storage"),
                ).length,
              },
            ].map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`text-xs sm:text-sm font-semibold transition-all duration-300 px-4 py-2 rounded-full cursor-pointer flex items-center gap-2 ${
                    active
                      ? "bg-[#111111] text-white shadow-md shadow-black/20 ring-1 ring-white/10"
                      : "text-[#555555] hover:text-[#111111] hover:bg-white/90"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors ${
                      active
                        ? "bg-brand text-white"
                        : "bg-black/6 text-[#666666]"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Rows with Generous Breathing Room */}
        <div className="flex flex-col gap-24 sm:gap-32 lg:gap-36">
          {filteredProjects.map((project, idx) => {
            const isImageLeft = idx % 2 === 0;

            return (
              <div
                key={project.id}
                className="wk-project-row relative grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 xl:gap-20 items-center"
              >
                {/* IMAGE COLUMN WITH 3D HOVER EFFECT */}
                <div
                  className={`lg:col-span-7 relative ${
                    isImageLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <ProjectMedia
                    project={project}
                    onOpenModal={() => {
                      setModalImageIdx(0);
                      setActiveProjectModal(project);
                    }}
                  />
                </div>

                {/* TEXT & METRICS COLUMN */}
                <div
                  className={`wk-project-info lg:col-span-5 flex flex-col justify-center relative z-20 ${
                    isImageLeft
                      ? "lg:order-2 lg:pl-2 xl:pl-4"
                      : "lg:order-1 lg:pr-2 xl:pr-4"
                  }`}
                >
                  {/* Glass card wrapper */}
                  <div className="relative rounded-[2rem] bg-white/55 backdrop-blur-2xl border border-white/70 p-6 sm:p-8 shadow-[0_8px_40px_rgba(var(--brand-rgb),0.1),0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-brand/10 overflow-hidden">
                    {/* Top brand gradient bar */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
                    {/* Subtle glass sheen */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-brand/4 opacity-80"
                      aria-hidden="true"
                    />

                    <div className="relative z-10">
                      {/* Clean Project Meta */}
                      <div className="flex items-center gap-2 flex-wrap text-xs font-bold text-brand-dark mb-3">
                        <span className="font-mono font-black text-sm px-2 py-0.5 rounded-md bg-brand/12 text-brand-dark border border-brand/25">
                          {project.num}
                        </span>
                        <span className="text-[#CCCCCC] font-medium">
                          &bull;
                        </span>
                        <span className="text-[#555555] font-semibold">
                          {project.year}
                        </span>
                        <span className="text-[#CCCCCC] font-medium">
                          &bull;
                        </span>
                        <span className="text-[#333333] font-semibold">
                          {project.client}
                        </span>
                        <span className="text-[#CCCCCC] font-medium">
                          &bull;
                        </span>
                        <span className="text-[#888888] font-medium">
                          {project.role}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3
                        onClick={() => {
                          setModalImageIdx(0);
                          setActiveProjectModal(project);
                        }}
                        className="cursor-pointer font-black italic uppercase tracking-[-0.035em] text-3xl sm:text-4xl lg:text-5xl text-[#111111] hover:text-brand transition-colors leading-[0.95] mb-4"
                      >
                        {project.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed mb-6 font-normal">
                        {project.summary}
                      </p>

                      {/* Metric Cards */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mb-6">
                        {project.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="group flex flex-col p-3 sm:p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-black/8 shadow-sm hover:border-brand/35 hover:shadow-[0_4px_16px_rgba(var(--brand-rgb),0.1)] transition-all duration-300"
                          >
                            <span className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight group-hover:text-brand transition-colors duration-300">
                              {m.value}
                            </span>
                            <span className="text-[10px] sm:text-[11px] text-[#777777] mt-0.5 leading-snug font-medium">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-6">
                        <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider mr-1">
                          Stack:
                        </span>
                        {project.stack.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-black/5 border border-black/8 text-[11px] font-semibold text-[#444444] hover:bg-brand/10 hover:border-brand/30 hover:text-brand-dark transition-all duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <button
                          type="button"
                          onClick={() => {
                            setModalImageIdx(0);
                            setActiveProjectModal(project);
                          }}
                          className="group inline-flex items-center gap-2 rounded-full bg-[#111111] hover:bg-brand text-white hover:text-[#111111] px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_rgba(var(--brand-rgb),0.35)] active:scale-95 cursor-pointer"
                        >
                          <span>Read case study</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </button>

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-black/12 hover:border-brand/50 hover:bg-white text-xs sm:text-sm font-semibold text-[#444444] hover:text-[#111111] transition-all duration-200 shadow-sm"
                          >
                            <Code2 className="w-3.5 h-3.5 text-brand-dark" />
                            <span>Source code</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#AAAAAA]" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      {activeProjectModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="modal-backdrop-scroll fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md p-3 sm:p-6 overscroll-contain select-auto"
          onClick={() => setActiveProjectModal(null)}
        >
          <div className="flex min-h-full items-center justify-center py-4 sm:py-6 pointer-events-none">
            <div
              className="relative w-full max-w-3xl my-auto bg-[#FAF8F5] rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-black/10 shadow-2xl text-[#111111] pointer-events-auto select-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProjectModal(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#111111] transition-all hover:scale-105 cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Modal Header */}
              <p className="text-xs sm:text-sm font-semibold text-brand mb-2">
                Case study &bull; {activeProjectModal.year} &bull;{" "}
                {activeProjectModal.client}
              </p>

              <h2 className="font-black italic uppercase text-3xl sm:text-4xl tracking-tight mb-4">
                {activeProjectModal.title}
              </h2>

              {/* Image banner gallery */}
              {(() => {
                const modalImages =
                  activeProjectModal.images &&
                  activeProjectModal.images.length > 0
                    ? activeProjectModal.images
                    : [activeProjectModal.image];

                return (
                  <div className="mb-7">
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black/5 border border-black/8 shadow-md group/modalImg">
                      <img
                        key={modalImageIdx}
                        src={
                          modalImages[modalImageIdx] || activeProjectModal.image
                        }
                        alt={`${activeProjectModal.title} preview ${modalImageIdx + 1}`}
                        width={1400}
                        height={875}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-opacity duration-300"
                      />

                      {modalImages.length > 1 && (
                        <>
                          <button
                            type="button"
                            aria-label="Previous image"
                            onClick={() =>
                              setModalImageIdx((prev) =>
                                prev === 0 ? modalImages.length - 1 : prev - 1,
                              )
                            }
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-brand text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                          </button>

                          <button
                            type="button"
                            aria-label="Next image"
                            onClick={() =>
                              setModalImageIdx((prev) =>
                                prev === modalImages.length - 1 ? 0 : prev + 1,
                              )
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-brand text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                          </button>

                          <div className="absolute top-3 right-3 text-xs font-semibold text-white bg-black/75 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 shadow-md">
                            {modalImageIdx + 1} / {modalImages.length}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Thumbnails row when multiple images exist */}
                    {modalImages.length > 1 && (
                      <div className="grid grid-cols-3 gap-3 mt-3">
                        {modalImages.map((thumb, tIdx) => (
                          <button
                            key={tIdx}
                            type="button"
                            onClick={() => setModalImageIdx(tIdx)}
                            className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                              modalImageIdx === tIdx
                                ? "border-brand shadow-md ring-2 ring-brand/30 scale-[1.02]"
                                : "border-black/10 opacity-70 hover:opacity-100 hover:border-black/30"
                            }`}
                          >
                            <img
                              src={thumb}
                              alt={`Thumbnail ${tIdx + 1}`}
                              className="w-full h-full object-cover object-top"
                            />
                            <span className="absolute bottom-1 right-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/70 text-white backdrop-blur-xs">
                              0{tIdx + 1}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Narrative Deep Dive */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-[#111111] mb-2 uppercase tracking-wide">
                  How this was built
                </h4>
                <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                  {activeProjectModal.deepDive}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 p-5 bg-white/80 backdrop-blur-md rounded-2xl border border-brand/12 mb-6 shadow-[0_4px_20px_rgba(var(--brand-rgb),0.08)] ring-1 ring-brand/8">
                {activeProjectModal.metrics.map((m, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-2xl sm:text-3xl font-black text-brand">
                      {m.value}
                    </span>
                    <span className="text-xs text-[#666666] mt-1 font-medium">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stack line & action */}
              <div className="pt-4 border-t border-black/8 flex items-center justify-between flex-wrap gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-semibold text-[#111111] mr-1">
                    Built with:
                  </span>
                  {activeProjectModal.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-black/5 text-xs font-semibold text-[#333333]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {activeProjectModal.githubUrl && (
                  <a
                    href={activeProjectModal.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-brand text-white hover:text-[#111111] text-xs font-bold transition-all shadow-sm hover:shadow-[0_8px_20px_rgba(var(--brand-rgb),0.3)]"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>View code</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Wave Divider: Works → Services transition ── */}
      <SectionWaveDivider
        variant="works-to-services"
        className="relative z-10"
      />
    </section>
  );
}
