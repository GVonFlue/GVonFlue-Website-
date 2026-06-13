export const metadata = {
  title: { absolute: "DuckWichita — Find a Duck, Win Local Prizes" },
  description:
    "Tiny patriotic ducks hidden across Wichita. Find one, scan the QR, and you're entered in twice-monthly drawings for big local prizes. Always free to play.",
  openGraph: {
    title: "DuckWichita — Find a Duck, Win Local Prizes",
    description:
      "Tiny patriotic ducks hidden across Wichita. Find one, scan the QR, and you're in twice-monthly drawings for big local prizes. Always free to play.",
    url: "https://duckwichita.com",
    siteName: "DuckWichita",
    type: "website",
    images: [
      {
        url: "https://duckwichita.com/images/duck.jpg",
        width: 1254,
        height: 1254,
        alt: "A DuckWichita patriotic duck",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DuckWichita — Find a Duck, Win Local Prizes",
    description:
      "Tiny patriotic ducks hidden across Wichita. Find one, scan the QR, win big local prizes. Free to play.",
    images: ["https://duckwichita.com/images/duck.jpg"],
  },
};

export default function DuckWichitaLayout({ children }) {
  return children;
}
