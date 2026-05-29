"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns 0..1 representing how far an element has traveled through the
 * viewport. 0 = top of element entering bottom of viewport; 1 = bottom of
 * element leaving top of viewport. Cheap, rAF-batched, passive-scroll.
 */
export function useScrollProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const prog = (vh - r.top) / (r.height + vh);
      setP(Math.min(1, Math.max(0, prog)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
  return p;
}

/**
 * For tall sections containing a `position: sticky` inner element. Returns
 * 0..1 progress across the pinned scroll distance. This drives the
 * Apple-style scrubbed storytelling on the homepage.
 */
export function usePinProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const scrollable = r.height - vh;
      const prog = scrollable > 0 ? -r.top / scrollable : 0;
      setP(Math.min(1, Math.max(0, prog)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
  return p;
}

/** Linear interpolation between two ranges, clamped to [outMin, outMax]. */
export function mapRange(v, inMin, inMax, outMin, outMax) {
  const t = Math.min(1, Math.max(0, (v - inMin) / (inMax - inMin || 1)));
  return outMin + (outMax - outMin) * t;
}
