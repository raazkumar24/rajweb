import React, { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ProjectImage3D({ image, images = [], title, year, client, onClick, className = "" }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const imageList = images.length > 0 ? images : [image]
  const currentImage = imageList[activeIdx] || image

  const handlePrev = (event) => {
    event.stopPropagation()
    setActiveIdx((index) => (index === 0 ? imageList.length - 1 : index - 1))
  }

  const handleNext = (event) => {
    event.stopPropagation()
    setActiveIdx((index) => (index === imageList.length - 1 ? 0 : index + 1))
  }

  return (
    <div className="wk-clip-wrap h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl">
      <div
        data-cursor="view"
        onClick={onClick}
        className={`wk-img-wrap group relative aspect-[16/10] cursor-pointer select-none overflow-hidden rounded-2xl border-2 border-black/12 transition-colors duration-300 hover:border-brand/50 sm:rounded-3xl ${className}`}
      >
        <img
          key={activeIdx}
          src={currentImage}
          alt={`${title} view ${activeIdx + 1}`}
          width={1400}
          height={875}
          className="wk-project-img h-full w-full rounded-[inherit] object-cover object-top"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] bg-gradient-to-t from-black/45 via-transparent to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute left-4 top-4 z-20 rounded-full border border-white/15 bg-black/60 px-3.5 py-1.5 text-xs font-semibold text-white/95 backdrop-blur-md">
          <span className="font-bold text-brand">{year}</span> &bull; {client}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 p-5 text-white">
          <span className="text-sm font-semibold tracking-wide">View project details</span>
          <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/30 bg-white/10 text-lg backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-1">↗</span>
        </div>
        {imageList.length > 1 && (
          <div className="absolute right-4 top-4 z-30 flex gap-2">
            <button type="button" onClick={handlePrev} aria-label="Previous project image" className="grid size-9 place-items-center rounded-full border border-white/30 bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-brand">
              <ChevronLeft aria-hidden="true" />
            </button>
            <button type="button" onClick={handleNext} aria-label="Next project image" className="grid size-9 place-items-center rounded-full border border-white/30 bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-brand">
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
