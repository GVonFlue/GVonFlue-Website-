import { Instagram, Play } from "lucide-react";
import Reveal from "./Reveal";

const CLIPS = [
  { t: "Inside a $285K Wichita starter home", k: "Listing tour" },
  { t: "5 things first-timers always forget", k: "Buyer tips" },
  { t: "Is Riverside actually worth it?", k: "Neighborhood" },
  { t: "How much you really need to buy", k: "Money talk" },
];

export default function Social() {
  return (
    <section className="social">
      <div className="section-wrap">
        <div className="social-head">
          <div>
            <Reveal as="span" className="section-kicker">
              04 — From the feed
            </Reveal>
            <Reveal as="h2" delay={60} className="section-title">
              Tours, tips &amp; the occasional hot take
            </Reveal>
          </div>
          <Reveal delay={120} className="social-follow">
            <a
              href="https://instagram.com/gvonflue"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark btn-sm"
            >
              <Instagram size={16} /> Follow along
            </a>
          </Reveal>
        </div>
        <div className="social-grid">
          {CLIPS.map((c, i) => (
            <Reveal key={c.t} delay={i * 70} className="clip">
              <div className="clip-thumb">
                <span className="clip-play">
                  <Play size={20} fill="currentColor" />
                </span>
                <span className="clip-kicker">{c.k}</span>
              </div>
              <p>{c.t}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
