"use client";

import { useState } from "react";
import Lockup from "@/components/Lockup";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, Instagram, Sparkles, Ticket, DollarSign, Calendar, MapPin } from "lucide-react";

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
  const heroStyle = { padding: "60px 24px 100px", textAlign: "center", maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 };
  const heroKickerStyle = { display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 24px", background: "rgba(231,181,60,.18)", borderRadius: "999px", color: "var(--cobalt)", fontFamily: "var(--disp)", fontSize: ".95rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "32px", border: "1.5px solid rgba(231,181,60,.45)" };
  const heroTitleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(3.2rem, 8.5vw, 6.8rem)", lineHeight: 0.92, letterSpacing: "-.025em", margin: "0 0 28px", color: "var(--ink)", position: "relative", zIndex: 2 };
  const goldAccent = { color: "var(--gold)" };
  const heroSubStyle = { fontSize: "1.35rem", lineHeight: 1.5, color: "var(--muted)", maxWidth: "680px", margin: "0 auto 44px", position: "relative", zIndex: 2 };
  const heroCtasStyle = { display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginBottom: "60px", position: "relative", zIndex: 2 };
  const duckFrameStyle = { maxWidth: "440px", margin: "0 auto", aspectRatio: "1/1", borderRadius: "32px", background: "linear-gradient(135deg, #1338DE 0%, #0A0B14 100%)", overflow: "hidden", boxShadow: "0 30px 80px rgba(19,56,222,.35), 0 0 70px rgba(231,181,60,.25)", position: "relative", zIndex: 2 };
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

  // Prize "giant button" styles
  const prizeWrapStyle = { position: "relative", padding: "60px 24px 120px", maxWidth: "1280px", margin: "0 auto" };
  const prizeButtonStyle = { position: "relative", padding: "70px 40px 70px", borderRadius: "40px", border: "5px solid var(--gold)", background: "linear-gradient(180deg, #FFFEFA 0%, #FFF6E0 100%)", boxShadow: "0 30px 80px rgba(231,181,60,.25), 0 0 0 1px rgba(231,181,60,.1), inset 0 1px 0 rgba(255,255,255,.9)", overflow: "hidden" };
  const prizeBadgeStyle = { display: "inline-flex", alignItems: "center", gap: "12px", padding: "18px 36px", background: "var(--gold)", color: "var(--ink)", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1.2rem", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "36px", boxShadow: "0 0 0 0 rgba(231,181,60,.7)", animation: "pulse-big 2.5s infinite" };
  const prizeHeadlineStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.6rem, 6.5vw, 4.8rem)", lineHeight: 1, letterSpacing: "-.02em", margin: "0 0 20px", color: "var(--ink)", textAlign: "center" };
  const prizeSubStyle = { fontSize: "1.2rem", color: "var(--muted)", maxWidth: "640px", margin: "0 auto 48px", textAlign: "center", lineHeight: 1.5 };
  const prizeCardsStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", maxWidth: "880px", margin: "0 auto" };
  const prizeCardStyle = { background: "linear-gradient(160deg, #1338DE 0%, #0A0B14 100%)", color: "#fff", borderRadius: "24px", padding: "36px 32px", position: "relative", overflow: "hidden", boxShadow: "0 24px 60px rgba(11,30,138,.25)", border: "1px solid rgba(231,181,60,.3)" };
  const prizeIconWrapStyle = { width: "56px", height: "56px", borderRadius: "16px", background: "var(--gold)", color: "var(--ink)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" };
  const prizeCardTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.7rem", margin: "0 0 12px", color: "#fff", lineHeight: 1.15 };
  const prizeCardBodyStyle = { color: "rgba(255,255,255,.78)", margin: "0 0 16px", lineHeight: 1.55, fontSize: ".98rem" };
  const prizeCardMetaStyle = { display: "flex", alignItems: "center", gap: "8px", fontSize: ".85rem", color: "var(--gold)", fontFamily: "var(--disp)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" };
  const prizeFooterStyle = { textAlign: "center", marginTop: "48px" };
  const prizeValueLineStyle = { fontFamily: "var(--disp)", fontSize: "1.5rem", color: "var(--ink)", margin: "0 0 8px", fontWeight: 700 };
  const prizeDrawingLineStyle = { color: "var(--muted)", margin: "0 0 28px", fontSize: "1rem" };

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
      <style>{`
        @keyframes pulse-big { 0% { box-shadow: 0 0 0 0 rgba(231,181,60,.7); } 70% { box-shadow: 0 0 0 32px rgba(231,181,60,0); } 100% { box-shadow: 0 0 0 0 rgba(231,181,60,0); } }
        @keyframes arrow-bob-left { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(16px); } }
        @keyframes arrow-bob-right { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-16px); } }
        @keyframes sparkle-float { 0%, 100% { transform: translateY(0) scale(1) rotate(0deg); opacity: .5; } 50% { transform: translateY(-18px) scale(1.2) rotate(20deg); opacity: 1; } }
        @keyframes duck-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        .prize-button { transition: transform .35s ease, box-shadow .35s ease; }
        .prize-button:hover { transform: translateY(-6px); box-shadow: 0 40px 100px rgba(231,181,60,.4), 0 0 0 1px rgba(231,181,60,.2), inset 0 1px 0 rgba(255,255,255,.9); }
        .prize-arrow-left { position: absolute; left: -10px; top: 50%; transform: translateY(-50%); animation: arrow-bob-left 1.8s ease-in-out infinite; z-index: 2; }
        .prize-arrow-right { position: absolute; right: -10px; top: 50%; transform: translateY(-50%); animation: arrow-bob-right 1.8s ease-in-out infinite; z-index: 2; }
        .duck-frame-wrap { animation: duck-float 5s ease-in-out infinite; }
        .hero-sparkle { position: absolute; z-index: 0; pointer-events: none; }
        .hero-sparkle.s1 { top: 12%; left: 8%; animation: sparkle-float 4s ease-in-out 0s infinite; }
        .hero-sparkle.s2 { top: 22%; right: 10%; animation: sparkle-float 4.5s ease-in-out .6s infinite; }
        .hero-sparkle.s3 { top: 55%; left: 4%; animation: sparkle-float 3.8s ease-in-out 1.2s infinite; }
        .hero-sparkle.s4 { top: 60%; right: 6%; animation: sparkle-float 4.2s ease-in-out 1.8s infinite; }
        .hero-sparkle.s5 { top: 78%; left: 14%; animation: sparkle-float 4s ease-in-out .4s infinite; }
        .hero-sparkle.s6 { top: 82%; right: 16%; animation: sparkle-float 4.6s ease-in-out 1s infinite; }
        @media (max-width: 900px) { .prize-arrow-left, .prize-arrow-right { display: none; } .hero-sparkle { display: none; } }
      `}</style>

      <div style={topBarStyle}><Lockup /></div>

      {/* HERO — grand version */}
      <section style={heroStyle}>
        <svg className="hero-sparkle s1" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="var(--gold)"/></svg>
        <svg className="hero-sparkle s2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="var(--gold)"/></svg>
        <svg className="hero-sparkle s3" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="var(--cobalt)"/></svg>
        <svg className="hero-sparkle s4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="var(--gold)"/></svg>
        <svg className="hero-sparkle s5" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="var(--cobalt)"/></svg>
        <svg className="hero-sparkle s6" width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="var(--gold)"/></svg>

        <Reveal><span style={heroKickerStyle}><Sparkles size={16} /> Wichita, KS · The Flock</span></Reveal>
        <Reveal as="h1" delay={80} style={heroTitleStyle}>You&apos;ve Been <span style={goldAccent}>Ducked</span>, Wichita.</Reveal>
        <Reveal as="p" delay={140} style={heroSubStyle}>Somewhere out there, a tiny patriotic eagle-duck chose <strong style={{ color: "var(--ink)" }}>you</strong>. Now you&apos;re part of the flock — and there&apos;s a real prize with your name on it.</Reveal>
        <Reveal delay={200}>
          <div style={heroCtasStyle}>
            <a href="#enter" className="btn btn-gold btn-lg">Enter The Giveaway <ArrowUpRight size={20} /></a>
            <a href="#what" className="btn btn-ghost btn-lg">What Is DuckWichita?</a>
          </div>
        </Reveal>
        <Reveal delay={260}>
          <div className="duck-frame-wrap" style={duckFrameStyle}>
            <img src="/images/duck.jpg" alt="The DuckWichita eagle-duck" style={duckImgStyle} />
          </div>
        </Reveal>
      </section>

      {/* THIS MONTH'S PRIZE — GIANT BUTTON */}
      <section style={prizeWrapStyle}>
        <div className="prize-arrow-left">
          <svg width="90" height="90" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 40 L62 40 M45 22 L62 40 L45 58" stroke="var(--gold)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div className="prize-arrow-right">
          <svg width="90" height="90" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(180deg)" }}><path d="M8 40 L62 40 M45 22 L62 40 L45 58" stroke="var(--gold)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>

        <div className="prize-button" style={prizeButtonStyle}>
          <div style={{ textAlign: "center" }}>
            <Reveal><span style={prizeBadgeStyle}>🦆 June Prize</span></Reveal>
            <Reveal as="h2" delay={80} style={prizeHeadlineStyle}>A night at the <span style={goldAccent}>ballpark</span>.<br/>On the house.</Reveal>
            <Reveal as="p" delay={140} style={prizeSubStyle}>Wichita Wind Surge baseball, behind home plate, plus cash for hot dogs, beer, and whatever else makes the night perfect. This is the first DuckWichita prize and we&apos;re going big.</Reveal>
          </div>

          <Reveal delay={200}>
            <div style={prizeCardsStyle}>
              <div style={prizeCardStyle}>
                <div style={prizeIconWrapStyle}><Ticket size={28} /></div>
                <h3 style={prizeCardTitleStyle}>4 Tickets · Section A</h3>
                <p style={prizeCardBodyStyle}>Directly behind home plate. Bring the family, a date, your crew — whoever you want. Good for any Wind Surge home game this season.</p>
                <div style={prizeCardMetaStyle}><MapPin size={14} /> Equity Bank Park</div>
              </div>
              <div style={prizeCardStyle}>
                <div style={prizeIconWrapStyle}><DollarSign size={28} /></div>
                <h3 style={prizeCardTitleStyle}>$100 Cash</h3>
                <p style={prizeCardBodyStyle}>For the food, the drinks, the parking, the t-shirts off the cannon — whatever makes the night feel like a real night out.</p>
                <div style={prizeCardMetaStyle}><Sparkles size={14} /> Spend it however</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div style={prizeFooterStyle}>
              <p style={prizeValueLineStyle}>Total value: <span style={goldAccent}>$200+</span></p>
              <p style={prizeDrawingLineStyle}><Calendar size={16} style={{ display: "inline", marginRight: "6px", verticalAlign: "-3px" }} />Drawing: June 30 · Winner announced on @gvonflue</p>
              <a href="#enter" className="btn btn-gold btn-lg">Enter Now <ArrowUpRight size={20} /></a>
            </div>
          </Reveal>
        </div>
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
