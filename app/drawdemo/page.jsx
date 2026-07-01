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

// Which entry the demo always lands on. 19th name = index 18.
const DEMO_INDEX = 18;

// Reel geometry. Main knobs.
const VISIBLE = 5;          // rows showing in each window
const ROW_H = 58;           // height of one row in px
const CENTER = Math.floor(VISIBLE / 2);
const WINDOW_H = VISIBLE * ROW_H;
const REEL_LEN = 80;        // rows built per spin (independent of name count)
const TARGET = REEL_LEN - VISIBLE + CENTER;

// Spin length.
const SPIN_BASE_MS = 11000;
const SPIN_JITTER_MS = 2250;

const SYMBOLS = ["🦆", "⭐", "🪙", "🎰", "🎟️", "🌟", "🦆", "⭐"];

// translateY that lands row `t` on the center payline
const trackY = (t) => ROW_H * ((VISIBLE - 1) / 2 - t);

function parseNames(raw) {
  return raw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
}

function buildIdleReel(list) {
  if (list.length === 0) return [];
  const rows = [];
  const need = Math.max(VISIBLE, list.length);
  for (let i = 0; i < need; i++) rows.push(list[i % list.length]);
  return rows;
}

function buildIdleSymbols() {
  return ["🦆", "⭐", "🦆", "⭐", "🦆", "⭐", "🦆"];
}

// Full screen fireworks canvas. Mounts only while a win is celebrating, runs
// about 5 seconds, then clears itself.
function Fireworks({ onBoom }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COLORS = [COBALT, ORANGE, GOLD, "#FFFFFF", "#8FB2FF"];
    const shells = [];
    const parts = [];
    let raf = 0;
    const t0 = performance.now();
    let lastLaunch = -9999;

    const explode = (x, y, color) => {
      const k = 80 + Math.floor(Math.random() * 70);
      for (let i = 0; i < k; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 1.3 + Math.random() * 5;
        parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, decay: 0.007 + Math.random() * 0.013, color: Math.random() < 0.28 ? "#FFFFFF" : color, size: 1.4 + Math.random() * 2.6 });
      }
      if (onBoom) onBoom();
    };
    const launch = () => {
      const tx = w * (0.14 + Math.random() * 0.72);
      const ty = h * (0.14 + Math.random() * 0.34);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      shells.push({ x: tx, y: h + 10, vy: -(6.2 + Math.random() * 2.4), ty, color });
    };

    const frame = (now) => {
      const elapsed = now - t0;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(8,9,18,0.22)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      const interval = elapsed < 900 ? 130 : 320;
      if (elapsed < 4200 && now - lastLaunch > interval) {
        lastLaunch = now;
        launch();
        if (elapsed < 900) launch();
      }

      for (let i = shells.length - 1; i >= 0; i--) {
        const s = shells[i];
        s.vy += 0.12;
        s.y += s.vy;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.3, 0, 7);
        ctx.fill();
        if (s.vy >= 0 || s.y <= s.ty) {
          explode(s.x, s.y, s.color);
          shells.splice(i, 1);
        }
      }

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.vy += 0.045;
        p.vx *= 0.992;
        p.vy *= 0.992;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) { parts.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 7);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (elapsed < 5200) {
        raf = requestAnimationFrame(frame);
      } else {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    if (!reduce) raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [onBoom]);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 32, pointerEvents: "none" }} aria-hidden="true" />;
}

