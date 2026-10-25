import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { motion, useAnimate, useReducedMotion } from "motion/react";
import {
  SocialPill,
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
  InteractiveButton,
} from "../components/ui";
import {
  RightDoodle,
  LeftDoodle,
  HandwrittenBadge,
} from "../components/decoration/doodleCard";
import { socialLinks } from "../config/site";
import { TypingAnimation } from "../components/ui/typing-animation";
import {
  BrandTopLeftShape,
  BrandBottomHeroWave,
  BrandPortraitBackdropShape,
} from "../components/decoration/brandBackgroundShapes";

const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
};

const EASE = [0.22, 1, 0.36, 1];

/* Staggered reveal for left-column elements after hero name settles */
const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: i * 0.08 },
  }),
};

/* Portrait reveal variant */
const photoReveal = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: 0.1 },
  },
};

export default function Hero({ onRevealed }) {
  const [nameScope, animateName] = useAnimate();
  const reduceMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  const heroSocialLinks = useMemo(
    () =>
      socialLinks.map((item) => ({
        ...item,
        icon: iconMap[item.key] || GitHubIcon,
      })),
    [],
  );

  // ── Hero Intro Sequence: Center Fade-In -> Hold -> Glide to Position -> Reveal Rest ──
  useLayoutEffect(() => {
    const el = nameScope.current;
    if (!el) return;

    if (reduceMotion || window.scrollY > 120) {
      el.style.transform = "none";
      el.style.opacity = "1";
      el.style.willChange = "auto";
      setRevealed(true);
      return;
    }

    let cancelled = false;

    const run = async () => {
      el.style.transform = "none";
      el.style.opacity = "0";

      if (document.fonts?.ready) {
        await Promise.race([
          document.fonts.ready,
          new Promise((r) => setTimeout(r, 600)),
        ]);
      }
      if (cancelled) return;

      const vw = document.documentElement.clientWidth;
      const vh = window.visualViewport?.height ?? window.innerHeight;
      const isMobile = vw < 768;

      const rect = el.getBoundingClientRect();
      const dx = vw / 2 - (rect.left + rect.width / 2);
      const dy = vh / 2 - (rect.top + rect.height / 2);
      const startScale = isMobile ? 1.05 : 1.16;

      await animateName(
        el,
        { x: dx, y: dy, scale: startScale, opacity: 0 },
        { duration: 0 },
      );
      if (cancelled) return;

      await animateName(
        el,
        { opacity: 1, y: dy - 6 },
        { duration: isMobile ? 0.45 : 0.6, ease: "easeOut" },
      );
      if (cancelled) return;

      await new Promise((r) => setTimeout(r, isMobile ? 240 : 340));
      if (cancelled) return;

      await animateName(
        el,
        { x: 0, y: 0, scale: 1 },
        { duration: isMobile ? 0.75 : 0.9, ease: EASE },
      );
      if (cancelled) return;

      el.style.willChange = "auto";
      setRevealed(true);
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [animateName, nameScope, reduceMotion]);

  useEffect(() => {
    if (revealed) onRevealed?.();
  }, [revealed, onRevealed]);

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo(`#${id}`, { offset: -80 });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const state = revealed ? "show" : "hidden";

  return (
    <section
      id="home"
      className="relative w-full flex-1 min-h-0 flex flex-col justify-end overflow-visible bg-[#FAF8F5] select-none"
    >
      <BrandTopLeftShape opacity={0.5} reveal={revealed} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14 flex-1 flex flex-col justify-end overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 items-end flex-1 overflow-visible">
          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-6 flex flex-col justify-center z-20 self-center pt-8 pb-2 lg:py-12 overflow-visible">
            <motion.div
              custom={0}
              variants={reveal}
              initial="hidden"
              animate={state}
            >
              <HandwrittenBadge
                text={
                  <>
                    Crafting digital
                    <br />
                    experiences
                  </>
                }
                rotation="-rotate-3"
                textClass="text-base sm:text-lg"
                arrowDirection="curved-down-right"
              />
            </motion.div>

            {/* Primary Hero Name */}
            <div className="relative inline-block my-1 sm:my-2 overflow-visible">
              <h1
                ref={nameScope}
                id="hero-name"
                style={{ opacity: 0, willChange: "transform, opacity" }}
                className="font-display text-[clamp(2.65rem,8.5vw+0.5rem,9.2rem)] font-extrabold text-[#111111] leading-[0.88] tracking-[-0.04em] whitespace-nowrap relative z-30 transform-gpu origin-center"
              >
                Raj Shekhar
              </h1>
            </div>

            {/* Dynamic Role Line */}
            <motion.div
              custom={1}
              variants={reveal}
              initial="hidden"
              animate={state}
              className="mt-3 sm:mt-4 mb-6"
            >
              <p className="text-base sm:text-lg md:text-xl text-[#333333] font-normal leading-relaxed max-w-xl">
                <span>I design &amp; build&nbsp;</span>
                <span className="relative inline-block font-semibold text-[#111111]">
                  {revealed ? (
                    <TypingAnimation
                      words={["full-stack MERN", "Websites", "Web Apps"]}
                      blinkCursor={true}
                      pauseDelay={2000}
                      loop
                      className="text-lg md:text-lg lg:text-2xl bg-gradient-to-r from-brand-deep via-brand to-brand-light bg-clip-text text-transparent font-black tracking-tight drop-shadow-[0_1px_2px_rgba(var(--brand-rgb-dark),0.25)]"
                    >
                      Blinking cursor
                    </TypingAnimation>
                  ) : (
                    <span className="invisible text-lg md:text-lg lg:text-2xl font-black tracking-tight">
                      full-stack MERN
                    </span>
                  )}
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-[5px] overflow-visible pointer-events-none"
                    viewBox="0 0 100 6"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M 1 4 Q 50 1 99 4"
                      stroke="var(--brand-primary)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: revealed ? 1 : 0 }}
                      transition={{
                        duration: 0.7,
                        ease: "easeOut",
                        delay: 0.4,
                      }}
                    />
                  </svg>
                </span>
              </p>
            </motion.div>

            {/* Primary & Secondary Action Buttons */}
            <motion.div
              custom={2}
              variants={reveal}
              initial="hidden"
              animate={state}
              className="flex flex-wrap items-center gap-3"
            >
              <InteractiveButton
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Raj_Shekhar_Resume.pdf"
                variant="dark"
                icon={<span aria-hidden="true">&darr;</span>}
              >
                My Resume
              </InteractiveButton>

              <InteractiveButton
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "contact")}
                variant="outline"
                icon={<span aria-hidden="true">&rarr;</span>}
              >
                Get in touch
              </InteractiveButton>
            </motion.div>

            {/* ── Footer Row: Theme-Aware Trust Stack + Availability Pill ── */}
            <motion.div
              custom={3}
              variants={reveal}
              initial="hidden"
              animate={state}
              className="mt-6 sm:mt-8 pt-5 border-t border-black/8 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              {/* Client Favicon Stack */}
              <div className="flex items-center gap-3">
                <div className="flex shrink-0 items-center -space-x-3">
                  <a
                    href="https://udupivrindavan.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Udupi Vrindavan"
                    className="group relative z-20 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-[#FAF8F5] bg-white shadow-sm transition-all duration-300 ease-out hover:z-30 hover:-translate-y-1.5 hover:scale-110 hover:border-brand hover:shadow-[0_6px_18px_rgba(var(--brand-rgb),0.3)] focus-visible:z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  >
                    <img
                      src="https://www.google.com/s2/favicons?domain=udupivrindavan.com&sz=128"
                      alt=""
                      width="36"
                      height="36"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </a>
                  <a
                    href="https://www.rajshekhar.site/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Raj Shekhar's website"
                    className="group relative z-10 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-[#FAF8F5] bg-white shadow-sm transition-all duration-300 ease-out hover:z-30 hover:-translate-y-1.5 hover:scale-110 hover:border-brand hover:shadow-[0_6px_18px_rgba(var(--brand-rgb),0.3)] focus-visible:z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  >
                    <img
                      src="https://www.google.com/s2/favicons?domain=rajshekhar.site&sz=128"
                      alt=""
                      width="36"
                      height="36"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </a>
                </div>

                <div className="min-w-0 text-sm leading-snug">
                  <p className="font-medium text-[#222222] transition-colors duration-300 hover:text-brand-dark">
                    Building digital experiences
                  </p>
                  <p className="mt-0.5 text-xs text-[#777777] sm:text-sm">
                    Client work &amp; personal projects
                  </p>
                </div>
              </div>

              {/* Location & Remote Status Pill (Uses dynamic brand colors) */}
              <div
                className="inline-flex items-center rounded-full border border-black/10 bg-white/85 p-1 shadow-[0_2px_10px_rgba(var(--brand-rgb),0.08)]"
                role="group"
                aria-label="Location and availability"
              >
                <span className="flex items-center gap-1.5 rounded-full px-3 py-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--brand-primary-dark)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <span className="text-[11px] font-bold tracking-wide text-[#1a1a1a]">
                    India
                  </span>
                </span>

                <span className="h-4 w-px bg-black/10" aria-hidden="true" />

                <span className="flex items-center gap-2 rounded-full px-3 py-1.5">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[11px] font-bold tracking-wide text-[#1a1a1a]">
                    Open for work
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-[#059669]">
                    Worldwide
                  </span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Hero Portrait, Doodles & Social Pill ── */}
          <div className="lg:col-span-6 relative flex items-end justify-center lg:justify-end self-end w-full">
            <motion.div
              variants={photoReveal}
              initial="hidden"
              animate={state}
              className="relative z-10 w-full max-w-[450px] sm:max-w-[520px] lg:max-w-[680px] xl:max-w-[760px] flex items-end justify-center lg:justify-end transform-gpu"
            >
              <RightDoodle
                text={
                  <>
                    Turning
                    <br />
                    Ideas Into
                    <br />
                    Real Websites
                  </>
                }
                className="absolute -top-10 right-1 items-end sm:top-0 sm:right-4 lg:-right-4"
                arrowDirection="down-left"
              />

              <div
                className="pointer-events-none absolute inset-x-6 sm:inset-x-12 bottom-0 top-[20%] -z-10 hidden sm:block rounded-full bg-gradient-to-t from-[var(--brand-primary)]/30 via-[var(--brand-primary-light)]/15 to-transparent blur-3xl"
                aria-hidden="true"
              />

              <BrandPortraitBackdropShape
                className="right-[-8%] top-[20%] h-[75%] w-[110%]"
                opacity={0.5}
                glow={true}
                reveal={revealed}
                float={false}
              />

              <picture className="w-full flex justify-end">
                <source
                  type="image/avif"
                  srcSet="/images/profile2-800.avif 800w, /images/profile2-1400.avif 1400w"
                  sizes="(max-width: 768px) 520px, 760px"
                />
                <source
                  type="image/webp"
                  srcSet="/images/profile2-800.webp 800w, /images/profile2-1400.webp 1400w"
                  sizes="(max-width: 768px) 520px, 760px"
                />
                <img
                  src="/images/profile2.png"
                  alt="Raj Shekhar - Full-Stack MERN Developer & Web Designer"
                  width={700}
                  height={780}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="hero-profile-glow w-full h-auto max-h-[60vh] sm:max-h-[75vh] lg:max-h-[85vh] xl:max-h-[90vh] object-contain object-bottom block"
                />
              </picture>

              <LeftDoodle
                text={
                  <>
                    Code
                    <br />
                    Design
                    <br />
                    Build
                    <br />
                    Repeat
                  </>
                }
                className="left-1 sm:-left-2 lg:-left-5"
                arrowDirection="down-right"
              />

              <SocialPill
                links={heroSocialLinks}
                className="absolute right-0 sm:right-2 lg:-right-4 top-[25%] sm:top-[30%] z-40"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <BrandBottomHeroWave opacity={0.5} reveal={revealed} />
    </section>
  );
}
