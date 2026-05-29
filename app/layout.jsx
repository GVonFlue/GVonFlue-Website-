import "@/styles/globals.css";

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
  return (
    <html lang="en">
      <body className="gvf">{children}</body>
    </html>
  );
}
