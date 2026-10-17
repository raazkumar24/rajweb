import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import gsap from "gsap";
import {
  SocialPill,
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
} from "../components/ui";
import {
  BrandTopLeftShape,
  BrandBottomHeroWave,
  HandDrawnUnderline,
  DoodleCard,
  LeftDoodle,
} from "../components/decorative";
import { socialLinks as siteSocialLinks } from "../config/site";
import { ANIM } from "../animation/config";

// ─── Typewriter roles ─────────────────────────────────────────────────────────
const roles = [
  "Modern Web Apps",
  "Frontend Experiences",
  "Full-Stack MERN Apps",
  "Interactive Websites",
];

const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
};

// ─── Stats data ───────────────────────────────────────────────────────────────
const stats = [
  { value: "10+", label: "Projects Deployed" },
  { value: "MERN", label: "Stack Specialist", isHighlight: true },
  { value: "Available", label: "Open for Projects", isLive: true },
];

// ═════════════════════════════════════════════════════════════════════════════
// HERO PAGE (Optimized Animation & Performance)
// ═════════════════════════════════════════════════════════════════════════════
function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState("typing"); // "typing" | "pausing" | "deleting" | "waiting"

  const heroSocialLinks = useMemo(() => {
    return siteSocialLinks.map((item) => ({
      ...item,
      icon: iconMap[item.key] || GitHubIcon,
    }));
  }, []);

  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const underlineRef = useRef(null);
  const profileRef = useRef(null);
  const socialRef = useRef(null);
  const doodle1Ref = useRef(null);
  const doodle2Ref = useRef(null);

  // ── Refined Typewriter Engine with Natural Cadence ─────────────────────────
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (phase === "typing") {
      if (displayedText.length < currentRole.length) {
        const typingSpeed = 75 + Math.floor(Math.random() * 25);
        timeout = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setPhase("pausing");
        }, 60);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => {
        setPhase("deleting");
      }, 2200);
    } else if (phase === "deleting") {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentRole.slice(0, displayedText.length - 1));
        }, 38);
      } else {
        timeout = setTimeout(() => {
          setPhase("waiting");
        }, 60);
      }
    } else if (phase === "waiting") {
      timeout = setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setPhase("typing");
      }, 350);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, phase, roleIndex]);

  const spotlightRef = useRef(null);
  const heroRafRef = useRef(null);

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current || !spotlightRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!heroRafRef.current) {
      heroRafRef.current = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.left = `${x}px`;
          spotlightRef.current.style.top = `${y}px`;
          spotlightRef.current.style.opacity = "0.45";
        }
        heroRafRef.current = null;
      });
    }
  };

  const handleHeroMouseLeave = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = "0";
    }
  };

  // ── Hero Entrance Animation (Centered Name Slide -> Position -> Reveal) ───
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(
        [
          nameRef.current,
          ".bg-wave-left",
          ".bg-bottom-wave",
          ".hero-stagger",
          profileRef.current,
          doodle1Ref.current,
          doodle2Ref.current,
          socialRef.current,
        ],
        { opacity: 1, x: 0, y: 0, scale: 1, clearProps: "all" },
      );
      if (underlineRef.current) {
        gsap.set(underlineRef.current, { strokeDashoffset: 0 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      const heroName = nameRef.current;
      if (!heroName) return;

      // 1. Clear any residual transforms before measuring exact DOM position
      gsap.set(heroName, { clearProps: "transform,scale,opacity" });

      const rect = heroName.getBoundingClientRect();
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
      const nameCenterX = rect.left + rect.width / 2;
      const nameCenterY = rect.top + rect.height / 2;

      const deltaX = viewportCenterX - nameCenterX;
      const deltaY = viewportCenterY - nameCenterY;

      // 2. Set initial hidden states before browser paints (zero flash)
      gsap.set(".hero-stagger", { y: ANIM.REVEAL_Y, opacity: 0 });
      gsap.set(".bg-wave-left", { x: -60, opacity: 0 });
      gsap.set(".bg-bottom-wave", { y: 30, opacity: 0 });
      if (profileRef.current)
        gsap.set(profileRef.current, { y: 60, opacity: 0 });
      if (doodle1Ref.current)
        gsap.set(doodle1Ref.current, { scale: 0.7, opacity: 0 });
      if (doodle2Ref.current)
        gsap.set(doodle2Ref.current, { scale: 0.7, opacity: 0 });
      if (socialRef.current) gsap.set(socialRef.current, { x: 30, opacity: 0 });
      if (underlineRef.current) {
        gsap.set(underlineRef.current, {
          strokeDashoffset: 400,
          strokeDasharray: 400,
        });
      }

      // Initial state: centered vertically/horizontally, positioned slightly below center for sliding entry
      const initialScale =
        window.innerWidth < 640 ? 1.05 : window.innerWidth < 1024 ? 1.15 : 1.25;

      gsap.set(heroName, {
        x: deltaX,
        y: deltaY + 50,
        opacity: 0,
        scale: initialScale,
        transformOrigin: "center center",
      });

      // 3. Main Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: ANIM.EASE } });

      // Step A: Name slides up into screen center with fade in
      tl.to(heroName, {
        y: deltaY,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out",
      })
        // Step B: Brief elegant pause in center so user perceives the name
        .to({}, { duration: 0.35 })
        // Step C: Name glides smoothly from center to its exact hero layout position
        .to(heroName, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.inOut",
          clearProps: "transform,scale",
        })
        // Step D: Components appear seamlessly as name settles into position
        .to(
          ".bg-wave-left",
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
          "-=0.4",
        )
        .to(
          ".bg-bottom-wave",
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
          "-=0.55",
        )
        .to(
          ".hero-stagger",
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.55,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          "-=0.5",
        )
        .to(
          underlineRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.75,
            ease: "power2.out",
          },
          "-=0.35",
        )
        .to(
          profileRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          "-=0.55",
        )
        .to(
          [doodle1Ref.current, doodle2Ref.current],
          {
            scale: 1,
            opacity: 1,
            stagger: 0.1,
            duration: 0.45,
            ease: "back.out(1.8)",
            clearProps: "opacity,scale",
          },
          "-=0.45",
        )
        .to(
          socialRef.current,
          {
            x: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
            clearProps: "opacity,transform",
          },
          "-=0.45",
        );

      // Idle floating tweens (started after entrance settles)
      gsap.to([doodle1Ref.current, doodle2Ref.current], {
        y: -5,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.2,
      });

      gsap.to(".social-inner-float", {
        y: -6,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const navOffset = id === "about" ? 0 : 68;
      const elementPosition =
        el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(
          0,
          id === "about"
            ? Math.ceil(elementPosition) + 2
            : elementPosition - navOffset,
        ),
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="relative w-full flex-1 min-h-0 flex flex-col justify-end overflow-hidden bg-[#FAF8F5] pt-20 sm:pt-24 lg:pt-[72px] xl:pt-[78px] select-none"
    >
      {/* ── REDESIGNED PREMIUM BRAND BACKGROUND SHAPES ── */}
      <BrandTopLeftShape variant="hero" />
      <BrandBottomHeroWave className="bg-bottom-wave" />

      {/* ── AMBIENT INTERACTIVE CURSOR SPOTLIGHT (GPU-Accelerated, Zero Re-renders) ── */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute w-[520px] h-[520px] rounded-full blur-3xl opacity-0 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 -z-0"
        style={{
          left: -1000,
          top: -1000,
          background:
            "radial-gradient(circle, rgba(var(--brand-rgb),0.18) 0%, rgba(var(--brand-rgb),0.06) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── MAIN CONTAINER ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-16 flex-1 min-h-0 flex flex-col justify-end pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center flex-1 min-h-0">
          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-6 flex flex-col justify-center z-20 pt-2 pb-4 sm:pb-6 lg:py-0 self-center pl-0 sm:pl-2 lg:pl-4">
            {/* Upgraded Pill SectionBadge */}
            <div className="hero-stagger mb-2 sm:mb-2.5 inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white border border-black/10 shadow-sm w-fit">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-[#222222] whitespace-nowrap">
                Available for Work
              </span>
              <span className="hidden xs:inline text-[#888888]">&bull;</span>
              <span className="hidden xs:inline text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand/12 text-brand-dark border border-brand/25 whitespace-nowrap">
                Creative Dev
              </span>
            </div>

            {/* Title & Animated Underline */}
            <div className="relative inline-block my-0.5 sm:my-1">
              <h1
                ref={nameRef}
                id="hero-name"
                className="relative z-30 whitespace-nowrap max-[380px]:text-[2.45rem] text-[2.75rem] xs:text-[3.4rem] sm:text-[4.4rem] md:text-[5.2rem] lg:text-[4.9rem] xl:text-[6.75rem] 2xl:text-[7.6rem] font-black italic uppercase text-[#111111] leading-none tracking-[-0.04em] select-none"
              >
                RAJ SHEKHAR
              </h1>
              <HandDrawnUnderline
                pathRef={underlineRef}
                className="w-[88%] sm:w-[82%] mx-auto mt-0.5 sm:mt-1"
              />
            </div>

            {/* Typewriter */}
            <div className="hero-stagger mt-2 sm:mt-3 lg:mt-2 xl:mt-2.5 min-h-[2.1rem] sm:min-h-[2.6rem] flex items-center overflow-hidden">
              <h2 className="text-[15px] xs:text-[17px] sm:text-[1.35rem] md:text-[1.65rem] lg:text-[1.45rem] xl:text-[1.75rem] 2xl:text-[2rem] font-bold text-[#111111] flex items-center whitespace-nowrap">
                <span className="text-[#222222]">
                  I design &amp; build&nbsp;
                </span>
                <span className="relative inline-flex items-center shrink-0">
                  <span className="bg-gradient-to-r from-brand-deep via-brand to-brand-light bg-clip-text text-transparent font-black tracking-tight drop-shadow-[0_1px_2px_rgba(var(--brand-rgb-dark),0.25)]">
                    {displayedText}
                  </span>
                  <span
                    className={`inline-block w-[2.5px] sm:w-[3px] h-[1.15em] bg-brand-dark ml-1 sm:ml-1.5 rounded-full align-middle shadow-[0_0_10px_rgba(var(--brand-rgb-dark),0.7)] transition-opacity duration-150 ${
                      phase === "pausing" || phase === "waiting"
                        ? "animate-blink"
                        : "opacity-100"
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </h2>
            </div>

            {/* CTA Buttons with Smooth Scroll & Sheen */}
            <div className="hero-stagger mt-5 sm:mt-6 lg:mt-4 xl:mt-5 flex flex-wrap items-center gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Raj_Shekhar_Resume.pdf"
                className="group relative inline-flex items-center gap-2.5 rounded-full bg-[#111111] hover:bg-brand text-white hover:text-[#111111] px-6 py-3.5 sm:px-7 sm:py-3.5 text-sm font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_12px_28px_rgba(var(--brand-rgb),0.38)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer overflow-hidden"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <span>My Resume</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </a>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "contact")}
                className="group inline-flex items-center gap-2.5 rounded-full border border-black/20 hover:border-brand text-[#111111] hover:text-brand px-6 py-3.5 sm:px-7 sm:py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-95 bg-white shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Get in touch</span>
                <span className="text-[#888888] group-hover:text-brand group-hover:translate-x-1 transition-all duration-200">
                  &rarr;
                </span>
              </a>
            </div>

            {/* Editorial Stats Row — 100% borderless, NO cards */}
            <div className="hero-stagger mt-4 sm:mt-5 lg:mt-3 xl:mt-4 pt-3.5 border-t border-black/10 flex items-center justify-between sm:justify-start gap-4 sm:gap-7 w-full max-w-lg pb-1 sm:pb-2 lg:pb-1">
              {stats.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  {i > 0 && (
                    <div className="h-6 w-px bg-black/12" aria-hidden="true" />
                  )}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      {stat.isLive && (
                        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500" />
                        </span>
                      )}
                      <span
                        className={`text-base sm:text-lg font-black italic leading-none ${
                          stat.isHighlight
                            ? "text-brand-dark"
                            : "text-[#111111]"
                        }`}
                      >
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#666666] mt-1 leading-tight whitespace-nowrap">
                      {stat.label}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="lg:col-span-6 relative flex items-end justify-center self-end w-full min-w-0 overflow-visible">
            {/* Doodle 1: Top-right */}
            <DoodleCard
              forwardRef={doodle1Ref}
              containerClass="absolute -top-2 sm:top-0 right-1 sm:right-4 lg:-right-4 items-end z-20"
              text={
                <>
                  Turning
                  <br />
                  Ideas Into
                  <br />
                  Real Websites
                </>
              }
              arrowPath="M 55 10 C 50 35, 30 45, 15 52"
              arrowheadPath="M 26 42 L 14 52 L 24 62"
              arrowClass="w-9 h-9 sm:w-12 sm:h-12"
            />

            {/* Doodle 2: Left of profile */}
            <LeftDoodle forwardRef={doodle2Ref} />

            {/* Profile Image with studio backlight */}
            <div
              ref={profileRef}
              className="relative z-10 w-full max-w-[420px] sm:max-w-[520px] md:max-w-[580px] lg:max-w-[620px] xl:max-w-[700px] 2xl:max-w-[760px] flex items-end justify-center -mb-1 lg:-mb-1 xl:-mb-2"
            >
              {/* Studio Backlight Aura */}
              <div
                className="absolute inset-x-6 sm:inset-x-12 bottom-0 h-[65%] bg-gradient-to-t from-brand/28 via-brand-light/14 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
                aria-hidden="true"
              />

              <picture>
                <img
                  src="/images/purple-profile.png"
                  alt="Raj Shekhar - Web Developer"
                  width={700}
                  height={780}
                  fetchPriority="high"
                  loading="eager"
                  className="w-auto max-w-full h-auto max-h-[58vh] sm:max-h-[64vh] lg:max-h-[68vh] xl:max-h-[74vh] 2xl:max-h-[78vh] object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.22)] block"
                />
              </picture>
            </div>

            {/* Social Pill */}
            <SocialPill
              forwardRef={socialRef}
              links={heroSocialLinks}
              className="absolute right-1 sm:right-2 lg:right-0 top-[26%] sm:top-[30%] z-40"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
