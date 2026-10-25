import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import {
  BrandLeftAccentShape,
  BrandRightAccentShape,
  BrandCardCornerWave,
} from "../decoration/brandBackgroundShapes";

import SectionBadge from "../ui/SectionBadge";

const BRAND = "var(--brand-primary, #8B5CF6)";
const BRAND_LIGHT = "var(--brand-stop-0, #C4B5FD)";
const EASE = [0.22, 1, 0.36, 1];

/* ──────────────────────────────────────────────
   Journey Milestones Data
   ────────────────────────────────────────────── */
const journeySteps = [
  {
    num: "01",
    year: "2024",
    title: "Curious beginnings",
    desc: "Started by exploring how thoughtful interfaces guide attention, communicate clearly, and make every interaction feel intentional.",
    tags: ["HTML", "CSS"],
  },
  {
    num: "02",
    year: "2024 – 2025",
    title: "Learning to build",
    desc: "Moved from small experiments to polished interfaces, learning how structure, motion, and responsive thinking turn ideas into dependable products.",
    tags: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    num: "03",
    year: "2025 – Now",
    title: "Going full-stack",
    desc: "Stepped beyond the browser to build complete systems with APIs, databases, and practical backend decisions that keep products reliable.",
    tags: ["Node.js", "Express.js", "MongoDB"],
  },
  {
    num: "04",
    year: "Now",
    title: "Building real products",
    desc: "Today, I turn rough ideas into useful full-stack products, balancing a clear visual point of view with thoughtful details and real-world performance.",
    tags: ["Full-Stack", "Web Apps", "Figma/XD"],
  },
];

/* ──────────────────────────────────────────────
   Responsive SVG Bezier Paths
   ────────────────────────────────────────────── */
const desktopPath =
  "M 500 20 C 500 70, 360 90, 360 160 C 360 260, 640 300, 640 440 C 640 580, 360 620, 360 760 C 360 900, 640 940, 640 1020 C 640 1060, 500 1080, 500 1100";

const mobilePath =
  "M 200 10 C 200 45, 70 55, 70 150 C 70 235, 330 250, 330 370 C 330 475, 70 490, 70 610 C 70 725, 330 740, 330 850 C 330 960, 200 1000, 200 1090";

// Smoother curve for extra-narrow mobile viewports (< 480px)
const narrowMobilePath =
  "M 200 10 C 200 45, 110 55, 110 150 C 110 235, 290 250, 290 370 C 290 475, 110 490, 110 610 C 110 725, 290 740, 290 850 C 290 960, 200 1000, 200 1090";

const cardVariants = {
  hidden: ({ isLeft, isDesktop }) => ({
    opacity: 0,
    x: isDesktop ? (isLeft ? -28 : 28) : 0,
    y: 20,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
  },
};

/* ──────────────────────────────────────────────
   Timeline Finale (End Checkpoint + Pulse)
   ────────────────────────────────────────────── */
function TimelineFinale({ done, reduce }) {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-4 z-10 -translate-x-1/2 translate-y-1/2 sm:left-5 lg:left-1/2">
        <div className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand/30 bg-white">
          {done &&
            !reduce &&
            [0, 0.45].map((delay) => (
              <motion.span
                key={delay}
                className="absolute inset-0 rounded-full"
                style={{ background: BRAND }}
                initial={{ scale: 1, opacity: 0.35 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{
                  duration: 1.6,
                  ease: "easeOut",
                  delay,
                  repeat: 2,
                  repeatDelay: 0.3,
                }}
              />
            ))}

          <motion.span
            className="absolute inset-1 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${BRAND_LIGHT}, ${BRAND})`,
              boxShadow:
                "0 8px 20px -6px color-mix(in srgb, var(--brand-primary, #8B5CF6) 70%, transparent)",
            }}
            initial={false}
            animate={{ scale: done ? 1 : 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 260, damping: 14 }
            }
          />

          <svg
            viewBox="0 0 24 24"
            className="relative h-5 w-5"
            fill="none"
            stroke="white"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M5.5 12.5l4.2 4.2 8.8-9.4"
              initial={false}
              animate={{ pathLength: done ? 1 : 0, opacity: done ? 1 : 0 }}
              transition={
                reduce ? { duration: 0 } : { duration: 0.5, delay: 0.25 }
              }
            />
          </svg>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute left-1/2 top-full z-10 mt-10 w-max max-w-[85vw] -translate-x-1/2 text-center"
        initial={false}
        animate={
          done ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : 12 }
        }
        transition={
          reduce ? { duration: 0 } : { duration: 0.7, delay: 0.5, ease: EASE }
        }
      >
        <p className="text-sm font-semibold tracking-tight text-[#111111] sm:text-base">
          The journey continues
        </p>
        <p className="mt-1 text-xs text-[#6B7280] sm:text-sm">
          New chapters get added with every project.
        </p>
      </motion.div>
    </>
  );
}

