"use client";

import Lockup from "@/components/Lockup";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Sparkles, ArrowUpRight, Flame, Users, TrendingUp, MapPin, Camera, Heart, Mail, Phone, Check } from "lucide-react";

export default function JoeDirtSponsorPitch() {
  const COBALT = "#1338DE";
  const ORANGE = "#FF6B35";
  const INK = "#0A0B14";

  const pageStyle = { background: "#FFFFFF", minHeight: "100vh", color: INK };
  const topBarStyle = { padding: "28px 24px", display: "flex", justifyContent: "center" };

  // HERO
  const heroStyle = { padding: "60px 24px 80px", textAlign: "center", maxWidth: "1100px", margin: "0 auto", position: "relative" };
  const heroKickerStyle = { display: "inline-flex", alignItems: "center", gap: "10px", padding: "10px 22px", background: "rgba(255,107,53,.12)", borderRadius: "999px", color: ORANGE, fontFamily: "var(--disp)", fontSize: ".9rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "28px", border: `1.5px solid rgba(255,107,53,.4)` };
  const heroTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.6rem, 7vw, 5.2rem)", lineHeight: 0.95, letterSpacing: "-.025em", margin: "0 0 24px", color: INK };
  const orangeAccent = { color: ORANGE };
  const heroSubStyle = { fontSize: "1.3rem", lineHeight: 1.55, color: "rgba(10,11,20,.7)", maxWidth: "720px", margin: "0 auto 40px" };

  // LOGO LOCKUP HERO
  const lockupRowStyle = { display: "flex", alignItems: "center", justifyContent: "center", gap: "40px", flexWrap: "wrap", margin: "0 auto 48px", padding: "32px", background: "rgba(255,107,53,.06)", borderRadius: "24px", border: `2px dashed ${ORANGE}`, maxWidth: "720px" };
  const lockupBrandStyle = { fontFamily: "var(--disp)", fontSize: "1.5rem", fontWeight: 800, color: INK, letterSpacing: "-.01em" };
  const lockupPlusStyle = { fontFamily: "var(--disp)", fontSize: "2rem", fontWeight: 800, color: ORANGE };
  const logoPlaceholderStyle = { width: "160px", height: "80px", background: "#FFFFFF", border: `2px solid ${INK}`, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(10,11,20,.4)", fontFamily: "var(--disp)", fontSize: ".75rem", letterSpacing: ".1em", textTransform: "uppercase", textAlign: "center", padding: "8px" };

  // SECTIONS
  const sectionStyle = { padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" };
  const sectionKickerStyle = { display: "inline-block", fontFamily: "var(--disp)", fontSize: ".85rem", fontWeight: 700, color: ORANGE, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "16px" };
  const sectionTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", lineHeight: 1, letterSpacing: "-.02em", margin: "0 0 24px", color: INK };
  const ledeStyle = { fontSize: "1.2rem", color: "rgba(10,11,20,.7)", lineHeight: 1.6, maxWidth: "780px" };

  // PITCH BLOCK
  const pitchWrapStyle = { background: INK, color: "#fff", padding: "80px 32px", borderRadius: "32px", margin: "40px auto 60px", maxWidth: "1100px", textAlign: "center" };
  const pitchTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2rem, 5vw, 3.4rem)", margin: "0 0 24px", lineHeight: 1.1, color: "#fff" };
  const pitchCopyStyle = { color: "rgba(255,255,255,.78)", fontSize: "1.2rem", lineHeight: 1.6, maxWidth: "680px", margin: "0 auto 20px" };

  // METRICS CARDS
  const metricsGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginTop: "48px" };
  const metricCardStyle = { background: "#FFFFFF", border: `2px solid ${COBALT}`, borderRadius: "20px", padding: "28px 24px", textAlign: "left" };
  const metricIconWrapStyle = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "12px", background: COBALT, color: "#FFFFFF", marginBottom: "16px" };
  const metricLabelStyle = { fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".1em", color: "rgba(10,11,20,.55)", fontWeight: 700, fontFamily: "var(--disp)", margin: "0 0 8px" };
  const metricValueStyle = { fontFamily: "var(--disp)", fontSize: "1.6rem", fontWeight: 800, color: INK, margin: "0 0 8px", letterSpacing: "-.01em" };
  const metricSubStyle = { fontSize: ".95rem", color: "rgba(10,11,20,.65)", lineHeight: 1.5, margin: 0 };

  // FIT SECTION
  const fitWrapStyle = { background: "rgba(255,107,53,.08)", border: `3px solid ${ORANGE}`, borderRadius: "32px", padding: "60px 40px", margin: "60px auto", maxWidth: "1100px" };
  const fitTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2rem, 5vw, 3rem)", margin: "0 0 24px", lineHeight: 1.1, color: INK };
  const fitListStyle = { listStyle: "none", padding: 0, margin: "32px 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" };
  const fitItemStyle = { display: "flex", alignItems: "flex-start", gap: "14px", padding: "20px", background: "#FFFFFF", borderRadius: "14px" };
  const fitCheckStyle = { flexShrink: 0, width: "32px", height: "32px", borderRadius: "10px", background: ORANGE, color: "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center" };
  const fitItemTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.05rem", fontWeight: 700, color: INK, margin: "0 0 6px" };
  const fitItemBodyStyle = { color: "rgba(10,11,20,.7)", fontSize: ".95rem", lineHeight: 1.5, margin: 0 };

  // VALUE EXCHANGE TABLE
  const exchangeWrapStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "48px" };
  const exchangeCardStyle = { background: "#FFFFFF", border: `3px solid ${INK}`, borderRadius: "24px", padding: "40px 32px" };
  const exchangeHeaderStyle = { display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px", paddingBottom: "20px", borderBottom: `2px solid rgba(10,11,20,.08)` };
  const exchangeKickerStyle = { fontFamily: "var(--disp)", fontSize: ".8rem", fontWeight: 700, color: "rgba(10,11,20,.5)", letterSpacing: ".12em", textTransform: "uppercase", margin: 0 };
  const exchangeTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.5rem", fontWeight: 800, color: INK, margin: "4px 0 0", lineHeight: 1.1 };
  const exchangeItemStyle = { padding: "14px 0", color: "rgba(10,11,20,.75)", fontSize: "1rem", lineHeight: 1.5, display: "flex", alignItems: "flex-start", gap: "10px", borderBottom: "1px solid rgba(10,11,20,.06)" };

  // LIVE EXAMPLE
  const exampleWrapStyle = { padding: "70px 40px", borderRadius: "40px", border: `5px solid ${ORANGE}`, background: "#FFFFFF", boxShadow: `0 30px 80px rgba(255,107,53,.2)`, margin: "48px auto 0" };
  const exampleBadgeStyle = { display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 28px", background: ORANGE, color: "#FFFFFF", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1rem", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "24px" };
  const exampleTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.05, letterSpacing: "-.02em", margin: "0 0 16px", color: INK, textAlign: "center" };
  const examplePrizeListStyle = { listStyle: "none", padding: 0, margin: "32px 0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" };
  const examplePrizeItemStyle = { background: `linear-gradient(160deg, ${COBALT} 0%, ${INK} 100%)`, color: "#fff", borderRadius: "16px", padding: "24px", border: `1px solid rgba(255,107,53,.3)` };
  const examplePrizeItemHighlightStyle = { background: `linear-gradient(160deg, ${ORANGE} 0%, #C44A1A 100%)`, color: "#fff", borderRadius: "16px", padding: "24px", border: `2px solid ${INK}`, boxShadow: `0 8px 30px rgba(255,107,53,.4)`, position: "relative" };
  const examplePrizeLabelStyle = { fontSize: ".7rem", fontFamily: "var(--disp)", letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 8px", opacity: 0.85 };
  const examplePrizeNameStyle = { fontFamily: "var(--disp)", fontSize: "1.15rem", fontWeight: 800, margin: 0, lineHeight: 1.15 };

  // CTA SECTION
  const ctaWrapStyle = { background: ORANGE, color: "#FFFFFF", padding: "80px 40px", borderRadius: "32px", margin: "60px auto", maxWidth: "1100px", textAlign: "center" };
  const ctaTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.2rem, 5.5vw, 3.4rem)", lineHeight: 1.05, margin: "0 0 24px", color: "#FFFFFF" };
  const ctaCopyStyle = { fontSize: "1.2rem", lineHeight: 1.55, color: "rgba(255,255,255,.95)", maxWidth: "620px", margin: "0 auto 36px" };
  const ctaBtnStyle = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "18px 36px", background: "#FFFFFF", color: ORANGE, borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1.1rem", textDecoration: "none", border: "none", cursor: "pointer", marginBottom: "20px" };
  const ctaContactStyle = { color: "rgba(255,255,255,.9)", fontSize: "1rem", margin: "8px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" };

  // RISK CALLOUT (the honest section)
  const honestWrapStyle = { background: "#FFFFFF", border: `2px dashed ${COBALT}`, borderRadius: "20px", padding: "32px", maxWidth: "780px", margin: "48px auto 0" };
  const honestTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.3rem", fontWeight: 700, color: COBALT, margin: "0 0 12px" };
  const honestCopyStyle = { color: "rgba(10,11,20,.7)", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 };

  return (
    <main style={pageStyle}>
      <style>{`
        @keyframes sparkle-float { 0%, 100% { transform: translateY(0) scale(1); opacity: .5; } 50% { transform: translateY(-14px) scale(1.15); opacity: 1; } }
        .sp-sparkle { position: absolute; z-index: 0; pointer-events: none; }
        .sp-sparkle.s1 { top: 10%; left: 6%; animation: sparkle-float 4s ease-in-out 0s infinite; }
        .sp-sparkle.s2 { top: 22%; right: 8%; animation: sparkle-float 4.5s ease-in-out .6s infinite; }
        @media (max-width: 800px) {
          .sp-sparkle { display: none; }
          .exchange-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={topBarStyle}><Lockup /></div>

      {/* HERO */}
      <section style={heroStyle}>
        <svg className="sp-sparkle s1" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={ORANGE}/></svg>
        <svg className="sp-sparkle s2" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={COBALT}/></svg>

        <Reveal><span style={heroKickerStyle}><Sparkles size={14} /> Sponsor Pitch · For Joe Dirt Fireworks</span></Reveal>
        <Reveal as="h1" delay={80} style={heroTitleStyle}>Let&apos;s light up <span style={orangeAccent}>Wichita</span> together.</Reveal>
        <Reveal as="p" delay={140} style={heroSubStyle}>DuckWichita is a local viral marketing campaign launching this month. We&apos;re looking for one founding sponsor for our launch prize package — and Joe Dirt Fireworks is the perfect fit.</Reveal>

        {/* LOGO LOCKUP */}
        <Reveal delay={200}>
          <div style={lockupRowStyle}>
            <div style={lockupBrandStyle}>DuckWichita</div>
            <div style={lockupPlusStyle}>+</div>
            <div style={logoPlaceholderStyle}>Joe Dirt Fireworks logo here</div>
          </div>
        </Reveal>
      </section>

      {/* THE PITCH IN 60 SECONDS */}
      <section style={pitchWrapStyle}>
        <Reveal><span style={{ ...sectionKickerStyle, color: ORANGE }}>The 60-second version</span></Reveal>
        <Reveal as="h2" delay={80} style={pitchTitleStyle}>Patriotic ducks. Hidden across Wichita. <span style={orangeAccent}>Real prizes for real people.</span></Reveal>
        <Reveal as="p" delay={140} style={pitchCopyStyle}>I&apos;m placing hundreds of small patriotic rubber ducks across the city. Each one has a QR code on a tag. When someone finds one and scans it, they enter a secret giveaway page. Twice a month, someone from the &quot;flock&quot; wins a local prize package.</Reveal>
        <Reveal as="p" delay={200} style={pitchCopyStyle}>That&apos;s it. Simple. Strange. Designed to spread by word of mouth.</Reveal>
        <Reveal as="p" delay={260} style={{ ...pitchCopyStyle, color: ORANGE, fontWeight: 600 }}>The launch prize is what gets people talking. That&apos;s where you come in.</Reveal>
      </section>

      {/* WHY JOE DIRT FITS */}
      <section style={sectionStyle}>
        <Reveal><span style={sectionKickerStyle}>Why Joe Dirt fits</span></Reveal>
        <Reveal as="h2" delay={60} style={sectionTitleStyle}>This isn&apos;t a generic ask. <span style={orangeAccent}>Read why.</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>I&apos;m not sending this page to ten businesses hoping someone bites. Joe Dirt Fireworks is the first sponsor I&apos;m approaching because the fit is too obvious to ignore.</Reveal>

        <div style={fitWrapStyle}>
          <Reveal as="h3" delay={140} style={fitTitleStyle}>Four reasons it&apos;s a yes:</Reveal>
          <ul style={fitListStyle}>
            <Reveal delay={180}>
              <li style={fitItemStyle}>
                <span style={fitCheckStyle}><Flame size={18} /></span>
                <div>
                  <h4 style={fitItemTitleStyle}>Patriotic theme = perfect match</h4>
                  <p style={fitItemBodyStyle}>The ducks are stars-and-stripes themed. Fireworks are stars-and-stripes themed. Same vibe, same audience, same energy.</p>
                </div>
              </li>
            </Reveal>
            <Reveal delay={240}>
              <li style={fitItemStyle}>
                <span style={fitCheckStyle}><Users size={18} /></span>
                <div>
                  <h4 style={fitItemTitleStyle}>Same target audience</h4>
                  <p style={fitItemBodyStyle}>Wichita families and locals who like real, hometown community stuff. The exact people who buy fireworks every summer.</p>
                </div>
              </li>
            </Reveal>
            <Reveal delay={300}>
              <li style={fitItemStyle}>
                <span style={fitCheckStyle}><Camera size={18} /></span>
                <div>
                  <h4 style={fitItemTitleStyle}>Built for sharing</h4>
                  <p style={fitItemBodyStyle}>Every finder posts their duck. Every winner posts their prize. Every post tags you. Free social exposure baked into the model.</p>
                </div>
              </li>
            </Reveal>
            <Reveal delay={360}>
              <li style={fitItemStyle}>
                <span style={fitCheckStyle}><Heart size={18} /></span>
                <div>
                  <h4 style={fitItemTitleStyle}>The 4th of July timing</h4>
                  <p style={fitItemBodyStyle}>We&apos;re launching in June. Fireworks season is RIGHT now. Your busiest sales window aligned perfectly with maximum brand exposure.</p>
                </div>
              </li>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* THE EXCHANGE */}
      <section style={sectionStyle}>
        <Reveal><span style={sectionKickerStyle}>The deal</span></Reveal>
        <Reveal as="h2" delay={60} style={sectionTitleStyle}>What you give. <span style={orangeAccent}>What you get.</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>I keep this simple on purpose. Sponsorship terms shouldn&apos;t need a lawyer.</Reveal>

        <div className="exchange-grid" style={exchangeWrapStyle}>
          <Reveal delay={180}>
            <div style={exchangeCardStyle}>
              <div style={exchangeHeaderStyle}>
                <span style={{ ...fitCheckStyle, background: INK }}><ArrowUpRight size={18} /></span>
                <div>
                  <p style={exchangeKickerStyle}>You give</p>
                  <h3 style={exchangeTitleStyle}>A fireworks bundle</h3>
                </div>
              </div>
              <div style={exchangeItemStyle}>
                <Check size={20} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} />
                <span>One fireworks bundle worth roughly <strong>$100–150 retail</strong> — your choice on contents and packaging.</span>
              </div>
              <div style={exchangeItemStyle}>
                <Check size={20} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} />
                <span>Coordination with the winner on pickup at your store (or delivery if you prefer).</span>
              </div>
              <div style={{ ...exchangeItemStyle, borderBottom: "none" }}>
                <Check size={20} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} />
                <span>Your logo + a sentence about Joe Dirt for me to feature in materials.</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div style={{ ...exchangeCardStyle, borderColor: ORANGE }}>
              <div style={exchangeHeaderStyle}>
                <span style={fitCheckStyle}><Sparkles size={18} /></span>
                <div>
                  <p style={exchangeKickerStyle}>You get</p>
                  <h3 style={exchangeTitleStyle}>Front-row exposure</h3>
                </div>
              </div>
              <div style={exchangeItemStyle}>
                <Check size={20} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} />
                <span><strong>Launch sponsor recognition</strong> on duckwichita.com — featured logo + link on the prize section.</span>
              </div>
              <div style={exchangeItemStyle}>
                <Check size={20} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} />
                <span><strong>Sponsor tag on every social post</strong> about the June prize — Instagram + Facebook + any press coverage.</span>
              </div>
              <div style={exchangeItemStyle}>
                <Check size={20} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} />
                <span><strong>Winner announcement video</strong> mentions Joe Dirt as the prize provider. The most-shared post of the month.</span>
              </div>
              <div style={exchangeItemStyle}>
                <Check size={20} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} />
                <span><strong>Mention in any press hits</strong> we get for the launch (we&apos;re pitching local media).</span>
              </div>
              <div style={{ ...exchangeItemStyle, borderBottom: "none" }}>
                <Check size={20} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} />
                <span><strong>First right of refusal</strong> on any future patriotic-themed prize month (July 4th anniversary, Veterans Day, etc.)</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LIVE EXAMPLE — THE JUNE PRIZE */}
      <section style={sectionStyle}>
        <Reveal><span style={sectionKickerStyle}>What it looks like in practice</span></Reveal>
        <Reveal as="h2" delay={60} style={sectionTitleStyle}>Here&apos;s exactly where <span style={orangeAccent}>Joe Dirt</span> shows up.</Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>This is the actual June prize package as it&apos;ll appear on duckwichita.com. Your sponsorship slot is highlighted.</Reveal>

        <Reveal delay={180}>
          <div style={exampleWrapStyle}>
            <div style={{ textAlign: "center" }}>
              <span style={exampleBadgeStyle}>🦆 June Launch Prize</span>
              <h2 style={exampleTitleStyle}>The Ultimate <span style={orangeAccent}>Wichita Summer Night</span></h2>
            </div>

            <ul style={examplePrizeListStyle}>
              <li style={examplePrizeItemStyle}>
                <p style={examplePrizeLabelStyle}>Ticket sponsor</p>
                <p style={examplePrizeNameStyle}>4 Wind Surge Tickets · Section A</p>
              </li>
              <li style={examplePrizeItemHighlightStyle}>
                <p style={examplePrizeLabelStyle}>🎆 Joe Dirt Fireworks</p>
                <p style={examplePrizeNameStyle}>Family Fireworks Bundle</p>
              </li>
              <li style={examplePrizeItemStyle}>
                <p style={examplePrizeLabelStyle}>Cash bonus</p>
                <p style={examplePrizeNameStyle}>$100 for whatever they want</p>
              </li>
            </ul>

            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <p style={{ fontFamily: "var(--disp)", fontSize: "1.4rem", color: INK, margin: "0 0 8px", fontWeight: 700 }}>Total package value: <span style={orangeAccent}>$300+</span></p>
              <p style={{ color: "rgba(10,11,20,.65)", margin: 0, fontSize: ".95rem" }}>Featured on duckwichita.com from launch through July 15</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* THE NUMBERS */}
      <section style={sectionStyle}>
        <Reveal><span style={sectionKickerStyle}>The honest numbers</span></Reveal>
        <Reveal as="h2" delay={60} style={sectionTitleStyle}>What I&apos;m projecting <span style={orangeAccent}>(no fluff).</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>I&apos;m not going to overpromise reach we haven&apos;t earned yet. Here&apos;s the conservative June projection.</Reveal>

        <div style={metricsGridStyle}>
          <Reveal delay={180}>
            <div style={metricCardStyle}>
              <div style={metricIconWrapStyle}><MapPin size={22} /></div>
              <p style={metricLabelStyle}>Ducks distributed</p>
              <p style={metricValueStyle}>100+</p>
              <p style={metricSubStyle}>Hand-placed across Wichita over the first 30 days.</p>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div style={metricCardStyle}>
              <div style={metricIconWrapStyle}><Users size={22} /></div>
              <p style={metricLabelStyle}>Projected entries</p>
              <p style={metricValueStyle}>200–400</p>
              <p style={metricSubStyle}>Each entrant becomes part of a 1-year email/SMS audience for the campaign.</p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div style={metricCardStyle}>
              <div style={metricIconWrapStyle}><Camera size={22} /></div>
              <p style={metricLabelStyle}>Social posts (UGC)</p>
              <p style={metricValueStyle}>50–150</p>
              <p style={metricSubStyle}>Finders post #DuckWichita content. Every post we repost includes sponsor tags.</p>
            </div>
          </Reveal>
          <Reveal delay={360}>
            <div style={metricCardStyle}>
              <div style={metricIconWrapStyle}><TrendingUp size={22} /></div>
              <p style={metricLabelStyle}>Press potential</p>
              <p style={metricValueStyle}>3–5 outlets</p>
              <p style={metricSubStyle}>We&apos;re pitching KAKE, KSN, Wichita Eagle, and local podcasts. Stories like this run.</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={420}>
          <div style={honestWrapStyle}>
            <h3 style={honestTitleStyle}>The honest part</h3>
            <p style={honestCopyStyle}>This is a brand new campaign. The above numbers are projections, not guarantees. But here&apos;s what IS guaranteed: <strong>every single post, every press hit, every winner announcement features your brand prominently for the cost of one fireworks bundle.</strong> Even if we hit 50% of these projections, your CPM destroys traditional ad spend in Wichita. And if this goes viral the way it&apos;s designed to, you&apos;re the founding sponsor of the city&apos;s next quirky thing — and that&apos;s a story you tell forever.</p>
          </div>
        </Reveal>
      </section>

      {/* THE CTA */}
      <section style={ctaWrapStyle}>
        <Reveal as="h2" style={ctaTitleStyle}>Want to do this?</Reveal>
        <Reveal as="p" delay={80} style={ctaCopyStyle}>If you&apos;re in, I just need your logo (PNG with transparent background works best) and your call on which fireworks bundle you want to include. I&apos;ll handle the rest — promotion, fulfillment coordination, all of it.</Reveal>
        <Reveal delay={140}>
          <a href="mailto:gvonflue@gmail.com?subject=Joe Dirt Fireworks · DuckWichita Sponsor" style={ctaBtnStyle}><Mail size={20} /> Email me · gvonflue@gmail.com</a>
        </Reveal>
        <Reveal delay={200}>
          <p style={ctaContactStyle}><Phone size={18} /> Or just text: <strong>901-335-3905</strong></p>
        </Reveal>
        <Reveal delay={260}>
          <p style={{ ...ctaContactStyle, marginTop: "20px", fontSize: ".95rem", opacity: 0.85 }}>— Garrett Von Flue · Real Broker LLC</p>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
