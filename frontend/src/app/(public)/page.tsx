import React from "react";
import CinematicHero from "@/components/home/CinematicHero";
import TrustMetrics from "@/components/home/TrustMetrics";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import NewsSection from "@/components/home/NewsSection";
import CtaBanner from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <div className="flex flex-col bg-background">
      <CinematicHero />
      <TrustMetrics />
      <AboutSection />
      <ServicesSection />
      <NewsSection />
      <CtaBanner />
    </div>
  );
}
