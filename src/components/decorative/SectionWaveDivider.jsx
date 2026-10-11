import React, { useId } from "react";

/**
 * =============================================================================
 * SECTION WAVE DIVIDERS (Transparent & Non-Clipping)
 * =============================================================================
 * Subtle, decorative SVG wave dividers designed to create organic, editorial flow
 * between main sections (Works, Services, FAQ, Contact).
 *
 * Features:
 *  - 100% transparent backgrounds to prevent cutting/clipping side background shapes
 *  - Unique gradient IDs per instance to prevent SVG clip/gradient collisions
 *  - Delicate, layered bezier curves with signature orange accents & soft sheens
 *  - Responsive full-width design with zero visual clipping or horizontal scroll
 *  - Multiple variants tailored to section transitions:
 *      1. 'about-to-works' (gentle organic flow entering Works from About)
 *      2. 'works-to-services' (gentle organic flow entering Services from Works)
 *      3. 'services-to-faq' (warm cream to cream with glowing orange dual-curves)
 *      4. 'faq-to-contact' (cream #FAF8F5 flowing seamlessly into charcoal #111111)
 * =============================================================================
 */

export function SectionWaveDivider({
  variant = "services-to-faq",
  className = "",
  flip = false,
}) {
  const rawId = useId().replace(/:/g, "");
  const uid = (name) => `swd-${rawId}-${name}`;

  if (variant === "faq-to-contact") {
    // Transition from cream (#FAF8F5) into dark (#111111)
    return (
      <div
        className={`relative w-full overflow-hidden leading-none select-none pointer-events-none bg-transparent ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-24 lg:h-28 block"
        >
          <defs>
            {/* Orange glowing crest gradient */}
            <linearGradient id={uid("crestGrad")} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFC85A" stopOpacity="0.4" />
              <stop offset="25%" stopColor="#FF9500" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#FF7700" stopOpacity="0.9" />
              <stop offset="85%" stopColor="#FF5A00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF9500" stopOpacity="0.35" />
            </linearGradient>

            {/* Subtle glow filter for the wave crest */}
            <filter id={uid("crestGlow")} x="-10%" y="-40%" width="120%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Depth under-layer gradient */}
            <linearGradient id={uid("depthGrad")} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF8A00" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#FF6A00" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#E94A00" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Secondary harmonic accent curve (floating above the wave) */}
          <path
            d="M -40 45 C 220 85, 460 20, 720 52 C 980 84, 1220 28, 1480 50"
            fill="none"
            stroke={`url(#${uid("crestGrad")})`}
            strokeWidth="1.5"
            strokeOpacity="0.32"
            strokeDasharray="4 6"
          />

          {/* Depth intermediate wave layer */}
          <path
            d="M 0 68 C 260 106, 520 32, 780 72 C 1040 112, 1260 46, 1440 64 V 120 H 0 Z"
            fill={`url(#${uid("depthGrad")})`}
          />

          {/* Main solid dark wave block filling into Contact (#111111) */}
          <path
            d="M 0 78 C 260 114, 530 40, 780 78 C 1030 116, 1260 52, 1440 72 V 120 H 0 Z"
            fill="#111111"
          />

          {/* Soft blur glow behind main crest */}
          <path
            d="M 0 78 C 260 114, 530 40, 780 78 C 1030 116, 1260 52, 1440 72"
            fill="none"
            stroke={`url(#${uid("crestGrad")})`}
            strokeWidth="5"
            strokeOpacity="0.45"
            filter={`url(#${uid("crestGlow")})`}
          />

          {/* Sharp, crisp crest stroke */}
          <path
            d="M 0 78 C 260 114, 530 40, 780 78 C 1030 116, 1260 52, 1440 72"
            fill="none"
            stroke={`url(#${uid("crestGrad")})`}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Subtle white crest highlight line for crisp editorial look */}
          <path
            d="M 280 110 C 400 95, 620 50, 760 75 C 900 100, 1140 72, 1240 56"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (variant === "about-to-works") {
    // Subtle organic wave entering Works from About (completely transparent background)
    return (
      <div
        className={`relative w-full overflow-hidden leading-none select-none pointer-events-none bg-transparent ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-9 sm:h-12 lg:h-14 block"
        >
          <defs>
            <linearGradient id={uid("awGrad")} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF9500" stopOpacity="0.1" />
              <stop offset="25%" stopColor="#FF8A00" stopOpacity="0.6" />
              <stop offset="65%" stopColor="#FF7700" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FFA629" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          {/* Harmonic dashed rhythm line */}
          <path
            d="M 0 20 C 340 45, 720 10, 1080 38 C 1240 50, 1360 22, 1440 32"
            fill="none"
            stroke="#FF9500"
            strokeWidth="1.2"
            strokeOpacity="0.25"
            strokeDasharray="5 7"
          />

          {/* Primary wave stroke */}
          <path
            d="M 0 32 C 320 8, 700 52, 1040 18 C 1220 2, 1350 28, 1440 22"
            fill="none"
            stroke={`url(#${uid("awGrad")})`}
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Subtle crest sheen */}
          <path
            d="M 240 16 C 360 12, 480 32, 580 40"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeOpacity="0.35"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (variant === "works-to-services") {
    // Subtle organic wave entering Services from Works (completely transparent background)
    return (
      <div
        className={`relative w-full overflow-hidden leading-none select-none pointer-events-none bg-transparent ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 lg:h-16 block"
        >
          <defs>
            <linearGradient id={uid("wGrad")} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF9500" stopOpacity="0.1" />
              <stop offset="30%" stopColor="#FF8A00" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#FF6A00" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFB52E" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Primary wave stroke */}
          <path
            d="M 0 35 C 320 12, 680 58, 1020 22 C 1220 2, 1360 30, 1440 24"
            fill="none"
            stroke={`url(#${uid("wGrad")})`}
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Secondary rhythmic echo line */}
          <path
            d="M 0 46 C 300 24, 650 68, 980 34 C 1180 14, 1330 42, 1440 36"
            fill="none"
            stroke="#FF9500"
            strokeWidth="1.2"
            strokeOpacity="0.25"
            strokeDasharray="6 8"
          />
        </svg>
      </div>
    );
  }

  // Default: 'services-to-faq'
  // Subtle decorative wave dividing Services and FAQ with transparent canvas
  return (
    <div
      className={`relative w-full overflow-hidden leading-none select-none pointer-events-none bg-transparent ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={`w-full h-11 sm:h-14 lg:h-18 block ${flip ? "transform scale-y-[-1]" : ""}`}
      >
        <defs>
          <linearGradient id={uid("sfGrad")} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF8A00" stopOpacity="0.15" />
            <stop offset="25%" stopColor="#FF9500" stopOpacity="0.65" />
            <stop offset="55%" stopColor="#FF7700" stopOpacity="0.55" />
            <stop offset="80%" stopColor="#FFA629" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FF8A00" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id={uid("sfShine")} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9500" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#FF8A00" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#FF9500" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Counter-wave decorative rhythm */}
        <path
          d="M 0 24 C 280 50, 560 18, 840 44 C 1120 70, 1320 22, 1440 38"
          fill="none"
          stroke={`url(#${uid("sfShine")})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="5 6"
        />

        {/* Primary flowing wave crest */}
        <path
          d="M 0 38 C 240 14, 480 60, 720 32 C 960 6, 1200 54, 1440 28"
          fill="none"
          stroke={`url(#${uid("sfGrad")})`}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Subtle accent highlight on main peaks */}
        <path
          d="M 220 20 C 340 30, 420 54, 480 58"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
        <path
          d="M 940 12 C 1020 18, 1120 45, 1180 52"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default SectionWaveDivider;
