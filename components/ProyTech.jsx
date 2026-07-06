"use client";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

// Place this right after <About /> in your page.
// It reuses your existing classes (section-wrap, section-kicker, section-title,
// btn btn-gold btn-lg) so it matches the rest of the site automatically.
// Adjust the "02 —" kicker number to fit wherever you slot it.

export default function ProyTech() {
  return (
    <section id="proytech" className="proytech-section">
      <div className="section-wrap">
        <div
          className="proytech-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(28px, 5vw, 64px)",
            alignItems: "center",
          }}
        >
          {/* Copy */}
          <div>
            <Reveal as="span" className="section-kicker">
              03 — The systems side of me
            </Reveal>
            <Reveal as="h2" delay={60} className="section-title">
              I got tired of chasing my tail. So I built the fix.
            </Reveal>
            <Reveal as="p" delay={120}>
              Between missed calls, leads going cold, and a stack of tools that
              didn&apos;t talk to each other, I was spending more time wrestling
              my systems than actually helping clients. So I built something that
              just handled it — answered every lead in seconds, followed up on its
              own, and kept me in front of people until they were ready.
            </Reveal>
            <Reveal as="p" delay={180}>
              It worked so well that other agents and lenders started asking me to
              build theirs. That&apos;s how <strong>ProyTech</strong> was born — an
              AI setup that turns your website into a front office that books
              appointments while you sleep. Built by a realtor, for realtors and
              lenders.
            </Reveal>
            <Reveal delay={240} style={{ marginTop: "28px" }}>
              <a
                href="https://getproytech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-lg"
              >
                See ProyTech <ArrowUpRight size={20} />
              </a>
              <span
                style={{
                  display: "block",
                  marginTop: "12px",
                  fontSize: "13px",
                  letterSpacing: ".04em",
                  textTransform: "uppercase",
                  opacity: 0.6,
                }}
              >
                Built for realtors &amp; lenders
              </span>
            </Reveal>
          </div>

          {/* Visual card */}
          <Reveal delay={160}>
            <div
              style={{
                border: "1px solid rgba(255,255,255,.14)",
                borderRadius: "20px",
                padding: "clamp(22px, 3vw, 32px)",
                background:
                  "linear-gradient(160deg, rgba(255,255,255,.05), rgba(255,255,255,.01))",
                backdropFilter: "blur(6px)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--disp, inherit)",
                  fontWeight: 700,
                  fontSize: "22px",
                  marginBottom: "20px",
                  letterSpacing: "-.01em",
                }}
              >
                Proy<span style={{ color: "#FF5500" }}>Tech</span>
              </div>
              {[
                ["Answers every lead in seconds", "24/7, even after hours"],
                ["Follows up so you don't have to", "nothing slips through"],
                ["Books appointments on autopilot", "straight to your calendar"],
                ["Keeps you top of mind for months", "for the not-ready-yet crowd"],
              ].map(([t, s], i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    padding: "12px 0",
                    borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,.08)",
                  }}
                >
                  <span style={{ color: "#FF5500", fontWeight: 700, lineHeight: 1.5 }}>
                    →
                  </span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{t}</div>
                    <div style={{ fontSize: "13.5px", opacity: 0.6 }}>{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
