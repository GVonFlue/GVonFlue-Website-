"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Lockup from "@/components/Lockup";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, Instagram, Sparkles, Ticket, DollarSign, Calendar, MapPin, Flame, UtensilsCrossed, Shirt, ShieldCheck } from "lucide-react";

const FORM_KEY = "e87c5fc0-d3e8-47e8-a1ab-5be73241a042";
const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbxUouOJJvN_7pIAAfHX4DSdskQKNjYUebZ5bb1yH5Rxdsac_IWytyBB-d-vlcaFHXCJ/exec";

// Flying-duck pool. First 3 are well-spread so the "calm" state mirrors the home page.
const SKY_DUCKS = [
  { top: "16%", size: 34, dur: "8s",    delay: "0s",   dir: "r" },
  { top: "50%", size: 30, dur: "10s",   delay: "0.8s", dir: "l" },
  { top: "78%", size: 32, dur: "9s",    delay: "0.4s", dir: "r" },
  { top: "8%",  size: 22, dur: "11s",   delay: "1.4s", dir: "l" },
  { top: "24%", size: 40, dur: "7s",    delay: "2.6s", dir: "r" },
  { top: "32%", size: 26, dur: "11.5s", delay: "0.6s", dir: "l" },
  { top: "40%", size: 28, dur: "9.5s",  delay: "3.2s", dir: "r" },
  { top: "44%", size: 20, dur: "12s",   delay: "1.0s", dir: "l" },
  { top: "56%", size: 36, dur: "8.5s",  delay: "2.0s", dir: "r" },
  { top: "60%", size: 24, dur: "10.5s", delay: "4.0s", dir: "l" },
  { top: "64%", size: 30, dur: "7.5s",  delay: "0.9s", dir: "r" },
  { top: "68%", size: 22, dur: "11s",   delay: "2.8s", dir: "l" },
  { top: "72%", size: 34, dur: "8s",    delay: "1.8s", dir: "r" },
  { top: "84%", size: 26, dur: "10s",   delay: "5.0s", dir: "l" },
  { top: "88%", size: 38, dur: "7s",    delay: "3.6s", dir: "r" },
  { top: "92%", size: 20, dur: "12s",   delay: "4.6s", dir: "l" },
  { top: "12%", size: 32, dur: "8.5s",  delay: "5.4s", dir: "r" },
  { top: "20%", size: 24, dur: "11s",   delay: "1.2s", dir: "l" },
  { top: "28%", size: 30, dur: "9s",    delay: "4.2s", dir: "r" },
  { top: "36%", size: 22, dur: "10.5s", delay: "3.0s", dir: "l" },
  { top: "48%", size: 36, dur: "8s",    delay: "2.2s", dir: "r" },
  { top: "52%", size: 26, dur: "11s",   delay: "5.8s", dir: "l" },
];

