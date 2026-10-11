import React from "react";

/**
 * =============================================================================
 * DOODLE CARD & BADGE (Handcrafted Caveat Doodles with Curved Arrows)
 * =============================================================================
 * Signature human/handwritten touch with Caveat font and sketchy arrows.
 */
export default function DoodleCard({
  text,
  arrowPath = "M 55 10 C 50 35, 30 45, 15 52",
  arrowheadPath = "M 26 42 L 14 52 L 24 62",
  arrowClass = "w-10 h-10 sm:w-14 sm:h-14",
  containerClass = "",
  textClass = "text-xl sm:text-2xl lg:text-[1.55rem]",
  rotation = "-rotate-6",
  showSunburst = true,
  forwardRef,
}) {
  return (
    <div
      ref={forwardRef}
      className={`pointer-events-none select-none flex flex-col ${containerClass}`}
      aria-hidden="true"
    >
      <div className="flex items-start gap-1">
        <span
          className={`font-doodle font-bold text-[#111111] leading-tight ${rotation} ${textClass}`}
        >
          {text}
        </span>
        {showSunburst && (
          <div className="pt-0.5 text-[#FF9500] flex-shrink-0">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="4" y1="12" x2="1" y2="8" />
              <line x1="8" y1="6" x2="8" y2="2" />
              <line x1="14" y1="8" x2="18" y2="4" />
            </svg>
          </div>
        )}
      </div>
      {arrowPath && (
        <div className="mr-4 sm:mr-8 -mt-1">
          <svg
            className={`text-[#111111] ${arrowClass}`}
            viewBox="0 0 70 70"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={arrowPath} />
            {arrowheadPath && <path d={arrowheadPath} />}
          </svg>
        </div>
      )}
    </div>
  );
}

/**
 * LeftDoodle — Hero profile stacked "Code / Design / Build / Repeat"
 */
export function LeftDoodle({ forwardRef, className = "" }) {
  return (
    <div
      ref={forwardRef}
      className={`pointer-events-none absolute top-[36%] sm:top-[38%] left-1 sm:-left-4 lg:-left-10 z-20 flex flex-col items-center select-none ${className}`}
      aria-hidden="true"
    >
      <span className="font-doodle text-base sm:text-lg lg:text-xl font-bold text-[#222222] leading-tight text-center -rotate-12">
        Code
        <br />
        Design
        <br />
        Build
        <br />
        Repeat
      </span>
      <div className="mt-0.5 ml-3">
        <svg
          className="w-7 h-7 sm:w-9 sm:h-9 text-[#111111]"
          viewBox="0 0 50 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 12 10 C 15 25, 22 32, 38 34" />
          <path d="M 28 26 L 38 34 L 28 42" />
        </svg>
      </div>
    </div>
  );
}

/**
 * HandwrittenBadge — Reusable contextual handwritten doodle note with sketchy curved arrows.
 * Can be placed in About, Works, Services, and Contact.
 */
export function HandwrittenBadge({
  text,
  direction = "down-right", // 'down-right' | 'down-left' | 'curved-right' | 'up-right'
  className = "",
  rotation = "-rotate-6",
  textClass = "text-base sm:text-lg lg:text-xl",
  textColor = "text-[#111111]",
}) {
  return (
    <div
      className={`pointer-events-none select-none inline-flex flex-col items-start ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5">
        <span
          className={`font-doodle font-bold leading-tight ${rotation} ${textColor} ${textClass}`}
        >
          {text}
        </span>
      </div>

      {direction === "down-right" && (
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10 text-[#111111] mt-0.5 ml-4 -rotate-6"
          viewBox="0 0 50 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 12 10 C 15 25, 22 32, 38 34" />
          <path d="M 28 26 L 38 34 L 28 42" />
        </svg>
      )}

      {direction === "down-left" && (
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10 text-[#111111] mt-0.5 ml-1 rotate-12"
          viewBox="0 0 50 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 38 10 C 35 25, 28 32, 12 34" />
          <path d="M 22 26 L 12 34 L 22 42" />
        </svg>
      )}

      {direction === "curved-right" && (
        <svg
          className="w-10 h-7 text-[#111111] mt-0.5 ml-2"
          viewBox="0 0 60 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 8 28 C 24 34, 40 28, 50 14" />
          <path d="M 38 12 L 50 14 L 46 25" />
        </svg>
      )}

      {direction === "up-right" && (
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10 text-[#111111] -mt-1 ml-4"
          viewBox="0 0 50 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 12 38 C 18 22, 28 16, 38 14" />
          <path d="M 26 12 L 38 14 L 34 26" />
        </svg>
      )}
    </div>
  );
}
