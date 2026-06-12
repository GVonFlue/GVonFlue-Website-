"use client";

import Lockup from "@/components/Lockup";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Eye, Heart, Share2, MessageCircle, Megaphone, MapPin, Trophy, DollarSign, TrendingUp, Calendar, Crown, CheckCircle2, Clock, Sparkles, Flame, Store } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// SAMPLE DATA — this is the shape we will later pull from Supabase.
// Swap these objects for live records and the page renders itself.
// ─────────────────────────────────────────────────────────────
const sponsor = {
  name: "Joe Dirt Fireworks",
  tier: "Headline Sponsor",
  drawing: "July 1, 2026 Drawing",
  contribution: "$300 Fireworks Bundle (donated)",
  lastUpdated: "June 20, 2026",
};

const headlineStats = [
  { label: "Total estimated reach", value: "36,800+", icon: "eye", note: "Everywhere your name showed up" },
  { label: "Social engagements", value: "920", icon: "heart", note: "Likes, shares, comments, taps" },
  { label: "On-the-ground actions", value: "3", icon: "map", note: "Real promo we ran for you" },
  { label: "Prize value funded", value: "$300", icon: "trophy", note: "Headlining the July 1 package" },
];

const socialPosts = [
  { platform: "Instagram + Facebook", title: "Headline prize launch post", reach: "6,200", likes: "340", shares: "58", comments: "22", paid: false },
  { platform: "Facebook", title: "Boosted launch post (paid ad spend)", reach: "9,400", likes: "210", shares: "40", comments: "15", paid: true },
  { platform: "Facebook Group", title: "Featured in \u201CWhat\u2019s Happening in Wichita\u201D (108k members)", reach: "14,800", likes: "180", shares: "31", comments: "44", paid: false },
  { platform: "Instagram Stories", title: "3 story features w/ your bundle", reach: "1,900", likes: "\u2014", shares: "12", comments: "\u2014", paid: false },
];

const promoActivities = [
  { date: "Jun 14", title: "40 flyers placed across Wichita", detail: "6 locations, your logo as the headline sponsor", reach: "~1,200" },
  { date: "Jun 17", title: "250 Duck Tags entered circulation", detail: "Every tag points to the July 1 prize you headline", reach: "~2,500" },
  { date: "Jun 20", title: "Headline card live on duckwichita.com", detail: "Your bundle is the marquee prize on the site", reach: "~800" },
];

const prize = {
  yourPrize: "$300 Fireworks Bundle",
  yourValue: "$300",
  packageTotal: "$840+",
  packageItems: ["$300 Fireworks Bundle (yours)", "4 Wind Surge tickets", "$200 dinner gift card", "DuckWichita merch", "$200 cash"],
};

const redemption = {
  status: "Pending July 1 drawing",
  detail: "The winner will be directed to claim your fireworks bundle. Once they do, it shows here.",
  storefrontNote: "In-store visit + redemption tracking populates automatically for Duck Hosts and businesses running an in-store offer.",
};

