import React from "react";
import { motion } from "motion/react";

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

export default function Marquee({ show = true }) {
  return (
    <motion.div
      aria-label="Technologies and Services marquee"
      initial={{ opacity: 0, y: 24 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full shrink-0 overflow-hidden bg-[#0F0F11] py-3.5 z-30 border-y border-white/8 select-none"
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none items-center">
        {/* Render 3 copies for smooth continuous loop */}
        {[0, 1, 2].map((copyIndex) => (
          <div
            key={copyIndex}
            aria-hidden={copyIndex > 0}
            className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
          >
            {marqueeItems.map((item, idx) => (
              <div
                key={`${copyIndex}-${idx}`}
                className="flex items-center gap-8 sm:gap-12"
              >
                <span
                  className={`whitespace-nowrap text-xs sm:text-sm tracking-tight ${
                    item.type === "service"
                      ? "font-display text-white font-medium"
                      : "font-mono text-brand-light font-normal text-[11px] sm:text-xs tracking-normal"
                  }`}
                >
                  {item.text}
                </span>

                <span
                  className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