export default function JoinTheFlock() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // Start with a full flock, then thin out to a calm 3 (home-page count).
  const [duckCount, setDuckCount] = useState(22);
  useEffect(() => {
    const steps = [
      { t: 5000, n: 13 },
      { t: 10000, n: 8 },
      { t: 16000, n: 5 },
      { t: 26000, n: 3 },
    ];
    const timers = steps.map((s) => setTimeout(() => setDuckCount(s.n), s.t));
    return () => timers.forEach(clearTimeout);
  }, []);

  // Capture which duck was scanned, from the QR's ?utm_content=duck-XXX param.
  // Falls back to "direct" for visitors who arrive without scanning a duck.
  const entryTypeRef = useRef("direct");
  useEffect(() => {
    const content = new URLSearchParams(window.location.search).get("utm_content");
    if (content) entryTypeRef.current = content;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    formData.append("access_key", FORM_KEY);
    formData.append("subject", "🦆 New DuckWichita Giveaway Entry");
    formData.append("from_name", "DuckWichita Site");
    formData.append("entry_type", entryTypeRef.current);

    // Log the entry to Google Sheets — fire-and-forget, independent of the email
    const form = e.target;
    try {
      const sheetParams = new URLSearchParams({
        first_name: form.first_name.value,
        email: form.email.value,
        phone: form.phone.value,
        status: form.status.value,
        instagram: form.instagram ? form.instagram.value : "",
        entry_type: entryTypeRef.current,
      });
      fetch(SHEET_ENDPOINT, { method: "POST", mode: "no-cors", body: sheetParams });
    } catch (err) {
      console.error("Sheet log failed", err);
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      if (res.ok) {
        router.push("/jointheflock/thanks");
      } else {
        setSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  const COBALT = "#1338DE";
  const GOLD = "#E7B53C";
  const RED = "#D62828";
  const INK = "#0A0B14";

  const pageStyle = { background: "linear-gradient(180deg, #FFF9EC 0%, #FFFFFF 35%)", minHeight: "100vh", color: "var(--ink)" };
  const topBarStyle = { padding: "28px 24px", display: "flex", justifyContent: "center" };
  const heroStyle = { padding: "60px 24px 100px", textAlign: "center", maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 };
  const heroKickerStyle = { display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 24px", background: "rgba(231,181,60,.18)", borderRadius: "999px", color: "var(--cobalt)", fontFamily: "var(--disp)", fontSize: ".95rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "16px", border: "1.5px solid rgba(231,181,60,.45)" };
  const rulesBtnStyle = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "rgba(231,181,60,.15)", border: "1.5px solid rgba(231,181,60,.5)", color: "var(--ink)", borderRadius: "999px", fontFamily: "var(--disp)", fontSize: ".88rem", fontWeight: 600, textDecoration: "none", marginBottom: "32px" };
  const heroTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(3.2rem, 8.5vw, 6.8rem)", lineHeight: 0.92, letterSpacing: "-.025em", margin: "0 0 28px", color: "var(--ink)", position: "relative", zIndex: 2 };
  const goldAccent = { color: "var(--gold)" };
  const heroSubStyle = { fontSize: "1.35rem", lineHeight: 1.5, color: "var(--muted)", maxWidth: "680px", margin: "0 auto 44px", position: "relative", zIndex: 2 };
  const heroCtasStyle = { display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginBottom: "60px", position: "relative", zIndex: 2 };
  const heroSecondaryLinkStyle = { display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--cobalt)", fontFamily: "var(--disp)", fontSize: "1.05rem", fontWeight: 600, textDecoration: "none", borderBottom: "2px solid rgba(19,56,222,.25)", paddingBottom: "2px" };
  const duckFrameStyle = { maxWidth: "440px", margin: "0 auto", aspectRatio: "1/1", borderRadius: "32px", background: "linear-gradient(135deg, #1338DE 0%, #0A0B14 100%)", overflow: "hidden", boxShadow: "0 30px 80px rgba(19,56,222,.35), 0 0 70px rgba(231,181,60,.25)", position: "relative", zIndex: 2 };
  const duckImgStyle = { width: "100%", height: "100%", objectFit: "cover", display: "block" };
  const sectionStyle = { padding: "100px 24px", maxWidth: "1180px", margin: "0 auto" };
  const ledeStyle = { maxWidth: "680px", fontSize: "1.15rem", color: "var(--muted)", lineHeight: 1.6 };
  const cardsGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "48px" };
  const cardStyle = { background: "#fff", border: "1px solid rgba(11,11,20,.08)", borderRadius: "20px", padding: "32px", boxShadow: "0 12px 40px rgba(11,30,138,.06)", height: "100%" };
  const cardNumStyle = { display: "inline-flex", width: "44px", height: "44px", borderRadius: "12px", background: "var(--gold)", color: "var(--ink)", alignItems: "center", justifyContent: "center", fontFamily: "var(--disp)", fontWeight: 700, fontSize: "1.2rem", marginBottom: "20px" };
  const cardTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.4rem", margin: "0 0 12px", color: "var(--ink)" };
  const cardBodyStyle = { color: "var(--muted)", margin: 0, lineHeight: 1.6 };
  const formCardStyle = { background: "#fff", borderRadius: "28px", padding: "40px", maxWidth: "560px", margin: "48px auto 0", boxShadow: "0 20px 60px rgba(11,30,138,.1)", border: "1px solid rgba(231,181,60,.3)" };
  const inputStyle = { width: "100%", padding: "16px 18px", border: "1.5px solid rgba(11,11,20,.12)", borderRadius: "12px", fontSize: "1rem", fontFamily: "var(--body)", marginBottom: "14px", background: "#fff", color: "var(--ink)", outline: "none", boxSizing: "border-box" };
  const labelStyle = { display: "block", fontSize: ".85rem", fontWeight: 600, color: "var(--ink)", marginBottom: "6px", fontFamily: "var(--disp)" };
  const submitBtnStyle = { width: "100%", padding: "18px", background: "var(--gold)", color: "var(--ink)", border: "none", borderRadius: "999px", fontFamily: "var(--disp)", fontSize: "1.05rem", fontWeight: 700, cursor: "pointer", marginTop: "12px" };
  const flockReassureStyle = { marginTop: "16px", textAlign: "center", fontSize: ".9rem", color: "var(--muted)", lineHeight: 1.5 };
  const darkSectionStyle = { background: "var(--ink)", color: "#fff", padding: "80px 32px", borderRadius: "32px", margin: "60px auto", maxWidth: "1180px", textAlign: "center" };
  const faqItemStyle = { padding: "24px 0", borderBottom: "1px solid rgba(11,11,20,.1)" };
  const flockBtnsStyle = { display: "flex", gap: "14px", marginTop: "32px", flexWrap: "wrap", justifyContent: "center" };
  const sponsorKickerStyle = { color: "var(--gold)", fontFamily: "var(--disp)", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", fontSize: ".85rem" };
  const sponsorTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2rem, 5vw, 3.4rem)", margin: "20px 0 24px", lineHeight: 1.05, color: "#fff" };
  const sponsorCopyStyle = { maxWidth: "640px", margin: "0 auto 32px", fontSize: "1.15rem", lineHeight: 1.6, color: "rgba(255,255,255,.75)" };
  const sigNameStyle = { fontFamily: "var(--disp)", fontWeight: 600, color: "var(--cobalt)", fontSize: "1.1rem", margin: 0 };
  const sigSubStyle = { color: "var(--muted)", margin: "4px 0 0", fontSize: ".95rem" };
  const faqQuestionStyle = { fontFamily: "var(--disp)", fontSize: "1.15rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 8px" };
  const faqAnswerStyle = { color: "var(--muted)", margin: 0, lineHeight: 1.6 };

  // Prize section styles
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
  const headlineLogoWrapStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#FFFFFF", borderRadius: "16px", padding: "14px 22px", marginBottom: "18px", boxShadow: "0 8px 24px rgba(0,0,0,.18)" };
  const headlineLogoStyle = { height: "108px", width: "auto", maxWidth: "440px", objectFit: "contain", display: "block" };
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

  // Bonus entry callout in Post Your Duck section
  const bonusBoxStyle = { background: "linear-gradient(135deg, var(--gold) 0%, #D9A030 100%)", color: INK, padding: "32px 28px", borderRadius: "24px", maxWidth: "640px", margin: "32px auto 0", textAlign: "center", boxShadow: "0 20px 50px rgba(231,181,60,.3)", border: `2px solid ${INK}` };
  const bonusKickerStyle = { display: "inline-block", padding: "6px 16px", background: INK, color: GOLD, borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".78rem", letterSpacing: ".15em", marginBottom: "14px" };
  const bonusTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.8rem", fontWeight: 800, color: INK, margin: "0 0 10px", lineHeight: 1.1 };
  const bonusBodyStyle = { color: "rgba(10,11,20,.78)", margin: "0", fontSize: "1rem", lineHeight: 1.55 };
  const bonusEmphasisStyle = { color: INK, fontWeight: 700 };

  const faqs = [
    { q: "Is this a real giveaway?", a: "100% real. One person from the flock wins a local prize every drawing. No tricks, no purchase, no kidding. Read the official rules for the full breakdown." },
    { q: "What if I don't win the first drawing?", a: "You're still in for the next drawing too. Each duck you scan keeps you in the next 2 drawings — we draw on the 1st and 15th of every month. Want to stay in past that? Find another duck and scan it. Best move: follow @gvonflue on Instagram so you'll see the second your name comes up." },
    { q: "How do I get bonus entries?", a: "Post a photo of you with your duck on Instagram or Facebook using #DuckWichita. Once we see the post, you get 4 extra entries on top of your original — 5 total. One bonus per person per entry. Make sure the duck is in the photo." },
    { q: "Do I need to buy or sell a home?", a: "Nope. You can be 'just here for the duck' on the form and still win. The real estate stuff is just what I do for a living." },
    { q: "Can I duck someone else?", a: "Absolutely. If you want to pass yours along, do it. The duck moves how it wants to move." },
    { q: "Can businesses participate?", a: "Yes — local businesses can sponsor a month, contribute a prize, or just get featured. Hit the sponsor button above." },
    { q: "Who created DuckWichita?", a: "A guy named Garrett. I'm a Realtor here in Wichita. I wanted to do something for the city that wasn't a billboard. This is that." },
  ];

  return (
    <main style={pageStyle}>
      <style>{`
        @keyframes pulse-big { 0% { box-shadow: 0 0 0 0 rgba(231,181,60,.7); } 70% { box-shadow: 0 0 0 32px rgba(231,181,60,0); } 100% { box-shadow: 0 0 0 0 rgba(231,181,60,0); } }
        @keyframes arrow-bob-left { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(16px); } }
        @keyframes arrow-bob-right { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-16px); } }
        @keyframes sparkle-float { 0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: .5; } 50% { transform: translateY(-18px) scale(1.2) rotate(20deg); opacity: 1; } }
        @keyframes duck-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        .prize-button { transition: transform .35s ease, box-shadow .35s ease; }
        .prize-button:hover { transform: translateY(-6px); box-shadow: 0 40px 100px rgba(231,181,60,.4), 0 0 0 1px rgba(231,181,60,.2), inset 0 1px 0 rgba(255,255,255,.9); }
        .prize-arrow-left { position: absolute; left: -10px; top: 50%; transform: translateY(-50%); animation: arrow-bob-left 1.8s ease-in-out infinite; z-index: 2; }
        .prize-arrow-right { position: absolute; right: -10px; top: 50%; transform: translateY(-50%); animation: arrow-bob-right 1.8s ease-in-out infinite; z-index: 2; }
        .duck-frame-wrap { animation: duck-float 5s ease-in-out infinite; }
        .hero-sparkle { position: absolute; z-index: 0; pointer-events: none; }
        .hero-sparkle.s1 { top: 12%; left: 8%; animation: sparkle-float 4s ease-in-out 0s infinite; }
        .hero-sparkle.s2 { top: 22%; right: 10%; animation: sparkle-float 4.5s ease-in-out .6s infinite; }
        .hero-sparkle.s3 { top: 55%; left: 4%; animation: sparkle-float 3.8s ease-in-out 1.2s infinite; }
        .hero-sparkle.s4 { top: 60%; right: 6%; animation: sparkle-float 4.2s ease-in-out 1.8s infinite; }
        .hero-sparkle.s5 { top: 78%; left: 14%; animation: sparkle-float 4s ease-in-out .4s infinite; }
        .hero-sparkle.s6 { top: 82%; right: 16%; animation: sparkle-float 4.6s ease-in-out 1s infinite; }
        @media (max-width: 900px) { .prize-arrow-left, .prize-arrow-right { display: none; } .hero-sparkle { display: none; } }

        /* Big "pop" Enter button */
        @keyframes enter-pop { 0% { transform: scale(.55); opacity: 0; } 55% { transform: scale(1.12); opacity: 1; } 75% { transform: scale(.97); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes enter-glow-pulse { 0%, 100% { box-shadow: 0 18px 55px rgba(231,181,60,.5), 0 0 0 0 rgba(231,181,60,.55); } 50% { box-shadow: 0 26px 80px rgba(231,181,60,.72), 0 0 0 26px rgba(231,181,60,0); } }
        .enter-pop-wrap { display: inline-block; animation: enter-pop .8s cubic-bezier(.34,1.56,.64,1) both; }
        .enter-pop-btn { display: inline-flex; align-items: center; gap: 14px; padding: 26px 60px; font-family: var(--disp); font-weight: 800; font-size: clamp(1.5rem, 4.5vw, 2.4rem); letter-spacing: -.01em; color: var(--ink); background: linear-gradient(135deg, #FFD75E 0%, #E7B53C 55%, #D9A030 100%); border: 3px solid #fff; border-radius: 999px; text-decoration: none; box-shadow: 0 18px 55px rgba(231,181,60,.5); animation: enter-glow-pulse 2.2s ease-in-out infinite; transition: transform .2s ease; cursor: pointer; }
        .enter-pop-btn:hover { transform: scale(1.05); }
        .enter-pop-btn svg { flex-shrink: 0; }
        @media (max-width: 600px) { .enter-pop-btn { padding: 22px 36px; gap: 10px; } }

        /* Flying-duck sky — full flock that simmers down over time */
        .duck-sky { position: fixed; inset: 0; pointer-events: none; z-index: 60; overflow: hidden; }
        .sky-duck { position: absolute; left: 0; will-change: transform; animation-timing-function: linear; animation-iteration-count: infinite; filter: drop-shadow(0 6px 10px rgba(10,11,20,.18)); }
        .sky-duck.r { animation-name: sky-cross-r; }
        .sky-duck.l { animation-name: sky-cross-l; }
        @keyframes sky-cross-r { 0% { transform: translate(-12vw,0) rotate(-8deg) scaleX(-1); opacity: 0; } 6% { opacity: 1; } 25% { transform: translate(20vw,-30px) rotate(9deg) scaleX(-1); } 50% { transform: translate(48vw,18px) rotate(-7deg) scaleX(-1); } 75% { transform: translate(76vw,-26px) rotate(9deg) scaleX(-1); } 94% { opacity: 1; } 100% { transform: translate(115vw,0) rotate(-8deg) scaleX(-1); opacity: 0; } }
        @keyframes sky-cross-l { 0% { transform: translate(112vw,0) rotate(8deg); opacity: 0; } 6% { opacity: 1; } 25% { transform: translate(78vw,-30px) rotate(-9deg); } 50% { transform: translate(48vw,18px) rotate(7deg); } 75% { transform: translate(18vw,-26px) rotate(-9deg); } 94% { opacity: 1; } 100% { transform: translate(-15vw,0) rotate(8deg); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .duck-sky { display: none; } .enter-pop-wrap, .enter-pop-btn { animation: none; } }
      `}</style>

      <div className="duck-sky" aria-hidden="true">
        {SKY_DUCKS.slice(0, duckCount).map((d, i) => (
          <span
            key={i}
            className={`sky-duck ${d.dir}`}
            style={{ top: d.top, fontSize: `${d.size}px`, animationDuration: d.dur, animationDelay: d.delay }}
          >
            🦆
          </span>
        ))}
      </div>

      <div style={topBarStyle}><Lockup /></div>

      <section style={heroStyle}>
        <svg className="hero-sparkle s1" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="var(--gold)"/></svg>
        <svg className="hero-sparkle s2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="var(--gold)"/></svg>
        <svg className="hero-sparkle s3" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="var(--cobalt)"/></svg>
        <svg className="hero-sparkle s4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="var(--gold)"/></svg>
        <svg className="hero-sparkle s5" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="var(--cobalt)"/></svg>
        <svg className="hero-sparkle s6" width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="var(--gold)"/></svg>

        <Reveal><span style={heroKickerStyle}><Sparkles size={16} /> Wichita, KS · The Flock</span></Reveal>
        <br/>
        <Reveal delay={40}><a href="/rules" style={rulesBtnStyle}><ShieldCheck size={14} /> Read the official giveaway rules <ArrowUpRight size={14} /></a></Reveal>
        <Reveal as="h1" delay={80} style={heroTitleStyle}>You&apos;ve Been <span style={goldAccent}>Ducked</span>, Wichita.</Reveal>
        <Reveal as="p" delay={140} style={heroSubStyle}>Somewhere out there, a tiny patriotic duck chose <strong style={{ color: "var(--ink)" }}>you</strong>. Now you&apos;re part of the flock — and there&apos;s a real prize with your name on it.</Reveal>
        <Reveal delay={200}>
          <div style={{ marginTop:
