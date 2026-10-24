import React, { useId } from "react";

/**
 * =============================================================================
 * BRAND BACKGROUND SHAPES  v2
 * =============================================================================
 * Naye shapes: layered "paper-cut" waves + concentric arcs + dot-grid texture.
 * Fixes / improvements:
 *  - useId() se har SVG ke gradient/filter ids unique (duplicate-id bug khatam)
 *  - Gradients ab objectBoundingBox pe hain -> stretch hone par bhi smooth
 *  - Sabhi shapes me 3 depth layers + crest highlight + soft glow
 *  - Dot-grid texture (clip hoke sirf front layer ke andar dikhta hai)
 *  - Blob/orbs pe halka float animation (prefers-reduced-motion respect karta hai)
 *  - Tailwind bug fix: `sm:w-68` valid class nahi tha -> `sm:w-72`
 * Same exports / same props, to existing usage break nahi hoga.
 * =============================================================================
 */

/* ----------------------------- shared helpers ----------------------------- */

const STOPS = [
  ["0%", "var(--brand-stop-0)"],
  ["38%", "var(--brand-stop-1)"],
  ["72%", "var(--brand-stop-2)"],
  ["100%", "var(--brand-stop-3)"],
];

const FLOAT_CSS = `
@media (prefers-reduced-motion: no-preference) {
  .os-float { animation: os-float 9s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  .os-float-b { animation-delay: -4s; animation-duration: 12s; }
  @keyframes os-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
}`;

function useIds() {
  const raw = useId().replace(/:/g, "");
  return (name) => `os-${raw}-${name}`;
}

function Grad({ id, x1 = 0, y1 = 0, x2 = 1, y2 = 1, reverse = false }) {
  const stops = reverse
    ? [...STOPS].reverse().map((s, i) => [STOPS[i][0], s[1]])
    : STOPS;
  return (
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
      {stops.map(([o, c]) => (
        <stop key={o} offset={o} stopColor={c} />
      ))}
    </linearGradient>
  );
}

function Sheen({ id, x1 = 0, y1 = 0, x2 = 1, y2 = 1 }) {
  return (
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
      <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
      <stop offset="55%" stopColor="#fff" stopOpacity="0.15" />
      <stop offset="100%" stopColor="#fff" stopOpacity="0" />
    </linearGradient>
  );
}

function Blur({ id, std = 24 }) {
  return (
    <filter id={id} x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation={std} />
    </filter>
  );
}

function DotPattern({ id, gap = 16, r = 1.6 }) {
  return (
    <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse">
      <circle cx={gap / 2} cy={gap / 2} r={r} fill="#fff" fillOpacity="0.55" />
    </pattern>
  );
}

