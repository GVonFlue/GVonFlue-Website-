"use client";

import { useState } from "react";
import DuckNav from "@/components/DuckNav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import {
  Package,
  MapPin,
  Video,
  Trophy,
  Megaphone,
  Star,
  Heart,
  Lock,
  ShieldCheck,
  Smile,
  Sparkles,
  ArrowUpRight,
  Instagram,
  Facebook,
  Send,
} from "lucide-react";

const FORM_KEY = "e87c5fc0-d3e8-47e8-a1ab-5be73241a042";
const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbxUouOJJvN_7pIAAfHX4DSdskQKNjYUebZ5bb1yH5Rxdsac_IWytyBB-d-vlcaFHXCJ/exec";

const ORANGE = "#FF6B35";
const COBALT = "#1338DE";
const INK = "#0A0B14";

export default function Ambassadors() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rulesError, setRulesError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Require a complete phone number (the clip workflow runs through text).
    const phoneDigits = form.phone.value.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      form.phone.setCustomValidity("Please enter a complete phone number with at least 10 digits.");
      form.phone.reportValidity();
      return;
    }
    form.phone.setCustomValidity("");

    // Require the rules agreement before anything goes out.
    if (!form.rules_agree.checked) {
      setRulesError(true);
      form.rules_agree.focus();
      return;
    }
    setRulesError(false);

    setSubmitting(true);
    const formData = new FormData(form);
    formData.append("access_key", FORM_KEY);
    formData.append("subject", "🦆 New DuckWichita Ambassador Application");
    formData.append("from_name", "DuckWichita Site");
    formData.append("lead_source", "Ambassador Application");

    // Mirror the duck registration flow: log to the same Google Sheet, fire and forget.
    try {
      const sheetParams = new URLSearchParams({
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        area: form.area.value,
        instagram: form.instagram ? form.instagram.value : "",
        why: form.why ? form.why.value : "",
        lead_source: "Ambassador Application",
      });
      fetch(SHEET_ENDPOINT, { method: "POST", mode: "no-cors", body: sheetParams });
    } catch (err) {
      console.error("Sheet log failed", err);
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      if (res.ok) {
        setSubmitted(true);
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  const pageStyle = { background: "linear-gradient(180deg, #FFF7EF 0%, #FFFFFF 38%)", minHeight: "100vh", color: "var(--ink)" };
  const sectionStyle = { padding: "92px 24px", maxWidth: "1180px", margin: "0 auto" };

  // Hero
  const heroStyle = { padding: "48px 24px 84px", textAlign: "center", maxWidth: "920px", margin: "0 auto", position: "relative", zIndex: 1 };
  const kickerStyle = { display: "inline-flex", alignItems: "center", gap: "10px", padding: "11px 22px", background: "rgba(255,107,53,.14)", borderRadius: "999px", color: COBALT, fontFamily: "var(--disp)", fontSize: ".9rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "24px", border: "1.5px solid rgba(255,107,53,.4)" };
  const duckFrameStyle = { width: "108px", height: "108px", margin: "0 auto 26px", borderRadius: "26px", background: "linear-gradient(135deg, #1338DE 0%, #0A0B14 100%)", display: "grid", placeItems: "center", boxShadow: "0 22px 50px rgba(19,56,222,.32), 0 0 50px rgba(255,107,53,.22)", position: "relative", zIndex: 2 };
  const duckImgStyle = { width: "74px", height: "74px", objectFit: "contain", display: "block" };
  const heroTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.9rem, 8vw, 5.6rem)", lineHeight: 0.95, letterSpacing: "-.025em", margin: "0 0 22px", color: "var(--ink)" };
  const accent = { color: ORANGE };
  const heroSubStyle = { fontSize: "1.25rem", lineHeight: 1.55, color: "var(--muted)", maxWidth: "640px", margin: "0 auto 36px" };
  const heroCtasStyle = { display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", alignItems: "center" };

  // Cards
  const ledeStyle = { maxWidth: "680px", fontSize: "1.18rem", color: "var(--muted)", lineHeight: 1.6, marginTop: "16px" };
  const cardsGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "20px", marginTop: "48px" };
  const cardStyle = { background: "#fff", border: "1px solid rgba(11,11,20,.08)", borderRadius: "22px", padding: "34px", boxShadow: "0 12px 40px rgba(11,30,138,.06)", height: "100%" };
  const cardIconStyle = { width: "54px", height: "54px", borderRadius: "15px", background: ORANGE, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" };
  const cardStepStyle = { display: "block", fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".8rem", letterSpacing: ".14em", textTransform: "uppercase", color: COBALT, marginBottom: "8px" };
  const cardTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.45rem", margin: "0 0 12px", color: "var(--ink)" };
  const cardBodyStyle = { color: "var(--muted)", margin: 0, lineHeight: 1.6 };

  // Perks (dark band)
  const darkSectionStyle = { background: "var(--ink)", color: "#fff", padding: "84px 32px", borderRadius: "32px", margin: "20px auto", maxWidth: "1180px" };
  const darkInnerStyle = { maxWidth: "1080px", margin: "0 auto" };
  const perksGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px", marginTop: "44px" };
  const perkCardStyle = { background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "20px", padding: "30px 26px", height: "100%" };
  const perkIconStyle = { width: "48px", height: "48px", borderRadius: "13px", background: "rgba(255,107,53,.16)", color: ORANGE, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" };
  const perkTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.25rem", margin: "0 0 10px", color: "#fff", lineHeight: 1.15 };
  const perkBodyStyle = { color: "rgba(255,255,255,.74)", margin: 0, lineHeight: 1.55, fontSize: ".98rem" };
  const darkKickerStyle = { display: "inline-block", fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".8rem", letterSpacing: ".18em", textTransform: "uppercase", color: ORANGE };
  const darkTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2rem, 5vw, 3.1rem)", margin: "14px 0 0", lineHeight: 1.05, color: "#fff", maxWidth: "18ch" };

  // Rules
  const ruleCardStyle = { display: "flex", gap: "18px", alignItems: "flex-start", background: "#fff", border: "1.5px solid rgba(255,107,53,.28)", borderRadius: "20px", padding: "28px", boxShadow: "0 12px 40px rgba(11,30,138,.05)", height: "100%" };
  const ruleIconStyle = { width: "46px", height: "46px", borderRadius: "13px", background: "rgba(255,107,53,.12)", color: ORANGE, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };
  const ruleTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.2rem", margin: "0 0 8px", color: "var(--ink)" };
  const ruleBodyStyle = { color: "var(--muted)", margin: 0, lineHeight: 1.55, fontSize: ".98rem" };

  // Form
  const formCardStyle = { background: "#fff", borderRadius: "28px", padding: "40px", maxWidth: "580px", margin: "44px auto 0", boxShadow: "0 20px 60px rgba(11,30,138,.1)", border: "1.5px solid rgba(255,107,53,.3)" };
  const labelStyle = { display: "block", fontSize: ".85rem", fontWeight: 600, color: "var(--ink)", marginBottom: "6px", fontFamily: "var(--disp)" };
  const optionalStyle = { fontWeight: 400, color: "var(--muted)" };

  // Success
  const successWrapStyle = { padding: "44px 24px 90px", textAlign: "center", maxWidth: "760px", margin: "0 auto" };
  const successDuckStyle = { width: "120px", height: "120px", margin: "0 auto 26px", borderRadius: "28px", background: "linear-gradient(135deg, #1338DE 0%, #0A0B14 100%)", display: "grid", placeItems: "center", boxShadow: "0 24px 60px rgba(19,56,222,.3), 0 0 60px rgba(255,107,53,.22)" };
  const successTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.6rem, 7vw, 4.6rem)", lineHeight: 0.96, letterSpacing: "-.02em", margin: "0 0 22px", color: "var(--ink)" };
  const successSubStyle = { fontSize: "1.22rem", lineHeight: 1.55, color: "var(--muted)", maxWidth: "600px", margin: "0 auto 44px" };
  const followCardStyle = { background: "linear-gradient(180deg, #FFFBF7 0%, #FFF1E8 100%)", border: "4px solid " + ORANGE, borderRadius: "30px", padding: "44px 32px", margin: "0 auto 40px", boxShadow: "0 24px 60px rgba(255,107,53,.18)", maxWidth: "620px" };
  const followKickerStyle = { fontFamily: "var(--disp)", fontSize: ".88rem", fontWeight: 700, color: COBALT, letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 14px" };
  const followTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(1.7rem, 4vw, 2.4rem)", margin: "0 0 14px", color: "var(--ink)", lineHeight: 1.12 };
  const followBodyStyle = { color: "var(--muted)", fontSize: "1.08rem", lineHeight: 1.55, maxWidth: "480px", margin: "0 auto 30px" };
  const followBtnsStyle = { display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" };
  const signOffStyle = { fontFamily: "var(--disp)", fontSize: "1.3rem", fontWeight: 700, color: "var(--ink)", marginTop: "8px" };

  const doSteps = [
    { icon: <Package size={26} />, step: "Step one", title: "Get your ducks", body: "We hand you a batch of around 10 to 15 QR ducks, each one tied to your name. Pick them up and you are ready to roll." },
    { icon: <MapPin size={26} />, step: "Step two", title: "Hide them", body: "Stash your ducks in fun, safe, public spots around your part of town. Somewhere a stranger will smile when they find one." },
    { icon: <Video size={26} />, step: "Step three", title: "Send a clip", body: "Film a quick 10 to 15 second vertical clip of each drop and text it to us right away. We post it to the story that day." },
  ];

  const perks = [
    { icon: <Trophy size={22} />, title: "Leaderboard and a real prize", body: "A spot on the monthly scan leaderboard. The top ambassador each month takes a real prize, usually a local gift card." },
    { icon: <Megaphone size={22} />, title: "Shoutouts on our story", body: "Your drops go straight to our story with your name on them. Real reach, no cost to you." },
    { icon: <Star size={22} />, title: "First dibs on new batches", body: "First pick on every new duck batch before anyone else gets one. We restock the reliable ambassadors first." },
    { icon: <Heart size={22} />, title: "Bragging rights", body: "You helped build the biggest duck hunt in ICT. That one is priceless." },
  ];

  const rules = [
    { icon: <Lock size={22} />, title: "Public spots only", body: "Public spots only. If it is private property, ask the owner first. Always." },
    { icon: <ShieldCheck size={22} />, title: "Keep it safe", body: "Keep it safe for whoever finds the duck and for the businesses around it. No spot that puts anyone in a weird position." },
    { icon: <Smile size={22} />, title: "Keep it wholesome", body: "Keep it wholesome and on brand. We are here to make Wichita smile, nothing else." },
  ];

  if (submitted) {
    return (
      <main style={pageStyle}>
        <DuckNav />
        <section style={successWrapStyle}>
          <Reveal>
            <div style={successDuckStyle}>
              <img src="/logos/soloduck.png" alt="DuckWichita" style={{ width: "82px", height: "82px", objectFit: "contain" }} />
            </div>
          </Reveal>
          <Reveal as="span" delay={60} style={kickerStyle}><Sparkles size={16} /> Application in</Reveal>
          <Reveal as="h1" delay={120} style={successTitleStyle}>You are in. <span style={accent}>Watch your texts.</span></Reveal>
          <Reveal as="p" delay={180} style={successSubStyle}>Your ambassador application is locked in. We will text you at the number you gave to set up your first batch of ducks, usually within a day or two.</Reveal>

          <Reveal delay={240}>
            <div style={followCardStyle}>
              <p style={followKickerStyle}>While you wait</p>
              <h2 style={followTitleStyle}>Follow along so you catch your <span style={accent}>drops.</span></h2>
              <p style={followBodyStyle}>We post every drop to the story and call out who is topping the leaderboard. Follow so you see your ducks go live the same day.</p>
              <div style={followBtnsStyle}>
                <a href="https://instagram.com/gvonflue" target="_blank" rel="noopener noreferrer" className="amb-btn amb-btn-orange amb-btn-lg"><Instagram size={20} /> Follow on Instagram</a>
                <a href="https://www.facebook.com/garrettvonflue/" target="_blank" rel="noopener noreferrer" className="amb-btn amb-btn-ghost amb-btn-lg"><Facebook size={20} /> Follow on Facebook</a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <p style={signOffStyle}>Love you, Wichita 🦆✊</p>
          </Reveal>
        </section>
        <Footer />

        <style>{`
          .amb-btn { display:inline-flex; align-items:center; gap:.5rem; font-family:var(--disp); font-weight:800; border-radius:999px; border:none; cursor:pointer; transition:.25s ease; text-decoration:none; line-height:1; white-space:nowrap; }
          .amb-btn-lg { padding:1.05rem 1.7rem; font-size:1.05rem; }
          .amb-btn-orange { background:${ORANGE}; color:#fff; box-shadow:0 8px 24px rgba(255,107,53,.32); }
          .amb-btn-orange:hover { transform:translateY(-2px); box-shadow:0 14px 34px rgba(255,107,53,.46); }
          .amb-btn-ghost { background:transparent; color:var(--ink); border:1.5px solid rgba(10,11,20,.22); }
          .amb-btn-ghost:hover { border-color:${COBALT}; color:${COBALT}; }
          .amb-btn:focus-visible { outline:3px solid rgba(19,56,222,.5); outline-offset:3px; }
        `}</style>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <DuckNav />

      {/* HERO */}
      <section style={heroStyle}>
        <div className="amb-sky" aria-hidden="true">
          <img src="/logos/soloduck.png" alt="" className="amb-sky-duck d1" />
          <img src="/logos/soloduck.png" alt="" className="amb-sky-duck d2" />
          <img src="/logos/soloduck.png" alt="" className="amb-sky-duck d3" />
        </div>
        <Reveal>
          <div style={duckFrameStyle}>
            <img src="/logos/soloduck.png" alt="DuckWichita" style={duckImgStyle} />
          </div>
        </Reveal>
        <Reveal as="span" delay={60} style={kickerStyle}><Sparkles size={16} /> Ambassador program</Reveal>
        <Reveal as="h1" delay={120} style={heroTitleStyle}>Run your own corner of the <span style={accent}>duck hunt.</span></Reveal>
        <Reveal as="p" delay={180} style={heroSubStyle}>You get your own batch of QR ducks, hide them around your part of town, and send us a quick clip of each drop. We post it. You climb the leaderboard. The flock grows.</Reveal>
        <Reveal delay={240}>
          <div style={heroCtasStyle}>
            <a href="#apply" className="amb-btn amb-btn-orange amb-btn-lg">Apply to be an ambassador <ArrowUpRight size={20} /></a>
            <a href="#rules" className="amb-link">Read the 3 rules</a>
          </div>
        </Reveal>
      </section>

      {/* WHAT IT IS */}
      <section style={sectionStyle} id="what">
        <Reveal as="span" className="section-kicker">01 · What an ambassador is</Reveal>
        <Reveal as="h2" delay={60} className="section-title">The people who actually <span style={accent}>spread the ducks.</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>Every ambassador gets a batch of QR ducks with your name tied to every duck ID, so every scan in your zone counts toward you. You pick the spots. You make the drop. We hand out around 10 to 15 ducks to start and restock the ones that keep getting found first.</Reveal>

        <div style={cardsGridStyle}>
          {doSteps.map((s, i) => (
            <Reveal key={s.title} delay={180 + i * 60}>
              <div style={cardStyle}>
                <div style={cardIconStyle}>{s.icon}</div>
                <span style={cardStepStyle}>{s.step}</span>
                <h3 style={cardTitleStyle}>{s.title}</h3>
                <p style={cardBodyStyle}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section style={darkSectionStyle}>
        <div style={darkInnerStyle}>
          <Reveal as="span" style={darkKickerStyle}>02 · What you get</Reveal>
          <Reveal as="h2" delay={60} style={darkTitleStyle}>Real perks for <span style={accent}>real work.</span></Reveal>
          <div style={perksGridStyle}>
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={120 + i * 60}>
                <div style={perkCardStyle}>
                  <div style={perkIconStyle}>{p.icon}</div>
                  <h3 style={perkTitleStyle}>{p.title}</h3>
                  <p style={perkBodyStyle}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* THE RULES */}
      <section style={sectionStyle} id="rules">
        <Reveal as="span" className="section-kicker">03 · The 3 rules</Reveal>
        <Reveal as="h2" delay={60} className="section-title">Three things you <span style={accent}>agree to.</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>Short list. Easy to follow. It keeps the whole thing fun and keeps Wichita on our side.</Reveal>

        <div style={cardsGridStyle}>
          {rules.map((r, i) => (
            <Reveal key={r.title} delay={180 + i * 60}>
              <div style={ruleCardStyle}>
                <div style={ruleIconStyle}>{r.icon}</div>
                <div>
                  <h3 style={ruleTitleStyle}>{r.title}</h3>
                  <p style={ruleBodyStyle}>{r.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* APPLY */}
      <section style={sectionStyle} id="apply">
        <Reveal as="span" className="section-kicker">04 · Apply</Reveal>
        <Reveal as="h2" delay={60} className="section-title">Ready to spread some <span style={accent}>ducks?</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>Drop your info below. If it is a fit, we will text you to set up your first batch. The clip workflow runs through text, so a good number matters.</Reveal>

        <div style={formCardStyle}>
          <form onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="botcheck" tabIndex={-1} autoComplete="off" />

            <label style={labelStyle} htmlFor="name">Name</label>
            <input className="amb-field" type="text" id="name" name="name" autoComplete="name" required />

            <label style={labelStyle} htmlFor="email">Email</label>
            <input className="amb-field" type="email" id="email" name="email" autoComplete="email" required />

            <label style={labelStyle} htmlFor="phone">Phone</label>
            <input className="amb-field" type="tel" id="phone" name="phone" inputMode="tel" autoComplete="tel" placeholder="(316) 555 1234" required onInput={(e) => e.target.setCustomValidity("")} />

            <label style={labelStyle} htmlFor="area">Part of town you can cover <span style={optionalStyle}>(area or zip)</span></label>
            <input className="amb-field" type="text" id="area" name="area" placeholder="Delano, Riverside, 67203, the east side..." required />

            <label style={labelStyle} htmlFor="instagram">Instagram handle <span style={optionalStyle}>(optional, for shoutouts)</span></label>
            <input className="amb-field" type="text" id="instagram" name="instagram" placeholder="@yourhandle" />

            <label style={labelStyle} htmlFor="why">Why do you want in? <span style={optionalStyle}>(optional)</span></label>
            <textarea className="amb-field amb-textarea" id="why" name="why" rows={3} placeholder="Tell us in a sentence or two." />

            <label className={`amb-check ${rulesError ? "amb-check-error" : ""}`} htmlFor="rules_agree">
              <input
                type="checkbox"
                id="rules_agree"
                name="rules_agree"
                value="Agreed to the 3 ambassador rules"
                required
                onChange={() => setRulesError(false)}
              />
              <span>I agree to the 3 rules: public spots only and ask first on private property, keep it safe for finders and businesses, and keep it wholesome and on brand.</span>
            </label>
            {rulesError && <p className="amb-error-text">Please agree to the 3 rules so we can hand off your ducks.</p>}

            <button type="submit" className="amb-submit" disabled={submitting}>
              {submitting ? "Sending..." : <>Apply to be an ambassador <Send size={18} /></>}
            </button>

            <p className="amb-reassure">We will text you to hand off your first batch. No spam, just ducks.</p>
          </form>
        </div>
      </section>

      <Footer />

      <style>{`
        .amb-link { display:inline-flex; align-items:center; gap:6px; color:${COBALT}; font-family:var(--disp); font-size:1.02rem; font-weight:600; text-decoration:none; border-bottom:2px solid rgba(19,56,222,.25); padding-bottom:2px; }
        .amb-link:hover { border-bottom-color:${COBALT}; }
        .amb-link:focus-visible { outline:3px solid rgba(19,56,222,.5); outline-offset:3px; border-radius:4px; }

        .amb-btn { display:inline-flex; align-items:center; gap:.5rem; font-family:var(--disp); font-weight:800; border-radius:999px; border:none; cursor:pointer; transition:.25s ease; text-decoration:none; line-height:1; white-space:nowrap; }
        .amb-btn-lg { padding:1.05rem 1.7rem; font-size:1.05rem; }
        .amb-btn-orange { background:${ORANGE}; color:#fff; box-shadow:0 8px 24px rgba(255,107,53,.32); }
        .amb-btn-orange:hover { transform:translateY(-2px); box-shadow:0 14px 34px rgba(255,107,53,.46); }
        .amb-btn-ghost { background:transparent; color:var(--ink); border:1.5px solid rgba(10,11,20,.22); }
        .amb-btn-ghost:hover { border-color:${COBALT}; color:${COBALT}; }
        .amb-btn:focus-visible { outline:3px solid rgba(19,56,222,.5); outline-offset:3px; }

        .amb-field { width:100%; padding:15px 17px; border:1.5px solid rgba(11,11,20,.14); border-radius:12px; font-size:1rem; font-family:var(--body); margin-bottom:16px; background:#fff; color:var(--ink); box-sizing:border-box; transition:border-color .2s, box-shadow .2s; }
        .amb-field::placeholder { color:rgba(91,97,120,.7); }
        .amb-field:hover { border-color:rgba(11,11,20,.26); }
        .amb-field:focus-visible { outline:3px solid rgba(19,56,222,.45); outline-offset:2px; border-color:${COBALT}; box-shadow:0 0 0 4px rgba(19,56,222,.1); }
        .amb-textarea { resize:vertical; min-height:90px; line-height:1.5; }

        .amb-check { display:flex; align-items:flex-start; gap:12px; margin:6px 0 4px; padding:16px; border:1.5px solid rgba(11,11,20,.12); border-radius:14px; background:#FCFCFE; cursor:pointer; color:var(--muted); font-size:.95rem; line-height:1.5; }
        .amb-check input { width:22px; height:22px; flex-shrink:0; margin-top:1px; accent-color:${ORANGE}; cursor:pointer; }
        .amb-check:hover { border-color:rgba(255,107,53,.4); }
        .amb-check:focus-within { border-color:${ORANGE}; box-shadow:0 0 0 4px rgba(255,107,53,.14); }
        .amb-check input:focus-visible { outline:3px solid rgba(19,56,222,.5); outline-offset:2px; }
        .amb-check-error { border-color:#D62828; background:rgba(214,40,40,.05); }
        .amb-error-text { color:#D62828; font-size:.9rem; margin:10px 2px 0; font-weight:600; }

        .amb-submit { width:100%; padding:18px; background:${ORANGE}; color:#fff; border:none; border-radius:999px; font-family:var(--disp); font-size:1.08rem; font-weight:800; cursor:pointer; margin-top:18px; display:inline-flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 10px 28px rgba(255,107,53,.3); transition:.25s ease; }
        .amb-submit:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 16px 38px rgba(255,107,53,.44); }
        .amb-submit:focus-visible { outline:3px solid rgba(19,56,222,.55); outline-offset:3px; }
        .amb-submit:disabled { opacity:.7; cursor:default; }
        .amb-reassure { margin-top:16px; text-align:center; font-size:.9rem; color:var(--muted); line-height:1.5; }

        .amb-sky { position:absolute; inset:0; z-index:0; pointer-events:none; overflow:hidden; }
        .amb-sky-duck { position:absolute; width:34px; height:34px; object-fit:contain; opacity:.5; animation:amb-float 7s ease-in-out infinite; }
        .amb-sky-duck.d1 { top:12%; left:8%; width:30px; animation-delay:0s; }
        .amb-sky-duck.d2 { top:20%; right:10%; width:40px; animation-delay:1.2s; }
        .amb-sky-duck.d3 { top:62%; left:14%; width:26px; animation-delay:2.4s; }
        @keyframes amb-float { 0%,100% { transform:translateY(0) rotate(-4deg); } 50% { transform:translateY(-16px) rotate(4deg); } }

        @media (max-width:860px) {
          .amb-sky-duck { display:none; }
        }
        @media (max-width:560px) {
          .amb-btn-lg { width:100%; justify-content:center; }
        }
        @media (prefers-reduced-motion:reduce) {
          .amb-sky-duck { animation:none; }
        }
      `}</style>
    </main>
  );
}
