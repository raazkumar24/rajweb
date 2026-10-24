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
import SectionWaveDivider from "./components/decoration/SectionWaveDivider.jsx";
import "./App.css";

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const showScrollTopRef = useRef(false);

  // Trigger Marquee reveal after Hero name intro finishes
  const [heroRevealed, setHeroRevealed] = useState(false);
  const handleHeroRevealed = useCallback(() => setHeroRevealed(true), []);

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
    <div className="min-h-screen w-full bg-[#FAF8F5] text-[#111111] flex flex-col overflow-x-clip selection:bg-brand selection:text-white">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* Hero + Marquee viewport wrapper */}
        <div className="relative flex flex-col min-h-screen lg:min-h-[100dvh] lg:h-auto 2xl:h-[100dvh] 2xl:max-h-[100dvh] 2xl:overflow-hidden justify-between">
          <Hero onRevealed={handleHeroRevealed} />
          <Marquee show={heroRevealed} />
        </div>

<<<<<<< HEAD
        {/* Core Portfolio Sections with Organic Wave Dividers */}
        <About />
        <SectionWaveDivider variant="about-to-works" />
        <Works />
        <SectionWaveDivider variant="works-to-services" />
        <Services />
        <SectionWaveDivider variant="services-to-faq" />
        <FAQ />
        <SectionWaveDivider variant="faq-to-contact" />
=======
        {/* Core content sections with internal optimized scroll choreography */}
        <About />
        <Works />
        <Services />
        <FAQ />
>>>>>>> f120871806c59e896d0315140e5e64d76711ce3b
        <Contact />
      </main>

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
