"use client";

// app/shotlocal/page.jsx
// Public page, not linked in the main nav. Reach it at gvonflue.vercel.app/shotlocal
//
// SWAP CHECKLIST before you go live:
//   1. Video IDs  -> replace the three YT_ID_x values below with your real YouTube IDs
//   2. Brand names -> update the label + blurb under each video if needed
//   3. Headshot    -> optional, drop a photo in /public and swap the monogram block (see HERO note)
//   4. Retainer    -> change PARTNER price if you want it higher or lower

const VIDEOS = [
  {
    id: "YT_ID_ONE",
    brand: "Eyewear Junkie",
    blurb: "A local spec shop with a personality. We made it feel like one.",
  },
  {
    id: "YT_ID_TWO",
    brand: "The Commerce Club",
    blurb: "Turning a night out into content people actually finished watching.",
  },
  {
    id: "YT_ID_THREE",
    brand: "The Commerce Club",
    blurb: "Same room, different story. Proof one brand can go a lot of directions.",
  },
];

const INCLUDED = [
  "One scroll stopping vertical video, ready for Reels, TikTok, and Shorts",
  "Cleared for your social and your website",
  "One round of revisions, dialed in until it feels right",
  "Delivered in 5 to 7 days",
  "The raw clips are yours to keep",
  "Cross posted to my Wichita audience for extra reach",
];

const TIERS = [
  {
    name: "The One Off",
    price: "$250",
    unit: "one video",
    pitch: "Perfect for testing the waters or a single campaign.",
    points: ["1 finished video", "Everything in What You Get"],
    featured: false,
  },
  {
    name: "The Four Pack",
    price: "$800",
    unit: "four videos",
    pitch: "A full month of content, and you save $200.",
    points: [
      "4 finished videos",
      "Save $200 versus one at a time",
      "Priority on my schedule",
      "Everything in What You Get",
    ],
    featured: true,
    badge: "Most Popular",
  },
  {
    name: "The Partner",
    price: "$750",
    unit: "per month",
    pitch: "Four fresh videos every month. This is the relationship play.",
    points: [
      "4 new videos every month",
      "My best per video rate",
      "First look at new formats",
      "A quick game plan call each quarter",
    ],
    featured: false,
  },
];

