import React, { useState, useId, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  Palette,
  Check,
  ArrowUpRight,
  Sparkles,
  Maximize2,
  Terminal,
  ArrowRight,
  Zap,
  ShieldCheck,
  Laptop,
  Smartphone,
} from "lucide-react";
import { GitHubIcon, EditorialSectionHeader, CircularStampBadge } from "../components/ui";
import { projectsData } from "../data/projectsData";

/* ──────────────────────────────────────────────
   Torn Paper SVG Generator (Deterministic Mulberry32)
   ────────────────────────────────────────────── */
function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateTornPaths(width = 1440, height = 160, step = 14) {
  const rnd = mulberry32(1042);
  const base = 48;
  const amp = 8.5;

  const points = [];
  for (let x = 0; x <= width; x += step) {
    const notch = rnd() > 0.88 ? amp * 1.15 : 0;
    const y = base + (rnd() - 0.5) * 2 * amp + notch;
    const edgeOffset = 6 + rnd() * 4;
    points.push({ x, y, edgeY: y - edgeOffset });
  }

  if (points[points.length - 1].x < width) {
    points.push({ x: width, y: base, edgeY: base - 7 });
  }

  let paperD = `M 0 ${height} L 0 ${points[0].y.toFixed(1)}`;
  let shadowD = `M 0 ${height} L 0 ${points[0].edgeY.toFixed(1)}`;

  for (let i = 1; i < points.length; i++) {
    paperD += ` L ${points[i].x} ${points[i].y.toFixed(1)}`;
    shadowD += ` L ${points[i].x} ${points[i].edgeY.toFixed(1)}`;
  }

  paperD += ` L ${width} ${height} Z`;
  shadowD += ` L ${width} ${height} Z`;

  return { paper: paperD, shadow: shadowD };
}

