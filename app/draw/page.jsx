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

// Reel geometry. These are the only knobs you normally touch.
const VISIBLE = 5;        // rows showing in the window
const ROW_H = 58;         // height of one name row in px
const CENTER = Math.floor(VISIBLE / 2);
const WINDOW_H = VISIBLE * ROW_H;
const REEL_LEN = 64;      // rows built per spin (independent of name count)

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

const FAQS = [
  { q: "Is the random name picker free?", a: "Yes. It is completely free, with no sign up and no limits. Everything runs in your browser, and your list is never uploaded or saved anywhere." },
  { q: "How does it choose a winner?", a: "Every entry is one ticket. When you pull, the reel spins through the names and stops on one ticket chosen at random. The more tickets a name has, the better its odds." },
  { q: "Can I give one name more chances to win?", a: "Yes. Add a name more than once and it gets that many tickets. Five lines for one person is five tickets and five times the odds, which keeps weighted drawings fair." },
  { q: "Can I use it for giveaways, raffles, or classrooms?", a: "Absolutely. Paste any list of names, students, teams, or ticket numbers, then pull to draw a winner. It works great for giveaways, raffles, prize drawings, and classroom callouts." },
  { q: "Does it work with a big list?", a: "Yes. Unlike a wheel that turns into a blur once you load dozens of names, the reel scrolls readable names the whole time and lands on one winner, whether you have ten entries or a thousand." },
];

