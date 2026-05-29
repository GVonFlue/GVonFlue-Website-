import { Mail, Phone, Instagram, Youtube, Facebook } from "lucide-react";
import Lockup from "./Lockup";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-wrap footer-inner">
        <div className="footer-brand">
          <Lockup light />
          <p>
            Helping first-time buyers across Wichita &amp; the surrounding
            area.
          </p>
        </div>
        <div className="footer-cols">
          <div>
            <h4>Explore</h4>
            <a href="#about">About</a>
            <a href="#listings">Listings</a>
            <a href="#blog">Blog</a>
            <a href="#guide">Free Guide</a>
          </div>
          <div>
            <h4>Reach me</h4>
            <a href="mailto:hello@gvonflue.com">
              <Mail size={14} /> hello@gvonflue.com
            </a>
            <a href="tel:+13165550142">
              <Phone size={14} /> (316) 555-0142
            </a>
          </div>
          <div>
            <h4>Follow</h4>
            <div className="footer-social">
              <a
                href="https://instagram.com/gvonflue"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com/@gvonflue"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://facebook.com/gvonflue"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-base">
        <span>
          © {new Date().getFullYear()} GVonFlue Real Estate · Real Broker LLC ·
          Equal Housing Opportunity
        </span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
