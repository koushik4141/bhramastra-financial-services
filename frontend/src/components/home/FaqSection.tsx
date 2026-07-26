"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How is BHRAMASTRA different from other advisory firms?",
    a: "We do not offer speculative 'tips' or promise overnight wealth. We operate on an institutional framework, focusing on data-driven research, strict risk management, and long-term capital compounding."
  },
  {
    q: "What is your minimum capital requirement?",
    a: "While we do not strictly enforce a hard minimum for our basic advisory tiers, our premium portfolio management guidance is optimized for portfolios above ₹50 Lakhs to ensure proper diversification."
  },
  {
    q: "Do you offer intraday trading recommendations?",
    a: "No. Our core philosophy is built on capital preservation and compounding. Intraday trading carries a systemic risk profile that contradicts our institutional mandate."
  },
  {
    q: "How often do you rebalance portfolios?",
    a: "Rebalancing is dynamic and driven by data, not calendars. We adjust allocations when macroeconomic indicators shift or when specific assets breach our risk-tolerance thresholds."
  },
  {
    q: "Are you SEBI Registered?",
    a: "Yes. BHRAMASTRA Trading Advisor operates in full compliance with all regulatory guidelines. Our SEBI Registration details are prominently displayed in our legal section."
  },
  {
    q: "What is the process to start?",
    a: "It begins with a Discovery Call to understand your goals, followed by a rigorous Financial Assessment and Risk Profiling before any capital is deployed into our strategies."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-24 bg-[#101010]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-brand-grey text-lg">
            Clarity and transparency are the foundations of our advisory.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="border border-white/10 rounded-xl overflow-hidden bg-background transition-colors hover:border-brand-gold/30"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-lg font-heading font-semibold text-white">{faq.q}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === idx ? 'bg-brand-gold text-background' : 'bg-white/5 text-white'}`}>
                  {openIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-0 text-brand-grey leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
