import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | BHRAMASTRA Financial Services",
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-[#050505] px-6 text-center">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-brand-saffron/5 blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="font-heading font-bold text-[8rem] md:text-[12rem] leading-none text-transparent bg-clip-text bg-gradient-gold drop-shadow-2xl mb-4">
          404
        </h1>
        
        <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-widest text-white uppercase mb-4">
          Page Not Found
        </h2>
        
        <p className="text-brand-grey text-sm md:text-base max-w-md mx-auto mb-10">
          The market moves fast, and it looks like this page has moved too. The link you followed is broken or the page no longer exists.
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 border border-brand-saffron/50 text-brand-saffron font-body font-semibold text-sm uppercase tracking-wider rounded-sm hover:bg-brand-saffron hover:text-[#050505] transition-all duration-300"
        >
          <ArrowLeft size={16} />
          Return Home
        </Link>
      </div>
    </div>
  );
}
