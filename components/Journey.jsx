"use client";

import { useRef } from "react";
import DrawPath from "./DrawPath";
import { usePinProgress, mapRange } from "./useScroll";

const JOURNEY_HEAD =
  "We build it together — from the ground up to the keys in your hand.";
const GOLD_WORDS = new Set(["keys", "together"]);

/**
 * Pinned, scroll-scrubbed storytelling section.
 *
 * As the user scrolls through this tall (`460vh`) section, an inner
 * 100vh container stays pinned while a modern farmhouse builds itself
 * from a blank lot through framing to finished home, ending with the
 * golden key turning over the photographed result.
 *
 * To tune pacing globally: change the `.journey` height in globals.css.
 * To tune a single stage: adjust its `mapRange(p, start, end, ...)` below.
 */
export default function Journey() {
  const ref = useRef(null);
  const p = usePinProgress(ref);

  const words = JOURNEY_HEAD.split(" ");
  const litStart = 0.05;
  const litEnd = 0.46;
  const bgShift = mapRange(p, 0, 1, 215, 232);

  // build timeline
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

  // wireframe → photo crossfade
  const photo = mapRange(p, 0.7, 0.83, 0, 1);
  const lineFade = mapRange(p, 0.72, 0.83, 1, 0);
  const photoScale = mapRange(p, 0.7, 0.92, 1.06, 1);

  // golden key + glow
  const keyOpacity = mapRange(p, 0.84, 0.88, 0, 1);
  const keyDraw = mapRange(p, 0.85, 0.94, 0, 1);
  const keyTurn = mapRange(p, 0.9, 1, -34, 6);
  const glow = mapRange(p, 0.83, 1, 0, 1);
  const glyphScale = mapRange(p, 0, 1, 0.86, 1.08);

  const stage = p < 0.18 ? 0 : p < 0.45 ? 1 : p < 0.83 ? 2 : 3;
  const stages = ["The lot", "Foundation", "Framing", "Move-in day"];

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

          {/* The finished home — fades in as wireframe fades out */}
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

          {/* The wireframe being built */}
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
              d="M50 196 L50 189 L216 189 L216 196 M126 189 L126 196"
              draw={found}
              stroke={W}
              width={2.6}
            />

            <DrawPath
              d="M126 189 L126 110 L214 110 L214 189"
              draw={frameW}
              stroke={W}
            />
            <DrawPath
              d="M58 189 L58 150 L126 150"
              draw={frameWing}
              stroke={W}
            />
            <DrawPath
              d="M150 110 L150 189 M178 110 L178 189 M90 150 L90 189"
              draw={studs}
              stroke={W}
              width={2}
            />
            <DrawPath
              d="M112 110 L170 56 L228 110"
              draw={frameR}
              stroke={W}
              width={3.6}
            />
            <DrawPath
              d="M170 56 L170 110 M141 83 L199 83"
              draw={rafters}
              stroke={W}
              width={2}
            />
            <DrawPath
              d="M52 152 L128 128"
              draw={frameR}
              stroke={W}
              width={3.6}
            />

            <DrawPath
              d="M198 92 L198 70 L210 70 L210 92"
              draw={chimney}
              stroke={W}
            />
            <DrawPath
              d="M150 110 L150 80 M190 110 L190 80"
              draw={battens}
              stroke={W}
              width={2.4}
            />
            <DrawPath
              d="M161 78 L179 78 L179 96 L161 96 Z"
              draw={gableWin}
              stroke={W}
              width={2.6}
            />
            <DrawPath
              d="M148 152 L192 152 M150 152 L150 196 M190 152 L190 196"
              draw={portico}
              stroke={W}
            />
            <DrawPath
              d="M132 124 L148 124 L148 170 L132 170 Z M140 124 L140 170"
              draw={winM}
              stroke={W}
              width={2.6}
            />
            <DrawPath
              d="M192 124 L208 124 L208 170 L192 170 Z M200 124 L200 170"
              draw={winM}
              stroke={W}
              width={2.6}
            />
            <DrawPath
              d="M76 162 L104 162 L104 184 L76 184 Z M90 162 L90 184"
              draw={winW}
              stroke={W}
              width={2.6}
            />
            <DrawPath
              d="M162 196 L162 153 L178 153 L178 196"
              draw={door}
              stroke={W}
              width={2.8}
            />
          </svg>

          {/* The golden key — turns over the finished home */}
          <svg viewBox="0 0 300 220" className="glyph-key-svg">
            <g
              style={{
                opacity: keyOpacity,
                transformBox: "fill-box",
                transformOrigin: "center",
                transform: `rotate(${keyTurn}deg)`,
              }}
            >
              <DrawPath
                d="M150 120 A15 15 0 1 0 150 150 A15 15 0 1 0 150 120 Z"
                draw={keyDraw}
                stroke={G}
                width={4}
                glow="rgba(231,181,60,.85)"
              />
              <DrawPath
                d="M150 150 L150 184 M150 175 L164 175 M150 166 L161 166"
                draw={keyDraw}
                stroke={G}
                width={4}
                glow="rgba(231,181,60,.85)"
              />
            </g>
          </svg>
        </div>

        <h2 className="journey-head">
          {words.map((w, i) => {
            const wStart = mapRange(i, 0, words.length, litStart, litEnd);
            const local = mapRange(p, wStart, wStart + 0.1, 0, 1);
            const gold = GOLD_WORDS.has(
              w.replace(/[^a-z]/gi, "").toLowerCase()
            );
            return (
              <span
                key={i}
                className="jword"
                style={{
                  opacity: 0.14 + local * 0.86,
                  color: gold
                    ? `rgba(231,181,60,${0.4 + local * 0.6})`
                    : `rgba(255,255,255,${0.18 + local * 0.82})`,
                  transform: `translateY(${(1 - local) * 8}px)`,
                }}
              >
                {w}&nbsp;
              </span>
            );
          })}
        </h2>

        <div className="journey-stages">
          {stages.map((s, i) => (
            <div
              key={s}
              className={`jstage ${i === stage ? "active" : ""} ${
                i < stage ? "done" : ""
              }`}
            >
              <span className="jstage-num">0{i + 1}</span>
              <span className="jstage-label">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
