import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus, ArrowRight, MessageSquare, Sparkles, HelpCircle, ArrowUpRight } from "lucide-react";
import { faqData } from "../data/faqData";
import { EditorialSectionHeader, CircularStampBadge } from "../components/ui";

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

export default function FAQ({ heroMode = "red" }) {
  const isRedTheme = heroMode === "red";
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

  const theme = isRedTheme
    ? {
        bg: "radial-gradient(ellipse at 50% 30%, #C41618 0%, #8A0B0D 55%, #50080B 100%)",
        textPrimary: "#FFFFFF",
        textMuted: "rgba(255, 255, 255, 0.75)",
        outlineTitle: "rgba(255, 255, 255, 0.9)",
        titleFill: "#FFFFFF",
        gridLine: "rgba(255, 255, 255, 0.15)",
        cardBg: "#131418",
        cardBorder: "rgba(255, 255, 255, 0.12)",
        cardActiveBorder: "rgba(239, 68, 68, 0.55)",
        cardGlow: "0 0 25px rgba(239, 68, 68, 0.2)",
        stampColor: "#FFFFFF",
        btnPrimaryBg: "#FFFFFF",
        btnPrimaryText: "#A81014",
      }
    : {
        bg: "radial-gradient(ellipse at 50% 30%, #F7F5EE 0%, #E8E4DA 60%, #D8D4C8 100%)",
        textPrimary: "#111111",
        textMuted: "#4B4B4B",
        outlineTitle: "#111111",
        titleFill: "#111111",
        gridLine: "rgba(0, 0, 0, 0.14)",
        cardBg: "#FFFFFF",
        cardBorder: "rgba(0, 0, 0, 0.1)",
        cardActiveBorder: "rgba(200, 29, 29, 0.5)",
        cardGlow: "0 18px 40px -10px rgba(0, 0, 0, 0.12)",
        stampColor: "#111111",
        btnPrimaryBg: "#111111",
        btnPrimaryText: "#FFFFFF",
      };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative z-20 w-full overflow-hidden pt-16 pb-20 font-sans select-none scroll-mt-20 sm:pt-20 sm:pb-28 transition-colors duration-700"
      style={{
        background: theme.bg,
        color: theme.textPrimary,
      }}
    >
      {/* Film grain subtle overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "240px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14">
        {/* ── UNIFIED EDITORIAL HEADER ── */}
        <EditorialSectionHeader
          number="05"
          label="FREQUENTLY ASKED"
          outlineTitle="COMMON"
          solidTitle="QUESTIONS"
          description="Everything you need to know about engineering workflows, stack architecture, transparent milestone pricing, and hand-off deliverables."
          heroMode={heroMode}
        />

        {/* ── 2. ARCHITECTURAL ACCORDION LIST ── */}
        <div className="mx-auto max-w-5xl space-y-4 sm:space-y-5">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            const category = faqCategories[item.id] || "General";

            return (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border transition-all duration-300"
                style={{
                  background: isRedTheme ? "#131418" : "#FFFFFF",
                  borderColor: isOpen ? theme.cardActiveBorder : theme.cardBorder,
                  boxShadow: isOpen
                    ? isRedTheme
                      ? "0 15px 40px -10px rgba(0,0,0,0.7), 0 0 25px rgba(239,68,68,0.18)"
                      : "0 15px 40px -10px rgba(0,0,0,0.12)"
                    : "none",
                }}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-7 flex items-center justify-between gap-4 text-left cursor-pointer outline-none"
                >
                  <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                    {/* Index Number */}
                    <span
                      className="font-display text-2xl sm:text-3xl font-black shrink-0 transition-colors"
                      style={{
                        color: isOpen
                          ? isRedTheme
                            ? "#FFFFFF"
                            : "#C81D1D"
                          : isRedTheme
                            ? "rgba(255,255,255,0.4)"
                            : "rgba(0,0,0,0.3)",
                      }}
                    >
                      {item.id}
                    </span>

                    <div className="flex flex-col min-w-0">
                      {/* Category tag */}
                      <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#C81D1D] mb-1">
                        [ {category} ]
                      </span>
                      {/* Question */}
                      <h3 className="font-display text-lg sm:text-2xl font-black uppercase tracking-tight leading-tight">
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  {/* Circular Rotating Toggle Icon */}
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300"
                    style={{
                      background: isOpen
                        ? isRedTheme
                          ? "#FFFFFF"
                          : "#111111"
                        : isRedTheme
                          ? "rgba(255,255,255,0.06)"
                          : "rgba(0,0,0,0.04)",
                      borderColor: isOpen ? "transparent" : theme.cardBorder,
                      color: isOpen
                        ? isRedTheme
                          ? "#8A0B0D"
                          : "#FFFFFF"
                        : theme.textPrimary,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  </div>
                </button>

                {/* Accordion Expandable Answer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-5 sm:px-7 pb-6 sm:pb-7 pt-2 border-t"
                        style={{
                          borderColor: isRedTheme
                            ? "rgba(255,255,255,0.08)"
                            : "rgba(0,0,0,0.06)",
                        }}
                      >
                        <p
                          className="text-xs sm:text-base leading-relaxed pl-10 sm:pl-14 max-w-3xl"
                          style={{ color: theme.textMuted }}
                        >
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ── 3. BOTTOM EDITORIAL CTA BANNER ── */}
        <div
          className="mt-14 sm:mt-16 mx-auto max-w-5xl rounded-3xl border p-6 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl"
          style={{
            background: isRedTheme ? "#131418" : "#FFFFFF",
            borderColor: theme.cardBorder,
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border"
              style={{
                background: isRedTheme ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                borderColor: isRedTheme ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
                color: isRedTheme ? "#FFFFFF" : "#C81D1D",
              }}
            >
              <HelpCircle className="w-6 h-6" />
            </div>

            <div>
              <h4 className="font-display text-lg sm:text-xl font-black uppercase tracking-tight">
                Have a unique specification or question?
              </h4>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-wider opacity-75">
                Direct engineer response within 24 hours.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            onClick={handleScrollToContact}
            className="px-6 py-3 rounded-full font-mono text-xs font-black uppercase tracking-wider transition-all duration-200 hover:scale-105 shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
            style={{
              background: theme.btnPrimaryBg,
              color: theme.btnPrimaryText,
            }}
          >
            <span>GET IN TOUCH DIRECTLY</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
