import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  Check,
  ArrowRight,
  Monitor,
  Database,
  Palette,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { servicesData } from "../data/servicesData";
import { SectionHeader } from "../components/ui";
import {
  SectionWaveDivider,
  BrandSectionSideWave,
  BrandSectionRightWave,
} from "../components/decorative";
import { useGsapScope } from "../animation/useGsapScope";

gsap.registerPlugin(ScrollTrigger);

const serviceIcons = {
  "full-stack": Database,
  "ui-design": Palette,
  "figma-react": Monitor,
  wordpress: Layers,
};

// Clean, short labels for option buttons
const serviceShortLabels = {
  "full-stack": "Full-Stack",
  "ui-design": "UI/UX Design",
  "figma-react": "Figma → React",
  wordpress: "WordPress",
};

const serviceMobileLabels = {
  "full-stack": "Full-Stack",
  "ui-design": "UI/UX",
  "figma-react": "React",
  wordpress: "WordPress",
};

// Distinct wireframe SVG illustrations for each service
const ServiceIllustration = ({ id }) => {
  if (id === "full-stack") {
    return (
      <svg
        viewBox="0 0 240 160"
        fill="none"
        className="w-full h-full text-[#111111]"
        style={{ opacity: 0.16 }}
      >
        <rect
          x="8"
          y="8"
          width="102"
          height="144"
          rx="8"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect
          x="18"
          y="24"
          width="80"
          height="7"
          rx="2"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="18"
          y="38"
          width="56"
          height="5"
          rx="2"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="18"
          y="50"
          width="74"
          height="5"
          rx="2"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="18"
          y="62"
          width="44"
          height="5"
          rx="2"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="18"
          y="80"
          width="82"
          height="56"
          rx="4"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="28"
          y="94"
          width="42"
          height="4"
          rx="1"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="28"
          y="106"
          width="60"
          height="4"
          rx="1"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="122"
          y="14"
          width="110"
          height="62"
          rx="6"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect
          x="132"
          y="28"
          width="50"
          height="4"
          rx="1"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="132"
          y="40"
          width="78"
          height="4"
          rx="1"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="132"
          y="52"
          width="38"
          height="4"
          rx="1"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="122"
          y="88"
          width="52"
          height="64"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect
          x="180"
          y="88"
          width="52"
          height="64"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect
          x="130"
          y="102"
          width="34"
          height="3"
          rx="1"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="188"
          y="102"
          width="32"
          height="3"
          rx="1"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    );
  }
  if (id === "ui-design") {
    return (
      <svg
        viewBox="0 0 240 160"
        fill="none"
        className="w-full h-full text-[#111111]"
        style={{ opacity: 0.16 }}
      >
        <rect
          x="8"
          y="8"
          width="64"
          height="144"
          rx="10"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect
          x="18"
          y="22"
          width="44"
          height="32"
          rx="3"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="40" cy="38" r="8" stroke="currentColor" strokeWidth="1" />
        <rect
          x="18"
          y="62"
          width="44"
          height="5"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="18"
          y="74"
          width="30"
          height="5"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="18"
          y="90"
          width="44"
          height="18"
          rx="3"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="18"
          y="114"
          width="44"
          height="18"
          rx="3"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="84"
          y="8"
          width="64"
          height="144"
          rx="10"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect
          x="94"
          y="22"
          width="44"
          height="32"
          rx="3"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="116" cy="38" r="8" stroke="currentColor" strokeWidth="1" />
        <rect
          x="94"
          y="62"
          width="44"
          height="5"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="94"
          y="74"
          width="30"
          height="5"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="94"
          y="90"
          width="44"
          height="18"
          rx="3"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="94"
          y="114"
          width="44"
          height="18"
          rx="3"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="160"
          y="8"
          width="72"
          height="144"
          rx="10"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect
          x="170"
          y="22"
          width="52"
          height="32"
          rx="3"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="196" cy="38" r="8" stroke="currentColor" strokeWidth="1" />
        <rect
          x="170"
          y="62"
          width="52"
          height="5"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="170"
          y="74"
          width="36"
          height="5"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="170"
          y="90"
          width="52"
          height="18"
          rx="3"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="170"
          y="114"
          width="52"
          height="18"
          rx="3"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    );
  }
  if (id === "figma-react") {
    return (
      <svg
        viewBox="0 0 240 160"
        fill="none"
        className="w-full h-full text-[#111111]"
        style={{ opacity: 0.16 }}
      >
        <rect
          x="8"
          y="16"
          width="144"
          height="128"
          rx="8"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect
          x="18"
          y="28"
          width="60"
          height="5"
          rx="2"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="18"
          y="42"
          width="124"
          height="44"
          rx="4"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="28"
          y="52"
          width="48"
          height="4"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="28"
          y="66"
          width="80"
          height="4"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="18"
          y="96"
          width="56"
          height="34"
          rx="4"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="84"
          y="96"
          width="58"
          height="34"
          rx="4"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M162 80 L188 80"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 3"
        />
        <rect
          x="192"
          y="50"
          width="40"
          height="60"
          rx="6"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <rect
          x="199"
          y="60"
          width="26"
          height="4"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect
          x="199"
          y="70"
          width="18"
          height="4"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      className="w-full h-full text-[#111111]"
      style={{ opacity: 0.16 }}
    >
      <rect
        x="8"
        y="8"
        width="224"
        height="144"
        rx="8"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="8"
        y="8"
        width="224"
        height="28"
        rx="8"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="24" cy="22" r="4" stroke="currentColor" strokeWidth="1" />
      <circle cx="38" cy="22" r="4" stroke="currentColor" strokeWidth="1" />
      <circle cx="52" cy="22" r="4" stroke="currentColor" strokeWidth="1" />
      <rect
        x="76"
        y="16"
        width="90"
        height="12"
        rx="6"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="18"
        y="48"
        width="78"
        height="92"
        rx="4"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="28"
        y="60"
        width="56"
        height="5"
        rx="2"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="28"
        y="72"
        width="44"
        height="4"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="110"
        y="48"
        width="112"
        height="40"
        rx="4"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="120"
        y="60"
        width="56"
        height="5"
        rx="2"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="110"
        y="100"
        width="52"
        height="40"
        rx="4"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="170"
        y="100"
        width="52"
        height="40"
        rx="4"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
};

export default function Services() {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const stRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  // Touch swipe refs for mobile
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  // Exact tilts requested:
  // Card 1: left tilt (-2.5°)
  // Card 2: straight (0°)
  // Card 3: right tilt (+2.5°)
  // Card 4: right tilt more than card 3 (+5°)
  const desktopTilts = [-2.5, 0, 2.5, 5];
  const mobileTilts = [-1.5, 0, 1.5, 3];

  useGsapScope(sectionRef, () => {
    const mm = gsap.matchMedia();

    // Universal: Stacking deck animation on ALL devices (Mobile + Tablet + Desktop)
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const pinEl = pinWrapperRef.current;
      if (!pinEl) return;

      const cards = gsap.utils.toArray(".sv-card-item");
      const count = cards.length;
      if (count === 0) return;

      const isMobile = window.innerWidth < 768;
      const tilts = isMobile ? mobileTilts : desktopTilts;
      const scrollDistancePerCard = isMobile ? 450 : 600;
      const totalScrollDistance = (count - 1) * scrollDistancePerCard;

      // 1. Initial State:
      // Card 0 starts visible and tilted.
      // Cards 1..count-1 wait down below (yPercent: 125, completely off).
      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 125,
          rotation: tilts[i] ?? 0,
          scale: 1,
          opacity: 1,
          zIndex: i + 1,
          transformOrigin: isMobile ? "center 90%" : "center 85%",
          transformPerspective: 1200,
        });
      });

      // 2. Timeline pinned with scrub and snap
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: isMobile ? "top 72px" : "center center",
          end: `+=${totalScrollDistance}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (count - 1),
            duration: { min: 0.2, max: 0.45 },
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const stepIndex = Math.min(
              count - 1,
              Math.round(self.progress * (count - 1)),
            );
            setActiveStep(stepIndex);
          },
        },
      });

      stRef.current = tl.scrollTrigger;

      // 3. Sequential Stacking with tactile spring feel
      for (let i = 1; i < count; i++) {
        const prevCard = cards[i - 1];
        const currentCard = cards[i];
        const timePos = i - 1;

        // Current card shoots up and settles with back.out spring snap
        tl.to(
          currentCard,
          {
            yPercent: 0,
            rotation: tilts[i],
            duration: 1,
            ease: "back.out(1.25)",
          },
          timePos,
        );

        // Underneath card subtly scales down and dims for realistic depth
        tl.to(
          prevCard,
          {
            scale: isMobile ? 0.975 : 0.965,
            opacity: 0.88,
            duration: 0.85,
            ease: "power2.out",
          },
          timePos,
        );
      }
    });

    // Reduced motion fallback
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".sv-card-item", { clearProps: "all" });
    });
  }, []);

  // Jump to specific card on pill click or arrow click
  const goToCard = (index) => {
    setActiveStep(index);
    if (stRef.current) {
      const count = servicesData.length;
      const progress = count > 1 ? index / (count - 1) : 0;
      const targetScroll =
        stRef.current.start +
        progress * (stRef.current.end - stRef.current.start);
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    const prevIdx = activeStep > 0 ? activeStep - 1 : servicesData.length - 1;
    goToCard(prevIdx);
  };

  const handleNext = () => {
    const nextIdx = activeStep < servicesData.length - 1 ? activeStep + 1 : 0;
    goToCard(nextIdx);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Detect intentional horizontal swipe (> 45px, more horizontal than vertical)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX > 0) {
        // Swipe left -> next card
        handleNext();
      } else {
        // Swipe right -> prev card
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleRequestQuote = (e, serviceTitle) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      window.scrollTo({
        top:
          contactSection.getBoundingClientRect().top + window.pageYOffset - 72,
        behavior: "smooth",
      });
      window.dispatchEvent(
        new CustomEvent("prefill-contact-service", {
          detail: { service: serviceTitle },
        }),
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-[#FAF8F5] text-[#111111] overflow-hidden select-none pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 font-sans scroll-mt-20 sm:scroll-mt-28"
    >
      {/* ── Background Organic Accent Shapes ── */}
      <BrandSectionSideWave position="top" />
      <BrandSectionRightWave position="bottom" />

      {/* ── 1. SECTION HEADER (Matches Works & FAQ typographic size & spacing exactly) ── */}
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 relative z-10">
        <div className="border-b border-black/8 pb-8 sm:pb-10">
          <SectionHeader
            badge="Capabilities & Services"
            titleTop="THINGS I"
            titleMain="BUILD &amp;"
            titleAccent="DELIVER."
            description="Focused full-stack development, modern interfaces, and turnkey web solutions delivered on schedule without agency overhead."
            annotation="Available for new projects"
            align="split"
            className="!mb-0"
          />
        </div>
      </div>

      {/* ── 2. PINNED CARD CONTAINER VIEWPORT (Mobile + Desktop Responsive) ── */}
      <div
        ref={pinWrapperRef}
        className="w-full relative z-10 py-6 sm:py-8 lg:py-10"
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14">
          {/* ── RESPONSIVE OPTION BUTTONS & STEPPER CONTROLS ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5 sm:mb-5">
            {/* Category Pill Navigation Tabs (Horizontal scroll on mobile with no-scrollbar) */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 px-1 bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-full border border-black/8 shadow-2xs w-full sm:w-auto">
              {servicesData.map((svc, idx) => {
                const active = activeStep === idx;
                const Icon = serviceIcons[svc.id] || Monitor;
                return (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => goToCard(idx)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-full text-xs font-bold transition-all duration-300 cursor-pointer shrink-0 ${
                      active
                        ? "bg-[#111111] text-white shadow-md shadow-black/20 ring-1 ring-white/10 scale-[1.02]"
                        : "text-[#666666] hover:text-[#111111] hover:bg-white/90"
                    }`}
                  >
                    <Icon
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                        active ? "text-brand" : "text-[#888888]"
                      }`}
                    />
                    <span
                      className={`font-mono text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded-md ${
                        active
                          ? "bg-brand text-white font-black"
                          : "bg-black/6 text-[#777777]"
                      }`}
                    >
                      {svc.num}
                    </span>
                    <span className="hidden sm:inline">
                      {serviceShortLabels[svc.id]}
                    </span>
                    <span className="sm:hidden">
                      {serviceMobileLabels[svc.id]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Step Counter + Prev/Next Arrow Buttons */}
            <div className="flex items-center justify-between sm:justify-end gap-3 px-1">
              <span className="text-xs font-mono font-bold text-[#777777]">
                Service{" "}
                <span className="text-[#111111] font-black">
                  0{activeStep + 1}
                </span>{" "}
                / 04
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous service"
                  className="w-8 h-8 rounded-full bg-white/80 hover:bg-[#111111] text-[#111111] hover:text-white border border-black/10 flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next service"
                  className="w-8 h-8 rounded-full bg-[#111111] hover:bg-brand text-white hover:text-[#111111] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>

          {/* ── RESPONSIVE PINNED CARDS STACK BOX (Works on Mobile + Tablet + Desktop) ── */}
          <div
            className="relative w-full rounded-[1.8rem] sm:rounded-[2.2rem] h-[480px] sm:h-[490px]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {servicesData.map((svc) => {
              const Icon = serviceIcons[svc.id] || Monitor;
              return (
                <div
                  key={svc.id}
                  className="sv-card-item absolute inset-1 sm:inset-1.5 w-[calc(100%-0.5rem)] sm:w-[calc(100%-0.75rem)] h-[calc(100%-0.5rem)] sm:h-[calc(100%-0.75rem)]"
                  style={{
                    willChange: "transform, opacity",
                  }}
                >
                  <div className="w-full h-full bg-white rounded-[1.6rem] sm:rounded-[2rem] border border-black/10 shadow-[0_14px_44px_rgba(0,0,0,0.07)] overflow-hidden flex flex-col lg:flex-row">
                    {/* Left Column: Full Content */}
                    <div className="flex flex-col justify-between p-5 sm:p-7 lg:p-9 flex-1 min-w-0 overflow-y-auto sm:overflow-visible">
                      <div>
                        {/* Card Header Tag */}
                        <div className="flex items-center gap-2 sm:gap-2.5 mb-2.5 sm:mb-3">
                          <span className="font-mono font-black text-xl sm:text-2xl lg:text-3xl text-brand-dark">
                            {svc.num}
                          </span>
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center">
                            <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-dark" />
                          </div>
                          <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-2 sm:px-2.5 py-0.5 rounded-full bg-black/5 text-[#555555]">
                            {svc.subtitle}
                          </span>
                        </div>

                        {/* Service Title */}
                        <h3 className="font-black italic uppercase text-xl sm:text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-snug text-[#111111]">
                          {svc.title}
                        </h3>

                        {/* Description */}
                        <p className="mt-1.5 sm:mt-2.5 text-xs sm:text-sm lg:text-base text-[#4B5563] leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-none">
                          {svc.description}
                        </p>
                      </div>

                      {/* Deliverables Grid */}
                      <div className="my-2 sm:my-3">
                        <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#111111] block mb-1.5 sm:mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-brand" />
                          What&apos;s Included:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2.5">
                          {svc.deliverables.map((item, dIdx) => (
                            <li
                              key={dIdx}
                              className="flex items-center gap-2 p-1.5 sm:p-2.5 rounded-xl bg-[#F8F7F4] border border-black/5 text-xs lg:text-sm text-[#444444]"
                            >
                              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                <Check className="w-2 sm:w-2.5 h-2 sm:h-2.5 stroke-[3]" />
                              </span>
                              <span className="leading-tight font-medium truncate">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Bottom Action Row */}
                      <div className="pt-2.5 sm:pt-3 border-t border-black/8 flex items-center justify-between gap-2 sm:gap-3 flex-wrap">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                          <span className="text-[11px] sm:text-xs font-semibold text-[#777777] mr-1 hidden xs:inline">
                            Stack:
                          </span>
                          {svc.stack.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-[#F2EFEC] border border-black/5 text-[10px] sm:text-xs font-semibold text-[#333333]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <a
                          href="#contact"
                          onClick={(e) => handleRequestQuote(e, svc.title)}
                          className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#111111] hover:bg-brand text-white hover:text-[#111111] px-4 sm:px-5 py-1.5 sm:py-2 text-xs lg:text-sm font-bold transition-all duration-200 shadow-sm shrink-0 cursor-pointer group/btn"
                        >
                          <span>Get a quote</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                        </a>
                      </div>
                    </div>

                    {/* Right Column: Sleek Wireframe Preview (Large screens) */}
                    <div
                      className="hidden lg:flex items-center justify-center shrink-0 border-l border-black/6 bg-[#FAFAF8]"
                      style={{ width: "320px", padding: "1.5rem" }}
                    >
                      <ServiceIllustration id={svc.id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Helper Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-black/8 text-xs font-medium text-[#888888]">
            <span>Scroll or swipe to stack cards</span>
            <span className="hidden sm:inline">
              30-Day Support Included &bull; Clean code handoff
            </span>
          </div>
        </div>
      </div>

      {/* ── 3. TRANSITION DIVIDER: SERVICES TO FAQ ── */}
      <SectionWaveDivider
        variant="services-to-faq"
        className="relative z-10 w-full"
      />
    </section>
  );
}
