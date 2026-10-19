import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

function StackingCard({ children, index, total }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 88%", "start 18%"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.94, 0.9]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0, 0.35, 0.6]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        rotateX,
        y,
        zIndex: total - index,
        top: `calc(56px + ${index * 18}px)`,
      }}
      className="sticky relative mb-[25vh] origin-top transform-gpu [perspective:1200px]"
    >
      {children}
      <motion.div
        aria-hidden="true"
        style={{ opacity: overlayOpacity }}
        className="pointer-events-none absolute inset-0 z-20 rounded-[1.5rem] bg-slate-950"
      />
    </motion.div>
  );
}

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
      className="relative w-full bg-[#FAF8F5] text-[#111111] overflow-hidden select-none pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 font-sans scroll-mt-20 sm:scroll-mt-28"
    >

      {/* ── Background Organic Shapes: Left at TOP, Right at BOTTOM ── */}
      <BrandSectionSideWave position="top" />
      <BrandSectionRightWave position="bottom" />

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Full-Width Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 sm:mb-20 border-b border-black/8 pb-8">
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

          {/* Quick value guarantee pills */}
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

        {/* Refined Frosted Glass Tactile Service Cards with Silky Smooth Scrolling */}
        <div className="sv-services-list relative mx-auto flex min-h-[300vh] max-w-6xl flex-col gap-0">
          {servicesData.map((svc, index) => {
            const isActive = activeServiceId === svc.id;
            const IconComponent = serviceIcons[svc.id] || Monitor;

            return (
              <StackingCard key={svc.id} index={index} total={servicesData.length}>
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
                className={`sv-service-card group relative min-h-[min(620px,70vh)] rounded-[1.5rem] sm:rounded-[1.75rem] backdrop-blur-2xl transition-all duration-300 p-6 sm:p-8 lg:p-10 transform-gpu will-change-transform overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 ${
                  isActive
                    ? "bg-white/85 border border-brand/40 shadow-[0_20px_50px_rgba(var(--brand-rgb),0.14),inset_0_1px_2px_rgba(255,255,255,1)] ring-1 ring-brand/20"
                    : "bg-white/65 hover:bg-white/80 border border-white/80 hover:border-brand/30 shadow-[0_12px_36px_rgba(0,0,0,0.03),inset_0_1px_2px_rgba(255,255,255,0.9)] hover:shadow-[0_22px_45px_rgba(var(--brand-rgb),0.1)]"
                } hover:-translate-y-1`}
              >
                {/* Frosted Glass Specular Top Border Sheen */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
                  aria-hidden="true"
                />

                {/* Soft Ambient Warm Glow on Card Hover */}
                <div
                  className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-brand/15 via-brand/5 to-transparent rounded-full blur-3xl transition-opacity duration-500 opacity-40 group-hover:opacity-100"
                  aria-hidden="true"
                />

                {/* Active Indicator Left Accent Bar */}
                <div
                  className={`absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full bg-gradient-to-b from-brand to-brand-deep transition-opacity duration-300 ${
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-60"
                  }`}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
                  {/* Left Column: Number, Category Icon, Title, Timeline */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono font-black text-2xl sm:text-3xl text-brand-dark drop-shadow-xs">
                          {svc.num}
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-white/80 backdrop-blur-md border border-white/90 shadow-xs flex items-center justify-center text-brand-dark">
                          <IconComponent className="w-4 h-4 text-brand-dark" />
                        </div>
                        <span className="text-xs font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-black/5 text-[#555555]">
                          {svc.subtitle}
                        </span>
                      </div>

                      <h3
                        className={`font-black italic uppercase text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-snug transition-colors duration-200 ${
                          isActive
                            ? "text-[#111111]"
                            : "text-[#111111] group-hover:text-brand-dark"
                        }`}
                      >
                        {svc.title}
                      </h3>
                    </div>

                    {/* Timeline & Speed Badge with SVG Icon */}
                    <div className="mt-5 pt-4 border-t border-black/6 flex items-center gap-2">
                      <span className="text-xs font-semibold text-brand-dark bg-brand/10 px-3 py-1 rounded-full border border-brand/20 inline-flex items-center gap-1.5 backdrop-blur-md">
                        <Zap className="w-3.5 h-3.5 text-brand-dark" />
                        <span>{svc.timeline}</span>
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Narrative, Deliverables Grid, Stack & CTA */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed mb-6 font-normal">
                      {svc.description}
                    </p>

                    {/* Deliverables Checklist Grid with Frosted Glass Cards */}
                    <div className="mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#111111] block mb-3">
                        What&apos;s Included:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#444444]">
                        {svc.deliverables.map((item, dIdx) => (
                          <li
                            key={dIdx}
                            className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/60 backdrop-blur-md border border-white/90 group-hover:bg-white/80 transition-colors shadow-xs"
                          >
                            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack & Action Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-black/8">
                      {/* Tech Pills */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-semibold text-[#777777] mr-1">
                          Stack:
                        </span>
                        {svc.stack.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-white/70 backdrop-blur-md border border-white/80 hover:bg-brand/15 text-xs font-semibold text-[#333333] transition-colors shadow-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Request Button */}
                      <div>
                        <a
                          href="#contact"
                          onClick={(e) => handleRequestQuote(e, svc.title)}
                          className="group/btn inline-flex items-center gap-2 rounded-full bg-[#111111] hover:bg-brand text-white hover:text-[#111111] px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-[0_8px_20px_rgba(var(--brand-rgb),0.35)] active:scale-95 shrink-0 cursor-pointer"
                        >
                          <span>Get a quote</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </StackingCard>
            );
          })}
        </div>
      </div>

      {/* ── Wave Divider: Services → FAQ transition ── */}
      <SectionWaveDivider variant="services-to-faq" className="relative z-10 w-full" />
    </section>
  );
}