export default function DrawDemoPage() {
  const [raw, setRaw] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [clean, setClean] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [muted, setMuted] = useState(false);
  const [winners, setWinners] = useState([]);
  const [centerReel, setCenterReel] = useState([]);
  const [leftReel, setLeftReel] = useState([]);
  const [rightReel, setRightReel] = useState([]);
  const [runId, setRunId] = useState(0);
  const [fireworks, setFireworks] = useState(false);
  const [flash, setFlash] = useState(false);

  const names = parseNames(raw);

  const centerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const mainRef = useRef(null);
  const namesRef = useRef([]);
  const originalRef = useRef([]);     // names in the order they were typed; shuffle never touches this
  const rafRef = useRef(0);
  const spinningRef = useRef(false);
  const mutedRef = useRef(false);
  const audioRef = useRef(null);
  const lastCenterRef = useRef(CENTER);
  const winnerRef = useRef(null);
  const fwTimerRef = useRef(0);

  useEffect(() => { namesRef.current = parseNames(raw); }, [raw]);
  useEffect(() => { spinningRef.current = spinning; }, [spinning]);
  useEffect(() => { mutedRef.current = muted; }, [muted]);

  // Idle: load names + symbols into the machine, reels parked on center.
  useEffect(() => {
    if (spinningRef.current) return;
    setCenterReel(buildIdleReel(parseNames(raw)));
    setLeftReel(buildIdleSymbols());
    setRightReel(buildIdleSymbols());
    requestAnimationFrame(() => {
      [centerRef.current, leftRef.current, rightRef.current].forEach((el) => {
        if (el && !spinningRef.current) {
          el.style.transform = `translateY(${trackY(CENTER)}px)`;
          el.style.filter = "blur(0px)";
        }
      });
    });
  }, [raw]);

  useEffect(() => () => { cancelAnimationFrame(rafRef.current); clearTimeout(fwTimerRef.current); }, []);

  // The 19th originally entered name that is still in the pool.
  const demoTargetName = (() => {
    const list = parseNames(raw);
    const orig = originalRef.current.filter((n) => list.includes(n));
    const pool = orig.length ? orig : list;
    if (pool.length === 0) return null;
    return pool[Math.min(DEMO_INDEX, pool.length - 1)];
  })();

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
    g.gain.setValueAtTime(0.04, t);
    g.gain.exponentialRampToValueAtTime(0.0008, t + 0.04);
    o.connect(g);
    g.connect(ac.destination);
    o.start(t);
    o.stop(t + 0.045);
  }, []);

  const playClunk = useCallback(() => {
    if (mutedRef.current) return;
    const ac = audioRef.current;
    if (!ac) return;
    const t = ac.currentTime;
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(220, t);
    o.frequency.exponentialRampToValueAtTime(90, t + 0.12);
    g.gain.setValueAtTime(0.22, t);
    g.gain.exponentialRampToValueAtTime(0.0008, t + 0.16);
    o.connect(g);
    g.connect(ac.destination);
    o.start(t);
    o.stop(t + 0.18);
  }, []);

  const playFanfare = useCallback(() => {
    if (mutedRef.current) return;
    const ac = audioRef.current;
    if (!ac) return;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((f, i) => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = "triangle";
      o.frequency.value = f;
      const t = ac.currentTime + i * 0.1;
      g.gain.setValueAtTime(0.0008, t);
      g.gain.exponentialRampToValueAtTime(0.17, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0008, t + 0.45);
      o.connect(g);
      g.connect(ac.destination);
      o.start(t);
      o.stop(t + 0.47);
    });
  }, []);

  const playBoom = useCallback(() => {
    if (mutedRef.current) return;
    const ac = audioRef.current;
    if (!ac) return;
    const t = ac.currentTime;
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(130, t);
    o.frequency.exponentialRampToValueAtTime(38, t + 0.28);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.55, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0008, t + 0.5);
    o.connect(g);
    g.connect(ac.destination);
    o.start(t);
    o.stop(t + 0.55);
    const dur = 0.34;
    const buf = ac.createBuffer(1, Math.floor(ac.sampleRate * dur), ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2);
    const src = ac.createBufferSource();
    src.buffer = buf;
    const bp = ac.createBiquadFilter();
    bp.type = "lowpass";
    bp.frequency.value = 2400;
    const ng = ac.createGain();
    ng.gain.setValueAtTime(0.22, t + 0.01);
    ng.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(bp);
    bp.connect(ng);
    ng.connect(ac.destination);
    src.start(t + 0.015);
  }, []);

  const triggerCelebration = useCallback(() => {
    setFlash(true);
    setTimeout(() => setFlash(false), 480);
    setFireworks(true);
    clearTimeout(fwTimerRef.current);
    fwTimerRef.current = setTimeout(() => setFireworks(false), 5200);
  }, []);

  const spin = useCallback(() => {
    const list = namesRef.current;
    if (spinningRef.current || list.length === 0) return;
    ensureAudio();
    setWinner(null);
    setFireworks(false);
    setSpinning(true);

    // DEMO: always land on the 19th originally entered name (still in the pool).
    const orig = originalRef.current.filter((n) => list.includes(n));
    const pool = orig.length ? orig : list;
    const winnerName = pool[Math.min(DEMO_INDEX, pool.length - 1)];

    const c = [];
    for (let i = 0; i < REEL_LEN; i++) c.push(list[Math.floor(Math.random() * list.length)]);
    c[TARGET] = winnerName;

    const mkSym = () => {
      const r = [];
      for (let i = 0; i < REEL_LEN; i++) r.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
      r[TARGET] = "🦆";
      return r;
    };

    setCenterReel(c);
    setLeftReel(mkSym());
    setRightReel(mkSym());
    winnerRef.current = winnerName;
    setRunId((id) => id + 1);
  }, [ensureAudio]);

  // Drive all three reels from one loop after the rows commit to the DOM.
  useEffect(() => {
    if (runId === 0) return;
    const cEl = centerRef.current, lEl = leftRef.current, rEl = rightRef.current;
    if (!cEl || !lEl || !rEl) return;

    const startT = trackY(CENTER);
    const endT = trackY(TARGET);
    const baseDur = SPIN_BASE_MS + Math.random() * SPIN_JITTER_MS;
    const now0 = performance.now();
    const cfg = {
      left: { el: lEl, dur: baseDur * 0.6, prevY: startT, done: false, side: true },
      right: { el: rEl, dur: baseDur * 0.78, prevY: startT, done: false, side: true },
      center: { el: cEl, dur: baseDur, prevY: startT, done: false, side: false },
    };
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    lastCenterRef.current = CENTER;
    Object.values(cfg).forEach((r) => { r.el.style.transform = `translateY(${startT}px)`; r.el.style.filter = "blur(0px)"; });

    const frame = (now) => {
      let centerDone = false;
      ["left", "right", "center"].forEach((k) => {
        const r = cfg[k];
        const p = Math.min((now - now0) / r.dur, 1);
        const y = startT + (endT - startT) * ease(p);
        r.el.style.transform = `translateY(${y}px)`;
        const dy = Math.abs(y - r.prevY);
        r.prevY = y;
        r.el.style.filter = `blur(${Math.min(8, dy * 0.05).toFixed(2)}px)`;
        if (p >= 1 && !r.done) {
          r.done = true;
          r.el.style.transform = `translateY(${endT}px)`;
          r.el.style.filter = "blur(0px)";
          if (r.side) playClunk();
        }
        if (k === "center") {
          const cc = Math.round((VISIBLE - 1) / 2 - y / ROW_H);
          if (cc !== lastCenterRef.current) { lastCenterRef.current = cc; playTick(); }
          if (p >= 1) centerDone = true;
        }
      });

      if (!centerDone) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        setSpinning(false);
        const w = winnerRef.current;
        setWinner(w);
        setWinners((prev) => [...prev, w]);
        playClunk();
        playFanfare();
        triggerCelebration();
      }
    };
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [runId, playTick, playClunk, playFanfare, triggerCelebration]);

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

  const onEntriesChange = (v) => {
    setRaw(v);
    originalRef.current = parseNames(v); // typing sets the original order; shuffle does not
  };

  const shuffle = () => {
    const arr = parseNames(raw);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setRaw(arr.join("\n")); // display order only; originalRef stays put
  };

  const spinAgain = () => { setWinner(null); setFireworks(false); setTimeout(spin, 60); };

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
  const demoBannerStyle = { position: "fixed", top: "14px", left: "50%", transform: "translateX(-50%)", zIndex: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", background: ORANGE, color: "#fff", padding: "8px 20px", borderRadius: "999px", border: "2px solid #fff", boxShadow: "0 10px 30px rgba(255,107,53,.5)", fontFamily: "var(--disp)", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", fontSize: ".82rem", textAlign: "center", animation: "demo-pulse 2.2s ease-in-out infinite" };
  const demoSubStyle = { fontWeight: 600, letterSpacing: ".02em", textTransform: "none", fontSize: ".72rem", opacity: .95 };
  const backLinkStyle = { position: "absolute", top: "66px", left: "24px", color: "rgba(255,255,255,.7)", fontFamily: "var(--disp)", fontWeight: 600, fontSize: ".95rem", textDecoration: "none", zIndex: 4 };
  const clusterStyle = { position: "absolute", top: "62px", right: "22px", display: "flex", gap: "10px", zIndex: 4 };
  const pillBtn = (active) => ({ display: "inline-flex", alignItems: "center", gap: "7px", padding: "9px 16px", borderRadius: "999px", border: `1.5px solid ${active ? ORANGE : "rgba(255,255,255,.28)"}`, background: active ? ORANGE : "rgba(255,255,255,.06)", color: "#fff", fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".78rem", letterSpacing: ".06em", textTransform: "uppercase", cursor: "pointer" });
  const headStyle = { textAlign: "center", marginTop: clean ? "96px" : "118px", display: "flex", flexDirection: "column", alignItems: "center" };
  const logoPlateStyle = { background: CREAM, borderRadius: "20px", padding: "12px 26px", display: "inline-block", boxShadow: "0 16px 44px rgba(0,0,0,.4)", border: `2px solid rgba(231,181,60,.55)` };
  const logoImgStyle = { display: "block", width: "100%", maxWidth: "340px", height: "auto" };
  const liveStyle = { fontFamily: "var(--disp)", fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(2.6rem, 8vw, 4.6rem)", lineHeight: 1, letterSpacing: ".015em", margin: "18px 0 0", background: `linear-gradient(180deg, #FFE9A8 0%, ${GOLD} 55%, #C8962A 100%)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent", animation: "live-glow 2.6s ease-in-out infinite" };
  const subStyle = { color: "rgba(255,255,255,.62)", fontFamily: "var(--disp)", fontWeight: 600, fontSize: "1rem", letterSpacing: ".04em", margin: "14px 0 0" };

  const stageStyle = { width: "100%", maxWidth: "560px", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "30px" };
  const cabinetStyle = { width: "100%", position: "relative", background: `linear-gradient(180deg, ${COBALT} 0%, ${COBALT_DEEP} 100%)`, border: `6px solid ${GOLD}`, borderRadius: "30px", padding: "20px 22px 24px", boxShadow: "0 30px 80px rgba(0,0,0,.5), inset 0 2px 0 rgba(255,255,255,.18)" };
  const bulbsRowStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 6px", marginBottom: "12px" };
  const marqueeStyle = { display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "16px" };
  const medallionStyle = { width: "64px", height: "64px", borderRadius: "999px", background: INK, border: `4px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", boxShadow: "0 0 0 4px rgba(11,30,138,.6), 0 8px 22px rgba(0,0,0,.45)", flex: "0 0 auto" };
  const marqueeTextStyle = { fontFamily: "var(--disp)", fontWeight: 800, fontSize: "clamp(1rem, 4.4vw, 1.5rem)", letterSpacing: ".1em", textTransform: "uppercase", background: `linear-gradient(180deg, #FFE9A8 0%, ${GOLD} 60%, #C8962A 100%)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" };

  const reelsRowWrap = { position: "relative", width: "100%" };
  const reelsRow = { display: "flex", gap: "8px", alignItems: "stretch" };
  const bezelBase = { position: "relative", borderRadius: "14px", padding: "6px", background: `linear-gradient(180deg, #FFE08A 0%, ${GOLD} 45%, #B8841F 100%)`, boxShadow: "inset 0 2px 6px rgba(0,0,0,.35)" };
  const centerBezelStyle = { ...bezelBase, flex: "1.7 1 0" };
  const sideBezelStyle = { ...bezelBase, flex: "1 1 0" };
  const windowStyle = { position: "relative", height: `${WINDOW_H}px`, borderRadius: "9px", overflow: "hidden", background: `linear-gradient(180deg, #11142C 0%, ${INK} 100%)`, WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 15%, #000 85%, transparent 100%)", maskImage: "linear-gradient(180deg, transparent 0%, #000 15%, #000 85%, transparent 100%)" };
  const glassStyle = { position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, background: "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,0) 26%, rgba(255,255,255,.10) 50%, rgba(0,0,0,0) 74%, rgba(0,0,0,.55) 100%)" };
  const stripStyle = { position: "absolute", top: 0, left: 0, width: "100%", willChange: "transform, filter" };
  const rowStyle = { height: `${ROW_H}px`, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 18px" };
  const nameTextStyle = { maxWidth: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "var(--disp)", fontWeight: 700, fontSize: "clamp(1.1rem, 4.4vw, 1.5rem)", letterSpacing: ".01em", color: CREAM, lineHeight: 1 };
  const symTextStyle = { fontSize: `${Math.round(ROW_H * 0.62)}px`, lineHeight: 1 };
  const paylineStyle = { position: "absolute", left: 0, right: 0, top: "50%", height: `${ROW_H}px`, transform: "translateY(-50%)", borderTop: `3px solid ${GOLD}`, borderBottom: `3px solid ${GOLD}`, background: "linear-gradient(180deg, rgba(231,181,60,.22) 0%, rgba(231,181,60,.05) 100%)", boxShadow: "inset 0 0 34px rgba(231,181,60,.4)", pointerEvents: "none", zIndex: 5, borderRadius: "4px" };
  const triBase = { position: "absolute", top: "50%", transform: "translateY(-50%)", width: 0, height: 0, zIndex: 6, filter: "drop-shadow(0 2px 3px rgba(0,0,0,.4))" };
  const triLeftStyle = { ...triBase, left: "-7px", borderTop: "13px solid transparent", borderBottom: "13px solid transparent", borderLeft: `18px solid ${GOLD}` };
  const triRightStyle = { ...triBase, right: "-7px", borderTop: "13px solid transparent", borderBottom: "13px solid transparent", borderRight: `18px solid ${GOLD}` };
  const placeholderStyle = { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 14px", color: "rgba(255,255,255,.62)", fontFamily: "var(--disp)", fontWeight: 600, fontSize: ".9rem", zIndex: 1, pointerEvents: "none" };

  const countStyle = { marginTop: "22px", color: "rgba(255,255,255,.65)", fontFamily: "var(--disp)", fontWeight: 600, fontSize: ".95rem", letterSpacing: ".04em" };
  const targetStyle = { marginTop: "6px", color: GOLD, fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".9rem", letterSpacing: ".02em" };
  const spinBtnStyle = { marginTop: "14px", padding: "20px 64px", borderRadius: "999px", border: "3px solid #fff", background: names.length && !spinning ? `linear-gradient(135deg, #FFD75E 0%, ${GOLD} 55%, #D9A030 100%)` : "rgba(255,255,255,.12)", color: names.length && !spinning ? INK : "rgba(255,255,255,.45)", fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1.7rem", letterSpacing: ".06em", cursor: names.length && !spinning ? "pointer" : "not-allowed", boxShadow: names.length && !spinning ? "0 16px 50px rgba(231,181,60,.5)" : "none", animation: names.length && !spinning ? "spinpulse 2.2s ease-in-out infinite" : "none" };
  const utilRowStyle = { display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap", justifyContent: "center" };
  const utilBtnStyle = { padding: "11px 20px", borderRadius: "999px", border: "1.5px solid rgba(255,255,255,.25)", background: "rgba(255,255,255,.06)", color: "#fff", fontFamily: "var(--disp)", fontWeight: 600, fontSize: ".9rem", cursor: "pointer" };
  const winnersWrapStyle = { width: "100%", maxWidth: "560px", marginTop: "26px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "16px", padding: "16px 18px" };
  const winnersHeadStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".95rem", marginBottom: "10px" };
  const chipStyle = { display: "inline-block", background: "rgba(231,181,60,.16)", border: `1px solid rgba(231,181,60,.45)`, color: GOLD, borderRadius: "999px", padding: "5px 12px", margin: "0 8px 8px 0", fontSize: ".88rem", fontWeight: 600 };
  const panelStyle = { width: "100%", maxWidth: "560px", marginTop: "28px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "20px", padding: "22px" };
  const panelLabelStyle = { fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".95rem", marginBottom: "4px" };
  const panelHintStyle = { color: "rgba(255,255,255,.6)", fontSize: ".85rem", lineHeight: 1.5, margin: "0 0 14px" };
  const textareaStyle = { width: "100%", minHeight: "150px", resize: "vertical", padding: "14px 16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,.18)", background: "rgba(0,0,0,.25)", color: "#fff", fontFamily: "var(--body), monospace", fontSize: "1rem", lineHeight: 1.5, outline: "none", boxSizing: "border-box" };
  const footStyle = { width: "100%", textAlign: "center", padding: "50px 20px 46px", marginTop: "40px", color: "rgba(255,255,255,.55)", fontFamily: "var(--disp)", fontWeight: 600, fontSize: ".95rem" };

  const bulbColors = [GOLD, "#FFFFFF", ORANGE];
  const Bulbs = ({ count }) => (
    <div style={bulbsRowStyle}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="dw-bulb" style={{ color: bulbColors[i % bulbColors.length], animationDelay: `${(i % 6) * 0.13}s` }} />
      ))}
    </div>
  );

  const Confetti = () => {
    const pieces = useRef(
      Array.from({ length: 120 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        dur: 1.9 + Math.random() * 1.9,
        rot: Math.random() * 360,
        emoji: Math.random() < 0.5,
        color: [COBALT, ORANGE, GOLD, "#FFFFFF"][i % 4],
        size: 12 + Math.random() * 18,
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
        @keyframes confetti-fall { 0% { transform: translateY(-12vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(112vh) rotate(620deg); opacity: 1; } }
        @keyframes win-flash { 0% { opacity: .85; } 100% { opacity: 0; } }
        @keyframes demo-pulse { 0%,100% { box-shadow: 0 10px 30px rgba(255,107,53,.45); } 50% { box-shadow: 0 12px 40px rgba(255,107,53,.8); } }
        @keyframes dw-bulb-blink { 0%,100% { opacity: 1; box-shadow: 0 0 9px currentColor, 0 0 3px currentColor; } 50% { opacity: .32; box-shadow: 0 0 2px currentColor; } }
        @keyframes lever-pull { 0% { transform: translate(-50%, 0); } 32% { transform: translate(-50%, 40px); } 100% { transform: translate(-50%, 0); } }
        .confetti-layer { position: fixed; inset: 0; pointer-events: none; z-index: 33; overflow: hidden; }
        .confetti-piece { position: absolute; top: -12vh; display: inline-block; animation-name: confetti-fall; animation-timing-function: linear; animation-iteration-count: 1; }
        .draw-modal-card { animation: winner-pop .55s cubic-bezier(.34,1.56,.64,1) both; }
        .dw-bulb { width: 9px; height: 9px; border-radius: 50%; background: currentColor; display: inline-block; animation: dw-bulb-blink 1.1s ease-in-out infinite; }
        .dw-lever { position: absolute; top: 26%; right: -34px; width: 30px; height: 56%; z-index: 6; pointer-events: none; }
        .dw-lever .rod { position: absolute; left: 50%; top: 14px; bottom: 0; width: 8px; transform: translateX(-50%); background: linear-gradient(90deg, #8a909d, #eef1f6 45%, #8a909d); border-radius: 6px; box-shadow: 0 5px 12px rgba(0,0,0,.45); }
        .dw-lever .base { position: absolute; left: 50%; bottom: -6px; width: 26px; height: 16px; transform: translateX(-50%); background: linear-gradient(180deg, #c9cdd6, #6b7180); border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,.5); }
        .dw-lever .ball { position: absolute; left: 50%; top: -2px; width: 32px; height: 32px; transform: translate(-50%, 0); border-radius: 50%; background: radial-gradient(circle at 32% 30%, #ff9c80, #d23b16 58%, #8f2208); box-shadow: 0 6px 14px rgba(0,0,0,.5), inset 0 2px 4px rgba(255,255,255,.45); }
        @media (max-width: 580px) { .dw-lever { display: none; } }
        @media (prefers-reduced-motion: reduce) { .confetti-layer { display: none; } .draw-modal-card, [data-live], .dw-bulb, [data-demo] { animation: none !important; } }
      `}</style>

      <div style={demoBannerStyle} data-demo>
        <span>🦆 </span>
        <span style={demoSubStyle}></span>
      </div>

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
        {!clean && <p style={subStyle}>Demo machine · always lands on the 19th name you entered</p>}
      </div>

      <div style={stageStyle}>
        <div style={cabinetStyle}>
          <div className="dw-lever">
            <div className="base" />
            <div className="rod" />
            <div key={`ball-${runId}`} className="ball" style={{ animation: spinning ? "lever-pull .7s cubic-bezier(.3,1.4,.5,1) both" : "none" }} />
          </div>

          <Bulbs count={13} />

          <div style={marqueeStyle}>
            <div style={medallionStyle}>
              <img
                src={HUB_LOGO}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.innerHTML = '<span style="font-size:34px">🦆</span>'; }}
              />
            </div>
            <span style={marqueeTextStyle}>Demo Draw</span>
          </div>

          <div style={reelsRowWrap}>
            <div style={reelsRow}>
              <div style={sideBezelStyle}>
                <div style={windowStyle}>
                  <div ref={leftRef} style={stripStyle}>
                    {leftReel.map((s, i) => (<div key={i} style={rowStyle}><span style={symTextStyle}>{s}</span></div>))}
                  </div>
                  <div style={glassStyle} />
                </div>
              </div>

              <div style={centerBezelStyle}>
                <div style={windowStyle}>
                  <div ref={centerRef} style={stripStyle}>
                    {centerReel.map((nm, i) => (<div key={i} style={rowStyle}><span style={nameTextStyle}>{nm}</span></div>))}
                  </div>
                  {names.length === 0 && <div style={placeholderStyle}>Paste names below to load the machine.</div>}
                  <div style={glassStyle} />
                </div>
              </div>

              <div style={sideBezelStyle}>
                <div style={windowStyle}>
                  <div ref={rightRef} style={stripStyle}>
                    {rightReel.map((s, i) => (<div key={i} style={rowStyle}><span style={symTextStyle}>{s}</span></div>))}
                  </div>
                  <div style={glassStyle} />
                </div>
              </div>
            </div>

            <div style={paylineStyle} />
            <div style={triLeftStyle} />
            <div style={triRightStyle} />
          </div>

          <Bulbs count={13} />
        </div>

        <div style={countStyle}>{names.length > 0 ? `${names.length} ${names.length === 1 ? "name" : "names"} loaded` : "No names loaded yet"}</div>
        {demoTargetName && <div style={targetStyle}>Demo will land on: {demoTargetName}</div>}

        <button style={spinBtnStyle} onClick={spin} disabled={!names.length || spinning}>{spinning ? "Drawing…" : "SPIN"}</button>

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
          <p style={panelHintStyle}>Paste one name per line.</p>
          <textarea style={textareaStyle} value={raw} onChange={(e) => onEntriesChange(e.target.value)} placeholder={"Garrett\nHannah\nLogan\nMaria\n..."} spellCheck={false} />
        </div>
      )}

      <footer style={footStyle}>
        Demo page · Made by <a href="/duckwichita" style={{ color: GOLD, textDecoration: "none", borderBottom: `1px solid rgba(231,181,60,.5)` }}>DuckWichita</a> · Wichita, KS
      </footer>

      {flash && <div style={{ position: "fixed", inset: 0, zIndex: 33, background: "#fff", pointerEvents: "none", animation: "win-flash .48s ease-out forwards" }} aria-hidden="true" />}
      {fireworks && <Fireworks onBoom={playBoom} />}

      {winner && (
        <>
          <Confetti />
          <div style={{ position: "fixed", inset: 0, zIndex: 31, background: "rgba(10,11,20,.72)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }} onClick={() => setWinner(null)}>
            <div className="draw-modal-card" style={{ position: "relative", zIndex: 34, background: CREAM, color: INK, borderRadius: "28px", padding: "44px 40px 34px", maxWidth: "520px", width: "100%", textAlign: "center", border: `4px solid ${GOLD}`, boxShadow: "0 40px 100px rgba(0,0,0,.5)" }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: "inline-block", background: ORANGE, color: "#fff", fontFamily: "var(--disp)", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", fontSize: ".72rem", padding: "5px 14px", borderRadius: "999px", marginBottom: "10px" }}>Demo result</div>
              <img src={HUB_LOGO} alt="DuckWichita" style={{ display: "block", width: "70px", height: "70px", objectFit: "contain", margin: "0 auto" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
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
