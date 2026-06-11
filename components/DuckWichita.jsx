"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles, Trophy, MapPin } from "lucide-react";
import Reveal from "./Reveal";

const ORANGE = "#FF6B35";
const COBALT = "#1338DE";
const INK = "#0A0B14";

const sectionStyle = {
  padding: "120px 24px",
  background: INK,
  position: "relative",
  overflow: "hidden",
};

const wrapStyle = {
  maxWidth: "1180px",
  margin: "0 auto",
  position: "relative",
  zIndex: 2,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1.1fr 1fr",
  gap: "60px",
  alignItems: "center",
};

const kickerStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 22px",
  background: ORANGE,
  color: "#FFFFFF",
  borderRadius: "999px",
  fontFamily: "var(--disp)",
  fontSize: ".85rem",
  fontWeight: 800,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  marginBottom: "28px",
};

const titleStyle = {
  fontFamily: "var(--disp)",
  fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
  lineHeight: 0.95,
  letterSpacing: "-.025em",
  margin: "0 0 24px",
  color: "#FFFFFF",
};

const orangeAccent = { color: ORANGE };

const bodyStyle = {
  fontSize: "1.2rem",
  lineHeight: 1.6,
  color: "rgba(255,255,255,.78)",
  margin: "0 0 20px",
};

const statsStyle = {
  display: "flex",
  gap: "32px",
  marginTop: "36px",
  flexWrap: "wrap",
};

const statStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: "rgba(255,255,255,.85)",
  fontSize: "1rem",
};

const statIconStyle = {
  display: "inline-flex",
  width: "36px",
  height: "36px",
  borderRadius: "10px",
  background: ORANGE,
  color: "#FFFFFF",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const ctaWrapStyle = {
  display: "flex",
  gap: "14px",
  marginTop: "44px",
  flexWrap: "wrap",
};

const primaryCtaStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "18px 32px",
  background: ORANGE,
  color: "#FFFFFF",
  borderRadius: "999px",
  fontFamily: "var(--disp)",
  fontWeight: 800,
  fontSize: "1.05rem",
  textDecoration: "none",
};

const ghostCtaStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "18px 32px",
  background: "transparent",
  color: "#FFFFFF",
  border: "1.5px solid rgba(255,255,255,.4)",
  borderRadius: "999px",
  fontFamily: "var(--disp)",
  fontWeight: 700,
  fontSize: "1.05rem",
  textDecoration: "none",
};

const visualWrapStyle = {
  position: "relative",
  aspectRatio: "1/1",
  maxWidth: "460px",
  marginLeft: "auto",
};

const visualCardStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "32px",
  background: `linear-gradient(135deg, ${COBALT} 0%, ${ORANGE} 100%)`,
  overflow: "hidden",
  position: "relative",
  boxShadow: `0 30px 80px rgba(255,107,53,.35), 0 0 70px rgba(19,56,222,.25)`,
};

const visualImgStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const floatingBadgeStyle = {
  position: "absolute",
  top: "-20px",
  right: "-20px",
  background: "#FFFFFF",
  color: INK,
  padding: "16px 24px",
  borderRadius: "20px",
  fontFamily: "var(--disp)",
  fontWeight: 800,
  boxShadow: "0 12px 40px rgba(10,11,20,.25)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  lineHeight: 1,
  textAlign: "center",
};

const floatingBadgeKickerStyle = {
  fontSize: ".7rem",
  color: ORANGE,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  marginBottom: "6px",
};

const floatingBadgeAmountStyle = {
  fontSize: "1.8rem",
  color: INK,
  letterSpacing: "-.02em",
};

const floatingBadgeSubStyle = {
  fontSize: ".75rem",
  color: "rgba(10,11,20,.55)",
  marginTop: "4px",
  letterSpacing: ".05em",
};

const bgSparkleStyle = (top, left, size, color) => ({
  position: "absolute",
  top,
  left,
  width: size,
  height: size,
  opacity: 0.4,
  zIndex: 1,
});

export default function DuckWichita() {
  return (
    <section style={sectionStyle}>
      <style>{`
        @keyframes dwsparkle { 0%, 100% { transform: translateY(0) rotate(0deg); opacity: .35; } 50% { transform: translateY(-14px) rotate(15deg); opacity: .7; } }
        @keyframes dwfloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .dw-bg-sparkle { animation: dwsparkle 4s ease-in-out infinite; }
        .dw-bg-sparkle.s2 { animation-delay: 1s; }
        .dw-bg-sparkle.s3 { animation-delay: 2s; }
        .dw-bg-sparkle.s4 { animation-delay: .5s; }
        .dw-visual { animation: dwfloat 5s ease-in-out infinite; }
        @media (max-width: 880px) {
          .dw-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
          .dw-visual-wrap { margin: 0 auto !important; }
        }
      `}</style>

      <svg className="dw-bg-sparkle" style={bgSparkleStyle("10%", "8%", "32px")} viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={ORANGE}/></svg>
      <svg className="dw-bg-sparkle s2" style={bgSparkleStyle("20%", "92%", "24px")} viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={COBALT}/></svg>
      <svg className="dw-bg-sparkle s3" style={bgSparkleStyle("75%", "5%", "28px")} viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={ORANGE}/></svg>
      <svg className="dw-bg-sparkle s4" style={bgSparkleStyle("85%", "88%", "22px")} viewBox="0 0 24 24" fill="none"><path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill={COBALT}/></svg>

      <div style={wrapStyle}>
        <div className="dw-grid" style={gridStyle}>
          <div>
            <Reveal>
              <span style={kickerStyle}><Sparkles size={14} /> Something fun I&apos;m doing for Wichita</span>
            </Reveal>
            <Reveal as="h2" delay={80} style={titleStyle}>
              Meet <span style={orangeAccent}>DuckWichita.</span>
            </Reveal>
            <Reveal as="p" delay={140} style={bodyStyle}>
              I&apos;m hiding hundreds of tiny patriotic eagle-ducks across Wichita. Find one, scan the QR code, enter to win local prizes every single month. No catch, no sales pitch &mdash; just my way of giving back to the city.
            </Reveal>
            <Reveal as="p" delay={200} style={bodyStyle}>
              Restaurants, Wind Surge tickets, gift cards, cash. Real prizes from real local businesses. One winner the 1st and 15th of every month.
            </Reveal>

            <Reveal delay={260}>
              <div style={statsStyle}>
                <div style={statStyle}>
                  <div style={statIconStyle}><Trophy size={18} /></div>
                  <span>$840+ in monthly prizes</span>
                </div>
                <div style={statStyle}>
                  <div style={statIconStyle}><MapPin size={18} /></div>
                  <span>All across Wichita</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div style={ctaWrapStyle}>
                <Link href="/duckwichita" style={primaryCtaStyle}>
                  Check out DuckWichita <ArrowUpRight size={18} />
                </Link>
                <a href="https://instagram.com/gvonflue" target="_blank" rel="noopener noreferrer" style={ghostCtaStyle}>
                  Follow @gvonflue
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="dw-visual-wrap" style={visualWrapStyle}>
              <div className="dw-visual" style={visualCardStyle}>
                <img src="/images/duck.jpg" alt="The DuckWichita eagle-duck" style={visualImgStyle} />
              </div>
              <div style={floatingBadgeStyle}>
                <span style={floatingBadgeKickerStyle}>June Prize</span>
                <span style={floatingBadgeAmountStyle}>$840+</span>
                <span style={floatingBadgeSubStyle}>VALUE</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
