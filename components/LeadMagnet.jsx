"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

const KIT_FORM_ACTION =
  "https://app.kit.com/forms/9545600/subscriptions";

const BULLETS = [
  "The full buying process, in plain-English steps",
  "Local lenders, inspectors & pros I trust",
  "Wichita neighborhood cheat-sheet",
  "Hidden costs no one warns first-timers about",
  "Exclusive local discounts & move-in perks",
  "Your personal showing & offer checklist",
];

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
      // Kit handles redirect via its own settings, but in case the
      // no-cors mode swallows it, we redirect manually:
      window.location.href = "/guide";
    } catch (err) {
      console.error("Form submission error:", err);
      // Still redirect — Kit likely received it
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
          <Reveal as="h2" delay={60} className="section-title">
            Everything I wish someone had handed me <em>before</em> my first
            home.
          </Reveal>
          <Reveal as="p" delay={120}>
            A no-fluff PDF I built for first-time buyers in Wichita and the
            surrounding areas. Drop your name and email — I&apos;ll send it
            straight to your inbox.
          </Reveal>
          <Reveal as="ul" delay={180} className="lead-bullets">
            {BULLETS.map((b) => (
              <li key={b}>
                <CheckCircle2 size={18} /> {b}
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal delay={200} className="lead-form-wrap">
          <form
            className="lead-form"
            onSubmit={handleSubmit}
            action={KIT_FORM_ACTION}
            method="post"
          >
            <h3>Get the free guide</h3>
            <p className="lead-form-sub">
              Sent instantly. No spam — just the guide and the occasional
              note from me.
            </p>
            <label>
              First name
              <input
                type="text"
                name="fields[first_name]"
                placeholder="Garrett"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email_address"
                placeholder="you@example.com"
                required
              />
            </label>
            <button
              type="submit"
              className="btn btn-gold btn-lg"
              disabled={submitting}
            >
              {submitting ? "Sending…" : "Send me the guide"}{" "}
              <ArrowUpRight size={20} />
            </button>
            <p className="lead-form-fineprint">
              By submitting, you agree to receive emails from GVonFlue Real
              Estate. Unsubscribe anytime.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
