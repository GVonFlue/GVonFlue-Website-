import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollBar from "@/components/ScrollBar";

export const metadata = {
  title: "Listings",
  description:
    "Browse active listings in Wichita and the surrounding area with Garrett von Flue.",
};

export default function ListingsPage() {
  return (
    <>
      <ScrollBar />
      <Nav />
      <main
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "160px 28px 120px",
        }}
      >
        <span className="section-kicker">Listings</span>
        <h1
          className="section-title"
          style={{ fontSize: "clamp(2.4rem,4.6vw,3.6rem)" }}
        >
          Active listings in Wichita &amp; the surrounding area
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "1.1rem",
            maxWidth: "60ch",
            marginTop: "18px",
            lineHeight: 1.6,
          }}
        >
          IDX integration is coming soon. In the meantime, tell me what you&apos;re
          looking for and I&apos;ll send hand-picked listings — including
          off-market ones — straight to your inbox.
        </p>
        <a
          href="#guide"
          className="btn btn-gold btn-lg"
          style={{ marginTop: "32px" }}
        >
          Tell me what you&apos;re looking for
        </a>

        {/*
          TODO: Replace with IDX provider embed or API integration.
          Popular options for KS Realtors:
            - Showcase IDX (showcaseidx.com)
            - iHomefinder
            - Spark API (Sandstone Property)
            - Or direct MLS feed via Kansas RPAC.
          The grid below is a placeholder layout.
        */}
        <div
          style={{
            marginTop: "64px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                aspectRatio: "4/3",
                borderRadius: "18px",
                background:
                  "linear-gradient(160deg, var(--cobalt), var(--cobalt-deep))",
                display: "grid",
                placeItems: "center",
                color: "rgba(255,255,255,.55)",
                fontWeight: 700,
              }}
            >
              Listing placeholder
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
