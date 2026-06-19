"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const COBALT = "#1338DE";
const COBALT_DEEP = "#0B1E8A";
const ORANGE = "#FF6B35";
const GOLD = "#E7B53C";
const INK = "#0A0B14";
const CREAM = "#FBF6EA";
const HUB_LOGO = "/images/roundlogo.png";
const WORDMARK = "/images/duckwichitalogo.png";

const SEG_COLORS = [COBALT, ORANGE, GOLD, COBALT_DEEP];
const textColorFor = (bg) => (bg === GOLD ? INK : "#FFFFFF");
const FONT = '700 SZ px "Clash Display", system-ui, sans-serif';

function parseNames(raw) {
  return raw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
}

const FAQS = [
  { q: "Is the random name picker free?", a: "Yes. It is completely free, with no sign-up and no limits. Everything runs in your browser, and your list is never uploaded or saved anywhere." },
  { q: "How does the wheel choose a winner?", a: "Every name becomes a slice of the wheel. When you spin, one slice is selected at random and revealed as the winner. The more slices a name has, the better its odds." },
  { q: "Can I give one name more chances to win?", a: "Yes. Add a name more than once and it gets that many slices. Five entries means five slices and five times the odds, which keeps weighted drawings fair." },
  { q: "Can I use it for giveaways, raffles, or classrooms?", a: "Absolutely. Paste any list of names, students, teams, or ticket numbers, then spin to pick a winner. It works great for giveaways, raffles, prize drawings, and classroom callouts." },
  { q: "Is it actually random?", a: "Yes. Each spin uses your browser's built-in randomness to choose the winning slice, so every name on the wheel gets a fair shot." },
];

