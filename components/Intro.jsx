"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

/* ── GVonFlue landing gate (shatter exit) ──
   Logo: /logos/gvonflue-logo.png
   Levers in the .gvf-intro CSS block: --gv-cobalt #1338DE  --gv-orange #FF6B35
   --gv-ink #0A0B14  --gv-cream #FBF6EA
   Shatter density: COLS x ROWS below.  Exit duration: EXIT_MS below.
   To show on EVERY visit, delete the sessionStorage block in the first useEffect. */

const COLS = 7;
const ROWS = 5;
const EXIT_MS = 1050;

// deterministic pseudo-random (same on server + client -> no hydration mismatch)
const hash = (i, s) => {
  const x = Math.sin((i + 1) * 12.9898 + s * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function tileStyle(i) {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  let nx = (col + 0.5) / COLS - 0.5;
  let ny = (row + 0.5) / ROWS - 0.5;
  // center-ish tiles get a hashed direction so they don't just sit there
  if (Math.abs(nx) + Math.abs(ny) < 0.12) {
    const a = hash(i, 9) * Math.PI * 2;
    nx = Math.cos(a);
    ny = Math.sin(a);
  }
  const len = Math.hypot(nx, ny) || 1;
  const mag = 95 + hash(i, 3) * 75; // 95..170 vmax
  const dx = (nx / len) * mag;
  const dy = (ny / len) * mag;
  const rot = (hash(i, 4) - 0.5) * 200; // -100..100 deg
  const delay = hash(i, 5) * 0.13; // 0..0.13s stagger
  return {
    "--dx": `${dx.toFixed(1)}vmax`,
    "--dy": `${dy.toFixed(1)}vmax`,
    "--rot": `${rot.toFixed(1)}deg`,
    transitionDelay: `${delay.toFixed(3)}s`,
  };
}

export default function Intro() {
  const [gone, setGone] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // ── once-per-session gate (delete this block to show every visit) ──
    try {
      if (sessionStorage.getItem("gvf_intro_seen") === "1") {
        setGone(true);
        return;
      }
    } catch (e) {}
    // ──────────────────────────────────────────────────────────────────
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const enter = () => {
    setLeaving(true);
    document.body.style.overflow = "";
    try {
      sessionStorage.setItem("gvf_intro_seen", "1");
    } catch (e) {}
    setTimeout(() => setGone(true), EXIT_MS);
  };

  if (gone) return null;

  const tiles = Array.from({ length: COLS * ROWS });

  return (
    <div
      className={`gvf-intro ${leaving ? "gvf-leaving" : ""}`}
      role="dialog"
      aria-label="Welcome to GVonFlue Real Estate"
    >
      <style>{css}</style>

      <div className="gvf-shatter" aria-hidden="true">
        {tiles.map((_, i) => (
          <span key={i} className="gvf-tile" style={tileStyle(i)} />
        ))}
      </div>

      <div className="gvf-glow" aria-hidden="true" />

      <div className="gvf-inner">
        <img src="/logos/gvonflue-logo.png" alt="GVonFlue Real Estate" className="gvf-logo" />
        <p className="gvf-tag">Relationship First Real Estate</p>
        <button className="gvf-enter" onClick={enter}>
          Enter <ArrowRight size={20} />
        </button>
        <span className="gvf-sub">No suit. No jargon. Just keys.</span>
      </div>
    </div>
  );
}

const css = `
.gvf-intro{
  --gv-cobalt:#1338DE;--gv-orange:#FF6B35;--gv-ink:#0A0B14;--gv-cream:#FBF6EA;
  position:fixed;inset:0;z-index:99999;overflow:hidden;
}
.gvf-shatter{
  position:absolute;inset:0;z-index:0;display:grid;
  grid-template-columns:repeat(7,1fr);grid-template-rows:repeat(5,1fr);
}
.gvf-tile{
  background:var(--gv-ink);box-shadow:0 0 0 1px var(--gv-ink);
  will-change:transform,opacity;
  transition:transform 0.85s cubic-bezier(.55,.06,.3,1), opacity 0.85s ease;
}
.gvf-leaving .gvf-tile{
  transform:translate(var(--dx),var(--dy)) rotate(var(--rot)) scale(0.55);
  opacity:0;
}
.gvf-glow{
  position:absolute;inset:0;z-index:1;pointer-events:none;
  background:
    radial-gradient(680px 680px at 50% 46%, rgba(19,56,222,0.30), transparent 60%),
    radial-gradient(420px 420px at 82% 88%, rgba(255,107,53,0.16), transparent 62%);
  transition:opacity 0.4s ease;
}
.gvf-leaving .gvf-glow{opacity:0;}
.gvf-inner{
  position:absolute;inset:0;z-index:2;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;padding:24px;
  animation:gvfIn 0.9s cubic-bezier(.2,.8,.2,1) both;
  transition:opacity 0.32s ease, transform 0.32s ease;
}
.gvf-leaving .gvf-inner{opacity:0;transform:scale(1.18) translateY(-12px);pointer-events:none;}
.gvf-logo{
  width:clamp(260px,42vw,420px);height:auto;display:block;
  filter:drop-shadow(0 6px 30px rgba(19,56,222,0.55));
  animation:gvfFloat 3.4s ease-in-out infinite;
}
.gvf-tag{
  font-family:var(--body);font-size:clamp(1rem,2.4vw,1.25rem);
  color:rgba(255,255,255,0.62);margin:26px 0 0;
}
.gvf-enter{
  margin-top:36px;cursor:pointer;display:inline-flex;align-items:center;gap:10px;
  font-family:var(--disp);font-size:1.1rem;font-weight:600;color:#fff;
  background:linear-gradient(135deg,var(--gv-orange),#ff8a5c);
  border:none;padding:16px 38px;border-radius:999px;
  box-shadow:0 14px 34px rgba(255,107,53,0.42);
  transition:transform 0.18s ease, box-shadow 0.18s ease;
}
.gvf-enter:hover{transform:translateY(-3px);box-shadow:0 20px 44px rgba(255,107,53,0.5);}
.gvf-enter:active{transform:translateY(-1px);}
.gvf-sub{
  margin-top:20px;font-family:var(--body);font-size:0.86rem;
  color:rgba(255,255,255,0.4);letter-spacing:0.02em;
}
@keyframes gvfIn{from{opacity:0;transform:translateY(26px);}to{opacity:1;transform:translateY(0);}}
@keyframes gvfFloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-9px);}}
@media(max-width:520px){
  .gvf-enter{padding:15px 32px;font-size:1.02rem;}
}
`;
