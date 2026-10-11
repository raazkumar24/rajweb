import React from "react";
import SectionBadge from "./SectionBadge";
import HandDrawnUnderline from "../decorative/HandDrawnUnderline";
import { HandwrittenBadge } from "../decorative/DoodleCard";

/**
 * Reusable SectionHeader
 * Maintains typographic consistency across all sections without layout repetition.
 * Clean, bold italic headlines with zero clutter.
 */
export default function SectionHeader({
  badge,
  titleTop,
  titleMain,
  titleAccent,
  description,
  annotation,
  className = "",
  align = "split", // "split" | "left"
}) {
  return (
    <div className={`mb-14 sm:mb-20 ${className}`}>
      {badge && <SectionBadge label={badge} className="mb-3.5 sm:mb-4" />}

      {align === "split" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <div className="relative inline-block">
              <h2 className="font-black italic uppercase leading-[0.92] tracking-[-0.04em] text-[2.75rem] sm:text-[3.8rem] md:text-[4.5rem] lg:text-[5.2rem]">
                {titleTop && <span className="text-[#111111] block">{titleTop}</span>}
                {titleMain && <span className="text-[#111111]">{titleMain} </span>}
                {titleAccent && (
                  <span className="relative inline-block text-[#FF7700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.32)]">
                    {titleAccent}
                    <HandDrawnUnderline
                      className="absolute left-0 w-full"
                      style={{ bottom: "-0.12em" }}
                      color="#FF8A00"
                    />
                  </span>
                )}
              </h2>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pb-3 flex flex-col gap-3">
            {description && (
              <p className="text-[#4B5563] text-sm sm:text-base md:text-lg max-w-md leading-relaxed font-normal">
                {description}
              </p>
            )}
            {annotation && (
              <HandwrittenBadge
                text={annotation}
                direction="curved-right"
                rotation="-rotate-6"
                className="hidden sm:inline-flex mt-1"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="relative inline-block">
            <h2 className="font-black italic uppercase leading-[0.92] tracking-[-0.04em] text-[2.75rem] sm:text-[3.8rem] md:text-[4.5rem] lg:text-[5.2rem]">
              {titleTop && <span className="text-[#111111] block">{titleTop}</span>}
              {titleMain && <span className="text-[#111111]">{titleMain} </span>}
              {titleAccent && (
                <span className="relative inline-block text-[#FF7700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.32)]">
                  {titleAccent}
                  <HandDrawnUnderline
                    className="absolute left-0 w-full"
                    style={{ bottom: "-0.12em" }}
                    color="#FF8A00"
                  />
                </span>
              )}
            </h2>
          </div>
          {description && (
            <p className="text-[#4B5563] text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-normal">
              {description}
            </p>
          )}
          {annotation && (
            <HandwrittenBadge
              text={annotation}
              direction="curved-right"
              rotation="-rotate-6"
              className="hidden sm:inline-flex self-start mt-1"
            />
          )}
        </div>
      )}
    </div>
  );
}
