// app/shotlocal/page.jsx
// Public page, not linked in the main nav. Reach it at gvonflue.vercel.app/shotlocal
// Built on the gvonflue brand system: reuses global classes from styles/globals.css
// plus the shared Nav and Footer.
//
// SWAP CHECKLIST before you go live:
//   1. Video IDs  -> replace the three YT_ID_x values with your real YouTube IDs
//                    (VIDEOS[0] is also the flagship reel in the hero)
//   2. Brand names -> update the label + blurb under each video if needed
//   3. Retainer    -> change the Partner price if you want it higher or lower
//   4. Glow color  -> pricing uses gold. To go back to DuckWichita orange, swap
//                     var(--gold) for #FF6B35 in the .sl-tierFeatured + .sl-badge rules.

import { ArrowUpRight } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Shot Local · Brand Video for Wichita Businesses",
  description:
    "Short brand videos that people actually watch, made for locally owned Wichita businesses and put in front of a real local audience.",
};

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

const MARQUEE =
  "REELS ✦ BRAND VIDEOS ✦ SOCIAL CONTENT ✦ LOCAL STORIES ✦ NO SUIT ✦ JUST KEYS ✦ ";

export default function ShotLocalPage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-mesh" />
        <div className="hero-grain" />
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" /> Shot Local · Wichita
            </span>
            <h1 className="hero-title">
              Local brands,
              <br />
              <em>impossible</em> to scroll past.
            </h1>
            <p className="hero-sub">
              I make short videos that people actually watch, then put them in
              front of a Wichita audience that already trusts <span className="hl">me.</span>
            </p>
            <div className="hero-ctas">
              <a href="https://calendly.com/gvonflue-all0/30min" target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg">
                Book a 30 minute call <ArrowUpRight size={20} />
              </a>
              <a href="#work" className="btn btn-ghost btn-lg">
                See the work
              </a>
            </div>
            <div className="hero-trust">
              <p>
                Real videos for <strong>Eyewear Junkie</strong>,{" "}
                <strong>The Commerce Club</strong>, and your brand next.
              </p>
            </div>
          </div>

          <div className="hero-card">
            <div className="sl-hero-video">
              <iframe src={`https://www.youtube.com/embed/${VIDEOS[0].id}`} title={`${VIDEOS[0].brand} · Shot Local`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          </div>
        </div>

        <div className="hero-marquee">
          <div className="marquee-track">
            <span>{MARQUEE}</span>
            <span>{MARQUEE}</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="sl-section">
        <div className="section-wrap">
          <span className="section-kicker">About</span>
          <h2 className="section-title">Hey, I'm Garrett.</h2>
          <div className="sl-about">
            <div className="sl-about-copy">
              <p>
                I'm a Wichita realtor who got tired of renting attention from the
                big portals, so I started building my own. Between my real estate
                work and DuckWichita, I spend my days making content that actual
                people in this city stop and watch.
              </p>
              <p>
                I support local because local supported me first. The coffee shops,
                the barbers, the family run brands, the folks who show up. When I
                make something for your brand, I am not handing you another ad that
                gets scrolled past. I am telling your story like a human, and I am
                putting it in front of a real Wichita audience that already trusts me.
              </p>
              <p className="sl-strong">
                That is the whole game. Make good work, build real relationships,
                and help local win.
              </p>
            </div>
            <div className="sl-about-aside">
              <div className="signature">
                Garrett von Flue
                <span>Realtor · Real Broker LLC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE WORK */}
      <section className="sl-section sl-paper" id="work">
        <div className="section-wrap">
          <span className="section-kicker">The Work</span>
          <h2 className="section-title">Real brands. Real reach.</h2>
          <p className="sl-lead">
            A few videos I have made for local brands. Every one was built to keep
            people watching, not to sell at them.
          </p>
          <div className="sl-reelGrid">
            {VIDEOS.map((v, i) => (
              <article className="sl-reel" key={i}>
                <div className="sl-phone">
                  <iframe src={`https://www.youtube.com/embed/${v.id}`} title={v.brand} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
                <h3 className="sl-reelBrand">{v.brand}</h3>
                <p className="sl-reelBlurb">{v.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="sl-section sl-ink">
        <div className="section-wrap">
          <span className="section-kicker gold">Every single video</span>
          <h2 className="section-title">What you get.</h2>
          <p className="sl-lead">
            No fine print games. This comes standard with every video, at every price.
          </p>
          <ul className="sl-getList">
            {INCLUDED.map((item, i) => (
              <li key={i}>
                <span className="sl-check">✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRICING */}
      <section className="sl-section" id="pricing">
        <div className="section-wrap">
          <span className="section-kicker">Pricing</span>
          <h2 className="section-title">Simple, honest, local.</h2>
          <p className="sl-lead">
            Built for locally owned Wichita area brands. Bigger scope? Let's talk.
          </p>
          <div className="sl-tierGrid">
            {TIERS.map((t, i) => {
              const cardClass = t.featured ? "sl-tier sl-tierFeatured" : "sl-tier";
              const btnClass = t.featured
                ? "btn btn-gold btn-lg sl-tierBtn"
                : "btn btn-ghost btn-lg sl-tierBtn";
              return (
                <div className={cardClass} key={i}>
                  {t.badge && <span className="sl-badge">{t.badge}</span>}
                  <h3 className="sl-tierName">{t.name}</h3>
                  <div className="sl-tierPrice">
                    <span className="sl-amount">{t.price}</span>
                    <span className="sl-per">{t.unit}</span>
                  </div>
                  <p className="sl-tierPitch">{t.pitch}</p>
                  <ul className="sl-tierPoints">
                    {t.points.map((p, j) => (
                      <li key={j}>
                        <span className="sl-dot">✦</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a className={btnClass} href="https://calendly.com/gvonflue-all0/30min" target="_blank" rel="noopener noreferrer">Let's talk</a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="sl-section sl-ink sl-closer">
        <div className="section-wrap">
          <span className="section-kicker gold">Let's build something</span>
          <h2 className="section-title">Your brand has a story. I'll help you tell it.</h2>
          <p className="sl-lead">
            Grab a time, tell me about your brand, and let's make something people
            actually want to watch.
          </p>
          <a href="https://calendly.com/gvonflue-all0/30min" target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg">
            Book a 30 minute call <ArrowUpRight size={20} />
          </a>
          <p className="sl-signoff">No suit · No jargon · Just keys</p>
        </div>
      </section>

      <Footer />

      <style>{`
        .sl-hero-video {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: 26px;
          overflow: hidden;
          background: #000;
          border: 1px solid rgba(10,11,20,0.08);
          box-shadow: 0 30px 70px rgba(10,11,20,0.28);
        }
        .sl-hero-video iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        .sl-section { padding: 100px 0; background: var(--white); }
        .sl-section.sl-paper { background: var(--paper); }
        .sl-section.sl-ink { background: var(--ink); }
        .sl-section.sl-ink .section-title { color: #fff; }
        .sl-section.sl-ink .section-kicker { color: var(--gold); }

        .sl-lead {
          font-size: 1.12rem;
          line-height: 1.6;
          color: var(--muted);
          max-width: 56ch;
          margin: 18px 0 0;
        }
        .sl-section.sl-ink .sl-lead { color: rgba(255,255,255,0.74); }

        /* ABOUT */
        .sl-about {
          display: grid;
          grid-template-columns: 1.5fr 0.9fr;
          gap: 56px;
          align-items: start;
          margin-top: 30px;
        }
        .sl-about-copy p {
          font-size: 1.08rem;
          line-height: 1.65;
          color: var(--txt);
          margin: 0 0 18px;
          max-width: 54ch;
        }
        .sl-about-copy p.sl-strong { font-weight: 700; color: var(--ink); }

        /* REELS */
        .sl-reelGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 34px;
          margin-top: 44px;
        }
        .sl-phone {
          position: relative;
          aspect-ratio: 9 / 16;
          border-radius: 24px;
          overflow: hidden;
          background: #000;
          border: 1px solid rgba(10,11,20,0.1);
          box-shadow: 0 20px 48px rgba(10,11,20,0.16);
        }
        .sl-phone iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .sl-reelBrand {
          font-family: var(--disp);
          font-size: 1.25rem;
          color: var(--cobalt);
          margin: 20px 0 6px;
        }
        .sl-reelBlurb {
          font-size: 0.98rem;
          line-height: 1.5;
          color: var(--muted);
          margin: 0;
        }

        /* WHAT YOU GET */
        .sl-getList {
          list-style: none;
          padding: 0;
          margin: 44px 0 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 44px;
          max-width: 940px;
        }
        .sl-getList li {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 1.06rem;
          line-height: 1.5;
          color: rgba(255,255,255,0.9);
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .sl-check {
          color: var(--gold);
          font-weight: 700;
          font-size: 1.05rem;
          line-height: 1.4;
          flex-shrink: 0;
        }

        /* PRICING */
        .sl-tierGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 26px;
          align-items: stretch;
          margin-top: 44px;
        }
        .sl-tier {
          position: relative;
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid var(--mist);
          border-radius: 22px;
          padding: 34px 28px;
        }
        .sl-tierFeatured {
          border: 2px solid var(--gold);
          box-shadow: 0 0 0 6px rgba(231,181,60,0.14), 0 26px 60px rgba(231,181,60,0.3);
          transform: translateY(-10px);
        }
        .sl-badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--gold);
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
        .sl-tierName {
          font-family: var(--disp);
          font-size: 1.4rem;
          color: var(--ink);
          margin-bottom: 14px;
        }
        .sl-tierPrice {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 12px;
        }
        .sl-amount {
          font-family: var(--disp);
          font-weight: 600;
          font-size: 2.8rem;
          color: var(--cobalt);
          letter-spacing: -0.02em;
        }
        .sl-per { font-size: 0.92rem; color: var(--muted); }
        .sl-tierPitch {
          font-size: 0.98rem;
          line-height: 1.5;
          color: var(--muted);
          margin: 0 0 22px;
          min-height: 46px;
        }
        .sl-tierPoints {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-grow: 1;
        }
        .sl-tierPoints li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.98rem;
          line-height: 1.45;
          color: var(--txt);
        }
        .sl-dot { color: var(--gold); font-weight: 700; flex-shrink: 0; }
        .sl-tierBtn { width: 100%; justify-content: center; }

        /* CLOSER */
        .sl-closer .section-title { max-width: 20ch; }
        .sl-closer .btn { margin-top: 8px; }
        .sl-signoff {
          font-family: var(--disp);
          text-transform: uppercase;
          letter-spacing: 0.22em;
          font-size: 0.74rem;
          color: rgba(255,255,255,0.55);
          margin: 30px 0 0;
        }

        @media (max-width: 900px) {
          .sl-section { padding: 64px 0; }
          .sl-about { grid-template-columns: 1fr; gap: 28px; }
          .sl-reelGrid {
            grid-template-columns: 1fr;
            gap: 40px;
            max-width: 420px;
            margin-left: auto;
            margin-right: auto;
          }
          .sl-getList { grid-template-columns: 1fr; gap: 0; }
          .sl-tierGrid { grid-template-columns: 1fr; gap: 34px; }
          .sl-tierFeatured { transform: none; }
        }
      `}</style>
    </>
  );
}
