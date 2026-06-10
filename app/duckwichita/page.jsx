"use client";

import { useState } from "react";
import Lockup from "@/components/Lockup";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, Instagram, Sparkles } from "lucide-react";

const FORM_KEY = "e87c5fc0-d3e8-47e8-a1ab-5be73241a042";

export default function DuckWichita() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    formData.append("access_key", FORM_KEY);
    formData.append("subject", "🦆 New DuckWichita Giveaway Entry");
    formData.append("from_name", "DuckWichita Site");

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const pageStyle = { background: "linear-gradient(180deg, #FFF9EC 0%, #FFFFFF 35%)", minHeight: "100vh", color: "var(--ink)" };
  const topBarStyle = { padding: "28px 24px", display: "flex", justifyContent: "center" };
  const heroStyle = { padding: "40px 24px 80px", textAlign: "center", maxWidth: "1100px", margin: "0 auto" };
  const heroKickerStyle = { display: "inline-flex", alignItems: "center", gap: "10px", padding: "8px 18px", background: "rgba(231,181,60,.15)", borderRadius: "999px", color: "var(--cobalt)", fontFamily: "var(--disp)", fontSize: ".85rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "24px" };
  const heroTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.8rem, 7vw, 5.6rem)", lineHeight: 0.95, letterSpacing: "-.02em", margin: "0 0 24px", color: "var(--ink)" };
  const goldAccent = { color: "var(--gold)" };
  const heroSubStyle = { fontSize: "1.25rem", lineHeight: 1.55, color: "var(--muted)", maxWidth: "640px", margin: "0 auto 40px" };
  const heroCtasStyle = { display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginBottom: "56px" };
  const duckFrameStyle = { maxWidth: "420px", margin: "0 auto", aspectRatio: "1/1", borderRadius: "28px", background: "linear-gradient(135deg, #1338DE 0%, #0A0B14 100%)", overflow: "hidden", boxShadow: "0 20px 50px rgba(11,30,138,.2)", position: "relative" };
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
  const successStyle = { textAlign: "center", padding: "32px 0" };
  const successTitleStyle = { fontFamily: "var(--disp)", fontSize: "2rem", margin: "0 0 12px", color: "var(--ink)" };
  const flockBtnsStyle = { display: "flex", gap: "14px", marginTop: "32px", flexWrap: "wrap" };
  const sponsorKickerStyle = { color: "var(--gold)", fontFamily: "var(--disp)", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", fontSize: ".85rem" };
  const sponsorTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2rem, 5vw, 3.4rem)", margin: "20px 0 24px", lineHeight: 1.05, color: "#fff" };
  const sponsorCopyStyle = { maxWidth: "640px", margin: "0 auto 32px", fontSize: "1.15rem", lineHeight: 1.6, color: "rgba(255,255,255,.75)" };
  const sigNameStyle = { fontFamily: "var(--disp)", fontWeight: 600, color: "var(--cobalt)", fontSize: "1.1rem", margin: 0 };
  const sigSubStyle = { color: "var(--muted)", margin: "4px 0 0", fontSize: ".95rem" };
  const faqQuestionStyle = { fontFamily: "var(--disp)", fontSize: "1.15rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 8px" };
  const faqAnswerStyle = { color: "var(--muted)", margin: 0, lineHeight: 1.6 };

  const faqs = [
    { q: "Is this a real giveaway?", a: "100% real. One person from the flock wins a local prize every month. No tricks, no purchase, no kidding." },
    { q: "What if I don't win the first month?", a: "You're still in. Once you enter, your name stays in the flock for 2 full years — that's 24 drawings. Every month's winner is pulled from everyone who's ever entered. Best move: follow @gvonflue on Instagram so you'll see the second your name comes up." },
    { q: "Do I need to buy or sell a home?", a: "Nope. You can be 'just here for the duck' on the form and still win. The real estate stuff is just what I do for a living." },
    { q: "Can I duck someone else?", a: "Absolutely. If you want to pass yours along, do it. The duck moves how it wants to move." },
    { q: "Can businesses participate?", a: "Yes — local businesses can sponsor a month, contribute a prize, or just get featured. Hit the sponsor button above." },
    { q: "Who created DuckWichita?", a: "A guy named Garrett. I'm a Realtor here in Wichita. I wanted to do something for the city that wasn't a billboard. This is that." },
  ];

  return (
    <main style={pageStyle}>
      <div style={topBarStyle}><Lockup /></div>

      {/* HERO */}
      <section style={heroStyle}>
        <Reveal><span style={heroKickerStyle}><Sparkles size={14} /> Wichita, KS</span></Reveal>
        <Reveal as="h1" delay={80} style={heroTitleStyle}>You&apos;ve Been <span style={goldAccent}>Ducked</span>, Wichita.</Reveal>
        <Reveal as="p" delay={140} style={heroSubStyle}>Somewhere out there, a tiny patriotic eagle-duck chose you. Now you&apos;re part of the flock.</Reveal>
        <Reveal delay={200}>
          <div style={heroCtasStyle}>
            <a href="#enter" className="btn btn-gold btn-lg">Enter The Giveaway <ArrowUpRight size={20} /></a>
            <a href="#what" className="btn btn-ghost btn-lg">What Is DuckWichita?</a>
          </div>
        </Reveal>
        <Reveal delay={260}>
          <div style={duckFrameStyle}>
            <img src="/images/duck.jpg" alt="The DuckWichita eagle-duck" style={duckImgStyle} />
          </div>
        </Reveal>
      </section>

      {/* WHAT JUST HAPPENED */}
      <section style={sectionStyle} id="what">
        <Reveal as="span" className="section-kicker">02 — How it works</Reveal>
        <Reveal as="h2" delay={60} className="section-title">So... what just <span style={goldAccent}>happened?</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>You found one of the DuckWichita eagle-ducks. No catch. No weird sales pitch. Just a random little piece of Wichita fun created to make people smile, support local businesses, and give people a chance to win cool stuff.</Reveal>
        <div style={cardsGridStyle}>
          <Reveal delay={180}>
            <div style={cardStyle}>
              <div style={cardNumStyle}>1</div>
              <h3 style={cardTitleStyle}>You Got Ducked</h3>
              <p style={cardBodyStyle}>A little eagle-duck found its way to you somewhere around Wichita. That&apos;s not random — that&apos;s the universe paying you a tiny compliment.</p>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div style={cardStyle}>
              <div style={cardNumStyle}>2</div>
              <h3 style={cardTitleStyle}>Scan The Code</h3>
              <p style={cardBodyStyle}>You scanned the QR. That&apos;s how you got here. Welcome to the flock — it&apos;s quieter than you&apos;d think.</p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div style={cardStyle}>
              <div style={cardNumStyle}>3</div>
              <h3 style={cardTitleStyle}>Enter To Win</h3>
              <p style={cardBodyStyle}>Drop your name below for monthly local prize drawings. Gift cards, dinners, experiences, the works.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GIVEAWAY ENTRY */}
      <section style={sectionStyle} id="enter">
        <Reveal as="span" className="section-kicker">03 — Enter the flock</Reveal>
        <Reveal as="h2" delay={60} className="section-title">Enter the monthly <span style={goldAccent}>DuckWichita</span> giveaway.</Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>Every month, someone from the flock wins local prizes — gift cards, experiences, event tickets, food, coffee, and whatever other fun things we can get our hands on.</Reveal>
        <div style={formCardStyle}>
          {submitted ? (
            <div style={successStyle}>
              <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🦆</div>
              <h3 style={successTitleStyle}>You&apos;re officially in the flock.</h3>
              <p style={{ color: "var(--muted)", margin: 0 }}>We&apos;ll be in touch when you win. Until then — keep an eye out for more ducks.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="botcheck" />
              <label style={labelStyle} htmlFor="first_name">First Name</label>
              <input style={inputStyle} type="text" id="first_name" name="first_name" required />
              <label style={labelStyle} htmlFor="email">Email</label>
              <input style={inputStyle} type="email" id="email" name="email" required />
              <label style={labelStyle} htmlFor="phone">Phone Number</label>
              <input style={inputStyle} type="tel" id="phone" name="phone" required />
              <label style={labelStyle} htmlFor="status">I am a...</label>
              <select style={inputStyle} id="status" name="status" required defaultValue="">
                <option value="" disabled>Pick one</option>
                <option>Homeowner</option>
                <option>Renter</option>
                <option>Thinking About Buying</option>
                <option>Thinking About Selling</option>
                <option>Just Here For The Duck</option>
              </select>
              <button type="submit" style={submitBtnStyle} disabled={submitting}>{submitting ? "Adding you..." : "Enter Me In The Flock"}</button>
              <p style={flockReassureStyle}>Enter once, stay in the flock for <strong style={{ color: "var(--ink)" }}>2 full years</strong>. Every monthly drawing pulls from the whole flock — so your name has 24 shots, not 1.</p>
            </form>
          )}
        </div>
      </section>

      {/* POST YOUR DUCK */}
      <section style={sectionStyle}>
        <Reveal as="span" className="section-kicker">04 — Spread the flock</Reveal>
        <Reveal as="h2" delay={60} className="section-title">Post your <span style={goldAccent}>duck.</span></Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>Take a photo with your eagle-duck and post it using <strong>#DuckWichita</strong>. Tag me so I can repost it — and follow <strong>@gvonflue</strong> while you&apos;re there, because that&apos;s where I announce who won each month.</Reveal>
        <Reveal delay={180}>
          <div style={flockBtnsStyle}>
            <a href="https://instagram.com/gvonflue" target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg"><Instagram size={20} /> Tag @gvonflue</a>
            <a href="https://www.facebook.com/garrettvonflue/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">Find me on Facebook</a>
          </div>
        </Reveal>
      </section>

      {/* BUSINESS SPONSORS */}
      <section style={darkSectionStyle}>
        <Reveal as="span" style={sponsorKickerStyle}>05 — For local businesses</Reveal>
        <Reveal as="h2" delay={60} style={sponsorTitleStyle}>Want your business in <span style={goldAccent}>the flock?</span></Reveal>
        <Reveal as="p" delay={120} style={sponsorCopyStyle}>DuckWichita exists to spotlight local businesses. Restaurants, coffee shops, service companies, boutiques, gyms, events, and local legends are all welcome.</Reveal>
        <Reveal delay={180}>
          <a href="mailto:gvonflue@gmail.com?subject=DuckWichita Sponsor Inquiry" className="btn btn-gold btn-lg">Become A Sponsor <ArrowUpRight size={20} /></a>
        </Reveal>
      </section>

      {/* ABOUT THE PROJECT */}
      <section style={sectionStyle}>
        <Reveal as="span" className="section-kicker">06 — The why</Reveal>
        <Reveal as="h2" delay={60} className="section-title">Why <span style={goldAccent}>DuckWichita</span> exists.</Reveal>
        <Reveal as="p" delay={120} style={ledeStyle}>I started DuckWichita because Wichita has a lot of incredible people, businesses, and small everyday moments that don&apos;t get enough credit. A tiny patriotic duck with a QR code is a goofy way to remind a stranger that someone in their city is rooting for them.</Reveal>
        <Reveal as="p" delay={180} style={{ ...ledeStyle, marginTop: "20px" }}>That&apos;s the whole thing. Make people smile. Showcase local. Hand out some prizes. If it ever stops being fun, it stops.</Reveal>
        <Reveal delay={240}>
          <div style={{ marginTop: "32px" }}>
            <p style={sigNameStyle}>— Garrett Von Flue</p>
            <p style={sigSubStyle}>REALTOR® · Real Broker LLC · Wichita, KS</p>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <Reveal as="span" className="section-kicker">07 — Common questions</Reveal>
        <Reveal as="h2" delay={60} className="section-title">Quick <span style={goldAccent}>answers.</span></Reveal>
        <div style={{ maxWidth: "780px", marginTop: "40px" }}>
          {faqs.map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={faqItemStyle}>
                <h3 style={faqQuestionStyle}>{item.q}</h3>
                <p style={faqAnswerStyle}>{item.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
