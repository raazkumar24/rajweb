import React, { useEffect } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "motion/react";

/* Magic UI jaisa circular progress (same props), bina extra dependency ke.
   Props: value, min, max, gaugePrimaryColor, gaugeSecondaryColor, className */
export default function AnimatedCircularProgressBar({
  value = 0,
  min = 0,
  max = 100,
  gaugePrimaryColor = "#8B5CF6",
  gaugeSecondaryColor = "rgba(0, 0, 0, 0.1)",
  className = "",
}) {
  const shouldReduceMotion = useReducedMotion();

  const percent = Math.min(
    Math.max(((value - min) / (max - min)) * 100, 0),
    100,
  );

  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  const progress = useMotionValue(0);
  const dashOffset = useTransform(
    progress,
    (p) => circumference - (p / 100) * circumference,
  );
  const label = useTransform(progress, (p) => Math.round(p));

  useEffect(() => {
    const controls = animate(
      progress,
      percent,
      shouldReduceMotion
        ? { duration: 0 }
        : { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
    );
    return () => controls.stop();
  }, [percent, progress, shouldReduceMotion]);

  return (
    <div
      role="progressbar"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      className={`relative size-14 text-xs font-bold ${className}`}
    >
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="10"
          stroke={gaugeSecondaryColor}
        />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          stroke={gaugePrimaryColor}
          strokeDasharray={circumference}
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>
      <motion.span className="absolute inset-0 flex items-center justify-center text-[#111111]">
        {label}
      </motion.span>
    </div>
  );
}
