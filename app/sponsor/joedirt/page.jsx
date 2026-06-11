"use client";

import Lockup from "@/components/Lockup";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Sparkles, ArrowUpRight, Flame, Users, TrendingUp, MapPin, Camera, Heart, Mail, Phone, Check, Star } from "lucide-react";

export default function JoeDirtSponsorPitch() {
  const COBALT = "#1338DE";
  const ORANGE = "#FF6B35";
  const RED = "#D62828";
  const INK = "#0A0B14";

  const pageStyle = { background: "#FFFFFF", minHeight: "100vh", color: INK, overflow: "hidden" };
  const topBarStyle = { padding: "28px 24px", display: "flex", justifyContent: "center" };

  // HERO
  const heroStyle = { padding: "40px 24px 60px", textAlign: "center", maxWidth: "1100px", margin: "0 auto", position: "relative" };
  const heroKickerStyle = { display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 26px", background: RED, color: "#FFFFFF", borderRadius: "999px", fontFamily: "var(--disp)", fontSize: ".9rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "28px" };
  const heroTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.6rem, 7vw, 5.4rem)", lineHeight: 0.95, letterSpacing: "-.025em", margin: "0 0 24px", color: INK };
  const redAccent = { color: RED };
  const orangeAccent = { color: ORANGE };
  const cobaltAccent = { color: COBALT };
  const heroSubStyle = { fontSize: "1.3rem", lineHeight: 1.55, color: "rgba(10,11,20,.72)", maxWidth: "720px", margin: "0 auto 40px" };

  // CO-BRAND LOCKUP HERO
  const lockupWrapStyle = { position: "relative", padding: "44px 32px", background: "#FFFFFF", borderRadius: "32px", border: `4px solid ${INK}`, boxShadow: `0 30px 80px rgba(214,40,40,.18), inset 0 0 0 8px ${RED}, inset 0 0 0 12px #FFFFFF, inset 0 0 0 16px ${COBALT}`, maxWidth: "780px", margin: "0 auto 32px" };
  const lockupInnerStyle = { display: "flex", alignItems: "center", justifyContent: "center", gap: "32px", flexWrap: "wrap" };
  const lockupBrandStyle = { fontFamily: "var(--disp)", fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 900, color: INK, letterSpacing: "-.02em", textAlign: "center" };
  const lockupPlusStyle = { fontFamily: "var(--disp)", fontSize: "2.4rem", fontWeight: 900, color: RED };
  const partnerLogoStyle = { maxWidth: "180px", height: "auto", display: "block" };

  // SECTIONS
  const sectionStyle = { padding: "60px 24px", maxWidth: "1100px", margin: "0 auto", position: "relative" };
  const sectionKickerStyle = { display: "inline-block", fontFamily: "var(--disp)", fontSize: ".85rem", fontWeight: 800, color: RED, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "16px" };
  const sectionTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", lineHeight: 1, letterSpacing: "-.02em", margin: "0 0 24px", color: INK };
  const ledeStyle = { fontSize: "1.2rem", color: "rgba(10,11,20,.72)", lineHeight: 1.6, maxWidth: "780px" };

  // PITCH BLOCK (dark)
  const pitchWrapStyle = { background: INK, color: "#fff", padding: "80px 32px", borderRadius: "32px", margin: "40px auto 60px", maxWidth: "1100px", textAlign: "center", position: "relative", overflow: "hidden", border: `3px solid ${RED}` };
  const pitchTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2rem, 5vw, 3.4rem)", margin: "0 0 24px", lineHeight: 1.1, color: "#fff", position: "relative", zIndex: 2 };
  const pitchCopyStyle = { color: "rgba(255,255,255,.82)", fontSize: "1.2rem", lineHeight: 1.6, maxWidth: "680px", margin: "0 auto 20px", position: "relative", zIndex: 2 };

  // FIT SECTION
  const fitWrapStyle = { background: `linear-gradient(135deg, rgba(214,40,40,.08), rgba(19,56,222,.08))`, border: `3px solid ${RED}`, borderRadius: "32px", padding: "60px 40px", margin: "60px auto", maxWidth: "1100px" };
  const fitTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2rem, 5vw, 3rem)", margin: "0 0 24px", lineHeight: 1.1, color: INK };
  const fitListStyle = { listStyle: "none", padding: 0, margin: "32px 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" };
  const fitItemStyle = { display: "flex", alignItems: "flex-start", gap: "14px", padding: "24px", background: "#FFFFFF", borderRadius: "16px", border: `2px solid ${INK}`, boxShadow: "0 8px 24px rgba(10,11,20,.08)" };
  const fitCheckStyle = { flexShrink: 0, width: "36px", height: "36px", borderRadius: "10px", background: RED, color: "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center" };
  const fitItemTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.1rem", fontWeight: 800, color: INK, margin: "0 0 6px" };
  const fitItemBodyStyle = { color: "rgba(10,11,20,.72)", fontSize: ".95rem", lineHeight: 1.5, margin: 0 };

  // VALUE EXCHANGE
  const exchangeWrapStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "48px" };
  const exchangeCardGiveStyle = { background: "#FFFFFF", border: `3px solid ${INK}`, borderRadius: "24px", padding: "40px 32px" };
  const exchangeCardGetStyle = { background: "#FFFFFF", border: `3px solid ${RED}`, borderRadius: "24px", padding: "40px 32px", boxShadow: `0 20px 60px rgba(214,40,40,.15)` };
  const exchangeHeaderStyle = { display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px", paddingBottom: "20px", borderBottom: `2px solid rgba(10,11,20,.08)` };
  const exchangeKickerStyle = { fontFamily: "var(--disp)", fontSize: ".8rem", fontWeight: 800, color: "rgba(10,11,20,.5)", letterSpacing: ".12em", textTransform: "uppercase", margin: 0 };
  const exchangeTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.5rem", fontWeight: 800, color: INK, margin: "4px 0 0", lineHeight: 1.1 };
  const exchangeItemStyle = { padding: "14px 0", color: "rgba(10,11,20,.78)", fontSize: "1rem", lineHeight: 1.5, display: "flex", alignItems: "flex-start", gap: "10px", borderBottom: "1px solid rgba(10,11,20,.06)" };

  // LIVE EXAMPLE
  const exampleWrapStyle = { padding: "60px 40px", borderRadius: "40px", border: `5px solid ${RED}`, background: "#FFFFFF", boxShadow: `0 30px 80px rgba(214,40,40,.25), 0 0 0 1px rgba(214,40,40,.1)`, margin: "48px auto 0", position: "relative" };
  const exampleBadgeStyle = { display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 28px", background: RED, color: "#FFFFFF", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1rem", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "24px" };
  const exampleTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.05, letterSpacing: "-.02em", margin: "0 0 16px", color: INK, textAlign: "center" };
  const examplePrizeListStyle = { listStyle: "none", padding: 0, margin: "32px 0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" };
  const examplePrizeItemStyle = { background: `linear-gradient(160deg, ${COBALT} 0%, ${INK} 100%)`, color: "#fff", borderRadius: "16px", padding: "24px" };
  const examplePrizeItemHighlightStyle = { background: `linear-gradient(160deg, ${RED} 0%, #8C1A1A 100%)`, color: "#fff", borderRadius: "16px", padding: "24px", border: `3px solid ${INK}`, boxShadow: `0 12px 40px rgba(214,40,40,.5)`, position: "relative", transform: "scale(1.05)" };
  const examplePrizeLabelStyle = { fontSize: ".7rem", fontFamily: "var(--disp)", letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 8px", opacity: 0.85 };
  const examplePrizeNameStyle = { fontFamily: "var(--disp)", fontSize: "1.15rem", fontWeight: 800, margin: 0, lineHeight: 1.15 };
  const headlinePrizeStyle = { position: "absolute", top: "-12px", right: "-12px", background: "#FFFFFF", color: RED, fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".7rem", padding: "6px 12px", borderRadius: "999px", border: `2px solid ${RED}`, letterSpacing: ".1em" };

  // METRICS
  const metricsGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginTop: "48px" };
  const metricCardStyle = { background: "#FFFFFF", border: `2px solid ${COBALT}`, borderRadius: "20px", padding: "28px 24px", textAlign: "left" };
  const metricIconWrapStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "12px", background: COBALT, color: "#FFFFFF", marginBottom: "16px" };
  const metricLabelStyle = { fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".1em", color: "rgba(10,11,20,.55)", fontWeight: 800, fontFamily: "var(--disp)", margin: "0 0 8px" };
  const metricValueStyle = { fontFamily: "var(--disp)", fontSize: "1.7rem", fontWeight: 800, color: INK, margin: "0 0 8px", letterSpacing: "-.01em" };
  const metricSubStyle = { fontSize: ".95rem", color: "rgba(10,11,20,.65)", lineHeight: 1.5, margin: 0 };

  // FOUNDING SPONSOR CALLOUT
  const foundingWrapStyle = { background: INK, color: "#FFFFFF", padding: "60px 40px", borderRadius: "32px", margin: "60px auto", maxWidth: "1100px", textAlign: "center", border: `4px solid ${RED}`, position: "relative", overflow: "hidden" };
  const foundingBadgeStyle = { display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 26px", background: "#FFFFFF", color: RED, borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 900, fontSize: ".95rem", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "24px" };
  const foundingTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.2rem, 6vw, 3.6rem)", lineHeight: 1.05, margin: "0 0 24px", color: "#FFFFFF" };
  const foundingCopyStyle = { color: "rgba(255,255,255,.85)", fontSize: "1.2rem", lineHeight: 1.6, maxWidth: "680px", margin: "0 auto 16px" };

  // HONEST CALLOUT
  const honestWrapStyle = { background: "#FFFFFF", border: `2px dashed ${COBALT}`, borderRadius: "20px", padding: "32px", maxWidth: "780px", margin: "48px auto 0" };
  const honestTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.3rem", fontWeight: 800, color: COBALT, margin: "0 0 12px" };
  const honestCopyStyle = { color: "rgba(10,11,20,.75)", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 };

  // CTA
  const ctaWrapStyle = { background: `linear-gradient(135deg, ${RED} 0%, #8C1A1A 100%)`, color: "#FFFFFF", padding: "80px 40px", borderRadius: "32px", margin: "60px auto", maxWidth: "1100px", textAlign: "center", position: "relative", overflow: "hidden", border: `4px solid ${INK}` };
  const ctaTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.2rem, 5.5vw, 3.6rem)", lineHeight: 1.05, margin: "0 0 24px", color: "#FFFFFF", position: "relative", zIndex: 2 };
  const ctaCopyStyle = { fontSize: "1.2rem", lineHeight: 1.55, color: "rgba(255,255,255,.95)", maxWidth: "620px", margin: "0 auto 36px", position: "relative", zIndex: 2 };
  const ctaBtnStyle = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "20px 40px", background: "#FFFFFF", color: RED, borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 900, fontSize: "1.1rem", textDecoration: "none", border: "none", cursor: "pointer", marginBottom: "20px", position: "relative", zIndex: 2 };
  const ctaContactStyle = { color: "rgba(255,255,255,.95)", fontSize: "1rem", margin: "8px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", position: "relative", zIndex: 2 };

  return (
    <main style={pageStyle}>
      <style>{`
        @keyframes burst { 0%, 100% { transform: scale(1) rotate(0deg); opacity: .4; } 50% { transform: scale(1.4) rotate(180deg); opacity: 1; } }
        @keyframes sparkle-float { 0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: .5; } 50% { transform: translateY(-14px) scale(1.2) rotate(20deg); opacity: 1; } }
        @keyframes drift-up { 0% { transform: translateY(40px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .firework { position: absolute; z-index: 0; pointer-events: none; animation: burst 3s ease-in-out infinite; }
        .firework.f1 { top: 12%; left: 4%; animation-delay: 0s; }
        .firework.f2 { top: 18%; right: 5%; animation-delay: .8s; }
        .firework.f3 { bottom: 12%; left: 6%; animation-delay: 1.6s; }
        .firework.f4 { bottom: 18%; right: 8%; animation-delay: 2.2s; }
        .star-bg { position: absolute; z-index: 0; pointer-events: none; opacity: .4; animation: sparkle-float 4s ease-in-out infinite; }
        .star-bg.s1 { top: 8%; left: 8%; animation-delay: 0s; }
        .star-bg.s2 { top: 18%; right: 10%; animation-delay: .6s; }
        .star-bg.s3 { top: 42%; left: 4%; animation-delay: 1.2s; }
        .star-bg.s4 { top: 58%; right: 6%; animation-delay: 1.8s; }
        .star-bg.s5 { top: 75%; left: 10%; animation-delay: 2.4s; }
        .star-bg.s6 { top: 82%; right: 12%; animation-delay: 3s; }
        @media (max-width: 800px) {
          .star-bg, .firework { display: none; }
          .exchange-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={topBarStyle}><Lockup /></div>

      {/* HERO */}
      <section style={heroStyle}>
        {/* Background fireworks */}
        <svg className="firework f1" width="60" height="60" viewBox="0 0 60 60" fill="none"><g stroke={RED} strokeWidth="2" strokeLinecap="round"><line x1="30" y1="6" x2="30" y2="18"/><line x1="30" y1="42" x2="30" y2="54"/><line x1="6" y1="30" x2="18" y2="30"/><line x1="42" y1="30" x2="54" y2="30"/><line x1="14" y1="14" x2="22" y2="22"/><line x1="38" y1="38" x2="46" y2="46"/><line x1="46" y1="14" x2="38" y2="22"/><line x1="22" y1="38" x2="14" y2="46"/></g><circle cx="30" cy="30" r="3" fill={RED}/></svg>
        <svg className="firework f2" width="50" height="50" viewBox="0 0 60 60" fill="none"><g stroke={COBALT} strokeWidth="2" strokeLinecap="round"><line x1="30" y1="6" x2="30" y2="18"/><line x1="30" y1="42" x2="30" y2="54"/><line x1="6" y1="30" x2="18" y2="30"/><line x1="42" y1="30" x2="54" y2="30"/><line x1="14" y1="14" x2="22" y2="22"/><line x1="38" y1="38" x2="46" y2="46"/></g><circle cx="30" cy="30" r="3" fill={COBALT}/></svg>
        <svg className="star-bg s1" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={RED}/></svg>
        <svg className="star-bg s2" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={COBALT}/></svg>

        <Reveal><span style={heroKickerStyle}><Star size={14} fill="#FFFFFF" /> Founding Sponsor Invitation</span></Reveal>
        <Reveal as="h1" delay={80} style={heroTitleStyle}>Let&apos;s light up <span style={redAccent}>Wichita</span> together.</Reveal>
        <Reveal as="p" delay={140} style={heroSubStyle}>DuckWichita is a local viral marketing campaign launching this month. We&apos;re inviting one founding sponsor to anchor our launch prize — and there&apos;s only one obvious choice for a patriotic-themed campaign in Wichita.</Reveal>

        {/* CO-BRAND LOCKUP */}
        <Reveal delay={200}>
          <div style={lockupWrapStyle}>
            <div style={lockupInnerStyle}>
              <div style={lockupBrandStyle}>
                <div style={{ fontSize: ".7em", color: RED, letterSpacing: ".1em", marginBottom: "2px" }}>🦆</div>
                DuckWichita
              </div>
              <div style={lockupPlusStyle}>×</div>
              <img src="/images/joedirt.png" alt="Joe Dirt's Fireworks" style={partnerLogoStyle} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* THE PITCH */}
      <section style={pitchWrapStyle}>
        <Reveal><span style={{ ...sectionKickerStyle, color: ORANGE }}>The 60-second version</span></Reveal>
        <Reveal as="h2" delay={80} style={pitchTitleStyle}>Patriotic ducks. Hidden across Wichita. <span style={redAccent}>Real prizes for real people.</span></Reveal>
        <Reveal as="p" delay={140} style={pitchCopyStyle}>I&apos;m placing hundreds of small patriotic rubber ducks across the city. Each one has a QR code on a tag. When someone finds one and scans it, they enter a secret giveaway page. Twice a month, someone from the &quot;flock&quot; wins a local prize package.</Reveal>
        <Reveal as="p" delay={200} style={pitchCopyStyle}>That&apos;s it. Simple. Strange. Designed to spread by word of mouth.</Reveal>
        <Reveal as="p" delay={260} style={{ ...pitchCopyStyle, color: ORANGE, fontWeight: 700, fontSize: "1.3rem" }}>The launch prize is what gets people talking. That&apos;s where you come in.</Reveal>
      </section>

      {/* WHY JOE DIRT FITS */}
      <section style={sectionStyle}>
        <svg className="star-bg s3" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={RED}/></svg>
        <svg className="star-bg s4" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={COBALT}/></svg>

        <Reveal><span style={sectionKickerStyle}>Why Joe Dirt fits</span></Reveal>
        <Reveal as="h2" delay={60} style={sectionTitleStyle}>This isn&apos;t a generic ask. <span style={redAccent}>Look at the fit.</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>You&apos;re the only sponsor I&apos;m approaching for this launch month. The fit is too obvious to spread the ask wider.</Reveal>

        <div style={fitWrapStyle}>
          <Reveal as="h3" delay={140} style={fitTitleStyle}>Four reasons it&apos;s a yes:</Reveal>
          <ul style={fitListStyle}>
            <Reveal delay={180}>
              <li style={fitItemStyle}>
                <span style={fitCheckStyle}><Flame size={20} /></span>
                <div>
                  <h4 style={fitItemTitleStyle}>Patriotic theme = perfect match</h4>
                  <p style={fitItemBodyStyle}>The ducks are stars-and-stripes themed. Fireworks are stars-and-stripes themed. Same vibe, same audience, same energy — and your brand already lives in this lane.</p>
                </div>
              </li>
            </Reveal>
            <Reveal delay={240}>
              <li style={fitItemStyle}>
                <span style={fitCheckStyle}><Users size={20} /></span>
                <div>
                  <h4 style={fitItemTitleStyle}>Same target audience</h4>
                  <p style={fitItemBodyStyle}>Wichita families and locals who like real, hometown stuff. The exact people who buy fireworks every summer.</p>
                </div>
              </li>
            </Reveal>
            <Reveal delay={300}>
              <li style={fitItemStyle}>
                <span style={fitCheckStyle}><Camera size={20} /></span>
                <div>
                  <h4 style={fitItemTitleStyle}>Built for sharing</h4>
                  <p style={fitItemBodyStyle}>Every finder posts their duck. Every winner posts their prize. Every post tags you. Free social exposure baked into the model.</p>
                </div>
              </li>
            </Reveal>
            <Reveal delay={360}>
              <li style={fitItemStyle}>
                <span style={fitCheckStyle}><Heart size={20} /></span>
                <div>
                  <h4 style={fitItemTitleStyle}>The 4th of July timing</h4>
                  <p style={fitItemBodyStyle}>We&apos;re launching mid-June. Fireworks season is RIGHT now. Your busiest sales window aligned with maximum brand exposure.</p>
                </div>
              </li>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* THE EXCHANGE */}
      <section style={sectionStyle}>
        <Reveal><span style={sectionKickerStyle}>The deal</span></Reveal>
        <Reveal as="h2" delay={60} style={sectionTitleStyle}>What you give. <span style={redAccent}>What you get.</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>Sponsorship terms shouldn&apos;t need a lawyer. Here&apos;s the whole deal on two cards.</Reveal>

        <div className="exchange-grid" style={exchangeWrapStyle}>
          <Reveal delay={180}>
            <div style={exchangeCardGiveStyle}>
              <div style={exchangeHeaderStyle}>
                <span style={{ ...fitCheckStyle, background: INK }}><ArrowUpRight size={20} /></span>
                <div>
                  <p style={exchangeKickerStyle}>You give</p>
                  <h3 style={exchangeTitleStyle}>A showcase fireworks bundle</h3>
                </div>
              </div>
              <div style={exchangeItemStyle}>
                <Check size={20} style={{ color: RED, flexShrink: 0, marginTop: "2px" }} />
                <span>One premium fireworks bundle worth <strong>$200&ndash;300 retail</strong> — your call on contents and packaging.</span>
              </div>
              <div style={exchangeItemStyle}>
                <Check size={20} style={{ color: RED, flexShrink: 0, marginTop: "2px" }} />
                <span>Coordination with the winner on pickup at your store (or delivery if you prefer).</span>
              </div>
              <div style={{ ...exchangeItemStyle, borderBottom: "none" }}>
                <Check size={20} style={{ color: RED, flexShrink: 0, marginTop: "2px" }} />
                <span>Your logo + a sentence about Joe Dirt for me to feature across all marketing.</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div style={exchangeCardGetStyle}>
              <div style={exchangeHeaderStyle}>
                <span style={fitCheckStyle}><Sparkles size={20} /></span>
                <div>
                  <p style={exchangeKickerStyle}>You get</p>
                  <h3 style={exchangeTitleStyle}>Founding sponsor exposure</h3>
                </div>
              </div>
              <div style={exchangeItemStyle}>
                <Check size={20} style={{ color: RED, flexShrink: 0, marginTop: "2px" }} />
                <span><strong>Headline sponsor recognition</strong> on duckwichita.com — your logo + link prominently on the prize section.</span>
              </div>
              <div style={exchangeItemStyle}>
                <Check size={20} style={{ color: RED, flexShrink: 0, marginTop: "2px" }} />
                <span><strong>Sponsor tag on every social post</strong> about the June prize — Instagram, Facebook, every duck-find repost.</span>
              </div>
              <div style={exchangeItemStyle}>
                <Check size={20} style={{ color: RED, flexShrink: 0, marginTop: "2px" }} />
                <span><strong>Winner announcement video</strong> features Joe Dirt as the headline prize. The most-shared post of the month.</span>
              </div>
              <div style={exchangeItemStyle}>
                <Check size={20} style={{ color: RED, flexShrink: 0, marginTop: "2px" }} />
                <span><strong>Press mentions</strong> in any coverage we land (we&apos;re pitching KAKE, KSN, Wichita Eagle).</span>
              </div>
              <div style={exchangeItemStyle}>
                <Check size={20} style={{ color: RED, flexShrink: 0, marginTop: "2px" }} />
                <span><strong>First right of refusal</strong> on every future patriotic-themed month (July, Veterans Day, Memorial Day).</span>
              </div>
              <div style={{ ...exchangeItemStyle, borderBottom: "none" }}>
                <Check size={20} style={{ color: RED, flexShrink: 0, marginTop: "2px" }} />
                <span><strong>&quot;Founding Sponsor&quot; designation</strong> permanently linked to your brand on every retrospective post about the campaign launch.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LIVE EXAMPLE */}
      <section style={sectionStyle}>
        <Reveal><span style={sectionKickerStyle}>What it looks like in practice</span></Reveal>
        <Reveal as="h2" delay={60} style={sectionTitleStyle}>Here&apos;s exactly where <span style={redAccent}>Joe Dirt headlines.</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>This is the actual June launch prize package — your bundle is the centerpiece.</Reveal>

        <Reveal delay={180}>
          <div style={exampleWrapStyle}>
            <div style={{ textAlign: "center" }}>
              <span style={exampleBadgeStyle}>🦆 June Launch Prize</span>
              <h2 style={exampleTitleStyle}>The Ultimate <span style={redAccent}>Wichita Summer Night</span></h2>
            </div>

            <ul style={examplePrizeListStyle}>
              <li style={examplePrizeItemStyle}>
                <p style={examplePrizeLabelStyle}>Ticket sponsor</p>
                <p style={examplePrizeNameStyle}>4 Wind Surge Tickets · Section A</p>
              </li>
              <li style={examplePrizeItemHighlightStyle}>
                <span style={headlinePrizeStyle}>HEADLINE</span>
                <p style={examplePrizeLabelStyle}>🎆 Joe Dirt&apos;s Fireworks</p>
                <p style={examplePrizeNameStyle}>Premium Showcase Bundle ($200&ndash;300 value)</p>
              </li>
              <li style={examplePrizeItemStyle}>
                <p style={examplePrizeLabelStyle}>Cash bonus</p>
                <p style={examplePrizeNameStyle}>$100 for whatever they want</p>
              </li>
            </ul>

            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <p style={{ fontFamily: "var(--disp)", fontSize: "1.5rem", color: INK, margin: "0 0 8px", fontWeight: 800 }}>Total package value: <span style={redAccent}>$400&ndash;500+</span></p>
              <p style={{ color: "rgba(10,11,20,.65)", margin: 0, fontSize: ".95rem" }}>Featured on duckwichita.com from launch through July 15</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOUNDING SPONSOR CALLOUT */}
      <section style={foundingWrapStyle}>
        <svg className="firework f3" width="50" height="50" viewBox="0 0 60 60" fill="none"><g stroke={ORANGE} strokeWidth="2" strokeLinecap="round"><line x1="30" y1="6" x2="30" y2="18"/><line x1="30" y1="42" x2="30" y2="54"/><line x1="6" y1="30" x2="18" y2="30"/><line x1="42" y1="30" x2="54" y2="30"/></g><circle cx="30" cy="30" r="3" fill={ORANGE}/></svg>

        <Reveal><span style={foundingBadgeStyle}><Star size={14} fill={RED} /> Once-only opportunity</span></Reveal>
        <Reveal as="h2" delay={80} style={foundingTitleStyle}>The <span style={redAccent}>Founding Sponsor</span> tag never goes away.</Reveal>
        <Reveal as="p" delay={140} style={foundingCopyStyle}>Every brand that comes after Joe Dirt&apos;s Fireworks will be a regular sponsor. You&apos;ll be the original. The one who took the bet first.</Reveal>
        <Reveal as="p" delay={200} style={foundingCopyStyle}>If DuckWichita goes the way it&apos;s designed to go, every &quot;here&apos;s how this all started&quot; story features your brand prominently. That&apos;s the kind of compounding value you can&apos;t buy with ad spend.</Reveal>
      </section>

      {/* METRICS */}
      <section style={sectionStyle}>
        <Reveal><span style={sectionKickerStyle}>The honest numbers</span></Reveal>
        <Reveal as="h2" delay={60} style={sectionTitleStyle}>What I&apos;m projecting <span style={redAccent}>(no fluff).</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>I&apos;m not going to overpromise reach we haven&apos;t earned yet. Here&apos;s the conservative June projection.</Reveal>

        <div style={metricsGridStyle}>
          <Reveal delay={180}>
            <div style={metricCardStyle}>
              <div style={metricIconWrapStyle}><MapPin size={22} /></div>
              <p style={metricLabelStyle}>Ducks distributed</p>
              <p style={metricValueStyle}>100+</p>
              <p style={metricSubStyle}>Hand-placed across Wichita over the first 30 days.</p>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div style={metricCardStyle}>
              <div style={metricIconWrapStyle}><Users size={22} /></div>
              <p style={metricLabelStyle}>Projected entries</p>
              <p style={metricValueStyle}>200&ndash;400</p>
              <p style={metricSubStyle}>Each entrant becomes part of a 1-year audience for the campaign.</p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div style={metricCardStyle}>
              <div style={metricIconWrapStyle}><Camera size={22} /></div>
              <p style={metricLabelStyle}>Social posts (UGC)</p>
              <p style={metricValueStyle}>50&ndash;150</p>
              <p style={metricSubStyle}>Finders post #DuckWichita content. Every repost tags you.</p>
            </div>
          </Reveal>
          <Reveal delay={360}>
            <div style={metricCardStyle}>
              <div style={metricIconWrapStyle}><TrendingUp size={22} /></div>
              <p style={metricLabelStyle}>Press potential</p>
              <p style={metricValueStyle}>3&ndash;5 outlets</p>
              <p style={metricSubStyle}>Pitching KAKE, KSN, Wichita Eagle, and local podcasts.</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={420}>
          <div style={honestWrapStyle}>
            <h3 style={honestTitleStyle}>The honest part</h3>
            <p style={honestCopyStyle}>This is a brand new campaign. The above numbers are projections, not guarantees. But here&apos;s what IS guaranteed: <strong>every single post, every press hit, every winner announcement features your brand prominently for the cost of one premium fireworks bundle.</strong> Even at 50% of projections, your CPM destroys traditional ad spend in Wichita. And if this goes viral the way it&apos;s designed to, you&apos;re the founding sponsor of the city&apos;s next quirky thing — and that&apos;s a story you tell forever.</p>
          </div>
        </Reveal>
      </section>

      {/* THE CTA */}
      <section style={ctaWrapStyle}>
        <svg className="firework f4" width="50" height="50" viewBox="0 0 60 60" fill="none"><g stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"><line x1="30" y1="6" x2="30" y2="18"/><line x1="30" y1="42" x2="30" y2="54"/><line x1="6" y1="30" x2="18" y2="30"/><line x1="42" y1="30" x2="54" y2="30"/></g><circle cx="30" cy="30" r="3" fill="#FFFFFF"/></svg>

        <Reveal as="h2" style={ctaTitleStyle}>Want to do this?</Reveal>
        <Reveal as="p" delay={80} style={ctaCopyStyle}>If you&apos;re in, I just need your call on which bundle you want to feature and we&apos;re rolling. I&apos;ll handle the rest — promotion, fulfillment coordination, all of it.</Reveal>
        <Reveal delay={140}>
          <a href="mailto:gvonflue@gmail.com?subject=Joe Dirt Fireworks · DuckWichita Sponsor" style={ctaBtnStyle}><Mail size={20} /> Email me · gvonflue@gmail.com</a>
        </Reveal>
        <Reveal delay={200}>
          <p style={ctaContactStyle}><Phone size={18} /> Or just text: <strong>901-335-3905</strong></p>
        </Reveal>
        <Reveal delay={260}>
          <p style={{ ...ctaContactStyle, marginTop: "20px", fontSize: ".95rem", opacity: 0.9 }}>— Garrett Von Flue · Real Broker LLC</p>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
