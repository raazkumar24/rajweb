import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Check,
  Copy,
  Terminal,
  Cpu,
  Palette,
  ShieldCheck,
  Layers,
  Sparkles,
  Maximize2,
  X,
  Laptop,
  Smartphone,
  Flame,
  Zap,
} from "lucide-react";
import { GitHubIcon } from "../components/ui";
import { projectsData } from "../data/projectsData";

export default function CaseStudy({
  projectId,
  heroMode = "red",
  onClose,
  onSelectProject,
}) {
  const isRedTheme = heroMode === "red";
  const project =
    projectsData.find((p) => p.id === projectId) || projectsData[0];
  const [copiedHex, setCopiedHex] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [viewportMode, setViewportMode] = useState("desktop"); // desktop | mobile

  // Scroll to top when project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveImageIdx(0);
    setViewportMode("desktop");
  }, [projectId]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleCopyHex = (hex) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  // Find next project
  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const nextProject =
    projectsData[(currentIndex + 1) % projectsData.length];

  // Theme styling tokens matching exact portfolio aesthetics
  const theme = isRedTheme
    ? {
        bg: "radial-gradient(ellipse at 50% 20%, #B81517 0%, #800A0C 45%, #4A0608 100%)",
        cardBg: "#17181D",
        cardBorder: "rgba(255, 255, 255, 0.12)",
        gridLine: "rgba(255, 255, 255, 0.12)",
        textPrimary: "#FFFFFF",
        textMuted: "rgba(255, 255, 255, 0.72)",
        accent: "#EF4444",
        outlineStroke: "rgba(255, 255, 255, 0.2)",
        headerBg: "rgba(128, 10, 12, 0.92)",
        tagBg: "rgba(255, 255, 255, 0.08)",
        browserGlow: "0 0 35px rgba(239, 68, 68, 0.35)",
        btnLiveBg: "#FFFFFF",
        btnLiveText: "#800A0C",
      }
    : {
        bg: "radial-gradient(ellipse at 50% 20%, #F7F5EE 0%, #E8E4DA 60%, #D8D4C8 100%)",
        cardBg: "#FFFFFF",
        cardBorder: "rgba(0, 0, 0, 0.12)",
        gridLine: "rgba(0, 0, 0, 0.12)",
        textPrimary: "#111111",
        textMuted: "#4B4B4B",
        accent: "#C81D1D",
        outlineStroke: "rgba(0, 0, 0, 0.12)",
        headerBg: "rgba(232, 228, 218, 0.94)",
        tagBg: "rgba(0, 0, 0, 0.05)",
        browserGlow: "0 24px 48px -12px rgba(0, 0, 0, 0.22)",
        btnLiveBg: "#111111",
        btnLiveText: "#FFFFFF",
      };

  const images =
    project.images && project.images.length > 0
      ? project.images
      : [project.image];

  return (
    <div
      className="relative z-50 min-h-screen w-full transition-colors duration-500 font-sans select-none overflow-x-hidden"
      style={{ background: theme.bg, color: theme.textPrimary }}
    >
      {/* Subtle background grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "240px",
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          1. STICKY EDITORIAL TOP NAVIGATION BAR
          Back arrow • Project Index • Live Demo • Source Code • Close
          ══════════════════════════════════════════════════════════════════════ */}
      <header
        className="sticky top-0 z-50 w-full backdrop-blur-xl border-b transition-colors duration-300"
        style={{
          background: theme.headerBg,
          borderColor: theme.gridLine,
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14 py-3.5 sm:py-4 flex items-center justify-between gap-4">
          {/* Back button */}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2.5 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-200 hover:scale-105 cursor-pointer group"
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center border transition-colors group-hover:bg-[#C81D1D] group-hover:text-white group-hover:border-[#C81D1D]"
              style={{ borderColor: theme.cardBorder }}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            </span>
            <span className="hidden sm:inline">BACK TO WORKS</span>
          </button>

          {/* Project Number / Badge */}
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5"
              style={{
                borderColor: theme.cardBorder,
                background: theme.tagBg,
                color: theme.accent,
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#C81D1D] animate-pulse" />
              <span>CASE STUDY 0{project.num} / 0{projectsData.length}</span>
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            {project.liveUrl && project.liveUrl !== "#home" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 hover:scale-105 shadow-sm"
                style={{
                  background: theme.btnLiveBg,
                  color: theme.btnLiveText,
                }}
              >
                <span>LIVE SITE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-110 cursor-pointer"
                style={{
                  borderColor: theme.cardBorder,
                  background: theme.tagBg,
                  color: theme.textPrimary,
                }}
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
            )}

            {/* Direct Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Case Study"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-110 hover:bg-[#C81D1D] hover:text-white cursor-pointer ml-1"
              style={{
                borderColor: theme.cardBorder,
                background: theme.tagBg,
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          2. GIANT BRUTALIST HERO COVER & SPECIFICATION STRIP
          ══════════════════════════════════════════════════════════════════════ */}
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14 pt-10 sm:pt-16 pb-28">
        {/* Floating Giant Wireframe Index Number */}
        <div
          aria-hidden="true"
          className="absolute right-4 top-4 sm:right-12 sm:top-10 font-display text-[clamp(7rem,18vw,18rem)] font-black leading-none select-none pointer-events-none opacity-20"
          style={{
            WebkitTextStroke: `2px ${theme.outlineStroke}`,
            color: "transparent",
          }}
        >
          0{project.num}
        </div>

        {/* Editorial Subheader */}
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#C81D1D] mb-4">
          <span>—</span>
          <span>SYSTEM SPECIFICATION & ARCHITECTURE BREAKDOWN</span>
        </div>

        {/* Hero Title */}
        <div className="max-w-4xl mb-8 sm:mb-12">
          <h1 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] font-black uppercase tracking-[-0.03em] leading-[0.92] mb-5">
            {project.title}
          </h1>
          <p
            className="text-lg sm:text-2xl font-light tracking-tight max-w-2xl leading-relaxed"
            style={{ color: theme.textMuted }}
          >
            {project.subtitle}
          </p>
        </div>

        {/* ── ARCHITECTURAL SPECIFICATION STRIP (Grid Blueprint) ── */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 border rounded-2xl overflow-hidden mb-16 sm:mb-20 shadow-lg"
          style={{
            background: isRedTheme ? "#141519" : "#FFFFFF",
            borderColor: theme.gridLine,
          }}
        >
          <div className="p-5 sm:p-6 border-b md:border-b-0 border-r" style={{ borderColor: theme.gridLine }}>
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
              01 // CLIENT / INDUSTRY
            </p>
            <p className="font-display font-black text-base sm:text-lg uppercase">
              {project.client}
            </p>
          </div>

          <div className="p-5 sm:p-6 border-b md:border-b-0 md:border-r" style={{ borderColor: theme.gridLine }}>
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
              02 // ENGINEERING ROLE
            </p>
            <p className="font-display font-black text-base sm:text-lg uppercase">
              {project.role}
            </p>
          </div>

          <div className="p-5 sm:p-6 border-r" style={{ borderColor: theme.gridLine }}>
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
              03 // TIMELINE & STATUS
            </p>
            <p className="font-display font-black text-base sm:text-lg uppercase text-[#C81D1D]">
              {project.year} • PRODUCTION
            </p>
          </div>

          <div className="p-5 sm:p-6">
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
              04 // PRIMARY ARCHITECTURE
            </p>
            <p className="font-display font-black text-base sm:text-lg uppercase">
              {project.category}
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            3. INTERACTIVE MULTI-VIEWPORT SHOWCASE STAGE
            Desktop Browser vs Smartphone Viewport Switcher + Thumbnails
            ══════════════════════════════════════════════════════════════════════ */}
        <div className="mb-20 sm:mb-24">
          {/* Stage Controls: Viewport Mode Switcher */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4 pb-3 border-b" style={{ borderColor: theme.gridLine }}>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C81D1D]">
                [ VIEWPORT STAGE ]
              </span>
              <span className="hidden sm:inline font-mono text-xs text-neutral-400">
                — Toggle devices or click thumbnails to inspect
              </span>
            </div>

            {/* Desktop / Mobile Switcher Pills */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewportMode("desktop")}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewportMode === "desktop"
                    ? "bg-[#C81D1D] text-white shadow-sm"
                    : "border opacity-60 hover:opacity-100"
                }`}
                style={{
                  borderColor: theme.cardBorder,
                }}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>DESKTOP</span>
              </button>

              <button
                type="button"
                onClick={() => setViewportMode("mobile")}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewportMode === "mobile"
                    ? "bg-[#C81D1D] text-white shadow-sm"
                    : "border opacity-60 hover:opacity-100"
                }`}
                style={{
                  borderColor: theme.cardBorder,
                }}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>MOBILE</span>
              </button>
            </div>
          </div>

          {/* Viewport Frame */}
          <AnimatePresence mode="wait">
            {viewportMode === "desktop" ? (
              /* ── DESKTOP MAC BROWSER MOCKUP ── */
              <motion.div
                key="desktop-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl sm:rounded-3xl border overflow-hidden shadow-2xl transition-all"
                style={{
                  borderColor: theme.cardBorder,
                  background: isRedTheme ? "#131418" : "#18191E",
                  boxShadow: theme.browserGlow,
                }}
              >
                {/* Mac Browser Top Chrome */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-black/40 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                    <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                    <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono tracking-wider bg-white/5 border border-white/10 text-white/60">
                    <span>https://{project.id}.production.app</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    ● 200 OK
                  </span>
                </div>

                {/* Desktop Screen Content */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0B0E]">
                  <img
                    src={images[activeImageIdx]}
                    alt={`${project.title} Interface Preview`}
                    className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
              </motion.div>
            ) : (
              /* ── RESPONSIVE MOBILE DUAL FRAME ── */
              <motion.div
                key="mobile-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl sm:rounded-3xl border p-8 sm:p-12 flex items-center justify-center gap-8 overflow-hidden shadow-2xl"
                style={{
                  borderColor: theme.cardBorder,
                  background: isRedTheme ? "#131418" : "#FFFFFF",
                  boxShadow: theme.browserGlow,
                }}
              >
                {/* Front Smartphone Frame */}
                <div className="w-56 sm:w-64 aspect-[9/18] rounded-[36px] p-2.5 bg-[#121316] border-2 border-white/20 shadow-2xl overflow-hidden relative">
                  <div className="w-full h-full rounded-[28px] overflow-hidden bg-black relative">
                    <img
                      src={images[activeImageIdx]}
                      alt="Mobile UI View"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-2 inset-x-0 flex justify-center">
                      <span className="w-14 h-3.5 rounded-full bg-black/90 flex items-center justify-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image Thumbnails Carousel Row (if multiple images) */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 pt-4 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative aspect-[16/10] w-24 sm:w-32 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIdx === idx
                      ? "border-[#C81D1D] scale-105 shadow-md"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Preview slide ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-white font-mono text-[9px] font-bold">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            4. BRUTALIST 2-COLUMN SPLIT: PROBLEM VS RESOLUTION
            ══════════════════════════════════════════════════════════════════════ */}
        <section className="mb-20 sm:mb-24">
          <div className="mb-6 flex items-center gap-3">
            <Terminal className="w-5 h-5 text-[#C81D1D]" />
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight">
              THE CHALLENGE & ARCHITECTURAL RESOLUTION
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* The Challenge Card */}
            <div
              className="p-6 sm:p-8 rounded-2xl border relative overflow-hidden"
              style={{
                background: isRedTheme ? "#141519" : "#FFFFFF",
                borderColor: theme.cardBorder,
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#C81D1D]" />
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#C81D1D] mb-4">
                <span>01</span>
                <span>•</span>
                <span>THE CORE BOTTLENECK</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight mb-4">
                What friction needed solving?
              </h3>
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: theme.textMuted }}
              >
                {project.problem || project.summary}
              </p>
            </div>

            {/* The Engineered Resolution Card */}
            <div
              className="p-6 sm:p-8 rounded-2xl border relative overflow-hidden"
              style={{
                background: isRedTheme ? "#141519" : "#FFFFFF",
                borderColor: theme.cardBorder,
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-emerald-500 mb-4">
                <span>02</span>
                <span>•</span>
                <span>ENGINEERED ARCHITECTURE</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight mb-4">
                How we solved it
              </h3>
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: theme.textMuted }}
              >
                {project.solution || project.deepDive}
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            5. COLOR SYSTEM & SEMANTIC DESIGN TOKENS
            ══════════════════════════════════════════════════════════════════════ */}
        <section className="mb-20 sm:mb-24">
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4 border-b pb-4" style={{ borderColor: theme.gridLine }}>
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-[#C81D1D]" />
              <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight">
                COLOR SYSTEM & DESIGN TOKENS
              </h2>
            </div>
            <span className="font-mono text-xs text-neutral-400">
              Click any swatch to copy HEX
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {project.colorPalette?.map((color, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleCopyHex(color.hex)}
                className="group relative flex flex-col rounded-2xl border p-4 text-left transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm"
                style={{
                  background: isRedTheme ? "#141519" : "#FFFFFF",
                  borderColor: theme.cardBorder,
                }}
              >
                <div
                  className="aspect-square w-full rounded-xl mb-3 shadow-inner relative flex items-center justify-center border border-black/10"
                  style={{ background: color.hex }}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-black/60 text-white backdrop-blur-md">
                    {copiedHex === color.hex ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </span>
                </div>

                <p className="font-mono font-bold text-xs uppercase tracking-wider">
                  {color.name}
                </p>
                <p className="font-mono text-[11px] text-[#C81D1D] font-bold mt-0.5">
                  {color.hex}
                </p>
                <p
                  className="text-[10px] font-mono mt-1"
                  style={{ color: theme.textMuted }}
                >
                  {color.role}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            6. PERFORMANCE BENCHMARKS & VERIFIED STATS
            ══════════════════════════════════════════════════════════════════════ */}
        <section className="mb-20 sm:mb-24">
          <div className="mb-6 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C81D1D]" />
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight">
              PERFORMANCE BENCHMARKS & METRICS
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {project.metrics?.map((metric, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border flex flex-col justify-between"
                style={{
                  background: isRedTheme ? "#141519" : "#FFFFFF",
                  borderColor: theme.cardBorder,
                }}
              >
                <p className="font-display text-3xl sm:text-5xl font-black text-[#C81D1D] mb-2 tracking-tight">
                  {metric.value}
                </p>
                <p
                  className="font-mono text-xs font-semibold leading-relaxed"
                  style={{ color: theme.textMuted }}
                >
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            7. CORE ARCHITECTURE PILLARS & DELIVERABLES
            ══════════════════════════════════════════════════════════════════════ */}
        {project.architecture && (
          <section className="mb-20 sm:mb-24">
            <div className="mb-6 flex items-center gap-3">
              <Cpu className="w-5 h-5 text-[#C81D1D]" />
              <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight">
                KEY ARCHITECTURE DECISIONS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.architecture.map((arch, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border flex flex-col justify-between"
                  style={{
                    background: isRedTheme ? "#141519" : "#FFFFFF",
                    borderColor: theme.cardBorder,
                  }}
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-[#C81D1D] block mb-2">
                      PILLAR 0{idx + 1}
                    </span>
                    <h3 className="font-display text-lg font-black uppercase tracking-tight mb-2">
                      {arch.title}
                    </h3>
                    <p
                      className="text-xs sm:text-sm leading-relaxed"
                      style={{ color: theme.textMuted }}
                    >
                      {arch.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            8. NEXT PROJECT MAGNETIC TEASER FOOTER
            ══════════════════════════════════════════════════════════════════════ */}
        <section className="pt-12 border-t" style={{ borderColor: theme.gridLine }}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => onSelectProject?.(nextProject.id)}
            className="group relative w-full p-8 sm:p-14 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-8 cursor-pointer transition-all duration-500 hover:scale-[1.01]"
            style={{
              background: isRedTheme ? "#141519" : "#FFFFFF",
              borderColor: theme.cardBorder,
            }}
          >
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C81D1D] block mb-2">
                NEXT CASE STUDY // 0{nextProject.num} OF 04
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight group-hover:text-[#C81D1D] transition-colors">
                {nextProject.title}
              </h2>
              <p
                className="font-mono text-xs uppercase tracking-wider mt-2"
                style={{ color: theme.textMuted }}
              >
                {nextProject.category}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-14 h-14 rounded-full border flex items-center justify-center text-white bg-[#C81D1D] group-hover:scale-110 transition-transform">
                <ArrowRight className="w-6 h-6" />
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
