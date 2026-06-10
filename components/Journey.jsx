"use client";

import { useRef } from "react";
import DrawPath from "./DrawPath";
import { usePinProgress, mapRange } from "./useScroll";

const JOURNEY_HEAD = "Here with you every step of the way.";
const GOLD_WORDS = new Set(["every", "way"]);

export default function Journey() {
  const ref = useRef(null);
  const p = usePinProgress(ref);

  const words = JOURNEY_HEAD.split(" ");
  const litStart = 0.05;
  const litEnd = 0.46;
  const bgShift = mapRange(p, 0, 1, 215, 232);

  const W = "#ffffff";
  const G = "#E7B53C";
  const lot = mapRange(p, 0.03, 0.1, 0, 1);
  const found = mapRange(p, 0.1, 0.2, 0, 1);
  const frameW = mapRange(p, 0.2, 0.33, 0, 1);
  const studs = mapRange(p, 0.27, 0.39, 0, 1);
  const frameR = mapRange(p, 0.32, 0.45, 0, 1);
  const rafters = mapRange(p, 0.38, 0.47, 0, 1);
  const frameWing = mapRange(p, 0.24, 0.36, 0, 1);
  const chimney = mapRange(p, 0.46, 0.51, 0, 1);
  const battens = mapRange(p, 0.48, 0.55, 0, 1);
  const gableWin = mapRange(p, 0.52, 0.57, 0, 1);
  const portico = mapRange(p, 0.54, 0.61, 0, 1);
  const winM = mapRange(p, 0.57, 0.65, 0, 1);
  const winW = mapRange(p, 0.62, 0.67, 0, 1);
  const door = mapRange(p, 0.65, 0.71, 0, 1);

  const photo = mapRange(p, 0.7, 0.83, 0, 1);
  const lineFade = mapRange(p, 0.72, 0.83, 1, 0);
  const photoScale = mapRange(p, 0.7, 0.92, 1.06, 1);

  const keyOpacity = mapRange(p, 0.84, 0.88, 0, 1);
  const keyDraw = mapRange(p, 0.85, 0.94, 0, 1);
  const keyTurn = mapRange(p, 0.9, 1, -34, 6);
  const glow = mapRange(p, 0.83, 1, 0, 1);
  const glyphScale = mapRange(p, 0, 1, 0.86, 1.08);

  const stage = p < 0.18 ? 0 : p < 0.45 ? 1 : p < 0.83 ? 2 : 3;
  const stages = ["Pre-Approval", "House Shopping", "Under Contract", "Move-in Day"];

  return (
    <section className="journey" ref={ref}>
      <div
        className="journey-pin"
        style={{
          background: `radial-gradient(60% 70% at 50% 30%, hsl(${bgShift} 84% 22%) 0%, var(--ink) 70%)`,
        }}
      >
        <div className="journey-grain" />

        <div className="journey-rail">
          <span style={{ height: `${p * 100}%` }} />
        </div>

        <div
          className="journey-hint"
          style={{ opacity: mapRange(p, 0, 0.08, 1, 0) }}
        >
          Keep scrolling <span className="hint-arrow">↓</span>
        </div>

        <div
          className="journey-glyph"
          style={{ transform: `scale(${glyphScale})` }}
        >
          <div
            className="glyph-glow"
            style={{
              opacity: glow,
              transform: `scale(${0.6 + glow * 0.7})`,
            }}
          />

          <div
            className="glyph-photo"
            style={{
              opacity: photo,
              transform: `scale(${photoScale})`,
              boxShadow: `0 24px 60px rgba(0,0,0,.45), 0 0 ${
                glow * 50
              }px rgba(231,181,60,${glow * 0.55})`,
            }}
          >
            <img
              src="/images/farmhouse-finished.jpg"
              alt="The finished modern farmhouse"
            />
          </div>

          <svg
            viewBox="0 0 300 220"
            className="glyph-svg"
            style={{ opacity: lineFade }}
          >
            <DrawPath
              d="M18 196 L282 196"
              draw={lot}
              stroke={W}
              width={3}
            />
            <DrawPath
              d="M40 196 L40 188 M260 196 L260 188"
              draw={lot}
              stroke={W}
              width={2}
            />

            <DrawPath
