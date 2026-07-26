"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { PremiumButton } from "@/components/ui/PremiumButton";

const blogs = [
  {
    category: "Market Updates",
    title: "Navigating the Q3 Earnings Season: A Quantitative Approach",
    desc: "An in-depth look at how sector rotations are presenting new opportunities for long-term compounding.",
    readTime: "5 min read",
    date: "Oct 24, 2026"
  },
  {
    category: "Financial Literacy",
    title: "The Mathematics of Capital Preservation",
    desc: "Why a 50% drawdown requires a 100% gain just to break even, and how we build portfolios to avoid it.",
    readTime: "8 min read",
    date: "Oct 18, 2026"
  },
  {
    category: "Investment Education",
    title: "Macro Tailwinds vs. Micro Noise",
    desc: "How to filter out daily financial media hysteria and focus on structural economic shifts.",
    readTime: "6 min read",
    date: "Oct 12, 2026"
  }
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-background border-t border-white/5 relative">
      <div className="absolute left-0 top-1/2 w-64 h-64 bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="text-brand-gold tracking-widest uppercase text-sm font-bold mb-4 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-brand-gold"></span>
              Research & Insights
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
              Institutional Intel
            </h2>
          </div>
          <PremiumButton variant="outline" className="hidden md:inline-flex px-6 py-2.5 text-xs">
            View All Articles
          </PremiumButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="aspect-[16/9] w-full bg-[#101010] rounded-xl mb-6 border border-white/10 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-heading font-bold text-brand-gold uppercase tracking-widest">
                  {blog.category}
                </div>
              </div>
              
              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-brand-grey font-medium mb-3">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {blog.readTime}</span>
                  <span className="w-1 h-1 rounded-full bg-brand-grey/30" />
                  <span>{blog.date}</span>
                </div>
                
                <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-brand-gold transition-colors leading-snug">
                  {blog.title}
                </h3>
                
                <p className="text-brand-grey text-sm leading-relaxed mb-6 flex-grow">
                  {blog.desc}
                </p>
                
                <div className="text-brand-gold text-sm font-bold uppercase tracking-wider flex items-center mt-auto">
                  Read Article <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
