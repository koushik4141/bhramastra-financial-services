"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  { step: "01", title: "Discovery Call", desc: "Understanding your current financial standing and long-term aspirations." },
  { step: "02", title: "Financial Assessment", desc: "Deep dive into your existing portfolio, liabilities, and liquidity needs." },
  { step: "03", title: "Risk Profiling", desc: "Determining your exact risk tolerance using quantitative models." },
  { step: "04", title: "Research & Analysis", desc: "Our analysts identify the optimal asset mix for your specific profile." },
  { step: "05", title: "Strategy Creation", desc: "Formulating a tailored execution plan with clear entry and exit protocols." },
  { step: "06", title: "Portfolio Monitoring", desc: "Continuous tracking and periodic rebalancing to maintain optimal allocation." },
];

export default function InvestmentProcess() {
  return (
    <section className="py-24 bg-[#101010] relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            The BHRAMASTRA Process
          </h2>
          <p className="text-brand-grey text-lg max-w-2xl mx-auto">
            A systematic, six-step institutional framework designed to remove emotion from investing and focus purely on data-driven execution.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2" />

          {/* Steps */}
          <div className="space-y-12 relative z-10">
            {steps.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Empty half for desktop layout */}
                  <div className="hidden md:block w-1/2" />
                  
                  {/* Center Node */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#101010] border-2 border-brand-gold flex items-center justify-center -translate-x-[15px] md:-translate-x-1/2 mt-1 md:mt-0 shadow-[0_0_15px_rgba(212,175,55,0.4)] z-20">
                    <div className="w-2 h-2 rounded-full bg-brand-gold" />
                  </div>

                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div className="glass-panel p-8 rounded-2xl hover:border-brand-gold/30 transition-colors">
                      <span className="text-brand-gold font-numbers font-bold text-5xl opacity-20 absolute top-4 right-6 pointer-events-none">
                        {item.step}
                      </span>
                      <h3 className="text-2xl font-heading font-bold text-white mb-3 relative z-10">
                        {item.title}
                      </h3>
                      <p className="text-brand-grey text-base leading-relaxed relative z-10">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
