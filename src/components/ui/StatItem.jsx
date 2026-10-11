import React from "react";

/**
 * StatItem — Authentic Developer Capability & Trust Item
 *
 * Props:
 *  - value (string): e.g. "10+", "MERN Stack", "Available"
 *  - label (string): e.g. "Projects Built", "Core Tech", "Open for Work"
 *  - isLive (boolean): renders subtle active status indicator
 */
export function StatItem({ value, label, isLive = false }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5 min-h-[1.75rem]">
        {isLive && (
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        )}
        <span className="text-base sm:text-lg lg:text-[1.15rem] font-black text-[#111111] tracking-tight whitespace-nowrap">
          {value}
        </span>
      </div>
      <span className="text-[11px] sm:text-xs font-medium text-[#6B7280] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

/**
 * StatDivider — Thin vertical separator between items
 */
export function StatDivider() {
  return <div className="h-7 w-[1px] bg-black/10 shrink-0" />;
}

export default StatItem;
