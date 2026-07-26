"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  ShieldCheck,
  BarChart3,
  Droplets,
  Brain,
  Database,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pillars = [
  {
    icon: Target,
    title: "Probability-Based Analysis",
    description:
      "Every trade recommendation is backed by statistical probability models and historical pattern recognition.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Management Frameworks",
    description:
      "Rigorous position sizing, stop-loss protocols, and portfolio-level risk controls to protect capital.",
  },
  {
    icon: BarChart3,
    title: "Institutional Footprint Tracking",
    description:
      "Monitoring smart money flows, FII/DII activity, and block deal patterns for informed positioning.",
  },
  {
    icon: Droplets,
    title: "Liquidity Analysis",
    description:
      "Deep analysis of order flow, bid-ask dynamics, and volume profiles to identify optimal entry and exit zones.",
  },
  {
    icon: Brain,
    title: "Disciplined Execution",
    description:
      "Rule-based trading systems that eliminate emotional bias and enforce systematic decision-making.",
  },
  {
    icon: Database,
    title: "Data-Driven Decisions",
    description:
      "Leveraging quantitative models, backtested strategies, and real-time market data analytics.",
  },
];

export default function AboutSection() {
  const pathname = usePathname();
  
  return (
    <section id="about" className="section-padding bg-background-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-brand-primary text-xs font-heading tracking-[0.2em] font-semibold uppercase">
            Who We Are
          </span>
          <h2 className="section-title mt-3">
            ABOUT <span className="text-brand-primary">BHRAMASTRA</span>
          </h2>
          <div className="section-divider mt-4" />
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Description */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-white text-lg leading-relaxed">
              BHRAMASTRA is a proprietary trading methodology developed through{" "}
              <span className="text-brand-primary font-semibold">
                five years of continuous research
              </span>{" "}
              and live market testing across Indian equity, derivatives, and
              commodity markets.
            </p>
            <p className="text-brand-grey leading-relaxed">
              Our approach combines institutional-grade analytical frameworks
              with cutting-edge technology to deliver actionable market insights.
              We focus on empowering traders with the tools, knowledge, and
              discipline needed to navigate volatile markets with confidence.
            </p>
            <p className="text-brand-grey leading-relaxed">
              Every recommendation is grounded in rigorous quantitative
              analysis, risk assessment, and a deep understanding of market
              microstructure—not tips, not hunches, not speculation.
            </p>

            {/* Decorative stat box */}
            <div className="glass-panel border-brand-primary/20 rounded-card p-6 mt-8">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-brand-primary">
                    5+
                  </div>
                  <div className="text-[10px] text-brand-grey tracking-widest uppercase mt-1">
                    Years
                  </div>
                </div>
                <div className="w-[1px] h-12 bg-white/10" />
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-brand-secondary">
                    500+
                  </div>
                  <div className="text-[10px] text-brand-grey tracking-widest uppercase mt-1">
                    Clients
                  </div>
                </div>
                <div className="w-[1px] h-12 bg-white/10" />
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-brand-primary">
                    1500+
                  </div>
                  <div className="text-[10px] text-brand-grey tracking-widest uppercase mt-1">
                    Reports
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  className="glass-card p-6 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4 group-hover:bg-brand-primary/20 transition-colors">
                    <Icon size={20} className="text-brand-primary" />
                  </div>
                  <h4 className="font-heading text-sm tracking-wider text-white mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-brand-grey text-xs leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Learn More Button */}
        {pathname === "/" && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href="/about" 
              className="btn-secondary text-sm"
            >
              Learn More <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}

        {/* Disclaimer */}
        <motion.p
          className="text-center text-brand-grey/60 text-xs mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Note: Past performance is not indicative of future results. All
          investments carry inherent risk. Please consult your financial advisor
          before making investment decisions.
        </motion.p>
      </div>
    </section>
  );
}
