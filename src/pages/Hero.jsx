import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  useAnimate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { GitHubIcon, LinkedInIcon, InstagramIcon } from "../components/ui";
import { siteConfig } from "../config/site";

const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
};
const EASE = [0.22, 1, 0.36, 1];

/* Circular Rotating Stamp */
function CircularBadge({ isRed = true }) {
  const text = "· MADE FOR WEB · FOCUSED ON IMPACT · ";
  const r = 40;
  const strokeColor = isRed ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)";
  const fillColor = isRed ? "#FFFFFF" : "#111111";

  return (
    <div className="relative flex items-center justify-center select-none pointer-events-none">
      <svg
        viewBox="0 0 110 110"
        width="110"
        height="110"
        aria-hidden="true"
        className="overflow-visible"
      >
        <defs>
          <path
            id="stamp-path"
            d={`M 55,55 m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
          />
        </defs>
        {/* Dashed outer ring */}
        <circle
          cx="55"
          cy="55"
          r={r + 6}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        >
          <text
            fontSize="8.5"
            fontFamily="monospace"
            fill={fillColor}
            fontWeight="700"
            letterSpacing="2.2"
          >
            <textPath href="#stamp-path">{text}</textPath>
          </text>
        </motion.g>
        {/* Center 4-point star */}
        <g transform="translate(55,55)">
          <path
            d="M 0,-9 Q 0,0 9,0 Q 0,0 0,9 Q 0,0 -9,0 Q 0,0 0,-9 Z"
            fill={fillColor}
          />
        </g>
      </svg>
    </div>
  );
}

/* Role + tagline + resume button.
   Rendered twice: inline under the name on mobile, absolute on sm+ */
function RoleBlock({ isRed, className = "", idSuffix = "" }) {
  return (
    <div className={className}>
      <p
        className={`font-display font-black text-xs sm:text-sm tracking-[0.16em] uppercase transition-colors ${
          isRed ? "text-white" : "text-[#111111]"
        }`}
      >
        FULL-STACK WEB DEVELOPER
      </p>
      <p
        className={`text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase transition-colors ${
          isRed ? "text-white/75" : "text-[#111111]/75"
        }`}
      >
        REACT • NEXT.JS • MERN STACK
      </p>
      <div className="pt-1.5 pointer-events-auto">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download="Raj_Shekhar_Resume.pdf"
          id={`hero-resume-btn${idSuffix}`}
          className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border text-[11px] sm:text-xs font-black uppercase tracking-wider backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg cursor-pointer ${
            isRed
              ? "border-white/35 bg-white/10 hover:bg-white hover:text-black text-white"
              : "border-black/25 bg-[#111111] hover:bg-[#C41618] text-white"
          }`}
        >
          <span>RESUME</span>
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* Green "available" dot (+ optional text) */
function AvailableDot({ isRed, showText = false }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      {showText && (
        <span
          className={`text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap ${
            isRed ? "text-white" : "text-[#111111]"
          }`}
        >
          Available for Work
        </span>
      )}
    </div>
  );
}

/* GitHub / LinkedIn / Instagram / Email buttons (flex direction is set by parent) */
function SocialButtons({ links, isRed, idSuffix = "" }) {
  const btn = `w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
    isRed
      ? "bg-white/10 hover:bg-white/25 text-white"
      : "bg-black/10 hover:bg-black/20 text-[#111111]"
  }`;
  return (
    <>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.key}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            id={`hero-social-${link.key}${idSuffix}`}
            aria-label={link.key}
            className={btn}
          >
            <Icon className="h-3.5 w-3.5" />
          </a>
        );
      })}
      <a
        href={`mailto:${siteConfig.email}`}
        id={`hero-social-email${idSuffix}`}
        aria-label="Send Email"
        className={btn}
      >
        <svg
          className="h-3.5 w-3.5"
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
    </>
  );
}

