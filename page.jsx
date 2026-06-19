"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const COBALT = "#1338DE";
const COBALT_DEEP = "#0B1E8A";
const ORANGE = "#FF6B35";
const GOLD = "#E7B53C";
const INK = "#0A0B14";
const CREAM = "#FBF6EA";

const SEG_COLORS = [COBALT, ORANGE, GOLD, COBALT_DEEP];
const textColorFor = (bg) => (bg === GOLD ? INK : "#FFFFFF");
const FONT = '700 SZ px "Clash Display", system-ui, sans-serif';

function parseNames(raw) {
  return raw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
}

export default function DrawPage() {
  const [raw, setRaw] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [recording, setRecording] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);

  const names = parseNames(raw);

  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const namesRef = useRef([]);
  const rotationRef = useRef(0);
  const sizeRef = useRef(440);
  const rafRef = useRef(0);
  const spinningRef = useRef(false);

  useEffect(() => { namesRef.current = parseNames(raw); }, [raw]);
  useEffect(() => { spinningRef.current = spinning; }, [spinning]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const size = sizeRef.current;
    if (canvas.width !== Math.round(size * dpr)) {
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      canvas.style.width = size + "px";
      canvas.style.height = size + "px";
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const list = namesRef.current;
    const n = Math.max(list.length, 1);
    const seg = (2 * Math.PI) / n;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 8;
    const hubR = size * 0.115;
    const rotation = rotationRef.current;

    for (let i = 0; i < n; i++) {
      const start = -Math.PI / 2 + i * seg + rotation;
      const end = start + seg;
      const fill = list.length ? SEG_COLORS[i % SEG_COLORS.length] : "#E5E7EF";
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.16)";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (list.length) {
        const mid = start + seg / 2;
        let fontSize = Math.min(24, Math.max(7, seg * r * 0.62));
        if (fontSize >= 7) {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(mid);
          ctx.textAlign = "right";
          ctx.textBaseline = "middle";
          ctx.fillStyle = textColorFor(fill);
          ctx.font = FONT.replace("SZ", fontSize.toFixed(1));
          const maxW = r - hubR - 22;
          let label = list[i];
          if (ctx.measureText(label).width > maxW) {
            while (label.length > 1 && ctx.measureText(label + "…").width > maxW) {
              label = label.slice(0, -1);
            }
            label += "…";
          }
          ctx.fillText(label, r - 14, 0);
          ctx.restore();
        }
      }
    }

    // gold rim
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.lineWidth = 9;
    ctx.strokeStyle = GOLD;
    ctx.stroke();

    // hub
    ctx.beginPath();
    ctx.arc(cx, cy, hubR, 0, 2 * Math.PI);
    ctx.fillStyle = INK;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = GOLD;
    ctx.stroke();
    ctx.font = `${hubR * 1.15}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🦆", cx, cy + size * 0.004);
  }, []);

  const resize = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const w = wrap.clientWidth;
    const size = Math.max(280, Math.min(w, window.innerHeight * 0.66, 600));
    sizeRef.current = size;
    draw();
  }, [draw]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  useEffect(() => { draw(); }, [raw, recording, panelOpen, draw]);

  const spin = useCallback(() => {
    const list = namesRef.current;
    if (spinningRef.current || list.length === 0) return;
    setWinner(null);
    setSpinning(true);
    const n = list.length;
    const seg = (2 * Math.PI) / n;
    const winnerIndex = Math.floor(Math.random() * n);
    const turns = 6 + Math.floor(Math.random() * 4);
    const current = rotationRef.current;
    const targetMod = ((-(winnerIndex * seg + seg / 2)) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    const currentMod = ((current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    let delta = targetMod - currentMod;
    if (delta < 0) delta += 2 * Math.PI;
    const target = current + turns * 2 * Math.PI + delta;
    const startRot = current;
    const dur = 5200 + Math.random() * 900;
    const t0 = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const frame = (now) => {
      const t = Math.min((now - t0) / dur, 1);
      rotationRef.current = startRot + (target - startRot) * easeOut(t);
      draw();
      if (t < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        rotationRef.current = target;
        draw();
        setSpinning(false);
        setWinner(list[winnerIndex]);
      }
    };
    rafRef.current = requestAnimationFrame(frame);
  }, [draw]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // spacebar spins (unless typing in the entries box)
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "Space" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
        spin();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [spin]);

  const shuffle = () => {
    const arr = parseNames(raw);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setRaw(arr.join("\n"));
  };

  const spinAgain = () => { setWinner(null); setTimeout(spin, 60); };

  const removeWinner = () => {
    const lines = raw.split(/\r?\n/);
    const idx = lines.findIndex((l) => l.trim() === winner);
    if (idx >= 0) lines.splice(idx, 1);
    setRaw(lines.join("\n"));
    setWinner(null);
  };

  // styles
  const pageStyle = { minHeight: "100vh", background: `radial-gradient(120% 90% at 50% -10%, ${COBALT_DEEP} 0%, ${INK} 60%)`, color: "#fff", fontFamily: "var(--body), sans-serif", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 20px 60px", position: "relative", overflow: "hidden" };
  const backLinkStyle = { position: "absolute", top: "22px", left: "24px", color: "rgba(255,255,255,.7)", fontFamily: "var(--disp)", fontWeight: 600, fontSize: ".95rem", textDecoration: "none", display: recording ? "none" : "inline-flex", alignItems: "center", gap: "6px", zIndex: 4 };
  const recBtnStyle = { position: "absolute", top: "20px", right: "24px", zIndex: 4, display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "999px", border: `1.5px solid ${recording ? ORANGE : "rgba(255,255,255,.3)"}`, background: recording ? ORANGE : "rgba(255,255,255,.06)", color: "#fff", fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".82rem", letterSpacing: ".08em", textTransform: "uppercase", cursor: "pointer" };
  const headWrapStyle = { textAlign: "center", margin: "70px 0 6px", display: recording ? "none" : "block" };
  const eyebrowStyle = { display: "inline-flex", alignItems: "center", gap: "8px", color: GOLD, fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".82rem", letterSpacing: ".16em", textTransform: "uppercase" };
  const titleStyle = { fontFamily: "var(--disp)", fontWeight: 600, fontSize: "clamp(2.4rem, 6vw, 4.2rem)", lineHeight: 1, letterSpacing: "-.02em", margin: "10px 0 0" };
  const stageStyle = { width: "100%", maxWidth: "640px", display: "flex", flexDirection: "column", alignItems: "center", marginTop: recording ? "40px" : "26px" };
  const wheelWrapStyle = { position: "relative", width: "100%", display: "flex", justifyContent: "center", cursor: names.length && !spinning ? "pointer" : "default" };
  const pointerStyle = { position: "absolute", top: "-6px", left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", pointerEvents: "none" };
  const pointerTriStyle = { width: 0, height: 0, borderLeft: "17px solid transparent", borderRight: "17px solid transparent", borderTop: `26px solid ${GOLD}`, filter: "drop-shadow(0 3px 4px rgba(0,0,0,.4))", marginTop: "-2px" };
  const countStyle = { marginTop: "22px", color: "rgba(255,255,255,.65)", fontFamily: "var(--disp)", fontWeight: 600, fontSize: ".95rem", letterSpacing: ".04em" };
  const spinBtnStyle = { marginTop: "18px", padding: "20px 64px", borderRadius: "999px", border: "3px solid #fff", background: names.length && !spinning ? `linear-gradient(135deg, #FFD75E 0%, ${GOLD} 55%, #D9A030 100%)` : "rgba(255,255,255,.12)", color: names.length && !spinning ? INK : "rgba(255,255,255,.45)", fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1.7rem", letterSpacing: ".04em", cursor: names.length && !spinning ? "pointer" : "not-allowed", boxShadow: names.length && !spinning ? "0 16px 50px rgba(231,181,60,.5)" : "none", animation: names.length && !spinning ? "spinpulse 2.2s ease-in-out infinite" : "none" };
  const utilRowStyle = { display: recording ? "none" : "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap", justifyContent: "center" };
  const utilBtnStyle = { padding: "11px 20px", borderRadius: "999px", border: "1.5px solid rgba(255,255,255,.25)", background: "rgba(255,255,255,.06)", color: "#fff", fontFamily: "var(--disp)", fontWeight: 600, fontSize: ".9rem", cursor: "pointer" };
  const panelStyle = { display: recording ? "none" : "block", width: "100%", maxWidth: "640px", marginTop: "30px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "20px", padding: "22px" };
  const panelLabelStyle = { fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".95rem", marginBottom: "4px" };
  const panelHintStyle = { color: "rgba(255,255,255,.6)", fontSize: ".85rem", lineHeight: 1.5, margin: "0 0 14px" };
  const textareaStyle = { width: "100%", minHeight: "150px", resize: "vertical", padding: "14px 16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,.18)", background: "rgba(0,0,0,.25)", color: "#fff", fontFamily: "var(--body), monospace", fontSize: "1rem", lineHeight: 1.5, outline: "none", boxSizing: "border-box" };

  const Confetti = () => {
    const pieces = useRef(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        dur: 2.4 + Math.random() * 1.8,
        rot: Math.random() * 360,
        emoji: Math.random() < 0.55,
        color: [COBALT, ORANGE, GOLD][i % 3],
        size: 12 + Math.random() * 14,
      }))
    ).current;
    return (
      <div className="confetti-layer" aria-hidden="true">
        {pieces.map((p) => (
          <span
            key={p.id}
            className="confetti-piece"
            style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, transform: `rotate(${p.rot}deg)`, fontSize: p.emoji ? `${p.size + 8}px` : undefined, width: p.emoji ? undefined : `${p.size}px`, height: p.emoji ? undefined : `${p.size}px`, background: p.emoji ? undefined : p.color, borderRadius: p.emoji ? undefined : "2px" }}
          >
            {p.emoji ? "🦆" : ""}
          </span>
        ))}
      </div>
    );
  };

  return (
    <main style={pageStyle}>
      <style>{`
        @keyframes spinpulse { 0%,100% { box-shadow: 0 16px 50px rgba(231,181,60,.45); } 50% { box-shadow: 0 22px 70px rgba(231,181,60,.75); } }
        @keyframes winner-pop { 0% { transform: scale(.6); opacity: 0; } 60% { transform: scale(1.08); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes confetti-fall { 0% { transform: translateY(-12vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(108vh) rotate(540deg); opacity: 1; } }
        .confetti-layer { position: fixed; inset: 0; pointer-events: none; z-index: 30; overflow: hidden; }
        .confetti-piece { position: absolute; top: -10vh; display: inline-block; animation-name: confetti-fall; animation-timing-function: linear; animation-iteration-count: 1; }
        .draw-modal-card { animation: winner-pop .55s cubic-bezier(.34,1.56,.64,1) both; }
        @media (prefers-reduced-motion: reduce) { .confetti-layer { display: none; } .draw-modal-card { animation: none; } }
      `}</style>

      <a href="/duckwichita" style={backLinkStyle}>← DuckWichita</a>
      <button style={recBtnStyle} onClick={() => setRecording((v) => !v)}>
        {recording ? "Exit recording" : "● Recording mode"}
      </button>

      <div style={headWrapStyle}>
        <span style={eyebrowStyle}>🦆 DuckWichita · Live Drawing</span>
        <h1 style={titleStyle}>Spin the flock.</h1>
      </div>

      <div style={stageStyle}>
        <div ref={wrapRef} style={wheelWrapStyle} onClick={spin}>
          <div style={pointerStyle}>
            <div style={{ fontSize: "26px", lineHeight: 1, marginBottom: "-4px", filter: "drop-shadow(0 2px 3px rgba(0,0,0,.4))" }}>🦆</div>
            <div style={pointerTriStyle} />
          </div>
          <canvas ref={canvasRef} />
          {names.length === 0 && (
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", color: "rgba(255,255,255,.7)", fontFamily: "var(--disp)", fontWeight: 600, maxWidth: "60%", pointerEvents: "none" }}>
              Paste your eligible entries below to load the flock.
            </div>
          )}
        </div>

        <div style={countStyle}>
          {names.length > 0 ? `${names.length} in the flock` : "No entries loaded yet"}
        </div>

        <button style={spinBtnStyle} onClick={spin} disabled={!names.length || spinning}>
          {spinning ? "Spinning…" : "SPIN"}
        </button>

        <div style={utilRowStyle}>
          <button style={utilBtnStyle} onClick={shuffle} disabled={!names.length || spinning}>Shuffle order</button>
          <button style={utilBtnStyle} onClick={() => setPanelOpen((v) => !v)}>{panelOpen ? "Hide entries" : "Edit entries"}</button>
        </div>
      </div>

      {panelOpen && (
        <div style={panelStyle}>
          <div style={panelLabelStyle}>Eligible entries</div>
          <p style={panelHintStyle}>
            Paste the names from your <strong>Giveaway</strong> tab — one per line. Keep duplicates: someone with 5 entries should appear 5 times, which gives them 5× the odds.
          </p>
          <textarea
            style={textareaStyle}
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder={"Garrett\nHannah\nLogan\nMaria\n..."}
            spellCheck={false}
          />
        </div>
      )}

      {winner && (
        <>
          <Confetti />
          <div
            style={{ position: "fixed", inset: 0, zIndex: 31, background: "rgba(10,11,20,.72)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
            onClick={() => setWinner(null)}
          >
            <div
              className="draw-modal-card"
              style={{ background: CREAM, color: INK, borderRadius: "28px", padding: "48px 40px 38px", maxWidth: "520px", width: "100%", textAlign: "center", border: `4px solid ${GOLD}`, boxShadow: "0 40px 100px rgba(0,0,0,.5)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ fontSize: "54px", lineHeight: 1 }}>🦆</div>
              <div style={{ fontFamily: "var(--disp)", fontWeight: 700, color: ORANGE, letterSpacing: ".18em", textTransform: "uppercase", fontSize: ".95rem", margin: "14px 0 6px" }}>Winner!</div>
              <div style={{ fontFamily: "var(--disp)", fontWeight: 600, fontSize: "clamp(2.2rem, 7vw, 3.4rem)", lineHeight: 1.05, letterSpacing: "-.02em", wordBreak: "break-word" }}>{winner}</div>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "30px" }}>
                <button onClick={spinAgain} style={{ padding: "14px 28px", borderRadius: "999px", border: "none", background: GOLD, color: INK, fontFamily: "var(--disp)", fontWeight: 700, fontSize: "1rem", cursor: "pointer" }}>Spin again</button>
                <button onClick={removeWinner} style={{ padding: "14px 28px", borderRadius: "999px", border: `2px solid ${INK}`, background: "transparent", color: INK, fontFamily: "var(--disp)", fontWeight: 700, fontSize: "1rem", cursor: "pointer" }}>Remove winner</button>
              </div>
              <button onClick={() => setWinner(null)} style={{ marginTop: "16px", background: "none", border: "none", color: "rgba(10,11,20,.5)", fontFamily: "var(--disp)", fontWeight: 600, fontSize: ".9rem", cursor: "pointer" }}>Close</button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
