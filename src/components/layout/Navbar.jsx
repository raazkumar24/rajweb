import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { motion, useReducedMotion } from "motion/react";
import { useGsapScope } from "../../animation/useGsapScope";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "WORKS", href: "#works" },
  { label: "SERVICES", href: "#services" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar({ heroMode = "red", onToggleMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const isRedHero = heroMode === "red";
  // In red mode, navbar elements are light/white; in concrete mode, elements are dark (#111111)
  const isLightText = isRedHero;

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
          duration: 0.6,
          ease: "power2.out",
          delay: 0.2,
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
      setIsScrolled(scrollY > 70);

      if (scrollY < 200) {
        if (activeSectionRef.current !== "home") {
          activeSectionRef.current = "home";
          setActiveSection("home");
        }
        ticking = false;
        return;
      }

      const sectionIds = ["contact", "faq", "services", "works", "about"];
      const currentScroll = scrollY + 140;
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeMenu();
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
        /* ignore */
      }
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      const elementPosition =
        el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition - 70),
        behavior: "smooth",
      });
      try {
        window.history.replaceState(null, "", href);
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <header
      ref={navRef}
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? isRedHero
            ? " backdrop-blur-md border-b border-white/15 py-3 shadow-md"
            : " backdrop-blur-md border-b border-black/10 py-3 shadow-sm"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 sm:px-12">
        {/* BRAND MARK */}
        <a
          href="#home"
          onClick={(e) => handleSmoothScroll(e, "#home")}
          className="group flex items-center gap-2 select-none cursor-pointer"
          aria-label="Raj Shekhar Portfolio"
        >
          <span
            className={`font-display font-black text-xl sm:text-2xl tracking-tighter uppercase transition-colors duration-300 ${
              isLightText ? "text-white" : "text-[#111111]"
            }`}
          >
            RAJ SHEKHAR
          </span>
          <span
            className={`w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125 ${
              isLightText ? "bg-white" : "bg-[#E13B36]"
            }`}
          />
        </a>

        {/* CENTER CAPSULE NAV PILL */}
        <nav
          className="hidden md:flex items-center gap-1 select-none px-2 py-1.5 rounded-full transition-colors duration-300"
          style={{
            background: isLightText
              ? "rgba(0, 0, 0, 0.35)"
              : "rgba(0, 0, 0, 0.08)",
            backdropFilter: "blur(12px)",
            border: isLightText
              ? "1px solid rgba(255, 255, 255, 0.12)"
              : "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                aria-current={isActive ? "page" : undefined}
                className={`relative px-4 sm:px-5 py-2 text-xs sm:text-[13px] font-bold tracking-wider uppercase transition-colors duration-200 cursor-pointer rounded-full ${
                  isActive
                    ? "text-white"
                    : isLightText
                      ? "text-white/75 hover:text-white"
                      : "text-[#111111]/75 hover:text-[#111111]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full shadow-sm"
                    style={{
                      background:
                        "linear-gradient(135deg, #E63934 0%, #D12520 100%)",
                    }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 32 }
                    }
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* RIGHT: STYLE SWITCHER & CONTACT PILL BUTTON */}
        <div className="flex items-center gap-3">
          {/* STYLE SWITCHER: RED 01 | CONCRETE 02 */}
          <div
            className="hidden lg:flex items-center p-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm select-none"
            style={{
              background: isLightText
                ? "rgba(0, 0, 0, 0.35)"
                : "rgba(0, 0, 0, 0.08)",
              border: isLightText
                ? "1px solid rgba(255, 255, 255, 0.15)"
                : "1px solid rgba(0, 0, 0, 0.15)",
            }}
          >
            <button
              type="button"
              id="nav-btn-red"
              onClick={() => onToggleMode && onToggleMode("red")}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${
                heroMode === "red"
                  ? "bg-white text-black shadow-sm"
                  : isLightText
                    ? "text-white/70 hover:text-white"
                    : "text-[#111111]/70 hover:text-[#111111]"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#E13B36]" />
              RED 01
            </button>
            <button
              type="button"
              id="nav-btn-concrete"
              onClick={() => onToggleMode && onToggleMode("concrete")}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${
                heroMode === "concrete"
                  ? "bg-[#111111] text-white shadow-sm"
                  : isLightText
                    ? "text-white/70 hover:text-white"
                    : "text-[#111111]/70 hover:text-[#111111]"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#E5E3DE] border border-black/30" />
              CONCRETE 02
            </button>
          </div>

          <a
            href="#contact"
            id="nav-contact-btn"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className={`hidden sm:inline-flex items-center justify-center font-black text-xs sm:text-[13px] tracking-wider uppercase px-6 sm:px-7 py-2.5 rounded-full transition-all duration-200 cursor-pointer shadow-md hover:scale-105 active:scale-95 ${
              isLightText
                ? "bg-white text-black hover:bg-white/90"
                : "bg-[#111111] text-white hover:bg-black/90"
            }`}
          >
            CONTACT →
          </a>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className={`flex md:hidden p-2 rounded-full transition-transform active:scale-90 cursor-pointer ${
              isLightText
                ? "text-white bg-black/30 border border-white/20"
                : "text-[#111111] bg-black/10 border border-black/20"
            }`}
          >
            <svg
              className="h-5 w-5"
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
      </div>

      {/* MOBILE DROPDOWN */}
      {isMenuOpen && (
        <div
          role="dialog"
          aria-label="Mobile navigation"
          className="mx-6 mt-3 p-4 md:hidden border rounded-2xl shadow-2xl flex flex-col gap-2 backdrop-blur-xl animate-in fade-in-0 duration-200"
          style={{
            background: isRedHero
              ? "rgba(163, 13, 16, 0.95)"
              : "rgba(237, 235, 229, 0.98)",
            borderColor: isRedHero
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.15)",
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={`px-4 py-2.5 text-xs font-bold tracking-widest uppercase flex items-center justify-between rounded-xl transition-colors ${
                  isActive
                    ? isRedHero
                      ? "bg-[#E13B36] text-white"
                      : "bg-[#C41618] text-white"
                    : isRedHero
                      ? "text-white/80 hover:bg-white/10 text-white"
                      : "text-[#111111]/80 hover:bg-black/5 text-[#111111]"
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="text-xs">●</span>}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className={`mt-2 block w-full py-2.5 text-center font-black text-xs tracking-widest uppercase rounded-full transition-all ${
              isRedHero
                ? "bg-white text-black hover:bg-white/90"
                : "bg-[#111111] text-white hover:bg-black/90"
            }`}
          >
            CONTACT →
          </a>
          {/* STYLE SWITCHER */}
          <div
            className="flex items-center w-full justify-between p-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm select-none"
            style={{
              background: isLightText
                ? "rgba(0, 0, 0, 0.35)"
                : "rgba(0, 0, 0, 0.08)",
              border: isLightText
                ? "1px solid rgba(255, 255, 255, 0.15)"
                : "1px solid rgba(0, 0, 0, 0.15)",
            }}
          >
            <button
              type="button"
              id="nav-btn-red"
              onClick={() => onToggleMode && onToggleMode("red")}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${
                heroMode === "red"
                  ? "bg-white text-black shadow-sm"
                  : isLightText
                    ? "text-white/70 hover:text-white"
                    : "text-[#111111]/70 hover:text-[#111111]"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#E13B36]" />
              RED 01
            </button>
            <button
              type="button"
              id="nav-btn-concrete"
              onClick={() => onToggleMode && onToggleMode("concrete")}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${
                heroMode === "concrete"
                  ? "bg-[#111111] text-white shadow-sm"
                  : isLightText
                    ? "text-white/70 hover:text-white"
                    : "text-[#111111]/70 hover:text-[#111111]"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#E5E3DE] border border-black/30" />
              CONCRETE 02
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
