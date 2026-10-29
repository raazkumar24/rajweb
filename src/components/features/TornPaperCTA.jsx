import React, { useRef, useId, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { GitHubIcon, LinkedInIcon, InstagramIcon } from "../ui";
import { siteConfig } from "../../config/site";

const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
};

/* ──────────────────────────────────────────────
   TornPaperCTA Component (Part C — Bottom Panel)
   ────────────────────────────────────────────── */
export default function TornPaperCTA({ heroMode = "red" }) {
  const isRedTheme = heroMode === "red";
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef(null);

  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  const textParallax = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [24, -20],
  );

  const starRotation = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-30, 90],
  );

  const ctaSocialLinks = useMemo(
    () =>
      siteConfig.socialLinks.map((item) => ({
        ...item,
        icon: iconMap[item.key] || GitHubIcon,
      })),
    [],
  );

  // Smooth scroll helper
  const handleScrollToContact = (e) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo("#contact", { offset: -60 });
      return;
    }
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToTop = (e) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo(0);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ctaBg = isRedTheme
    ? "linear-gradient(180deg, #1C0508 0%, #120305 100%)"
    : "#141414";

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none transition-colors duration-700"
      style={{ background: ctaBg }}
    >
      {/* ── EDITORIAL CHARCOAL/BURGUNDY PANEL ── */}
      <section className="relative z-10 text-white pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-14">
          {/* ── GIANT STACKED BRUTALIST TEXT: LET'S BUILD SOMETHING ── */}
          <motion.div
            style={{ y: textParallax }}
            className="flex flex-col items-start select-none mb-14 sm:mb-20"
          >
            {/* Top row: LET'S BUILD in bold Crimson Red */}
            <div className="w-full flex items-center">
              <h2 className="font-display text-[clamp(4.2rem,14vw,14.5rem)] font-black uppercase tracking-[-0.04em] leading-[0.84] text-[#C81D1D] hover:text-[#FF2E2E] transition-colors duration-300 drop-shadow-[0_4px_24px_rgba(200,29,29,0.35)]">
                LET'S BUILD
              </h2>
            </div>

            {/* Bottom row: SOMETHING (White) + 4-Point Star Icon */}
            <div className="w-full flex items-center gap-4 sm:gap-8 lg:gap-12 flex-wrap">
              <h2 className="font-display text-[clamp(4.2rem,14vw,14.5rem)] font-black uppercase tracking-[-0.04em] leading-[0.84] text-white">
                SOMETHING
              </h2>

              {/* 4-point star icon with parallax & continuous gentle rotation */}
              <motion.div
                style={{ rotate: starRotation }}
                animate={shouldReduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                className="text-[#C81D1D] shrink-0"
              >
                <svg
                  width="90"
                  height="90"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  className="w-14 h-14 sm:w-20 sm:h-20 lg:w-28 lg:h-28 drop-shadow-[0_0_30px_rgba(200,29,29,0.7)]"
                >
                  <path d="M 50 8 Q 50 50 8 50 Q 50 50 50 92 Q 50 50 92 50 Q 50 50 50 8 Z" />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* ── FOOTER STATUS & NAVIGATION BAR ── */}
          <div className="border-t border-white/10 pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Available For Work Status */}
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-white/90">
                AVAILABLE FOR WORK
              </span>
            </div>

            {/* Social Icons Links (matching Hero SVGs) */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {ctaSocialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.key}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`cta-social-${link.key}`}
                    aria-label={link.title || link.key}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/25 text-white transition-all duration-200 hover:scale-110 border border-white/15 hover:border-white/40"
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </a>
                );
              })}

              {/* Email Icon */}
              <a
                href={`mailto:${siteConfig.email}`}
                id="cta-social-email"
                aria-label="Send Email"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/25 text-white transition-all duration-200 hover:scale-110 border border-white/15 hover:border-white/40"
              >
                <svg
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>

            {/* Quick Actions: Start a Conversation + Back to Top */}
            <div className="flex items-center gap-4">
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase text-white hover:text-[#FF2E2E] transition-colors cursor-pointer px-4 py-2 rounded-full border border-white/20 hover:border-[#C81D1D]"
              >
                <span>START A CONVERSATION</span>
                <span className="text-base">&rarr;</span>
              </a>

              <button
                type="button"
                onClick={handleScrollToTop}
                aria-label="Scroll back to top"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-[#C81D1D] hover:bg-[#C81D1D]/15 transition-all duration-200 hover:scale-110 cursor-pointer"
              >
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
