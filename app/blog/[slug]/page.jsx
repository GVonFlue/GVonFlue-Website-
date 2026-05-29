import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollBar from "@/components/ScrollBar";
import Link from "next/link";
import { notFound } from "next/navigation";

// TODO: replace with real content from your CMS or MDX files.
const POSTS = {
  "living-in-riverside": {
    cat: "Local guide",
    title: "Living in Riverside: the honest rundown",
    body: "Coming soon.",
  },
  "best-wichita-neighborhoods-first-time-buyers": {
    cat: "Buyer tips",
    title: "Best Wichita neighborhoods for first-time buyers",
    body: "Coming soon.",
  },
  "relocating-to-wichita": {
    cat: "Moving",
    title: "Relocating to Wichita? Start here.",
    body: "Coming soon.",
  },
};

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = POSTS[params.slug];
  if (!post) return {};
  return { title: post.title };
}

export default function BlogPost({ params }) {
  const post = POSTS[params.slug];
  if (!post) notFound();

  return (
    <>
      <ScrollBar />
      <Nav />
      <main
        style={{
          maxWidth: "780px",
          margin: "0 auto",
          padding: "160px 28px 120px",
        }}
      >
        <Link
          href="/blog"
          style={{
            fontSize: ".9rem",
            fontWeight: 600,
            color: "var(--cobalt)",
          }}
        >
          ← All posts
        </Link>
        <span
          className="section-kicker"
          style={{ display: "block", marginTop: "24px" }}
        >
          {post.cat}
        </span>
        <h1
          className="section-title"
          style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
        >
          {post.title}
        </h1>
        <article
          style={{
            marginTop: "40px",
            color: "var(--txt)",
            fontSize: "1.1rem",
            lineHeight: 1.75,
          }}
        >
          <p>{post.body}</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
