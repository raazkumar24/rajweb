import React, { useRef, useState, useEffect, useId, useMemo } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

/* ──────────────────────────────────────────────
   Circular Stamp Badge Component
   ────────────────────────────────────────────── */
export function CircularStampBadge({
  size = 96,
  text = "FOCUSED ON IMPACT • MADE FOR WEB •",
  color = "currentColor",
  className = "",
}) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
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
            id="stamp-circle-path"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="2 3"
          opacity="0.6"
        />
        <circle
          cx="50"
          cy="50"
          r="41"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <text
          fontSize="8.2"
          fontFamily="JetBrains Mono, monospace"
          fontWeight="bold"
          letterSpacing="0.16em"
          fill="currentColor"
        >
          <textPath href="#stamp-circle-path" startOffset="0%">
            {text}
          </textPath>
        </text>
        {/* 4-point star in the center */}
        <path
          d="M 50 42 Q 50 50 42 50 Q 50 50 50 58 Q 50 50 58 50 Q 50 50 50 42 Z"
          fill="currentColor"
        />
      </svg>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Hand-drawn curved arrow (header + step 3)
   ────────────────────────────────────────────── */
function HandDrawnArrow({
  color,
  className = "",
  delay = 0,
  reduceMotion = false,
  variant = "header",
}) {
  // header  → starts top-left, sweeps right and hooks back (like under "MY JOURNEY")
  // down    → starts top-left and curls down-right (like near the bottom photo)
  const paths = {
    header: {
      line: "M 80 8 C 80 30, 50 56, 12 56",
      head: "M 25 44 L 10 56 L 25 68",
      box: "0 0 95 80",
    },
    down: {
      line: "M 6 10 C 22 14, 46 24, 56 50",
      head: "M 44 42 L 56 50 L 60 38",
      box: "0 0 75 70",
    },
  };
  const p = paths[variant];

  return (
    <svg
      viewBox={p.box}
      fill="none"
      className={`overflow-visible ${className}`}
      aria-hidden="true"
    >
      <motion.path
        d={p.line}
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        initial={reduceMotion ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
      />
      <motion.path
        d={p.head}
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: delay + 0.9 }}
      />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Clean outline text (fixes overlapping glyph contours).
   -webkit-text-stroke strokes every contour, so fonts whose
   letters are built from overlapping shapes (E, H, A, W…)
   show extra inner lines. Here the text is drawn solid, then
   this SVG filter keeps only the ring around the merged
   shape, so overlaps can never show.
   ────────────────────────────────────────────── */
function OutlineFilter({ id, color, opacity = 1, radius = 1.6 }) {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", pointerEvents: "none" }}
    >
      <defs>
        <filter id={id} x="-5%" y="-10%" width="110%" height="120%">
          <feMorphology
            in="SourceAlpha"
            operator="dilate"
            radius={radius}
            result="grown"
          />
          <feComposite
            in="grown"
            in2="SourceAlpha"
            operator="out"
            result="ring"
          />
          <feFlood floodColor={color} floodOpacity={opacity} result="paint" />
          <feComposite in="paint" in2="ring" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Zig-zag guide line, measured from the real layout.
   Instead of guessing coordinates in a fixed viewBox, the
   path is built from the actual position of each block, so
   the curves always leave and enter the right edges and the
   arrowheads always point along the line (no stretching).
   ────────────────────────────────────────────── */

// Position of `el` inside `root`, ignoring CSS transforms (reveal animations).
function relRect(el, root) {
  let x = 0;
  let y = 0;
  let n = el;
  while (n && n !== root) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

const r1 = (n) => Math.round(n * 10) / 10;
const clamp01 = (v) => Math.min(1, Math.max(0, v));

function mkRange(from, to) {
  const a = clamp01(from);
  const b = Math.max(a + 0.04, clamp01(to));
  return [a, Math.min(1, b)];
}

// Chevron arrowhead: tip + direction of travel (radians)
function arrowHead(tip, theta, size = 12, spread = 0.52) {
  const back = theta + Math.PI;
  const pt = (ang) =>
    `${r1(tip.x + size * Math.cos(ang))} ${r1(tip.y + size * Math.sin(ang))}`;
  return `M ${pt(back + spread)} L ${r1(tip.x)} ${r1(tip.y)} L ${pt(back - spread)}`;
}

function buildTrack(root, anchors) {
  const W = root.offsetWidth;
  const H = root.offsetHeight;
  if (!W || !H) return null;
  if (!anchors.collage.current || !anchors.photo.current) return null;

  const collage = relRect(anchors.collage.current, root);
  const photo = relRect(anchors.photo.current, root);

  /* ── Mobile / tablet: blocks are stacked, so the line runs as a
        gentle wave down the left gutter, arrow pointing down ── */
  if (window.innerWidth < 1024) {
    const y0 = collage.y + collage.h * 0.5;
    const y1 = photo.y + photo.h * 0.5;
    const n = Math.max(2, Math.round((y1 - y0) / 220));
    let px = -6;
    let py = y0;
    let d = `M ${px} ${r1(py)}`;
    for (let i = 1; i <= n; i++) {
      const nx = i % 2 ? 8 : -6;
      const ny = y0 + ((y1 - y0) * i) / n;
      const mid = py + (ny - py) / 2;
      d += ` C ${px} ${r1(mid)}, ${nx} ${r1(mid)}, ${nx} ${r1(ny)}`;
      px = nx;
      py = ny;
    }
    return {
      w: W,
      h: H,
      segments: [
        {
          d,
          arrow: arrowHead({ x: px, y: py }, Math.PI / 2),
          range: [0, 1],
        },
      ],
    };
  }

  if (!anchors.text2.current || !anchors.code.current) return null;
  const text2 = relRect(anchors.text2.current, root);
  const code = relRect(anchors.code.current, root);

  /* ── Segment A: collage  ➜  "2023" text
        leaves the collage going down, hooks left and enters the
        text from its left edge, arrow pointing right ── */
  const aS = {
    x: collage.x + collage.w * 0.82,
    y: collage.y + collage.h * 0.8,
  };
  const aE = { x: text2.x - 24, y: text2.y + 16 };
  const aC1 = { x: aS.x, y: aS.y + (aE.y - aS.y) * 0.55 };
  const aC2 = { x: aE.x - 130, y: aE.y };
  const dA = `M ${r1(aS.x)} ${r1(aS.y)} C ${r1(aC1.x)} ${r1(aC1.y)}, ${r1(aC2.x)} ${r1(aC2.y)}, ${r1(aE.x)} ${r1(aE.y)}`;

  /* ── Segment B: code window  ➜  photo
        leaves the bottom of the code window, sweeps left and
        enters the photo from its right edge, arrow pointing left ── */
  const bS = { x: code.x + code.w * 0.7, y: code.y + code.h + 6 };
  const bE = { x: photo.x + photo.w + 26, y: photo.y + photo.h * 0.5 };
  const bC1 = { x: bS.x, y: bS.y + (bE.y - bS.y) * 0.5 };
  const bC2 = { x: bE.x + 140, y: bE.y };
  const dB = `M ${r1(bS.x)} ${r1(bS.y)} C ${r1(bC1.x)} ${r1(bC1.y)}, ${r1(bC2.x)} ${r1(bC2.y)}, ${r1(bE.x)} ${r1(bE.y)}`;

  return {
    w: W,
    h: H,
    segments: [
      {
        d: dA,
        arrow: arrowHead(aE, 0),
        range: mkRange(aS.y / H - 0.05, aE.y / H),
      },
      {
        d: dB,
        arrow: arrowHead(bE, Math.PI),
        range: mkRange(bS.y / H - 0.05, bE.y / H),
      },
    ],
  };
}

function LineSegment({
  d,
  arrow,
  range,
  progress,
  colors,
  gradientId,
  reduceMotion,
}) {
  const draw = useTransform(progress, range, [0, 1]);
  // hide the round cap "dot" until this segment actually starts drawing
  const started = useTransform(draw, (v) => (v > 0.002 ? 1 : 0));
  const headOpacity = useTransform(
    progress,
    [Math.max(0, range[1] - 0.05), range[1]],
    [0, 1],
  );

  return (
    <>
      {/* Background dashed track */}
      <path
        d={d}
        stroke={colors.trackColor}
        strokeWidth="2"
        strokeDasharray="6 6"
        strokeLinecap="round"
      />

      {/* Soft glow */}
      <motion.path
        d={d}
        stroke={colors.brand}
        strokeOpacity="0.22"
        strokeWidth="9"
        strokeLinecap="round"
        style={{
          pathLength: reduceMotion ? 1 : draw,
          opacity: reduceMotion ? 1 : started,
        }}
      />

      {/* Main gradient line */}
      <motion.path
        d={d}
        stroke={`url(#${gradientId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{
          pathLength: reduceMotion ? 1 : draw,
          opacity: reduceMotion ? 1 : started,
        }}
      />

      {/* Arrowhead — appears when the line reaches its target */}
      <motion.path
        d={arrow}
        stroke={colors.lineColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{ opacity: reduceMotion ? 1 : headOpacity }}
      />
    </>
  );
}

function ZigZagLine({ targetRef, anchors, colors, reduceMotion = false }) {
  const gradientId = `zig-${useId().replace(/:/g, "")}`;
  const [track, setTrack] = useState(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 70%", "end 55%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  useEffect(() => {
    const root = targetRef.current;
    if (!root) return undefined;

    const measure = () => {
      const next = buildTrack(root, anchors);
      setTrack((prev) =>
        prev && JSON.stringify(prev) === JSON.stringify(next) ? prev : next,
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    Object.values(anchors).forEach((r) => r.current && ro.observe(r.current));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [targetRef, anchors]);

  if (!track) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    >
      <svg
        width={track.w}
        height={track.h}
        viewBox={`0 0 ${track.w} ${track.h}`}
        fill="none"
        className="absolute inset-0 overflow-visible"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="0"
            y2={track.h}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={colors.gradFrom} />
            <stop offset="100%" stopColor={colors.gradTo} />
          </linearGradient>
        </defs>

        {track.segments.map((seg, i) => (
          <LineSegment
            key={i}
            {...seg}
            progress={progress}
            colors={colors}
            gradientId={gradientId}
            reduceMotion={reduceMotion}
          />
        ))}
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Step 1 collage — two tilted paper frames
   (beige card with black/red shards + small grey card)
   ────────────────────────────────────────────── */
function CollageFrames({ isRed, innerRef }) {
  return (
    <div ref={innerRef} className="relative w-full max-w-[30rem] aspect-[5/4]">
      {/* Back / large paper frame */}
      <div
        className="absolute top-0 right-0 w-[72%] h-[74%] rotate-[2.5deg] shadow-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #dccdc3 0%, #c3a9a0 55%, #9c6e68 100%)",
        }}
      >
        {/* halftone */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.4) 1px, transparent 1px)",
            backgroundSize: "4px 4px",
          }}
        />

        {/* abstract shapes */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          fill="none"
        >
          <polygon points="100,0 100,100 30,100" fill="#161616" />
          <polygon points="100,0 66,50 100,58" fill="#b3252c" />
          <polygon points="0,0 34,0 0,40" fill="#6a1a20" opacity="0.55" />
          <circle cx="22" cy="72" r="9" fill="#f0e6de" opacity="0.55" />
        </svg>

        {/* thin red edge on the top-right, like the reference */}
        <span className="absolute top-0 right-0 w-full h-1.5 bg-[#8f1f26]" />
      </div>

      {/* Mid beige sticker */}
      <div
        className="absolute left-[34%] top-[6%] w-[26%] h-[30%] -rotate-[6deg] shadow-xl"
        style={{ background: "#ece1d8" }}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(0,0,0,0.25) 0 1px, transparent 1px 6px)",
          }}
        />
      </div>

      {/* Front / small grey photo-like frame */}
      <div
        className="absolute left-0 bottom-0 w-[52%] h-[54%] -rotate-[5deg] shadow-2xl overflow-hidden border"
        style={{
          background: "linear-gradient(135deg, #7a7573 0%, #3a3939 100%)",
          borderColor: isRed ? "rgba(255,255,255,0.18)" : "rgba(18,18,18,0.2)",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          fill="none"
        >
          <polygon points="12,92 55,22 92,92" fill="#121212" />
          <polygon points="46,92 72,46 98,92" fill="#cfc8c3" opacity="0.85" />
        </svg>
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "4px 4px",
          }}
        />
      </div>

      {/* Tape */}
      <span className="absolute left-[8%] bottom-[48%] w-12 h-4 rotate-[-18deg] bg-white/40 backdrop-blur-sm" />
    </div>
  );
}

/* ──────────────────────────────────────────────
   macOS Code Editor Window for Step 2
   ────────────────────────────────────────────── */
function MacCodeWindow({ isDark }) {
  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden border shadow-2xl transition-all duration-300 ${
        isDark
          ? "bg-[#14172b] border-white/10 text-white"
          : "bg-[#1E1E1E] border-black/15 text-white"
      }`}
    >
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0d0f1f] border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
        </div>
        <span className="text-[10px] font-mono font-medium text-white/50 tracking-wider">
          Architecture.tsx
        </span>
        <div className="w-8" />
      </div>

      {/* Code Syntax Area */}
      <div className="p-3 sm:p-4 font-mono text-[10px] sm:text-[11px] leading-relaxed select-text space-y-1 bg-[#12142a]/95">
        <div className="flex items-center gap-2.5 text-white/40">
          <span className="w-3 text-right select-none">1</span>
          <span className="whitespace-nowrap">
            <span className="text-[#FF6B6B] font-bold">import</span> &#123;
            createEngine &#125;{" "}
            <span className="text-[#FF6B6B] font-bold">from</span>{" "}
            <span className="text-[#98C379]">"@raj/core"</span>;
          </span>
        </div>

        <div className="flex items-center gap-2.5 text-white/40">
          <span className="w-3 text-right select-none">2</span>
          <span className="whitespace-nowrap">
            <span className="text-[#E5C07B]">const</span> stack = [
            <span className="text-[#98C379]">"React"</span>,{" "}
            <span className="text-[#98C379]">"Next.js"</span>];
          </span>
        </div>

        <div className="flex items-center gap-2.5 text-white/40">
          <span className="w-3 text-right select-none">3</span>
          <span className="text-white/30 whitespace-nowrap">
            // Fluid spring physics &amp; APIs
          </span>
        </div>

        <div className="flex items-center gap-2.5 text-white/40">
          <span className="w-3 text-right select-none">4</span>
          <span className="whitespace-nowrap">
            <span className="text-[#61AFEF]">async function</span>{" "}
            <span className="text-[#E5C07B]">deploySystem</span>() &#123;
          </span>
        </div>

        <div className="flex items-center gap-2.5 text-white/40 pl-3">
          <span className="w-3 text-right select-none">5</span>
          <span className="whitespace-nowrap">
            <span className="text-[#FF6B6B] font-bold">return await</span>{" "}
            createEngine(&#123; <span className="text-[#D19A66]">speed</span>:{" "}
            <span className="text-[#98C379]">"100ms"</span> &#125;);
          </span>
        </div>

        <div className="flex items-center gap-2.5 text-white/40">
          <span className="w-3 text-right select-none">6</span>
          <span>&#125;</span>
        </div>
      </div>

      {/* Editor Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-[#0a0b18] border-t border-white/5 text-[9px] font-mono text-white/40">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
          READY
        </span>
        <span>UTF-8 • TYPESCRIPT</span>
      </div>
    </div>
  );
}

/* Light, empty window that sits behind the code window */
function BackLightWindow() {
  return (
    <div className="absolute top-0 left-0 w-[86%] h-[72%] rounded-xl overflow-hidden border border-black/10 bg-[#dcdadf] shadow-xl">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#c8c6cc]">
        <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
        <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
        <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
      </div>
      <div className="p-3 space-y-2">
        <span className="block h-1.5 w-1/2 rounded bg-black/10" />
        <span className="block h-1.5 w-2/3 rounded bg-black/10" />
        <span className="block h-1.5 w-1/3 rounded bg-black/10" />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Small helpers
   ────────────────────────────────────────────── */
function ScrollArrowIcon({ className = "" }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Main JourneySection
   ────────────────────────────────────────────── */
export default function JourneySection({ heroMode = "red" }) {
  const isRedTheme = heroMode === "red";
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const outlineId = `hollow-${useId().replace(/:/g, "")}`;

  // Anchors the zig-zag line is measured from
  const collageRef = useRef(null);
  const text2Ref = useRef(null);
  const codeRef = useRef(null);
  const photoRef = useRef(null);
  const anchors = useMemo(
    () => ({
      collage: collageRef,
      text2: text2Ref,
      code: codeRef,
      photo: photoRef,
    }),
    [],
  );

  // Color tokens based on theme
  const colors = isRedTheme
    ? {
        bg: "linear-gradient(180deg, #6d0e19 0%, #5c0b15 50%, #4a0811 100%)",
        textPrimary: "#FFFFFF",
        textMuted: "rgba(255, 255, 255, 0.74)",
        textLabel: "rgba(255, 255, 255, 0.9)",
        strokeHollow: "rgba(255, 255, 255, 0.55)",
        lineColor: "#FF6B6B",
        badgeColor: "rgba(255, 255, 255, 0.9)",
        arrowColor: "#FF6B6B",
        cardBorder: "rgba(255, 255, 255, 0.14)",
        brand: "#FF3B3B",
        gradFrom: "#FFC2C2",
        gradTo: "#FF4040",
        trackColor: "rgba(255, 255, 255, 0.16)",
        outlineColor: "#FFFFFF",
        outlineOpacity: 0.6,
      }
    : {
        bg: "#D8D5CD",
        textPrimary: "#121212",
        textMuted: "#4A4A4A",
        textLabel: "#121212",
        strokeHollow: "rgba(18, 18, 18, 0.3)",
        lineColor: "#C81D1D",
        badgeColor: "#121212",
        arrowColor: "#C81D1D",
        cardBorder: "rgba(18, 18, 18, 0.15)",
        brand: "#C81D1D",
        gradFrom: "#E9A3A3",
        gradTo: "#C81D1D",
        trackColor: "rgba(18, 18, 18, 0.14)",
        outlineColor: "#121212",
        outlineOpacity: 0.35,
      };

  // Spring animation transition
  const springTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 130, damping: 12 };

  // Reusable reveal props
  const revealText = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 30, rotate: -3 },
    whileInView: { opacity: 1, y: 0, rotate: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: springTransition,
  };

  const revealMedia = {
    initial: shouldReduceMotion
      ? false
      : { opacity: 0, scale: 0.92, rotate: -3 },
    whileInView: { opacity: 1, scale: 1, rotate: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: springTransition,
  };

  // Solid text + SVG filter that keeps only the outer ring (see OutlineFilter)
  const hollowStyle = {
    color: "#FFFFFF",
    filter: `url(#${outlineId})`,
  };

  const headingClass =
    "font-display text-xl sm:text-2xl lg:text-[1.65rem] font-bold uppercase tracking-tight mb-3";
  const bodyClass = "text-xs sm:text-sm leading-relaxed font-normal max-w-sm";

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative w-full overflow-hidden transition-colors duration-700 py-16 sm:py-24 lg:py-32 select-none"
      style={{
        background: colors.bg,
        color: colors.textPrimary,
      }}
    >
      {/* Film / Paper Grain Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.09] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "240px",
        }}
      />

      <OutlineFilter
        id={outlineId}
        color={colors.outlineColor}
        opacity={colors.outlineOpacity}
        radius={1.6}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14">
        {/* ── HEADER ROW ── */}
        <div className="relative mb-14 sm:mb-20 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="relative w-full">
            {/* Small Label */}
            <div className="flex items-center gap-2.5 mb-1">
              <span
                className="w-6 h-[1.5px]"
                style={{ background: colors.textLabel }}
              />
              <span
                className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.26em] uppercase"
                style={{ color: colors.textLabel }}
              >
                EDITORIAL PORTFOLIO
              </span>
            </div>

            {/* Giant Hollow Outlined Title: MY JOURNEY */}
            <div className="relative inline-block">
              <h2
                className="font-display text-[clamp(3.5rem,9.5vw,8.5rem)] font-black uppercase tracking-[-0.01em] leading-[0.88]"
                style={hollowStyle}
              >
                MY JOURNEY
              </h2>

              {/* Hand-drawn curved arrow under the right end of the title */}
              <div className="absolute right-[-2%] sm:right-[-6%] -bottom-10 sm:-bottom-14 pointer-events-none">
                <HandDrawnArrow
                  variant="header"
                  color={colors.arrowColor}
                  reduceMotion={shouldReduceMotion}
                  className="w-14 sm:w-20 md:w-24"
                />
              </div>
            </div>
          </div>

          {/* Rotating Circular Stamp Badge on Top-Right */}
          <div className="absolute right-0 top-0 hidden sm:block">
            <CircularStampBadge
              size={92}
              color={colors.badgeColor}
              className="drop-shadow-md"
            />
          </div>
        </div>

        {/* ── ZIG-ZAG TIMELINE CONTAINER ── */}
        <div
          ref={timelineRef}
          className="relative flex flex-col gap-20 sm:gap-24 lg:gap-40"
        >
          {/* Continuous scroll-drawn zig-zag line (sits behind all steps) */}
          <ZigZagLine
            targetRef={timelineRef}
            anchors={anchors}
            colors={colors}
            reduceMotion={shouldReduceMotion}
          />

          {/* ── STEP 1 (Text left · Collage center) ── */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              {...revealText}
              className="lg:col-span-4 flex flex-col justify-center"
            >
              <h3 className={headingClass}>2021 — BEGINNINGS</h3>

              <p className={bodyClass} style={{ color: colors.textMuted }}>
                Raj Shekhar is a creative concept developer focused on building
                interactive web experiences, frontend architecture, and design
                systems. From early days of exploring web fundamentals, visual
                hierarchy, and layout grids to mastering modern UI engineering.
              </p>

              {/* SCROLL TO DISCOVER (left, under the first text) */}
              <div
                className="hidden lg:flex items-center gap-3 mt-14"
                style={{ color: colors.textMuted }}
              >
                <ScrollArrowIcon className="w-4 h-8 animate-bounce" />
                <span className="text-[9px] font-mono font-bold tracking-[0.24em] uppercase leading-snug">
                  SCROLL TO
                  <br />
                  DISCOVER
                </span>
              </div>
            </motion.div>

            <motion.div
              {...revealMedia}
              className="lg:col-span-4 lg:col-start-5 relative flex items-center justify-center lg:justify-start"
            >
              <CollageFrames isRed={isRedTheme} innerRef={collageRef} />
            </motion.div>
          </div>

          {/* ── STEP 2 (Text center-right · Code windows far right) ── */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              ref={text2Ref}
              {...revealText}
              className="lg:col-span-4 lg:col-start-6 lg:order-1 flex flex-col justify-center"
            >
              <h3 className={headingClass}>2023 — SCALING UP</h3>

              <p className={bodyClass} style={{ color: colors.textMuted }}>
                Transitioned into full-scale modern web applications, state
                management, and reusable component libraries. Engineered
                responsive interfaces with strict typography, design tokens, and
                fluid motion physics. Began integrating APIs, high performance
                rendering, and clean workflows.
              </p>
            </motion.div>

            <motion.div
              {...revealMedia}
              className="lg:col-span-3 lg:col-start-10 lg:order-2 flex items-center justify-center lg:justify-end"
            >
              <div
                ref={codeRef}
                className="relative w-full max-w-[19rem] lg:h-60"
              >
                {/* Light window behind (desktop only) */}
                <div className="hidden lg:block">
                  <BackLightWindow />
                </div>

                {/* Foreground dark code window */}
                <div className="relative lg:absolute lg:right-0 lg:bottom-0 w-full lg:w-[92%]">
                  <MacCodeWindow isDark={isRedTheme} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── STEP 3 (Text left · Candid photo center) ── */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              {...revealText}
              className="lg:col-span-4 flex flex-col justify-center"
            >
              <h3 className={headingClass}>2025 — FULL-STACK EXPANSION</h3>

              <p className={bodyClass} style={{ color: colors.textMuted }}>
                Stepped beyond the browser into scalable full-stack
                applications. Building end-to-end products using React, Next.js,
                Node.js, Express, and MongoDB. Crafting reliable APIs, real-time
                flows, and high conversion experiences that bridge creative
                design with production engineering.
              </p>
            </motion.div>

            {/* Grainy B&W candid photo — plain, no heavy frame */}
            <motion.div
              {...revealMedia}
              className="lg:col-span-4 lg:col-start-5 relative flex items-center justify-center lg:justify-start"
            >
              <div className="relative w-full max-w-[21rem]">
                <div
                  ref={photoRef}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-black shadow-2xl"
                >
                  <img
                    src="/images/profile.png"
                    alt="Raj Shekhar coding candid"
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    style={{
                      filter: "grayscale(100%) contrast(130%) brightness(90%)",
                    }}
                    loading="lazy"
                  />

                  {/* Subtle halftone overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-25"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)",
                      backgroundSize: "4px 4px",
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Solid arrow curling down-right of the photo */}
            <div className="hidden lg:block absolute left-[60%] top-[86%] pointer-events-none">
              <HandDrawnArrow
                variant="down"
                color={colors.arrowColor}
                delay={0.3}
                reduceMotion={shouldReduceMotion}
                className="w-16"
              />
            </div>

            {/* SCROLL (far right, vertical) */}
            <div
              className="hidden lg:flex absolute right-0 bottom-0 flex-col items-center gap-2"
              style={{ color: colors.textMuted }}
            >
              <span
                className="text-[9px] font-mono font-bold tracking-[0.26em] uppercase rotate-180"
                style={{ writingMode: "vertical-rl" }}
              >
                SCROLL
              </span>
              <ScrollArrowIcon className="w-3.5 h-3.5 animate-bounce" />
            </div>
          </div>
        </div>

        {/* ── BOTTOM ANCHOR: GIANT FULL-WIDTH OUTLINED TEXT "WHO IS RAJ?" ── */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 sm:mt-32 lg:mt-40 text-center"
        >
          <h2
            className="font-display font-black uppercase tracking-[0.01em] leading-none text-[clamp(4.5rem,15vw,16.5rem)] select-none whitespace-nowrap"
            style={hollowStyle}
          >
            WHO IS RAJ?
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
