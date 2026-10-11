import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, MapPin, ArrowDownRight, ArrowDownLeft } from "lucide-react";
import { SectionBadge, Card3D } from "../components/ui";
import {
  HandDrawnUnderline,
  OrangeTopLeftShape,
  OrangeSectionRightWave,
  OrangeJourneyCardBlob,
  HandwrittenBadge,
  SectionWaveDivider,
} from "../components/decorative";
import {
  WhatIUseTypographic,
  WhatDrivesMePinned,
} from "../components/features";
import { useGsapScope } from "../animation/useGsapScope";
import { ANIM } from "../animation/config";

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
        }
      );

      gsap.fromTo(
        ".ab-badge-wrap",
        { scale: 0.9, opacity: 0, rotate: -4 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".ab-intro-section",
            start: ANIM.SCROLL_START,
            once: true,
          },
        }
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
        }
      );

      // Desktop Timeline Path Scrub (only triggered on desktop)
      mm.add("(min-width: 1024px)", () => {
        if (pathDesktopRef.current) {
          const len = pathDesktopRef.current.getTotalLength() || 1400;
          gsap.set(pathDesktopRef.current, { strokeDasharray: len, strokeDashoffset: len });
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
          gsap.set(pathMobileRef.current, { strokeDasharray: len, strokeDashoffset: len });
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
            x: window.innerWidth >= 1024 ? (isLeft ? -45 : 45) : (isLeft ? -20 : 20),
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
          }
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
        { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, clearProps: "all" }
      );
      if (pathDesktopRef.current) gsap.set(pathDesktopRef.current, { strokeDashoffset: 0 });
      if (pathMobileRef.current) gsap.set(pathMobileRef.current, { strokeDashoffset: 0 });
    });
  }, []);

  return (
    <div ref={containerRef} id="about" className="relative w-full bg-[#FAF8F5] text-[#111111] overflow-hidden select-none font-sans">
      <OrangeTopLeftShape variant="about" />

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
                  <span className="relative inline-block text-[#FF7700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.32)]">
                    ME
                    <HandDrawnUnderline
                      className="absolute left-0 w-full"
                      style={{ bottom: "-0.12em" }}
                      color="#FF8A00"
                    />
                  </span>
                </h1>
              </div>

              <p className="ab-intro-stagger text-[#4B5563] text-base sm:text-lg leading-relaxed max-w-lg mb-8 font-normal">
                I'm Raj Shekhar, a{" "}
                <strong className="text-[#111111] font-semibold">frontend and web developer</strong>{" "}
                who loves building modern, reliable websites. I focus on creating interfaces that look great, work smoothly on every phone, and help businesses turn visitors into customers.
              </p>

              <div className="ab-intro-stagger flex flex-wrap items-center gap-3.5">
                <a
                  href="#works"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#111111] hover:bg-[#FF8A00] text-white hover:text-[#111111] px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_28px_rgba(255,138,0,0.4)] active:scale-95"
                >
                  <span>View my work</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="ab-badge-wrap lg:col-span-6 relative flex items-center justify-center w-full">
              <div className="relative w-full max-w-[520px] flex items-center justify-center">
                {/* Ambient backdrop glow */}
                <div className="absolute -top-4 -right-4 w-64 h-64 rounded-full bg-[#FF8A00]/16 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-6 -left-6 w-56 h-56 rounded-full bg-[#FF9F1C]/14 blur-3xl pointer-events-none" />

                {/* Main 3D Developer Passport & Craft Card */}
                <Card3D maxTilt={6} scale={1.01} className="relative z-10 w-full">
                  <div className="relative rounded-[2rem] sm:rounded-[2.4rem] bg-white/90 backdrop-blur-2xl border border-black/8 p-6 sm:p-8 md:p-9 shadow-[0_24px_60px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)] overflow-hidden flex flex-col gap-5 sm:gap-6">
                    {/* Top Orange Gradient Horizon Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF8A00] via-[#FFAE33] to-[#FF8A00]" />

                    {/* Window Controls & Status Pill */}
                    <div className="flex items-center justify-between border-b border-black/8 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10 inline-block" />
                        <span className="ml-2 font-mono text-[11px] text-[#777777] font-medium hidden sm:inline">
                          raj-shekhar.dev
                        </span>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-xs">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-800 tracking-tight">
                          Available for Hire
                        </span>
                      </div>
                    </div>

                    {/* Identity Header */}
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#222222] text-white flex items-center justify-center font-black italic text-xl sm:text-2xl shadow-[0_8px_20px_rgba(0,0,0,0.25)] border-2 border-white/20">
                          <span className="text-[#FF8A00]">R</span>S
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#FF8A00] text-white flex items-center justify-center border-2 border-white shadow-xs">
                          <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <h3 className="font-black italic uppercase text-xl sm:text-2xl text-[#111111] tracking-tight leading-none">
                            RAJ SHEKHAR
                          </h3>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#FF8A00]/10 text-[#FF7700]">
                            CREATIVE DEV
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-[#4B5563] leading-snug">
                          Frontend Engineer & UI/UX Specialist
                        </p>
                        <p className="text-[11px] text-[#888888] mt-1 flex items-center gap-1.5 font-medium flex-wrap">
                          <span className="inline-flex items-center gap-1 text-[#4B5563]">
                            <MapPin className="w-3 h-3 text-[#FF7700]" /> India
                          </span>
                          <span>&bull;</span>
                          <span>Remote Worldwide</span>
                          <span>&bull;</span>
                          <span className="text-[#FF7700] font-semibold">Fast Turnaround</span>
                        </p>
                      </div>
                    </div>

                    {/* 3 Metric Pills */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 py-1">
                      <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-black/6 flex flex-col items-center text-center">
                        <span className="font-black italic text-lg sm:text-xl text-[#111111] leading-none">
                          10+
                        </span>
                        <span className="text-[10px] font-semibold text-[#777777] mt-1 uppercase tracking-tight">
                          Projects
                        </span>
                      </div>
                      <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-black/6 flex flex-col items-center text-center">
                        <span className="font-black italic text-lg sm:text-xl text-[#FF7700] leading-none">
                          2+ Yrs
                        </span>
                        <span className="text-[10px] font-semibold text-[#777777] mt-1 uppercase tracking-tight">
                          Experience
                        </span>
                      </div>
                      <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-black/6 flex flex-col items-center text-center">
                        <span className="font-black italic text-lg sm:text-xl text-[#111111] leading-none">
                          100%
                        </span>
                        <span className="text-[10px] font-semibold text-[#777777] mt-1 uppercase tracking-tight">
                          Dedication
                        </span>
                      </div>
                    </div>

                    {/* Developer Code / Standards Blueprint Snippet */}
                    <div className="rounded-2xl bg-[#111111] text-[#FAF8F5] p-3.5 sm:p-4 font-mono text-[11px] sm:text-xs leading-relaxed border border-white/10 shadow-inner">
                      <div className="flex items-center justify-between text-white/40 text-[10px] mb-2 pb-1.5 border-b border-white/10">
                        <span>// core-values.config.ts</span>
                        <span className="text-[#FF8A00] font-semibold">ESM</span>
                      </div>
                      <div className="space-y-1">
                        <div>
                          <span className="text-[#FF8A00]">const</span>{" "}
                          <span className="text-white font-semibold">craftStandards</span> = &#123;
                        </div>
                        <div className="pl-3 text-white/80">
                          code: <span className="text-[#38BDF8]">"clean & scalable"</span>,
                        </div>
                        <div className="pl-3 text-white/80">
                          responsive: <span className="text-[#34D399]">true</span>,
                        </div>
                        <div className="pl-3 text-white/80">
                          speed: <span className="text-[#FBBF24]">"60 FPS Motion"</span>,
                        </div>
                        <div>&#125;;</div>
                      </div>
                    </div>

                    {/* Tech Badges Row */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {["React", "JavaScript", "Tailwind CSS", "Node.js", "GSAP", "MongoDB"].map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-black/5 hover:bg-[#FF8A00]/15 text-[11px] font-semibold text-[#333333] transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card3D>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MY JOURNEY */}
      <section className="relative z-10 pt-20 sm:pt-24 pb-20 sm:pb-32">
        <OrangeSectionRightWave />

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
                  <span className="relative inline-block text-[#FF8A00]">
                    CREATION
                    <HandDrawnUnderline className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full" color="#FF8A00" />
                  </span>
                </h2>
              </div>
            </div>
            <div className="lg:col-span-5 lg:pb-3">
              <p className="text-[#4B5563] text-base sm:text-lg font-light leading-relaxed max-w-md">
                A journey of continuous learning, building and turning ideas into real-world projects.
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
            <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
              <svg viewBox="0 0 1000 1200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="journeyOrangeGradDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFB52E" />
                    <stop offset="35%" stopColor="#FF8A00" />
                    <stop offset="70%" stopColor="#FF7700" />
                    <stop offset="100%" stopColor="#FF5500" />
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
                {/* Active Scroll-Animated Orange Zigzag Line */}
                <path
                  ref={pathDesktopRef}
                  d="M 500 20 C 500 70, 360 90, 360 160 C 360 260, 640 300, 640 440 C 640 580, 360 620, 360 760 C 360 900, 640 940, 640 1050 C 640 1110, 500 1140, 500 1180"
                  stroke="url(#journeyOrangeGradDesktop)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* ── MOBILE & TABLET ZIGZAG SVG PATH (< 1024px) ── */}
            <div className="block lg:hidden absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
              <svg viewBox="0 0 360 1100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="journeyMobileGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFB52E" />
                    <stop offset="50%" stopColor="#FF8A00" />
                    <stop offset="100%" stopColor="#FF5500" />
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
                    {/* Desktop Center Milestone Waypoint Node */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none">
                      <div className="relative flex items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#FF8A00] opacity-30" />
                        <div className="relative w-7 h-7 rounded-full bg-white border-[3px] border-[#FF7700] shadow-[0_2px_12px_rgba(255,138,0,0.35)] flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-[#FF7700]" />
                        </div>
                      </div>
                    </div>

                    {/* Horizontal Connector Line on Desktop */}
                    <div
                      className={`hidden lg:block absolute top-1/2 -translate-y-1/2 z-10 h-[2px] ${
                        isLeft
                          ? "right-[50%] w-[6%] bg-gradient-to-r from-transparent to-[#FF8A00]"
                          : "left-[50%] w-[6%] bg-gradient-to-r from-[#FF8A00] to-transparent"
                      }`}
                    />

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
                          <OrangeJourneyCardBlob position="top-right" size="md" />
                        ) : (
                          <OrangeJourneyCardBlob position="top-left" size="lg" />
                        )}

                        <div className="ab-card-inner relative z-10 rounded-[2rem] bg-white/85 backdrop-blur-2xl border border-white/90 p-6 sm:p-8 shadow-[0_20px_45px_rgba(255,138,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_26px_55px_rgba(255,138,0,0.24)] transition-all duration-300 hover:-translate-y-1.5 overflow-hidden">
                          {/* Inner gradient sheen */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-white/30 opacity-70" aria-hidden="true" />

                          {/* Top Meta Header */}
                          <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#FF9500] to-[#FF5500] text-white flex items-center justify-center font-black text-sm shadow-[0_4px_14px_rgba(255,138,0,0.4)]">
                                {step.num}
                              </div>
                              <span className="text-xs font-bold text-[#FF7700] uppercase tracking-wider">
                                {step.year}
                              </span>
                            </div>

                            {/* Mobile Directional Zigzag Badge */}
                            <span className="lg:hidden text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FF8A00]/10 text-[#FF7700] border border-[#FF8A00]/20 inline-flex items-center">
                              {idx === 0 && (
                                <span className="inline-flex items-center gap-1">
                                  Start <ArrowDownRight className="w-3 h-3" />
                                </span>
                              )}
                              {idx === 1 && (
                                <span className="inline-flex items-center gap-1">
                                  <ArrowDownLeft className="w-3 h-3" /> Exploring
                                </span>
                              )}
                              {idx === 2 && (
                                <span className="inline-flex items-center gap-1">
                                  Building <ArrowDownRight className="w-3 h-3" />
                                </span>
                              )}
                              {idx === 3 && (
                                <span className="inline-flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7700] animate-pulse" /> Present
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
                            <span className="text-[12px] font-semibold text-[#111111] mr-1">Stack:</span>
                            {step.tags.map((tag, tagIdx) => (
                              <React.Fragment key={tag}>
                                <span className="text-[#333333] font-medium">{tag}</span>
                                {tagIdx < step.tags.length - 1 && (
                                  <span className="text-[#FF8A00] font-bold" aria-hidden="true">&bull;</span>
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

      {/* 5. BOTTOM CTA BANNER */}
      <section className="relative z-10 pb-24 sm:pb-36 overflow-hidden">
        {/* <OrangeCtaBottomWave /> */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="relative">
            <OrangeJourneyCardBlob position="bottom-right" size="lg" />
            <div className="ab-cta-banner-wrap relative z-10 rounded-[2.5rem] bg-white/45 backdrop-blur-2xl border border-white/75 p-8 sm:p-12 lg:p-14 shadow-[0_22px_60px_rgba(255,138,0,0.18),inset_0_1px_2px_rgba(255,255,255,0.95)] overflow-hidden">
              <div
                className="pointer-events-none absolute -top-12 -right-12 w-36 h-36 rounded-full bg-gradient-to-br from-[#FFA726] via-[#FF8A00] to-[#FF5500] p-1.5 shadow-[0_8px_25px_rgba(255,122,0,0.4)] flex items-center justify-center select-none z-10"
                aria-hidden="true"
              >
                <div className="w-full h-full rounded-full border-2 border-white/60 bg-white/20 backdrop-blur-sm" />
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A00] animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#FF8A00]">
                      LET'S BUILD TOGETHER
                    </span>
                  </div>
                  <h2 className="font-black italic uppercase text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-[-0.02em] text-[#111111]">
                    LET'S CREATE SOMETHING
                    <br />
                    <span className="text-[#FF7700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.32)]">AMAZING</span> TOGETHER
                  </h2>
                </div>

                <div className="relative flex items-center gap-4 flex-shrink-0">
                  <div className="pointer-events-none text-[#FF8A00] hidden sm:block">
                    <svg className="w-9 h-9" viewBox="0 0 45 45" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
                      <line x1="8" y1="36" x2="36" y2="8" />
                      <line x1="18" y1="40" x2="40" y2="18" />
                      <line x1="28" y1="42" x2="42" y2="28" />
                    </svg>
                  </div>
                  <a
                    href="#works"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#111111] hover:bg-[#FF8A00] text-white hover:text-[#111111] px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_28px_rgba(255,138,0,0.4)] active:scale-95"
                  >
                    <span>View my work</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
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