function WorksTornDivider({ fillColor, edgeColor }) {
  const uid = useId().replace(/:/g, "");
  const paths = useMemo(() => generateTornPaths(), []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative w-full h-24 sm:h-32 -mt-10 sm:-mt-12 z-20 overflow-hidden"
    >
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <clipPath id={`clip-works-${uid}`}>
            <path d={paths.paper} />
          </clipPath>
          <filter id={`noise-works-${uid}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>

        {/* Paper fiber edge peeking out cleanly above the torn paper */}
        <path d={paths.shadow} fill={edgeColor} />

        {/* Lower background paper body */}
        <g clipPath={`url(#clip-works-${uid})`}>
          <path d={paths.paper} fill={fillColor} />
          <rect
            x="0"
            y="0"
            width="1440"
            height="160"
            filter={`url(#noise-works-${uid})`}
            opacity="0.08"
          />
        </g>
      </svg>
    </div>
  );
}

export default function Works({ heroMode = "red", onOpenCaseStudy }) {
  const isRedTheme = heroMode === "red";
  const [copiedHex, setCopiedHex] = useState(null);
  const [hoveredArchiveId, setHoveredArchiveId] = useState("ai-tutor-vision");

  const project01 = projectsData[0] || {};
  const project02 = projectsData[1] || {};
  const archiveProjects = projectsData.slice(2);

  const handleCopyHex = (e, hex) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  // Theme styling tokens exactly aligned with Hero Section lighting & energy
  const theme = isRedTheme
    ? {
        topBg: "radial-gradient(ellipse at 60% 32%, #C41618 0%, #8A0B0D 55%, #50080B 100%)",
        lowerBg: "#0B0C0E",
        textPrimary: "#FFFFFF",
        textMuted: "rgba(255, 255, 255, 0.75)",
        outlineTitle: "rgba(255, 255, 255, 0.9)",
        outlineNum: "rgba(255, 255, 255, 0.85)",
        titleFill: "#FFFFFF",
        browserBorder: "rgba(255, 255, 255, 0.35)",
        browserGlow:
          "0 0 55px rgba(255, 60, 60, 0.45), 0 25px 60px rgba(0, 0, 0, 0.65)",
        bracketBg: "rgba(20, 21, 26, 0.92)",
        bracketBorder: "rgba(255, 255, 255, 0.3)",
        bracketText: "#FFFFFF",
        arrowColor: "#FFFFFF",
        arrowDashColor: "rgba(255, 255, 255, 0.8)",
        tornEdge: "#C81D1D",
        tornFill: "#0B0C0E",
        gridLine: "rgba(255, 255, 255, 0.15)",
        gridLineAccent: "rgba(239, 68, 68, 0.55)",
        tableRowHover: "rgba(239, 68, 68, 0.15)",
        stampColor: "#FFFFFF",
        btnPrimaryBg: "#FFFFFF",
        btnPrimaryText: "#A81014",
        btnOutlineBorder: "rgba(255, 255, 255, 0.45)",
        btnOutlineText: "#FFFFFF",
      }
    : {
        topBg: "radial-gradient(ellipse at 60% 32%, #F7F5EE 0%, #E8E4DA 60%, #D8D4C8 100%)",
        lowerBg: "#DDD8CF",
        textPrimary: "#111111",
        textMuted: "#4B4B4B",
        outlineTitle: "#111111",
        outlineNum: "#111111",
        titleFill: "#111111",
        browserBorder: "rgba(0, 0, 0, 0.28)",
        browserGlow: "0 28px 65px -15px rgba(0, 0, 0, 0.32)",
        bracketBg: "#111111",
        bracketBorder: "rgba(0, 0, 0, 0.35)",
        bracketText: "#FFFFFF",
        arrowColor: "#C81D1D",
        arrowDashColor: "#C81D1D",
        tornEdge: "#C81D1D",
        tornFill: "#DDD8CF",
        gridLine: "rgba(0, 0, 0, 0.14)",
        gridLineAccent: "rgba(200, 29, 29, 0.5)",
        tableRowHover: "rgba(255, 255, 255, 0.65)",
        stampColor: "#111111",
        btnPrimaryBg: "#111111",
        btnPrimaryText: "#FFFFFF",
        btnOutlineBorder: "rgba(0, 0, 0, 0.35)",
        btnOutlineText: "#111111",
      };

  const activeArchiveProject =
    projectsData.find((p) => p.id === hoveredArchiveId) ||
    archiveProjects[0] ||
    project01;

  return (
    <section
      id="works"
      aria-labelledby="works-heading"
      className="relative z-20 w-full overflow-hidden transition-colors duration-700 select-none scroll-mt-14 font-sans"
    >
      {/* ══════════════════════════════════════════════════════════════════════
          PART A: TOP SHOWCASE CANVAS (HERO-GRADE VIBRANT LIGHTING & POLISH)
          — 03 / SELECTED ARCHIVE
          ROTATING STAMP
          STARBURST DECAL
          GIANT SELECTED WORKS.
          Project 01 3D Tilted Device with Neon Rim Glow & Floating Tag Stickers
          Project 02 Titanium Dual Smartphones with Parallax & Connecting SVG Flow
          ══════════════════════════════════════════════════════════════════════ */}
      <div
        className="relative w-full pt-16 sm:pt-24 pb-20 sm:pb-32 px-4 sm:px-8 lg:px-14 transition-all duration-700"
        style={{ background: theme.topBg, color: theme.textPrimary }}
      >
        {/* Paper & Film Grain Overlay matching Hero */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "240px",
          }}
        />

        {/* Ambient Radial Spotlight Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-25"
          style={{
            background: isRedTheme
              ? "radial-gradient(circle, #FF4545 0%, transparent 70%)"
              : "radial-gradient(circle, #FFFFFF 0%, transparent 70%)",
          }}
        />

        {/* Hero-Grade Starburst Decal in Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[10%] top-[18%] opacity-15 select-none"
        >
          <svg width="280" height="280" viewBox="0 0 260 260" fill="none">
            <path
              d="M130 0L145 95L240 50L175 125L260 130L175 145L240 215L145 175L130 260L115 175L20 215L85 145L0 130L85 125L20 50L115 95L130 0Z"
              fill={isRedTheme ? "#FFFFFF" : "#111111"}
            />
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          {/* ── UNIFIED EDITORIAL HEADER ── */}
          <EditorialSectionHeader
            number="03"
            label="SELECTED ARCHIVE"
            outlineTitle="SELECTED"
            solidTitle="WORKS"
            description="A curated archive of full-stack engineering builds, real-time client systems, and high-performance interactive web applications."
            heroMode={heroMode}
          />

          {/* ──────────────────────────────────────────────────────────────
              PROJECT 01: GENZ STORE & ADMIN PANEL
              3D Tilted Device Frame + Neon Rim Glow + Floating Callouts
              Hollow 01 + Title + Description + Live & Case Study Buttons
              ────────────────────────────────────────────────────────────── */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center mb-24 sm:mb-32">
            {/* Tilted Desktop Device Frame (Col 1-7) */}
            <div className="lg:col-span-7 relative flex items-center justify-center pt-8 pb-4">
              {/* Floating Sticker 1: [ NEXT.JS 15 ] (Top-Left) */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: -2 }}
                className="absolute -top-5 left-2 sm:left-6 z-25 flex flex-col items-center cursor-pointer"
              >
                <span
                  className="px-3.5 py-1.5 rounded-full font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xl backdrop-blur-md"
                  style={{
                    background: theme.bracketBg,
                    border: `1.5px solid ${theme.bracketBorder}`,
                    color: theme.bracketText,
                  }}
                >
                  [ NEXT.JS 15 ]
                </span>
                <svg
                  width="44"
                  height="36"
                  viewBox="0 0 44 36"
                  fill="none"
                  className="overflow-visible hidden sm:block pointer-events-none mt-1"
                >
                  <path
                    d="M 12 2 C 14 18, 28 24, 38 30"
                    stroke={theme.arrowColor}
                    strokeWidth="1.8"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 32 28 L 40 32 L 36 24"
                    stroke={theme.arrowColor}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              {/* Floating Sticker 2: [ MERN STACK ] (Middle-Right) */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 3 }}
                className="absolute top-1/4 -right-2 sm:-right-6 z-25 flex items-center gap-2 cursor-pointer"
              >
                <svg
                  width="36"
                  height="28"
                  viewBox="0 0 36 28"
                  fill="none"
                  className="overflow-visible hidden sm:block pointer-events-none"
                >
                  <path
                    d="M 32 20 C 20 20, 12 12, 4 8"
                    stroke={theme.arrowColor}
                    strokeWidth="1.8"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  className="px-3.5 py-1.5 rounded-full font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xl backdrop-blur-md"
                  style={{
                    background: theme.bracketBg,
                    border: `1.5px solid ${theme.bracketBorder}`,
                    color: theme.bracketText,
                  }}
                >
                  [ MERN STACK ]
                </span>
              </motion.div>

              {/* Floating Sticker 3: [ STRIPE CHECKOUT ] (Bottom-Right) */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: -3 }}
                className="absolute -bottom-5 right-8 sm:right-16 z-25 flex flex-col items-center cursor-pointer"
              >
                <span
                  className="px-3.5 py-1.5 rounded-full font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xl backdrop-blur-md flex items-center gap-1.5"
                  style={{
                    background: theme.bracketBg,
                    border: `1.5px solid ${theme.bracketBorder}`,
                    color: theme.bracketText,
                  }}
                >
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>[ STRIPE CHECKOUT ]</span>
                </span>
              </motion.div>

              {/* The 3D Tilted Device Container */}
              <motion.div
                whileHover={{ rotate: -1.5, scale: 1.025 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                role="button"
                tabIndex={0}
                onClick={() => onOpenCaseStudy?.("genz-store")}
                className="relative w-full max-w-xl aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer -rotate-[4deg] shadow-2xl transition-all duration-500 group"
                style={{
                  border: `2px solid ${theme.browserBorder}`,
                  boxShadow: theme.browserGlow,
                  background: isRedTheme ? "#111216" : "#18191E",
                }}
              >
                {/* Mac Chrome Header Bar */}
                <div className="h-9 px-4 flex items-center justify-between border-b border-white/10 bg-black/50 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <div className="px-4 py-0.5 rounded-full bg-white/10 border border-white/15 font-mono text-[10px] sm:text-[11px] text-white/80 tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>genz-store-platform.app</span>
                  </div>
                  <span className="text-white/60 text-xs">⤢</span>
                </div>

                {/* Device Screen Preview with Reflective Sheen */}
                <div className="relative w-full h-[calc(100%-2.25rem)] overflow-hidden bg-[#0C0D10]">
                  <img
                    src={project01.image}
                    alt="GENZ Store Platform"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Diagonal Glass Reflection Sheen */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-20"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
                    }}
                  />

                  {/* Glass overlay badge on preview */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-end justify-between">
                    <div>
                      <p className="font-display text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                        GENZ STORE & ADMIN PANEL
                      </p>
                      <p className="font-mono text-[10px] sm:text-xs text-white/80 uppercase tracking-wider">
                        E-Commerce Architecture • 99 Lighthouse
                      </p>
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-[#C81D1D] text-white font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                      <span>VIEW SYSTEM</span>
                      <span>↗</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Project 01 Info Panel (Col 8-12) */}
            <div className="lg:col-span-5 flex flex-col gap-5 lg:pl-6">
              <div className="flex items-start gap-4">
                {/* Giant Hollow Wireframe Number 01 */}
                <span
                  className="font-display text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.8] tracking-tight select-none"
                  style={{
                    WebkitTextStroke: `2px ${theme.outlineNum}`,
                    color: "transparent",
                    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
                  }}
                >
                  01
                </span>

                {/* Subtitle & Category */}
                <div className="flex flex-col pt-1">
                  <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-[#FFFFFF] bg-[#C81D1D] px-2 py-0.5 rounded w-fit mb-1">
                    01 / FULL-STACK PLATFORM
                  </span>
                  <span className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight">
                    HIGH-VOLUME E-COMMERCE
                  </span>
                </div>
              </div>

              {/* Title & Description Paragraph */}
              <div>
                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight mb-2">
                  GENZ STORE &amp; ADMIN PANEL
                </h3>
                <p
                  className="font-sans text-sm sm:text-base leading-relaxed"
                  style={{ color: theme.textMuted }}
                >
                  {project01.problem ||
                    "Curated digital commerce experience with multi-attribute filtering, optimistic cart sync, and real-time order tracking."}
                </p>
              </div>

              {/* Tech Stack Pills in Bracket Notation */}
              <div className="flex flex-wrap gap-2 pt-1">
                {(project01.stack || []).slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md border font-mono text-[11px] font-bold uppercase tracking-wider shadow-sm"
                    style={{
                      borderColor: theme.bracketBorder,
                      background: isRedTheme ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.6)",
                      color: theme.textPrimary,
                    }}
                  >
                    [ {tech} ]
                  </span>
                ))}
              </div>

              {/* Color Palette Preview Dots */}
              {project01.colorPalette && (
                <div className="flex items-center gap-2 pt-1">
                  <span
                    className="font-mono text-[10px] uppercase tracking-wider flex items-center gap-1"
                    style={{ color: theme.textMuted }}
                  >
                    <Palette className="w-3.5 h-3.5 text-[#C81D1D]" /> COLOR SYSTEM:
                  </span>
                  <div className="flex items-center gap-2">
                    {project01.colorPalette.slice(0, 5).map((c, cIdx) => (
                      <button
                        key={cIdx}
                        type="button"
                        title={`${c.name} (${c.hex}) - Click to copy`}
                        onClick={(e) => handleCopyHex(e, c.hex)}
                        className="w-4 h-4 rounded-full border border-black/25 relative hover:scale-125 transition-transform cursor-pointer shadow-sm"
                        style={{ background: c.hex }}
                      >
                        {copiedHex === c.hex && (
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 text-[8px] bg-black text-white rounded font-mono whitespace-nowrap">
                            copied
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {project01.liveUrl && (
                  <a
                    href={project01.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 rounded-full font-mono text-xs font-black tracking-wider uppercase transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-1.5"
                    style={{
                      background: theme.btnPrimaryBg,
                      color: theme.btnPrimaryText,
                    }}
                  >
                    <span>LIVE PREVIEW</span>
                    <span className="text-sm">↗</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => onOpenCaseStudy?.("genz-store")}
                  className="px-6 py-2.5 rounded-full font-mono text-xs font-black tracking-wider uppercase text-white bg-[#C81D1D] hover:bg-[#E02626] transition-all duration-200 hover:scale-105 shadow-lg cursor-pointer flex items-center gap-1.5"
                >
                  <span>CASE STUDY</span>
                  <span className="text-sm">↗</span>
                </button>

                {project01.githubUrl && (
                  <a
                    href={project01.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-full font-mono text-xs font-bold tracking-wider uppercase border opacity-80 hover:opacity-100 transition-all hover:scale-105 flex items-center gap-1.5"
                    style={{
                      borderColor: theme.btnOutlineBorder,
                      color: theme.btnOutlineText,
                    }}
                  >
                    <GitHubIcon className="w-3.5 h-3.5" />
                    <span>CODE</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────────
              CONNECTING CURVED RED DASHED ARROW:
              Hand-drawn style SVG path connecting Project 01 down to Project 02
              ────────────────────────────────────────────────────────────── */}
          <div className="relative w-full h-20 sm:h-28 my-4 flex items-center justify-center overflow-visible pointer-events-none">
            <svg
              viewBox="0 0 800 120"
              fill="none"
              className="w-full h-full max-w-2xl overflow-visible"
            >
              <path
                d="M 220 10 C 260 90, 420 100, 560 60"
                stroke={theme.arrowDashColor}
                strokeWidth="2.4"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
              <path
                d="M 548 50 L 564 60 L 552 72"
                stroke={theme.arrowDashColor}
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* ──────────────────────────────────────────────────────────────
              PROJECT 02: UDUPI VRINDAVAN (DUBAI)
              Left: Title & Subtitle with overlays text & status badges
              Right: Titanium Dual Smartphone Mockups with Parallax & Glare
              ────────────────────────────────────────────────────────────── */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center pt-2 pb-12">
            {/* Project 02 Info (Col 1-5) */}
            <div className="lg:col-span-5 flex flex-col gap-5 lg:pr-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-[#FFFFFF] bg-[#C81D1D] px-2 py-0.5 rounded w-fit">
                  02 / CLIENT HOSPITALITY
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-current opacity-70">
                  DUBAI, UAE
                </span>
              </div>

              <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.92]">
                UDUPI <br />
                VRINDAVAN <br />
                <span className="text-[#C81D1D]">(DUBAI)</span>
              </h3>

              <p
                className="font-sans text-sm sm:text-base leading-relaxed"
                style={{ color: theme.textMuted }}
              >
                Project details with mobile & desktop overlays. Real-time table
                reservation engine with interactive visual floor plan and
                automated SMS dispatches.
              </p>

              {/* Verified Stat Pill */}
              <div
                className="p-3 rounded-xl border flex items-center justify-between w-fit gap-4 backdrop-blur-md"
                style={{
                  borderColor: theme.gridLine,
                  background: isRedTheme ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.6)",
                }}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    0 DOUBLE-BOOKINGS POST-LAUNCH
                  </span>
                </div>
                <span className="font-mono text-[10px] font-bold text-[#C81D1D]">
                  WEBSOCKET SYNC
                </span>
              </div>

              {/* Color Palette Preview */}
              {project02.colorPalette && (
                <div className="flex items-center gap-2 pt-1">
                  <span
                    className="font-mono text-[10px] uppercase tracking-wider flex items-center gap-1"
                    style={{ color: theme.textMuted }}
                  >
                    <Palette className="w-3.5 h-3.5 text-[#C81D1D]" /> PALETTE:
                  </span>
                  <div className="flex items-center gap-2">
                    {project02.colorPalette.slice(0, 5).map((c, cIdx) => (
                      <button
                        key={cIdx}
                        type="button"
                        title={`${c.name} (${c.hex}) - Click to copy`}
                        onClick={(e) => handleCopyHex(e, c.hex)}
                        className="w-4 h-4 rounded-full border border-black/25 relative hover:scale-125 transition-transform cursor-pointer shadow-sm"
                        style={{ background: c.hex }}
                      >
                        {copiedHex === c.hex && (
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 text-[8px] bg-black text-white rounded font-mono whitespace-nowrap">
                            copied
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {project02.liveUrl && (
                  <a
                    href={project02.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 rounded-full font-mono text-xs font-black tracking-wider uppercase transition-all duration-200 hover:scale-105 shadow-lg flex items-center gap-1.5"
                    style={{
                      background: theme.btnPrimaryBg,
                      color: theme.btnPrimaryText,
                    }}
                  >
                    <span>LIVE PREVIEW</span>
                    <span className="text-sm">↗</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => onOpenCaseStudy?.("udupi-vrindavan")}
                  className="px-6 py-2.5 rounded-full font-mono text-xs font-black tracking-wider uppercase text-white bg-[#C81D1D] hover:bg-[#E02626] transition-all duration-200 hover:scale-105 shadow-lg cursor-pointer flex items-center gap-1.5"
                >
                  <span>CASE STUDY</span>
                  <span className="text-sm">↗</span>
                </button>

                {project02.githubUrl && (
                  <a
                    href={project02.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-full font-mono text-xs font-bold tracking-wider uppercase border opacity-80 hover:opacity-100 transition-all hover:scale-105 flex items-center gap-1.5"
                    style={{
                      borderColor: theme.btnOutlineBorder,
                      color: theme.btnOutlineText,
                    }}
                  >
                    <GitHubIcon className="w-3.5 h-3.5" />
                    <span>CODE</span>
                  </a>
                )}
              </div>
            </div>

            {/* Titanium Dual Smartphone Mockups (Col 6-12) */}
            <div className="lg:col-span-7 relative flex items-center justify-center py-6 sm:py-8">
              <div
                role="button"
                tabIndex={0}
                onClick={() => onOpenCaseStudy?.("udupi-vrindavan")}
                className="relative flex items-center justify-center cursor-pointer group select-none"
              >
                {/* Phone 1 (Back Smartphone / Angled Right) */}
                <motion.div
                  initial={{ rotate: 8, x: 35 }}
                  whileHover={{ rotate: 12, x: 50, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="w-48 sm:w-60 aspect-[9/18] rounded-[32px] sm:rounded-[40px] p-2.5 bg-[#1C1D22] border-2 border-white/25 shadow-2xl overflow-hidden"
                >
                  <div className="w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#0A0A0B] relative">
                    <img
                      src={project02.images?.[1] || project02.image}
                      alt="Udupi Table Booking Screen"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-2.5 inset-x-0 flex justify-center">
                      <span className="w-14 h-3 rounded-full bg-black/90" />
                    </div>
                  </div>
                </motion.div>

                {/* Phone 2 (Front Smartphone / Titanium Bezel / Main Focus) */}
                <motion.div
                  initial={{ rotate: -4, x: -25 }}
                  whileHover={{ rotate: 0, x: -35, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="relative z-10 w-52 sm:w-64 aspect-[9/18] rounded-[32px] sm:rounded-[40px] p-3 bg-[#111215] border-2 shadow-2xl overflow-hidden"
                  style={{
                    borderColor: isRedTheme
                      ? "rgba(255, 255, 255, 0.4)"
                      : "rgba(0, 0, 0, 0.35)",
                    boxShadow: isRedTheme
                      ? "0 0 45px rgba(239, 68, 68, 0.4), 0 25px 50px rgba(0,0,0,0.6)"
                      : "0 25px 50px -10px rgba(0,0,0,0.35)",
                  }}
                >
                  <div className="w-full h-full rounded-[22px] sm:rounded-[30px] overflow-hidden bg-[#18181B] relative flex flex-col justify-between">
                    <img
                      src={project02.image}
                      alt="Udupi Mobile App Interface"
                      className="w-full h-full object-cover object-top"
                    />

                    {/* Smartphone Dynamic Island Notch */}
                    <div className="absolute top-2.5 inset-x-0 flex justify-center">
                      <span className="w-16 h-4 rounded-full bg-black/95 flex items-center justify-between px-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      </span>
                    </div>

                    {/* Glass glare */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-20"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
                      }}
                    />

                    {/* Tap to Enlarge footer CTA */}
                    <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex items-center justify-between text-white">
                      <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                        [ TAP TO ENLARGE ]
                      </span>
                      <Maximize2 className="w-4 h-4 text-[#C81D1D]" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          PART B: TORN PAPER REALISTIC HORIZONTAL RIP TRANSITION
          ══════════════════════════════════════════════════════════════════════ */}
      <WorksTornDivider
        fillColor={theme.tornFill}
        edgeColor={theme.tornEdge}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          PART C: "MORE ARCHIVES" INTERACTIVE ARCHITECTURAL GRID TABLE
          03 / AI TUTOR VISION
          04 / GSAP PORTFOLIO
          With 3D floating preview card hovering over the table!
          ══════════════════════════════════════════════════════════════════════ */}
      <div
        className="relative w-full pt-10 sm:pt-14 pb-24 sm:pb-32 px-4 sm:px-8 lg:px-14 transition-colors duration-700"
        style={{ background: theme.lowerBg, color: theme.textPrimary }}
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          {/* Header of Archives Grid */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8 sm:mb-12 border-b pb-5" style={{ borderColor: theme.gridLine }}>
            <div>
              <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight">
                MORE ARCHIVES
              </h3>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#C81D1D] font-bold">
                INTERACTIVE GRID // VOL. 03
              </p>
            </div>

            <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
              HOVER OR CLICK ROW FOR 3D MEDIA PREVIEW
            </span>
          </div>

          {/* Grid Layout: Left Column Table, Right Floating 3D Laptop Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* The Interactive Table Rows (Col 1-8) */}
            <div className="lg:col-span-8 flex flex-col border-t" style={{ borderColor: theme.gridLine }}>
              {archiveProjects.map((project) => {
                const isHovered = hoveredArchiveId === project.id;

                return (
                  <div
                    key={project.id}
                    onMouseEnter={() => setHoveredArchiveId(project.id)}
                    onClick={() => onOpenCaseStudy?.(project.id)}
                    role="button"
                    tabIndex={0}
                    className="group relative flex flex-col sm:flex-row sm:items-center justify-between py-6 px-4 sm:px-6 border-b transition-all duration-300 cursor-pointer"
                    style={{
                      borderColor: isHovered
                        ? theme.gridLineAccent
                        : theme.gridLine,
                      background: isHovered
                        ? theme.tableRowHover
                        : "transparent",
                    }}
                  >
                    {/* Left details: 03 / Title */}
                    <div className="flex items-center gap-6 sm:gap-8">
                      <span
                        className="font-display text-2xl sm:text-3xl font-black"
                        style={{
                          color: isHovered ? "#C81D1D" : theme.textPrimary,
                        }}
                      >
                        {project.num}
                      </span>

                      <div className="flex flex-col">
                        <h4 className="font-display text-lg sm:text-2xl font-black uppercase tracking-tight">
                          {project.title.startsWith("GSAP") ? (
                            <>
                              <span className="text-[#C81D1D]">GSAP </span>
                              <span>PORTFOLIO</span>
                            </>
                          ) : (
                            project.title
                          )}
                        </h4>
                        <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Right details: Stack Tags & Action Arrow */}
                    <div className="flex items-center gap-3 sm:gap-6 mt-3 sm:mt-0">
                      <div className="hidden md:flex items-center gap-1.5">
                        {(project.stack || []).slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded border border-current font-mono text-[10px] font-bold uppercase tracking-wider opacity-60"
                          >
                            [ {tag} ]
                          </span>
                        ))}
                      </div>

                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C81D1D] flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                        <span>EXPLORE CASE STUDY</span>
                        <span>↗</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating 3D Laptop Preview Card (Col 9-12) */}
            <div className="lg:col-span-4 relative flex items-center justify-center p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeArchiveProject.id}
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -15 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  role="button"
                  tabIndex={0}
                  onClick={() => onOpenCaseStudy?.(activeArchiveProject.id)}
                  className="w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden border p-3.5 flex flex-col justify-between shadow-2xl cursor-pointer hover:scale-105 transition-transform"
                  style={{
                    background: isRedTheme ? "#14151A" : "#FFFFFF",
                    borderColor: isRedTheme
                      ? "rgba(239, 68, 68, 0.55)"
                      : "rgba(0, 0, 0, 0.22)",
                    boxShadow: isRedTheme
                      ? "0 0 35px rgba(239, 68, 68, 0.35)"
                      : "0 20px 45px -12px rgba(0,0,0,0.25)",
                  }}
                >
                  <div className="relative w-full h-[80%] rounded-xl overflow-hidden bg-black/50">
                    <img
                      src={activeArchiveProject.image}
                      alt={activeArchiveProject.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[9px] font-bold">
                      0{activeArchiveProject.num}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 px-1">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      {activeArchiveProject.title}
                    </span>
                    <span className="font-mono text-xs text-[#C81D1D] font-bold">
                      OPEN ↗
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
