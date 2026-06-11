"use client";

import Link from "next/link";
import Lockup from "@/components/Lockup";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Instagram, Facebook, Sparkles, ArrowUpRight, Heart, MapPin, Share2, QrCode, Search, Trophy, Ticket, DollarSign, Calendar, Flame, UtensilsCrossed, Shirt } from "lucide-react";

export default function DuckWichita() {
  const COBALT = "#1338DE";
  const ORANGE = "#FF6B35";
  const GOLD = "#E7B53C";
  const RED = "#D62828";
  const INK = "#0A0B14";

  const pageStyle = { background: "#FFFFFF", minHeight: "100vh", color: INK };
  const topBarStyle = { padding: "28px 24px", display: "flex", justifyContent: "center" };

  const heroStyle = { padding: "60px 24px 80px", textAlign: "center", maxWidth: "1180px", margin: "0 auto", position: "relative" };
  const heroKickerStyle = { display: "inline-flex", alignItems: "center", gap: "10px", padding: "10px 22px", background: "rgba(255,107,53,.12)", borderRadius: "999px", color: ORANGE, fontFamily: "var(--disp)", fontSize: ".9rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "32px", border: `1.5px solid rgba(255,107,53,.4)` };
  const heroTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(3rem, 9vw, 7rem)", lineHeight: 0.92, letterSpacing: "-.025em", margin: "0 0 28px", color: INK };
  const orangeAccent = { color: ORANGE };
  const goldAccent = { color: "var(--gold)" };
  const heroSubStyle = { fontSize: "1.35rem", lineHeight: 1.5, color: "rgba(10,11,20,.7)", maxWidth: "640px", margin: "0 auto 44px" };
  const heroCtasStyle = { display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginBottom: "60px" };
  const heroDuckWrapStyle = { maxWidth: "420px", margin: "0 auto", aspectRatio: "1/1", borderRadius: "32px", background: `linear-gradient(135deg, ${COBALT} 0%, ${INK} 100%)`, overflow: "hidden", boxShadow: `0 30px 80px rgba(19,56,222,.3), 0 0 70px rgba(255,107,53,.2)`, position: "relative" };
  const heroDuckImgStyle = { width: "100%", height: "100%", objectFit: "cover", display: "block" };

  const sectionStyle = { padding: "100px 24px", maxWidth: "1180px", margin: "0 auto" };
  const sectionKickerStyle = { display: "inline-block", fontFamily: "var(--disp)", fontSize: ".85rem", fontWeight: 700, color: ORANGE, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "16px" };
  const sectionTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.4rem, 6vw, 4.2rem)", lineHeight: 1, letterSpacing: "-.02em", margin: "0 0 28px", color: INK };
  const ledeStyle = { maxWidth: "680px", fontSize: "1.2rem", color: "rgba(10,11,20,.7)", lineHeight: 1.6 };

  const manifestoWrapStyle = { background: INK, color: "#fff", padding: "100px 32px", borderRadius: "32px", margin: "60px auto", maxWidth: "1180px", textAlign: "center" };
  const manifestoTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.4rem, 6vw, 4.2rem)", margin: "0 0 32px", lineHeight: 1.05, color: "#fff", letterSpacing: "-.02em" };
  const manifestoCopyStyle = { color: "rgba(255,255,255,.78)", fontSize: "1.25rem", lineHeight: 1.6, maxWidth: "640px", margin: "0 auto 24px" };

  const flowchartWrapStyle = { marginTop: "60px", position: "relative" };
  const flowGridStyle = { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", alignItems: "stretch", position: "relative" };
  const flowStepStyle = { background: "#FFFFFF", border: `3px solid ${INK}`, borderRadius: "20px", padding: "32px 24px", textAlign: "center", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" };
  const flowIconWrapStyle = { width: "72px", height: "72px", borderRadius: "20px", background: ORANGE, color: "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" };
  const flowStepNumStyle = { position: "absolute", top: "-16px", left: "50%", transform: "translateX(-50%)", background: COBALT, color: "#FFFFFF", borderRadius: "999px", padding: "4px 14px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".85rem", letterSpacing: ".1em" };
  const flowStepTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.2rem", margin: "0 0 10px", color: INK, lineHeight: 1.2 };
  const flowStepBodyStyle = { color: "rgba(10,11,20,.65)", fontSize: ".95rem", lineHeight: 1.5, margin: 0 };

  // Prize section styles — identical to /jointheflock
  const prizeWrapStyle = { position: "relative", padding: "60px 24px 120px", maxWidth: "1280px", margin: "0 auto" };
  const prizeButtonStyle = { position: "relative", padding: "70px 40px 70px", borderRadius: "40px", border: "5px solid var(--gold)", background: "linear-gradient(180deg, #FFFEFA 0%, #FFF6E0 100%)", boxShadow: "0 30px 80px rgba(231,181,60,.25), 0 0 0 1px rgba(231,181,60,.1), inset 0 1px 0 rgba(255,255,255,.9)", overflow: "hidden" };
  const prizeBadgeStyle = { display: "inline-flex", alignItems: "center", gap: "12px", padding: "18px 36px", background: "var(--gold)", color: "var(--ink)", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1.2rem", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "36px", boxShadow: "0 0 0 0 rgba(231,181,60,.7)", animation: "pulse-big 2.5s infinite" };
  const prizeHeadlineStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.6rem, 6.5vw, 4.8rem)", lineHeight: 1, letterSpacing: "-.02em", margin: "0 0 20px", color: "var(--ink)", textAlign: "center" };
  const prizeSubStyle = { fontSize: "1.2rem", color: "var(--muted)", maxWidth: "640px", margin: "0 auto 48px", textAlign: "center", lineHeight: 1.5 };
  const prizeFooterStyle = { textAlign: "center", marginTop: "48px" };
  const prizeValueLineStyle = { fontFamily: "var(--disp)", fontSize: "1.5rem", color: "var(--ink)", margin: "0 0 8px", fontWeight: 700 };
  const prizeDrawingLineStyle = { color: "var(--muted)", margin: "0 0 28px", fontSize: "1rem" };

  // Headline (Joe Dirt) card - RED, scaled up
  const headlineCardWrapStyle = { maxWidth: "560px", margin: "0 auto 24px", position: "relative" };
  const headlineRibbonStyle = { position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", background: RED, color: "#FFFFFF", padding: "8px 22px", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".82rem", letterSpacing: ".15em", boxShadow: "0 6px 20px rgba(214,40,40,.4)", zIndex: 3 };
  const headlineCardStyle = { background: `linear-gradient(160deg, ${RED} 0%, #8B1A1A 100%)`, color: "#fff", borderRadius: "28px", padding: "44px 36px", boxShadow: "0 30px 70px rgba(214,40,40,.35)", border: `2px solid ${GOLD}`, textAlign: "center", transform: "scale(1.02)" };
  const headlineIconStyle = { width: "64px", height: "64px", borderRadius: "18px", background: GOLD, color: INK, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" };
  const headlineTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.9rem", margin: "0 0 10px", color: "#fff", lineHeight: 1.1 };
  const headlineSponsorStyle = { fontFamily: "var(--disp)", fontWeight: 700, color: GOLD, fontSize: ".95rem", letterSpacing: ".08em", textTransform: "uppercase", margin: "0 0 14px" };
  const headlineBodyStyle = { color: "rgba(255,255,255,.85)", margin: "0 0 18px", lineHeight: 1.55, fontSize: "1rem" };
  const headlineValueStyle = { display: "inline-block", padding: "6px 18px", background: "rgba(255,255,255,.15)", borderRadius: "999px", color: "#fff", fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".95rem" };

  // Standard cobalt prize cards (4 supporting prizes)
  const prizeCardsStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", maxWidth: "1100px", margin: "0 auto" };
  const prizeCardStyle = { background: `linear-gradient(160deg, ${COBALT} 0%, ${INK} 100%)`, color: "#fff", borderRadius: "24px", padding: "32px 28px", position: "relative", overflow: "hidden", boxShadow: "0 24px 60px rgba(11,30,138,.25)", border: "1px solid rgba(231,181,60,.3)" };
  const prizeIconWrapStyle = { width: "52px", height: "52px", borderRadius: "14px", background: "var(--gold)", color: "var(--ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" };
  const prizeCardTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.4rem", margin: "0 0 10px", color: "#fff", lineHeight: 1.15 };
  const prizeCardBodyStyle = { color: "rgba(255,255,255,.78)", margin: "0 0 14px", lineHeight: 1.5, fontSize: ".95rem" };
  const prizeCardMetaStyle = { display: "flex", alignItems: "center", gap: "8px", fontSize: ".8rem", color: "var(--gold)", fontFamily: "var(--disp)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" };

  const noDuckWrapStyle = { background: "rgba(19,56,222,.06)", border: `2px dashed ${COBALT}`, borderRadius: "24px", padding: "40px 32px", marginTop: "60px", textAlign: "center", maxWidth: "780px", marginLeft: "auto", marginRight: "auto" };
  const noDuckTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.6rem", margin: "0 0 12px", color: COBALT };
  const noDuckBodyStyle = { color: "rgba(10,11,20,.7)", fontSize: "1.05rem", lineHeight: 1.55, margin: "0 0 20px" };

  const bonusWrapStyle = { background: "#FFFFFF", border: `3px solid ${ORANGE}`, borderRadius: "24px", padding: "44px 32px", marginTop: "40px", textAlign: "center", maxWidth: "780px", marginLeft: "auto", marginRight: "auto", boxShadow: `0 24px 60px rgba(255,107,53,.18)` };
  const bonusBadgeStyle = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 20px", background: ORANGE, color: "#FFFFFF", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".85rem", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "20px" };
  const bonusTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(1.6rem, 4vw, 2.3rem)", margin: "0 0 14px", color: INK, lineHeight: 1.15 };
  const bonusBodyStyle = { color: "rgba(10,11,20,.7)", fontSize: "1.08rem", lineHeight: 1.55, margin: "0 auto", maxWidth: "560px" };

  const galleryGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "48px" };
  const galleryCardStyle = { aspectRatio: "1/1", background: `linear-gradient(135deg, ${COBALT} 0%, ${INK} 100%)`, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.5)", fontFamily: "var(--disp)", fontSize: ".85rem", letterSpacing: ".1em", textTransform: "uppercase", border: `2px solid ${ORANGE}` };

  const winnerWrapStyle = { background: "#FFFFFF", border: `3px solid ${ORANGE}`, borderRadius: "32px", padding: "60px 40px", margin: "48px auto 0", maxWidth: "780px", textAlign: "center", position: "relative" };
  const winnerBadgeStyle = { display: "inline-block", padding: "8px 20px", background: ORANGE, color: "#FFFFFF", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".85rem", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "20px" };
  const winnerTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", margin: "0 0 16px", color: INK, lineHeight: 1.15 };
  const winnerCopyStyle = { color: "rgba(10,11,20,.65)", fontSize: "1.05rem", lineHeight: 1.55, maxWidth: "500px", margin: "0 auto" };

  const sponsorWrapStyle = { background: ORANGE, color: "#FFFFFF", padding: "80px 32px", borderRadius: "32px", margin: "60px auto", maxWidth: "1180px", textAlign: "center" };
  const sponsorKickerStyle = { color: "rgba(255,255,255,.85)", fontFamily: "var(--disp)", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", fontSize: ".85rem", marginBottom: "16px", display: "inline-block" };
  const sponsorTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.2rem, 5.5vw, 3.6rem)", margin: "0 0 24px", lineHeight: 1.05, color: "#FFFFFF" };
  const sponsorCopyStyle = { maxWidth: "640px", margin: "0 auto 32px", fontSize: "1.2rem", lineHeight: 1.55, color: "rgba(255,255,255,.9)" };

  const garrettWrapStyle = { textAlign: "center", maxWidth: "780px", margin: "0 auto" };
  const garrettSigStyle = { fontFamily: "var(--disp)", fontWeight: 600, color: COBALT, fontSize: "1.05rem", margin: "0 0 4px" };
  const garrettSubStyle = { color: "rgba(10,11,20,.55)", fontSize: ".95rem", margin: "0 0 32px" };

  const orangeBtnStyle = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "16px 30px", background: ORANGE, color: "#FFFFFF", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 700, fontSize: "1rem", textDecoration: "none", border: "none", cursor: "pointer" };
  const ghostBtnStyle = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "16px 30px", background: "transparent", color: INK, borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 700, fontSize: "1rem", textDecoration: "none", border: `2px solid ${INK}`, cursor: "pointer" };
  const whiteBtnStyle = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "16px 30px", background: "#FFFFFF", color: ORANGE, borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1rem", textDecoration: "none", border: "none", cursor: "pointer" };
  const cobaltBtnStyle = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 26px", background: COBALT, color: "#FFFFFF", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".95rem", textDecoration: "none", border: "none", cursor: "pointer" };

  return (
    <main style={pageStyle}>
      <style>{`
        @keyframes pulse-big { 0% { box-shadow: 0 0 0 0 rgba(231,181,60,.7); } 70% { box-shadow: 0 0 0 32px rgba(231,181,60,0); } 100% { box-shadow: 0 0 0 0 rgba(231,181,60,0); } }
        @keyframes arrow-bob-left { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(16px); } }
        @keyframes arrow-bob-right { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-16px); } }
        @keyframes sparkle-float { 0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: .5; } 50% { transform: translateY(-18px) scale(1.2) rotate(20deg); opacity: 1; } }
        @keyframes duck-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes duck-bob { 0%, 100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-8px) rotate(3deg); } }
        .duck-hero-wrap { animation: duck-float 5s ease-in-out infinite; }
        .prize-button { transition: transform .35s ease, box-shadow .35s ease; }
        .prize-button:hover { transform: translateY(-6px); box-shadow: 0 40px 100px rgba(231,181,60,.4), 0 0 0 1px rgba(231,181,60,.2), inset 0 1px 0 rgba(255,255,255,.9); }
        .prize-arrow-left { position: absolute; left: -10px; top: 50%; transform: translateY(-50%); animation: arrow-bob-left 1.8s ease-in-out infinite; z-index: 2; }
        .prize-arrow-right { position: absolute; right: -10px; top: 50%; transform: translateY(-50%); animation: arrow-bob-right 1.8s ease-in-out infinite; z-index: 2; }
        .dw-sparkle { position: absolute; z-index: 0; pointer-events: none; }
        .dw-sparkle.s1 { top: 8%; left: 6%; animation: sparkle-float 4s ease-in-out 0s infinite; }
        .dw-sparkle.s2 { top: 18%; right: 8%; animation: sparkle-float 4.5s ease-in-out .6s infinite; }
        .dw-sparkle.s3 { top: 55%; left: 3%; animation: sparkle-float 3.8s ease-in-out 1.2s infinite; }
        .dw-sparkle.s4 { top: 62%; right: 5%; animation: sparkle-float 4.2s ease-in-out 1.8s infinite; }
        @media (max-width: 900px) {
          .dw-sparkle { display: none; }
          .flow-grid { grid-template-columns: 1fr !important; }
          .prize-arrow-left, .prize-arrow-right { display: none; }
        }
      `}</style>

      <div style={topBarStyle}><Lockup /></div>

      <section style={heroStyle}>
        <svg className="dw-sparkle s1" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={ORANGE}/></svg>
        <svg className="dw-sparkle s2" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={COBALT}/></svg>
        <svg className="dw-sparkle s3" width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={ORANGE}/></svg>
        <svg className="dw-sparkle s4" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={COBALT}/></svg>

        <Reveal><span style={heroKickerStyle}><Sparkles size={14} /> A Wichita Movement</span></Reveal>
        <Reveal as="h1" delay={80} style={heroTitleStyle}>Spreading <span style={orangeAccent}>smiles.</span><br/>One duck at a time.</Reveal>
        <Reveal as="p" delay={140} style={heroSubStyle}>DuckWichita is the strangest, smallest movement in town — tiny patriotic ducks hidden across the city, each one a chance to win something local.</Reveal>
        <Reveal delay={200}>
          <div style={heroCtasStyle}>
            <a href="#prize" style={orangeBtnStyle}>See This Month&apos;s Prize <ArrowUpRight size={20} /></a>
            <a href="#how" style={ghostBtnStyle}>How It Works</a>
          </div>
        </Reveal>
        <Reveal delay={260}>
          <div className="duck-hero-wrap" style={heroDuckWrapStyle}>
            <img src="/images/duck.jpg" alt="A DuckWichita patriotic duck" style={heroDuckImgStyle} />
          </div>
        </Reveal>
      </section>

      <section style={manifestoWrapStyle} id="story">
        <Reveal><span style={{ ...sectionKickerStyle, color: ORANGE }}>The Why</span></Reveal>
        <Reveal as="h2" delay={80} style={manifestoTitleStyle}>Wichita already has enough <span style={orangeAccent}>billboards.</span></Reveal>
        <Reveal as="p" delay={140} style={manifestoCopyStyle}>What it doesn&apos;t have is enough small, random, ridiculous moments of joy between strangers.</Reveal>
        <Reveal as="p" delay={200} style={manifestoCopyStyle}>So we made some. A few hundred tiny patriotic ducks, hidden across the city. Find one, and you&apos;re part of something — including <strong style={{ color: "#fff" }}>twice-monthly drawings for Huge Local Prizes</strong>.</Reveal>
        <Reveal as="p" delay={260} style={{ ...manifestoCopyStyle, color: ORANGE, fontWeight: 600 }}>That&apos;s it. That&apos;s the whole thing.</Reveal>
      </section>

      <section style={sectionStyle} id="how">
        <Reveal><span style={sectionKickerStyle}>How It Works</span></Reveal>
        <Reveal as="h2" delay={60} style={sectionTitleStyle}>Four steps to <span style={orangeAccent}>the flock.</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>Each duck carries a QR code on a small Duck Tag. That code is the secret door — only people who find a duck can scan in.</Reveal>

        <div style={flowchartWrapStyle}>
          <div className="flow-grid" style={flowGridStyle}>
            <Reveal delay={180}>
              <div style={flowStepStyle}>
                <span style={flowStepNumStyle}>STEP 01</span>
                <div style={flowIconWrapStyle}><Search size={32} /></div>
                <h3 style={flowStepTitleStyle}>Find a duck</h3>
                <p style={flowStepBodyStyle}>Spot one in the wild — coffee shops, benches, trails, storefronts across Wichita.</p>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div style={flowStepStyle}>
                <span style={flowStepNumStyle}>STEP 02</span>
                <div style={flowIconWrapStyle}><QrCode size={32} /></div>
                <h3 style={flowStepTitleStyle}>Scan the QR</h3>
                <p style={flowStepBodyStyle}>Each duck has a Duck Tag with a QR code. Scan it with your phone — that&apos;s your entry.</p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div style={flowStepStyle}>
                <span style={flowStepNumStyle}>STEP 03</span>
                <div style={flowIconWrapStyle}><Sparkles size={32} /></div>
                <h3 style={flowStepTitleStyle}>Join the flock</h3>
                <p style={flowStepBodyStyle}>You&apos;ll land on a secret page. Drop your name, you&apos;re in the bucket for 1 full year.</p>
              </div>
            </Reveal>

            <Reveal delay={360}>
              <div style={flowStepStyle}>
                <span style={flowStepNumStyle}>STEP 04</span>
                <div style={flowIconWrapStyle}><Trophy size={32} /></div>
                <h3 style={flowStepTitleStyle}>Win local prizes</h3>
                <p style={flowStepBodyStyle}>Two drawings a month — the 1st and the 15th. One name from the whole flock wins each time.</p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={420}>
          <div style={bonusWrapStyle}>
            <span style={bonusBadgeStyle}>🎯 5x Bonus</span>
            <h3 style={bonusTitleStyle}>Post your duck = <span style={orangeAccent}>5x the chances.</span></h3>
            <p style={bonusBodyStyle}>Once you&apos;re in the flock, snap a photo with your duck and post it to Instagram or Facebook using <strong>#DuckWichita</strong>. When we spot it, your single entry jumps to <strong style={orangeAccent}>5 entries</strong> — five times the shot at the prize. Just make sure the duck is in the photo. Always free, no purchase ever.</p>
          </div>
        </Reveal>

        <Reveal delay={480}>
          <div style={noDuckWrapStyle}>
            <h3 style={noDuckTitleStyle}>Don&apos;t have a duck yet?</h3>
            <p style={noDuckBodyStyle}>The only way into the flock right now is to find one in the wild. Follow <strong>@gvonflue</strong> on Instagram for clues on where the latest ducks have been dropped.</p>
            <a href="https://instagram.com/gvonflue" target="_blank" rel="noopener noreferrer" style={cobaltBtnStyle}><Instagram size={18} /> Follow for duck drops</a>
          </div>
        </Reveal>
      </section>

      {/* JUNE LAUNCH PRIZE — full $840+ package (identical to /jointheflock) */}
      <section style={prizeWrapStyle} id="prize">
        <div className="prize-arrow-left">
          <svg width="90" height="90" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 40 L62 40 M45 22 L62 40 L45 58" stroke="var(--gold)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div className="prize-arrow-right">
          <svg width="90" height="90" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(180deg)" }}><path d="M8 40 L62 40 M45 22 L62 40 L45 58" stroke="var(--gold)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>

        <div className="prize-button" style={prizeButtonStyle}>
          <div style={{ textAlign: "center" }}>
            <Reveal><span style={prizeBadgeStyle}>🦆 July 1 Drawing</span></Reveal>
            <Reveal as="h2" delay={80} style={prizeHeadlineStyle}>The ultimate <span style={goldAccent}>Wichita summer</span> package.</Reveal>
            <Reveal as="p" delay={140} style={prizeSubStyle}>Five prizes. Over $840 in total value. One Wichita winner. This is what we&apos;re launching with — and we&apos;re only getting bigger.</Reveal>
          </div>

          {/* Headline Sponsor — Joe Dirt */}
          <Reveal delay={180}>
            <div style={headlineCardWrapStyle}>
              <div style={headlineRibbonStyle}>★ HEADLINE SPONSOR ★</div>
              <div style={headlineCardStyle}>
                <div style={headlineIconStyle}><Flame size={32} /></div>
                <p style={headlineSponsorStyle}>Sponsored by Joe Dirt Fireworks</p>
                <h3 style={headlineTitleStyle}>$300 Fireworks Bundle</h3>
                <p style={headlineBodyStyle}>The headline prize. Joe Dirt Fireworks is loading up a premium $300 bundle of the loudest, brightest fireworks Wichita has to offer. Light up your 4th of July.</p>
                <span style={headlineValueStyle}>$300 value</span>
              </div>
            </div>
          </Reveal>

          {/* 4 supporting prizes */}
          <Reveal delay={240}>
            <div style={prizeCardsStyle}>
              <div style={prizeCardStyle}>
                <div style={prizeIconWrapStyle}><Ticket size={24} /></div>
                <h3 style={prizeCardTitleStyle}>4 Wind Surge Tickets</h3>
                <p style={prizeCardBodyStyle}>Section A, directly behind home plate. Bring the family, a date, your crew. Good for any home game this season.</p>
                <div style={prizeCardMetaStyle}><MapPin size={14} /> Equity Bank Park</div>
              </div>
              <div style={prizeCardStyle}>
                <div style={prizeIconWrapStyle}><UtensilsCrossed size={24} /></div>
                <h3 style={prizeCardTitleStyle}>$200 Dinner Gift Card</h3>
                <p style={prizeCardBodyStyle}>A full dinner on the house at a top Wichita restaurant. Bring whoever you want. Restaurant sponsor announcement coming soon.</p>
                <div style={prizeCardMetaStyle}><Sparkles size={14} /> Local restaurant</div>
              </div>
              <div style={prizeCardStyle}>
                <div style={prizeIconWrapStyle}><Shirt size={24} /></div>
                <h3 style={prizeCardTitleStyle}>DuckWichita Merch Bundle</h3>
                <p style={prizeCardBodyStyle}>Two official DuckWichita tees and a sticker pack. Collector&apos;s edition — only the first winners get these.</p>
                <div style={prizeCardMetaStyle}><Sparkles size={14} /> Limited drop</div>
              </div>
              <div style={prizeCardStyle}>
                <div style={prizeIconWrapStyle}><DollarSign size={24} /></div>
                <h3 style={prizeCardTitleStyle}>$200 Cash</h3>
                <p style={prizeCardBodyStyle}>No strings, no restrictions. Spend it on whatever the rest of this package doesn&apos;t cover.</p>
                <div style={prizeCardMetaStyle}><Sparkles size={14} /> Spend it however</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div style={prizeFooterStyle}>
              <p style={prizeValueLineStyle}>Total package value: <span style={goldAccent}>$840+</span></p>
              <p style={prizeDrawingLineStyle}><Calendar size={16} style={{ display: "inline", marginRight: "6px", verticalAlign: "-3px" }} />First drawing: July 1, 2026 · Winner announced on @gvonflue</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={sectionStyle}>
        <Reveal><span style={sectionKickerStyle}>The Flock In Action</span></Reveal>
        <Reveal as="h2" delay={60} style={sectionTitleStyle}>Recent <span style={orangeAccent}>finds.</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>Real Wichitans, real ducks, real smiles. Tag <strong>#DuckWichita</strong> on Instagram and you might end up here.</Reveal>

        <div style={galleryGridStyle}>
          <Reveal delay={180}><div style={galleryCardStyle}>#DuckWichita</div></Reveal>
          <Reveal delay={220}><div style={galleryCardStyle}>#DuckWichita</div></Reveal>
          <Reveal delay={260}><div style={galleryCardStyle}>#DuckWichita</div></Reveal>
          <Reveal delay={300}><div style={galleryCardStyle}>#DuckWichita</div></Reveal>
          <Reveal delay={340}><div style={galleryCardStyle}>#DuckWichita</div></Reveal>
          <Reveal delay={380}><div style={galleryCardStyle}>#DuckWichita</div></Reveal>
        </div>

        <Reveal delay={440}>
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <a href="https://instagram.com/gvonflue" target="_blank" rel="noopener noreferrer" style={orangeBtnStyle}><Instagram size={20} /> See more on Instagram</a>
          </div>
        </Reveal>
      </section>

      <section style={sectionStyle}>
        <Reveal><span style={sectionKickerStyle}>Last Drawing&apos;s Spotlight</span></Reveal>
        <Reveal as="h2" delay={60} style={sectionTitleStyle}>The flock <span style={orangeAccent}>gives back.</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>Twice a month, someone in the flock wins something cool — local prizes, experiences, gift cards, tickets. Past winners live here.</Reveal>

        <Reveal delay={180}>
          <div style={winnerWrapStyle}>
            <span style={winnerBadgeStyle}>🦆 Next drawing soon</span>
            <h3 style={winnerTitleStyle}>Our first winner is on the way.</h3>
            <p style={winnerCopyStyle}>Drawings happen on the 1st and 15th of every month. We&apos;ll feature each winner — and their prize — right here. Follow along on Instagram to find out who.</p>
          </div>
        </Reveal>
      </section>

      <section style={sponsorWrapStyle}>
        <Reveal><span style={sponsorKickerStyle}>For local businesses</span></Reveal>
        <Reveal as="h2" delay={60} style={sponsorTitleStyle}>Be part of <span style={{ color: INK }}>the flock.</span></Reveal>
        <Reveal as="p" delay={120} style={sponsorCopyStyle}>Local restaurants, coffee shops, gyms, boutiques, services, and event spaces can sponsor a month, donate a prize, or just host a duck. It&apos;s low-key, real, and connects you to the actual people of this city.</Reveal>
        <Reveal delay={180}>
          <a href="/sponsor" style={whiteBtnStyle}>Become a sponsor <ArrowUpRight size={20} /></a>
        </Reveal>
      </section>

      <section style={sectionStyle}>
        <div style={garrettWrapStyle}>
          <Reveal><span style={sectionKickerStyle}>Who&apos;s Behind It</span></Reveal>
          <Reveal as="h2" delay={60} style={sectionTitleStyle}>One guy. <span style={orangeAccent}>One city.</span> A lot of ducks.</Reveal>
          <Reveal as="p" delay={120} style={{ ...ledeStyle, margin: "0 auto 24px" }}>DuckWichita was started by Garrett Von Flue — a Wichita Realtor who wanted to do something for the city that wasn&apos;t a billboard, a yard sign, or a sales pitch.</Reveal>
          <Reveal as="p" delay={180} style={{ ...ledeStyle, margin: "0 auto 32px" }}>If you&apos;ve ever thought about buying or selling a home in Wichita, or just want to see what he&apos;s about, come hang out on his site for a minute.</Reveal>
          <Reveal delay={240}>
            <p style={garrettSigStyle}>— Garrett Von Flue</p>
            <p style={garrettSubStyle}>REALTOR® · Real Broker LLC · Wichita, KS</p>
            <a href="https://gvonflue.vercel.app" style={orangeBtnStyle}>Meet Garrett <ArrowUpRight size={20} /></a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