export default function SponsorDashboard() {
  const COBALT = "#1338DE";
  const ORANGE = "#FF6B35";
  const GOLD = "#E7B53C";
  const RED = "#D62828";
  const INK = "#0A0B14";

  const pageStyle = { background: "#F6F7FB", minHeight: "100vh", color: INK };
  const topBarStyle = { padding: "24px 24px 0", display: "flex", justifyContent: "center" };
  const wrapStyle = { maxWidth: "1080px", margin: "0 auto", padding: "32px 24px 60px" };

  const previewPillStyle = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "7px 16px", background: "rgba(255,107,53,.12)", border: `1.5px solid rgba(255,107,53,.4)`, color: ORANGE, borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".78rem", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "20px" };

  // Sponsor identity header
  const idCardStyle = { background: `linear-gradient(150deg, ${INK} 0%, #15172A 100%)`, color: "#fff", borderRadius: "24px", padding: "34px 32px", display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center", justifyContent: "space-between", boxShadow: "0 20px 50px rgba(10,11,20,.18)" };
  const idLeftStyle = { display: "flex", flexDirection: "column", gap: "6px" };
  const idLabelStyle = { fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".78rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.55)" };
  const idNameStyle = { fontFamily: "var(--disp)", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", lineHeight: 1.05, margin: 0 };
  const tierBadgeStyle = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", background: RED, color: "#fff", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".82rem", letterSpacing: ".06em", marginTop: "6px", width: "fit-content" };
  const idRightStyle = { display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end", minWidth: "200px" };
  const idMetaRowStyle = { display: "flex", alignItems: "center", gap: "8px", fontSize: ".95rem", color: "rgba(255,255,255,.8)" };
  const idMetaStrong = { color: "#fff", fontWeight: 700, fontFamily: "var(--disp)" };

  // Stat cards
  const statsGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginTop: "20px" };
  const statCardStyle = { background: "#fff", borderRadius: "20px", padding: "26px 24px", boxShadow: "0 8px 30px rgba(10,11,20,.06)", border: "1px solid rgba(10,11,20,.05)" };
  const statIconWrapStyle = (bg) => ({ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "12px", background: bg, color: "#fff", marginBottom: "16px" });
  const statValueStyle = { fontFamily: "var(--disp)", fontWeight: 800, fontSize: "2.1rem", letterSpacing: "-.02em", margin: "0 0 2px", color: INK };
  const statLabelStyle = { fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".95rem", color: INK, margin: "0 0 4px" };
  const statNoteStyle = { fontSize: ".85rem", color: "rgba(10,11,20,.55)", margin: 0, lineHeight: 1.4 };

  // Panels
  const panelStyle = { background: "#fff", borderRadius: "24px", padding: "32px", boxShadow: "0 8px 30px rgba(10,11,20,.06)", border: "1px solid rgba(10,11,20,.05)", marginTop: "20px" };
  const panelHeadStyle = { display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" };
  const panelIconStyle = (bg) => ({ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "11px", background: bg, color: "#fff", flexShrink: 0 });
  const panelTitleStyle = { fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1.4rem", margin: 0, color: INK };
  const panelSubStyle = { color: "rgba(10,11,20,.6)", fontSize: ".95rem", margin: "0 0 22px 52px", lineHeight: 1.5 };

  // Social rows
  const postRowStyle = { display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center", justifyContent: "space-between", padding: "18px 0", borderTop: "1px solid rgba(10,11,20,.08)" };
  const postLeftStyle = { display: "flex", flexDirection: "column", gap: "4px", minWidth: "200px", flex: 1 };
  const postPlatformStyle = { fontSize: ".72rem", fontFamily: "var(--disp)", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: COBALT };
  const postTitleStyle = { fontWeight: 700, fontSize: "1rem", color: INK, lineHeight: 1.3 };
  const postMetricsStyle = { display: "flex", gap: "18px", flexWrap: "wrap" };
  const metricStyle = { display: "flex", alignItems: "center", gap: "6px", fontSize: ".9rem", color: "rgba(10,11,20,.72)", fontWeight: 600 };
  const metricBigStyle = { fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1.1rem", color: INK };
  const paidTagStyle = { display: "inline-flex", alignItems: "center", gap: "5px", padding: "2px 9px", background: "rgba(231,181,60,.18)", color: "#9a7a1e", borderRadius: "999px", fontSize: ".68rem", fontFamily: "var(--disp)", fontWeight: 800, letterSpacing: ".05em", textTransform: "uppercase" };

  // Promo timeline
  const promoRowStyle = { display: "flex", gap: "16px", padding: "16px 0", borderTop: "1px solid rgba(10,11,20,.08)", alignItems: "flex-start" };
  const promoDateStyle = { fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".82rem", color: "#fff", background: ORANGE, borderRadius: "10px", padding: "8px 10px", minWidth: "58px", textAlign: "center", flexShrink: 0 };
  const promoTitleStyle = { fontWeight: 700, fontSize: "1rem", color: INK, margin: "0 0 2px" };
  const promoDetailStyle = { fontSize: ".9rem", color: "rgba(10,11,20,.6)", margin: 0, lineHeight: 1.45 };
  const promoReachStyle = { fontFamily: "var(--disp)", fontWeight: 800, fontSize: ".95rem", color: COBALT, marginLeft: "auto", whiteSpace: "nowrap", paddingLeft: "12px" };

  // Prize panel
  const prizeHeroStyle = { display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center", justifyContent: "space-between", background: `linear-gradient(150deg, ${RED} 0%, #8B1A1A 100%)`, color: "#fff", borderRadius: "18px", padding: "26px 28px", marginBottom: "20px" };
  const prizeBigStyle = { fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1.8rem", margin: "4px 0 0", lineHeight: 1.1 };
  const prizeValuePillStyle = { display: "inline-block", padding: "8px 18px", background: "rgba(255,255,255,.15)", borderRadius: "999px", fontFamily: "var(--disp)", fontWeight: 800, fontSize: "1.1rem" };
  const packageListStyle = { listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" };
  const packageItemStyle = (isYours) => ({ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", borderRadius: "12px", background: isYours ? "rgba(231,181,60,.14)" : "rgba(10,11,20,.03)", border: isYours ? `1.5px solid ${GOLD}` : "1px solid rgba(10,11,20,.06)", fontWeight: isYours ? 700 : 500, fontSize: ".92rem", color: INK });

  // Redemption panel
  const redemptionRowStyle = { display: "flex", alignItems: "flex-start", gap: "14px", padding: "16px 18px", background: "rgba(255,107,53,.06)", border: "1px solid rgba(255,107,53,.2)", borderRadius: "14px", marginBottom: "14px" };
  const redemptionTextStyle = { fontSize: ".96rem", color: "rgba(10,11,20,.75)", lineHeight: 1.5, margin: 0 };
  const noteStyle = { fontSize: ".88rem", color: "rgba(10,11,20,.55)", lineHeight: 1.5, margin: 0, fontStyle: "italic" };

  const footNoteStyle = { textAlign: "center", marginTop: "32px", fontSize: ".9rem", color: "rgba(10,11,20,.5)", lineHeight: 1.6 };

  const iconFor = (key) => {
    if (key === "eye") return <Eye size={22} />;
    if (key === "heart") return <Heart size={22} />;
    if (key === "map") return <MapPin size={22} />;
    if (key === "trophy") return <Trophy size={22} />;
    return <TrendingUp size={22} />;
  };
  const statBg = (key) => (key === "eye" ? COBALT : key === "heart" ? ORANGE : key === "map" ? INK : RED);

  return (
    <main style={pageStyle}>
      <div style={topBarStyle}><Lockup /></div>

      <div style={wrapStyle}>
        <Reveal><span style={previewPillStyle}><Sparkles size={14} /> Preview · sample data</span></Reveal>

        {/* SPONSOR IDENTITY */}
        <Reveal delay={40}>
          <div style={idCardStyle}>
            <div style={idLeftStyle}>
              <span style={idLabelStyle}>Sponsor Dashboard</span>
              <h1 style={idNameStyle}>{sponsor.name}</h1>
              <span style={tierBadgeStyle}><Crown size={16} /> {sponsor.tier}</span>
            </div>
            <div style={idRightStyle}>
              <div style={idMetaRowStyle}><Calendar size={16} /> <span style={idMetaStrong}>{sponsor.drawing}</span></div>
              <div style={idMetaRowStyle}><Flame size={16} /> <span style={idMetaStrong}>{sponsor.contribution}</span></div>
              <div style={{ ...idMetaRowStyle, fontSize: ".82rem", color: "rgba(255,255,255,.5)" }}><Clock size={14} /> Updated {sponsor.lastUpdated}</div>
            </div>
          </div>
        </Reveal>

        {/* HEADLINE STATS */}
        <div style={statsGridStyle}>
          {headlineStats.map((s, i) => (
            <Reveal key={s.label} delay={80 + i * 50}>
              <div style={statCardStyle}>
                <div style={statIconWrapStyle(statBg(s.icon))}>{iconFor(s.icon)}</div>
                <p style={statValueStyle}>{s.value}</p>
                <p style={statLabelStyle}>{s.label}</p>
                <p style={statNoteStyle}>{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* SOCIAL REACH */}
        <Reveal delay={120}>
          <div style={panelStyle}>
            <div style={panelHeadStyle}>
              <div style={panelIconStyle(COBALT)}><Megaphone size={20} /></div>
              <h2 style={panelTitleStyle}>Social reach</h2>
            </div>
            <p style={panelSubStyle}>Every post that put your name in front of Wichita this drawing.</p>
            {socialPosts.map((p) => (
              <div key={p.title} style={postRowStyle}>
                <div style={postLeftStyle}>
                  <span style={postPlatformStyle}>{p.platform}{p.paid ? <span style={{ ...paidTagStyle, marginLeft: "8px" }}><DollarSign size={11} /> Paid boost</span> : null}</span>
                  <span style={postTitleStyle}>{p.title}</span>
                </div>
                <div style={postMetricsStyle}>
                  <span style={metricStyle}><Eye size={15} /> <span style={metricBigStyle}>{p.reach}</span> reach</span>
                  <span style={metricStyle}><Heart size={15} /> {p.likes}</span>
                  <span style={metricStyle}><Share2 size={15} /> {p.shares}</span>
                  <span style={metricStyle}><MessageCircle size={15} /> {p.comments}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* PHYSICAL PROMO */}
        <Reveal delay={140}>
          <div style={panelStyle}>
            <div style={panelHeadStyle}>
              <div style={panelIconStyle(ORANGE)}><MapPin size={20} /></div>
              <h2 style={panelTitleStyle}>On-the-ground promo</h2>
            </div>
            <p style={panelSubStyle}>The real-world work we did to put your brand in front of people.</p>
            {promoActivities.map((a) => (
              <div key={a.title} style={promoRowStyle}>
                <span style={promoDateStyle}>{a.date}</span>
                <div>
                  <p style={promoTitleStyle}>{a.title}</p>
                  <p style={promoDetailStyle}>{a.detail}</p>
                </div>
                <span style={promoReachStyle}>{a.reach}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* PRIZE FUNDED */}
        <Reveal delay={160}>
          <div style={panelStyle}>
            <div style={panelHeadStyle}>
              <div style={panelIconStyle(RED)}><Trophy size={20} /></div>
              <h2 style={panelTitleStyle}>The prize you funded</h2>
            </div>
            <p style={panelSubStyle}>Your contribution headlines this drawing&apos;s package &mdash; the prize the whole city is competing for.</p>
            <div style={prizeHeroStyle}>
              <div>
                <span style={{ fontFamily: "var(--disp)", fontWeight: 700, fontSize: ".8rem", letterSpacing: ".1em", textTransform: "uppercase", color: GOLD }}>Your headline prize</span>
                <p style={prizeBigStyle}>{prize.yourPrize}</p>
              </div>
              <span style={prizeValuePillStyle}>{prize.yourValue} value</span>
            </div>
            <p style={{ ...panelSubStyle, margin: "0 0 14px 0" }}>Part of the full <strong>{prize.packageTotal}</strong> July 1 package:</p>
            <ul style={packageListStyle}>
              {prize.packageItems.map((item, i) => (
                <li key={i} style={packageItemStyle(i === 0)}>
                  {i === 0 ? <Crown size={16} style={{ color: "#9a7a1e", flexShrink: 0 }} /> : <CheckCircle2 size={16} style={{ color: COBALT, flexShrink: 0 }} />}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* REDEMPTIONS / FOOT TRAFFIC */}
        <Reveal delay={180}>
          <div style={panelStyle}>
            <div style={panelHeadStyle}>
              <div style={panelIconStyle(INK)}><Store size={20} /></div>
              <h2 style={panelTitleStyle}>Redemptions &amp; foot traffic</h2>
            </div>
            <p style={panelSubStyle}>When people show up because of your sponsorship, it lands here.</p>
            <div style={redemptionRowStyle}>
              <Clock size={20} style={{ color: ORANGE, flexShrink: 0, marginTop: "2px" }} />
              <div>
                <p style={{ ...redemptionTextStyle, fontWeight: 700, color: INK, margin: "0 0 4px" }}>{redemption.status}</p>
                <p style={redemptionTextStyle}>{redemption.detail}</p>
              </div>
            </div>
            <p style={noteStyle}>{redemption.storefrontNote}</p>
          </div>
        </Reveal>

        <p style={footNoteStyle}>
          This is a preview of your DuckWichita sponsor dashboard, shown with sample data.<br />
          The live version updates as your sponsorship runs. Questions? <strong>gvonflue@gmail.com</strong>
        </p>
      </div>

      <Footer />
    </main>
  );
}
