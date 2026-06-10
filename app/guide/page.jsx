import Link from "next/link";
import { ArrowUpRight, Mail, Download, CheckCircle2 } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollBar from "@/components/ScrollBar";

export const metadata = {
  title: "Your Homebuyer Guide is on the way",
  description:
    "Thanks for grabbing the Wichita Homebuyer Guide. Check your inbox to confirm and start reading.",
};

const wrap = {
  maxWidth: "780px",
  margin: "0 auto",
  padding: "160px 28px 80px",
  textAlign: "center",
};

const checkCircle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "84px",
  height: "84px",
  borderRadius: "50%",
  background: "var(--gold)",
  color: "var(--ink)",
  marginBottom: "32px",
};

const h1Style = {
  fontSize: "clamp(2.2rem,4.5vw,3.4rem)",
  lineHeight: 1.1,
  marginBottom: "20px",
};

const ledeStyle = {
  color: "var(--muted)",
  fontSize: "1.2rem",
  lineHeight: 1.6,
  maxWidth: "52ch",
  margin: "0 auto 40px",
};

const stepsBox = {
  background: "var(--paper)",
  border: "1px solid var(--mist)",
  borderRadius: "20px",
  padding: "32px",
  textAlign: "left",
  margin: "40px 0",
};

const stepsH3 = {
  fontFamily: "var(--disp)",
  fontSize: "1.3rem",
  color: "var(--ink)",
  marginBottom: "16px",
};

const stepRow = {
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
  marginBottom: "12px",
  color: "var(--txt)",
  lineHeight: 1.6,
};

const downloadBox = {
  background: "var(--ink)",
  color: "#fff",
  borderRadius: "24px",
  padding: "48px 32px",
  marginTop: "40px",
};

const downloadH2 = {
  fontFamily: "var(--disp)",
  fontSize: "1.8rem",
  marginBottom: "12px",
  lineHeight: 1.2,
};

const downloadP = {
  color: "rgba(255,255,255,.7)",
  marginBottom: "24px",
  lineHeight: 1.6,
};

const ctaRow = {
  display: "flex",
  gap: "14px",
  justifyContent: "center",
  flexWrap: "wrap",
};

export default function GuidePage() {
  return (
    <>
      <ScrollBar />
      <Nav />
      <main style={wrap}>
        <div style={checkCircle}>
          <CheckCircle2 size={44} strokeWidth={2.5} />
        </div>
        <h1 className="section-title" style={h1Style}>
          You&apos;re in. <em style={{ color: "var(--gold)" }}>Check your email.</em>
        </h1>
        <p style={ledeStyle}>
          Your Wichita Homebuyer Guide is on the way — sent to the email
          address you just gave me. It should land in your inbox within a
          minute.
        </p>

        <div style={stepsBox}>
          <h3 style={stepsH3}>What happens next:</h3>
          <div style={stepRow}>
            <CheckCircle2 size={20} color="#1338DE" style={{ flexShrink: 0, marginTop: 2 }} />
            <span>
              <strong>Check your inbox</strong> for an email from me, Garrett
              von Flue.
            </span>
          </div>
          <div style={stepRow}>
            <CheckCircle2 size={20} color="#1338DE" style={{ flexShrink: 0, marginTop: 2 }} />
            <span>
              <strong>Click the confirm link</strong> in that email (this is
              a one-time spam check).
            </span>
          </div>
          <div style={stepRow}>
            <CheckCircle2 size={20} color="#1338DE" style={{ flexShrink: 0, marginTop: 2 }} />
            <span>
              <strong>Your guide downloads instantly</strong> — plus you&apos;ll
              get a personal note from me with my phone number.
            </span>
          </div>
        </div>

        <p style={{ color: "var(--muted)", fontSize: "0.95rem", marginTop: "32px" }}>
          Didn&apos;t see the email? Check your spam folder, or shoot me a
          note at{" "}
          
            href="mailto:hello@gvonflue.com"
            style={{ color: "var(--cobalt)", textDecoration: "underline" }}
          >
            hello@gvonflue.com
          </a>
          .
        </p>

        <div style={downloadBox}>
          <h2 style={downloadH2}>While you&apos;re here…</h2>
          <p style={downloadP}>
            Got questions you don&apos;t want to wait on? Text me. I answer
            personally.
          </p>
          <div style={ctaRow}>
            <Link href="/contact" className="btn btn-gold btn-lg">
              Reach out <ArrowUpRight size={20} />
            </Link>
            <Link href="/" className="btn btn-ghost-light btn-lg">
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
