import "@/styles/globals.css";
import Script from "next/script";
import { headers } from "next/headers";

export const metadata = {
  metadataBase: new URL("https://gvonflue.com"),
  title: {
    default: "GVonFlue Real Estate — Wichita, KS · Real Broker LLC",
    template: "%s · GVonFlue Real Estate",
  },
  description:
    "Garrett von Flue helps first-time homebuyers in Wichita and the surrounding area go from 'where do we start?' to keys in hand — no jargon, no pressure.",
  keywords: [
    "Wichita real estate",
    "Wichita Realtor",
    "first-time homebuyer Wichita",
    "GVonFlue",
    "Real Broker LLC",
    "Kansas real estate agent",
  ],
  authors: [{ name: "Garrett von Flue" }],
  openGraph: {
    title: "GVonFlue Real Estate — Wichita, KS",
    description:
      "Your first home, none of the guesswork. First-time buyer guidance from Garrett von Flue, Real Broker LLC.",
    url: "https://gvonflue.com",
    siteName: "GVonFlue Real Estate",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GVonFlue Real Estate — Wichita, KS",
    description:
      "Your first home, none of the guesswork. First-time buyer guidance from Garrett von Flue.",
  },
};

export const viewport = {
  themeColor: "#1338DE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  // One app serves both gvonflue (gvonflue.com / gvonflue.vercel.app) and
  // duckwichita.com (see next.config.js host rewrites). Each domain gets its
  // own Plausible site so the two traffic streams never mix. headers() is
  // synchronous in Next 14.
  const host = headers().get("host") || "";
  const isDuckWichita = host.includes("duckwichita.com");
  const isGVonFlue = host.includes("gvonflue");

  // Pick the right Plausible script per domain.
  const plausibleSrc = isDuckWichita
    ? "https://plausible.io/js/pa-nRuk62WnHY1uabnN-kt7c.js" // DuckWichita
    : isGVonFlue
    ? "https://plausible.io/js/<!-- Privacy-friendly analytics by Plausible -->
<script async src="https://plausible.io/js/pa-TK3j-XIwj5W_eAE56VW4s.js"></script>
<script>
  window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
  plausible.init()
</script>
.js" // GVonFlue ← paste new token
    : null;

  return (
    <html lang="en">
      <body className="gvf">
        {children}
        {plausibleSrc && (
          <>
            <Script defer src={plausibleSrc} strategy="afterInteractive" />
            <Script id="plausible-init" strategy="afterInteractive">
              {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
