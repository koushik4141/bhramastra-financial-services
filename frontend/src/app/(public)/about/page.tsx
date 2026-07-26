import React from 'react';
import AboutSection from "@/components/home/AboutSection";
import FoundersSection from "@/components/home/FoundersSection";

export const metadata = {
  title: 'About Us | BHRAMASTRA Financial Services',
};

export default function AboutPage() {
  return (
    <div className="pt-20 bg-background">
      <AboutSection />
      <FoundersSection />
    </div>
  );
}
