"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { useScrollProgress, mapRange } from "./useScroll";

export default function Hero() {
  const ref = useRef(null);
  const p = useScrollProgress(ref);

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
            Relationship First
            <br />
            Real <em>Estate</em>.
          </Reveal>
          <Reveal as="p" delay={160} className="hero-sub">
            No suit. No jargon. Just <span className="hl">keys.</span>
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

        <Reveal delay={200} className="hero-card" style={{ position: "relative", zIndex: 10 }}>
          <div
            className="hero-photo"
            style={{ ...cardStyle, position: "relative", zIndex: 10, pointerEvents: "auto" }}
          >
            <iframe
              src="https://www.youtube.com/embed/PGIN6MfYS1k?autoplay=1&mute=1&loop=1&playlist=PGIN6MfYS1k&controls=1&rel=0&modestbranding=1&playsinline=1"
              title="Meet Garrett — GVonFlue Real Estate"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "26px",
                zIndex: 10,
                pointerEvents: "auto",
              }}
            />
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
