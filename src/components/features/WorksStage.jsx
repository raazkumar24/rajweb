import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Code2 } from "lucide-react";
import InteractiveButton from "../ui/InteractiveButton";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Tunables                                                           */
/* ------------------------------------------------------------------ */
const NAV_OFFSET = 88; // px — fixed navbar height. Adjust to your navbar.
const ROW_H = 112; // px — height of one title row in the list
const SCROLL_PER_PROJECT = 85; // % of viewport height of scroll per project
const MAX_TILT = 7; // deg — card rotation at full scroll speed
const MAX_SKEW = 3; // deg
const MAX_DRIFT = 24; // px — sideways drift at full speed
const MAX_SHRINK = 0.1; // card scales down by this much at full speed
const VEL_CAP = 4000; // px/s — scroll velocity that counts as "full speed"

/**
 * Turns linear progress (0..1) into a position (0..n-1) that "dwells" on each
 * project and only moves quickly between them. Without this the card would
 * never rest on a project, it would just keep sliding.
 */
function toPos(p, n) {
  if (n <= 1) return 0;
  const raw = p * (n - 1);
  const base = Math.min(Math.floor(raw), n - 2);
  const frac = raw - base;
  const t = Math.min(1, Math.max(0, (frac - 0.25) / 0.5));
  return base + t * t * (3 - 2 * t); // smoothstep
}

