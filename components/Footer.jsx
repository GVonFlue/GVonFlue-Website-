import { Instagram, Facebook, Mail, Phone } from "lucide-react";
import Lockup from "./Lockup";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-wrap footer-grid">
        <div className="footer-brand">
          <Lockup />
          <p>Helping buyers, sellers, and investors in and around Wichita.</p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <a href="/about">About</a>
          <a href="/listings">Listings</a>
          <a href="/#guide">Free Guide</a>
          <a href="/blog">Blog</a>
        </div>

        <div className="footer-col">
          <h4>Connect</h4>
          <a href="tel:+19013353905">
            <Phone size={16} /> 901-335-3905
          </a>
          <a href="mailto:gvonflue@gmail.com">
            <Mail size={16} /> gvonflue@gmail.com
          </a>
          
            href="https://instagram.com/gvonflue"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={16} /> @gvonflue
          </a>
          
            href="https://www.facebook.com/garrettvonflue/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook size={16} /> Garrett von Flue
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} GVonFlue Real Estate · Real Broker LLC</p>
        <p className="footer-fine">
          Licensed Realtor in Kansas. Equal Housing Opportunity.
        </p>
      </div>
    </footer>
  );
}
