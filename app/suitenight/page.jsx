import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SuiteNight from "@/components/SuiteNight";

export const metadata = {
  title: "A Networking Event Like You’ve Never Seen · Suite Night",
  description:
    "Twenty people. One private suite at Equity Bank Park. One real hour before first pitch. Tuesday, August 12, 2026. Only 19 spots.",
  alternates: { canonical: "/suitenight" },
  openGraph: {
    title: "A Networking Event Like You’ve Never Seen",
    description:
      "Twenty Wichita realtors and business owners. A private suite at the Wind Surge. No pitch. Even if we never work together.",
    url: "https://gvonflue.com/suitenight",
    siteName: "GVonFlue Real Estate",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A Networking Event Like You’ve Never Seen",
    description:
      "Twenty people. One private suite. One real hour. Only 19 spots · August 12, 2026.",
  },
};

export default function SuiteNightPage() {
  return (
    <>
      <Nav />
      <SuiteNight />
      <Footer />
    </>
  );
}
