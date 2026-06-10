"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollBar from "@/components/ScrollBar";
import { Mail, Phone, ArrowUpRight, Check } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    // TODO: wire to your messaging endpoint (Resend, Formspree, custom API)
    setSent(true);
  };

  return (
    <>
      <ScrollBar />
      <Nav />
      <main
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "160px 28px 120px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "start",
        }}
        className="contact-grid"
      >
        <div>
          <span className="section-kicker">Get in touch</span>
          <h1
            className="section-title"
            style={{ fontSize: "clamp(2.2rem,4vw,3.2rem)" }}
          >
            Got a question? Send it over.
          </h1>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "1.1rem",
              marginTop: "18px",
              lineHeight: 1.6,
            }}
          >
            I read every message and reply personally — usually within a few
            hours. No autoresponders, no sales pipeline.
          </p>
          <div style={{ marginTop: "32px", display: "grid", gap: "12px" }}>
            <a
              href="mailto:gvonflue@gmail.com"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <Mail size={18} /> gvonflue@gmail.com
            </a>
            <a
              href="tel:+13165550142"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <Phone size={18} /> (316) 555-0142
            </a>
          </div>
        </div>

        <div className="lead-form-wrap" style={{ background: "#fff" }}>
          {!sent ? (
            <form onSubmit={submit} className="lead-form">
              <h3>Send Garrett a message</h3>
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
                Message
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="What's on your mind?"
                  style={{
                    width: "100%",
                    marginTop: "7px",
                    padding: ".85rem 1rem",
                    borderRadius: "11px",
                    border: "1.5px solid var(--mist)",
                    fontFamily: "var(--body)",
                    fontSize: "1rem",
                    background: "var(--paper)",
                    resize: "vertical",
                  }}
                />
              </label>
              <button
                type="submit"
                className="btn btn-gold btn-block"
                style={{ marginTop: "8px" }}
              >
                Send Message <ArrowUpRight size={18} />
              </button>
            </form>
          ) : (
            <div className="lead-done">
              <div className="done-check">
                <Check size={32} />
              </div>
              <h3>Got it, {form.name.split(" ")[0]}!</h3>
              <p>
                I&apos;ll be in touch shortly. Usually within a few hours
                during the day.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
