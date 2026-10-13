import React, { useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "../components/ui/SectionHeader";
import { faqData } from "../data/faqData";
import {
  SectionWaveDivider,
  BrandSectionSideWave,
  BrandSectionRightWave,
} from "../components/decorative";

export default function FAQ() {
  const [openId, setOpenId] = useState("01");

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 320);
  };

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const navOffset = 68;
      const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition - navOffset),
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-[#FAF8F5] text-[#111111] overflow-hidden select-none pt-10 sm:pt-14 lg:pt-16 pb-0 font-sans scroll-mt-20 sm:scroll-mt-28"
    >
      {/* ── Background Organic Shapes: Left at TOP, Right at BOTTOM ── */}
      <BrandSectionSideWave position="top" />
      <BrandSectionRightWave position="bottom-raised" />

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16 border-b border-black/8 pb-8">
          <SectionHeader
            badge="Common questions"
            titleTop="COMMON"
            titleMain="QUESTIONS &amp;"
            titleAccent="ANSWERS."
            description="Clear expectations on how we work together, turnaround times, and ongoing support after your site goes live."
            annotation="Got questions? I got answers"
            align="split"
            className="!mb-0"
          />
        </div>

        {/* Refined Accordion Cards */}
        <div className="w-full flex flex-col gap-3.5 sm:gap-4 max-w-5xl mx-auto">
          {faqData.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white/95 border-brand/50 shadow-[0_16px_36px_rgba(var(--brand-rgb),0.12)] ring-1 ring-brand/25"
                    : "bg-white/70 backdrop-blur-xl border-black/8 hover:border-brand/40 hover:bg-white/90 shadow-[0_8px_20px_rgba(0,0,0,0.02)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-start sm:items-center justify-between text-left gap-4 sm:gap-6 p-6 sm:p-7 group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  {/* Left: Number + Question in display font */}
                  <div className="flex items-center gap-3.5 sm:gap-5 flex-1 min-w-0">
                    <span
                      className={`font-mono font-black text-sm sm:text-base px-2.5 py-1 rounded-xl transition-colors shrink-0 ${
                        isOpen
                          ? "bg-brand text-white shadow-xs"
                          : "bg-black/5 text-[#666666] group-hover:text-brand-dark group-hover:bg-brand/10"
                      }`}
                    >
                      {item.id}
                    </span>
                    <h3
                      className={`font-black italic uppercase tracking-[-0.025em] text-base sm:text-xl lg:text-2xl transition-colors duration-200 ${
                        isOpen
                          ? "text-[#111111]"
                          : "text-[#111111] group-hover:text-brand-dark"
                      }`}
                    >
                      {item.question}
                    </h3>
                  </div>

                  {/* Right: Rotating + / - icon */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "border-brand bg-brand text-white rotate-45 shadow-[0_4px_12px_rgba(var(--brand-rgb),0.35)]"
                        : "border-black/15 bg-white text-[#111111] group-hover:border-brand group-hover:text-brand"
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>

                {/* Smooth Expandable Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 border-t border-black/5">
                    <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed font-normal pt-4">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Help Prompt */}
        <div className="mt-14 sm:mt-20 text-center flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm font-medium text-[#666666]">
          <span>Still have questions about your project?</span>
          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="inline-flex items-center gap-1.5 font-bold text-[#111111] hover:text-brand-dark underline decoration-brand underline-offset-4 transition-colors"
          >
            <span>Ask me directly in the contact form</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>

      {/* ── Subtle Decorative Bottom SVG Wave Divider (FAQ -> Contact) ── */}
      <SectionWaveDivider variant="faq-to-contact" className="mt-14 sm:mt-20 relative z-10 w-full" />
    </section>
  );
}