function Frame({ className, children, viewBox, hideOnMobile = false }) {
  return (
    <div
      className={`pointer-events-none select-none ${hideOnMobile ? "hidden md:block" : ""} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ overflow: "visible" }}
        preserveAspectRatio="none"
      >
        <style>{FLOAT_CSS}</style>
        {children}
      </svg>
    </div>
  );
}

/* =============================================================================
   1. TOP LEFT SHAPE  (hero + about)
   ============================================================================= */
export function BrandTopLeftShape({
  variant = "hero",
  className = "",
  opacity = 1,
  color = "var(--brand-primary)",
}) {
  const id = useIds();
  const about = variant === "about";

  const layers = about
    ? {
        vb: "0 0 420 900",
        back: "M0 0 H310 C350 150 225 235 195 365 C165 495 275 565 235 705 C210 795 95 855 0 900 Z",
        mid: "M0 0 H245 C280 140 170 220 140 345 C110 470 215 540 178 670 C155 755 65 810 0 840 Z",
        front:
          "M0 0 H175 C205 125 115 200 90 315 C65 430 150 495 120 610 C100 685 40 725 0 745 Z",
        rings: ["M0 330 A330 330 0 0 0 330 0", "M0 520 A520 520 0 0 0 520 0"],
        cls: "w-[36vw] max-w-[460px] min-w-[220px] h-[85vh] min-h-[550px]",
      }
    : {
        vb: "0 0 560 760",
        back: "M0 0 H510 C550 115 475 195 395 255 C305 322 335 425 245 525 C175 600 70 645 0 705 Z",
        mid: "M0 0 H430 C458 100 388 172 312 228 C230 288 258 382 178 468 C118 532 46 568 0 612 Z",
        front:
          "M0 0 H340 C358 88 300 142 236 188 C166 238 186 318 120 388 C76 436 30 456 0 482 Z",
        rings: ["M0 280 A280 280 0 0 0 280 0", "M0 430 A430 430 0 0 0 430 0"],
        cls: "w-[44vw] max-w-[560px] min-w-[260px] h-[75vh] min-h-[580px]",
      };

  return (
    <Frame
      viewBox={layers.vb}
      className={`${about ? "" : "bg-wave-left"} absolute top-0 left-0 z-0 ${layers.cls} ${className}`}
    >
      <defs>
        <Grad id={id("g")} />
        <Sheen id={id("s")} />
        <Blur id={id("b")} std={28} />
        <DotPattern id={id("d")} />
        <clipPath id={id("c")}>
          <path d={layers.front} />
        </clipPath>
      </defs>

      <path
        d={layers.back}
        fill={color}
        fillOpacity="0.22"
        filter={`url(#${id("b")})`}
      />
      <path
        d={layers.back}
        fill={`url(#${id("g")})`}
        fillOpacity={0.35 * opacity}
      />
      <path
        d={layers.mid}
        fill={`url(#${id("g")})`}
        fillOpacity={0.7 * opacity}
      />
      <path d={layers.front} fill={`url(#${id("g")})`} fillOpacity={opacity} />

      {/* dot texture sirf front layer ke andar */}
      <rect
        width="560"
        height="900"
        fill={`url(#${id("d")})`}
        clipPath={`url(#${id("c")})`}
        opacity="0.55"
      />

      {/* concentric arcs */}
      {layers.rings.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="#fff"
          strokeOpacity={0.22 - i * 0.07}
          strokeWidth="1.5"
        />
      ))}

      <path
        d={layers.mid}
        stroke={`url(#${id("s")})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Frame>
  );
}

/* =============================================================================
   2 + 3. SECTION SIDE WAVES (left / right share one drawing)
   ============================================================================= */
function SideWaveArt({ mirror, opacity, color, id }) {
  const t = mirror ? "translate(420 0) scale(-1 1)" : undefined;
  // Dono tips wall ko tangent (vertical) touch karte hain aur container ke
  // top/bottom se andar hain -> koi straight cut ya sharp corner nahi.
  // Letter "B" jaisa: wall = B ki spine, do smooth lobes (upar chhota, neeche bada)
  // aur beech me smooth neck. Right side pe mirror hoke reversed B banta hai.
  const back =
    "M0 70 C150 70 290 130 290 245 C290 330 190 355 190 430 C190 505 340 530 340 640 C340 760 220 810 0 810 Z";
  const mid =
    "M0 110 C130 110 240 160 240 262 C240 335 156 358 156 430 C156 495 288 520 288 630 C288 735 190 770 0 770 Z";
  const front =
    "M0 150 C110 150 190 190 190 275 C190 335 124 358 124 430 C124 485 236 505 236 610 C236 700 160 730 0 730 Z";

  return (
    <g transform={t}>
      <defs>
        <clipPath id={id("c")}>
          <path d={front} />
        </clipPath>
      </defs>
      <path
        d={back}
        fill={color}
        fillOpacity="0.12"
        filter={`url(#${id("b")})`}
      />
      <path d={back} fill={`url(#${id("g")})`} fillOpacity={0.32 * opacity} />
      <path d={mid} fill={`url(#${id("g")})`} fillOpacity={0.65 * opacity} />
      <path d={front} fill={`url(#${id("g")})`} fillOpacity={opacity} />
      <rect
        width="420"
        height="860"
        fill={`url(#${id("d")})`}
        clipPath={`url(#${id("c")})`}
        opacity="0.5"
      />
      <path
        d={mid.replace(" Z", "")}
        stroke={`url(#${id("s")})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d={front.replace(" Z", "")}
        stroke="#fff"
        strokeOpacity="0.22"
        strokeWidth="1.5"
      />
    </g>
  );
}

function SideWave({ mirror, className, opacity, color, position = "top" }) {
  const id = useIds();
  const vPos =
    position === "bottom-raised"
      ? "bottom-24 sm:bottom-36"
      : position === "middle"
        ? "top-1/2 -translate-y-1/2"
        : position === "bottom"
          ? "bottom-0 sm:bottom-6"
          : "top-0 sm:top-6";
  return (
    <Frame
      viewBox="0 0 420 860"
      hideOnMobile={mirror}
      className={`absolute ${vPos} ${mirror ? "right-0" : "left-0"} z-0
        w-[32vw] max-w-[420px] min-w-[200px] h-[82vh] max-h-[820px] min-h-[520px]
        overflow-visible ${className}`}
    >
      <defs>
        <Grad id={id("g")} />
        <Sheen id={id("s")} />
        <Blur id={id("b")} std={20} />
        <DotPattern id={id("d")} />
      </defs>
      <SideWaveArt mirror={mirror} opacity={opacity} color={color} id={id} />
    </Frame>
  );
}

export function BrandSectionSideWave({
  className = "",
  opacity = 0.9,
  color = "var(--brand-primary)",
  position = "top",
}) {
  return (
    <SideWave
      mirror={false}
      className={className}
      opacity={opacity}
      color={color}
      position={position}
    />
  );
}

export function BrandSectionRightWave({
  className = "",
  opacity = 0.9,
  color = "var(--brand-primary)",
  position = "top",
}) {
  return (
    <SideWave
      mirror
      className={className}
      opacity={opacity}
      color={color}
      position={position}
    />
  );
}

/* =============================================================================
   4. BOTTOM HERO WAVE  (3 phase-shifted waves)
   ============================================================================= */
export function BrandBottomHeroWave({
  className = "",
  opacity = 1,
  color = "var(--brand-primary)",
}) {
  const id = useIds();
  const back =
    "M0 215 C220 120 360 260 560 250 C760 240 820 110 1010 140 C1190 168 1290 250 1440 120 V340 H0 Z";
  const mid =
    "M0 250 C190 175 330 285 500 285 C690 285 745 150 920 180 C1100 212 1170 300 1440 160 V340 H0 Z";
  const front =
    "M0 285 C200 225 320 315 500 320 C675 325 760 215 910 238 C1075 262 1170 332 1440 205 V340 H0 Z";

  return (
    <Frame
      viewBox="0 0 1440 340"
      className={`absolute bottom-0 left-0 right-0 z-0 h-[32vh] max-h-[340px] min-h-[170px] ${className}`}
    >
      <defs>
        <Grad id={id("g")} x1={0} y1={0} x2={0} y2={1} />
        <linearGradient id={id("h")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.2" />
        </linearGradient>
        <Blur id={id("b")} std={20} />
        <DotPattern id={id("d")} gap={18} />
        <clipPath id={id("c")}>
          <path d={front} />
        </clipPath>
      </defs>

      <path
        d={back}
        fill={color}
        fillOpacity="0.2"
        filter={`url(#${id("b")})`}
      />
      <path d={back} fill={`url(#${id("g")})`} fillOpacity={0.35 * opacity} />
      <path d={mid} fill={`url(#${id("g")})`} fillOpacity={0.7 * opacity} />
      <path d={front} fill={`url(#${id("g")})`} fillOpacity={opacity} />
      <rect
        width="1440"
        height="340"
        fill={`url(#${id("d")})`}
        clipPath={`url(#${id("c")})`}
        opacity="0.4"
      />
      <path
        d={mid}
        stroke={`url(#${id("h")})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d={back} stroke="#fff" strokeOpacity="0.18" strokeWidth="1.5" />
    </Frame>
  );
}

/* =============================================================================
   5 + 6. ACCENT SHAPES  (flowing ribbon lines + orbs, left / right)
   ============================================================================= */
function Accent({ mirror, className, opacity, color }) {
  const id = useIds();
  const t = mirror ? "translate(420 0) scale(-1 1)" : undefined;

  return (
    <Frame
      viewBox="0 0 420 720"
      hideOnMobile
      className={`absolute -top-10 ${mirror ? "right-0" : "left-0"} z-0
        w-[30vw] max-w-[420px] min-w-[220px] h-[75vh] max-h-[720px] ${className}`}
    >
      <defs>
        <Grad id={id("g")} />
        <Sheen id={id("s")} />
        <Blur id={id("b")} std={22} />
        <radialGradient id={id("o")} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="var(--brand-stop-0)" />
          <stop offset="60%" stopColor="var(--brand-stop-1)" />
          <stop offset="100%" stopColor="var(--brand-stop-3)" />
        </radialGradient>
      </defs>
      <g transform={t}>
        <path
          d="M0 0 C80 40 170 110 185 205 C202 315 120 380 120 470 C120 560 170 620 0 720 Z"
          fill={color}
          fillOpacity="0.2"
          filter={`url(#${id("b")})`}
        />
        {/* thick -> thin parallel ribbons */}
        <path
          d="M0 0 C80 40 170 110 185 205 C202 315 120 380 120 470 C120 560 170 620 0 720 Z"
          fill={`url(#${id("g")})`}
          fillOpacity={opacity}
        />
        <path
          d="M0 40 C60 75 135 130 148 210 C162 300 92 360 92 440 C92 520 128 575 0 660 Z"
          fill="#fff"
          fillOpacity="0.1"
        />
        <path
          d="M0 90 C45 118 100 160 110 220 C120 285 62 335 62 395 C62 455 85 500 0 575"
          stroke="#fff"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <path
          d="M0 0 C80 40 170 110 185 205 C202 315 120 380 120 470 C120 560 170 620 0 720"
          stroke={`url(#${id("s")})`}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* orbs */}
        <g className="os-float">
          <circle
            cx="248"
            cy="150"
            r="22"
            fill={`url(#${id("o")})`}
            fillOpacity="0.9"
          />
        </g>
        <g className="os-float os-float-b">
          <circle
            cx="226"
            cy="238"
            r="9"
            fill={`url(#${id("o")})`}
            fillOpacity="0.85"
          />
          <circle cx="262" cy="300" r="5" fill={color} fillOpacity="0.5" />
        </g>
      </g>
    </Frame>
  );
}

export function BrandLeftAccentShape({
  className = "",
  opacity = 0.9,
  color = "var(--brand-primary)",
}) {
  return (
    <Accent
      mirror={false}
      className={className}
      opacity={opacity}
      color={color}
    />
  );
}

export function BrandRightAccentShape({
  className = "",
  opacity = 0.9,
  color = "var(--brand-primary)",
}) {
  return (
    <Accent mirror className={className} opacity={opacity} color={color} />
  );
}

/* =============================================================================
   7. BOTTOM RIGHT SHAPE  (diagonal sweep + rings from the corner)
   ============================================================================= */
export function BrandBottomRightShape({
  className = "",
  opacity = 0.95,
  color = "var(--brand-primary)",
}) {
  const id = useIds();
  const back = "M460 400 H60 C150 330 235 285 275 205 C320 118 385 40 460 0 Z";
  const mid = "M460 400 H100 C180 332 252 292 288 222 C328 145 388 72 460 36 Z";
  const front =
    "M460 400 H150 C218 345 275 312 306 255 C340 192 395 125 460 92 Z";

  return (
    <Frame
      viewBox="0 0 460 400"
      className={`absolute bottom-0 right-0 z-0 w-[36vw] max-w-[460px] h-[38vh] max-h-[400px] ${className}`}
    >
      <defs>
        <Grad id={id("g")} x1={1} y1={1} x2={0} y2={0} />
        <Sheen id={id("s")} x1={1} y1={1} x2={0} y2={0} />
        <Blur id={id("b")} std={18} />
        <DotPattern id={id("d")} />
        <clipPath id={id("c")}>
          <path d={front} />
        </clipPath>
      </defs>
      <path
        d={back}
        fill={color}
        fillOpacity="0.2"
        filter={`url(#${id("b")})`}
      />
      <path d={back} fill={`url(#${id("g")})`} fillOpacity={0.35 * opacity} />
      <path d={mid} fill={`url(#${id("g")})`} fillOpacity={0.7 * opacity} />
      <path d={front} fill={`url(#${id("g")})`} fillOpacity={opacity} />
      <rect
        width="460"
        height="400"
        fill={`url(#${id("d")})`}
        clipPath={`url(#${id("c")})`}
        opacity="0.5"
      />
      <path
        d="M460 170 A230 230 0 0 0 230 400"
        stroke="#fff"
        strokeOpacity="0.2"
        strokeWidth="1.5"
      />
      <path
        d="M460 260 A140 140 0 0 0 320 400"
        stroke="#fff"
        strokeOpacity="0.16"
        strokeWidth="1.5"
      />
      <path
        d={mid}
        stroke={`url(#${id("s")})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Frame>
  );
}

/* =============================================================================
   8. JOURNEY CARD BLOB  (organic blob, floating)
   ============================================================================= */

export function BrandJourneyCardBlob({
  position = "top-right",
  size = "md",
  className = "",
  color = "var(--brand-primary)",
}) {
  const sizeMap = {
    sm: "w-44 h-44 sm:w-52 sm:h-52",
    md: "w-52 h-52 sm:w-64 sm:h-64",
    lg: "w-60 h-60 sm:w-72 sm:h-72",
  };

  const posMap = {
    "top-right": "-top-8 -right-8 sm:-top-10 sm:-right-10",
    "top-left": "-top-8 -left-8 sm:-top-10 sm:-left-10",
    "bottom-right": "-bottom-10 -right-8 sm:-bottom-12 sm:-right-10",
    "bottom-left": "-bottom-8 -left-8 sm:-bottom-10 sm:-left-10",
  };

  const sizeClass = sizeMap[size] ?? sizeMap.md;
  const posClass = posMap[position] ?? posMap["top-right"];
  const gradId = `blobGrad-${position}-${size}`;

  return (
    <div
      className={`pointer-events-none absolute z-0 select-none
        ${sizeClass} ${posClass}
        transition-transform duration-500 group-hover:scale-105 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_10px_24px_rgba(var(--brand-rgb),0.16)]"
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="20"
            y1="20"
            x2="240"
            y2="240"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--brand-stop-0)" />
            <stop offset="35%" stopColor="var(--brand-stop-1)" />
            <stop offset="70%" stopColor="var(--brand-stop-2)" />
            <stop offset="100%" stopColor="var(--brand-stop-3)" />
          </linearGradient>

          <linearGradient id={`${gradId}-sheen`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>

          <filter
            id={`${gradId}-glow`}
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur stdDeviation="8" />
          </filter>

          <filter
            id={`${gradId}-blur`}
            x="-15%"
            y="-15%"
            width="130%"
            height="130%"
          >
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Soft ambient glow layer */}
        <path
          d="M38 28 C80 10 185 18 222 55 C252 86 258 150 245 198 C230 248 180 262 130 258 C78 254 22 232 12 178 C2 128 -4 46 38 28 Z"
          fill={color}
          fillOpacity="0.08"
          filter={`url(#${gradId}-glow)`}
        />

        {/* Main organic blob shape */}
        <path
          d="M40 30 C82 12 186 20 222 56 C252 86 257 150 244 198 C228 248 178 262 128 258 C76 254 22 231 12 176 C2 125 -2 48 40 30 Z"
          fill={`url(#${gradId})`}
          fillOpacity="0.92"
        />

        {/* Frosted glass overlay */}
        <path
          d="M40 30 C82 12 186 20 222 56 C252 86 257 150 244 198 C228 248 178 262 128 258 C76 254 22 231 12 176 C2 125 -2 48 40 30 Z"
          fill="white"
          fillOpacity="0.08"
        />

        {/* Highlight sheen (top-left diagonal) */}
        <path
          d="M40 30 C82 12 186 20 222 56 C252 86 257 150 244 198 C228 248 178 262 128 258 C76 254 22 231 12 176 C2 125 -2 48 40 30 Z"
          fill={`url(#${gradId}-sheen)`}
        />

        {/* Inner highlight arc (top crest) */}
        <path
          d="M55 35 C90 18 165 22 208 58"
          fill="none"
          stroke="white"
          strokeWidth="7"
          strokeLinecap="round"
          strokeOpacity="0.28"
          filter={`url(#${gradId}-blur)`}
        />

        {/* Thin crisp border glow */}
        <path
          d="M40 30 C82 12 186 20 222 56 C252 86 257 150 244 198 C228 248 178 262 128 258 C76 254 22 231 12 176 C2 125 -2 48 40 30 Z"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.45"
        />
      </svg>
    </div>
  );
}

/* =============================================================================
   9. CTA BOTTOM WAVE
   ============================================================================= */
export function BrandCtaBottomWave({
  className = "",
  color = "var(--brand-primary)",
  opacity = 1,
}) {
  return (
    <div
      className={`pointer-events-none absolute bottom-0 left-0 z-0
        w-[55vw] max-w-[620px]
        h-[38vh] min-h-[200px]
        select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 620 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="ctaWaveGradient"
            x1="0"
            y1="380"
            x2="620"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--brand-stop-0)" />
            <stop offset="45%" stopColor="var(--brand-stop-1)" />
            <stop offset="75%" stopColor="var(--brand-stop-2)" />
            <stop offset="100%" stopColor="var(--brand-stop-3)" />
          </linearGradient>

          <filter id="ctaWaveGlow" x="-20%" y="-30%" width="160%" height="180%">
            <feGaussianBlur stdDeviation="20" />
          </filter>
        </defs>

        <path
          d="M0 380 H460 C370 295 285 235 185 215 C95 195 40 115 0 55 V380 Z"
          fill={color}
          fillOpacity="0.14"
          filter="url(#ctaWaveGlow)"
        />

        <path
          d="M0 380 H450 C360 300 280 240 180 220 C90 200 40 120 0 60 V380 Z"
          fill="url(#ctaWaveGradient)"
          fillOpacity={opacity}
        />

        <path
          d="M0 380 H380 C300 315 230 268 145 248 C65 228 28 148 0 95 V380 Z"
          fill="white"
          fillOpacity="0.07"
        />

        <path
          d="M0 60 C40 120 90 200 180 220 C280 240 360 300 450 380"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeOpacity="0.38"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/* =============================================================================
   10. UNIFIED EXPORT WRAPPER  (API unchanged)
   ============================================================================= */
export function BrandBackgroundShapes({
  position = "top-left",
  variant = "hero",
  className = "",
  blobPos = "top-right",
  blobSize = "md",
  opacity,
  color = "var(--brand-primary)",
}) {
  switch (position) {
    case "top-left":
      return (
        <BrandTopLeftShape
          variant={variant}
          className={className}
          opacity={opacity ?? (variant === "about" ? 0.95 : 1)}
          color={color}
        />
      );
    case "bottom-hero":
      return (
        <BrandBottomHeroWave
          className={className}
          opacity={opacity ?? 1}
          color={color}
        />
      );
    case "right-accent":
      return (
        <BrandRightAccentShape
          className={className}
          opacity={opacity ?? 0.9}
          color={color}
        />
      );
    case "left-accent":
      return (
        <BrandLeftAccentShape
          className={className}
          opacity={opacity ?? 0.9}
          color={color}
        />
      );
    case "bottom-right":
      return (
        <BrandBottomRightShape
          className={className}
          opacity={opacity ?? 0.95}
          color={color}
        />
      );
    case "card-blob":
      return (
        <BrandJourneyCardBlob
          position={blobPos}
          size={blobSize}
          className={className}
          color={color}
        />
      );
    case "cta-bottom":
      return (
        <BrandCtaBottomWave
          className={className}
          color={color}
          opacity={opacity ?? 1}
        />
      );
    default:
      return null;
  }
}
// ── Backward-compatibility aliases ──
export {
  BrandTopLeftShape as OrangeTopLeftShape,
  BrandSectionSideWave as OrangeSectionSideWave,
  BrandSectionRightWave as OrangeSectionRightWave,
  BrandBottomHeroWave as OrangeBottomHeroWave,
  BrandLeftAccentShape as OrangeLeftAccentShape,
  BrandRightAccentShape as OrangeRightAccentShape,
  BrandBottomRightShape as OrangeBottomRightShape,
  BrandJourneyCardBlob as OrangeJourneyCardBlob,
  BrandCtaBottomWave as OrangeCtaBottomWave,
  BrandBackgroundShapes as OrangeBackgroundShapes,
};

export { BrandPortraitBackdropShape } from "./brandBackgroundShapes";

export default BrandBackgroundShapes;
