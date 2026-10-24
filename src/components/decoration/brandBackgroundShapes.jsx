import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

/**
 * Brand background shapes (light portfolio, soft violet)
 *
 * Motion rules:
 * - `reveal` undefined  -> completely static
 * - `reveal` false      -> hidden (pre-entrance state)
 * - `reveal` true       -> entrance + slow ambient life (morph / float / sheen)
 * - prefers-reduced-motion -> always static
 *
 * Existing export names and props are preserved.
 */

const DEFAULT_COLOR = "var(--brand-primary, #8B5CF6)";
const STOP_0 = "var(--brand-stop-0, #C4B5FD)";
const DEEP = "var(--brand-primary-deep, #6D28D9)";
const EASE = [0.22, 1, 0.36, 1];

/* ──────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────── */
function useUid(prefix = "bs") {
  return `${prefix}-${useId().replace(/:/g, "")}`;
}

/** true only when the shape should be "alive" (revealed + motion allowed) */
function useLive(reveal) {
  const reduce = useReducedMotion();
  return reveal === true && !reduce;
}

function useSlideIn(reveal, from, duration = 1.1, delay = 0) {
  const reduce = useReducedMotion();
  if (reveal === undefined || reduce) return {};
  return {
    initial: { opacity: 0, ...from },
    animate: reveal ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...from },
    transition: { duration, ease: EASE, delay: reveal ? delay : 0 },
    style: { willChange: "transform, opacity" },
  };
}

/** Path that morphs between two same-structure paths when live */
function MorphPath({ d, alt, live, duration = 9, delay = 0, ...rest }) {
  if (!live || !alt) return <path d={d} {...rest} />;
  return (
    <motion.path
      d={d}
      animate={{ d: [d, alt, d] }}
      transition={{ duration, ease: "easeInOut", repeat: Infinity, delay }}
      {...rest}
    />
  );
}

/** Soft brand gradient (light tint -> brand color) */
function BrandGrad({ id, color = DEFAULT_COLOR, x2 = "100%", y2 = "100%" }) {
  return (
    <linearGradient id={id} x1="0%" y1="0%" x2={x2} y2={y2}>
      <stop offset="0%" stopColor={STOP_0} />
      <stop offset="100%" stopColor={color} />
    </linearGradient>
  );
}

/* ──────────────────────────────────────────────
   ShapeFrame
   - outer div: positioning (Tailwind transforms are safe here)
   - motion.div: entrance
   - inner motion.div: ambient float
   - svg: optional horizontal flip (mirror)
   ────────────────────────────────────────────── */
