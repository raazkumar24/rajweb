import React from "react";

export function BrandButton({ href, children, className = "", ...rest }) {
  return (
    <a
      href={href}
      className={`
        group inline-flex items-center gap-2.5
        rounded-full bg-[#111111] px-6 py-3 sm:px-7 sm:py-3.5
        text-sm font-semibold text-white
        shadow-[0_8px_20px_rgba(0,0,0,0.16)]
        transition-all duration-300
        hover:bg-brand hover:text-[#111111] hover:shadow-[0_10px_24px_rgba(var(--brand-rgb),0.3)]
        hover:-translate-y-0.5 active:translate-y-0 active:scale-95
        ${className}
      `}
      {...rest}
    >
      <span>{children}</span>
      <svg
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </a>
  );
}

export function GhostButton({ href, children, className = "", ...rest }) {
  return (
    <a
      href={href}
      className={`
        inline-flex items-center justify-center
        rounded-full bg-[#FAF5EB] border border-black/15
        px-6 py-3 sm:px-7 sm:py-3.5
        text-sm font-semibold text-[#111111]
        shadow-[0_3px_12px_rgba(0,0,0,0.04)]
        transition-all duration-300
        hover:bg-[#111111] hover:text-white hover:border-[#111111]
        hover:-translate-y-0.5 active:translate-y-0 active:scale-95
        ${className}
      `}
      {...rest}
    >
      <span>{children}</span>
    </a>
  );
}

// Backward-compatibility alias
export const OrangeButton = BrandButton;
