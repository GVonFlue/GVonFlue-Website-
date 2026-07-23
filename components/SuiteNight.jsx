"use client";

import { useEffect, useRef, useState } from "react";

/* KNOBS · edit these, nothing else */
const SEATS_TOTAL = 19;          // public framing: "Only 19 spots"
const SEATS_TAKEN = 12;           // bump this as seats fill
const SHOW_CATERING = true;     // flip to true to show the catering card (06) in the value stack
const WEB3FORMS_KEY = "e87c5fc0-d3e8-47e8-a1ab-5be73241a042";
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwmN-Ay_a19_I5qKMWGEDw4p9OLKPttyzVDrkQe2EF0oa3xZtU6d8TcctCsKLdRK-1L/exec";

const SPOTS_LEFT = Math.max(SEATS_TOTAL - SEATS_TAKEN, 0);

const ROLES = ["Realtor", "Business owner", "Lender / Mortgage", "Other"];

const MARQUEE = [
  "20 IN THE ROOM",
  "ONE REAL HOUR",
  "PRIVATE SUITE 5",
  "FIRST PITCH 7:05",
  "NO PITCH",
  "NO SUIT",
];

/* Host brands · shown top right of the hero */
const HOST_BRANDS = [
  { name: "GVonFlue Real Estate", logo: "/logos/gvonflue-logo.png", url: "https://gvonflue.vercel.app" },
  { name: "ProyTech", logo: "/logos/proytech-logo.png", url: "https://getproytech.com" },
];

/* Catering sponsors · flip an "open" slot to a filled one by adding name + logo + url */
const DM_URL = "https://instagram.com/gvonflue"; // where "DM to claim" / "Click to claim" points
const CATERING_SPONSORS = [
  { name: "Adeas Printing", logo: "/logos/adeaslogo.png", url: "https://www.adeasprinting.com/", open: false },
  { name: "Kihle Roofing", logo: "/logos/kihlelogo.png", url: "https://kihleroofing.com", open: false },
  { name: "Cruise Made EASY", logo: "/logos/cruisemadeeasylogo.png", url: "https://cruisemadeeasy.com", open: false },
];

const STACK = [
  {
    n: "01",
    t: "One real hour",
    d: "A curated room of 20 Wichita realtors and business owners. Not a card swap. Not a mixer. Twenty people who actually want to know each other.",
  },
  {
    n: "02",
    t: "The game from Suite 5",
    d: "Private suite at Equity Bank Park with the Wichita Wind Surge. Your seat is covered for the night.",
  },
  {
    n: "03",
    t: "A live talk from me",
    d: "Third inning, we step inside. How I have grown through community and relationships, plus real AI integration moves you can put to work in your own business.",
  },
  {
    n: "04",
    t: "Professional photos",
    d: "A group photo in the suite, then an on field photo after the game. Shot by the Wind Surge team photographer.",
  },
  {
    n: "05",
    t: "Something I am not announcing yet",
    d: "There is more to this night than networking. You will find out in the suite.",
    teaser: true,
  },
];

const CATERING = {
  n: "06",
  t: "Catering provided",
  d: "Eat well while you meet well. Covered for the night by our sponsors.",
  sponsors: true,
};

const WHO = [
  "You are a Wichita realtor who is tired of pretending mixers work",
  "You own a business here and you want to know the people who move this city",
  "You are a lender, a builder, a title rep, a creator building something real",
  "You would rather have three real conversations than thirty polite ones",
  "You are curious what AI can actually do for a business your size",
];

const FAQ = [
  {
    q: "What is actually included?",
    a: "Your seat in the private suite for the whole game, the networking hour before first pitch, the live talk, catered access to the suite, and professional photos. You show up, that is it.",
  },
  {
    q: "What does it cost?",
    a: "There is a small cover to join. You will see the exact amount on the reserve form before you submit anything, so nothing about this is a surprise. This is not a profit event and it never will be.",
  },
  {
    q: "Do I pay on this page?",
    a: "No. You reserve here. I text you to confirm the seat and send a simple payment link. The seat is locked once payment lands. That is the only reason payment exists, so the 20 people who said yes actually show up.",
  },
  {
    q: "What is the timing?",
    a: "Networking runs about 6:00 to 7:00 PM. First pitch is 7:05 PM. The talk happens during the third inning. Stay as long as you want after.",
  },
  {
    q: "Am I going to get pitched?",
    a: "No pitch. Even if we never work together. I am not selling you real estate and I am not selling you software. I am building a room.",
  },
  {
    q: "What do I wear?",
    a: "No suit. It is a baseball game. Come as the version of you that people actually like.",
  },
];

