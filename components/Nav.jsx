"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Lockup from "./Lockup";

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Listings", href: "/listings" },
  { label: "Guide", href: "/#guide" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const duckLinkStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  color: "#FF6B35",
  fontWeight: 700,
};

const duckDotStyle = {
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  background: "#FF6B35",
  display: "inline-block",
  flexShrink: 0,
  animation: "duckpulse 2s ease-in-out infinite",
};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes duckpulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.75); }
        }
      `}</style>
      <header className={`nav ${solid ? "nav-solid" : ""}`}>
        <div className="nav-inner">
          <Link href="/" aria-label="GVonFlue home" style={{ display: "inline-flex" }}>
            <Lockup />
          </Link>
          <nav className="nav-links">
            {LINKS.map((l) => (
              <Link key={l.label} href={l.href}>{l.label}</Link>
            ))}
            <a href="https://duckwichita.com" style={duckLinkStyle}>
              <span style={duckDotStyle}></span>DuckWichita
            </a>
            <Link href="/#guide" className="btn btn-gold btn-sm">Get the Free Guide</Link>
          </nav>
          <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </header>

      {open && (
        <div className="nav-sheet">
          <button className="nav-sheet-close" aria-label="Close menu" onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
          <div className="nav-sheet-links">
            {LINKS.map((l) => (
              <Link key={l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
            <a href="https://duckwichita.com" style={{ ...duckLinkStyle, fontSize: "1.1rem" }} onClick={() => setOpen(false)}>
              <span style={duckDotStyle}></span>DuckWichita
            </a>
            <Link href="/#guide" className="btn btn-gold btn-lg" onClick={() => setOpen(false)}>Get the Free Guide</Link>
          </div>
        </div>
      )}
    </>
  );
}
