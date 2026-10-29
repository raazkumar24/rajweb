import React, { useState, useId, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CircularStampBadge, EditorialSectionHeader } from "../ui";

/* ──────────────────────────────────────────────
   12 Curated Toolkit Items with High-Quality SVGs
   ────────────────────────────────────────────── */
const TOOLKIT_ITEMS = [
  {
    id: "react",
    name: "REACT",
    category: "Frontend",
    tag: "UI Library",
    highlight: true,
    icon: (
      <svg viewBox="0 0 115.3 100" className="w-10 h-10" fill="none">
        <ellipse
          cx="57.65"
          cy="50"
          rx="16.5"
          ry="46.5"
          transform="rotate(30 57.65 50)"
          stroke="#00D8FF"
          strokeWidth="6"
        />
        <ellipse
          cx="57.65"
          cy="50"
          rx="16.5"
          ry="46.5"
          transform="rotate(90 57.65 50)"
          stroke="#00D8FF"
          strokeWidth="6"
        />
        <ellipse
          cx="57.65"
          cy="50"
          rx="16.5"
          ry="46.5"
          transform="rotate(150 57.65 50)"
          stroke="#00D8FF"
          strokeWidth="6"
        />
        <circle cx="57.65" cy="50" r="9.5" fill="#00D8FF" />
      </svg>
    ),
  },
  {
    id: "nextjs",
    name: "NEXT.JS",
    category: "Framework",
    tag: "App Router",
    highlight: false,
    icon: (
      <svg viewBox="0 0 180 180" className="w-10 h-10" fill="none">
        <circle
          cx="90"
          cy="90"
          r="85"
          fill="#000000"
          stroke="#FFFFFF"
          strokeWidth="6"
        />
        <path
          d="M149.5 149.5L78.8 58H58V122H71.5V74.8L137.5 159C141.8 156.2 145.8 153 149.5 149.5Z"
          fill="#FFFFFF"
        />
        <rect x="108.5" y="58" width="13.5" height="64" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: "nodejs",
    name: "NODE.JS",
    category: "Backend",
    tag: "Runtime",
    highlight: false,
    icon: (
      <svg viewBox="0 0 32 32" className="w-10 h-10">
        <path
          d="M16 2.5L28.5 9.7V24.3L16 31.5L3.5 24.3V9.7L16 2.5Z"
          fill="#5FA04E"
        />
        <path
          d="M13 12.2v7.6h2.1v-4.3l3 4.3h2.4v-7.6h-2.1v4.3l-3-4.3H13z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: "mern",
    name: "MERN",
    category: "Full Stack",
    tag: "Stack Core",
    highlight: true,
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
        <rect
          width="40"
          height="40"
          rx="10"
          fill="#1A1A1A"
          stroke="#C81D1D"
          strokeWidth="1.5"
        />
        <path
          d="M10 28V12L15 20L20 12V28"
          stroke="#00ED64"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23 12H30M23 20H28M23 28H30"
          stroke="#00D8FF"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "tailwind",
    name: "TAILWIND",
    category: "Styling",
    tag: "Utility CSS",
    highlight: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="#38BDF8" className="w-10 h-10">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
  {
    id: "figma",
    name: "FIGMA",
    category: "Design",
    tag: "UI / UX",
    highlight: false,
    icon: (
      <svg viewBox="0 0 38 57" className="w-9 h-9" fill="none">
        <path
          d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
          fill="#1ABCFE"
        />
        <path
          d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
          fill="#0ACF83"
        />
        <path
          d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
          fill="#FF7262"
        />
        <path
          d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
          fill="#F24E1E"
        />
        <path
          d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
          fill="#A259FF"
        />
      </svg>
    ),
  },
  {
    id: "typescript",
    name: "TYPESCRIPT",
    category: "Language",
    tag: "Typed Logic",
    highlight: false,
    icon: (
      <svg
        viewBox="0 0 100 100"
        className="w-10 h-10 rounded-lg overflow-hidden"
      >
        <rect width="100" height="100" fill="#3178C6" />
        <path
          d="M48 38H22v8h9.5v32h8.5V46H48v-8zm16.5 18.2c-4.4 0-7.3 2.3-7.3 5.5 0 8 18.8 4 18.8 14.5 0 7.8-6.3 12.3-15.3 12.3-7.8 0-13.8-3.2-16.2-7.8l6.8-4.5c1.8 3.5 4.8 5.3 9.4 5.3 4.5 0 7.4-2.2 7.4-5.6 0-8.4-18.8-4.5-18.8-14.4 0-7.7 6.4-12 14.6-12 6.8 0 12.2 2.7 14.7 6.7l-6.8 4.5c-1.6-2.9-4.3-4.5-7.7-4.5z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    id: "mongodb",
    name: "MONGODB",
    category: "Database",
    tag: "NoSQL DB",
    highlight: false,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path
          d="M12 1.5c0 0-6 6.5-6 13.2 0 3.6 2.4 6.2 5.3 6.8V23h1.4v-1.5c2.9-.6 5.3-3.2 5.3-6.8C18 8 12 1.5 12 1.5z"
          fill="#47A248"
        />
        <path
          d="M12 3.5c-1 2-3.2 6-3.2 11 0 3 1.4 5.2 3.2 6.2V3.5z"
          fill="#00ED64"
          opacity="0.55"
        />
      </svg>
    ),
  },
  {
    id: "express",
    name: "EXPRESS",
    category: "Server",
    tag: "REST APIs",
    highlight: false,
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
        <rect
          width="40"
          height="40"
          rx="8"
          fill="#1E1E1E"
          stroke="#444"
          strokeWidth="1"
        />
        <path
          d="M10 20h7m6 0h7M20 13v14M15 16l5-5 5 5M15 24l5 5 5-5"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="20" r="3" fill="#C81D1D" />
      </svg>
    ),
  },
  {
    id: "git",
    name: "GIT / GITHUB",
    category: "DevOps",
    tag: "Version Control",
    highlight: false,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#F05032">
        <path d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.122 0L8.837 2.56l3.056 3.056a1.782 1.782 0 0 1 2.26 2.26l3.037 3.038a1.78 1.78 0 0 1 1.942 2.766 1.78 1.78 0 0 1-2.766-1.942l-2.82-2.82a1.776 1.776 0 0 1-.926.257c-.7 0-1.332-.405-1.62-1.03l-2.84 2.84v6.86a1.782 1.782 0 1 1-1.5 0v-7.14a1.78 1.78 0 0 1-.84-2.34L3.65 6.088.454 9.284a1.5 1.5 0 0 0 0 2.122l10.48 10.48a1.5 1.5 0 0 0 2.121 0l10.49-10.48a1.5 1.5 0 0 0 0-2.476z" />
      </svg>
    ),
  },
  {
    id: "vite",
    name: "VITE",
    category: "Build Tool",
    tag: "Fast HMR",
    highlight: false,
    icon: (
      <svg viewBox="0 0 32 32" className="w-10 h-10" fill="none">
        <path
          d="M29.5 5.5L16.5 28.5L3.5 5.5L16.5 2.5L29.5 5.5Z"
          fill="url(#vite-grad)"
        />
        <path
          d="M17.8 7.5L10 16H16.5L14.2 24L22 14.5H15.8L17.8 7.5Z"
          fill="#FFD200"
        />
        <defs>
          <linearGradient id="vite-grad" x1="3.5" y1="2.5" x2="29.5" y2="28.5">
            <stop stopColor="#41D1FF" />
            <stop offset="1" stopColor="#BD34FE" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "vscode",
    name: "VS CODE",
    category: "Editor",
    tag: "IDE Config",
    highlight: false,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#007ACC">
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
      </svg>
    ),
  },
];

/* ──────────────────────────────────────────────
   Grid layout (matches the reference):
   - which tool sits in which cell
   - which cells glow red by default
   ────────────────────────────────────────────── */
const GRID_ORDER = [
  "react",
  "nextjs",
  "nodejs",
  "mern",
  "git",
  "typescript",
  "mongodb",
  "figma",
  "tailwind",
  "express",
  "vite",
  "vscode",
];

const GLOW_IDS = new Set(["react", "typescript", "mongodb"]);
const MUTED_IDS = new Set(["git"]); // shown in grey, like the reference

/* Floating tilted tags around the grid (positions are % of the grid) */
const TAGS = [
  { text: "REACT", angle: -7, left: "-19%", top: "-15%", delay: 0 },
  { text: "NODE", angle: -8, left: "-23%", top: "22%", delay: 0.6 },
  { text: "TAILWIND", angle: 6, left: "-21%", top: "81%", delay: 1.1 },
  { text: "MERN", angle: 7, left: "120%", top: "-11%", delay: 0.3 },
  { text: "FIGMA", angle: 6, left: "122%", top: "74%", delay: 0.9 },
];

/* Dashed arrows that connect the tags with the grid.
   left/top = where the arrow starts (% of the grid). */
const ARROWS = [
  {
    left: "-9%",
    top: "-15%",
    w: 72,
    h: 92,
    d: "M 2 6 C 36 -6, 62 24, 66 82",
    head: "M 56 72 L 66 84 L 74 70",
  },
  {
    left: "-26%",
    top: "29%",
    w: 40,
    h: 180,
    d: "M 6 4 C -10 50, -2 110, 14 168",
    head: "M 4 156 L 14 170 L 24 158",
  },
  {
    left: "-11.6%",
    top: "84%",
    w: 72,
    h: 52,
    d: "M 2 2 C 30 4, 52 20, 64 40",
    head: "M 50 36 L 64 42 L 60 26",
  },
  {
    left: "102.3%",
    top: "-3%",
    w: 68,
    h: 62,
    d: "M 62 4 C 36 6, 8 20, 4 50",
    head: "M 14 40 L 4 52 L 18 58",
  },
  {
    left: "102.3%",
    top: "52%",
    w: 90,
    h: 100,
    d: "M 2 4 C 40 6, 70 30, 72 90",
    head: "M 62 80 L 72 94 L 82 80",
  },
];

/* ──────────────────────────────────────────────
   Floating tag with a gentle float + magnetic pull
   ────────────────────────────────────────────── */
function FloatingPillBadge({
  text,
  angle = 0,
  floatDelay = 0,
  reduceMotion = false,
  colors,
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setOffset({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.25,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.25,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      style={{ rotate: angle }}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={{
          duration: 4 + floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        className="px-3.5 py-1.5 rounded-full font-mono text-[11px] lg:text-xs font-bold tracking-widest uppercase border shadow-lg select-none whitespace-nowrap"
        style={{
          background: colors.pillBg,
          borderColor: colors.pillBorder,
          color: colors.pillText,
        }}
      >
        [ {text} ]
      </motion.div>
    </motion.div>
  );
}

/* Dashed arrow (fades in; dashes are kept intact) */
function DashedArrow({ arrow, color, delay = 0, reduceMotion }) {
  return (
    <motion.svg
      aria-hidden="true"
      width={arrow.w}
      height={arrow.h}
      viewBox={`0 0 ${arrow.w} ${arrow.h}`}
      fill="none"
      className="pointer-events-none absolute z-20 overflow-visible hidden md:block"
      style={{ left: arrow.left, top: arrow.top }}
      initial={reduceMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay }}
    >
      <path
        d={arrow.d}
        stroke={color}
        strokeWidth="1.6"
        strokeDasharray="5 5"
        strokeLinecap="round"
      />
      <path
        d={arrow.head}
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

/* ──────────────────────────────────────────────
   Torn paper edge at the bottom (with red shadow edge)
   ────────────────────────────────────────────── */
function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateTornPaths(width = 1440, height = 176, step = 14) {
  const rnd = mulberry32(1042);
  const base = 50;
  const amp = 8.5;

  const points = [];
  for (let x = 0; x <= width; x += step) {
    const notch = rnd() > 0.88 ? amp * 1.15 : 0;
    const y = base + (rnd() - 0.5) * 2 * amp + notch;
    // Edge offset stays consistently 6-10px above the paper line
    const edgeOffset = 6 + rnd() * 4;
    points.push({ x, y, edgeY: y - edgeOffset });
  }

  if (points[points.length - 1].x < width) {
    points.push({ x: width, y: base, edgeY: base - 7 });
  }

  let paperD = `M 0 ${height} L 0 ${points[0].y.toFixed(1)}`;
  let shadowD = `M 0 ${height} L 0 ${points[0].edgeY.toFixed(1)}`;

  for (let i = 1; i < points.length; i++) {
    paperD += ` L ${points[i].x} ${points[i].y.toFixed(1)}`;
    shadowD += ` L ${points[i].x} ${points[i].edgeY.toFixed(1)}`;
  }

  paperD += ` L ${width} ${height} Z`;
  shadowD += ` L ${width} ${height} Z`;

  return { paper: paperD, shadow: shadowD };
}

function TornPaper({ fill, edge }) {
  const uid = useId().replace(/:/g, "");
  const paths = useMemo(() => generateTornPaths(), []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 sm:h-40"
    >
      <svg
        viewBox="0 0 1440 176"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <clipPath id={`clip-${uid}`}>
            <path d={paths.paper} />
          </clipPath>
          <filter id={`noise-${uid}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>

        {/* Crimson red fiber edge peeking out cleanly above the torn paper */}
        <path d={paths.shadow} fill={edge} />

        <g clipPath={`url(#clip-${uid})`}>
          <rect width="1440" height="176" fill={fill} />
          <rect
            width="1440"
            height="176"
            filter={`url(#noise-${uid})`}
            opacity="0.2"
            style={{ mixBlendMode: "multiply" }}
          />
        </g>
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ToolkitSection Component
   ────────────────────────────────────────────── */
export default function ToolkitSection({ heroMode = "red" }) {
  const isRedTheme = heroMode === "red";
  const shouldReduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState(null);

  const items = GRID_ORDER.map((id) =>
    TOOLKIT_ITEMS.find((i) => i.id === id),
  ).filter(Boolean);

  const sectionColors = isRedTheme
    ? {
        bg: "linear-gradient(180deg, #2e3134 0%, #27292c 100%)",
        headerPrimary: "#EDEAE4",
        headerSecondary: "#EDEAE4",
        label: "rgba(255, 255, 255, 0.85)",
        lineColor: "rgba(200, 29, 29, 0.6)",
        cardBg: "#212326",
        cardBorder: "rgba(255, 255, 255, 0.08)",
        glowBg:
          "radial-gradient(circle at 50% 38%, rgba(255, 46, 46, 0.18), #1c1d1f 72%)",
        cardText: "#EAE8E3",
        pillBg: "#17181a",
        pillBorder: "rgba(255, 255, 255, 0.28)",
        pillText: "#FFFFFF",
        arrow: "rgba(255, 255, 255, 0.55)",
        bubbleBg: "#F4EFE9",
        bubbleBorder: "#E39A92",
        bubbleText: "#1B1B1B",
        stamp: "#2A2A2A",
        badge: "rgba(255, 255, 255, 0.85)",
        paperFill: "#141414",
        paperEdge: "#C81D1D",
        tooltip: "#FFFFFF",
      }
    : {
        bg: "#E4E2DD",
        headerPrimary: "#121212",
        headerSecondary: "#A81818",
        label: "#121212",
        lineColor: "rgba(200, 29, 29, 0.55)",
        cardBg: "#F7F5F0",
        cardBorder: "rgba(18, 18, 18, 0.15)",
        glowBg:
          "radial-gradient(circle at 50% 38%, rgba(200, 29, 29, 0.14), #FFFFFF 72%)",
        cardText: "#121212",
        pillBg: "#121212",
        pillBorder: "#121212",
        pillText: "#FFFFFF",
        arrow: "#C81D1D",
        bubbleBg: "#FFFFFF",
        bubbleBorder: "rgba(18, 18, 18, 0.2)",
        bubbleText: "#121212",
        stamp: "#121212",
        badge: "#121212",
        paperFill: "#141414",
        paperEdge: "#C81D1D",
        tooltip: "#C81D1D",
      };

  const titleClass =
    "font-display text-[clamp(3.2rem,11.5vw,11rem)] font-black uppercase tracking-[-0.04em] leading-[0.88]";

  return (
    <section
      id="toolkit"
      aria-labelledby="toolkit-heading"
      className="relative w-full overflow-hidden transition-colors duration-700 pt-14 sm:pt-20 pb-36 sm:pb-44 select-none"
      style={{
        background: sectionColors.bg,
        color: sectionColors.cardText,
      }}
    >
      {/* Film grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "240px",
        }}
      />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14">
        {/* ── UNIFIED EDITORIAL HEADER ── */}
        <EditorialSectionHeader
          number="02"
          label="MY TOOLKIT & STACK"
          outlineTitle="TECH"
          solidTitle="TOOLKIT"
          description="A specialized developer arsenal engineered for high-velocity full-stack platforms, modern interactive applications, and bulletproof user interfaces."
          heroMode={heroMode}
        />

        {/* ── GRID + LATTICE + FLOATING TAGS ── */}
        <div
          className="relative isolate mx-auto w-full max-w-[26rem] sm:max-w-[30rem] md:max-w-[28rem] lg:max-w-[38rem] xl:max-w-[42rem]"
          style={{ "--g": "10px" }}
        >
          {/* Red architectural lattice — lines run through the gaps and
              overshoot the grid, like the reference */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={`v${i}`}
                className="absolute w-px"
                style={{
                  left: `calc(${i} * (100% + var(--g)) / 4 - var(--g) / 2)`,
                  top: "-2.5rem",
                  bottom: "-2.5rem",
                  background: sectionColors.lineColor,
                }}
              />
            ))}
            {[0, 1, 2, 3].map((j) => (
              <span
                key={`h${j}`}
                className="absolute h-px"
                style={{
                  top: `calc(${j} * (100% + var(--g)) / 3 - var(--g) / 2)`,
                  left: "-2.5rem",
                  right: "-2.5rem",
                  background: sectionColors.lineColor,
                }}
              />
            ))}
          </div>

          {/* Floating tags */}
          {TAGS.map((tag) => (
            <div
              key={tag.text}
              className="absolute z-30 hidden md:block -translate-x-1/2 -translate-y-1/2"
              style={{ left: tag.left, top: tag.top }}
            >
              <FloatingPillBadge
                text={tag.text}
                angle={tag.angle}
                floatDelay={tag.delay}
                reduceMotion={shouldReduceMotion}
                colors={sectionColors}
              />
            </div>
          ))}

          {/* Dashed arrows */}
          {ARROWS.map((arrow, i) => (
            <DashedArrow
              key={i}
              arrow={arrow}
              color={sectionColors.arrow}
              delay={0.4 + i * 0.12}
              reduceMotion={shouldReduceMotion}
            />
          ))}

          {/* 4 × 3 card grid — icons only */}
          <div className="relative z-10 grid grid-cols-4 gap-[var(--g)]">
            {items.map((item, idx) => {
              const glow = GLOW_IDS.has(item.id) || hoveredId === item.id;
              const muted = MUTED_IDS.has(item.id) && !glow;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  aria-label={item.name}
                  title={item.name}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(item.id)}
                  onBlur={() => setHoveredId(null)}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 30, scale: 0.92 }
                  }
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    type: "spring",
                    stiffness: 140,
                    damping: 14,
                    delay: idx * 0.04,
                  }}
                  className="group relative aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center outline-none transition-[box-shadow,border-color,background] duration-300"
                  style={{
                    background: glow
                      ? sectionColors.glowBg
                      : sectionColors.cardBg,
                    border: glow
                      ? "1.5px solid #E83A3A"
                      : `1px solid ${sectionColors.cardBorder}`,
                    boxShadow: glow
                      ? "0 0 0 1px rgba(255, 58, 58, 0.2), 0 0 24px rgba(255, 46, 46, 0.35), inset 0 0 18px rgba(255, 46, 46, 0.12)"
                      : "none",
                  }}
                >
                  {/* Icon only — scaled to the card */}
                  <span
                    className="flex items-center justify-center w-full transition-transform duration-300 group-hover:scale-110 [&>svg]:!w-[36%] [&>svg]:!h-auto"
                    style={
                      muted
                        ? {
                            filter: "grayscale(1) brightness(1.15)",
                            opacity: 0.8,
                          }
                        : undefined
                    }
                  >
                    {item.icon}
                  </span>

                  {/* Name appears on hover / keyboard focus */}
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-1.5 sm:bottom-2.5 text-center font-mono text-[8px] sm:text-[10px] font-bold tracking-widest uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                    style={{ color: sectionColors.tooltip }}
                  >
                    {item.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── CALLOUT (bottom-right, sits cleanly above the torn paper cut) ── */}
        <div className="relative z-20 mt-12 sm:mt-16 flex justify-end">
          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, scale: 0.92, y: 20 }
            }
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 130, damping: 14 }}
            className="relative w-full max-w-[34rem] rounded-2xl p-6 sm:p-8 flex items-center justify-between gap-6"
            style={{
              background: sectionColors.bubbleBg,
              border: `1.5px solid ${sectionColors.bubbleBorder}`,
              boxShadow: "0 18px 40px -12px rgba(0, 0, 0, 0.55)",
              color: sectionColors.bubbleText,
            }}
          >
            {/* Speech-bubble tail pointing up at the grid */}
            <span
              aria-hidden="true"
              className="absolute -top-[9px] left-[33%] w-4 h-4 rotate-45"
              style={{
                background: sectionColors.bubbleBg,
                borderLeft: `1.5px solid ${sectionColors.bubbleBorder}`,
                borderTop: `1.5px solid ${sectionColors.bubbleBorder}`,
              }}
            />

            <p className="font-display text-[clamp(1.2rem,2.4vw,2rem)] font-black uppercase tracking-tight leading-[1.1]">
              ALWAYS LEARNING,
              <br />
              ALWAYS BUILDING
            </p>

            <div className="shrink-0">
              <CircularStampBadge size={84} color={sectionColors.stamp} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Torn paper edge */}
      <TornPaper
        fill={sectionColors.paperFill}
        edge={sectionColors.paperEdge}
      />
    </section>
  );
}
