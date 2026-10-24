import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Image as ImageIcon,
  Globe,
} from "lucide-react";
import { projectsData } from "../data/projectsData";
import InteractiveButton from "../components/ui/InteractiveButton";
import WorksStage from "../components/features/WorksStage";
import LiveSitePreview from "../components/features/LiveSitePreview";
import SectionBadge from "../components/ui/SectionBadge";
import { HandwrittenBadge } from "../components/decoration/doodleCard";
import {
  BrandCardCornerWave,
  BrandSectionSideWave,
} from "../components/decoration/brandBackgroundShapes";

/* ──────────────────────────────────────────────
   Animation Variants
   ────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1];

const mobileCardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

export default function Works() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [modalImageIdx, setModalImageIdx] = useState(0);
  const [modalViewMode, setModalViewMode] = useState("images"); // 'images' | 'live'
  const [activeMobileLiveId, setActiveMobileLiveId] = useState(null);
  const [mobileImgMap, setMobileImgMap] = useState({});

  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "fullstack")
      return p.stack.includes("Node.js") || p.stack.includes("MongoDB");
    if (activeFilter === "frontend")
      return p.stack.includes("GSAP 3") || p.stack.includes("Web Storage");
    return true;
  });

  // Modal keyboard and scroll lock
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

  const handleOpenModal = (project) => {
    setModalImageIdx(mobileImgMap[project.id] || 0);
    setModalViewMode("images");
    setActiveProjectModal(project);
  };

  const getCleanHostname = (url) => {
    if (!url || url.startsWith("#")) return "showcase.app";
    return url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0];
  };

  return (
    <section
      id="works"
      aria-labelledby="works-heading"
      className="relative z-20 w-full overflow-x-clip  bg-[#FAF8F5] pt-16 pb-16 font-sans text-[#111111] select-none scroll-mt-20 sm:pt-20 sm:pb-24"
    >
      <BrandSectionSideWave position="middle" opacity={0.35} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14">
        {/* ── 1. EDITORIAL HEADER ── */}
        <motion.div
          className="mb-10 grid grid-cols-1 items-end gap-6 border-b border-black/8 pb-6 sm:mb-12 sm:pb-8 lg:grid-cols-12"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <div className="lg:col-span-7">
            <div className="mb-3">
              <SectionBadge number="02" label="Works" />
            </div>

            <div className="relative inline-block">
              <h2
                id="works-heading"
                className="font-display text-[clamp(2.2rem,4vw+0.6rem,3.6rem)] leading-[1.05] font-bold tracking-[-0.03em] text-[#111111]"
              >
                Selected{" "}
                <span className="font-normal italic text-brand-dark">
                  projects.
                </span>
              </h2>

              {/* Doodle annotation: "Live & shipped!" */}
              <HandwrittenBadge
                text="Live & shipped!"
                arrowDirection="down-left"
                rotation="rotate-2"
                textClass="text-sm sm:text-base"
                textColor="text-[#333333]"
                arrowClass="h-8 w-8 sm:h-10 sm:w-10"
                className="absolute -top-7 right-0 hidden sm:flex"
              />
            </div>
          </div>

          <div className="lg:col-span-5 lg:pb-1">
            <p className="max-w-md text-sm leading-relaxed font-normal text-[#4B5563] sm:text-base">
              Real web applications and digital stores engineered for
              responsiveness, high performance, and smooth user flows.
            </p>
          </div>
        </motion.div>

        {/* ── 2. FILTER TABS (With Animated Spring Motion Pill + Shadow) ── */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 sm:mb-14">
          <div
            role="tablist"
            aria-label="Filter projects"
            className="flex w-fit items-center gap-1 overflow-x-auto rounded-full border border-black/10 bg-white p-1.5 shadow-2xs sm:gap-1.5"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          >
            {[
              {
                id: "all",
                labelFull: "All work",
                labelShort: "All",
                count: projectsData.length,
              },
              {
                id: "fullstack",
                labelFull: "Full-stack apps",
                labelShort: "Full-stack",
                count: projectsData.filter(
                  (p) =>
                    p.stack.includes("Node.js") || p.stack.includes("MongoDB"),
                ).length,
              },
              {
                id: "frontend",
                labelFull: "Frontend & motion",
                labelShort: "Frontend",
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
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold transition-colors duration-200 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${
                    active
                      ? "text-white"
                      : "text-[#555555] hover:bg-black/4 hover:text-[#111111]"
                  }`}
                >
                  {/* Animated sliding dark pill with shadow */}
                  {active && (
                    <motion.span
                      layoutId="works-filter-pill"
                      className="absolute inset-0 rounded-full bg-[#111111] shadow-md shadow-black/20 ring-1 ring-white/10"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 32 }
                      }
                    />
                  )}

                  <span className="relative z-10 sm:hidden">
                    {tab.labelShort}
                  </span>
                  <span className="relative z-10 hidden sm:inline">
                    {tab.labelFull}
                  </span>
                  <span
                    className={`relative z-10 rounded-full px-1.5 py-0.5 font-mono text-[9px] font-bold transition-colors sm:text-[10px] ${
                      active
                        ? "bg-brand text-white"
                        : "bg-black/6 text-[#666666]"
                    }`}
                  >
                    {String(tab.count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 font-mono text-xs text-[#777777] lg:flex">
            <span className="inline-block h-2 w-2 rounded-full bg-brand" />
            <span>Scroll to explore showcase</span>
          </div>
        </div>

        {/* ── 3. DESKTOP VIEW (>= 1024px): Sticky WorksStage ── */}
        <div className="hidden lg:block">
          <WorksStage
            key={activeFilter}
            projects={filteredProjects}
            onOpen={handleOpenModal}
          />
        </div>

        {/* ── 4. MOBILE & TABLET VIEW (< 1024px): Uncropped Widescreen Browser Cards ── */}
        <div className="flex flex-col gap-8 sm:gap-12 lg:hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project) => {
              const isLivePreviewActive = activeMobileLiveId === project.id;
              const canEmbed =
                project.embeddable && project.liveUrl?.startsWith("https://");
              const images =
                project.images && project.images.length > 0
                  ? project.images
                  : [project.image];
              const activeImgIdx = mobileImgMap[project.id] || 0;
              const currentImg = images[activeImgIdx] || images[0];
              const hasLiveUrl =
                project.liveUrl && !project.liveUrl.startsWith("#");

              return (
                <motion.article
                  key={project.id}
                  layout={!shouldReduceMotion}
                  variants={shouldReduceMotion ? undefined : mobileCardVariants}
                  initial={shouldReduceMotion ? false : "hidden"}
                  whileInView="visible"
                  exit={shouldReduceMotion ? undefined : "exit"}
                  viewport={{ once: true, amount: 0.12 }}
                  className="flat-card group relative isolate flex flex-col overflow-hidden rounded-3xl bg-white p-4 sm:p-6 shadow-[0_10px_35px_-10px_rgba(17,17,17,0.07)]"
                >
                  <BrandCardCornerWave
                    position="top-right"
                    opacity={0.75}
                    className="h-36 w-[65%] sm:h-44 sm:w-[55%]"
                  />

                  {/* Top Card Meta Header */}
                  <div className="relative z-10 mb-3.5 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-lg bg-brand/12 px-2.5 py-1 font-mono text-xs font-bold text-brand-dark">
                        {project.num}
                      </span>
                      <span className="font-mono text-xs font-medium text-[#666666]">
                        {project.year}
                      </span>
                      <span className="text-[#CCCCCC]">&bull;</span>
                      <span className="text-xs font-semibold text-[#222222]">
                        {project.client}
                      </span>
                    </div>

                    {hasLiveUrl && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        Live
                      </span>
                    )}
                  </div>

                  {/* Desktop-Style Browser Window Frame (16:10 Full Width, No Side Cropping) */}
                  <div className="relative z-10 overflow-hidden rounded-2xl border border-black/12 bg-[#141414] shadow-md">
                    {/* Browser Chrome Bar */}
                    <div className="flex items-center justify-between border-b border-white/10 bg-[#1E1E1E] px-3.5 py-2">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                      </div>

                      <div className="flex max-w-[55%] items-center gap-1.5 truncate rounded-md bg-white/8 px-2.5 py-0.5 font-mono text-[10px] text-white/75">
                        <Globe className="h-2.5 w-2.5 shrink-0 text-brand-light" />
                        <span className="truncate">
                          {getCleanHostname(project.liveUrl)}
                        </span>
                      </div>

                      {images.length > 1 && !isLivePreviewActive ? (
                        <div className="flex items-center gap-1">
                          {images.map((_, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setMobileImgMap((prev) => ({
                                  ...prev,
                                  [project.id]: idx,
                                }));
                              }}
                              aria-label={`Preview screen ${idx + 1}`}
                              className={`h-4 min-w-4 cursor-pointer rounded px-1 font-mono text-[9px] font-bold transition-colors ${
                                activeImgIdx === idx
                                  ? "bg-brand text-[#111111]"
                                  : "bg-white/10 text-white/60 hover:bg-white/20"
                              }`}
                            >
                              {idx + 1}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <span className="w-8" />
                      )}
                    </div>

                    {/* Uncropped Desktop Screenshot Viewport */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0F1115]">
                      {isLivePreviewActive && canEmbed ? (
                        <LiveSitePreview
                          url={project.liveUrl}
                          title={project.title}
                          onClose={() => setActiveMobileLiveId(null)}
                        />
                      ) : (
                        <div
                          className="group/img relative h-full w-full cursor-pointer overflow-hidden"
                          onClick={() => handleOpenModal(project)}
                        >
                          {/* w-full h-auto shows 100% of desktop width without side cropping */}
                          <img
                            src={currentImg}
                            alt={`${project.title} preview`}
                            loading="lazy"
                            className="block h-auto min-h-full w-full object-contain object-top transition-transform duration-500 group-hover/img:scale-[1.02]"
                          />

                          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/65 via-black/20 to-transparent p-3">
                            <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[10px] font-semibold text-white backdrop-blur-md">
                              Tap to inspect
                            </span>

                            {images.length > 1 && (
                              <span className="rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] font-bold text-white/90 backdrop-blur-md">
                                {activeImgIdx + 1}/{images.length}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Project Title, Summary & Tech Stack */}
                  <div className="relative z-10 mt-5 flex flex-col">
                    <div className="mb-1.5 flex items-baseline justify-between gap-2">
                      <h3
                        onClick={() => handleOpenModal(project)}
                        className="cursor-pointer font-display text-2xl font-black italic uppercase leading-tight tracking-tight text-[#111111] transition-colors hover:text-brand-dark sm:text-3xl"
                      >
                        {project.title}
                      </h3>

                      {project.role && (
                        <span className="shrink-0 font-mono text-[10px] italic text-[#777777]">
                          {project.role}
                        </span>
                      )}
                    </div>

                    <p className="mb-4 text-xs leading-relaxed text-[#4B5563] sm:text-sm">
                      {project.summary}
                    </p>

                    <div className="mb-5 flex flex-wrap items-center gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-black/8 bg-[#FAF8F5] px-2.5 py-1 font-mono text-[10px] font-semibold text-[#333333]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-black/8 pt-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <InteractiveButton
                          type="button"
                          onClick={() => handleOpenModal(project)}
                          variant="dark"
                          noShadow
                          className="px-4 py-2.5 text-xs"
                          icon={<ArrowRight className="h-3.5 w-3.5" />}
                        >
                          Case study
                        </InteractiveButton>

                        {canEmbed && (
                          <button
                            type="button"
                            onClick={() =>
                              setActiveMobileLiveId(
                                isLivePreviewActive ? null : project.id,
                              )
                            }
                            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
                              isLivePreviewActive
                                ? "border-brand bg-brand/10 text-brand-dark"
                                : "border-black/15 bg-white text-[#111111] hover:border-brand hover:text-brand-dark"
                            }`}
                          >
                            <Play className="h-3 w-3 fill-current" />
                            <span>
                              {isLivePreviewActive ? "Close live" : "Try live"}
                            </span>
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {hasLiveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-[#FAF8F5] px-3 py-2 text-xs font-semibold text-[#222222] transition-colors hover:border-brand hover:text-brand-dark"
                          >
                            <span>Visit</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.title} GitHub repository`}
                            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-[#555555] transition-colors hover:text-[#111111]"
                          >
                            <Code2 className="h-3.5 w-3.5" />
                            <span>Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* ── 5. ANIMATED CASE STUDY MODAL ── */}
      <AnimatePresence>
        {activeProjectModal && (
          <motion.div
            key="project-modal-backdrop"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="modal-backdrop-scroll fixed inset-0 z-50 overflow-y-auto bg-black/75 p-3 backdrop-blur-md overscroll-contain select-auto sm:p-6"
            onClick={() => setActiveProjectModal(null)}
          >
            <div className="pointer-events-none flex min-h-full items-center justify-center py-4 sm:py-6">
              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, scale: 0.95, y: 20 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={
                  shouldReduceMotion
                    ? undefined
                    : { opacity: 0, scale: 0.96, y: 12 }
                }
                transition={{ duration: 0.3, ease: EASE }}
                className="pointer-events-auto relative my-auto w-full max-w-3xl rounded-2xl border border-black/10 bg-[#FAF8F5] p-5 text-[#111111] shadow-2xl select-auto sm:rounded-3xl sm:p-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActiveProjectModal(null)}
                  aria-label="Close modal"
                  className="absolute right-4 top-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/5 text-[#111111] transition-all hover:scale-105 hover:bg-black/10 sm:right-5 sm:top-5"
                >
                  <X className="h-5 w-5 stroke-[2.5]" />
                </button>

                <p className="mb-2 text-xs font-semibold text-brand-dark sm:text-sm">
                  Case study &bull; {activeProjectModal.year} &bull;{" "}
                  {activeProjectModal.client}
                </p>

                <h2 className="mb-4 font-display text-3xl font-black italic uppercase tracking-tight sm:text-4xl">
                  {activeProjectModal.title}
                </h2>

                {activeProjectModal.embeddable &&
                  activeProjectModal.liveUrl?.startsWith("https://") && (
                    <div className="mb-4 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setModalViewMode("images")}
                        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                          modalViewMode === "images"
                            ? "bg-[#111111] text-white"
                            : "bg-black/5 text-[#555555] hover:bg-black/10"
                        }`}
                      >
                        <ImageIcon className="h-3.5 w-3.5" />
                        <span>Screenshots</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalViewMode("live")}
                        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                          modalViewMode === "live"
                            ? "bg-brand text-white"
                            : "bg-black/5 text-[#555555] hover:bg-black/10"
                        }`}
                      >
                        <Play className="h-3 w-3 fill-current" />
                        <span>Interactive live site</span>
                      </button>
                    </div>
                  )}

                {modalViewMode === "live" &&
                activeProjectModal.embeddable &&
                activeProjectModal.liveUrl?.startsWith("https://") ? (
                  <div className="mb-7">
                    <LiveSitePreview
                      url={activeProjectModal.liveUrl}
                      title={activeProjectModal.title}
                      onClose={() => setModalViewMode("images")}
                    />
                  </div>
                ) : (
                  (() => {
                    const modalImages =
                      activeProjectModal.images &&
                      activeProjectModal.images.length > 0
                        ? activeProjectModal.images
                        : [activeProjectModal.image];

                    return (
                      <div className="mb-6">
                        <div
                          className="group/modalImg relative overflow-hidden rounded-2xl border border-black/8 bg-[#0F1115] shadow-md"
                          style={{ maxHeight: "520px", minHeight: "220px" }}
                        >
                          <img
                            key={modalImageIdx}
                            src={
                              modalImages[modalImageIdx] ||
                              activeProjectModal.image
                            }
                            alt={`${activeProjectModal.title} preview ${modalImageIdx + 1}`}
                            loading="lazy"
                            className="block h-auto max-h-[520px] w-full object-contain object-top transition-opacity duration-300"
                          />

                          {modalImages.length > 1 && (
                            <>
                              <button
                                type="button"
                                aria-label="Previous image"
                                onClick={() =>
                                  setModalImageIdx((prev) =>
                                    prev === 0
                                      ? modalImages.length - 1
                                      : prev - 1,
                                  )
                                }
                                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/70 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-brand active:scale-95"
                              >
                                <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
                              </button>

                              <button
                                type="button"
                                aria-label="Next image"
                                onClick={() =>
                                  setModalImageIdx((prev) =>
                                    prev === modalImages.length - 1
                                      ? 0
                                      : prev + 1,
                                  )
                                }
                                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/70 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-brand active:scale-95"
                              >
                                <ChevronRight className="h-5 w-5 stroke-[2.5]" />
                              </button>

                              <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/75 px-3.5 py-1 text-xs font-semibold text-white shadow-md backdrop-blur-md">
                                {modalImageIdx + 1} / {modalImages.length}
                              </div>
                            </>
                          )}
                        </div>

                        {modalImages.length > 1 && (
                          <div className="mt-3 grid grid-cols-3 gap-3">
                            {modalImages.map((thumb, tIdx) => (
                              <button
                                key={tIdx}
                                type="button"
                                onClick={() => setModalImageIdx(tIdx)}
                                className={`relative aspect-[16/10] cursor-pointer overflow-hidden rounded-xl border-2 bg-[#0F1115] transition-all ${
                                  modalImageIdx === tIdx
                                    ? "scale-[1.02] border-brand shadow-md ring-2 ring-brand/30"
                                    : "border-black/10 opacity-70 hover:border-black/30 hover:opacity-100"
                                }`}
                              >
                                <img
                                  src={thumb}
                                  alt={`Thumbnail ${tIdx + 1}`}
                                  className="h-full w-full object-contain object-top"
                                />
                                <span className="absolute bottom-1 right-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                                  0{tIdx + 1}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()
                )}

                <div className="mb-6">
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#666666]">
                    How this was built
                  </h4>
                  <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
                    {activeProjectModal.deepDive}
                  </p>
                </div>

                {activeProjectModal.highlights && (
                  <div className="mb-6 grid grid-cols-1 gap-3 rounded-2xl border border-black/8 bg-white/80 p-4 shadow-xs sm:grid-cols-3 sm:p-5">
                    {activeProjectModal.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />
                        <span className="text-xs font-semibold text-[#111111] sm:text-sm">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/8 pt-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="mr-1 text-xs font-semibold text-[#111111]">
                      Built with:
                    </span>
                    {activeProjectModal.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-black/5 px-2.5 py-1 font-mono text-xs font-semibold text-[#333333]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2.5">
                    {activeProjectModal.liveUrl &&
                      !activeProjectModal.liveUrl.startsWith("#") && (
                        <InteractiveButton
                          href={activeProjectModal.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          variant="dark"
                          noShadow
                          className="px-4 py-2 text-xs"
                          icon={<ArrowUpRight className="h-3.5 w-3.5" />}
                        >
                          Visit live site
                        </InteractiveButton>
                      )}
                    {activeProjectModal.githubUrl && (
                      <a
                        href={activeProjectModal.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-4 py-2 text-xs font-bold text-[#111111] transition-colors hover:border-brand hover:text-brand-dark"
                      >
                        <Code2 className="h-3.5 w-3.5" />
                        <span>View code</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