function ShapeFrame({
  className = "",
  children,
  viewBox = "0 0 500 700",
  motionProps = {},
  flip = false,
  floating = false,
  floatAmount = 10,
  floatDuration = 7,
  floatDelay = 0,
}) {
  const floatProps = floating
    ? {
        animate: { y: [0, -floatAmount, 0] },
        transition: {
          duration: floatDuration,
          ease: "easeInOut",
          repeat: Infinity,
          delay: floatDelay,
        },
      }
    : {};

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <motion.div className="h-full w-full" {...motionProps}>
        <motion.div className="h-full w-full" {...floatProps}>
          <svg
            viewBox={viewBox}
            className="h-full w-full"
            style={flip ? { transform: "scaleX(-1)" } : undefined}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {children}
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Portrait backdrop (hero photo ke peeche)
   Entrance: scale + soft tilt, rays draw in one by one.
   Alive: shape breathes (morph), light sheen sweeps across,
   small orbit dots float.
   ────────────────────────────────────────────── */
const PORTRAIT_A =
  "M 140 260 C 70 230, 60 145, 140 125 C 215 105, 260 170, 340 165 C 420 160, 465 105, 540 125 C 620 145, 610 230, 540 260 C 490 285, 530 380, 455 400 C 380 420, 300 420, 225 400 C 150 380, 190 285, 140 260 Z";
const PORTRAIT_B =
  "M 140 260 C 62 238, 72 138, 140 118 C 222 98, 255 182, 340 172 C 425 162, 458 98, 540 118 C 618 138, 618 238, 540 260 C 478 292, 538 372, 455 408 C 380 428, 300 412, 225 408 C 142 372, 200 292, 140 260 Z";

export function BrandPortraitBackdropShape({
  className = "",
  color = DEFAULT_COLOR,
  opacity = 1,
  glow = true,
  reveal, // undefined = static, true/false = animated
  float = false, // ambient life after reveal (morph + float + sheen)
}) {
  const reduce = useReducedMotion();
  const controlled = reveal !== undefined && !reduce;
  const live = controlled && reveal === true && float;
  const uid = useUid("portrait");

  const Ray = controlled ? motion.path : "path";
  const Dot = live ? motion.circle : "circle";

  const rootProps = controlled
    ? {
        initial: { opacity: 0, scale: 0.9, rotate: -2 },
        animate: reveal
          ? { opacity: 1, scale: 1, rotate: 0 }
          : { opacity: 0, scale: 0.9, rotate: -2 },
        transition: { duration: 1, ease: EASE },
        style: { transformOrigin: "center", willChange: "transform, opacity" },
      }
    : {};

  const floatProps = live
    ? {
        animate: { y: [0, -10, 0] },
        transition: {
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 1.2,
        },
      }
    : {};

  const rayProps = (i) =>
    controlled
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: reveal
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 },
          transition: {
            duration: 0.5,
            ease: "easeOut",
            delay: reveal ? 0.5 + i * 0.08 : 0,
          },
        }
      : {};

  const dotProps = (delay, amount) =>
    live
      ? {
          animate: { y: [0, -amount, 0], opacity: [0.45, 0.9, 0.45] },
          transition: {
            duration: 4.5,
            ease: "easeInOut",
            repeat: Infinity,
            delay,
          },
        }
      : {};

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 select-none ${className}`}
      {...rootProps}
    >
      <motion.div className="h-full w-full" {...floatProps}>
        <svg
          viewBox="0 0 680 480"
          className="h-full w-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id={`${uid}-grad`}
              x1="10%"
              y1="10%"
              x2="90%"
              y2="90%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={STOP_0} stopOpacity="0.9" />
              <stop
                offset="38%"
                stopColor="var(--brand-primary, #8B5CF6)"
                stopOpacity="0.96"
              />
              <stop offset="100%" stopColor={DEEP} stopOpacity="1" />
            </linearGradient>

            {glow && (
              <filter
                id={`${uid}-glow`}
                x="-25%"
                y="-25%"
                width="150%"
                height="150%"
              >
                <feGaussianBlur stdDeviation="18" />
              </filter>
            )}

            <linearGradient
              id={`${uid}-crest`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* inner light for depth */}
            <radialGradient id={`${uid}-inner`} cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            {/* sweep highlight */}
            <linearGradient
              id={`${uid}-sweep`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            <clipPath id={`${uid}-clip`}>
              <path d={PORTRAIT_A} />
            </clipPath>
          </defs>

          <g>
            {/* Ambient outer bloom */}
            {glow && (
              <MorphPath
                d={PORTRAIT_A}
                alt={PORTRAIT_B}
                live={live}
                duration={9}
                fill={color}
                fillOpacity={0.42 * opacity}
                filter={`url(#${uid}-glow)`}
              />
            )}

            {/* Main fluid organic shape */}
            <MorphPath
              d={PORTRAIT_A}
              alt={PORTRAIT_B}
              live={live}
              duration={9}
              fill={`url(#${uid}-grad)`}
              fillOpacity={opacity}
            />

            {/* Inner soft light */}
            <path d={PORTRAIT_A} fill={`url(#${uid}-inner)`} />

            {/* Light sweep, clipped to the shape (loops every few seconds) */}
            {live && (
              <g clipPath={`url(#${uid}-clip)`}>
                <motion.g
                  initial={{ x: -260 }}
                  animate={{ x: 760 }}
                  transition={{
                    duration: 1.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 6,
                    delay: 1.4,
                  }}
                >
                  <rect
                    x="0"
                    y="90"
                    width="140"
                    height="340"
                    fill={`url(#${uid}-sweep)`}
                    transform="skewX(-18)"
                  />
                </motion.g>
              </g>
            )}

            {/* Top sheen crest */}
            <path
              d="M 145 135 C 210 118, 260 172, 340 168 C 420 164, 470 118, 535 135"
              stroke={`url(#${uid}-crest)`}
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Accent rays, left */}
            <g
              stroke={color}
              strokeWidth="14"
              strokeLinecap="round"
              opacity={0.95 * opacity}
            >
              <Ray d="M 85 90 L 45 45" {...rayProps(0)} />
              <Ray d="M 60 150 L 10 140" {...rayProps(1)} />
              <Ray d="M 70 210 L 25 240" {...rayProps(2)} />
            </g>

            {/* Accent rays, right */}
            <g
              stroke={color}
              strokeWidth="14"
              strokeLinecap="round"
              opacity={0.95 * opacity}
            >
              <Ray d="M 595 90 L 635 45" {...rayProps(3)} />
              <Ray d="M 620 150 L 670 140" {...rayProps(4)} />
              <Ray d="M 610 210 L 655 240" {...rayProps(5)} />
            </g>

            {/* Small floating accents */}
            <Dot
              cx="96"
              cy="330"
              r="9"
              fill={color}
              fillOpacity={0.55 * opacity}
              {...dotProps(0.4, 9)}
            />
            <Dot
              cx="590"
              cy="320"
              r="6"
              fill={color}
              fillOpacity={0.5 * opacity}
              {...dotProps(1.2, 7)}
            />
            <Dot
              cx="560"
              cy="40"
              r="5"
              fill={color}
              fillOpacity={0.45 * opacity}
              {...dotProps(2, 6)}
            />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Top-left shape (hero / about)
   ────────────────────────────────────────────── */
