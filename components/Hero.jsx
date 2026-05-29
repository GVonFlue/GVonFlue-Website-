"use client";

import { useRef } from "react";
import { ArrowUpRight, Compass } from "lucide-react";
import Reveal from "./Reveal";
import { useScrollProgress, mapRange } from "./useScroll";

export default function Hero() {
  const ref = useRef(null);
  const p = useScrollProgress(ref);

  // Scroll-linked: copy drifts up & fades, photo lifts + zooms, mesh parallaxes
  const copyStyle = {
    transform: `translateY(${mapRange(p, 0.4, 1, 0, -70)}px)`,
    opacity: mapRange(p, 0.55, 1, 1, 0.35),
  };
  const cardStyle = {
    transform: `translateY(${mapRange(
      p,
      0.4,
      1,
      0,
      -130
    )}px) scale(${mapRange(p, 0.4, 1, 1, 1.08)})`,
  };
  const meshStyle = {
    transform: `translateY(${mapRange(p, 0, 1, 0, 120)}px) scale(${mapRange(
      p,
      0,
      1,
      1,
      1.15
    )})`,
  };

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-mesh" style={meshStyle} />
      <div className="hero-grain" />
      <div className="hero-grid" style={copyStyle}>
        <div className="hero-copy">
          <Reveal as="span" className="eyebrow">
            <span className="eyebrow-dot" /> Wichita &amp; Surrounding Areas
          </Reveal>
          <Reveal as="h1" delay={80} className="hero-title">
            Your first home,
            <br />
            <em>none</em> of the guesswork.
          </Reveal>
          <Reveal as="p" delay={160} className="hero-sub">
            I&apos;m Garrett. I help first-time buyers go from
            <span className="hl">
              {" "}
              &ldquo;where do we even start?&rdquo;
            </span>{" "}
            to keys in hand — without the jargon, the pressure, or the wasted
            weekends.
          </Reveal>
          <Reveal delay={240} className="hero-ctas">
            <a href="#guide" className="btn btn-gold btn-lg">
              Get the Free Homebuyer Guide <ArrowUpRight size={20} />
            </a>
            <a href="#listings" className="btn btn-ghost btn-lg">
              Browse Listings
            </a>
          </Reveal>
          <Reveal delay={320} className="hero-trust">
            <div className="avatars">
              <span />
              <span />
              <span />
              <span />
            </div>
            <p>
              <strong>120+ families</strong> guided home — and counting.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="hero-card">
          <div className="hero-photo" style={cardStyle}>
            <span className="photo-tag">That&apos;s me 👋</span>
          </div>
          <div className="hero-badge">
            <Compass size={18} />
            <div>
              <strong>Local connector</strong>
              <span>Lender, inspector, the good taco spot</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="hero-marquee">
        <div className="marquee-track">
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <span key={i}>
                FIRST-TIME BUYERS <i>✦</i> RELOCATIONS <i>✦</i> YOUNG PROS{" "}
                <i>✦</i> NO PRESSURE <i>✦</i> REAL ANSWERS <i>✦</i>{" "}
              </span>
            ))}
        </div>
      </div>
    </section>
  );
}
