import React, { useEffect, useRef, useState } from "react";
import { X, ArrowUpRight, RotateCw } from "lucide-react";

// Site ko hum asli desktop width (1280px) par render karke chhota (scale) karte hain,
// taaki box chhota hone par bhi site desktop layout me dikhe, mobile layout me nahi.
const DESKTOP_WIDTH = 1280;
const DESKTOP_HEIGHT = 800; // 16:10 ratio (1280 x 800)

export default function LiveSitePreview({ url, title, onClose }) {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(0.5);
  const [loaded, setLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  // Box ki width ke hisaab se scale nikalo
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / DESKTOP_WIDTH);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-black/15 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
        {/* Browser bar */}
        <div className="flex h-11 items-center gap-3 border-b-2 border-black/10 bg-[#F3F0EA] px-3.5 sm:px-4">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57] border border-black/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E] border border-black/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840] border border-black/10" />
          </div>

          <div className="min-w-0 flex-1 truncate rounded-full border border-black/8 bg-white/90 px-3.5 py-1 text-center text-[11px] font-medium text-[#555555]">
            {host}
          </div>

          <button
            type="button"
            onClick={() => {
              setLoaded(false);
              setReloadKey((k) => k + 1);
            }}
            aria-label="Reload preview"
            className="flex h-6 w-6 items-center justify-center rounded-full text-[#666666] transition-colors hover:bg-black/8 hover:text-[#111111]"
          >
            <RotateCw className="h-3.5 w-3.5" />
          </button>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label="Open in new tab"
            className="flex h-6 w-6 items-center justify-center rounded-full text-[#666666] transition-colors hover:bg-black/8 hover:text-[#FF8A00]"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close live preview"
            className="flex h-6 w-6 items-center justify-center rounded-full text-[#666666] transition-colors hover:bg-black/8 hover:text-[#111111]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Live site (scaled desktop view) */}
        <div
          ref={boxRef}
          className="relative aspect-[16/10] w-full overflow-hidden bg-white"
        >
          {!loaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#FAF8F5] text-xs font-semibold text-[#888888]">
              Loading live site…
            </div>
          )}
          <iframe
            key={reloadKey}
            src={url}
            title={`${title} live preview`}
            onLoad={() => setLoaded(true)}
            // top-navigation allow nahi hai, to ye site tumhare portfolio ko redirect nahi kar sakti
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            style={{
              width: DESKTOP_WIDTH,
              height: DESKTOP_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              border: 0,
            }}
          />
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-[#888888]">
        If the live preview appears blank or fails to load,{" "}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-[#FF8A00] underline-offset-2 hover:underline"
        >
          open in a new tab
        </a>
        .
      </p>
    </div>
  );
}
