"use client";

import { useState, useRef, useEffect } from "react";
import { Compass, ArrowRight, Check, RotateCcw, CalendarClock } from "lucide-react";

const WEB3FORMS_KEY = "e87c5fc0-d3e8-47e8-a1ab-5be73241a042";
const CALENDLY = "https://calendly.com/gvonflue-all0/30min";

/* ── Scout · GVonFlue x DuckWichita lead concierge ──
   Avatar art:  /logos/soloduck.png   |   Brand stamp:  /logos/duckwichita-logo.png
   Brand levers live in the .fx-root CSS block below:
   --fx-cobalt #1338DE   --fx-orange #FF6B35   --fx-ink #0A0B14   --fx-cream #FBF6EA  */

const Q = {
  goal: {
    q: "First up. Are you looking to buy, sell, or both?",
    type: "choice",
    options: ["Buying", "Selling", "Both"],
    label: "Goal",
  },
  timeline: {
    q: "Got it. What's your timeline?",
    type: "choice",
    options: ["Next 3 months", "3 to 6 months", "6 to 12 months", "Just exploring"],
    label: "Timeline",
  },
  buyerType: {
    q: "Nice. What kind of buyer are you?",
    type: "choice",
    options: ["First time buyer", "Moving up", "Investor", "Relocating to Wichita"],
    label: "Buyer type",
  },
  financing: {
    q: "Where are you on financing?",
    type: "choice",
    options: ["Pre approved", "Working with a lender", "Need a lender intro", "Paying cash"],
    label: "Financing",
  },
  priceRange: {
    q: "Ballpark price range?",
    type: "choice",
    options: ["Under $200k", "$200k to $350k", "$350k to $500k", "$500k+"],
    label: "Price range",
  },
  propertyType: {
    q: "Tell me about the home you're selling.",
    type: "choice",
    options: ["Single family", "Condo or townhome", "Multi family", "Land or other"],
    label: "Property type",
  },
  sellReason: {
    q: "What's prompting the move?",
    type: "choice",
    options: ["Upsizing", "Downsizing", "Relocating", "Selling an investment"],
    label: "Reason",
  },
  area: {
    q: "What area or ZIP is the home in?",
    type: "text",
    placeholder: "e.g. Riverside, 67203",
    label: "Area",
  },
  name: {
    q: "Last couple things. What's your name?",
    type: "text",
    placeholder: "First & last",
    label: "Name",
  },
  contact: {
    q: "And the best way to reach you?",
    type: "contact",
    label: "Contact",
  },
};

function buildFlow(a) {
  const buying = a.goal === "Buying" || a.goal === "Both";
  const selling = a.goal === "Selling" || a.goal === "Both";
  const keys = ["goal", "timeline"];
  if (buying) keys.push("buyerType", "financing", "priceRange");
  if (selling) {
    keys.push("propertyType", "sellReason");
    if (a.goal === "Selling") keys.push("area");
  }
  keys.push("name", "contact");
  return keys;
}

