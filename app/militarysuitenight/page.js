"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   MILITARY SUITE NIGHT · Sept 11
   KNOBS · edit these, nothing else
   ============================================================ */
const EVENT_DATE = "September 11 · 2026";
const SUITE_SEATS = 18;            // free suite seats for our military (after 5 sponsors + you + Logan)
const WINNERS = 9;                 // 9 winners x 2 seats = 18
const SEATS_PER_WINNER = 2;
const SHOW_CATERING = true;

const WEB3FORMS_KEY = "e87c5fc0-d3e8-47e8-a1ab-5be73241a042";
/* Same Apps Script endpoint · this form posts source:"vetnight" so the script routes it to a new tab */
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwmN-Ay_a19_I5qKMWGEDw4p9OLKPttyzVDrkQe2EF0oa3xZtU6d8TcctCsKLdRK-1L/exec";
const DM_URL = "https://instagram.com/gvonflue";

/* Sponsor-a-Veteran fund */
const STRIPE_LINK = "https://buy.stripe.com/PASTE_YOUR_LINK"; // your Stripe Payment Link
const FUND_GOAL = 250;   // stadium-fill goal, number of vets
const FUND_PRICE = 12;   // dollars per veteran

const BRANCHES = ["Army", "Marine Corps", "Navy", "Air Force", "Space Force", "Coast Guard", "National Guard"];
const STATUSES = ["Active Duty", "Veteran", "Reserve", "National Guard", "Retired"];
const SEAT_OPTS = ["1 seat (just me)", "2 seats (me + 1)"];
const PARTY_OPTS = ["Just me", "2", "3", "4", "5+"];

/* Host brands */
const HOST_BRANDS = [
  { name: "GVonFlue Real Estate", logo: "/logos/gvonflue-logo.png", url: "https://gvonflue.vercel.app" },
  { name: "ProyTech", logo: "/logos/proytech-logo.png", url: "https://getproytech.com" },
];

/* Sponsors · 5 slots · flip an open slot by adding name + logo + url */
const SPONSORS = [
  { name: "Dwell Real Estate Group", logo: "/logos/dwelllogo.png", url: "https://dwellrealestategroup.com", open: false },
  { open: true },
  { open: true },
  { open: true },
  { open: true },
];

const MARQUEE = [
  "FOR THOSE WHO SERVED",
  "ON THE FIELD FOR THE ANTHEM",
  "PRIVATE SUITE 5",
  "SEPT 11",
  "CATERED",
  "FREE FOR OUR MILITARY",
];

const STACK = [
  {
    n: "01",
    t: "On the field for the anthem",
    d: "Every service member walks down to the field for the national anthem. You stand on that grass, face the flag, and render the salute you earned. Bring the family, they come too.",
    hero: true,
  },
  {
    n: "02",
    t: "The game from Suite 5",
    d: "A private suite at Equity Bank Park with the Wichita Wind Surge. Your seat is covered. All of it.",
  },
  {
    n: "03",
    t: "A room that gets it",
    d: "Military, active and veteran, plus the Wichita business owners who wanted to stand behind you. One suite, one night, real connection.",
  },
  {
    n: "04",
    t: "Wear the uniform",
    d: "Uniform encouraged if you still have it. I am wearing mine. We do this right.",
  },
  {
    n: "05",
    t: "Catering provided",
    d: "Eat well while you are honored well. Covered for the night by our sponsors.",
    sponsors: true,
  },
];

