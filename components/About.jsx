import Reveal from "./Reveal";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="section-wrap about-grid">
        <Reveal className="about-photo">
          <div className="about-photo-inner">
            <span className="photo-tag dark">On the job</span>
          </div>
          <div className="about-stat">
            <strong>5★</strong>
            <span>How clients describe the experience</span>
          </div>
        </Reveal>
        <div className="about-copy">
          <Reveal as="span" className="section-kicker">
            01 — Who you&apos;re working with
          </Reveal>
          <Reveal as="h2" delay={60} className="section-title">
            Real person. Real answers. Zero corporate script.
          </Reveal>
          <Reveal as="p" delay={120}>
            I got into real estate because buying a home is one of the biggest
            things most people do — and almost no one explains how it actually
            works. So I made that my whole thing: walking first-time buyers
            through every step in plain English, on your timeline, with no
            pushing.
          </Reveal>
          <Reveal as="p" delay={180}>
            You&apos;ll always know what&apos;s next, why it matters, and what
            it means for your money. And when you need a lender, an inspector,
            or honestly the best lunch near a showing — I know a person.
          </Reveal>
          <Reveal delay={240} className="signature">
            Garrett von Flue
            <span>REALTOR® · Real Broker LLC</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
