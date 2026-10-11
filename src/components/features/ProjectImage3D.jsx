import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * ProjectImage3D
 * Provides a tactile 3D perspective tilt effect on hover for project images.
 * Features:
 * - Realtime mouse-tracking 3D rotation (rotateX, rotateY)
 * - Outer clip wrapper to keep clip-path separate from preserve-3d context
 * - Support for multiple project gallery images with carousel controls
 * - Dynamic 3D depth shadow that shifts opposite to tilt direction
 * - Specular glare reflection moving in 3D across the image surface
 * - Elevated floating meta badge with translateZ
 * - Smooth spring return on mouse leave
 * - Respects touch devices & reduced motion
 */
export default function ProjectImage3D({
  image,
  images = [],
  title,
  year,
  client,
  onClick,
  className = "",
  maxTilt = 10,
}) {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
  });
  const [isTouch] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches,
  );

  const imageList = images && images.length > 0 ? images : [image];
  const currentImage = imageList[activeIdx] || image;

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e) => {
    if (isTouch || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = (x - centerX) / centerX; // -1 to 1
    const normY = (y - centerY) / centerY; // -1 to 1

    const rotateX = -normY * maxTilt;
    const rotateY = normX * maxTilt;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setCoords({ rotateX, rotateY, glareX, glareY });
  };

  const handleMouseEnter = () => {
    if (!isTouch) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  const dynamicShadow = isHovered
    ? `${(-coords.rotateY * 2.5).toFixed(1)}px ${(coords.rotateX * 2.5 + 28).toFixed(1)}px 55px -12px rgba(0, 0, 0, 0.42), 0 16px 36px -10px rgba(0, 0, 0, 0.25)`
    : "0 18px 40px -8px rgba(0, 0, 0, 0.12)";

  const transformStyle = isHovered
    ? `perspective(1200px) rotateX(${coords.rotateX.toFixed(2)}deg) rotateY(${coords.rotateY.toFixed(2)}deg) scale3d(1.035, 1.035, 1.035)`
    : "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

  return (
    // Outer wrapper for entrance clip-path animation so it doesn't break preserve-3d
    <div className="wk-clip-wrap w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl">
      <div
        ref={containerRef}
        data-cursor="view"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`wk-img-wrap group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-black/12 hover:border-[#FF8A00]/50 aspect-[16/10] select-none ${className}`}
        style={{
          transform: transformStyle,
          transformStyle: "preserve-3d",
          boxShadow: dynamicShadow,
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
          isolation: "isolate",
          transition: isHovered
            ? "transform 0.12s ease-out, box-shadow 0.2s ease-out, border-color 0.2s ease-out"
            : "transform 0.65s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.65s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.3s ease",
          willChange: "transform, box-shadow, border-color",
        }}
      >
        {/* Main Project Image without CSS transform transition (so GSAP parallax scrub stays 100% smooth) */}
        <img
          key={activeIdx}
          src={currentImage}
          alt={`${title} view ${activeIdx + 1}`}
          width={1400}
          height={875}
          className="wk-project-img w-full h-full object-cover object-top rounded-[inherit] will-change-transform"
          loading="lazy"
          style={{
            transform: "translateZ(0px)",
            filter: isHovered
              ? "brightness(0.85) contrast(0.98) saturate(0.95)"
              : "brightness(1) contrast(1) saturate(1)",
            transition: "filter 0.35s ease",
          }}
        />

        {/* Subtle dull ambient overlay on image hover */}
        <div
          className={`pointer-events-none absolute inset-0 bg-black/15 transition-opacity duration-300 rounded-[inherit] z-10 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />

        {/* Floating 3D Meta Tag with translateZ pop-out */}
        <div
          className="absolute top-4 left-4 z-20 text-xs font-medium text-white bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg pointer-events-none transition-transform duration-200"
          style={{
            transform: isHovered ? "translateZ(32px)" : "translateZ(0px)",
          }}
        >
          {year} &bull; {client}
        </div>

        {/* Gallery Controls when multiple images exist */}
        {imageList.length > 1 && (
          <>
            {/* Previous Arrow */}
            <button
              type="button"
              aria-label="Previous preview image"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/65 hover:bg-[#FF8A00] text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-md hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Next Arrow */}
            <button
              type="button"
              aria-label="Next preview image"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/65 hover:bg-[#FF8A00] text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-md hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Pagination Indicators & Counter */}
            <div
              className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-md transition-transform duration-200"
              style={{
                transform: isHovered ? "translateZ(24px)" : "translateZ(0px)",
              }}
            >
              <span className="text-[10px] font-mono font-bold text-white/90 mr-1">
                {activeIdx + 1}/{imageList.length}
              </span>
              {imageList.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  aria-label={`Show image ${dotIdx + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIdx(dotIdx);
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeIdx === dotIdx
                      ? "bg-[#FF8A00] w-3.5"
                      : "bg-white/40 hover:bg-white/80 w-1.5"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* 3D Specular Light Sheen Reflection following mouse */}
        {isHovered && !isTouch && (
          <div
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-200 rounded-[inherit]"
            style={{
              background: `radial-gradient(circle 380px at ${coords.glareX}% ${coords.glareY}%, rgba(255,255,255,0.35), rgba(255,255,255,0.08) 40%, transparent 80%)`,
              mixBlendMode: "screen",
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
