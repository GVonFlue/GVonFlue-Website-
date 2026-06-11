"use client";

import { useState } from "react";
import Lockup from "@/components/Lockup";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Sparkles, ArrowUpRight, Flame, Star, Trophy, Heart, Building2, Users, Camera, TrendingUp, MapPin, Mail, Phone, Check, Crown, Award, Handshake } from "lucide-react";

const FORM_KEY = "e87c5fc0-d3e8-47e8-a1ab-5be73241a042";

export default function SponsorInquiry() {
  const router = typeof window !== "undefined" ? null : null;
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTier, setSelectedTier] = useState("");

  const COBALT = "#1338DE";
  const ORANGE = "#FF6B35";
  const RED = "#D62828";
  const INK = "#0A0B14";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    formData.append("access_key", FORM_KEY);
    formData.append("subject", "💼 New DuckWichita Sponsor Inquiry");
    formData.append("from_name", "DuckWichita Sponsor Page");

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  const handleTierClick = (tierName) => {
    setSelectedTier(tierName);
    const formEl = document.getElementById("inquiry");
    if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
  };

  const pageStyle = { background: "#FFFFFF", minHeight: "100vh", color: INK };
  const topBarStyle = { padding: "28px 24px", display: "flex", justifyContent: "center" };

  const heroStyle = { padding: "60px 24px 60px", textAlign: "center", maxWidth: "1100px", margin: "0 auto", position: "relative" };
  const heroKickerStyle = { display: "inline-flex", alignItems: "center", gap: "10px", padding: "10px 22px", background: ORANGE, color: "#FFFFFF", borderRadius: "999px", fontFamily: "var(--disp)", fontSize: ".9rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "28px" };
  const heroTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.8rem, 7.5vw, 5.6rem)", lineHeight: 0.95, letterSpacing: "-.025em", margin: "0 0 24px", color: INK };
  const orangeAccent = { color: ORANGE };
  const cobaltAccent = { color: COBALT };
  const heroSubStyle = { fontSize: "1.3rem", lineHeight: 1.55, color: "rgba(10,11,20,.72)", maxWidth: "720px", margin: "0 auto 40px" };

  const sectionStyle = { padding: "80px 24px", maxWidth: "1180px", margin: "0 auto" };
  const sectionKickerStyle = { display: "inline-block", fontFamily: "var(--disp)", fontSize: ".85rem", fontWeight: 800, color: ORANGE, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "16px" };
  const sectionTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", lineHeight: 1, letterSpacing: "-.02em", margin: "0 0 24px", color: INK };
  const ledeStyle = { fontSize: "1.2rem", color: "rgba(10,11,20,.72)", lineHeight: 1.6, maxWidth: "780px" };

  // VISION SECTION
  const visionWrapStyle = { background: INK, color: "#fff", padding: "80px 40px", borderRadius: "32px", margin: "40px auto", maxWidth: "1180px", textAlign: "center" };
  const visionTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.2rem, 5vw, 3.6rem)", margin: "0 0 24px", lineHeight: 1.1, color: "#fff" };
  const visionCopyStyle = { color: "rgba(255,255,255,.82)", fontSize: "1.2rem", lineHeight: 1.65, maxWidth: "720px", margin: "0 auto 20px" };

  // PROJECTION CARDS
  const projGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginTop: "40px" };
  const projCardStyle = { background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.15)", borderRadius: "20px", padding: "28px 24px", textAlign: "left" };
  const projIconWrapStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "12px", background: ORANGE, color: "#FFFFFF", marginBottom: "16px" };
  const projLabelStyle = { fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".1em", color: "rgba(255,255,255,.6)", fontWeight: 800, fontFamily: "var(--disp)", margin: "0 0 8px" };
  const projValueStyle = { fontFamily: "var(--disp)", fontSize: "1.7rem", fontWeight: 800, color: "#fff", margin: "0 0 8px", letterSpacing: "-.01em" };
  const projSubStyle = { fontSize: ".95rem", color: "rgba(255,255,255,.7)", lineHeight: 1.5, margin: 0 };

  // TIER CARDS
  const tiersGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginTop: "48px" };
  const tierCardBaseStyle = { background: "#FFFFFF", borderRadius: "24px", padding: "40px 32px", position: "relative", display: "flex", flexDirection: "column", height: "100%", boxShadow: "0 12px 40px rgba(10,11,20,.08)" };
  const tierIconWrapStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "56px", height: "56px", borderRadius: "16px", marginBottom: "20px" };
  const tierKickerStyle = { fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".12em", fontFamily: "var(--disp)", fontWeight: 800, margin: "0 0 6px" };
  const tierTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.6rem", fontWeight: 800, color: INK, margin: "0 0 12px", lineHeight: 1.1 };
  const tierPriceStyle = { fontFamily: "var(--disp)", fontSize: "1.3rem", fontWeight: 800, margin: "0 0 20px", letterSpacing: "-.01em" };
  const tierDescStyle = { color: "rgba(10,11,20,.7)", fontSize: ".98rem", lineHeight: 1.55, margin: "0 0 20px" };
  const tierBenefitsListStyle = { listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1 };
  const tierBenefitItemStyle = { padding: "8px 0", color: "rgba(10,11,20,.78)", fontSize: ".95rem", lineHeight: 1.5, display: "flex", alignItems: "flex-start", gap: "10px" };
  const tierCtaStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px 24px", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1rem", border: "none", cursor: "pointer", textDecoration: "none", width: "100%" };

  // FORM
  const formWrapStyle = { background: ORANGE, color: "#FFFFFF", padding: "80px 24px", borderRadius: "32px", margin: "60px auto", maxWidth: "1180px" };
  const formInnerStyle = { maxWidth: "640px", margin: "0 auto" };
  const formTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.2rem, 5.5vw, 3.6rem)", lineHeight: 1.05, margin: "0 0 16px", color: "#FFFFFF", textAlign: "center" };
  const formSubStyle = { fontSize: "1.15rem", color: "rgba(255,255,255,.92)", textAlign: "center", maxWidth: "560px", margin: "0 auto 40px", lineHeight: 1.5 };
  const formCardStyle = { background: "#FFFFFF", borderRadius: "24px", padding: "40px", boxShadow: "0 20px 60px rgba(10,11,20,.15)" };
  const labelStyle = { display: "block", fontSize: ".85rem", fontWeight: 700, color: INK, marginBottom: "6px", fontFamily: "var(--disp)" };
  const inputStyle = { width: "100%", padding: "16px 18px", border: `1.5px solid rgba(10,11,20,.12)`, borderRadius: "12px", fontSize: "1rem", fontFamily: "var(--body)", marginBottom: "16px", background: "#fff", color: INK, outline: "none", boxSizing: "border-box" };
  const textareaStyle = { ...inputStyle, minHeight: "120px", resize: "vertical", fontFamily: "var(--body)" };
  const submitBtnStyle = { width: "100%", padding: "20px", background: INK, color: "#FFFFFF", border: "none", borderRadius: "999px", fontFamily: "var(--disp)", fontSize: "1.1rem", fontWeight: 800, cursor: "pointer", marginTop: "12px" };
  const successWrapStyle = { background: "#FFFFFF", borderRadius: "24px", padding: "60px 40px", textAlign: "center" };
  const successTitleStyle = { fontFamily: "var(--disp)", fontSize: "2.2rem", color: INK, margin: "0 0 16px" };
  const successCopyStyle = { color: "rgba(10,11,20,.7)", fontSize: "1.1rem", lineHeight: 1.55, margin: "0 0 24px" };

  // DIRECT CONTACT
  const directContactStyle = { textAlign: "center", marginTop: "32px", color: "rgba(255,255,255,.92)" };
  const directLinkStyle = { color: "#FFFFFF", fontWeight: 800, textDecoration: "underline" };

  return (
    <main style={pageStyle}>
      <style>{`
        @keyframes sparkle-float { 0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: .5; } 50% { transform: translateY(-18px) scale(1.2) rotate(20deg); opacity: 1; } }
        .sp-sparkle { position: absolute; z-index: 0; pointer-events: none; }
        .sp-sparkle.s1 { top: 12%; left: 6%; animation: sparkle-float 4s ease-in-out 0s infinite; }
        .sp-sparkle.s2 { top: 22%; right: 8%; animation: sparkle-float 4.5s ease-in-out .6s infinite; }
        .sp-sparkle.s3 { top: 60%; left: 4%; animation: sparkle-float 3.8s ease-in-out 1.2s infinite; }
        .sp-sparkle.s4 { top: 70%; right: 6%; animation: sparkle-float 4.2s ease-in-out 1.8s infinite; }
        @media (max-width: 700px) {
          .sp-sparkle { display: none; }
        }
      `}</style>

      <div style={topBarStyle}><Lockup /></div>

      {/* HERO */}
      <section style={heroStyle}>
        <svg className="sp-sparkle s1" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={ORANGE}/></svg>
        <svg className="sp-sparkle s2" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={COBALT}/></svg>

        <Reveal><span style={heroKickerStyle}><Handshake size={14} /> Sponsor DuckWichita</span></Reveal>
        <Reveal as="h1" delay={80} style={heroTitleStyle}>Be part of the <span style={orangeAccent}>most talked-about</span><br/>thing in Wichita.</Reveal>
        <Reveal as="p" delay={140} style={heroSubStyle}>DuckWichita is a viral local marketing movement built for one purpose: spotlight Wichita businesses while making the city smile. We&apos;re building tiers for everyone — from one-duck hosts to founding-month anchors. Pick your fit below.</Reveal>
      </section>

      {/* VISION */}
      <section style={visionWrapStyle}>
        <Reveal><span style={{ ...sectionKickerStyle, color: ORANGE }}>The vision</span></Reveal>
        <Reveal as="h2" delay={80} style={visionTitleStyle}>This isn&apos;t a side hustle. <br/>It&apos;s built to <span style={orangeAccent}>scale.</span></Reveal>
        <Reveal as="p" delay={140} style={visionCopyStyle}>DuckWichita launches in June with hundreds of patriotic ducks hidden across the city. Each duck carries a QR code, each scan creates an entry, and twice a month someone wins a real local prize package funded by sponsors like you.</Reveal>
        <Reveal as="p" delay={200} style={visionCopyStyle}>By Year 1, the goal is 5,000+ entries, 100+ sponsor partnerships, and a recognized local brand that becomes part of Wichita&apos;s identity. By Year 2, expansion into Kansas City, Tulsa, and Oklahoma City — with founding Wichita sponsors getting first dibs in every new market.</Reveal>
        <Reveal as="p" delay={260} style={{ ...visionCopyStyle, color: ORANGE, fontWeight: 700 }}>Get in now, and your brand grows with the campaign.</Reveal>

        <div style={projGridStyle}>
          <Reveal delay={320}>
            <div style={projCardStyle}>
              <div style={projIconWrapStyle}><MapPin size={22} /></div>
              <p style={projLabelStyle}>Year 1 distribution</p>
              <p style={projValueStyle}>1,000+ ducks</p>
              <p style={projSubStyle}>Placed across Wichita over 12 months.</p>
            </div>
          </Reveal>
          <Reveal delay={380}>
            <div style={projCardStyle}>
              <div style={projIconWrapStyle}><Users size={22} /></div>
              <p style={projLabelStyle}>Projected entries</p>
              <p style={projValueStyle}>5,000+</p>
              <p style={projSubStyle}>1-year retention. Each entrant joins our email + SMS audience.</p>
            </div>
          </Reveal>
          <Reveal delay={440}>
            <div style={projCardStyle}>
              <div style={projIconWrapStyle}><Camera size={22} /></div>
              <p style={projLabelStyle}>Social UGC</p>
              <p style={projValueStyle}>500+ posts</p>
              <p style={projSubStyle}>Finders share #DuckWichita content. Every repost tags active sponsors.</p>
            </div>
          </Reveal>
          <Reveal delay={500}>
            <div style={projCardStyle}>
              <div style={projIconWrapStyle}><TrendingUp size={22} /></div>
              <p style={projLabelStyle}>Press potential</p>
              <p style={projValueStyle}>10+ outlets</p>
              <p style={projSubStyle}>Local news, podcasts, regional features. Sponsor brands included in every hit.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TIERS */}
      <section style={sectionStyle} id="tiers">
        <Reveal><span style={sectionKickerStyle}>Sponsorship tiers</span></Reveal>
        <Reveal as="h2" delay={60} style={sectionTitleStyle}>Pick the tier that <span style={orangeAccent}>fits your vision.</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>Six ways to plug in — from full-month brand takeovers to simply hosting a duck at your business. There&apos;s a slot for every kind of partner.</Reveal>

        <div style={tiersGridStyle}>
          {/* HEADLINE SPONSOR */}
          <Reveal delay={180}>
            <div style={{ ...tierCardBaseStyle, border: `3px solid ${RED}`, boxShadow: `0 24px 60px rgba(214,40,40,.18)` }}>
              <div style={{ position: "absolute", top: "-12px", right: "20px", background: RED, color: "#FFFFFF", padding: "6px 14px", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".75rem", letterSpacing: ".1em" }}>MOST IMPACT</div>
              <div style={{ ...tierIconWrapStyle, background: RED, color: "#FFFFFF" }}><Crown size={28} /></div>
              <p style={{ ...tierKickerStyle, color: RED }}>Tier 1</p>
              <h3 style={tierTitleStyle}>Headline Sponsor</h3>
              <p style={{ ...tierPriceStyle, color: RED }}>$500–1,000 / month</p>
              <p style={tierDescStyle}>Own a month. Your brand is the centerpiece of the entire prize package and every piece of content built around it.</p>
              <ul style={tierBenefitsListStyle}>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: RED, flexShrink: 0, marginTop: "2px" }} /><span>Headline prize card on duckwichita.com</span></li>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: RED, flexShrink: 0, marginTop: "2px" }} /><span>Exclusive month — no competing headline</span></li>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: RED, flexShrink: 0, marginTop: "2px" }} /><span>Dedicated launch post (IG + FB)</span></li>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: RED, flexShrink: 0, marginTop: "2px" }} /><span>Featured in winner announcement video</span></li>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: RED, flexShrink: 0, marginTop: "2px" }} /><span>Brand mention in every press hit that month</span></li>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: RED, flexShrink: 0, marginTop: "2px" }} /><span>Co-branded duck batch option</span></li>
              </ul>
              <button onClick={() => handleTierClick("Headline Sponsor ($500-1,000/mo)")} style={{ ...tierCtaStyle, background: RED, color: "#FFFFFF" }}>I&apos;m interested <ArrowUpRight size={18} /></button>
            </div>
          </Reveal>

          {/* FEATURED SPONSOR */}
          <Reveal delay={240}>
            <div style={{ ...tierCardBaseStyle, border: `3px solid ${ORANGE}`, boxShadow: `0 24px 60px rgba(255,107,53,.15)` }}>
              <div style={{ ...tierIconWrapStyle, background: ORANGE, color: "#FFFFFF" }}><Award size={28} /></div>
              <p style={{ ...tierKickerStyle, color: ORANGE }}>Tier 2</p>
              <h3 style={tierTitleStyle}>Featured Sponsor</h3>
              <p style={{ ...tierPriceStyle, color: ORANGE }}>$250–500 / month</p>
              <p style={tierDescStyle}>One of four supporting prize slots. Your brand shows up next to the headline, gets tagged in every winner post, and stays in rotation.</p>
              <ul style={tierBenefitsListStyle}>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} /><span>Featured prize card on duckwichita.com</span></li>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} /><span>Logo + link on the prize section</span></li>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} /><span>Tagged in every winner announcement</span></li>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} /><span>Sponsor highlight post (1x per month)</span></li>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} /><span>Press inclusion when applicable</span></li>
              </ul>
              <button onClick={() => handleTierClick("Featured Sponsor ($250-500/mo)")} style={{ ...tierCtaStyle, background: ORANGE, color: "#FFFFFF" }}>I&apos;m interested <ArrowUpRight size={18} /></button>
            </div>
          </Reveal>

          {/* SUPPORTING SPONSOR */}
          <Reveal delay={300}>
            <div style={{ ...tierCardBaseStyle, border: `3px solid ${COBALT}`, boxShadow: `0 24px 60px rgba(19,56,222,.15)` }}>
              <div style={{ ...tierIconWrapStyle, background: COBALT, color: "#FFFFFF" }}><Star size={28} /></div>
              <p style={{ ...tierKickerStyle, color: COBALT }}>Tier 3</p>
              <h3 style={tierTitleStyle}>Supporting Sponsor</h3>
              <p style={{ ...tierPriceStyle, color: COBALT }}>$100–250 / month</p>
              <p style={tierDescStyle}>The easiest way to get in the door. Logo on the sponsor wall, social tag every drawing, and full eligibility for tier upgrades later.</p>
              <ul style={tierBenefitsListStyle}>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: COBALT, flexShrink: 0, marginTop: "2px" }} /><span>Logo on the duckwichita.com sponsor wall</span></li>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: COBALT, flexShrink: 0, marginTop: "2px" }} /><span>Tag in winner announcement posts</span></li>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: COBALT, flexShrink: 0, marginTop: "2px" }} /><span>Eligible to provide secondary prizes</span></li>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: COBALT, flexShrink: 0, marginTop: "2px" }} /><span>First-look at tier upgrades</span></li>
              </ul>
              <button onClick={() => handleTierClick("Supporting Sponsor ($100-250/mo)")} style={{ ...tierCtaStyle, background: COBALT, color: "#FFFFFF" }}>I&apos;m interested <ArrowUpRight size={18} /></button>
            </div>
          </Reveal>

          {/* PRIZE SPONSOR (one-time) */}
          <Reveal delay={360}>
            <div style={{ ...tierCardBaseStyle, border: `3px solid ${INK}` }}>
              <div style={{ ...tierIconWrapStyle, background: INK, color: "#FFFFFF" }}><Trophy size={28} /></div>
              <p style={{ ...tierKickerStyle, color: INK }}>Tier 4</p>
              <h3 style={tierTitleStyle}>Prize Sponsor</h3>
              <p style={{ ...tierPriceStyle, color: INK }}>One-time, $100+ value</p>
              <p style={tierDescStyle}>Just want to donate a prize? Pizza, gift card, dinner, an experience — perfect for businesses dipping their toe in.</p>
              <ul style={tierBenefitsListStyle}>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: INK, flexShrink: 0, marginTop: "2px" }} /><span>Inclusion in that month&apos;s prize package</span></li>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: INK, flexShrink: 0, marginTop: "2px" }} /><span>Tag in announcement + winner post</span></li>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: INK, flexShrink: 0, marginTop: "2px" }} /><span>Logo featured on the prize card</span></li>
              </ul>
              <button onClick={() => handleTierClick("Prize Sponsor (one-time, $100+)")} style={{ ...tierCtaStyle, background: INK, color: "#FFFFFF" }}>I&apos;m interested <ArrowUpRight size={18} /></button>
            </div>
          </Reveal>

          {/* DUCK HOST */}
          <Reveal delay={420}>
            <div style={{ ...tierCardBaseStyle, border: `3px solid rgba(10,11,20,.15)` }}>
              <div style={{ ...tierIconWrapStyle, background: "rgba(10,11,20,.08)", color: INK }}><MapPin size={28} /></div>
              <p style={{ ...tierKickerStyle, color: "rgba(10,11,20,.55)" }}>Tier 5 · Free</p>
              <h3 style={tierTitleStyle}>Duck Host</h3>
              <p style={{ ...tierPriceStyle, color: INK }}>No cost</p>
              <p style={tierDescStyle}>Host a duck at your business. Customers find it, scan it, post it, and tag your location. Free brand exposure with zero spend.</p>
              <ul style={tierBenefitsListStyle}>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: INK, flexShrink: 0, marginTop: "2px" }} /><span>Duck placed at your location</span></li>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: INK, flexShrink: 0, marginTop: "2px" }} /><span>Location tagged in announcement post</span></li>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: INK, flexShrink: 0, marginTop: "2px" }} /><span>Foot traffic + IG tagging when found</span></li>
                <li style={tierBenefitItemStyle}><Check size={18} style={{ color: INK, flexShrink: 0, marginTop: "2px" }} /><span>Path to bigger sponsor tiers</span></li>
              </ul>
              <button onClick={() => handleTierClick("Duck Host (free)")} style={{ ...tierCtaStyle, background: "rgba(10,11,20,.08)", color: INK }}>I&apos;m interested <ArrowUpRight size={18} /></button>
            </div>
          </Reveal>

          {/* CUSTOM */}
          <Reveal delay={480}>
            <div style={{ ...tierCardBaseStyle, background: `linear-gradient(160deg, ${COBALT} 0%, ${INK} 100%)`, color: "#FFFFFF", border: "none" }}>
              <div style={{ ...tierIconWrapStyle, background: ORANGE, color: "#FFFFFF" }}><Flame size={28} /></div>
              <p style={{ ...tierKickerStyle, color: ORANGE }}>Custom · Big vision</p>
              <h3 style={{ ...tierTitleStyle, color: "#FFFFFF" }}>Let&apos;s Build Something</h3>
              <p style={{ ...tierPriceStyle, color: ORANGE }}>Custom pricing</p>
              <p style={{ ...tierDescStyle, color: "rgba(255,255,255,.78)" }}>Multi-month commitments, branded duck batches, full-month takeovers, regional expansion partnerships, or a vision we haven&apos;t thought of yet — let&apos;s talk.</p>
              <ul style={tierBenefitsListStyle}>
                <li style={{ ...tierBenefitItemStyle, color: "rgba(255,255,255,.85)" }}><Check size={18} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} /><span>Branded duck batch (your colors / logo)</span></li>
                <li style={{ ...tierBenefitItemStyle, color: "rgba(255,255,255,.85)" }}><Check size={18} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} /><span>Year-long brand alignment</span></li>
                <li style={{ ...tierBenefitItemStyle, color: "rgba(255,255,255,.85)" }}><Check size={18} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} /><span>First market in regional expansion</span></li>
                <li style={{ ...tierBenefitItemStyle, color: "rgba(255,255,255,.85)" }}><Check size={18} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} /><span>Custom press / content angles</span></li>
              </ul>
              <button onClick={() => handleTierClick("Custom / Big Vision")} style={{ ...tierCtaStyle, background: ORANGE, color: "#FFFFFF" }}>Let&apos;s talk <ArrowUpRight size={18} /></button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section style={formWrapStyle} id="inquiry">
        <svg className="sp-sparkle s3" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="#FFFFFF"/></svg>
        <svg className="sp-sparkle s4" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="#FFFFFF"/></svg>

        <div style={formInnerStyle}>
          <Reveal as="h2" style={formTitleStyle}>Let&apos;s do this.</Reveal>
          <Reveal as="p" delay={80} style={formSubStyle}>Drop your info below and I&apos;ll reach out within 24 hours to talk through your sponsorship. No pressure, no contracts on this form — just a real conversation.</Reveal>

          {submitted ? (
            <Reveal delay={140}>
              <div style={successWrapStyle}>
                <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🦆</div>
                <h3 style={successTitleStyle}>Got it. Welcome to the flock.</h3>
                <p style={successCopyStyle}>I just got your inquiry. I&apos;ll reach out within 24 hours to talk through the next steps. In the meantime, follow <strong>@gvonflue</strong> on Instagram to see DuckWichita in action.</p>
                <a href="https://instagram.com/gvonflue" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 26px", background: ORANGE, color: "#FFFFFF", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, textDecoration: "none" }}>Follow @gvonflue <ArrowUpRight size={18} /></a>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={140}>
              <div style={formCardStyle}>
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="botcheck" />

                  <label style={labelStyle} htmlFor="business_name">Business Name</label>
                  <input style={inputStyle} type="text" id="business_name" name="business_name" required />

                  <label style={labelStyle} htmlFor="your_name">Your Name</label>
                  <input style={inputStyle} type="text" id="your_name" name="your_name" required />

                  <label style={labelStyle} htmlFor="email">Email</label>
                  <input style={inputStyle} type="email" id="email" name="email" required />

                  <label style={labelStyle} htmlFor="phone">Phone Number</label>
                  <input style={inputStyle} type="tel" id="phone" name="phone" required />

                  <label style={labelStyle} htmlFor="tier">Sponsorship Tier You&apos;re Interested In</label>
                  <select style={inputStyle} id="tier" name="tier" required value={selectedTier} onChange={(e) => setSelectedTier(e.target.value)}>
                    <option value="" disabled>Pick the tier that fits</option>
                    <option>Headline Sponsor ($500-1,000/mo)</option>
                    <option>Featured Sponsor ($250-500/mo)</option>
                    <option>Supporting Sponsor ($100-250/mo)</option>
                    <option>Prize Sponsor (one-time, $100+)</option>
                    <option>Duck Host (free)</option>
                    <option>Custom / Big Vision</option>
                    <option>Not sure yet — let&apos;s talk</option>
                  </select>

                  <label style={labelStyle} htmlFor="budget">Budget Range (optional)</label>
                  <select style={inputStyle} id="budget" name="budget" defaultValue="">
                    <option value="">Skip if not sure</option>
                    <option>Under $100/mo</option>
                    <option>$100–250/mo</option>
                    <option>$250–500/mo</option>
                    <option>$500–1,000/mo</option>
                    <option>$1,000+/mo</option>
                    <option>One-time prize donation only</option>
                  </select>

                  <label style={labelStyle} htmlFor="message">Tell me about your business + what you&apos;re hoping for</label>
                  <textarea style={textareaStyle} id="message" name="message" required></textarea>

                  <button type="submit" style={submitBtnStyle} disabled={submitting}>{submitting ? "Sending..." : "Send Inquiry"}</button>
                </form>
              </div>
            </Reveal>
          )}

          <div style={directContactStyle}>
            <p style={{ margin: "16px 0 8px", fontSize: "1.05rem" }}>Or skip the form and reach out directly:</p>
            <p style={{ margin: "4px 0", fontSize: "1.05rem" }}><Mail size={16} style={{ display: "inline", marginRight: "6px", verticalAlign: "-2px" }} /><a href="mailto:gvonflue@gmail.com?subject=DuckWichita Sponsor Inquiry" style={directLinkStyle}>gvonflue@gmail.com</a></p>
            <p style={{ margin: "4px 0", fontSize: "1.05rem" }}><Phone size={16} style={{ display: "inline", marginRight: "6px", verticalAlign: "-2px" }} /><a href="tel:9013353905" style={directLinkStyle}>901-335-3905</a></p>
          </div>
        </div>
      </section>

      {/* WHY SPONSOR */}
      <section style={sectionStyle}>
        <Reveal><span style={sectionKickerStyle}>Why sponsor</span></Reveal>
        <Reveal as="h2" delay={60} style={sectionTitleStyle}>This isn&apos;t a billboard. <span style={orangeAccent}>It&apos;s better.</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>Traditional local advertising is interruption-based, broad, and forgettable. DuckWichita is the opposite — finders WANT to scan, share, and post. Your brand shows up in their feel-good moment, not their ad-blindness moment.</Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "48px" }}>
          <Reveal delay={180}>
            <div style={{ background: "#FFFFFF", border: `2px solid ${INK}`, borderRadius: "20px", padding: "32px" }}>
              <div style={{ display: "inline-flex", width: "48px", height: "48px", borderRadius: "12px", background: ORANGE, color: "#FFFFFF", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}><Heart size={22} /></div>
              <h3 style={{ fontFamily: "var(--disp)", fontSize: "1.3rem", margin: "0 0 12px", color: INK }}>Earned attention</h3>
              <p style={{ color: "rgba(10,11,20,.7)", lineHeight: 1.6, margin: 0 }}>Finders are excited when they scan. Your brand lands in a positive emotional moment, not a skip-the-ad moment.</p>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div style={{ background: "#FFFFFF", border: `2px solid ${INK}`, borderRadius: "20px", padding: "32px" }}>
              <div style={{ display: "inline-flex", width: "48px", height: "48px", borderRadius: "12px", background: ORANGE, color: "#FFFFFF", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}><Camera size={22} /></div>
              <h3 style={{ fontFamily: "var(--disp)", fontSize: "1.3rem", margin: "0 0 12px", color: INK }}>Built-in UGC</h3>
              <p style={{ color: "rgba(10,11,20,.7)", lineHeight: 1.6, margin: 0 }}>Every finder posts. Every winner posts. Every post tags active sponsors. Compounding social exposure for zero extra spend.</p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div style={{ background: "#FFFFFF", border: `2px solid ${INK}`, borderRadius: "20px", padding: "32px" }}>
              <div style={{ display: "inline-flex", width: "48px", height: "48px", borderRadius: "12px", background: ORANGE, color: "#FFFFFF", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}><TrendingUp size={22} /></div>
              <h3 style={{ fontFamily: "var(--disp)", fontSize: "1.3rem", margin: "0 0 12px", color: INK }}>Story you can tell</h3>
              <p style={{ color: "rgba(10,11,20,.7)", lineHeight: 1.6, margin: 0 }}>&quot;We sponsor DuckWichita&quot; is a more interesting brand story than &quot;we run Facebook ads.&quot; Customers remember the story.</p>
            </div>
          </Reveal>
          <Reveal delay={360}>
            <div style={{ background: "#FFFFFF", border: `2px solid ${INK}`, borderRadius: "20px", padding: "32px" }}>
              <div style={{ display: "inline-flex", width: "48px", height: "48px", borderRadius: "12px", background: ORANGE, color: "#FFFFFF", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}><Building2 size={22} /></div>
              <h3 style={{ fontFamily: "var(--disp)", fontSize: "1.3rem", margin: "0 0 12px", color: INK }}>Local-first</h3>
              <p style={{ color: "rgba(10,11,20,.7)", lineHeight: 1.6, margin: 0 }}>Every entry, every finder, every post is a real Wichita person. No bot traffic, no out-of-market waste — every impression is exactly the audience you want.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
