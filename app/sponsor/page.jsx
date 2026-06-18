"use client";

import { useState } from "react";
import DuckNav from "@/components/DuckNav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, Crown, Star, Trophy, Heart, Camera, Building2, TrendingUp, MapPin, Mail, Phone, Check, Handshake, Megaphone, LayoutDashboard, UserPlus, PenTool, DollarSign, Lock, Rocket } from "lucide-react";

const FORM_KEY = "e87c5fc0-d3e8-47e8-a1ab-5be73241a042";

export default function SponsorInquiry() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTier, setSelectedTier] = useState("");

  const COBALT = "#1338DE";
  const ORANGE = "#FF6B35";
  const GOLD = "#E7B53C";
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

  const heroStyle = { padding: "60px 24px 50px", textAlign: "center", maxWidth: "1100px", margin: "0 auto", position: "relative" };
  const heroKickerStyle = { display: "inline-flex", alignItems: "center", gap: "10px", padding: "10px 22px", background: ORANGE, color: "#FFFFFF", borderRadius: "999px", fontFamily: "var(--disp)", fontSize: ".9rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "28px" };
  const heroTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.8rem, 7.5vw, 5.6rem)", lineHeight: 0.95, letterSpacing: "-.025em", margin: "0 0 24px", color: INK };
  const orangeAccent = { color: ORANGE };
  const heroSubStyle = { fontSize: "1.3rem", lineHeight: 1.55, color: "rgba(10,11,20,.72)", maxWidth: "720px", margin: "0 auto 36px" };

  const sectionStyle = { padding: "80px 24px", maxWidth: "1180px", margin: "0 auto" };
  const sectionKickerStyle = { display: "inline-block", fontFamily: "var(--disp)", fontSize: ".85rem", fontWeight: 800, color: ORANGE, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "16px" };
  const sectionTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", lineHeight: 1, letterSpacing: "-.02em", margin: "0 0 24px", color: INK };
  const ledeStyle = { fontSize: "1.2rem", color: "rgba(10,11,20,.72)", lineHeight: 1.6, maxWidth: "820px" };

  // SCARCITY STRIP
  const scarcityWrapStyle = { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", maxWidth: "880px", margin: "0 auto" };
  const scarcityPillStyle = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 18px", background: "rgba(10,11,20,.04)", border: "1.5px solid rgba(10,11,20,.1)", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".92rem", color: INK };
  const scarcityNumStyle = { color: ORANGE, fontWeight: 800 };

  // DUAL-DOLLAR SPLIT BAR
  const splitWrapStyle = { background: "rgba(10,11,20,.03)", border: "1px solid rgba(10,11,20,.08)", borderRadius: "14px", padding: "14px 16px", margin: "0 0 20px" };
  const splitTopLabelStyle = { fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(10,11,20,.5)", margin: "0 0 10px" };
  const splitBarStyle = { display: "flex", height: "12px", borderRadius: "999px", overflow: "hidden", marginBottom: "10px" };
  const splitLabelsStyle = { display: "flex", justifyContent: "space-between", gap: "8px", fontSize: ".82rem", fontWeight: 700, color: "rgba(10,11,20,.75)" };
  const splitDot = { display: "inline-block", width: "9px", height: "9px", borderRadius: "50%", marginRight: "6px", verticalAlign: "0px" };

  const splitBar = (prize, growth, prizeLabel, growthLabel) => (
    <div style={splitWrapStyle}>
      <p style={splitTopLabelStyle}>Where your dollar goes</p>
      <div style={splitBarStyle}>
        <div style={{ flex: prize, background: GOLD }} />
        <div style={{ flex: growth, background: COBALT }} />
      </div>
      <div style={splitLabelsStyle}>
        <span><span style={{ ...splitDot, background: GOLD }} />{prizeLabel}</span>
        <span><span style={{ ...splitDot, background: COBALT }} />{growthLabel}</span>
      </div>
    </div>
  );

  // TIER CARDS
  const tiersGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginTop: "20px" };
  const tierCardBaseStyle = { background: "#FFFFFF", borderRadius: "24px", padding: "36px 30px", position: "relative", display: "flex", flexDirection: "column", height: "100%", boxShadow: "0 12px 40px rgba(10,11,20,.08)" };
  const tierIconWrapStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "56px", height: "56px", borderRadius: "16px", marginBottom: "18px" };
  const tierKickerRowStyle = { display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "8px" };
  const tierKickerStyle = { fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".12em", fontFamily: "var(--disp)", fontWeight: 800, margin: 0 };
  const slotPillStyle = { fontSize: ".68rem", fontFamily: "var(--disp)", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "999px", background: "rgba(10,11,20,.06)", color: "rgba(10,11,20,.6)" };
  const tierTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.6rem", fontWeight: 800, color: INK, margin: "0 0 6px", lineHeight: 1.1 };
  const tierPriceStyle = { fontFamily: "var(--disp)", fontSize: "1.55rem", fontWeight: 800, margin: "0 0 4px", letterSpacing: "-.01em" };
  const tierPriceSubStyle = { fontSize: ".82rem", color: "rgba(10,11,20,.55)", fontWeight: 600, margin: "0 0 18px" };
  const tierDescStyle = { color: "rgba(10,11,20,.7)", fontSize: ".98rem", lineHeight: 1.55, margin: "0 0 18px" };
  const tierBenefitsListStyle = { listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1 };
  const tierBenefitItemStyle = { padding: "7px 0", color: "rgba(10,11,20,.78)", fontSize: ".94rem", lineHeight: 1.5, display: "flex", alignItems: "flex-start", gap: "10px" };
  const tierCtaStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px 24px", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1rem", border: "none", cursor: "pointer", textDecoration: "none", width: "100%" };
  const commitNoteStyle = { textAlign: "center", maxWidth: "720px", margin: "28px auto 0", fontSize: "1rem", color: "rgba(10,11,20,.6)", fontWeight: 600 };

  const benefit = (color, text) => (
    <li style={tierBenefitItemStyle}><Check size={18} style={{ color, flexShrink: 0, marginTop: "2px" }} /><span>{text}</span></li>
  );

  // FOUNDING SPONSOR BANNER (annual anchor — sits above the per-drawing field)
  const foundingWrapStyle = { color: "#FFFFFF", borderRadius: "32px", padding: "clamp(32px, 5vw, 56px)", margin: "0 auto 56px", maxWidth: "1180px", position: "relative", overflow: "hidden", boxShadow: "0 30px 80px rgba(10,11,20,.22)", border: `2px solid ${ORANGE}` };
  const foundingBadgeStyle = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 18px", background: ORANGE, color: "#FFFFFF", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".78rem", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "20px" };
  const foundingTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.1rem, 5vw, 3.4rem)", lineHeight: 1.04, letterSpacing: "-.02em", margin: "0 0 16px", color: "#FFFFFF" };
  const foundingSubStyle = { fontSize: "1.15rem", lineHeight: 1.6, color: "rgba(255,255,255,.82)", maxWidth: "660px", margin: "0 0 28px" };
  const foundingPriceRowStyle = { display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "32px" };
  const foundingPriceCardStyle = { background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.16)", borderRadius: "18px", padding: "22px 26px", flex: "1 1 240px" };
  const foundingPriceBigStyle = { fontFamily: "var(--disp)", fontSize: "2.2rem", fontWeight: 800, color: "#FFFFFF", margin: "0 0 4px", letterSpacing: "-.01em" };
  const foundingPriceUnitStyle = { fontSize: "1rem", fontWeight: 700, color: "rgba(255,255,255,.6)" };
  const foundingPriceSubStyle = { fontSize: ".9rem", color: "rgba(255,255,255,.7)", fontWeight: 600, margin: 0 };
  const foundingSaveTagStyle = { display: "inline-block", marginTop: "12px", padding: "4px 12px", background: ORANGE, color: "#FFFFFF", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".72rem", letterSpacing: ".06em" };
  const foundingBenefitsGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4px 28px", margin: "0 0 32px" };
  const foundingBenefitItemStyle = { padding: "8px 0", color: "rgba(255,255,255,.88)", fontSize: ".98rem", lineHeight: 1.5, display: "flex", alignItems: "flex-start", gap: "10px" };
  const foundingCtaStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "16px 32px", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1.05rem", border: "none", cursor: "pointer", background: ORANGE, color: "#FFFFFF" };
  const foundingBubbleStyle = { display: "flex", alignItems: "flex-start", gap: "14px", background: "rgba(255,107,53,.13)", border: `1.5px solid rgba(255,107,53,.55)`, borderRadius: "20px", padding: "20px 22px", margin: "4px 0 28px", cursor: "pointer" };
  const foundingBubbleIconStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "12px", background: ORANGE, color: "#FFFFFF", flexShrink: 0 };
  const foundingBubbleTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.12rem", fontWeight: 800, color: "#FFFFFF", margin: "0 0 4px" };
  const foundingBubbleBodyStyle = { fontSize: ".97rem", lineHeight: 1.55, color: "rgba(255,255,255,.86)", margin: 0 };

  const foundingBenefit = (text) => (
    <div style={foundingBenefitItemStyle}><Check size={18} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} /><span>{text}</span></div>
  );

  // GROWTH / TRANSPARENCY SECTION
  const growthWrapStyle = { color: "#fff", padding: "80px 40px", borderRadius: "32px", margin: "40px auto", maxWidth: "1180px", position: "relative", overflow: "hidden", boxShadow: "0 30px 80px rgba(19,56,222,.28)" };
  const growthHeadStyle = { textAlign: "center", maxWidth: "760px", margin: "0 auto 8px" };
  const growthTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.2rem, 5vw, 3.6rem)", margin: "0 0 20px", lineHeight: 1.1, color: "#fff" };
  const growthCopyStyle = { color: "rgba(255,255,255,.92)", fontSize: "1.18rem", lineHeight: 1.65, margin: "0 auto 16px" };
  const growthGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginTop: "44px" };
  const growthItemStyle = { background: "rgba(255,255,255,.09)", border: "1px solid rgba(255,255,255,.22)", borderRadius: "18px", padding: "26px 22px" };
  const growthItemIconStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "46px", height: "46px", borderRadius: "12px", background: ORANGE, color: "#fff", marginBottom: "14px" };
  const growthItemTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.12rem", fontWeight: 800, color: "#fff", margin: "0 0 8px" };
  const growthItemBodyStyle = { fontSize: ".95rem", color: "rgba(255,255,255,.82)", lineHeight: 1.5, margin: 0 };

  const statGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "44px" };
  const statCardStyle = { background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.26)", borderRadius: "20px", padding: "30px 24px", textAlign: "center" };
  const statValueStyle = { fontFamily: "var(--disp)", fontSize: "2.4rem", fontWeight: 800, color: GOLD, margin: "0 0 6px", letterSpacing: "-.01em" };
  const statLabelStyle = { fontSize: ".95rem", color: "rgba(255,255,255,.75)", lineHeight: 1.45, margin: 0 };
  const transparencyLineStyle = { textAlign: "center", maxWidth: "720px", margin: "44px auto 0", fontSize: "1.15rem", color: ORANGE, fontWeight: 700, lineHeight: 1.5 };
  const dashBtnStyle = { display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 30px", background: "#FFFFFF", color: INK, borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1.05rem", textDecoration: "none", cursor: "pointer" };

  // FORM
  const formWrapStyle = { background: ORANGE, color: "#FFFFFF", padding: "80px 24px", borderRadius: "32px", margin: "60px auto", maxWidth: "1180px" };
  const formInnerStyle = { maxWidth: "640px", margin: "0 auto" };
  const formTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.2rem, 5.5vw, 3.6rem)", lineHeight: 1.05, margin: "0 0 16px", color: "#FFFFFF", textAlign: "center" };
  const formSubStyle = { fontSize: "1.15rem", color: "rgba(255,255,255,.92)", textAlign: "center", maxWidth: "580px", margin: "0 auto 40px", lineHeight: 1.5 };
  const formCardStyle = { background: "#FFFFFF", borderRadius: "24px", padding: "40px", boxShadow: "0 20px 60px rgba(10,11,20,.15)" };
  const labelStyle = { display: "block", fontSize: ".85rem", fontWeight: 700, color: INK, marginBottom: "6px", fontFamily: "var(--disp)" };
  const inputStyle = { width: "100%", padding: "16px 18px", border: `1.5px solid rgba(10,11,20,.12)`, borderRadius: "12px", fontSize: "1rem", fontFamily: "var(--body)", marginBottom: "16px", background: "#fff", color: INK, outline: "none", boxSizing: "border-box" };
  const textareaStyle = { ...inputStyle, minHeight: "120px", resize: "vertical", fontFamily: "var(--body)" };
  const submitBtnStyle = { width: "100%", padding: "20px", background: INK, color: "#FFFFFF", border: "none", borderRadius: "999px", fontFamily: "var(--disp)", fontSize: "1.1rem", fontWeight: 800, cursor: "pointer", marginTop: "12px" };
  const successWrapStyle = { background: "#FFFFFF", borderRadius: "24px", padding: "60px 40px", textAlign: "center" };
  const successTitleStyle = { fontFamily: "var(--disp)", fontSize: "2.2rem", color: INK, margin: "0 0 16px" };
  const successCopyStyle = { color: "rgba(10,11,20,.7)", fontSize: "1.1rem", lineHeight: 1.55, margin: "0 0 24px" };
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
        @media (max-width: 700px) { .sp-sparkle { display: none; } }
        @keyframes cobalt-shimmer { 0% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } 100% { background-position: 0% 0%; } }
        .dollar-shimmer { background: linear-gradient(135deg, #060B3A 0%, #0E2299 22%, #1338DE 42%, #3E60FF 50%, #1338DE 58%, #0E2299 78%, #060B3A 100%); background-size: 280% 280%; animation: cobalt-shimmer 9s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .dollar-shimmer { animation: none; background-position: 30% 30%; } }
        @keyframes ink-shimmer { 0% { background-position: 100% 100%; } 50% { background-position: 0% 0%; } 100% { background-position: 100% 100%; } }
        .founding-shimmer { background: linear-gradient(315deg, #05060C 0%, #0A0B14 20%, #16131C 38%, #271A1E 50%, #16131C 62%, #0A0B14 80%, #05060C 100%); background-size: 280% 280%; animation: ink-shimmer 11s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .founding-shimmer { animation: none; background-position: 70% 70%; } }
        @keyframes bubble-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(255,107,53,0); } 50% { box-shadow: 0 0 0 7px rgba(255,107,53,.12); } }
        .founding-bubble { animation: bubble-pulse 3.2s ease-in-out infinite; }
        .founding-bubble:hover { background: rgba(255,107,53,.2); }
        @media (prefers-reduced-motion: reduce) { .founding-bubble { animation: none; box-shadow: 0 0 0 4px rgba(255,107,53,.08); } }
      `}</style>

      <DuckNav />

      {/* HERO */}
      <section style={heroStyle}>
        <svg className="sp-sparkle s1" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={ORANGE}/></svg>
        <svg className="sp-sparkle s2" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={COBALT}/></svg>

        <Reveal><span style={heroKickerStyle}><Handshake size={14} /> Sponsor DuckWichita</span></Reveal>
        <Reveal as="h1" delay={80} style={heroTitleStyle}>One sponsorship. <span style={orangeAccent}>Two jobs</span> for every dollar.</Reveal>
        <Reveal as="p" delay={140} style={heroSubStyle}>Every dollar you put in splits two ways: part becomes a real prize the whole city competes for with your name on it, and part funds the growth that puts your brand in front of more people every single month. No black box. Here is exactly where it all goes.</Reveal>
        <Reveal delay={200}>
          <div style={scarcityWrapStyle}>
            <span style={scarcityPillStyle}><Lock size={14} /> Only <span style={scarcityNumStyle}>5</span> businesses back each drawing</span>
            <span style={scarcityPillStyle}><span style={scarcityNumStyle}>1</span> Headline</span>
            <span style={scarcityPillStyle}><span style={scarcityNumStyle}>2</span> Featured</span>
            <span style={scarcityPillStyle}><span style={scarcityNumStyle}>1</span> Supporting</span>
            <span style={scarcityPillStyle}><span style={scarcityNumStyle}>1</span> Prize Pool Booster</span>
          </div>
        </Reveal>
      </section>
      

      {/* TIERS */}
      <section style={sectionStyle} id="tiers">
        <Reveal><span style={sectionKickerStyle}>Sponsorship tiers</span></Reveal>
        <Reveal as="h2" delay={60} style={sectionTitleStyle}>Five slots. <span style={orangeAccent}>That is the whole field.</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>When a drawing&apos;s slots are claimed, the next opening is two weeks out. Each paid slot is yours for a single drawing, or lock a full month and take both. Pick where your brand lands.</Reveal>

        <div style={tiersGridStyle}>
          {/* HEADLINE */}
          <Reveal delay={160}>
            <div style={{ ...tierCardBaseStyle, border: `3px solid ${RED}`, boxShadow: `0 24px 60px rgba(214,40,40,.18)` }}>
              <div style={{ position: "absolute", top: "-12px", right: "20px", background: RED, color: "#FFFFFF", padding: "6px 14px", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".72rem", letterSpacing: ".1em" }}>THE MARQUEE</div>
              <div style={{ ...tierIconWrapStyle, background: RED, color: "#FFFFFF" }}><Crown size={28} /></div>
              <div style={tierKickerRowStyle}><p style={{ ...tierKickerStyle, color: RED }}>Tier 1</p><span style={slotPillStyle}>1 slot / drawing</span></div>
              <h3 style={tierTitleStyle}>Headline Sponsor</h3>
              <p style={{ ...tierPriceStyle, color: RED }}>$1,000</p>
              <p style={tierPriceSubStyle}>per drawing · one drawing or full month</p>
              {splitBar(600, 400, "$600 to the prize", "$400 to growth")}
              <p style={tierDescStyle}>Own the drawing. Your brand is the face of the headline prize the whole city is chasing &mdash; and you are the only headline that cycle.</p>
              <ul style={tierBenefitsListStyle}>
                {benefit(RED, "Your logo on the headline prize card at duckwichita.com")}
                {benefit(RED, "A $600 marquee prize presented in your name")}
                {benefit(RED, "A premium spotlight video — professionally filmed and edited by Grand Frame Media ($300 value) — blasting your business and thanking you for backing the drawing. Yours to keep and reshare.")}
                {benefit(RED, "Founding Duck Host placement included — a branded duck display at your business with twice-weekly \u201Cgo scan\u201D spotlight posts")}
                {benefit(RED, "Dedicated headline launch post (Instagram + Facebook)")}
                {benefit(RED, "Named in the winner announcement the whole flock sees")}
                {benefit(RED, "Total exclusivity — only one headline, ever, per drawing")}
              </ul>
              <button onClick={() => handleTierClick("Headline Sponsor — $1,000/drawing")} style={{ ...tierCtaStyle, background: RED, color: "#FFFFFF" }}>Claim the headline <ArrowUpRight size={18} /></button>
            </div>
          </Reveal>

          {/* FEATURED */}
          <Reveal delay={220}>
            <div style={{ ...tierCardBaseStyle, border: `3px solid ${ORANGE}`, boxShadow: `0 24px 60px rgba(255,107,53,.16)` }}>
              <div style={{ ...tierIconWrapStyle, background: ORANGE, color: "#FFFFFF" }}><Star size={28} /></div>
              <div style={tierKickerRowStyle}><p style={{ ...tierKickerStyle, color: ORANGE }}>Tier 2</p><span style={slotPillStyle}>2 slots / drawing</span></div>
              <h3 style={tierTitleStyle}>Featured Sponsor</h3>
              <p style={{ ...tierPriceStyle, color: ORANGE }}>$500</p>
              <p style={tierPriceSubStyle}>per drawing · one drawing or full month</p>
              {splitBar(250, 250, "$250 to the prize", "$250 to growth")}
              <p style={tierDescStyle}>Premium placement at half the headline. Only two featured slots exist per drawing &mdash; when both are taken, that is it.</p>
              <ul style={tierBenefitsListStyle}>
                {benefit(ORANGE, "Featured logo on the prize lineup at duckwichita.com")}
                {benefit(ORANGE, "A $250 prize presented in your name")}
                {benefit(ORANGE, "Featured in the drawing's social posts (IG + FB)")}
                {benefit(ORANGE, "Named in the winner announcement")}
                {benefit(ORANGE, "Only two featured slots per drawing")}
              </ul>
              <button onClick={() => handleTierClick("Featured Sponsor — $500/drawing")} style={{ ...tierCtaStyle, background: ORANGE, color: "#FFFFFF" }}>Grab a featured slot <ArrowUpRight size={18} /></button>
            </div>
          </Reveal>

          {/* SUPPORTING */}
          <Reveal delay={280}>
            <div style={{ ...tierCardBaseStyle, border: `3px solid ${COBALT}`, boxShadow: `0 24px 60px rgba(19,56,222,.15)` }}>
              <div style={{ ...tierIconWrapStyle, background: COBALT, color: "#FFFFFF" }}><Trophy size={28} /></div>
              <div style={tierKickerRowStyle}><p style={{ ...tierKickerStyle, color: COBALT }}>Tier 3</p><span style={slotPillStyle}>1 slot / drawing</span></div>
              <h3 style={tierTitleStyle}>Supporting Sponsor</h3>
              <p style={{ ...tierPriceStyle, color: COBALT }}>$300</p>
              <p style={tierPriceSubStyle}>per drawing · one drawing or full month</p>
              {splitBar(150, 150, "$150 to the prize", "$150 to growth")}
              <p style={tierDescStyle}>A clean, affordable way to put your name on a real prize the city is competing for, with room to upgrade later.</p>
              <ul style={tierBenefitsListStyle}>
                {benefit(COBALT, "Logo on the sponsor lineup at duckwichita.com")}
                {benefit(COBALT, "A $150 prize presented in your name")}
                {benefit(COBALT, "Tagged in the drawing's social posts")}
                {benefit(COBALT, "First-look access to upgrade into bigger slots")}
              </ul>
              <button onClick={() => handleTierClick("Supporting Sponsor — $300/drawing")} style={{ ...tierCtaStyle, background: COBALT, color: "#FFFFFF" }}>Get in the lineup <ArrowUpRight size={18} /></button>
            </div>
          </Reveal>

          {/* PRIZE POOL BOOSTER */}
          <Reveal delay={340}>
            <div style={{ ...tierCardBaseStyle, border: `3px solid ${GOLD}`, boxShadow: `0 24px 60px rgba(231,181,60,.18)` }}>
              <div style={{ ...tierIconWrapStyle, background: GOLD, color: INK }}><DollarSign size={28} /></div>
              <div style={tierKickerRowStyle}><p style={{ ...tierKickerStyle, color: "#B98A1E" }}>Tier 4</p><span style={slotPillStyle}>1 slot / drawing</span></div>
              <h3 style={tierTitleStyle}>Prize Pool Booster</h3>
              <p style={{ ...tierPriceStyle, color: "#B98A1E" }}>$150</p>
              <p style={tierPriceSubStyle}>per drawing · one drawing or full month</p>
              {splitBar(100, 50, "$100 to the pool", "$50 to growth")}
              <p style={tierDescStyle}>The simplest way in. You add $100 cash straight to the drawing&apos;s pool &mdash; and get the spotlight for making the prize bigger.</p>
              <ul style={tierBenefitsListStyle}>
                {benefit("#B98A1E", "Live callout: \u201C[Your business] boosted this drawing's pool by $100\u201D")}
                {benefit("#B98A1E", "Your $100 goes straight to the winner's cash")}
                {benefit("#B98A1E", "Tagged in the drawing's social posts")}
                {benefit("#B98A1E", "Only one booster per drawing")}
              </ul>
              <button onClick={() => handleTierClick("Prize Pool Booster — $150/drawing")} style={{ ...tierCtaStyle, background: GOLD, color: INK }}>Boost the pool <ArrowUpRight size={18} /></button>
            </div>
          </Reveal>

          {/* DUCK HOST — FOUNDING */}
          <Reveal delay={400}>
            <div style={{ ...tierCardBaseStyle, border: `3px solid ${ORANGE}`, boxShadow: `0 24px 60px rgba(255,107,53,.16)` }}>
              <div style={{ position: "absolute", top: "-12px", right: "20px", background: ORANGE, color: "#FFFFFF", padding: "6px 14px", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".72rem", letterSpacing: ".1em" }}>FOUNDING · FREE</div>
              <div style={{ ...tierIconWrapStyle, background: ORANGE, color: "#FFFFFF" }}><MapPin size={28} /></div>
              <div style={tierKickerRowStyle}><p style={{ ...tierKickerStyle, color: ORANGE }}>Duck Host</p><span style={{ ...slotPillStyle, background: "rgba(255,107,53,.12)", color: ORANGE }}>Free for launch</span></div>
              <h3 style={tierTitleStyle}>Founding Duck Host</h3>
              <p style={{ ...tierPriceStyle, color: ORANGE }}>Free this month</p>
              <p style={tierPriceSubStyle}>Becomes a premium paid placement next month — founding hosts lock in first</p>
              <p style={tierDescStyle}>Host a branded DuckWichita display at your business and turn finders into foot traffic through your door. Free for our launch month &mdash; get in now and you&apos;re grandfathered in as a founding host before placement goes paid.</p>
              <ul style={tierBenefitsListStyle}>
                {benefit(ORANGE, "A premium DuckWichita display case lives at your business all month — branded, eye-catching, and nobody can pocket the duck")}
                {benefit(ORANGE, "About twice a week I post \u201Cthe duck is at [your business] today and tomorrow — go scan!\u201D driving people to your door")}
                {benefit(ORANGE, "Your business named and tagged in every one of those posts")}
                {benefit(ORANGE, "Your own tracked QR code — see exactly how many finders your spot drove")}
                {benefit(ORANGE, "Founding hosts lock in priority placement and a founding rate before paid pricing starts")}
              </ul>
              <button onClick={() => handleTierClick("Founding Duck Host — free for launch")} style={{ ...tierCtaStyle, background: ORANGE, color: "#FFFFFF" }}>Become a founding host <ArrowUpRight size={18} /></button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={460}>
          <p style={commitNoteStyle}>Every paid slot is available for a single drawing or a full month (both drawings) &mdash; whichever fits your budget. Not sure which tier? Reach out below and we will figure it out together.</p>
        </Reveal>

        <Reveal delay={500}>
          <p style={commitNoteStyle}>No storefront? No problem &mdash; for tiers that include a duck display, we&apos;ll find your duck a home (your office, a partner spot, even a Wind Surge game). Just mention it when you reach out.</p>
        </Reveal>
      </section>

       {/* FOUNDING SPONSOR — annual anchor, above the field */}
      <section style={{ ...sectionStyle, paddingBottom: "0" }} id="founding">
        <Reveal>
          <div className="founding-shimmer" style={foundingWrapStyle}>
            <span style={foundingBadgeStyle}><Rocket size={14} /> Founding Sponsor · Only 2 slots</span>
            <h2 style={foundingTitleStyle}>Two companies get DuckWichita off the ground. <span style={orangeAccent}>Their names are on all of it.</span></h2>
            <p style={foundingSubStyle}>This is the apex partnership, and it sits above the whole field. Two businesses underwrite the launch for a full year and become the names behind DuckWichita from day one &mdash; on every post, every drop, every drawing. There are only two founding slots, and once they&apos;re claimed, that is it.</p>

            <div style={foundingPriceRowStyle}>
              <div style={foundingPriceCardStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                  <img src="/images/DuckWichita Patriotic Duck Logo.png" alt="DuckWichita patriotic duck" style={{ width: "40px", height: "40px", objectFit: "contain", flexShrink: 0 }} />
                  <p style={{ ...foundingPriceBigStyle, margin: 0 }}>$1,776<span style={foundingPriceUnitStyle}>/mo</span></p>
                </div>
                <p style={foundingPriceSubStyle}>per slot &middot; 12-month commitment, billed monthly</p>
              </div>
              <div style={{ ...foundingPriceCardStyle, border: `1px solid ${ORANGE}` }}>
                <p style={foundingPriceBigStyle}>$18,000<span style={foundingPriceUnitStyle}>/yr</span></p>
                <p style={foundingPriceSubStyle}>per slot &middot; paid up front, one year locked in</p>
                <span style={foundingSaveTagStyle}>Save $3,312 vs. monthly</span>
              </div>
            </div>

            <div style={foundingBenefitsGridStyle}>
              {foundingBenefit("A Founding Sponsor of DuckWichita \u2014 a permanent founding title, only two slots exist, locked in for the launch year")}
              {foundingBenefit("Your logo on every DuckWichita post, all year \u2014 every drawing, every duck drop, every winner announcement")}
              {foundingBenefit("Your name locked into the DuckWichita site for the full 12 months")}
              {foundingBenefit("Your own landing page on duckwichita.com, designed by our in-house team \u2014 with clickable links placed across the site that drive traffic to it, plus a direct call-to-action for visitors to connect with you")}
              {foundingBenefit("One scroll-stopping branded video a month (12 a year), scripted and produced by Grand Frame Media \u2014 built to entertain, not advertise. Yours to keep and reshare. ($4,800 production value)")}
              {foundingBenefit("Featured alongside the headline across every drawing's social posts")}
              {foundingBenefit("Founding Duck Host placement included \u2014 a branded duck display with twice-weekly \u201Cgo scan\u201D spotlight posts")}
              {foundingBenefit("Everything the drawing sponsors get \u2014 at the all-year, every-post level \u2014 minus a single named prize (those belong to the rotating slots)")}
              {foundingBenefit("First right to renew as Founding Sponsor, before anyone else gets the chance")}
              {foundingBenefit("Part of your founding investment funds a dedicated DuckWichita assistant \u2014 leading sponsor care, social media, and duck placement \u2014 so the whole operation runs smoothly behind your name")}
            </div>

            <div className="founding-bubble" onClick={() => handleTierClick("Founding Sponsor — $1,776/mo or $18,000/yr")} style={foundingBubbleStyle}>
              <span style={foundingBubbleIconStyle}><Lock size={22} /></span>
              <div>
                <p style={foundingBubbleTitleStyle}>There&apos;s more &mdash; I&apos;ll share with interested parties.</p>
                <p style={foundingBubbleBodyStyle}>Serious founding partners get the full picture: To Include future plans and a behind the scenes look. If this is you, <span style={{ color: ORANGE, fontWeight: 800 }}>reach out and let&apos;s talk &rarr;</span></p>
              </div>
            </div>

            <button onClick={() => handleTierClick("Founding Sponsor — $1,776/mo or $18,000/yr")} style={foundingCtaStyle}>Claim a founding slot <ArrowUpRight size={18} /></button>
          </div>
        </Reveal>
      </section>

      {/* WHERE EVERY DOLLAR GOES */}
      <section className="dollar-shimmer" style={growthWrapStyle}>
        <div style={growthHeadStyle}>
          <Reveal><span style={{ ...sectionKickerStyle, color: ORANGE }}>Total transparency</span></Reveal>
          <Reveal as="h2" delay={80} style={growthTitleStyle}>Where every dollar <span style={orangeAccent}>actually goes.</span></Reveal>
          <Reveal as="p" delay={140} style={growthCopyStyle}>Half of your sponsorship becomes a real prize a real Wichitan wins &mdash; with your name on it. The other half gets reinvested into making your brand travel further every month. Here is that growth half, itemized.</Reveal>
        </div>

        <div style={growthGridStyle}>
          <Reveal delay={180}>
            <div style={growthItemStyle}>
              <div style={growthItemIconStyle}><Megaphone size={22} /></div>
              <h3 style={growthItemTitleStyle}>Paid ads + boosted posts</h3>
              <p style={growthItemBodyStyle}>Real ad spend behind the campaign and boosted social posts &mdash; more eyes on the prize you funded, and your name riding along.</p>
            </div>
          </Reveal>
          <Reveal delay={230}>
            <div style={growthItemStyle}>
              <div style={growthItemIconStyle}><MapPin size={22} /></div>
              <h3 style={growthItemTitleStyle}>More ducks, more reach</h3>
              <p style={growthItemBodyStyle}>More ducks, more tags, more drop locations across Wichita &mdash; a bigger hunt means a bigger audience finding your sponsorship.</p>
            </div>
          </Reveal>
          <Reveal delay={280}>
            <div style={growthItemStyle}>
              <div style={growthItemIconStyle}><UserPlus size={22} /></div>
              <h3 style={growthItemTitleStyle}>A dedicated team (as we grow)</h3>
              <p style={growthItemBodyStyle}>The plan: a full-time team member running duck drops, social, and sponsor care &mdash; so the whole machine runs harder for you. Targeted as we scale.</p>
            </div>
          </Reveal>
          <Reveal delay={330}>
            <div style={growthItemStyle}>
              <div style={growthItemIconStyle}><LayoutDashboard size={22} /></div>
              <h3 style={growthItemTitleStyle}>Your sponsor dashboard</h3>
              <p style={growthItemBodyStyle}>Coming soon: a live login where you watch everything your sponsorship is doing &mdash; posts, reach, and the on-the-ground promo we run for you, in one place.</p>
            </div>
          </Reveal>
          <Reveal delay={380}>
            <div style={growthItemStyle}>
              <div style={growthItemIconStyle}><PenTool size={22} /></div>
              <h3 style={growthItemTitleStyle}>Content that grows the audience</h3>
              <p style={growthItemBodyStyle}>Photos, video, and posts that grow the following your logo gets shown to &mdash; the bigger it gets, the more your sponsorship is worth.</p>
            </div>
          </Reveal>
        </div>

        <div style={statGridStyle}>
          <Reveal delay={420}>
            <div style={statCardStyle}>
              <p style={statValueStyle}>$1,350</p>
              <p style={statLabelStyle}>in prizes per fully-backed drawing &mdash; funded entirely by local businesses</p>
            </div>
          </Reveal>
          <Reveal delay={470}>
            <div style={statCardStyle}>
              <p style={statValueStyle}>$1,100</p>
              <p style={statLabelStyle}>reinvested into growth per drawing &mdash; building the audience your name reaches</p>
            </div>
          </Reveal>
          <Reveal delay={520}>
            <div style={statCardStyle}>
              <p style={statValueStyle}>5</p>
              <p style={statLabelStyle}>businesses per drawing. That is the entire field. Scarcity is real, not a sales tactic.</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={560}>
          <p style={transparencyLineStyle}>That is the whole model. The more this grows, the more your sponsorship is worth &mdash; which is exactly why I am showing you where every cent goes.</p>
        </Reveal>

        <Reveal delay={600}>
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <a href="/dashboard" target="_blank" rel="noopener noreferrer" style={dashBtnStyle}><LayoutDashboard size={20} /> See a sample sponsor dashboard <ArrowUpRight size={18} /></a>
          </div>
        </Reveal>
      </section>

      {/* WHY SPONSOR */}
      <section style={sectionStyle}>
        <Reveal><span style={sectionKickerStyle}>Why sponsor</span></Reveal>
        <Reveal as="h2" delay={60} style={sectionTitleStyle}>This is not a billboard. <span style={orangeAccent}>It is better.</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>A billboard takes your money and just sits there. A DuckWichita slot puts your money into a prize the whole city watches, and funds a machine that makes your name travel further every month. It is the rare ad spend that compounds.</Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "48px" }}>
          <Reveal delay={180}>
            <div style={{ background: "#FFFFFF", border: `2px solid ${INK}`, borderRadius: "20px", padding: "32px" }}>
              <div style={{ display: "inline-flex", width: "48px", height: "48px", borderRadius: "12px", background: ORANGE, color: "#FFFFFF", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}><Heart size={22} /></div>
              <h3 style={{ fontFamily: "var(--disp)", fontSize: "1.3rem", margin: "0 0 12px", color: INK }}>Earned attention</h3>
              <p style={{ color: "rgba(10,11,20,.7)", lineHeight: 1.6, margin: 0 }}>Finders are excited when they scan. Your brand lands in a positive moment, not a skip-the-ad moment.</p>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div style={{ background: "#FFFFFF", border: `2px solid ${INK}`, borderRadius: "20px", padding: "32px" }}>
              <div style={{ display: "inline-flex", width: "48px", height: "48px", borderRadius: "12px", background: ORANGE, color: "#FFFFFF", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}><Camera size={22} /></div>
              <h3 style={{ fontFamily: "var(--disp)", fontSize: "1.3rem", margin: "0 0 12px", color: INK }}>Built-in sharing</h3>
              <p style={{ color: "rgba(10,11,20,.7)", lineHeight: 1.6, margin: 0 }}>Every finder posts. Every winner posts. The drawing&apos;s sponsors ride along on all of it &mdash; compounding exposure for no extra spend.</p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div style={{ background: "#FFFFFF", border: `2px solid ${INK}`, borderRadius: "20px", padding: "32px" }}>
              <div style={{ display: "inline-flex", width: "48px", height: "48px", borderRadius: "12px", background: ORANGE, color: "#FFFFFF", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}><TrendingUp size={22} /></div>
              <h3 style={{ fontFamily: "var(--disp)", fontSize: "1.3rem", margin: "0 0 12px", color: INK }}>A story worth telling</h3>
              <p style={{ color: "rgba(10,11,20,.7)", lineHeight: 1.6, margin: 0 }}>&quot;We back DuckWichita&quot; is a better brand story than &quot;we run ads.&quot; Customers remember the story.</p>
            </div>
          </Reveal>
          <Reveal delay={360}>
            <div style={{ background: "#FFFFFF", border: `2px solid ${INK}`, borderRadius: "20px", padding: "32px" }}>
              <div style={{ display: "inline-flex", width: "48px", height: "48px", borderRadius: "12px", background: ORANGE, color: "#FFFFFF", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}><Building2 size={22} /></div>
              <h3 style={{ fontFamily: "var(--disp)", fontSize: "1.3rem", margin: "0 0 12px", color: INK }}>Pure local</h3>
              <p style={{ color: "rgba(10,11,20,.7)", lineHeight: 1.6, margin: 0 }}>Every entry, finder, and post is a real Wichita person. No bot traffic, no out-of-market waste &mdash; exactly the audience you want.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section style={formWrapStyle} id="inquiry">
        <svg className="sp-sparkle s3" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="#FFFFFF"/></svg>
        <svg className="sp-sparkle s4" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="#FFFFFF"/></svg>

        <div style={formInnerStyle}>
          <Reveal as="h2" style={formTitleStyle}>Claim your slot.</Reveal>
          <Reveal as="p" delay={80} style={formSubStyle}>Every drawing you sit out is a prize pool with someone else&apos;s logo on it, in front of a city that is only getting bigger. Drop your info and I will reach out within 24 hours &mdash; a real conversation, no contracts on this form.</Reveal>

          {submitted ? (
            <Reveal delay={140}>
              <div style={successWrapStyle}>
                <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🦆</div>
                <h3 style={successTitleStyle}>Got it. Let&apos;s talk.</h3>
                <p style={successCopyStyle}>I just got your inquiry and I&apos;ll reach out within 24 hours to walk through the slot and where every dollar goes. In the meantime, follow <strong>@gvonflue</strong> on Instagram to see DuckWichita in action.</p>
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

                  <label style={labelStyle} htmlFor="tier">Slot You&apos;re Interested In</label>
                  <select style={inputStyle} id="tier" name="tier" required value={selectedTier} onChange={(e) => setSelectedTier(e.target.value)}>
                    <option value="" disabled>Pick the slot that fits</option>
                    <option>Founding Sponsor — $1,776/mo or $18,000/yr</option>
                    <option>Headline Sponsor — $1,000/drawing</option>
                    <option>Featured Sponsor — $500/drawing</option>
                    <option>Supporting Sponsor — $300/drawing</option>
                    <option>Prize Pool Booster — $150/drawing</option>
                    <option>Founding Duck Host — free for launch</option>
                    <option>Not sure yet — let&apos;s talk</option>
                  </select>

                  <label style={labelStyle} htmlFor="commitment">Commitment</label>
                  <select style={inputStyle} id="commitment" name="commitment" defaultValue="">
                    <option value="" disabled>How often?</option>
                    <option>12-month Founding Sponsor commitment</option>
                    <option>One drawing</option>
                    <option>A full month (both drawings)</option>
                    <option>Multiple months</option>
                    <option>Not sure yet</option>
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

      <Footer />
    </main>
  );
}
