import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { motion, useReducedMotion } from "motion/react";
import { useGsapScope } from "../../animation/useGsapScope";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT ME", href: "#about" },
  { label: "WORKS", href: "#works" },
  { label: "SERVICES", href: "#services" },
  { label: "FAQ", href: "#faq" },
];

/* Glass ke common styles (ek jagah, taaki baar-baar na likhna pade) */
const GLASS_PANEL =
  "bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/70 shadow-[0_10px_30px_rgba(17,17,17,0.12),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(255,255,255,0.28)]";

/* Upar ki soft shine (sirf look, click nahi rokti) */
function GlassShine({ rounded = "rounded-full" }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${rounded}`}
    >
      <span className="absolute inset-x-0 -top-1/3 h-2/3 bg-gradient-to-b from-white/70 to-transparent opacity-50" />
    </span>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // useLayoutEffect: runs synchronously after DOM mutations, before browser paint
  // This prevents the navbar from being visible even for a single frame
  useLayoutEffect(() => {
    if (!navRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!prefersReducedMotion) {
      gsap.set(navRef.current, { y: -30, opacity: 0 });
    }
  }, []);

  useGsapScope(navRef, () => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (navRef.current) {
        gsap.to(navRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          delay: 1.45,
          clearProps: "all",
        });
      }
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (navRef.current) {
        gsap.set(navRef.current, { clearProps: "all" });
      }
    });
  });

  const activeSectionRef = useRef("home");

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      if (scrollY < 200) {
        if (activeSectionRef.current !== "home") {
          activeSectionRef.current = "home";
          setActiveSection("home");
        }
        ticking = false;
        return;
      }

      const sectionIds = ["contact", "faq", "services", "works", "about"];
      const currentScroll = scrollY + 120;
      let detected = "home";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (currentScroll >= top) {
            detected = id;
            break;
          }
        }
      }

      if (detected !== activeSectionRef.current) {
        activeSectionRef.current = detected;
        setActiveSection(detected);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateActiveSection();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    closeMenu();
    const targetId = href.replace("#", "");
    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      try {
        window.history.replaceState(null, "", "#home");
      } catch {
        // ignore
      }
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      const navOffset = targetId === "about" ? 0 : 68;
      const elementPosition =
        el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(
          0,
          targetId === "about"
            ? Math.ceil(elementPosition) + 2
            : elementPosition - navOffset,
        ),
        behavior: "smooth",
      });
      try {
        window.history.replaceState(null, "", href);
      } catch {
        // ignore
      }
    }
  };

  return (
    <header
      ref={navRef}
      className="fixed left-0 top-0 z-50 w-full px-5 py-4 sm:px-10 lg:px-16 pointer-events-none"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* BRAND MARK */}
        <a
          href="#home"
          onClick={(e) => handleSmoothScroll(e, "#home")}
          className="pointer-events-auto group flex items-center gap-1.5 transition-transform duration-300 hover:scale-105 select-none"
          aria-label="Raj Shekhar Portfolio"
        >
          <span className="text-2xl sm:text-[1.7rem] font-black italic tracking-[-0.04em] text-[#111111] transition-colors duration-300 group-hover:text-brand">
            RAJ
          </span>
          <span className="h-2 w-2 rounded-full bg-brand shadow-[0_0_8px_rgba(var(--brand-rgb),0.7)] transition-transform duration-300 group-hover:scale-125" />
        </a>

        {/* DESKTOP NAV PILL (GLASS) */}
        <div
          className={`pointer-events-auto relative hidden items-center gap-1 rounded-full px-3 py-2 md:flex select-none transition-shadow duration-300 hover:shadow-[0_14px_40px_rgba(0,0,0,0.14),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(255,255,255,0.5)] ${GLASS_PANEL}`}
        >
          <GlassShine />

          <nav className="relative z-10 flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative rounded-full px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors duration-200 ${
                    isActive
                      ? "text-brand"
                      : "text-[#222222] hover:text-brand hover:bg-white/55"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)]"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 32 }
                      }
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 z-10 h-0.5 origin-left rounded-full bg-brand transition-transform duration-300 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-60"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </nav>

          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="relative z-10 ml-2 inline-flex items-center justify-center rounded-full bg-[#111111]/90 px-6 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-[0_6px_16px_rgba(0,0,0,0.22),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-[background-color,color,box-shadow,transform] duration-300 hover:bg-brand hover:text-[#111111] hover:shadow-[0_8px_22px_rgba(var(--brand-rgb),0.45)] hover:scale-105 active:scale-95"
          >
            CONTACT
          </a>
        </div>

        {/* MOBILE TOGGLE (GLASS CAPSULE) */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className={`pointer-events-auto relative flex h-11 w-11 items-center justify-center rounded-full text-[#111111] transition-transform duration-200 active:scale-90 md:hidden ${GLASS_PANEL}`}
        >
          <GlassShine />
          <svg
            className="relative z-10 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE DROPDOWN (GLASS) */}
      {isMenuOpen && (
        <div
          role="dialog"
          aria-label="Mobile navigation"
          className={`pointer-events-auto relative mx-auto mt-3 max-w-md origin-top rounded-3xl p-5 md:hidden ${GLASS_PANEL} animate-in fade-in-0 slide-in-from-top-2 duration-300`}
        >
          <GlassShine rounded="rounded-3xl" />
          <nav className="relative z-10 flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={`rounded-xl px-3.5 py-2.5 text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-white/80 text-brand shadow-[inset_0_1px_1px_rgba(255,255,255,1)]"
                      : "text-[#222222] hover:text-brand hover:bg-white/50"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  )}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "#contact")}
              className="mt-2 block w-full rounded-full bg-[#111111]/90 py-3 text-center text-xs font-bold tracking-wider text-white uppercase shadow-[0_6px_16px_rgba(0,0,0,0.22),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-colors hover:bg-brand hover:text-[#111111]"
            >
              CONTACT
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
