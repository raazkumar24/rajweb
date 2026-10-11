import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ANIM } from "../../animation/config";

export default function IntroLoader({ onComplete }) {
  const containerRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  // Keep latest onComplete callback in ref without re-triggering effect
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const alreadySeen =
        sessionStorage.getItem("portfolio_intro_seen") === "true";
      return prefersReducedMotion || alreadySeen;
    }
    return false;
  });

  useEffect(() => {
    if (isDismissed) {
      document.body.style.overflow = "";
      onCompleteRef.current?.();
      return;
    }

    if (!containerRef.current) return;

    // Lock body scroll while intro is running
    document.body.style.overflow = "hidden";
    sessionStorage.setItem("portfolio_intro_seen", "true");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: ANIM.EASE },
        onComplete: () => {
          document.body.style.overflow = "";
          setIsDismissed(true);
          onCompleteRef.current?.();
        },
      });

      // Initial state
      gsap.set(".intro-kicker", { y: 12, opacity: 0 });
      gsap.set(".intro-char", { y: "110%", opacity: 0, rotateZ: 2 });
      gsap.set(".intro-line", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".intro-sub", { y: 10, opacity: 0 });

      // Fast, premium cinematic reveal sequence (completed within ~2.3 seconds)
      tl.to(".intro-kicker", {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
        delay: 0.05,
      })
        .to(
          ".intro-char",
          {
            y: "0%",
            opacity: 1,
            rotateZ: 0,
            duration: 0.5,
            stagger: 0.025,
            ease: "power4.out",
          },
          "-=0.15"
        )
        .to(
          ".intro-line",
          {
            scaleX: 1,
            duration: 0.45,
            ease: "expo.out",
          },
          "-=0.25"
        )
        .to(
          ".intro-sub",
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.2"
        )
        // Transition out
        .to(
          ".intro-content",
          {
            y: -20,
            opacity: 0,
            duration: 0.35,
            ease: "power3.in",
          },
          "+=0.35"
        )
        .to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.65,
            ease: "power4.inOut",
          },
          "-=0.1"
        );
    }, containerRef);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [isDismissed]);

  const handleSkip = () => {
    if (isDismissed || !containerRef.current) return;
    document.body.style.overflow = "";
    gsap.killTweensOf(containerRef.current);
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        setIsDismissed(true);
        onCompleteRef.current?.();
      },
    });
  };

  if (isDismissed) return null;

  const titleString = "RAJ SHEKHAR";

  return (
    <div
      ref={containerRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A] text-white cursor-pointer select-none overflow-hidden"
      aria-label="Raj Shekhar Portfolio Intro (Click to skip)"
      role="banner"
    >
      {/* Background radial ambient glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#FF6A00]/25 via-[#FFAA00]/15 to-transparent blur-3xl pointer-events-none -translate-y-8" />

      <div className="intro-content relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        {/* Editorial kicker */}
        <div className="intro-kicker flex items-center gap-2 mb-3 sm:mb-4 text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#FF8A00] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#FF8A00] shadow-[0_0_8px_rgba(255,138,0,0.8)]" />
          <span>PORTFOLIO</span>
          <span className="text-white/40">·</span>
          <span>CREATIVE DEVELOPER</span>
        </div>

        {/* Big Signature Name */}
        <div className="overflow-hidden py-1">
          <h1 className="flex items-center justify-center text-[3.25rem] xs:text-[4.2rem] sm:text-[5.5rem] md:text-[6.8rem] lg:text-[7.6rem] font-black italic tracking-[-0.04em] uppercase text-white leading-none">
            {titleString.split("").map((char, index) => (
              <span
                key={index}
                className="intro-char inline-block will-change-transform"
                style={{ whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Sleek Golden Accent Line */}
        <div className="intro-line w-48 sm:w-64 md:w-80 h-[3px] bg-gradient-to-r from-transparent via-[#FF8A00] to-transparent rounded-full my-3 sm:my-4 shadow-[0_0_12px_rgba(255,138,0,0.6)]" />

        {/* Subtitle */}
        <p className="intro-sub text-xs sm:text-sm md:text-base text-white/60 tracking-wider font-medium uppercase">
          Crafting High-Performance Web Experiences
        </p>
      </div>

      {/* Subtle skip prompt in bottom corner */}
      <span className="absolute bottom-6 text-[11px] uppercase tracking-widest text-white/30 hover:text-white/70 transition-colors">
        Click anywhere to skip
      </span>
    </div>
  );
}
