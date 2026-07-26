"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const flow = [
  { step: "Macro Analysis", desc: "Global economic trends, interest rates, and liquidity." },
  { step: "Sector Analysis", desc: "Identifying industries with secular tailwinds." },
  { step: "Fundamental Analysis", desc: "Deep dive into balance sheets, cash flows, and valuations." },
  { step: "Technical Analysis", desc: "Optimal entry and exit points based on price action." },
  { step: "Risk Assessment", desc: "Position sizing and worst-case scenario modeling." },
  { step: "Portfolio Allocation", desc: "Capital deployment according to the mandate." },
  { step: "Continuous Monitoring", desc: "Dynamic rebalancing as data evolves." },
];

export default function ResearchFramework() {
  return (
    <section className="py-24 bg-[#080808] relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <div className="text-brand-gold tracking-widest uppercase text-sm font-bold mb-4 flex items-center justify-center gap-4">
            <span className="w-8 h-[1px] bg-brand-gold"></span>
            Our Methodology
            <span className="w-8 h-[1px] bg-brand-gold"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            The Research Framework
          </h2>
          <p className="text-brand-grey text-lg">
            A top-down, bottom-up fusion model that filters the noise and focuses on structural realities.
          </p>
        </div>

        <div className="flex flex-col items-center">
          {flow.map((item, index) => (
            <React.Fragment key={item.step}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full max-w-lg bg-[#101010] border border-white/10 p-6 rounded-xl text-center hover:border-brand-gold/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] transition-all duration-300 relative z-10"
              >
                <h3 className="text-xl font-heading font-bold text-white mb-2">{item.step}</h3>
                <p className="text-brand-grey text-sm">{item.desc}</p>
              </motion.div>
              
              {index < flow.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="h-12 flex items-center justify-center text-brand-gold opacity-50 relative z-0"
                >
                  <ArrowDown className="w-6 h-6 animate-bounce" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
