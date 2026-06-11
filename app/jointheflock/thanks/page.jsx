"use client";

import Link from "next/link";
import Lockup from "@/components/Lockup";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Instagram, Facebook, ArrowUpRight, Sparkles, Calendar } from "lucide-react";

export default function JoinTheFlockThanks() {
  const pageStyle = { background: "linear-gradient(180deg, #FFF9EC 0%, #FFFFFF 35%)", minHeight: "100vh", color: "var(--ink)" };
  const topBarStyle = { padding: "28px 24px", display: "flex", justifyContent: "center" };
  const wrapStyle = { padding: "40px 24px 80px", textAlign: "center", maxWidth: "780px", margin: "0 auto", position: "relative" };
  const badgeStyle = { display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 24px", background: "rgba(231,181,60,.18)", borderRadius: "999px", color: "var(--cobalt)", fontFamily: "var(--disp)", fontSize: ".95rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "32px", border: "1.5px solid rgba(231,181,60,.45)" };
  const duckEmojiStyle = { fontSize: "5.5rem", margin: "0 0 20px", lineHeight: 1, display: "block" };
  const headlineStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.8rem, 7vw, 5.2rem)", lineHeight: 0.95, letterSpacing: "-.02em", margin: "0 0 24px", color: "var(--ink)" };
  const goldAccent = { color: "var(--gold)" };
  const subStyle = { fontSize: "1.25rem", lineHeight: 1.55, color: "var(--muted)", maxWidth: "620px", margin: "0 auto 48px" };
  const followCardStyle = { background: "linear-gradient(180deg, #FFFEFA 0%, #FFF6E0 100%)", border: "5px solid var(--gold)", borderRadius: "32px", padding: "48px 32px", margin: "0 auto 48px", boxShadow: "0 24px 60px rgba(231,181,60,.2)", textAlign: "center" };
  const followKickerStyle = { fontFamily: "var(--disp)", fontSize: ".9rem", fontWeight: 700, color: "var(--cobalt)", letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 16px" };
  const followTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", margin: "0 0 16px", color: "var(--ink)", lineHeight: 1.1 };
  const followBodyStyle = { color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.55, maxWidth: "500px", margin: "0 auto 32px" };
  const followBtnsStyle = { display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" };
  const infoCardStyle = { background: "#fff", border: "1px solid rgba(11,11,20,.08)", borderRadius: "20px", padding: "32px", margin: "0 auto 60px", boxShadow: "0 12px 40px rgba(11,30,138,.06)", maxWidth: "560px", textAlign: "left" };
  const infoTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.2rem", margin: "0 0 16px", color: "var(--ink)" };
  const infoListStyle = { listStyle: "none", padding: 0, margin: 0 };
  const infoItemStyle = { display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px 0", color: "var(--muted)", lineHeight: 1.5, borderBottom: "1px solid rgba(11,11,20,.06)" };
  const infoLastStyle = { ...infoItemStyle, borderBottom: "none" };

  const meetWrapStyle = { background: "var(--ink)", color: "#fff", borderRadius: "32px", padding: "60px 32px", margin: "0 auto", maxWidth: "780px", textAlign: "center", boxShadow: "0 24px 60px rgba(11,11,20,.2)" };
  const meetKickerStyle = { fontFamily: "var(--disp)", fontSize: ".85rem", fontWeight: 700, color: "var(--gold)", letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 20px" };
  const meetTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)", margin: "0 0 20px", color: "#fff", lineHeight: 1.1 };
  const meetBodyStyle = { color: "rgba(255,255,255,.78)", fontSize: "1.1rem", lineHeight: 1.6, maxWidth: "560px", margin: "0 auto 32px" };
  const meetSigStyle = { fontFamily: "var(--disp)", fontStyle: "italic", color: "var(--gold)", fontSize: "1.05rem", marginBottom: "32px" };

  return (
    <main style={pageStyle}>
      <style>{`
        @keyframes confetti-pop { 0% { transform: scale(0) rotate(0deg); opacity: 0; } 60% { transform: scale(1.2) rotate(200deg); opacity: 1; } 100% { transform: scale(1) rotate(360deg); opacity: 1; } }
        @keyframes sparkle-float { 0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: .5; } 50% { transform: translateY(-18px) scale(1.2) rotate(20deg); opacity: 1; } }
        .duck-emoji-pop { animation: confetti-pop 1s ease-out both; display: inline-block; }
        .thanks-sparkle { position: absolute; z-index: 0; pointer-events: none; }
        .thanks-sparkle.s1 { top: 8%; left: 6%; animation: sparkle-float 4s ease-in-out 0s infinite; }
        .thanks-sparkle.s2 { top: 14%; right: 8%; animation: sparkle-float 4.5s ease-in-out .6s infinite; }
        .thanks-sparkle.s3 { top: 45%; left: 3%; animation: sparkle-float 3.8s ease-in-out 1.2s infinite; }
        .thanks-sparkle.s4 { top: 50%; right: 4%; animation: sparkle-float 4.2s ease-in-out 1.8s infinite; }
        @media (max-width: 900px) { .thanks-sparkle { display: none; } }
      `}</style>

      <div style={topBarStyle}><Lockup /></div>

      <section style={wrapStyle}>
        <svg className="thanks-sparkle s1" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="var(--gold)"/></svg>
        <svg className="thanks-sparkle s2" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="var(--cobalt)"/></svg>
        <svg className="thanks-sparkle s3" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="var(--gold)"/></svg>
        <svg className="thanks-sparkle s4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="var(--cobalt)"/></svg>

        <Reveal><span style={badgeStyle}><Sparkles size={16} /> You&apos;re in the flock</span></Reveal>
        <Reveal delay={60}><span className="duck-emoji-pop" style={duckEmojiStyle}>🦆</span></Reveal>
        <Reveal as="h1" delay={140} style={headlineStyle}>You&apos;re <span style={goldAccent}>officially</span> in the flock.</Reveal>
        <Reveal as="p" delay={200} style={subStyle}>Your entry is locked in. Your name is in the bucket for <strong style={{ color: "var(--ink)" }}>every monthly drawing for the next 2 years</strong> — that&apos;s 24 chances to win something local.</Reveal>

        <Reveal delay={260}>
          <div style={followCardStyle}>
            <p style={followKickerStyle}>One more thing</p>
            <h2 style={followTitleStyle}>Follow <span style={goldAccent}>@gvonflue</span> so you don&apos;t miss it.</h2>
            <p style={followBodyStyle}>I announce every winner on Instagram and Facebook. If your name gets pulled and you&apos;re not following, you might miss the call.</p>
            <div style={followBtnsStyle}>
              <a href="https://instagram.com/gvonflue" target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg"><Instagram size={20} /> Follow on Instagram</a>
              <a href="https://www.facebook.com/garrettvonflue/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg"><Facebook size={20} /> Follow on Facebook</a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div style={infoCardStyle}>
            <h3 style={infoTitleStyle}>What happens next</h3>
            <ul style={infoListStyle}>
              <li style={infoItemStyle}><Calendar size={18} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }} /><span><strong style={{ color: "var(--ink)" }}>Next drawing:</strong> June 30. If you win, I&apos;ll reach out via the email or phone you entered.</span></li>
              <li style={infoItemStyle}><Sparkles size={18} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }} /><span><strong style={{ color: "var(--ink)" }}>Got your duck?</strong> Snap a photo with it and post using <strong>#DuckWichita</strong> — tag me and I&apos;ll repost.</span></li>
              <li style={infoLastStyle}><ArrowUpRight size={18} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }} /><span><strong style={{ color: "var(--ink)" }}>Spread the flock.</strong> Know someone who needs ducked? Tell them about it. The flock grows by word of mouth.</span></li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={380}>
          <div style={meetWrapStyle}>
            <p style={meetKickerStyle}>Wait — who&apos;s behind this?</p>
            <h2 style={meetTitleStyle}>Hi. I&apos;m <span style={goldAccent}>Garrett.</span></h2>
            <p style={meetBodyStyle}>I&apos;m a Realtor here in Wichita who got tired of agents only showing up when they want something. DuckWichita is my way of doing the opposite — giving stuff away, spotlighting local people, and being part of the city instead of just selling to it.</p>
            <p style={meetBodyStyle}>If you&apos;ve ever thought about buying or selling a home around here — or you just want to see what I&apos;m about — come hang out on my site for a minute.</p>
            <p style={meetSigStyle}>— Garrett Von Flue</p>
            <a href="https://gvonflue.vercel.app" className="btn btn-gold btn-lg">Meet the guy behind the ducks <ArrowUpRight size={20} /></a>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
