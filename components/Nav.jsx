import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollBar from "@/components/ScrollBar";

export const metadata = {
  title: "About Garrett — Coming Soon",
  description: "More about Garrett von Flue, GVonFlue Real Estate, Wichita.",
};

const wrap = {
  minHeight: "calc(100vh - 200px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "140px 28px 80px",
};

const inner = { maxWidth: "640px", textAlign: "center" };

const kicker = {
  display: "inline-block",
  fontSize: "0.85rem",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--cobalt)",
  marginBottom: "24px",
};

const h1Style = {
  fontFamily: "var(--disp)",
  fontSize: "clamp(2.6rem,6vw,4.4rem)",
  lineHeight: 1.05,
  marginBottom: "24px",
  color: "var(--ink)",
};

const goldWord = { color: "var(--gold)", fontStyle: "normal" };

const ledeStyle = {
  color: "var(--muted)",
  fontSize: "1.15rem",
  lineHeight: 1.65,
  maxWidth: "48ch",
  margin: "0 auto 40px",
};

const ctaRow = {
  display: "flex",
  gap: "14px",
  justifyContent: "center",
  flexWrap: "wrap",
};

export default function AboutPage() {
  return (
    <>
      <ScrollBar />
      <Nav />
      <main style={wrap}>
        <div style={inner}>
          <span style={kicker}>About Garrett</span>
          <h1 style={h1Style}>
            Something <span style={goldWord}>good</span> is coming.
          </h1>
          <p style={ledeStyle}>
            I&apos;m putting the finishing touches on this page. In the meantime, the homepage has plenty about me — or just reach out and we&apos;ll grab coffee.
          </p>
          <div style={ctaRow}>
            <Link href="/" className="btn btn-gold btn-lg">
              Back to home <ArrowUpRight size={20} />
            </Link>
            <Link href="/#guide" className="btn btn-ghost btn-lg">
              Get the free guide
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