export function BrandTopLeftShape({
  variant = "hero",
  className = "",
  opacity,
  color = DEFAULT_COLOR,
  reveal,
}) {
  const about = variant === "about";
  const alpha = opacity ?? (about ? 0.13 : 0.11);
  const motionProps = useSlideIn(reveal, { x: -60 }, 1.2);
  const live = useLive(reveal);
  const gid = useUid("tl");

  return (
    <ShapeFrame
      viewBox="0 0 560 760"
      motionProps={motionProps}
      className={`absolute left-0 top-0 z-0 ${
        about
          ? "h-[65vh] min-h-[420px] w-[30vw] min-w-[180px] max-w-[420px]"
          : "h-[58vh] min-h-[380px] w-[34vw] min-w-[210px] max-w-[480px]"
      } ${className}`}
    >
      <defs>
        <BrandGrad id={gid} color={color} x2="80%" y2="100%" />
      </defs>
      <MorphPath
        live={live}
        duration={11}
        d="M0 0H500C470 100 430 155 350 220C270 285 300 370 220 450C150 520 75 555 0 590Z"
        alt="M0 0H500C480 105 420 150 360 230C280 280 290 380 230 440C140 530 80 550 0 590Z"
        fill={`url(#${gid})`}
        fillOpacity={alpha * 0.8}
      />
      <MorphPath
        live={live}
        duration={9}
        delay={0.6}
        d="M0 0H390C365 90 325 145 260 200C190 260 220 340 155 410C100 470 45 500 0 520Z"
        alt="M0 0H390C375 95 315 140 270 210C180 270 230 345 145 415C105 465 40 505 0 520Z"
        fill={color}
        fillOpacity={alpha}
      />
      <MorphPath
        live={live}
        duration={8}
        delay={1.2}
        d="M0 0H275C255 75 220 120 165 165C110 210 130 270 90 320C55 360 25 380 0 395Z"
        alt="M0 0H275C262 80 210 115 175 175C105 205 140 275 80 325C60 355 20 385 0 395Z"
        fill="white"
        fillOpacity="0.3"
      />
    </ShapeFrame>
  );
}

/* ──────────────────────────────────────────────
   Side waves
   ────────────────────────────────────────────── */
function SideWave({
  mirror = false,
  className = "",
  opacity = 0.13,
  color = DEFAULT_COLOR,
  position = "top",
  reveal,
}) {
  const vertical =
    position === "bottom-raised"
      ? "bottom-20 sm:bottom-28"
      : position === "middle"
        ? "top-1/2 -translate-y-1/2"
        : position === "bottom"
          ? "bottom-0"
          : "top-0";

  const motionProps = useSlideIn(reveal, { x: mirror ? 60 : -60 }, 1.2);
  const live = useLive(reveal);
  const gid = useUid("sw");

  return (
    <ShapeFrame
      viewBox="0 0 420 760"
      flip={mirror}
      motionProps={motionProps}
      floating={live}
      floatAmount={8}
      floatDuration={8}
      className={`absolute ${vertical} ${
        mirror ? "right-0" : "left-0"
      } z-0 h-[72vh] min-h-[420px] w-[26vw] min-w-[170px] max-w-[350px] ${className}`}
    >
      <defs>
        <BrandGrad id={gid} color={color} x2="90%" y2="100%" />
      </defs>
      <MorphPath
        live={live}
        duration={10}
        d="M0 90C115 90 225 145 225 245C225 325 145 355 145 420C145 495 275 525 275 620C275 700 160 735 0 735Z"
        alt="M0 90C125 100 235 150 215 250C205 330 155 345 155 420C155 490 265 535 285 615C290 695 150 735 0 735Z"
        fill={color}
        fillOpacity={opacity * 0.6}
      />
      <MorphPath
        live={live}
        duration={8}
        delay={0.8}
        d="M0 145C90 145 175 185 175 265C175 330 112 365 112 420C112 480 220 510 220 600C220 665 135 690 0 690Z"
        alt="M0 145C95 155 185 190 168 268C160 330 120 360 120 420C120 478 210 515 228 598C228 662 130 690 0 690Z"
        fill={`url(#${gid})`}
        fillOpacity={opacity * 1.1}
      />
      <path
        d="M0 190C70 190 125 220 125 280C125 335 80 365 80 420C80 465 160 500 160 580"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </ShapeFrame>
  );
}

