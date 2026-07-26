"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Target, TrendingUp, Key, Brain, BarChart3 } from "lucide-react";

const principles = [
  { icon: <Brain className="w-8 h-8 text-brand-gold" />, title: "Discipline Beats Emotion", desc: "Markets are emotional. Our models are not. We execute based on predefined rules." },
  { icon: <ShieldCheck className="w-8 h-8 text-brand-gold" />, title: "Risk Before Reward", desc: "We calculate the downside before even looking at the upside potential." },
  { icon: <Target className="w-8 h-8 text-brand-gold" />, title: "Consistency Beats Speculation", desc: "Steady, repeatable processes outperform lucky gambles over the long run." },
  { icon: <Key className="w-8 h-8 text-brand-gold" />, title: "Capital Preservation First", desc: "Rule number one: Don't lose money. Rule number two: Never forget rule number one." },
  { icon: <BarChart3 className="w-8 h-8 text-brand-gold" />, title: "Data Over Opinions", desc: "We rely on verifiable metrics and historical data, ignoring market noise and punditry." },
  { icon: <TrendingUp className="w-8 h-8 text-brand-gold" />, title: "Long-Term Compounding Wins", desc: "Time in the market, structured correctly, is the ultimate wealth generator." },
];

export default function PerformancePhilosophy() {
  return (
    <section className="py-24 bg-background border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Our Performance <br/> Philosophy
            </h2>
            <div className="w-20 h-1 bg-brand-gold mb-8" />
            <p className="text-brand-grey text-lg leading-relaxed mb-6">
              We do not promise guaranteed returns. We do not display fake profit percentages or chase overnight wealth. 
            </p>
            <p className="text-brand-grey text-lg leading-relaxed mb-8">
              Instead, we promise absolute adherence to a risk-adjusted, data-driven methodology that has stood the test of time across multiple market cycles.
            </p>
            <div className="inline-block p-4 border border-brand-gold/30 bg-brand-gold/5 rounded-lg">
              <p className="font-heading font-semibold text-white">
                "We don't predict the market. We prepare for it."
              </p>
            </div>
          </motion.div>

          {/* Right Infographic Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#101010] p-6 rounded-xl border border-white/5 hover:border-brand-gold/40 transition-all duration-300 group"
              >
                <div className="mb-4 bg-background w-16 h-16 rounded-full flex items-center justify-center border border-white/10 group-hover:bg-brand-gold/10 transition-colors">
                  {p.icon}
                </div>
                <h4 className="text-white font-heading font-bold mb-2">{p.title}</h4>
                <p className="text-brand-grey text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
