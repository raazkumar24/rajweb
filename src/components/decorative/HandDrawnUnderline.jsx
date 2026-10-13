import React from "react";

/**
 * =============================================================================
 * HAND-DRAWN UNDERLINE (Responsive & Text-Adaptive)
 * =============================================================================
 * Renders an energetic, clean hand-drawn curved underline SVG.
 *
 * Features:
 *  - vectorEffect="non-scaling-stroke": Stroke thickness stays consistent at ANY text length
 *  - Organic natural curve: Hugs text cleanly with proper breathing room, zero collision
 *  - Adaptive width: Matches the parent inline-block text container precisely
 *  - Height auto-scales with font size via em-based height
 *
 * PROPS:
 * - pathRef: GSAP animated path reference (strokeDashoffset)
 * - className: Custom sizing / positioning classes
 * - strokeWidth: Line thickness (default: 4)
 * - color: Stroke color (default: #8B5CF6)
 * =============================================================================
 */
export default function HandDrawnUnderline({
  pathRef,
  className = "w-full",
  strokeWidth = 4,
  color = "var(--brand-primary)",
  style = {},
}) {
  return (
    <div
      className={`pointer-events-none select-none w-full ${className}`}
      aria-hidden="true"
      style={{ lineHeight: 0, ...style }}
    >
      <svg
        viewBox="0 0 300 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", height: "0.22em", overflow: "visible" }}
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M 3 9 C 40 15, 120 16.5, 200 14 C 240 12.5, 270 9, 297 7"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ strokeDasharray: 400, strokeDashoffset: 400 }}
        />
      </svg>
    </div>
  );
}
