"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

/* ── GVonFlue landing gate ──
   Duck art: /logos/soloduck.png
   Levers in the .gvf-intro CSS block: --gv-cobalt #1338DE  --gv-orange #FF6B35
   --gv-ink #0A0B14  --gv-cream #FBF6EA
   To show on EVERY visit instead of once per session, delete the
   sessionStorage block inside the first useEffect (marked below). */

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
    setTimeout(() => setGone(true), 850);
  };

  if (gone) return null;

  return (
    <div
      className={`gvf-intro ${leaving ? "gvf-leaving" : ""}`}
      role="dialog"
      aria-label="Welcome to GVonFlue Real Estate"
    >
      <style>{css}</style>
      <div className="gvf-inner">
        <img src="/logos/soloduck.png" alt="" className="gvf-duck" />
        <p className="gvf-kicker">GVonFlue Real Estate</p>
        <h1 className="gvf-name">Garrett Von Flue</h1>
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
  position:fixed;inset:0;z-index:99999;display:grid;place-items:center;
  background:var(--gv-ink);overflow:hidden;padding:24px;
  transition:opacity 0.8s ease, transform 0.8s ease;
}
.gvf-intro::before{
  content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:760px;height:760px;border-radius:50%;
  background:radial-gradient(circle,rgba(19,56,222,0.32),transparent 62%);
  filter:blur(50px);pointer-events:none;
}
.gvf-intro::after{
  content:"";position:absolute;bottom:-120px;right:-80px;
  width:420px;height:420px;border-radius:50%;
  background:radial-gradient(circle,rgba(255,107,53,0.16),transparent 64%);
  filter:blur(50px);pointer-events:none;
}
.gvf-leaving{opacity:0;transform:scale(1.08);pointer-events:none;}
.gvf-inner{
  position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;
  text-align:center;animation:gvfIn 0.9s cubic-bezier(.2,.8,.2,1) both;
}
.gvf-leaving .gvf-inner{transform:translateY(-22px);transition:transform 0.8s ease;}
.gvf-duck{
  width:128px;height:auto;display:block;margin-bottom:26px;
  animation:gvfFloat 3.2s ease-in-out infinite;
}
.gvf-kicker{
  font-family:var(--body);font-size:0.74rem;font-weight:700;letter-spacing:0.22em;
  text-transform:uppercase;color:var(--gv-orange);margin:0 0 14px;
}
.gvf-name{
  font-family:var(--disp);font-weight:600;line-height:1.02;color:#fff;margin:0;
  font-size:clamp(2.4rem,7vw,4.4rem);letter-spacing:-0.01em;
}
.gvf-tag{
  font-family:var(--body);font-size:clamp(1rem,2.4vw,1.25rem);
  color:rgba(255,255,255,0.6);margin:14px 0 0;
}
.gvf-enter{
  margin-top:38px;cursor:pointer;display:inline-flex;align-items:center;gap:10px;
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
  .gvf-duck{width:104px;margin-bottom:20px;}
  .gvf-enter{padding:15px 32px;font-size:1.02rem;}
}
`;
