import React from "react";
import SectionBadge from "./SectionBadge";

/**
 * Editorial SectionHeader
 * Distinctive Bricolage Grotesque display typography, sentence case, tight tracking.
 * Optional accent word italicized.
 */
export default function SectionHeader({
  number,
  badge,
  titleTop,
  titleMain,
  titleAccent,
  title,
  description,
  className = "",
  align = "split", // "split" | "left"
}) {
  return (
    <div className={`mb-12 sm:mb-16 ${className}`}>
      {(badge || number) && (
        <SectionBadge number={number} label={badge} className="mb-3 sm:mb-4" />
      )}

      {align === "split" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(2.1rem,4vw+0.8rem,3.8rem)] leading-[1.05] tracking-[-0.03em] font-bold text-[#111111]">
              {titleTop && <span className="block">{titleTop} </span>}
              {titleMain && <span>{titleMain} </span>}
              {titleAccent && (
                <span className="italic font-normal text-brand-dark">
                  {titleAccent}
                </span>
              )}
              {title && <span>{title}</span>}
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pb-1">
            {description && (
              <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed font-normal max-w-md">
                {description}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-w-3xl">
          <h2 className="font-display text-[clamp(2.1rem,4vw+0.8rem,3.8rem)] leading-[1.05] tracking-[-0.03em] font-bold text-[#111111]">
            {titleTop && <span className="block">{titleTop} </span>}
            {titleMain && <span>{titleMain} </span>}
            {titleAccent && (
              <span className="italic font-normal text-brand-dark">
                {titleAccent}
              </span>
            )}
            {title && <span>{title}</span>}
          </h2>
          {description && (
            <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed font-normal max-w-xl">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
