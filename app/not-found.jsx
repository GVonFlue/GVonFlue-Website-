import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main
        style={{
          maxWidth: "780px",
          margin: "0 auto",
          padding: "180px 28px 120px",
          textAlign: "center",
        }}
      >
        <span className="section-kicker">404</span>
        <h1
          className="section-title center"
          style={{ fontSize: "clamp(2.4rem,5vw,3.8rem)" }}
        >
          That page took a wrong turn at Kellogg.
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "1.15rem",
            margin: "20px auto 32px",
            maxWidth: "44ch",
            lineHeight: 1.6,
          }}
        >
          Let&apos;s get you back on the route.
        </p>
        <Link href="/" className="btn btn-gold btn-lg">
          Back home
        </Link>
      </main>
      <Footer />
    </>
  );
}
