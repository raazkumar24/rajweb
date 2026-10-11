import React from "react";

/**
 * SocialPill — Floating vertical glass pill (Hero right column)
 *
 * Props:
 *  - links (Array): { href, title, icon: Component | ReactNode }
 *  - forwardRef (ref): outer div par lagane ke liye (GSAP animation ke liye)
 *  - className (string): extra classes
 */
export default function SocialPill({ links = [], forwardRef, className = "" }) {
  return (
    <div ref={forwardRef} className={`z-40 select-none ${className}`}>
      <div
        className="
          social-inner-float relative
          flex flex-col items-center gap-2.5 p-2
          rounded-full
          bg-gradient-to-b from-white/60 via-white/25 to-white/15
          backdrop-blur-2xl backdrop-saturate-150
          border border-white/70
          shadow-[0_18px_40px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(255,255,255,0.4)]
          transition-shadow duration-300
          hover:shadow-[0_22px_48px_rgba(0,0,0,0.16),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(255,255,255,0.5)]
        "
      >
        {/* Upar ki glossy shine (sirf look ke liye, click nahi rokta) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <span className="absolute inset-x-0 -top-1/4 h-1/2 bg-gradient-to-b from-white/70 to-transparent opacity-60" />
        </span>

        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              title={link.title}
              aria-label={link.title}
              className="
                relative z-10
                flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center
                rounded-full text-[#111111]
                bg-white/45 backdrop-blur-md
                border border-white/80
                shadow-[0_4px_12px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)]
                transition-all duration-300
                hover:bg-[#FF8A00] hover:text-white hover:border-[#FF8A00]
                hover:shadow-[0_8px_22px_rgba(255,138,0,0.45)]
                hover:scale-110 active:scale-95
              "
            >
              {typeof Icon === "function" ? <Icon className="h-5 w-5" /> : Icon}
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ---- Icon components (TDZ-safe functions) ----

export function GitHubIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.851 3.001c.214-.006.492.012.835.085c.384.081.848.23 1.399.483c.355.164.748.373 1.179.637a12.9 12.9 0 0 1 5.738 0a11 11 0 0 1 1.268-.677c.724-.325 1.294-.463 1.723-.51a3 3 0 0 1 .553-.01a2 2 0 0 1 .285.046l.013.004l.006.001l.003.001h.002s.001.001-.277.962l.278-.96a1 1 0 0 1 .638.558a5.22 5.22 0 0 1 .283 3.37c.928 1.21 1.297 2.77 1.21 4.244c-.097 1.673-.789 3.386-2.123 4.505c-.859.72-1.88 1.122-2.888 1.356c.168.483.237.995.201 1.506V21a1 1 0 1 1-2 0v-2.435q0-.04.004-.08c.02-.26-.015-.522-.106-.768a1.85 1.85 0 0 0-.425-.663a1 1 0 0 1 .601-1.7c1.329-.144 2.498-.45 3.328-1.146c.827-.694 1.34-1.845 1.412-3.09c.073-1.243-.302-2.43-1.05-3.197a1 1 0 0 1-.218-1.055a3.2 3.2 0 0 0 .146-1.794c-.198.05-.457.137-.781.282a10 10 0 0 0-1.363.762a1 1 0 0 1-.803.13a10.9 10.9 0 0 0-5.578 0a1 1 0 0 1-.803-.13a10 10 0 0 0-1.294-.73a5 5 0 0 0-.85-.314a3.2 3.2 0 0 0 .146 1.794a1 1 0 0 1-.218 1.055c-.706.725-1.08 1.82-1.058 2.992s.438 2.293 1.145 3.037c.837.88 2.12 1.25 3.615 1.432a1 1 0 0 1 .59 1.697a1.85 1.85 0 0 0-.422.655c-.09.244-.127.502-.109.759l.003.072V21a1 1 0 1 1-2 0v-.462c-.653.083-1.237.06-1.765-.06c-.864-.198-1.483-.634-1.957-1.096a8 8 0 0 1-.597-.664l-.16-.198a12 12 0 0 0-.29-.35c-.279-.32-.433-.412-.557-.442a1 1 0 1 1 .474-1.943c.746.182 1.244.673 1.59 1.07c.123.14.251.3.366.442l.125.154c.154.189.296.354.446.5c.288.28.593.482 1.006.576c.31.071.732.093 1.314-.01a3.8 3.8 0 0 1 .211-1.409c-1.185-.283-2.393-.793-3.332-1.78c-1.11-1.167-1.666-2.797-1.695-4.378c-.026-1.383.351-2.824 1.221-3.958a5.2 5.2 0 0 1 .283-3.371a1 1 0 0 1 .638-.559l.278.96l-.278-.96h.003l.004-.002l.008-.002l.018-.005a1 1 0 0 1 .137-.028a2 2 0 0 1 .271-.024"
      />
    </svg>
  );
}

export function LinkedInIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="currentColor"
        d="M15.15 8.4a5.83 5.83 0 0 0-5.85 5.82v5.88a.9.9 0 0 0 .9.9h2.1a.9.9 0 0 0 .9-.9v-5.88a1.94 1.94 0 0 1 2.15-1.93a2 2 0 0 1 1.75 2v5.81a.9.9 0 0 0 .9.9h2.1a.9.9 0 0 0 .9-.9v-5.88a5.83 5.83 0 0 0-5.85-5.82"
      />
      <rect width={4.5} height={11.7} x={3} y={9.3} fill="currentColor" rx={0.9} ry={0.9} />
      <circle cx={5.25} cy={5.25} r={2.25} fill="currentColor" />
    </svg>
  );
}

export function InstagramIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.465 1.066C8.638 1.012 9.012 1 12 1s3.362.013 4.534.066s1.972.24 2.672.511c.733.277 1.398.71 1.948 1.27c.56.549.992 1.213 1.268 1.947c.272.7.458 1.5.512 2.67C22.988 8.639 23 9.013 23 12s-.013 3.362-.066 4.535c-.053 1.17-.24 1.97-.512 2.67a5.4 5.4 0 0 1-1.268 1.949c-.55.56-1.215.992-1.948 1.268c-.7.272-1.5.458-2.67.512c-1.174.054-1.548.066-4.536.066s-3.362-.013-4.535-.066c-1.17-.053-1.97-.24-2.67-.512a5.4 5.4 0 0 1-1.949-1.268a5.4 5.4 0 0 1-1.269-1.948c-.271-.7-.457-1.5-.511-2.67C1.012 15.361 1 14.987 1 12s.013-3.362.066-4.534s.24-1.972.511-2.672a5.4 5.4 0 0 1 1.27-1.948a5.4 5.4 0 0 1 1.947-1.269c.7-.271 1.5-.457 2.67-.511m8.98 1.98c-1.16-.053-1.508-.064-4.445-.064s-3.285.011-4.445.064c-1.073.049-1.655.228-2.043.379c-.513.2-.88.437-1.265.822a3.4 3.4 0 0 0-.822 1.265c-.151.388-.33.97-.379 2.043c-.053 1.16-.064 1.508-.064 4.445s.011 3.285.064 4.445c.049 1.073.228 1.655.379 2.043c.176.477.457.91.822 1.265c.355.365.788.646 1.265.822c.388.151.97.33 2.043.379c1.16.053 1.507.064 4.445.064s3.285-.011 4.445-.064c1.073-.049 1.655-.228 2.043-.379c.513-.2.88-.437 1.265-.822c.365-.355.646-.788.822-1.265c.151-.388.33-.97.379-2.043c.053-1.16.064-1.508.064-4.445s-.011-3.285-.064-4.445c-.049-1.073-.228-1.655-.379-2.043c-.2-.513-.437-.88-.822-1.265a3.4 3.4 0 0 0-1.265-.822c-.388-.151-.97-.33-2.043-.379m-5.85 12.345a3.669 3.669 0 0 0 4-5.986a3.67 3.67 0 1 0-4 5.986M8.002 8.002a5.654 5.654 0 1 1 7.996 7.996a5.654 5.654 0 0 1-7.996-7.996m10.906-.814a1.337 1.337 0 1 0-1.89-1.89a1.337 1.337 0 0 0 1.89 1.89"
      />
    </svg>
  );
}