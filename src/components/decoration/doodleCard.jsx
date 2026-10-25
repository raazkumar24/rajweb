import React from "react";

/**
 * Shared handwritten title.
 * Text is provided wherever the component is used.
 */
export function TitleDoodle({
  text,
  className = "",
  textClass = "text-xl sm:text-2xl",
  rotation = "-rotate-6",
  textColor = "text-[#171717]",
}) {
  if (!text) return null;

  return (
    <span
      aria-hidden="true"
      className={`font-doodle font-bold leading-tight ${rotation} ${textColor} ${textClass} ${className}`}
    >
      {text}
    </span>
  );
}

/**
 * Shared hand-drawn arrow.
 */
function SketchArrow({ direction = "down-left", className = "" }) {
  const arrows = {
    // 1. Curves down and left (clear two-winged arrowhead pointing down-left)
    "down-left": {
      line: "M 48 6 C 44 20, 32 34, 16 46",
      head: "M 24 32 L 16 46 L 28 52",
    },
    // 2. Curves down and right (clear two-winged arrowhead pointing down-right)
    "down-right": {
      line: "M 16 6 C 20 20, 32 34, 48 46",
      head: "M 40 32 L 48 46 L 36 52",
    },
    // 3. Swooping arc down-right (e.g. for Hero / CTA buttons)
    "curved-down-right": {
      line: "M 8 10 C 18 6, 36 12, 46 44",
      head: "M 32 34 L 46 44 L 54 32",
    },
    // 4. Swooping arc down-left
    "curved-down-left": {
      line: "M 56 10 C 46 6, 28 12, 18 44",
      head: "M 32 34 L 18 44 L 10 32",
    },
    // 5. Arching over and down-right
    "arc-down-right": {
      line: "M 10 24 C 14 8, 40 8, 46 44",
      head: "M 32 34 L 46 44 L 54 32",
    },
    // 6. Arching over and down-left
    "arc-down-left": {
      line: "M 54 24 C 50 8, 24 8, 18 44",
      head: "M 32 34 L 18 44 L 10 32",
    },
    // 7. Smooth horizontal pointing right
    right: {
      line: "M 8 30 C 20 26, 34 26, 50 30",
      head: "M 38 20 L 50 30 L 38 40",
    },
    // 8. Smooth horizontal pointing left
    left: {
      line: "M 56 30 C 44 26, 30 26, 14 30",
      head: "M 26 20 L 14 30 L 26 40",
    },
    // 9. Swooping upward and to the right
    "curved-right": {
      line: "M 8 44 C 20 44, 34 36, 48 18",
      head: "M 34 14 L 48 18 L 44 30",
    },
    // 10. Pointing up and right
    "up-right": {
      line: "M 10 48 C 18 34, 30 22, 48 12",
      head: "M 34 14 L 48 12 L 46 26",
    },
  };

  const selected = arrows[direction] || arrows["down-left"];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`pointer-events-none overflow-visible shrink-0 ${className}`}
    >
      <path d={selected.line} />
      <path d={selected.head} />
    </svg>
  );
}

/**
 * Right-side doodle.
 * Text and placement are controlled by the caller.
 */
export function RightDoodle({
  text,
  forwardRef,
  className = "",
  textClass = "text-md sm:text-lg lg:text-xl",
  rotation = "-rotate-6",
  textColor = "text-[#171717]",
  arrowDirection = "down-left",
  arrowClass = "h-10 w-10 sm:h-12 sm:w-12",
  showArrow = true,
  showSunburst = false,
}) {
  return (
    <div
      ref={forwardRef}
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 flex flex-col select-none ${textColor} ${className}`}
    >
      <div className="flex items-start gap-1.5">
        <TitleDoodle
          text={text}
          textClass={textClass}
          rotation={rotation}
          textColor={textColor}
        />
      </div>

      {showArrow && (
        <SketchArrow
          direction={arrowDirection}
          className={`${arrowClass} mt-1 ${
            arrowDirection === "down-right"
              ? "mr-3 self-end"
              : "ml-2 self-start"
          }`}
        />
      )}
    </div>
  );
}

/**
 * Left-side doodle.
 * No fixed title or words.
 */
export function LeftDoodle({
  text,
  forwardRef,
  className = "",
  textClass = "text-md sm:text-lg lg:text-xl",
  rotation = "-rotate-[9deg]",
  textColor = "text-[#171717]",
  arrowDirection = "down-right",
  arrowClass = "h-9 w-9 sm:h-11 sm:w-11",
  showArrow = true,
}) {
  return (
    <div
      ref={forwardRef}
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-[19%] left-0 z-20 flex flex-col items-center select-none ${textColor} ${className}`}
    >
      <TitleDoodle
        text={text}
        textClass={`text-center leading-[1.12] ${textClass}`}
        rotation={rotation}
        textColor={textColor}
      />

      {showArrow && (
        <SketchArrow
          direction={arrowDirection}
          className={`${arrowClass} mt-1`}
        />
      )}
    </div>
  );
}

/**
 * Reusable handwritten badge for any section.
 * Smart layout: downward arrows automatically position under the text and align toward target.
 */
export function HandwrittenBadge({
  text,
  direction,
  arrowDirection = "down-left",
  className = "",
  rotation = "-rotate-3",
  textClass = "text-sm sm:text-base",
  textColor = "text-[#333333]",
  arrowClass = "h-8 w-8 sm:h-9 sm:w-9",
  showArrow = true,
  layout = "auto",
  arrowPosition = "auto",
}) {
  const activeDirection =
    arrowDirection !== "down-right"
      ? arrowDirection
      : direction || arrowDirection;

  const isDown = activeDirection.includes("down");
  const isCol = layout === "col" || (layout === "auto" && isDown);

  const placeAfter =
    arrowPosition === "after" ||
    (arrowPosition === "auto" && isDown) ||
    arrowPosition !== "before";

  const arrowAlign = isCol
    ? activeDirection.includes("left")
      ? "self-start ml-2 mt-0.5"
      : "self-end mr-2 mt-0.5"
    : "shrink-0";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none inline-flex ${
        isCol ? "flex-col items-start" : "flex-row items-center gap-1.5"
      } ${textColor} select-none ${className}`}
    >
      {showArrow && !placeAfter && (
        <SketchArrow
          direction={activeDirection}
          className={`${arrowClass} ${arrowAlign}`}
        />
      )}

      <TitleDoodle
        text={text}
        rotation={rotation}
        textClass={textClass}
        textColor={textColor}
      />

      {showArrow && placeAfter && (
        <SketchArrow
          direction={activeDirection}
          className={`${arrowClass} ${arrowAlign}`}
        />
      )}
    </div>
  );
}

export default RightDoodle;
