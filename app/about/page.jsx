import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import About from "@/components/About";
import FinalCTA from "@/components/FinalCTA";
import ScrollBar from "@/components/ScrollBar";

export const metadata = {
  title: "About Garrett",
  description:
    "Meet Garrett von Flue — Wichita Realtor with Real Broker LLC. Plain-English guidance for first-time homebuyers.",
};

export default function AboutPage() {
  return (
    <>
      <ScrollBar />
      <Nav />
      <main style={{ paddingTop: "120px" }}>
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
