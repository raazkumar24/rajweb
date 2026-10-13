import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowDownLeft, MapPin } from "lucide-react";
import { RobotHead } from "robot-heads";
import { SectionBadge } from "../components/ui";
import {
  HandDrawnUnderline,
  BrandTopLeftShape,
  BrandSectionRightWave,
  BrandJourneyCardBlob,
  HandwrittenBadge,
  SectionWaveDivider,
} from "../components/decorative";
import {
  WhatIUseTypographic,
  WhatDrivesMePinned,
} from "../components/features";
import { useGsapScope } from "../animation/useGsapScope";
import { ANIM } from "../animation/config";
import { CURRENT_THEME } from "../config/theme";

gsap.registerPlugin(ScrollTrigger);

const journeySteps = [
  {
    num: "01",
    year: "2024",
    title: "CURIOUS BEGINNINGS",
    desc: "Maine samjha ki website kya hoti hai aur kaise kaam karti hai.",
    tags: ["HTML", "CSS"],
    side: "left",
  },
  {
    num: "02",
    year: "2024 – 2025",
    title: "LEARNING TO BUILD",
    desc: "HTML, CSS, JavaScript aur React seekha.",
    tags: ["HTML", "CSS", "JavaScript", "React"],
    side: "right",
  },
  {
    num: "03",
    year: "2025 – Now",
    title: "GOING FULL-STACK",
    desc: "Backend seekh raha hoon (Node.js, Express.js, MongoDB).",
    tags: ["Node.js", "Express.js", "MongoDB"],
    side: "left",
  },
  {
    num: "04",
    year: "Now",
    title: "BUILDING PROJECTS",
    desc: "Full-stack project bana chuka hoon aur aage badh raha hoon.",
    tags: ["Full-Stack", "Web Apps"],
    side: "right",
  },
];

