import React, { useEffect, useState, useRef } from "react";

/**
 * CustomCursor
 * Follows mouse smoothly via direct DOM transform (zero React re-renders on mousemove)
 * and expands with rich 3D drop-shadow and orange bloom when hovering over project images
 * (elements with data-cursor="view").
 */
export default function CustomCursor() {
  const [isView, setIsView] = useState(false);
  const cursorRef = useRef(null);
  const isViewRef = useRef(false);
  const rafRef = useRef(null);
  const targetPos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    // Hidden on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%)`;
          }
          rafRef.current = null;
        });
      }

      const target = e.target;
      const viewEl = target ? target.closest("[data-cursor='view']") : null;
      const shouldView = Boolean(viewEl);

      if (shouldView !== isViewRef.current) {
        isViewRef.current = shouldView;
        setIsView(shouldView);
      }
    };

    const onMouseLeave = () => {
      if (isViewRef.current) {
        isViewRef.current = false;
        setIsView(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (cursorRef.current && isView) {
      cursorRef.current.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0) translate(-50%, -50%)`;
    }
  }, [isView]);

  if (!isView) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-50 select-none hidden md:block"
      style={{
        willChange: "transform",
      }}
      aria-hidden="true"
    >
      {/* ── Soft Ambient Ground Shadow ── */}
      <div
        className="absolute -inset-3 rounded-full bg-black/40 blur-xl pointer-events-none transition-transform duration-200"
        style={{
          transform: "translateY(16px) scale(0.9, 0.55)",
        }}
      />

      {/* ── Main Circular VIEW Badge with Clean Black 3D Shadow ── */}
      <div
        className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand text-white border border-white/30 text-xs font-black uppercase tracking-wider transition-all duration-200 animate-cursor-pop"
        style={{
          boxShadow:
            "0 22px 42px -6px rgba(0, 0, 0, 0.55), 0 10px 20px -4px rgba(0, 0, 0, 0.35), inset 0 1.5px 2px rgba(255, 255, 255, 0.45)",
        }}
      >
        VIEW
      </div>
    </div>
  );
}
