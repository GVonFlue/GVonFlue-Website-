import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const POSTS = [
  {
    cat: "Local guide",
    t: "Living in Riverside: the honest rundown",
    read: "6 min",
    slug: "living-in-riverside",
  },
  {
    cat: "Buyer tips",
    t: "Best Wichita neighborhoods for first-time buyers",
    read: "8 min",
    slug: "best-wichita-neighborhoods-first-time-buyers",
  },
  {
    cat: "Moving",
    t: "Relocating to Wichita? Start here.",
    read: "5 min",
    slug: "relocating-to-wichita",
  },
];

export default function Local() {
  return (
    <section className="local" id="blog">
      <div className="section-wrap">
        <Reveal as="span" className="section-kicker">
          05 — Know before you buy
        </Reveal>
        <Reveal as="h2" delay={60} className="section-title">
          Local know-how, not listing fluff
        </Reveal>
        <div className="local-grid">
          {POSTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 80}>
              <Link href={`/blog/${p.slug}`} className="local-card">
                <span className="local-cat">{p.cat}</span>
                <h3>{p.t}</h3>
                <div className="local-meta">
                  <span>{p.read} read</span>
                  <ArrowUpRight size={18} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
