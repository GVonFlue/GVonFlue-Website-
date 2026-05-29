import { Compass, HandHeart, MapPin, MessageCircle } from "lucide-react";
import Reveal from "./Reveal";

const ITEMS = [
  {
    icon: Compass,
    title: "Guidance from start to keys",
    body: "Every step mapped out before you hit it. You'll never wonder what happens next.",
  },
  {
    icon: HandHeart,
    title: "No confusion. No pressure.",
    body: "I explain it, you decide. We move when you're ready — not a day sooner.",
  },
  {
    icon: MapPin,
    title: "Connected to the best in town",
    body: "Lenders, inspectors, contractors, neighborhoods. My little black book is yours.",
  },
  {
    icon: MessageCircle,
    title: "I text back. Actually.",
    body: "Questions don't wait for business hours. Neither do I. Reach me like a friend.",
  },
];

export default function Values() {
  return (
    <section className="values">
      <div className="section-wrap">
        <Reveal as="span" className="section-kicker center">
          02 — Why people pick me
        </Reveal>
        <Reveal as="h2" delay={60} className="section-title center">
          What working together actually feels like
        </Reveal>
        <div className="values-grid">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={i * 80} className="value-card">
              <div className="value-icon">
                <it.icon size={22} strokeWidth={2.2} />
              </div>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
