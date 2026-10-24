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
    "down-left": {
      line: "M 54 5 C 51 23, 36 39, 14 49",
      head: "M 27 38 L 14 49 L 28 51",
    },
    "down-right": {
      line: "M 6 5 C 10 25, 26 40, 47 48",
      head: "M 33 37 L 47 48 L 33 51",
    },
    "curved-right": {
      line: "M 5 30 C 20 37, 36 28, 48 12",
      head: "M 35 11 L 48 12 L 45 25",
    },
    "up-right": {
      line: "M 8 42 C 17 24, 29 14, 44 9",
      head: "M 31 8 L 44 9 L 40 22",
    },
    right: {
      line: "M 5 27 C 20 13, 39 14, 53 25",
      head: "M 41 15 L 53 25 L 41 33",
    },
    left: {
      line: "M 55 27 C 40 13, 21 14, 7 25",
      head: "M 19 15 L 7 25 L 19 33",
    },
    "arc-down-right": {
      line: "M 48 8 C 22 16, 12 36, 38 52",
      head: "M 32 38 L 38 52 L 23 49",
    },
    "curved-down-right": {
      line: "M 48 8 C 22 16, 12 36, 38 52",
      head: "M 32 38 L 38 52 L 23 49",
    },
    "arc-down-left": {
      line: "M 12 8 C 38 16, 48 36, 22 52",
      head: "M 28 38 L 22 52 L 37 49",
    },
  };

  const selected = arrows[direction] || arrows["down-left"];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`pointer-events-none overflow-visible ${className}`}
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
      className={`pointer-events-none absolute z-20 flex flex-col select-none ${className}`}
    >
      <div className="flex items-start gap-1.5">
        <TitleDoodle
          text={text}
          textClass={textClass}
          rotation={rotation}
          textColor={textColor}
        />

        {/* {showSunburst && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-brand sm:h-6 sm:w-6"
          >
            <path d="M12 2v4 M20 5l-3 3 M22 13h-4 M5 4l3 4" />
          </svg>
        )} */}
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
      className={`pointer-events-none absolute bottom-[19%] left-0 z-20 flex flex-col items-center select-none ${className}`}
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
 */
export function HandwrittenBadge({
  text,
  direction,
  arrowDirection = "down-right",
  className = "",
  rotation = "-rotate-6",
  textClass = "text-base sm:text-lg lg:text-xl",
  textColor = "text-[#171717]",
  arrowClass = "h-9 w-10 sm:h-10 sm:w-12",
  showArrow = true,
  layout = "row",
  arrowPosition = "before",
}) {
  const activeDirection =
    arrowDirection !== "down-right"
      ? arrowDirection
      : direction || arrowDirection;

  const isCol = layout === "col";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none inline-flex ${
        isCol ? "flex-col items-start" : "flex-row items-center gap-0"
      } select-none ${className}`}
    >
      {showArrow && arrowPosition === "before" && (
        <SketchArrow
          direction={activeDirection}
          className={`${arrowClass} ${isCol ? "ml-2 mb-1" : "shrink-0"}`}
        />
      )}

      <TitleDoodle
        text={text}
        rotation={rotation}
        textClass={textClass}
        textColor={textColor}
      />

      {showArrow && arrowPosition === "after" && (
        <SketchArrow
          direction={activeDirection}
          className={`${arrowClass} ${isCol ? "ml-2 mt-1" : "shrink-0"}`}
        />
      )}
    </div>
  );
}

export default RightDoodle;
