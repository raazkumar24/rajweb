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
} from "lucide-react";
import { servicesData } from "../data/servicesData";
import { SectionBadge, InteractiveButton } from "../components/ui";
import { HandwrittenBadge } from "../components/decoration/doodleCard";
import {
  BrandCardCornerWave,
  BrandSectionSideWave,
} from "../components/decoration/brandBackgroundShapes";

/* ──────────────────────────────────────────────
   Constants & Utilities
   ────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1];
const desktopTilts = [-2.5, 0, 2.5, 3.8];

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
  shouldReduceMotion,
  handleRequestQuote,
  isDesktop,
}) {
  const Icon = serviceIcons[svc.id] || Monitor;
  const isFirst = index === 0;
  const step = total > 1 ? 1 / (total - 1) : 1;
  const start = (index - 1) * step;
  const end = index * step;

  // y transition: first card starts at 0, subsequent cards slide up from 100%
  const y = useTransform(
    smoothP,
    isFirst ? [0, 1] : [start, end],
    isFirst ? ["0%", "0%"] : ["100%", "0%"],
  );

  // opacity transition: fades in as it slides up
  const opacity = useTransform(
    smoothP,
    isFirst ? [0, 1] : [start, start + step * 0.25, end],
    isFirst ? [1, 1] : [0, 1, 1],
  );

  // scale transition: card gently scales down as later cards stack over it
  const remainingCards = total - 1 - index;
  const targetScale = Math.max(0.92, 1 - remainingCards * 0.025);
  const scale = useTransform(smoothP, [end, 1], [1, targetScale]);

  // pointerEvents: enabled when card has arrived and is active
  const [isInteractive, setIsInteractive] = useState(isFirst);
  useMotionValueEvent(smoothP, "change", (p) => {
    if (isFirst) {
      setIsInteractive(true);
    } else {
      setIsInteractive(p >= start + step * 0.15);
    }
  });

  const tilt = !shouldReduceMotion && isDesktop ? desktopTilt : 0;

  return (
    <motion.div
      style={{
        y: shouldReduceMotion ? 0 : y,
        opacity: shouldReduceMotion ? 1 : opacity,
        scale: shouldReduceMotion ? 1 : scale,
        rotate: tilt,
        zIndex: index + 1,
        pointerEvents: isInteractive ? "auto" : "none",
        transformOrigin: "center 85%",
      }}
      className="absolute inset-0 h-full w-full"
    >
      <div className="flat-card relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl border border-black/8 bg-white p-5 shadow-[0_16px_45px_-12px_rgba(17,17,17,0.1)] sm:p-8 lg:p-9">
        <BrandCardCornerWave
          position="top-right"
          opacity={0.65}
          className="pointer-events-none h-32 w-48 sm:h-40 sm:w-60"
        />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            {/* Card Header */}
            <div className="mb-3.5 flex items-center justify-between gap-3 sm:mb-4">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-lg font-bold text-brand sm:text-xl">
                  {svc.num}
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand sm:h-8 sm:w-8">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="font-mono text-[11px] uppercase text-[#666666] sm:text-xs">
                  {svc.subtitle}
                </span>
              </div>
              <span className="rounded-full bg-brand/10 px-3 py-1 font-mono text-[11px] font-semibold text-brand-dark sm:text-xs">
                {svc.timeline}
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="font-display mb-2 text-xl font-bold tracking-tight text-[#111111] sm:text-2xl lg:text-3xl">
              {svc.title}
            </h3>

            <p className="mb-5 max-w-2xl text-xs leading-relaxed text-[#4B5563] sm:text-sm">
              {svc.description}
            </p>

            {/* Deliverables Grid */}
            <div>
              <span className="mb-2 block font-mono text-[11px] font-semibold tracking-wider text-[#111111] uppercase sm:text-xs">
                What is included:
              </span>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {svc.deliverables.map((item, dIdx) => (
                  <li
                    key={dIdx}
                    className="flex items-center gap-2.5 rounded-xl border border-black/6 bg-[#FAF8F5] p-2.5 text-xs text-[#333333]"
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                    <span className="truncate font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card Footer */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-black/8 pt-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 font-mono text-xs text-[#777777]">
                Stack:
              </span>
              {svc.stack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-black/6 bg-black/4 px-2 py-0.5 font-mono text-[11px] text-[#333333] sm:px-2.5 sm:py-1 sm:text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <InteractiveButton
              type="button"
              onClick={(e) => handleRequestQuote(e, svc.title)}
              variant="dark"
              noShadow
              className="px-4 py-2 text-xs"
              icon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              Inquire about this
            </InteractiveButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Main Services Section
   ────────────────────────────────────────────── */
export default function Services() {
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

  const smoothP = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.3,
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
  const stageHeightVh = Math.max(100, 100 + (n - 1) * 75);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative z-20 w-full overflow-x-clip bg-[#FAF8F5] pt-16 pb-12 font-sans text-[#111111] select-none scroll-mt-20 sm:pt-20 sm:pb-16"
    >
      <BrandSectionSideWave position="middle" opacity={0.3} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14">
        {/* ── 1. EDITORIAL HEADER ── */}
        <motion.div
          className="mb-8 grid grid-cols-1 items-end gap-6 border-b border-black/8 pb-6 sm:mb-12 sm:pb-8 lg:grid-cols-12"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <div className="lg:col-span-7">
            <div className="mb-3">
              <SectionBadge number="03" label="Services" />
            </div>

            <div className="relative inline-block">
              <h2
                id="services-heading"
                className="font-display text-[clamp(2.2rem,4vw+0.6rem,3.6rem)] leading-[1.05] font-bold tracking-[-0.03em] text-[#111111]"
              >
                Things I build &amp;{" "}
                <span className="font-normal italic text-brand-dark">
                  deliver.
                </span>
              </h2>

              {/* Doodle annotation: "No agency fees!" */}
              <HandwrittenBadge
                text="No agency fees!"
                arrowDirection="down-left"
                rotation="-rotate-2"
                textClass="text-sm sm:text-base"
                textColor="text-[#333333]"
                arrowClass="h-8 w-8 sm:h-10 sm:w-10"
                className="absolute -top-7 right-0 hidden sm:flex"
              />
            </div>
          </div>

          <div className="lg:col-span-5 lg:pb-1">
            <p className="max-w-md text-sm leading-relaxed font-normal text-[#4B5563] sm:text-base">
              Focused full-stack development, modern interfaces, and turnkey web
              solutions delivered without agency overhead.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── 2. SCROLL-BASED STACKING DECK (Motion Powered, No GSAP) ── */}
      <div
        ref={stageRef}
        className="relative w-full"
        style={{ height: `${stageHeightVh}vh` }}
      >
        <div className="sticky top-20 flex min-h-[calc(100vh-80px)] flex-col justify-center py-4 sm:py-6">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14">
            {/* Controls Bar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              {/* Interactive Pill Selector with motion layout animation */}
              <div
                role="tablist"
                aria-label="Select service"
                className="flex w-fit items-center gap-1 overflow-x-auto rounded-full border border-black/10 bg-white p-1.5 shadow-2xs sm:gap-1.5"
                style={{
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
                      className={`relative flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold transition-colors duration-200 sm:gap-2 sm:px-4 sm:text-sm ${
                        active
                          ? "text-white"
                          : "text-[#555555] hover:bg-black/4 hover:text-[#111111]"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="services-pill"
                          className="absolute inset-0 rounded-full bg-[#111111] shadow-md shadow-black/20 ring-1 ring-white/10"
                          transition={
                            shouldReduceMotion
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 420, damping: 32 }
                          }
                        />
                      )}

                      <span
                        className={`relative z-10 rounded-full px-1.5 py-0.5 font-mono text-[9px] font-bold transition-colors sm:text-[10px] ${
                          active
                            ? "bg-brand text-white"
                            : "bg-black/6 text-[#666666]"
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
                <span className="mr-2 hidden font-mono text-xs text-[#777777] sm:inline">
                  {String(activeStep + 1).padStart(2, "0")} /{" "}
                  {String(servicesData.length).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous service"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-[#111111] shadow-2xs transition-colors hover:bg-[#111111] hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next service"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#111111] text-white shadow-2xs transition-colors hover:bg-brand hover:text-[#111111]"
                >
                  <ChevronRight className="h-4 w-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Stacking Cards Deck Container */}
            <div className="relative mx-auto h-[540px] w-full max-w-5xl sm:h-[500px] lg:h-[480px]">
              {servicesData.map((svc, idx) => (
                <StackingCard
                  key={svc.id}
                  svc={svc}
                  index={idx}
                  total={servicesData.length}
                  smoothP={smoothP}
                  desktopTilt={desktopTilts[idx]}
                  shouldReduceMotion={shouldReduceMotion}
                  handleRequestQuote={handleRequestQuote}
                  isDesktop={isDesktop}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