const FAQ = [
  {
    q: "Wait, this is actually free?",
    a: "Yes. Five local sponsors are covering this so that no one who served pays a cent for the suite. That is the whole point. You enter the drawing, and if your name is drawn, your seats are on us.",
  },
  {
    q: "How does the drawing work?",
    a: `You fill out the entry form below. On drawing day I pull ${WINNERS} names live. Each winner gets ${SEATS_PER_WINNER} suite seats, so ${WINNERS} service members and their guest fill the suite. If your name is drawn, I contact you directly to confirm.`,
  },
  {
    q: "Can I bring my family?",
    a: "Your entry covers up to 2 suite seats, you and one guest. If you have a bigger family, they are absolutely welcome at the ballpark, you just grab affordable general admission tickets for the extras. And here is the part that matters most: your whole family comes down to the field for the anthem with you. That moment is for all of you.",
  },
  {
    q: "Do I have to be a certain branch, era, or component?",
    a: "No. Every branch, every era, active duty, reserve, guard, retired, veteran. If you have worn the uniform, you belong here.",
  },
  {
    q: "Do I have to wear my uniform?",
    a: "Encouraged, never required. If you still have it and want to wear it on that field, do it. If not, come exactly as you are. You earned your place either way.",
  },
  {
    q: "What is the timing?",
    a: "Full rundown goes to winners after the drawing. Plan on arriving before first pitch for the anthem walk, then the game from the suite after.",
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
export default function MilitarySuiteNight() {
  useReveal();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    rank: "",
    status: "",
    branch: "",
    mos: "",
    seats: "",
    party: "",
    note: "",
  });
  const [status, setStatus] = useState("idle");
  const [err, setErr] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const [sponsorOpen, setSponsorOpen] = useState(false);
  const [vetsFunded, setVetsFunded] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    let alive = true;
    fetch("/api/vets-funded")
      .then((r) => r.json())
      .then((d) => {
        if (alive) setVetsFunded(typeof d.vetsFunded === "number" ? d.vetsFunded : 0);
      })
      .catch(() => {
        if (alive) setVetsFunded(0);
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSponsorOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const scrollToForm = () => {
    document.getElementById("enter")?.scrollIntoView({ behavior: "smooth" });
  };

  async function submit(e) {
    e.preventDefault();
    setErr("");

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.status || !form.branch) {
      setErr("Name, email, phone, status and branch are required.");
      return;
    }
    if (!form.seats) {
      setErr("Let me know how many suite seats you would need.");
      return;
    }

    setStatus("sending");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      rank: form.rank.trim(),
      status: form.status,
      branch: form.branch,
      mos: form.mos.trim(),
      seatsRequested: form.seats,
      partySize: form.party,
      note: form.note.trim(),
      source: "vetnight",
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
          subject: "🎖️ New Military Suite Night Entry",
          from_name: "Military Suite Night · GVonFlue",
          ...payload,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Submit failed");
      setStatus("done");
      window.plausible?.("VetNight Entry");
      setTimeout(() => {
        document.getElementById("enter")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 60);
    } catch (e2) {
      console.error("Vet Night submit error:", e2);
      setStatus("error");
      setErr("That did not go through. Text me at 901.335.3905 and I will get you entered.");
    }
  }

  return (
    <main className="sn">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* HERO */}
      <section className="sn-hero">
        <div className="sn-photo" />
        <div className="sn-camo" />
        <div className="sn-shade" />
        <div className="sn-flag" aria-hidden="true">
          <div className="sn-flag-cloth" />
          <svg className="sn-flag-def" width="0" height="0">
            <defs>
              <filter id="sn-wave">
                <feTurbulence type="fractalNoise" baseFrequency="0.008 0.016" numOctaves="2" result="noise" seed="7">
                  <animate
                    attributeName="baseFrequency"
                    dur="14s"
                    values="0.008 0.016; 0.012 0.022; 0.008 0.016"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="26" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>
        </div>
        <div className="sn-stripes" />
        <div className="sn-grain" />

        <div className="sn-hero-inner">
          <div className="sn-hero-grid">
            <div className="sn-hero-main">
              <div className="sn-eyebrow">
                <i className="sn-star">★</i>
                A Night For Those Who Served · {EVENT_DATE}
              </div>

              <h1 className="sn-h1">
                Suite Night
                <br />
                <em>Military Edition</em>
              </h1>

              <p className="sn-hero-sub">
                Eighteen free suite seats for our military. On the field for the anthem. The game
                from a private suite. All of it on us.
              </p>

              <div className="sn-hero-cta">
                <button className="sn-btn sn-btn-orange" onClick={scrollToForm}>
                  Enter the drawing
                </button>
                <div className="sn-seats-pill">
                  <strong>FREE</strong>
                  <span>
                    for our military
                    <br />
                    · sponsor funded
                  </span>
                </div>
              </div>
            </div>

            <aside className="sn-side">
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

              <div className="sn-brought sn-flag-panel">
                <p className="sn-brought-label">The moment</p>
                <p className="sn-flag-copy">
                  Every service member walks the field for the national anthem. You stand. You salute. We
                  honor it right.
                </p>
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
              <span>When</span>
              <strong>September 11</strong>
            </div>
            <div className="sn-bub-cell">
              <span>The seats</span>
              <strong>{SUITE_SEATS} free · drawn live</strong>
            </div>
            <div className="sn-bub-cell">
              <span>The cost</span>
              <strong>$0 · covered by sponsors</strong>
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
                    <i>★</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPONSORS · directly under hero · the spotlight */}
      <section className="sn-sponsors sn-sponsors-lead">
        <div className="sn-wrap">
          <span className="sn-kicker sn-kicker-orange sn-reveal">The ones who made it free</span>
          <h2 className="sn-h2 sn-reveal">Standing behind our military.</h2>
          <p className="sn-sponsors-lede sn-reveal">
            Every free seat, the catered food, the whole night. None of it happens without these
            businesses. They did not have to step up. They chose to. Give them your business.
          </p>
          <div className="sn-sponsor-grid sn-sponsor-grid-5">
            {SPONSORS.map((s, i) => (
              <div className="sn-sponsor-card sn-reveal" key={i} style={{ transitionDelay: `${i * 60}ms` }}>
                {s.open ? (
                  <button
                    type="button"
                    className="sn-sponsor-openbtn"
                    onClick={() => setSponsorOpen(true)}
                  >
                    <span className="sn-sponsor-logo sn-sponsor-logo-open">
                      <span>Open Spot</span>
                    </span>
                    <span className="sn-sponsor-link sn-sponsor-link-open">
                      Sponsor a service member →
                    </span>
                  </button>
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

      {/* SPONSOR A VETERAN · community fund */}
      <section className="sn-fund">
        <div className="sn-fund-glow" />
        <div className="sn-wrap">
          <div className="sn-fund-grid">
            <div className="sn-fund-copy sn-reveal">
              <span className="sn-kicker sn-kicker-orange">Fill the stadium</span>
              <h2 className="sn-h2 sn-h2-light">
                $12 puts a service<br />member in the stands.
              </h2>
              <p>
                The suite honors 18. But the drawing leaves a lot of good people out, and no service
                member should watch from home. So here is how the rest of us pitch in.
              </p>
              <p className="sn-small">
                Every $12 buys one general admission ticket for a veteran or active-duty service
                member who did not draw the suite. 100% goes to tickets. Let us pack that stadium
                with the people who earned the seat.
              </p>

              {vetsFunded !== null && (
                <div className="sn-fund-meter">
                  <div className="sn-fund-meter-top">
                    <strong>{vetsFunded}</strong>
                    <span>of {FUND_GOAL} veterans funded</span>
                  </div>
                  <div className="sn-fund-bar">
                    <div
                      className="sn-fund-bar-fill"
                      style={{ width: `${Math.min((vetsFunded / FUND_GOAL) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="sn-fund-card sn-reveal">
              <p className="sn-fund-card-label">Your impact</p>
              <div className="sn-fund-qty">
                {[1, 2, 5, 10].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`sn-fund-chip ${qty === n ? "sn-fund-chip-on" : ""}`}
                    onClick={() => setQty(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="sn-fund-total">
                <span>{qty === 1 ? "Sends" : "Sends"}</span>
                <strong>
                  {qty} {qty === 1 ? "veteran" : "veterans"}
                </strong>
                <em>${qty * FUND_PRICE}</em>
              </div>
              <a
                className="sn-btn sn-btn-orange sn-btn-block"
                href={STRIPE_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Sponsor a veteran · ${FUND_PRICE} each
              </a>
              <p className="sn-fund-fine">
                Choose how many to sponsor on the next screen. 100% buys general admission tickets
                for service members. Not tax deductible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT THIS IS */}
      <section className="sn-what">
        <div className="sn-what-glow" />
        <div className="sn-wrap">
          <span className="sn-kicker sn-reveal">01 · What this is</span>
          <h2 className="sn-what-h sn-reveal">
            This one is
            <br />
            <em>on us.</em>
          </h2>

          <div className="sn-chips sn-reveal">
            <span>{SUITE_SEATS} free seats</span>
            <span>On the field</span>
            <span>Anthem salute</span>
            <span>Catering provided</span>
            <span>Sponsor funded</span>
          </div>

          <div className="sn-what-grid">
            <p className="sn-lede sn-reveal">
              I am an Army veteran. This night is the one I most wanted to build. A room where the
              people who served get honored the way they should.
            </p>
            <p className="sn-body sn-reveal">
              Five local sponsors stepped up so that not a single service member pays to be here. You enter
              the drawing, and if your name is pulled, you and a guest get a seat in the suite, a
              catered night at the ballpark, and a walk down to the field for the national anthem
              where you stand on that grass and salute the flag you served.
            </p>
          </div>
        </div>
      </section>

      {/* VALUE STACK */}
      <section className="sn-stack">
        <div className="sn-wrap">
          <span className="sn-kicker sn-kicker-orange sn-reveal">02 · The night</span>
          <h2 className="sn-h2 sn-h2-light sn-reveal">What you are walking into.</h2>

          <div className="sn-cards">
            {STACK.map((s, i) => (
              <article
                key={s.n}
                className={`sn-card sn-reveal ${i % 2 === 0 ? "sn-card-blue" : "sn-card-orange"}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="sn-card-n">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                {s.hero && <span className="sn-card-tag">The moment</span>}
                {s.sponsors && SHOW_CATERING && (
                  <div className="sn-card-logos">
                    {SPONSORS.map((sp, k) =>
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

      {/* HOW THE DRAWING WORKS */}
      <section className="sn-who">
        <div className="sn-wrap">
          <span className="sn-kicker sn-reveal">03 · How it works</span>
          <h2 className="sn-h2 sn-reveal">Enter. Get drawn. Get honored.</h2>

          <div className="sn-who-grid sn-steps">
            <div className="sn-who-card sn-reveal">
              <i>1</i>
              <p>
                <strong>Enter the drawing.</strong> Fill out the form below. Every branch, every era,
                active or veteran, all welcome.
              </p>
            </div>
            <div className="sn-who-card sn-reveal" style={{ transitionDelay: "60ms" }}>
              <i>2</i>
              <p>
                <strong>I draw {WINNERS} names live.</strong> Each winner gets {SEATS_PER_WINNER}{" "}
                suite seats, you plus a guest. That fills the suite with {WINNERS} service members and the
                people they love.
              </p>
            </div>
            <div className="sn-who-card sn-reveal" style={{ transitionDelay: "120ms" }}>
              <i>3</i>
              <p>
                <strong>Winners get contacted.</strong> If your name is pulled, I reach out directly
                with everything you need for the night.
              </p>
            </div>
          </div>

          <p className="sn-family-note sn-reveal">
            Bigger family? Your entry covers 2 suite seats, you and a guest. If you want to bring
            more, they are welcome at the ballpark with affordable general admission tickets, and
            everyone comes down to the field for the anthem together. That moment is for your whole
            family.
          </p>
        </div>
      </section>

      {/* ENTER (FORM) */}
      <section className="sn-reserve" id="enter">
        <div className="sn-wrap">
          <div className="sn-reserve-grid">
            <div className="sn-reserve-copy sn-reveal">
              <span className="sn-kicker sn-kicker-orange">04 · Enter</span>
              <h2 className="sn-h2 sn-h2-light">Put your name in.</h2>
              <p>
                This is your entry into the live drawing for a free seat in the suite on{" "}
                <strong>September 11</strong>. It takes a minute. It costs nothing.
              </p>
              <p className="sn-small">
                {WINNERS} names get drawn, each for {SEATS_PER_WINNER} suite seats. If your name is
                pulled, I contact you directly. Whether you win or not, thank you for your service.
                That is not a line, I mean it.
              </p>
              <div className="sn-badge-row">
                <span>Enter</span>
                <i>→</i>
                <span>Live drawing</span>
                <i>→</i>
                <span>Winners contacted</span>
              </div>
            </div>

            <div className="sn-form-card sn-reveal">
              {status === "done" ? (
                <div className="sn-success">
                  <div className="sn-success-mark">★</div>
                  <h3>You are entered. Thank you for serving.</h3>
                  <p>
                    Your name is in the drawing, {form.name.split(" ")[0]}. Here is what happens
                    next.
                  </p>
                  <ol>
                    <li>
                      <strong>I draw {WINNERS} names live.</strong> Watch for the announcement.
                    </li>
                    <li>
                      <strong>If you win, I reach out.</strong> From my real number, with everything
                      you need.
                    </li>
                    <li>
                      <strong>You come honored.</strong> Field for the anthem, suite for the game,
                      all on us.
                    </li>
                  </ol>
                  <p className="sn-small">
                    Questions before then? Text 901.335.3905 anytime.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h3>Enter the drawing</h3>
                  <p className="sn-form-note">Free · for those who served</p>

                  <label>
                    Full name <b>*</b>
                    <input value={form.name} onChange={set("name")} placeholder="First and last" />
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
                    <small>This is how I reach you if your name is drawn.</small>
                  </label>

                  <label>
                    Status <b>*</b>
                    <select value={form.status} onChange={set("status")}>
                      <option value="">Pick one</option>
                      {STATUSES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Branch <b>*</b>
                    <select value={form.branch} onChange={set("branch")}>
                      <option value="">Pick one</option>
                      {BRANCHES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Rank
                    <input
                      value={form.rank}
                      onChange={set("rank")}
                      placeholder="e.g. SGT, SSG, E-5, CPT"
                    />
                    <small>Current or final rank. Optional.</small>
                  </label>

                  <label>
                    MOS / rating / job code
                    <input
                      value={form.mos}
                      onChange={set("mos")}
                      placeholder="e.g. 11B, 0311, IT, etc."
                    />
                    <small>Optional, but we love to know what you did.</small>
                  </label>

                  <label>
                    Suite seats you would need <b>*</b>
                    <select value={form.seats} onChange={set("seats")}>
                      <option value="">Pick one</option>
                      {SEAT_OPTS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <small>Max 2 free suite seats per winner (you + a guest).</small>
                  </label>

                  <label>
                    How big is your whole party?
                    <select value={form.party} onChange={set("party")}>
                      <option value="">Pick one</option>
                      {PARTY_OPTS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <small>
                      Bringing more than 2? No problem, extras can grab GA and still join the anthem
                      walk. This just helps me plan.
                    </small>
                  </label>

                  <label>
                    Anything you want me to know?
                    <input value={form.note} onChange={set("note")} placeholder="Optional" />
                  </label>

                  {err && <div className="sn-err">{err}</div>}

                  <button
                    className="sn-btn sn-btn-orange sn-btn-block"
                    type="submit"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Entering you..." : "Enter the drawing"}
                  </button>

                  <p className="sn-fine">
                    Entering is free and puts your name in the live drawing. That is it.
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
              <span className="sn-kicker">05 · Why I am doing this</span>
              <h2 className="sn-h2">I served too.</h2>
              <p>
                I am Garrett Von Flue. Army veteran, 13B cannon crewmember on a Paladin, REALTOR®
                with Real Broker LLC, and co CEO of ProyTech. Of everything I have built, this is the
                night that means the most to me.
              </p>
              <p>
                I know what it is to serve, and I know how rarely anyone stops to say thank you in a
                way you can feel. So I am putting on the uniform one more time, gathering people who
                want to stand behind our military, and giving away a night that says it plainly. We
                see you. We are grateful.
              </p>
              <p className="sn-host-line">
                Come stand on that field with me. Let us do this right.
              </p>
            </div>

            <div className="sn-host-panel sn-reveal">
              <div className="sn-panel-glow" />
              <div className="sn-stat">
                <strong>{SUITE_SEATS}</strong>
                <span>free suite seats for our military</span>
              </div>
              <div className="sn-stat">
                <strong>5</strong>
                <span>sponsors covering every cent</span>
              </div>
              <div className="sn-stat">
                <strong>1</strong>
                <span>walk to the field for the anthem</span>
              </div>
              <div className="sn-panel-tags">
                <span>13B · Paladin</span>
                <span>All branches</span>
                <span>All eras</span>
                <span>Uniform encouraged</span>
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
            For those
            <br />
            <em>who served.</em>
          </h2>
          <p>September 11. Suite 5 at the Wind Surge. On us.</p>
          <button className="sn-btn sn-btn-orange sn-btn-lg" onClick={scrollToForm}>
            Enter the drawing
          </button>
        </div>
      </section>

      {/* SPONSOR MODAL */}
      {sponsorOpen && (
        <div className="sn-modal" role="dialog" aria-modal="true" aria-label="Become a sponsor">
          <div className="sn-modal-scrim" onClick={() => setSponsorOpen(false)} />
          <div className="sn-modal-card">
            <button
              type="button"
              className="sn-modal-x"
              onClick={() => setSponsorOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>

            <span className="sn-kicker sn-kicker-orange">Become a sponsor</span>
            <h3 className="sn-modal-h">Put your name behind our military.</h3>
            <div className="sn-modal-price">
              <strong>$450</strong>
              <span>one sponsor spot</span>
            </div>

            <div className="sn-modal-cols">
              <div className="sn-modal-col">
                <h4 className="sn-modal-colh sn-modal-colh-blue">What you get</h4>
                <ul className="sn-modal-list">
                  <li>Your logo on the website</li>
                  <li>Your logo on every social post for this event</li>
                  <li>1 ticket to Suite Night</li>
                  <li>Your brand featured inside the suite</li>
                  <li>You get to shake hands with the military members who come</li>
                </ul>
              </div>
              <div className="sn-modal-col">
                <h4 className="sn-modal-colh sn-modal-colh-orange">What you are giving</h4>
                <ul className="sn-modal-list">
                  <li>A night for 18 military members and veterans</li>
                  <li>Their place in the suite</li>
                  <li>Catering provided for the night</li>
                  <li>A night our military can enjoy on a date that will forever live in infamy</li>
                  <li>Our military walking onto the field for the national anthem</li>
                </ul>
              </div>
            </div>

            <div className="sn-modal-contact">
              <p className="sn-modal-contact-label">Ready, or have questions? Reach me directly.</p>
              <div className="sn-modal-contact-row">
                <a className="sn-modal-btn sn-modal-btn-primary" href="tel:19013353905">
                  Call or text · 901-335-3905
                </a>
                <a
                  className="sn-modal-btn"
                  href="https://www.instagram.com/gvonflue"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram · @gvonflue
                </a>
                <a
                  className="sn-modal-btn"
                  href="https://www.facebook.com/GarrettVonFlue"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook · Garrett Von Flue
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STICKY BAR */}
      {status !== "done" && (
        <div className={`sn-bar ${showBar ? "sn-bar-in" : ""}`}>
          <span>
            <strong>{SUITE_SEATS} free seats</strong> · Sept 11 · military
          </span>
          <button className="sn-btn sn-btn-orange sn-btn-sm" onClick={scrollToForm}>
            Enter
          </button>
        </div>
      )}
    </main>
  );
}

const CSS = `
.sn{--o:#FF6B35;--o-deep:#E4551F;--cream:#FBF6EA;--blue-lite:#5B7BFF;--flag-red:#B22234;--flag-blue:#0A3161;font-family:var(--body);background:var(--white);overflow-x:clip}
.sn-wrap{max-width:1180px;margin:0 auto;padding:0 28px;position:relative;z-index:2}
.sn-reveal{opacity:0;transform:translateY(28px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}
.sn-reveal.sn-in{opacity:1;transform:none}
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
.sn-shade{position:absolute;inset:0;z-index:1;background:linear-gradient(100deg,rgba(10,11,20,.96) 0%,rgba(10,11,20,.9) 38%,rgba(10,11,20,.58) 64%,rgba(10,49,97,.5) 86%,rgba(178,34,52,.3) 100%)}
.sn-shade:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,11,20,.55) 0%,transparent 26%,transparent 70%,rgba(10,11,20,.85) 100%)}

/* Subtle woodland/OD camo texture over the photo */
.sn-camo{position:absolute;inset:0;z-index:1;pointer-events:none;opacity:.14;mix-blend-mode:overlay;background:
  radial-gradient(ellipse 220px 150px at 12% 20%, #2f3a1e 0 40%, transparent 42%),
  radial-gradient(ellipse 260px 170px at 78% 12%, #1c2411 0 42%, transparent 44%),
  radial-gradient(ellipse 200px 140px at 60% 42%, #4b3d24 0 40%, transparent 43%),
  radial-gradient(ellipse 240px 160px at 30% 66%, #232b13 0 41%, transparent 44%),
  radial-gradient(ellipse 210px 150px at 88% 72%, #3a2f1c 0 40%, transparent 43%),
  radial-gradient(ellipse 190px 130px at 46% 88%, #1a2110 0 42%, transparent 45%),
  linear-gradient(120deg,#39421f,#20260f)}

/* American flag · built in CSS, rippled with the SVG turbulence filter */
.sn-flag{position:absolute;top:-6%;right:-6%;width:62%;height:80%;z-index:1;pointer-events:none;overflow:hidden;
  -webkit-mask-image:radial-gradient(120% 100% at 100% 0,#000 42%,transparent 78%);
  mask-image:radial-gradient(120% 100% at 100% 0,#000 42%,transparent 78%);opacity:.26}
.sn-flag-def{position:absolute}
.sn-flag-cloth{position:absolute;inset:-8%;filter:url(#sn-wave);
  background:
    /* blue canton, top-left, ~40% wide x ~54% tall */
    linear-gradient(#0A3161,#0A3161),
    /* 13 stripes */
    repeating-linear-gradient(180deg,#B22234 0 7.69%,#f7f7f5 7.69% 15.38%);
  background-repeat:no-repeat, no-repeat;
  background-position:0 0, 0 0;
  background-size:40% 53.8%, 100% 100%;
  animation:sn-flag-sway 9s ease-in-out infinite alternate}
@keyframes sn-flag-sway{from{transform:translate3d(0,0,0) skewY(-.4deg)}to{transform:translate3d(-1.4%,0,0) skewY(.6deg)}}
.sn-stripes{position:absolute;left:0;right:0;top:0;height:10px;z-index:2;background:repeating-linear-gradient(90deg,var(--flag-red) 0,var(--flag-red) 40px,#fff 40px,#fff 80px);opacity:.5}
.sn-grain{position:absolute;inset:0;z-index:2;opacity:.06;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.sn-hero-inner{position:relative;z-index:3;max-width:1180px;margin:0 auto;padding:0 28px}
.sn-hero-grid{display:grid;grid-template-columns:1.4fr .6fr;gap:48px;align-items:stretch}
.sn-hero-main{display:flex;flex-direction:column;justify-content:flex-end}
.sn-side{display:flex;flex-direction:column;justify-content:space-between;gap:28px}
.sn-eyebrow{display:inline-flex;align-self:flex-start;align-items:center;gap:9px;font-weight:700;font-size:.78rem;letter-spacing:.16em;text-transform:uppercase;color:#fff;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.20);backdrop-filter:blur(8px);padding:.55rem 1rem;border-radius:999px}
.sn-star{color:var(--o);font-style:normal}
.sn-h1{font-family:var(--disp);font-weight:600;letter-spacing:-.03em;line-height:.96;font-size:clamp(2.6rem,6.2vw,5.6rem);color:#fff;margin:22px 0 0;text-shadow:0 4px 40px rgba(0,0,0,.5)}
.sn-h1 em{font-style:normal;color:var(--o)}
.sn-hero-sub{font-size:clamp(1.02rem,1.4vw,1.25rem);line-height:1.55;color:rgba(255,255,255,.72);margin:24px 0 0;max-width:48ch}
.sn-hero-cta{display:flex;align-items:center;gap:20px;margin:34px 0 0;flex-wrap:wrap}
.sn-seats-pill{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.20);backdrop-filter:blur(10px);border-radius:16px;padding:.7rem 1.1rem}
.sn-seats-pill strong{font-family:var(--disp);font-size:1.5rem;color:var(--o);line-height:1;letter-spacing:.02em}
.sn-seats-pill span{font-size:.72rem;line-height:1.25;color:rgba(255,255,255,.7);font-weight:600;text-transform:uppercase;letter-spacing:.06em}

.sn-brought{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(12px);border-radius:20px;padding:20px;text-align:center}
.sn-brought-label{font-size:.64rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:16px}
.sn-plate{display:flex;align-items:center;justify-content:center;gap:16px;background:#fff;border-radius:12px;padding:16px 14px}
.sn-plate-item{display:flex;align-items:center;gap:16px}
.sn-plate a{display:flex;align-items:center;transition:opacity .24s ease,transform .24s ease}
.sn-plate a:hover{opacity:.75;transform:translateY(-2px)}
.sn-plate img{height:40px;width:auto;object-fit:contain}
.sn-plate-div{width:1px;height:30px;background:rgba(10,11,20,.14);flex-shrink:0}
.sn-flag-panel{text-align:left;border-color:rgba(255,107,53,.3)}
.sn-flag-copy{font-family:var(--disp);font-weight:500;font-size:1.02rem;line-height:1.35;color:#fff;margin:0}

.sn-bubble{display:grid;grid-template-columns:1.5fr 1fr 1.2fr 1.2fr;gap:28px;align-items:center;margin:56px 0 0;background:#fff;border:2px solid var(--cobalt);border-radius:26px;padding:26px 32px;box-shadow:0 0 0 6px rgba(19,56,222,.14),0 30px 70px rgba(0,0,0,.45)}
.sn-bub-cell span{display:block;font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);font-weight:700;margin-bottom:6px}
.sn-bub-cell strong{font-family:var(--disp);font-weight:600;font-size:1rem;color:var(--ink);line-height:1.2;display:block}
.sn-bub-venue{display:flex;align-items:center;gap:16px;border-right:1px solid rgba(10,11,20,.10);padding-right:24px}
.sn-bub-venue img{height:46px;width:auto;object-fit:contain;flex-shrink:0}

.sn-marquee{position:relative;z-index:3;margin-top:80px;background:var(--o);color:var(--ink);padding:18px 0;overflow:hidden;transform:rotate(-1.4deg) scale(1.05)}
.sn-track{display:flex;width:max-content;animation:sn-scroll 28s linear infinite}
.sn-track-half{display:flex;white-space:nowrap;font-family:var(--disp);font-weight:600;font-size:1.15rem;letter-spacing:.03em}
.sn-track-half span{padding-right:1rem;display:inline-flex;align-items:center}
.sn-track-half i{color:var(--flag-blue);font-style:normal;margin:0 .5rem}
@keyframes sn-scroll{to{transform:translateX(-50%)}}

.sn-what{position:relative;padding:140px 0 120px;background:var(--cream);overflow:hidden}
.sn-what-glow{position:absolute;inset:auto -8% -30% auto;width:60%;height:80%;z-index:0;background:radial-gradient(45% 55% at 70% 40%,rgba(19,56,222,.14),transparent 70%),radial-gradient(40% 50% at 90% 80%,rgba(255,107,53,.16),transparent 70%);filter:blur(12px)}
.sn-what-h{font-family:var(--disp);font-weight:600;letter-spacing:-.03em;line-height:.98;font-size:clamp(2.3rem,5.4vw,4.6rem);color:var(--ink);margin:16px 0 0}
.sn-what-h em{font-style:normal;color:var(--o)}
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
.sn-card-tag{display:inline-block;margin-top:16px;font-size:.68rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#fff;background:var(--flag-red);padding:.4rem .75rem;border-radius:999px}
.sn-card-logos{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap}
.sn-card-logo{display:flex;align-items:center;justify-content:center;height:44px;min-width:80px;padding:6px 10px;background:#fff;border-radius:10px}
.sn-card-logo img{max-height:30px;max-width:100%;width:auto;object-fit:contain}
.sn-card-logo-open{font-family:var(--disp);font-weight:700;font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ink);background:rgba(10,11,20,.14)}

.sn-who{padding:120px 0;background:var(--white)}
.sn-who-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:50px}
.sn-who-card{display:flex;gap:16px;align-items:flex-start;background:var(--cream);border:1.5px solid rgba(19,56,222,.14);border-radius:18px;padding:26px 24px;transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease}
.sn-who-card:hover{transform:translateY(-5px);border-color:var(--cobalt);box-shadow:0 16px 40px rgba(19,56,222,.16)}
.sn-who-card i{font-style:normal;font-weight:900;color:#fff;background:var(--cobalt);width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.95rem;flex-shrink:0;font-family:var(--disp)}
.sn-who-card:nth-child(even) i{background:var(--o)}
.sn-who-card p{font-size:1rem;line-height:1.55;color:var(--txt);font-weight:500}
.sn-who-card strong{color:var(--ink)}
.sn-family-note{margin:34px auto 0;max-width:760px;text-align:center;font-size:1.02rem;line-height:1.6;color:var(--muted);background:var(--cream);border:1.5px dashed rgba(255,107,53,.4);border-radius:18px;padding:26px 30px}

.sn-sponsors{padding:120px 0;background:var(--cream)}.sn-sponsors-lead{padding:100px 0 110px;background:linear-gradient(180deg,#fff 0%,var(--cream) 100%)}
.sn-sponsors-lede{max-width:720px;margin:22px 0 0;font-size:1.12rem;line-height:1.62;color:var(--muted);font-weight:500}
.sn-sponsor-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:52px}
.sn-sponsor-grid-5{grid-template-columns:repeat(5,1fr);gap:18px}
.sn-sponsor-card{display:flex;flex-direction:column;align-items:center;gap:16px;background:#fff;border:2px solid var(--cobalt);border-radius:20px;padding:22px 18px 24px;box-shadow:0 0 0 5px rgba(19,56,222,.12),0 20px 46px rgba(19,56,222,.14);transition:transform .3s ease,box-shadow .3s ease}
.sn-sponsor-card:hover{transform:translateY(-6px);box-shadow:0 0 0 6px rgba(255,107,53,.18),0 28px 60px rgba(19,56,222,.22)}
.sn-sponsor-card:nth-child(even){border-color:var(--o);box-shadow:0 0 0 5px rgba(255,107,53,.14),0 20px 46px rgba(255,107,53,.16)}
.sn-sponsor-card:nth-child(even):hover{box-shadow:0 0 0 6px rgba(19,56,222,.20),0 28px 60px rgba(255,107,53,.24)}
.sn-sponsor-logo{display:flex;align-items:center;justify-content:center;width:100%;aspect-ratio:1/1;background:#fff;border-radius:14px}
.sn-sponsor-logo img{max-height:88%;max-width:88%;width:auto;object-fit:contain}
.sn-sponsor-logo-open{border:1.5px dashed rgba(10,11,20,.24)}
.sn-sponsor-logo-open span{font-family:var(--disp);font-weight:700;font-size:.9rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-align:center}
.sn-sponsor-link{font-family:var(--disp);font-weight:700;font-size:.92rem;color:var(--cobalt);text-decoration:none;transition:color .2s,transform .2s;text-align:center;line-height:1.3}
.sn-sponsor-link:hover{color:var(--o);transform:translateX(3px)}
.sn-sponsor-link-open{color:var(--o)}

/* Sponsor a Veteran fund */
.sn-fund{position:relative;padding:120px 0;background:var(--ink);overflow:hidden}
.sn-fund-glow{position:absolute;inset:auto -10% -30% -10%;height:70%;z-index:0;background:radial-gradient(50% 60% at 30% 50%,rgba(255,107,53,.22),transparent 70%),radial-gradient(45% 55% at 80% 60%,rgba(19,56,222,.22),transparent 72%);filter:blur(14px)}
.sn-fund-grid{position:relative;z-index:2;display:grid;grid-template-columns:1.15fr .85fr;gap:56px;align-items:center}
.sn-fund-copy p{color:rgba(255,255,255,.74);font-size:1.05rem;line-height:1.7;margin-top:20px}
.sn-fund-copy .sn-small{font-size:.95rem;color:rgba(255,255,255,.55)}
.sn-fund-meter{margin-top:30px}
.sn-fund-meter-top{display:flex;align-items:baseline;gap:10px;margin-bottom:10px}
.sn-fund-meter-top strong{font-family:var(--disp);font-weight:700;font-size:2.2rem;color:var(--o);line-height:1;letter-spacing:-.02em}
.sn-fund-meter-top span{font-size:.85rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.6)}
.sn-fund-bar{height:12px;border-radius:999px;background:rgba(255,255,255,.12);overflow:hidden}
.sn-fund-bar-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--o),#ff8a5c);transition:width .8s cubic-bezier(.2,.7,.2,1)}
.sn-fund-card{background:#fff;border-radius:24px;padding:34px 32px;box-shadow:0 40px 90px rgba(0,0,0,.45)}
.sn-fund-card-label{font-family:var(--disp);font-weight:700;font-size:.78rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
.sn-fund-qty{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:18px 0}
.sn-fund-chip{font-family:var(--disp);font-weight:700;font-size:1.25rem;color:var(--ink);background:var(--cream);border:2px solid transparent;border-radius:14px;padding:.85rem 0;cursor:pointer;transition:.2s ease}
.sn-fund-chip:hover{border-color:rgba(255,107,53,.4)}
.sn-fund-chip-on{background:var(--o);color:#fff;border-color:var(--o)}
.sn-fund-total{display:flex;align-items:baseline;gap:10px;padding:14px 0 18px;border-top:1px solid rgba(10,11,20,.08);border-bottom:1px solid rgba(10,11,20,.08);margin-bottom:18px}
.sn-fund-total span{font-size:.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.sn-fund-total strong{font-family:var(--disp);font-weight:600;font-size:1.15rem;color:var(--ink)}
.sn-fund-total em{margin-left:auto;font-style:normal;font-family:var(--disp);font-weight:700;font-size:1.6rem;color:var(--o)}
.sn-fund-fine{margin-top:14px;font-size:.76rem;line-height:1.5;color:var(--muted);text-align:center}
.sn-sponsor-openbtn{display:flex;flex-direction:column;align-items:center;gap:16px;width:100%;background:none;border:none;padding:0;margin:0;cursor:pointer;font-family:inherit}
.sn-sponsor-openbtn .sn-sponsor-logo{transition:border-color .24s ease,background .24s ease}
.sn-sponsor-openbtn:hover .sn-sponsor-logo-open{border-color:var(--o);background:rgba(255,107,53,.06)}
.sn-sponsor-openbtn:hover .sn-sponsor-link-open{color:var(--o-deep)}

/* Sponsor modal */
.sn-modal{position:fixed;inset:0;z-index:120;display:flex;align-items:center;justify-content:center;padding:24px}
.sn-modal-scrim{position:absolute;inset:0;background:rgba(6,7,14,.72);backdrop-filter:blur(4px);animation:sn-fade .25s ease}
@keyframes sn-fade{from{opacity:0}}
.sn-modal-card{position:relative;z-index:1;width:100%;max-width:720px;max-height:88vh;overflow-y:auto;background:#fff;border-radius:24px;padding:40px 40px 34px;box-shadow:0 40px 120px rgba(0,0,0,.5);animation:sn-modal-in .32s cubic-bezier(.2,.9,.3,1)}
@keyframes sn-modal-in{from{opacity:0;transform:translateY(24px) scale(.98)}}
.sn-modal-x{position:absolute;top:18px;right:18px;width:38px;height:38px;border-radius:50%;border:none;background:var(--cream);color:var(--ink);font-size:1rem;cursor:pointer;transition:.2s ease}
.sn-modal-x:hover{background:var(--o);color:#fff;transform:rotate(90deg)}
.sn-modal-h{font-family:var(--disp);font-weight:600;font-size:clamp(1.5rem,3vw,2.1rem);color:var(--ink);letter-spacing:-.02em;line-height:1.08;margin:10px 0 0}
.sn-modal-price{display:flex;align-items:baseline;gap:12px;margin:18px 0 4px;padding:14px 20px;background:var(--ink);border-radius:16px;width:fit-content}
.sn-modal-price strong{font-family:var(--disp);font-weight:700;font-size:2.2rem;color:var(--o);line-height:1;letter-spacing:-.02em}
.sn-modal-price span{font-size:.8rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.66)}
.sn-modal-cols{display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:26px}
.sn-modal-colh{font-family:var(--disp);font-weight:700;font-size:.82rem;letter-spacing:.14em;text-transform:uppercase;margin-bottom:12px}
.sn-modal-colh-blue{color:var(--cobalt)}
.sn-modal-colh-orange{color:var(--o)}
.sn-modal-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
.sn-modal-list li{position:relative;padding-left:26px;font-size:.97rem;line-height:1.5;color:var(--txt,#111528)}
.sn-modal-list li:before{content:"★";position:absolute;left:0;top:1px;color:var(--o);font-size:.8rem}
.sn-modal-col:nth-child(2) .sn-modal-list li:before{color:var(--cobalt)}
.sn-modal-contact{margin-top:30px;padding-top:24px;border-top:1px solid rgba(10,11,20,.1)}
.sn-modal-contact-label{font-size:.95rem;color:var(--muted);margin-bottom:14px;font-weight:600}
.sn-modal-contact-row{display:flex;flex-wrap:wrap;gap:10px}
.sn-modal-btn{display:inline-flex;align-items:center;font-family:var(--disp);font-weight:600;font-size:.92rem;color:var(--ink);text-decoration:none;background:var(--cream);border:1.5px solid rgba(10,11,20,.12);border-radius:999px;padding:.75rem 1.2rem;transition:.2s ease}
.sn-modal-btn:hover{border-color:var(--cobalt);transform:translateY(-2px)}
.sn-modal-btn-primary{background:var(--o);color:#fff;border-color:var(--o)}
.sn-modal-btn-primary:hover{background:var(--o-deep);border-color:var(--o-deep)}

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
.sn-success-mark{width:58px;height:58px;border-radius:50%;background:var(--flag-blue);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.7rem;font-weight:900;margin-bottom:22px;animation:sn-pop .5s cubic-bezier(.2,1.4,.4,1)}
@keyframes sn-pop{from{transform:scale(0)}}
.sn-success h3{font-family:var(--disp);font-weight:600;font-size:1.6rem;color:var(--ink);letter-spacing:-.02em;line-height:1.15}
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
.sn-stat strong{font-family:var(--disp);font-weight:700;font-size:2.5rem;line-height:1;color:var(--o);letter-spacing:-.03em;min-width:80px}
.sn-stat:nth-child(3) strong{color:var(--blue-lite)}
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
.sn-faq-open .sn-faq-a{max-height:420px}
.sn-faq-a p{padding:0 60px 30px 0;font-size:1.02rem;line-height:1.72;color:var(--muted)}

.sn-final{background:var(--ink);padding:130px 0;text-align:center;position:relative;overflow:hidden}
.sn-final:before{content:"";position:absolute;left:0;right:0;bottom:0;height:10px;background:repeating-linear-gradient(90deg,var(--flag-red) 0,var(--flag-red) 40px,#fff 40px,#fff 80px);opacity:.5}
.sn-final h2{font-family:var(--disp);font-weight:600;letter-spacing:-.03em;line-height:.98;font-size:clamp(2.6rem,6.4vw,5.6rem);color:#fff}
.sn-final em{font-style:normal;color:var(--o)}
.sn-final p{margin:26px 0 38px;font-size:1.1rem;color:rgba(255,255,255,.6)}

.sn-bar{position:fixed;left:16px;right:16px;bottom:16px;z-index:70;display:flex;align-items:center;justify-content:space-between;gap:16px;background:var(--ink);border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:.7rem .7rem .7rem 1.4rem;box-shadow:0 20px 50px rgba(0,0,0,.35);transform:translateY(140%);opacity:0;transition:transform .45s cubic-bezier(.2,.7,.2,1),opacity .35s;max-width:560px;margin:0 auto}
.sn-bar-in{transform:none;opacity:1}
.sn-bar span{font-size:.9rem;color:rgba(255,255,255,.7);font-weight:600}
.sn-bar strong{color:var(--o);font-family:var(--disp);font-size:1.05rem}

@media(max-width:900px){
.sn-hero{padding:140px 0 0}
.sn-photo{background-position:center 34%}
.sn-shade{background:linear-gradient(180deg,rgba(10,11,20,.92) 0%,rgba(10,11,20,.82) 45%,rgba(10,49,97,.5) 82%,rgba(178,34,52,.32) 100%)}
.sn-hero-grid{grid-template-columns:1fr;gap:34px;align-items:start}
.sn-hero-main{justify-content:flex-start}
.sn-side{gap:16px}
.sn-hero-cta{gap:14px}
.sn-brought{max-width:360px}
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
.sn-fund{padding:90px 0}
.sn-fund-grid{grid-template-columns:1fr;gap:36px}
.sn-sponsor-grid,.sn-sponsor-grid-5{grid-template-columns:1fr 1fr;gap:14px}
.sn-reserve{padding:90px 0}
.sn-reserve-grid{grid-template-columns:1fr;gap:44px}
.sn-form-card{padding:32px 24px}
.sn-host{padding:90px 0}
.sn-host-grid{grid-template-columns:1fr;gap:44px}
.sn-host-panel{padding:34px 26px}
.sn-stat strong{font-size:2rem;min-width:64px}
.sn-faq{padding:90px 0}
.sn-faq-a p{padding-right:0}
.sn-final{padding:90px 0}
.sn-modal-card{padding:30px 22px 26px}
.sn-modal-cols{grid-template-columns:1fr;gap:22px}
}
@media(prefers-reduced-motion:reduce){
.sn-reveal{opacity:1;transform:none;transition:none}
.sn-track,.sn-photo{animation:none}
.sn-flag-cloth{animation:none}
}
`;
