"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Lockup from "./Lockup";

const LINKS = [
  { label: "How It Works", href: "/duckwichita#how" },
  { label: "The Prize", href: "/duckwichita#prize" },
  { label: "Sponsor", href: "/sponsor" },
  { label: "Rules", href: "/rules" },
];

const REALTY_URL = "https://gvonflue.vercel.app";

const ORANGE = "#FF6B35";
const COBALT = "#1338DE";
const INK = "#0A0B14";

export default function DuckNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        .ducknav { position: relative; z-index: 50; padding: 20px 24px; max-width: 1180px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .ducknav-logo { display: inline-flex; }
        .ducknav-links { display: flex; align-items: center; gap: 28px; }
        .ducknav-links a.ducknav-link { font-family: var(--disp); font-weight: 600; font-size: .95rem; color: ${INK}; text-decoration: none; transition: color .2s; }
        .ducknav-links a.ducknav-link:hover { color: ${COBALT}; }
        .ducknav-cta { display: inline-flex; align-items: center; gap: 6px; padding: 11px 20px; background: ${ORANGE}; color: #fff !important; border-radius: 999px; font-family: var(--disp); font-weight: 800; font-size: .92rem; text-decoration: none; white-space: nowrap; }
        .ducknav-realty { display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px; background: ${COBALT}; color: #fff !important; border: 2px solid ${ORANGE}; border-radius: 999px; font-family: var(--disp); font-weight: 800; font-size: .92rem; text-decoration: none; white-space: nowrap; }
        .ducknav-toggle { display: none; background: none; border: none; color: ${INK}; cursor: pointer; padding: 6px; }
        .ducknav-sheet { display: none; }
        @media (max-width: 860px) {
          .ducknav-links { display: none; }
          .ducknav-toggle { display: inline-flex; }
          .ducknav-sheet { display: flex; flex-direction: column; gap: 0; padding: 0 24px 20px; max-width: 1180px; margin: 0 auto; }
          .ducknav-sheet a.ducknav-link { font-family: var(--disp); font-weight: 700; font-size: 1.08rem; color: ${INK}; text-decoration: none; padding: 14px 0; border-bottom: 1px solid rgba(10,11,20,.08); }
          .ducknav-sheet .ducknav-cta { justify-content: center; margin-top: 16px; padding: 14px 20px; font-size: 1rem; }
        }
      `}</style>

      <header className="ducknav">
        <Link href="/duckwichita" aria-label="DuckWichita home" className="ducknav-logo">
          <Lockup />
        </Link>

        <nav className="ducknav-links">
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="ducknav-link">{l.label}</Link>
          ))}
          <a href={REALTY_URL} className="ducknav-realty">GVonFlue Realty Group</a>
        </nav>

        <button className="ducknav-toggle" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {open && (
        <div className="ducknav-sheet">
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="ducknav-link" onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <a href={REALTY_URL} className="ducknav-realty" onClick={() => setOpen(false)}>GVonFlue Realty Group</a>
          <Link href="/jointheflock" className="ducknav-cta" onClick={() => setOpen(false)}>Join the Flock <ArrowUpRight size={16} /></Link>
        </div>
      )}
    </>
  );
}
