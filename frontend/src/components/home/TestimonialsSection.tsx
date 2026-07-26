"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "HNI Investor",
    text: "BHRAMASTRA brought the discipline my portfolio desperately needed. Their research-driven approach protected my capital during the recent downturn while positioning me perfectly for the recovery.",
  },
  {
    name: "Dr. Anjali Desai",
    role: "Medical Professional",
    text: "As a doctor, I have no time to track the markets. The team at BHRAMASTRA manages my retirement portfolio with an institutional rigor that gives me complete peace of mind.",
  },
  {
    name: "Vikram Singhania",
    role: "Business Owner",
    text: "The difference between retail tips and institutional research is night and day. BHRAMASTRA's quarterly reviews and risk dashboards have fundamentally changed how I view wealth creation.",
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Info & Controls */}
          <div>
            <div className="text-brand-gold tracking-widest uppercase text-sm font-bold mb-4 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-brand-gold"></span>
              Client Success
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Trusted by Discerning Investors
            </h2>
            <p className="text-brand-grey text-lg mb-8">
              Don't just take our word for it. Hear from the professionals and business owners who rely on our frameworks to protect and grow their wealth.
            </p>
            
            <div className="flex gap-4">
              <button onClick={prev} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:border-brand-gold hover:text-background transition-all">
                <ChevronLeft />
              </button>
              <button onClick={next} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:border-brand-gold hover:text-background transition-all">
                <ChevronRight />
              </button>
            </div>
          </div>

          {/* Right: Slider */}
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-[#101010] p-8 md:p-12 rounded-2xl border border-white/10"
              >
                <div className="flex text-brand-gold mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <p className="text-xl md:text-2xl font-heading leading-relaxed text-white mb-8 italic">
                  "{testimonials[currentIndex].text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-grey/20" />
                  <div>
                    <h4 className="font-heading font-bold text-white">{testimonials[currentIndex].name}</h4>
                    <p className="text-brand-grey text-sm uppercase tracking-wider">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Video / Google Placeholders */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-64 bg-charcoal rounded-xl border border-white/5 flex flex-col items-center justify-center relative group cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-brand-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 rounded-full bg-brand-gold flex items-center justify-center text-background pl-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span className="mt-4 font-heading font-bold text-white tracking-widest uppercase text-sm">Play Video Testimonial</span>
          </div>
          <div className="h-64 bg-charcoal rounded-xl border border-white/5 flex flex-col items-center justify-center">
             <div className="text-4xl font-bold text-white flex items-center gap-2 mb-2">4.9 <Star className="text-brand-gold" fill="currentColor" /></div>
             <span className="text-brand-grey font-heading uppercase tracking-widest text-sm">Google Reviews Placeholder</span>
          </div>
        </div>

      </div>
    </section>
  );
}
