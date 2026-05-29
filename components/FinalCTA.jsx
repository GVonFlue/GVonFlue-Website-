import { ArrowUpRight, Mail } from "lucide-react";
import Reveal from "./Reveal";

export default function FinalCTA() {
  return (
    <section className="final" id="contact">
      <div className="final-mesh" />
      <div className="section-wrap final-inner">
        <Reveal as="h2" className="final-title">
          Let&apos;s make your first home
          <br />
          the easy part of your year.
        </Reveal>
        <Reveal as="p" delay={80} className="final-sub">
          Grab the guide, or just send me a message. No script, no pressure —
          promise.
        </Reveal>
        <Reveal delay={160} className="final-ctas">
          <a href="#guide" className="btn btn-gold btn-lg">
            Get the Free Guide <ArrowUpRight size={20} />
          </a>
          <a
            href="mailto:hello@gvonflue.com"
            className="btn btn-ghost-light btn-lg"
          >
            <Mail size={18} /> Message Garrett
          </a>
        </Reveal>
      </div>
    </section>
  );
}
