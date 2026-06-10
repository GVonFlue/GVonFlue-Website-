import Link from "next/link";
import { Download as DownloadIcon, MessageCircle, Instagram, ArrowUpRight } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollBar from "@/components/ScrollBar";

export const metadata = {
  title: "Your Wichita Homebuyer Guide",
  description: "Your free guide to buying your first home in Wichita, KS.",
};

const wrap = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "140px 28px 80px",
};

const heroBlock = { textAlign: "center", marginBottom: "60px" };

const h1Style = {
  fontSize: "clamp(2.2rem,4.5vw,3.4rem)",
  lineHeight: 1.1,
  marginBottom: "20px",
};

const ledeStyle = {
  color: "var(--muted)",
  fontSize: "1.2rem",
  lineHeight: 1.6,
  maxWidth: "56ch",
  margin: "0 auto 32px",
};

const downloadBtnRow = {
  display: "flex",
  gap: "14px",
  justifyContent: "center",
  flexWrap: "wrap",
  marginBottom: "20px",
};

const downloadBtnStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
};

const pdfWideWrap = {
  width: "100%",
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "0 28px",
  boxSizing: "border-box",
};

const pdfFrame = {
  width: "100%",
  height: "calc(100vh - 120px)",
  minHeight: "900px",
  border: "1px solid var(--mist)",
  borderRadius: "24px",
  boxShadow: "0 24px 60px rgba(10,11,20,0.18)",
  background: "#fff",
  display: "block",
};

const hardCopyBox = {
  background: "var(--ink)",
  color: "#fff",
  borderRadius: "24px",
  padding: "48px 36px",
  marginTop: "60px",
  textAlign: "center",
};

const hardCopyH2 = {
  fontFamily: "var(--disp)",
  fontSize: "clamp(1.6rem,3vw,2.2rem)",
  marginBottom: "14px",
  lineHeight: 1.2,
};

const hardCopyP = {
  color: "rgba(255,255,255,0.7)",
  fontSize: "1.05rem",
  lineHeight: 1.6,
  maxWidth: "52ch",
  margin: "0 auto 28px",
};

const hardCopyFooter = {
  color: "rgba(255,255,255,0.7)",
  fontSize: "0.9rem",
  lineHeight: 1.6,
  maxWidth: "52ch",
  margin: "20px auto 0",
};

const contactRow = {
  display: "flex",
  gap: "14px",
  justifyContent: "center",
  flexWrap: "wrap",
};

const contactBtn = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  padding: "14px 24px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.18)",
  color: "#fff",
  fontWeight: 600,
  fontSize: "1rem",
  textDecoration: "none",
};

const backRow = { textAlign: "center", marginTop: "60px" };
const finalWrap = { maxWidth: "1100px", margin: "0 auto", padding: "60px 28px 80px" };

export default function GuidePage() {
  return (
    <>
      <ScrollBar />
      <Nav />
      <main>
        <div style={wrap}>
          <div style={heroBlock}>
            <span className="section-kicker">Your free guide</span>
            <h1 className="section-title" style={h1Style}>
              Welcome to your <em style={{ color: "var(--gold)" }}>Wichita Homebuyer Guide</em>.
            </h1>
            <p style={ledeStyle}>
              Thanks for grabbing the guide. Flip through it right here on the page, or hit download to save a copy. If anything in here sparks a question, my number&apos;s at the bottom — text me anytime.
            </p>
            <div style={downloadBtnRow}>
              <a href="/guide.pdf" download className="btn btn-gold btn-lg" style={downloadBtnStyle}>
                <DownloadIcon size={20} /> Download PDF
              </a>
            </div>
          </div>
        </div>

        <div style={pdfWideWrap}>
          <iframe src="/guide.pdf#view=FitH" style={pdfFrame} title="Wichita Homebuyer Guide" />
        </div>

        <div style={finalWrap}>
          <div style={hardCopyBox}>
            <h2 style={hardCopyH2}>Want a hard copy?</h2>
            <p style={hardCopyP}>
              I&apos;ve got printed copies in the truck. If you&apos;d rather flip through real pages with a coffee, just reach out and we&apos;ll get one in your hands.
            </p>
            <div style={contactRow}>
              <a href="sms:+19013353905?body=guide" style={contactBtn}>
                <MessageCircle size={18} /> Text 901-335-3905
              </a>
              <a href="https://instagram.com/gvonflue" target="_blank" rel="noopener noreferrer" style={contactBtn}>
                <Instagram size={18} /> DM @gvonflue
              </a>
            </div>
            <p style={hardCopyFooter}>
              Just say &ldquo;guide&rdquo; — I&apos;ll know what you mean.
            </p>
          </div>

          <div style={backRow}>
            <Link href="/" className="btn btn-ghost btn-lg">
              Back to home <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