/* ──────────────────────────────────────────────
   Timeline Track (SVG Curve + Scroll-Linked Dot)
   ────────────────────────────────────────────── */
function TimelineTrack({ track, progress, reduce, gradientId }) {
  const pathRef = useRef(null);
  const lengthRef = useRef(0);

  // Measure path length whenever viewport track changes
  useEffect(() => {
    if (pathRef.current) {
      lengthRef.current = pathRef.current.getTotalLength();
    }
  }, [track]);

  const getPoint = (value) => {
    const path = pathRef.current;
    const length = lengthRef.current;

    if (!path || !length) {
      return { x: track.width / 2, y: 0 };
    }

    const clamped = Math.min(Math.max(value, 0), 1);
    return path.getPointAtLength(clamped * length);
  };

  const dotLeft = useTransform(
    progress,
    (value) => `${(getPoint(value).x / track.width) * 100}%`,
  );
  const dotTop = useTransform(
    progress,
    (value) => `${(getPoint(value).y / track.height) * 100}%`,
  );
  const dotOpacity = useTransform(progress, [0, 0.02, 0.97, 1], [0, 1, 1, 0]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${track.width} ${track.height}`}
        preserveAspectRatio="none"
        fill="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="0"
            y2={track.height}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={BRAND_LIGHT} />
            <stop offset="100%" stopColor={BRAND} />
          </linearGradient>
        </defs>

        {/* Base subtle dashed track */}
        <path
          ref={pathRef}
          d={track.path}
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="2"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />

        {/* Soft glow beneath the animated curve */}
        <motion.path
          d={track.path}
          stroke={BRAND}
          strokeOpacity="0.18"
          strokeWidth="9"
          strokeLinecap="round"
          style={{ pathLength: reduce ? 1 : progress }}
        />

        {/* Scroll-linked gradient curve */}
        <motion.path
          d={track.path}
          stroke={`url(#${gradientId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength: reduce ? 1 : progress }}
        />
      </svg>

      {/* Traveling leading dot along the SVG curve */}
      {!reduce && (
        <motion.div
          className="absolute transform-gpu"
          style={{
            left: dotLeft,
            top: dotTop,
            opacity: dotOpacity,
          }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ background: BRAND }}
              animate={{ scale: [1, 2.6], opacity: [0.35, 0] }}
              transition={{
                duration: 1.6,
                ease: "easeOut",
                repeat: Infinity,
              }}
            />
            <span
              className="relative block h-3.5 w-3.5 rounded-full border-2 border-white"
              style={{
                background: BRAND,
                boxShadow:
                  "0 0 16px color-mix(in srgb, var(--brand-primary, #8B5CF6) 60%, transparent)",
              }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function Journey() {
  const timelineRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Viewport mode: "desktop" (>=1024px) | "mobile" (480px-1023px) | "narrow" (<480px)
  const [viewportMode, setViewportMode] = useState("mobile");
  const [timelineDone, setTimelineDone] = useState(false);

  useEffect(() => {
    const lgQuery = window.matchMedia("(min-width: 1024px)");
    const xsQuery = window.matchMedia("(max-width: 479px)");

    const updateMode = () => {
      if (lgQuery.matches) {
        setViewportMode("desktop");
      } else if (xsQuery.matches) {
        setViewportMode("narrow");
      } else {
        setViewportMode("mobile");
      }
    };

    updateMode();
    lgQuery.addEventListener("change", updateMode);
    xsQuery.addEventListener("change", updateMode);

    return () => {
      lgQuery.removeEventListener("change", updateMode);
      xsQuery.removeEventListener("change", updateMode);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 75%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.4,
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setTimelineDone((previous) =>
      value >= 0.97 ? true : previous && value >= 0.9,
    );
  });

  useEffect(() => {
    if (shouldReduceMotion) setTimelineDone(true);
  }, [shouldReduceMotion]);

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: EASE };

  // Select appropriate SVG path based on current viewport width
  const track =
    viewportMode === "desktop"
      ? { width: 1000, height: 1100, path: desktopPath }
      : viewportMode === "narrow"
        ? { width: 400, height: 1100, path: narrowMobilePath }
        : { width: 400, height: 1100, path: mobilePath };

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="relative z-10 isolate overflow-hidden border-b border-black/8 py-12 pb-28 sm:py-16 lg:py-20 lg:pb-28"
    >
      <BrandLeftAccentShape opacity={0.5} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14">
        {/* Section Heading */}
        <motion.div
          className="mb-10 grid grid-cols-1 items-end gap-6 border-b border-black/8 pb-6 sm:mb-12 sm:pb-8 lg:grid-cols-12"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={transition}
        >
          <div className="z-10 lg:col-span-7">
            <div className="mb-3">
              <SectionBadge number="01.1" label="Milestones" />
            </div>

            <h2
              id="journey-heading"
              className="font-display text-[clamp(2.2rem,4vw+0.6rem,3.6rem)] leading-[1.05] font-bold tracking-[-0.03em] text-[#111111]"
            >
              From curiosity to{" "}
              <span className="font-normal italic text-brand-dark">
                creation
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pb-1">
            <p className="max-w-md text-sm leading-relaxed font-normal text-[#4B5563] sm:text-base">
              A focused journey of continuous building, turning ideas into
              reliable full-stack applications.
            </p>
          </div>
        </motion.div>

        {/* Curved Timeline Container */}
        <div
          ref={timelineRef}
          className="relative isolate pb-24 sm:pb-28 lg:pb-32"
        >
          {/* Mobile / Tablet Track */}
          <div
            className="absolute inset-y-0 left-0 z-0 w-8 sm:w-10 lg:hidden"
            aria-hidden="true"
          >
            <TimelineTrack
              key={`mobile-${viewportMode}`}
              track={track}
              progress={smoothProgress}
              reduce={shouldReduceMotion}
              gradientId="journey-grad-mobile"
            />
          </div>

          {/* Desktop Track */}
          <div
            className="absolute inset-0 z-0 hidden lg:block"
            aria-hidden="true"
          >
            <TimelineTrack
              key="desktop"
              track={track}
              progress={smoothProgress}
              reduce={shouldReduceMotion}
              gradientId="journey-grad-desktop"
            />
          </div>

          {/* Zigzag Milestone Cards */}
          <div className="relative z-10 flex flex-col gap-6 sm:gap-10 lg:gap-16">
            {journeySteps.map((step, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <motion.article
                  key={step.num}
                  custom={{ isLeft, isDesktop: viewportMode === "desktop" }}
                  variants={cardVariants}
                  initial={shouldReduceMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  transition={transition}
                  className={`relative flex w-full items-center transform-gpu ${
                    isLeft
                      ? "justify-start lg:justify-start"
                      : "justify-start lg:justify-end"
                  } pl-8 sm:pl-10 lg:pl-0`}
                >
                  <div className="w-full min-w-0 lg:w-[45%]">
                    <div className="flat-card relative isolate h-full overflow-hidden rounded-2xl p-4 sm:p-6 lg:p-8">
                      <BrandCardCornerWave
                        position="top-right"
                        opacity={1}
                        className="h-32 w-[68%] sm:h-40 sm:w-[62%] lg:h-52 lg:w-[62%]"
                      />

                      <div className="relative z-10">
                        <div className="mb-3 flex items-center justify-between gap-1.5 sm:mb-4 sm:gap-3">
                          <span className="rounded bg-brand/10 px-1.5 py-1 font-mono text-[10px] font-bold text-brand-dark sm:px-2 sm:text-xs">
                            {step.num}
                          </span>

                          <span className="text-right font-mono text-[10px] text-[#777777] sm:text-xs">
                            {step.year}
                          </span>
                        </div>

                        <h3 className="mb-2 text-base leading-snug font-bold tracking-tight text-[#111111] sm:mb-2.5 sm:text-xl lg:text-2xl">
                          {step.title}
                        </h3>

                        <p className="mb-4 text-xs leading-relaxed font-normal text-[#4B5563] sm:mb-5 sm:text-sm lg:text-base">
                          {step.desc}
                        </p>

                        {/* Technology Tags */}
                        <div className="flex flex-wrap items-center gap-1.5 border-t border-black/8 pt-3 sm:gap-2">
                          <span className="mr-0.5 font-mono text-[10px] text-[#888888] sm:mr-1 sm:text-xs">
                            Focus:
                          </span>

                          {step.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded bg-black/5 px-2 py-1 text-[10px] leading-tight font-medium text-[#333333] sm:text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <TimelineFinale done={timelineDone} reduce={shouldReduceMotion} />
        </div>
      </div>

      <BrandRightAccentShape opacity={0.5} className="!bottom-0 !top-auto" />
    </section>
  );
}
