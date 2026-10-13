import React from "react";

const techItems = [
  { name: "HTML", color: "white" },
  { name: "CSS", color: "brand" },
  { name: "JAVASCRIPT", color: "white" },
  { name: "REACT", color: "brand" },
  { name: "NODE.JS", color: "white" },
  { name: "MONGODB", color: "brand" },
  { name: "EXPRESS.JS", color: "white" },
  { name: "TAILWIND", color: "brand" },
];

export default function Marquee() {
  return (
    <div
      className="relative w-full shrink-0 overflow-hidden bg-[#0A0A0A] py-2.5 sm:py-3 z-40 border-t border-white/5 select-none"
      style={{
        opacity: 0,
        animation: "marquee-fadein 0.6s ease forwards",
        animationDelay: "2.0s",
      }}
    >
      <div className="flex w-max animate-marquee items-center">
        {/* Render 3 copies for ultra-smooth seamless looping on wide screens */}
        {[0, 1, 2].map((copyIndex) => (
          <div
            key={copyIndex}
            aria-hidden={copyIndex > 0}
            className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10"
          >
            {techItems.map((item, idx) => (
              <div key={`${copyIndex}-${idx}`} className="flex items-center gap-6 sm:gap-10">
                <span
                  className={`whitespace-nowrap font-black italic uppercase text-lg sm:text-2xl md:text-[1.65rem] tracking-tight transition-all duration-300 hover:scale-105 ${
                    item.color === "brand" ? "text-brand" : "text-white"
                  }`}
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {item.name}
                </span>

                {/* Brand accent plus '+' symbol matching image */}
                <span className="text-brand font-bold text-base sm:text-xl">
                  +
                </span>
              </div>
            ))}

            {/* Sleek arrow matching the end of the line in the reference image */}
            <div className="flex items-center gap-2 pl-2">
              <span className="h-[2px] w-12 sm:w-20 bg-white/70 inline-block"></span>
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 text-white/70"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>

            <span className="text-brand font-bold text-base sm:text-xl">
              +
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}