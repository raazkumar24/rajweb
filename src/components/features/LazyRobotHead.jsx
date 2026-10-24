import React, { Suspense, lazy, useState, useEffect, useRef } from "react";

const RobotHeadComp = lazy(() =>
  import("robot-heads").then((module) => ({ default: module.RobotHead })),
);

export default function LazyRobotHead({
  shape = "hexagon",
  state = "idle",
  color="var(--brand-primary)",
  size = 270,
  interactive = true,
  ariaLabel = "Raj Shekhar - Mascot",
}) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {shouldLoad ? (
        <Suspense
          fallback={
            <div
              className="flex items-center justify-center rounded-full bg-brand/10 animate-pulse text-xs text-brand-dark font-medium"
              style={{ width: size, height: size }}
            >
              Loading mascot…
            </div>
          }
        >
          <RobotHeadComp
            shape={shape}
            state={state}
            color={color}
            size={size}
            interactive={interactive}
            aria-label={ariaLabel}
          />
        </Suspense>
      ) : (
        <div
          className="flex items-center justify-center rounded-full bg-brand/5"
          style={{ width: size, height: size }}
        />
      )}
    </div>
  );
}
