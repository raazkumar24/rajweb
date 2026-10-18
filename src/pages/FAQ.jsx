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
                className={`group rounded-[1.5rem] border transition-[background-color,border-color,box-shadow] duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white border-brand/45 shadow-[0_18px_40px_rgba(var(--brand-rgb),0.14)]"
                    : "bg-white/65 border-black/10 hover:border-brand/35 hover:bg-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.03)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between text-left gap-4 p-5 sm:p-7 cursor-pointer"
                  id={`faq-question-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <div className="flex items-start gap-4 sm:gap-6 flex-1 min-w-0">
                    <span
                      className={`mt-0.5 flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-xl font-mono text-xs sm:text-sm font-bold transition-colors ${
                        isOpen
                          ? "bg-brand text-white"
                          : "bg-brand/8 text-brand-dark group-hover:bg-brand/15"
                      }`}
                    >
                      {item.id}
                    </span>
                    <div className="min-w-0">
                      <h3
                        className={`font-black uppercase tracking-[-0.025em] text-base sm:text-xl lg:text-2xl leading-tight transition-colors duration-200 ${
                          isOpen ? "text-[#111111]" : "text-[#111111] group-hover:text-brand-dark"
                        }`}
                      >
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                      isOpen
                        ? "border-brand bg-brand text-white"
                        : "border-black/15 bg-white text-[#111111] group-hover:border-brand group-hover:text-brand"
                    }`}
                    aria-hidden="true"
                  >
                    <svg className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="mx-5 sm:mx-7 border-t border-black/8 px-0 pb-6 pt-4 sm:pb-7 sm:pt-5">
                      <p className="max-w-3xl text-sm sm:text-base text-[#4B5563] leading-relaxed font-normal">
                        {item.answer}
                      </p>
                    </div>
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
