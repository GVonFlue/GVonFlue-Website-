"use client";

import Link from "next/link";
import Lockup from "@/components/Lockup";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

export default function RulesPage() {
  const pageStyle = { background: "linear-gradient(180deg, #FFF9EC 0%, #FFFFFF 35%)", minHeight: "100vh", color: "var(--ink)" };
  const topBarStyle = { padding: "28px 24px", display: "flex", justifyContent: "center" };
  const heroStyle = { padding: "40px 24px 60px", textAlign: "center", maxWidth: "780px", margin: "0 auto" };
  const kickerStyle = { display: "inline-flex", alignItems: "center", gap: "10px", padding: "10px 22px", background: "rgba(231,181,60,.18)", borderRadius: "999px", color: "var(--cobalt)", fontFamily: "var(--disp)", fontSize: ".9rem", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "28px", border: "1.5px solid rgba(231,181,60,.45)" };
  const titleStyle = { fontFamily: "var(--disp)", fontSize: "clamp(2.6rem, 6.5vw, 4.4rem)", lineHeight: 0.95, letterSpacing: "-.025em", margin: "0 0 20px", color: "var(--ink)" };
  const goldAccent = { color: "var(--gold)" };
  const subStyle = { fontSize: "1.15rem", lineHeight: 1.6, color: "var(--muted)", margin: "0 auto", maxWidth: "640px" };
  const contentWrapStyle = { maxWidth: "780px", margin: "0 auto", padding: "20px 24px 100px" };
  const sectionStyle = { padding: "40px 0", borderBottom: "1px solid rgba(11,11,20,.08)" };
  const sectionLastStyle = { ...sectionStyle, borderBottom: "none" };
  const h2Style = { fontFamily: "var(--disp)", fontSize: "1.4rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 16px", letterSpacing: "-.01em" };
  const pStyle = { color: "var(--muted)", margin: "0 0 14px", lineHeight: 1.65, fontSize: "1.02rem" };
  const ulStyle = { color: "var(--muted)", margin: "8px 0 14px", paddingLeft: "22px", lineHeight: 1.7, fontSize: "1.02rem" };
  const strongStyle = { color: "var(--ink)", fontWeight: 600 };
  const updatedStyle = { display: "inline-block", marginTop: "8px", padding: "6px 14px", background: "rgba(11,11,20,.06)", borderRadius: "999px", fontSize: ".85rem", color: "var(--muted)", fontFamily: "var(--disp)", fontWeight: 600 };
  const ctaWrapStyle = { textAlign: "center", marginTop: "60px", padding: "32px", background: "#fff", borderRadius: "20px", border: "1px solid rgba(231,181,60,.3)", boxShadow: "0 12px 40px rgba(11,30,138,.06)" };
  const ctaTitleStyle = { fontFamily: "var(--disp)", fontSize: "1.4rem", margin: "0 0 12px", color: "var(--ink)" };
  const ctaSubStyle = { color: "var(--muted)", margin: "0 0 20px", fontSize: "1rem" };
  const ctaBtnStyle = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 26px", background: "var(--gold)", color: "var(--ink)", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 700, textDecoration: "none", fontSize: "1rem" };

  return (
    <main style={pageStyle}>
      <div style={topBarStyle}><Lockup /></div>

      <section style={heroStyle}>
        <Reveal><span style={kickerStyle}><ShieldCheck size={14} /> Official Rules</span></Reveal>
        <Reveal as="h1" delay={80} style={titleStyle}>The <span style={goldAccent}>fine print.</span></Reveal>
        <Reveal as="p" delay={140} style={subStyle}>Real giveaway. Real rules. Here&apos;s how DuckWichita works, who&apos;s eligible, and how winners get picked. No tricks, no surprises.</Reveal>
        <Reveal delay={200}><span style={updatedStyle}>Last updated: June 12, 2026</span></Reveal>
      </section>

      <div style={contentWrapStyle}>
        <section style={sectionStyle}>
          <h2 style={h2Style}>1. Sponsor</h2>
          <p style={pStyle}>The DuckWichita giveaway (&quot;Giveaway&quot;) is sponsored and operated by <span style={strongStyle}>Garrett Von Flue</span>, REALTOR® with Real Broker LLC, based in Wichita, Kansas (&quot;Sponsor&quot;). The Giveaway is a community marketing initiative and is not affiliated with, endorsed by, or sponsored by any government entity, the Wichita Wind Surge, Equity Bank Park, or any prize donor unless specifically named as a Featured Sponsor.</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>2. No purchase necessary</h2>
          <p style={pStyle}><span style={strongStyle}>No purchase is necessary to enter or win.</span> A purchase will not increase your chances of winning. Entry is completely free.</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>3. Eligibility</h2>
          <p style={pStyle}>To be eligible, you must:</p>
          <ul style={ulStyle}>
            <li>Be at least 18 years old at the time of entry.</li>
            <li>Be a legal resident of the United States.</li>
            <li>Live in or near Wichita, Kansas (prizes are local and must generally be redeemed in person).</li>
            <li>Provide accurate contact information at entry (a valid email and phone number).</li>
          </ul>
          <p style={pStyle}>Employees, immediate family members, and household members of the Sponsor are not eligible to win. Void where prohibited or restricted by law.</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>4. How to enter</h2>
          <p style={pStyle}>There are two equal ways to get your <span style={strongStyle}>base entry</span>:</p>
          <ul style={ulStyle}>
            <li><span style={strongStyle}>Scan a DuckWichita duck:</span> Find a DuckWichita duck placed in or around Wichita, scan the QR code on its tag, and complete the entry form at duckwichita.com/jointheflock.</li>
            <li><span style={strongStyle}>Enter directly online:</span> Visit duckwichita.com/jointheflock and complete the entry form at any time. You do not need to find a duck to enter or win.</li>
          </ul>
          <p style={pStyle}>Each person receives <span style={strongStyle}>one (1) base entry</span>. Duplicate sign-ups from the same person will be consolidated into a single base entry.</p>
          <p style={pStyle}><span style={strongStyle}>Bonus entries — the &quot;5x&quot; bonus.</span> After you&apos;ve entered, you can increase your single base entry to a total of <span style={strongStyle}>five (5) entries</span> by posting a photo of yourself with your DuckWichita duck to a public Instagram or Facebook post using the hashtag <span style={strongStyle}>#DuckWichita</span>. The duck must be clearly visible in the photo. Once the Sponsor verifies the post, four (4) bonus entries are added to your existing entry, for five (5) total.</p>
          <p style={pStyle}>Bonus entries are <span style={strongStyle}>completely free</span>. No purchase is ever required to earn them and they do not change the cost of entry. The bonus is limited to <span style={strongStyle}>one (1) award of four bonus entries per person, per drawing cycle</span>. The Sponsor verifies qualifying posts manually and reserves the right to withhold bonus entries for any post that does not clearly show the duck or that otherwise appears to be an attempt to game the system.</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>5. Entry period &amp; how long you stay in</h2>
          <p style={pStyle}>Each entry remains active in the giveaway pool for <span style={strongStyle}>one (1) full year from the date of submission</span>. During that time, your entry will be included in every monthly drawing — that&apos;s up to 24 chances to win, with no requirement to re-enter.</p>
          <p style={pStyle}>Drawings are held on the <span style={strongStyle}>1st and 15th of each month</span>, beginning July 1st, 2026.</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>6. Prizes</h2>
          <p style={pStyle}>The specific prize package for each drawing will be announced in advance on duckwichita.com and on the Sponsor&apos;s official social media (@gvonflue on Instagram and Facebook). Prize packages will vary month to month and may include gift cards, event tickets, merchandise, experiences, cash, and other items donated or contributed by local sponsors.</p>
          <p style={pStyle}>Approximate retail value (ARV) of each monthly prize package will be disclosed at the time of announcement. Prizes are non-transferable and may not be exchanged for cash equivalent unless explicitly stated. Sponsor reserves the right to substitute any prize with one of equal or greater value if the original is unavailable.</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>7. Winner selection</h2>
          <p style={pStyle}>On each drawing date, one (1) winner will be selected at random from all eligible active entries using a randomized selection method documented and verifiable by the Sponsor. The random draw process will be recorded or made transparent in some form (such as a video posted to @gvonflue social channels).</p>
          <p style={pStyle}>Odds of winning depend on the total number of active entries at the time of the drawing.</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>8. Winner notification &amp; claim</h2>
          <p style={pStyle}>The winner will be notified within 48 hours of the drawing via the email and/or phone number provided at entry. The winner must respond and confirm acceptance of the prize within <span style={strongStyle}>seven (7) days of notification</span>. If the winner does not respond within that window, the prize will be forfeited and a new winner may be selected at the Sponsor&apos;s discretion.</p>
          <p style={pStyle}>Winners may be required to sign a brief release form confirming receipt of the prize and granting the Sponsor permission to publicly announce the winner&apos;s first name and city on social media and at duckwichita.com.</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>9. Use of name &amp; likeness</h2>
          <p style={pStyle}>By accepting a prize, the winner consents to the use of their first name, city of residence, and (optionally) a photo or short video clip for promotional purposes related to DuckWichita. Last names and contact information will never be publicly shared.</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>10. General conditions</h2>
          <p style={pStyle}>The Sponsor reserves the right to disqualify any entry that is fraudulent, automated, submitted via bot, or otherwise in violation of these rules. The Sponsor also reserves the right to cancel, suspend, or modify the Giveaway if fraud, technical failures, or any other factor beyond reasonable control compromises the integrity of the Giveaway.</p>
          <p style={pStyle}>By entering, you agree to be bound by these Official Rules and the decisions of the Sponsor, which are final and binding in all matters relating to the Giveaway.</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>11. Privacy</h2>
          <p style={pStyle}>Information you submit at entry (name, email, phone number, status) is collected by the Sponsor for the purposes of administering the Giveaway, notifying winners, and occasional updates about DuckWichita or related real estate services from Garrett Von Flue. Your information will <span style={strongStyle}>never</span> be sold to third parties.</p>
          <p style={pStyle}>You may opt out of communications at any time by emailing <a href="mailto:gvonflue@gmail.com" style={{ color: "var(--cobalt)", textDecoration: "underline" }}>gvonflue@gmail.com</a> with the subject &quot;Remove me from DuckWichita.&quot;</p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>12. Governing law</h2>
          <p style={pStyle}>The Giveaway is governed by the laws of the State of Kansas. Void where prohibited by law. Any disputes arising from or related to the Giveaway will be resolved in Sedgwick County, Kansas.</p>
        </section>

        <section style={sectionLastStyle}>
          <h2 style={h2Style}>13. Questions?</h2>
          <p style={pStyle}>If you have any questions about the rules, the Giveaway, a specific entry, or want to verify the legitimacy of DuckWichita, you can reach the Sponsor directly:</p>
          <p style={pStyle}>
            <span style={strongStyle}>Garrett Von Flue</span><br/>
            Email: <a href="mailto:gvonflue@gmail.com" style={{ color: "var(--cobalt)", textDecoration: "underline" }}>gvonflue@gmail.com</a><br/>
            Phone: <a href="tel:9013353905" style={{ color: "var(--cobalt)", textDecoration: "underline" }}>901-335-3905</a><br/>
            Instagram: <a href="https://instagram.com/gvonflue" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cobalt)", textDecoration: "underline" }}>@gvonflue</a>
          </p>
        </section>

        <div style={ctaWrapStyle}>
          <h3 style={ctaTitleStyle}>Ready to join the flock?</h3>
          <p style={ctaSubStyle}>Now that you&apos;ve read the fine print, jump in.</p>
          <Link href="/jointheflock" style={ctaBtnStyle}>Enter the giveaway <ArrowUpRight size={18} /></Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
