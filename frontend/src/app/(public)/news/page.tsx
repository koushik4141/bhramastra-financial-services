import React from 'react';
import NewsSection from "@/components/home/NewsSection";

export const metadata = {
  title: 'News | BHRAMASTRA Financial Services',
};

export default function NewsPage() {
  return (
    <div className="pt-20 bg-background">
      <NewsSection />
    </div>
  );
}
