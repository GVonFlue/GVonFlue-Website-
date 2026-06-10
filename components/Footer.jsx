import { Instagram, Facebook, Mail, Phone } from "lucide-react";
import Lockup from "./Lockup";

const footerStyle = {
  background: "var(--ink)",
  color: "rgba(255,255,255,0.78)",
  padding: "80px 28px 32px",
  marginTop: 0,
};

const innerWrap = {
  maxWidth: "1180px",
  margin: "0 auto",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1.4fr 1fr 1.2fr",
  gap: "60px",
  alignItems: "start",
  paddingBottom: "56px",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
};

const brandCol = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const tagline = {
  color: "rgba(255,255,255,0.6)",
  fontSize: "0.98rem",
  lineHeight: 1.55,
  maxWidth: "32ch",
  margin: 0,
};

const colHeading = {
  fontFamily: "var(--disp)",
  fontSize: "0.85rem",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#fff",
  marginBottom: "20px",
};

const linkCol = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const navLink = {
  color: "rgba(255,255,255,0.7)",
  textDecoration: "none",
  fontSize: "1rem",
  transition: "color 150ms",
};

const contactLink = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  color: "rgba(255,255,255,0.7)",
  textDecoration: "none",
  fontSize: "1rem",
};

const bottomRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "12px",
  paddingTop: "28px",
  fontSize: "0.85rem",
  color: "rgba(255,255,255,0.4)",
};

const bottomP = { margin: 0 };

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={innerWrap}>
        <div style={grid} className="footer-responsive-grid">
          <div style={brandCol}>
            <Lockup />
            <p style={tagline}>
              Helping buyers, sellers, and investors in and around Wichita.
            </p>
          </div>

          <div style={linkCol}>
            <div style={colHeading}>Explore</div>
            <a href="/about" style={navLink}>About</a>
            <a href="/listings" style={navLink}>Listings</a>
            <a href="/#guide" style={navLink}>Free Guide</a>
            <a href="/blog" style={navLink}>Blog</a>
          </div>

          <div style={linkCol}>
            <div style={colHeading}>Connect</div>
            <a href="tel:+19013353905" style={contactLink}><Phone size={16} /> 901-335-3905</a>
            <a href="mailto:gvonflue@gmail.com" style={contactLink}><Mail size={16} /> gvonflue@gmail.com</a>
            <a href="https://instagram.com/gvonflue" target="_blank" rel="noopener noreferrer" style={contactLink}><Instagram size={16} /> @gvonflue</a>
            <a href="https://www.facebook.com/garrettvonflue/" target="_blank" rel="noopener noreferrer" style={contactLink}><Facebook size={16} /> Garrett von Flue</a>
          </div>
        </div>

        <div style={bottomRow}>
          <p style={bottomP}>© {new Date().getFullYear()} GVonFlue Real Estate · Real Broker LLC</p>
          <p style={bottomP}>Licensed Realtor in Kansas · Equal Housing Opportunity</p>
        </div>
      </div>
    </footer>
  );
}
