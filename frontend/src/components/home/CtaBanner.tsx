"use client";

import React from "react";
import { motion } from "framer-motion";
import { PremiumButton } from "@/components/ui/PremiumButton";

export default function CtaBanner() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background Layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-[#101010] to-background" />
          <div className="absolute inset-0 bg-background/40 backdrop-blur-3xl" />
          <div className="absolute -inset-1 border-2 border-brand-primary/20 rounded-3xl" />
          
          <div className="relative z-10 p-12 md:p-20 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight max-w-4xl">
              Ready to Build Wealth <br/> with <span className="text-brand-primary">Confidence?</span>
            </h2>
            <p className="text-brand-grey text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Stop guessing. Start executing with an institutional framework designed for capital protection and long-term compounding.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mt-4">
              <a href="#consultation" className="btn-primary py-4 px-10 text-sm">
                  Schedule Consultation
              </a>
              <a href="#consultation" className="btn-secondary py-4 px-10 text-sm">
                  Contact Advisor
              </a>
            </div>
            
            <p className="mt-8 text-brand-grey/50 text-xs font-heading tracking-widest uppercase">
              No Obligation. Strictly Confidential.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
