import React from "react";

export default function SectionBadge({ number, label, className = "" }) {
  if (!label && !number) return null;

  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider ${className}`}
    >
      {number && <span className="font-semibold text-brand">{number}</span>}
      {number && label && <span className="text-[#AAAAAA]">/</span>}
      {label && <span className="font-medium text-[#444444]">{label}</span>}
    </div>
  );
}
