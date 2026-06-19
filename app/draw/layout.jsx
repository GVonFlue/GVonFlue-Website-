export const metadata = {
  title: { absolute: "Random Name Picker Wheel — Spin to Pick a Winner | DuckWichita" },
  description:
    "Free random name picker wheel. Paste a list of names, spin the wheel, and pick a random winner instantly. Great for giveaways, raffles, classrooms, and prize drawings. No sign-up.",
  keywords: [
    "random name picker",
    "wheel of names",
    "random winner generator",
    "spin the wheel",
    "giveaway wheel",
    "raffle picker",
    "name spinner",
  ],
  alternates: { canonical: "https://duckwichita.com/draw" },
  openGraph: {
    title: "Random Name Picker Wheel — Spin to Pick a Winner",
    description:
      "Paste names, spin the wheel, pick a random winner. A free random name picker by DuckWichita.",
    url: "https://duckwichita.com/draw",
    siteName: "DuckWichita",
    type: "website",
    images: [
      {
        url: "https://duckwichita.com/images/duckwichitalogo.png",
        width: 690,
        height: 200,
        alt: "DuckWichita Random Name Picker Wheel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Name Picker Wheel — Spin to Pick a Winner",
    description:
      "Free random name picker wheel. Paste names, spin, pick a winner. No sign-up.",
    images: ["https://duckwichita.com/images/duckwichitalogo.png"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Random Name Picker Wheel",
      url: "https://duckwichita.com/draw",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      description:
        "Free random name picker wheel. Paste a list of names, spin the wheel, and pick a random winner instantly.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: {
        "@type": "Organization",
        name: "DuckWichita",
        url: "https://duckwichita.com",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is the random name picker free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. It is completely free, with no sign-up and no limits. Everything runs in your browser, and your list is never uploaded or saved anywhere.",
          },
        },
        {
          "@type": "Question",
          name: "How does the wheel choose a winner?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every name becomes a slice of the wheel. When you spin, one slice is selected at random and revealed as the winner. The more slices a name has, the better its odds.",
          },
        },
        {
          "@type": "Question",
          name: "Can I give one name more chances to win?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Add a name more than once and it gets that many slices. Five entries means five slices and five times the odds, which keeps weighted drawings fair.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use it for giveaways, raffles, or classrooms?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. Paste any list of names, students, teams, or ticket numbers, then spin to pick a winner. It works great for giveaways, raffles, prize drawings, and classroom callouts.",
          },
        },
        {
          "@type": "Question",
          name: "Is it actually random?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Each spin uses your browser's built-in randomness to choose the winning slice, so every name on the wheel gets a fair shot.",
          },
        },
      ],
    },
  ],
};

export default function DrawLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
