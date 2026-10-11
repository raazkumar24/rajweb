import React from "react";

export default function SectionBadge({ label, className = "" }) {
  if (!label) return null;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF8A00] opacity-60 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF8A00]" />
      </span>
      <span className="text-sm font-medium text-[#555555]">
        {label}
      </span>
    </div>
  );
}
