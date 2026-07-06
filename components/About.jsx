"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { useScrollProgress, mapRange } from "./useScroll";

export default function About() {
  const sectionRef = useRef(null);
  const p = useScrollProgress(sectionRef);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Desktop: pinned swing-in animation lands by p=0.4.
  // Mobile: no pin, no transform — static stacked section.
  const photoStyle = isMobile
    ? { opacity: 1 }
    : {
        transform: `translateX(${mapRange(p, 0.05, 0.4, -400, 0)}px) rotate(${mapRange(p, 0.05, 0.4, -60, 0)}deg)`,
        opacity: mapRange(p, 0.05, 0.35, 0, 1),
        transition: "transform 80ms linear, opacity 80ms linear",
        willChange: "transform, opacity",
        transformOrigin: "center center",
      };

  const copyStyle = isMobile
    ? { opacity: 1 }
    : {
        transform: `translateX(${mapRange(p, 0.05, 0.4, 400, 0)}px) rotate(${mapRange(p, 0.05, 0.4, 60, 0)}deg)`,
        opacity: mapRange(p, 0.05, 0.35, 0, 1),
        transition: "transform 80ms linear, opacity 80ms linear",
        willChange: "transform, opacity",
        transformOrigin: "center center",
      };

  const outerStyle = isMobile
    ? { position: "relative" }
    : { position: "relative", height: "220vh" };

  const innerStyle = isMobile
    ? { position: "relative" }
    : {
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      };

  return (
    <section id="about" ref={sectionRef} style={outerStyle}>
      <div className="about" style={innerStyle}>
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
