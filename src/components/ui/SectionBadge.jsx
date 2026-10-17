import React from "react";

export default function SectionBadge({ label, className = "" }) {
  if (!label) return null;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-black/8 shadow-2xs ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
      </span>
      <span className="text-xs font-bold uppercase tracking-wider text-[#333333]">
        {label}
      </span>
    </div>
  );
}