export default function ShotLocalPage() {
  return (
    <main className="work">
      {/* HERO / ABOUT
          To use a photo instead of the monogram: replace the .monogram div with
          <img className="shot" src="/garrett-headshot.jpg" alt="Garrett Von Flue" /> */}
      <section className="hero">
        <div className="glow" aria-hidden="true" />
        <div className="wrap heroGrid">
          <div className="heroText">
            <div className="wordmark">Shot Local</div>
            <p className="eyebrow">No suit · No jargon · Just keys</p>
            <h1>Hey, I'm Garrett.</h1>
            <p className="lead">
              I'm a Wichita realtor who got tired of renting attention from the big
              portals, so I started building my own. Between my real estate work and
              DuckWichita, I spend my days making content that actual people in this
              city stop and watch.
            </p>
            <p className="lead">
              I support local because local supported me first. The coffee shops, the
              barbers, the family run brands, the folks who show up. When I make
              something for your brand, I am not handing you another ad that gets
              scrolled past. I am telling your story like a human, and I am putting it
              in front of a real Wichita audience that already trusts me.
            </p>
            <p className="lead strong">
              That is the whole game for me. Make good work, build real relationships,
              and help local win.
            </p>
            <div className="heroCta">
              <a className="btn btnPrimary" href="https://calendly.com/gvonflue-all0/30min" target="_blank" rel="noopener noreferrer">
                Book a 30 minute call
              </a>
              <a className="btn btnGhost" href="#work">See the work</a>
            </div>
          </div>
          <div className="heroAside">
            <div className="monogram" aria-hidden="true">GVF</div>
            <p className="asideCaption">Relationship First Content · Wichita, KS</p>
          </div>
        </div>
      </section>

      {/* THE WORK */}
      <section id="work" className="section light">
        <div className="wrap">
          <p className="eyebrow dark">The work</p>
          <h2>Real brands. Real reach.</h2>
          <p className="sectionLead">
            A few of the videos I have made for local brands. Every one was built to
            keep people watching, not to sell at them.
          </p>
          <div className="reelGrid">
            {VIDEOS.map((v, i) => (
              <article className="reel" key={i}>
                <div className="phone">
                  {/* Vertical embed for Reels and Shorts. If a video is landscape,
                      change the .phone aspect-ratio to 16 / 9 in the styles below. */}
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.brand}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="reelBrand">{v.brand}</h3>
                <p className="reelBlurb">{v.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="section ink">
        <div className="wrap">
          <p className="eyebrow">Every single video</p>
          <h2 className="onDark">What you get</h2>
          <p className="sectionLead onDark">
            No fine print games. This comes standard with every video, at every price.
          </p>
          <ul className="getList">
            {INCLUDED.map((item, i) => (
              <li key={i}>
                <span className="check" aria-hidden="true">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section light">
        <div className="wrap">
          <p className="eyebrow dark">Pricing</p>
          <h2>Simple, honest, local.</h2>
          <p className="sectionLead">
            Built for locally owned Wichita area brands. Bigger scope? Let's talk.
          </p>
          <div className="tierGrid">
            {TIERS.map((t, i) => {
              const cardClass = t.featured ? "tier tierFeatured" : "tier";
              const btnClass = t.featured ? "btn btnOrange tierBtn" : "btn btnPrimary tierBtn";
              return (
                <div className={cardClass} key={i}>
                  {t.badge && <span className="badge">{t.badge}</span>}
                  <h3 className="tierName">{t.name}</h3>
                  <div className="tierPrice">
                    <span className="amount">{t.price}</span>
                    <span className="per">{t.unit}</span>
                  </div>
                  <p className="tierPitch">{t.pitch}</p>
                  <ul className="tierPoints">
                    {t.points.map((p, j) => (
                      <li key={j}><span className="dot" aria-hidden="true">·</span>{p}</li>
                    ))}
                  </ul>
                  <a className={btnClass} href="https://calendly.com/gvonflue-all0/30min" target="_blank" rel="noopener noreferrer">Let's talk</a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="section ink closer">
        <div className="wrap closerWrap">
          <p className="eyebrow">Let's build something</p>
          <h2 className="onDark big">Your brand has a story. I'll help you tell it.</h2>
          <p className="sectionLead onDark">
            Grab a time, tell me about your brand, and let's make something people
            actually want to watch.
          </p>
          <a className="btn btnOrange lg" href="https://calendly.com/gvonflue-all0/30min" target="_blank" rel="noopener noreferrer">
            Book a 30 minute call
          </a>
          <p className="signoff">No suit · No jargon · Just keys</p>
        </div>
      </section>

      <style jsx>{`
        .work {
          --ink: #0a0b14;
          --cream: #fbf6ea;
          --cobalt: #1338be;
          --orange: #ff6b35;
          --disp: var(--disp), "Clash Display", system-ui, sans-serif;
          --body: var(--body), "Satoshi", system-ui, sans-serif;
          font-family: var(--body);
          color: var(--ink);
          background: var(--cream);
          overflow-x: hidden;
        }
        .wrap {
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 28px;
        }
        h1, h2, h3 {
          font-family: var(--disp);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.02;
          margin: 0;
        }
        .eyebrow {
          font-family: var(--disp);
          text-transform: uppercase;
          letter-spacing: 0.22em;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--orange);
          margin: 0 0 14px;
        }
        .eyebrow.dark { color: var(--cobalt); }

        .wordmark {
          display: flex;
          align-items: center;
          gap: 11px;
          font-family: var(--disp);
          font-weight: 700;
          font-size: 1.12rem;
          letter-spacing: 0.02em;
          color: var(--cream);
          margin: 0 0 34px;
        }
        .wordmark::before {
          content: "";
          width: 12px;
          height: 12px;
          border-radius: 3px;
          background: var(--orange);
          box-shadow: 0 0 14px rgba(255,107,53,0.75);
        }

        /* HERO */
        .hero {
          position: relative;
          background: var(--ink);
          color: var(--cream);
          padding: 96px 0 104px;
          overflow: hidden;
        }
        .glow {
          position: absolute;
          top: -220px;
          right: -160px;
          width: 620px;
          height: 620px;
          background: radial-gradient(circle, rgba(255,107,53,0.42) 0%, rgba(255,107,53,0) 66%);
          pointer-events: none;
        }
        .heroGrid {
          position: relative;
          display: grid;
          grid-template-columns: 1.55fr 1fr;
          gap: 56px;
          align-items: center;
        }
        .heroText h1 {
          font-size: clamp(2.8rem, 6vw, 4.4rem);
          margin-bottom: 22px;
        }
        .lead {
          font-size: 1.06rem;
          line-height: 1.6;
          color: rgba(251,246,234,0.82);
          margin: 0 0 18px;
          max-width: 42ch;
        }
        .lead.strong {
          color: var(--cream);
          font-weight: 600;
        }
        .heroCta {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 30px;
        }
        .heroAside {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
        }
        .monogram {
          width: 220px;
          height: 220px;
          border-radius: 28px;
          display: grid;
          place-items: center;
          font-family: var(--disp);
          font-weight: 700;
          font-size: 3.4rem;
          letter-spacing: 0.04em;
          color: var(--cream);
          background: linear-gradient(150deg, var(--cobalt), #0c249a);
          border: 1px solid rgba(255,107,53,0.5);
          box-shadow: 0 24px 60px rgba(19,56,190,0.45), 0 0 0 6px rgba(255,107,53,0.08);
        }
        .shot {
          width: 220px;
          height: 260px;
          object-fit: cover;
          border-radius: 28px;
          border: 1px solid rgba(255,107,53,0.5);
          box-shadow: 0 24px 60px rgba(0,0,0,0.4);
        }
        .asideCaption {
          font-size: 0.82rem;
          letter-spacing: 0.04em;
          color: rgba(251,246,234,0.7);
          text-align: center;
          margin: 0;
        }

        /* BUTTONS */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: var(--disp);
          font-weight: 600;
          font-size: 0.98rem;
          letter-spacing: 0.01em;
          padding: 15px 26px;
          border-radius: 999px;
          text-decoration: none;
          transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;
          cursor: pointer;
        }
        .btn:hover { transform: translateY(-2px); }
        .btnPrimary {
          background: var(--cobalt);
          color: var(--cream);
          box-shadow: 0 10px 26px rgba(19,56,190,0.35);
        }
        .btnPrimary:hover { box-shadow: 0 14px 34px rgba(19,56,190,0.5); }
        .btnOrange {
          background: var(--orange);
          color: var(--ink);
          box-shadow: 0 10px 26px rgba(255,107,53,0.4);
        }
        .btnOrange:hover { box-shadow: 0 16px 40px rgba(255,107,53,0.6); }
        .btnGhost {
          background: transparent;
          color: var(--cream);
          border: 1px solid rgba(251,246,234,0.4);
        }
        .btnGhost:hover { border-color: var(--orange); color: var(--orange); }
        .btn.lg { padding: 18px 36px; font-size: 1.08rem; }

        /* SECTIONS */
        .section { padding: 88px 0; }
        .section.light { background: var(--cream); }
        .section.ink { background: var(--ink); color: var(--cream); }
        .section h2 {
          font-size: clamp(2rem, 4.2vw, 3rem);
          margin-bottom: 16px;
        }
        .onDark { color: var(--cream); }
        .sectionLead {
          font-size: 1.08rem;
          line-height: 1.6;
          max-width: 54ch;
          color: rgba(10,11,20,0.72);
          margin: 0 0 44px;
        }
        .sectionLead.onDark { color: rgba(251,246,234,0.78); }

        /* REELS */
        .reelGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 34px;
        }
        .reel { text-align: left; }
        .phone {
          position: relative;
          aspect-ratio: 9 / 16;
          border-radius: 26px;
          overflow: hidden;
          background: #000;
          border: 1px solid rgba(10,11,20,0.12);
          box-shadow: 0 20px 48px rgba(10,11,20,0.16);
        }
        .phone iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .reelBrand {
          font-size: 1.22rem;
          margin: 20px 0 6px;
          color: var(--cobalt);
        }
        .reelBlurb {
          font-size: 0.98rem;
          line-height: 1.5;
          color: rgba(10,11,20,0.7);
          margin: 0;
        }

        /* WHAT YOU GET */
        .getList {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px 40px;
          max-width: 900px;
        }
        .getList li {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 1.06rem;
          line-height: 1.5;
          color: rgba(251,246,234,0.9);
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(251,246,234,0.12);
        }
        .check {
          color: var(--orange);
          font-weight: 700;
          font-size: 1.4rem;
          line-height: 1;
        }

        /* PRICING */
        .tierGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 26px;
          align-items: stretch;
        }
        .tier {
          position: relative;
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid rgba(10,11,20,0.12);
          border-radius: 22px;
          padding: 34px 28px;
        }
        .tierFeatured {
          border: 2px solid var(--orange);
          box-shadow: 0 0 0 6px rgba(255,107,53,0.12), 0 26px 60px rgba(255,107,53,0.32);
          transform: translateY(-10px);
        }
        .badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--orange);
          color: var(--ink);
          font-family: var(--disp);
          font-weight: 600;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 7px 16px;
          border-radius: 999px;
          white-space: nowrap;
        }
        .tierName {
          font-size: 1.4rem;
          color: var(--ink);
          margin-bottom: 14px;
        }
        .tierPrice {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 12px;
        }
        .amount {
          font-family: var(--disp);
          font-weight: 700;
          font-size: 2.8rem;
          color: var(--cobalt);
          letter-spacing: -0.02em;
        }
        .per {
          font-size: 0.92rem;
          color: rgba(10,11,20,0.55);
        }
        .tierPitch {
          font-size: 0.98rem;
          line-height: 1.5;
          color: rgba(10,11,20,0.72);
          margin: 0 0 22px;
          min-height: 46px;
        }
        .tierPoints {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-grow: 1;
        }
        .tierPoints li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.98rem;
          line-height: 1.45;
          color: rgba(10,11,20,0.85);
        }
        .dot { color: var(--orange); font-weight: 700; }
        .tierBtn { width: 100%; }

        /* CLOSER */
        .closer { text-align: center; }
        .closerWrap {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .closer .sectionLead { text-align: center; }
        .closer h2.big { font-size: clamp(2.2rem, 5vw, 3.4rem); max-width: 16ch; }
        .signoff {
          font-family: var(--disp);
          text-transform: uppercase;
          letter-spacing: 0.22em;
          font-size: 0.74rem;
          color: rgba(251,246,234,0.6);
          margin: 30px 0 0;
        }

        /* MOBILE */
        @media (max-width: 900px) {
          .hero { padding: 64px 0 72px; }
          .heroGrid { grid-template-columns: 1fr; gap: 40px; }
          .heroAside { order: -1; align-items: flex-start; }
          .monogram { width: 150px; height: 150px; font-size: 2.4rem; border-radius: 22px; }
          .asideCaption { text-align: left; }
          .lead { max-width: none; }
          .section { padding: 60px 0; }
          .reelGrid { grid-template-columns: 1fr; gap: 40px; max-width: 420px; margin: 0 auto; }
          .getList { grid-template-columns: 1fr; gap: 0; }
          .tierGrid { grid-template-columns: 1fr; gap: 34px; }
          .tierFeatured { transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .btn { transition: none; }
          .btn:hover { transform: none; }
        }
      `}</style>
    </main>
  );
}
