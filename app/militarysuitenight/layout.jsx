export const metadata = {
  title: "Military Suite Night · Sept 11 at the Wind Surge",
  description:
    "A free night at the ballpark for those who served. Enter the drawing for a suite seat, or send a service member to the game for $12.",
  openGraph: {
    title: "Military Suite Night · Sept 11 at the Wind Surge",
    description:
      "A free night at the ballpark for those who served. Enter the drawing for a suite seat, or send a service member to the game for $12.",
    url: "https://gvonflue.vercel.app/militarysuitenight",
    images: [
      {
        url: "https://gvonflue.vercel.app/og/military-suite-night.png",
        width: 1200,
        height: 630,
        alt: "Military Suite Night — September 11 at Equity Bank Park",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Military Suite Night · Sept 11 at the Wind Surge",
    description:
      "A free night at the ballpark for those who served. Enter the drawing for a suite seat, or send a service member for $12.",
    images: ["https://gvonflue.vercel.app/og/military-suite-night.png"],
  },
};

export default function MilitarySuiteNightLayout({ children }) {
  return children;
}
