"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

const KIT_FORM_ACTION = "https://app.kit.com/forms/9545600/subscriptions";

const BULLETS = [
  "The full buying process, in plain-English steps",
  "Local lenders, inspectors & pros I trust",
  "Wichita neighborhood cheat-sheet",
  "Hidden costs no one warns first-timers about",
  "Exclusive local discounts & move-in perks",
  "Your personal showing & offer checklist",
];

const formCard = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "28px",
  padding: "44px 36px",
  backdropFilter: "blur(20px)",
  boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
};

const formH3 = {
  fontFamily: "var(--disp)",
  fontSize: "1.8rem",
  color: "#fff",
  marginBottom: "10px",
  lineHeight: 1.15,
};

const formSub = {
  color: "rgba(255,255,255,0.65)",
  fontSize: "0.98rem",
  lineHeight: 1.5,
  marginBottom: "28px",
};

const fieldLabel = {
  display: "block",
  fontSize: "0.78rem",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.55)",
  marginBottom: "8px",
  marginTop: "16px",
};

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: "12px",
  padding: "14px 16px",
  fontSize: "1rem",
  color: "#fff",
  fontFamily: "var(--body)",
  outline: "none",
  transition: "all 200ms ease",
};

const submitBtn = {
  width: "100%",
  marginTop: "24px",
  padding: "16px 24px",
  fontSize: "1.05rem",
  fontWeight: 600,
  borderRadius: "999px",
  background: "var(--gold)",
  color: "var(--ink)",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  transition: "transform 150ms ease, box-shadow 150ms ease",
  boxShadow: "0 8px 24px rgba(231,181,60,0.3)",
};

const finePrint = {
  color: "rgba(255,255,255,0.45)",
  fontSize: "0.8rem",
  lineHeight: 1.5,
  marginTop: "18px",
  textAlign: "center",
};

const headlineStyle = {
  color: "#fff",
};

const goldWord = {
  color: "var(--gold)",
  fontStyle: "normal",
};

const bulletList = {
  listStyle: "none",
  padding: 0,
  margin: "32px 0 0 0",
  display: "grid",
  gap: "14px",
};

const bulletItem = {
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
  color: "rgba(255,255,255,0.85)",
  fontSize: "1.02rem",
  lineHeight: 1.5,
};

const bulletIcon = {
  flexShrink: 0,
  marginTop: 3,
  color: "var(--gold)",
};

const ledeText = {
  color: "rgba(255,255,255,0.7)",
  fontSize: "1.1rem",
  lineHeight: 1.6,
  marginTop: "20px",
  maxWidth: "44ch",
};

export default function LeadMagnet() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target;
    const formData = new FormData(form);

    try {
      await fetch(KIT_FORM_ACTION, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });
      window.location.href = "/guide";
    } catch (err) {
      console.error("Form submission error:", err);
      window.location.href = "/guide";
    }
  };

  return (
    <section className="lead" id="guide">
      <div className="section-wrap lead-grid">
        <div className="lead-copy">
          <Reveal as="span" className="section-kicker">
            03 — The free homebuyer guide
          </Reveal>
          <Reveal as="h2" className="section-title" delay={60} style={headlineStyle}>
            Everything I wish someone handed me <span style={goldWord}>before</span> my first home.
          </Reveal>
          <Reveal as="p" delay={120} style={ledeText}>
            A no-fluff PDF I built for first-time buyers in Wichita and the surrounding areas. Drop your name and email — I&apos;ll send it straight to your inbox.
          </Reveal>
          <Reveal as="ul" delay={180} style={bulletList}>
            {BULLETS.map((b) => (
              <li key={b} style={bulletItem}>
                <CheckCircle2 size={20} style={bulletIcon} />
                <span>{b}</span>
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal delay={200}>
          <form
            style={formCard}
            onSubmit={handleSubmit}
            action={KIT_FORM_ACTION}
            method="post"
          >
            <h3 style={formH3}>Get the free guide</h3>
            <p style={formSub}>
              Sent instantly. No spam — just the guide and the occasional note from me.
            </p>

            <label style={fieldLabel}>First name</label>
            <input
              type="text"
              name="fields[first_name]"
              placeholder="Garrett"
              required
              style={inputStyle}
            />

            <label style={fieldLabel}>Email</label>
            <input
              type="email"
              name="email_address"
              placeholder="you@example.com"
              required
              style={inputStyle}
            />

            <button type="submit" style={submitBtn} disabled={submitting}>
              {submitting ? "Sending…" : "Send me the guide"}
              <ArrowUpRight size={20} />
            </button>

            <p style={finePrint}>
              By submitting, you agree to receive emails from GVonFlue Real Estate. Unsubscribe anytime.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
