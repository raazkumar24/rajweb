import React from "react";
import CircularStampBadge from "./CircularStampBadge";

/**
 * ─────────────────────────────────────────────────────────────
 * EditorialSectionHeader (Universal Brutalist Section Header)
 * ─────────────────────────────────────────────────────────────
 * Standardizes the "Bade-Bade Text", beacon badge, stamp,
 * and wireframe outline + solid display typography across all sections.
 */
export default function EditorialSectionHeader({
  number = "01",
  label = "SECTION",
  outlineTitle = "",
  solidTitle = "",
  description = "",
  heroMode = "red",
  showStamp = true,
  stampText,
  rightSlot = null,
  className = "",
}) {
  const isRed = heroMode === "red";

  const theme = isRed
    ? {
        gridLine: "rgba(255, 255, 255, 0.15)",
        beaconColor: "#EF4444",
        labelColor: "rgba(255, 255, 255, 0.9)",
        outlineStroke: "rgba(255, 255, 255, 0.9)",
        solidFill: "#FFFFFF",
        accentDot: "#FFFFFF",
        descriptionColor: "rgba(255, 255, 255, 0.74)",
        stampColor: "#FFFFFF",
      }
    : {
        gridLine: "rgba(0, 0, 0, 0.14)",
        beaconColor: "#C81D1D",
        labelColor: "#111111",
        outlineStroke: "#111111",
        solidFill: "#111111",
        accentDot: "#C81D1D",
        descriptionColor: "#4B4B4B",
        stampColor: "#111111",
      };

  return (
    <div className={`w-full mb-12 sm:mb-16 lg:mb-20 select-none ${className}`}>
      {/* ── 1. TOP EDITORIAL SPECIFICATION BAR ── */}
      <div
        className="flex items-center justify-between mb-8 sm:mb-10 border-b pb-4 sm:pb-5"
        style={{ borderColor: theme.gridLine }}
      >
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span
            className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full animate-ping"
            style={{ backgroundColor: theme.beaconColor }}
          />
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-sm font-black uppercase tracking-[0.24em]">
            <span style={{ color: theme.beaconColor }}>—</span>
            <span style={{ color: theme.labelColor }}>
              {number} / {label}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {rightSlot}
          {showStamp && (
            <div className="scale-75 sm:scale-100 drop-shadow-lg">
              <CircularStampBadge
                size={82}
                color={theme.stampColor}
                text={stampText || undefined}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── 2. GIANT BRUTALIST STACKED HEADLINE ── */}
      <div className="flex flex-col items-start text-left">
        {outlineTitle && (
          <h2
            className="font-display text-[clamp(3.5rem,10vw,11rem)] font-black uppercase tracking-[-0.06em] leading-[0.78]"
            style={{
              WebkitTextStroke: `1.8px ${theme.outlineStroke}`,
              color: "transparent",
            }}
          >
            {outlineTitle}
          </h2>
        )}

        {solidTitle && (
          <h2 className="font-display text-[clamp(2.9rem,8.5vw,9rem)] font-black uppercase tracking-[-0.04em] leading-[0.82] flex items-baseline">
            <span style={{ color: theme.solidFill }}>{solidTitle}</span>
            <span style={{ color: theme.accentDot }}>.</span>
          </h2>
        )}

        {description && (
          <p
            className="mt-4 sm:mt-5 max-w-xl text-xs sm:text-base leading-relaxed font-sans"
            style={{ color: theme.descriptionColor }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
