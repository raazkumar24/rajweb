import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  Zap,
  Check,
  ArrowRight,
  Monitor,
  Database,
  Palette,
  Layers,
} from "lucide-react";
import { servicesData } from "../data/servicesData";
import SectionHeader from "../components/ui/SectionHeader";
import {
  SectionWaveDivider,
  BrandSectionSideWave,
  BrandSectionRightWave,
} from "../components/decorative";

import { useGsapScope } from "../animation/useGsapScope";

gsap.registerPlugin(ScrollTrigger);

const serviceIcons = {
  "web-apps": Monitor,
  "full-stack": Database,
  "ui-motion": Palette,
  "cloud-integrations": Layers,
};

export default function Services() {
  const sectionRef = useRef(null);
  const [activeServiceId, setActiveServiceId] = useState(
    servicesData[0]?.id || "web-apps",
  );

  useGsapScope(sectionRef, () => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cardWrappers = gsap.utils.toArray(".sv-card-wrapper");
      const cardsCount = cardWrappers.length;

      if (cardsCount === 0) return;

      const scaleMax = gsap.utils.mapRange(1, cardsCount - 1, 0.96, 1);
      const time = 1;

      // Cards Initial Y Offset (Stacking Depth)
      gsap.set(cardWrappers, {
        y: (index) => 18 * index,
        transformOrigin: "center top",
      });

      // Pinning with Header Visible Offset & Compact Bottom Space
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".sv-stack-trigger",
          start: "top top+=210", // Keeps Section Header visible in Viewport
          end: `+=${cardsCount * 220}`, // Reduced height to eliminate bottom extra gap
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Slide cards up sequentially
      tl.to(".sv-card-wrapper:not(:first-child)", {
        yPercent: (i) => -100 * (i + 1),
        duration: time / 2,
        stagger: time,
      });

      // Clean scale-down & subtle 3D tilt without dark dimming
      tl.to(
        ".sv-card-wrapper:not(:last-child) .sv-service-card",
        {
          scale: (index) => scaleMax(index),
          rotationX: -4,
          stagger: {
            each: time,
          },
        },
        "<"
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".sv-card-wrapper", { opacity: 1, y: 0, clearProps: "all" });
      gsap.set(".sv-service-card", { clearProps: "all" });
    });
  }, []);

  const handleRequestQuote = (e, serviceTitle) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const navOffset = 72;
      const elementPosition =
        contactSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition - navOffset),
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
      className="relative w-full bg-[#FAF8F5] text-[#111111] overflow-hidden select-none pt-8 sm:pt-12 lg:pt-14 pb-6 sm:pb-8 font-sans scroll-mt-20 sm:scroll-mt-28"
    >
      {/* ── Background Organic Shapes ── */}
      <BrandSectionSideWave position="top" />
      <BrandSectionRightWave position="bottom" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Full-Width Section Header (Remains in Viewport) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 sm:mb-10 border-b border-black/8 pb-6">
          <div>
            <SectionHeader
              badge="What I offer"
              titleTop="THINGS I"
              titleMain="BUILD &amp;"
              titleAccent="DELIVER."
              description="Focused development services for businesses who want a fast, reliable website delivered on schedule without agency overhead."
              annotation="Available for new projects"
              align="split"
              className="!mb-0"
            />
          </div>

          {/* Value Guarantee Pills */}
          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/90 text-xs font-semibold text-[#111111] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for new projects</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/25 text-xs font-semibold text-brand-dark backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-dark" />
              <span>30-Day Support Included</span>
            </div>
          </div>
        </div>

        {/* ── Stacking Cards Pin Wrapper Container ── */}
        <div className="sv-stack-trigger w-full pb-2">
          <div className="sv-services-list flex flex-col gap-5 sm:gap-6 perspective-[1200px] transform-gpu">
            {servicesData.map((svc) => {
              const isActive = activeServiceId === svc.id;
              const IconComponent = serviceIcons[svc.id] || Monitor;

              return (
                <div key={svc.id} className="sv-card-wrapper w-full">
                  <div
                    onMouseEnter={() => setActiveServiceId(svc.id)}
                    onClick={() => setActiveServiceId(svc.id)}
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveServiceId(svc.id);
                      }
                    }}
                    className={`sv-service-card group relative rounded-[1.75rem] backdrop-blur-2xl transition-all duration-300 p-6 sm:p-8 transform-gpu will-change-transform overflow-hidden cursor-pointer border ${
                      isActive
                        ? "bg-white border-brand/40 shadow-[0_20px_45px_rgba(var(--brand-rgb),0.12),0_2px_8px_rgba(0,0,0,0.03)] ring-1 ring-brand/20"
                        : "bg-white/90 hover:bg-white border-black/8 hover:border-brand/30 shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
                    }`}
                  >
                    {/* Top Specular Sheen */}
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90"
                      aria-hidden="true"
                    />

                    {/* Active Left Indicator Bar */}
                    <div
                      className={`absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full bg-gradient-to-b from-brand to-brand-deep transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                      }`}
                    />

                    {/* Card Inner Redesigned Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start relative z-10">
                      {/* Left Side: Number, Category, Title, Timeline */}
                      <div className="lg:col-span-5 flex flex-col justify-between h-full">
                        <div>
                          <div className="flex items-center gap-2.5 mb-3">
                            <span className="font-mono font-black text-2xl sm:text-3xl text-brand-dark">
                              {svc.num}
                            </span>
                            <div className="w-8 h-8 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand-dark">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-black/5 text-[#555555]">
                              {svc.subtitle}
                            </span>
                          </div>

                          <h3
                            className={`font-black italic uppercase text-2xl sm:text-3xl lg:text-[2rem] tracking-tight leading-snug transition-colors duration-200 ${
                              isActive
                                ? "text-[#111111]"
                                : "text-[#111111] group-hover:text-brand-dark"
                            }`}
                          >
                            {svc.title}
                          </h3>
                        </div>

                        {/* Timeline Badge */}
                        <div className="mt-4 pt-3 border-t border-black/6 flex items-center">
                          <span className="text-xs font-semibold text-brand-dark bg-brand/10 px-3 py-1 rounded-full border border-brand/20 inline-flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5" />
                            <span>{svc.timeline}</span>
                          </span>
                        </div>
                      </div>

                      {/* Right Side: Description, Deliverables Grid, Stack & CTA */}
                      <div className="lg:col-span-7 flex flex-col justify-between">
                        <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed mb-5">
                          {svc.description}
                        </p>

                        {/* Deliverables Checklist */}
                        <div className="mb-5">
                          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#111111] block mb-2.5">
                            What&apos;s Included:
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#444444]">
                            {svc.deliverables.map((item, dIdx) => (
                              <li
                                key={dIdx}
                                className="flex items-center gap-2 p-2 rounded-xl bg-[#F8F7F4] border border-black/5 transition-colors group-hover:bg-white"
                              >
                                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </span>
                                <span className="leading-tight font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech Stack & Action Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-black/8">
                          {/* Stack Tags */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-xs font-semibold text-[#777777] mr-1">
                              Stack:
                            </span>
                            {svc.stack.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 rounded-lg bg-[#F2EFEC] border border-black/5 hover:bg-brand/15 text-xs font-semibold text-[#333333] transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* CTA Button */}
                          <div>
                            <a
                              href="#contact"
                              onClick={(e) => handleRequestQuote(e, svc.title)}
                              className="group/btn inline-flex items-center gap-2 rounded-full bg-[#111111] hover:bg-brand text-white hover:text-[#111111] px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm active:scale-95 shrink-0 cursor-pointer"
                            >
                              <span>Get a quote</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                            </a>
                          </div>
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

      {/* ── Wave Divider: Services → FAQ transition ── */}
      <SectionWaveDivider
        variant="services-to-faq"
        className="relative z-10 w-full"
      />
    </section>
  );
}