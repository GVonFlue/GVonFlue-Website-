import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollBar from "@/components/ScrollBar";

export const metadata = {
  title: "About Garrett",
  description:
    "Get to know Garrett von Flue — Wichita Realtor with Real Broker LLC.",
};

const mainStyle = {
  maxWidth: "1180px",
  margin: "0 auto",
  padding: "160px 28px 80px",
};

const heroGrid = {
  display: "grid",
  gridTemplateColumns: "1.1fr 0.9fr",
  gap: "64px",
  alignItems: "center",
  marginBottom: "120px",
};

const heroTitle = {
  fontSize: "clamp(2.4rem,5vw,4rem)",
  marginTop: "16px",
};

const heroLede = {
  color: "var(--muted)",
  fontSize: "1.2rem",
  marginTop: "22px",
  lineHeight: 1.6,
  maxWidth: "44ch",
};

const photoBox = {
  aspectRatio: "4/5",
  borderRadius: "24px",
  overflow: "hidden",
  background: "linear-gradient(160deg, var(--cobalt), var(--cobalt-deep))",
  boxShadow: "0 24px 60px rgba(10,11,20,.22)",
  display: "grid",
  placeItems: "center",
  color: "rgba(255,255,255,.55)",
  fontWeight: 700,
};

const wideBox = {
  aspectRatio: "16/9",
  borderRadius: "24px",
  overflow: "hidden",
  background: "linear-gradient(160deg, var(--cobalt-deep), var(--ink))",
  boxShadow: "0 24px 60px rgba(10,11,20,.22)",
  display: "grid",
  placeItems: "center",
  color: "rgba(255,255,255,.55)",
  fontWeight: 700,
  marginBottom: "80px",
};

const storyWrap = { maxWidth: "720px", margin: "0 auto" };
const sectionBlock = { marginBottom: "80px" };

const sectionH2 = {
  fontSize: "clamp(1.8rem,3.4vw,2.6rem)",
  marginTop: "12px",
};

const bodyP = {
  color: "var(--txt)",
  fontSize: "1.12rem",
  lineHeight: 1.75,
  marginTop: "20px",
};

const bodyP2 = {
  color: "var(--txt)",
  fontSize: "1.12rem",
  lineHeight: 1.75,
  marginTop: "16px",
};

const valueCard = {
  background: "var(--paper)",
  border: "1px solid var(--mist)",
  borderRadius: "20px",
  padding: "28px",
};

const valueH3 = {
  fontFamily: "var(--disp)",
  fontSize: "1.3rem",
  color: "var(--ink)",
  marginBottom: "10px",
};

const valueP = { color: "var(--muted)", lineHeight: 1.65 };

const ctaBox = {
  background: "var(--ink)",
  color: "#fff",
  borderRadius: "28px",
  padding: "72px 48px",
  textAlign: "center",
  marginTop: "40px",
};

const ctaH2 = {
  fontFamily: "var(--disp)",
  fontSize: "clamp(2rem,4vw,3rem)",
  marginBottom: "16px",
  lineHeight: 1.1,
};

const ctaP = {
  color: "rgba(255,255,255,.7)",
  fontSize: "1.15rem",
  maxWidth: "42ch",
  margin: "0 auto 32px",
  lineHeight: 1.6,
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
      <main style={mainStyle}>
        <div style={heroGrid}>
          <div>
            <span className="section-kicker">About Garrett</span>
            <h1 className="section-title" style={heroTitle}>
              The guy behind <em style={{ color: "var(--gold)" }}>GVonFlue</em>.
            </h1>
            <p style={heroLede}>
              Wichita-rooted. Veteran. Built this thing on one belief: buying
              your first home shouldn&apos;t feel like a test you didn&apos;t
              study for.
            </p>
          </div>
          <div style={photoBox}>Photo placeholder</div>
        </div>

        <div style={storyWrap}>
          <section style={sectionBlock}>
            <span className="section-kicker">My story</span>
            <h2 className="section-title" style={sectionH2}>
              How I ended up here.
            </h2>
            <p style={bodyP}>
              I grew up around Wichita and never had any plans to leave. I
              served in the military, came home, and started paying attention
              to the way people in my generation talked about buying a home —
              mostly with anxiety, or as something that would happen &ldquo;one
              day&rdquo; instead of an actual plan.
            </p>
            <p style={bodyP2}>
              I got my license because I was tired of watching friends get
              talked down to by agents who treated them like checkboxes
              instead of people. So I built GVonFlue around the opposite of
              that: plain-English explanations, honest answers, and never
              moving faster than the person sitting across from me.
            </p>
          </section>

          <div style={wideBox}>Action photo placeholder</div>

          <section style={sectionBlock}>
            <span className="section-kicker">My approach</span>
            <h2 className="section-title" style={sectionH2}>
              What working with me actually looks like.
            </h2>
            <p style={bodyP}>
              First conversation is always free, always no-pressure.
              We&apos;ll talk about where you are — pre-approved or just
              curious, ready to tour or just scrolling Zillow at midnight.
              From there I build the plan around your timeline, your budget,
              and your actual life.
            </p>
            <p style={bodyP2}>
              I&apos;ll be the one texting you when a new listing drops at
              11pm. I&apos;ll be the one in your inspection going through the
              report with you. I&apos;ll be the one handing you the keys.
              Nothing gets passed off to a junior. You called me, you get me.
            </p>
          </section>

          <section style={sectionBlock}>
            <span className="section-kicker">What I believe</span>
            <h2
              className="section-title"
              style={{ ...sectionH2, marginBottom: "32px" }}
            >
              Three things I won&apos;t budge on.
            </h2>
            <div style={{ display: "grid", gap: "20px" }}>
              <div style={valueCard}>
                <h3 style={valueH3}>Plain English over jargon. Always.</h3>
                <p style={valueP}>
                  If you have to Google a word I just used, I screwed up.
                  Buying a home is hard enough without the secret-handshake
                  vocabulary.
                </p>
              </div>
              <div style={valueCard}>
                <h3 style={valueH3}>Your timeline is the timeline.</h3>
                <p style={valueP}>
                  I&apos;ve had clients who toured 40 houses and clients who
                  bought the first one they walked into. Both right calls. My
                  job is to support yours, not push you off it.
                </p>
              </div>
              <div style={valueCard}>
                <h3 style={valueH3}>The phone is always on.</h3>
                <p style={valueP}>
                  Questions don&apos;t wait for business hours. Reach out
                  whenever — I&apos;ll get back to you like a friend would,
                  not a corporate inbox.
                </p>
              </div>
            </div>
          </section>

          <section style={sectionBlock}>
            <span className="section-kicker">Off the clock</span>
            <h2 className="section-title" style={sectionH2}>
              When I&apos;m not closing on homes.
            </h2>
            <p style={bodyP}>
              [TODO: write a few sentences about your hobbies, family, what
              makes you tick. The more human, the better.]
            </p>
          </section>
        </div>

        <div style={ctaBox}>
          <h2 style={ctaH2}>Want to grab coffee?</h2>
          <p style={ctaP}>
            No pitch, no pressure. Just an hour to figure out if I&apos;m the
            right person to walk you home.
          </p>
          <div style={ctaRow}>
            <Link href="/contact" className="btn btn-gold btn-lg">
              Reach out <ArrowUpRight size={20} />
            </Link>
            <a href="mailto:hello@gvonflue.com" className="btn btn-ghost-light btn-lg">
              <Mail size={18} /> Email me
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
