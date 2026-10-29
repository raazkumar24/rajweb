import React from "react";
import { motion } from "motion/react";

/**
 * ─────────────────────────────────────────────────────────────
 * Circular Stamp Badge Component (Universal Editorial Asset)
 * ─────────────────────────────────────────────────────────────
 * Rotating SVG stamp with outer dashed track, curved path text,
 * and central 4-point starburst.
 */
export default function CircularStampBadge({
  size = 92,
  text = "• MADE FOR WEB • FOCUSED ON IMPACT ",
  color = "currentColor",
  className = "",
  duration = 18,
}) {
  const r = 38;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        style={{ color }}
      >
        <defs>
          <path
            id="circular-stamp-path"
            d={`M 50,50 m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
          />
        </defs>

        {/* Outer dashed architectural ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeDasharray="2.5 3"
          opacity="0.5"
        />

        {/* Inner thin guide ring */}
        <circle
          cx="50"
          cy="50"
          r="41"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.3"
        />

        {/* Rotating Circular Monospace Text */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          <text
            fontSize="8.4"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="0.18em"
            fill="currentColor"
          >
            <textPath href="#circular-stamp-path" startOffset="0%">
              {text}
            </textPath>
          </text>
        </motion.g>

        {/* 4-point Starburst Center */}
        <path
          d="M 50 42 Q 50 50 42 50 Q 50 50 50 58 Q 50 50 58 50 Q 50 50 50 42 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
