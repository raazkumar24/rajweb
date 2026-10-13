import React from "react";

/**
 * =============================================================================
 * SUNBURST RAYS & ACCENT RAYS (Hand-drawn Energy Accents)
 * =============================================================================
 * Ye component headings ke upar 3 orange sunburst rays render karta hai jo
 * brand identity ka signature element hai.
 *
 * PROPS:
 * - forwardRef: GSAP animation / timeline ke liye ref pass kar sakte hain
 * - className: Custom positioning ya rotation ke liye
 * - color: Ray color (default: #8B5CF6 brand orange)
 * =============================================================================
 */
export default function SunburstRays({
  forwardRef,
  className = "",
  color="var(--brand-primary)",
}) {
  return (
    <div
      ref={forwardRef}
      className={`pointer-events-none select-none text-[${color}] ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-9 h-7 sm:w-11 sm:h-9"
        viewBox="0 0 50 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      >
        <line x1="8" y1="28" x2="2" y2="10" />
        <line x1="25" y1="24" x2="25" y2="4" />
        <line x1="42" y1="28" x2="48" y2="10" />
      </svg>
    </div>
  );
}

/**
 * AccentRays — Profile photo ya card ke side me small accent spark lines
 * side: "left" | "right"
 */
export function AccentRays({ side = "left", className = "" }) {
  const isLeft = side === "left";
  return (
    <div
      className={`pointer-events-none absolute top-[32%] ${
        isLeft ? "left-[4%] sm:left-[8%]" : "right-[6%] sm:right-[10%]"
      } z-10 text-brand select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className={`w-8 h-8 ${isLeft ? "rotate-12" : "-rotate-12"}`}
        viewBox="0 0 30 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        {isLeft ? (
          <>
            <line x1="2" y1="15" x2="14" y2="12" />
            <line x1="4" y1="24" x2="16" y2="18" />
          </>
        ) : (
          <>
            <line x1="16" y1="12" x2="28" y2="15" />
            <line x1="14" y1="18" x2="26" y2="24" />
          </>
        )}
      </svg>
    </div>
  );
}
