/**
 * Brand lockup: your logo + vertical divider + Real Broker LLC logo.
 * MUST appear together everywhere your logo is shown (brokerage requirement).
 * Used in Nav and Footer.
 *
 * `light=true` flips the divider color and inverts the Real Broker logo
 * so the box reads white on dark backgrounds.
 */
export default function Lockup({ light = false }) {
  return (
    <div className="lockup">
      <img
        src="/logos/gvonflue-logo.png"
        alt="GVonFlue Real Estate"
        className="brandlogo"
      />
      <span className={`divider ${light ? "on-dark" : ""}`} />
      <img
        src="/logos/real-broker.png"
        alt="Real Broker LLC"
        className={`brokerlogo ${light ? "on-dark" : ""}`}
      />
    </div>
  );
}