export default function Scout() {
  const [messages, setMessages] = useState([]);
  const [answers, setAnswers] = useState({});
  const [activeKey, setActiveKey] = useState(null);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const [textVal, setTextVal] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [started, setStarted] = useState(false);

  const scrollRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, activeKey]);

  const after = (ms, fn) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  };

  const askBot = (key) => {
    setTyping(true);
    setActiveKey(null);
    after(720, () => {
      setTyping(false);
      setMessages((m) => [...m, { role: "bot", text: Q[key].q }]);
      setActiveKey(key);
    });
  };

  const start = () => {
    setStarted(true);
    askBot("goal");
  };

  const advance = (key, value) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    setMessages((m) => [...m, { role: "user", text: value }]);
    setTextVal("");

    const flow = buildFlow(next);
    const idx = flow.indexOf(key);
    const nextKey = flow[idx + 1];

    if (nextKey) {
      askBot(nextKey);
    } else {
      finish(next);
    }
  };

  const finish = (data) => {
    setActiveKey(null);
    setTyping(true);
    after(720, () => {
      setTyping(false);
      setDone(true);
      submit(data);
    });
  };

  const submit = async (data) => {
    try {
      const fd = new FormData();
      fd.append("access_key", WEB3FORMS_KEY);
      fd.append("subject", "New AI Lead (Scout) — GVonFlue");
      fd.append("from_name", "Scout — GVonFlue Website");
      fd.append("botcheck", "");
      const flow = buildFlow(data);
      flow.forEach((k) => {
        if (k === "contact") return;
        if (data[k]) fd.append(Q[k].label, data[k]);
      });
      fd.append("Phone", data.phone || "");
      fd.append("Email", data.email || "");
      await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
    } catch (err) {
      console.error("Scout submit error:", err);
    }
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setMessages([]);
    setAnswers({});
    setActiveKey(null);
    setTyping(false);
    setDone(false);
    setTextVal("");
    setPhone("");
    setEmail("");
    askBot("goal");
  };

  const submitText = () => {
    const v = textVal.trim();
    if (!v) return;
    advance(activeKey, v);
  };

  const submitContact = () => {
    if (!phone.trim()) return;
    const merged = { ...answers, phone: phone.trim(), email: email.trim() };
    setAnswers(merged);
    setMessages((m) => [
      ...m,
      { role: "user", text: email.trim() ? `${phone.trim()} · ${email.trim()}` : phone.trim() },
    ]);
    finish(merged);
  };

  const summaryRows = () => {
    const flow = buildFlow(answers).filter((k) => k !== "contact" && k !== "name");
    const rows = flow.map((k) => ({ label: Q[k].label, value: answers[k] }));
    return rows.filter((r) => r.value);
  };

  const active = activeKey ? Q[activeKey] : null;

  return (
    <section className="fx-section" id="fixer">
      <style>{css}</style>
      <div className="fx-root">
        <div className="fx-head">
          <span className="fx-kicker">
            <Compass size={14} /> Your Home Guide
          </span>
          <h2 className="fx-title">
            Meet <em>Scout</em>.
            <img src="/logos/soloduck.png" alt="Scout the duck" className="fx-title-duck" />
          </h2>
          <p className="fx-sub">
            Sixty seconds with Scout and you're locked in with a real game plan.
            No clipboard forms. Just real answers, straight to Garrett.
          </p>
          <div className="fx-trust">
            <span>~60 second qualify</span>
            <span>Routes straight to Garrett</span>
            <span>Zero pressure</span>
          </div>
        </div>

        <div className="fx-chat">
          <div className="fx-bar">
            <div className="fx-avatar">
              <img src="/logos/soloduck.png" alt="Scout the DuckWichita duck" className="fx-duck" />
            </div>
            <div className="fx-id">
              <strong>Scout</strong>
              <span><i className="fx-live" /> GVonFlue Real Estate</span>
            </div>
            {(started || done) && (
              <button className="fx-reset" onClick={reset} aria-label="Start over">
                <RotateCcw size={15} /> Restart
              </button>
            )}
          </div>

          <div className="fx-stream" ref={scrollRef}>
            {!started && (
              <div className="fx-intro">
                <div className="fx-bot fx-msg">
                  Hey, I'm Scout 🦆 Answer a few quick questions and I'll point you
                  toward the right move. Ready?
                </div>
                <button className="fx-start" onClick={start}>
                  Let's go <ArrowRight size={18} />
                </button>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`fx-msg ${m.role === "bot" ? "fx-bot" : "fx-user"}`}
              >
                {m.text}
              </div>
            ))}

            {typing && (
              <div className="fx-msg fx-bot fx-typing">
                <i /><i /><i />
              </div>
            )}

            {done && (
              <div className="fx-card">
                <div className="fx-card-top">
                  <span className="fx-check"><Check size={16} strokeWidth={3} /></span>
                  You're locked in
                </div>
                <div className="fx-card-name">{answers.name}</div>
                <div className="fx-grid">
                  {summaryRows().map((r) => (
                    <div className="fx-cell" key={r.label}>
                      <span className="fx-cell-k">{r.label}</span>
                      <span className="fx-cell-v">{r.value}</span>
                    </div>
                  ))}
                  <div className="fx-cell">
                    <span className="fx-cell-k">Phone</span>
                    <span className="fx-cell-v">{answers.phone}</span>
                  </div>
                  {answers.email && (
                    <div className="fx-cell">
                      <span className="fx-cell-k">Email</span>
                      <span className="fx-cell-v">{answers.email}</span>
                    </div>
                  )}
                </div>
                <p className="fx-card-note">
                  Garrett got the details. Want to skip the wait and grab a time now?
                </p>
                <a className="fx-book" href={CALENDLY} target="_blank" rel="noopener noreferrer">
                  <CalendarClock size={18} /> Book a 30 min call
                </a>
              </div>
            )}
          </div>

          {started && !done && (
            <div className="fx-input">
              {active && active.type === "choice" && (
                <div className="fx-options">
                  {active.options.map((o) => (
                    <button key={o} className="fx-opt" onClick={() => advance(activeKey, o)}>
                      {o}
                    </button>
                  ))}
                </div>
              )}

              {active && active.type === "text" && (
                <div className="fx-row">
                  <input
                    className="fx-field"
                    value={textVal}
                    onChange={(e) => setTextVal(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submitText()}
                    placeholder={active.placeholder}
                    autoFocus
                  />
                  <button className="fx-send" onClick={submitText} aria-label="Send">
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}

              {active && active.type === "contact" && (
                <div className="fx-contact">
                  <input
                    className="fx-field"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone — so Garrett can text you"
                    autoFocus
                  />
                  <input
                    className="fx-field"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submitContact()}
                    placeholder="Email (optional)"
                  />
                  <button className="fx-lock" onClick={submitContact}>
                    Lock it in <Check size={18} strokeWidth={3} />
                  </button>
                </div>
              )}

              {!active && (
                <div className="fx-options">
                  <button className="fx-opt fx-opt-ghost" disabled>
                    Scout is typing…
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="fx-foot">
            <span>Powered by</span>
            <img src="/logos/duckwichita-logo.png" alt="DuckWichita" />
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
.fx-section{position:relative;background:#0A0B14;padding:96px 24px;overflow:hidden;}
.fx-root{
  --fx-cobalt:#1338DE;--fx-orange:#FF6B35;--fx-ink:#0A0B14;--fx-cream:#FBF6EA;
  --fx-line:rgba(255,255,255,0.10);
  max-width:680px;margin:0 auto;position:relative;z-index:2;
}
.fx-section::before{
  content:"";position:absolute;top:-20%;left:50%;transform:translateX(-50%);
  width:680px;height:680px;border-radius:50%;
  background:radial-gradient(circle,rgba(19,56,222,0.28),transparent 62%);
  filter:blur(40px);pointer-events:none;
}
.fx-head{text-align:center;margin-bottom:36px;}
.fx-kicker{
  display:inline-flex;align-items:center;gap:7px;
  font-family:var(--body);font-size:0.72rem;font-weight:700;letter-spacing:0.14em;
  text-transform:uppercase;color:var(--fx-orange);
  background:rgba(255,107,53,0.10);border:1px solid rgba(255,107,53,0.30);
  padding:7px 14px;border-radius:999px;
}
.fx-title{
  font-family:var(--disp);font-size:clamp(2.1rem,5vw,3rem);line-height:1.05;
  color:#fff;margin:18px 0 0;font-weight:600;
}
.fx-title em{font-style:italic;color:var(--fx-cobalt);
  background:linear-gradient(90deg,#3a5bff,#1338DE);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}
.fx-title-duck{display:inline-block;height:1.84em;width:1.84em;object-fit:contain;
  vertical-align:-0.16em;margin-left:14px;background:var(--fx-cream);
  border:1px solid rgba(19,56,222,0.35);border-radius:13px;padding:4px;
  box-shadow:0 6px 16px rgba(19,56,222,0.30);}
.fx-sub{color:rgba(255,255,255,0.62);font-size:1.05rem;line-height:1.6;
  max-width:48ch;margin:16px auto 0;font-family:var(--body);}
.fx-trust{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:22px;}
.fx-trust span{
  font-family:var(--body);font-size:0.78rem;color:rgba(255,255,255,0.75);
  background:rgba(255,255,255,0.05);border:1px solid var(--fx-line);
  padding:7px 13px;border-radius:999px;
}
.fx-chat{
  background:#101220;border:1px solid var(--fx-line);border-radius:26px;
  box-shadow:0 30px 70px rgba(0,0,0,0.45);overflow:hidden;
  display:flex;flex-direction:column;
}
.fx-bar{
  display:flex;align-items:center;gap:12px;padding:16px 18px;
  border-bottom:1px solid var(--fx-line);background:rgba(255,255,255,0.02);
}
.fx-avatar{
  width:42px;height:42px;border-radius:13px;display:grid;place-items:center;
  background:var(--fx-cream);border:1px solid rgba(19,56,222,0.35);
  box-shadow:0 6px 16px rgba(19,56,222,0.30);flex-shrink:0;overflow:hidden;padding:3px;
}
.fx-duck{width:100%;height:100%;object-fit:contain;display:block;}
.fx-id{display:flex;flex-direction:column;line-height:1.3;}
.fx-id strong{color:#fff;font-family:var(--disp);font-size:1.02rem;}
.fx-id span{display:flex;align-items:center;gap:6px;color:rgba(255,255,255,0.5);font-size:0.76rem;}
.fx-live{width:7px;height:7px;border-radius:50%;background:#37d67a;
  box-shadow:0 0 0 0 rgba(55,214,122,0.6);animation:fxPulse 2s infinite;}
@keyframes fxPulse{0%{box-shadow:0 0 0 0 rgba(55,214,122,0.5);}70%{box-shadow:0 0 0 7px rgba(55,214,122,0);}100%{box-shadow:0 0 0 0 rgba(55,214,122,0);}}
.fx-reset{
  margin-left:auto;display:inline-flex;align-items:center;gap:6px;cursor:pointer;
  background:transparent;border:1px solid var(--fx-line);color:rgba(255,255,255,0.6);
  font-family:var(--body);font-size:0.78rem;padding:7px 12px;border-radius:999px;transition:0.2s;
}
.fx-reset:hover{color:#fff;border-color:rgba(255,255,255,0.3);}
.fx-stream{
  padding:22px 18px;display:flex;flex-direction:column;gap:12px;
  min-height:300px;max-height:460px;overflow-y:auto;scroll-behavior:smooth;
}
.fx-msg{
  max-width:80%;padding:13px 16px;font-size:0.97rem;line-height:1.5;
  font-family:var(--body);border-radius:16px;animation:fxIn 0.35s ease both;
}
@keyframes fxIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
.fx-bot{align-self:flex-start;background:rgba(255,255,255,0.07);color:#f3f4fb;
  border:1px solid var(--fx-line);border-bottom-left-radius:5px;}
.fx-user{align-self:flex-end;color:#fff;border-bottom-right-radius:5px;
  background:linear-gradient(135deg,var(--fx-cobalt),#2f54ff);
  box-shadow:0 6px 18px rgba(19,56,222,0.4);}
.fx-typing{display:flex;gap:5px;align-items:center;width:auto;max-width:70px;}
.fx-typing i{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,0.5);
  animation:fxBounce 1.2s infinite;}
.fx-typing i:nth-child(2){animation-delay:0.15s;}
.fx-typing i:nth-child(3){animation-delay:0.3s;}
@keyframes fxBounce{0%,60%,100%{transform:translateY(0);opacity:0.4;}30%{transform:translateY(-5px);opacity:1;}}
.fx-intro{display:flex;flex-direction:column;align-items:flex-start;gap:14px;}
.fx-start{
  display:inline-flex;align-items:center;gap:8px;cursor:pointer;
  font-family:var(--disp);font-size:1rem;font-weight:600;color:#fff;
  background:linear-gradient(135deg,var(--fx-orange),#ff8a5c);
  border:none;padding:13px 22px;border-radius:999px;
  box-shadow:0 10px 26px rgba(255,107,53,0.4);transition:transform 0.18s;
}
.fx-start:hover{transform:translateY(-2px);}
.fx-input{padding:16px 18px;border-top:1px solid var(--fx-line);background:rgba(255,255,255,0.02);}
.fx-options{display:flex;flex-wrap:wrap;gap:10px;}
.fx-opt{
  cursor:pointer;font-family:var(--body);font-size:0.92rem;font-weight:500;color:#f3f4fb;
  background:rgba(255,255,255,0.05);border:1px solid rgba(255,107,53,0.45);
  padding:11px 16px;border-radius:13px;transition:0.18s;
}
.fx-opt:hover{background:var(--fx-cobalt);border-color:var(--fx-cobalt);color:#fff;
  transform:translateY(-2px);box-shadow:0 8px 20px rgba(19,56,222,0.35);}
.fx-opt-ghost{opacity:0.5;cursor:default;border-color:var(--fx-line);}
.fx-opt-ghost:hover{transform:none;background:rgba(255,255,255,0.05);border-color:var(--fx-line);color:#f3f4fb;box-shadow:none;}
.fx-row,.fx-contact{display:flex;gap:10px;flex-wrap:wrap;}
.fx-contact{flex-direction:column;}
.fx-field{
  flex:1;min-width:0;background:rgba(255,255,255,0.06);border:1px solid var(--fx-line);
  border-radius:13px;padding:13px 15px;font-size:0.97rem;color:#fff;
  font-family:var(--body);outline:none;transition:0.18s;
}
.fx-field::placeholder{color:rgba(255,255,255,0.4);}
.fx-field:focus{border-color:var(--fx-cobalt);box-shadow:0 0 0 3px rgba(19,56,222,0.25);}
.fx-send{
  flex-shrink:0;width:48px;border:none;border-radius:13px;cursor:pointer;color:#fff;
  background:linear-gradient(135deg,var(--fx-cobalt),#2f54ff);display:grid;place-items:center;transition:0.18s;
}
.fx-send:hover{transform:translateY(-2px);}
.fx-lock{
  cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;
  font-family:var(--disp);font-size:1rem;font-weight:600;color:#fff;
  background:linear-gradient(135deg,var(--fx-orange),#ff8a5c);
  border:none;padding:14px 22px;border-radius:13px;
  box-shadow:0 10px 26px rgba(255,107,53,0.4);transition:transform 0.18s;
}
.fx-lock:hover{transform:translateY(-2px);}
.fx-card{
  align-self:stretch;background:rgba(19,56,222,0.07);
  border:1px solid rgba(19,56,222,0.4);border-radius:20px;padding:22px;
  animation:fxIn 0.45s ease both;
}
.fx-card-top{display:flex;align-items:center;gap:9px;
  font-family:var(--disp);font-size:1.15rem;font-weight:600;color:#fff;}
.fx-check{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;
  background:#37d67a;color:#06210f;flex-shrink:0;}
.fx-card-name{margin:6px 0 16px 35px;color:var(--fx-orange);font-family:var(--disp);
  font-size:1.3rem;font-weight:600;}
.fx-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--fx-line);
  border:1px solid var(--fx-line);border-radius:14px;overflow:hidden;}
.fx-cell{background:#101220;padding:12px 14px;display:flex;flex-direction:column;gap:3px;}
.fx-cell-k{font-size:0.68rem;text-transform:uppercase;letter-spacing:0.1em;
  color:rgba(255,255,255,0.45);font-family:var(--body);}
.fx-cell-v{font-size:0.95rem;color:#fff;font-family:var(--body);font-weight:500;}
.fx-card-note{color:rgba(255,255,255,0.7);font-size:0.92rem;line-height:1.5;
  margin:18px 0 14px;font-family:var(--body);}
.fx-book{
  display:flex;align-items:center;justify-content:center;gap:9px;text-decoration:none;
  font-family:var(--disp);font-size:1rem;font-weight:600;color:#fff;
  background:linear-gradient(135deg,var(--fx-cobalt),#2f54ff);
  padding:14px;border-radius:13px;box-shadow:0 10px 26px rgba(19,56,222,0.4);transition:transform 0.18s;
}
.fx-book:hover{transform:translateY(-2px);}
.fx-foot{display:flex;align-items:center;justify-content:center;gap:10px;
  padding:11px 14px;border-top:1px solid var(--fx-line);background:var(--fx-cream);}
.fx-foot span{font-family:var(--body);font-size:0.7rem;font-weight:700;
  letter-spacing:0.08em;text-transform:uppercase;color:rgba(10,11,20,0.5);}
.fx-foot img{height:24px;width:auto;display:block;}
@media(max-width:520px){
  .fx-section{padding:64px 16px;}
  .fx-grid{grid-template-columns:1fr;}
  .fx-msg{max-width:88%;}
}
`;