export function BrandSectionSideWave(props) {
  return <SideWave {...props} />;
}

export function BrandSectionRightWave(props) {
  return <SideWave mirror {...props} />;
}

/* ──────────────────────────────────────────────
   Bottom hero wave: rises up, then gently rolls
   ────────────────────────────────────────────── */
export function BrandBottomHeroWave({
  className = "",
  opacity = 0.16,
  color = DEFAULT_COLOR,
  reveal,
}) {
  const motionProps = useSlideIn(reveal, { y: 50 }, 1.1);
  const live = useLive(reveal);
  const gid = useUid("bw");

  return (
    <ShapeFrame
      viewBox="0 0 1440 340"
      motionProps={motionProps}
      className={`absolute bottom-0 left-0 right-0 z-0 h-[24vh] min-h-[120px] max-h-[260px] ${className}`}
    >
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} />
          <stop offset="50%" stopColor={STOP_0} />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
      </defs>
      <MorphPath
        live={live}
        duration={10}
        d="M0 235C190 175 330 270 510 275C710 280 790 165 970 190C1150 215 1270 275 1440 170V340H0Z"
        alt="M0 215C190 195 330 250 510 262C710 285 790 185 970 175C1150 200 1270 262 1440 190V340H0Z"
        fill={color}
        fillOpacity={opacity * 0.65}
      />
      <MorphPath
        live={live}
        duration={8}
        delay={0.7}
        d="M0 275C210 220 340 305 520 305C710 305 800 210 970 230C1150 250 1290 305 1440 215V340H0Z"
        alt="M0 262C210 238 340 295 520 292C710 312 800 225 970 212C1150 240 1290 292 1440 228V340H0Z"
        fill={`url(#${gid})`}
        fillOpacity={opacity}
      />
      <MorphPath
        live={live}
        duration={8}
        delay={0.7}
        d="M0 275C210 220 340 305 520 305C710 305 800 210 970 230C1150 250 1290 305 1440 215"
        alt="M0 262C210 238 340 295 520 292C710 312 800 225 970 212C1150 240 1290 292 1440 228"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
    </ShapeFrame>
  );
}

/* ──────────────────────────────────────────────
   Accent shapes
   ────────────────────────────────────────────── */
function Accent({
  mirror = false,
  className = "",
  opacity = 0.12,
  color = DEFAULT_COLOR,
  reveal,
}) {
  const motionProps = useSlideIn(reveal, { x: mirror ? 50 : -50 }, 1.1);
  const live = useLive(reveal);
  const gid = useUid("ac");
  const Dot = live ? motion.circle : "circle";

  const dot = (delay, amount) =>
    live
      ? {
          animate: { y: [0, -amount, 0] },
          transition: {
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            delay,
          },
        }
      : {};

  return (
    <ShapeFrame
      viewBox="0 0 420 720"
      flip={mirror}
      motionProps={motionProps}
      floating={live}
      floatAmount={6}
      floatDuration={9}
      className={`absolute ${
        mirror ? "right-0" : "left-0"
      } z-0 hidden h-[65vh] max-h-[620px] w-[25vw] min-w-[180px] max-w-[340px] md:block ${className}`}
    >
      <defs>
        <BrandGrad id={gid} color={color} x2="80%" y2="100%" />
      </defs>
      <path
        d="M0 0C90 50 150 120 165 215C180 315 110 375 110 460C110 555 160 620 0 720Z"
        fill={`url(#${gid})`}
        fillOpacity={opacity * 1.1}
      />
      <path
        d="M0 45C65 85 115 145 125 220C138 300 80 365 80 440C80 510 115 570 0 650"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Dot
        cx="220"
        cy="155"
        r="15"
        fill={color}
        fillOpacity={opacity * 1.5}
        {...dot(0, 8)}
      />
      <Dot
        cx="198"
        cy="240"
        r="7"
        fill={color}
        fillOpacity={opacity * 1.2}
        {...dot(1, 6)}
      />
    </ShapeFrame>
  );
}

