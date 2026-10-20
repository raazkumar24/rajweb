import React, { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    let cachedScrollHeight = 0;
    let cachedInnerHeight = window.innerHeight;

    const updateCachedDimensions = () => {
      cachedScrollHeight = document.documentElement.scrollHeight;
      cachedInnerHeight = window.innerHeight;
    };

    updateCachedDimensions();

    const updateProgress = () => {
      const maxScroll = cachedScrollHeight - cachedInnerHeight;
      if (maxScroll > 0 && barRef.current) {
        const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateCachedDimensions, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateCachedDimensions);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-black/5" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-brand via-brand-light to-brand-deep origin-left shadow-[0_0_8px_rgba(var(--brand-rgb),0.6)]"
        style={{
          transform: "scaleX(0)",
          willChange: "transform",
        }}
      />
    </div>
  );
}

