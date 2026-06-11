"use client";

import Link from "next/link";
import Lockup from "@/components/Lockup";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Instagram, Facebook, Sparkles, ArrowUpRight, Heart, MapPin, Share2 } from "lucide-react";

export default function DuckWichita() {
  // Brand colors for THIS page (DuckWichita sub-brand)
  const COBALT = "#1338DE";
  const ORANGE = "#FF6B35";
  const INK = "#0A0B14";

  const pageStyle = { background: "#FFFFFF", minHeight: "100vh", color: INK };
  const topBarStyle = { padding: "28px 24px", display: "flex", justifyContent: "center" };

  // HERO
  const heroStyle = { padding: "60px 24px 80px", textAlign: "center", maxWidth: "1180px", margin: "0 auto", position: "relative" };
  const heroKickerStyle = { display: "inline-flex", alignItems: "center", gap: "10px", padding: "10px 22px", background: "rgba(255,107,53,.12)", borderRadius: "999px", color: ORANGE, fontFamily: "var(--disp)", fontSize: ".9rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "32px", border: `1.5px solid rgba(255,107,53,.4)` };
  const heroTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(3rem, 9vw, 7rem)", lineHeight: 0.92, letterSpacing: "-.025em", margin: "0 0 28px", color: INK };
  const orangeAccent = { color: ORANGE };
  const heroSubStyle = { fontSize: "1.35rem", lineHeight: 1.5, color: "rgba(10,11,20,.7)", maxWidth: "640px", margin: "0 auto 44px" };
  const heroCtasStyle = { display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginBottom: "60px" };
  const heroDuckWrapStyle = { maxWidth: "420px", margin: "0 auto", aspectRatio: "1/1", borderRadius: "32px", background: `linear-gradient(135deg, ${COBALT} 0%, ${INK} 100%)`, overflow: "hidden", boxShadow: `0 30px 80px rgba(19,56,222,.3), 0 0 70px rgba(255,107,53,.2)`, position: "relative" };
  const heroDuckImgStyle = { width: "100%", height: "100%", objectFit: "cover", display: "block" };

  // SECTIONS
  const sectionStyle = { padding: "100px 24px", maxWidth: "1180px", margin: "0 auto" };
  const sectionKickerStyle = { display: "inline-block", fontFamily: "var(--disp)", fontSize: ".85rem", fontWeight: 700, color: ORANGE, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: "16px" };
  const sectionTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.4rem, 6vw, 4.2rem)", lineHeight: 1, letterSpacing: "-.02em", margin: "0 0 28px", color: INK };
  const ledeStyle = { maxWidth: "680px", fontSize: "1.2rem", color: "rgba(10,11,20,.7)", lineHeight: 1.6 };

  // MANIFESTO (dark section)
  const manifestoWrapStyle = { background: INK, color: "#fff", padding: "100px 32px", borderRadius: "32px", margin: "60px auto", maxWidth: "1180px", textAlign: "center" };
  const manifestoTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.4rem, 6vw, 4.2rem)", margin: "0 0 32px", lineHeight: 1.05, color: "#fff", letterSpacing: "-.02em" };
  const manifestoCopyStyle = { color: "rgba(255,255,255,.78)", fontSize: "1.25rem", lineHeight: 1.6, maxWidth: "640px", margin: "0 auto 24px" };

  // HOW IT WORKS (3 cards)
  const stepsGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "48px" };
  const stepCardStyle = { background: "#FFFFFF", border: `2px solid ${INK}`, borderRadius: "20px", padding: "36px 32px", height: "100%", transition: "transform .3s ease, box-shadow .3s ease" };
  const stepNumStyle = { display: "inline-flex", width: "52px", height: "52px", borderRadius: "16px", background: ORANGE, color: "#FFFFFF", alignItems: "center", justifyContent: "center", fontFamily: "var(--disp)", fontWeight: 900, fontSize: "1.4rem", marginBottom: "20px" };
  const stepTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.5rem", margin: "0 0 14px", color: INK };
  const stepBodyStyle = { color: "rgba(10,11,20,.65)", margin: 0, lineHeight: 1.55, fontSize: "1rem" };

  // FLOCK GALLERY (placeholder)
  const galleryGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "48px" };
  const galleryCardStyle = { aspectRatio: "1/1", background: `linear-gradient(135deg, ${COBALT} 0%, ${INK} 100%)`, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.5)", fontFamily: "var(--disp)", fontSize: ".85rem", letterSpacing: ".1em", textTransform: "uppercase", border: `2px solid ${ORANGE}` };

  // WINNER SPOTLIGHT
  const winnerWrapStyle = { background: "#FFFFFF", border: `3px solid ${ORANGE}`, borderRadius: "32px", padding: "60px 40px", margin: "48px auto 0", maxWidth: "780px", textAlign: "center", position: "relative" };
  const winnerBadgeStyle = { display: "inline-block", padding: "8px 20px", background: ORANGE, color: "#FFFFFF", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".85rem", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "20px" };
  const winnerTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", margin: "0 0 16px", color: INK, lineHeight: 1.15 };
  const winnerCopyStyle = { color: "rgba(10,11,20,.65)", fontSize: "1.05rem", lineHeight: 1.55, maxWidth: "500px", margin: "0 auto" };

  // SPONSOR (orange)
  const sponsorWrapStyle = { background: ORANGE, color: "#FFFFFF", padding: "80px 32px", borderRadius: "32px", margin: "60px auto", maxWidth: "1180px", textAlign: "center" };
  const sponsorKickerStyle = { color: "rgba(255,255,255,.85)", fontFamily: "var(--disp)", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", fontSize: ".85rem", marginBottom: "16px", display: "inline-block" };
  const sponsorTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.2rem, 5.5vw, 3.6rem)", margin: "0 0 24px", lineHeight: 1.05, color: "#FFFFFF" };
  const sponsorCopyStyle = { maxWidth: "640px", margin: "0 auto 32px", fontSize: "1.2rem", lineHeight: 1.55, color: "rgba(255,255,255,.9)" };

  // GARRETT BRIDGE
  const garrettWrapStyle = { textAlign: "center", maxWidth: "780px", margin: "0 auto" };
  const garrettSigStyle = { fontFamily: "var(--disp)", fontWeight: 600, color: COBALT, fontSize: "1.05rem", margin: "0 0 4px" };
  const garrettSubStyle = { color: "rgba(10,11,20,.55)", fontSize: ".95rem", margin: "0 0 32px" };

  // Custom buttons (since the site's btn-gold is, well, gold)
  const orangeBtnStyle = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "16px 30px", background: ORANGE, color: "#FFFFFF", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 700, fontSize: "1rem", textDecoration: "none", border: "none", cursor: "pointer", letterSpacing: ".01em" };
  const ghostBtnStyle = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "16px 30px", background: "transparent", color: INK, borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 700, fontSize: "1rem", textDecoration: "none", border: `2px solid ${INK}`, cursor: "pointer" };
  const whiteBtnStyle = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "16px 30px", background: "#FFFFFF", color: ORANGE, borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1rem", textDecoration: "none", border: "none", cursor: "pointer" };

  return (
    <main style={pageStyle}>
      <style>{`
        @keyframes sparkle-float { 0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: .5; } 50% { transform: translateY(-18px) scale(1.2) rotate(20deg); opacity: 1; } }
        @keyframes duck-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        .duck-hero-wrap { animation: duck-float 5s ease-in-out infinite; }
        .step-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(255,107,53,.15); }
        .dw-sparkle { position: absolute; z-index: 0; pointer-events: none; }
        .dw-sparkle.s1 { top: 8%; left: 6%; animation: sparkle-float 4s ease-in-out 0s infinite; }
        .dw-sparkle.s2 { top: 18%; right: 8%; animation: sparkle-float 4.5s ease-in-out .6s infinite; }
        .dw-sparkle.s3 { top: 55%; left: 3%; animation: sparkle-float 3.8s ease-in-out 1.2s infinite; }
        .dw-sparkle.s4 { top: 62%; right: 5%; animation: sparkle-float 4.2s ease-in-out 1.8s infinite; }
        @media (max-width: 900px) { .dw-sparkle { display: none; } }
      `}</style>

      <div style={topBarStyle}><Lockup /></div>

      {/* HERO */}
      <section style={heroStyle}>
        <svg className="dw-sparkle s1" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={ORANGE}/></svg>
        <svg className="dw-sparkle s2" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={COBALT}/></svg>
        <svg className="dw-sparkle s3" width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={ORANGE}/></svg>
        <svg className="dw-sparkle s4" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={COBALT}/></svg>

        <Reveal><span style={heroKickerStyle}><Sparkles size={14} /> A Wichita Movement</span></Reveal>
        <Reveal as="h1" delay={80} style={heroTitleStyle}>Spreading <span style={orangeAccent}>smiles.</span><br/>One duck at a time.</Reveal>
        <Reveal as="p" delay={140} style={heroSubStyle}>DuckWichita is the strangest, smallest movement in town — and it&apos;s entirely about reminding strangers that someone in their city is rooting for them.</Reveal>
        <Reveal delay={200}>
          <div style={heroCtasStyle}>
            <a href="https://instagram.com/gvonflue" target="_blank" rel="noopener noreferrer" style={orangeBtnStyle}><Instagram size={20} /> Follow the flock</a>
            <a href="#story" style={ghostBtnStyle}>What is this?</a>
          </div>
        </Reveal>
        <Reveal delay={260}>
          <div className="duck-hero-wrap" style={heroDuckWrapStyle}>
            <img src="/images/duck.jpg" alt="A DuckWichita eagle-duck" style={heroDuckImgStyle} />
          </div>
        </Reveal>
      </section>

      {/* THE MANIFESTO */}
      <section style={manifestoWrapStyle} id="story">
        <Reveal><span style={{ ...sectionKickerStyle, color: ORANGE }}>The Why</span></Reveal>
        <Reveal as="h2" delay={80} style={manifestoTitleStyle}>Wichita already has enough <span style={orangeAccent}>billboards.</span></Reveal>
        <Reveal as="p" delay={140} style={manifestoCopyStyle}>What it doesn&apos;t have is enough small, random, ridiculous moments of joy between strangers.</Reveal>
        <Reveal as="p" delay={200} style={manifestoCopyStyle}>So we made some. A few hundred tiny patriotic eagle-ducks, hidden around the city, each one carrying a little secret. Find one, smile, and you&apos;re part of something.</Reveal>
        <Reveal as="p" delay={260} style={{ ...manifestoCopyStyle, color: ORANGE, fontWeight: 600 }}>That&apos;s it. That&apos;s the whole thing.</Reveal>
      </section>

      {/* HOW IT WORKS — vague version */}
      <section style={sectionStyle}>
        <Reveal><span style={sectionKickerStyle}>How It Works</span></Reveal>
        <Reveal as="h2" delay={60} style={sectionTitleStyle}>Find one. Smile. <span style={orangeAccent}>Pass it on.</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>There&apos;s no app to download. No subscription. No catch. Just a duck, somewhere, waiting.</Reveal>

        <div style={stepsGridStyle}>
          <Reveal delay={180}>
            <div className="step-card" style={stepCardStyle}>
              <div style={stepNumStyle}>1</div>
              <h3 style={stepTitleStyle}>Find a duck</h3>
              <p style={stepBodyStyle}>They&apos;re hidden across Wichita — on benches, by storefronts, near coffee shops, on hiking trails. If you spot one, it&apos;s yours.</p>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div className="step-card" style={stepCardStyle}>
              <div style={stepNumStyle}>2</div>
              <h3 style={stepTitleStyle}>Smile</h3>
              <p style={stepBodyStyle}>That&apos;s the whole point. A small reminder that someone in this city built something specifically to make a stranger&apos;s day a little better.</p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="step-card" style={stepCardStyle}>
              <div style={stepNumStyle}>3</div>
              <h3 style={stepTitleStyle}>Pass it on</h3>
              <p style={stepBodyStyle}>Keep it. Hide it again somewhere new. Give it to a friend. The duck moves how it wants to move — that&apos;s how the flock grows.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FLOCK IN ACTION — gallery placeholder */}
      <section style={sectionStyle}>
        <Reveal><span style={sectionKickerStyle}>The Flock In Action</span></Reveal>
        <Reveal as="h2" delay={60} style={sectionTitleStyle}>Recent <span style={orangeAccent}>finds.</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>Real Wichitans, real ducks, real smiles. Tag <strong>#DuckWichita</strong> on Instagram and you might end up here.</Reveal>

        <div style={galleryGridStyle}>
          <Reveal delay={180}><div style={galleryCardStyle}>#DuckWichita</div></Reveal>
          <Reveal delay={220}><div style={galleryCardStyle}>#DuckWichita</div></Reveal>
          <Reveal delay={260}><div style={galleryCardStyle}>#DuckWichita</div></Reveal>
          <Reveal delay={300}><div style={galleryCardStyle}>#DuckWichita</div></Reveal>
          <Reveal delay={340}><div style={galleryCardStyle}>#DuckWichita</div></Reveal>
          <Reveal delay={380}><div style={galleryCardStyle}>#DuckWichita</div></Reveal>
        </div>

        <Reveal delay={440}>
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <a href="https://instagram.com/gvonflue" target="_blank" rel="noopener noreferrer" style={orangeBtnStyle}><Instagram size={20} /> See more on Instagram</a>
          </div>
        </Reveal>
      </section>

      {/* WINNER SPOTLIGHT — placeholder for now */}
      <section style={sectionStyle}>
        <Reveal><span style={sectionKickerStyle}>Last Month&apos;s Spotlight</span></Reveal>
        <Reveal as="h2" delay={60} style={sectionTitleStyle}>The flock <span style={orangeAccent}>gives back.</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>Every month, someone in the flock wins something cool — local prizes, experiences, gift cards, tickets. Past winners live here.</Reveal>

        <Reveal delay={180}>
          <div style={winnerWrapStyle}>
            <span style={winnerBadgeStyle}>🦆 Coming June 30</span>
            <h3 style={winnerTitleStyle}>Our first winner is on the way.</h3>
            <p style={winnerCopyStyle}>The first DuckWichita drawing happens on June 30. We&apos;ll feature the winner — and the prize — right here. Follow along on Instagram to find out who.</p>
          </div>
        </Reveal>
      </section>

      {/* SPONSOR SECTION */}
      <section style={sponsorWrapStyle}>
        <Reveal><span style={sponsorKickerStyle}>For local businesses</span></Reveal>
        <Reveal as="h2" delay={60} style={sponsorTitleStyle}>Be part of <span style={{ color: INK }}>the flock.</span></Reveal>
        <Reveal as="p" delay={120} style={sponsorCopyStyle}>Local restaurants, coffee shops, gyms, boutiques, services, and event spaces can sponsor a month, donate a prize, or just host a duck. It&apos;s low-key, real, and connects you to the actual people of this city.</Reveal>
        <Reveal delay={180}>
          <a href="mailto:gvonflue@gmail.com?subject=DuckWichita Sponsor Inquiry" style={whiteBtnStyle}>Become a sponsor <ArrowUpRight size={20} /></a>
        </Reveal>
      </section>

      {/* WHO'S BEHIND IT */}
      <section style={sectionStyle}>
        <div style={garrettWrapStyle}>
          <Reveal><span style={sectionKickerStyle}>Who&apos;s Behind It</span></Reveal>
          <Reveal as="h2" delay={60} style={sectionTitleStyle}>One guy. <span style={orangeAccent}>One city.</span> A lot of ducks.</Reveal>
          <Reveal as="p" delay={120} style={{ ...ledeStyle, margin: "0 auto 24px" }}>DuckWichita was started by Garrett Von Flue — a Wichita Realtor who wanted to do something for the city that wasn&apos;t a billboard, a yard sign, or a sales pitch.</Reveal>
          <Reveal as="p" delay={180} style={{ ...ledeStyle, margin: "0 auto 32px" }}>If you&apos;ve ever thought about buying or selling a home in Wichita, or just want to see what he&apos;s about, come hang out on his site for a minute.</Reveal>
          <Reveal delay={240}>
            <p style={garrettSigStyle}>— Garrett Von Flue</p>
            <p style={garrettSubStyle}>REALTOR® · Real Broker LLC · Wichita, KS</p>
            <a href="https://gvonflue.vercel.app" style={orangeBtnStyle}>Meet Garrett <ArrowUpRight size={20} /></a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