export function BrandLeftAccentShape({
  className = "",
  opacity = 0.12,
  color = DEFAULT_COLOR,
  reveal,
}) {
  return (
    <Accent
      className={className}
      opacity={opacity}
      color={color}
      reveal={reveal}
    />
  );
}

export function BrandRightAccentShape({
  className = "",
  opacity = 0.12,
  color = DEFAULT_COLOR,
  reveal,
}) {
  return (
    <Accent
      mirror
      className={className}
      opacity={opacity}
      color={color}
      reveal={reveal}
    />
  );
}

export function BrandBottomRightShape({
  className = "",
  opacity = 0.14,
  color = DEFAULT_COLOR,
  reveal,
}) {
  const motionProps = useSlideIn(reveal, { x: 50, y: 30 }, 1.1);
  const gid = useUid("br");

  return (
    <ShapeFrame
      viewBox="0 0 460 400"
      motionProps={motionProps}
      className={`absolute bottom-0 right-0 z-0 h-[30vh] max-h-[300px] w-[30vw] max-w-[360px] ${className}`}
    >
      <defs>
        <BrandGrad id={gid} color={color} x2="100%" y2="60%" />
      </defs>
      <path
        d="M460 400H50C145 320 225 285 270 205C315 125 385 45 460 10Z"
        fill={color}
        fillOpacity={opacity * 0.65}
      />
      <path
        d="M460 400H130C210 335 265 300 300 240C340 170 400 100 460 65Z"
        fill={`url(#${gid})`}
        fillOpacity={opacity * 1.1}
      />
      <path
        d="M460 170A230 230 0 0 0 230 400"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
    </ShapeFrame>
  );
}

/* ──────────────────────────────────────────────
   Journey card corner wave
   ────────────────────────────────────────────── */
export function BrandCardCornerWave({
  position = "top-right",
  className = "",
  color = DEFAULT_COLOR,
  opacity = 1,
  reveal,
}) {
  const gradientId = useUid("cc");
  const reduce = useReducedMotion();
  const controlled = reveal !== undefined && !reduce;
  const live = useLive(reveal);
  const left = position === "top-left";

  const entrance = controlled
    ? {
        initial: { opacity: 0, scale: 0.85 },
        animate: reveal
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.85 },
        transition: { duration: 0.9, ease: EASE },
        style: {
          transformOrigin: left ? "top left" : "top right",
          willChange: "transform, opacity",
        },
      }
    : {};

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 select-none ${
        left ? "left-0 top-0" : "right-0 top-0"
      } ${className}`}
      style={{ opacity }}
    >
      <motion.div className="h-full w-full" {...entrance}>
        <svg
          viewBox="0 0 300 260"
          preserveAspectRatio="none"
          fill="none"
          className="h-full w-full"
          style={left ? { transform: "scaleX(-1)" } : undefined}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="35"
              y1="10"
              x2="270"
              y2="225"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={STOP_0} />
              <stop offset="48%" stopColor="var(--brand-primary, #8B5CF6)" />
              <stop offset="100%" stopColor={DEEP} />
            </linearGradient>
          </defs>

          {/* Outer flowing layer */}
          <path
            d="M0 0H300V260C277 239 260 213 236 195C210 175 187 173 164 163C133 150 119 127 121 96C123 65 139 33 121 0H0Z"
            fill={STOP_0}
            fillOpacity="0.9"
          />

          {/* Main gradient layer */}
          <MorphPath
            live={live}
            duration={8}
            d="M30 0H300V222C279 203 260 181 239 166C217 150 193 149 172 137C146 122 137 101 141 75C145 48 158 21 150 0H30Z"
            alt="M30 0H300V222C282 200 264 184 244 170C220 156 190 152 168 142C142 128 134 104 140 80C146 52 160 24 150 0H30Z"
            fill={`url(#${gradientId})`}
            fillOpacity="0.5"
          />

          {/* Inner organic layer */}
          <MorphPath
            live={live}
            duration={6}
            delay={0.5}
            d="M66 0H300V179C280 163 263 149 245 139C224 128 203 125 187 112C169 98 163 79 168 57C172 36 180 16 175 0H66Z"
            alt="M66 0H300V179C282 160 266 152 248 142C222 134 200 118 190 108C172 95 160 82 165 60C170 38 183 18 175 0H66Z"
            fill={DEEP}
            fillOpacity="0.3"
          />

          {/* Top highlight */}
          <path
            d="M30 0H300"
            stroke={color}
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>
    </div>
  );
}

