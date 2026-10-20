import React, { useEffect, useState, useRef } from "react";

/**
 * CustomCursor
 * Follows mouse with silky GPU lerp interpolation (zero React re-renders on mousemove)
 * and expands with rich 3D drop-shadow and vibrant bloom when hovering over project images
 * (elements with data-cursor="view").
 */
export default function CustomCursor() {
  const [isView, setIsView] = useState(false);
  const cursorRef = useRef(null);
  const isViewRef = useRef(false);
  const targetPos = useRef({ x: -200, y: -200 });
  const currentPos = useRef({ x: -200, y: -200 });
  const animFrameRef = useRef(null);
  const isTouchRef = useRef(false);

  useEffect(() => {
    // Hidden on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      isTouchRef.current = true;
      return;
    }

    const onMouseMove = (e) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

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

    // Smooth lerp loop
    const lerpLoop = () => {
      const ease = 0.22;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameRef.current = requestAnimationFrame(lerpLoop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    animFrameRef.current = requestAnimationFrame(lerpLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed top-0 left-0 z-50 select-none hidden md:block transition-[opacity] duration-300 ${
        isView ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
      }`}
      style={{
        willChange: "transform, opacity",
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
        className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand text-white border border-white/30 text-xs font-black uppercase tracking-wider shadow-[0_22px_42px_-6px_rgba(0,0,0,0.55),0_10px_20px_-4px_rgba(0,0,0,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.45)]"
      >
        VIEW
      </div>
    </div>
  );
}