export default function DrawPage() {
  const [raw, setRaw] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [clean, setClean] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [muted, setMuted] = useState(false);
  const [winners, setWinners] = useState([]);
  const [reel, setReel] = useState([]);
  const [runId, setRunId] = useState(0);

  const names = parseNames(raw);

  const reelRef = useRef(null);
  const mainRef = useRef(null);
  const namesRef = useRef([]);
  const rafRef = useRef(0);
  const spinningRef = useRef(false);
  const mutedRef = useRef(false);
  const audioRef = useRef(null);
  const lastCenterRef = useRef(CENTER);
  const targetRef = useRef(REEL_LEN - VISIBLE + CENTER);
  const winnerRef = useRef(null);

  useEffect(() => { namesRef.current = parseNames(raw); }, [raw]);
  useEffect(() => { spinningRef.current = spinning; }, [spinning]);
  useEffect(() => { mutedRef.current = muted; }, [muted]);

  // Idle state: load the entered names into the machine, reel parked on center.
  useEffect(() => {
    if (spinningRef.current) return;
    setReel(buildIdleReel(parseNames(raw)));
    requestAnimationFrame(() => {
      const strip = reelRef.current;
      if (strip && !spinningRef.current) {
        strip.style.transform = `translateY(${trackY(CENTER)}px)`;
        strip.style.filter = "blur(0px)";
      }
    });
  }, [raw]);

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
    g.gain.setValueAtTime(0.045, t);
    g.gain.exponentialRampToValueAtTime(0.0008, t + 0.04);
    o.connect(g);
    g.connect(ac.destination);
    o.start(t);
    o.stop(t + 0.045);
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

    const winnerIndex = Math.floor(Math.random() * list.length);
    const winnerName = list[winnerIndex];

    const rows = [];
    for (let i = 0; i < REEL_LEN; i++) rows.push(list[Math.floor(Math.random() * list.length)]);
    const target = REEL_LEN - VISIBLE + CENTER;
    rows[target] = winnerName;

    targetRef.current = target;
    winnerRef.current = winnerName;
    setReel(rows);
    setRunId((id) => id + 1);
  }, [ensureAudio]);

  // Run the reel animation after the new rows are committed to the DOM.
  useEffect(() => {
    if (runId === 0) return;
    const strip = reelRef.current;
    if (!strip) return;

    const target = targetRef.current;
    const startT = trackY(CENTER);
    const endT = trackY(target);
    const dur = 4400 + Math.random() * 900;
    const t0 = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    let prevY = startT;
    lastCenterRef.current = CENTER;

    strip.style.transform = `translateY(${startT}px)`;
    strip.style.filter = "blur(0px)";

    const frame = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const y = startT + (endT - startT) * ease(p);
      strip.style.transform = `translateY(${y}px)`;
      const dy = Math.abs(y - prevY);
      prevY = y;
      strip.style.filter = `blur(${Math.min(7, dy * 0.05).toFixed(2)}px)`;
      const c = Math.round((VISIBLE - 1) / 2 - y / ROW_H);
      if (c !== lastCenterRef.current) {
        lastCenterRef.current = c;
        playTick();
      }
      if (p < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        strip.style.transform = `translateY(${endT}px)`;
        strip.style.filter = "blur(0px)";
        setSpinning(false);
        const w = winnerRef.current;
        setWinner(w);
        setWinners((prev) => [...prev, w]);
        playFanfare();
      }
    };
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [runId, playTick, playFanfare]);

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

  const stageStyle = { width: "100%", maxWidth: "540px", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "30px" };
  const cabinetStyle = { width: "100%", position: "relative", background: `linear-gradient(180deg, ${COBALT} 0%, ${COBALT_DEEP} 100%)`, border: `6px solid ${GOLD}`, borderRadius: "30px", padding: "24px 22px 26px", boxShadow: "0 30px 80px rgba(0,0,0,.5), inset 0 2px 0 rgba(255,255,255,.18)" };
  const medallionStyle = { width: "82px", height: "82px", borderRadius: "999px", background: INK, border: `4px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", overflow: "hidden", boxShadow: "0 0 0 4px rgba(11,30,138,.6), 0 10px 26px rgba(0,0,0,.45)" };
  const bezelStyle = { position: "relative", borderRadius: "18px", padding: "7px", background: `linear-gradient(180deg, #FFE08A 0%, ${GOLD} 45%, #B8841F 100%)`, boxShadow: "inset 0 2px 6px rgba(0,0,0,.35)" };
  const windowStyle = { position: "relative", height: `${WINDOW_H}px`, borderRadius: "12px", overflow: "hidden", background: `linear-gradient(180deg, #11142C 0%, ${INK} 100%)`, WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 16%, #000 84%, transparent 100%)", maskImage: "linear-gradient(180deg, transparent 0%, #000 16%, #000 84%, transparent 100%)" };
  const stripStyle = { position: "absolute", top: 0, left: 0, width: "100%", willChange: "transform, filter" };
  const rowStyle = { height: `${ROW_H}px`, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 26px" };
  const rowTextStyle = { maxWidth: "100%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "var(--disp)", fontWeight: 700, fontSize: "clamp(1.15rem, 4.6vw, 1.55rem)", letterSpacing: ".01em", color: CREAM, lineHeight: 1 };
  const paylineStyle = { position: "absolute", left: 0, right: 0, top: "50%", height: `${ROW_H}px`, transform: "translateY(-50%)", borderTop: `2px solid ${GOLD}`, borderBottom: `2px solid ${GOLD}`, background: "linear-gradient(180deg, rgba(231,181,60,.20) 0%, rgba(231,181,60,.04) 100%)", boxShadow: "inset 0 0 34px rgba(231,181,60,.35)", pointerEvents: "none", zIndex: 2 };
  const triBase = { position: "absolute", top: "50%", transform: "translateY(-50%)", width: 0, height: 0, zIndex: 3, filter: "drop-shadow(0 2px 3px rgba(0,0,0,.4))" };
  const triLeftStyle = { ...triBase, left: "-3px", borderTop: "12px solid transparent", borderBottom: "12px solid transparent", borderLeft: `16px solid ${GOLD}` };
  const triRightStyle = { ...triBase, right: "-3px", borderTop: "12px solid transparent", borderBottom: "12px solid transparent", borderRight: `16px solid ${GOLD}` };
  const placeholderStyle = { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 30px", color: "rgba(255,255,255,.62)", fontFamily: "var(--disp)", fontWeight: 600, zIndex: 1, pointerEvents: "none" };

  const countStyle = { marginTop: "22px", color: "rgba(255,255,255,.65)", fontFamily: "var(--disp)", fontWeight: 600, fontSize: ".95rem", letterSpacing: ".04em" };
  const spinBtnStyle = { marginTop: "16px", padding: "20px 64px", borderRadius: "999px", border: "3px solid #fff", background: names.length && !spinning ? `linear-gradient(135deg, #FFD75E 0%, ${GOLD} 55%, #D9A030 100%)` : "rgba(255,255,255,.12)", color: names.length && !spinning ? INK : "rgba(255,255,255,.45)", fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1.7rem", letterSpacing: ".06em", cursor: names.length && !spinning ? "pointer" : "not-allowed", boxShadow: names.length && !spinning ? "0 16px 50px rgba(231,181,60,.5)" : "none", animation: names.length && !spinning ? "spinpulse 2.2s ease-in-out infinite" : "none" };
  const utilRowStyle = { display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap", justifyContent: "center" };
  const utilBtnStyle = { padding: "11px 20px", borderRadius: "999px", border: "1.5px solid rgba(255,255,255,.25)", background: "rgba(255,255,255,.06)", color: "#fff", fontFamily: "var(--disp)", fontWeight: 600, fontSize: ".9rem", cursor: "pointer" };
  const winnersWrapStyle = { width: "100%", maxWidth: "540px", marginTop: "26px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "16px", padding: "16px 18px" };
  const winnersHeadStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".95rem", marginBottom: "10px" };
  const chipStyle = { display: "inline-block", background: "rgba(231,181,60,.16)", border: `1px solid rgba(231,181,60,.45)`, color: GOLD, borderRadius: "999px", padding: "5px 12px", margin: "0 8px 8px 0", fontSize: ".88rem", fontWeight: 600 };
  const panelStyle = { width: "100%", maxWidth: "540px", marginTop: "28px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "20px", padding: "22px" };
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
        {!clean && <p style={subStyle}>Paste names · pull the lever · draw a winner</p>}
      </div>

      <div style={stageStyle}>
        <div style={cabinetStyle}>
          <div style={medallionStyle}>
            <img
              src={HUB_LOGO}
              alt="DuckWichita"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.innerHTML = '<span style="font-size:42px">🦆</span>'; }}
            />
          </div>

          <div style={bezelStyle}>
            <div style={windowStyle}>
              <div ref={reelRef} style={stripStyle}>
                {reel.map((nm, i) => (
                  <div key={i} style={rowStyle}>
                    <span style={rowTextStyle}>{nm}</span>
                  </div>
                ))}
              </div>
              {names.length === 0 && <div style={placeholderStyle}>Paste names below to load the machine.</div>}
              <div style={paylineStyle} />
            </div>
            <div style={triLeftStyle} />
            <div style={triRightStyle} />
          </div>
        </div>

        <div style={countStyle}>{names.length > 0 ? `${names.length} ${names.length === 1 ? "name" : "names"} loaded` : "No names loaded yet"}</div>

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
          <p style={panelHintStyle}>Paste one name per line. Want to weight the odds? Add a name more than once. Five lines for one person is five tickets and five times the chances.</p>
          <textarea style={textareaStyle} value={raw} onChange={(e) => setRaw(e.target.value)} placeholder={"Garrett\nHannah\nLogan\nMaria\n..."} spellCheck={false} />
        </div>
      )}

      {!clean && (
        <section style={seoStyle}>
          <h2 style={seoH2}>Free random name picker</h2>
          <p>This is a free random name picker built like a slot machine. Paste a list of names, pull the lever, and the reel scrolls through your entries and lands on one winner at random. There is no sign up and nothing to install. Your list stays in your browser and is never uploaded, so it is a private, fair way to run a drawing. Use it whenever you need to choose a winner without playing favorites.</p>

          <h2 style={seoH2}>How to use it</h2>
          <p>Paste your names into the box above, one per line. Each name becomes a ticket in the machine. Press SPIN, or tap the space bar, and watch the reel slow to a stop on a random winner. To run a drawing with several prizes, choose Remove winner after each pull so the same person is not drawn twice.</p>

          <h2 style={seoH2}>Why a reel instead of a wheel</h2>
          <p>A spinning wheel looks great with a handful of names, but once you load dozens the slices get so thin the labels turn into an unreadable blur. The reel does not have that problem. Names stay full size and readable while it spins, whether you load ten people or a thousand, so a big community drawing looks just as clean as a small one.</p>

          <h2 style={seoH2}>Popular uses</h2>
          <p>People use it to draw giveaway and raffle winners, pick a prize drawing winner for a contest, call on students in a classroom, choose who goes first in a game, pick the next person in a team standup, and run Secret Santa or door prize draws at events.</p>

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