/* Round scroll-down button (optional text label) */
function ScrollButton({
  isRed,
  onActivate,
  showLabel = false,
  className = "",
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Scroll down"
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onActivate(e);
      }}
      className={`relative pointer-events-auto flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0 ${className}`}
    >
      {showLabel && (
        <span
          className={`text-xs font-bold tracking-[0.24em] uppercase transition-colors ${
            isRed
              ? "text-white/85 group-hover:text-white"
              : "text-[#111111]/85 group-hover:text-[#111111]"
          }`}
        >
          SCROLL DOWN
        </span>
      )}
      <div
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all duration-200 group-hover:translate-y-0.5 ${
          isRed
            ? "border-white/40 group-hover:border-white group-hover:bg-white/15 text-white"
            : "border-black/30 group-hover:border-black group-hover:bg-black/10 text-[#111111]"
        }`}
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}

export default function Hero({ heroMode = "red", onToggleMode, onRevealed }) {
  const [nameScope, animateName] = useAnimate();
  const reduceMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef(null);

  const isRed = heroMode === "red";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const heroSocialLinks = useMemo(
    () =>
      siteConfig.socialLinks.map((item) => ({
        ...item,
        icon: iconMap[item.key] || GitHubIcon,
      })),
    [],
  );

  useLayoutEffect(() => {
    const el = nameScope.current;
    if (!el) return;
    if (reduceMotion || window.scrollY > 120) {
      el.style.opacity = "1";
      setRevealed(true);
      return;
    }
    let cancelled = false;
    const run = async () => {
      el.style.opacity = "0";
      if (document.fonts?.ready) {
        await Promise.race([
          document.fonts.ready,
          new Promise((r) => setTimeout(r, 600)),
        ]);
      }
      if (cancelled) return;
      await animateName(
        el,
        { opacity: 1 },
        { duration: 0.9, ease: "easeOut", delay: 0.15 },
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
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
  };

  const nameShadow = isRed
    ? "drop-shadow(0 15px 35px rgba(0,0,0,0.35))"
    : "none";

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full flex-1 min-h-[100svh] flex flex-col justify-between select-none overflow-hidden transition-colors duration-500"
      style={{
        background: isRed
          ? "radial-gradient(ellipse at 50% 42%, #C41618 0%, #990C0E 100%)"
          : "radial-gradient(ellipse at 50% 42%, #EDEBE5 0%, #D8D5CC 100%)",
        color: isRed ? "#FFFFFF" : "#111111",
      }}
    >
      {/* Paper / Film Grain Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "240px",
        }}
      />

      {/* ══ TOP-LEFT EDITORIAL SUBHEAD ══ */}
      <div className="absolute left-5 sm:left-12 lg:left-16 top-20 sm:top-24 lg:top-28 z-25 flex flex-col gap-1 select-none pointer-events-none max-w-[calc(100%-2.5rem)]">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-5 sm:w-6 h-[1.5px] shrink-0 transition-colors ${
              isRed ? "bg-white/80" : "bg-[#111111]/80"
            }`}
          />
          <span
            className={`text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.24em] uppercase transition-colors ${
              isRed ? "text-white" : "text-[#111111]"
            }`}
          >
            EDITORIAL PORTFOLIO
          </span>
        </div>
        <span
          className={`text-[9px] sm:text-[11px] font-semibold tracking-[0.14em] sm:tracking-[0.18em] uppercase pl-7 sm:pl-8 transition-colors ${
            isRed ? "text-white/70" : "text-[#111111]/70"
          }`}
        >
          CREATIVE CODE &amp; ARCHITECTURE
        </span>
      </div>

      {/* ══ TOP-RIGHT CIRCULAR STAMP (desktop / tablet only) ══ */}
      <div className="absolute right-6 sm:right-12 lg:right-16 top-20 sm:top-24 lg:top-28 z-25 hidden sm:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={revealed ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <CircularBadge isRed={isRed} />
        </motion.div>
      </div>

      {/* ══ MAIN STAGE: GIANT TYPOGRAPHY ══ */}
      <div className="relative flex-1 flex flex-col justify-start sm:justify-center w-full px-5 sm:px-12 lg:px-16 pt-36 sm:pt-24 lg:pt-28 pb-10 sm:pb-24">
        {/* Giant Stacked Typography (RAJ / SHEKHAR.) */}
        <div className="relative z-10 w-full flex flex-col select-none pointer-events-none sm:my-auto">
          <motion.div
            ref={nameScope}
            className="flex flex-col select-none pointer-events-none leading-[0.8]"
          >
            {/* Line 1: RAJ */}
            <h1
              id="hero-name-raj"
              className={`font-display font-black tracking-[-0.04em] uppercase text-left transition-colors duration-300 text-[clamp(4.5rem,24vw,8rem)] sm:text-[clamp(5.5rem,19.5vw,20.5rem)] ${
                isRed ? "text-white" : "text-[#C41618]"
              }`}
              style={{
                lineHeight: 0.8,
                fontFamily: "var(--font-display)",
                filter: nameShadow,
              }}
            >
              RAJ
            </h1>

            {/* Line 2: SHEKHAR. */}
            <h1
              id="hero-name-shekhar"
              className={`font-display font-black tracking-[-0.04em] uppercase text-left whitespace-nowrap transition-colors duration-300 text-[clamp(2.5rem,16vw,7rem)] sm:text-[clamp(4.2rem,18.5vw,17rem)] ${
                isRed ? "text-white" : "text-[#C41618]"
              }`}
              style={{
                lineHeight: 0.8,
                fontFamily: "var(--font-display)",
                marginTop: "-0.07em",
                filter: nameShadow,
              }}
            >
              SHEKHAR.
            </h1>
          </motion.div>
        </div>

        {/* Mobile-only: role + resume sit under the name, above the portrait */}
        <RoleBlock
          isRed={isRed}
          idSuffix="-mobile"
          className="sm:hidden relative z-25 mt-6 flex flex-col items-start text-left gap-1.5 select-none"
        />
      </div>

      {/* ══ DESKTOP: ROLE & RESUME (moved up from the bottom edge) ══ */}
      <RoleBlock
        isRed={isRed}
        className="hidden sm:flex absolute right-12 lg:right-16 sm:bottom-36 lg:bottom-44 z-25 flex-col items-end text-right gap-1.5 select-none pointer-events-none"
      />

      {/* ══ PORTRAIT CENTERPIECE (front on mobile, bigger) ══ */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={revealed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
        className="absolute z-30 sm:z-20 bottom-0 left-[47%] sm:left-1/2 -translate-x-1/2 pointer-events-none flex justify-center items-end w-[min(112vw,30rem)] sm:w-[clamp(350px,50vw,760px)]"
      >
        <motion.div
          style={{ y: parallaxY }}
          className="relative w-full flex justify-center"
        >
          {/* Starburst Decal in Concrete Mode */}
          {!isRed && (
            <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 opacity-90 scale-100 sm:scale-125">
              <svg width="240" height="240" viewBox="0 0 260 260" fill="none">
                <path
                  d="M130 0L145 95L240 50L175 125L260 130L175 145L240 215L145 175L130 260L115 175L20 215L85 145L0 130L85 125L20 50L115 95L130 0Z"
                  fill="#111111"
                />
              </svg>
            </div>
          )}

          <img
            src="/images/profile-hero.png"
            alt="Raj Shekhar"
            width={1024}
            height={887}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="w-full h-auto object-contain object-bottom block max-h-[58svh] sm:max-h-[clamp(420px,84vh,880px)]"
            style={{
              filter: isRed
                ? "drop-shadow(0 25px 45px rgba(0,0,0,0.55)) contrast(1.03)"
                : "drop-shadow(0 25px 40px rgba(0,0,0,0.35)) contrast(1.04)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* ══ MOBILE: VERTICAL ROUNDED DOCK (right side of the portrait) ══ */}
      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={revealed ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
        className={`sm:hidden absolute right-3 bottom-6 z-40 flex flex-col items-center gap-2.5 px-1.5 py-3 rounded-full border backdrop-blur-md shadow-lg ${
          isRed
            ? "bg-[#990C0E]/50 border-white/20"
            : "bg-[#EDEBE5]/60 border-black/15"
        }`}
      >
        <AvailableDot isRed={isRed} />
        <div
          className={`h-[1px] w-4 ${isRed ? "bg-white/25" : "bg-black/20"}`}
        />
        <SocialButtons
          links={heroSocialLinks}
          isRed={isRed}
          idSuffix="-mobile"
        />
        <div
          className={`h-[1px] w-4 ${isRed ? "bg-white/25" : "bg-black/20"}`}
        />
        <ScrollButton
          isRed={isRed}
          onActivate={(e) => handleSmoothScroll(e, "about")}
        />
      </motion.div>

      {/* ══ DESKTOP: BOTTOM STATUS & SCROLL DOWN BAR ══ */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={revealed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
        className="hidden sm:flex absolute bottom-0 left-0 right-0 z-25 w-full items-center justify-between gap-3 px-12 lg:px-16 py-4 pointer-events-none"
      >
        {/* Horizontal Divider Line: z-10 behind the portrait (z-20) */}
        <div
          className={`absolute inset-x-0 top-0 h-[1px] z-10 pointer-events-none transition-colors ${
            isRed ? "bg-white/20" : "bg-black/15"
          }`}
        />

        {/* Left: Availability & Social Icons */}
        <div className="relative z-30 pointer-events-auto flex items-center gap-4 min-w-0">
          <AvailableDot isRed={isRed} showText />
          <div
            className={`h-3.5 w-[1px] ${isRed ? "bg-white/25" : "bg-black/20"}`}
          />
          <div className="flex items-center gap-2">
            <SocialButtons links={heroSocialLinks} isRed={isRed} />
          </div>
        </div>

        {/* Right: Scroll Down */}
        <ScrollButton
          isRed={isRed}
          showLabel
          className="z-30"
          onActivate={(e) => handleSmoothScroll(e, "about")}
        />
      </motion.div>
    </section>
  );
}