/* Scroll reveal */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".sn-reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("sn-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("sn-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* Count up */
function CountUp({ to }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const run = () => {
      const start = performance.now();
      const dur = 900;
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(to * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return <span ref={ref}>{n}</span>;
}

/* FAQ row */
function FaqRow({ q, a, open, onToggle }) {
  return (
    <div className={`sn-faq-row ${open ? "sn-faq-open" : ""}`}>
      <button className="sn-faq-q" onClick={onToggle} aria-expanded={open}>
        <span>{q}</span>
        <i className="sn-faq-plus" aria-hidden="true" />
      </button>
      <div className="sn-faq-a">
        <p>{a}</p>
      </div>
    </div>
  );
}

/* Page */
export default function SuiteNight() {
  useReveal();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    role: "",
    roleOther: "",
    referral: "",
  });
  const [status, setStatus] = useState("idle");
  const [err, setErr] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const scrollToForm = () => {
    document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" });
  };

  async function submit(e) {
    e.preventDefault();
    setErr("");

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.role) {
      setErr("Name, email, phone and role are required.");
      return;
    }
    if (form.role === "Other" && !form.roleOther.trim()) {
      setErr("Tell me what you do and I will get you in the right seat.");
      return;
    }

    setStatus("sending");

    const role = form.role === "Other" ? form.roleOther.trim() : form.role;
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      business: form.business.trim(),
      role,
      referral: form.referral.trim(),
      source: "suitenight",
      submittedAt: new Date().toISOString(),
    };

    if (APPS_SCRIPT_URL && !APPS_SCRIPT_URL.startsWith("PASTE_")) {
      fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "🎟️ New Suite Night Reservation",
          from_name: "Suite Night · GVonFlue x ProyTech",
          ...payload,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Submit failed");
      setStatus("done");
      window.plausible?.("SuiteNight Reserve");
      setTimeout(() => {
        document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 60);
    } catch (e2) {
      console.error("Suite Night submit error:", e2);
      setStatus("error");
      setErr("That did not go through. Text me at 901.335.3905 and I will hold the seat.");
    }
  }

  const stack = SHOW_CATERING ? [...STACK, CATERING] : STACK;

  return (
    <main className="sn">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* HERO */}
      <section className="sn-hero">
        <div className="sn-photo" />
        <div className="sn-shade" />
        <div className="sn-grain" />

        <div className="sn-hero-inner">
          <div className="sn-hero-grid">
            <div className="sn-hero-main">
              <div className="sn-eyebrow">
                <i className="sn-dot" />
                Wichita · August 12 · 2026
              </div>

              <h1 className="sn-h1">
                A Networking Event
                <br />
                Like You’ve <em>Never Seen</em>.
              </h1>

              <p className="sn-hero-sub">
                Twenty people. One private suite. One real hour before first pitch.
                <span className="sn-hl"> </span>
              </p>

              <div className="sn-hero-cta">
                <button className="sn-btn sn-btn-orange" onClick={scrollToForm}>
                  Reserve your spot
                </button>
                <div className="sn-seats-pill">
                  <strong>{SPOTS_LEFT}</strong>
                  <span>
                    of {SEATS_TOTAL} spots
                    <br />
                    still open
                  </span>
                </div>
              </div>
            </div>

            <aside className="sn-side">
              {/* Brand plate · top right */}
              <div className="sn-brought sn-brand-panel">
                <p className="sn-brought-label">Brought to you by</p>
                <div className="sn-plate">
                  {HOST_BRANDS.map((b, i) => (
                    <div className="sn-plate-item" key={b.name}>
                      {i > 0 && <i className="sn-plate-div" />}
                      <a href={b.url} target="_blank" rel="noopener noreferrer" aria-label={b.name}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={b.logo} alt={b.name} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Catering sponsors · bottom right */}
              <div className="sn-brought sn-cater-panel">
                <p className="sn-brought-label">Catering brought to you by</p>
                <div className="sn-cater-grid">
                  {CATERING_SPONSORS.map((s, i) =>
                    s.open ? (
                      <a
                        key={i}
                        className="sn-cater-slot sn-cater-open"
                        href={DM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="sn-cater-open-tag">Open</span>
                        <span className="sn-cater-open-cta">DM to claim</span>
                      </a>
                    ) : (
                      <a
                        key={i}
                        className="sn-cater-slot sn-cater-filled"
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.logo} alt={s.name} />
                      </a>
                    )
                  )}
                </div>
              </div>
            </aside>
          </div>

          <div className="sn-bubble">
            <div className="sn-bub-cell sn-bub-venue">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/windsurge-logo.png" alt="Wichita Wind Surge" />
              <div>
                <span>Where</span>
                <strong>Suite 5 · Equity Bank Park</strong>
              </div>
            </div>
            <div className="sn-bub-cell">
              <span>Networking</span>
              <strong>6:00 to 7:00 PM</strong>
            </div>
            <div className="sn-bub-cell">
              <span>First pitch</span>
              <strong>7:05 PM</strong>
            </div>
            <div className="sn-bub-cell">
              <span>Cover</span>
              <strong>Just a small cover to join</strong>
            </div>
          </div>
        </div>

        <div className="sn-marquee">
          <div className="sn-track">
            {[0, 1].map((dup) => (
              <div className="sn-track-half" key={dup} aria-hidden={dup === 1}>
                {MARQUEE.map((m, i) => (
                  <span key={i}>
                    {m}
                    <i>✦</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT THIS IS */}
      <section className="sn-what">
        <div className="sn-what-glow" />
        <div className="sn-wrap">
          <span className="sn-kicker sn-reveal">01 · What this actually is</span>
          <h2 className="sn-what-h sn-reveal">
            This is not a<br />
            <s>business card swap.</s>
          </h2>

          <div className="sn-chips sn-reveal">
            <span>20 seats</span>
            <span>1 real hour</span>
            <span>9 innings</span>
            <span>0 pitches</span>
          </div>

          <div className="sn-what-grid">
            <p className="sn-lede sn-reveal">
              I got tired of walking into rooms of a hundred people and leaving with a hundred cards
              and zero relationships. So I built the opposite.
            </p>
            <p className="sn-body sn-reveal">
              Twenty of us. A curated room of Wichita realtors and business owners. One hour where
              the only job is to actually meet each other. Then we take the game from a private
              suite, and during the third inning we step inside and I talk about the thing nobody
              teaches you: how community and relationships built my business, and the real AI
              integration moves you can walk out with and use.
              <br />
              <br />
              There is also more to this night than networking. I am not telling you what yet. You
              will find out in the suite.
            </p>
          </div>
        </div>
      </section>

      {/* VALUE STACK */}
      <section className="sn-stack">
        <div className="sn-wrap">
          <span className="sn-kicker sn-kicker-orange sn-reveal">02 · What you get</span>
          <h2 className="sn-h2 sn-h2-light sn-reveal">Everything in the room.</h2>

          <div className="sn-cards">
            {stack.map((s, i) => (
              <article
                key={s.n}
                className={`sn-card sn-reveal ${i % 2 === 0 ? "sn-card-blue" : "sn-card-orange"}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="sn-card-n">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                {s.teaser && <span className="sn-card-tag">Live reveal</span>}
                {s.sponsors && (
                  <div className="sn-card-logos">
                    {CATERING_SPONSORS.map((sp, k) =>
                      sp.open ? (
                        <span key={k} className="sn-card-logo sn-card-logo-open">
                          Open
                        </span>
                      ) : (
                        <span key={k} className="sn-card-logo">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={sp.logo} alt={sp.name} />
                        </span>
                      )
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR */}
      <section className="sn-who">
        <div className="sn-wrap">
          <span className="sn-kicker sn-reveal">03 · Who is in the room</span>
          <h2 className="sn-h2 sn-reveal">Twenty people. Chosen on purpose.</h2>

          <div className="sn-who-grid">
            {WHO.map((w, i) => (
              <div className="sn-who-card sn-reveal" key={i} style={{ transitionDelay: `${i * 50}ms` }}>
                <i>✓</i>
                <p>{w}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATERING SPONSORS */}
      <section className="sn-sponsors">
        <div className="sn-wrap">
          <span className="sn-kicker sn-kicker-orange sn-reveal">Catering provided by</span>
          <h2 className="sn-h2 sn-reveal">The people making the food happen.</h2>
          <div className="sn-sponsor-grid">
            {CATERING_SPONSORS.map((s, i) => (
              <div className="sn-sponsor-card sn-reveal" key={i} style={{ transitionDelay: `${i * 70}ms` }}>
                {s.open ? (
                  <>
                    <div className="sn-sponsor-logo sn-sponsor-logo-open">
                      <span>Open Spot</span>
                    </div>
                    <a
                      className="sn-sponsor-link sn-sponsor-link-open"
                      href={DM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click to claim →
                    </a>
                  </>
                ) : (
                  <>
                    <div className="sn-sponsor-logo">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.logo} alt={s.name} />
                    </div>
                    <a
                      className="sn-sponsor-link"
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit {s.name} →
                    </a>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCARCITY */}
      <section className="sn-scarcity">
        <div className="sn-wrap sn-reveal">
          <div className="sn-count">
            <CountUp to={SPOTS_LEFT} />
          </div>
          <div className="sn-count-copy">
            <h3>Only {SEATS_TOTAL} spots.</h3>
            <p>
              Twenty seats in the suite. One of them is mine. When they are gone, they are gone, and
              I am not adding chairs.
            </p>
            <button className="sn-btn sn-btn-ink" onClick={scrollToForm}>
              Take one of them
            </button>
          </div>
        </div>
      </section>

      {/* RESERVE */}
      <section className="sn-reserve" id="reserve">
        <div className="sn-wrap">
          <div className="sn-reserve-grid">
            <div className="sn-reserve-copy sn-reveal">
              <span className="sn-kicker sn-kicker-orange">04 · Reserve</span>
              <h2 className="sn-h2 sn-h2-light">Grab your seat.</h2>
              <p>
                Straight talk, because you deserve it before you type anything:{" "}
                <strong>$60 reserves your seat.</strong> That covers your spot in the suite for the
                night and everything that comes with it.
              </p>
              <p className="sn-small">
                You are not paying on this page. Fill this out, I text you to confirm the seat and
                send a simple payment link. The seat is only locked once payment is in. That is how I
                keep twenty yeses into twenty people who actually show up.
              </p>
              <div className="sn-badge-row">
                <span>Reserve now</span>
                <i>→</i>
                <span>I text you</span>
                <i>→</i>
                <span>Pay · seat locked</span>
              </div>
            </div>

            <div className="sn-form-card sn-reveal">
              {status === "done" ? (
                <div className="sn-success">
                  <div className="sn-success-mark">✓</div>
                  <h3>Seat held. Now watch your phone.</h3>
                  <p>You are on the list, {form.name.split(" ")[0]}. Here is what happens next.</p>
                  <ol>
                    <li>
                      <strong>I text you.</strong> From my real number, usually within a few hours.
                    </li>
                    <li>
                      <strong>I send a simple payment link.</strong> $60 reserves your seat in the
                      suite.
                    </li>
                    <li>
                      <strong>Payment lands, seat is locked.</strong> You get the full rundown and
                      parking details a few days out.
                    </li>
                  </ol>
                  <p className="sn-small">
                    If you do not hear from me by tomorrow, text 901.335.3905 and I will fix it.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h3>Reserve your spot</h3>
                  <p className="sn-form-note">$60 reserves your seat · payment comes by text</p>

                  <label>
                    Full name <b>*</b>
                    <input value={form.name} onChange={set("name")} placeholder="Jordan Reyes" />
                  </label>

                  <label>
                    Email <b>*</b>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@email.com"
                    />
                  </label>

                  <label>
                    Phone <b>*</b>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="316.555.0134"
                    />
                    <small>This is how I confirm your seat, so make it the one you answer.</small>
                  </label>

                  <label>
                    Business or brokerage
                    <input
                      value={form.business}
                      onChange={set("business")}
                      placeholder="Real Broker LLC"
                    />
                  </label>

                  <label>
                    What do you do? <b>*</b>
                    <select value={form.role} onChange={set("role")}>
                      <option value="">Pick one</option>
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </label>

                  {form.role === "Other" && (
                    <label>
                      Tell me what you do
                      <input
                        value={form.roleOther}
                        onChange={set("roleOther")}
                        placeholder="Videographer, contractor, founder..."
                      />
                    </label>
                  )}

                  <label>
                    Who sent you, or how did you find this?
                    <input value={form.referral} onChange={set("referral")} placeholder="Optional" />
                  </label>

                  {err && <div className="sn-err">{err}</div>}

                  <button
                    className="sn-btn sn-btn-orange sn-btn-block"
                    type="submit"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Holding your seat..." : "Reserve my spot"}
                  </button>

                  <p className="sn-fine">
                    Reserving does not charge you. I text to confirm before any money moves.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* HOST */}
      <section className="sn-host">
        <div className="sn-wrap">
          <div className="sn-host-grid">
            <div className="sn-host-copy sn-reveal">
              <span className="sn-kicker">05 · Who is hosting</span>
              <h2 className="sn-h2">I am the guy who shows up.</h2>
              <p>
                I am Garrett Von Flue. REALTOR® with Real Broker LLC, co CEO of ProyTech, and the guy
                hiding hundreds of rubber ducks across Wichita because I would rather build an
                audience than rent one.
              </p>
              <p>
                I have guided 75 plus families home. I built an AI system that answers every lead in
                seconds because I got tired of chasing my tail, and then others started asking
                me to build theirs. Everything I have that works came from a relationship first, not
                a transaction first.
              </p>
              <p className="sn-host-line">
                That is the whole reason this night exists. No pitch. Even if we never work together.
              </p>
            </div>

            <div className="sn-host-panel sn-reveal">
              <div className="sn-panel-glow" />
              <div className="sn-stat">
                <strong>75+</strong>
                <span>families guided home</span>
              </div>
              <div className="sn-stat">
                <strong>200</strong>
                <span>ducks hidden across Wichita</span>
              </div>
              <div className="sn-stat">
                <strong>20</strong>
                <span>seats in the room on August 12</span>
              </div>
              <div className="sn-panel-tags">
                <span>Real Broker LLC</span>
                <span>ProyTech</span>
                <span>DuckWichita</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sn-faq">
        <div className="sn-wrap">
          <span className="sn-kicker sn-reveal">06 · Before you ask</span>
          <h2 className="sn-h2 sn-reveal">The honest answers.</h2>
          <div className="sn-faq-list sn-reveal">
            {FAQ.map((f, i) => (
              <FaqRow
                key={f.q}
                q={f.q}
                a={f.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="sn-final">
        <div className="sn-wrap sn-reveal">
          <h2>
            {SPOTS_LEFT} seats left.
            <br />
            <em>August 12.</em>
          </h2>
          <p>Comment SUITE, or just take the seat now.</p>
          <button className="sn-btn sn-btn-orange sn-btn-lg" onClick={scrollToForm}>
            Reserve your spot
          </button>
        </div>
      </section>

      {/* STICKY BAR */}
      {status !== "done" && (
        <div className={`sn-bar ${showBar ? "sn-bar-in" : ""}`}>
          <span>
            <strong>{SPOTS_LEFT}</strong> spots left · Aug 12
          </span>
          <button className="sn-btn sn-btn-orange sn-btn-sm" onClick={scrollToForm}>
            Reserve
          </button>
        </div>
      )}
    </main>
  );
}

const CSS = `
.sn{--o:#FF6B35;--o-deep:#E4551F;--cream:#FBF6EA;--blue-lite:#5B7BFF;font-family:var(--body);background:var(--white);overflow-x:clip}
.sn-wrap{max-width:1180px;margin:0 auto;padding:0 28px;position:relative;z-index:2}
.sn-reveal{opacity:0;transform:translateY(28px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}
.sn-reveal.sn-in{opacity:1;transform:none}
.nav:not(.nav-solid) .nav-links a{color:#fff}
.nav:not(.nav-solid) .nav-links a:hover{color:var(--o)}
.nav:not(.nav-solid) .nav-toggle{color:#fff}
.nav:not(.nav-solid) .brandlogo,.nav:not(.nav-solid) .brokerlogo{filter:brightness(0) invert(1)}
.nav:not(.nav-solid) .divider{background:rgba(255,255,255,.28)}
.sn-h2{font-family:var(--disp);font-weight:600;letter-spacing:-.02em;line-height:1.02;font-size:clamp(2rem,4vw,3.4rem);color:var(--ink);margin:14px 0 0}
.sn-h2-light{color:#fff}
.sn-kicker{display:inline-block;font-weight:700;font-size:.78rem;letter-spacing:.2em;text-transform:uppercase;color:var(--cobalt)}
.sn-kicker-orange{color:var(--o)}
.sn-btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;font-family:var(--body);font-weight:700;font-size:1rem;line-height:1;border:none;border-radius:999px;cursor:pointer;padding:1.05rem 1.8rem;transition:.24s ease;white-space:nowrap}
.sn-btn-orange{background:var(--o);color:#fff;box-shadow:0 10px 30px rgba(255,107,53,.4)}
.sn-btn-orange:hover{background:var(--o-deep);transform:translateY(-2px);box-shadow:0 16px 44px rgba(255,107,53,.55)}
.sn-btn-orange:disabled{opacity:.6;cursor:wait;transform:none}
.sn-btn-ink{background:var(--ink);color:#fff}
.sn-btn-ink:hover{transform:translateY(-2px)}
.sn-btn-block{width:100%}
.sn-btn-lg{padding:1.2rem 2.4rem;font-size:1.1rem}
.sn-btn-sm{padding:.7rem 1.25rem;font-size:.9rem}

.sn-hero{position:relative;padding:190px 0 0;overflow:hidden;background:var(--ink)}
.sn-photo{position:absolute;inset:0;z-index:0;background:url("/ballpark-hero.png") center 30% / cover no-repeat;transform:scale(1.06);animation:sn-drift 26s ease-in-out infinite alternate}
@keyframes sn-drift{to{transform:scale(1.13) translate3d(0,-14px,0)}}
.sn-shade{position:absolute;inset:0;z-index:1;background:linear-gradient(100deg,rgba(10,11,20,.96) 0%,rgba(10,11,20,.88) 38%,rgba(10,11,20,.55) 64%,rgba(19,56,222,.42) 86%,rgba(255,107,53,.30) 100%)}
.sn-shade:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,11,20,.55) 0%,transparent 26%,transparent 70%,rgba(10,11,20,.85) 100%)}
.sn-grain{position:absolute;inset:0;z-index:2;opacity:.06;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.sn-hero-inner{position:relative;z-index:3;max-width:1180px;margin:0 auto;padding:0 28px}
.sn-hero-grid{display:grid;grid-template-columns:1.4fr .6fr;gap:48px;align-items:stretch}
.sn-hero-main{display:flex;flex-direction:column;justify-content:flex-end}
.sn-side{display:flex;flex-direction:column;justify-content:space-between;gap:28px}
.sn-eyebrow{display:inline-flex;align-self:flex-start;align-items:center;gap:9px;font-weight:700;font-size:.78rem;letter-spacing:.18em;text-transform:uppercase;color:#fff;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.20);backdrop-filter:blur(8px);padding:.55rem 1rem;border-radius:999px}
.sn-dot{width:7px;height:7px;border-radius:50%;background:var(--o);box-shadow:0 0 0 4px rgba(255,107,53,.28);animation:sn-pulse 2s ease-in-out infinite}
@keyframes sn-pulse{50%{box-shadow:0 0 0 9px rgba(255,107,53,0)}}
.sn-h1{font-family:var(--disp);font-weight:600;letter-spacing:-.03em;line-height:.96;font-size:clamp(2.6rem,6.2vw,5.6rem);color:#fff;margin:22px 0 0;text-shadow:0 4px 40px rgba(0,0,0,.5)}
.sn-h1 em{font-style:normal;color:var(--blue-lite)}
.sn-hero-sub{font-size:clamp(1.02rem,1.4vw,1.25rem);line-height:1.55;color:rgba(255,255,255,.66);margin:24px 0 0;max-width:46ch}
.sn-hl{color:#fff;font-weight:700}
.sn-hero-cta{display:flex;align-items:center;gap:20px;margin:34px 0 0;flex-wrap:wrap}
.sn-seats-pill{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.20);backdrop-filter:blur(10px);border-radius:16px;padding:.7rem 1.1rem}
.sn-seats-pill strong{font-family:var(--disp);font-size:2rem;color:var(--o);line-height:1}
.sn-seats-pill span{font-size:.72rem;line-height:1.25;color:rgba(255,255,255,.7);font-weight:600;text-transform:uppercase;letter-spacing:.08em}

.sn-brought{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(12px);border-radius:20px;padding:20px;text-align:center}
.sn-brought-label{font-size:.64rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:16px}
.sn-plate{display:flex;align-items:center;justify-content:center;gap:16px;background:#fff;border-radius:12px;padding:16px 14px}
.sn-plate-item{display:flex;align-items:center;gap:16px}
.sn-plate a{display:flex;align-items:center;transition:opacity .24s ease,transform .24s ease}
.sn-plate a:hover{opacity:.75;transform:translateY(-2px)}
.sn-plate img{height:40px;width:auto;object-fit:contain}
.sn-plate-div{width:1px;height:30px;background:rgba(10,11,20,.14);flex-shrink:0}
.sn-cater-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.sn-cater-slot{display:flex;align-items:center;justify-content:center;height:74px;border-radius:12px;padding:8px;text-decoration:none;transition:.24s ease}
.sn-cater-filled{background:#fff}
.sn-cater-filled:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(0,0,0,.3)}
.sn-cater-filled img{max-height:56px;max-width:100%;width:auto;object-fit:contain}
.sn-cater-open{flex-direction:column;gap:3px;background:rgba(255,255,255,.05);border:1.5px dashed rgba(255,255,255,.28)}
.sn-cater-open:hover{border-color:var(--o);background:rgba(255,107,53,.10);transform:translateY(-2px)}
.sn-cater-open-tag{font-family:var(--disp);font-weight:700;font-size:.86rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.85)}
.sn-cater-open-cta{font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--o);line-height:1.2}

.sn-bubble{display:grid;grid-template-columns:1.5fr 1fr 1fr 1.2fr;gap:28px;align-items:center;margin:56px 0 0;background:#fff;border:2px solid var(--cobalt);border-radius:26px;padding:26px 32px;box-shadow:0 0 0 6px rgba(19,56,222,.14),0 30px 70px rgba(0,0,0,.45)}
.sn-bub-cell span{display:block;font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);font-weight:700;margin-bottom:6px}
.sn-bub-cell strong{font-family:var(--disp);font-weight:600;font-size:1rem;color:var(--ink);line-height:1.2;display:block}
.sn-bub-venue{display:flex;align-items:center;gap:16px;border-right:1px solid rgba(10,11,20,.10);padding-right:24px}
.sn-bub-venue img{height:46px;width:auto;object-fit:contain;flex-shrink:0}

.sn-marquee{position:relative;z-index:3;margin-top:80px;background:var(--o);color:var(--ink);padding:18px 0;overflow:hidden;transform:rotate(-1.4deg) scale(1.05)}
.sn-track{display:flex;width:max-content;animation:sn-scroll 28s linear infinite}
.sn-track-half{display:flex;white-space:nowrap;font-family:var(--disp);font-weight:600;font-size:1.15rem;letter-spacing:.03em}
.sn-track-half span{padding-right:1rem;display:inline-flex;align-items:center}
.sn-track-half i{color:var(--cobalt);font-style:normal;margin:0 .5rem}
@keyframes sn-scroll{to{transform:translateX(-50%)}}

.sn-what{position:relative;padding:140px 0 120px;background:var(--cream);overflow:hidden}
.sn-what-glow{position:absolute;inset:auto -8% -30% auto;width:60%;height:80%;z-index:0;background:radial-gradient(45% 55% at 70% 40%,rgba(19,56,222,.14),transparent 70%),radial-gradient(40% 50% at 90% 80%,rgba(255,107,53,.16),transparent 70%);filter:blur(12px)}
.sn-what-h{font-family:var(--disp);font-weight:600;letter-spacing:-.03em;line-height:.98;font-size:clamp(2.3rem,5.4vw,4.6rem);color:var(--ink);margin:16px 0 0}
.sn-what-h s{text-decoration:none;position:relative;color:var(--o);white-space:nowrap}
.sn-what-h s:after{content:"";position:absolute;left:-1%;right:-1%;top:52%;height:7px;background:var(--cobalt);border-radius:4px;transform:rotate(-1.6deg)}
.sn-chips{display:flex;gap:10px;flex-wrap:wrap;margin-top:34px}
.sn-chips span{font-family:var(--disp);font-weight:600;font-size:.9rem;letter-spacing:.04em;color:var(--cobalt);background:#fff;border:1.5px solid rgba(19,56,222,.25);padding:.6rem 1.05rem;border-radius:999px;box-shadow:0 6px 18px rgba(19,56,222,.10)}
.sn-chips span:nth-child(even){color:var(--o);border-color:rgba(255,107,53,.32);box-shadow:0 6px 18px rgba(255,107,53,.12)}
.sn-what-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;margin-top:52px}
.sn-lede{font-family:var(--disp);font-weight:500;font-size:clamp(1.3rem,1.9vw,1.7rem);line-height:1.28;color:var(--ink);letter-spacing:-.01em;border-left:5px solid var(--o);padding-left:26px}
.sn-body{font-size:1.05rem;line-height:1.72;color:var(--muted)}

.sn-stack{padding:120px 0;background:var(--ink)}
.sn-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:52px}
.sn-card{border-radius:20px;padding:34px 28px 30px;transition:transform .3s ease,box-shadow .3s ease}
.sn-card-blue{background:var(--cobalt);border:2px solid var(--o);box-shadow:0 0 0 5px rgba(19,56,222,.16),0 20px 46px rgba(19,56,222,.32)}
.sn-card-blue:hover{transform:translateY(-8px);box-shadow:0 0 0 6px rgba(255,107,53,.20),0 28px 60px rgba(19,56,222,.5)}
.sn-card-blue .sn-card-n{color:var(--o)}
.sn-card-blue h3{color:#fff}
.sn-card-blue p{color:rgba(255,255,255,.78)}
.sn-card-orange{background:var(--o);border:2px solid var(--cobalt);box-shadow:0 0 0 5px rgba(255,107,53,.16),0 20px 46px rgba(255,107,53,.30)}
.sn-card-orange:hover{transform:translateY(-8px);box-shadow:0 0 0 6px rgba(19,56,222,.22),0 28px 60px rgba(255,107,53,.48)}
.sn-card-orange .sn-card-n{color:var(--ink)}
.sn-card-orange h3{color:var(--ink)}
.sn-card-orange p{color:rgba(10,11,20,.76)}
.sn-card-n{font-family:var(--disp);font-size:.85rem;font-weight:700;letter-spacing:.14em}
.sn-card h3{font-family:var(--disp);font-weight:600;font-size:1.4rem;margin:14px 0 12px;letter-spacing:-.01em}
.sn-card p{font-size:.97rem;line-height:1.66}
.sn-card-tag{display:inline-block;margin-top:16px;font-size:.68rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink);background:var(--o);padding:.4rem .75rem;border-radius:999px}
.sn-card-logos{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap}
.sn-card-logo{display:flex;align-items:center;justify-content:center;height:46px;min-width:88px;padding:6px 12px;background:#fff;border-radius:10px}
.sn-card-logo img{max-height:32px;max-width:100%;width:auto;object-fit:contain}
.sn-card-logo-open{font-family:var(--disp);font-weight:700;font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ink);background:rgba(10,11,20,.14)}

.sn-who{padding:120px 0;background:var(--white)}
.sn-who-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:50px}
.sn-who-card{display:flex;gap:16px;align-items:flex-start;background:var(--cream);border:1.5px solid rgba(19,56,222,.14);border-radius:18px;padding:26px 24px;transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease}
.sn-who-card:hover{transform:translateY(-5px);border-color:var(--cobalt);box-shadow:0 16px 40px rgba(19,56,222,.16)}
.sn-who-card i{font-style:normal;font-weight:900;color:#fff;background:var(--cobalt);width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.8rem;flex-shrink:0}
.sn-who-card:nth-child(even) i{background:var(--o)}
.sn-who-card p{font-size:1rem;line-height:1.55;color:var(--txt);font-weight:500}

.sn-sponsors{padding:120px 0;background:var(--cream)}
.sn-sponsor-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:52px}
.sn-sponsor-card{display:flex;flex-direction:column;align-items:center;gap:20px;background:#fff;border:2px solid var(--cobalt);border-radius:20px;padding:36px 28px;box-shadow:0 0 0 5px rgba(19,56,222,.12),0 20px 46px rgba(19,56,222,.14);transition:transform .3s ease,box-shadow .3s ease}
.sn-sponsor-card:hover{transform:translateY(-6px);box-shadow:0 0 0 6px rgba(255,107,53,.18),0 28px 60px rgba(19,56,222,.22)}
.sn-sponsor-card:nth-child(even){border-color:var(--o);box-shadow:0 0 0 5px rgba(255,107,53,.14),0 20px 46px rgba(255,107,53,.16)}
.sn-sponsor-card:nth-child(even):hover{box-shadow:0 0 0 6px rgba(19,56,222,.20),0 28px 60px rgba(255,107,53,.24)}
.sn-sponsor-logo{display:flex;align-items:center;justify-content:center;height:90px;width:100%}
.sn-sponsor-logo img{max-height:80px;max-width:100%;width:auto;object-fit:contain}
.sn-sponsor-logo-open{border:1.5px dashed rgba(10,11,20,.24);border-radius:14px}
.sn-sponsor-logo-open span{font-family:var(--disp);font-weight:700;font-size:.9rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.sn-sponsor-link{font-family:var(--disp);font-weight:600;font-size:1rem;color:var(--cobalt);text-decoration:none;transition:color .2s,transform .2s}
.sn-sponsor-link:hover{color:var(--o);transform:translateX(3px)}
.sn-sponsor-link-open{color:var(--o)}

.sn-scarcity{background:var(--o);padding:100px 0}
.sn-scarcity .sn-wrap{display:grid;grid-template-columns:auto 1fr;gap:56px;align-items:center}
.sn-count{font-family:var(--disp);font-weight:700;font-size:clamp(7rem,15vw,15rem);line-height:.82;color:#fff;letter-spacing:-.05em}
.sn-count-copy h3{font-family:var(--disp);font-weight:600;font-size:clamp(1.8rem,3vw,2.8rem);color:var(--ink);letter-spacing:-.02em}
.sn-count-copy p{margin:16px 0 28px;font-size:1.08rem;line-height:1.62;color:rgba(10,11,20,.72);max-width:42ch}

.sn-reserve{background:var(--ink);padding:120px 0}
.sn-reserve-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}
.sn-reserve-copy p{color:rgba(255,255,255,.72);font-size:1.05rem;line-height:1.7;margin-top:22px}
.sn-reserve-copy strong{color:var(--o)}
.sn-reserve-copy .sn-small{font-size:.95rem;color:rgba(255,255,255,.5)}
.sn-badge-row{display:flex;align-items:center;gap:14px;margin-top:34px;flex-wrap:wrap}
.sn-badge-row span{font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);padding:.6rem 1rem;border-radius:999px}
.sn-badge-row i{color:var(--o);font-style:normal;font-weight:700}
.sn-form-card{background:#fff;border-radius:26px;padding:44px 40px;box-shadow:0 40px 90px rgba(0,0,0,.4)}
.sn-form-card h3{font-family:var(--disp);font-weight:600;font-size:1.75rem;color:var(--ink);letter-spacing:-.02em}
.sn-form-note{font-size:.88rem;color:var(--o);font-weight:700;margin:8px 0 28px}
.sn-form-card label{display:block;margin-bottom:18px;font-size:.82rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.sn-form-card label b{color:var(--o)}
.sn-form-card input,.sn-form-card select{width:100%;margin-top:8px;padding:.95rem 1.05rem;font-family:var(--body);font-size:1rem;font-weight:500;color:var(--txt);text-transform:none;letter-spacing:0;background:var(--paper);border:1.5px solid transparent;border-radius:12px;transition:.2s ease;outline:none}
.sn-form-card input:focus,.sn-form-card select:focus{border-color:var(--cobalt);background:#fff;box-shadow:0 0 0 4px rgba(19,56,222,.10)}
.sn-form-card small{display:block;margin-top:7px;font-size:.75rem;font-weight:500;letter-spacing:0;text-transform:none;color:var(--muted)}
.sn-err{background:rgba(255,107,53,.10);border:1px solid rgba(255,107,53,.4);color:var(--o-deep);font-size:.9rem;font-weight:600;padding:.85rem 1rem;border-radius:12px;margin-bottom:18px}
.sn-fine{margin-top:16px;font-size:.78rem;color:var(--muted);text-align:center;line-height:1.5}
.sn-success{text-align:left}
.sn-success-mark{width:58px;height:58px;border-radius:50%;background:var(--cobalt);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.7rem;font-weight:900;margin-bottom:22px;animation:sn-pop .5s cubic-bezier(.2,1.4,.4,1)}
@keyframes sn-pop{from{transform:scale(0)}}
.sn-success h3{font-family:var(--disp);font-weight:600;font-size:1.7rem;color:var(--ink);letter-spacing:-.02em}
.sn-success p{margin-top:12px;color:var(--muted);line-height:1.65;font-size:1rem}
.sn-success ol{margin:24px 0 20px;padding-left:20px}
.sn-success li{margin-bottom:14px;color:var(--muted);line-height:1.6;font-size:.98rem}
.sn-success li strong{color:var(--ink);font-weight:700}
.sn-success .sn-small{font-size:.82rem}

.sn-host{padding:120px 0;background:var(--white)}
.sn-host-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:60px;align-items:center}
.sn-host-copy p{margin-top:20px;font-size:1.05rem;line-height:1.72;color:var(--muted)}
.sn-host-line{font-family:var(--disp);font-weight:600;font-size:1.3rem;color:var(--ink);border-left:4px solid var(--o);padding-left:20px;line-height:1.35}
.sn-host-panel{position:relative;overflow:hidden;background:var(--ink);border:2px solid var(--cobalt);border-radius:26px;padding:44px 38px;box-shadow:0 0 0 6px rgba(19,56,222,.12),0 30px 70px rgba(10,11,20,.28)}
.sn-panel-glow{position:absolute;inset:auto -20% -40% auto;width:80%;height:70%;background:radial-gradient(50% 60% at 60% 50%,rgba(255,107,53,.30),transparent 72%);filter:blur(14px)}
.sn-stat{position:relative;z-index:1;display:flex;align-items:baseline;gap:18px;padding:20px 0;border-bottom:1px solid rgba(255,255,255,.10)}
.sn-stat strong{font-family:var(--disp);font-weight:700;font-size:2.5rem;line-height:1;color:var(--o);letter-spacing:-.03em;min-width:110px}
.sn-stat:nth-child(4) strong{color:var(--blue-lite)}
.sn-stat:last-of-type{border-bottom:none}
.sn-stat span{font-size:.95rem;line-height:1.4;color:rgba(255,255,255,.66);font-weight:500}
.sn-panel-tags{position:relative;z-index:1;display:flex;gap:8px;margin-top:28px;flex-wrap:wrap}
.sn-panel-tags span{font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#fff;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.18);padding:.5rem .85rem;border-radius:999px}

.sn-faq{padding:120px 0;background:var(--cream)}
.sn-faq-list{margin-top:46px;border-top:1px solid rgba(10,11,20,.12)}
.sn-faq-row{border-bottom:1px solid rgba(10,11,20,.12)}
.sn-faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:20px;background:none;border:none;cursor:pointer;padding:28px 0;text-align:left;font-family:var(--disp);font-weight:600;font-size:clamp(1.05rem,1.6vw,1.35rem);color:var(--ink);letter-spacing:-.01em;transition:color .2s}
.sn-faq-q:hover{color:var(--cobalt)}
.sn-faq-plus{position:relative;width:18px;height:18px;flex-shrink:0}
.sn-faq-plus:before,.sn-faq-plus:after{content:"";position:absolute;background:var(--o);border-radius:2px;transition:transform .3s ease}
.sn-faq-plus:before{top:8px;left:0;width:18px;height:2px}
.sn-faq-plus:after{left:8px;top:0;width:2px;height:18px}
.sn-faq-open .sn-faq-plus:after{transform:rotate(90deg)}
.sn-faq-a{max-height:0;overflow:hidden;transition:max-height .4s cubic-bezier(.2,.7,.2,1)}
.sn-faq-open .sn-faq-a{max-height:340px}
.sn-faq-a p{padding:0 60px 30px 0;font-size:1.02rem;line-height:1.72;color:var(--muted)}

.sn-final{background:var(--ink);padding:130px 0;text-align:center}
.sn-final h2{font-family:var(--disp);font-weight:600;letter-spacing:-.03em;line-height:.98;font-size:clamp(2.6rem,6.4vw,5.6rem);color:#fff}
.sn-final em{font-style:normal;color:var(--o)}
.sn-final p{margin:26px 0 38px;font-size:1.1rem;color:rgba(255,255,255,.6)}

.sn-bar{position:fixed;left:16px;right:16px;bottom:16px;z-index:70;display:flex;align-items:center;justify-content:space-between;gap:16px;background:var(--ink);border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:.7rem .7rem .7rem 1.4rem;box-shadow:0 20px 50px rgba(0,0,0,.35);transform:translateY(140%);opacity:0;transition:transform .45s cubic-bezier(.2,.7,.2,1),opacity .35s;max-width:520px;margin:0 auto}
.sn-bar-in{transform:none;opacity:1}
.sn-bar span{font-size:.9rem;color:rgba(255,255,255,.7);font-weight:600}
.sn-bar strong{color:var(--o);font-family:var(--disp);font-size:1.15rem}

@media(max-width:900px){
.sn-hero{padding:140px 0 0}
.sn-photo{background-position:center 34%}
.sn-shade{background:linear-gradient(180deg,rgba(10,11,20,.92) 0%,rgba(10,11,20,.80) 45%,rgba(19,56,222,.42) 82%,rgba(255,107,53,.32) 100%)}
.sn-hero-grid{grid-template-columns:1fr;gap:34px;align-items:start}
.sn-hero-main{justify-content:flex-start}
.sn-side{gap:16px}
.sn-hero-cta{gap:14px}
.sn-brought{max-width:340px}
.sn-bubble{grid-template-columns:1fr;gap:20px;padding:24px 22px;margin-top:40px;border-radius:22px}
.sn-bub-venue{border-right:none;border-bottom:1px solid rgba(10,11,20,.10);padding-right:0;padding-bottom:18px}
.sn-marquee{margin-top:56px}
.sn-track-half{font-size:1rem}
.sn-what{padding:90px 0 80px}
.sn-what-h s{white-space:normal}
.sn-what-grid{grid-template-columns:1fr;gap:26px}
.sn-lede{padding-left:20px}
.sn-stack{padding:90px 0}
.sn-cards{grid-template-columns:1fr;gap:16px}
.sn-who{padding:90px 0}
.sn-who-grid{grid-template-columns:1fr;gap:14px}
.sn-sponsors{padding:90px 0}
.sn-sponsor-grid{grid-template-columns:1fr;gap:16px}
.sn-scarcity{padding:70px 0}
.sn-scarcity .sn-wrap{grid-template-columns:1fr;gap:12px;text-align:center}
.sn-count-copy p{margin-left:auto;margin-right:auto}
.sn-reserve{padding:90px 0}
.sn-reserve-grid{grid-template-columns:1fr;gap:44px}
.sn-form-card{padding:32px 24px}
.sn-host{padding:90px 0}
.sn-host-grid{grid-template-columns:1fr;gap:44px}
.sn-host-panel{padding:34px 26px}
.sn-stat strong{font-size:2rem;min-width:86px}
.sn-faq{padding:90px 0}
.sn-faq-a p{padding-right:0}
.sn-final{padding:90px 0}
}
@media(prefers-reduced-motion:reduce){
.sn-reveal{opacity:1;transform:none;transition:none}
.sn-track,.sn-photo,.sn-dot{animation:none}
}
`;
