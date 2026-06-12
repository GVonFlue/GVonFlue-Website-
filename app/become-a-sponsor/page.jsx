"use client";

import { useState } from "react";
import Lockup from "@/components/Lockup";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Handshake, Check, ArrowUpRight, ShieldCheck, Lock, Crown, Star, Trophy, DollarSign, CreditCard } from "lucide-react";

const FORM_KEY = "e87c5fc0-d3e8-47e8-a1ab-5be73241a042";

// ─────────────────────────────────────────────────────────────
// PAYMENT LINKS — paste your hosted checkout URLs here (Stripe Payment
// Links recommended; Square / PayPal work too). Leave blank and the Pay
// button safely falls back to emailing you until the link is set.
// ─────────────────────────────────────────────────────────────
const PAYMENT_LINKS = {
  headline: "",
  featured: "",
  supporting: "",
  booster: "",
};

export default function BecomeSponsor() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    formData.append("subject", "🟢 NEW DuckWichita Sponsor Signup");
    formData.append("from_name", "DuckWichita Signup Page");

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      if (res.ok) {
        setSubmitted(true);
        const pay = document.getElementById("payment");
        if (pay) pay.scrollIntoView({ behavior: "smooth" });
      } else {
        setSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  const payHref = (key, label) => {
    const link = PAYMENT_LINKS[key];
    return link && link.startsWith("http")
      ? link
      : `mailto:gvonflue@gmail.com?subject=${encodeURIComponent("DuckWichita payment — " + label)}`;
  };
  const payIsLive = (key) => PAYMENT_LINKS[key] && PAYMENT_LINKS[key].startsWith("http");

  const pageStyle = { background: "#FFFFFF", minHeight: "100vh", color: INK };
  const topBarStyle = { padding: "28px 24px", display: "flex", justifyContent: "center" };

  const heroStyle = { padding: "50px 24px 30px", textAlign: "center", maxWidth: "780px", margin: "0 auto" };
  const heroKickerStyle = { display: "inline-flex", alignItems: "center", gap: "10px", padding: "10px 22px", background: ORANGE, color: "#FFFFFF", borderRadius: "999px", fontFamily: "var(--disp)", fontSize: ".9rem", fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "24px" };
  const heroTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.4rem, 6vw, 4.2rem)", lineHeight: 0.98, letterSpacing: "-.025em", margin: "0 0 18px", color: INK };
  const heroSubStyle = { fontSize: "1.2rem", lineHeight: 1.55, color: "rgba(10,11,20,.72)", margin: "0 auto 22px" };
  const trustRowStyle = { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" };
  const trustPillStyle = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", background: "rgba(10,11,20,.04)", border: "1px solid rgba(10,11,20,.1)", borderRadius: "999px", fontSize: ".85rem", fontWeight: 600, color: "rgba(10,11,20,.7)" };

  const wrapStyle = { maxWidth: "720px", margin: "0 auto", padding: "20px 24px 60px" };
  const stepLabelStyle = { display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".82rem", letterSpacing: ".12em", textTransform: "uppercase", color: ORANGE, marginBottom: "14px" };
  const stepNumStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "26px", height: "26px", borderRadius: "50%", background: ORANGE, color: "#fff", fontSize: ".9rem" };
  const sectionTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.8rem", fontWeight: 800, margin: "0 0 8px", color: INK };
  const sectionSubStyle = { color: "rgba(10,11,20,.65)", fontSize: "1rem", lineHeight: 1.5, margin: "0 0 24px" };

  const cardStyle = { background: "#FFFFFF", borderRadius: "24px", padding: "36px", boxShadow: "0 12px 40px rgba(10,11,20,.08)", border: "1px solid rgba(10,11,20,.06)" };
  const labelStyle = { display: "block", fontSize: ".85rem", fontWeight: 700, color: INK, marginBottom: "6px", fontFamily: "var(--disp)" };
  const inputStyle = { width: "100%", padding: "15px 16px", border: "1.5px solid rgba(10,11,20,.12)", borderRadius: "12px", fontSize: "1rem", fontFamily: "var(--body)", marginBottom: "16px", background: "#fff", color: INK, outline: "none", boxSizing: "border-box" };
  const textareaStyle = { ...inputStyle, minHeight: "90px", resize: "vertical" };
  const rowStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" };
  const agreeRowStyle = { display: "flex", alignItems: "flex-start", gap: "10px", margin: "4px 0 20px", fontSize: ".92rem", color: "rgba(10,11,20,.75)", lineHeight: 1.45 };
  const submitBtnStyle = { width: "100%", padding: "18px", background: INK, color: "#FFFFFF", border: "none", borderRadius: "999px", fontFamily: "var(--disp)", fontSize: "1.05rem", fontWeight: 800, cursor: "pointer", marginTop: "4px" };
  const hintStyle = { fontSize: ".8rem", color: "rgba(10,11,20,.5)", margin: "-10px 0 16px", lineHeight: 1.4 };

  const successCardStyle = { ...cardStyle, textAlign: "center", borderColor: "rgba(255,107,53,.4)", background: "rgba(255,107,53,.04)" };

  // Payment tiers
  const payTiers = [
    { key: "headline", name: "Headline Sponsor", price: "$1,000", icon: Crown, color: RED },
    { key: "featured", name: "Featured Sponsor", price: "$500", icon: Star, color: ORANGE },
    { key: "supporting", name: "Supporting Sponsor", price: "$300", icon: Trophy, color: COBALT },
    { key: "booster", name: "Prize Pool Booster", price: "$150", icon: DollarSign, color: GOLD },
  ];
  const payGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" };
  const payCardStyle = (color) => ({ background: "#fff", borderRadius: "18px", padding: "24px", border: `2px solid ${color}`, display: "flex", flexDirection: "column", gap: "14px", boxShadow: "0 8px 24px rgba(10,11,20,.06)" });
  const payTopStyle = { display: "flex", alignItems: "center", gap: "12px" };
  const payIconStyle = (color) => ({ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "12px", background: color, color: color === GOLD ? INK : "#fff", flexShrink: 0 });
  const payNameStyle = { fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1.1rem", color: INK, margin: 0, lineHeight: 1.1 };
  const payPerStyle = { fontSize: ".8rem", color: "rgba(10,11,20,.55)", margin: "2px 0 0" };
  const payPriceStyle = { fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1.9rem", color: INK, margin: 0, letterSpacing: "-.01em" };
  const payBtnStyle = (color) => ({ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "13px 20px", background: color, color: color === GOLD ? INK : "#fff", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".98rem", textDecoration: "none", marginTop: "auto" });

  const duckHostCardStyle = { background: "rgba(10,11,20,.03)", borderRadius: "18px", padding: "22px 24px", border: "1.5px dashed rgba(10,11,20,.2)", marginTop: "16px", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" };
  const footNoteStyle = { fontSize: ".9rem", color: "rgba(10,11,20,.55)", lineHeight: 1.6, textAlign: "center", marginTop: "28px" };

  return (
    <main style={pageStyle}>
      <div style={topBarStyle}><Lockup /></div>

      {/* HERO */}
      <section style={heroStyle}>
        <Reveal><span style={heroKickerStyle}><Handshake size={14} /> Become a Sponsor</span></Reveal>
        <Reveal as="h1" delay={80} style={heroTitleStyle}>Lock in your slot.</Reveal>
        <Reveal as="p" delay={140} style={heroSubStyle}>You picked your tier &mdash; let&apos;s make it official. Fill in your details, then complete payment to secure your spot in the drawing. Takes about two minutes.</Reveal>
        <Reveal delay={200}>
          <div style={trustRowStyle}>
            <span style={trustPillStyle}><ShieldCheck size={15} /> Secure hosted checkout</span>
            <span style={trustPillStyle}><Lock size={15} /> Your card never touches our site</span>
            <span style={trustPillStyle}><Check size={15} /> Real conversation, no lock-in</span>
          </div>
        </Reveal>
      </section>

      <div style={wrapStyle}>
        {/* STEP 1 — DETAILS */}
        <Reveal>
          <div style={stepLabelStyle}><span style={stepNumStyle}>1</span> Your details</div>
        </Reveal>

        {submitted ? (
          <Reveal>
            <div style={successCardStyle}>
              <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🦆</div>
              <h2 style={{ ...sectionTitleStyle, marginBottom: "10px" }}>Details received!</h2>
              <p style={sectionSubStyle}>Got it &mdash; I have everything I need on your end. <strong>Complete Step 2 below</strong> to lock in your slot, and I&apos;ll confirm the prize and creative details with you directly.</p>
              <p style={{ ...footNoteStyle, marginTop: 0 }}>Don&apos;t forget to email your logo to <strong>gvonflue@gmail.com</strong> if you haven&apos;t already.</p>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <div style={cardStyle}>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="botcheck" />

                <div style={rowStyle}>
                  <div>
                    <label style={labelStyle} htmlFor="business_name">Business Name</label>
                    <input style={inputStyle} type="text" id="business_name" name="business_name" required />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="your_name">Your Name</label>
                    <input style={inputStyle} type="text" id="your_name" name="your_name" required />
                  </div>
                </div>

                <div style={rowStyle}>
                  <div>
                    <label style={labelStyle} htmlFor="email">Email</label>
                    <input style={inputStyle} type="email" id="email" name="email" required />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="phone">Phone</label>
                    <input style={inputStyle} type="tel" id="phone" name="phone" required />
                  </div>
                </div>

                <label style={labelStyle} htmlFor="tier">Tier You&apos;re Signing Up For</label>
                <select style={inputStyle} id="tier" name="tier" required defaultValue="">
                  <option value="" disabled>Pick your tier</option>
                  <option>Headline Sponsor — $1,000/drawing</option>
                  <option>Featured Sponsor — $500/drawing</option>
                  <option>Supporting Sponsor — $300/drawing</option>
                  <option>Prize Pool Booster — $150/drawing</option>
                  <option>Duck Host — free for launch</option>
                </select>

                <div style={rowStyle}>
                  <div>
                    <label style={labelStyle} htmlFor="commitment">Commitment</label>
                    <select style={inputStyle} id="commitment" name="commitment" required defaultValue="">
                      <option value="" disabled>How often?</option>
                      <option>One drawing</option>
                      <option>A full month (both drawings)</option>
                      <option>Multiple months</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="drawings">Which Drawing(s)?</label>
                    <input style={inputStyle} type="text" id="drawings" name="drawings" placeholder="e.g. July 1" required />
                  </div>
                </div>

                <label style={labelStyle} htmlFor="prize_type">The Prize</label>
                <select style={inputStyle} id="prize_type" name="prize_type" required defaultValue="">
                  <option value="" disabled>How are we handling your prize?</option>
                  <option>I&apos;ll provide my own product as the prize</option>
                  <option>Please pick a prize for me (funded by my sponsorship)</option>
                  <option>Not sure yet — let&apos;s talk</option>
                </select>

                <label style={labelStyle} htmlFor="prize_details">Prize details (what + estimated value)</label>
                <textarea style={textareaStyle} id="prize_details" name="prize_details" placeholder="e.g. $250 dinner-for-two gift card to our restaurant"></textarea>

                <div style={rowStyle}>
                  <div>
                    <label style={labelStyle} htmlFor="instagram">Instagram</label>
                    <input style={inputStyle} type="text" id="instagram" name="instagram" placeholder="@yourbusiness" />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="website">Website</label>
                    <input style={inputStyle} type="text" id="website" name="website" placeholder="yourbusiness.com" />
                  </div>
                </div>

                <label style={labelStyle} htmlFor="logo_note">Your Logo</label>
                <input style={inputStyle} type="text" id="logo_note" name="logo_note" placeholder="Paste a link, or email it to gvonflue@gmail.com" />
                <p style={hintStyle}>Highest-resolution version you have. A transparent PNG is perfect.</p>

                <label style={labelStyle} htmlFor="duck_host_perk">If Duck Host: your perk for the first 3 visitors (optional)</label>
                <input style={inputStyle} type="text" id="duck_host_perk" name="duck_host_perk" placeholder="e.g. a free coffee" />

                <label style={labelStyle} htmlFor="notes">Anything else? (optional)</label>
                <textarea style={textareaStyle} id="notes" name="notes"></textarea>

                <label style={agreeRowStyle}>
                  <input type="checkbox" name="agreement" required style={{ marginTop: "3px", flexShrink: 0 }} />
                  <span>I understand my slot is confirmed once my details and payment are received, and that final prize and creative details will be confirmed with Garrett directly.</span>
                </label>

                <button type="submit" style={submitBtnStyle} disabled={submitting}>{submitting ? "Sending..." : "Submit details →"}</button>
              </form>
            </div>
          </Reveal>
        )}

        {/* STEP 2 — PAYMENT */}
        <div id="payment" style={{ marginTop: "48px" }}>
          <Reveal>
            <div style={stepLabelStyle}><span style={stepNumStyle}>2</span> Secure your slot</div>
          </Reveal>
          <Reveal>
            <h2 style={sectionTitleStyle}>Complete your payment</h2>
          </Reveal>
          <Reveal>
            <p style={sectionSubStyle}>Pick your tier below to pay through our secure checkout. Buying a full month (both drawings)? You can adjust the quantity at checkout, or just reach out for a combined link.</p>
          </Reveal>

          <Reveal>
            <div style={payGridStyle}>
              {payTiers.map((t) => {
                const Icon = t.icon;
                const live = payIsLive(t.key);
                return (
                  <div key={t.key} style={payCardStyle(t.color)}>
                    <div style={payTopStyle}>
                      <span style={payIconStyle(t.color)}><Icon size={22} /></span>
                      <div>
                        <p style={payNameStyle}>{t.name}</p>
                        <p style={payPerStyle}>per drawing</p>
                      </div>
                    </div>
                    <p style={payPriceStyle}>{t.price}</p>
                    <a href={payHref(t.key, t.name)} target={live ? "_blank" : undefined} rel={live ? "noopener noreferrer" : undefined} style={payBtnStyle(t.color)}>
                      {live ? <><CreditCard size={18} /> Pay {t.price}</> : <>Request payment link <ArrowUpRight size={16} /></>}
                    </a>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal>
            <div style={duckHostCardStyle}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "12px", background: "rgba(10,11,20,.08)", color: INK, flexShrink: 0 }}><Check size={22} /></span>
              <div>
                <p style={{ ...payNameStyle, marginBottom: "2px" }}>Duck Host &mdash; free for launch</p>
                <p style={{ ...payPerStyle, margin: 0 }}>No payment needed right now. Just submit your details above and I&apos;ll get a duck to your business.</p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p style={footNoteStyle}>
              <Lock size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: "5px" }} />
              Payments are handled by our secure checkout provider &mdash; your card details go straight to them and never touch this site.<br />
              Prefer to pay another way (invoice, check)? Email <strong>gvonflue@gmail.com</strong> or call <strong>901-335-3905</strong>.
            </p>
          </Reveal>
        </div>
      </div>

      <Footer />
    </main>
  );
}
