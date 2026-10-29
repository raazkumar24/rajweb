import React from "react";
import { motion, useReducedMotion } from "motion/react";

const marqueeItems = [
  { text: "Full-Stack Web Apps", type: "service" },
  { text: "React 19", type: "tech" },
  { text: "Custom Figma / XD Design", type: "service" },
  { text: "Node.js & Express", type: "tech" },
  { text: "Figma to React Implementation", type: "service" },
  { text: "MongoDB", type: "tech" },
  { text: "Interactive GSAP Experiences", type: "service" },
  { text: "Tailwind CSS", type: "tech" },
  { text: "E-Commerce & Stripe Checkout", type: "service" },
  { text: "REST APIs & WebSockets", type: "tech" },
];

/* Same 4-point star used inside the rotating stamp badge */
function StarSeparator({ className = "" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`shrink-0 ${className}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M 50 0 Q 50 50 0 50 Q 50 50 50 100 Q 50 50 100 50 Q 50 50 50 0 Z" />
    </svg>
  );
}

export default function Marquee({
  show = true,
  heroMode = "red",
  speed = 38, // seconds for one full loop — higher = slower
}) {
  const isRedTheme = heroMode === "red";
  const shouldReduceMotion = useReducedMotion();

  // Same palette as the Journey / Toolkit sections
  const c = isRedTheme
    ? {
        bg: "#C81D1D",
        service: "#FFFFFF",
        tech: "rgba(255, 255, 255, 0.82)",
        techBorder: "rgba(255, 255, 255, 0.35)",
        star: "#121212",
        border: "rgba(0, 0, 0, 0.35)",
        fade: "#C81D1D",
      }
    : {
        bg: "#121212",
        service: "#F5F3EF",
        tech: "rgba(245, 243, 239, 0.75)",
        techBorder: "rgba(245, 243, 239, 0.25)",
        star: "#C81D1D",
        border: "rgba(255, 255, 255, 0.1)",
        fade: "#121212",
      };

  return (
    <motion.div
      aria-label="Technologies and Services marquee"
      initial={{ opacity: 0, y: 24 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full shrink-0 overflow-hidden z-30 select-none transition-colors duration-700"
      style={{
        background: c.bg,
        borderTop: `1px solid ${c.border}`,
        borderBottom: `1px solid ${c.border}`,
      }}
    >
      {/* Self-contained keyframes (no Tailwind config needed) */}
      <style>{`
        @keyframes home-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.3333%); }
        }
        .home-marquee-track { animation: home-marquee ${speed}s linear infinite; }
        .group:hover .home-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .home-marquee-track { animation: none; }
        }
      `}</style>

      {/* Film grain, same as the sections */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "240px",
        }}
      />

      {/* Edge fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 sm:w-24"
        style={{ background: `linear-gradient(90deg, ${c.fade}, transparent)` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 sm:w-24"
        style={{
          background: `linear-gradient(270deg, ${c.fade}, transparent)`,
        }}
      />

      <div className="relative z-10 py-3.5 sm:py-4">
        <div
          className={`flex w-max items-center ${
            shouldReduceMotion ? "" : "home-marquee-track"
          }`}
        >
          {/* 3 copies = seamless loop (track moves by exactly one copy) */}
          {[0, 1, 2].map((copyIndex) => (
            <div
              key={copyIndex}
              aria-hidden={copyIndex > 0}
              className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10"
            >
              {marqueeItems.map((item, idx) => (
                <div
                  key={`${copyIndex}-${idx}`}
                  className="flex items-center gap-6 sm:gap-10"
                >
                  {item.type === "service" ? (
                    <span
                      className="whitespace-nowrap font-display text-sm sm:text-lg font-black uppercase tracking-tight"
                      style={{ color: c.service }}
                    >
                      {item.text}
                    </span>
                  ) : (
                    <span
                      className="whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest"
                      style={{ color: c.tech, borderColor: c.techBorder }}
                    >
                      [ {item.text} ]
                    </span>
                  )}

                  <StarSeparator
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                    style={undefined}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Star colour (kept in one place) */}
      <style>{`
        .home-marquee-track svg { color: ${c.star}; }
      `}</style>
    </motion.div>
  );
}
