import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import CareerSection from "@/components/career-section";
import FeatureSection from "@/components/feature-section";
import CTASection from "@/components/cta-section";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <HeroSection/>
      <CareerSection/>
      <FeatureSection/>
      <CTASection/>
    </main>
  );
}