export default function DrawPage() {
  const [raw, setRaw] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [clean, setClean] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [muted, setMuted] = useState(false);
  const [winners, setWinners] = useState([]);

  const names = parseNames(raw);

  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const mainRef = useRef(null);
  const namesRef = useRef([]);
  const rotationRef = useRef(0);
  const sizeRef = useRef(440);
  const rafRef = useRef(0);
  const spinningRef = useRef(false);
  const mutedRef = useRef(false);
  const logoRef = useRef(null);
  const audioRef = useRef(null);
  const lastSegRef = useRef(-1);

  useEffect(() => { namesRef.current = parseNames(raw); }, [raw]);
  useEffect(() => { spinningRef.current = spinning; }, [spinning]);
  useEffect(() => { mutedRef.current = muted; }, [muted]);

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
    const hubR = size * 0.13;
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
        const fontSize = Math.min(24, Math.max(7, seg * r * 0.62));
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
    const logo = logoRef.current;
    if (logo && logo.complete && logo.naturalWidth) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, hubR - 4, 0, 2 * Math.PI);
      ctx.clip();
      const d = (hubR - 4) * 2;
      const scale = Math.max(d / logo.naturalWidth, d / logo.naturalHeight);
      const dw = logo.naturalWidth * scale;
      const dh = logo.naturalHeight * scale;
      ctx.drawImage(logo, cx - dw / 2, cy - dh / 2, dw, dh);
      ctx.restore();
    } else {
      ctx.font = `${hubR * 1.1}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🦆", cx, cy + size * 0.004);
    }
    ctx.beginPath();
    ctx.arc(cx, cy, hubR, 0, 2 * Math.PI);
    ctx.lineWidth = 5;
    ctx.strokeStyle = GOLD;
    ctx.stroke();
  }, []);

  const resize = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const w = wrap.clientWidth;
    const size = Math.max(280, Math.min(w, window.innerHeight * 0.66, 620));
    sizeRef.current = size;
    draw();
  }, [draw]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => { logoRef.current = img; draw(); };
    img.onerror = () => { logoRef.current = null; };
    img.src = HUB_LOGO;
  }, [draw]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("fullscreenchange", resize);
    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("fullscreenchange", resize);
    };
  }, [resize]);

  useEffect(() => { draw(); }, [raw, clean, panelOpen, winner, draw]);
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // audio
  const ensureAudio = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioRef.current = new Ctx();
    }
    if (audioRef.current && audioRef.current.state === "suspended") audioRef.current.resume();
    return audioRef.current;
  }, []);

  const playTick = useCallback(() => {
    if (mutedRef.current) return;
    const ac = audioRef.current;
    if (!ac) return;
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = "square";
    o.frequency.value = 1100;
    const t = ac.currentTime;
    g.gain.setValueAtTime(0.05, t);
    g.gain.exponentialRampToValueAtTime(0.0008, t + 0.045);
    o.connect(g);
    g.connect(ac.destination);
    o.start(t);
    o.stop(t + 0.05);
  }, []);

  const playFanfare = useCallback(() => {
    if (mutedRef.current) return;
    const ac = audioRef.current;
    if (!ac) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = "triangle";
      o.frequency.value = f;
      const t = ac.currentTime + i * 0.11;
      g.gain.setValueAtTime(0.0008, t);
      g.gain.exponentialRampToValueAtTime(0.16, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0008, t + 0.4);
      o.connect(g);
      g.connect(ac.destination);
      o.start(t);
      o.stop(t + 0.42);
    });
  }, []);

  const spin = useCallback(() => {
    const list = namesRef.current;
    if (spinningRef.current || list.length === 0) return;
    ensureAudio();
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
    lastSegRef.current = -1;
    const frame = (now) => {
      const t = Math.min((now - t0) / dur, 1);
      const rot = startRot + (target - startRot) * easeOut(t);
      rotationRef.current = rot;
      const curSeg = ((Math.floor(-rot / seg) % n) + n) % n;
      if (curSeg !== lastSegRef.current) {
        lastSegRef.current = curSeg;
        playTick();
      }
      draw();
      if (t < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        rotationRef.current = target;
        draw();
        setSpinning(false);
        const w = list[winnerIndex];
        setWinner(w);
        setWinners((prev) => [...prev, w]);
        playFanfare();
      }
    };
    rafRef.current = requestAnimationFrame(frame);
  }, [draw, ensureAudio, playTick, playFanfare]);

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

  const toggleFullscreen = () => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      mainRef.current && mainRef.current.requestFullscreen && mainRef.current.requestFullscreen();
    } else {
      document.exitFullscreen && document.exitFullscreen();
    }
  };

  // styles
  const pageStyle = { minHeight: "100vh", background: `radial-gradient(125% 90% at 50% -10%, ${COBALT_DEEP} 0%, ${INK} 62%)`, color: "#fff", fontFamily: "var(--body), sans-serif", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 20px 0", position: "relative", overflowX: "hidden" };
  const backLinkStyle = { position: "absolute", top: "22px", left: "24px", color: "rgba(255,255,255,.7)", fontFamily: "var(--disp)", fontWeight: 600, fontSize: ".95rem", textDecoration: "none", zIndex: 4 };
  const clusterStyle = { position: "absolute", top: "18px", right: "22px", display: "flex", gap: "10px", zIndex: 4 };
  const pillBtn = (active) => ({ display: "inline-flex", alignItems: "center", gap: "7px", padding: "9px 16px", borderRadius: "999px", border: `1.5px solid ${active ? ORANGE : "rgba(255,255,255,.28)"}`, background: active ? ORANGE : "rgba(255,255,255,.06)", color: "#fff", fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".78rem", letterSpacing: ".06em", textTransform: "uppercase", cursor: "pointer" });
  const headStyle = { textAlign: "center", marginTop: clean ? "54px" : "78px", display: "flex", flexDirection: "column", alignItems: "center" };
  const logoPlateStyle = { background: CREAM, borderRadius: "20px", padding: "12px 26px", display: "inline-block", boxShadow: "0 16px 44px rgba(0,0,0,.4)", border: `2px solid rgba(231,181,60,.55)` };
  const logoImgStyle = { display: "block", width: "100%", maxWidth: "340px", height: "auto" };
  const liveStyle = { fontFamily: "var(--disp)", fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(2.6rem, 8vw, 4.6rem)", lineHeight: 1, letterSpacing: ".015em", margin: "18px 0 0", background: `linear-gradient(180deg, #FFE9A8 0%, ${GOLD} 55%, #C8962A 100%)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent", animation: "live-glow 2.6s ease-in-out infinite" };
  const subStyle = { color: "rgba(255,255,255,.62)", fontFamily: "var(--disp)", fontWeight: 600, fontSize: "1rem", letterSpacing: ".04em", margin: "14px 0 0" };
  const stageStyle = { width: "100%", maxWidth: "660px", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "26px" };
  const wheelWrapStyle = { position: "relative", width: "100%", display: "flex", justifyContent: "center", cursor: names.length && !spinning ? "pointer" : "default" };
  const pointerStyle = { position: "absolute", top: "-4px", left: "50%", transform: "translateX(-50%)", zIndex: 3, pointerEvents: "none" };
  const pointerTriStyle = { width: 0, height: 0, borderLeft: "18px solid transparent", borderRight: "18px solid transparent", borderTop: `28px solid ${GOLD}`, filter: "drop-shadow(0 3px 4px rgba(0,0,0,.45))" };
  const countStyle = { marginTop: "22px", color: "rgba(255,255,255,.65)", fontFamily: "var(--disp)", fontWeight: 600, fontSize: ".95rem", letterSpacing: ".04em" };
  const spinBtnStyle = { marginTop: "16px", padding: "20px 64px", borderRadius: "999px", border: "3px solid #fff", background: names.length && !spinning ? `linear-gradient(135deg, #FFD75E 0%, ${GOLD} 55%, #D9A030 100%)` : "rgba(255,255,255,.12)", color: names.length && !spinning ? INK : "rgba(255,255,255,.45)", fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1.7rem", letterSpacing: ".04em", cursor: names.length && !spinning ? "pointer" : "not-allowed", boxShadow: names.length && !spinning ? "0 16px 50px rgba(231,181,60,.5)" : "none", animation: names.length && !spinning ? "spinpulse 2.2s ease-in-out infinite" : "none" };
  const utilRowStyle = { display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap", justifyContent: "center" };
  const utilBtnStyle = { padding: "11px 20px", borderRadius: "999px", border: "1.5px solid rgba(255,255,255,.25)", background: "rgba(255,255,255,.06)", color: "#fff", fontFamily: "var(--disp)", fontWeight: 600, fontSize: ".9rem", cursor: "pointer" };
  const winnersWrapStyle = { width: "100%", maxWidth: "660px", marginTop: "26px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "16px", padding: "16px 18px" };
  const winnersHeadStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".95rem", marginBottom: "10px" };
  const chipStyle = { display: "inline-block", background: "rgba(231,181,60,.16)", border: `1px solid rgba(231,181,60,.45)`, color: GOLD, borderRadius: "999px", padding: "5px 12px", margin: "0 8px 8px 0", fontSize: ".88rem", fontWeight: 600 };
  const panelStyle = { width: "100%", maxWidth: "660px", marginTop: "28px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "20px", padding: "22px" };
  const panelLabelStyle = { fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".95rem", marginBottom: "4px" };
  const panelHintStyle = { color: "rgba(255,255,255,.6)", fontSize: ".85rem", lineHeight: 1.5, margin: "0 0 14px" };
  const textareaStyle = { width: "100%", minHeight: "150px", resize: "vertical", padding: "14px 16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,.18)", background: "rgba(0,0,0,.25)", color: "#fff", fontFamily: "var(--body), monospace", fontSize: "1rem", lineHeight: 1.5, outline: "none", boxSizing: "border-box" };
  const seoStyle = { width: "100%", maxWidth: "740px", margin: "70px auto 0", color: "rgba(255,255,255,.78)", lineHeight: 1.7 };
  const seoH2 = { fontFamily: "var(--disp)", fontWeight: 600, color: "#fff", fontSize: "1.5rem", margin: "36px 0 10px" };
  const seoH3 = { fontFamily: "var(--disp)", fontWeight: 600, color: GOLD, fontSize: "1.08rem", margin: "20px 0 4px" };
  const footStyle = { width: "100%", textAlign: "center", padding: "50px 20px 46px", marginTop: "40px", color: "rgba(255,255,255,.55)", fontFamily: "var(--disp)", fontWeight: 600, fontSize: ".95rem" };

  const Confetti = () => {
    const pieces = useRef(
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        dur: 2.4 + Math.random() * 1.8,
        rot: Math.random() * 360,
        emoji: Math.random() < 0.5,
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
    <main ref={mainRef} style={pageStyle}>
      <style>{`
        @keyframes spinpulse { 0%,100% { box-shadow: 0 16px 50px rgba(231,181,60,.45); } 50% { box-shadow: 0 22px 70px rgba(231,181,60,.75); } }
        @keyframes live-glow { 0%,100% { filter: drop-shadow(0 4px 16px rgba(231,181,60,.35)); } 50% { filter: drop-shadow(0 6px 28px rgba(231,181,60,.6)); } }
        @keyframes winner-pop { 0% { transform: scale(.6); opacity: 0; } 60% { transform: scale(1.08); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes confetti-fall { 0% { transform: translateY(-12vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(108vh) rotate(540deg); opacity: 1; } }
        .confetti-layer { position: fixed; inset: 0; pointer-events: none; z-index: 30; overflow: hidden; }
        .confetti-piece { position: absolute; top: -10vh; display: inline-block; animation-name: confetti-fall; animation-timing-function: linear; animation-iteration-count: 1; }
        .draw-modal-card { animation: winner-pop .55s cubic-bezier(.34,1.56,.64,1) both; }
        @media (prefers-reduced-motion: reduce) { .confetti-layer { display: none; } .draw-modal-card, [data-live] { animation: none !important; } }
      `}</style>

      {!clean && <a href="/duckwichita" style={backLinkStyle}>← DuckWichita</a>}

      <div style={clusterStyle}>
        {!clean && (
          <>
            <button style={pillBtn(false)} onClick={() => setMuted((v) => !v)}>{muted ? "Sound off" : "Sound on"}</button>
            <button style={pillBtn(false)} onClick={toggleFullscreen}>Fullscreen</button>
          </>
        )}
        <button style={pillBtn(clean)} onClick={() => setClean((v) => !v)}>{clean ? "Exit clean view" : "Clean view"}</button>
      </div>

      <div style={headStyle}>
        <div style={logoPlateStyle}>
          <img src={WORDMARK} alt="DuckWichita" style={logoImgStyle} />
        </div>
        <h1 style={liveStyle} data-live>Live Drawing</h1>
        {!clean && <p style={subStyle}>Paste names · spin the wheel · pick a winner</p>}
      </div>

      <div style={stageStyle}>
        <div ref={wrapRef} style={wheelWrapStyle} onClick={spin}>
          <div style={pointerStyle}><div style={pointerTriStyle} /></div>
          <canvas ref={canvasRef} />
          {names.length === 0 && (
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", color: "rgba(255,255,255,.7)", fontFamily: "var(--disp)", fontWeight: 600, maxWidth: "60%", pointerEvents: "none" }}>
              Paste your names below to build the wheel.
            </div>
          )}
        </div>

        <div style={countStyle}>{names.length > 0 ? `${names.length} names on the wheel` : "No names loaded yet"}</div>

        <button style={spinBtnStyle} onClick={spin} disabled={!names.length || spinning}>{spinning ? "Spinning…" : "SPIN"}</button>

        {!clean && (
          <div style={utilRowStyle}>
            <button style={utilBtnStyle} onClick={shuffle} disabled={!names.length || spinning}>Shuffle order</button>
            <button style={utilBtnStyle} onClick={() => setPanelOpen((v) => !v)}>{panelOpen ? "Hide entries" : "Edit entries"}</button>
          </div>
        )}

        {!clean && winners.length > 0 && (
          <div style={winnersWrapStyle}>
            <div style={winnersHeadStyle}>
              <span>Winners drawn ({winners.length})</span>
              <button style={{ ...utilBtnStyle, padding: "6px 14px", fontSize: ".8rem" }} onClick={() => setWinners([])}>Clear</button>
            </div>
            <div>
              {winners.map((w, i) => (
                <span key={i} style={chipStyle}>{i + 1}. {w}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {!clean && panelOpen && (
        <div style={panelStyle}>
          <div style={panelLabelStyle}>Your names</div>
          <p style={panelHintStyle}>Paste one name per line. Want to weight the odds? Add a name more than once — five lines for one person is five times the chances.</p>
          <textarea style={textareaStyle} value={raw} onChange={(e) => setRaw(e.target.value)} placeholder={"Garrett\nHannah\nLogan\nMaria\n..."} spellCheck={false} />
        </div>
      )}

      {!clean && (
        <section style={seoStyle}>
          <h2 style={seoH2}>Free random name picker wheel</h2>
          <p>This is a free random name picker wheel — paste a list of names, spin the wheel, and it picks a winner at random. There is no sign-up and nothing to install. Your list stays in your browser and is never uploaded, so it is a private, fair way to run a drawing. Use it as a quick wheel of names alternative whenever you need to choose a winner without playing favorites.</p>

          <h2 style={seoH2}>How to use it</h2>
          <p>Paste your names into the box above, one per line. The wheel builds itself, with each name getting its own slice. Press SPIN (or tap the wheel) and watch it slow to a stop on a random winner. To run a multi-prize drawing, choose Remove winner after each spin so the same person is not drawn twice.</p>

          <h2 style={seoH2}>Popular uses</h2>
          <p>People use the wheel to draw giveaway and raffle winners, pick a prize-drawing winner for a contest, call on students in a classroom, choose who goes first in a game, pick the next person in a team standup, and run Secret Santa or door-prize draws at events.</p>

          <h2 style={seoH2}>Common questions</h2>
          {FAQS.map((f, i) => (
            <div key={i}>
              <h3 style={seoH3}>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </section>
      )}

      {!clean && (
        <footer style={footStyle}>
          Made by <a href="/duckwichita" style={{ color: GOLD, textDecoration: "none", borderBottom: `1px solid rgba(231,181,60,.5)` }}>DuckWichita</a> · Wichita, KS
        </footer>
      )}

      {winner && (
        <>
          <Confetti />
          <div style={{ position: "fixed", inset: 0, zIndex: 31, background: "rgba(10,11,20,.72)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }} onClick={() => setWinner(null)}>
            <div className="draw-modal-card" style={{ background: CREAM, color: INK, borderRadius: "28px", padding: "44px 40px 34px", maxWidth: "520px", width: "100%", textAlign: "center", border: `4px solid ${GOLD}`, boxShadow: "0 40px 100px rgba(0,0,0,.5)" }} onClick={(e) => e.stopPropagation()}>
              <img src={HUB_LOGO} alt="DuckWichita" style={{ width: "76px", height: "76px", objectFit: "contain", margin: "0 auto" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
              <div style={{ fontFamily: "var(--disp)", fontWeight: 700, color: ORANGE, letterSpacing: ".18em", textTransform: "uppercase", fontSize: ".95rem", margin: "12px 0 6px" }}>Winner!</div>
              <div style={{ fontFamily: "var(--disp)", fontWeight: 600, fontSize: "clamp(2.2rem, 7vw, 3.4rem)", lineHeight: 1.05, letterSpacing: "-.02em", wordBreak: "break-word" }}>{winner}</div>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "28px" }}>
                <button onClick={spinAgain} style={{ padding: "14px 28px", borderRadius: "999px", border: "none", background: GOLD, color: INK, fontFamily: "var(--disp)", fontWeight: 700, fontSize: "1rem", cursor: "pointer" }}>Spin again</button>
                <button onClick={removeWinner} style={{ padding: "14px 28px", borderRadius: "999px", border: `2px solid ${INK}`, background: "transparent", color: INK, fontFamily: "var(--disp)", fontWeight: 700, fontSize: "1rem", cursor: "pointer" }}>Remove winner</button>
              </div>
              <button onClick={() => setWinner(null)} style={{ marginTop: "14px", background: "none", border: "none", color: "rgba(10,11,20,.5)", fontFamily: "var(--disp)", fontWeight: 600, fontSize: ".9rem", cursor: "pointer" }}>Close</button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
