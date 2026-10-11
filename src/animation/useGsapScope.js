import { useEffect } from "react";
import gsap from "gsap";

/**
 * useGsapScope
 * Wrapper around gsap.context ensuring automatic cleanup (ctx.revert())
 * and preventing duplicate animations in React StrictMode.
 *
 * @param {React.RefObject} scopeRef  - Scoped DOM container
 * @param {Function} createAnimation  - Function () => void  (ctx no longer passed — use gsap directly inside)
 * @param {Array} deps                - Dependency list
 */
export function useGsapScope(scopeRef, createAnimation, deps = []) {
  useEffect(() => {
    if (!scopeRef?.current) return;

    // gsap.context() ka callback synchronously run hota hai.
    // ctx ko directly callback ke andar pass karna TDZ crash deta hai.
    // Fix: createAnimation() bina argument ke call karo;
    // Hero jaise callers jo idle tweens chalate hain, woh ctx.add() ki
    // jagah seedha gsap.to() call karein — context scope auto-apply hota hai.
    const ctx = gsap.context(() => {
      createAnimation();
    }, scopeRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useGsapScope;
