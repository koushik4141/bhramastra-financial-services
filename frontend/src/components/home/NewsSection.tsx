"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const newsItems = [
  {
    id: 1,
    category: "Market Analysis",
    title: "Navigating Q3 Earnings: Key Sectors to Watch in Indian Markets",
    date: "July 15, 2024",
    excerpt:
      "A deep dive into the upcoming earnings season and sectors positioned for potential outperformance based on institutional flows.",
    gradient: "from-brand-gold/20 to-brand-gold/5",
  },
  {
    id: 2,
    category: "Research",
    title: "The Mathematics of Capital Preservation in Volatile Markets",
    date: "July 12, 2024",
    excerpt:
      "Understanding why protecting capital is mathematically more important than chasing returns — the asymmetry of loss recovery.",
    gradient: "from-brand-green/20 to-brand-green/5",
  },
  {
    id: 3,
    category: "Strategy",
    title: "Institutional Order Flow: Reading Smart Money in NIFTY Futures",
    date: "July 10, 2024",
    excerpt:
      "How to interpret FII/DII positioning data and open interest changes to gauge institutional sentiment in derivative markets.",
    gradient: "from-blue-500/20 to-blue-500/5",
  },
];

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NewsSection() {
  const pathname = usePathname();
  return (
    <section id="news" className="section-padding bg-background-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-gold text-[11px] font-heading tracking-[0.3em] uppercase">
            Market Insights
          </span>
          <h2 className="section-title mt-3">
            LATEST <span className="text-gold-gradient">NEWS</span>
          </h2>
          <div className="section-divider mt-4" />
          <p className="section-subtitle mt-4">
            Stay updated with the latest market analysis and research.
          </p>
        </motion.div>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <motion.div
              key={item.id}
              className="glass-card overflow-hidden group cursor-pointer relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={`relative h-48 bg-gradient-to-b ${item.gradient} rounded-t-md`} />
              <div className="p-6">
                {/* Category Badge */}
                <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-[10px] font-body font-medium tracking-wider uppercase text-white border border-white/10">
                  {item.category}
                </span>
                {/* Content */}
                <h3 className="font-heading text-base tracking-wide text-white mb-3 group-hover:text-brand-gold transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-brand-grey text-xs leading-relaxed mb-4">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-brand-grey/60">
                    <Calendar size={12} />
                    <span className="text-[11px]">{item.date}</span>
                  </div>
                  <span className="text-brand-gold text-[11px] font-body font-semibold tracking-wider uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All News Button */}
        {pathname === "/" && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-body font-semibold text-sm uppercase tracking-wider rounded-button hover:bg-white/10 transition-all border border-white/10"
            >
              View All News <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
