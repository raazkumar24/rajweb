import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { ArrowRight, Code2, ExternalLink, Globe, Layers } from "lucide-react";
import InteractiveButton from "../ui/InteractiveButton";

/* ──────────────────────────────────────────────
   Stage Tunables
   ────────────────────────────────────────────── */
const NAV_OFFSET = 88;
const ROW_H = 104;
const VH_PER_PROJECT = 85;
const EASE = [0.22, 1, 0.36, 1];

/* Smooth step interpolation so each project holds briefly while scrolling */
function toPos(p, n) {
  if (n <= 1) return 0;
  const raw = Math.min(1, Math.max(0, p)) * (n - 1);
  const base = Math.min(Math.floor(raw), n - 2);
  const frac = raw - base;
  const t = Math.min(1, Math.max(0, (frac - 0.2) / 0.6));
  return base + t * t * (3 - 2 * t);
}

export default function WorksStage({ projects = [], onOpen }) {
  const n = projects.length;
  const shouldReduceMotion = useReducedMotion();

  const stageRef = useRef(null);
  const frameRef = useRef(null);
  const viewportRef = useRef(null);
  const imgRefs = useRef([]);

  const [active, setActive] = useState(0);
  const [posState, setPosState] = useState(0);
  const [maxScrolls, setMaxScrolls] = useState([]);

  // Measure vertical overflow only (if a full-page screenshot is taller than the 16:10 desktop viewport)
  const measureImages = () => {
    const viewH = viewportRef.current?.clientHeight || 420;
    const scrolls = projects.map((_, i) => {
      const img = imgRefs.current[i];
      return img ? Math.max(0, img.offsetHeight - viewH) : 0;
    });
    setMaxScrolls(scrolls);
  };

  useEffect(() => {
    measureImages();
    window.addEventListener("resize", measureImages, { passive: true });
    return () => window.removeEventListener("resize", measureImages);
  }, [n, projects]);

  // Track scroll progress across the sticky stage wrapper
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const smoothP = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    mass: 0.35,
  });

  // Velocity-based subtle 3D desktop monitor physics
  const scrollVelocity = useVelocity(smoothP);
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 180,
    damping: 26,
  });

  const cardRotate = useTransform(
    smoothVelocity,
    [-1.2, 0, 1.2],
    shouldReduceMotion ? [0, 0, 0] : [-2.5, 0, 2.5],
  );
  const cardSkewY = useTransform(
    smoothVelocity,
    [-1.2, 0, 1.2],
    shouldReduceMotion ? [0, 0, 0] : [1.2, 0, -1.2],
  );
  const cardDriftY = useTransform(
    smoothVelocity,
    [-1.2, 0, 1.2],
    shouldReduceMotion ? [0, 0, 0] : [-10, 0, 10],
  );
  const cardScale = useTransform(
    smoothVelocity,
    [-1.2, 0, 1.2],
    shouldReduceMotion ? [1, 1, 1] : [0.975, 1, 0.975],
  );

  // Sync active project index & smooth position state
  useMotionValueEvent(smoothP, "change", (p) => {
    const pos = toPos(p, n);
    setPosState(pos);
    const idx = Math.min(n - 1, Math.max(0, Math.round(pos)));
    if (idx !== active) {
      setActive(idx);
    }
  });

  // Custom magnetic "VIEW" cursor inside preview frame
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springCursorX = useSpring(cursorX, { stiffness: 360, damping: 28 });
  const springCursorY = useSpring(cursorY, { stiffness: 360, damping: 28 });
  const [cursorVisible, setCursorVisible] = useState(false);

  const handleMouseMove = (e) => {
    if (!frameRef.current) return;
    const r = frameRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - r.left);
    cursorY.set(e.clientY - r.top);
  };

  const handleMouseEnter = (e) => {
    if (!frameRef.current) return;
    const r = frameRef.current.getBoundingClientRect();
    cursorX.jump(e.clientX - r.left);
    cursorY.jump(e.clientY - r.top);
    setCursorVisible(true);
  };

  const goTo = (index) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const stageTop = rect.top + window.scrollY - NAV_OFFSET;
    const totalScrollable = el.offsetHeight - window.innerHeight;
    const targetP = n > 1 ? index / (n - 1) : 0;
    const targetY = stageTop + Math.max(0, totalScrollable * targetP);

    if (window.__lenis) {
      window.__lenis.scrollTo(targetY);
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const getCleanHostname = (url) => {
    if (!url || url.startsWith("#")) return "live-preview.app";
    return url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0];
  };

  if (n === 0) return null;

  const current = projects[active] || projects[0] || {};
  const stageHeightVh = Math.max(
    100,
    100 + Math.max(0, n - 1) * VH_PER_PROJECT,
  );

  return (
    <div
      ref={stageRef}
      className="relative w-full"
      style={{ height: `${stageHeightVh}vh` }}
    >
      {/* Sticky Viewport Stage */}
      <div
        className="sticky flex items-center"
        style={{
          top: `${NAV_OFFSET}px`,
          height: `calc(100svh - ${NAV_OFFSET}px)`,
        }}
      >
        <div className="grid w-full grid-cols-12 items-center gap-6 xl:gap-10">
          {/* ───────────── LEFT (5 Cols): Counter + Drum-Roll Titles + Details ───────────── */}
          <div className="col-span-5 flex flex-col gap-5 pr-2">
            {/* Counter Row + Progress Bar + Dots */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] font-bold tracking-widest text-[#111111] tabular-nums">
                {String(active + 1).padStart(2, "0")}
                <span className="mx-1 text-[#C8C8C8]">/</span>
                {String(n).padStart(2, "0")}
              </span>

              <span className="relative h-[3px] max-w-32 flex-1 overflow-hidden rounded-full bg-black/8">
                <motion.span
                  className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-brand"
                  style={{ scaleX: smoothP }}
                />
              </span>

              <div className="flex items-center gap-1.5">
                {projects.map((_, i) => {
                  const dist = Math.abs(posState - i);
                  const scaleX = dist < 0.5 ? 2.4 : dist < 1.2 ? 1.4 : 1;
                  const opacity = dist < 0.5 ? 1 : dist < 1.2 ? 0.5 : 0.22;

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Go to project ${i + 1}`}
                      className="h-[5px] w-[5px] origin-center cursor-pointer rounded-full bg-[#111111] transition-transform duration-200"
                      style={{
                        transform: `scaleX(${scaleX})`,
                        opacity,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Drum-Roll Title Window */}
            <div
              className="relative overflow-hidden"
              style={{
                height: ROW_H * 3,
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 20%, #000 80%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 20%, #000 80%, transparent 100%)",
              }}
            >
              <div
                className="will-change-transform"
                style={{
                  transform: `translate3d(0, ${ROW_H - posState * ROW_H}px, 0)`,
                }}
              >
                {projects.map((p, i) => {
                  const d = Math.abs(posState - i);
                  const state = d < 0.35 ? "active" : d < 1.2 ? "near" : "far";

                  return (
                    <div
                      key={p.id}
                      className="flex items-center gap-2.5"
                      style={{ height: ROW_H }}
                    >
                      <span
                        className="shrink-0 rounded-full transition-all duration-300 ease-out"
                        style={{
                          width: "3px",
                          height: "1.8rem",
                          background: "var(--brand-primary)",
                          opacity: i === active ? 1 : 0,
                          transform:
                            i === active ? "scaleY(1)" : "scaleY(0.35)",
                        }}
                      />

                      <button
                        type="button"
                        data-s={state}
                        onClick={() => goTo(i)}
                        className="line-clamp-2 cursor-pointer text-left font-display font-black italic uppercase leading-[0.88] tracking-[-0.04em] transition-colors duration-300 data-[s=active]:text-[#111111] data-[s=near]:text-brand-dark data-[s=far]:text-[#111111]/12"
                        style={{ fontSize: "clamp(1.8rem, 3.2vw, 3rem)" }}
                      >
                        {p.title}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Project Metadata & Actions */}
            <div className="max-w-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="rounded-md bg-brand/12 px-2 py-0.5 font-mono text-[10px] font-bold text-brand-dark">
                      {current.num}
                    </span>
                    <span className="text-[11px] font-semibold text-[#888888]">
                      {current.year}
                    </span>
                    <span className="text-[#E0E0E0]">&middot;</span>
                    <span className="text-[11px] font-semibold text-[#333333]">
                      {current.client}
                    </span>
                    {current.role && (
                      <>
                        <span className="text-[#E0E0E0]">&middot;</span>
                        <span className="text-[11px] italic text-[#888888]">
                          {current.role}
                        </span>
                      </>
                    )}
                  </div>

                  <p className="mb-4 line-clamp-3 text-[13px] leading-relaxed text-[#4B5563]">
                    {current.summary}
                  </p>

                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {(current.stack || []).slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-black/8 bg-white px-2.5 py-1 font-mono text-[10px] font-semibold text-[#444444]"
                      >
                        {tech}
                      </span>
                    ))}
                    {(current.stack || []).length > 4 && (
                      <span className="rounded-md border border-black/6 bg-black/4 px-2 py-1 font-mono text-[10px] font-semibold text-[#777777]">
                        <Layers className="mr-0.5 inline h-2.5 w-2.5" />+
                        {current.stack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <InteractiveButton
                      type="button"
                      onClick={() => onOpen(current)}
                      variant="dark"
                      noShadow
                      className="px-4 py-2 text-xs"
                      icon={<ArrowRight className="h-3.5 w-3.5" />}
                    >
                      Case study
                    </InteractiveButton>

                    {current.liveUrl && !current.liveUrl.startsWith("#") && (
                      <a
                        href={current.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-black/12 bg-white px-3.5 py-2 text-[11px] font-semibold text-[#333333] transition-all duration-200 hover:border-brand hover:text-brand-dark"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Live site</span>
                      </a>
                    )}

                    {current.githubUrl && (
                      <a
                        href={current.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-semibold text-[#666666] transition-colors hover:text-[#111111]"
                      >
                        <Code2 className="h-3 w-3" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ───────────── RIGHT (7 Cols): True Widescreen Desktop Browser Stage (No Side Cropping) ───────────── */}
          <div className="col-span-7 flex items-center justify-end">
            <div
              ref={frameRef}
              data-cursor="view"
              role="button"
              tabIndex={0}
              aria-label={`Open case study: ${current.title}`}
              onClick={() => onOpen(current)}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => setCursorVisible(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpen(current);
                }
              }}
              className="relative w-full cursor-none p-3 outline-none focus-visible:ring-2 focus-visible:ring-brand xl:p-4"
            >
              {/* Outer Architectural Dashed Frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[1.75rem] border border-dashed border-black/12"
              />

              {/* Ghost Project Number Behind Frame */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 right-6 z-0 select-none font-display font-black italic leading-none text-black/[0.04]"
                style={{ fontSize: "clamp(6rem, 10vw, 11rem)" }}
              >
                {current.num}
              </span>

              {/* Widescreen Desktop Browser Window */}
              <motion.div
                className="relative z-10 flex w-full flex-col overflow-hidden rounded-[1.25rem] border border-black/12 bg-[#141414] transform-gpu"
                style={{
                  rotate: cardRotate,
                  skewY: cardSkewY,
                  y: cardDriftY,
                  scale: cardScale,
                  boxShadow:
                    "0 30px 70px -15px rgba(var(--brand-rgb), 0.25), 0 16px 36px -10px rgba(17, 17, 17, 0.18)",
                }}
              >
                {/* Top macOS Desktop Browser Bar */}
                <div className="flex h-9 shrink-0 items-center justify-between border-b border-white/10 bg-[#1E1E1E] px-4">
                  {/* Traffic Light Dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                  </div>

                  {/* Address Bar */}
                  <div className="flex max-w-[50%] items-center gap-1.5 truncate rounded-md border border-white/8 bg-white/6 px-3 py-0.5 font-mono text-[11px] text-white/75">
                    <Globe className="h-3 w-3 shrink-0 text-brand-light" />
                    <span className="truncate">
                      {getCleanHostname(current.liveUrl)}
                    </span>
                  </div>

                  {/* Right Status / Project Num */}
                  <div className="flex items-center gap-2">
                    {current.liveUrl && !current.liveUrl.startsWith("#") && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        Live
                      </span>
                    )}
                    <span className="font-mono text-[11px] font-bold text-white/60">
                      {current.num}
                    </span>
                  </div>
                </div>

                {/* True 16:10 Desktop Viewport (Full Width, 0% Horizontal Cropping) */}
                <div
                  ref={viewportRef}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-[#0F1115]"
                >
                  {projects.map((p, i) => {
                    const layerOpacity = Math.max(
                      0,
                      Math.min(1, 1 - Math.abs(posState - i)),
                    );
                    const localProgress = Math.max(
                      0,
                      Math.min(1, posState - i + 0.5),
                    );
                    const panY = -(maxScrolls[i] || 0) * localProgress;

                    return (
                      <div
                        key={p.id}
                        className="pointer-events-none absolute inset-0 flex items-start justify-center transition-opacity duration-150"
                        style={{ opacity: layerOpacity }}
                      >
                        {/* w-full h-auto ensures the entire desktop width is visible without side cropping */}
                        <img
                          ref={(el) => (imgRefs.current[i] = el)}
                          src={(p.images && p.images[0]) || p.image}
                          alt={`${p.title} desktop preview`}
                          draggable={false}
                          onLoad={measureImages}
                          className="block h-auto min-h-full w-full object-contain object-top will-change-transform"
                          style={{
                            transform: `translate3d(0, ${panY}px, 0)`,
                          }}
                        />
                      </div>
                    );
                  })}

                  {/* Subtle bottom vignette */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 select-none"
                    style={{
                      height: "20%",
                      background:
                        "linear-gradient(to top, rgba(10, 14, 20, 0.35) 0%, transparent 100%)",
                    }}
                  />
                </div>
              </motion.div>

              {/* Custom Magnetic "VIEW" Cursor */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 z-20 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[10px] font-black tracking-[0.18em] text-white"
                initial={false}
                animate={{
                  scale: cursorVisible ? 1 : 0,
                  opacity: cursorVisible ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 22,
                }}
                style={{
                  x: springCursorX,
                  y: springCursorY,
                  background:
                    "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-deep) 100%)",
                  boxShadow:
                    "0 10px 28px rgba(var(--brand-rgb), 0.55), 0 2px 8px rgba(17, 17, 17, 0.25)",
                }}
              >
                VIEW
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
