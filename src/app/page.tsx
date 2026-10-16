import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Tracks } from "@/components/Tracks";
import { FactsStrip } from "@/components/FactsStrip";
import { WhoShouldApply } from "@/components/WhoShouldApply";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F2EA] text-[#1A1A1A]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <Tracks />
        <FactsStrip />
        <WhoShouldApply />
        <ApplicationForm />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
