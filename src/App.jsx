import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
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
import CaseStudy from "./pages/CaseStudy.jsx";
import "./App.css";

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const showScrollTopRef = useRef(false);

  // Trigger Marquee reveal after Hero name intro finishes
  const [heroRevealed, setHeroRevealed] = useState(false);
  const handleHeroRevealed = useCallback(() => setHeroRevealed(true), []);
  const [heroMode, setHeroMode] = useState("red");

  // Active full-page Case Study ID (URL hash synchronized: #case-study/:id)
  const [activeCaseStudyId, setActiveCaseStudyId] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#case-study/")) {
        const id = hash.replace("#case-study/", "");
        setActiveCaseStudyId(id);
      } else {
        setActiveCaseStudyId(null);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleOpenCaseStudy = (id) => {
    window.location.hash = `#case-study/${id}`;
    setActiveCaseStudyId(id);
  };

  const handleCloseCaseStudy = () => {
    window.location.hash = "#works";
    setActiveCaseStudyId(null);
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 420;
          if (shouldShow !== showScrollTopRef.current) {
            showScrollTopRef.current = shouldShow;
            setShowScrollTop(shouldShow);
          }
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-[#e6d5bd] text-[#101010] flex flex-col overflow-x-clip selection:bg-brand selection:text-[#101010]">
      <ScrollProgress />
      <CustomCursor />
      <Navbar heroMode={heroMode} onToggleMode={(mode) => setHeroMode(mode)} />

      <main className="flex-1 flex flex-col">
        {/* Hero + Marquee viewport wrapper */}
        <div className="relative flex flex-col min-h-screen lg:min-h-[100dvh] lg:h-auto 2xl:h-[100dvh] 2xl:max-h-[100dvh] 2xl:overflow-hidden justify-between">
          <Hero
            heroMode={heroMode}
            onToggleMode={(mode) => setHeroMode(mode)}
            onRevealed={handleHeroRevealed}
          />
          <Marquee show={heroRevealed} />
        </div>

        {/* Core Portfolio Sections */}
        <About heroMode={heroMode} />
        <Works heroMode={heroMode} onOpenCaseStudy={handleOpenCaseStudy} />
        <Services heroMode={heroMode} />
        <FAQ heroMode={heroMode} />
        <Contact heroMode={heroMode} />
      </main>

      {/* Full-Page Immersive Case Study (Dedicated Route / View) */}
      <AnimatePresence>
        {activeCaseStudyId && (
          <motion.div
            key="case-study-page"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 35 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <CaseStudy
              projectId={activeCaseStudyId}
              heroMode={heroMode}
              onClose={handleCloseCaseStudy}
              onSelectProject={(id) => handleOpenCaseStudy(id)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smooth Animated Back-to-Top Floating Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-top-btn"
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#111111] text-white shadow-xl hover:bg-brand hover:text-[#111111] transition-colors duration-200 border border-white/10 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