/* Backward-compatible alias (switcher used this name before) */
export const BrandJourneyCardBlob = ({
  position,
  className,
  color,
  reveal,
}) => (
  <BrandCardCornerWave
    position={position}
    className={className}
    color={color}
    reveal={reveal}
  />
);

/* ──────────────────────────────────────────────
   CTA bottom wave
   ────────────────────────────────────────────── */
export function BrandCtaBottomWave({
  className = "",
  color = DEFAULT_COLOR,
  opacity = 0.14,
  reveal,
}) {
  const motionProps = useSlideIn(reveal, { x: -50, y: 30 }, 1.1);
  const live = useLive(reveal);
  const gid = useUid("cta");

  return (
    <ShapeFrame
      viewBox="0 0 620 380"
      motionProps={motionProps}
      className={`absolute bottom-0 left-0 z-0 h-[30vh] min-h-[150px] w-[48vw] max-w-[520px] ${className}`}
    >
      <defs>
        <BrandGrad id={gid} color={color} x2="100%" y2="40%" />
      </defs>
      <MorphPath
        live={live}
        duration={9}
        d="M0 380H460C370 295 285 235 185 215C95 195 40 115 0 55V380Z"
        alt="M0 380H460C375 310 280 225 195 225C100 205 45 125 0 70V380Z"
        fill={`url(#${gid})`}
        fillOpacity={opacity * 1.1}
      />
      <path
        d="M0 60C40 120 90 200 180 220C280 240 360 300 450 380"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </ShapeFrame>
  );
}

/* ──────────────────────────────────────────────
   Switcher
   ────────────────────────────────────────────── */
export function BrandBackgroundShapes({
  position = "top-left",
  variant = "hero",
  className = "",
  blobPos = "top-right",
  blobSize = "md", // kept for API compatibility
  opacity,
  color = DEFAULT_COLOR,
  reveal,
}) {
  switch (position) {
    case "top-left":
      return (
        <BrandTopLeftShape
          variant={variant}
          className={className}
          opacity={opacity}
          color={color}
          reveal={reveal}
        />
      );
    case "bottom-hero":
      return (
        <BrandBottomHeroWave
          className={className}
          opacity={opacity ?? 0.16}
          color={color}
          reveal={reveal}
        />
      );
    case "right-accent":
      return (
        <BrandRightAccentShape
          className={className}
          opacity={opacity ?? 0.12}
          color={color}
          reveal={reveal}
        />
      );
    case "left-accent":
      return (
        <BrandLeftAccentShape
          className={className}
          opacity={opacity ?? 0.12}
          color={color}
          reveal={reveal}
        />
      );
    case "bottom-right":
      return (
        <BrandBottomRightShape
          className={className}
          opacity={opacity ?? 0.14}
          color={color}
          reveal={reveal}
        />
      );
    case "card-blob":
      return (
        <BrandCardCornerWave
          position={blobPos}
          className={className}
          color={color}
          opacity={opacity ?? 1}
          reveal={reveal}
        />
      );
    case "cta-bottom":
      return (
        <BrandCtaBottomWave
          className={className}
          color={color}
          opacity={opacity ?? 0.14}
          reveal={reveal}
        />
      );
    default:
      return null;
  }
}

export {
  BrandPortraitBackdropShape as OrangePortraitBackdropShape,
  BrandTopLeftShape as OrangeTopLeftShape,
  BrandSectionSideWave as OrangeSectionSideWave,
  BrandSectionRightWave as OrangeSectionRightWave,
  BrandBottomHeroWave as OrangeBottomHeroWave,
  BrandLeftAccentShape as OrangeLeftAccentShape,
  BrandRightAccentShape as OrangeRightAccentShape,
  BrandBottomRightShape as OrangeBottomRightShape,
  BrandCtaBottomWave as OrangeCtaBottomWave,
  BrandBackgroundShapes as OrangeBackgroundShapes,
  BrandCardCornerWave as OrangeCardCornerWave,
};

export default BrandBackgroundShapes;