export default function WorksStage({ projects, onOpen }) {
  const n = projects.length;

  const wrapRef = useRef(null); // React-owned wrapper (ScrollTrigger inserts its spacer inside it)
  const pinRef = useRef(null); // the element that gets pinned
  const listRef = useRef(null);
  const barRef = useRef(null);
  const frameRef = useRef(null);
  const cardRef = useRef(null);
  const cursorRef = useRef(null);
  const detailsRef = useRef(null);
  const layerRefs = useRef([]);
  const imgRefs = useRef([]);
  const titleRefs = useRef([]);
  const stRef = useRef(null);
  const activeRef = useRef(0);

  const [active, setActive] = useState(0);

  /* ---------------------------------------------------------------- */
  /*  Main scroll engine                                               */
  /* ---------------------------------------------------------------- */
  useLayoutEffect(() => {
    let tick = null;
    const cleanups = [];

    const ctx = gsap.context(() => {
      const card = cardRef.current;
      const frame = frameRef.current;
      const cursor = cursorRef.current;
      const proxy = { p: 0 };
      const states = new Array(n).fill("");

      gsap.set(card, { transformPerspective: 900, transformOrigin: "50% 50%" });
      gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });

      /* ---- one function that paints everything for progress p ---- */
      const render = () => {
        const p = proxy.p;
        const pos = toPos(p, n);

        // 1. title list slides so the current project sits in the middle row
        gsap.set(listRef.current, { y: ROW_H - pos * ROW_H });

        // 2. progress bar
        gsap.set(barRef.current, { scaleX: p });

        // 3. preview layers: crossfade + inner auto-scroll of tall screenshots
        const cardH = card.clientHeight;
        const maxScrolls = imgRefs.current.map((img) =>
          img ? Math.max(0, img.offsetHeight - cardH) : 0,
        );
        for (let i = 0; i < n; i++) {
          const layer = layerRefs.current[i];
          const img = imgRefs.current[i];
          if (!layer || !img) continue;

          const opacity = gsap.utils.clamp(0, 1, 1 - Math.abs(pos - i));
          gsap.set(layer, { opacity });

          // each project owns 1/n of the total scroll → scroll its image inside that window
          const local = gsap.utils.clamp(0, 1, p * n - i);
          gsap.set(img, { y: -maxScrolls[i] * local });
        }

        // 4. title state (CSS handles the colour transition)
        for (let i = 0; i < n; i++) {
          const d = Math.abs(pos - i);
          const s = d < 0.3 ? "active" : d < 1.2 ? "near" : "far";
          if (states[i] !== s && titleRefs.current[i]) {
            titleRefs.current[i].dataset.s = s;
            states[i] = s;
          }
        }

        // 5. which project is "current" (React state only when it changes)
        const idx = Math.round(pos);
        if (idx !== activeRef.current) {
          activeRef.current = idx;
          setActive(idx);
        }
      };

      /* ---- pin + scrub (smooth, lagging progress) ---- */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: `top top+=${NAV_OFFSET}`,
          end: `+=${n * SCROLL_PER_PROJECT}%`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.to(proxy, { p: 1, ease: "none", duration: 1, onUpdate: render });
      stRef.current = tl.scrollTrigger;
      render();

      /* ---- velocity-driven tilt of the card ---- */
      const opts = { duration: 0.7, ease: "power3.out" };
      const rotTo = gsap.quickTo(card, "rotation", opts);
      const skewTo = gsap.quickTo(card, "skewY", opts);
      const xTo = gsap.quickTo(card, "x", opts);
      const scaleTo = gsap.quickTo(card, "scale", opts);

      tick = () => {
        const v = gsap.utils.clamp(
          -VEL_CAP,
          VEL_CAP,
          stRef.current ? stRef.current.getVelocity() : 0,
        );
        const k = v / VEL_CAP; // -1..1
        rotTo(k * MAX_TILT);
        skewTo(k * -MAX_SKEW);
        xTo(k * MAX_DRIFT);
        scaleTo(1 - Math.abs(k) * MAX_SHRINK);
      };
      gsap.ticker.add(tick);

      /* ---- "VIEW" cursor that follows the mouse over the card ---- */
      const cx = gsap.quickTo(cursor, "x", {
        duration: 0.35,
        ease: "power3.out",
      });
      const cy = gsap.quickTo(cursor, "y", {
        duration: 0.35,
        ease: "power3.out",
      });
      const onMove = (e) => {
        const r = frame.getBoundingClientRect();
        cx(e.clientX - r.left);
        cy(e.clientY - r.top);
      };
      const onEnter = (e) => {
        const r = frame.getBoundingClientRect();
        gsap.set(cursor, { x: e.clientX - r.left, y: e.clientY - r.top });
        gsap.to(cursor, { scale: 1, duration: 0.35, ease: "back.out(2)" });
      };
      const onLeave = () =>
        gsap.to(cursor, { scale: 0, duration: 0.25, ease: "power2.in" });

      frame.addEventListener("mousemove", onMove);
      frame.addEventListener("mouseenter", onEnter);
      frame.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        frame.removeEventListener("mousemove", onMove);
        frame.removeEventListener("mouseenter", onEnter);
        frame.removeEventListener("mouseleave", onLeave);
      });
    }, wrapRef);

    return () => {
      if (tick) gsap.ticker.remove(tick);
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [n]);

  /* Fade the details block whenever the current project changes */
  useEffect(() => {
    if (!detailsRef.current) return;
    gsap.fromTo(
      detailsRef.current,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
    );
  }, [active]);

  const goTo = (i) => {
    const st = stRef.current;
    if (!st) return;
    const p = n > 1 ? i / (n - 1) : 0;
    window.scrollTo({
      top: st.start + (st.end - st.start) * p,
      behavior: "smooth",
    });
  };

  const current = projects[active] || projects[0];

  return (
    <div ref={wrapRef} className="relative">
      <div
        ref={pinRef}
        className="relative flex items-center"
        style={{ height: `calc(100svh - ${NAV_OFFSET}px)` }}
      >
        <div className="grid w-full grid-cols-12 items-center gap-10 xl:gap-16">
          {/* ───────────── LEFT: counter, titles, details ───────────── */}
          <div className="col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-4 text-xs font-semibold text-[#555555]">
              <span className="font-mono tabular-nums">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(n).padStart(2, "0")}
              </span>
              <span className="relative h-px w-40 bg-black/10">
                <span
                  ref={barRef}
                  className="absolute inset-0 origin-left bg-brand"
                  style={{ transform: "scaleX(0)" }}
                />
              </span>
            </div>

            {/* Title window with fading top/bottom edges */}
            <div
              className="relative overflow-hidden"
              style={{
                height: ROW_H * 3,
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0, #000 22%, #000 78%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0, #000 22%, #000 78%, transparent 100%)",
              }}
            >
              <ul
                ref={listRef}
                className="will-change-transform"
                style={{ transform: `translateY(${ROW_H}px)` }}
              >
                {projects.map((p, i) => (
                  <li
                    key={p.id}
                    className="flex items-center"
                    style={{ height: ROW_H }}
                  >
                    <button
                      type="button"
                      ref={(el) => (titleRefs.current[i] = el)}
                      data-s={i === 0 ? "active" : "far"}
                      onClick={() => goTo(i)}
                      className="line-clamp-2 cursor-pointer text-left text-5xl font-black italic uppercase leading-[0.9] tracking-[-0.045em] transition-colors duration-300 xl:text-[3.5rem] data-[s=active]:text-[#111111] data-[s=near]:text-brand data-[s=far]:text-[#111111]/15"
                    >
                      {p.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Details of the current project */}
            <div ref={detailsRef} className="max-w-md">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#555555]">
                <span>{current.year}</span>
                <span className="text-[#CCCCCC]">&bull;</span>
                <span className="text-[#333333]">{current.client}</span>
                <span className="text-[#CCCCCC]">&bull;</span>
                <span className="font-medium text-[#888888]">
                  {current.role}
                </span>
              </div>
              <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-[#4B5563]">
                {current.summary}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <InteractiveButton
                  type="button"
                  onClick={() => onOpen(current)}
                  variant="dark"
                  noShadow
                  className="px-5 py-2.5 text-xs sm:text-sm"
                  icon={<ArrowRight className="h-3.5 w-3.5" />}
                >
                  Read case study
                </InteractiveButton>

                {current.githubUrl && (
                  <InteractiveButton
                    href={current.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="source"
                    className="px-2 py-2 text-xs sm:text-sm"
                    icon={
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#AAAAAA]" />
                    }
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Code2 className="h-3.5 w-3.5 text-brand-dark" />
                      Source code
                    </span>
                  </InteractiveButton>
                )}
              </div>
            </div>
          </div>

          {/* ───────────── RIGHT: frame + tilting card ───────────── */}
          <div className="col-span-6">
            <div
              ref={frameRef}
              role="button"
              tabIndex={0}
              aria-label={`Open case study: ${current.title}`}
              onClick={() => onOpen(projects[activeRef.current])}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpen(projects[activeRef.current]);
                }
              }}
              className="relative cursor-none outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-3xl"
              style={{ height: "min(68vh, 620px)" }}
            >
              {/* ghost number, only visible while the card shrinks during fast scroll */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[16rem] font-black italic leading-none text-black/[0.05]"
              >
                {current.num}
              </span>
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl border border-dashed border-black/12"
              />

              <div
                ref={cardRef}
                className="absolute inset-3 overflow-hidden rounded-2xl bg-[#e9e2ff] shadow-[0_24px_70px_rgba(34,22,72,0.18)] ring-1 ring-black/8 will-change-transform"
              >
                {projects.map((p, i) => (
                  <div
                    key={p.id}
                    ref={(el) => (layerRefs.current[i] = el)}
                    className="pointer-events-none absolute inset-0"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    <img
                      ref={(el) => (imgRefs.current[i] = el)}
                      src={(p.images && p.images[0]) || p.image}
                      alt={`${p.title} preview`}
                      draggable={false}
                      onLoad={() => ScrollTrigger.refresh()}
                      className="block min-h-full w-full object-cover object-top will-change-transform"
                    />
                  </div>
                ))}
              </div>

              {/* custom cursor */}
              <div
                ref={cursorRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-brand text-[11px] font-bold tracking-widest text-[#111111]"
              >
                VIEW
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
