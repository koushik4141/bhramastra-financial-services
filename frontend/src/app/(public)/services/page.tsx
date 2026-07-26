import React from 'react';
import ServicesSection from "@/components/home/ServicesSection";

export const metadata = {
  title: 'Services | BHRAMASTRA Financial Services',
};

export default function ServicesPage() {
  return (
    <div className="pt-20 bg-background">
      <ServicesSection />
    </div>
  );
}
