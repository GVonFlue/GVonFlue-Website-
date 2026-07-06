"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import Reveal from "./Reveal";
import { useScrollProgress, mapRange } from "./useScroll";

const VIDEO_ID = "PGIN6MfYS1k";

export default function Hero() {
  const ref = useRef(null);
  const p = useScrollProgress(ref);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 901px)").matches) {
      setPlaying(true);
    }
  }, []);

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
            <a href="https://calendly.com/gvonflue-all0/30min" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">
              Schedule a Call
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
              <strong>120+ families</strong> guided home, and counting.
            </p>
          </Reveal>
        </div>

        <div className="hero-card" style={{ position: "relative", zIndex: 10 }}>
          <div
            className="hero-photo"
            style={{ ...cardStyle, position: "relative", zIndex: 10, pointerEvents: "auto" }}
          >
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=1&rel=0&modestbranding=1&playsinline=1`}
                title="Meet Garrett · GVonFlue Real Estate"
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
                }}
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play video: Meet Garrett"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  padding: 0,
                  border: "none",
                  cursor: "pointer",
                  background: "transparent",
                  borderRadius: "26px",
                  overflow: "hidden",
                  zIndex: 10,
                }}
              >
                <img
                  src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                  alt="Meet Garrett · GVonFlue Real Estate"
                  onError={(e) => {
                    e.currentTarget.src = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`;
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.38))",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 74,
                    height: 74,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,.94)",
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "0 12px 34px rgba(0,0,0,.4)",
                  }}
                >
                  <Play size={30} style={{ color: "#0A0B14", fill: "#0A0B14", marginLeft: 3 }} />
                </span>
              </button>
            )}
          </div>
        </div>
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
