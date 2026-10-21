import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/layout/Navbar.jsx";
import Marquee from "./components/layout/Marquee.jsx";
import CustomCursor from "./components/layout/CustomCursor.jsx";
import ScrollProgress from "./components/layout/ScrollProgress.jsx";
import Hero from "./pages/Hero.jsx";
import About from "./pages/About.jsx";
import Works from "./pages/Works.jsx";
import Services from "./pages/Services.jsx";
import FAQ from "./pages/FAQ.jsx";
import Contact from "./pages/Contact.jsx";
import "./App.css";

// Global ScrollTrigger setup
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const showScrollTopRef = useRef(false);

  useEffect(() => {
    const scenes = gsap.utils.toArray(".page-scroll-scene");
    if (!scenes.length) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      scenes.forEach((scene, index) => {
        const content = scene.querySelector(".page-scroll-content");
        if (!content) return;

        gsap.fromTo(
          content,
          { y: index === 0 ? 0 : 34, opacity: index === 0 ? 1 : 0.78 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              start: "top 88%",
              end: "top 38%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 400;
          if (shouldShow !== showScrollTopRef.current) {
            showScrollTopRef.current = shouldShow;
            setShowScrollTop(shouldShow);
          }
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let refreshFrame = 0;
    const refreshAnimations = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const refreshAfterFonts = document.fonts?.ready?.then(refreshAnimations);
    window.addEventListener("load", refreshAnimations, { once: true });
    window.addEventListener("resize", refreshAnimations, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("load", refreshAnimations);
      window.removeEventListener("resize", refreshAnimations);
      void refreshAfterFonts;
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] text-[#111111] flex flex-col overflow-x-hidden selection:bg-brand selection:text-white">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/*
          Hero + Marquee: Uses min-h-screen and min-h-[100dvh] on large screens.
          Prevents content cutoff on small-height laptop screens (e.g. <= 720px)
          while keeping seamless profile alignment with the marquee.
        */}
        <div className="relative flex flex-col min-h-screen lg:min-h-[100dvh] lg:h-auto 2xl:h-[100dvh] 2xl:max-h-[100dvh] 2xl:overflow-hidden justify-between">
          <Hero />
          <Marquee />
        </div>

        {/* Core content sections with internal optimized scroll choreography */}
        <div className="page-scroll-scene">
          <div className="page-scroll-content"><About /></div>
        </div>
        <div className="page-scroll-scene">
          <div className="page-scroll-content"><Works /></div>
        </div>
        <div className="page-scroll-scene">
          <div className="page-scroll-content"><Services /></div>
        </div>
        <div className="page-scroll-scene">
          <div className="page-scroll-content"><FAQ /></div>
        </div>
        <div className="page-scroll-scene">
          <div className="page-scroll-content"><Contact /></div>
        </div>
      </main>

      {/* Floating smooth back to top control */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#111111] text-white shadow-xl hover:bg-brand hover:text-[#111111] transition-all duration-300 hover:scale-110 active:scale-95 border border-white/10 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;
