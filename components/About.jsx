"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { useScrollProgress, mapRange } from "./useScroll";

export default function About() {
  const sectionRef = useRef(null);
  const p = useScrollProgress(sectionRef);

  // Section is 200vh tall + content pinned via sticky.
  // Animation runs from p=0.1 (entry) to p=0.55 (landed).
  // From 0.55 to 1.0, content holds in place — then scrolls out.
  const photoStyle = {
    transform: `translateX(${mapRange(p, 0.1, 0.55, -400, 0)}px) rotate(${mapRange(p, 0.1, 0.55, -60, 0)}deg)`,
    opacity: mapRange(p, 0.1, 0.45, 0, 1),
    transition: "transform 80ms linear, opacity 80ms linear",
    willChange: "transform, opacity",
    transformOrigin: "center center",
  };

  const copyStyle = {
    transform: `translateX(${mapRange(p, 0.1, 0.55, 400, 0)}px) rotate(${mapRange(p, 0.1, 0.55, 60, 0)}deg)`,
    opacity: mapRange(p, 0.1, 0.45, 0, 1),
    transition: "transform 80ms linear, opacity 80ms linear",
    willChange: "transform, opacity",
    transformOrigin: "center center",
  };

  return (
    <section
      className="about"
      id="about"
      ref={sectionRef}
      style={{ position: "relative", height: "200vh", overflow: "hidden" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="section-wrap about-grid" style={{ width: "100%" }}>
          <div className="about-photo" style={photoStyle}>
            <div className="about-photo-inner">
              <img
                src="/images/team-photo.jpg"
                alt="Garrett von Flue and business partner"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </div>
            <div className="about-stat">
              <strong>5★</strong>
              <span>How clients describe the experience</span>
            </div>
          </div>

          <div className="about-copy" style={copyStyle}>
            <Reveal as="span" className="section-kicker">
              01 — Who you&apos;re working with
            </Reveal>
            <Reveal as="h2" delay={60} className="section-title">
              Real person. Real answers. Zero corporate script.
            </Reveal>
            <Reveal as="p" delay={120}>
              I got into real estate because buying a home is one of the biggest
              things most people do — and almost no one explains how it actually
              works. So I made that my whole thing: walking first-time buyers
              through every step in plain English, on your timeline, with no
              pushing.
            </Reveal>
            <Reveal as="p" delay={180}>
              You&apos;ll always know what&apos;s next, why it matters, and what
              it means for your money. And when you need a lender, an inspector,
              or honestly the best lunch near a showing — I know a person.
            </Reveal>
            <Reveal delay={240} className="signature">
              Garrett Von Flue
              <span>REALTOR® · Real Broker LLC</span>
            </Reveal>
            <Reveal delay={300} style={{ marginTop: "28px" }}>
              <Link href="/about" className="btn btn-gold btn-lg">
                More about Garrett <ArrowUpRight size={20} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
