"use client";

import { useEffect, useRef, useState } from "react";

/**
 * An SVG path that draws itself from 0→1 based on `draw`. Measures its own
 * length on mount via getTotalLength() so the reveal is exact regardless of
 * shape. Used by the construction sequence in <Journey />.
 */
export default function DrawPath({ d, draw, stroke = "#fff", width = 3.4, glow }) {
  const ref = useRef(null);
  const [len, setLen] = useState(0);

  useEffect(() => {
    if (ref.current) {
      try {
        setLen(ref.current.getTotalLength());
      } catch {
        // older browsers / odd paths — fall back to a sane default
      }
    }
  }, [d]);

  const L = len || 1;
  const dd = Math.min(1, Math.max(0, draw));

  return (
    <path
      ref={ref}
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        strokeDasharray: L,
        strokeDashoffset: L * (1 - dd),
        filter: glow ? `drop-shadow(0 0 5px ${glow})` : undefined,
      }}
    />
  );
}
