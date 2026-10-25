import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MapPin } from "lucide-react";

import SectionBadge from "../components/ui/SectionBadge";
import InteractiveButton from "../components/ui/InteractiveButton";
import LazyRobotHead from "../components/features/LazyRobotHead";
import Journey from "../components/features/Journey";
import { WhatIUseTypographic } from "../components/features";
import { CURRENT_THEME } from "../config/theme";
import { HandwrittenBadge } from "../components/decoration/doodleCard";

import {
  BrandTopLeftShape,
  BrandSectionRightWave,
  // BrandCtaBottomWave,
  BrandCardCornerWave,
} from "../components/decoration/brandBackgroundShapes";

/* ──────────────────────────────────────────────
   Animation Variants
   ────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1];

const introContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const introItem = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE,
    },
  },
};

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const [robotSize, setRobotSize] = useState(260);

  // Smooth RAF-throttled resize listener for Robot mascot size
  useEffect(() => {
    let rafId = null;

    const updateSize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const w = window.innerWidth;
        if (w < 480) {
          setRobotSize(210);
        } else if (w < 768) {
          setRobotSize(240);
        } else {
          setRobotSize(260);
        }
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize, { passive: true });

    return () => {
      window.removeEventListener("resize", updateSize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Smooth scroll helper supporting Lenis if initialized
  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo(`#${id}`, { offset: -80 });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const revealProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.15 },
        variants: introContainer,
      };

  const itemProps = shouldReduceMotion ? {} : { variants: introItem };

  return (
    <div
      id="about"
      className="relative w-full overflow-hidden bg-[#FAF8F5] font-sans text-[#111111] select-none"
    >
      <BrandTopLeftShape variant="about" opacity={0.5} />
      <BrandSectionRightWave opacity={0.4} />

      {/* ── 1. ABOUT INTRO ── */}
      <section className="ab-intro-section relative z-10 border-b border-black/8 pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Intro Content */}
            <motion.div
              className="flex flex-col justify-center lg:col-span-7"
              {...revealProps}
            >
              <motion.div className="mb-3 sm:mb-4" {...itemProps}>
                <SectionBadge number="01" label="About" />
              </motion.div>

              <motion.div className="mb-6 sm:mb-7" {...itemProps}>
                <div className="relative inline-block">
                  <h2 className="font-display text-[clamp(2.5rem,5.2vw+0.5rem,4.75rem)] leading-[1] font-bold tracking-[-0.03em]">
                    A little about{" "}
                    <span className="font-normal italic text-brand-dark">
                      me.
                    </span>
                  </h2>

                  {/* Doodle annotation: "Hey there!" */}
                  <HandwrittenBadge
                    text="Hey there!"
                    arrowDirection="down-left"
                    rotation="-rotate-2"
                    textClass="text-sm sm:text-base"
                    textColor="text-[#333333]"
                    arrowClass="h-8 w-8 sm:h-10 sm:w-10"
                    className="absolute -top-7 right-0 hidden sm:flex"
                  />
                </div>
              </motion.div>

              <motion.p
                className="mb-6 max-w-xl text-base leading-relaxed font-normal text-[#4B5563] sm:text-lg"
                {...itemProps}
              >
                I'm Raj Shekhar, a{" "}
                <strong className="font-semibold text-[#111111]">
                  Full-Stack MERN Developer &amp; Designer
                </strong>{" "}
                who designs in Figma/XD and builds complete MERN web
                applications. I work across interface design, React frontend
                architecture, RESTful APIs, MongoDB data modeling, and practical
                e-commerce flows.
              </motion.p>

              <motion.div
                className="flex flex-wrap items-center gap-3.5"
                {...itemProps}
              >
                <InteractiveButton
                  href="#works"
                  onClick={(e) => handleSmoothScroll(e, "works")}
                  variant="dark"
                  className="px-7 py-3"
                  icon={<span aria-hidden="true">&rarr;</span>}
                >
                  View my work
                </InteractiveButton>
              </motion.div>
            </motion.div>

            {/* Right Robot Mascot Profile */}
            <motion.div
              className="flex w-full items-center justify-center py-2 lg:col-span-5 lg:py-0"
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.8,
                ease: EASE,
              }}
            >
              <div className="relative flex w-full max-w-[380px] flex-col items-center justify-center gap-4 p-6 text-center">
                <div className="flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-[#111111]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span>Available for Work &bull; Remote</span>
                </div>

                <div className="my-1 flex items-center justify-center">
                  <LazyRobotHead
                    shape="hexagon"
                    state="idle"
                    color={CURRENT_THEME?.primary}
                    size={robotSize}
                    interactive={true}
                    ariaLabel="Raj Shekhar - Mascot"
                  />
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-[#111111]">
                    Raj Shekhar
                  </h3>

                  <p className="mt-0.5 font-mono text-xs font-medium text-brand-dark">
                    Full-Stack MERN + Figma/XD
                  </p>

                  <p className="mt-1 flex items-center justify-center gap-1.5 text-xs font-normal text-[#777777]">
                    <MapPin className="h-3.5 w-3.5 text-brand" />
                    <span>India &bull; Remote Worldwide</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. MY JOURNEY ── */}
      <Journey />

      {/* ── 3. TOOLS & TECHNOLOGIES ── */}
      <WhatIUseTypographic />

      {/* ── 4. REDESIGNED EDITORIAL COLLABORATION CTA ── */}
      <section className="relative z-10 isolate overflow-hidden py-16 sm:py-24">
        {/* <BrandCtaBottomWave opacity={0.35} /> */}

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14">
          <motion.div
            className="flat-card relative isolate overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-14"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.65,
              ease: EASE,
            }}
          >
            {/* Decorative Top-Right Brand Wave inside CTA Card */}
            <BrandCardCornerWave
              position="top-right"
              opacity={0.85}
              className="h-44 w-[65%] sm:h-56 sm:w-[50%] lg:h-64 lg:w-[42%]"
            />

            <div className="relative z-10 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
              {/* Left Column: Badge, Editorial Heading & Description */}
              <div className="lg:col-span-7">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <SectionBadge number="01.3" label="Collaboration" />

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] font-semibold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Taking new projects
                  </span>
                </div>

                <h2 className="font-display text-[clamp(2rem,3.8vw+0.5rem,3.25rem)] leading-[1.06] font-bold tracking-[-0.03em] text-[#111111]">
                  Let's create something{" "}
                  <span className="font-normal italic text-brand-dark">
                    meaningful
                  </span>
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-relaxed font-normal text-[#4B5563] sm:text-base">
                  Whether you need a high-converting restaurant or business
                  website, a custom Figma-to-React build, or a complete
                  full-stack MERN application—let's turn your roadmap into a
                  fast, reliable product.
                </p>
              </div>

              {/* Right Column: Handwritten Doodle + InteractiveButtons */}
              <div className="flex flex-col items-start gap-4 lg:col-span-5 lg:items-end">
                <div className="hidden sm:block lg:mr-4">
                  <HandwrittenBadge
                    text="Ready when you are!"
                    rotation="-rotate-3"
                    textClass="text-sm sm:text-base"
                    arrowDirection="curved-down-right"
                  />
                </div>

                <div className="flex w-full flex-wrap items-center gap-3.5 sm:w-auto lg:justify-end">
                  <InteractiveButton
                    href="#contact"
                    onClick={(e) => handleSmoothScroll(e, "contact")}
                    variant="dark"
                    icon={<span aria-hidden="true">&rarr;</span>}
                  >
                    Start a Project
                  </InteractiveButton>

                  <InteractiveButton
                    href="#works"
                    onClick={(e) => handleSmoothScroll(e, "works")}
                    variant="outline"
                    icon={<span aria-hidden="true">&rarr;</span>}
                  >
                    Explore Works
                  </InteractiveButton>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
