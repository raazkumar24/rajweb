import React from "react";
import JourneySection from "../components/features/JourneySection";
import ToolkitSection from "../components/features/ToolkitSection";
import TornPaperCTA from "../components/features/TornPaperCTA";

/**
 * =============================================================================
 * ABOUT & TECH STACK SECTION (Responsive Editorial Layout)
 * =============================================================================
 * Matches exact 3-panel architecture from Image 3:
 *  - Part A: 'MY JOURNEY' (Zig-Zag Timeline with hollow outline, code editor, candid photo)
 *  - Part B: 'MY TOOLKIT / TECH STACK' (Exposed red crosshairs, 4x3 cards, floating tags)
 *  - Part C: Torn Paper CTA Footer (Jagged tear edge, halftone charcoal, LET'S BUILD SOMETHING)
 * =============================================================================
 */
export default function About({ heroMode = "red" }) {
  return (
    <div id="about" className="relative w-full overflow-hidden select-none">
      {/* ── PART A: MY JOURNEY (Zig-Zag Timeline) ── */}
      <JourneySection heroMode={heroMode} />

      {/* ── PART B: MY TOOLKIT / TECH STACK (Exposed Grid) ── */}
      <ToolkitSection heroMode={heroMode} />

      {/* ── PART C: TORN PAPER CTA FOOTER ── */}
      <TornPaperCTA heroMode={heroMode} />
    </div>
  );
}
