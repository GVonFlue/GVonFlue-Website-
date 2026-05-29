"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "./Reveal";
import { useScrollProgress, mapRange } from "./useScroll";

const INSIDE = [
  "The full buying process, broken into plain-English steps",
  "Local lenders, inspectors & pros I actually trust",
  "Neighborhood cheat-sheet for Wichita & nearby towns",
  "Hidden costs nobody warns first-timers about",
  "Exclusive local discounts & move-in perks",
  "My personal showing & offer checklist",
];

export default function LeadMagnet() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [sent, setSent] = useState(false);
  const coverRef = useRef(null);
  const cp = useScrollProgress(coverRef);

  const coverStyle = {
    transform: `perspective(900px) rotateX(${mapRange(
      cp,
      0.1,
      0.6,
      16,
      0
    )}deg) translateY(${mapRange(cp, 0.1, 0.6, 40, 0)}px)`,
    opacity: mapRange(cp, 0.1, 0.45, 0.3, 1),
  };

  const submit = async () => {
    if (!form.name || !form.email) return;
    // TODO: wire to your email/CRM provider (Mailchimp, ConvertKit, Resend, etc.)
    // Example:
    //   await fetch('/api/lead', {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify(form)
    //   });
    setSent(true);
  };

  return (
    <section className="lead" id="guide">
      <div className="lead-grain" />
      <div className="section-wrap lead-grid">
        <div className="lead-left">
          <Reveal as="span" className="section-kicker gold">
            03 — Free download
          </Reveal>
          <Reveal as="h2" delay={60} className="lead-title">
            The First-Time Homebuyer
            <br />
            <span className="gold-text">Resource Guide</span>
          </Reveal>
          <Reveal as="p" delay={120} className="lead-lede">
            Everything I wish someone had handed me before my first closing —
            built specifically for buyers in Wichita and the surrounding area.
          </Reveal>
          <ul className="lead-list">
            {INSIDE.map((x, i) => (
              <Reveal as="li" key={x} delay={140 + i * 50}>
                <Check size={18} /> {x}
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={120} className="lead-form-wrap">
          <div className="guide-mock" ref={coverRef} style={coverStyle}>
            <span className="guide-mock-kicker">GVONFLUE · 2026</span>
            <strong>The First-Time Buyer Guide</strong>
            <span className="guide-mock-sub">Wichita Edition</span>
          </div>
          {!sent ? (
            <div className="lead-form">
              <h3>Send it to me free</h3>
              <label>
                Name
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="First & last"
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@email.com"
                />
              </label>
              <label>
                Phone <span className="opt">(optional)</span>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="So I can answer questions faster"
                />
              </label>
              <button className="btn btn-gold btn-block" onClick={submit}>
                Send Me the Guide <ArrowUpRight size={18} />
              </button>
              <p className="lead-fine">
                No spam. No spam-calls. Unsubscribe anytime.
              </p>
            </div>
          ) : (
            <div className="lead-done">
              <div className="done-check">
                <Check size={32} />
              </div>
              <h3>On its way, {form.name.split(" ")[0]}!</h3>
              <p>
                Check your inbox in a minute. Reply to that email anytime with
                questions — it comes straight to me.
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
