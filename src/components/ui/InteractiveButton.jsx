import React from "react";

const baseStyles =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

const variants = {
  dark: "bg-[#111111] text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:bg-brand hover:text-[#111111] hover:shadow-[0_12px_28px_rgba(var(--brand-rgb),0.38)]",
  outline: "border border-black/20 bg-white text-[#111111] shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:border-brand hover:bg-brand hover:text-[#111111] hover:shadow-[0_10px_24px_rgba(var(--brand-rgb),0.24)]",
  brand: "bg-brand text-[#111111] shadow-[0_8px_24px_rgba(var(--brand-rgb),0.3)] hover:bg-white hover:shadow-[0_10px_24px_rgba(255,255,255,0.22)]",
  source: "border border-black/12 bg-white text-[#111111] shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:border-brand hover:bg-brand hover:text-[#111111] hover:shadow-[0_10px_24px_rgba(var(--brand-rgb),0.24)]",
};

export default function InteractiveButton({
  children,
  href,
  variant = "dark",
  className = "",
  icon,
  noShadow = false,
  ...props
}) {
  const Component = href ? "a" : "button";
  return (
    <Component
      {...props}
      {...(href ? { href } : {})}
      className={`${baseStyles} ${variants[variant]} ${noShadow ? "shadow-none hover:shadow-none" : ""} ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
      {icon && <span className="relative transition-transform duration-200 group-hover:translate-x-1">{icon}</span>}
    </Component>
  );
}
