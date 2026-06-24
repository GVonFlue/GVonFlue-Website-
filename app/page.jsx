import ScrollBar from "@/components/ScrollBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Fixer from "@/components/Fixer";
import Journey from "@/components/Journey";
import About from "@/components/About";
import Values from "@/components/Values";
import LeadMagnet from "@/components/LeadMagnet";
import DuckWichita from "@/components/DuckWichita";
import Social from "@/components/Social";
import Local from "@/components/Local";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <ScrollBar />
      <Nav />
      <Hero />
      <Fixer />
      <Journey />
      <About />
      <Values />
      <LeadMagnet />
      <DuckWichita />
      <Social />
      <Local />
      <FinalCTA />
      <Footer />
    </>
  );
}
