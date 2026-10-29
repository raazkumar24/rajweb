import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import {
  Check,
  ArrowRight,
  Monitor,
  Database,
  Palette,
  Layers,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { servicesData } from "../data/servicesData";
import { EditorialSectionHeader, CircularStampBadge } from "../components/ui";

/* ──────────────────────────────────────────────
   Constants & Refined Subtle Tilts (Zero Mobile Overflow)
   ────────────────────────────────────────────── */
const desktopTilts = [-2, 0, 2, 3];
const mobileTilts = [-0.8, 0, 0.8, 1.2];

const serviceIcons = {
  "full-stack": Database,
  "ui-design": Palette,
  "figma-react": Monitor,
  wordpress: Layers,
};

const serviceShortLabels = {
  "full-stack": "Full-Stack",
  "ui-design": "UI/UX Design",
  "figma-react": "Figma → React",
  wordpress: "WordPress",
};

/* ──────────────────────────────────────────────
   Individual Stacking Card (Scroll-Driven via Motion)
   ────────────────────────────────────────────── */
function StackingCard({
  svc,
  index,
  total,
  smoothP,
  desktopTilt,
  mobileTilt,
  shouldReduceMotion,
  handleRequestQuote,
  isDesktop,
  isRedTheme,
}) {
  const Icon = serviceIcons[svc.id] || Monitor;
  const isFirst = index === 0;
  const step = total > 1 ? 1 / (total - 1) : 1;
  const start = (index - 1) * step;
  const end = index * step;

  // y transition: first card starts at 0, subsequent cards slide up from 105%
  const y = useTransform(
    smoothP,
    isFirst ? [0, 1] : [start, end],
    isFirst ? ["0%", "0%"] : ["105%", "0%"],
  );

  // opacity transition: ONLY fades in when card is close to entering (prevents peeking on mobile)
  const opacity = useTransform(
    smoothP,
    isFirst ? [0, 1] : [start + step * 0.35, end],
    isFirst ? [1, 1] : [0, 1],
  );

  // scale transition: card gently scales down as later cards stack over it
  const remainingCards = total - 1 - index;
  const targetScale = Math.max(0.93, 1 - remainingCards * 0.022);
  const scale = useTransform(smoothP, [end, 1], [1, targetScale]);

  // Subtle x-axis slip (reduced on mobile for clean fit)
  const xSlipDir = index % 2 === 0 ? 1 : -1;
  const maxSlip = isDesktop ? 18 : 6;
  const xSlip = useTransform(
    smoothP,
    isFirst ? [0, 1] : [start, start + step * 0.5, end],
    isFirst ? [0, 0] : [xSlipDir * maxSlip, xSlipDir * Math.round(maxSlip * 0.2), 0],
  );

  // Rotate-settle: subtle tilt that stays neatly inside mobile screen bounds
  const finalTilt = !shouldReduceMotion
    ? isDesktop
      ? desktopTilt
      : mobileTilt
    : 0;
  const wobble = isDesktop ? 1.8 : 0.6;
  const entryRotate = finalTilt + xSlipDir * wobble;
  const rotateZ = useTransform(
    smoothP,
    isFirst ? [0, 1] : [start, start + step * 0.5, end],
    isFirst
      ? [finalTilt, finalTilt]
      : [entryRotate, finalTilt + xSlipDir * (wobble * 0.25), finalTilt],
  );

  // pointerEvents: enabled when card has arrived and is active
  const [isInteractive, setIsInteractive] = useState(isFirst);
  useMotionValueEvent(smoothP, "change", (p) => {
    if (isFirst) {
      setIsInteractive(true);
    } else {
      setIsInteractive(p >= start + step * 0.25);
    }
  });

  return (
    <motion.div
      style={{
        y: shouldReduceMotion ? 0 : y,
        x: shouldReduceMotion ? 0 : xSlip,
        opacity: shouldReduceMotion ? 1 : opacity,
        scale: shouldReduceMotion ? 1 : scale,
        rotate: shouldReduceMotion ? finalTilt : rotateZ,
        zIndex: index + 1,
        pointerEvents: isInteractive ? "auto" : "none",
        transformOrigin: "center 85%",
        willChange: "transform, opacity",
      }}
      className="absolute inset-0 h-full w-full"
    >
      <div
        className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border p-4 sm:p-7 lg:p-8 shadow-xl transition-all duration-300"
        style={{
          background: isRedTheme ? "#131418" : "#FFFFFF",
          borderColor: isRedTheme
            ? "rgba(255, 255, 255, 0.12)"
            : "rgba(0, 0, 0, 0.1)",
          boxShadow: isRedTheme
            ? "0 20px 45px -10px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.06)"
            : "0 20px 45px -10px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          color: isRedTheme ? "#FFFFFF" : "#111111",
        }}
      >
        {/* Subtle Watermark Number in Background (Very faint to prevent distraction) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -bottom-4 font-display text-[clamp(6rem,14vw,12rem)] font-black leading-none select-none opacity-[0.04]"
          style={{
            WebkitTextStroke: isRedTheme
              ? "1.5px rgba(255,255,255,0.6)"
              : "1.5px rgba(0,0,0,0.5)",
            color: "transparent",
          }}
        >
          {svc.num}
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            {/* ── CARD HEADER: ICON, CATEGORY & TIMELINE ── */}
            <div
              className="mb-3 sm:mb-4 flex items-center justify-between gap-3 border-b pb-3 sm:pb-3.5"
              style={{
                borderColor: isRedTheme
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.06)",
              }}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span
                  className="font-display text-xl sm:text-2xl font-black leading-none"
                  style={{ color: isRedTheme ? "#FFFFFF" : "#C81D1D" }}
                >
                  {svc.num}
                </span>

                <div
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border"
                  style={{
                    background: isRedTheme
                      ? "rgba(255, 255, 255, 0.06)"
                      : "rgba(0, 0, 0, 0.04)",
                    borderColor: isRedTheme
                      ? "rgba(255, 255, 255, 0.12)"
                      : "rgba(0, 0, 0, 0.1)",
                    color: isRedTheme ? "#FFFFFF" : "#C81D1D",
                  }}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-75 truncate max-w-[140px] sm:max-w-none">
                  {svc.subtitle}
                </span>
              </div>

              {/* Timeline Pill */}
              <span
                className="shrink-0 rounded-full px-2.5 sm:px-3 py-1 font-mono text-[9px] sm:text-[11px] font-bold uppercase tracking-wider border flex items-center gap-1"
                style={{
                  background: isRedTheme
                    ? "rgba(239, 68, 68, 0.12)"
                    : "rgba(200, 29, 29, 0.06)",
                  borderColor: isRedTheme
                    ? "rgba(239, 68, 68, 0.3)"
                    : "rgba(200, 29, 29, 0.2)",
                  color: isRedTheme ? "#FFA5A5" : "#C81D1D",
                }}
              >
                <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>{svc.timeline}</span>
              </span>
            </div>

            {/* ── TITLE & DESCRIPTION ── */}
            <h3 className="font-display mb-1.5 sm:mb-2 text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight leading-tight">
              {svc.title}
            </h3>

            <p
              className="mb-4 sm:mb-5 max-w-2xl text-[11px] sm:text-xs lg:text-sm leading-relaxed"
              style={{
                color: isRedTheme ? "rgba(255,255,255,0.72)" : "#4B5563",
              }}
            >
              {svc.description}
            </p>

            {/* ── DELIVERABLES GRID ── */}
            <div>
              <span className="mb-2 block font-mono text-[10px] sm:text-[11px] font-bold tracking-widest uppercase opacity-75">
                INCLUDED DELIVERABLES:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                {svc.deliverables.map((item, dIdx) => (
                  <li
                    key={dIdx}
                    className="flex items-center gap-2 rounded-lg border p-2 sm:p-2.5 text-[11px] sm:text-xs font-medium"
                    style={{
                      background: isRedTheme
                        ? "rgba(255, 255, 255, 0.04)"
                        : "#FAF8F5",
                      borderColor: isRedTheme
                        ? "rgba(255, 255, 255, 0.06)"
                        : "rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <span
                      className="flex h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: isRedTheme
                          ? "rgba(16, 185, 129, 0.2)"
                          : "rgba(16, 185, 129, 0.15)",
                        color: "#10B981",
                      }}
                    >
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                    <span className="truncate">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── CARD FOOTER: STACK TAGS & INQUIRE ACTION ── */}
          <div
            className="mt-4 sm:mt-5 flex flex-wrap items-center justify-between gap-2.5 border-t pt-3 sm:pt-4"
            style={{
              borderColor: isRedTheme
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.06)",
            }}
          >
            <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
              <span className="mr-0.5 font-mono text-[10px] sm:text-xs opacity-60">
                STACK:
              </span>
              {svc.stack.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded border px-2 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    borderColor: isRedTheme
                      ? "rgba(255, 255, 255, 0.14)"
                      : "rgba(0, 0, 0, 0.12)",
                    background: isRedTheme
                      ? "rgba(0, 0, 0, 0.2)"
                      : "rgba(0, 0, 0, 0.03)",
                  }}
                >
                  [ {tag} ]
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={(e) => handleRequestQuote(e, svc.title)}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 shadow-md flex items-center gap-1.5 cursor-pointer ml-auto sm:ml-0"
              style={{
                background: isRedTheme ? "#FFFFFF" : "#111111",
                color: isRedTheme ? "#8A0B0D" : "#FFFFFF",
              }}
            >
              <span>INQUIRE</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Main Services Section (Smooth Scroll for Both Mobile & Desktop)
   ────────────────────────────────────────────── */
export default function Services({ heroMode = "red" }) {
  const isRedTheme = heroMode === "red";
  const stageRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track scroll progress across the stacking stage wrapper
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  // Silky smooth spring physics (tuned for both mobile touch and desktop trackpad)
  const smoothP = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 30,
    mass: 0.18,
  });

  // Sync active step with smooth scroll progress
  useMotionValueEvent(smoothP, "change", (p) => {
    const count = servicesData.length;
    const currentIdx = Math.min(
      count - 1,
      Math.max(0, Math.floor(p * count * 0.999)),
    );
    if (currentIdx !== activeStep) {
      setActiveStep(currentIdx);
    }
  });

  const goToCard = (index) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const stageTop = rect.top + window.scrollY - 80;
    const totalScrollable = el.offsetHeight - window.innerHeight;
    const targetP =
      servicesData.length > 1 ? index / (servicesData.length - 1) : 0;
    const targetY = stageTop + Math.max(0, totalScrollable * targetP);

    if (window.__lenis) {
      window.__lenis.scrollTo(targetY);
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    const prev = activeStep > 0 ? activeStep - 1 : servicesData.length - 1;
    goToCard(prev);
  };

  const handleNext = () => {
    const next = activeStep < servicesData.length - 1 ? activeStep + 1 : 0;
    goToCard(next);
  };

  const handleRequestQuote = (e, serviceTitle) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo("#contact", { offset: -80 });
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        window.scrollTo({
          top:
            contactSection.getBoundingClientRect().top +
            window.pageYOffset -
            80,
          behavior: "smooth",
        });
      }
    }
    window.dispatchEvent(
      new CustomEvent("prefill-contact-service", {
        detail: { service: serviceTitle },
      }),
    );
  };

  const n = servicesData.length;
  // Responsive scroll travel distance (comfortable on mobile, thorough on desktop)
  const stageHeightVh = isDesktop
    ? Math.max(100, 100 + (n - 1) * 70)
    : Math.max(100, 100 + (n - 1) * 55);

  const theme = isRedTheme
    ? {
        bg: "radial-gradient(ellipse at 50% 30%, #C41618 0%, #8A0B0D 55%, #50080B 100%)",
        textPrimary: "#FFFFFF",
        textMuted: "rgba(255, 255, 255, 0.75)",
        outlineTitle: "rgba(255, 255, 255, 0.9)",
        titleFill: "#FFFFFF",
        gridLine: "rgba(255, 255, 255, 0.15)",
        stampColor: "#FFFFFF",
      }
    : {
        bg: "radial-gradient(ellipse at 50% 30%, #F7F5EE 0%, #E8E4DA 60%, #D8D4C8 100%)",
        textPrimary: "#111111",
        textMuted: "#4B4B4B",
        outlineTitle: "#111111",
        titleFill: "#111111",
        gridLine: "rgba(0, 0, 0, 0.14)",
        stampColor: "#111111",
      };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative z-20 w-full overflow-x-clip pt-14 pb-12 font-sans select-none scroll-mt-20 sm:pt-20 sm:pb-16 transition-colors duration-700"
      style={{
        background: theme.bg,
        color: theme.textPrimary,
      }}
    >
      {/* Paper / Film Grain Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "240px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14">
        {/* ── UNIFIED EDITORIAL HEADER ── */}
        <EditorialSectionHeader
          number="04"
          label="CAPABILITIES & SERVICES"
          outlineTitle="SPECIALIZED"
          solidTitle="SERVICES"
          description="Focused full-stack architecture, high-performance web applications, and turnkey digital products delivered with transparent milestone sprints."
          heroMode={heroMode}
        />
      </div>

      {/* ── 2. SCROLL-BASED STACKING DECK (Smooth Physics on Both Mobile & Desktop) ── */}
      <div
        ref={stageRef}
        className="relative w-full"
        style={{ height: `${stageHeightVh}vh` }}
      >
        <div className="sticky top-16 sm:top-20 flex min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)] flex-col justify-center py-2 sm:py-6">
          <div className="mx-auto w-full max-w-7xl px-3 sm:px-8 lg:px-14">
            {/* Controls Bar: Pill selector + Prev/Next buttons */}
            <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3">
              {/* Interactive Pill Selector */}
              <div
                role="tablist"
                aria-label="Select service"
                className="flex w-fit items-center gap-1 overflow-x-auto rounded-full border p-1 sm:p-1.5 shadow-md backdrop-blur-md"
                style={{
                  background: isRedTheme
                    ? "rgba(0, 0, 0, 0.35)"
                    : "rgba(255, 255, 255, 0.75)",
                  borderColor: theme.gridLine,
                  scrollbarWidth: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {servicesData.map((svc, idx) => {
                  const active = activeStep === idx;
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => goToCard(idx)}
                      className={`relative flex cursor-pointer items-center gap-1.5 sm:gap-2 whitespace-nowrap rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-bold uppercase tracking-wider transition-colors duration-200 ${
                        active
                          ? "text-white"
                          : isRedTheme
                            ? "text-white/60 hover:text-white"
                            : "text-[#555555] hover:text-[#111111]"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="services-pill"
                          className="absolute inset-0 rounded-full shadow-md"
                          style={{
                            background: isRedTheme ? "#C81D1D" : "#111111",
                          }}
                          transition={
                            shouldReduceMotion
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 400, damping: 30 }
                          }
                        />
                      )}

                      <span
                        className={`relative z-10 rounded-full px-1.5 py-0.5 font-mono text-[9px] font-bold transition-colors ${
                          active
                            ? "bg-white text-black"
                            : isRedTheme
                              ? "bg-white/10 text-white/70"
                              : "bg-black/10 text-black/70"
                        }`}
                      >
                        {svc.num}
                      </span>
                      <span className="relative z-10">
                        {serviceShortLabels[svc.id]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Arrows & Counter */}
              <div className="flex items-center gap-2">
                <span className="mr-1.5 font-mono text-xs font-bold tracking-widest opacity-75">
                  {String(activeStep + 1).padStart(2, "0")} /{" "}
                  {String(servicesData.length).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous service"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 cursor-pointer items-center justify-center rounded-full border transition-all duration-200 hover:scale-110"
                  style={{
                    background: isRedTheme
                      ? "rgba(0, 0, 0, 0.35)"
                      : "rgba(255, 255, 255, 0.75)",
                    borderColor: theme.gridLine,
                  }}
                >
                  <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next service"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 cursor-pointer items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110"
                  style={{
                    background: "#C81D1D",
                  }}
                >
                  <ChevronRight className="h-4 w-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Stacking Cards Deck Container (Responsive height prevents mobile cutoff & peeking) */}
            <div className="relative mx-auto h-[440px] sm:h-[480px] lg:h-[460px] w-full max-w-5xl">
              {servicesData.map((svc, idx) => (
                <StackingCard
                  key={svc.id}
                  svc={svc}
                  index={idx}
                  total={servicesData.length}
                  smoothP={smoothP}
                  desktopTilt={desktopTilts[idx]}
                  mobileTilt={mobileTilts[idx]}
                  shouldReduceMotion={shouldReduceMotion}
                  handleRequestQuote={handleRequestQuote}
                  isDesktop={isDesktop}
                  isRedTheme={isRedTheme}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
