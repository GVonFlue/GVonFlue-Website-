"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Lockup from "./Lockup";

const LINKS = ["About", "Listings", "Guide", "Blog", "Contact"];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${solid ? "nav-solid" : ""}`}>
      <div className="nav-inner">
        <Lockup />
        <nav className="nav-links">
          {LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}>
              {l}
            </a>
          ))}
          <a href="#guide" className="btn btn-gold btn-sm">
            Get the Free Guide
          </a>
        </nav>
        <button
          className="nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="nav-mobile">
          {LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <a href="#guide" className="btn btn-gold" onClick={() => setOpen(false)}>
            Get the Free Guide
          </a>
        </div>
      )}
    </header>
  );
}
