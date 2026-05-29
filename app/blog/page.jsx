import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollBar from "@/components/ScrollBar";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Blog",
  description:
    "Buyer tips, seller tips, local Wichita guides, and market updates from Garrett von Flue.",
};

// TODO: replace with content from your CMS (Sanity, Contentful) or MDX files.
// For SEO, each post should be its own route at /blog/[slug] with full content.
const POSTS = [
  {
    cat: "Local guide",
    t: "Living in Riverside: the honest rundown",
    read: "6 min",
    slug: "living-in-riverside",
    blurb:
      "What it's really like to live in one of Wichita's most charming neighborhoods.",
  },
  {
    cat: "Buyer tips",
    t: "Best Wichita neighborhoods for first-time buyers",
    read: "8 min",
    slug: "best-wichita-neighborhoods-first-time-buyers",
    blurb:
      "Where your money goes furthest without sacrificing the things that matter.",
  },
  {
    cat: "Moving",
    t: "Relocating to Wichita? Start here.",
    read: "5 min",
    slug: "relocating-to-wichita",
    blurb:
      "Everything I tell people considering a move to Wichita from out of state.",
  },
];

const CATEGORIES = ["Buyer tips", "Seller tips", "Local guide", "Market"];

export default function BlogPage() {
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
        <span className="section-kicker">The Blog</span>
        <h1
          className="section-title"
          style={{ fontSize: "clamp(2.4rem,4.6vw,3.6rem)" }}
        >
          Buyer tips, local guides &amp; honest market takes.
        </h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
            margin: "32px 0",
            flexWrap: "wrap",
          }}
        >
          {CATEGORIES.map((c) => (
            <span
              key={c}
              style={{
                padding: ".5rem 1rem",
                borderRadius: "999px",
                border: "1px solid var(--mist)",
                fontSize: ".9rem",
                fontWeight: 600,
                color: "var(--muted)",
              }}
            >
              {c}
            </span>
          ))}
        </div>

        <div className="local-grid">
          {POSTS.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="local-card">
              <span className="local-cat">{p.cat}</span>
              <h3>{p.t}</h3>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: ".95rem",
                  marginTop: "10px",
                  lineHeight: 1.5,
                }}
              >
                {p.blurb}
              </p>
              <div className="local-meta">
                <span>{p.read} read</span>
                <ArrowUpRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
