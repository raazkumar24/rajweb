import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const currentScroll = window.scrollY;
      const pct = Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100));
      setProgress(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-black/5" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-brand via-brand-light to-brand-deep transition-all duration-75 ease-out shadow-[0_0_8px_rgba(var(--brand-rgb),0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
