import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus, ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import InteractiveButton from "../components/ui/InteractiveButton";
import { faqData } from "../data/faqData";
import { HandwrittenBadge } from "../components/decoration/doodleCard";
import {
  BrandCardCornerWave,
  BrandSectionSideWave,
} from "../components/decoration/brandBackgroundShapes";

/* ──────────────────────────────────────────────
   Category Badges for FAQ items
   ────────────────────────────────────────────── */
const faqCategories = {
  "01": "Full-Stack & UI",
  "02": "Project Scope",
  "03": "Pricing & Budget",
  "04": "Turnaround & Timeline",
  "05": "Figma Hand-off",
};

const EASE = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export default function FAQ() {
  const [openId, setOpenId] = useState("01");
  const shouldReduceMotion = useReducedMotion();

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleScrollToContact = (e) => {
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
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative z-20 w-full overflow-hidden border-b border-black/8 bg-[#FAF8F5] pt-16 pb-16 font-sans text-[#111111] select-none scroll-mt-20 sm:pt-20 sm:pb-24"
    >
      <BrandSectionSideWave position="middle" opacity={0.25} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14">
        {/* ── 1. HEADER ── */}
        <motion.div
          className="mb-10 border-b border-black/8 pb-6 sm:mb-12 sm:pb-8"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          {/* Custom heading with doodle annotation replacing SectionHeader */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7">
              <div className="mb-3">
                {/* Section badge rendered manually */}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#555555] shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  <span>04 — FAQ</span>
                </span>
              </div>

              <div className="relative inline-block">
                <h2
                  id="faq-heading"
                  className="font-display text-[clamp(2.1rem,4vw+0.8rem,3.8rem)] leading-[1.05] tracking-[-0.03em] font-bold text-[#111111]"
                >
                  Frequently asked{" "}
                  <span className="italic font-normal text-brand-dark">questions.</span>
                </h2>

                {/* Doodle: "All clear!" with arrow */}
                <HandwrittenBadge
                  text="All clear!"
                  arrowDirection="down-left"
                  rotation="rotate-3"
                  textClass="text-sm sm:text-base"
                  textColor="text-[#333333]"
                  arrowClass="h-8 w-8 sm:h-10 sm:w-10"
                  className="absolute -top-7 right-0 hidden sm:flex"
                />
              </div>
            </div>

            <div className="lg:col-span-5 lg:pb-1">
              <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed font-normal max-w-md">
                Clear expectations on how we work together, timeline estimates,
                and ongoing support after your site goes live.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 2. REDESIGNED FAQ CARDS ── */}
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto flex w-full max-w-4xl flex-col gap-3.5 sm:gap-4"
        >
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            const categoryTag = faqCategories[item.id] || "General";

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 sm:rounded-3xl ${
                  isOpen
                    ? "border-brand/40 bg-white shadow-[0_16px_36px_-12px_rgba(139,92,246,0.12)] ring-1 ring-brand/15"
                    : "border-black/8 bg-white/80 hover:border-black/15 hover:bg-white hover:shadow-xs"
                }`}
              >
                {/* Decorative wave highlight when open */}
                {isOpen && (
                  <BrandCardCornerWave
                    position="top-right"
                    opacity={0.5}
                    className="pointer-events-none h-28 w-40 sm:h-36 sm:w-52"
                  />
                )}

                {/* Question Trigger Row */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  id={`faq-question-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="relative z-10 flex w-full cursor-pointer items-center justify-between gap-3.5 p-5 text-left sm:gap-6 sm:p-6 lg:p-7"
                >
                  <div className="flex min-w-0 items-center gap-3.5 sm:gap-5">
                    {/* Number Badge */}
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold transition-all duration-300 sm:h-11 sm:w-11 sm:rounded-2xl sm:text-sm ${
                        isOpen
                          ? "bg-brand text-white shadow-sm shadow-brand/30"
                          : "bg-black/5 text-[#555555] group-hover:bg-brand/10 group-hover:text-brand-dark"
                      }`}
                    >
                      {item.id}
                    </span>

                    {/* Question and Category */}
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] font-semibold tracking-wider text-brand-dark uppercase sm:text-[11px]">
                        {categoryTag}
                      </span>
                      <h3
                        className={`font-display text-base font-bold tracking-tight transition-colors duration-200 sm:text-lg lg:text-xl ${
                          isOpen
                            ? "text-[#111111]"
                            : "text-[#222222] group-hover:text-brand-dark"
                        }`}
                      >
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  {/* Toggle Plus/Minus Button with Spring Rotation */}
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-10 sm:w-10 ${
                      isOpen
                        ? "rotate-45 border-brand bg-brand text-white shadow-sm shadow-brand/25"
                        : "border-black/10 bg-[#FAF8F5] text-[#555555] group-hover:border-black/20 group-hover:bg-white group-hover:text-[#111111]"
                    }`}
                    aria-hidden="true"
                  >
                    <Plus className="h-4 w-4 stroke-[2.5]" />
                  </div>
                </button>

                {/* Animated Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${item.id}`}
                      key="content"
                      initial={
                        shouldReduceMotion ? false : { opacity: 0, height: 0 }
                      }
                      animate={{
                        opacity: 1,
                        height: "auto",
                        transition: {
                          height: { duration: 0.35, ease: EASE },
                          opacity: { duration: 0.25, delay: 0.08 },
                        },
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transition: {
                          height: { duration: 0.22, ease: "easeInOut" },
                          opacity: { duration: 0.15 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-black/6 px-5 pt-4 pb-6 sm:px-7 sm:pt-5 sm:pb-7">
                        <div className="flex items-start gap-3 rounded-2xl border border-black/5 bg-[#FAF8F5] p-4 sm:gap-4 sm:p-5">
                          <span
                            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/12 font-mono text-[11px] font-bold text-brand-dark sm:h-6 sm:w-6 sm:text-xs"
                            aria-hidden="true"
                          >
                            A
                          </span>
                          <p className="max-w-2xl text-xs leading-relaxed font-normal text-[#4B5563] sm:text-sm">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── 3. BOTTOM CTA CARD ── */}
        <motion.div
          className="mx-auto mt-12 max-w-4xl sm:mt-16"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-black/8 bg-white p-6 shadow-[0_12px_32px_-10px_rgba(17,17,17,0.06)] sm:flex-row sm:p-8">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand sm:flex">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-[#111111] sm:text-lg">
                  Still have questions about your project?
                </h4>
                <p className="text-xs text-[#666666] sm:text-sm">
                  Let&apos;s talk directly about your scope, timelines, or
                  custom ideas.
                </p>
              </div>
            </div>

            <InteractiveButton
              href="#contact"
              onClick={handleScrollToContact}
              variant="dark"
              noShadow
              className="px-5 py-2.5 text-xs whitespace-nowrap"
              icon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              Ask me directly
            </InteractiveButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