export default function About() {
  const containerRef = useRef(null);
  const pathDesktopRef = useRef(null);
  const pathMobileRef = useRef(null);
  const [robotSize, setRobotSize] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 640 ? 220 : 270,
  );
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 480) {
        setRobotSize(220);
      } else if (window.innerWidth < 768) {
        setRobotSize(250);
      } else {
        setRobotSize(270);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useGsapScope(containerRef, () => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".ab-intro-stagger",
        { y: ANIM.REVEAL_Y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: ANIM.STAGGER,
          duration: ANIM.DURATION.base,
          ease: ANIM.EASE,
          scrollTrigger: {
            trigger: ".ab-intro-section",
            start: ANIM.SCROLL_START,
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".ab-badge-wrap",
        { scale: 0.92, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".ab-intro-section",
            start: ANIM.SCROLL_START,
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".ab-journey-header > *",
        { y: ANIM.REVEAL_Y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: ANIM.STAGGER,
          duration: ANIM.DURATION.base,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".ab-journey-header",
            start: ANIM.SCROLL_START,
            once: true,
          },
        },
      );

      // Desktop Timeline Path Scrub (only triggered on desktop)
      mm.add("(min-width: 1024px)", () => {
        if (pathDesktopRef.current) {
          const len = pathDesktopRef.current.getTotalLength() || 1400;
          gsap.set(pathDesktopRef.current, {
            strokeDasharray: len,
            strokeDashoffset: len,
          });
          gsap.to(pathDesktopRef.current, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".ab-timeline-container",
              start: "top 75%",
              end: "bottom 75%",
              scrub: 1.2,
            },
          });
        }
      });

      // Mobile Timeline Path Scrub (only triggered on mobile/tablet)
      mm.add("(max-width: 1023px)", () => {
        if (pathMobileRef.current) {
          const len = pathMobileRef.current.getTotalLength() || 1200;
          gsap.set(pathMobileRef.current, {
            strokeDasharray: len,
            strokeDashoffset: len,
          });
          gsap.to(pathMobileRef.current, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".ab-timeline-container",
              start: "top 80%",
              end: "bottom 75%",
              scrub: 1.2,
            },
          });
        }
      });

      // Journey cards side reveal with once: true
      gsap.utils.toArray(".ab-journey-card-row").forEach((row, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          row.querySelector(".ab-card-inner"),
          {
            x:
              window.innerWidth >= 1024
                ? isLeft
                  ? -45
                  : 45
                : isLeft
                  ? -20
                  : 20,
            y: 25,
            opacity: 0,
            scale: 0.96,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: row,
              start: ANIM.SCROLL_START,
              once: true,
            },
          },
        );
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(
        [
          ".ab-intro-stagger",
          ".ab-badge-wrap",
          ".ab-journey-header > *",
          ".ab-card-inner",
        ],
        { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, clearProps: "all" },
      );
      if (pathDesktopRef.current)
        gsap.set(pathDesktopRef.current, { strokeDashoffset: 0 });
      if (pathMobileRef.current)
        gsap.set(pathMobileRef.current, { strokeDashoffset: 0 });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      id="about"
      className="relative w-full bg-[#FAF8F5] text-[#111111] overflow-hidden select-none font-sans"
    >
      <BrandTopLeftShape variant="about" />

      {/* 1. ABOUT ME (HERO / INTRO SECTION) */}
      <section className="ab-intro-section relative z-10 pt-20 sm:pt-24 lg:pt-[72px] xl:pt-[78px] pb-16 sm:pb-24">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="ab-intro-stagger mb-3 sm:mb-4">
                <SectionBadge label="About me" />
              </div>

              <div className="ab-intro-stagger relative inline-block mb-6 sm:mb-7">
                <h1 className="font-black italic uppercase leading-[0.92] tracking-[-0.04em] text-[3.2rem] sm:text-[4.4rem] lg:text-[5.2rem]">
                  <span className="text-[#111111] block">A LITTLE</span>
                  <span className="text-[#111111]">ABOUT </span>
                  <span className="relative inline-block text-brand-dark drop-shadow-[0_2px_4px_rgba(0,0,0,0.32)]">
                    ME
                    <HandDrawnUnderline
                      className="absolute left-0 w-full"
                      style={{ bottom: "-0.12em" }}
                      color="var(--brand-primary)"
                    />
                  </span>
                </h1>
              </div>

              <p className="ab-intro-stagger text-[#4B5563] text-base sm:text-lg leading-relaxed max-w-lg mb-8 font-normal">
                I'm Raj Shekhar, a{" "}
                <strong className="text-[#111111] font-semibold">
                  frontend and web developer
                </strong>{" "}
                who loves building modern, reliable websites. I focus on
                creating interfaces that look great, work smoothly on every
                phone, and help businesses turn visitors into customers.
              </p>

              <div className="ab-intro-stagger flex flex-wrap items-center gap-3.5">
                <a
                  href="#works"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#111111] hover:bg-brand text-white hover:text-[#111111] px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_28px_rgba(var(--brand-rgb),0.4)] active:scale-95"
                >
                  <span>View my work</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="ab-badge-wrap lg:col-span-6 relative flex items-center justify-center w-full py-2 lg:py-0">
              <div className="relative w-full max-w-[420px] flex flex-col items-center justify-center gap-4 sm:gap-5">
                {/* ── Refined Status Pill (Top) ── */}
                <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-black/8 shadow-xs text-xs font-semibold text-[#111111]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Available for Hire</span>
                  <span className="text-[#888888]">&bull;</span>
                  <span className="text-[10.5px] uppercase font-bold tracking-wider text-brand-dark">
                    Open for Work
                  </span>
                </div>

                {/* ── Interactive 3D Robot Mascot ── */}
                <div className="relative flex items-center justify-center">
                  <RobotHead
                    shape="hexagon"
                    state="idle"
                    color={CURRENT_THEME.primary}
                    size={robotSize}
                    interactive={true}
                    aria-label="Raj Shekhar - Frontend & MERN Developer Mascot"
                  />
                </div>

                {/* ── Refined Info & Title (Bottom) ── */}
                <div className="flex flex-col items-center text-center gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black italic uppercase text-xl sm:text-2xl text-[#111111] tracking-tight">
                      RAJ SHEKHAR
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand/12 text-brand-dark border border-brand/25">
                      Creative Dev
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#4B5563]">
                    Frontend Engineer &amp; MERN Stack Developer
                  </p>
                  <p className="text-[11px] text-[#777777] flex items-center gap-1.5 font-medium mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-dark" />
                    <span>India</span>
                    <span>&bull;</span>
                    <span>Remote Worldwide</span>
                  </p>
                </div>

                {/* ── Refined Metrics Bar ── */}
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5 w-full">
                  <div className="p-3 rounded-2xl bg-white/75 backdrop-blur-sm border border-black/8 flex flex-col items-center text-center shadow-xs hover:border-brand/40 transition-colors">
                    <span className="font-black italic text-lg sm:text-xl text-[#111111] leading-none">
                      10+
                    </span>
                    <span className="text-[10px] font-semibold text-[#666666] mt-1 uppercase tracking-tight">
                      Projects
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/75 backdrop-blur-sm border border-black/8 flex flex-col items-center text-center shadow-xs hover:border-brand/40 transition-colors">
                    <span className="font-black italic text-lg sm:text-xl text-brand-dark leading-none">
                      2+ Yrs
                    </span>
                    <span className="text-[10px] font-semibold text-[#666666] mt-1 uppercase tracking-tight">
                      Experience
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/75 backdrop-blur-sm border border-black/8 flex flex-col items-center text-center shadow-xs hover:border-brand/40 transition-colors">
                    <span className="font-black italic text-lg sm:text-xl text-[#111111] leading-none">
                      MERN
                    </span>
                    <span className="text-[10px] font-semibold text-[#666666] mt-1 uppercase tracking-tight">
                      Full Stack
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MY JOURNEY */}
      <section className="relative z-10 pt-20 sm:pt-24 pb-20 sm:pb-32">
        <BrandSectionRightWave />

        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="ab-journey-header grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16 sm:mb-20">
            <div className="lg:col-span-7">
              <div className="mb-3">
                <SectionBadge label="My journey" />
              </div>
              <div className="relative inline-block">
                <h2 className="font-black italic uppercase leading-[0.92] tracking-[-0.03em] text-[2.8rem] sm:text-[3.8rem] lg:text-[4.6rem]">
                  <span className="text-[#111111] block">FROM CURIOSITY</span>
                  <span className="text-[#111111]">TO </span>
                  <span className="relative inline-block text-brand">
                    CREATION
                    <HandDrawnUnderline
                      className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full"
                      color="var(--brand-primary)"
                    />
                  </span>
                </h2>
              </div>
            </div>
            <div className="lg:col-span-5 lg:pb-3">
              <p className="text-[#4B5563] text-base sm:text-lg font-light leading-relaxed max-w-md">
                A journey of continuous learning, building and turning ideas
                into real-world projects.
              </p>
              <HandwrittenBadge
                text="The journey so far"
                direction="curved-right"
                rotation="-rotate-6"
                className="mt-3 hidden sm:inline-flex"
              />
            </div>
          </div>

          <div className="ab-timeline-container relative">
            {/* ── DESKTOP ZIGZAG SVG PATH (lg: 1024px+) ── */}
            <div
              className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 1000 1200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="journeyBrandGradDesktop"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="var(--brand-stop-0)" />
                    <stop offset="35%" stopColor="var(--brand-primary)" />
                    <stop offset="70%" stopColor="var(--brand-primary-dark)" />
                    <stop offset="100%" stopColor="var(--brand-primary-deep)" />
                  </linearGradient>
                </defs>
                {/* Background Dashed True Zigzag Line */}
                <path
                  d="M 500 20 C 500 70, 360 90, 360 160 C 360 260, 640 300, 640 440 C 640 580, 360 620, 360 760 C 360 900, 640 940, 640 1050 C 640 1110, 500 1140, 500 1180"
                  stroke="#E5E7EB"
                  strokeWidth="3.5"
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                />
                {/* Active Scroll-Animated Brand Zigzag Line */}
                <path
                  ref={pathDesktopRef}
                  d="M 500 20 C 500 70, 360 90, 360 160 C 360 260, 640 300, 640 440 C 640 580, 360 620, 360 760 C 360 900, 640 940, 640 1050 C 640 1110, 500 1140, 500 1180"
                  stroke="url(#journeyBrandGradDesktop)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* ── MOBILE & TABLET ZIGZAG SVG PATH (< 1024px) ── */}
            <div
              className="block lg:hidden absolute inset-0 w-full h-full pointer-events-none z-0"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 360 1100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="journeyMobileGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="var(--brand-stop-0)" />
                    <stop offset="50%" stopColor="var(--brand-primary)" />
                    <stop offset="100%" stopColor="var(--brand-primary-deep)" />
                  </linearGradient>
                </defs>
                {/* Mobile Dashed Zigzag Base */}
                <path
                  d="M 50 30 C 50 80, 60 110, 70 160 C 80 230, 290 260, 290 400 C 290 530, 70 560, 70 700 C 70 820, 290 850, 290 980 C 290 1020, 180 1060, 180 1090"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                />
                {/* Mobile Active Scrub Zigzag Line */}
                <path
                  ref={pathMobileRef}
                  d="M 50 30 C 50 80, 60 110, 70 160 C 80 230, 290 260, 290 400 C 290 530, 70 560, 70 700 C 70 820, 290 850, 290 980 C 290 1020, 180 1060, 180 1090"
                  stroke="url(#journeyMobileGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* ── ALTERNATING ZIGZAG CARDS CONTAINER ── */}
            <div className="relative z-10 flex flex-col gap-14 sm:gap-20 lg:gap-28">
              {journeySteps.map((step, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div
                    key={step.num}
                    className={`ab-journey-card-row relative flex items-center w-full px-0 ${
                      isLeft
                        ? "justify-start lg:flex-row"
                        : "justify-end lg:flex-row-reverse"
                    }`}
                  >
                    {/* Horizontal Connector Line on Desktop */}
                    {/* <div
                      className={`hidden lg:block absolute top-1/2 -translate-y-1/2 z-10 h-[2px] ${
                        isLeft
                          ? "right-[50%] w-[6%] bg-gradient-to-r from-transparent to-brand"
                          : "left-[50%] w-[6%] bg-gradient-to-r from-brand to-transparent"
                      }`}
                    /> */}

                    {/* The Card Component */}
                    <div
                      className={`w-[88%] sm:w-[84%] lg:w-[44%] ${
                        isLeft
                          ? "mr-auto lg:mr-auto lg:ml-0"
                          : "ml-auto lg:ml-auto lg:mr-0"
                      }`}
                    >
                      <div className="relative group">
                        {/* Organic decorative shape behind card corner */}
                        {isLeft ? (
                          <BrandJourneyCardBlob
                            position="top-right"
                            size="md"
                          />
                        ) : (
                          <BrandJourneyCardBlob position="top-left" size="lg" />
                        )}

                        <div className="ab-card-inner relative z-10 rounded-[2rem] bg-white/60 backdrop-blur-3xl border border-white/70 p-6 sm:p-8 shadow-[0_8px_32px_rgba(var(--brand-rgb),0.18),0_20px_60px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(var(--brand-rgb),0.1)] ring-1 ring-brand/20 hover:ring-brand/40 hover:shadow-[0_12px_48px_rgba(var(--brand-rgb),0.28),0_26px_70px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,1)] transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                          {/* Multi-layer glass sheen */}
                          <div
                            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/80 via-white/20 to-transparent opacity-80"
                            aria-hidden="true"
                          />
                          {/* Brand accent bottom glow */}
                          <div
                            className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
                            aria-hidden="true"
                          />

                          {/* Top Meta Header */}
                          <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-brand to-brand-deep text-white flex items-center justify-center font-black text-sm shadow-[0_4px_14px_rgba(var(--brand-rgb),0.4)]">
                                {step.num}
                              </div>
                              <span className="text-xs font-bold text-brand-dark uppercase tracking-wider">
                                {step.year}
                              </span>
                            </div>

                            {/* Mobile Directional Zigzag Badge */}
                            <span className="lg:hidden text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand/10 text-brand-dark border border-brand/20 inline-flex items-center">
                              {idx === 0 && (
                                <span className="inline-flex items-center gap-1">
                                  Start <ArrowDownRight className="w-3 h-3" />
                                </span>
                              )}
                              {idx === 1 && (
                                <span className="inline-flex items-center gap-1">
                                  <ArrowDownLeft className="w-3 h-3" />{" "}
                                  Exploring
                                </span>
                              )}
                              {idx === 2 && (
                                <span className="inline-flex items-center gap-1">
                                  Building{" "}
                                  <ArrowDownRight className="w-3 h-3" />
                                </span>
                              )}
                              {idx === 3 && (
                                <span className="inline-flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand-dark animate-pulse" />{" "}
                                  Present
                                </span>
                              )}
                            </span>
                          </div>

                          <h3 className="relative z-10 font-black italic uppercase text-lg sm:text-xl text-[#111111] tracking-tight leading-snug mb-3">
                            {step.title}
                          </h3>

                          <p className="relative z-10 text-[#4B5563] text-sm sm:text-base leading-relaxed mb-6 font-normal">
                            {step.desc}
                          </p>

                          <div className="relative z-10 flex flex-wrap items-center gap-x-2.5 gap-y-1 pt-3.5 border-t border-black/[0.07] text-xs font-medium text-[#555555]">
                            <span className="text-[12px] font-semibold text-[#111111] mr-1">
                              Stack:
                            </span>
                            {step.tags.map((tag, tagIdx) => (
                              <React.Fragment key={tag}>
                                <span className="text-[#333333] font-medium">
                                  {tag}
                                </span>
                                {tagIdx < step.tags.length - 1 && (
                                  <span
                                    className="text-brand font-bold"
                                    aria-hidden="true"
                                  >
                                    &bull;
                                  </span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. TOOLS & TECHNOLOGIES (EDITORIAL TYPOGRAPHIC LIST) */}
      <WhatIUseTypographic />

      {/* 4. WHAT DRIVES ME (PINNED TYPOGRAPHY SEQUENCE) */}
      <WhatDrivesMePinned />

      {/* 5. BOTTOM CTA BANNER (COMPACT SLEEK GLASS STRIP) */}
      <section className="relative z-10 pb-16 pt-5 sm:pb-24 overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="relative group">
            {/* Organic corner blob */}
            <BrandJourneyCardBlob position="bottom-right" size="md" />

            <div className="ab-cta-banner-wrap relative z-10 rounded-2xl sm:rounded-3xl bg-white/60 backdrop-blur-2xl border border-white/70 py-6 px-6 sm:py-7 sm:px-9 lg:py-8 lg:px-10 shadow-[0_8px_30px_rgba(var(--brand-rgb),0.12),0_12px_40px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-brand/20 hover:ring-brand/35 transition-all duration-300 overflow-hidden">
              {/* Subtle glass sheen */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-white/10 to-transparent opacity-70"
                aria-hidden="true"
              />
              {/* Brand accent bottom line */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
                aria-hidden="true"
              />

              {/* Main Content Layout */}
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 mb-2 px-3 py-0.5 rounded-full bg-white/80 border border-brand/25 shadow-2xs">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-dark" />
                    </span>
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-brand-dark">
                      Let's Build Together
                    </span>
                  </div>

                  <h2 className="font-black italic uppercase text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-[-0.03em] text-[#111111]">
                    LET'S CREATE SOMETHING{" "}
                    <span className="relative inline-block text-brand-dark">
                      AMAZING
                      <HandDrawnUnderline
                        className="absolute -bottom-1 left-0 w-full"
                        color="var(--brand-primary)"
                      />
                    </span>{" "}
                    TOGETHER
                  </h2>

                  <p className="text-[#555555] text-xs sm:text-sm mt-1.5 font-normal max-w-lg">
                    Have a project in mind or need a frontend developer? Let's
                    turn your ideas into reality.
                  </p>
                </div>

                {/* Right Action Buttons */}
                <div className="relative flex items-center gap-3 flex-shrink-0">
                  <a
                    href="#contact"
                    className="group relative inline-flex items-center gap-2 rounded-full bg-[#111111] hover:bg-brand text-white hover:text-[#111111] px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-[0_8px_20px_rgba(var(--brand-rgb),0.35)] active:scale-95 cursor-pointer overflow-hidden"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                    <span>Start a Project</span>
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </a>

                  <a
                    href="#works"
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/15 hover:border-brand text-[#111111] hover:text-brand px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-95 bg-white/70 backdrop-blur-md shadow-2xs hover:shadow-[0_6px_20px_rgba(var(--brand-rgb),0.15)] cursor-pointer"
                  >
                    <span>View work</span>
                    <span className="text-[#888888]">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Wave Divider: About → Works transition ── */}
      <SectionWaveDivider variant="about-to-works" className="relative z-10" />
    </div>
  );
}
