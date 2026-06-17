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
  // One app serves both gvonflue.com and duckwichita.com (see next.config.js
  // host rewrites). Only load Plausible on duckwichita.com so real-estate
  // traffic never pollutes the DuckWichita stats. headers() is synchronous
  // in Next 14.
  const host = headers().get("host") || "";
  const isDuckWichita = host.includes("duckwichita.com");

  return (
    <html lang="en">
      <body className="gvf">
        {children}
        {isDuckWichita && (
          <>
            <Script
              defer
              src="https://plausible.io/js/pa-nRuk62WnHY1uabnN-kt7c.js"
              strategy="afterInteractive"
            />
            <Script id="plausible-init" strategy="afterInteractive">
              {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
