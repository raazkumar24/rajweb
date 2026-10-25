import React, { useState, useRef } from "react";
import { Globe, RefreshCw, X, AlertTriangle, ExternalLink } from "lucide-react";

export default function LiveSitePreview({ url, title, onClose }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [key, setKey] = useState(0);
  const iframeRef = useRef(null);

  const cleanHost = url
    ? url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]
    : "";

  const handleRefresh = () => {
    setLoading(true);
    setError(false);
    setKey((k) => k + 1);
  };

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-[#1a1a1a] shadow-2xl">
      {/* Browser Chrome Bar */}
      <div className="flex items-center gap-3 border-b border-white/8 bg-[#111111] px-4 py-3">
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-lg bg-white/8 px-3 py-1.5 min-w-0">
          <Globe className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
          <span className="truncate font-mono text-[11px] text-white/70">{cleanHost}</span>
          <span className="ml-auto shrink-0">
            <span className="inline-flex items-center gap-0.5 rounded-sm bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
              Secure
            </span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={handleRefresh}
            title="Reload"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new tab"
            className="flex h-7 w-7 items-center justify-center rounded-md text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* iframe Viewport */}
      <div className="relative bg-white" style={{ height: "480px" }}>
        {loading && !error && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#FAF8F5]">
            <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-brand/20 border-t-brand" />
            <p className="text-xs font-medium text-[#777777]">Loading {cleanHost}...</p>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#FAF8F5] px-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111111]">Site cannot be embedded</p>
              <p className="mt-1 text-xs text-[#777777]">
                {cleanHost} blocks iframe embedding. Open it directly instead.
              </p>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Open {cleanHost}
            </a>
          </div>
        )}
        {!error && (
          <iframe
            key={key}
            ref={iframeRef}
            src={url}
            title={title}
            onLoad={handleLoad}
            onError={handleError}
            allow="fullscreen"
            loading="lazy"
            className="h-full w-full border-0"
            style={{ opacity: loading ? 0 : 1, transition: "opacity 0.3s" }}
          />
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/8 bg-[#111111] px-4 py-2.5">
        <span className="text-[11px] text-white/40">Interactive preview — scroll and click inside</span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5 text-[11px] font-semibold text-white/70 transition-colors hover:bg-white/15 hover:text-white"
          >
            <X className="h-3 w-3" />
            Back to screenshots
          </button>
        )}
      </div>
    </div>
  );
}
